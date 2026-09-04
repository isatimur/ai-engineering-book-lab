#!/usr/bin/env python3
"""Find ledger evidence that was true when spoken and may not be true now.

A source-anchored ledger has a blind spot that anchor verification cannot see: a
quote can resolve perfectly to its timestamp and still assert something that has
since stopped being true. "No one is doing this yet" is verifiably said, verifiably
anchored, and verifiably stale the moment somebody does it.

So this flags quotes whose CONTENT is pinned to a moment:

  novelty   "no one is doing it yet", "this is really new", "doesn't exist"
  currency  "today", "right now", "currently", "at the moment"
  trend     "becoming more", "increasingly", "starting to"
  version   named models and versions - GPT-4, o3, Claude 3, Gemini 2, v14
  numeric   prices, percentages, multipliers that a year moves

A flagged quote is NOT a defect. It is evidence with a shelf life, and the ledger
should say so where it has expired. Mark an expired one in place, directly under
its Quote line, and never by deleting it - the speaker did say it, the anchor stays
valid, and the book may cite it as a marker of when something was still new:

    - **Quote:** "... no one is doing it yet, which is training things into weights."
    - **Superseded (2026-09-04):** the novelty half no longer holds - #975 and #851
      show it running in production. Quote remains accurate as of its date; do not
      cite the novelty half as current.

This script then treats that entry as handled and stops reporting it. Exit code is
1 only when `--strict` is passed and unmarked time-bound evidence exists, so it can
gate CI later without failing the build today.

    python3 99_Meta/scripts/anchor/check_time_bound_evidence.py
    python3 99_Meta/scripts/anchor/check_time_bound_evidence.py --ledger claims-2
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]

PATTERNS = {
    "novelty": (
        r"\b(no one|nobody)\b[^.]{0,40}\b(is |are |has |have )?(doing|does|done|built|building)\b"
        r"|\bnot yet\b|\bnobody'?s (doing|building|built|done|shipped)\b"
        r"|\bdoesn't exist\b|\bdon't exist\b"
        r"|\breally new\b|\bbrand new\b|\bfirst time (anyone|someone)\b|\bno one has\b"
    ),
    "currency": r"\btoday\b|\bright now\b|\bcurrently\b|\bat the moment\b|\bthese days\b|\bas of now\b",
    "trend": r"\bbecoming more\b|\bmore and more\b|\bincreasingly\b|\bstarting to\b|\bbeginning to\b",
    "version": r"\bGPT-?\d|\bo[134]\b|\bClaude \d|\bGemini \d|\bLlama ?\d|\bdavinci\b|\bv\d+\b",
    "numeric": r"\$\s?\d|\b\d{1,3}%|\b\d+x\b|\bper (million|token|thousand)\b",
}

# Ordered by how fast the thing decays. Novelty dies the instant someone ships it;
# a percentage merely drifts. Reporting in this order puts the sharpest first.
SEVERITY = ["novelty", "version", "trend", "currency", "numeric"]

# Speech-act framing: the speaker dating their own talk, not the state of the field.
_SPEECH_ACT = (r"\b(talk|speak|tell|show|present|discuss|declar\w+|share|walk)\b[^.]{0,40}\btoday\b"
               r"|\btoday\b[^.]{0,20}\b(I'?m|we'?re|I will|we will)\b")

ap = argparse.ArgumentParser()
ap.add_argument("--ledger", default="claims", help="ledger dir (claims | claims-2)")
ap.add_argument("--strict", action="store_true",
                help="exit 1 if unmarked time-bound evidence exists")
a = ap.parse_args()

path = REPO / a.ledger / "Claims Ledger.md"
lines = path.read_text().split("\n")

entry = "?"
findings: list[tuple[str, str, str, bool]] = []
for i, ln in enumerate(lines):
    m = re.match(r"^## (\d+)\)", ln)
    if m:
        entry = f"claims#{m.group(1)}"
        continue
    q = re.search(r'\*\*Quote:\*\* "(.*?)"', ln)
    if not q:
        continue
    text = q.group(1)
    kinds = [k for k in SEVERITY if re.search(PATTERNS[k], text, re.I)]
    # "today" attached to the speech act ("I'm going to talk to you today",
    # "I'm declaring war on slop today") dates the TALK, not a claim about the
    # world, and never decays. Only "today" used to describe how things currently
    # are can go stale.
    if kinds == ["currency"] and re.search(_SPEECH_ACT, text, re.I):
        continue
    if not kinds:
        continue
    # Marked if a Superseded note follows before the next quote or source.
    marked = False
    for nxt in lines[i + 1:i + 4]:
        if "**Superseded" in nxt:
            marked = True
            break
        if "**Quote:**" in nxt or nxt.startswith("  - [["):
            break
    findings.append((entry, kinds[0], text, marked))

unmarked = [f for f in findings if not f[3]]
marked = [f for f in findings if f[3]]
print(f"{a.ledger}: {len(findings)} time-bound quote(s) — "
      f"{len(marked)} marked superseded, {len(unmarked)} unmarked\n")

for kind in SEVERITY:
    group = [f for f in unmarked if f[1] == kind]
    if not group:
        continue
    print(f"--- {kind} ({len(group)})")
    for e, _, t, _ in group:
        print(f"  {e:<11} {t[:112]}")
    print()

if marked:
    print("--- already marked superseded")
    for e, k, t, _ in marked:
        print(f"  {e:<11} [{k}] {t[:96]}")

print("\nA flag is evidence with a shelf life, not a defect. Check whether the "
      "newer corpus\nhas overtaken it; if so mark it in place, never by deleting.")
sys.exit(1 if (a.strict and unmarked) else 0)
