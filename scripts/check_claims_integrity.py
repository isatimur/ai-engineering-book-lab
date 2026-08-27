#!/usr/bin/env python3
"""One command for every quote-fidelity check, across both books.

Four separate invocations existed (ledger + prose, times two books). A check
that needs four commands and a memory of their flags is a check that stops
getting run, so this is the single entry point.

    python3 scripts/check_claims_integrity.py            # all four
    python3 scripts/check_claims_integrity.py --book 1   # just book 1
    python3 scripts/check_claims_integrity.py --strict   # prose misses fail too

MUST RUN LOCALLY: transcripts are gitignored, so in CI every check would pass
vacuously against an empty directory. See docs/ONGOING_SYNC_AND_JUDGING.md.

Exit 1 if any ANCHOR fails to resolve — that is a hard defect. Prose misses are
reported but do not fail by default: a chapter legitimately differs from an ASR
transcript (the book prints "GPT-4" where the transcript has "GPD 4"), so prose
output is a reading list, not a gate. --strict overrides that.
"""
from __future__ import annotations

import argparse
import subprocess
import sys
from pathlib import Path

_REPO = Path(__file__).resolve().parents[1]
_ANCHOR_DIR = _REPO / "99_Meta" / "scripts" / "anchor"

BOOKS = {
    "1": {"ledger": "claims/Claims Ledger.md", "glob": "public/drafting/Chapter *.md"},
    "2": {"ledger": "claims-2/Claims Ledger.md", "glob": "public/drafting-2/*.md"},
}


def run(script: str, *args: str) -> tuple[int, str]:
    p = subprocess.run(
        [sys.executable, script, *args],
        cwd=_ANCHOR_DIR, capture_output=True, text=True,
    )
    return p.returncode, p.stdout + p.stderr


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--book", choices=["1", "2"], default=None)
    ap.add_argument("--strict", action="store_true",
                    help="also fail on unmatched prose quotes")
    args = ap.parse_args()

    books = [args.book] if args.book else ["1", "2"]
    anchor_fail = False
    prose_misses = 0
    summary: list[str] = []

    for b in books:
        cfg = BOOKS[b]
        print(f"\n{'=' * 62}\nBOOK {b} — anchors\n{'=' * 62}")
        rc, out = run("verify_ledger.py", "--ledger", cfg["ledger"], "--quiet")
        print(out.rstrip())
        resolved = next((l for l in out.splitlines() if "resolved" in l), "")
        summary.append(f"book {b} anchors: {resolved.replace('[verify] ', '') or 'see above'}")
        if rc != 0:
            anchor_fail = True

        print(f"\n{'=' * 62}\nBOOK {b} — prose quotes\n{'=' * 62}")
        rc2, out2 = run("verify_prose_quotes.py", "--glob", cfg["glob"])
        print(out2.rstrip())
        vb = next((l for l in out2.splitlines() if "verbatim in a transcript" in l), "")
        summary.append(f"book {b} prose:   {vb.replace('[prose] ', '') or 'see above'}")
        for line in out2.splitlines():
            if line.startswith("UNMATCHED"):
                try:
                    prose_misses += int(line.split("(")[1].split(")")[0])
                except (IndexError, ValueError):
                    pass

    print(f"\n{'=' * 62}\nSUMMARY\n{'=' * 62}")
    for s in summary:
        print(f"  {s}")

    if anchor_fail:
        print("\nFAIL — an anchor does not resolve to its quote. That is a hard defect.")
        return 1
    print("\nAll anchors resolve.")
    if prose_misses:
        print(f"{prose_misses} prose span(s) unmatched — review, not necessarily defects "
              "(talk titles, author framing, and ASR corrections all land here).")
        if args.strict:
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
