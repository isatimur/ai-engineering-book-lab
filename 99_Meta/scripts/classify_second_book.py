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
from datetime import datetime, timezone
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from ingest_ai_engineer_videos import load_existing_notes, NoteRecord  # noqa: E402

ROOT = Path(__file__).resolve().parents[2]
BOOK_IDEAS_DIR = ROOT / "05_Book_Ideas"
META_DIR = ROOT / "99_Meta"

PART1_THEME = "Models & Inference"

# Vertical/domain keywords for Part II — matched case-insensitively against title.
#
# Fix round 2 (2026-07-28, final whole-branch review): the original list
# undercounted against the plan's own stated 30-50 dry-run range (it produced
# only 20). Added government/regulation, health/clinical/patient/coach,
# insurance, retail, taxes, construction, game, and self-driving to cover
# vertical talks the original list missed entirely — see task-1-report.md
# "Final review fix wave" for the specific talks each addition recovers.
PART2_KEYWORDS = [
    "biology", "cell", "oncology", "robot", "chess", "spark", "chemistry",
    "physics", "medicine", "medical", "drug", "genomic", "climate",
    "agriculture", "legal", "law", "finance", "trading", "music",
    "video game", "drone", "manufactur", "telemedicine", "education",
    "government", "regulat", "health", "clinical", "patient", "coach",
    "insurance", "retail", "taxes", "construction", "game", "self-driving",
]

# Keywords that intentionally match as a left-anchored *prefix* only (no
# trailing \b), because the vertical is legitimately expressed via a
# morphological variant that extends past the bare keyword:
#   - "manufactur" -> "manufacturing", "manufacturer", "manufactured"
#   - "robot"      -> "robots", "robotics", "robotic"
#   - "regulat"    -> "regulation", "regulations", "regulatory"
#   - "game"       -> "games", "gaming" (also matches bare "game")
# All other keywords get both a leading and trailing \b so they only match
# as whole words (this is what prevents substring artifacts like "law"
# inside "Claw"/"Lawrence" or "cell" inside "Excellence" from matching at
# all — see EXCLUDE_NOTE_NAMES below for the remaining false positives
# that whole-word matching cannot rule out).
#
# "taxes" (not bare "tax") is used deliberately: a bare \btax\b prefix would
# swallow "Taxonomy" (unrelated to the tax vertical), while "taxes" as a
# whole word cleanly matches "explain taxes to millions of taxpayers" and
# nothing else in the corpus (checked against titles at fix time).
PREFIX_MATCH_KEYWORDS = {"manufactur", "robot", "regulat", "game"}

# Notes that match a Part II keyword as a genuine whole-word match but are
# false positives for *meaning* (not substring/boundary artifacts) — hand-
# curated during the 2026-07-27 design pass, fix round 1 on 2026-07-28,
# fix round 2 (keyword expansion) same day.
#
# NOTE: an earlier version of this set (and PART2_KEYWORDS pattern) had no
# word-boundary anchoring, so 14 additional entries were needed to exclude
# pure substring matches (e.g. "law" inside "Claw"/"Lawrence", "cell" inside
# "Excellence", "spark" inside "sparkle", "robot" inside "DataRobot"). Once
# build_keyword_pattern() anchors each keyword with \b, those 14 never match
# in the first place and were removed from this set as redundant. Only the
# genuine semantic false positives (irreducible by word-boundary anchoring)
# remain below.
EXCLUDE_NOTE_NAMES: set[str] = {
    # Non-talk: instrumental music interlude, not a talk.
    "092-xAfp-znTRx8-music-from-aie-code-summit-instrumentals",
    # False positive: "law" is a genuine whole-word match inside "Conway's Law"
    # (org-design principle, not the legal vertical).
    "460-FpJ9dPe1qYQ-reverse-conway-s-law-and-genai-how-agents-will-take-over-the-organisation-patrick-debois",
    # False positive: "spark" is a genuine whole-word match inside product name
    # "Codex Spark" (fast inference tooling, not Apache Spark/data vertical).
    "702-TeGsFFNqRLA-codex-spark-fast-models-need-slow-developers-sarah-chieng-cerebras",
    # False positive: "game" (via the new "game" prefix keyword) is a genuine
    # match inside "The Benchmarks Game" — a metaphor for eval gaming/rigging,
    # not the games/entertainment vertical. Theme is "Evals & Reliability".
    "389-EnT4Wej5M5k-the-benchmarks-game-why-it-s-rigged-and-how-you-can-really-win-darius-emrani",
}


@dataclass
class ClassificationResult:
    part1: list[NoteRecord] = field(default_factory=list)
    part2: list[NoteRecord] = field(default_factory=list)
    part2_excluded: list[str] = field(default_factory=list)
    # Notes routed to Part I (because "Models & Inference" classification
    # takes precedence) whose title *also* matches a Part II keyword. Tracked
    # so a future drafting pass can see the overlap instead of losing it
    # silently — see Minor finding #5, task-1-report.md "Final review fix wave".
    part1_part2_keyword_overlap: list[str] = field(default_factory=list)


def build_keyword_pattern(keywords: list[str]) -> re.Pattern[str]:
    """Compile a word-boundary-anchored alternation over PART2_KEYWORDS.

    Every keyword gets a leading `\\b`. All keywords except those in
    PREFIX_MATCH_KEYWORDS also get a trailing `\\b`; PREFIX_MATCH_KEYWORDS
    entries intentionally omit the trailing boundary so they still match as
    a prefix inside longer words (e.g. "manufactur" inside "manufacturing",
    "robot" inside "robotics").
    """
    parts = [
        rf"\b{re.escape(k)}" if k in PREFIX_MATCH_KEYWORDS else rf"\b{re.escape(k)}\b"
        for k in keywords
    ]
    return re.compile("|".join(parts), re.I)


def classify(records: list[NoteRecord]) -> ClassificationResult:
    result = ClassificationResult()
    keyword_pattern = build_keyword_pattern(PART2_KEYWORDS)

    for record in records:
        if PART1_THEME in record.themes:
            result.part1.append(record)
            if keyword_pattern.search(record.title):
                result.part1_part2_keyword_overlap.append(record.note_name)
            continue
        if keyword_pattern.search(record.title):
            if record.note_name in EXCLUDE_NOTE_NAMES:
                result.part2_excluded.append(record.note_name)
                continue
            result.part2.append(record)

    return result


PROVENANCE_NOTE = (
    "> Generated by `99_Meta/scripts/classify_second_book.py` — regenerate "
    "after corpus-sync rather than hand-editing this file."
)


def write_shortlist(
    path: Path,
    title: str,
    records: list[NoteRecord],
    extra_note: str | None = None,
) -> None:
    lines = [f"# {title}", "", PROVENANCE_NOTE]
    if extra_note:
        lines.append(f"> {extra_note}")
    lines += ["", f"Candidates: {len(records)}", ""]
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
        "part1_part2_keyword_overlap_count": len(result.part1_part2_keyword_overlap),
        "part1_part2_keyword_overlap": result.part1_part2_keyword_overlap,
    }
    print(json.dumps(report, indent=2))

    if args.dry_run:
        return

    write_shortlist(
        BOOK_IDEAS_DIR / "Second Book - Part I Candidates.md",
        "Second Book — Part I Candidates (The Model Layer)",
        result.part1,
        extra_note=(
            "This is the raw theme-filtered list (all 129 `Models & Inference`-"
            "tagged notes) pending a hand-curation pass down to the strongest "
            "40-60, per the design spec (`docs/superpowers/specs/"
            "2026-07-27-second-book-design.md`)."
        ),
    )
    write_shortlist(
        BOOK_IDEAS_DIR / "Second Book - Part II Candidates.md",
        "Second Book — Part II Candidates (The Long Tail)",
        result.part2,
    )
    (META_DIR / "second-book-classification.json").write_text(
        json.dumps(
            {
                "_generated_by": "99_Meta/scripts/classify_second_book.py",
                "_generated_at": datetime.now(timezone.utc)
                .replace(microsecond=0)
                .isoformat(),
                "_regenerate_after": "corpus-sync",
                "part1": [r.note_name for r in result.part1],
                "part2": [r.note_name for r in result.part2],
                "part2_excluded": result.part2_excluded,
                "part1_part2_keyword_overlap": result.part1_part2_keyword_overlap,
            },
            indent=2,
        )
        + "\n"
    )


if __name__ == "__main__":
    main()
