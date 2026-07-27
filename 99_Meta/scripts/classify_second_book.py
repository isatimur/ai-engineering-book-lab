#!/usr/bin/env python3
"""Classify corpus notes into Second Book candidate buckets.

Part I — The Model Layer: notes tagged "Models & Inference".
Part II — The Long Tail: notes whose title matches a vertical/domain
keyword, manually curated to drop non-talk noise (see EXCLUDE_NOTE_NAMES).

Usage:
    python3 99_Meta/scripts/classify_second_book.py --dry-run
    python3 99_Meta/scripts/classify_second_book.py
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from dataclasses import dataclass, field
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ingest_ai_engineer_videos import load_existing_notes, NoteRecord  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
BOOK_IDEAS_DIR = ROOT / "05_Book_Ideas"
META_DIR = ROOT / "99_Meta"

PART1_THEME = "Models & Inference"

# Vertical/domain keywords for Part II — matched case-insensitively against title.
PART2_KEYWORDS = [
    "biology", "cell", "oncology", "robot", "chess", "spark", "chemistry",
    "physics", "medicine", "medical", "drug", "genomic", "climate",
    "agriculture", "legal", "law", "finance", "trading", "music",
    "video game", "drone", "manufactur", "telemedicine", "education",
]

# Notes that match a Part II keyword but are not actually talks (music
# interludes, sponsor stings, etc.) — hand-curated during the 2026-07-27
# design pass. Keyed by note_name (filename stem).
EXCLUDE_NOTE_NAMES: set[str] = {
    # Non-talk: instrumental music interlude, not a talk.
    "092-xAfp-znTRx8-music-from-aie-code-summit-instrumentals",
    # False positive: "law" matched inside "Claw" (OpenClaw branding), not legal.
    "015-zgNvts_2TUE-state-of-the-claw-peter-steinberger",
    "641-sJ2jc7leKBk-making-openclaw-my-life-infrastructure-radek-sienkiewicz-velvetshark-com",
    "672-vAIDdLKB6-w-a-piece-of-pi-embedding-the-openclaw-coding-agent-in-your-product-matthias-luebken-tavon",
    "673-4VhbYlfC7Gs-dark-factory-how-openclaw-ships-faster-than-you-can-read-the-diff-vincent-koc",
    "698-VaS2h-dY1-4-scaling-agents-on-kubernetes-with-acpx-and-acp-onur-solmaz-openclaw",
    "701-F1DYkY1BlfM-openclaw-in-containers-the-lobster-trap-sally-ann-o-malley-red-hat",
    "743-pmoDeA3RBZY-dark-factory-openclaw-ships-faster-than-you-can-read-the-diff-vincent-koc-openclaw",
    "790-akk6KRlcwW4-openclaw-in-your-hand-building-a-physical-ai-terminal-lech-kalinowski-callstack",
    "842-xg1zNlzw7Jk-claws-out-securing-and-building-with-openclaw-nick-taylor-pomerium",
    "908-8qWIPUia2O8-every-harness-will-become-a-claw-sam-bhagwat-mastra",
    # False positive: "law" matched inside speaker surname "Lawrence".
    "689-L2r6vLlLgs8-fighting-ai-with-ai-lawrence-jones-incident",
    # False positive: "law" matched inside "Conway's Law" (org-design principle, not legal vertical).
    "460-FpJ9dPe1qYQ-reverse-conway-s-law-and-genai-how-agents-will-take-over-the-organisation-patrick-debois",
    # False positive: "cell" matched inside "Excellence".
    "314-J4vPq2i0QzE-agentic-excellence-mastering-ai-agent-evals-w-azure-ai-evaluation-sdk-cedric-vidal-microso",
    # False positive: "spark" matched inside "sparkle".
    "353-J3oJqan2Gv8-mcps-are-boring-or-why-we-are-losing-the-sparkle-of-llms-manuel-odendahl",
    # False positive: "spark" matched inside product name "Codex Spark" (fast inference tooling, not Apache Spark/data vertical).
    "702-TeGsFFNqRLA-codex-spark-fast-models-need-slow-developers-sarah-chieng-cerebras",
    # False positive: "robot" matched inside company name "DataRobot", talk is about SDKs/skills, not robotics.
    "885-LC3-P7v3yoI-skills-are-the-new-sdks-elvin-aghammadzada-datarobot",
}


@dataclass
class ClassificationResult:
    part1: list[NoteRecord] = field(default_factory=list)
    part2: list[NoteRecord] = field(default_factory=list)
    part2_excluded: list[str] = field(default_factory=list)


def classify(records: list[NoteRecord]) -> ClassificationResult:
    result = ClassificationResult()
    keyword_pattern = re.compile("|".join(re.escape(k) for k in PART2_KEYWORDS), re.I)

    for record in records:
        if PART1_THEME in record.themes:
            result.part1.append(record)
            continue
        if keyword_pattern.search(record.title):
            if record.note_name in EXCLUDE_NOTE_NAMES:
                result.part2_excluded.append(record.note_name)
                continue
            result.part2.append(record)

    return result


def write_shortlist(path: Path, title: str, records: list[NoteRecord]) -> None:
    lines = [f"# {title}", "", f"Candidates: {len(records)}", ""]
    for r in sorted(records, key=lambda x: x.playlist_index):
        lines.append(f"- [[{r.note_name}|#{r.playlist_index} — {r.title}]]")
    path.write_text("\n".join(lines) + "\n")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    records = load_existing_notes()
    result = classify(records)

    report = {
        "total_notes": len(records),
        "part1_count": len(result.part1),
        "part2_count": len(result.part2),
        "part2_excluded_count": len(result.part2_excluded),
        "part2_excluded_names": result.part2_excluded,
    }
    print(json.dumps(report, indent=2))

    if args.dry_run:
        return

    write_shortlist(
        BOOK_IDEAS_DIR / "Second Book - Part I Candidates.md",
        "Second Book — Part I Candidates (The Model Layer)",
        result.part1,
    )
    write_shortlist(
        BOOK_IDEAS_DIR / "Second Book - Part II Candidates.md",
        "Second Book — Part II Candidates (The Long Tail)",
        result.part2,
    )
    (META_DIR / "second-book-classification.json").write_text(
        json.dumps(
            {
                "part1": [r.note_name for r in result.part1],
                "part2": [r.note_name for r in result.part2],
                "part2_excluded": result.part2_excluded,
            },
            indent=2,
        )
        + "\n"
    )


if __name__ == "__main__":
    main()
