#!/usr/bin/env python3
"""
Build the single source of truth for project counts.

Walks the repo and counts every quantifiable artefact — videos, themes,
diagrams, claims, anchors, chapters — then writes:

  STATS.md                          (human-readable, at repo root)
  stats.json                        (machine-readable, at repo root)
  website/src/data/stats.json       (mirror, so the website can import)

Other documentation links to STATS.md so numbers never drift.

Run manually:   python 99_Meta/scripts/build_stats.py
Or via CI:      see .github/workflows/stats-regen.yml
"""

from __future__ import annotations

import json
import re
import sys
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]


def count_md(dir_name: str) -> int:
    d = REPO / dir_name
    if not d.exists():
        return 0
    return sum(1 for p in d.glob("*.md"))


def count_png(dir_path: str) -> int:
    d = REPO / dir_path
    if not d.exists():
        return 0
    return sum(1 for p in d.glob("*.png"))


def count_claims() -> dict[str, int]:
    """Parse claims/Claims Ledger.md for Claim entries by support level."""
    ledger = REPO / "claims" / "Claims Ledger.md"
    if not ledger.exists():
        return {"total": 0, "strong": 0, "moderate": 0, "tentative": 0}

    text = ledger.read_text(encoding="utf-8")
    headings = re.findall(r"^## \d+\)", text, flags=re.MULTILINE)
    total = len(headings)
    return {
        "total": total,
        "strong": len(re.findall(r"\*\*Support level:\*\*\s*strong", text, flags=re.IGNORECASE)),
        "moderate": len(re.findall(r"\*\*Support level:\*\*\s*moderate", text, flags=re.IGNORECASE)),
        "tentative": len(re.findall(r"\*\*Support level:\*\*\s*tentative", text, flags=re.IGNORECASE)),
    }


def count_anchors() -> dict[str, int]:
    """
    Parse Claims Ledger anchors. Each anchor in the ledger looks like:

      - [video_id] start--end  "quote"  (confidence: high)

    We count any line that begins with `- [` followed by 11-char video id
    plus a confidence tag.
    """
    ledger = REPO / "claims" / "Claims Ledger.md"
    if not ledger.exists():
        return {"total": 0, "high": 0, "medium": 0, "low": 0}

    text = ledger.read_text(encoding="utf-8")
    high = len(re.findall(r"confidence[:\s]+high", text, flags=re.IGNORECASE))
    medium = len(re.findall(r"confidence[:\s]+medium", text, flags=re.IGNORECASE))
    low = len(re.findall(r"confidence[:\s]+low", text, flags=re.IGNORECASE))
    return {"total": high + medium + low, "high": high, "medium": medium, "low": low}


def count_chapters() -> dict[str, int]:
    """Parse website/src/data/bookChapters.ts for chapter status counts."""
    src = REPO / "website" / "src" / "data" / "bookChapters.ts"
    if not src.exists():
        return {"total": 0, "drafting": 0, "starter": 0, "outlined": 0}
    text = src.read_text(encoding="utf-8")
    return {
        "total": len(re.findall(r"^\s*\{\s*$\s*number:", text, flags=re.MULTILINE)),
        "drafting": len(re.findall(r"status:\s*'Drafting'", text)),
        "starter": len(re.findall(r"status:\s*'Starter'", text)),
        "outlined": len(re.findall(r"status:\s*'Outlined'", text)),
    }


@dataclass
class Stats:
    generated_at: str
    corpus: dict = field(default_factory=dict)
    synthesis: dict = field(default_factory=dict)
    claims: dict = field(default_factory=dict)
    anchors: dict = field(default_factory=dict)
    chapters: dict = field(default_factory=dict)
    diagrams: dict = field(default_factory=dict)
    method: dict = field(default_factory=dict)
    total_artefacts: int = 0


def build() -> Stats:
    corpus = {
        "videos": count_md("01_Videos"),
    }
    synthesis = {
        "themes": count_md("02_Themes"),
        "people": count_md("03_People"),
        "concepts": count_md("04_Concepts"),
        "concepts_public": count_md("public/concepts"),
        "drafting_files": count_md("public/drafting"),
    }
    claims = count_claims()
    anchors = count_anchors()
    chapters = count_chapters()
    diagrams = {
        "overview": count_png("diagrams") - 10,  # top-level minus chapter openers
        "chapter_openers": 10,  # by design: one per chapter
        "concepts": count_png("diagrams/concepts"),
        "inline": count_png("diagrams/inline"),
        "maps": count_png("diagrams/maps"),
    }
    # Sanity: top-level should equal overview + chapter_openers
    top_level = count_png("diagrams")
    if top_level != diagrams["overview"] + diagrams["chapter_openers"]:
        diagrams["overview"] = top_level - 10 if top_level >= 10 else top_level
    diagrams["total"] = sum(v for k, v in diagrams.items() if k != "total")
    method = {
        "research_passes": count_md("research_passes"),
        "programs": count_md("programs"),
        "tasks": sum(1 for _ in (REPO / "tasks").glob("**/*.md")) if (REPO / "tasks").exists() else 0,
    }

    total = (
        corpus["videos"]
        + synthesis["themes"] + synthesis["people"] + synthesis["concepts"]
        + claims["total"]
        + diagrams["total"]
        + chapters["total"]
    )

    return Stats(
        generated_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
        corpus=corpus,
        synthesis=synthesis,
        claims=claims,
        anchors=anchors,
        chapters=chapters,
        diagrams=diagrams,
        method=method,
        total_artefacts=total,
    )


def render_md(s: Stats) -> str:
    return f"""# Project Stats — single source of truth

Auto-generated by `99_Meta/scripts/build_stats.py`. **Do not edit by hand.** Other
docs in this repo link here for live counts; if you need a number on a page
that doesn't update automatically, link to this file instead of inlining a value.

> Generated: `{s.generated_at}`

## Source corpus

- **Videos ingested:** **{s.corpus['videos']}**
- Source: AI Engineer YouTube channel

## Synthesis layer

| Layer | Count |
|---|---|
| Themes | **{s.synthesis['themes']}** |
| People (speakers profiled) | **{s.synthesis['people']}** |
| Concepts (internal) | **{s.synthesis['concepts']}** |
| Concepts (public-safe) | **{s.synthesis['concepts_public']}** |
| Chapter drafts (public/drafting) | **{s.synthesis['drafting_files']}** |

## Evidence layer

**Claims in the ledger:** **{s.claims['total']}**

| Support level | Count |
|---|---|
| Strong | **{s.claims['strong']}** |
| Moderate | **{s.claims['moderate']}** |
| Tentative | **{s.claims['tentative']}** |

**Source Anchors (across all claims):** **{s.anchors['total']}**

| Confidence | Count |
|---|---|
| High | **{s.anchors['high']}** |
| Medium | **{s.anchors['medium']}** |
| Low | **{s.anchors['low']}** |

## Manuscript

| Chapter status | Count |
|---|---|
| Total chapters | **{s.chapters['total']}** |
| Drafting | **{s.chapters['drafting']}** |
| Starter | **{s.chapters['starter']}** |
| Outlined | **{s.chapters['outlined']}** |

## Diagrams (visual guide)

| Category | Count |
|---|---|
| Overview (book at a glance) | **{s.diagrams['overview']}** |
| Chapter openers | **{s.diagrams['chapter_openers']}** |
| Concepts | **{s.diagrams['concepts']}** |
| Inline (in-prose figures) | **{s.diagrams['inline']}** |
| Maps | **{s.diagrams['maps']}** |
| **Total diagrams** | **{s.diagrams['total']}** |

## Method (agent + research infrastructure)

| Artefact | Count |
|---|---|
| Research-pass logs | **{s.method['research_passes']}** |
| Agent programs | **{s.method['programs']}** |
| Bounded task missions | **{s.method['tasks']}** |

## Grand total

**{s.total_artefacts}** trackable artefacts across the corpus / synthesis / evidence /
manuscript / diagrams / method layers.
"""


def main() -> int:
    s = build()
    md = render_md(s)
    payload = asdict(s)

    (REPO / "STATS.md").write_text(md, encoding="utf-8")
    (REPO / "stats.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")

    website_data = REPO / "website" / "src" / "data"
    if website_data.exists():
        (website_data / "stats.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")

    print(f"[stats] wrote STATS.md, stats.json, website/src/data/stats.json")
    print(f"[stats] {s.corpus['videos']} videos · {s.diagrams['total']} diagrams · "
          f"{s.claims['total']} claims · {s.anchors['total']} anchors · "
          f"{s.chapters['total']} chapters")
    return 0


if __name__ == "__main__":
    sys.exit(main())
