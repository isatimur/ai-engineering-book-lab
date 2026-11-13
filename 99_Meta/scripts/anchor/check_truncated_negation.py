#!/usr/bin/env python3
"""Find anchored quotes that may have lost a negation at their left edge.

On 2026-11-13 a currency verdict cited a talk as

    "a human in the process equals very poor results."

The tape says *"**The absence of** a human in the process equals very poor
results."* The anchor started mid-sentence, three words too late, and the
citation ended up arguing against the point it was supporting.

No existing gate catches that. `verify_ledger.py` proves the words are on the
tape; it cannot prove they still mean what the ledger uses them for. An
inversion is a *correct* anchor pointing at a *wrong* reading.

This looks for the mechanical signature of that mistake:

  1. the quote itself contains no negation, and
  2. a negation word sits in the few words immediately before it.

Both together mean the quote may be the tail of a negated sentence. That is a
prompt to read the tape, not a verdict — plenty of hits will be innocent, e.g.
a previous sentence that happened to end in "not". A gate that only fires on
certainty would not have fired on the case above either.

Exit 1 only with --strict, so it can report today and gate later.

    python3 99_Meta/scripts/anchor/check_truncated_negation.py
    python3 99_Meta/scripts/anchor/check_truncated_negation.py --ledger claims-2
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from vtt import load_word_stream, normalize  # noqa: E402

REPO = Path(__file__).resolve().parents[3]

_ANCHOR = re.compile(
    r"\*\*Anchor:\*\*\s*`([A-Za-z0-9_-]{11})`\s*([0-9:.]+)\s*→\s*([0-9:.]+)")
_QUOTE = re.compile(r'\*\*Quote:\*\*\s*"(.+?)"\s*$')

# Normalized, so "don't" arrives as "dont" and "isn't" as "isnt".
NEGATIONS = {
    "no", "not", "never", "none", "nobody", "nothing", "neither", "nor",
    "without", "absence", "absent", "lack", "lacking", "fails", "fail",
    "cannot", "cant", "dont", "doesnt", "didnt", "isnt", "arent", "wasnt",
    "werent", "wont", "wouldnt", "shouldnt", "couldnt", "hasnt", "havent",
    "hadnt", "rarely", "hardly", "barely", "unless",
}
LOOKBACK = 6  # words before the quote to inspect


def negations_in(tokens: list[str]) -> list[str]:
    return [t for t in tokens if t in NEGATIONS]


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="claims", help="ledger dir (claims | claims-2)")
    ap.add_argument("--transcripts", default=str(REPO / "99_Meta" / "transcripts" / "raw"))
    ap.add_argument("--lookback", type=int, default=LOOKBACK,
                    help=f"words before the quote to inspect (default {LOOKBACK})")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any quote is flagged")
    a = ap.parse_args()

    lines = (REPO / a.ledger / "Claims Ledger.md").read_text().split("\n")

    pairs: list[tuple[int, str, str, str]] = []  # line, video, start, quote
    pending: tuple[str, str] | None = None
    for i, ln in enumerate(lines):
        if m := _ANCHOR.search(ln):
            pending = (m.group(1), m.group(2))
            continue
        if pending and (m := _QUOTE.search(ln)):
            pairs.append((i + 1, pending[0], pending[1], m.group(1)))
            pending = None

    flagged: list[tuple] = []
    unreadable = 0
    for lineno, vid, start, quote in pairs:
        quote_norm = [n for n in (normalize(w) for w in quote.split()) if n]
        if negations_in(quote_norm):
            continue  # the quote carries its own negation; nothing was cut
        vtt = Path(a.transcripts) / f"{vid}.en.vtt"
        if not vtt.exists():
            unreadable += 1
            continue
        stream = load_word_stream(str(vtt))
        idx = next((k for k, w in enumerate(stream) if w.timestamp >= start), None)
        if idx is None:
            unreadable += 1
            continue
        before = [w.norm for w in stream[max(0, idx - a.lookback):idx]]
        if hits := negations_in(before):
            flagged.append((lineno, vid, start, quote, " ".join(
                w.word for w in stream[max(0, idx - a.lookback):idx]), hits))

    print(f"{a.ledger}: {len(pairs)} anchored quote(s) · {len(flagged)} with a negation in the "
          f"{a.lookback} words before them"
          + (f" · {unreadable} transcript(s) unreadable" if unreadable else ""))

    for lineno, vid, start, quote, before, hits in flagged:
        print(f"\n  L{lineno} {vid} {start}  (negation: {', '.join(sorted(set(hits)))})")
        print(f"    before: …{before}")
        print(f"    quote:  \"{quote[:96]}\"")

    if flagged:
        print("\nRead the tape for each. If the negation belongs to the quoted sentence, widen "
              "the anchor\nwith cli.py to the sentence boundary. If it belongs to the previous "
              "sentence, nothing is wrong.")
    return 1 if (a.strict and flagged) else 0


if __name__ == "__main__":
    sys.exit(main())
