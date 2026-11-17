# Chapter 1 — The Bottleneck Moved


Something changed in the last two years that most teams have not finished reacting to. Writing code got cheap. Not free, and not always good, but cheap enough that the act of producing a function is no longer the thing that decides how fast software reaches a user.

Almost every team responded the same way. They put an agent in front of the part that got cheap, and left everything else exactly as it was.

This book is about everything else.

## The constraint was never the typing

Justin Reock is deputy CTO at DX, where he runs research on developer experience and its relation to productivity. Presenting a quarterly report drawn from more than 400 organizations, he puts the point without hedging: "code generation was never the bottleneck in the first place" (Justin Reock, DX).

The sentence is easy to nod at and easy to underrate. Reock does the arithmetic that makes it bite. Suppose the models were perfect. Suppose an engineer received flawless code the instant they asked for it. In his estimate you would "still only be attacking anywhere from maybe 14 to 16% of the overall value stream" (Justin Reock, DX). That figure is a hypothetical, not a measurement — it describes a world nobody lives in, where accuracy is total and latency is zero. It is useful precisely because it is generous. Grant the technology everything it claims, and the ceiling is still low, because most of the distance between an idea and a shipped change was never typing.

In a separate talk, drawing on data from almost 140,000 engineers, Reock makes the same argument from the other direction: "For most organizations, writing code has never been the bottleneck" (Justin Reock, DX). Productivity rises a little with completion. The larger constraints sit elsewhere in the lifecycle, and they sat there before any agent arrived.

A second enterprise dataset points the same way, and its shape matters more than its size. Martin Harrysson and colleagues at McKinsey surveyed a few hundred large-enterprise clients and found a leading group — "there's a 20 25% of of companies that are really starting to see some some pretty massive benefits" (Martin Harrysson, McKinsey).

The useful part is how he distinguishes that group from everyone else. The benefit is "not just the sort of 10 15 20% like a little bit faster coding", but "real, you know, 2x like end-to-end improvements" (Martin Harrysson, McKinsey).

Read those two numbers against each other. A fifth to a quarter of firms are getting a different *kind* of result, not a larger quantity of the same one. Faster coding produces the small number. Changing something about the end-to-end flow produces the large one. That is Reock's value-stream argument appearing independently in another dataset, and it suggests the ceiling on tool adoption alone is real rather than theoretical.

He borrows the governing rule from Eliyahu Goldratt's theory of constraints: "an hour saved on something that isn't the bottleneck is worthless" (Justin Reock, DX). This is the sentence to keep. It explains why a team can adopt an excellent tool, measure a real time saving, and ship no faster. The saving was real. It was banked somewhere that did not control the outcome. Reock's own data describes exactly that pattern — annualized time savings from AI, eclipsed by context switching, interruption, and meeting-heavy days.

## It moved. It did not disappear

A constraint that is removed from one place reappears in another. This is the part the enthusiasm skips.

Gabriel Spencer-Harper, co-founder of Meticulous, states the relocation in a single breath. With exhaustive verification, he argues, you can ship at the speed your agents write. Without it, "someone somewhere at your organization is spending time verifying code and that is now your new bottleneck" (Gabriel Spencer-Harper, Meticulous), and the team is pushed into trading velocity against defects. Generation stopped being the limit. Confidence became the limit.

Ido Salomon, who built AgentCraft, finds the constraint somewhere more uncomfortable: in the person. Agents are capable, and spinning up many of them does not multiply output the way the arithmetic suggests, because "each one of these agents requires you to steer them direct them review them and when it's at scale especially it's just exhausting" (Ido Salomon, AgentCraft). His conclusion gives the talk its title and this chapter its hinge: "we are the bottleneck, but we don't have to be" (Ido Salomon, AgentCraft).

Both men are describing the same displacement. The work that remains is specification, judgment, review, and release — the parts that need a human to decide whether the thing produced is the right thing. Those parts did not get cheaper. Several got more expensive, because there is now more output arriving at them per hour.

## What it moved into

Verification and exhaustion are symptoms. Geoffrey Litt, who works on malleable software at Notion, names the thing underneath them, and in doing so rules out the escape most teams are hoping for.

The hope goes like this: the agents keep improving, so the need to follow what they are doing is temporary. Litt reports hearing it often — as the agents get smarter, "we we don't have to understand it all," so get out of the loop and let it run (Geoffrey Litt, Notion). If understanding is only there to catch mistakes, then a model that stops making mistakes retires the requirement.

He thinks that misses something. Checking correctness is one reason to understand a change, and the shallower one. "There is a deeper reason to understand what's going on, and that's understanding to participate" (Geoffrey Litt, Notion). The work is not a single loop with a verdict at the end. It is a sequence, and what you carry between iterations is the only thing that makes the next one better: "When you review what's happening and get in the loop, you come away changed. You understand something, and that understanding is what you take to the next loop, and the next, and the next" (Geoffrey Litt, Notion).

The consequence is uncomfortable for anyone selling full autonomy. A team can stay productive for a while without understanding, because the agents are good and the tests pass. What it loses is the ability to have the next idea — to see the leap that nobody specified, which requires holding the structure in your head rather than querying it. Litt borrows a name for the balance that accrues meanwhile: cognitive debt, by analogy with technical debt. And he is explicit that better models do not pay it down. This "is not something that we can just wash away with better agents" (Geoffrey Litt, Notion).

So the constraint did not merely relocate to a different queue. It relocated into people, where it compounds quietly and where no upgrade reaches it. How much understanding a given change actually requires is a real question with a cost on both sides, and this book returns to it at the end rather than pretending it has a universal answer.

## Fast individuals, unchanged teams

The displacement shows up first as a puzzle about arithmetic that does not add up.

Matt Dailey of Ref describes the pattern he sees repeatedly: "individual engineers are going really fast with AI, but the team as a whole is not" (Matt Dailey, Ref). Each engineer is measurably quicker. The organization is not. Nothing about that is mysterious once you accept that the constraint moved. Individual speed loads work onto shared stages — review, integration, release — that no one made faster, and those stages were already the constraint.

This is why the problem is a lifecycle problem and not a tooling problem, and why a book about it cannot be a tour of tools. You can buy a faster generator. You cannot buy a faster agreement about what should be built, and that turns out to be the thing in the way.

## Why the feeling of speed is not evidence

Here the chapter has to complicate its own case, because the evidence most teams rely on is their own impression, and that impression is not reliable.

Joel Becker works on METR's study of experienced open-source developers. His finding about perception is blunt: "developers will tell you that they were faster when they weren't" (Joel Becker, METR). Not that they lied. That the sensation of moving quickly and the fact of finishing sooner came apart, and the people inside the work could not tell.

Becker is careful about what this does and does not establish, and so should we be. He takes seriously the explanation that developers are slower the first time they use a new tool and recover the cost later — a J-curve, real in software and elsewhere. A single study of experienced developers on mature repositories does not settle the general question.

What it does settle is narrower and sharper: self-report is not a measurement. A team that believes it has solved its constraint, on the strength of how the week felt, has believed something it has no instrument for. That cuts against this chapter too. "The bottleneck moved" is a claim, and if it rests on vibes it is worth no more than the vibes it displaced.

That is the reason this book is built the way it is. Every claim it makes about process is demonstrable on a repository you can clone — specs, plans, CI runs, failures, and the commits that fixed them, accumulated in public. Where the argument depends on something happening, there is an artifact with a date on it.

## It is not the model

One more reflex is worth disarming early, because it absorbs so much attention.

Nicholas Arcolano, head of AI and research at Jellyfish, opens a talk about disappointing AI outcomes by naming where the fault usually is not: if you are not getting the outcomes you want, "it's actually not the model" (Nicholas Arcolano, Jellyfish). The next model will be better. It will also arrive into the same review queue, the same unclear requirements, and the same release process, and it will be metered by them exactly as its predecessor was.

This is the practical consequence of Goldratt's rule. Upgrading a non-constraint produces no throughput. It produces a better non-constraint, and a team that is confused about why nothing improved.

## What follows

If the constraint moved into specification, review, and release, then the interesting question is no longer which model to use. It is this: **how much has to be written down, and verified by whom, before an agent is allowed to touch code?**

That question has several serious answers, and they genuinely disagree with each other. Some say the specification should be heavy, phase-gated, and binding. Some say it should be light and revised continuously. Some say the specification was never the weak point, and that review is. Those disagreements are the spine of this book, not a sidebar, and each is argued at the stage of the lifecycle where it is strongest rather than in a chapter of its own. Tools move faster than print; stages outlive them.

The chapters ahead follow the lifecycle in order. What has to be settled before any document helps, and how to get it settled. What a specification is actually for, and the ways a rigorous-feeling one can be satisfied without anybody thinking. How work is decomposed and planned. What execution under a spec looks like when the thing executing does not get tired or embarrassed.

Then the harder half. Verification that is independent of the author — a reviewer who shares your context shares your blind spots, whether that reviewer is a colleague, a subagent, or a CI gate you wrote yourself. Gates that can actually fail, as opposed to gates that report success without checking. The review wall, where the volume problem becomes unavoidable. And the gap between merged and live, which is wider than most teams believe and is where several of this repository's own scars are.

A note on what this chapter has not done. It has not told you that specifications are good, or that process is the answer. Process has a cost, it is frequently theatre, and the last chapter is about how much of it is worth paying for and how far out of the loop a person should go. The argument here is narrower, and it is the one everything else rests on: the constraint is no longer where your tools are pointed, and until you know where it actually is, speed is a sensation rather than a result.
