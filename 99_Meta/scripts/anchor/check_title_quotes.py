#!/usr/bin/env python3
"""Find talk titles printed as if someone said them.

Four of these have now been caught one at a time, each by a different route:
Hetzel (fabricated outright), Jack Morris and Matt Carey (found in an attributed-
quote audit), Dax Raad (found by the claim_defensibility judge). Four by four
routes means the pattern is systematic, so this checks all of them at once.

The failure is specific. Conference talk titles are frequently written by an
editor, not the speaker, and are often not said on stage at all. Printing one in
quote marks after a name claims the speaker uttered it. Under this book's own
standard that is unanchorable, even though the words are "real".

A title is only a problem when the prose puts it in QUOTE MARKS. The book handles
several correctly - "Their talk, titled *The Friction Is Your Judgment*" and
"Matt Carey's talk title names the trap precisely" - and those must not be flagged.

LIMIT - a hit is a CANDIDATE, never a verdict. subseq_match compares tokens for
exact equality, so a morphological variant breaks it: the book prints "building
your own software factory" while Zakariasson says "build your own like software
factory". That surfaced as a finding and is not one - the phrase is his, said on
stage, twice, in that sense. Read every hit against the transcript before calling
it a defect. Absence from a mechanical match has manufactured a false finding in
this project more than once.

    python3 99_Meta/scripts/anchor/check_title_quotes.py
    python3 99_Meta/scripts/anchor/check_title_quotes.py --glob 'public/drafting-2/*.md'
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

ap = argparse.ArgumentParser()
ap.add_argument("--glob", default="public/drafting/Chapter *.md")
ap.add_argument("--min-words", type=int, default=3)
a = ap.parse_args()

# 001-<videoid>-<slugified title>.md  -> the slug is the title, lowercased+hyphenated.
titles: dict[str, str] = {}
for p in VIDEOS.glob("*.md"):
    m = re.match(r"^\d+-([A-Za-z0-9_-]{11})-(.+)$", p.stem)
    if m:
        titles[m.group(2).replace("-", " ")] = m.group(1)
print(f"{len(titles)} talk titles · ", end="", flush=True)

corpus = {p.stem: norm(p.read_text(errors="ignore")).split()
          for p in PLAIN.iterdir() if p.is_file()}
print(f"{len(corpus)} transcripts\n")

findings = 0
for f in sorted(REPO.glob(a.glob)):
    text = f.read_text()
    for q in re.findall(r'[“"]([^”"\n]{8,200})[”"]', text):
        toks = norm(q).split()
        if len(toks) < a.min_words:
            continue
        # Does this quoted span match a talk title?
        hit = next((vid for t, vid in titles.items()
                    if subseq_match(toks, norm(t).split(), max_gap=2)), None)
        if not hit:
            continue
        # A title the speaker DID say on stage is a normal quote, not a defect.
        if any(subseq_match(toks, body) for body in corpus.values()):
            continue
        findings += 1
        print(f"  {f.name}\n    quoted: {q!r}\n    matches title of {hit}, "
              f"and is in NO transcript\n")

print(f"{findings} quoted span(s) that are talk titles nobody said on stage")
sys.exit(0)
