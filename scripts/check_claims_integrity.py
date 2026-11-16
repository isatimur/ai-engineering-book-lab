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

Exit 2 if any check CRASHES (traceback or unexpected exit code): a check that
did not run is not a pass. Crash outranks everything below.
Exit 1 if any ANCHOR fails to resolve — that is a hard defect. Prose misses are
reported but do not fail by default: a chapter legitimately differs from an ASR
transcript (the book prints "GPT-4" where the transcript has "GPD 4"), so prose
output is a reading list, not a gate. --strict overrides that.
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path

_REPO = Path(__file__).resolve().parents[1]
_ANCHOR_DIR = _REPO / "99_Meta" / "scripts" / "anchor"

ALL_VERIFIERS = ["verify_ledger.py", "verify_artifact_anchors.py"]

BOOKS = {
    "1": {"ledger": "claims/Claims Ledger.md", "glob": "public/drafting/Chapter *.md",
          "verifier": list(ALL_VERIFIERS)},
    "2": {"ledger": "claims-2/Claims Ledger.md", "glob": "public/drafting-2/*.md",
          "verifier": list(ALL_VERIFIERS)},
    "3": {"ledger": "claims-3/Claims Ledger.md", "glob": "public/drafting-3/*.md",
          "verifier": list(ALL_VERIFIERS)},
}

# EVERY book runs EVERY verifier. Each one reads one anchor kind and is blind
# to the other: verify_ledger.py matches `**Anchor:**` + `**Quote:**`,
# verify_artifact_anchors.py matches `artifact anchor:`. A verifier that cannot
# parse an anchor reports "0 pairs, PASS" — so giving a book one verifier left
# the other kind checked by NOTHING, with a green tick. Book 3 cites talks as
# well as repository incidents (ADR-0003), and books 1 and 2 may carry an
# Artifact anchor, so neither direction of that hole may stay open.
# Value: (script path, working directory, builder of CLI args from the ledger path).
VERIFIERS = {
    "verify_ledger.py": (
        _ANCHOR_DIR / "verify_ledger.py", _ANCHOR_DIR,
        lambda ledger: ["--ledger", ledger, "--quiet"],
    ),
    "verify_artifact_anchors.py": (
        _REPO / "scripts" / "verify_artifact_anchors.py", _REPO,
        lambda ledger: ["--ledger", ledger, "--repo", "."],
    ),
}


def run(script: str, *args: str) -> tuple[int, str]:
    p = subprocess.run(
        [sys.executable, script, *args],
        cwd=_ANCHOR_DIR, capture_output=True, text=True,
    )
    return p.returncode, p.stdout + p.stderr


_UNVERIFIABLE_RE = re.compile(r"(\d+)\s+unverifiable")


def count_unverifiable(out: str) -> int:
    """How many anchors the artifact verifier could not check at all.

    ADR-0003 forbids `unverifiable` from reading as a pass. The verifier exits
    0 on it, so without this the summary printed "All anchors resolve." over
    evidence nobody had read.
    """
    m = _UNVERIFIABLE_RE.search(out)
    return int(m.group(1)) if m else 0


def run_verifier(name: str, ledger: str) -> tuple[int, str]:
    script, cwd, build_args = VERIFIERS[name]
    p = subprocess.run(
        [sys.executable, str(script), *build_args(ledger)],
        cwd=cwd, capture_output=True, text=True,
    )
    return p.returncode, p.stdout + p.stderr


def crashed(rc: int, out: str, *, ok_codes: tuple[int, ...]) -> bool:
    """True when a check died instead of reporting a verdict.

    A crash and a real failure both exit 1 under Python, so the traceback is
    the tell. Any exit code outside `ok_codes` also counts: the verifiers use 1
    for "anchor does not resolve" and 2 for environment errors; the prose check
    runs with no ceiling, so for it only 0 is a verdict.
    """
    return "Traceback (most recent call last)" in out or rc not in ok_codes


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--book", choices=["1", "2", "3"], default=None)
    ap.add_argument("--strict", action="store_true",
                    help="also fail on unmatched prose quotes")
    args = ap.parse_args()

    books = [args.book] if args.book else ["1", "2", "3"]
    anchor_fail = False
    crashes: list[str] = []
    unverifiable = 0
    prose_misses = 0
    summary: list[str] = []

    for b in books:
        cfg = BOOKS[b]
        for verifier in cfg["verifier"]:
            print(f"\n{'=' * 62}\nBOOK {b} — anchors ({verifier})\n{'=' * 62}")
            rc, out = run_verifier(verifier, cfg["ledger"])
            print(out.rstrip())
            resolved = next(
                (ln for ln in out.splitlines() if "resolved" in ln or "checked" in ln), "")
            summary.append(
                f"book {b} anchors ({verifier}): "
                f"{resolved.replace('[verify] ', '') or 'see above'}")
            unverifiable += count_unverifiable(out)
            if crashed(rc, out, ok_codes=(0, 1)):
                crashes.append(f"book {b} anchors ({verifier}) exit {rc}")
            elif rc != 0:
                anchor_fail = True

        print(f"\n{'=' * 62}\nBOOK {b} — prose quotes\n{'=' * 62}")
        rc2, out2 = run("verify_prose_quotes.py", "--glob", cfg["glob"])
        print(out2.rstrip())
        if crashed(rc2, out2, ok_codes=(0,)):
            crashes.append(f"book {b} prose quotes exit {rc2}")
        vb = next((ln for ln in out2.splitlines() if "verbatim in a transcript" in ln), "")
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

    if unverifiable:
        print(f"  {unverifiable} anchor(s) UNVERIFIABLE — evidence gone or history "
              f"incomplete. Not a pass (ADR-0003).")

    if crashes:
        print("\nCRASHED — a check died without giving a verdict, so nothing here is a pass:")
        for c in crashes:
            print(f"  {c}")
        return 2
    if anchor_fail:
        print("\nFAIL — an anchor does not resolve to its quote. That is a hard defect.")
        return 1
    if unverifiable:
        print(f"\nEvery anchor that COULD be checked resolves. {unverifiable} could not "
              f"be checked at all — read the list above before calling this clean.")
    else:
        print("\nAll anchors resolve.")
    if prose_misses:
        print(f"{prose_misses} prose span(s) unmatched — review, not necessarily defects "
              "(talk titles, author framing, and ASR corrections all land here).")
        if args.strict:
            return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
