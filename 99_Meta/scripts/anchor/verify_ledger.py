#!/usr/bin/env python3
"""Verify every Source Anchor in a Claims Ledger still resolves to its quote.

An anchor is a promise: this exact wording appears in this video at this time.
Nothing enforced that promise. Anchors rot silently — a transcript gets
re-fetched, a quote is tidied during editing, a paragraph is paraphrased and
the quote marks stay. This walks a ledger and checks each anchor against the
committed VTT.

MUST RUN LOCALLY. Transcripts are gitignored (see docs/ONGOING_SYNC_AND_JUDGING.md),
so CI cannot see them; a workflow version of this check would pass vacuously.

    python3 99_Meta/scripts/anchor/verify_ledger.py                     # book 1
    python3 99_Meta/scripts/anchor/verify_ledger.py --ledger "claims-2/Claims Ledger.md"

Exit 0 when every anchor resolves, 1 when any fails.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from locate import locate_quote  # noqa: E402
from vtt import load_word_stream  # noqa: E402

_REPO = Path(__file__).resolve().parents[3]
_ANCHOR = re.compile(
    r"\*\*Anchor:\*\*\s*`([A-Za-z0-9_-]{11})`\s*([0-9:.]+)\s*→\s*([0-9:.]+)"
)
_QUOTE = re.compile(r'\*\*Quote:\*\*\s*"(.+?)"\s*$')


def _norm(text: str) -> str:
    """Collapse whitespace and smart punctuation so wrapped captions compare."""
    t = text.replace("\u2019", "'").replace("\u2018", "'")
    t = t.replace("\u201c", '"').replace("\u201d", '"').replace("\u2014", "-")
    return re.sub(r"\s+", " ", t).strip().lower()


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="claims/Claims Ledger.md")
    ap.add_argument("--transcripts", default=str(_REPO / "99_Meta" / "transcripts" / "raw"))
    ap.add_argument("--quiet", action="store_true", help="only print failures and the summary")
    args = ap.parse_args()

    ledger = _REPO / args.ledger
    lines = ledger.read_text().splitlines()

    # Pair each Anchor line with the Quote line that follows it.
    pairs: list[tuple[str, str, str, int]] = []
    pending: tuple[str, str, int] | None = None
    for i, line in enumerate(lines, 1):
        m = _ANCHOR.search(line)
        if m:
            pending = (m.group(1), m.group(2), i)
            continue
        q = _QUOTE.search(line)
        if q and pending:
            pairs.append((pending[0], pending[1], q.group(1), pending[2]))
            pending = None

    print(f"[verify] {ledger.name}: {len(pairs)} anchor/quote pairs")

    ok = 0
    failures: list[str] = []
    missing_transcript: set[str] = set()
    for vid, start, quote, lineno in pairs:
        vtt = Path(args.transcripts) / f"{vid}.en.vtt"
        if not vtt.exists():
            alt = Path(args.transcripts) / f"{vid}.en-orig.vtt"
            vtt = alt if alt.exists() else vtt
        if not vtt.exists():
            missing_transcript.add(vid)
            failures.append(f"  L{lineno} {vid}: no transcript on disk")
            continue
        try:
            found = locate_quote(load_word_stream(str(vtt)), quote, vid)
        except Exception as exc:  # noqa: BLE001 - report, never abort the sweep
            failures.append(f"  L{lineno} {vid}: verifier error: {exc}")
            continue
        if found.confidence in ("high", "medium") and found.start:
            ok += 1
            if not args.quiet and found.start != start:
                print(f"  L{lineno} {vid}: OK but timestamp moved {start} -> {found.start}")
        else:
            # Fallback before declaring rot: the word-stream matcher loses
            # confidence on long quotes that span many caption cues. Check the
            # plain transcript as normalised text — that is the same question a
            # human would ask ("are these words in this talk?"). Only a miss
            # here is real rot. Two book-1 anchors failed the strict matcher
            # while being present verbatim; this is why.
            plain = _REPO / "99_Meta" / "transcripts" / "plain" / f"{vid}.txt"
            if plain.exists() and _norm(quote) in _norm(plain.read_text()):
                ok += 1
                if not args.quiet:
                    print(f"  L{lineno} {vid}: OK via text fallback "
                          f"(stream confidence={found.confidence})")
            else:
                failures.append(
                    f"  L{lineno} {vid}: quote NOT FOUND (confidence={found.confidence})\n"
                    f"        quote: {quote[:80]}"
                )

    print(f"[verify] resolved {ok}/{len(pairs)}")
    if missing_transcript:
        print(f"[verify] {len(missing_transcript)} video(s) have no local transcript "
              "— fetch them before trusting this result")
    if failures:
        print(f"\nFAILURES ({len(failures)}):")
        for f in failures:
            print(f)
        return 1
    print("PASS — every anchor resolves to its quote.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
