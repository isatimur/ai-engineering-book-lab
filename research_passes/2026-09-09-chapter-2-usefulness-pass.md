# Research Pass — 2026-09-09 — Chapter 2: sharpening what the first pass left standing

Contract: `docs/superpowers/specs/2026-09-09-chapter-2-usefulness-pass-design.md`.
Predecessors: `2026-09-02-usefulness-and-attribution-pass.md` (the filler pass, all chapters),
`2026-09-04-usefulness-measures-genre-not-quality.md` (why Chapters 1 and 10 are excluded).

## Why Chapter 2

After v11, Chapter 2 sat at usefulness 54.6 with 29 of 68 paragraphs below 50 — the weakest
chapter whose job is concrete. The 09-04 note settled that the dimension measures genre on the
opener and the closer and must not be "fixed" there; it also said the dimension stays
meaningful within a chapter of a given kind. Chapter 2 argues that judgment, taste, review and
framing become the scarce skills once code is cheap, and each of those is a Monday decision.
The 09-02 pass had already removed its filler (−93 words). What remained weak was description
that could carry a decision.

## Method

One editor, propose-only, working from the 29 flagged paragraphs with all three judges'
reasoning attached, and from the anchored quotes of the ledger entries that name Chapter 2
(#40–#42, #58–#62). Every sharpening had to assert only what a source already cited in the
chapter says. Word count could not grow. The closing move, the chapter hand-offs and the
quote-frame paragraphs were left alone on purpose: the genre finding says the judge is
measuring what those paragraphs are.

## What changed

15 edits — 8 sharpen, 7 cut — covering 17 of the 29 targets; 12 skipped with a reason each.
Chapter 2: 3,303 → 3,301 words. Where the lift comes from: entry #40's caveat gives the opening
a scope test (throwaway versus enduring code); #60 gives the Artman question its answer at
Artman's own strength (when a small AI-equipped team can match your feature set, taste is a way
to keep some competitive advantage); #61 replaces a hedge
with Ronacher's own mechanism; #62 turns six framing questions into a binary gate; #59 gives
the review section a rate condition (a loop that generates faster than it can review is not
fast, it is unreviewed); #58 makes "fundamentals" operational instead of a list stem.

Gates: `verify_prose_quotes.py` 30 unmatched (unchanged), speaker and title checks clean,
website tests green, every edit present in the generated copies after sync.

Ship-gate: **PASS on round 3**, two model families (Claude Sonnet 5 and Codex 0.153.4 under
`codex exec --sandbox read-only`), token `f222791e…+6553a951…`, recorded in
`~/Dev/ai-native-org/ledger/verdicts.md`. Rounds 1 and 2 were REVISE. The contract's own
"≤ 2 gate rounds" budget was exhausted at round 2, so round 3 ran only on operator authorization
and only on the two residual sentences; both families read them against the primary transcript and
the ledger and returned CLEAN with no disagreement. Two pre-existing passages the gate flagged
predate this pass and stay open for the Architect.

## Measurement

`panel-3model-v12`, snapshot `ad4b`: every member zero nulls; 1,730 merged units, zero with fewer
than two votes; spend about $1.20 across the first run and the post-revision re-run.

| Chapter 2 | v11 | v12 | Δ |
|---|---|---|---|
| usefulness | 54.6 | **60.2** | **+5.6** |
| humanness | 86.0 | 85.7 | −0.3 |
| voice | 85.0 | 85.0 | 0 |
| evidence_density | 85.8 | 83.8 | −2.0 |
| claim_defensibility | 93.7 | 93.5 | −0.2 |
| redundancy | 90.0 | 90.0 | 0 |

Paragraphs below 50: 29 of 68 → 20 of 66 (43% → 30%). Book usefulness 60.5 → 61.1 as measured
across all ten chapters; every other book-level dimension within ±0.4. The published rollup reads
61.2 because it now excludes Chapter 2 — see the provenance section below. Chapter 2's
evidence_density −2.0 is one section changing band on the same ledger — the variance
documented on 09-04.

### A provenance defect, and what it turned up

`version_id` is stamped from the last commit that touched `public/drafting`. Publishing before
the commit lands therefore labels the scores with a sha whose Chapter 2 is the *pre-pass* text.
Chasing that label turned up the larger fact behind it: **v12 finished at 00:24 on 09-09, and the
two round-2 softenings landed after it.** The snapshot v12 measured (`ad4b`) is not the snapshot
this commit ships (`db85`). Chapter 2's 60.2 was measured on text two sentences different from
the text in this commit.

The staleness guard in `build_judge_scores.py` caught this the moment the chapter was committed,
which is the first time it could: while the edits sat uncommitted the guard had no commit date to
compare against and read the chapter as fresh. Chapter 2 is now badged stale and excluded from the
book rollup, which is the guard working as designed. The badge is not cleared by hand; the next
full panel run clears it.

How much does the gap matter? Two of the three canonical judges were re-run on the committed
text and both had zero nulls. Chapter 2's usefulness rollup moved **0.0 on deepseek (75.2 →
75.2) and −0.6 on llama (61.0 → 60.4)**; humanness was unchanged on both. The third judge,
qwen, could not be re-run: it missed the content cache that made the other two cost $0.006
each, spent $0.26 on fresh calls, and exhausted the OpenRouter balance mid-run with 496 nulls.
That run is discarded, not published — a two-judge panel is a different instrument from the
canonical three-judge median.

So the honest reading is that the shipped text is worth very close to 60.2, but *very close* is
not *measured*, and the badge says so until a three-judge run on `db85` says otherwise. The publish
script now warns when the drafting tree is dirty, and `restamp.sh` re-labels a published panel once
the commit exists. Why qwen missed a cache holding 5,712 of its own entries is unexplained and
worth finding before the next run — it is the difference between a $0.02 re-measure and a
$0.26 one.

The gate's round-1 finding shaped the result as much as the edits did. Six of fifteen edits had
promoted hedged sources to absolutes — Artman's "might" became "every competitor", a ledger
caveat's scope was dropped, a rate rule no speaker states was voiced as fact. Softened to the
strength of each source, the paragraphs kept most of their lift: the judge rewards a test the
reader can run, and "a rule of thumb, mine" is still a test. Rule 10 in the contract now says it
plainly: a sharpening may not be stronger than its source.

## What this does not establish

- That Chapter 2 reads better to a human. The judges reward decisions and tests; a chapter
  can gain those and lose cadence. The humanness and voice numbers on v12 are the only
  check on that here, and they are coarse.
- Anything about Chapters 4 and 5, the next two by headroom. Same method would apply.
