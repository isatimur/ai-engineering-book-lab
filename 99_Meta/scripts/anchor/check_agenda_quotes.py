#!/usr/bin/env python3
"""Find ledger quotes that announce a talk instead of making its argument.

The 2026-09-04 audit found six mis-filed sources by reading 41 entries against
their transcripts. Most of that class is invisible to any regex — a quote can be
on a completely different subject and still share the claim's vocabulary. But one
subclass IS mechanical: the speaker's own agenda line.

    "I'm going to talk to you today about how I believe AI is breaking how we
     hire technically."

That passes every automated check — real speaker, exact words, resolving anchor —
while carrying no evidence at all. It states that a subject will be addressed. One
of the six mis-filings was exactly this shape, and the reviewer noticed four more
sitting in entries it had not been asked about.

A hit is a CANDIDATE. An agenda line can be the honest choice when the claim is
about what a talk argues rather than a fact in the world, and the ledger sometimes
uses one deliberately to name a source's thesis. Read it before acting.

    python3 99_Meta/scripts/anchor/check_agenda_quotes.py
    python3 99_Meta/scripts/anchor/check_agenda_quotes.py --ledger claims-2
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

# The speaker declaring their own topic, in the first person.
OPENER = re.compile(
    r"^\s*(i'?m going to|i am going to|i will|i'?d like to|i want to|today i|"
    r"let me (talk|show|walk)|we'?re going to talk|my talk|i'?m here to|"
    r"this talk is called|what i'?m going to)", re.I)

# Or a speech-act verb bound to the talk's own occasion.
BOUND = re.compile(
    r"\b(talk|speak|share|show|present|discuss|argue|make the case|walk)\b"
    r"[^.]{0,34}\b(today|about how|to you|with you)\b", re.I)

ap = argparse.ArgumentParser()
ap.add_argument("--ledger", default="claims")
ap.add_argument("--strict", action="store_true", help="exit 1 if any hit")
a = ap.parse_args()

path = REPO / a.ledger / "Claims Ledger.md"
entry, hits = "?", []
for i, ln in enumerate(path.read_text().split("\n"), 1):
    m = re.match(r"^## (\d+)\)", ln)
    if m:
        entry = f"claims#{m.group(1)}"
        continue
    q = re.search(r'\*\*Quote:\*\* "(.*?)"', ln)
    if q and (OPENER.match(q.group(1)) or BOUND.search(q.group(1))):
        hits.append((entry, i, q.group(1)))

print(f"{a.ledger}: {len(hits)} quote(s) that announce rather than argue\n")
for e, ln, t in hits:
    print(f"  {e:<11} L{ln:<5} {t[:104]}")
if hits:
    print("\nCandidates, not verdicts: naming a source's thesis can be the honest\n"
          "choice. Read each against its claim before replacing it.")
sys.exit(1 if (a.strict and hits) else 0)
