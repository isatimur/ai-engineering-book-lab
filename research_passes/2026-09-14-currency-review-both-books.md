# Research Pass — 2026-09-14 — Currency review of every time-bound quote in both books

A time-bound quote is evidence with a shelf life: a number, a "right now", a "no one is doing
this yet", a prediction. It is not a defect. The speaker said it, the anchor resolves, and the
book may legitimately want the quote as a marker of when something was still new. The only
question is whether a reader today would be misled by it standing unqualified.

Twenty-one such quotes were flagged across the two ledgers. One was triaged. This pass closed
the rest.

**Book 1: 12 of 12 reviewed. Book 2: 7 of 7.** (Book 1's count fell from 14 because one
replaced anchor is no longer time-bound.)

## Result: zero decays

Not one quote's assertion had stopped being true. That matches the [2026-09-04
pass](2026-09-04-claim-staleness-review.md) — 30 claims, five reviewers, two decays — and it is
the expected outcome. **Topic overlap is almost never staleness.** A newer talk on the same
subject usually confirms, extends, or argues a different bet; only reading tells you which.

The value of the pass was not in finding rot. It was in four other things.

## 1. Stale advice, not stale evidence

Book 1's `claims#57` says input tokens dominate agent cost. The quotes hold — nothing in the
corpus revises the split, and a 2026-08-28 talk independently reports the token ratio is
*"massive oftentimes over a 100 ratio and even higher"*.

But the entry *prescribed* "compress" and "summarize tool results" as the levers, and its
printable Reusable phrasing ended "cache and compress". A 2026-08-20 workshop ran a 36-turn,
1.78M-token comparison and found the opposite: full history beat compaction on cost, latency
**and** recall, because 97% of its tokens were cached and compaction breaks the cache. *"the
cheapest run is actually the one which is sending the most tokens."* Their takeaway: *"do not
compact by default."*

Caching compresses the input-dominance margin without flipping it — at a 100:1 ratio with a 90%
hit rate, input is still most of the bill — so the claim survives and the prescription does not.
This produced a new marking convention, `**Prescription superseded**`, and the printable
phrasing no longer says "compress".

Scope, stated in the mark: one team's AI-tutor workload, and they say so. It is a counter-result
to compacting *by default*, not a law.

## 2. Truncation that manufactured a prediction

`claims#16` was anchored on *"you'll be able to assemble agent teams that can complete tasks
orders of magnitude harder than what you can complete with a single agent today."* That is what
made a currency reviewer flag it as a forward-looking prediction.

It is not a prediction. The anchor begins at "you'll"; the words immediately before it are *"my
name is Luke and my goal is that 20 minutes from now"*. It is a talk-agenda promise, and the
truncation is what made it read as an industry forecast.

Worse, **this ledger had already found that**. On 2026-09-04 the same quote was struck from
`claims#11` and explicitly described there as "the talk's 19-second opening promise". It was
removed from one entry and left standing in another — the second time the copied-defect pattern
has surfaced, after one audience question reached two entries. Replaced with the passage where
the speaker measures throughput against coherence, which is the claim's actual proposition.

**Generalisable:** an anchor that starts mid-sentence can invent a claim the speaker did not
make. Check the words immediately before an anchor, not only the words inside it.

## 3. Figures that must never be printed bare

Three numbers survive scrutiny but cannot stand alone.

The **49%** MCP figure is disclaimed by its own speaker on both sides — *"you don't need to worry
too much about the specifics. This is dated now."* before, *"it's it's it's a moving target"*
after — and superseded inside his own talk by a later grouping pass. The tape says *"like about
49%"*; the hedge sits just outside the anchor, so the figure reads more precise than he made it.
`claims#17`'s anchor also ended where "initial" *starts*, cutting "load" mid-phrase.

Book 2's **40%** is worse: it is quoted as though it were the benchmark result. The headline in
the same talk is *"an average speed up of about 25% or 24%"* across 250 problems, explicitly
preliminary. The 40% is one kernel fusion; a second example hit 80%.

Book 2's **70%** moves between talks. The same speaker gives it two months later for gradient
checkpointing — a generic technique with a stated 10–15% slowdown — not for the proprietary
kernels the anchored quote implies, and says 80% elsewhere.

## 4. A caveat that got the opposite of what it asked for

Book 2's `claims#14` says perceived stagnation is a training-budget story, not a ceiling, and its
caveat asked for a corroborating source on budget versus capability.

The premise survives every sweep — the strongest architecture-churn hit in the corpus actually
confirms it (*"it's an old transformer. Okay. Plus RMS lay plus some extra tricks"*). But the
*resolution* now has two newer named sources against it: Hooker's *"we are probably at the
ceiling of size"* and *"no one is going to supersize their model"*, and Han's *"scaling
intelligence in terms of parameters probably has plateaued most likely"*. The caveat now names
them and calls the question contested.

Patel's "today" also dates itself: he pins it to Claude 3.5 Sonnet and adds *"we haven't seen a
extremely large Model come out yet and and but we will soon"* — an unfulfilled prediction two
years before the reader's present.

## The convention that made the pass converge

The checker understood only `**Superseded**`. So a review that correctly concluded "nothing
overtakes this" left no trace, and the next pass would re-read the same quotes for the same
answer. Book 1's `claims#35` had in fact been marked `**Newer edition**` on 2026-09-04 and was
*still* being listed as outstanding ten days later, because the tool did not know that
convention either.

A checklist that never shrinks stops being read. There are now four verdicts, all counted:

* `**Superseded**` — the quote's assertion has stopped being true
* `**Newer edition**` — the quote stands; a later edition of the source exists
* `**Prescription superseded**` — the quote stands; the advice built on it does not
* `**Currency checked**` — reviewed against newer corpus, nothing overtakes it

The last is the one that makes the pass cumulative. Sixteen of the twenty-one marks are that
verdict, each carrying the negative evidence behind it — which terms were swept, over what
scope, and what came back. Example, for the multi-agent claim: three independent sweeps at
widening scope, ending with all 1,074 transcripts, for reversal language (`don't build
multi-agent`, `single agent is better`, `multi-agent is a trap`) — **zero hits at every scope**.
Nobody needs to run that again.

## What this does not close

Neither book's prose was changed by this pass; the 49% and the agent-teams quote were checked
against every chapter and appear in none of them. The `claims#57` prescription *is* echoed in
chapter 5's assembly advice, which is a prose question left open here deliberately — the ledger
now records the counter-result, and whether the chapter's advice should change is an editorial
call, not a mechanical one.

Nor does one review make a quote permanently safe. These verdicts are dated. The corpus keeps
growing, and a mark is a record of what was true against a known cutoff, not a guarantee.
