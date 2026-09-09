#!/usr/bin/env python3
"""Verify the quoted phrases that live in a ledger entry's PROSE, not its anchors.

`verify_ledger.py` checks `**Quote:**` lines. It has never looked at the source
labels above them, and those labels quote the tape too:

    - [[473-of-SV35YqvY-...|#473 — Leo Pekelis]] — the motivating challenge is
      "the reliability of executing numerous chained" financial workflows

That phrase is nowhere in that transcript. It was found by reading, not by any
check, and there are 88 more inline quoted phrases across the two ledgers with
nothing verifying them. A quotation mark is a promise regardless of which line
it sits on.

Each source label names exactly one video, so the phrase has a definite place to
be. Failures here are real: either the phrase is not on the tape, or it is a
paraphrase wearing quotation marks.

ELLIPSES ARE SPLIT, NOT DROPPED. "a … b" is two promises and both are checked,
because a quote joined across an ellipsis need not appear contiguously.

TALK TITLES IN QUOTES ARE NOT CLAIMS ABOUT SPEECH. The ledger legitimately cites
a title — 'the workshop title, "AI Music Generation, From Prompt to Production,"
carries the promise'. Five of the first eight hits were exactly that, so a phrase
matching its own note slug is skipped. Titles have their own check
(check_title_quotes.py) for the case where prose passes one off as speech.

    python3 99_Meta/scripts/anchor/check_label_quotes.py
    python3 99_Meta/scripts/anchor/check_label_quotes.py --ledger claims-2 --strict
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from locate import locate_quote  # noqa: E402
from vtt import load_word_stream  # noqa: E402

REPO = Path(__file__).resolve().parents[3]
RAW = REPO / "99_Meta" / "transcripts" / "raw"
PLAIN = REPO / "99_Meta" / "transcripts" / "plain"

# A source label: "  - [[<slug-with-video-id>|#N — Name]] — prose"
LABEL = re.compile(r"^  - \[\[([^\]|]+)")
VIDEO = re.compile(r"[A-Za-z0-9_-]{11}")
# Straight or curly quotes, long enough to be a real phrase rather than a term
# of art like "RAG" or a scare-quoted single word.
INLINE = re.compile(r'[""]([^""]{12,}?)[""]|"([^"]{12,}?)"')
MIN_WORDS = 4


def slugify(text: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", text.lower())).strip("-")


def norm(text: str) -> str:
    t = text.replace("’", "'").replace("‘", "'")
    t = t.replace("“", '"').replace("”", '"').replace("—", "-")
    return re.sub(r"\s+", " ", t).strip().lower()


def video_of(slug: str) -> str | None:
    """Pull the 11-char id out of a note slug like '473-of-SV35YqvY-title'."""
    # Slugs are '<index>-<video_id>-<title>'; take the field after the index.
    parts = slug.split("-")
    for i in range(1, len(parts)):
        cand = "-".join(parts[i:i + 2])[:11]
        if len(parts[i]) == 11 and VIDEO.fullmatch(parts[i]):
            return parts[i]
        if len(cand) == 11 and VIDEO.fullmatch(cand):
            return cand
    return None


def on_tape(vid: str, phrase: str) -> tuple[bool, str]:
    plain = PLAIN / f"{vid}.txt"
    if plain.exists() and norm(phrase) in norm(plain.read_text()):
        return True, "text"
    vtt = RAW / f"{vid}.en.vtt"
    if not vtt.exists():
        vtt = RAW / f"{vid}.en-orig.vtt"
    if not vtt.exists():
        return False, "no transcript"
    try:
        found = locate_quote(load_word_stream(str(vtt)), phrase, vid)
    except Exception as exc:  # noqa: BLE001 - report, never abort the sweep
        return False, f"error: {exc}"
    if found.confidence in ("high", "medium") and found.start:
        return True, f"stream {found.confidence}"
    return False, f"stream {found.confidence}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="claims")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any fail")
    args = ap.parse_args()

    path = REPO / args.ledger
    if path.is_dir():
        path = path / "Claims Ledger.md"

    entry, checked, failures, skipped, titles = "?", 0, [], 0, 0
    for lineno, ln in enumerate(path.read_text().split("\n"), 1):
        h = re.match(r"^## (\d+)\)", ln)
        if h:
            entry = f"claims#{h.group(1)}"
            continue
        m = LABEL.match(ln)
        if not m:
            continue
        vid = video_of(m.group(1))
        if not vid:
            continue
        slug = m.group(1)
        for a, b in INLINE.findall(ln):
            raw = a or b
            # An ellipsis joins two separate promises; check each.
            for piece in re.split(r"\s*(?:…|\.\.\.)\s*", raw):
                piece = piece.strip().strip(",;:")
                if len(piece.split()) < MIN_WORDS:
                    skipped += 1
                    continue
                # A quoted talk title is a citation, not a claim about speech.
                if slugify(piece) and slugify(piece) in slugify(slug):
                    titles += 1
                    continue
                checked += 1
                ok, how = on_tape(vid, piece)
                if not ok:
                    failures.append((entry, lineno, vid, piece, how))

    print(f"{args.ledger}: {checked} inline quoted phrase(s) in entry prose checked "
          f"({skipped} too short, {titles} quoted talk title(s) skipped)\n")
    for entry, lineno, vid, piece, how in failures:
        print(f"  {entry} (L{lineno})  {vid}  [{how}]")
        print(f"    {piece[:150]}")
    if failures:
        print(f"\nFAILURES ({len(failures)}): a phrase in quotation marks that is not "
              f"on the tape is\neither mis-sourced or a paraphrase wearing quote marks. "
              f"Read it before editing —\nthe locator loses confidence on long spans, "
              f"so confirm by eye.")
    else:
        print("PASS — every prose quotation resolves to its cited talk.")
    return 1 if (failures and args.strict) else 0


if __name__ == "__main__":
    sys.exit(main())
