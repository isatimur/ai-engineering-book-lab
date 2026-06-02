# Chapter 2 Draft v0 — Taste Still Matters When Code Gets Cheap

## Draft note
Drafting pass from Outlined to Drafting status (opening pair + closer batch, with Ch 1 and Ch 10). Built on Chapter Packet v1 (`05_Book_Ideas/Chapter Packets v1/02_Taste_Still_Matters_When_Code_Gets_Cheap.md`). Source cluster of 8 videos. 3 new ledger claims registered (#40 cheap generation raises the value of taste; #41 vibe coding is an exploration mode that fails as a production default; #42 framing + review become the scarce skills). Anchoring queued for the next source-anchoring pass — no `**Anchor:**` bullets in this commit.

The argument arc:
1. Cheap output is not cheap judgment — abundance promotes taste.
2. The arithmetic: generation cheaper, bad decisions not cheaper, therefore taste matters more.
3. What "taste" means here — discriminative capacity, not aesthetics.
4. Vibe coding: powerful for discovery, dangerous as a production default — a mode switch.
5. The friction that was load-bearing — some pauses are where judgment happens.
6. The new scarce skills: problem framing and review-as-anti-slop.
7. Bridge to Chapter 3 — externalize judgment into harnesses.

---

# Chapter 2 — Taste Still Matters When Code Gets Cheap

Cheap code is easy to misread. When a model can generate a feature, a test suite, and the glue between them in the time it takes to describe them, the obvious conclusion is that engineering itself has gotten cheap. Part of it has. Routine production — the typing, the boilerplate, the third CRUD endpoint that looks like the first two — is easier than it was.

But cheap output is not the same as cheap judgment, and the gap between those two is the subject of this chapter. If Chapter 1 argued that the real shift is from suggestion to delegated work, the immediate human question is what remains scarce once the output is abundant. The answer is taste — and abundance does not retire taste. It promotes it.

## The argument in three lines

The chapter's claim is almost arithmetic:

- Generation is getting cheaper.
- Bad decisions are not getting cheaper.
- Therefore taste, standards, and review matter *more*, not less.

A machine can accelerate production without removing the need for discrimination. In fact it sharpens that need, because it widens the gap between what can be produced and what should be. When a team could only build a little, the act of building was itself a filter — you thought hard about what was worth the effort. Remove the cost of building and you remove the filter. Something has to replace it, and that something is judgment.

Matt Pocock, whose work on software fundamentals runs directly counter to the automation-triumphalist mood, states the consequence bluntly: "Software fundamentals matter now more than they actually ever have." That sounds paradoxical until you see the mechanism. Fundamentals are how you tell good output from convincing output, and a world flooded with convincing output needs that skill more, not less. The model raised the volume of plausible work. It did not raise anyone's ability to evaluate it — that still has to come from a person who knows what good looks like.

## What "taste" actually means here

Taste, in this chapter, is not aesthetics or personal preference. It is a specific discriminative capacity: the ability to notice the difference between things that look the same on the surface and are not the same underneath.

Between output that merely works and output that actually fits the system it lives in. Between a fast prototype and a maintainable design. Between a plausible draft and a trustworthy one. Between local correctness — this function is right — and broader coherence — this function belongs here, in this shape, for this reason.

Those distinctions were always part of senior engineering judgment. What changes under AI is that they become the *binding* skill rather than a background one, because the system can now produce more than a human can casually validate. When a person wrote every line, reviewing it was partly automatic — you understood it because you made it. When a model writes it, that understanding has to be supplied deliberately, by someone who can look at fluent, working output and still ask whether it is the right output. Tuomas Artman, reflecting with Gergely Orosz on craft at Linear, frames the open question precisely: "What happens when agents are capable of doing everything immediately for you?" The answer this chapter gives is that the scarce contribution moves from *making* to *discerning*.

## Vibe coding: powerful, and dangerous in the same breath

The clearest live example of the taste problem is the practice that has come to be called vibe coding — building by rapid, loosely-specified prompting, steering on feel rather than on a plan. The corpus is split on it, and the split is instructive rather than confused.

Vibe coding is excellent for exploration. For rough prototypes, interface sketches, internal tools, one-off automation, and the early work of figuring out what is even worth building, it is a remarkable accelerant. Steering on feel is the right mode when the goal is discovery, because in discovery you do not yet know enough to specify, and premature rigor would just slow the learning.

It becomes dangerous at one specific moment: when an exploratory mode quietly hardens into a production philosophy. The problem is not speed. The problem is shipping output that no one fully understands, can maintain, or can confidently review — output that works today and becomes a liability the first time it has to change. swyx captures the reaction this provokes among engineers who have to live with the aftermath: "I'm declaring war on slop today." Slop is the precise failure mode here — work that looks finished and transfers its real cost downstream to whoever has to understand it next.

So the right conclusion is not "never vibe code." It is a mode switch: use vibe coding when the goal is discovery, and change modes the moment the output has to endure. The skill is not picking a side. It is knowing which mode you are in, and noticing when you have drifted from one into the other without deciding to.

## The friction that was load-bearing

AI removes a great deal of wasteful friction, and that is good. Nobody should mourn the boilerplate. But not all friction is waste, and the dangerous move is to treat every pause as inefficiency to be optimized away.

Some friction is where judgment was happening. The review before the merge. The extra question about whether the architecture can carry this. The refusal to accept a generic draft that technically satisfies the request. The decision to rewrite something correct-but-wrong — code that passes every test and still encodes the wrong model of the problem. Those pauses look like drag on a velocity dashboard. They are often the exact points where quality was being created, and removing them does not make the work faster so much as make the absence of judgment invisible until later.

This is the trap that makes cheap execution treacherous rather than simply beneficial: a badly framed task handed to a strong model wastes more time than it used to, because the system will sprint confidently in the wrong direction and produce a great deal of polished output before anyone notices it was the wrong direction. Speed without judgment is not neutral. It manufactures expensive mistakes efficiently.

## The new scarce skills: framing and review

Two specific capacities become the bottleneck once execution is cheap, and both are worth naming as deliberately as the technical disciplines later in the book.

The first is problem framing. When the model will faithfully execute whatever it is pointed at, pointing it becomes the high-leverage act. What is the actual task? What counts as success? Which constraints are real and which are habit? What is allowed to stay rough? What would make the result unacceptable even if it looked finished? A team that can answer those questions sharply gets a force multiplier; a team that cannot gets fluent output aimed at the wrong target. Framing is no longer the cheap part of the work before the real work starts. In a world of cheap execution, framing *is* the work.

The second is review as anti-slop discipline. Review stops being a bureaucratic gate and becomes the place where standards are actively defended against the pressure of fast, plausible output. This is the same argument the book will make about evals in Chapter 4 — that measurement is a control system, not a chore — arriving here first in its human form. Cheap output that creates expensive cleanup was never actually cheap; review is where a team refuses to let that hidden cost through. In an AI-native team, the reviewer is not slowing the work down. They are the reason the work can be trusted to go fast.

## The bridge: from judgment to harness

Once judgment becomes the scarce input, an obvious question follows, and it is the question that opens the technical core of the book: how do you encode that judgment so machines can work inside it?

Because taste cannot stay locked in a senior engineer's head, surfacing only at review time to reject what the model already spent effort building. That does not scale, and it wastes the very speed the model offered. The judgment has to be externalized — pushed *upstream* into the environment the agent works in, so the standards shape the output as it is produced rather than catching it afterward. Into harnesses, specs, repository structure, validation rules, and review systems. That externalization is exactly what Chapter 3 is about, and it is why this chapter sits where it does: the harness only makes sense once you accept that there is judgment worth encoding into it.

So when code gets cheaper, the real question was never whether humans matter less. It is which human contribution becomes scarce — and the answer is judgment under abundance: knowing what should be built, what standards apply, which tradeoffs are acceptable, and which seductive, working, plausible output needs to be rejected anyway. That is what taste means here. That is why it still matters. And that is why the rest of this book is, in a sense, an extended answer to the question of how to give judgment somewhere durable to live.
