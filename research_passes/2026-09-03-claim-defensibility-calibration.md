# Research Pass — 2026-09-03 — Calibrating the claim_defensibility judge before running it

`claim_defensibility` is the one MASH dimension with no valid reading. It is also the
dimension that tests the book's premise directly: every claim carries a source anchor.
This pass is the work done *before* judging 534 paragraphs, and it changed the
instrument twice before a single batch was scored.

## 1. The judge was reading a near-arbitrary slice of the ledger

The rubric lets the judge answer "no matching ledger entry = unsupported". That verdict
is only safe if the judge saw every entry. It did not: `retrieve_relevant_claims`
returns the top 8 claims by IDF-weighted lexical overlap.

Measured on snapshot `54c7e3c1` (534 paragraphs, 54 claims):

| | |
|---|---|
| paragraphs with >8 claims at nonzero overlap (truncation happens) | **520 / 534** |
| of those, rank-8 → rank-9 relative score gap under 10% | **439** |
| median rank-8 → rank-9 gap | **3.3%** |

The 9th claim is all but tied with the 8th, so which 8 the judge sees is close to a coin
flip — and an "unsupported" flag was partly an artefact of where the list got cut.

Passing the **whole ledger** is also cheaper: 34k chars hoisted once per batch by the
existing shared-context path, against ~57k for top-8 repeated across 10 units. Run total
3.6M → 2.4M chars. Batches now state that the ledger is complete, because "not backed
here" only means "backed nowhere" if the judge knows it saw everything.

**This defect is in the canonical API judge too** — it still uses `DEFAULT_TOP_K = 8`.

## 2. Aggregate agreement hid total disagreement on the deliverable

First calibration: three judges, same batch, batch 1 → 93.4 / 93.6 / 94.2. A 0.8-point
spread looks like a well-behaved instrument. It is not evidence of one. Batch 1 is the
chapter 1 opener, where the rubric's Step 0 makes every answer "strong" before the
ledger comparison ever runs. The judges agreed that they can read Step 0.

Second calibration, on the most claim-dense batch in the corpus (batch 34, selected
mechanically by density of digits and named organisations):

| unit | D | E | Δ |
|---|---|---|---|
| L114 | 93 | 92 | 1 |
| L116 | 87 | 85 | 2 |
| L120 | 88 | 88 | 0 |
| L122 | 93 | 93 | 0 |
| L124 | 92 | 92 | 0 |
| **L126** | **83** | **74** | **9** |
| **L128** | **82** | **73** | **9** |
| L130 | 85 | 85 | 0 |
| **L132** | **84** | **64** | **20** |
| L134 | 94 | 94 | 0 |

Means 88.1 vs 84.0 — a 4.1-point mean difference, which reads as fine. But the flagged
set (<80) was **D: none, E: three. Zero overlap.** The entire deliverable is the flagged
set, and the two judges shared none of it.

The `finalize` divergence guard cannot catch this. It compares batch means, and with
Step 0 pushing most units to 90+ every batch mean clusters near 90 however violently
judges disagree about the handful of units that can produce a defect. **On this
dimension that guard is effectively absent.**

## 3. The disagreement is a rubric ambiguity, not a construct split

The three disputed units are D's three lowest scores. Both judges picked out the same
paragraphs and named the same phrases. They split on one question: the rubric says to
treat "a match against a supporting quote **or source**" as valid backing. Does a quoted
phrase that is absent from the ledger's excerpts, by a speaker who *is* the listed source
for that claim, count as backed?

D said yes, and explicitly reported reversing its own first pass (68–76 → 82–84) on that
clause. E said no.

**D is right, and it is checkable.** All three flagged phrases were searched across the
1074-transcript corpus:

| phrase | in ledger excerpts | in corpus |
|---|---|---|
| "GitHub is not a coordination layer for agents" | no | **yes** — `5Sui_OnSRlY` |
| "work on parallel tasks and instantly switch between them" | no | **yes** — `ClWD8OEYgp8` |
| "serial execution with targeted internal parallelization" | no | **yes** — `ow1we5PzK-o` |

The third needs a note. An exact-substring search calls it a miss: the transcript reads
"serial execution with **with** targeted internal parallelization", an ASR stutter, and
the book correctly prints it once. That is the documented limit of exact matching and
precisely why `verify_prose_quotes.py` uses gap-tolerant subsequence matching. The book
is more accurate than the source it is checked against. Not a defect — and worth stating,
because an over-eager reading of that MISS would have manufactured a second Hetzel.

A claims ledger lists *representative* quotes, not full transcripts. Prose drawing
further on a listed source is backed. Both judges' substantive finding was identical
and correct; only the band assignment diverged.

## Consequence for the run

Judging 534 paragraphs on a 0–100 score would produce a defect list that depends on which
agent drew which batch. Two changes before the fan-out:

1. **The deliverable is the named phrases, not the threshold.** Every judgment carries an
   explicit list of specific assertions it could not back. Judges agree on that perfectly
   and disagree on the score, so the artefact should be the thing they agree on.
2. **The "or source" clause is pinned in the prompt**, with the reasoning above, so the
   band assignment stops being a coin flip.

Verification then composes two instruments: `claim_defensibility` names a phrase the
ledger does not carry, and `verify_prose_quotes.py` answers whether it is in the corpus
at all. In neither = the Hetzel class, a ship-blocker. In the corpus but not the ledger =
elaboration from a listed source, which is fine.

## Standing note: the snapshot hash is not portable

`compute_snapshot_hash` folds `file_path` into the digest, so identical text hashes
differently under a relative glob than an absolute one (`a2d924a5` vs `54c7e3c1`).
Nothing is broken — `book_mash/config.py` and `mash_agent` both absolutise against the
config file's directory — but a run launched from a git worktree at another path would
produce a different hash over the same text, and `panel_merge` would refuse to merge the
two. Left unchanged: re-basing the hash would strip published panel v8 of a snapshot
anyone can recompute.
