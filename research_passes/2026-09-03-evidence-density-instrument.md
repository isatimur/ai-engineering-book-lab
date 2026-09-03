# Research Pass — 2026-09-03 — evidence_density could not have been fixed by prompt wording

`evidence_density`'s 2026-08-28 agent run was thrown away as "construct divergence":
two agents averaged 91.5 and 42 on the same manuscript. It was filed as *re-run with the
construct pinned*. Reading the judge module shows that could never have worked.

## The dimension does not score anything

`book_mash/judges/evidence_density.py` returns `candidate_claims` — each claim's text plus
the closest ledger id, or null. The score is then computed **in code**:

| words per grounded claim | label | score |
|---|---|---|
| ≤ 300 | strong | 90 |
| ≤ 700 | moderate | 65 |
| ≤ 1000 | weak | 35 |
| > 1000, or zero grounded claims | fail | 10 |

Only four values are reachable. My CLI asked agents for a free 0–100, so neither half of
that run was measuring what the API judge measures. No prompt wording could have pinned
that; the fix had to be structural. The agent now extracts and the harness scores, importing
book-mash's own threshold functions rather than copying the numbers.

## The dimension has very low resolution on this corpus

114 sections, median **265 words**. Below 300 words, **one** grounded claim scores 90 and
zero scores 10 — nothing in between. For most sections this is a binary "does it cite
anything at all", and 42 of 114 would change band on a plausible ±1 difference in
extraction. A mean here is close to `90 × (share of sections with ≥1 grounded claim) + 10 ×
(share with none)`. It should not be reported as though it had 100 gradations.

## Calibration: the coarse thresholds absorb huge extraction disagreement

Two extractors, same batch (10 sections, chapters 4–5):

| | F | G |
|---|---|---|
| grounded claims | **61** | **27** |
| ungrounded claims | 0 | 4 |
| band agreement | **8 / 10** | |

F extracted 2.3× as many claims and the bands still agreed 8 times out of 10, because
anything ≥1 claim is "strong" at these lengths. That is the structural fix working.

But both flips sit exactly at the zero boundary, swinging 90 → 10, and that boundary is the
only informative signal the dimension carries.

## On the two flips, both judges were wrong — in opposite directions

The split was not about what counts as a claim. It was about how liberally to match a claim
to a ledger id, and `claims#8` ("Evals are a control system, not just a test suite") shows
both errors at once:

* F grounded *"Evaluation work is often uncomfortable because it surfaces disagreement"* to
  `claims#8`. Same topic, but the entry says nothing about discomfort or disagreement.
  **Over-matching inflates the grounded count, which is the sole input to the score.**
* G found **zero** grounded claims in a section containing *"evals are a control system not
  only for the model, but for the organization"* — `claims#8`'s own statement, almost word
  for word. **Over-strictness sends a well-evidenced section to `fail`.**

So the fail band is unreliable in *both* directions from a single extractor. The matching
standard is now pinned in every batch with both of these as worked examples.

## Consequence for the run design

A single extractor cannot be trusted on the one verdict that matters. So each batch is
judged **twice, independently**, and a section is reported as under-evidenced only when both
extractors ground nothing in it. On this calibration batch that rule flags neither of the
two disputed sections — the correct outcome, since each does contain a grounded claim.

The consensus requirement is not caution; it is the only defensible reading of an instrument
whose interesting output is a zero.

## Side note, checked

Ledger ids run `claims#1`–`#46` then `#50`–`#57`. The gap is deliberate: commit `74377bf`
retracted three duplicate stub claims (#47–49) and left the numbers unreused, so a stale
reference cannot silently resolve to a different claim. Nothing references them.
