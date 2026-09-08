#!/usr/bin/env python3
"""Report whether a ledger's support levels match the evidence behind them.

"Support level" is the field a reader actually trusts. It is also the field that
silently goes stale: sources get dropped during an audit, and nobody revisits the
word "strong" sitting three lines above them. Book 1's claims#27 was rated strong
on four sources, two of which evidenced nothing.

The ledger has never written its rubric down. This does not invent one — it
measures what each book's own practice has been, so a drift between them is
visible:

    book 1   'strong' entries: median 3 sources,  8 of 51 below 3
    book 2   'strong' entries: median 2 sources, 13 of 21 below 3

Those are two different standards wearing the same word. Which is correct is an
editorial decision, not a script's, so this prints and never fails.

    python3 99_Meta/scripts/anchor/check_support_levels.py
    python3 99_Meta/scripts/anchor/check_support_levels.py --ledger claims-2
"""
from __future__ import annotations

import argparse
import re
import statistics
import sys
from collections import Counter
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]


def entries(path: Path) -> list[tuple[int, str, int, int]]:
    parts = re.split(r"(?m)^## (\d+)\) ", path.read_text())[1:]
    out = []
    for i in range(0, len(parts), 2):
        num, body = int(parts[i]), parts[i + 1]
        m = re.search(r"\*\*Support level:\*\*\s*(\w+)", body)
        out.append((
            num,
            m.group(1) if m else "unset",
            len(re.findall(r"^  - \[\[", body, re.M)),
            len(re.findall(r"\*\*Anchor:\*\*", body)),
        ))
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--ledger", default="claims")
    args = ap.parse_args()

    path = REPO / args.ledger
    if path.is_dir():
        path = path / "Claims Ledger.md"

    rows = entries(path)
    print(f"{args.ledger}: {len(rows)} entries")
    print(f"  levels: {dict(Counter(lvl for _, lvl, _, _ in rows))}\n")

    for level in sorted({lvl for _, lvl, _, _ in rows}):
        group = [(n, s) for n, lvl, s, _ in rows if lvl == level]
        counts = [s for _, s in group]
        print(f"  {level}: {len(group)} entries, "
              f"median {statistics.median(counts):.0f} source(s), "
              f"range {min(counts)}-{max(counts)}")

    thin = sorted((n, s) for n, lvl, s, _ in rows if lvl == "strong" and s < 3)
    if thin:
        print(f"\n  'strong' on fewer than 3 sources ({len(thin)}):")
        print("    " + ", ".join(f"claims#{n} ({s})" for n, s in thin))

    single = sorted((n, lvl) for n, lvl, s, _ in rows if s == 1)
    if single:
        print(f"\n  single-source entries ({len(single)}):")
        print("    " + ", ".join(f"claims#{n} [{lvl}]" for n, lvl in single))

    print("\nA count is not a rubric. Read the entry before re-rating it — one "
          "on-point\nsource can outweigh three adjacent ones.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
