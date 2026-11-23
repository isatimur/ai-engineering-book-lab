#!/usr/bin/env python3
"""The claims gate must not report success when one of its checks crashes.

A verifier that dies with a traceback printed its traceback, and the prose
check's exit code was never read at all, so the summary still ended with
"All anchors resolve." and exit 0. Each test fakes the checks' results and
asserts on the exit code. `test_clean_run_passes` is the control for the rest.

    python3 scripts/test_check_claims_integrity.py
"""
from __future__ import annotations

import contextlib
import io
import sys
import unittest
from pathlib import Path
from unittest import mock

sys.path.insert(0, str(Path(__file__).resolve().parent))
import check_claims_integrity as cci  # noqa: E402

TRACEBACK = (
    "Traceback (most recent call last):\n"
    '  File "x.py", line 1, in <module>\n'
    "ValueError: boom\n"
)
VERIFY_OK = "[verify] resolved 3/3\nPASS - every anchor resolves to its quote.\n"
PROSE_OK = "[prose] verbatim in a transcript: 5/5\n"


def run_main(verifier=(0, VERIFY_OK), prose=(0, PROSE_OK), argv=("--book", "1")):
    out = io.StringIO()
    with mock.patch.object(cci, "run_verifier", return_value=verifier), \
         mock.patch.object(cci, "run", return_value=prose), \
         mock.patch.object(sys, "argv", ["check_claims_integrity.py", *argv]), \
         contextlib.redirect_stdout(out):
        rc = cci.main()
    return rc, out.getvalue()


class ClaimsIntegrityGate(unittest.TestCase):
    def test_clean_run_passes(self):
        rc, out = run_main()
        self.assertEqual(rc, 0)
        self.assertIn("All anchors resolve.", out)

    def test_unresolved_anchor_still_fails_with_1(self):
        rc, _ = run_main(verifier=(1, "FAILURES (1):\nbad\n"))
        self.assertEqual(rc, 1)

    def test_prose_check_crash_fails(self):
        rc, out = run_main(prose=(1, TRACEBACK))
        self.assertNotEqual(rc, 0)
        self.assertNotIn("All anchors resolve.", out)

    def test_prose_check_nonzero_exit_without_traceback_fails(self):
        rc, _ = run_main(prose=(2, ""))
        self.assertNotEqual(rc, 0)

    def test_verifier_crash_fails_and_says_crashed(self):
        rc, out = run_main(verifier=(1, TRACEBACK))
        self.assertNotEqual(rc, 0)
        self.assertIn("CRASHED", out)
        self.assertNotIn("All anchors resolve.", out)

    def test_verifier_environment_error_exit_2_fails(self):
        rc, _ = run_main(verifier=(2, "ERROR: git broke\n"))
        self.assertNotEqual(rc, 0)

    def test_crash_beats_unresolved_anchor_exit_code(self):
        rc, _ = run_main(verifier=(1, TRACEBACK), prose=(0, PROSE_OK))
        self.assertEqual(rc, 2)

    def test_traceback_with_exit_0_still_counts_as_crash(self):
        rc, _ = run_main(prose=(0, TRACEBACK))
        self.assertNotEqual(rc, 0)

    def test_empty_ledger_fails(self):
        # Book 3 printed "All anchors resolve." over a ledger that recorded no
        # claims: every verifier checked zero anchors and passed.
        with mock.patch.object(cci, "count_claims", return_value=0):
            rc, out = run_main()
        self.assertEqual(rc, 1)
        self.assertIn("EMPTY", out)
        self.assertNotIn("All anchors resolve.", out)

    def test_count_claims_reads_ledger_headings(self):
        import tempfile
        with tempfile.TemporaryDirectory() as d:
            p = Path(d) / "Claims Ledger.md"
            p.write_text("# Ledger\n\nNo Claims are recorded yet.\n")
            self.assertEqual(cci.count_claims(p), 0)
            p.write_text("# Ledger\n\n## 1) A\n- x\n\n## 2) B\n- y\n")
            self.assertEqual(cci.count_claims(p), 2)


if __name__ == "__main__":
    unittest.main()
