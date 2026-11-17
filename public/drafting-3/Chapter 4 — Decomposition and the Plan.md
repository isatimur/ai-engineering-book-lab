# Chapter 4 — Decomposition and the Plan


A specification says what should be true when the work is done. It does not say in what order to make it true, how small each step should be, or how you will know a step finished correctly. That is a different document, and treating the two as one is how teams end up with a beautiful specification and an agent flailing against it.

This chapter is about the plan: what it compresses, why its size is a technical constraint rather than a matter of taste, and why it is the cheapest place in the whole pipeline to catch a mistake.

## Planning is compression

Dex Horthy of HumanLayer builds his team's process around a three-phase loop — research, then plan, then implement — and is precise about what each phase is doing. "Planning is leverage," he says, and the plan itself is "compression of intent" (Dex Horthy, HumanLayer).

The research phase comes first because the agent does not know the system. Horthy's image for this is a man with no memory reading his own tattoos to work out who he is. His conclusion is blunt: "If you don't onboard your agents, they will make stuff up" (Dex Horthy, HumanLayer).

What research produces is not documentation. It is a snapshot of the parts of the codebase that bear on this problem — the exact files and line numbers that matter — written down so the next context window starts informed instead of searching. Horthy is sceptical of maintaining large standing documentation for this purpose, for a reason worth repeating: asked what the y-axis of his chart measured across code, function names, comments, and documentation, the answer was the amount of lies you can find in each. Prose drifts from the code it describes. Research generated on demand, against the current tree, does not have time to.

## Why the unit size is a context problem

The reason plans must be decomposed is not neatness. It is that the thing executing them degrades as its context fills.

Horthy cites Geoffrey Huntley's work on coding agents for the governing rule: "the more you use the context window, the worse outcomes you'll get" (Geoffrey Huntley, cited by Dex Horthy, HumanLayer). He calls the region past roughly forty percent of the window the dumb zone, and notes the number varies with the task. Load enough tooling into an agent and it begins every task already inside that region.

This reframes several practices that otherwise look like style. Subagents, for instance, are widely used to simulate a team — a frontend one, a backend one, a QA one. Horthy's objection is mechanical: they "are not for anthropomorphizing roles. They are for controlling context" (Dex Horthy, HumanLayer). A subagent is a fresh window you can send to read widely and return a short answer, so the parent never pays for the search. Used that way it buys capacity. Used as a cast of characters it buys nothing.

The same logic sets the size of a planned step. A step should be small enough to finish inside the good part of a context window, with its verification, and no smaller. That is an engineering constraint with a measurable failure mode, not a preference.

## A bad line in the plan is not one bad line

Here is the argument for spending human attention on plans rather than on diffs.

"A bad line of code is a bad line of code," Horthy says, and a bad part of a plan can be a hundred bad lines of code — while a mistake in research, a misunderstanding of how the system works and where things live, sends the model off in the wrong direction entirely (Dex Horthy, HumanLayer).

The errors multiply as you move upstream. This is the clearest reason the review effort should move with them. A team reviewing only the diff is inspecting the cheapest artifact in the chain, after the expensive mistakes have already been amplified into it.

Horthy reports what this buys in practice. He describes sitting down for about seven hours on a Saturday and shipping some 35,000 lines to a large Rust codebase, work the maintainer estimated at one to two weeks (Dex Horthy, HumanLayer). He also reports the other kind of result: an attempt to remove Hadoop dependencies from Parquet Java that did not go well, where the team eventually discarded the research and the plans and went back to a whiteboard to work out how the pieces actually fit. Both outcomes come from the same process. The honest version of this claim is that the method raises the ceiling on what you can attempt, not that it removes the possibility of being wrong.

## The plan is the review surface

There is a second use for the plan that teams discover late, and it matters more as volume rises.

Horthy asks what code review is for and answers: mental alignment. Correctness matters, but the deeper purpose is keeping the team on the same page about how the codebase is changing and why. His admission about scale is the useful part — he can read a thousand lines of Go a week, technically, and does not want to. What he can do is read the plans, keep up to date, catch problems early, and maintain an understanding of how the system is evolving (Dex Horthy, HumanLayer).

This is the same concern Chapter 1 reached through Geoffrey Litt, arriving from the other direction. Litt argued that understanding is what you carry between loops. Horthy's point is that at three times the output, the diff stops being a viable place to acquire it, and the plan becomes the artifact a technical lead can actually hold in their head.

Kieran Klaassen of Every describes the extreme version of this working: a single engineer running a product, with the leverage coming from compounded knowledge and loops that get faster as they accumulate (Kieran Klaassen, Every). That only holds while somebody still understands the system well enough to direct it.

## The thing no plan can do

Horthy's warning is the one to keep from this chapter: "AI cannot replace thinking. It can only amplify the thinking you have done or the lack of thinking you have done" (Dex Horthy, HumanLayer).

He is specific about where this goes wrong, and it is not laziness. It is tooling that produces impressive volume. "Watch out for tools that just spew out a bunch of markdown files just to make you feel good" (Dex Horthy, HumanLayer). A directory of generated documents is evidence that generation happened. It is not evidence that anyone decided anything, and it is more convincing than silence. His conclusion — "There is no perfect prompt. There is no silver bullet" (Dex Horthy, HumanLayer) — closes the escape route where a sufficiently good template removes the need to read.

So the process has a load-bearing human step, and it is reading the plan before it runs.

## How much of this a change deserves

Horthy does not argue that every change needs the full pipeline, and the sliding scale he offers is the most practically useful thing in the talk. Changing a button's colour: talk to the agent. A small feature: a simple plan. A medium feature across several repositories: research first, then a plan. The harder the problem, the more context engineering it repays.

Asked how to know how much to apply, his answer is that it takes repetitions and you will get it wrong — too much sometimes, too little others — and that picking one tool and accumulating reps beats optimising across many.

This is the question the final chapter of this book returns to, and it is worth noticing now that the most process-heavy voice in this chapter refuses to prescribe a fixed amount.

## A note on the phrase

One honest aside, because it affects how the rest of this book is written.

Horthy argues the term *spec-driven development* has broken — not the idea, the phrase. He invokes Martin Fowler's semantic diffusion: a good term with a clear definition gets popular, comes to mean a hundred things to a hundred people, and stops carrying information. He lists what people currently mean by it: a more detailed prompt, a product requirements document, verifiable feedback loops, treating code as assembly, or simply having markdown files open while coding (Dex Horthy, HumanLayer).

That is why this book argues at the level of lifecycle stages rather than branded methods. The stages mean the same thing to everyone. The labels increasingly do not.

## What follows

A plan that has been read and agreed is an instruction set. Chapter 5 is about what happens when something executes it — where the specification actually binds, what an agent does when the plan turns out to be wrong at step six, and who is allowed to decide that.
