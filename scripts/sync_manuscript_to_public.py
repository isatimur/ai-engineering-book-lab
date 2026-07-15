#!/usr/bin/env python3
"""Sync latest compiled manuscript into canonical public/drafting and web content.

Source of truth: 05_Book_Ideas/Drafting Layer/AI Engineering Book - Manuscript Draft.md
Targets:
  - public/drafting/Chapter N - Title.md  (canonical Manuscript)
  - website/src/content/chapter-NN.md     (site source)
Then regenerates website/public/read/*.md, llms.txt, llms-full.txt.
"""
from __future__ import annotations

import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
SOURCE = REPO / "05_Book_Ideas/Drafting Layer/AI Engineering Book - Manuscript Draft.md"
DRAFTING_DIR = REPO / "public/drafting"
CONTENT_DIR = REPO / "website/src/content"
WEBSITE_ROOT = REPO / "website"


def extract_chapters(text: str) -> list[tuple[int, str, str]]:
    """Return (number, title, body) for each chapter H1 in the compiled manuscript.

    Title is taken from the H1 line (e.g. "Chapter 1 — The Shift: From Assistant to Delegate").
    Body starts right after the H1.
    """
    # Split on chapter H1 lines like '# Chapter 1 — ...'
    chapter_pattern = re.compile(r"^# Chapter\s+(\d+)\s*[—-]\s*(.+)$", re.MULTILINE)
    matches = list(chapter_pattern.finditer(text))
    chapters = []
    for i, m in enumerate(matches):
        num = int(m.group(1))
        title = m.group(2).strip()
        start = m.end() + 1
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        body = _strip_terminal_rules(text[start:end])
        chapters.append((num, title, body))
    return chapters


def existing_draft_paths() -> dict[int, Path]:
    """Map chapter number to the existing public/drafting file path."""
    mapping: dict[int, Path] = {}
    for p in DRAFTING_DIR.iterdir():
        if p.suffix.lower() != ".md":
            continue
        m = re.match(r"^Chapter\s+(\d+)\b", p.name, re.IGNORECASE)
        if m:
            mapping[int(m.group(1))] = p
    return mapping


def _strip_terminal_rules(text: str) -> str:
    """Remove trailing horizontal-rule / blank lines so files end cleanly."""
    lines = text.splitlines()
    while lines and lines[-1].strip() in ("", "---", "***", "___"):
        lines.pop()
    return "\n".join(lines)


def main(dry_run: bool = False) -> int:
    if not SOURCE.exists():
        print(f"Error: source manuscript not found: {SOURCE}", file=sys.stderr)
        return 1

    text = SOURCE.read_text(encoding="utf-8")
    chapters = extract_chapters(text)
    if len(chapters) != 10:
        print(f"Error: expected 10 chapters, found {len(chapters)}", file=sys.stderr)
        return 1

    draft_paths = existing_draft_paths()
    if set(draft_paths.keys()) != set(range(1, 11)):
        missing = sorted(set(range(1, 11)) - set(draft_paths.keys()))
        print(f"Error: missing public/drafting files for chapters: {missing}", file=sys.stderr)
        return 1

    changed_public = []
    changed_web = []

    for num, title, body in chapters:
        # Public/drafting: keep existing filename, write clean chapter body
        public_path = draft_paths[num]
        public_content = f"# Chapter {num} — {title}\n\n{body}\n"
        if not public_path.exists() or public_path.read_text(encoding="utf-8") != public_content:
            if not dry_run:
                public_path.write_text(public_content, encoding="utf-8")
            changed_public.append(public_path)

        # Website content
        web_path = CONTENT_DIR / f"chapter-{num:02d}.md"
        web_content = public_content.rstrip() + "\n"
        if not web_path.exists() or web_path.read_text(encoding="utf-8") != web_content:
            if not dry_run:
                web_path.write_text(web_content, encoding="utf-8")
            changed_web.append(web_path)

    # Regenerate LLM-readable files
    if not dry_run:
        subprocess.run(["node", "website/scripts/gen-llms.mjs"], cwd=REPO, check=True)
        subprocess.run(["node", "website/scripts/gen-sitemap.mjs"], cwd=REPO, check=True)

    print("Chapters found and written:")
    for num, title, _ in chapters:
        print(f"  Ch{num:02d}: {title}")
    if dry_run:
        print("\nDry run — no files modified.")
        print(f"Would update {len(changed_public)} public/drafting files and {len(changed_web)} web files.")
    else:
        print(f"\nUpdated {len(changed_public)} public/drafting files.")
        print(f"Updated {len(changed_web)} website/src/content files.")
        print("Regenerated llms.txt, llms-full.txt, read/*.md, and sitemap.xml.")
    return 0


if __name__ == "__main__":
    dry = "--dry-run" in sys.argv
    sys.exit(main(dry_run=dry))
