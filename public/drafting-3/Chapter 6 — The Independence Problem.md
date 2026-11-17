# Chapter 6 — The Independence Problem


Chapter 5 ended on a question. If a step is complete when its check passes, then the check is where the authority sits — and nothing so far has established that the check is any good.

This is the chapter the rest of the book leans on. The claim is narrow and unfashionable: **verification has to be independent of the thing it verifies, and almost nobody's is.**

## Start with how often it matters

Corey Gallon gives this chapter its baseline, and he gives it with a number rather than an impression. He put over 107 billion tokens through agents in a year, then went back through his own sessions to see where they went wrong. "In about four in 10 sessions, an agent got something wrong that mattered" (Corey Gallon, Rexmore).

Not four in ten lines. Four in ten sessions contained a consequential error. That rate is the thing every other argument in this chapter has to be sized against. It is low enough that an unreviewed agent looks competent most of the time, and high enough that an unreviewed agent is certain to ship something bad this month.

Tomas Reimers of Graphite describes the aggregate version from the vantage of a company that reviews code for a living. Their product started about a year ago, and what they noticed was simple: "the amount of code being written by AI was going up and up and up, but so was the amount of bugs" (Tomas Reimers, Graphite).

Both halves follow from Chapter 1. Generation got cheap, so volume rose. Defect rate per unit did not fall to zero, so defects rose with volume. The constraint moved to catching them.

## The verifier is not a neutral instrument

The obvious response is to add an automated reviewer. The problem is that the reviewer is made of the same material as the thing it reviews, and can be wrong in the same direction.

A team from Browserbase, working with a Microsoft researcher, measured exactly this on a web-agent benchmark. Judged by the official WebVoyager judge, the model scored 74%. Judged by a verifier built to agree with human labels, the same model on the same benchmark scored around 38%. As they put it, "there's a huge gap between what the existing verifiers say and what is actually the ground truth" (Browserbase).

Sit with the size of that. The judge did not shade the result. It nearly doubled it. Every decision made on the strength of that 74% — ship it, move on, optimise something else — was made on a number with no relationship to whether the agent had done the task.

And note the direction of the error. The judge was not randomly noisy; it was systematically generous. A noisy instrument announces itself through inconsistency. A generous one reads as good news, and good news is rarely audited.

This is the mechanism to carry forward. A verifier is a model with opinions, and when it shares the lineage, the training, or merely the framing of the thing it judges, its opinions correlate. Correlated errors do not cancel. They confirm.

## Independence has to be engineered

Tariq Shaukat of Sonar states the design principle that follows, and it is the clearest articulation of this chapter's thesis in the corpus. What they have seen work is "zero trust multi-layered verification" — and the reasoning is explicit: "Every model has biases. Every model produces has a character has a personality. So, let's make sure we use different models and different techniques to make sure your code is safe, to make sure it's reliable, to make sure it's secure" (Tariq Shaukat, Sonar).

Different models and different techniques. Not a better model: a *differently* wrong one, plus methods that fail for unrelated reasons. A type checker and a language model do not share blind spots, because they do not share a mechanism. Two frontier models prompted similarly very well might.

Shaukat also frames the upstream half of this as preemptive verification — reducing how much there is to verify in the first place, which is where Chapters 2 through 4 earn their place. A specification that was argued over produces less for the verifier to catch.

Uber's uReview is the same philosophy at industrial scale, built for thousands of engineers across hundreds of services (Will Bond & Ameya Ketkar, Uber). At that size the economics are unforgiving in a specific way: a reviewer that cries wolf gets ignored, and an ignored reviewer is worse than no reviewer, because it occupies the slot where a real check would have gone.

## Why your own gates are the most dangerous

Here is where the principle bites hardest, and it is the part the vendor literature does not cover, because it is not about a product.

The reviewer that shares your blind spots is not usually a model. It is you, last Tuesday.

A gate you wrote encodes your understanding of what can go wrong. It tests the failures you imagined. It passes the failures you did not — silently, with a green tick, which is the same signal it gives when everything is genuinely fine. The gate is not lying. It is answering a question you wrote, and you wrote the question out of the same understanding that produced the code.

This repository has supplied an uncomfortable number of examples, and they are all checkable, which is the point of building a book on a repo you can clone.

A gate that validated generated diagrams reported zero stale and zero missing-source for months while erroring on every single file, because it ran a command whose flags differ between platforms. It never found a problem because it never read a file. A green tick, every run.

An integrity runner that ran several sub-checks collected the exit code of one of them into a variable and never read the variable. A crash in that sub-check printed a traceback and the runner reported that all anchors resolve.

An anchor verifier required an excerpt of at least three characters, so that a quote could not be a single punctuation mark. But `---` and `+++` are three characters, and both appear in every diff ever produced, so either would have certified whichever commit it was pointed at.

And a capture format asked authors to paste the evidence block into the same file the verifier searched for the evidence — so the file proved the claim by containing the claim. Stripping the pasted blocks turned a clean result into three failures.

Each of these was written by someone competent, trying to be careful, with the explicit goal of catching mistakes. That is the uncomfortable part. Conscientiousness is not the defence. Several of them were introduced *by the work of fixing the previous one*.

## What independence actually requires

The practical content of this chapter is three habits, and none of them is a tool.

**Make the check fail on purpose.** A check never observed failing has not been shown to work. Break the thing deliberately and confirm the gate goes red. This is the only direct evidence that a passing result carries information, and it takes minutes.

**Check with a different mechanism than you built with.** If a script's output verifies the script, you have one mechanism agreeing with itself. Rebuild the test independently, or verify against a source the implementation never touches.

**Treat a silent pass as suspicious when the thing is new.** A gate that has never once objected is more likely to be blind than to be guarding a perfect codebase. The first question is not what it caught, but what it *would* catch — and the answer should come from a demonstration, not an inspection of the code.

Each of these is a way of buying independence that nobody will sell you, because the thing you need is not a better verifier. It is a verifier that fails differently from you.

## What follows

Agreeing that gates must be able to fail is easy. Building ones that can, in a pipeline where most of the code arrives from a machine and the volume keeps rising, is a different problem — and it has its own economics, because a gate that fires constantly gets switched off and a gate that never fires gets trusted.

That is Chapter 7.
