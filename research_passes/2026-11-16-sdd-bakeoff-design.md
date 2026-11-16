# Bake-off design — how much process does a change actually need?

- **date:** 2026-11-16
- **answers:** D1 in `docs/superpowers/specs/2026-11-15-third-book-design.md`
- **status:** design, before any run. Written first so the measures cannot be
  chosen after seeing the results.

## The question

Book 3's spine is that five systems disagree about **how much must be written
down, and checked by whom, before an agent may touch code**. The corpus cannot
settle it: Spec Kit 0 talks, Elephant-Goldfish 0, OpenSpec 2 passing mentions.
So the evidence has to be made rather than found.

## The task

One real, open defect in this repo, chosen before any system was run.

`scripts/check_claims_integrity.py:122` assigns `rc2` from
`verify_prose_quotes.py` and never reads it. Only the ledger check sets
`anchor_fail`. So a **crash** in the prose checker cannot fail the run.

It qualifies because:

- **It is real and unfixed.** Found during the book-3 work, deliberately
  deferred, still open on `main`.
- **I have not written the fix**, so no answer leaks through the prompts.
- **It needs diagnosis, not just typing.** The prompt will not name the
  mechanism.
- **It is objectively checkable** — inject a crashing sub-check and look at the
  exit code.
- **The winner's output is useful**, so the spend buys a fix as well as a
  measurement.

## The prompt (identical for every arm)

> `scripts/check_claims_integrity.py` reports success even when one of the
> checks it runs crashes. Fix that.

No mechanism, no file line, no mention of `rc2`, no hint that a test is wanted.
What each system *adds* to this bare prompt is the thing being measured.

## Measures

Objective, decided now:

| # | measure | how |
|---|---|---|
| **M1** | **Does it work?** | Replace `verify_prose_quotes.py` with a script that exits 1 printing a traceback. The run must exit non-zero. Binary. |
| **M2** | **Does it over-fire?** | On an unmodified repo the run must still exit 0. Binary. Catches "always return 1", which passes M1 and is worthless. |
| **M3** | **Is it pinned?** | Revert the fix. If a test goes red, pinned. Mutation-tested, binary. |
| **M4** | **Ceremony** | Files and words written before the first edit to a `.py` file. |
| **M5** | **Cost** | Tool calls and tokens. |
| **M6** | **Did it see further?** | Unprompted, did it notice the same class elsewhere? (`build_evidence.py` emits `{}` for artifact anchors; `verify_ledger.py` fails every anchor when transcripts are absent.) Recorded as a quote, judged after. |

M1–M3 together are the point. M1 alone rewards a change that makes the gate
fire on everything; M2 alone rewards doing nothing. A fix needs both, and M3
asks whether it will survive the next person.

## Arms

Run in this order, cheapest first:

1. **Control — no process.** The bare prompt, nothing else. If the control
   scores M1–M3, the ceremony question largely answers itself and every other
   arm has to beat *this*, not beat zero.
2. **superpowers** — brainstorm → design → plan → TDD, with its hard gate.
3. **Pocock's skills** — no pipeline; the relevant single-purpose skill.

Then, only if the harness proves sound:

4. **GitHub Spec Kit** (`uvx`), 5. **OpenSpec** (`npx`), 6. **Elephant-Goldfish**.

## Validity threats, named before running

- **I am driving the tools.** A poor result may measure my driving rather than
  the tool. Worst for the three the Lab has never run. This is why they come
  last and why the writeup must separate "the tool did badly" from "I drove it
  badly".
- **n = 1.** One task, one repo, one model. This is a worked example, not a
  study. The writeup must not generalise past it.
- **The task suits diagnosis-first processes.** A defect whose fix is three
  lines but whose *diagnosis* is the work will flatter systems that front-load
  thinking. Stated now rather than discovered as a conclusion.
- **Same-model confound.** Every arm runs the same model, so differences are
  the process, not the engine — which is the intended control, but it means
  nothing here transfers to a different model.

## What would change the recommendation

If the control scores M1–M3 at a fraction of the cost, D1's honest answer is
"narrow it" — argue the two systems the Lab runs and treat the rest as
reported positions. If the control fails M2 or M3 while a process arm passes,
the ceremony is buying something nameable and the bake-off is worth extending
to all five.
