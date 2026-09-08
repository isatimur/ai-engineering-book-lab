#!/usr/bin/env python3
"""Find ledger quotes that were spoken by the questioner, not the speaker.

The worst defect the 2026-09-04 audit found was not a wrong quote. It was a
right quote credited to the wrong mouth: an audience question, filed as if the
speaker had asserted it. It resolves, the words are exact, the video is correct,
and the speaker's name is real. Every existing check passes it. It reached TWO
entries (claims#12 and claims#16) because the bad source was copied, and the
second copy surfaced only because I grepped for it by hand afterwards.

The structural tell is the turn boundary. Plain transcripts mark a change of
speaker with '>>'. When a quote credited to the speaker sits a few sentences
BEFORE such a boundary, and the next turn opens with an answer, the words on the
near side of the boundary belong to whoever asked:

    ...As MAINTAINING A FACTORY WOULD REQUIRE YOU to have an overview of the
    processes... What tools do you use? How do you keep a mental map?
    >> Yeah, it's it's a really good question. I think it's somewhat unsolved...

That is a fact about the transcript, not a judgement about meaning — which is
why this check exists and two earlier candidates were built, measured, and
thrown away.

COVERAGE IS PARTIAL AND THE OUTPUT SAYS SO. Only about 40% of corpus
transcripts carry '>>' markers at all, and the marking is inconsistent even
within a talk: in the very case above there is NO marker between the question
and the preceding monologue, only after. A talk with no markers is invisible
here. Silence from this check is not evidence of correctness.

    python3 99_Meta/scripts/anchor/check_questioner_quotes.py
    python3 99_Meta/scripts/anchor/check_questioner_quotes.py --ledger claims-2
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
PLAIN = REPO / "99_Meta" / "transcripts" / "plain"

ANCHOR = re.compile(r"\*\*Anchor:\*\*\s*`([A-Za-z0-9_-]{11})`")
QUOTE = re.compile(r'\*\*Quote:\*\*\s*"(.+?)"\s*$')

# How far past the quote a turn boundary still counts. Set from the known case,
# where the boundary lands 143 characters out: roughly two sentences of trailing
# question. Widen it and ordinary mid-talk Q&A transitions start to land.
WINDOW = 300

# A turn holding only a bracketed stage direction is not somebody answering.
# '>> [laughter]' was the one false positive in validation.
NON_SPEECH = re.compile(r"^\s*\[[^\]]*\]\s*$")


def norm(text: str) -> str:
    """Collapse smart punctuation. Length-preserving, so offsets stay valid."""
    t = text.replace("’", "'").replace("‘", "'")
    t = t.replace("“", '"').replace("”", '"').replace("—", "-")
    return re.sub(r"\s+", " ", t).lower()


def questioner_hit(flat: str, quote: str) -> tuple[str, str, str] | None:
    """Return (lead, gap, next_turn) when the quote looks like the questioner's.

    `flat` is a whitespace-collapsed plain transcript. Returns None when the
    quote is absent, when the transcript carries no turn markers, or when the
    shape does not match. Pure, so the tests do not need the gitignored corpus.
    """
    if ">>" not in flat:
        return None
    i = norm(flat).find(norm(quote))
    if i < 0:
        return None
    end = i + len(quote)
    tail = flat[end:end + WINDOW]
    boundary = tail.find(">>")
    if boundary < 0:
        return None
    gap = tail[:boundary]
    nxt = flat[end + boundary + 2:end + boundary + 160]
    if NON_SPEECH.match(nxt.split(">>")[0]):
        return None
    # The questioner is asking. Without a question around the quote, every
    # quote that merely precedes a handover would be flagged.
    lead = flat[max(0, i - 200):i]
    if "?" not in gap and "?" not in lead[-120:]:
        return None
    return lead[-140:], gap, nxt


def pairs_from(ledger: Path) -> list[tuple[str, int, str, str]]:
    out: list[tuple[str, int, str, str]] = []
    entry, pending = "?", None
    for i, ln in enumerate(ledger.read_text().split("\n"), 1):
        m = re.match(r"^## (\d+)\)", ln)
        if m:
            entry = f"claims#{m.group(1)}"
            continue
        a = ANCHOR.search(ln)
        if a:
            pending = a.group(1)
            continue
        q = QUOTE.search(ln)
        if q and pending:
            out.append((entry, i, pending, q.group(1)))
            pending = None
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="claims")
    ap.add_argument("--strict", action="store_true", help="exit 1 if any hit")
    args = ap.parse_args()

    path = REPO / args.ledger
    if path.is_dir():
        path = path / "Claims Ledger.md"

    quotes = pairs_from(path)
    eligible = unlocated = no_markers = 0
    hits = []

    for entry, lineno, vid, quote in quotes:
        plain = PLAIN / f"{vid}.txt"
        if not plain.exists():
            continue
        flat = re.sub(r"\s+", " ", plain.read_text())
        if ">>" not in flat:
            no_markers += 1
            continue
        if norm(flat).find(norm(quote)) < 0:
            unlocated += 1
            continue
        eligible += 1

        found = questioner_hit(flat, quote)
        if found:
            hits.append((entry, lineno, vid, quote, *found))

    print(f"{args.ledger}: {len(hits)} quote(s) that look like the questioner "
          f"speaking, not the speaker\n")
    for entry, lineno, vid, quote, lead, gap, nxt in hits:
        print(f"  {entry} (L{lineno})  {vid}")
        print(f"    before: ...{lead}")
        print(f"    QUOTE:  {quote}")
        print(f"    after:  {gap}")
        print(f"    turn:   >> {nxt[:120]}\n")

    print(f"[coverage] {eligible} of {len(quotes)} quote(s) checked; "
          f"{no_markers} in transcripts with no '>>' turn markers, "
          f"{unlocated} not locatable in plain text.")
    if no_markers:
        print("[coverage] Unmarked transcripts cannot be checked at all. "
              "A clean run here does not mean the ledger has no misattributions.")
    return 1 if (hits and args.strict) else 0


if __name__ == "__main__":
    sys.exit(main())
