# Chapter 3 — What a Specification Is For


Every tool in this book can produce a specification. Several can produce one in under a minute, from a sentence. That ability arrived faster than any agreement about what the document is for, which is why teams now argue about format while sharing no view of the purpose.

The question worth settling first is not what goes in a specification. It is what the specification is supposed to do once it exists.

## The artifact you think you produce

Sean Grove works on alignment research at OpenAI. He opens with a show of hands: who writes code, whose job is to write code, and then — keep your hand up if you believe the most valuable professional artifact you produce is code (Sean Grove, OpenAI). Plenty of hands stay up. He finds that natural, and he thinks it is wrong.

His argument is structural rather than moral. The work before the code is substantial: talking with people, gathering requirements, thinking through implementation, integrating sources. The code is where all of that lands, but it is not where all of that is *kept*. "Code itself is actually a lossy projection from the specification" (Sean Grove, OpenAI).

The analogy he uses makes the loss concrete. Decompile a compiled C binary and you do not get the comments back, or the well-named variables. You get something that runs and tells you almost nothing about why. You are left inferring what the author was trying to do. That information was never in the binary. The same relationship, Grove argues, holds between intent and source: the reasoning that produced the code is not recoverable from the code, because it was never stored there.

If that is right, then a team that keeps only its code has been discarding its most expensive output for decades, and merely got away with it while the people who remembered the reasons were still in the building.

## It is an alignment device before it is an input

Grove's positive claim is sharper than *write things down*. A specification, he says, "effectively aligns humans and it is the artifact that you use to communicate and to discuss and debate and refer to and synchronize on" (Sean Grove, OpenAI). And then the line that does the most work in this chapter: "If you don't have a specification, you just have a vague idea" (Sean Grove, OpenAI).

Note what that makes the document for. Not instructions for a machine. A surface for disagreement. Its first value is that it can be argued with — that two people reading it can discover they wanted different things, early, while changing their minds is still cheap.

This reframes the usual complaint about specification work. Teams say the document went stale, or nobody read it, as though the writing were therefore wasted. But if the document's job was to surface a disagreement in week one, it did that job whether or not anybody opened it again in week nine. The waste is not in writing specifications that age. It is in writing ones nobody ever disagreed with, which usually means nobody engaged.

Chapter 1 ended on the constraint being agreement. This is the instrument for reaching it.

## The second reader changes the economics

What is new is that the document now has a second audience that did not exist before, and that audience reads everything.

Michal Cichra frames his material as capturing decisions for humans and AI alike, and reports that the consistency problems teams hit with AI are the same ones he saw across a decade on a single product (Michal Cichra, Safe Intelligence). The problem predates the agents. The agents made it expensive enough to fix.

A human picking up unfamiliar code asks a colleague why it is that way. An agent does not. It infers, confidently, from whatever is in front of it, and writes more code consistent with its inference. Where a missing rationale used to cost one awkward conversation, it now propagates. That is the economic change: documentation of decisions moved from courtesy to load-bearing infrastructure, because the fastest-moving contributor on the team cannot ask.

## When the specification is meant to generate the work

Al Harris describes Amazon's Kiro, and is direct about the problem it was built against. Vibe coding is great, he says, but "vibe coding relies a lot on me as the operator getting things right" (Al Harris, Amazon) — the operator supplying the guardrails and holding the agent to a workflow. Quality then tracks the discipline of whoever is driving, which is not a property you can staff around.

Kiro's answer is to make the specification the thing that drives, and to shape it around the whole lifecycle rather than the coding step alone — to "represent the holistic SDLC", drawing on decades of accumulated practice rather than inventing a process from scratch (Al Harris, Amazon).

This is a different theory of the document from Grove's, and the difference is the book's subject. For Grove the specification aligns people and the code follows. In the generating model the specification is executable: it is the source, and the code is output. Both treat the document as more durable than the code. They disagree about who it is addressed to.

They also fail differently, which matters more. An alignment document fails by going stale while everyone nods. A generating document fails by being satisfied exactly — producing precisely what was written, including the parts that were wrong, with the fidelity of the pipeline concealing that nobody checked the premise.

## The failure that looks like rigour

That second failure deserves naming, because it is the one this book keeps returning to.

A specification can be complete, well-formatted, reviewed, approved, and wrong. Worse, the more structured it is, the easier it becomes to satisfy without thinking — to fill every heading, answer every prompt, and produce a document that passes inspection while nobody asked whether the thing described should exist. Ceremony is satisfying to complete, and completion feels like judgment.

Harris's point about the operator cuts both ways here. Vibe coding depends on the operator getting it right. A heavy process depends on the operator getting it right too; it just moves the dependency somewhere less visible, into the quality of the thinking that filled in the template. The template cannot tell the difference between a considered answer and a plausible one.

This is why Chapter 2 came first. A specification is an excellent way to record a decision and a poor way to make one.

## Brownfield, briefly

One practical note that Chapter 9 takes up properly. Harris is candid that an agent approaching an existing system starts from nothing: it reads the working tree to orient, because it does not know the system (Al Harris, Amazon). Spec-driven work on a greenfield project writes the specification first and builds to it. On a system that already exists, the specification has to be recovered from code that is, by Grove's argument, a lossy projection of reasoning nobody wrote down.

That is a harder problem than the demos show, and most real work is that problem.

## What follows

A specification says what should be true. It does not say in what order to make it true, or how to cut the work so that each piece can be checked on its own. That is planning, and it is where the disagreement between these systems becomes concrete — how much of the plan to fix in advance, how small a unit has to be before an agent can finish it without losing the thread, and who decides when the plan was wrong.

That is Chapter 4.
