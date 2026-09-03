#!/usr/bin/env python3
"""Stage 2 of claim_defensibility: are the judge's unbacked spans in the corpus at all?

The judge answers one question - "the ledger does not carry this". That splits into
two very different cases, and only a transcript search tells them apart:

  * in the corpus, but not in the ledger's excerpts -> prose elaborating on a source
    the ledger already lists. Fine. A ledger carries representative quotes.
  * in no transcript anywhere -> the fabricated-quote class, the same shape as the
    "an eval platform is not just a test runner" line falsely put in Hetzel's mouth.
    A ship-blocker when the span is presented as someone's words.

Uses verify_prose_quotes' own gap-tolerant subsequence matcher rather than a fresh
grep. Exact substring matching fails on ASR stutters: the Factory transcript reads
"serial execution with with targeted internal parallelization" and the book rightly
prints it once. A naive search calls that a fabrication. It is the opposite - the
book is more accurate than the source it is checked against.

Spans under --min-words are reported separately as "too short", NOT as clean.
They still need a human. In the 09-03 run the highest-severity flag of all - a
bare speaker name, "Matt Carey", scored 35 - landed in that bucket, because the
spans most worth checking are often the shortest.

    python3 scripts/check_spans.py --run agent-54c7-...
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO / "99_Meta" / "scripts" / "anchor"))
from verify_prose_quotes import norm, subseq_match  # noqa: E402

PLAIN = REPO / "99_Meta" / "transcripts" / "plain"

ap = argparse.ArgumentParser()
ap.add_argument("--run", required=True)
ap.add_argument("--min-words", type=int, default=4,
                help="spans shorter than this are too generic to search meaningfully")
a = ap.parse_args()

run_dir = REPO / ".mash-agent-runs" / a.run
rows = []
for f in sorted((run_dir / "judgments").glob("batch-*.json")):
    rows.extend(json.loads(f.read_text())["rows"])

flagged = [(r["unit_id"], r["score_0_100"], s)
           for r in rows for s in r.get("unbacked_specifics", [])]
print(f"{len(rows)} judgments · {len(flagged)} flagged spans "
      f"across {len({u for u, _, _ in flagged})} paragraphs\n")
if not flagged:
    sys.exit(0)

print(f"loading transcripts from {PLAIN}…", flush=True)
corpus = {p.stem: norm(p.read_text(errors="ignore")).split()
          for p in PLAIN.iterdir() if p.is_file()}
print(f"{len(corpus)} transcripts\n")

absent, present, short = [], [], []
for uid, score, span in flagged:
    # Elided spans ("A ... B") can never match as one run of tokens; each fragment
    # must appear, which is exactly what the elision asserts.
    frags = [x.strip() for x in re.split(r"\s*(?:\.\.\.|…)\s*", span)]
    toks = [norm(x).split() for x in frags]
    toks = [t for t in toks if len(t) >= a.min_words]
    if not toks:
        short.append((uid, score, span))
        continue
    where = [k for k, body in corpus.items()
             if all(subseq_match(t, body) for t in toks)]
    (present if where else absent).append((uid, score, span, where[:2]))

print(f"IN CORPUS      {len(present)}   (elaboration on a listed source - not a defect)")
print(f"NOT IN CORPUS  {len(absent)}   <- read every one of these")
print(f"too short      {len(short)}   (under {a.min_words} words, not searchable)\n")

for uid, score, span, _ in sorted(absent, key=lambda x: x[0]):
    print(f"  [{score:5.1f}] {uid}\n           {span!r}")
if short:
    print("\n-- too short to search --")
    for uid, score, span in short:
        print(f"  [{score:5.1f}] {uid}  {span!r}")
