# Bake-off results — three arms, one real defect

- **date:** 2026-11-16
- **design:** `research_passes/2026-11-16-sdd-bakeoff-design.md`, written and
  committed **before** any arm ran, so the measures could not be chosen after
  seeing the outcomes.
- **answers:** D1 in `docs/superpowers/specs/2026-11-15-third-book-design.md`
- **harness:** `scripts/bakeoff_score.py`

## The task

One real, open defect: `scripts/check_claims_integrity.py` assigned `rc2` from
`verify_prose_quotes.py` and never read it, so a **crash** in that sub-check
could not fail the run.

Every arm got the identical prompt, naming no mechanism, no file line, no
`rc2`, and no hint that a test was wanted:

> `scripts/check_claims_integrity.py` reports success even when one of the
> checks it runs crashes. Fix that.

Same model for every arm. Fresh worktree each, verified against the baseline
before dispatch.

## Results

| arm | M1 works | M2 no over-fire | M3 pinned | src lines | tests | tool calls | tokens | wall |
|---|---|---|---|---|---|---|---|---|
| **control** (no process) | PASS | PASS | **FAIL** | 9 | 0 | 12 | 52.5k | **46s** |
| **superpowers** | PASS | PASS | **PASS** | 25 | 8 | 21 | 74.1k | 133s |
| **Pocock's skills** | PASS | PASS | **PASS** | 9 | 3 | **13** | **58.6k** | **47s** |

Baseline before any arm: M1 **FAIL** (exit 0), M2 PASS. The defect was real and
the harness detected it.

M3 was mutation-tested, not asserted: revert the source hunk, keep the tests,
re-run. Superpowers 5 of 8 red; Pocock 1 of 3 red; control had no tests at all.

## What the numbers say

**1. Diagnosis was not the hard part.** All three found `rc2` unaided from a
prompt that named nothing. Two independently noticed the same subtlety — the
wrapper passes no `--max-unmatched`, so the prose check exits non-zero *only*
on a crash, which is why their fixes do not over-fire. Nobody needed a process
to find the bug.

**2. M1 and M2 were won by everyone, in under a minute.** The fix is nine
lines. Any arm that had stopped at "does it work" would have ranked all three
equal and concluded process buys nothing.

**3. M3 is the only discriminator — and a pipeline is not what buys it.**
Pocock's arm reached M3 for **+1 tool call, +6k tokens and +1.5 seconds** over
the control, by invoking exactly one skill (`diagnosing-bugs`) and declining
the other it was offered. Its own account: the skill "made me write a test that
asserts the actual symptom (exit 0 after a crash) and watch it fail before
fixing."

**4. Superpowers declined its own ceremony.** It skipped writing a plan file,
judged the change too small, and reported that brainstorming "added little
here". Artifacts-before-code was **zero** for all three arms. The ceremony
measure never fired, because the system with the most ceremony chose not to
use it.

So the thing that moved M3 was not a pipeline, a spec, or a gate. It was one
habit: **write the test that asserts the symptom, and watch it fail first.**

## Where superpowers bought something real

Cheaper is not the same as equal, and M1–M3 do not measure thoroughness.
Superpowers produced 25 source lines to Pocock's 9, and 8 tests to 3, because
it fixed a second defect nobody asked about: a crash in the *anchor* verifiers
was indistinguishable from a legitimately failed anchor, since both set the
same flag. It introduced an exit-code taxonomy — **2 for a crash, 1 for a real
failure, 0 for clean** — so "the check is broken" and "the check found
something" stopped sharing a signal.

That distinction is the same one this repo's own `verify_artifact_anchors.py`
makes between `unverifiable` and `failed`. Pocock's arm did not find it. The
control did not find it.

**verification-before-completion** is what produced it: that skill pushed the
arm to inject a real crash through `main()` rather than trust its mocks, and
the broader defect surfaced there.

## Honest limits

Named in the design before running, and all still apply:

- **n = 1.** One defect, one repo, one model. A worked example, not a study.
- **The task suits diagnosis-first work.** A nine-line fix whose difficulty is
  all in the diagnosis flatters lightweight approaches. A change spanning six
  files with real interface decisions would plausibly invert the ranking, and
  nothing here tests that.
- **Same model throughout**, so differences are the process and not the engine
   — the intended control, but nothing transfers to another model.
- **Three arms, not five.** Spec Kit, OpenSpec and Elephant-Goldfish were not
  run. The Lab has never used them, so a poor score would have measured the
  driving rather than the tool.

## What this means for D1

The spec offered three ways out. The measurement points at the third.

**Narrow it.** The book should argue the two systems the Lab actually runs, and
treat Spec Kit, OpenSpec and Elephant-Goldfish as reported positions rather
than compared ones. Not because they are bad — this says nothing about them —
but because the Lab has no evidence about them and now has real evidence about
the alternative.

And the honest headline for Chapter 12 is not "use this pipeline". It is:

> On a small, diagnosis-shaped change, the ceremony bought nothing that the
> bare prompt did not already get. One habit bought the only thing that
> separated the arms, at roughly no cost. A second habit — verifying against
> the real thing instead of the mock — found a defect nobody asked about.

A book that recommended a pipeline on this evidence would be selling something
its own measurement does not support. The remaining question is whether that
holds for a change large enough to need a plan, and that is the bake-off worth
running next.
