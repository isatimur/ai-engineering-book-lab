# Bake-off round 2 — results, and what both rounds say together

- **date:** 2026-11-16
- **design:** `research_passes/2026-11-16-sdd-bakeoff-round2-design.md`, committed before any arm ran
- **round 1:** `research_passes/2026-11-16-sdd-bakeoff-results.md`
- **harness:** `scripts/bakeoff_score_r2.py`

## The task

Make book 3's evidence work end to end: `build_evidence.py` parsed Source
Anchors only, so a ledger of Artifact anchors produced `{}` and the book had no
evidence rail. Plan-shaped where round 1's task was not — it spans the parser,
the evidence row shape, `EvidenceRail.tsx`, two page components and tests, and
it can regress two published books.

Baseline on `main`: M1 **FAIL** (0 rows), M2 PASS, M7 **FAIL**.

## Results

| arm | M1 works | M2 no regression | M3 pinned | **M7 one reader** | files | insertions | ceremony | calls | tokens | wall |
|---|---|---|---|---|---|---|---|---|---|---|---|
| **control** | PASS | PASS | PASS¹ | **PASS** | 16 | 531 | none | 60 | 128k | 297s |
| **Pocock** | PASS | PASS | PASS² | **PASS** | 14 | 268 | none | **53** | **109k** | **267s** |
| **superpowers** | PASS | PASS | PASS¹ | **PASS** | 16 | 636 | **spec + plan** | 69 | 142k | 401s |

¹ red via `ImportError` — both introduced `LedgerError`, so reverting the source
breaks the test module's import. Red, but a coarse signal: it says *something
changed*, not *the behaviour regressed*.
² red via 4 failures and 2 errors — real assertion failures, because Pocock's
tests do not depend on a new symbol. Accidentally the better-pinned suite.

## The headline

**Every arm passed every measure, including M7.**

M7 was round 2's point. It asks whether an arm notices that a parser for this
grammar already exists, or writes a third one — an interface decision invisible
to "does it work", and exactly what ceremony claims to buy. This repo has been
bitten three times by a second reader of one grammar.

All three arms imported `parse_anchors` from the existing verifier. The control,
with no process at all, made the same interface call as the arm that wrote a
spec and a plan.

**Ceremony fired this time, and bought nothing the measures could see.**
Superpowers wrote a design doc and a plan — round 1's ceremony measure recorded
zero for every arm, so this is the first time it registered at all. It cost
**+30% tokens and +50% wall time** over the Pocock arm, for an identical
scorecard.

## What the measures could not see

Three things the scorecard misses, recorded because leaving them out would
flatter the conclusion:

**1. Superpowers caught a false red.** Its first red test in vitest failed only
because `node_modules` was missing — an environment failure wearing a passing
test's clothes. The TDD skill made it notice, install, and redo the red
properly. No other arm reported checking. This is the session's own recurring
defect in miniature: *a test that fails for the wrong reason looks exactly like
a test that works*, and only one arm looked.

**2. Pocock's suite is better pinned, by accident.** Control and superpowers
both introduced a `LedgerError` symbol, so reverting the source yields an import
error rather than a behavioural failure. Nothing in the process produced that
difference; it falls out of a design choice neither arm reasoned about.

**3. All three expanded scope the same way.** Every arm authored ledger
*content* — claims, support levels, prose — that nobody asked for, because
`claims-3` was empty and "work end to end" cannot be demonstrated without
claims. All three flagged it for second-guessing, which is the right instinct.
It is a prompt-design fault of mine, not a difference between the systems, and
it means none of these branches can be merged without the author reviewing
claims written by a machine.

## What both rounds say together

| | round 1 (9-line fix) | round 2 (16-file change) |
|---|---|---|
| ceremony recorded | zero, all arms | spec + plan, superpowers only |
| control's result | M1, M2 pass; **M3 fail** | **all measures pass** |
| discriminator | M3, bought by one habit | **none** |
| most expensive | superpowers | superpowers |

Round 1's limit was that a small diagnosis-shaped task flatters lightweight
approaches, and that a change with real interface decisions might invert the
ranking. **It did not invert.** On the larger task the control closed its one
gap — it wrote tests unprompted, because a 16-file change makes the absence of
them obvious in a way nine lines does not.

So across two tasks, one repo and one model: **the process never produced a
quality difference the measures could detect.** It produced a cost difference
both times, in the same direction.

## What this means for D1

Round 1 recommended narrowing the book. Round 2 strengthens that, and sharpens
what Chapter 12 can honestly claim:

> Across two measured changes — one a nine-line fix, one spanning sixteen files
> and two published books — adding process did not change the outcome. It
> changed the cost. The one habit that mattered on the small task was writing
> the failing test first; on the large task the size of the change supplied
> that pressure by itself. What ceremony bought was not in the result but in
> the *verification*: the only arm that noticed its red test was a false red
> was the one following a skill that told it to look.

That last clause is the honest qualification, and it is not a small one. The
measures reward a correct result; they cannot reward knowing *why* you believe
the result is correct. A book that quotes the scorecard without it would be
making the same error this repository keeps making.

## Limits (unchanged, and now firmer)

- **n = 2.** Two tasks, one repo, one model. Worked examples, not a study.
- Both tasks were **repairs with a knowable right answer**. Neither was a
  greenfield design where a plan's value is a different argument entirely.
- **Spec Kit, OpenSpec and Elephant-Goldfish were still not run.** Nothing here
  says anything about them, and the recommendation to narrow the book rests on
  that absence, not on a verdict about those tools.
- The control arm is not "no method" — it is a capable model with strong
  defaults. The finding is about *added* process on top of that, not about
  working without any discipline at all.
