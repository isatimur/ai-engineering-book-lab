# Chapter 12 — How Much Process, and How Far Out of the Loop


This is the question the book has deferred since Chapter 1, and it does not have a universal answer. What it has is a way of deciding, and some evidence that most of the confident answers are untested.

## Between free will and determinism

Angus McLean frames the territory usefully. His talk is called bounded autonomy, "between free will and determinism", and he notes the titles he considered and discarded: between automation and customization, between oversight and agency, between possibilities and constraints (Angus J. McLean, Oliver).

Those discarded titles are the chapter in miniature. Every one names the same trade-off from a different angle, and none of them resolves it, because the resolution depends on what the work is and what being wrong would cost.

What a process does, in every case, is trade optionality for predictability. That is a real purchase with a real price, and the question is only ever whether this particular change is worth paying it for.

## What happened when we measured it

The honest thing to admit about process advocacy — including everything in this book — is that it is almost entirely unmeasured. People report that a method helped. They rarely run the counterfactual.

This repository ran it, twice, and the results were not what the method's advocates would predict.

The design came first, before any arm ran: a real defect, chosen because the fix had not been written, so no answer could leak through the prompts. Three arms got an identical prompt that named no mechanism and no file — a control with no process at all, a full ceremonial pipeline, and a set of sharp single-purpose skills. Same model, fresh workspace each. The measures were written down and committed before anything ran, so they could not be chosen after seeing the results.

**Round one** was a nine-line fix. All three arms diagnosed the defect unaided, in under a minute. Diagnosis was not the hard part. The only measure that separated them was whether reverting the fix made a test go red — and the control, which shipped working code and no test, failed it.

What bought that discriminator was not a pipeline. It was one habit: write the test that asserts the symptom, and watch it fail first. It cost one extra tool call and about six thousand tokens. Meanwhile the ceremony measure — artifacts produced before code — recorded **zero in all three arms**, because the arm with the most process available judged the change too small and skipped its own planning step.

Round one's design named its own limit before running: a task whose difficulty is all diagnosis flatters lightweight approaches, and a change with real interface decisions might invert the ranking.

**Round two** was that change. Sixteen files, two published books at risk, and a new measure written specifically to catch what ceremony claims to buy: would the arm notice that a parser already existed, or write a third one? That is invisible to *does it work*, and this repository had been bitten by it three times.

It did not invert. All three arms passed every measure, including that one. The control, with no process at all, made the same interface decision as the arm that wrote a design document and a plan. Ceremony fired for the first time and cost roughly a third more tokens and half again the wall-clock time for an identical scorecard. On the larger task the control also closed round one's gap on its own, writing tests unprompted, because sixteen files make their absence obvious in a way nine lines do not.

## The result the scorecard could not see

One finding sits outside the measures, and it is the most interesting thing either round produced.

In round two, the ceremonial arm's first red test was a *false* red. It failed because a dependency was missing, not because the feature was absent. The skill it was following made it notice, install the dependency, and redo the red honestly.

No other arm reported checking.

A test that fails for the wrong reason looks exactly like a test that works. That is Chapter 6's entire argument, reproduced accidentally inside an experiment about process. The measures rewarded a correct result; they could not reward knowing *why* you believe it. Whatever process is worth, part of it is invisible to any scorecard you would design in advance — which is a reason to be humble about measurement, not a reason to skip it.

## What that evidence does and does not support

The limits, stated plainly: two rounds, one repository, one model, and both tasks were repairs with knowable right answers rather than open-ended construction. Three of the five systems this book set out to compare were never run at all, because this Lab has never used them and a poor score would have measured the driving rather than the tool.

What it does support is narrow and still useful. Ceremony's cost is real and measurable. Its benefit did not show up on tasks of this shape. And a single habit — write the failing test first, and confirm it failed for the reason you think — outperformed an entire pipeline at a fraction of the price.

## How to decide

Horthy's sliding scale from Chapter 4 remains the most practical rule available, and it is worth noting again that it comes from the most process-heavy voice in that chapter. Changing a button's colour: talk to the agent. A small feature: a simple plan. A medium feature across several repositories: research first, then a plan. The harder the problem, the more context engineering it repays. And when asked how to know, his answer is that it takes repetitions and you will get it wrong in both directions.

Three questions narrow it further, and they come from the chapters rather than from taste.

**What does being wrong cost, and is it reversible?** This is the only input that reliably justifies more process. Chapter 8's feature flags are the cheapest way to change the answer, because making a mistake reversible lowers the ceremony the decision needs.

**Is the specification contested, or merely unwritten?** Unwritten and agreed needs almost nothing. Contested needs Chapter 2 before it needs Chapter 3, and no template substitutes.

**Will anybody read the artifact?** An unread plan is pure cost — this is Horthy's warning about tools that produce markdown to make you feel good. If nobody will read it, do not write it; reduce the scope of the change instead.

## How far out of the loop

The autonomy question has a sharper answer than the process one, and Geoffrey Litt supplied it in Chapter 1.

If understanding exists only to catch errors, better models retire the need for it, and leaving the loop is a matter of waiting for accuracy. If understanding is what you carry between loops — the thing that lets you have the next idea — then leaving the loop costs you the next idea, and no model improvement refunds it.

That reframes the question from *can I trust it* to *what am I giving up by not looking*. The answer differs by change. Dependency bumps: go. CVE remediation across a thousand repositories, well-specified and mechanically verified: go, that is Chapter 5's genuine frontier. The part of the system you will need to reason about next quarter: stay, even when the agent is right, because being right is not the only thing you were there for.

Chapter 11's factory is a real destination for the first kind of work. The error is treating it as a destination for all of it.

## Where this leaves the argument

The bottleneck moved. Generation got cheap, and the constraint relocated into specification, verification, review, and release — then, underneath all of those, into the finite supply of human judgement and attention.

Most of this book is about not fooling yourself regarding where that constraint is: a gate that passes without checking, a judge that nearly doubles a score, thirty deployments that never happened, a queue mistaken for throughput, a factory metric that moves whether or not anything improves. The common shape is a signal that means less than it appears to, read by people with every reason to accept it.

The lifecycle has not caught up. That is not a complaint — it is where the work is, and why the stages in this book outlive the tools that currently occupy them.

And the one habit worth taking from all of it is small enough to start today: make the check fail on purpose, and find out whether it failed for the reason you assumed.
