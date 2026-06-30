"""One-command audiobook generation. Run: python -m audiobook_gen --source <md>."""
from __future__ import annotations

import argparse
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
from audiobook_gen.tts import DEFAULT_VOICE


def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="audiobook_gen", description="Generate an AI-narrated audiobook from markdown.")
    p.add_argument("--source", required=True, help="Path to the markdown source")
    p.add_argument("--voice", default=DEFAULT_VOICE, help="OpenAI TTS voice (default: onyx)")
    p.add_argument("--title", default="AI Engineering", help="Book title for credits/m4b")
    p.add_argument("--author", default="Timur Isachenko", help="Author name for credits")
    p.add_argument("--out", default="dist/audiobook", help="Output directory")
    p.add_argument("--cache-dir", default="dist/.tts-cache", help="TTS chunk cache directory")
    p.add_argument("--dry-run", action="store_true", help="Print cost + plan, no API/audio")
    return p


def slug(title: str) -> str:
    body = re.sub(r"^Chapter\s+\d+\s*[—–-]\s*", "", title).strip()
    body = re.sub(r"[^a-zA-Z0-9]+", "-", body).strip("-").lower()
    return body


def run_dry(source: Path):
    chapters = normalize_markdown(Path(source).read_text(encoding="utf-8"))
    return build_plan(chapters)


def main(argv=None) -> int:
    args = build_parser().parse_args(argv)
    source = Path(args.source)
    if not source.exists():
        print(f"Source not found: {source}", file=sys.stderr)
        return 2

    if args.dry_run:
        plan = run_dry(source)
        print("\n".join(plan.lines))
        return 0

    ff.ensure_ffmpeg()
    chapters = normalize_markdown(source.read_text(encoding="utf-8"))
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
            text, voice=args.voice, cache_dir=cache, work_dir=work / name,
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
