# Chapter 2 — Taste Still Matters When Code Gets Cheap

## Chapter promise
As generation gets cheaper, the scarce human skill shifts toward judgment: framing, constraints, review, and the ability to tell good output from convincing slop.

## Opening frame
Cheap code is easy to misread.

When AI can generate features, drafts, tests, and glue work in seconds, it is tempting to conclude that engineering itself has become cheap. Some of it has. Routine production is genuinely easier.

But cheap output does not mean cheap judgment.

If anything, the opposite becomes true. The more abundant code and drafts become, the more important it is to know what should be built, what quality looks like, what constraints matter, and what should be thrown away.

## The core argument
This chapter makes a simple claim:

- generation is getting cheaper
- bad decisions are not getting cheaper
- therefore taste, standards, and review matter more

The machine can accelerate production. It cannot remove the need for discrimination.

## What “taste” means here
Taste is not just aesthetics or personal preference.

In this context, taste means the ability to notice the difference between:

- output that merely works and output that actually fits
- a fast prototype and a maintainable system
- a plausible draft and a trustworthy one
- local correctness and broader coherence

In an AI-heavy workflow, this matters because the system can produce more than a human can casually validate. Someone still has to know what good looks like.

## Why vibe coding is both useful and dangerous
Vibe coding is powerful for exploration.

It is great for:
- rough prototypes
- interface sketching
- internal tools
- one-off automation
- learning what is worth building

But it becomes risky when an exploratory mode quietly becomes a production philosophy.

The problem is not speed itself. The problem is shipping output that nobody fully understands, can maintain, or can confidently review. The app may work today and still become a mess tomorrow.

So the right conclusion is not “never vibe code.”

The right conclusion is:
- use vibe coding when the goal is discovery
- switch modes when the output has to endure

## The friction that still matters
AI removes a lot of wasteful friction, and that is good.

But some friction is actually where judgment happens:
- the review before merge
- the extra question about architecture
- the refusal to accept a generic draft
- the decision to rewrite something that is technically correct but structurally wrong

Those pauses are easy to label as inefficiency. Often they are exactly where quality gets created.

## The new scarce skill: problem framing
A badly framed task given to a strong model can waste more time than before, because the system can sprint in the wrong direction with impressive fluency.

That makes framing more valuable:
- what is the actual task?
- what counts as success?
- what constraints matter?
- what is allowed to stay rough?
- what would make the result unacceptable even if it looks finished?

In a world of cheap execution, good framing becomes a force multiplier.

## Review as anti-slop discipline
Cheap output that creates expensive cleanup is not actually cheap.

That is why review becomes more strategic in AI-native teams. Not as bureaucracy, but as quality discrimination. Review is the point where teams protect standards from the pressure of fast, plausible output.

This is also why anti-slop discipline matters. Slop is work that looks done but transfers the cost downstream.

## Bridge to Chapter 3
Once judgment becomes more valuable, the next question is obvious:

How do you encode that judgment so machines can work inside it?

That is the bridge into Chapter 3. Taste cannot remain only in a senior engineer’s head. It has to be externalized into harnesses, specs, repo structure, validation rules, and review systems.

## Closing move
When code gets cheaper, the real question is not whether humans matter less.

It is what kind of human contribution becomes scarce.

The answer is judgment under abundance: knowing what should be built, what standards apply, what tradeoffs are acceptable, and what seductive output needs to be rejected.

That is why taste still matters.

## Public-safe note
This derivative is intentionally concise and architectural. It mirrors the stronger internal manuscript argument without transcript-heavy source detail.
