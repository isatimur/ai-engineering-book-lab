#!/usr/bin/env python3
"""Is each quoted span credited to the person who actually said it?

verify_prose_quotes.py answers "are these words in the corpus". That leaves the
other half of the promise untested: a span can be verbatim in some transcript and
still be credited to the wrong speaker. Book 1's quotations were checked by hand
on 2026-09-02 (77 matched, 0 misattributed); nothing checked book 2, and nothing
made the check repeatable. This does both.

Method: for every quoted span, find which transcripts contain it, then read the
speaker straight off those video filenames - `NNN-<videoid>-<title-speaker-org>`
already encodes the name. No name parsing is needed, because the question is only
whether the name the prose credits appears in the matching video's slug. If the
prose says "X says" and X is absent from every transcript the words were found in,
that is a misattribution candidate.

LIMITS - candidates, not verdicts:
  * A speaker quoting a THIRD party is correct prose and will flag here. The book
    does this deliberately (Rogut relaying Jeff Dean, Zakariasson citing Dan
    Shapiro), so read the context before acting.
  * Common surnames may coincide with an unrelated slug word.
  * Only spans matched in some transcript are checked. Unmatched spans are
    verify_prose_quotes.py's job.

    python3 99_Meta/scripts/anchor/check_quote_speakers.py
    python3 99_Meta/scripts/anchor/check_quote_speakers.py --glob 'public/drafting-2/*.md'
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from verify_prose_quotes import norm, subseq_match  # noqa: E402

REPO = Path(__file__).resolve().parents[3]
PLAIN = REPO / "99_Meta" / "transcripts" / "plain"
VIDEOS = REPO / "01_Videos"

# "Name says", "Name's phrase", "says Name", "(Name, Org)" - the shapes the book uses.
LEAD = re.compile(
    r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z'’]+){0,2})(?:'s|’s)?\s+"
    r"(?:says?|said|puts?|put|insists?|argues?|notes?|noted|calls?|describes?|"
    r"reports?|observes?|warns?|frames?|adds?|tells?|explains?|states?)\b"
)
TRAILING = re.compile(r"\bsays\s+([A-Z][a-z]+(?:\s+[A-Z][a-z'’]+){0,2})")
# "Matt Carey's phrase ... lands", "Hetzel's framing puts it" - a possessive plus a
# noun before the verb. Without this the span is skipped entirely rather than
# checked, because a span with no credited name is never examined at all.
POSSESSIVE = re.compile(
    r"\b([A-Z][a-z]+(?:\s+[A-Z][a-z'’]+){0,2})(?:'s|’s)\s+"
    r"(?:\w+\s+){1,2}"
    r"(?:says?|said|puts?|put|insists?|argues?|notes?|noted|calls?|describes?|"
    r"reports?|observes?|warns?|frames?|adds?|tells?|explains?|states?|lands?)\b"
)

PAREN = re.compile(r"\(([A-Z][a-z]+(?:\s+[A-Z][a-z'’]+){0,2})\s*(?:,|\))")

# Words that look like surnames but are org/role nouns in these slugs.
# Any capitalised multi-word name-shaped token run, used to widen the window.
ALL_NAMES = re.compile(r"\b([A-Z][a-z]+\s+[A-Z][a-z'\u2019]+)\b")

IGNORE = {"The", "This", "That", "And", "But", "For", "One", "His", "Her", "Their",
          "Every", "Most", "Both", "When", "While", "What", "How", "Why", "Here"}

def credited_names(lead: str, tail: str) -> list[str]:
    """Names the prose credits near a quote, nearest last."""
    names = (LEAD.findall(lead) + POSSESSIVE.findall(lead)
             + TRAILING.findall(tail) + PAREN.findall(tail))
    return [n for n in names if n.split()[0] not in IGNORE]


def attribution_holds(lead: str, tail: str, matched_slugs: list[str]) -> bool:
    """True if any name near the quote belongs to a talk the words were found in.

    A sentence often credits TWO speakers, one quote each: "Chowdhery describes X,
    and Leonard Tang at Haize Labs has Y". Picking the nearest attribution verb
    credits the wrong one, because "Tang at Haize Labs has" matches no verb
    pattern. So this passes when ANY name in the window matches, which keeps the
    check a candidate generator rather than a false-positive mill.
    """
    window = credited_names(lead, tail) + [
        n for n in ALL_NAMES.findall(lead) if n.split()[0] not in IGNORE
    ]
    return any(n.split()[-1].lower() in sl for n in window for sl in matched_slugs)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--glob", default="public/drafting/Chapter *.md")
    ap.add_argument("--min-words", type=int, default=4)
    a = ap.parse_args()

    slug = {}
    for p in VIDEOS.glob("*.md"):
        m = re.match(r"^\d+-([A-Za-z0-9_-]{11})-(.+)$", p.stem)
        if m:
            slug[m.group(1)] = m.group(2).replace("-", " ").lower()

    corpus = {p.stem: norm(p.read_text(errors="ignore")).split()
              for p in PLAIN.iterdir() if p.is_file()}
    print(f"{len(corpus)} transcripts · {len(slug)} video slugs\n")

    checked = flagged = 0
    for f in sorted(REPO.glob(a.glob)):
        text = f.read_text()
        for m in re.finditer(r'[“"]([^”"\n]{20,300})[”"]', text):
            q = m.group(1)
            # Elided quotes: every fragment must land in the SAME transcript.
            frags = [norm(x).split() for x in re.split(r"\s*(?:\.\.\.|…)\s*", q)]
            frags = [t for t in frags if len(t) >= a.min_words]
            if not frags:
                continue
            where = [vid for vid, body in corpus.items()
                     if all(subseq_match(t, body) for t in frags)]
            if not where:
                continue  # unmatched spans belong to verify_prose_quotes
            checked += 1

            lead = text[max(0, m.start() - 260):m.start()]
            tail = text[m.end():m.end() + 90]
            names = credited_names(lead, tail)
            if not names:
                continue
            if attribution_holds(lead, tail, [slug.get(v, "") for v in where]):
                continue
            credited = names[-1]
            surname = credited.split()[-1].lower()
            flagged += 1
            print(f"  {f.name}\n    credited to : {credited!r} (surname {surname!r})")
            print(f"    words found in: {[slug.get(v, v)[:64] for v in where[:2]]}")
            print(f"    quote: {q[:110]!r}\n")

    print(f"{checked} attributed+matched span(s) checked · {flagged} misattribution candidate(s)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
