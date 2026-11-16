#!/usr/bin/env python3
"""The artifact-anchor verifier must tell "expired" from "wrong".

`verify()` returns `(checked, unverifiable, failures)`. The third outcome is
the point: GitHub expires Actions logs after 90 days and `gh run view --log`
then returns EMPTY, not an error. Evidence that expired and evidence that is
wrong must never share a result. These tests build REAL temporary git
repositories with real commits, like `test_check_diagram_sync.py`.

Of the tests added for the review findings, 21 were run against the unfixed
verifier and went red; the rest guard a path that was already correct, or kill
a mutant rather than a live defect. The fix report names which is which.

    python3 scripts/test_verify_artifact_anchors.py
"""
from __future__ import annotations

import os
import shutil
import socket
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parent))

import verify_artifact_anchors as mod  # noqa: E402
from verify_artifact_anchors import verify  # noqa: E402

CLI = Path(__file__).resolve().parent / "verify_artifact_anchors.py"
FIRST_DATE = "2026-11-01T10:00:00+00:00"
SECOND_DATE = "2026-11-10T10:00:00+00:00"


def git(repo: Path, *args: str, env: dict[str, str] | None = None) -> str:
    out = subprocess.run(
        ["git", *args], cwd=repo, check=True, capture_output=True, text=True,
        env={**os.environ, **(env or {})},
    )
    return out.stdout.strip()


def commit(repo: Path, message: str, when: str) -> str:
    git(repo, "add", "-A")
    git(repo, "commit", "-qm", message,
        env={"GIT_AUTHOR_DATE": when, "GIT_COMMITTER_DATE": when})
    return git(repo, "rev-parse", "HEAD")


def anchor(kind: str, ref: str, date: str, excerpt: str,
           header: str = "**Artifact anchor:**") -> str:
    return (
        f"### C-1\n\n{header}\n"
        f"- kind: {kind}\n- ref: {ref}\n- date: {date}\n- excerpt: {excerpt}\n"
    )


def bold_anchor(style: str, kind: str, ref: str, date: str, excerpt: str,
                header: str = "**Artifact anchor:**") -> str:
    """The same block with the field keys written in `style`, e.g. `**{k}:**`."""
    fields = "\n".join(f"- {style.format(k=k)} {v}" for k, v in
                       (("kind", kind), ("ref", ref), ("date", date), ("excerpt", excerpt)))
    return f"### C-1\n\n{header}\n{fields}\n"


class ArtifactAnchorVerifier(unittest.TestCase):
    def setUp(self) -> None:
        self.tmp = Path(tempfile.mkdtemp(prefix="artifact-anchors-"))
        self.addCleanup(shutil.rmtree, self.tmp, ignore_errors=True)
        self.repo = self.tmp / "repo"
        self.repo.mkdir()
        git(self.repo, "init", "-q")
        git(self.repo, "config", "user.email", "t@example.invalid")
        git(self.repo, "config", "user.name", "t")

        (self.repo / "notes.md").write_text("alpha line\n")
        self.first = commit(self.repo, "first", FIRST_DATE)
        (self.repo / "notes.md").write_text("alpha line\nbeta line\n    indented line\n")
        self.head = commit(self.repo, "second", SECOND_DATE)
        self.branch = git(self.repo, "rev-parse", "--abbrev-ref", "HEAD")
        # A real checkout has the capture directory. Its absence is an
        # environment error, not expired evidence (see the test below).
        (self.repo / "research_passes").mkdir()

    def ledger(self, body: str) -> Path:
        path = self.tmp / f"ledger-{abs(hash(body))}.md"
        path.write_text(body)
        return path

    # -- the six tests the brief names ------------------------------------

    def test_empty_ledger_exits_zero(self) -> None:
        """Book 3 starts with no artifact anchors at all."""
        corpus_only = self.ledger("### C-1\n\n**Source Anchor:** video abc\n")
        checked, unverifiable, failures = verify(corpus_only, self.repo)
        self.assertEqual((checked, unverifiable, failures), (0, 0, []))

    def test_resolves_a_real_commit(self) -> None:
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line"))
        checked, _, failures = verify(led, self.repo)
        self.assertEqual((checked, failures), (1, []))

    def test_missing_commit_fails_loudly(self) -> None:
        led = self.ledger(anchor("commit", "deadbeef", "2026-11-10", "+beta line"))
        _, unverifiable, failures = verify(led, self.repo)
        self.assertEqual(len(failures), 1)
        self.assertIn("deadbee", failures[0])
        self.assertEqual(unverifiable, 0)

    def test_expired_run_is_unverifiable_not_passing(self) -> None:
        """An expired Actions log returns empty, not an error."""
        led = self.ledger(anchor("run", "43610181465", "2026-08-01", "0 stale"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual(unverifiable, 1)
        self.assertEqual(failures, [])
        self.assertEqual(checked, 0)

    def test_file_anchor_requires_the_path_to_exist(self) -> None:
        led = self.ledger(anchor("file", "no/such.md", "2026-11-10", "alpha"))
        _, _, failures = verify(led, self.repo)
        self.assertEqual(len(failures), 1)

    def test_excerpt_must_appear_in_the_captured_evidence(self) -> None:
        """An excerpt that no capture file contains is a fabrication risk."""
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "never written"))
        _, _, failures = verify(led, self.repo)
        self.assertEqual(len(failures), 1)

    # -- decisions pinned by the reviewer ---------------------------------

    def test_shallow_clone_missing_sha_is_unverifiable(self) -> None:
        shallow = self.tmp / "shallow"
        subprocess.run(
            ["git", "clone", "-q", "--depth", "1", f"file://{self.repo}", str(shallow)],
            check=True, capture_output=True,
        )
        led = self.ledger(anchor("commit", self.first, "2026-11-01", "+alpha line"))
        checked, unverifiable, failures = verify(led, shallow)
        self.assertEqual((checked, unverifiable, failures), (0, 1, []))

    def test_complete_history_missing_sha_is_a_failure_not_unverifiable(self) -> None:
        led = self.ledger(anchor("commit", "deadbeef", "2026-11-10", "+beta line"))
        _, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((unverifiable, len(failures)), (0, 1))

    def test_commit_date_mismatch_fails(self) -> None:
        led = self.ledger(anchor("commit", self.head, "2026-11-05", "+beta line"))
        _, _, failures = verify(led, self.repo)
        self.assertEqual(len(failures), 1)
        self.assertIn("2026-11-10", failures[0])

    def test_file_resolves_at_the_last_commit_on_or_before_the_date(self) -> None:
        # On 2026-11-05 only "alpha line" existed; "beta line" came on the 10th.
        old = self.ledger(anchor("file", "notes.md", "2026-11-05", "alpha line"))
        self.assertEqual(verify(old, self.repo)[0], 1)
        late_only = self.ledger(anchor("file", "notes.md", "2026-11-05", "beta line"))
        self.assertEqual(len(verify(late_only, self.repo)[2]), 1)

    def test_file_date_is_end_of_day_utc(self) -> None:
        # The second commit is at 10:00 UTC on the 10th, so the 10th includes it.
        led = self.ledger(anchor("file", "notes.md", "2026-11-10", "beta line"))
        self.assertEqual(verify(led, self.repo), (1, 0, []))

    def test_file_with_no_commit_before_the_date_is_unverifiable(self) -> None:
        led = self.ledger(anchor("file", "notes.md", "2026-10-01", "alpha"))
        self.assertEqual(verify(led, self.repo), (0, 1, []))

    def test_range_with_sha_and_date_endpoints(self) -> None:
        led = self.ledger(anchor("range", f"{self.first}..2026-11-10", "2026-11-10",
                                 "+beta line"))
        self.assertEqual(verify(led, self.repo), (1, 0, []))

    def test_range_excerpt_not_in_diffs_fails(self) -> None:
        led = self.ledger(anchor("range", f"{self.first}..{self.head}", "2026-11-10",
                                 "never written"))
        self.assertEqual(len(verify(led, self.repo)[2]), 1)

    # -- C1: the header must not be a case-sensitive substring ------------

    def test_capitalised_header_is_checked_not_skipped(self) -> None:
        """The repo's own vocabulary capitalises the term. A bogus ref under
        `**Artifact Anchor:**` must fail, never return (0, 0, [])."""
        led = self.ledger(anchor("commit", "deadbeef", "2026-11-10", "+beta line",
                                 header="**Artifact Anchor:**"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))
        self.assertIn("deadbee", failures[0])

    def test_capitalised_header_can_also_pass(self) -> None:
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line",
                                 header="**Artifact Anchor:**"))
        self.assertEqual(verify(led, self.repo), (1, 0, []))

    def test_orphan_kind_line_fails_even_under_an_unreadable_header(self) -> None:
        """The backstop. A header no regex matches must never mean "zero anchors"."""
        led = self.ledger(anchor("commit", "deadbeef", "2026-11-10", "+beta line",
                                 header="**Artefact anchor::**"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable), (0, 0))
        self.assertEqual(len(failures), 1)
        self.assertIn("kind: commit", failures[0])

    def test_a_well_formed_block_is_not_double_reported_by_the_backstop(self) -> None:
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line"))
        self.assertEqual(verify(led, self.repo), (1, 0, []))

    def test_bold_field_keys_parse(self) -> None:
        """The ledger puts the colon inside the bold: `**Supporting sources:**`.
        A field written `- **kind:** commit` must parse, not read as kind `** commit`."""
        for style in ("**{k}:**", "**{k}**:", "{k}:"):
            led = self.ledger(bold_anchor(style, "commit", self.head,
                                          "2026-11-10", "+beta line"))
            self.assertEqual(verify(led, self.repo), (1, 0, []), style)

    def test_bold_field_keys_under_an_unreadable_header_still_fail(self) -> None:
        """C1 again, one level down: the backstop must see a bold `kind` line."""
        led = self.ledger(bold_anchor("**{k}:**", "commit", "deadbeef",
                                      "2026-11-10", "+beta line",
                                      header="**Artefact anchor::**"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable), (0, 0))
        self.assertEqual(len(failures), 1)

    def test_a_bold_excerpt_keeps_its_asterisks(self) -> None:
        """Only a bold KEY may shed asterisks. An excerpt is verbatim evidence."""
        (self.repo / "notes.md").write_text("alpha line\nbeta line\n**bold evidence**\n")
        third = commit(self.repo, "third", "2026-11-12T10:00:00+00:00")
        led = self.ledger(anchor("commit", third, "2026-11-12", "+**bold evidence**"))
        self.assertEqual(verify(led, self.repo), (1, 0, []))

    # -- C2: run captures resolve by content, not by file name ------------

    def capture(self, name: str, text: str) -> Path:
        path = self.repo / "research_passes" / name
        path.write_text(text)
        return path

    def test_run_resolves_against_this_repo_s_real_capture_naming(self) -> None:
        """No file in research_passes/ is named run-<id>. 63 of 64 are
        YYYY-MM-DD-slug.md, so resolution must read content."""
        self.capture("2026-11-14-ci-green.md", "GitHub run 111\n0 stale, 0 missing-source\n")
        led = self.ledger(anchor("run", "111", "2026-11-14", "0 stale, 0 missing-source"))
        self.assertEqual(verify(led, self.repo), (1, 0, []))

    def test_run_id_and_excerpt_in_different_files_fails(self) -> None:
        """A census table that repeats one phrase must not satisfy every run."""
        self.capture("2026-11-14-ids.md", "runs seen: 111, 222, 333\n")
        self.capture("2026-11-14-phrases.md", "0 stale, 0 missing-source\n")
        led = self.ledger(anchor("run", "111", "2026-11-14", "0 stale, 0 missing-source"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    def test_a_longer_run_id_does_not_satisfy_a_shorter_one(self) -> None:
        """`run: 4374090918` must not be satisfied by run 43740909184."""
        self.capture("2026-11-14-ci.md", "run 43740909184\n0 stale\n")
        led = self.ledger(anchor("run", "4374090918", "2026-11-14", "0 stale"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, failures), (0, 1, []))

    def test_a_capture_outside_research_passes_does_not_count(self) -> None:
        (self.repo / "stray.md").write_text("run 111\n0 stale, 0 missing-source\n")
        led = self.ledger(anchor("run", "111", "2026-11-14", "0 stale, 0 missing-source"))
        self.assertEqual(verify(led, self.repo), (0, 1, []))

    def test_run_with_capture_lacking_excerpt_fails(self) -> None:
        self.capture("2026-11-14-ci.md", "run 111\nstep one\n")
        led = self.ledger(anchor("run", "111", "2026-11-14", "0 stale"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    def test_run_with_empty_capture_is_unverifiable(self) -> None:
        self.capture("2026-11-14-ci.md", "")
        led = self.ledger(anchor("run", "111", "2026-11-14", "0 stale"))
        self.assertEqual(verify(led, self.repo), (0, 1, []))

    def test_absent_capture_directory_is_a_failure_not_unverifiable(self) -> None:
        """A wrong --repo must not read as "the log expired"."""
        shutil.rmtree(self.repo / "research_passes")
        led = self.ledger(anchor("run", "111", "2026-11-14", "0 stale"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    # -- a pasted anchor block must never satisfy itself -------------------
    # Captures carry a copy of the finished anchor, so the ledger entry can be
    # lifted from the record it rests on. A pasted block holds the run id and
    # the excerpt by construction, so without this the author's own sentence
    # certified the run. The capture's blocks sit inside ``` fences, so the
    # fenced case is the one the branch shipped.

    def test_a_pasted_anchor_block_does_not_certify_itself(self) -> None:
        """Nothing but the block: no evidence was captured, so unverifiable."""
        block = anchor("run", "111", "2026-11-14", "step one failed")
        self.capture("2026-11-14-ci.md", block)
        led = self.ledger(block)
        self.assertEqual(verify(led, self.repo), (0, 1, []))

    def test_a_fenced_pasted_anchor_block_does_not_certify_itself(self) -> None:
        """The real capture fences its "Ready-to-paste anchors" blocks."""
        block = anchor("run", "111", "2026-11-14", "step one failed")
        self.capture("2026-11-14-ci.md", f"### Ready-to-paste anchors\n\n```\n{block}```\n")
        led = self.ledger(block)
        self.assertEqual(verify(led, self.repo), (0, 1, []))

    def test_prose_naming_the_run_plus_a_pasted_block_is_a_failure(self) -> None:
        """The branch's real shape: the id is in a table, the excerpt only in
        the block. Naming a run without its evidence is a failure, not a pass
        and not unverifiable."""
        block = anchor("run", "111", "2026-11-14", "step one failed")
        self.capture("2026-11-14-ci.md",
                     f"| run | 111 | success |\n\n```\n{block}```\n")
        checked, unverifiable, failures = verify(self.ledger(block), self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    def test_real_log_text_outside_the_block_still_passes(self) -> None:
        """Incident 1's pattern: the log line is quoted in its own section.
        Stripping anchor blocks must not strip the evidence around them."""
        block = anchor("run", "111", "2026-11-14", "step one failed")
        self.capture("2026-11-14-ci.md",
                     f"Run `111`, verbatim:\n\n```\nstep one failed\n```\n\n{block}")
        self.assertEqual(verify(self.ledger(block), self.repo), (1, 0, []))

    def test_three_outcomes_never_collapse(self) -> None:
        self.capture("2026-11-14-ci.md", "run 111\ngood line\n")
        body = "\n".join([
            anchor("commit", self.head, "2026-11-10", "+beta line"),
            anchor("commit", "deadbeef", "2026-11-10", "+beta line"),
            anchor("run", "222", "2026-08-01", "gone forever"),
            anchor("run", "111", "2026-11-14", "good line"),
        ])
        checked, unverifiable, failures = verify(self.ledger(body), self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (2, 1, 1))

    # -- C3: `ref` is validated before it is resolved ----------------------

    def test_moving_commit_refs_are_rejected(self) -> None:
        """HEAD and a branch resolve in git, but a moving ref is not an anchor."""
        for ref in ("HEAD", self.branch):
            led = self.ledger(anchor("commit", ref, "2026-11-10", "+beta line"))
            checked, unverifiable, failures = verify(led, self.repo)
            self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1), ref)

    def test_run_ref_must_be_digits(self) -> None:
        """`run: *` used to glob every capture in the directory."""
        self.capture("2026-11-14-ci.md", "run 111\n0 stale, 0 missing-source\n")
        for ref in ("*", "run-111", "11?"):
            led = self.ledger(anchor("run", ref, "2026-11-14", "0 stale, 0 missing-source"))
            checked, unverifiable, failures = verify(led, self.repo)
            self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1), ref)

    def test_range_endpoints_must_be_a_sha_or_an_iso_date(self) -> None:
        for ref in (f"HEAD..{self.head}", f"{self.first}..{self.branch}",
                    f"{self.first}..2026-13-45", f"{self.first}..yesterday"):
            led = self.ledger(anchor("range", ref, "2026-11-10", "+beta line"))
            checked, unverifiable, failures = verify(led, self.repo)
            self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1), ref)

    def test_a_short_commit_ref_is_rejected(self) -> None:
        led = self.ledger(anchor("commit", self.head[:5], "2026-11-10", "+beta line"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    # -- I4: an environment error is never UNVERIFIABLE --------------------

    def test_a_non_git_repo_raises_instead_of_reporting_expired_evidence(self) -> None:
        plain = self.tmp / "not-a-repo"
        plain.mkdir()
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line"))
        with self.assertRaises(mod.GitEnvironmentError):
            verify(led, plain)

    def test_a_missing_repo_directory_raises(self) -> None:
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line"))
        with self.assertRaises(mod.GitEnvironmentError):
            verify(led, self.tmp / "nowhere")

    def test_a_repo_without_head_raises(self) -> None:
        empty = self.tmp / "no-commits"
        empty.mkdir()
        git(empty, "init", "-q")
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line"))
        with self.assertRaises(mod.GitEnvironmentError):
            verify(led, empty)

    # -- I5: a range date endpoint honours shallowness ---------------------

    def test_range_date_before_the_root_commit_fails_in_complete_history(self) -> None:
        led = self.ledger(anchor("range", f"2026-10-01..{self.head}", "2026-11-10",
                                 "+beta line"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    def test_range_date_before_the_root_commit_is_unverifiable_when_shallow(self) -> None:
        shallow = self.tmp / "shallow-range"
        subprocess.run(
            ["git", "clone", "-q", "--depth", "1", f"file://{self.repo}", str(shallow)],
            check=True, capture_output=True,
        )
        led = self.ledger(anchor("range", f"2026-10-01..{self.head}", "2026-11-10",
                                 "+beta line"))
        self.assertEqual(verify(led, shallow), (0, 1, []))

    # -- I6: a blank excerpt certifies nothing -----------------------------

    def test_empty_excerpt_fails(self) -> None:
        led = self.ledger("**Artifact anchor:**\n"
                          f"- kind: commit\n- ref: {self.head}\n"
                          "- date: 2026-11-10\n- excerpt:\n")
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    def test_whitespace_only_excerpt_fails(self) -> None:
        """`"" in text` is always true, so a blank excerpt would pass anything."""
        # The head diff holds `+    indented line`, so a four-space excerpt
        # IS a substring of it. Only the strip after unquoting rejects it.
        for raw in ('" "', '"   "', '"    "', "'\t'"):
            led = self.ledger(anchor("commit", self.head, "2026-11-10", raw))
            checked, unverifiable, failures = verify(led, self.repo)
            self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1), raw)
            self.assertIn("excerpt", failures[0], raw)

    def test_a_present_but_empty_field_fails(self) -> None:
        """Pins `not a.get(f)` against the `f not in a` mutant. With that
        mutant an empty `ref` reaches `git show <sha>:`, which lists the root
        tree with exit 0, so `- excerpt: notes.md` would certify nothing."""
        led = self.ledger("**Artifact anchor:**\n- kind: file\n- ref:\n"
                          "- date: 2026-11-10\n- excerpt: notes.md\n")
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    def test_a_one_character_excerpt_fails(self) -> None:
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+"))
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))

    # -- I7: a repeated field is a failure, not a silent overwrite ---------

    def test_duplicate_field_fails(self) -> None:
        """The last value used to win, with no signal at all."""
        led = self.ledger(
            "**Artifact anchor:**\n- kind: commit\n- ref: deadbeef\n"
            f"- ref: {self.head}\n- date: 2026-11-10\n- excerpt: +beta line\n"
        )
        checked, unverifiable, failures = verify(led, self.repo)
        self.assertEqual((checked, unverifiable, len(failures)), (0, 0, 1))
        self.assertIn("ref", failures[0])

    # -- malformed anchors and CLI ----------------------------------------

    def test_unknown_kind_and_missing_field_fail(self) -> None:
        bad_kind = self.ledger(anchor("video", "x", "2026-11-10", "some evidence"))
        self.assertEqual(len(verify(bad_kind, self.repo)[2]), 1)
        missing = self.ledger("**Artifact anchor:**\n- kind: commit\n- ref: abcdef1\n")
        self.assertEqual(len(verify(missing, self.repo)[2]), 1)

    def run_cli(self, ledger: Path, repo: Path | None = None) -> subprocess.CompletedProcess:
        return subprocess.run(
            [sys.executable, str(CLI), "--ledger", str(ledger),
             "--repo", str(repo or self.repo)],
            capture_output=True, text=True,
        )

    def test_cli_exit_codes(self) -> None:
        ok = self.run_cli(self.ledger(anchor("commit", self.head, "2026-11-10", "+beta")))
        self.assertEqual(ok.returncode, 0, ok.stdout + ok.stderr)
        bad = self.run_cli(self.ledger(anchor("commit", "deadbeef", "2026-11-10", "+beta")))
        self.assertEqual(bad.returncode, 1)
        expired = self.run_cli(self.ledger(anchor("run", "9", "2026-08-01", "0 stale")))
        self.assertEqual(expired.returncode, 0)
        self.assertIn("unverifiable", expired.stdout)

    def test_cli_reports_an_environment_error_separately_from_a_failure(self) -> None:
        plain = self.tmp / "cli-not-a-repo"
        plain.mkdir()
        led = self.ledger(anchor("commit", self.head, "2026-11-10", "+beta line"))
        out = self.run_cli(led, repo=plain)
        self.assertEqual(out.returncode, 2, out.stdout + out.stderr)
        self.assertIn("not inside a git work tree", out.stderr)

    # -- no network, ever --------------------------------------------------

    def test_the_module_makes_no_network_call(self) -> None:
        """`gh run view --log` must never appear. git is the only subprocess.

        The ledger deliberately covers the unverifiable and failing paths too.
        "No capture, so fetch the live log" is the regression most likely to be
        written, and it lives on the unverifiable path, not the passing one.
        """
        self.capture("2026-11-14-ci.md", "run 111\ngood line\n")
        led = self.ledger("\n".join([
            anchor("commit", self.head, "2026-11-10", "+beta line"),
            anchor("file", "notes.md", "2026-11-10", "beta line"),
            anchor("range", f"{self.first}..{self.head}", "2026-11-10", "+beta line"),
            anchor("run", "111", "2026-11-14", "good line"),
            anchor("run", "999", "2026-08-01", "expired evidence"),   # unverifiable
            anchor("commit", "deadbeef", "2026-11-10", "+beta line"),  # failure
        ]))
        seen: list[list[str]] = []

        class RecordingPopen(subprocess.Popen):
            def __init__(self, argv, *a, **kw):
                seen.append(list(argv))
                super().__init__(argv, *a, **kw)

        # Popen, not run: `run` and `check_output` both reach Popen, and a
        # direct Popen call would slip past a patch on `run`.
        with mock.patch.object(mod.subprocess, "Popen", RecordingPopen), \
                mock.patch.object(socket, "socket",
                                  side_effect=AssertionError("network call")), \
                mock.patch.object(socket, "create_connection",
                                  side_effect=AssertionError("network call")):
            checked, unverifiable, failures = verify(led, self.repo)

        self.assertEqual((checked, unverifiable, len(failures)), (4, 1, 1))
        self.assertTrue(seen, "the verifier ran no subprocess at all")
        allowed = {"cat-file", "show", "log", "rev-parse"}
        for argv in seen:
            self.assertEqual(argv[0], "git", argv)
            self.assertIn(argv[1], allowed, argv)

    # -- a git failure raises, it never becomes `None` or unverifiable ------

    def _failing_git(self, subcommand: str, extra: tuple[str, ...] = ()):
        """A `run_git` that fails for one subcommand and is real for the rest."""
        real = mod.run_git

        def fake(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
            if args[0] == subcommand and args[1:1 + len(extra)] == extra:
                return subprocess.CompletedProcess(["git", *args], 128, "", "boom")
            return real(repo, *args)
        return mock.patch.object(mod, "run_git", fake)

    def test_a_git_log_failure_raises_not_none(self) -> None:
        """`None` would read as "no commit that old", i.e. UNVERIFIABLE (I4)."""
        with self._failing_git("log"), self.assertRaises(mod.GitEnvironmentError):
            mod.last_commit_on_or_before(self.repo, "2026-11-10")
        led = self.ledger(anchor("file", "notes.md", "2026-11-10", "alpha line"))
        with self._failing_git("log"), self.assertRaises(mod.GitEnvironmentError):
            verify(led, self.repo)

    def test_a_git_show_failure_raises(self) -> None:
        with self._failing_git("show", ("-s",)), self.assertRaises(mod.GitEnvironmentError):
            mod.committer_date_utc(self.repo, self.head)

    # -- fenced code blocks are examples, not anchors ----------------------

    def _example(self, fence: str) -> str:
        run = len(fence) - len(fence.lstrip(fence[0]))
        body = anchor('commit', self.head, '2026-11-10', '+beta line')
        return f"{fence}\n{body}{fence[0] * run}\n"

    def test_a_fenced_example_contributes_no_anchor(self) -> None:
        for fence in ("```", "```markdown", "~~~", "~~~text", "````"):
            led = self.ledger(self._example(fence))
            self.assertEqual(verify(led, self.repo), (0, 0, []), fence)

    def test_a_fenced_orphan_kind_line_is_not_a_failure(self) -> None:
        led = self.ledger("```\n- kind: commit\n```\n")
        self.assertEqual(verify(led, self.repo), (0, 0, []))

    def test_an_anchor_after_a_closing_fence_is_still_found(self) -> None:
        body = self._example("```") + "\n" + anchor(
            "commit", self.head, "2026-11-10", "+beta line")
        self.assertEqual(verify(self.ledger(body), self.repo), (1, 0, []))
        orphan = "```\n- kind: commit\n```\n- kind: commit\n"
        _, _, failures = verify(self.ledger(orphan), self.repo)
        self.assertEqual(len(failures), 1)
        self.assertIn("line 4", failures[0])

    def test_an_unclosed_fence_fails_and_names_its_line(self) -> None:
        body = "intro\n```\n" + anchor("commit", "0" * 40, "2026-11-10", "+beta line")
        result = verify(self.ledger(body), self.repo)
        self.assertNotEqual(result, (0, 0, []))
        failures = result[2]
        self.assertEqual(len(failures), 1)
        self.assertIn("line 2", failures[0])
        self.assertIn("not checked", failures[0])

    def test_an_unclosed_fence_with_no_anchor_after_it_still_fails(self) -> None:
        for body in ("~~~text\nsome prose\n", "text\n\n```\n"):
            failures = verify(self.ledger(body), self.repo)[2]
            self.assertEqual(len(failures), 1, body)
            self.assertIn("never closed", failures[0])

    def test_a_closed_fence_raises_no_unclosed_failure(self) -> None:
        body = "```\ncode\n```\n" + anchor("commit", self.head, "2026-11-10", "+beta line")
        self.assertEqual(verify(self.ledger(body), self.repo), (1, 0, []))


if __name__ == "__main__":
    unittest.main()
