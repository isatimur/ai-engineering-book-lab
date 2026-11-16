#!/usr/bin/env python3
"""Score one bake-off arm on M1-M3. Mechanical, so no arm is judged by taste.

M1 does it work   — with a crashing sub-check, the runner must exit non-zero
M2 does it over-fire — on a healthy repo, the runner must still exit 0
M3 is it pinned   — revert the fix and a test must go red

M1 and M2 are run here. M3 needs the arm's own diff, so it is reported as the
command to run rather than guessed at.

Usage:
    python3 scripts/bakeoff_score.py --repo <worktree>

The crashing sub-check is injected by shadowing `verify_prose_quotes.py` with
a script that prints a traceback and exits 1 — the real failure mode, since
`99_Meta/transcripts/` is untracked and that script raises FileNotFoundError
in any fresh clone.
"""

from __future__ import annotations

import argparse
import shutil
import subprocess
import sys
from pathlib import Path

CHECKER = "99_Meta/scripts/anchor/verify_prose_quotes.py"
RUNNER = "scripts/check_claims_integrity.py"

CRASHER = '''#!/usr/bin/env python3
import sys
print("Traceback (most recent call last):", file=sys.stderr)
print("FileNotFoundError: 99_Meta/transcripts/plain", file=sys.stderr)
sys.exit(1)
'''


def run_runner(repo: Path, book: str = "2") -> int:
    """Exit code of the integrity runner, or 99 if it could not start."""
    try:
        p = subprocess.run(
            [sys.executable, RUNNER, "--book", book],
            cwd=repo, capture_output=True, text=True, timeout=900,
        )
        return p.returncode
    except (subprocess.TimeoutExpired, OSError):
        return 99


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo", required=True, type=Path)
    ap.add_argument("--book", default="2")
    a = ap.parse_args()

    repo = a.repo.resolve()
    checker = repo / CHECKER
    if not (repo / RUNNER).exists() or not checker.exists():
        print(f"not a usable worktree: {repo}")
        return 2

    # M2 first, on the untouched tree: a fix that fires on everything is
    # worthless, and checking that before injecting anything keeps the two
    # measures independent.
    m2_rc = run_runner(repo, a.book)
    m2 = m2_rc == 0

    backup = checker.with_suffix(".py.bakeoff-backup")
    shutil.copy2(checker, backup)
    try:
        checker.write_text(CRASHER)
        m1_rc = run_runner(repo, a.book)
        m1 = m1_rc != 0
    finally:
        shutil.move(str(backup), str(checker))

    restored_rc = run_runner(repo, a.book)

    print(f"  M1 crashing sub-check fails the run : {'PASS' if m1 else 'FAIL'}  (exit {m1_rc})")
    print(f"  M2 healthy repo still passes        : {'PASS' if m2 else 'FAIL'}  (exit {m2_rc})")
    print(f"  restored tree exit                  : {restored_rc}"
          f"{'  <-- WARNING: restore did not return to the M2 state' if restored_rc != m2_rc else ''}")
    print()
    print("  M3 (pinned): revert the arm's fix hunk and re-run its tests;")
    print("      a red test means PASS. Not inferable from here.")
    return 0 if (m1 and m2) else 1


if __name__ == "__main__":
    raise SystemExit(main())
