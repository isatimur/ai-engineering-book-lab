# Research Pass — 2026-08-23 — Is "usefulness" measuring prose or structure?

- **Target:** the fresh `panel-3model-v8` scores put usefulness at **55.7** book-wide, far below every other dimension (humanness 86, evidence density 86, claim defensibility 94, redundancy 87). Usefulness has been treated as this book's weak dimension for months. Is that real, or partly an artifact of what gets scored?
- **Method:** read the panel's own weakest-N entries and classify what the low-scoring units actually *are*.

## Finding: the artifact is real but modest — it does not explain the gap

Of 537 usefulness paragraph units scored, **66 (12%) scored ≤20 ("fail")**.
Inspecting the weakest-N entries the panel surfaces per chapter (30 usefulness
entries in total):

| what the unit actually is | count |
|---|---|
| markdown **headings** scored as paragraphs | 3 |
| short fragments (≤8 words) | 7 |
| genuine prose paragraphs | **20** |

So a third of the flagged units are structural rather than prose. Concrete
cases, with the panel's own median score:

- `## Constraints are a form of care` (ch02) — **0**
- `## Context is what makes intelligence situated` (ch05) — **10**
- "Not personal branding." (ch02) — **0**
- "The useful spectrum is simpler:" (ch01) — **10**
- "Make the organization capable of learning." (ch10) — **10**

A section heading cannot contain "an actionable insight a working engineer can
apply on Monday", so it scores near zero every run. The judge is answering
correctly; the unit was never a fair subject for the question.

**But two thirds are genuine prose**, and the reasons given there are
substantive — meta-commentary about the book's own structure ("The chapters that
follow are not a tour of trendy infrastructure", ch01 para 9, score **10**;
"The rest of this book is about what happens once we take that requirement
seriously", ch01 para 14, score **10**). That is a real editorial signal:
Chapter 1 and Chapter 10 score lowest on usefulness (43.4 and 44.0) precisely
because they carry the most framing and least instruction. For an opening and a
closing chapter that may be the correct design — but it is a *choice*, not noise.

## What to do with this

1. **Do not "fix" the score by excluding headings.** The honest fix is to stop
   *scoring* them: headings and sub-8-word fragments are not paragraphs, and
   feeding them to a usefulness judge produces a number that measures document
   structure. That is a change to `book-mash`'s unit segmentation, not to the
   manuscript, and it would raise usefulness slightly without a word of prose
   changing — which is exactly why it must be recorded as a **methodology
   change with a version bump**, never quietly.
2. **Treat the ch01/ch10 result as a real finding.** Both are framing-heavy by
   design. If the book wants them to score better, they need concrete moves,
   not better sentences.
3. **Do not compare a future usefulness number across this change.** Score
   continuity is the reason the canonical panel exists; a segmentation change
   breaks comparability with v1–v8 just as surely as swapping judges would.

## Honest limits

The 12% fail rate is measured across all 537 units, but the heading/fragment
classification comes from the 30 weakest-N entries the extract surfaces — a
biased sample by construction, since weakest-N is where short units cluster.
The true share of heading/fragment units among *all* usefulness failures is
probably lower than 1-in-3. Establishing it properly needs the full unit text,
which `judge-scores.json` deliberately does not ship (it carries excerpts only,
to keep the bundle small). Reading it from the run ledger would settle it.
