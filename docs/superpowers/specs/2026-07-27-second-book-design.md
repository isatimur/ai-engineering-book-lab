# Second Book — Design Spec (v0.1)

- **date:** 2026-07-27
- **status:** approved (brainstorming phase), ready for implementation planning
- **working title:** *Beyond the Harness* (placeholder — open to a better title)
- **repo:** same repo as book 1, `~/Dev/LifeOS/knowledge-bases/ai-engineer-book/` (second manuscript track, not a new repo)
- **relationship to book 1:** same Lab, same corpus, same Method (book-mash, claims-ledger, corpus-sync) — a second manuscript drawn from the parts of the corpus book 1 doesn't use

## Purpose

Book 1 (*From Copilot to Colleague*) is built from the AI Engineer corpus (941 videos as of 2026-07-26) and is about **using** models — delegation, harnesses, evals, control, org design. Its 10 chapters draw on all 9 existing theme tags, but only at the depth its thesis needs.

Two clusters of corpus material sit outside that thesis and are underused:

- **~129 videos tagged `Models & Inference`** — training, RL, quantization, frontier-model-building, inference tradeoffs. Book 1 barely touches this; it's about using models, not building them.
- **A long tail of vertical case studies** — an initial keyword scan surfaced ~40-45 candidates (robotics, finance/legal LLMs, telemedicine agents, music generation, education, self-driving-as-agent-analogy, single-cell biology, and others) where agent engineering meets a specific domain constraint the generic playbook doesn't address. This set needs a real curation pass (see Corpus classification below) — the keyword scan is a seed, not a final list.

Book 2's thesis: **Book 1 assumes the model as a given. Book 2 is about everywhere that assumption breaks — because you're building the model itself, or because your domain is strange enough that the standard playbook doesn't fit.**

## Anchoring decisions (Q1–Q6 from the brainstorming dialogue)

| # | Question | Decision | Rationale |
|---|---|---|---|
| Q1 | What should book 2 cover | **Both A (Model Layer) and B (Long Tail)**, combined | User chose both rather than picking one; they pair naturally as "outside book 1's assumption" in two different ways. |
| Q2 | Connective thesis | **"Book 1 = using models. Book 2 = where that assumption breaks."** | Confirmed by user; gives the diptych a shared frame without forcing one narrative arc across both halves. |
| Q3 | Structure | **Two parts, no forced single arc** — Part I: The Model Layer (~3-4 ch), Part II: The Long Tail (~3-4 ch), + framing intro/closing → ~8-10 chapters total | Mirrors book 1's bookend pattern (intro thesis chapter, closing "what endures"-style chapter) while keeping the two halves editorially independent. |
| Q4 | Repo location | **Same repo, second manuscript track** (`public/drafting-2/`, `book-mash-2.toml`) — not a sibling repo | book-mash was explicitly designed to be config-driven per book project; a sibling repo would duplicate CI/claims infra for a manuscript that's the same Lab, same corpus, same method. |
| Q5 | Diagram visual identity | **Distinct from book 1** — same hand-built-Excalidraw method, different palette/motif, own signature mark: teal `#0e7490` → rose `#be185d` (vs. book 1's blue `#3b82f6` → green `#047857`) | User chose distinct identity over matching book 1's; new colors deliberately avoid book 1's existing semantic slots (blue/green signature, red=naive, amber=transient, purple=AI-control-plane, dark=evidence cards) to prevent cross-book visual confusion. |
| Q6 | Quality pipeline (book-mash judging) | **Deferred** — draft chapters against the corpus/claims pipeline first; run the six-dim judge panel once there's a full draft, not per-chapter as written | Matches book 1's own sequencing (drafting happened before the first full judge run); avoids per-chapter LLM cost during exploratory drafting. |

## Corpus classification (the part not yet done)

Two buckets need a real pass before chapters can be outlined in detail:

1. **Part I candidates** — start from the 129 `Models & Inference`-tagged notes; hand-curate down to the strongest 40-60 that are actually about building/training/serving models (not just mentioning a model name in passing).
2. **Part II candidates** — the keyword scan (robot, chess, mobile game, finance, legal, medicine, music, education, biology, etc.) needs manual review to drop noise (e.g. a music *interlude clip* is not a talk) and to catch verticals the keyword list missed.

This classification pass is the first implementation step, not part of this spec — it produces the actual per-chapter video shortlists the drafting work will cite.

## Structure (draft — chapter titles are placeholders pending classification)

**Framing**
- Ch 0 / Intro — the shared thesis: what book 1 assumed, where it breaks

**Part I — The Model Layer**
- 3-4 chapters covering: training & RL, quantization/serving/inference economics, frontier-model-building as its own discipline, (possible 4th: benchmarking/evals for models themselves, distinct from book 1's agent-evals chapter)

**Part II — The Long Tail**
- 3-4 chapters covering: robotics/physical agents, regulated-domain agents (finance/legal/medicine), creative & education domains, (possible 4th: a synthesis chapter on what generic agent engineering has to unlearn per-domain)

**Closing**
- Final chapter — what the two halves say together about the edges of the delegation thesis

Exact chapter count and titles are finalized once the classification pass (above) shows how much real material each candidate chapter has.

## Pipeline reuse (what's shared vs. new)

**Shared, unchanged:**
- Corpus (`01_Videos/`, `02_Themes/`), corpus-sync pipeline
- book-mash / mash-core engine (config-driven, just needs a second `.toml`)
- claims-ledger discipline and tooling
- Website Reader shell (React/Vite), Evidence Rail component, glossary drawer

**New, book-2-specific:**
- `public/drafting-2/` — chapter drafts
- `book-mash-2.toml` — points at `public/drafting-2/*.md`, its own `claims_dir`/`evidence_dir`
- `claims-2/`, `evidence-2/` — book 2's own claim ledger and evidence packs (distinct from book 1's, since the claims are about different material)
- `diagrams-2/` — book 2's diagram set, teal/rose signature mark, own `STYLE.md` extending the shared skeleton-template kit
- A second website route for book 2's chapters, reusing the existing Reader components

## Non-goals (v0.1 of book 2)

- No new judge dimensions — reuse book-mash's existing six dims as-is
- No restyling of book 1's diagrams or claims
- No new infrastructure repo (see Q4)
- Full book-mash judging run — deferred per Q6, not skipped forever

## Open items for the implementation plan

- Finalize working title (currently a placeholder)
- Run the Part I / Part II classification pass and produce real shortlists
- Decide exact chapter count once shortlists show material depth per candidate chapter
- Confirm book 2's website route/URL slug
