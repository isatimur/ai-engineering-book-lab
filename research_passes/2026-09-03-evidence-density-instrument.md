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

## Conclusion — parked, and why the consensus run was not worth making

The consensus rule is sound but yields nothing measurable on this corpus. On the
calibration batch F grounded something in **10 of 10** sections and G in 8, so the
intersection of "both extractors ground nothing" is **empty**. Extrapolated over 114
sections that list stays empty or near-empty — and an empty defect list is the same output a
broken run produces. It could not distinguish *the book cites something everywhere* from
*two extractors never both miss*.

The ungrounded-claim list fails in the opposite direction. F reported 0 ungrounded of 61
claims, G reported 4 of 31; they do not agree on claim boundaries at all, so there is no key
to join their lists on. Requiring consensus there is not conservative, it is undefined.

So the run was not made. **On this corpus, at these section lengths, `evidence_density`
cannot support a per-section verdict from agent extraction.** That is the finding, and it is
a firmer statement than the 08-28 post-mortem managed: that run did not die of construct
divergence, it died of a dimension being mismodeled as a scoring judge when it is an
extraction judge. The CLI no longer makes that mistake, which is worth having whether or not
a run follows.

## The lever here is the ledger, not the judge

Both calibration errors trace to one cause: `claims#8` carries too much. F over-matched to
it and G missed its own statement inside it. A judge cannot fix an entry that bundles
"evals are a control system", eval tooling, benchmark-maxing, and organisational control
into a single id — the matching decision stops being well-defined. That is a
ledger-granularity question, not a measurement one, and splitting over-broad entries would
raise the signal on this dimension more than any change to the instrument.

## Correction (same day) — the ledger-granularity conclusion was wrong

The section above ends by asserting that both calibration errors trace to `claims#8` carrying
too much, and that splitting over-broad entries "would raise the signal on this dimension more
than any change to the instrument". That was written from one anecdote and is not supported.

Measured across the whole ledger (68 entries, 534 paragraphs, IDF-weighted lexical overlap):

| | words | top-1 for | vs median |
|---|---|---|---|
| median entry | 94 | — | — |
| `claims#54` | 219 | 41 paragraphs | 2.3× |
| `claims#26` | 206 | 25 | 2.2× |
| **`claims#8`** | **120** | **28** | **1.3×** |

`claims#8` is not an outlier on either axis — fifth by attraction, barely above median length.

Re-reading the two disputed sections confirms it. F matched *"evaluation work is often
uncomfortable because it surfaces disagreement"* to `claims#8`, but that proposition is not in
`claims#8` under any reading, broad or narrow — the entry says nothing about discomfort or
disagreement. And G returned zero grounded claims for a section containing *"evals are a
control system not only for the model, but for the organization"*, which is `claims#8`'s own
headline. **Both were judge errors. Neither was caused by entry breadth.**

The right lesson is narrower and about method: a disagreement between two judges on two
sections is not evidence about the structure of the ledger. Generalising it into a structural
claim, then writing that claim into the backlog as though it were established, is the same
error this project keeps finding elsewhere — a plausible story recorded as a finding without
the measurement that would have tested it. The measurement took two minutes and refuted it.

`claims#54` and `claims#26` are genuinely long. Whether they are ill-defined rather than
merely long is untested, and being top-1 for many paragraphs is expected for a central topic
like model routing. That question stays open, and any split should follow evidence that
matching to them actually goes wrong.
