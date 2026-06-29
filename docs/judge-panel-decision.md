# Decision: the cross-family median panel is the canonical scorecard

**Date:** 2026-06-29
**Status:** adopted
**Supersedes:** single-model (Sonnet) MASH measurement as the canonical number.

## Context

MASH quality is scored by LLM-as-judge across six dimensions (humanness, voice,
usefulness, evidence_density, claim_defensibility, redundancy). Two problems
surfaced with a single-model judge:

1. **Cost.** A full Sonnet measurement run cost ~$20. That throttled how often we
   could re-measure, which is the whole point of a continuous-quality program.
2. **Self-preference / calibration bias.** Using one model family as the sole
   judge risks the model flattering text shaped like its own output, and — more
   importantly — bakes one model's calibration into the "truth." When we ran a
   cross-family judge (DeepSeek) it scored *higher* than Sonnet by +8 to +20 on
   the same units. So Sonnet was not self-flattering; it was simply a harsh
   calibration. Either way, **absolute single-model scores are not trustworthy as
   ground truth — only deltas within one model, and consensus across models, are.**

## Decision

The canonical scorecard is a **median-per-(unit, dimension) panel across three
independent model families**, requiring at least 2 valid votes per cell:

- `openrouter:meta-llama/llama-3.3-70b-instruct` (Meta)
- `openrouter:qwen/qwen-2.5-72b-instruct` (Alibaba)
- `openrouter:deepseek/deepseek-chat` (DeepSeek)

Method: `median-per-unit-per-dim`, `min_votes = 2`. Merge tool:
`99_Meta/scripts/panel_merge.py`. Canonical run: `.book-mash-runs/panel-3model`.
Cost: ~$2/run (≈10× cheaper than single-model Sonnet).

The median of three independent families cancels any single model's calibration
bias and is robust to one model erroring out (min 2 votes). Per-cell spread > 20
points is emitted as a disagreement signal — those units are where the panel is
least sure and where human review pays off most.

## Why not a frontier seat

We probed adding a frontier/reasoning seat (GLM-4.7, Qwen3.7-max, Sakana Fugu,
gpt-5.5). Outcomes:

- **GLM-4.7 / Qwen3.7-max** are reasoning models. At our judge token budget they
  spend the budget on hidden reasoning and return empty/stalled completions — a
  50-minute run produced zero cached scores. Not worth fighting; dropped.
- **Sakana Fugu Ultra** is provider access-gated (403). Cannot run.
- **gpt-5.5-pro** works but at ~$17/panel-run it defeats the cost win for marginal
  added signal over three already-independent families.

If a frontier seat is wanted later, the path is: raise `max_tokens` for the
reasoning models (so they finish), or add gpt-5.5 as a fourth seat and keep
`min_votes = 2`. The merge tool already supports N seats.

## Consequences

- Re-measurement is cheap enough to run on every substantive manuscript change.
- The panel doubles as a **transparency artifact**: showing three independent
  models' scores side-by-side (plus the disagreement signal) is stronger evidence
  than one opaque number, and answers the "isn't one AI judging itself cheating?"
  question directly. (Planned: a judge-comparison grid on the /quality page.)
- Trust **deltas and consensus**, not absolute single-model scores.
