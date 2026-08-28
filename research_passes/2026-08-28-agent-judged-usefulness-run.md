# Research Pass — 2026-08-28 — Agent-judged usefulness run

First run of `scripts/mash-agent`: the manuscript judged with **no API key**, by the
agent session itself. Run `agent-d473-20260828-134213`, snapshot `d473c4b0`, 572
usefulness units in 23 batches, judged by `claude-code/opus-5` across six parallel
judges, every batch schema-validated on ingest. Cost: **$0.00**.

This is not a canonical panel run and is not published. It lives in
`.mash-agent-runs/`, and `build_judge_scores.py` refuses it in both auto-select and
explicit `--run`.

## Headline

| | n | mean | strong | moderate | weak | fail |
|---|---|---|---|---|---|---|
| agent (`claude-code/opus-5`) | 572 | **54.8** | 137 | 225 | 130 | 80 |
| `panel-3model-v8` (API median) | 537 | **55.9** | 187 | 126 | 163 | 61 |

On the **437 units present in both**, the two instruments give
**56.4 and 56.4 — identical to one decimal.**

## The finding: agreement on the aggregate, disagreement on the units

That identical mean is not what it looks like. On those same matched units:

- **Pearson r = 0.603** — correlated, but far from interchangeable
- **band agreement 194/437 = 44%** — they place the same paragraph in the same
  quality band less than half the time
- of the panel's fail-band paragraphs, the agent judge **also failed only 45%**

Two independent instruments — a different model, a different harness, no shared
cache, a different snapshot — converge on the book's average to within a rounding
error while disagreeing about most individual paragraphs.

**So the usefulness metric is trustworthy as a book-level aggregate and untrustworthy
at the paragraph level.** Use it to track the manuscript over time. Do **not** use it
to pick which paragraphs to rewrite: at 44% band agreement, a per-paragraph score is
close to a coin flip between adjacent bands.

This also explains the wide spread inside the API panel itself (deepseek 66.2,
llama 46.2, qwen 51.8 on the same units). That spread was never evidence of a broken
rubric. It is what per-unit judgment noise looks like before the median absorbs it —
and the median absorbs it well, which is exactly why the canonical panel is a median
of three rather than any single judge.

## The distributions differ in shape, and that is informative

The panel's distribution is **bimodal** (187 strong against 163 weak, a thin middle
of 126). The agent's is **centered** (225 moderate, the largest band). Same mean,
different shape: the API panel is more polarized, the agent judge more hedging.

That is a real calibration difference between instruments, not a fact about the book.
It is another reason not to read a single dimension's mean as a verdict on quality.

## Where they do agree

Both instruments independently put the same *kinds* of text in the fail band, and the
six judges converged on this without coordination — each reported it separately:

- chapter roadmaps and "the rest of this book is about" paragraphs
- chapter-to-chapter transitions and hand-off questions
- list stems ("A practical checklist usually includes the following:")
- rhetorical wind-downs and aphorisms ("Not luxury. Not style.")
- section-heading fragments

And both put explicit tests and runnable procedures at the top: the 24-hour-unread
classification test, the fresh-container green-test-run legibility check, the
no-fan-out-until-a-single-task-succeeds threshold, "route down to the cheapest model
that still passes the eval", the four-owner rule.

The *class* of judgment is stable even though the per-unit score is not. That is the
useful signal for editing: the manuscript's weakest material is its connective
tissue, which is a structural observation, not a per-paragraph one.

## Method notes

- **Segmentation parity was verified, not assumed**: `mash-agent` reuses book-mash's
  `load_chapters` / `compute_snapshot_hash` and produces 572 paragraphs matching the
  API runner's 572 exactly, per chapter.
- **Rubrics are imported, not copied** — each dim's verbatim `_SYSTEM_PROMPT`, so the
  agent judged against the same words the API judges see.
- **A context defect was found and fixed before running.** book-mash passes each
  judge a `context` payload; the first cut of the CLI dropped it. `usefulness`'s
  (`chapter_title`) is now supplied, and the other five dims are refused at plan time
  rather than judged without their context.
- **Known schema gap:** the usefulness rubric text asks the judge to emit
  `actionable_takeaway`, but the CLI's output contract collects five keys and does not
  include it. Two judges noticed and flagged it independently. The field is therefore
  absent from agent runs; collecting it would need a contract change and a re-run.

## What this does not establish

Whether 54.8 is a *good* score — there is still no baseline. Whether the agent judge
is better or worse calibrated than the API panel; they are simply different, and only
the panel has version-over-version history. And nothing about the five dimensions
`mash-agent` still refuses.

## Decision (2026-08-28): do not edit the book to raise usefulness

I pulled the 22 paragraphs that **both** instruments independently placed in the fail
band — the highest-confidence "filler" set available, since it needs two different
models, two harnesses, no shared cache, and two snapshots to agree. Then I read them
in context.

They are not filler. They are rhetorical landings and necessary scaffolding. (Read
from `public/drafting/`, the files the agent run was scored against. The panel's
scores predate this snapshot, so its agreement corroborates rather than confirms — the
decision rests on the agent run, which is snapshot-matched.)

- *"Voice removes that mercy."* (ch8) — lands a paragraph arguing that text chat
  flatters AI by hiding latency and tolerating weak handoffs. Scored 8 and 15.
- *"That is where slop comes from."* (ch3) — lands the Lopopolo passage on the
  "500 little decisions" a patch requires. Scored 10 and 10.
- *"And that is the problem."* · *"It needs evidence."* — same shape.
- *"The useful spectrum is simpler:"* · *"This is also why a good eval program usually
  contains multiple layers:"* — list stems, which cannot carry a takeaway because the
  list beneath them does.
- chapter roadmaps and hand-off sentences — the connective tissue any book needs.

The rubric asks one question: *"could a working engineer change something on Monday
because of this paragraph?"* A one-line landing correctly scores near zero on that
question while doing real work for the reader. **The metric measures operational
density, not quality, and short high-craft prose is structurally fail-band under it.**

So the decision is to change nothing in the manuscript. Cutting or padding these
paragraphs to raise a number would make the book worse, which is the opposite of what
the number exists to detect.

### What this fixes going forward

Read usefulness with a **structural ceiling**, not as a target:

- The headline mean (~55–56) includes headings, list stems, transitions, and
  rhetorical landings that are correctly written and correctly scored low.
- The prose-only figure — excluding the 35 sub-12-word fragments; there are **no**
  heading units — is **57.0**, and is the fairer number to track.
- Neither figure should be pushed upward by editing. A rising usefulness mean would
  most likely mean connective tissue was stripped out, not that the book improved.

Usefulness is a **drift detector for aggregate operational density across versions**.
It is not a quality gate, not a per-paragraph editing signal (44% band agreement), and
not a number to optimise. Treat a large *drop* as worth investigating and everything
else as noise.
