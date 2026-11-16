# Bake-off round 2 — a change big enough to need a plan

- **date:** 2026-11-16
- **round 1:** `research_passes/2026-11-16-sdd-bakeoff-results.md`
- **status:** design, before any run. Measures fixed in advance, as in round 1.

## Why a second round

Round 1's finding was that ceremony bought nothing: all three arms passed M1
and M2 in under a minute, artifacts-before-code was **zero in every arm**, and
the only discriminator (M3) was bought by one habit at roughly no cost.

But round 1 named its own limit before running, and that limit is the whole
reason for round 2:

> The task suits diagnosis-first work. A nine-line fix whose difficulty is all
> in the diagnosis flatters lightweight approaches. A change spanning six files
> with real interface decisions would plausibly invert the ranking, and nothing
> here tests that.

A book that recommended a pipeline on round 1's evidence would be selling
something its own measurement does not support. A book that recommended
*against* one on round 1 alone would be doing the same thing in the other
direction. Round 2 is the test that can distinguish them.

## The task

Make book 3's evidence work end to end.

`99_Meta/scripts/anchor/build_evidence.py` parses Source Anchors only — video
id, timestamp, confidence, quote. Book 3's ledger holds **Artifact anchors**
(ADR-0003): `kind` / `ref` / `date` / `excerpt`, with no video, no timestamp
and no confidence. So the script emits `{}` for book 3 and the reader has no
evidence rail. This is silent-zero #3 from the book-3 work, deliberately
deferred and still open.

It qualifies as plan-shaped where round 1's task did not:

- **It spans files.** The parser, the evidence row shape, `EvidenceRail.tsx`
  (which renders video ids and timestamps), `ThirdBookReader.tsx` (no rail at
  all), and tests.
- **It has a real interface decision at its centre**: two structurally
  different anchor kinds have to share one evidence row, or the row shape has
  to change, or the rail has to branch. Each choice has consequences for the
  five existing consumers of `evidence.json`. That is precisely the kind of
  decision a plan exists to make before code is written.
- **It can regress two shipped books.** `evidence.json` and `evidence-2.json`
  feed live pages, so a careless change breaks books 1 and 2.
- **It is still objectively checkable.**
- **I have not written it**, so no answer leaks through the prompts.

## The prompt (identical for every arm)

> Book 3's claims ledger uses Artifact anchors — see
> `docs/adr/0003-artifact-anchors.md`. `build_evidence.py` produces an empty
> evidence file for book 3, so the book has no evidence rail on the site. Make
> book 3's evidence work end to end.

States the goal and points at the vocabulary. Says nothing about how to shape
the row, whether to reuse the existing parser, or what to do with the rail.

## Measures

| # | measure | how |
|---|---|---|
| **M1** | **Works** | Seed `claims-3` with one claim carrying an artifact anchor. `evidence-3.json` must contain a row for it. |
| **M2** | **No regression** | Re-run book 1 and book 2 evidence. `evidence.json` and `evidence-2.json` must be **byte-identical** to what is committed. |
| **M3** | **Pinned** | Revert the source change, keep the tests: a test must go red. |
| **M7** | **One schema, one reader** | Does it reuse `parse_anchors` from `scripts/verify_artifact_anchors.py`, or write a **third** parser for the same grammar? Checked by import and by grep. |
| **M4** | **Ceremony** | Files and words written before the first source edit. Round 1 recorded zero for every arm; this task is where it should fire if it ever does. |
| **M5** | **Cost** | Tool calls, tokens, wall time. |

**M7 is round 2's point.** This repo has been bitten three times by a second
reader of one grammar — `count_anchors`, `count_artifact_anchors`, and the
verifier's own near-miss. The question is whether a process notices that the
parser already exists, or whether it writes another one. That is an interface
decision, invisible to M1–M3, and exactly what ceremony claims to buy.

## Arms

Control (no process), superpowers, Pocock's skills. Same model, fresh worktree
each, baseline verified before dispatch — identical to round 1 so the two
rounds can be compared.

## Limits, named before running

- Still n = 1 and one model. Two worked examples, not a study.
- **The task now favours thoroughness**, where round 1 favoured speed. That is
  deliberate — it is the other side of the same question — but it means neither
  round alone says anything general, and the writeup must hold both.
- `EvidenceRail.tsx` has five existing consumers. An arm that breaks one fails
  M2 for a reason that is about this repo's coupling, not about the process.

## What would change the recommendation

If ceremony fires here and buys M7 or M2 where the control fails them, round
1's "narrow it" recommendation softens: the book could then say *when* a
pipeline pays, with two measurements marking the boundary. If the control
matches the process arms again on a task this size, that is a much stronger
result than round 1 alone, and Chapter 12 can say so plainly.
