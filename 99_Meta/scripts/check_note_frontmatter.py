#!/usr/bin/env python3
"""Validate 01_Videos note frontmatter and required sections.

Guards the note-enrichment pass: rewriting `summary:` by hand (or by agent)
can break YAML quoting, and a rewrite can accidentally drop a section. Runs
stdlib-only, so it works in CI alongside the other 99_Meta scripts.

Exit 1 on any structural problem.
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
REQUIRED_KEYS = ("video_id", "playlist_index", "title", "url", "summary")
REQUIRED_SECTIONS = ("## Summary", "## Metadata")
# Two note formats coexist: the ingest default (`## Why it matters`) and the
# richer enriched form (`## Book angles` + transcript sections). Either
# satisfies the "note states its relevance" requirement.
RELEVANCE_SECTIONS = ("## Why it matters", "## Book angles")


def main() -> None:
    problems: list[str] = []
    checked = 0

    for n in sorted((ROOT / "01_Videos").glob("*.md")):
        text = n.read_text()
        if not text.startswith("---\n"):
            problems.append(f"{n.name}: missing frontmatter block")
            continue
        end = text.find("\n---\n", 4)
        if end == -1:
            problems.append(f"{n.name}: unterminated frontmatter")
            continue
        fm, body = text[4:end], text[end + 5 :]
        checked += 1

        for key in REQUIRED_KEYS:
            if not re.search(rf"^{key}:", fm, re.M):
                problems.append(f"{n.name}: frontmatter missing `{key}`")

        # `summary:` must be one double-quoted scalar on a single line. Inner
        # quotes are fine when backslash-escaped (valid YAML double-quoted
        # style, which the ingest script emits via safe_yaml).
        m = re.search(r'^summary: (.*)$', fm, re.M)
        if m:
            val = m.group(1).strip()
            if not (val.startswith('"') and val.endswith('"') and len(val) >= 2):
                problems.append(f"{n.name}: summary is not a single double-quoted scalar")
            elif re.search(r'(?<!\\)"', val[1:-1]):
                problems.append(f"{n.name}: summary contains an unescaped double quote")

        for sec in REQUIRED_SECTIONS:
            if sec not in body:
                problems.append(f"{n.name}: missing section `{sec}`")
        if not any(sec in body for sec in RELEVANCE_SECTIONS):
            problems.append(
                f"{n.name}: missing a relevance section "
                f"(one of {', '.join(RELEVANCE_SECTIONS)})")

    print(f"notes checked: {checked}")
    if problems:
        print(f"PROBLEMS: {len(problems)}")
        for p in problems[:40]:
            print(f"  {p}")
        if len(problems) > 40:
            print(f"  … and {len(problems) - 40} more")
        raise SystemExit(1)
    print("PASS — all note frontmatter and sections valid.")


if __name__ == "__main__":
    main()
