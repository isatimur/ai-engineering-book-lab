# Book MASH — Design Spec (v0.1)

- **date:** 2026-05-19
- **status:** approved (brainstorming phase), ready for implementation planning
- **target repo for the engine:** `~/Dev/LifeOS/book-mash/` (new, sibling repo)
- **consumer repo:** `~/Dev/LifeOS/knowledge-bases/ai-engineer-book/`
- **inspiration:** `mash/` (Meeting Agent Simulation Harness) from the Swiirl Pulse codebase

## Purpose

A MASH-style multi-judge measurement engine for book manuscripts. It scores manuscript prose against six dimensions — three craft, three epistemic — at paragraph, section, and chapter granularity, producing a JSON ledger, a Markdown report, and per-chapter sidecar annotations. The intent is to give the author a defensible, reproducible measurement layer on top of the existing 5-layer book lab (source → synthesis → evidence → manuscript → research-org), so weak passages, voice drift, redundancy, and claim overreach become visible signals instead of vibes.

The engine is generic. Any book project that exposes a `book-mash.toml` config can use it. `ai-engineer-book` is the first consumer.

## Anchoring decisions (Q1–Q5 from the brainstorming dialogue)

| # | Question | Decision | Rationale |
|---|---|---|---|
| Q1 | Primary v0.1 goal | **Measurement first**, then continuous gate, then autoresearch revision | Same convergence order MASH itself proved: judges must be trusted before mutators are useful. |
| Q2 | Judge dim mix | **6 balanced** — 3 craft + 3 epistemic | Mirrors MASH's 6-dim pattern; epistemic dims exploit the book lab's claims/evidence ledgers — assets MASH-for-meetings didn't have. |
| Q3 | Granularity | **Full hierarchy** — paragraph + section + chapter, all 6 dims at every level | User chose maximal explainability. Voice and redundancy are chapter-native and broadcast down with `derived=true`. |
| Q4 | Code location | **Sibling repo** `~/Dev/LifeOS/book-mash/`, generic engine, path shim from consumer repo | Same pattern as `mash/` ↔ `ai-worker/`. Keeps the public-safe surface of `ai-engineer-book` clean. |
| Q5 | Output format | **Three layers** — JSON ledger + Markdown report + sidecar annotation files | JSON is the substrate continuous gate and autoresearch will both need later. Annotations are non-mutating. |

## Approach

**Approach Y — clean rewrite, MASH-inspired.** New Python package with book-shaped primitives (`Corpus`, `Chapter`, `Section`, `Paragraph`, `JudgeDim`, `Run`), borrowing MASH's patterns (dim registry, accept-if-better, replay-first design, judge concurrency) but no meeting-specific code. Chosen over direct port (which drags `Participant`/`Utterance` abstractions forward) and over extracted shared core (which would require refactoring `mash/` mid-Plan-6). Approach Y costs ~3 days more than a direct port and gives a book-shaped engine that's pleasant to extend toward goals C and B.

Future direction: once `mash/` Plan 6 closes and `book-mash` v0.1 ships, a shared `eval-core/` package can be extracted at zero risk.

---

## Architecture

### Repo layout (`~/Dev/LifeOS/book-mash/`)

```
book-mash/
  pyproject.toml                  # Poetry; Python 3.13; deps: pydantic, anthropic, openai, typer, rich, voyageai (optional)
  README.md
  book_mash/
    __init__.py
    corpus/
      __init__.py
      loader.py                   # walks chapter glob, parses markdown → Chapter→Section→Paragraph
      models.py                   # Pydantic: Corpus, Chapter, Section, Paragraph
      claims_index.py             # parses claims/ and evidence/ from the consumer repo
    judges/
      __init__.py
      base.py                     # JudgeDim ABC, JudgeInput, JudgeResult, JudgeScore
      humanness.py
      voice.py
      usefulness.py
      evidence_density.py
      claim_defensibility.py
      redundancy.py
      registry.py                 # name → JudgeDim class; dim_registry_version
    runners/
      __init__.py
      measurement.py              # v0.1: read corpus → score every unit → write outputs
      gate.py                     # v0.2: re-score after a research_pass (stub)
      autoresearch.py             # v0.3: mutator + accept-if-better (stub)
    output/
      __init__.py
      ledger.py                   # writes runs/<id>/scores.json
      report.py                   # renders runs/<id>/report.md
      annotations.py              # writes annotations/<chapter>.annotations.md
    cli.py                        # typer entrypoint
  tests/
    fixtures/
      mini_book/                  # 2-chapter fake corpus with planted defects
    test_corpus_loader.py
    test_judges_smoke.py          # marked `live` — real API calls
    test_rollups.py
    test_cache.py
    test_output_renderers.py
    test_measurement_run.py
  examples/
    ai-engineer-book.toml
```

### How `ai-engineer-book` connects

A single config file `ai-engineer-book/book-mash.toml`:

```toml
[corpus]
chapters_glob = "public/drafting/Chapter*.md"
claims_dir    = "claims/"
evidence_dir  = "evidence/"
voice_baseline_chapters = ["chapter-01.md", "chapter-07.md"]

[output]
runs_dir = ".book-mash-runs/"

[budget]
max_cost_usd = 10.0
```

A shim `ai-engineer-book/scripts/book_mash_path.py` adds `~/Dev/LifeOS/book-mash/` to `sys.path` — same pattern as `mash.ai_worker_path.ensure_on_path()`. `.book-mash-runs/` is added to the book repo's `.gitignore`.

### Core primitives (Pydantic v2)

```
Corpus:      list[Chapter], claims_index, voice_baseline, corpus_snapshot_hash
Chapter:     id, title, file_path, sections[], full_text, line_count
Section:     id, heading, depth (h2/h3), paragraphs[], line_range
Paragraph:   id, text, line_range, char_count, is_blockquote, is_code_fence
JudgeInput:  unit (Paragraph|Section|Chapter), dim_name, corpus_context, claims_context
JudgeScore:  dim_name, unit_id, score_0_100, label (strong|moderate|weak|fail|error),
             reasoning, evidence_refs[], model, cost_usd, derived (bool)
JudgeResult: unit_id, scores: list[JudgeScore]
Run:         id, started_at, finished_at, corpus_snapshot_hash, results[], rollups{},
             book_mash_version, dim_registry_version, total_cost_usd, status
```

### Hierarchy & rollup

- Paragraph → section: weighted mean by `char_count`.
- Section → chapter: weighted mean by `char_count`.
- Chapter → book: weighted mean by `char_count` (top-level heatmap only).
- Voice and redundancy: scored at chapter level natively; broadcast down to sections and paragraphs with `derived=true` on the propagated entries. The report renderer treats `derived=true` scores as decoration, never as a primary signal at that unit.
- All rollup math is pure code, no LLM. Re-running on unchanged corpus with a warm cache produces identical `scores.json` (modulo timestamps).

---

## The six judge dimensions

Each judge is a single-purpose Pydantic-AI agent with `temperature=0` and structured output (`JudgeScore`). Model choice follows MASH's instinct (Haiku where it's enough) but bumps to Sonnet where prose taste actually matters.

### Craft dims

**1. Humanness (anti-AI-slop)** — paragraph level
- **Scores:** Is this written by a thinking author, or generic AI-flavored hedging?
- **Input:** the paragraph + the two surrounding paragraphs.
- **Model:** Claude Sonnet 4.6 (Haiku misses subtle slop).
- **Rubric:**
  - `strong` (80–100): specific, has a point of view, survives a hostile editor's red pen
  - `moderate` (50–79): readable but generic in spots
  - `weak` (20–49): pattern-matchable AI prose; removing it loses nothing
  - `fail` (0–19): pure scaffolding language, listicle stems, empty hedging
- **Output contract:** `reasoning` must quote the worst phrase from the paragraph. This forces concreteness and prevents the judge from generalizing.

**2. Voice consistency** — chapter level (broadcast down)
- **Scores:** Does this chapter sound like the same author as the baseline?
- **Input:** full chapter + voice baseline (excerpts from chapters the user designates in config; for `ai-engineer-book`, Ch 1 and Ch 7 since the 2026-05-19 epistemic-integrity pass calibrated those).
- **Model:** Claude Sonnet 4.6.
- **Rubric:** 4-band; `reasoning` must name the specific drift ("longer sentences than baseline", "more first-person than baseline", "softer epistemic stance than baseline").

**3. Usefulness / actionability** — paragraph level
- **Scores:** Could a practitioner change something on Monday because of this paragraph?
- **Input:** paragraph + chapter title.
- **Model:** Claude Haiku 4.5.
- **Rubric:**
  - `strong`: contains a decision, threshold, principle, or concrete example a reader can apply
  - `moderate`: provides framing useful for later application
  - `weak`: descriptive only, no actionable lift
  - `fail`: filler — meta-talk about the book, transitions, restatements

### Epistemic dims

**4. Evidence density** — section level
- **Scores:** Per ~500 words of prose, how many distinct claims are tied to a source / claims ledger entry?
- **Input:** section text + `claims_index`.
- **Model:** Claude Haiku 4.5 (candidate-claim extraction) + deterministic fuzzy-match against the claims index. The Haiku call lists candidate claims; code computes the ratio and assigns the label deterministically (so the *number* is reproducible).
- **Rubric (ratio-based):**
  - `strong`: ≥ 1 grounded claim per 300 words
  - `moderate`: 1 per 300–700 words
  - `weak`: 1 per 700–1000 words
  - `fail`: < 1 per 1000 words

**5. Claim defensibility** — paragraph level (only on paragraphs that contain a claim per the evidence-density extraction)
- **Scores:** For each claim this paragraph makes, does the prose match what the claims ledger actually supports?
- **Input:** paragraph + relevant claim ledger entries.
- **Model:** Claude Sonnet 4.6 (highest-stakes judgment — this is the dim that prevents the book getting dragged on Twitter for unsupported claims).
- **Rubric:**
  - `strong`: prose is at or below the strength the ledger supports
  - `moderate`: prose slightly overstates ledger evidence
  - `weak`: prose claims a "settled" finding the ledger marks "moderate"
  - `fail`: prose makes a claim with no ledger backing at all — ship blocker

**6. Redundancy** — chapter level (broadcast down)
- **Scores:** Does this chapter restate arguments already made in earlier chapters?
- **Input:** chapter text + summary digests of all earlier chapters in declared order.
- **Model:** Haiku 4.5 + embedding prefilter. Generate chapter-summary embeddings (Voyage AI if available, `text-embedding-3-small` fallback), cosine-similarity to find candidate overlaps, then Haiku reads candidate pairs and confirms or denies.
- **Rubric:** `strong` = each major argument is new or deepens a prior one; `fail` = >40% of the chapter is restatement.

### Cross-cutting contracts

- All six judges return the same `JudgeScore` shape. Uniformity makes the report renderer trivial.
- `evidence_refs` is dim-specific: humanness quotes a phrase; evidence-density refs a claim ID; redundancy refs the prior chapter ID it overlaps with.
- Cost estimate for one full v0.1 run on a 10-chapter book (~80k words): ~200–300 Sonnet calls + 500–800 Haiku calls + ~12 embedding calls. Roughly **$3–6 per full measurement run**. Cheap enough to run on every meaningful manuscript change.
- Determinism: `temperature=0`, version-stamped on every `Run` with `book_mash_version` and `dim_registry_version`. Re-run on unchanged corpus with warm cache → identical scores. Cold-cache reruns are *approximately* reproducible (depends on API-side stability at `temperature=0`); the cache is the real determinism contract.

---

## Run flow + output structure

### CLI

```bash
# from the book repo
cd ~/Dev/LifeOS/knowledge-bases/ai-engineer-book

# one-time, after book-mash is installed
poetry --directory=~/Dev/LifeOS/book-mash install

# v0.1 entrypoint
book-mash measure --config ./book-mash.toml

# narrow to specific chapters or dims during development
book-mash measure --config ./book-mash.toml --chapters 5,6,8 --dims humanness,voice
```

`book-mash gate` and `book-mash autoresearch` exist as stubs that print "not yet implemented".

### Pipeline (single `measure` run)

1. **Load config.**
2. **Load corpus:** parse chapter markdown into Chapter→Section→Paragraph tree; parse `claims/` and `evidence/` into `claims_index`; load voice baseline excerpts; compute `corpus_snapshot_hash` (sha256 over chapter file contents — used as cache key and reproducibility stamp).
3. **Plan judge calls:** enumerate `(unit, dim)` pairs given hierarchy + filter flags; dedupe via cache (if a unit with the same content hash has been scored at this `dim_version`, reuse).
4. **Run judges:** asyncio concurrency, default 8 in flight; per-call retry 3× with exponential backoff (1s → 4s → 16s); on persistent failure emit `JudgeScore(label="error", score=null, reasoning="<error class>: <message>")` so the run can continue with partial data.
5. **Roll up:** paragraph → section → chapter → book; voice + redundancy broadcast down with `derived=true`.
6. **Render outputs:** write JSON ledger, Markdown report, per-chapter sidecar annotation files.
7. **Print terminal summary:** total cost, overall heatmap (chapter × dim grid), top 10 weakest paragraphs across the manuscript.

### Run directory layout

```
.book-mash-runs/                                # gitignored in consumer repo
  2026-05-19-1547-a7f3/                         # <date>-<HHMM>-<short-hash>
    run.json                                    # the Run object (small, indexable)
    scores.json                                 # full JudgeScore ledger (large, source of truth)
    report.md                                   # rendered Markdown report
    annotations/
      chapter-01.annotations.md
      chapter-02.annotations.md
    cache.json                                  # (unit_hash, dim_name, dim_version, model_id) → JudgeScore
```

### `scores.json` shape

```json
{
  "run_id": "2026-05-19-1547-a7f3",
  "corpus_snapshot_hash": "sha256:...",
  "book_mash_version": "0.1.0",
  "dim_registry_version": "0.1.0",
  "started_at": "2026-05-19T15:47:12Z",
  "finished_at": "2026-05-19T15:52:08Z",
  "total_cost_usd": 4.21,
  "status": "completed",
  "rollups": {
    "book": { "humanness": 67, "voice": 72, "usefulness": 64, "evidence_density": 71, "claim_defensibility": 88, "redundancy": 81 },
    "chapter:chapter-01": { "humanness": 78, "voice": 84, "n_paragraphs": 42, "n_errors": 0 },
    "section:chapter-01#shift-from-assistant": { "humanness": 71, "n_paragraphs": 8 }
  },
  "scores": [
    {
      "unit_id": "paragraph:chapter-05#L142-L148",
      "unit_type": "paragraph",
      "dim_name": "humanness",
      "score_0_100": 28,
      "label": "weak",
      "reasoning": "Sentence 'In today's rapidly evolving landscape of AI engineering' is a classic AI opener. The paragraph has no specific claim and no point of view.",
      "evidence_refs": ["phrase:'In today's rapidly evolving landscape'"],
      "model": "claude-sonnet-4-6",
      "cost_usd": 0.011,
      "derived": false
    }
  ]
}
```

### `report.md` shape

1. **One-paragraph TL;DR** — biggest signal: "Chapters 5 and 8 are the bottleneck on humanness; Chapter 7 leads claim-defensibility; redundancy between Ch 3 and Ch 6 needs a decision."
2. **Heatmap table** — chapters × 6 dims, color-coded labels.
3. **Per-chapter section** — mini-heatmap (sections × dims) + top 3 weakest paragraphs quoted with judge reasoning beneath each.
4. **Cross-chapter findings** — voice drift table (chapter vs. baseline) + redundancy table (chapter pair → overlap label + the overlapping arguments).
5. **Ship-blockers** — every paragraph scored `fail` on `claim_defensibility` listed first, then every `fail` on any other dim. The "do not publish until resolved" list.
6. **Run metadata** — model versions, dim versions, snapshot hash, cost.

### Sidecar annotations

`annotations/chapter-05.annotations.md` — small, non-mutating, opens alongside the draft in any editor:

```markdown
# Chapter 5 — Annotations from run 2026-05-19-1547-a7f3

## L142–L148 · humanness · weak (28)
> In today's rapidly evolving landscape of AI engineering, developers face
> unprecedented challenges...
**Judge:** Classic AI opener. No specific claim, no point of view. Remove and the section loses nothing.

## L201–L207 · claim_defensibility · fail (12)
> Studies show that 89% of teams report...
**Judge:** No matching entry in claims/ — fabricated stat or unsupported borrowing. Ledger has no "89%" claim.
**Ledger search performed:** claims/ch5_*.md, evidence/ch5_*/
```

When the author resolves an issue by editing the chapter prose, the next run regenerates annotations from fresh scores — resolved issues disappear naturally. Annotation files are owned by the engine, not by the author.

### Cache behavior

`cache.json` is keyed on `(unit_hash, dim_name, dim_version, model_id)`. A re-run after editing only Ch 5 reuses ~90% of prior judge calls and costs ~$0.50 instead of $4–6. This is what makes goal C (continuous gate) economically viable later — incremental re-scoring is the same pipeline with a warm cache.

---

## Error handling

Philosophy: **partial runs are fine, silent lies are not.**

| Failure | Handling |
|---|---|
| Judge call rate-limit / 5xx / timeout | 3 retries with exponential backoff (1s → 4s → 16s), then emit `JudgeScore(label="error", score=null)`. Run continues. Errors shown in a dedicated report section; rollups exclude `null` scores and annotate the chapter rollup with `n_errors`. |
| Cumulative cost exceeds `[budget] max_cost_usd` | Run halts cleanly, partial ledger written, `Run.status = "halted_budget"`. |
| Malformed chapter markdown | Loader is permissive — unparseable sections are demoted to "single paragraph = whole section text". Loader warning surfaces in the report. |
| Judge references a claim ledger entry that doesn't exist | Score is *not* invalidated — the missing-ref is itself a finding, surfaced in the report under "broken claim references". This catches `claims/` rot. |
| Re-run on unchanged corpus | Must produce identical `scores.json` modulo timestamps. Regression test for determinism. The contract that makes goal C (continuous gate) trustworthy. |

**Hard fails (run aborts):**
- Config file missing or malformed
- No chapters matched by `chapters_glob`
- API key missing for a model the dim registry requires

---

## Testing

### Fixtures

`tests/fixtures/mini_book/`:
- 2 chapters, 4–5 sections each, ~15 paragraphs total
- Small `claims/` dir with 6 ledger entries
- One paragraph deliberately AI-slop (humanness should flag `weak` or `fail`)
- One paragraph deliberately overclaiming vs. its ledger entry (claim_defensibility should `fail`)
- Ch 2 contains a paragraph restating Ch 1's main argument (redundancy should fire)
- Voice baseline: Ch 1 designated as baseline; Ch 2 deliberately written in a different cadence (voice should flag drift)

### Test layers

| Layer | What it tests | Style |
|---|---|---|
| `test_corpus_loader.py` | markdown → tree; line ranges; claims_index parses | unit, no model calls |
| `test_judges_smoke.py` | each dim runs end-to-end on known-bad paragraph and returns expected *label* | model calls, `pytest -m live` only |
| `test_rollups.py` | weighted-mean rollup math; null-score handling; `derived=true` propagation | unit, no model calls |
| `test_cache.py` | identical `(unit_hash, dim_version)` reuses prior score; editing chapter text invalidates only that unit | unit, no model calls |
| `test_output_renderers.py` | JSON shape stable, Markdown report renders, annotation line refs correct | snapshot tests |
| `test_measurement_run.py` | full pipeline on `mini_book` with mocked judge responses; verifies ledger + report + annotation files written; idempotent re-run | unit, mocked, ~1s |

### Pre-flight calibration (one-time, before v0.1 is "trusted")

Run the engine on the *current* `ai-engineer-book` manuscript once. Manually review 20 random paragraphs alongside their judge scores. If <16/20 match human judgment, the dim is mis-calibrated and the prompt needs work *before* any subsequent run is believed. Same gate MASH used after Plan 2: "is the judge actually judging what we think."

---

## Out of scope for v0.1

- `book-mash gate` (continuous re-score on every research_pass) — implemented as a stub; lands in v0.2.
- `book-mash autoresearch` (Sonnet rewrites passage, judges score, accept-if-better) — stub; lands in v0.3.
- Web UI / dashboard. The Markdown report + terminal heatmap are the v0.1 read surface.
- Multi-book / cross-corpus comparison. Engine is generic but v0.1 ships one consumer (`ai-engineer-book`).
- Production deployment / scheduled runs. v0.1 is run on-demand from the consumer repo.
- Sharing dim definitions back to `mash/`. Extraction of a shared `eval-core/` is deferred until both engines are stable.

## Open questions (resolve during planning or implementation, not blocking spec sign-off)

- Should `claim_defensibility` block the whole run on first `fail`, or always collect every fail across the book and surface them as a list? (Spec assumes the second; if the user prefers fail-fast, easy switch.)
- Embedding provider for redundancy: prefer Voyage AI if a key is configured (matches the rest of the user's stack), else `text-embedding-3-small`. Worth confirming during planning that the consumer repo will have a Voyage key available; if not, ship with OpenAI embeddings and add Voyage later.
- Whether `voice_baseline_chapters` should be configurable per-run or locked at config time. Spec assumes config-time; per-run override could be a future flag.

## Next step

Hand off to `superpowers:writing-plans` to produce the implementation plan from this spec.
