"""One-command audiobook generation. Run: python -m audiobook_gen [--dry-run]."""
from __future__ import annotations

import argparse
import os
import re
import sys
from pathlib import Path

from audiobook_gen import ffmpeg_ops as ff
from audiobook_gen.assemble import render_chapter
from audiobook_gen.cost import build_plan
from audiobook_gen.credits import closing_text, opening_text
from audiobook_gen.normalize import normalize_markdown
from audiobook_gen.package import build_m4b, zip_marketplace
from audiobook_gen.qa import check_acx, measure, write_report

# Canonical source: website/src/content relative to the repo root
# (this file lives at scripts/audiobook_gen/__main__.py, so go up 3 levels)
_PACKAGE_DIR = Path(__file__).parent
_CANONICAL_DIR = _PACKAGE_DIR.parent.parent / "website" / "src" / "content"

# Pattern that matches chapter-NN.md or Chapter N - ....md (case-insensitive)
_CHAPTER_FILE_RE = re.compile(r"[Cc]hapter[- _]*0*(\d+)", re.IGNORECASE)


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="audiobook_gen", description="Generate an AI-narrated audiobook from markdown.")
    src = p.add_mutually_exclusive_group()
    src.add_argument("--source", default=None, help="Path to a single combined markdown source file")
    src.add_argument(
        "--source-dir", default=None, metavar="DIR",
        help="Directory containing chapter-NN.md (or 'Chapter N*.md') files; "
             "concatenated in chapter-number order. Defaults to website/src/content.",
    )
    p.add_argument("--engine", default="openai", choices=["openai", "elevenlabs"],
                   help="TTS backend (default: openai)")
    p.add_argument("--voice", default=None,
                   help="Voice id/name; defaults per engine (openai: onyx, elevenlabs: Oliver)")
    p.add_argument("--model", default=None, help="Override TTS model id for the engine")
    p.add_argument("--title", default="From Copilot to Colleague", help="Book title for credits/m4b")
    p.add_argument("--author", default="Timur Isachenko", help="Author name for credits")
    p.add_argument("--out", default="dist/audiobook", help="Output directory")
    p.add_argument("--cache-dir", default="dist/.tts-cache", help="TTS chunk cache directory")
    p.add_argument("--dry-run", action="store_true", help="Print cost + plan, no API/audio")
    return p


def slug(title: str) -> str:
    body = re.sub(r"^Chapter\s+\d+\s*[—–-]\s*", "", title).strip()
    body = re.sub(r"[^a-zA-Z0-9]+", "-", body).strip("-").lower()
    return body


def _collect_dir(d: Path) -> str:
    """Read all chapter-*.md files from *d* in chapter-number order and return
    concatenated markdown (blank line between files so H1 boundaries are clean)."""
    entries: list[tuple[int, Path]] = []
    for p in d.iterdir():
        if not p.suffix.lower() == ".md":
            continue
        m = _CHAPTER_FILE_RE.search(p.name)
        if m:
            entries.append((int(m.group(1)), p))
    if not entries:
        raise SystemExit(f"No chapter-*.md files found in {d}")
    entries.sort(key=lambda x: x[0])
    parts = [p.read_text(encoding="utf-8") for _, p in entries]
    return "\n\n".join(parts)


def resolve_source_text(args) -> str:
    """Return the full markdown text to synthesise.

    Priority:
      1. ``--source FILE``  – read a single combined file (original behaviour).
      2. ``--source-dir DIR`` – concatenate chapter files from DIR.
      3. Default – use the canonical ``website/src/content`` directory.
    """
    if args.source is not None:
        p = Path(args.source)
        if not p.exists():
            print(f"Source not found: {p}", file=sys.stderr)
            raise SystemExit(2)
        print(f"Source file: {p.resolve()}")
        return p.read_text(encoding="utf-8")

    if args.source_dir is not None:
        d = Path(args.source_dir)
        if not d.is_dir():
            print(f"Source directory not found: {d}", file=sys.stderr)
            raise SystemExit(2)
        print(f"Source directory: {d.resolve()}")
        return _collect_dir(d)

    # Default: canonical manuscript
    d = _CANONICAL_DIR
    print(f"Source directory (canonical default): {d.resolve()}")
    return _collect_dir(d)


def make_synth(engine: str, voice: str | None, model: str | None, cache_dir: Path):
    """Return a chunk synth callable bound to the chosen engine, voice, model,
    and cache dir. Fails fast if the engine's key is missing."""
    if engine == "elevenlabs":
        from audiobook_gen import eleven
        from audiobook_gen.eleven_prepare import context_snippet, prepare_chunk_text

        api_key = os.environ.get("ELEVEN_API_KEY") or os.environ.get("ELEVENLABS_API_KEY")
        if not api_key:
            raise SystemExit("ELEVEN_API_KEY not set (or ELEVENLABS_API_KEY).")
        v = voice or eleven.DEFAULT_VOICE
        m = model or eleven.DEFAULT_MODEL

        def synth(
            text: str,
            *,
            previous_text: str | None = None,
            next_text: str | None = None,
            segment_start: bool = False,
        ):
            prepared = prepare_chunk_text(text, segment_start=segment_start)
            prev = context_snippet(
                prepare_chunk_text(previous_text) if previous_text else None,
                from_end=True,
            )
            nxt = context_snippet(
                prepare_chunk_text(next_text) if next_text else None,
                from_end=False,
            )
            return eleven.synthesize(
                prepared,
                v,
                cache_dir,
                model=m,
                api_key=api_key,
                previous_text=prev,
                next_text=nxt,
            )

        return synth

    from audiobook_gen import tts
    if not os.environ.get("OPENAI_API_KEY"):
        raise SystemExit("OPENAI_API_KEY not set.")
    v = voice or tts.DEFAULT_VOICE
    m = model or tts.DEFAULT_MODEL

    def synth(text: str, **_kwargs):
        return tts.synthesize(
            text, v, cache_dir, instructions=tts.DEFAULT_INSTRUCTIONS, model=m
        )

    return synth


def run_dry(args):
    """Parse the manuscript determined by *args* and return a cost plan."""
    md = resolve_source_text(args)
    chapters = normalize_markdown(md)
    return build_plan(chapters)


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)

    if args.dry_run:
        plan = run_dry(args)
        print("\n".join(plan.lines))
        return 0

    ff.ensure_ffmpeg()
    md = resolve_source_text(args)
    chapters = normalize_markdown(md)
    if not chapters:
        print("No chapters parsed from source.", file=sys.stderr)
        return 2

    out = Path(args.out)
    market = out / "marketplace"
    personal = out / "personal"
    work = out / ".work"
    cache = Path(args.cache_dir)
    for d in (market, personal, work):
        d.mkdir(parents=True, exist_ok=True)

    synth = make_synth(args.engine, args.voice, args.model, cache)

    # Build the ordered narration list: opening credits, chapters, closing credits.
    segments: list[tuple[str, str]] = [("Opening Credits", opening_text(args.title, args.author))]
    segments += [(c.title, c.text) for c in chapters]
    segments += [("Closing Credits", closing_text(args.title))]

    mp3_files: list[Path] = []
    m4b_inputs: list[tuple[str, Path]] = []
    qa_results = []

    for i, (title, text) in enumerate(segments):
        name = f"{i:02d}-{slug(title) or 'credits'}"
        out_wav = work / f"{name}.wav"
        out_mp3 = market / f"{name}.mp3"
        render_chapter(
            text, synth=synth, work_dir=work / name,
            out_wav=out_wav, out_mp3=out_mp3,
        )
        mp3_files.append(out_mp3)
        m4b_inputs.append((title, out_wav))
        metrics = measure(out_mp3)
        qa_results.append((title, metrics, check_acx(metrics)))

    report = write_report(qa_results, market / "QA-REPORT.md")
    zip_marketplace(mp3_files + [report], market / "acx-upload.zip")
    build_m4b(m4b_inputs, personal / f"{slug(args.title) or 'audiobook'}.m4b", work)

    failures = sum(1 for _, _, f in qa_results if f)
    print(f"Done. {len(mp3_files)} files in {market}. QA: {len(qa_results) - failures}/{len(qa_results)} pass.")
    print(f"Personal m4b in {personal}.")
    return 1 if failures else 0


if __name__ == "__main__":
    raise SystemExit(main())
