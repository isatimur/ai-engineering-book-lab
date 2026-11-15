#!/usr/bin/env python3
"""Negative controls for scripts/commit_regenerated.sh.

Every test builds a real bare remote and two real clones, so the race is
reproduced rather than mocked. The decisive one is
`test_losing_the_race_publishes_the_new_tips_value`: it fails against the
`git rebase` loop this script replaced, and
`test_control_legacy_rebase_publishes_stale_value` proves that by running the
old approach against the same fixture and watching it publish the stale value.

Run:  python3 scripts/test_commit_regenerated.py
"""

from __future__ import annotations

import os
import subprocess
import sys
import tempfile
import time
import unittest
from pathlib import Path

SCRIPT = Path(__file__).resolve().parent / "commit_regenerated.sh"

# Derives `derived.txt` from `corpus.txt`, the way build_stats.py derives
# STATS.md from the note tree.
GENERATOR = """\
import pathlib
corpus = pathlib.Path("corpus.txt").read_text().split()
pathlib.Path("derived.txt").write_text(f"count={len(corpus)}\\n")
"""

# Same, plus a timestamp line. build_stats.py stamps `generated_at`, so its
# output differs on every run and the "nothing changed" shortcut never fires.
GENERATOR_TIMESTAMPED = """\
import pathlib, time
corpus = pathlib.Path("corpus.txt").read_text().split()
pathlib.Path("derived.txt").write_text(
    f"count={len(corpus)}\\ngenerated_at={time.time_ns()}\\n"
)
"""


def git(repo: Path, *args: str, check: bool = True) -> subprocess.CompletedProcess:
    return subprocess.run(
        ["git", "-C", str(repo), *args],
        capture_output=True,
        text=True,
        check=check,
    )


class RaceFixture:
    """A bare remote plus two clones that can race each other to push."""

    def __init__(self, tmp: Path, generator: str = GENERATOR) -> None:
        self.tmp = tmp
        self.origin = tmp / "origin.git"
        self.generator_src = generator

        subprocess.run(
            ["git", "init", "--quiet", "--bare", "-b", "main", str(self.origin)],
            check=True,
        )

        seed = tmp / "seed"
        seed.mkdir()
        git(seed, "init", "--quiet", "-b", "main")
        self._identify(seed)
        (seed / "corpus.txt").write_text("a\n")
        (seed / "derived.txt").write_text("count=0\n")  # deliberately stale
        (seed / "gen.py").write_text(self.generator_src)
        git(seed, "add", "-A")
        git(seed, "commit", "--quiet", "-m", "seed")
        git(seed, "remote", "add", "origin", str(self.origin))
        git(seed, "push", "--quiet", "origin", "main")

    @staticmethod
    def _identify(repo: Path) -> None:
        git(repo, "config", "user.name", "Test")
        git(repo, "config", "user.email", "test@example.com")

    def clone(self, name: str) -> Path:
        path = self.tmp / name
        subprocess.run(
            ["git", "clone", "--quiet", str(self.origin), str(path)], check=True
        )
        self._identify(path)
        return path

    def regenerate(self, repo: Path) -> None:
        subprocess.run([sys.executable, "gen.py"], cwd=repo, check=True)

    def advance_remote(self, words: int) -> None:
        """Another job grows the corpus AND publishes the matching value.

        Mirrors losing the race to a commit that already touched the derived
        file. Under the old loop this conflicted, and the job died.
        """
        self._advance(words, regenerate=True, message=f"corpus grows to {words}")

    def advance_remote_inputs_only(self, words: int) -> None:
        """Another job grows the corpus but does NOT touch the derived file.

        This is the shape of the real incident. PR #84 changed the note tree
        and `99_Meta/Corpus Stats.md`, but not `stats.json`, so a rebase of a
        stale `stats.json` applied cleanly and published the wrong number.
        """
        self._advance(words, regenerate=False, message=f"corpus grows to {words}")

    def _advance(self, words: int, regenerate: bool, message: str) -> None:
        other = self.clone(f"other-{words}-{int(regenerate)}")
        (other / "corpus.txt").write_text(" ".join(["w"] * words) + "\n")
        if regenerate:
            self.regenerate(other)
        git(other, "add", "-A")
        git(other, "commit", "--quiet", "-m", message)
        git(other, "push", "--quiet", "origin", "main")

    def published(self, filename: str = "derived.txt") -> str:
        out = subprocess.run(
            ["git", "-C", str(self.origin), "show", f"main:{filename}"],
            capture_output=True,
            text=True,
            check=True,
        )
        return out.stdout

    def run_script(
        self,
        repo: Path,
        extra_env: dict | None = None,
        regen: str | None = None,
    ):
        env = {
            **os.environ,
            "COMMIT_REGEN_BACKOFF": "0",
            **(extra_env or {}),
        }
        return subprocess.run(
            [
                "bash",
                str(SCRIPT),
                "--message",
                "chore: regenerate",
                "--regen",
                regen or f"{sys.executable} gen.py",
                "--",
                "derived.txt",
            ],
            cwd=repo,
            capture_output=True,
            text=True,
            env=env,
        )


class CommitRegeneratedTests(unittest.TestCase):
    def setUp(self) -> None:
        self._tmp = tempfile.TemporaryDirectory()
        self.tmp = Path(self._tmp.name)
        self.addCleanup(self._tmp.cleanup)

    # --- the regression -----------------------------------------------------

    def test_losing_the_race_publishes_the_new_tips_value(self) -> None:
        """The incident: a stale computation must not win the push race."""
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")

        # The worker computes from the tree it checked out: 1 corpus entry.
        fx.regenerate(worker)
        self.assertEqual((worker / "derived.txt").read_text(), "count=1\n")

        # Meanwhile another job grows the corpus to 3, touching only inputs.
        fx.advance_remote_inputs_only(3)

        result = fx.run_script(worker)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("Push rejected", result.stdout)

        # The published value must describe the published corpus.
        self.assertEqual(fx.published(), "count=3\n")
        self.assertEqual(fx.published("corpus.txt").split(), ["w", "w", "w"])

    def test_control_legacy_rebase_publishes_stale_value(self) -> None:
        """Control: the replaced `git rebase` loop fails this same fixture.

        Without this, a script that merely always exited 0 could pass the test
        above by accident. This reproduces the old behaviour and asserts the
        wrong number lands, so the fixture is proven able to catch it.

        Note what makes the trap quiet: the rebase does NOT conflict. The
        competing commit changed inputs only, so git has no reason to object
        to replaying a stale derived file on top of it.
        """
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        fx.advance_remote_inputs_only(3)

        git(worker, "add", "-A")
        git(worker, "commit", "--quiet", "-m", "chore: regenerate")
        push = git(worker, "push", "origin", "main", check=False)
        self.assertNotEqual(push.returncode, 0, "the push should have been rejected")

        git(worker, "fetch", "--quiet", "origin", "main")
        rebase = git(worker, "rebase", "origin/main", check=False)
        self.assertEqual(
            rebase.returncode, 0, "rebase applies cleanly — that is the trap"
        )
        git(worker, "push", "--quiet", "origin", "main")

        # The corpus on the remote has three entries; the published count
        # claims one. This is the 1455-on-a-1458-corpus bug, in miniature.
        self.assertEqual(fx.published(), "count=1\n")
        self.assertEqual(fx.published("corpus.txt").split(), ["w", "w", "w"])

    def test_losing_to_a_competing_regeneration_does_not_die(self) -> None:
        """The other half of the incident: the run holding the right answer.

        When the winner already rewrote the derived file, the old loop hit a
        content conflict and exited 1 on attempt 1 of 5 — that was the red X
        on main. Regenerating instead of rebasing has nothing to conflict.
        """
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        fx.advance_remote(3)  # inputs AND derived file

        result = fx.run_script(worker)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertEqual(fx.published(), "count=3\n")

    def test_race_survives_a_timestamped_generator(self) -> None:
        """build_stats.py stamps a time, so it always reports a diff."""
        fx = RaceFixture(self.tmp, generator=GENERATOR_TIMESTAMPED)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        fx.advance_remote(4)

        result = fx.run_script(worker)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("count=4", fx.published())
        self.assertNotIn("count=1", fx.published())

    # --- the quiet paths ----------------------------------------------------

    def test_no_diff_means_no_commit(self) -> None:
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        before = git(worker, "rev-parse", "HEAD").stdout.strip()

        result = fx.run_script(worker)  # generator not run: file untouched
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("pushed=false", result.stdout)
        self.assertEqual(git(worker, "rev-parse", "HEAD").stdout.strip(), before)

    def test_tip_already_correct_pushes_no_empty_commit(self) -> None:
        """If the winner already published the right answer, add nothing."""
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        fx.advance_remote(3)

        tip_before = git(worker, "ls-remote", "origin", "main").stdout.split()[0]
        result = fx.run_script(worker)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

        # Our regeneration against the new tip reproduces count=3 exactly,
        # so the remote must not have gained a commit.
        tip_after = git(worker, "ls-remote", "origin", "main").stdout.split()[0]
        self.assertEqual(tip_before, tip_after)
        self.assertIn("pushed=false", result.stdout)

    def test_clean_push_reports_pushed_true(self) -> None:
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)

        result = fx.run_script(worker)
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertIn("pushed=true", result.stdout)
        self.assertEqual(fx.published(), "count=1\n")

    def test_github_output_receives_the_flag(self) -> None:
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        out_file = self.tmp / "gh-output"
        out_file.touch()

        fx.run_script(worker, {"GITHUB_OUTPUT": str(out_file)})
        self.assertIn("pushed=true", out_file.read_text())

    # --- the loud failures --------------------------------------------------

    def test_failing_generator_exits_nonzero(self) -> None:
        """A broken generator must fail loudly, not publish the old file.

        The sabotage goes in the --regen command, not in a tracked file: the
        reset to the new tip would restore a tracked one, which is itself a
        useful property to have noticed.
        """
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        fx.advance_remote_inputs_only(3)

        result = fx.run_script(
            worker, regen=f'{sys.executable} -c "import sys; sys.exit(7)"'
        )
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn("Regeneration command failed", result.stdout)

    def test_unlandable_push_exits_nonzero(self) -> None:
        """A remote that keeps moving must fail loudly, not silently give up."""
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)

        # A pre-receive hook that rejects everything simulates a remote we can
        # never land on; the script must exhaust its attempts and exit 1.
        hooks = fx.origin / "hooks"
        hooks.mkdir(exist_ok=True)
        hook = hooks / "pre-receive"
        hook.write_text("#!/bin/sh\nexit 1\n")
        hook.chmod(0o755)

        result = fx.run_script(worker, {"COMMIT_REGEN_MAX_ATTEMPTS": "3"})
        self.assertEqual(result.returncode, 1, result.stdout + result.stderr)
        self.assertIn("Could not land regenerated files after 3", result.stdout)

    def test_backoff_branch_does_not_trip_errexit(self) -> None:
        """The retry sleeps between attempts, and survives doing so.

        Written after the guard was an `[ ... ] && sleep` one-liner: a false
        test there is the last statement in the loop body and returns 1, the
        classic shape that `set -e` kills. The rest of the suite runs with
        backoff 0 and would never have entered the branch.
        """
        fx = RaceFixture(self.tmp)
        worker = fx.clone("worker")
        fx.regenerate(worker)
        fx.advance_remote_inputs_only(3)

        start = time.monotonic()
        result = fx.run_script(worker, {"COMMIT_REGEN_BACKOFF": "1"})
        elapsed = time.monotonic() - start

        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)
        self.assertGreaterEqual(elapsed, 1.0, "the backoff branch never slept")
        self.assertEqual(fx.published(), "count=3\n")

    def test_missing_arguments_are_rejected(self) -> None:
        result = subprocess.run(
            ["bash", str(SCRIPT), "--message", "x"],
            capture_output=True,
            text=True,
        )
        self.assertEqual(result.returncode, 2)
        self.assertIn("--regen is required", result.stderr)


if __name__ == "__main__":
    unittest.main(verbosity=2)
