"""Regression: "First Serious Synthesis Pack.md" must have exactly one writer.

Run:  python3 99_Meta/scripts/test_synthesis_pack_single_owner.py   (from the repo root)

Unlike test_panel_merge, this one touches the working tree: it regenerates corpus
artifacts, which is the only way to observe who writes what. It refuses to run on
a dirty tree so a failure can never be confused with your own edits, and it
rewrites every artifact from the same corpus, so a pass leaves no diff.

The bug it guards: both this ingest and build_book_synthesis.py wrote the pack,
with different content, so whichever ran last won. The ingest's version was the
early survey that still weighed three candidate book angles; build's is the
settled thesis. Every ingest quietly reverted the decision and showed a 154-line
diff on an unchanged corpus.

The order below matters. An earlier cut of this test restored the pack from HEAD
and asserted the ingest left it byte-identical. That passed with the bug still in
place, because the committed pack WAS the ingest's own output — "did not write"
and "rewrote identically" have the same hash. So put build's version on disk
first, then let the ingest run. Only a second writer can destroy it.
"""
import pathlib
import re
import subprocess
import sys

ROOT = pathlib.Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / "99_Meta" / "scripts"))
PACK = ROOT / "05_Book_Ideas" / "First Serious Synthesis Pack.md"
# Only build_book_synthesis.py emits this line, so it identifies the writer.
BUILD_MARKER = "Transcript status mix: **"


def git(*args: str) -> str:
    return subprocess.run(["git", "-C", str(ROOT), *args],
                          capture_output=True, text=True).stdout


def tracked_changes() -> list[str]:
    return [ln[3:] for ln in git("status", "--porcelain").splitlines()
            if ln and not ln.startswith("??")]


def main() -> int:
    # --allow-dirty exists so the failure can be demonstrated: reverting the fix
    # dirties the tree, and without this the guard would skip instead of failing.
    if tracked_changes() and "--allow-dirty" not in sys.argv:
        print("SKIP: working tree is dirty; this test rewrites generated files.")
        print("      Commit or stash first, then re-run, or pass --allow-dirty.")
        return 0

    import ingest_ai_engineer_videos as ingest

    # Reuse the batch name already on record. A fresh one would legitimately
    # change the two artifacts that name the latest batch, and that noise would
    # hide the signal this test is after.
    overview = (ROOT / "99_Meta" / "Channel Overview.md").read_text()
    m = re.search(r"^- Latest completed batch: `([^`]+)`", overview, re.M)
    if not m:
        print("FAIL: could not read the batch name off Channel Overview.md")
        return 1
    batch = m.group(1)

    subprocess.run([str(ROOT / "99_Meta/scripts/build_book_synthesis.py")],
                   check=True, capture_output=True)
    checks = [("build_book_synthesis writes the pack", BUILD_MARKER in PACK.read_text())]

    ingest.rebuild_corpus_artifacts([], batch)
    checks.append(("ingest rebuild leaves it standing", BUILD_MARKER in PACK.read_text()))

    # Generated artifacts only. Source edits under --allow-dirty are the point.
    others = [c for c in tracked_changes()
              if "Synthesis Pack" not in c and not c.endswith(".py")]
    checks.append(("ingest rewrites its own artifacts byte-identically", not others))
    if others:
        print(f"  unexpected diffs: {others}")

    for label, ok in checks:
        print(f"  {'ok ' if ok else 'BAD'} {label}")
    passed = all(ok for _, ok in checks)
    print("\n  ALL CORRECT:", passed)
    return 0 if passed else 1


if __name__ == "__main__":
    sys.exit(main())
