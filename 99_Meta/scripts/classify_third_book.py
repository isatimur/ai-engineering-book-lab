#!/usr/bin/env python3
"""Classify corpus notes into Third Book per-chapter candidate shortlists.

Two layers, same shape as classify_second_book.py:

1. SEED: keyword families (SDLC/PDLC, software factory, spec-driven, ...)
   matched against note title + summary. A seed is not a shortlist.
2. CURATION: ASSIGN maps hand-picked talks (by playlist index) to one of
   the book's twelve chapters at a tier ("core" or "support").
   EXCLUDE_PLAYLIST_INDEXES drops seed hits that are passing mentions,
   non-talks or duplicates, the way book 2's EXCLUDE_NOTE_NAMES does.

CONSTRAINT: transcripts are not tracked in git (`git ls-files
99_Meta/transcripts` returns 0). This pass sees only note title, themes
and summary. Its counts are NOT the transcript full-text counts quoted in
docs/superpowers/specs/2026-11-15-third-book-design.md; they are smaller
and measure something else. Both families are printed side by side.

Usage:
    python3 99_Meta/scripts/classify_third_book.py --dry-run
    python3 99_Meta/scripts/classify_third_book.py
    python3 99_Meta/scripts/classify_third_book.py --markdown
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
META_DIR = ROOT / "99_Meta"

# A chapter with fewer core talks than this is a merge candidate.
MIN_CORE_TALKS = 6

CHAPTERS: dict[int, str] = {
    1: "The bottleneck moved",
    2: "Intent before specification",
    3: "What a specification is for",
    4: "Decomposition and the plan",
    5: "Execution under a spec",
    6: "The independence problem",
    7: "Gates that can actually fail",
    8: "Shipping, and the gap between merged and live",
    9: "Brownfield and spec rot",
    10: "The review wall",
    11: "The factory and its discontents",
    12: "How much process, and how far out of the loop",
}

# Seed families, matched case-insensitively against title + summary.
# SPEC_TRANSCRIPT_COUNTS are the spec's figures, measured against transcript
# FULL TEXT in the author's main tree. They are quoted, not recomputed here.
SEED_FAMILIES: dict[str, str] = {
    "sdlc_pdlc": r"\b(SDLC|PDLC)\b",
    "software_factory": r"software[- ]factor(y|ies)|dark factory",
    "spec_driven": r"spec[- ]driven",
    "platform_engineering": r"platform engineering",
    "internal_developer_platform": r"internal developer platform|\bIDP\b",
    "agent_factory": r"agent factor(y|ies)",
    "assembly_line": r"assembly[- ]line",
    "openspec": r"\bopenspec\b",
    "spec_kit": r"spec[- ]?kit",
    "elephant_goldfish": r"goldfish|elephant[- ]goldfish",
}
SPEC_TRANSCRIPT_COUNTS: dict[str, int | None] = {
    "sdlc_pdlc": 62,
    "software_factory": 35,
    "spec_driven": 13,
    "platform_engineering": 9,
    "internal_developer_platform": 9,
    "agent_factory": 6,
    "assembly_line": 6,
    "openspec": 2,
    "spec_kit": 0,
    "elephant_goldfish": 0,
}

# Seed hits dropped by hand. Keyed by playlist index.
EXCLUDE_PLAYLIST_INDEXES: dict[int, str] = {
    # Same title as #743; the stored summary describes a different talk
    # (malleable evals). Keep #743, drop this one as a duplicate.
    673: "duplicate title of #743; summary mismatch",
    # "Context platform engineering" is KV-cache inference economics.
    104: "false positive: inference platform, not a dev platform",
    # AI platform team for an organisation, not the delivery lifecycle.
    521: "passing: AI platform team, not the lifecycle",
    # "IDP" here is an identity provider (Okta), not a developer platform.
    627: "false positive: IDP means identity provider",
}

# Curation layer: playlist index -> (chapter, tier). One primary chapter each.
# Tiers: "core" = the title/summary is about the chapter's subject.
#        "support" = adjacent evidence a drafting pass may borrow.
# Judged from title, themes and summary only: transcripts are not available.
ASSIGN: dict[int, tuple[int, str]] = {
    # Ch 1 - the bottleneck moved
    831: (1, "core"), 1204: (1, "core"), 1216: (1, "core"), 62: (1, "core"),
    1222: (1, "core"), 1392: (1, "core"), 994: (1, "core"), 682: (1, "core"),
    60: (1, "core"), 872: (1, "core"),
    195: (1, "support"), 79: (1, "support"), 101: (1, "support"),
    36: (1, "support"), 5: (1, "support"), 424: (1, "support"),
    949: (1, "support"), 684: (1, "support"),
    # Ch 2 - intent before specification
    1244: (2, "core"), 1245: (2, "core"), 162: (2, "core"), 160: (2, "core"),
    758: (2, "support"), 161: (2, "support"), 1042: (2, "support"),
    # Ch 3 - what a specification is for
    265: (3, "core"), 40: (3, "core"), 782: (3, "core"), 738: (3, "core"),
    106: (3, "core"), 729: (3, "support"),
    # Ch 4 - decomposition and the plan
    179: (4, "core"), 691: (4, "core"), 89: (4, "core"), 1044: (4, "core"),
    621: (4, "core"), 653: (4, "support"), 646: (4, "support"),
    # Ch 5 - execution under a spec
    438: (5, "core"), 633: (5, "core"), 182: (5, "core"), 42: (5, "core"),
    1330: (5, "core"), 996: (5, "core"),
    180: (5, "support"), 761: (5, "support"), 77: (5, "support"),
    # Ch 6 - the independence problem
    1347: (6, "core"), 864: (6, "core"), 1250: (6, "core"), 995: (6, "core"),
    1091: (6, "core"), 210: (6, "core"), 1415: (6, "core"),
    1517: (6, "support"), 1433: (6, "support"), 305: (6, "support"),
    # Ch 7 - gates that can actually fail
    334: (7, "core"), 526: (7, "core"), 1310: (7, "core"), 1356: (7, "core"),
    837: (7, "core"), 731: (7, "core"), 687: (7, "core"),
    78: (7, "support"), 823: (7, "support"), 1098: (7, "support"),
    127: (7, "support"),
    # Ch 8 - shipping, and the gap between merged and live
    1227: (8, "core"), 874: (8, "core"), 1224: (8, "core"), 993: (8, "core"),
    899: (8, "core"), 1514: (8, "core"), 1094: (8, "core"), 689: (8, "core"),
    168: (8, "support"), 178: (8, "support"), 266: (8, "support"),
    103: (8, "support"),
    # Ch 9 - brownfield and spec rot
    292: (9, "core"), 991: (9, "core"), 1386: (9, "core"), 1237: (9, "core"),
    1276: (9, "core"), 57: (9, "core"),
    1445: (9, "support"), 1387: (9, "support"), 999: (9, "support"),
    # Ch 10 - the review wall
    1428: (10, "core"), 1432: (10, "core"), 1195: (10, "core"),
    1214: (10, "core"), 1280: (10, "core"), 1285: (10, "core"),
    1450: (10, "core"), 845: (10, "core"), 1021: (10, "core"),
    1041: (10, "core"),
    14: (10, "support"), 644: (10, "support"), 1074: (10, "support"),
    # Ch 11 - the factory and its discontents
    1256: (11, "core"), 1205: (11, "core"), 1206: (11, "core"),
    923: (11, "core"), 855: (11, "core"), 704: (11, "core"),
    629: (11, "core"), 743: (11, "core"), 1203: (11, "core"),
    1268: (11, "core"), 1210: (11, "core"), 1048: (11, "core"),
    924: (11, "core"),
    937: (11, "support"), 1361: (11, "support"), 785: (11, "support"),
    840: (11, "support"), 676: (11, "support"),
    # Ch 12 - how much process, and how far out of the loop
    1377: (12, "core"), 1306: (12, "core"), 1095: (12, "core"),
    357: (12, "core"), 35: (12, "core"), 711: (12, "core"),
    58: (12, "support"), 669: (12, "support"), 1235: (12, "support"),
    73: (12, "support"), 1: (12, "support"), 30: (12, "support"),
    1055: (12, "support"),
}


@dataclass
class ClassificationResult:
    seed_hits: dict[str, list[NoteRecord]] = field(default_factory=dict)
    seed_title_hits: dict[str, int] = field(default_factory=dict)
    chapters: dict[int, dict[str, list[NoteRecord]]] = field(default_factory=dict)
    excluded: list[tuple[NoteRecord, str]] = field(default_factory=list)
    seed_unassigned: dict[str, list[int]] = field(default_factory=dict)


def classify(records: list[NoteRecord]) -> ClassificationResult:
    by_index = {r.playlist_index: r for r in records}
    for idx in list(ASSIGN) + list(EXCLUDE_PLAYLIST_INDEXES):
        if idx not in by_index:
            raise SystemExit(f"curated playlist index #{idx} is not in the corpus")
    both = set(ASSIGN) & set(EXCLUDE_PLAYLIST_INDEXES)
    if both:
        raise SystemExit(f"indexes both assigned and excluded: {sorted(both)}")

    result = ClassificationResult()
    for family, pattern in SEED_FAMILIES.items():
        rx = re.compile(pattern, re.I)
        hits = [r for r in records if rx.search(f"{r.title} {r.summary}")]
        result.seed_hits[family] = hits
        result.seed_title_hits[family] = sum(1 for r in hits if rx.search(r.title))
        result.seed_unassigned[family] = sorted(
            r.playlist_index
            for r in hits
            if r.playlist_index not in ASSIGN
            and r.playlist_index not in EXCLUDE_PLAYLIST_INDEXES
        )

    for ch in CHAPTERS:
        result.chapters[ch] = {"core": [], "support": []}
    for idx, (ch, tier) in ASSIGN.items():
        result.chapters[ch][tier].append(by_index[idx])
    for idx, reason in EXCLUDE_PLAYLIST_INDEXES.items():
        result.excluded.append((by_index[idx], reason))
    for ch in result.chapters.values():
        for tier in ch:
            ch[tier].sort(key=lambda r: r.playlist_index)
    return result


def below_threshold(result: ClassificationResult) -> list[int]:
    return [
        ch for ch, tiers in result.chapters.items()
        if len(tiers["core"]) < MIN_CORE_TALKS
    ]


def shortlist_total(result: ClassificationResult) -> int:
    return sum(len(t["core"]) + len(t["support"]) for t in result.chapters.values())


def markdown_shortlist(result: ClassificationResult) -> str:
    lines: list[str] = []
    for ch, title in CHAPTERS.items():
        tiers = result.chapters[ch]
        lines += [
            f"### Ch {ch} - {title}",
            "",
            f"Core: {len(tiers['core'])}. Support: {len(tiers['support'])}.",
            "",
        ]
        for tier in ("core", "support"):
            for r in tiers[tier]:
                lines.append(f"- {tier}: #{r.playlist_index} {r.title}")
        lines.append("")
    return "\n".join(lines)


def build_report(records: list[NoteRecord], result: ClassificationResult) -> dict:
    return {
        "total_notes": len(records),
        "measured_on": "note title + summary (transcripts not tracked in git)",
        "seed_counts": {
            family: {
                "note_derived_title_or_summary": len(result.seed_hits[family]),
                "note_derived_title_only": result.seed_title_hits[family],
                "spec_transcript_full_text": SPEC_TRANSCRIPT_COUNTS[family],
                "unassigned_playlist_indexes": result.seed_unassigned[family],
            }
            for family in SEED_FAMILIES
        },
        "shortlisted_total": shortlist_total(result),
        "min_core_talks": MIN_CORE_TALKS,
        "chapters": {
            str(ch): {
                "title": CHAPTERS[ch],
                "core": len(t["core"]),
                "support": len(t["support"]),
            }
            for ch, t in result.chapters.items()
        },
        "chapters_below_threshold": below_threshold(result),
        "excluded": {
            f"#{r.playlist_index}": reason for r, reason in result.excluded
        },
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true")
    parser.add_argument("--markdown", action="store_true",
                        help="print the per-chapter shortlist as Markdown and exit")
    args = parser.parse_args()

    records = load_existing_notes()
    result = classify(records)

    if args.markdown:
        print(markdown_shortlist(result))
        return

    print(json.dumps(build_report(records, result), indent=2))

    if args.dry_run:
        return

    (META_DIR / "third-book-classification.json").write_text(
        json.dumps(
            {
                "_generated_by": "99_Meta/scripts/classify_third_book.py",
                "_generated_at": datetime.now(timezone.utc)
                .replace(microsecond=0)
                .isoformat(),
                "_regenerate_after": "corpus-sync",
                "_measured_on": "note title + summary; transcripts not in git",
                "seed_counts": build_report(records, result)["seed_counts"],
                "chapters": {
                    str(ch): {
                        "title": CHAPTERS[ch],
                        "core": [r.note_name for r in t["core"]],
                        "support": [r.note_name for r in t["support"]],
                    }
                    for ch, t in result.chapters.items()
                },
                "chapters_below_threshold": below_threshold(result),
                "excluded": [
                    {"note_name": r.note_name, "reason": reason}
                    for r, reason in result.excluded
                ],
            },
            indent=2,
        )
        + "\n"
    )


if __name__ == "__main__":
    main()
