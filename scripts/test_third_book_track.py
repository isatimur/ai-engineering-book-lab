#!/usr/bin/env python3
"""Layout checks for the third manuscript track (book 3).

Run directly: python3 scripts/test_third_book_track.py
"""
from __future__ import annotations

import contextlib
import importlib.util
import io
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path
from unittest import mock

_REPO = Path(__file__).resolve().parents[1]
_DRAFTING = _REPO / "public" / "drafting-3"
_LEDGER = _REPO / "claims-3" / "Claims Ledger.md"

# An ordinary corpus Claim, in the shape book 1 and book 2 use. Book 3 cites
# talks too (133 corpus talks are classified across its 12 chapters), so a
# Claim like this one will land in claims-3. The video id is 11 characters
# because that is what verify_ledger.py's anchor pattern requires.
_SOURCE_ANCHOR_LEDGER = """# Claims Ledger — fixture

### C-1

**Claim:** A talk said something worth citing.

**Supporting sources:**

- **Anchor:** `AAAAAAAAAAA` 00:12:34.000 → 00:12:48.000 · confidence: high
- **Quote:** "this sentence resolves to no transcript anywhere on disk"
"""


def _load_integrity_module():
    path = _REPO / "scripts" / "check_claims_integrity.py"
    spec = importlib.util.spec_from_file_location("check_claims_integrity", path)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class ThirdBookTrackTest(unittest.TestCase):
    def test_drafting_3_contains_no_stray_markdown(self):
        """A README.md here becomes a phantom chapter book-mash will measure."""
        self.assertTrue(_DRAFTING.is_dir(), f"{_DRAFTING} does not exist")
        strays = sorted(_DRAFTING.glob("*.md"))
        chapters = [p for p in strays if p.name.startswith("Chapter ")]
        self.assertEqual(strays, chapters)

    def test_readme_exists_and_has_no_extension(self):
        readme = _DRAFTING / "README"
        self.assertTrue(readme.is_file(), f"{readme} does not exist")
        self.assertEqual(readme.suffix, "")

    def test_ledger_exists_and_verifier_passes(self):
        self.assertTrue(_LEDGER.is_file(), f"{_LEDGER} does not exist")
        proc = subprocess.run(
            [sys.executable, "scripts/verify_artifact_anchors.py",
             "--ledger", "claims-3/Claims Ledger.md"],
            cwd=_REPO, capture_output=True, text=True,
        )
        self.assertEqual(proc.returncode, 0, proc.stdout + proc.stderr)

    def test_books_registry_has_book_3(self):
        books = _load_integrity_module().BOOKS
        self.assertIn("3", books)
        self.assertEqual(books["3"]["ledger"], "claims-3/Claims Ledger.md")
        self.assertEqual(books["3"]["glob"], "public/drafting-3/*.md")

    def test_every_book_runs_every_verifier(self):
        """One verifier per book left the other anchor kind unchecked forever.

        verify_ledger.py reads Source Anchors and is blind to Artifact anchors;
        verify_artifact_anchors.py is the reverse. Either book may carry either
        kind, so every book runs both.
        """
        books = _load_integrity_module().BOOKS
        for key, cfg in books.items():
            self.assertIn("verifier", cfg, f"book {key} has no verifier")
            self.assertIsInstance(cfg["verifier"], list, f"book {key}: not a list")
            self.assertEqual(
                sorted(cfg["verifier"]),
                ["verify_artifact_anchors.py", "verify_ledger.py"],
                f"book {key} does not run both verifiers",
            )

    def test_a_source_anchor_in_book_3_is_not_a_silent_pass(self):
        """A corpus Claim in claims-3 must be checked by something.

        With one verifier per book, book 3's only verifier matched
        `artifact anchor:` headers, so this ledger reported
        "0 checked, 0 unverifiable, 0 failed" and exit 0 — a green tick over
        an anchor nothing had read.
        """
        module = _load_integrity_module()
        with tempfile.TemporaryDirectory() as tmp:
            ledger = Path(tmp) / "Claims Ledger.md"
            ledger.write_text(_SOURCE_ANCHOR_LEDGER)
            module.BOOKS["3"]["ledger"] = str(ledger)
            buf = io.StringIO()
            argv = ["check_claims_integrity.py", "--book", "3"]
            with mock.patch.object(sys, "argv", argv), contextlib.redirect_stdout(buf):
                rc = module.main()
        out = buf.getvalue()
        self.assertIn("1 anchor/quote pairs", out)
        self.assertNotEqual(rc, 0, out)

    def test_a_bad_artifact_anchor_in_book_3_fails_whatever_the_verifier_order(self):
        """The Artifact verifier must run and be heard, first or last.

        verify_ledger.py is blind to Artifact anchors and exits 0 on them, so
        only verify_artifact_anchors.py can catch this one. A loop that ran
        just the first verifier (or ran them in another order and kept only
        the first result) would let a broken commit anchor through.
        """
        ledger_text = (
            "# Claims Ledger — fixture\n\n### C-1\n\n"
            "**Claim:** A commit did something.\n\n"
            "**Artifact anchor:**\n"
            "- kind: commit\n- ref: deadbeefdeadbeef\n"
            "- date: 2026-11-10\n- excerpt: never written\n"
        )
        for order in (None, "reversed"):
            module = _load_integrity_module()
            if order:
                module.BOOKS["3"]["verifier"] = list(reversed(module.BOOKS["3"]["verifier"]))
            with tempfile.TemporaryDirectory() as tmp:
                ledger = Path(tmp) / "Claims Ledger.md"
                ledger.write_text(ledger_text)
                module.BOOKS["3"]["ledger"] = str(ledger)
                buf = io.StringIO()
                argv = ["check_claims_integrity.py", "--book", "3"]
                with mock.patch.object(sys, "argv", argv), contextlib.redirect_stdout(buf):
                    rc = module.main()
            self.assertNotEqual(rc, 0, f"order={order}\n{buf.getvalue()}")

    def test_book_3_stats_count_a_source_anchor(self):
        """build_stats once read only Artifact anchors for book 3.

        Book 3 cites talks, so its Source Anchors must show up in the stats.
        A hard zero here would put "0 Source Anchors" on the site, forever.
        """
        path = _REPO / "99_Meta" / "scripts" / "build_stats.py"
        spec = importlib.util.spec_from_file_location("build_stats_under_test", path)
        module = importlib.util.module_from_spec(spec)
        sys.modules[spec.name] = module  # @dataclass needs the module registered
        spec.loader.exec_module(module)
        with tempfile.TemporaryDirectory() as tmp:
            (Path(tmp) / "claims-3").mkdir()
            (Path(tmp) / "claims-3" / "Claims Ledger.md").write_text(
                _SOURCE_ANCHOR_LEDGER
            )
            with mock.patch.object(module, "REPO", Path(tmp)):
                book3 = module.build().book3
        self.assertEqual(book3["source_anchors"]["total"], 1, book3)
        self.assertEqual(book3["source_anchors"]["high"], 1, book3)
        # `anchors` keeps its meaning (Artifact anchors only): no silent drift.
        self.assertEqual(book3["anchors"]["total"], 0, book3)

    def test_gitignore_covers_book_3_runs(self):
        lines = (_REPO / ".gitignore").read_text().splitlines()
        self.assertIn(".book-mash-3-runs/", [ln.strip() for ln in lines])

    def test_evidence_3_directory_exists(self):
        self.assertTrue((_REPO / "evidence-3").is_dir())


if __name__ == "__main__":
    unittest.main()
