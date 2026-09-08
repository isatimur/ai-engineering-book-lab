#!/usr/bin/env python3
"""Rank ledger anchors by how early in the talk they sit. A triage tool.

This is NOT a defect detector and it does not vote. It answers one question:
where should a human read first?

The 2026-09-09 re-run of a lost audit batch found seven mis-filed sources, and
six of them were anchored in the first ninety seconds of a talk. That is not a
coincidence about those talks — it is a fact about how the ledger was built.
Harvesting an anchor from the opening of a transcript lands on the part where
speakers say what they are ABOUT to argue, before they argue it. Agenda lines,
topic labels and pain-point hooks all live there.

Measured against the batch-3 defects on the pre-fix ledger:

    < 60s   26 of 245 anchors (11%)   4 of 7 defects
    < 90s   36 of 245 anchors (15%)   6 of 7 defects
    <120s   45 of 245 anchors (18%)   6 of 7 defects

So ninety seconds buys roughly four times the defect density per entry read.

An early anchor is not wrong. Plenty of speakers state their thesis in the first
minute and mean it, and the ledger deliberately uses some of those. Read them.

    python3 99_Meta/scripts/anchor/rank_early_anchors.py
    python3 99_Meta/scripts/anchor/rank_early_anchors.py --ledger claims-2 --cutoff 90
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
ANCHOR = re.compile(r"\*\*Anchor:\*\* `([A-Za-z0-9_-]{11})` ([0-9:.]+)")
QUOTE = re.compile(r'\*\*Quote:\*\*\s*"(.+?)"\s*$')


def seconds(stamp: str) -> float:
    h, m, s = stamp.split(":")
    return int(h) * 3600 + int(m) * 60 + float(s)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="claims")
    ap.add_argument("--cutoff", type=float, default=90.0,
                    help="seconds; anchors before this are listed (default 90)")
    args = ap.parse_args()

    path = REPO / args.ledger
    if path.is_dir():
        path = path / "Claims Ledger.md"

    rows, entry, pending = [], "?", None
    for i, ln in enumerate(path.read_text().split("\n"), 1):
        h = re.match(r"^## (\d+)\)", ln)
        if h:
            entry = f"claims#{h.group(1)}"
            continue
        a = ANCHOR.search(ln)
        if a:
            pending = (entry, i, a.group(1), seconds(a.group(2)))
            continue
        q = QUOTE.search(ln)
        if q and pending:
            rows.append((*pending, q.group(1)))
            pending = None

    early = sorted((r for r in rows if r[3] < args.cutoff), key=lambda r: r[3])
    pct = 100 * len(early) / len(rows) if rows else 0
    print(f"{args.ledger}: {len(early)} of {len(rows)} anchors ({pct:.0f}%) "
          f"land in the first {args.cutoff:.0f}s\n")
    for ent, lineno, vid, t, quote in early:
        print(f"  {t:6.1f}s  {ent:<11} L{lineno:<5} {vid}")
        print(f"          {quote[:104]}")

    print(f"\nRead these first. An early anchor is a place to look, not a verdict — "
          f"speakers do\nsometimes state their thesis in the opening minute and mean it.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
