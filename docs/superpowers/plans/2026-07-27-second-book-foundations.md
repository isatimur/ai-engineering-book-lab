# Second Book Foundations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stand up the engineering foundations for the second book (classification tooling + manuscript-track scaffolding + distinct diagram identity) so chapter drafting can begin against real, curated shortlists instead of guesses.

**Architecture:** Three independent, testable deliverables: (1) a classification script that reads the existing corpus and produces two curated candidate shortlists (Model Layer, Long Tail), (2) a second manuscript track (`public/drafting-2/`, `book-mash-2.toml`, `claims-2/`, `evidence-2/`) that reuses the existing book-mash/claims-ledger engine unmodified, and (3) a distinct diagram identity (`diagrams-2/STYLE.md` + one adapted skeleton) with the teal/rose signature mark from the design spec. All three reuse existing conventions in this repo rather than introducing new frameworks.

**Tech Stack:** Python 3 (stdlib only, matching `99_Meta/scripts/` conventions — no new dependencies), TOML config (book-mash), Excalidraw JSON (diagram skeletons), Markdown.

## Global Constraints

- No pytest/test framework introduction — this repo's Python scripts (`99_Meta/scripts/*.py`) have no test suite; they self-validate via `--dry-run` JSON reports. Follow that convention, don't add a new one.
- Never invent claims, quotes, transcript content, or chapter prose. This plan produces scaffolding and classification data only — no chapter drafting (see "Deliberately not in this plan" at the end).
- Reuse the existing book-mash engine and claims-ledger discipline unmodified — book 2 gets its own config/data, not a forked engine (per spec Q4).
- Diagram signature colors are exact: teal `#0e7490` (left segment) and rose `#be185d` (right segment) — per spec Q5, replacing book 1's blue `#3b82f6` / green `#047857`.
- Source spec: `docs/superpowers/specs/2026-07-27-second-book-design.md` (commit `813373f`).

---

### Task 1: Corpus classification script

**Files:**
- Create: `99_Meta/scripts/classify_second_book.py`
- Create: `05_Book_Ideas/Second Book - Part I Candidates.md`
- Create: `05_Book_Ideas/Second Book - Part II Candidates.md`
- Create: `99_Meta/second-book-classification.json`

**Interfaces:**
- Consumes: `load_existing_notes() -> list[NoteRecord]` from `99_Meta/scripts/ingest_ai_engineer_videos.py` (already defined, returns `NoteRecord(note_name, title, playlist_index, themes, transcript_status, summary)`)
- Produces: `classify(records: list[NoteRecord]) -> ClassificationResult` (new dataclass with fields `part1: list[NoteRecord]`, `part2: list[NoteRecord]`, `part2_excluded: list[str]`) — no other task depends on this function directly, but the two output Markdown files and the JSON file are consumed by future drafting work (out of scope here).

- [ ] **Step 1: Write `classify_second_book.py` with the classification logic**

```python
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
    # e.g. "123-abcXYZ-music-from-aie-code-summit-instrumentals",
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
```

- [ ] **Step 2: Run in dry-run mode and verify the report shape**

```bash
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
python3 99_Meta/scripts/classify_second_book.py --dry-run
```

Expected: valid JSON printed with `total_notes` equal to the corpus size (941 as of the last corpus-sync), `part1_count` around 129 (may drift slightly as the corpus grows), and a `part2_count` in the 30-50 range. No traceback.

- [ ] **Step 3: Hand-review the Part II keyword matches for noise**

```bash
python3 99_Meta/scripts/classify_second_book.py --dry-run | python3 -c "
import json, sys
report = json.load(sys.stdin)
print('part2 excluded so far:', report['part2_excluded_names'])
"
```

Read through `05_Book_Ideas/Second Book - Part II Candidates.md` once generated in step 4 below, and for every entry that turns out to be a non-talk (sponsor sting, music interlude, etc.) or a false-positive keyword match, add its `note_name` to `EXCLUDE_NOTE_NAMES` in the script and re-run. This is a manual curation loop, not a one-shot — budget for 2-3 iterations.

- [ ] **Step 4: Run for real and verify every listed note resolves to a real file**

```bash
python3 99_Meta/scripts/classify_second_book.py
python3 -c "
from pathlib import Path
import re
root = Path('.')
for f in ['05_Book_Ideas/Second Book - Part I Candidates.md', '05_Book_Ideas/Second Book - Part II Candidates.md']:
    text = (root / f).read_text()
    names = re.findall(r'\[\[([^|\]]+)\|', text)
    missing = [n for n in names if not (root / '01_Videos' / f'{n}.md').exists()]
    print(f, '-> missing:', missing)
"
```

Expected: `missing: []` for both files — every wikilink target must exist as a real note.

- [ ] **Step 5: Commit**

```bash
git add 99_Meta/scripts/classify_second_book.py \
        "05_Book_Ideas/Second Book - Part I Candidates.md" \
        "05_Book_Ideas/Second Book - Part II Candidates.md" \
        99_Meta/second-book-classification.json
git commit -m "second-book: add corpus classification script + candidate shortlists"
```

---

### Task 2: Second manuscript track scaffolding

**Files:**
- Create: `public/drafting-2/README.md`
- Create: `book-mash-2.toml`
- Create: `claims-2/README.md`
- Create: `claims-2/Claims Ledger.md`
- Create: `evidence-2/README.md`

**Interfaces:**
- Consumes: nothing from Task 1 (this is pure scaffolding; the shortlist files inform *drafting*, not the config setup).
- Produces: `book-mash-2.toml` — the config file path later drafting/judging work points at (`chapters_glob = "public/drafting-2/*.md"`, `claims_dir = "claims-2/"`, `evidence_dir = "evidence-2/"`).

- [ ] **Step 1: Create the drafting-2 folder with a README**

```bash
mkdir -p public/drafting-2
```

Write `public/drafting-2/README.md`:

```markdown
# Second Book — Chapter Drafts

Chapter drafts for the second book land here, one file per chapter (same
convention as `public/drafting/`). This folder is intentionally empty until
the drafting pass begins — see `docs/superpowers/specs/2026-07-27-second-book-design.md`
for the chapter structure and `05_Book_Ideas/Second Book - Part I/II Candidates.md`
for the source material each chapter can draw on.
```

- [ ] **Step 2: Create `book-mash-2.toml`**

```toml
[corpus]
chapters_glob = "public/drafting-2/*.md"
claims_dir = "claims-2/"
evidence_dir = "evidence-2/"
voice_baseline_chapters = []
skip_sections = ["Draft note"]

[output]
runs_dir = ".book-mash-2-runs/"

[budget]
max_cost_usd = 15.0
```

- [ ] **Step 3: Create `claims-2/` and `evidence-2/` with README stubs**

Write `claims-2/README.md` (adapted from `claims/README.md`):

```markdown
# Claims Ledger — Second Book

This folder stores reusable, source-backed claims for the second book, drawn
from the Part I / Part II candidate shortlists in `05_Book_Ideas/`.

Each ledger entry should track:
- claim
- why it matters
- support level
- supporting sources — as Source Anchors (video id + start/end timestamp + verbatim quote + confidence); see `programs/source_anchoring_pass.md`
- caveats / counterevidence
- candidate chapters
- reusable phrasing
```

Write `claims-2/Claims Ledger.md`:

```markdown
# Claims Ledger — Second Book

Empty until the drafting pass begins. See `05_Book_Ideas/Second Book - Part I Candidates.md`
and `Second Book - Part II Candidates.md` for the source material claims will
be drawn from.
```

Write `evidence-2/README.md` (adapted from `evidence/README.md`):

```markdown
# Evidence Packs — Second Book

Evidence packs sit between notes and prose, same role as `evidence/` for book 1.

They gather:
- source cluster
- strongest claims
- tensions / objections
- notable quotes
- chapter relevance
```

- [ ] **Step 4: Verify book-mash can read the new config**

```bash
pip install --quiet -e ~/Dev/LifeOS/book-mash 2>&1 | tail -5
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book
book-mash measure --config ./book-mash-2.toml --dry-run
```

Expected: the dry-run reports 0 chapters/sections/paragraphs found (since `public/drafting-2/` has no chapter files yet, only a README which isn't a `*.md` chapter per the glob... note the glob `public/drafting-2/*.md` *will* also match `README.md` itself — confirm the dry-run output either skips non-chapter files gracefully or, if it errors on the README, move the README to `public/drafting-2/NOTES.md` instead so the glob only ever matches real chapter drafts). No traceback either way — a clean 0-unit report is success.

- [ ] **Step 5: Commit**

```bash
git add public/drafting-2/ book-mash-2.toml claims-2/ evidence-2/
git commit -m "second-book: scaffold manuscript track (drafting-2, book-mash-2.toml, claims-2/evidence-2)"
```

---

### Task 3: Distinct diagram identity for book 2

**Files:**
- Create: `diagrams-2/STYLE.md`
- Create: `diagrams-2/templates/chapter-card.excalidraw` (adapted from `diagrams/templates/chapter-card.excalidraw`)

**Interfaces:**
- Consumes: nothing from Tasks 1-2.
- Produces: the teal/rose signature convention later diagram-content work (out of scope here) must follow.

- [ ] **Step 1: Create `diagrams-2/STYLE.md`**

```markdown
# Diagram Style Guide — Second Book (working title: *Beyond the Harness*)

The visual identity for every diagram in the second book. Same method as
`diagrams/STYLE.md` (book 1) — hand-built Excalidraw, one shape per concept —
with a distinct palette and signature mark so the two books read as related
but separate (per `docs/superpowers/specs/2026-07-27-second-book-design.md`, Q5).

> Same rule as book 1: **a diagram argues, it does not decorate.**

---

## 1 · Signature mark

Every diagram carries the book's signature: a thin two-segment rule centered
under the title.

- Two `line` elements, placed at `y = title bottom + ~10px`.
- Left segment ≈110px wide, stroke `#0e7490` (teal — *the model layer*).
- Right segment ≈110px wide, stroke `#be185d` (rose — *the long tail*).
- `strokeWidth: 3`, `roughness: 0`.

This deliberately avoids book 1's signature colors (blue `#3b82f6` / green
`#047857`) and its other semantic slots (red = naive/before, amber =
transient, purple = AI/control plane, dark = evidence cards) so the two
books' diagrams never get visually confused when viewed side by side.

## 2 · Title system

Same structure as book 1 (`diagrams/STYLE.md` §3): eyebrow, title, signature
mark, role line. Title color for book 2 is `#155e75` (dark teal) instead of
book 1's `#1e40af` (dark blue).

## 3 · Part-specific motifs (fill in once chapter content exists)

- **Part I (Model Layer)** diagrams should favor a pipeline motif (data →
  weights → deployed model) — reuse the `flow-pipeline.excalidraw` skeleton
  from `diagrams/templates/`.
- **Part II (Long Tail)** diagrams should favor a "generic pattern meets
  domain constraint" motif — a shape that starts uniform and is visibly
  reshaped by a domain-specific constraint. No skeleton exists for this yet;
  build one once the first Part II chapter is drafted and a real example is
  available to design against (don't invent a placeholder motif now).

## 4 · Everything else

Evidence-artifact convention, citation style, and defensibility rules are
identical to book 1 — see `diagrams/STYLE.md` §4-6. Not repeated here to
avoid drift between two copies of the same rules; both books point at book
1's version for those sections.
```

- [ ] **Step 2: Adapt the chapter-card skeleton with the new signature colors**

```bash
mkdir -p diagrams-2/templates
python3 -c "
import json
from pathlib import Path

src = Path('diagrams/templates/chapter-card.excalidraw')
dst = Path('diagrams-2/templates/chapter-card.excalidraw')
data = json.loads(src.read_text())

for el in data['elements']:
    if el.get('id') == 'sig_left':
        el['strokeColor'] = '#0e7490'
    elif el.get('id') == 'sig_right':
        el['strokeColor'] = '#be185d'
    elif el.get('id') == 'title':
        el['strokeColor'] = '#155e75'

dst.write_text(json.dumps(data, indent=2) + '\n')
print('wrote', dst)
"
```

- [ ] **Step 3: Verify the adapted skeleton has the correct colors and is valid JSON**

```bash
python3 -c "
import json
data = json.loads(open('diagrams-2/templates/chapter-card.excalidraw').read())
colors = {el['id']: el.get('strokeColor') for el in data['elements'] if el.get('id') in ('sig_left', 'sig_right', 'title')}
assert colors['sig_left'] == '#0e7490', colors
assert colors['sig_right'] == '#be185d', colors
assert colors['title'] == '#155e75', colors
print('OK:', colors)
"
```

Expected: `OK: {'sig_left': '#0e7490', 'sig_right': '#be185d', 'title': '#155e75'}` with no assertion error.

- [ ] **Step 4: Commit**

```bash
git add diagrams-2/
git commit -m "second-book: add distinct diagram identity (teal/rose signature)"
```

---

## Deliberately not in this plan

These are real parts of the design spec, sequenced *after* this plan's foundations exist — they're content/curation work (drafting prose, drawing new diagram content, running a paid judge pass), not code with a pass/fail test cycle, so they don't fit the TDD task format above. Recommended path once this plan ships:

- **Chapter drafting** (framing intro, Part I/II chapters, closing) — write a bounded mission brief at `programs/second_book_drafting_pass.md`, following the same `Objective / Why / Inputs` shape as `programs/source_anchoring_pass.md`, scoped to one chapter per pass, citing only claims from `claims-2/Claims Ledger.md`.
- **Diagram content** for each chapter — needs real chapter prose to design against; do this per-chapter alongside drafting, using `diagrams-2/templates/` + the Part II motif design called out in Task 3 Step 1.
- **Website route wiring** — trivial once at least one chapter draft + diagram exist (mirrors `website/src/routes.tsx`'s existing `read/:slug` pattern); wiring it against zero content now would mean fake `getStaticPaths` data, which violates the "never invent content" constraint.
- **book-mash six-dim judge run** — deferred per spec Q6, run once a full draft exists: `book-mash measure --config ./book-mash-2.toml` (no `--dry-run`).
