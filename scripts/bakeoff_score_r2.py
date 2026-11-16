#!/usr/bin/env python3
"""Score one round-2 bake-off arm. Mechanical, as in round 1.

M1 works         — a seeded artifact-anchor claim produces an evidence row
M2 no regression — books 1 and 2 evidence stay byte-identical
M7 one reader    — does it reuse parse_anchors, or write a third parser?

M3 (pinned) needs the arm's own diff and is reported as a command, not guessed.

Usage:
    python3 scripts/bakeoff_score_r2.py --repo <worktree>
"""

from __future__ import annotations

import argparse
import hashlib
import json
import shutil
import subprocess
import sys
from pathlib import Path

BUILD = "99_Meta/scripts/anchor/build_evidence.py"
LEDGER3 = "claims-3/Claims Ledger.md"

# A claim in the repo's canonical shape, carrying one artifact anchor whose
# ref is resolvable in any clone: the empty-tree hash is present in every repo.
SEED = """
## 99) Seeded for the bake-off harness
- **Why it matters:** exists only so the scorer can tell whether artifact
  anchors reach the evidence file.
- **Support level:** moderate
- **Supporting sources:**
  - The repository itself.
    - **Artifact anchor:**
    - kind: file
    - ref: README.md
    - date: 2026-11-16
    - excerpt: bakeoff-harness-seed
- **Candidate chapters:** 1
"""


def sha(p: Path) -> str:
    return hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else "absent"


def run(repo: Path, *args: str) -> tuple[int, str]:
    try:
        p = subprocess.run([sys.executable, BUILD, *args], cwd=repo,
                           capture_output=True, text=True, timeout=900)
        return p.returncode, p.stdout + p.stderr
    except (subprocess.TimeoutExpired, OSError) as exc:
        return 99, str(exc)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", required=True, type=Path)
    a = ap.parse_args()
    repo = a.repo.resolve()

    if not (repo / BUILD).exists():
        print(f"not a usable worktree: {repo}")
        return 2

    # M2 first, on the untouched tree, so it cannot be contaminated by the seed.
    ev1, ev2 = repo / "website/src/evidence.json", repo / "website/src/evidence-2.json"
    before = (sha(ev1), sha(ev2))
    run(repo, "--ledger", "claims/Claims Ledger.md", "--out", "website/src/evidence.json")
    run(repo, "--ledger", "claims-2/Claims Ledger.md", "--out", "website/src/evidence-2.json")
    after = (sha(ev1), sha(ev2))
    m2 = before == after
    if not m2:  # leave the tree as we found it
        subprocess.run(["git", "checkout", "--", "website/src/evidence.json",
                        "website/src/evidence-2.json"], cwd=repo, capture_output=True)

    # M1: seed a claim with an artifact anchor, rebuild book 3's evidence.
    ledger = repo / LEDGER3
    backup = ledger.with_suffix(".md.bakeoff-backup")
    shutil.copy2(ledger, backup)
    out3 = repo / "website/src/evidence-3.json"
    out3_before = out3.read_text() if out3.exists() else None
    try:
        ledger.write_text(ledger.read_text() + SEED)
        rc, log = run(repo, "--ledger", LEDGER3, "--out", "website/src/evidence-3.json")
        rows = 0
        if out3.exists():
            try:
                data = json.loads(out3.read_text())
                rows = sum(len(v) for v in data.values()) if isinstance(data, dict) else 0
            except json.JSONDecodeError:
                rows = -1
        m1 = rows > 0
    finally:
        shutil.move(str(backup), str(ledger))
        if out3_before is None:
            out3.unlink(missing_ok=True)
        else:
            out3.write_text(out3_before)

    # M7: one grammar, one reader.
    src = (repo / BUILD).read_text()
    reuses = "verify_artifact_anchors" in src or "parse_anchors" in src
    own_header_re = "Artifact anchor" in src and not reuses

    print(f"  M1 seeded artifact claim reaches evidence : {'PASS' if m1 else 'FAIL'}  ({rows} rows, rc {rc})")
    print(f"  M2 books 1+2 evidence byte-identical      : {'PASS' if m2 else 'FAIL'}")
    print(f"  M7 reuses the existing anchor parser      : {'PASS' if reuses else 'FAIL'}"
          f"{'  <-- wrote a third parser for the same grammar' if own_header_re else ''}")
    print()
    print("  M3 (pinned): revert the arm's source hunk, keep its tests, re-run them.")
    return 0 if (m1 and m2) else 1


if __name__ == "__main__":
    raise SystemExit(main())
