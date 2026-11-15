#!/usr/bin/env python3
"""The diagrams gate must be able to fail. These are its negative controls.

The step this replaced reported "0 stale, 0 missing-source" every day for
months while erroring on every file it touched. Nothing ever asked it to
fail, so nobody found out it could not. Each test here breaks one thing in a
fixture repo and asserts a non-zero exit, and `test_clean_repo_passes` is the
control for the controls — without it, a check that always failed would also
pass this file.

    python3 scripts/test_check_diagram_sync.py
"""
from __future__ import annotations

import json
import shutil
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

CHECK = Path(__file__).resolve().parent / "check_diagram_sync.py"

# A 1x1 PNG. Content does not matter; only whether two files agree.
PNG_A = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4"
    "890000000a49444154789c6300010000050001" "0d0a2db4" "0000000049454e44ae426082"
)
PNG_B = PNG_A[:-16] + b"\x00" * 12 + PNG_A[-4:]


def git(repo: Path, *args: str) -> None:
    subprocess.run(["git", *args], cwd=repo, check=True,
                   capture_output=True, text=True)


class DiagramSyncGate(unittest.TestCase):
    def setUp(self) -> None:
        self.repo = Path(tempfile.mkdtemp(prefix="diagram-sync-"))
        self.addCleanup(shutil.rmtree, self.repo, ignore_errors=True)

        src = self.repo / "diagrams" / "inline"
        web = self.repo / "website" / "public" / "diagrams" / "inline"
        data = self.repo / "website" / "src" / "data"
        for d in (src, web, data):
            d.mkdir(parents=True)

        self.source = src / "ch01-fig1-example.excalidraw"
        self.png = src / "ch01-fig1-example.png"
        self.web = web / "ch01-fig1.png"
        self.source.write_text('{"type":"excalidraw","elements":[]}')
        self.png.write_bytes(PNG_A)
        self.web.write_bytes(PNG_A)

        manifest = {s: [] for s in
                    ("overview", "openers", "concepts", "maps", "dividers")}
        manifest["inline"] = [{
            "chapter": "01", "index": 1, "title": "Example",
            "src": "/diagrams/inline/ch01-fig1.png",
            "sourceFile": "ch01-fig1-example.excalidraw",
        }]
        (data / "diagram-manifest.json").write_text(json.dumps(manifest))

        git(self.repo, "init", "-q")
        git(self.repo, "config", "user.email", "t@example.invalid")
        git(self.repo, "config", "user.name", "t")
        git(self.repo, "add", "-A")
        git(self.repo, "commit", "-qm", "fixture")

    def run_check(self) -> subprocess.CompletedProcess:
        return subprocess.run(
            [sys.executable, str(CHECK), "--repo", str(self.repo)],
            capture_output=True, text=True,
        )

    def test_clean_repo_passes(self) -> None:
        """Control for the controls: a sound fixture must exit 0."""
        result = self.run_check()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_web_copy_with_different_bytes_fails(self) -> None:
        self.web.write_bytes(PNG_B)
        git(self.repo, "commit", "-aqm", "drift")
        result = self.run_check()
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertIn("bytes differ", result.stdout)

    def test_missing_web_copy_fails(self) -> None:
        self.web.unlink()
        git(self.repo, "commit", "-aqm", "remove web copy")
        result = self.run_check()
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertIn("no web copy", result.stdout)

    def test_source_committed_after_its_png_fails(self) -> None:
        """The case the real corpus was in: a withdrawal edited the source
        on 2026-09-19 and the .png kept the removed name until 2026-11-15."""
        self.source.write_text('{"type":"excalidraw","elements":[1]}')
        git(self.repo, "commit", "-aqm", "edit source, do not re-render")
        result = self.run_check()
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertIn("re-render", result.stdout)

    def test_uncommitted_render_is_not_called_stale(self) -> None:
        """Re-rendering must clear the failure before you commit, or the tool
        is lying at the exact moment you are checking your own fix."""
        self.source.write_text('{"type":"excalidraw","elements":[1]}')
        git(self.repo, "commit", "-aqm", "edit source")
        self.assertEqual(self.run_check().returncode, 1)
        self.png.write_bytes(PNG_B)   # re-rendered, not yet committed
        self.web.write_bytes(PNG_B)
        result = self.run_check()
        self.assertEqual(result.returncode, 0, result.stdout)

    def test_missing_source_fails(self) -> None:
        self.source.unlink()
        git(self.repo, "commit", "-aqm", "remove source")
        result = self.run_check()
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertIn("missing .excalidraw source", result.stdout)

    def test_every_section_is_read(self) -> None:
        """124 vs 128: the step this replaced omitted .dividers[] from its
        jq, so four entries were never checked at all."""
        path = self.repo / "website" / "src" / "data" / "diagram-manifest.json"
        manifest = json.loads(path.read_text())
        manifest["dividers"] = [{
            "id": "act-1", "src": "/diagrams/dividers/act-1.png",
            "sourceFile": "act-1.excalidraw",
        }]
        path.write_text(json.dumps(manifest))
        git(self.repo, "commit", "-aqm", "add a divider with no source")
        result = self.run_check()
        self.assertEqual(result.returncode, 1, result.stdout)
        self.assertIn("act-1.excalidraw", result.stdout)


if __name__ == "__main__":
    unittest.main(verbosity=2)
