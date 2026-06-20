# book-mash Judge Module — Meta-Evaluation

**Date:** 2026-06-20
**Scope:** Quality and reliability of the LLM-as-Judge module (`book_mash/judges/`), not the book it scores.
**Method:** Read-only audit of judge code + rubrics + aggregation, cross-referenced against real run artifacts under `.book-mash-runs/` (runs `1cef`, `05e5`, `52f0`, `ea0f`) and the `claims/Claims Ledger.md`.
**Status:** Assessment only. No book-mash code was modified.

---

## Executive summary

**The judge module is not yet trustworthy enough to drive editorial decisions at the per-chapter delta granularity the project acts on (±5–10 pts), and one dimension — claim_defensibility — is producing structurally guaranteed false positives that must not be acted on as written.** Three problems compound. (1) **Determinism is a fiction in practice.** The design doc promises `temperature=0` and warm-cache reproducibility, but no judge sets a temperature anywhere in the code (`grep` across `book_mash/` returns nothing), so the model runs at its default sampling temperature (~1.0); the only reason the three June-20 runs look stable is that they are **byte-identical cache replays**, not re-judgings — `05e5`, `52f0`, `ea0f` agree on 100% of shared scores while genuinely re-judged `1cef` swings the **same paragraph** from 5→82 on usefulness and 0→78 on claim_defensibility. The cache is masking, not measuring, variance. (2) **claim_defensibility is fed the wrong evidence.** It is given a chapter-filtered slice of *book-claim headings only* (47 entries, no supporting quotes), and the slice is selected by a hand-authored `candidate_chapters` tag. Chapter 5's Karan Sampath / Anthropic MCP content is supported by ledger claims #32/#33 — but those are tagged chapters 7 and 9, so they are filtered out of the chapter-5 prompt, and the judge correctly reports "no ledger backing" for a claim that is in fact one of the best-supported in the corpus. This is a verified false positive with a systemic cause. (3) **usefulness conflates operational density with value**, flooring structurally necessary connective tissue to <20 ("nothing an engineer can do Monday"); the consumer's `usefulness_substantive` correction patches the symptom downstream but the bias lives in the judge. Craft dimensions (humanness, voice) and the deterministic-by-construction evidence_density are in better shape. Net: the module is usable as a *qualitative attention-router* ("look at chapter 5") but its numbers are not yet defensible as a metric, and inter-run variance is currently un-measurable because the harness can't be made to actually re-judge cheaply.

### Confidence rating per dimension (is this dim's score trustworthy enough to act on a ±5–10 pt delta?)

| Dimension | Granularity | Model | Trust | One-line reason |
|---|---|---|---|---|
| humanness | paragraph | sonnet-4-6 | **Medium** | Good rubric with anchored AI-slop indicators; suffers the shared no-temperature variance (same para 38→84 across rubric states). |
| voice | chapter | sonnet-4-6 | **Medium** | Reasonable drift rubric; chapter-native so less aggregation distortion; variance unquantifiable (always cached in the recent runs). |
| usefulness | paragraph | sonnet-4-6 | **Low** | Systematically floors transitions/recaps/meta; conflates "actionable Monday" with "valuable"; needs the substantive split inside the judge. |
| evidence_density | section | sonnet-4-6 | **Medium-High** | Score is computed deterministically from a ratio (reproducible by construction); only the claim-extraction count is LLM-variable. |
| claim_defensibility | paragraph | sonnet-4-6 | **Low / do-not-ship-on** | Fed heading-only, chapter-filtered ledger; produces verified false "unsupported" flags (Sampath). The one dim explicitly meant to be a ship-blocker is the least reliable. |
| redundancy | chapter | sonnet-4-6 | **Medium** | Embedding prefilter + chapter rubric is sound; depends on a weak `_summarize_chapter` digest; variance unquantifiable in recent runs. |

---

## Per-dimension findings

### 1. Humanness (paragraph) — `book_mash/judges/humanness.py`

**Rubric (lines 22–49):** Strong. It anchors the score bands with concrete AI-slop exemplars ("in today's rapidly evolving landscape", "by leveraging X you can unlock Y", list-of-three with no distinction) and positive markers (specific numbers/names/prices, a claim that could be wrong). The 4-band 0–100 scale has meaningful verbal anchors (lines 42–45) and the output contract forces the judge to quote `worst_phrase` even on a strong score (line 47) — a good concreteness lever that survives into `evidence_refs` (line 90).

**Grounding:** Prose-only + the two surrounding paragraphs (`measurement.py:113–116`, `_surrounding` at `measurement.py:244`). Appropriate — humanness is an intrinsic-prose judgment, no external evidence needed.

**Calibration / variance:** The rubric is sound but the *scores* are not stable across judgment states. Same paragraph `chapter-2-taste...#L25` scored 38 in `1cef` and 84 in the new cohort (spread 46); `chapter-2...#L63` 62→84. Within the cached June-20 cohort spread is exactly 0 (replay). The 28/170 humanness paragraphs that differ between `1cef` and new all swing in the same loosening direction, consistent with a rubric/version change *plus* sampling noise that cannot be isolated while caching masks re-judging.

**Verdict:** Medium. Best-designed rubric in the set; the only thing between it and "High" is the variance-measurement gap (issue X1 below).

### 2. Voice (chapter, broadcast down) — `book_mash/judges/voice.py`

**Rubric (lines 22–43):** Good. Drift indicators are concrete and comparative (sentence length vs baseline, epistemic stance, POV, rhythm, register), and the contract forces a named `drift_summary` (line 41) rather than "different style". 4-band anchors are clear.

**Grounding:** Full chapter + baseline excerpts. **Concern:** the baseline is assembled from only the *first paragraph of each section* of the designated baseline chapters (`measurement.py:259`, `_load_voice_baseline`). First paragraphs of sections are disproportionately *openers/transitions* — exactly the register the usefulness judge floors — so the "voice baseline" may be skewed toward connective cadence rather than the book's argumentative voice. Worth a look, but lower priority than the epistemic-dim issues.

**Calibration / variance:** Native chapter scores show spread 0.0 on every chapter across the recent runs — but that is cache replay, not stability. Voice was never re-judged in `05e5/52f0/ea0f`, so its run-to-run variance is **currently unknown**. The book-level voice rollup (82–84) is plausible and stable across the older runs that did re-judge.

**Verdict:** Medium. Solid rubric; baseline-construction skew and unmeasured variance keep it from High.

### 3. Usefulness (paragraph) — `book_mash/judges/usefulness.py`

**Rubric (lines 22–45):** This is the central design flaw, and it is in the rubric, not the model. The judge's single question is "could a working engineer change something on Monday because of this paragraph?" (line 24), and `fail (0–19)` is explicitly defined as "filler — meta-talk about the book, transitions, restatements" (line 41). That definition is correct for *operational density* but wrong for *value*: in a narrative non-fiction book, transitions, recaps, thesis statements, and reflective framing are structurally necessary and carry value that is not "actionable on Monday." The rubric **conflates operational density with usefulness**, and so it systematically floors connective tissue.

**Evidence of flooring (run `ea0f`):**
- Distribution is strongly bimodal: n=297, min=2, p25=22, median=62, p75=82, max=92. A large floored cluster (≤20) sits beside a substantive cluster (60–90).
- 50 paragraphs scored <20; 94 scored <35.
- Real judge reasoning on floored units:
  - `chapter-1...#L34` [12]: *"pure meta-commentary and framing for the book's thesis... no thresholds, no tools, no techniques, no traps, no tests."*
  - `chapter-1...#L56` [5]: *"pure transition/connective prose... exists solely to link two surrounding paragraphs and has zero standalone informational value."*
  - `chapter-1...#L68` [8]: *"pure structural meta-commentary — a table of contents restated in prose form."*
  - `chapter-1...#L70` [12]: *"thesis statement for the book's introduction — motivational meta-commentary."*

  Each is a defensible *operational-density* judgment and an indefensible *value* judgment.

**Downstream correction (`99_Meta/scripts/build_judge_scores.py:80–120, 322–340`):** The consumer added a `usefulness_substantive` rollup that re-averages usefulness after dropping (a) markdown headings mis-split as prose and (b) **short** (`≤45` words) floored (`<50`) paragraphs whose *judge rationale* names a structural move (`_CONNECTIVE_MARKERS`, lines 94–101). This is a thoughtful, conservative patch — it keeps the honest all-paragraph floor as `usefulness` while exposing the operational core as `usefulness_substantive`. **But it is the wrong place for the fix in two ways:** (1) it re-derives the judge's intent by keyword-matching the judge's own free-text reasoning, which is brittle (a reasoning that floors a transition without using a marker word slips through; a substantive paragraph whose reasoning happens to say "frames the" is wrongly excluded); and (2) every *other* consumer of the engine inherits the uncorrected `usefulness` and would have to re-implement the same heuristic. The judge should emit the category as a structured field, not leave the consumer to parse prose.

**Does the correction adequately compensate?** Partially. At the book level it lifts usefulness from ~46 to a substantive number, and per-chapter it closes most of the gap. But because it only drops *short* connective paragraphs, a *long* reflective passage that is genuinely valuable but non-operational still counts as filler, and the `≤45`-word / `<50`-score conjunction is a tuned threshold with no validation set behind it.

**Variance:** Worst in the set. Same paragraph `chapter-5...#L44` scored 5 in `1cef` and 82 in new (spread 77); `chapter-2...#L71` 8→82. The usefulness chapter rollup for `chapter-2-taste` swung 26.2→67.8 (41.6 pts) between judgment states. 72/268 shared paragraphs differ.

**Verdict:** Low. The rubric needs an explicit "structural value" lane and a structured output field; the variance is the largest of any dim.

### 4. Evidence density (section) — `book_mash/judges/evidence_density.py`

**Rubric / scoring:** The strongest *epistemic* design. The LLM only extracts candidate claims and matches each to a ledger id or null (lines 24–36); the *score* is computed deterministically from grounded-claims-per-word with fixed band thresholds (`_label_for_density` lines 48–58, `_score_for_density` lines 61–63). The number is therefore reproducible given the same extraction, and the band thresholds (≤300 / ≤700 / ≤1000 words-per-grounded-claim) are concrete and match the design doc.

**Grounding (critical caveat):** The judge is handed the *entire* `claims_index` as a flat listing of `id: text` headings (lines 76–81) — **not** chapter-filtered (good, unlike claim_defensibility) but **heading-only** (bad): the supporting quotes and source attributions in each claim's body are never passed. "Grounded" therefore means "the extracted claim's surface text resembles a claim *heading*," not "the claim is actually supported by the cited evidence." The density number measures *heading resemblance*, which is a weaker signal than the name implies.

**Variance:** Book rollup pinned at 89.8–90.0 across all four runs and the older runs too — because the deterministic scoring collapses to "strong" (90) for almost every section. That stability is real (it's code, not the LLM) but also a sign the metric is **saturated** and not discriminating between sections.

**Verdict:** Medium-High on reproducibility, but the saturated distribution and heading-only grounding mean it is not currently discriminating sections usefully.

### 5. Claim defensibility (paragraph) — `book_mash/judges/claim_defensibility.py` — **most serious finding**

**Rubric (lines 26–50):** The rubric reads well — it asks the judge to compare each prose claim's rhetorical strength to the ledger entry's declared `support_level`, and defines `fail (0–19)` as a claim with no ledger backing (a ship-blocker). It even instructs "False positives here are tolerable; false negatives are not" (line 47). **That instruction is the trap:** combined with a *truncated, mis-routed evidence set* (below), it converts the judge into a false-positive generator on exactly the chapters where the ledger routing is wrong.

**Grounding — the root cause (verified):** The judge receives `relevant_ledger`, built in `measurement.py:109` as:
```python
relevant_ledger = [c for c in claims_index if chapter.number in c.candidate_chapters]
```
Three compounding defects:
1. **Heading-only.** `load_claims_index` (`corpus/claims_index.py:14–31`) parses only the `## N)` heading into `ClaimEntry.text`; the supporting **quotes and sources** (e.g. Sampath's "bless one platform") go into `source_refs` as wikilinks and are **never sent to the judge** (`claim_defensibility.py:80–83` sends only `id`, `support_level`, `text`). So the judge cannot match prose to evidence even when the right claim is present.
2. **Chapter-filtered by a hand-authored tag.** The `candidate_chapters` field is editorial metadata, not ground truth about where content actually appears. If a claim is discussed in a chapter not in its tag list, its evidence is silently withheld from that chapter's paragraphs.
3. **Whole chapters are under-covered.** Counting candidate book-claims per chapter: ch-1 has 4, ch-2 has 3. A 40-paragraph chapter judged against 3–4 heading-only claims will flag almost any specific attribution as "unsupported."

**The Karan Sampath false positive — fully traced:**
- Run `ea0f`, `paragraph:chapter-5-context-is-infrastructure#L108`, evidence_ref: *"unsupported: The specific attribution to 'Karan Sampath' sharing 'what Anthropic learned scaling MCP to enterprises'... ('bless one platform,' 'establish a root of trust')... has no corresponding ledger entry."*
- Ledger reality (`claims/Claims Ledger.md`): source **#624 — Karan Sampath, Anthropic** is cited under **book-claim #32** ("Protocol standardization expands the attack surface if governance lags", line 633 region) and **book-claim #33** ("Enterprise MCP adoption converges on gateways, blessed platforms, and a root of trust"), with the **exact quotes** "establish a root of trust" (line 625) and "bless one platform" (line 639). Support level: **strong**.
- The break: claims **#32 → `Candidate chapters: 7`** and **#33 → `Candidate chapters: 7, 9`**. The Sampath paragraph is in **chapter 5**. The `chapter.number in c.candidate_chapters` filter therefore **excludes #32/#33 from the chapter-5 prompt**, and the judge — given a ledger slice that genuinely lacks the claim — reports "no ledger backing" for the **best-supported** material in the corpus.

This is not a model error; it is a **data-routing error in the harness** that the model has no way to recover from. Every chapter-5 claim_defensibility judgment shares this blind spot, and any chapter whose discussed content is tagged to a different chapter is exposed to the same failure.

**How often does it only check a wrong subset?** Always — by construction. The judge *never* sees the full ledger; it sees a chapter-tag-filtered, heading-only subset on every call. The Sampath case is the visible instance; the systemic rate is "100% of calls run against an unverified subset."

**Other fails are a mix (run `ea0f`, 9 fails):** some are genuine catches — `chapter-7...#L7` flags leaked editorial metadata (a "Grinich vs Galow" speaker-correction note in prose); `chapter-7...#L20` flags an empty paragraph; `chapter-8...#L71` flags a claim that partially contradicts ledger #22/#29. Others are borderline false positives where the judge treats **metaphor as a factual claim** (`chapter-3...#L53`, the "below the waterline" iceberg image, score 5). So the dim is not uniformly broken — but its headline "unsupported" flags cannot be trusted without manual ledger verification.

**Verdict:** Low / do-not-ship-on. The dimension explicitly designed to be the ship-blocker is the least reliable, and its failure mode (false "fail") is the most damaging to act on (deleting or hedging well-supported prose).

### 6. Redundancy (chapter, broadcast down) — `book_mash/judges/redundancy.py`

**Rubric (lines 24–42):** Reasonable. It distinguishes *deepening* a prior claim (OK) from *restating* it (redundancy), with a quantified `fail` anchor (>40% restatement). The embedding prefilter + Haiku-confirm design (here Sonnet) is sound and matches the doc.

**Grounding concern:** Earlier chapters are passed as **digests** produced by `_summarize_chapter` (`measurement.py:247–250`), which is just the title plus the first 200 chars of each section's first paragraph. As with the voice baseline, first-paragraphs-of-sections are opener-biased, so the redundancy judge compares against a thin, transition-heavy digest rather than the chapters' actual arguments. The prefilter `threshold=0.75` (`redundancy.py:124`) is an untuned magic number.

**Variance:** Native scores spread 0.0 across recent runs — again cache replay. Book rollup moved 72.0 (`1cef`) → 83.3 (`ea0f`); but `ea0f` had 821/2019 error slots, so that lift is partly an **aggregation artifact** (different units dropped), not a re-judgment.

**Verdict:** Medium. Sound approach undercut by a weak chapter digest and unmeasured variance.

---

## Cross-cutting issues

### X1. Determinism is claimed but not implemented; caching masks variance

- **No temperature is set anywhere.** `grep -rn "temperature\|model_settings\|ModelSettings" book_mash/` returns nothing. Every judge builds a bare `Agent(model=AnthropicModel("claude-sonnet-4-6", api_key=...))` with no `model_settings`, so calls run at the provider default (~1.0), **directly contradicting** design doc lines 129 and 193 ("`temperature=0`"). The "warm cache → identical scores" determinism contract (doc line 193) is real only because the cache returns the *first* sampled answer forever, not because judging is deterministic.
- **The three June-20 runs are cache replays, not re-judgings.** Pairwise identity on shared native scores: `05e5`↔`52f0`, `05e5`↔`ea0f`, `52f0`↔`ea0f` = **100%** identical; `1cef`↔new ≈ 74%. `52f0` finished in 27s and `ea0f` in 2s with `total_cost_usd=0.0` — pure replay. The apparent run-to-run "stability" the project might read as signal is an artifact of the cache key, which includes `dim_version` + `model_id` but **not** any run nonce, so an unchanged paragraph at an unchanged dim version can never be re-sampled.
- **True inter-judgment variance, where measurable (`1cef` vs new), is large:** same-paragraph swings of 5→82 (usefulness), 0→78 (claim_defensibility), 38→84 (humanness); chapter-rollup swings up to 41.6 pts (usefulness, ch-2). Some of that is a deliberate rubric loosening between `1cef` and `05e5`, but it cannot be separated from sampling noise because nothing in the artifacts re-judges the *same* rubric twice.
- **Consequence:** the ±5–10 pt per-chapter deltas the project acts on are **currently un-validated as signal.** They could be real or could be single-sample noise; the harness as built makes it impossible to tell, because re-running never re-samples.

### X2. Aggregation lets floored connective paragraphs distort usefulness; error slots distort everything

- Rollups are weighted means by `char_count` at paragraph→section→chapter (`rollups.py:6–13`, `measurement.py:166–200`) — a defensible choice that does length-weight (long substantive paragraphs outweigh short transitions). Good.
- **But the section tier is computed over all paragraphs including floored connectives**, so for usefulness the chapter rollup runs 6–10 pts *above* the simple paragraph mean (ch-1: 46.7 vs 36.5; ch-8: 52.7 vs 45.4) — the weighting partially rescues the dim by accident, and the consumer's `usefulness_substantive` re-derivation is needed precisely because the engine doesn't model "structural" paragraphs.
- **Error slots silently move rollups.** `ea0f` has 821/2019 (41%) error scores from credit exhaustion. `weighted_mean` excludes `None` (`rollups.py:7`), so a chapter rollup can be computed over half its paragraphs (ch-8 humanness: 24 valid vs 23 errors) and still report a confident number with no visible caveat in the rollup value itself. The `n_errors` is recorded in the rollup *reasoning* string but not surfaced as a coverage gate. Comparing `ea0f` to `05e5` partly compares *different paragraph subsets*, not different judgments.

### X3. False-positive bias is baked into two epistemic dims

- claim_defensibility (chapter-filtered, heading-only ledger + "false positives tolerable" instruction) and usefulness (operational-density-as-value) both have **systematic, directional** error, not random noise. Both currently require a downstream human or script to reverse-correct. That is the opposite of what a metric should do.

### X4. No evidence the calibration gate was ever passed

- `scripts/calibrate.py` exists but is a manual, interactive 20-paragraph agreement tool (16/20 to pass). There is no stored calibration result, no per-dim agreement number, and the live smoke tests (`tests/test_judges_smoke.py`) only assert coarse label *bands* on 3 hand-written paragraphs and are excluded from the default test run (`-m 'not live'`). The design doc's "is the judge actually judging what we think" gate (doc line 354) has no recorded pass. The module is in production use without a documented calibration baseline.

### X5. Model/cost choice is the inverse of the design

- Every judge runs `claude-sonnet-4-6` (all six `model_id`s, confirmed in each judge file and `planner.py:27–34`). The design doc (lines 154, 165, 185) specified Haiku for usefulness, evidence_density, and redundancy. The code is internally consistent (planner matches reality), so the doc is stale — but the practical effect is that the **cheap-model-on-hard-task** risk is inverted: there is no under-powered judge, only over-spend on the easy deterministic ones (evidence_density's LLM step is just claim extraction; redundancy's is a confirm step). Cost is real ($3–5 per cold run) but reliability is not compromised by model choice. This is the *least* urgent finding.

---

## Prioritized, actionable recommendations

Each tagged **[effort] / [impact]**. Effort = engineering time on book-mash; impact = effect on trustworthiness of the numbers the project acts on.

### P0 — Fix claim_defensibility grounding (it is generating false ship-blockers)

1. **Stop chapter-filtering the ledger for claim_defensibility; retrieve by relevance instead.** Replace `relevant_ledger = [c for c in claims_index if chapter.number in c.candidate_chapters]` (`measurement.py:109`) with an embedding/keyword retrieval over the *full* ledger per paragraph (reuse the redundancy embedding client). The `candidate_chapters` tag is editorial, not ground truth, and routes Sampath's chapter-5 content to chapters 7/9 only. **[Medium] / [High]** — directly kills the verified false-positive class.
2. **Pass the supporting quotes/sources, not just the heading.** Extend `load_claims_index` (`corpus/claims_index.py`) to capture each claim's supporting quotes + source attributions, and include them in the claim_defensibility prompt (`claim_defensibility.py:80–83`). The judge currently cannot match prose like "bless one platform" because that quote never reaches it. **[Medium] / [High]**.
3. **Soften the "false positives tolerable" instruction (line 47) to "flag as *needs-review*, not *fail*, unless the ledger slice is known-complete."** Until grounding is fixed, demote unsupported-claim outputs from ship-blocker `fail` to a separate `needs_ledger_check` band so the project doesn't act on them as deletions. **[Low] / [High]**.

### P1 — Make variance measurable (you currently cannot tell signal from noise)

4. **Set `temperature=0` (or a fixed low temp) on every judge `Agent`** via `model_settings`, honoring the design contract. **[Low] / [Medium]** — reduces sampling variance and makes cold reruns near-reproducible as the doc promised.
5. **Add an inter-run variance report.** A small script that, given N runs, computes per-(unit,dim) max-min spread and flags any unit drifting >5/>10/>20 pts, plus a "% identical (cache-replay)" indicator so a replay is never mistaken for a stable re-judgment. Add a `--no-cache` / `--reseed` flag to `book-mash measure` so a deliberate variance run can actually re-sample (the cache key needs an optional nonce). **[Medium] / [High]** — this is the missing instrument that would let the project trust (or distrust) its ±5–10 pt deltas. Without it, every delta is unfalsifiable.
6. **Run a 3× re-judge of one unchanged chapter at temp 0** and publish the observed per-paragraph spread as the noise floor. If the noise floor exceeds the deltas being acted on, the deltas are not actionable. **[Low] / [High]**.

### P2 — Fix usefulness in the judge, not the consumer

7. **Add a structured `paragraph_role` field to the usefulness output** (`operational | framing | transition | recap | reflective`) and a separate `operational_score`, so the engine emits the substantive/connective split natively instead of the consumer keyword-parsing the judge's free-text reasoning (`build_judge_scores.py:94–120`). Then `usefulness_substantive` becomes a clean rollup over `paragraph_role == operational`, and every consumer gets it. **[Medium] / [High]** — removes a brittle prose-parsing heuristic and corrects the bias at source.
8. **Rewrite the usefulness rubric to separate "actionable density" from "structural value"** so a necessary transition isn't scored `fail (0–19)` for value when it is doing its job. Keep the operational-density number; add a flag for "this is connective tissue, judge it on whether it does that job well." **[Medium] / [Medium]**.

### P3 — Coverage honesty and aggregation guards

9. **Surface coverage as a gate, not a reasoning string.** When a chapter rollup is computed over <95% of its paragraphs (e.g. `ea0f` ch-8 humanness over 24/47), mark the rollup `partial` and refuse to use it in cross-run deltas. Errors from credit exhaustion currently move rollups invisibly. **[Low] / [Medium]**.
10. **Don't compare two runs with different error profiles as if they re-judged the same corpus.** The variance report (P1.5) should refuse pairs whose covered-unit sets differ by more than a threshold. **[Low] / [Medium]**.

### P4 — Calibration and lower-priority grounding

11. **Run and record the 16/20 calibration gate per dim** (the doc's preflight, line 354) and store the agreement numbers in the run dir; right now there is no documented baseline. Expand `tests/test_judges_smoke.py` beyond 3 hand-written paragraphs into a small labeled gold set per dim. **[Medium] / [Medium]**.
12. **Improve the chapter digest used by voice baseline and redundancy.** `_summarize_chapter` and `_load_voice_baseline` both sample first-paragraphs-of-sections (opener-biased); use a representative or argument-bearing excerpt instead. **[Low] / [Low-Medium]**.
13. **De-saturate evidence_density** (every section ≈ 90) by either tightening bands or feeding supporting quotes so "grounded" means "actually supported," not "resembles a heading." **[Medium] / [Low-Medium]**.
14. **Reconcile the design doc with the code** (Haiku→Sonnet everywhere; temperature). The doc is the contract reviewers read; it is currently wrong on model assignment and determinism. **[Low] / [Low]** — no reliability impact, but it is why a reader would wrongly trust the variance story.

---

## What this evaluation does NOT cover

- **The true single-rubric inter-run variance is still unmeasured.** Because the recent runs are cache replays, the only cross-judgment comparison available (`1cef` vs new) is confounded by a rubric change. P1.6 is the experiment that would close this gap; this report could not run it (no API budget; runs are read-only).
- **Judge bias checks** (position effects, length bias, self-preference) were not run — the harness scores one unit at a time with no pairwise comparison, so classic position effects don't apply, but length bias (short paragraphs floored on usefulness) is observed and unquantified beyond the examples above.
- **Embedding prefilter quality** for redundancy (threshold 0.75) was not empirically validated against known overlaps.
- No book-mash code was changed; all findings are from reading source + run artifacts.
