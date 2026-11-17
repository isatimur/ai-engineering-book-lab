# Chapter 10 — The Review Wall


All of it arrives at a person. That is the wall.

Every efficiency in this book — cheaper generation, parallel agents, isolated execution, automated gates — increases the number of changes presented for judgement. Judgement is the one input that has not got cheaper, and this chapter is about what happens when the two curves separate.

## The numbers are not incremental

Anthropic merges roughly 30,000 code changes a day. A few months earlier the figure was around 2,500 to 3,000 (Manish Kapur, Sonar, describing Anthropic's reported scale). An order of magnitude, in months, inside one organisation.

Treat that as a preview rather than an anomaly. It is what a team looks like when the constraints this book has described are addressed one by one and the review stage is the only one left.

Tariq Shaukat supplies the industry-wide version, and the shape of it is the single most useful statistic in this chapter: "2,450% increase in lines of code, 240% increase in commits, but the same study showed only a 30% increase in releases" (Tariq Shaukat, Sonar).

Sit with those three numbers. Lines of code up twenty-five-fold. Commits up by a factor of three and a half. Releases up by less than a third.

His conclusion is the right one: "We haven't figured out how to scale from producing stuff to shipping stuff" (Tariq Shaukat, Sonar).

This is Chapter 1's argument with a measurement attached. Code generation was never the bottleneck, and here is what it looks like to remove a constraint that was not binding — enormous movement in the metric you optimised, almost none in the outcome anyone wanted. The twenty-five-fold increase in lines did not become twenty-five times the value. It became a queue.

## Where the queue sits

The gap between 240% more commits and 30% more releases is work that was done and has not reached anyone. Some sits in review. Some sits in the deployment gap of Chapter 8. All of it is inventory: completed, unvalidated, and ageing.

Inventory has costs that are easy to miss because nothing fails. Each unreviewed change decays as the code around it moves. Each one holds context in somebody's head, or loses it. The cost of reviewing a change rises with how long it has waited, because the reviewer has to reconstruct a situation that no longer exists — which makes the queue self-reinforcing.

## Slop is a judgement problem, not a quality problem

Gabriel Martinez, who introduces himself as an engineering manager and resident slop warden, gives the definition this chapter needs. The term has been beaten to a pulp, he says, but the thing it points at is old and only now happens at warp speed: "Slop is what happens when generation outruns judgment" (Gabriel Martinez, G2i).

That definition does useful work because it locates the problem correctly. Slop is not low-quality output. Much of it is perfectly decent code. It is output that has arrived in volumes exceeding anyone's capacity to decide whether it should exist — and the defining property is that nobody formed a view.

Which means slop cannot be fixed by improving the generator. A better model produces better-looking artifacts faster, and the ratio of generation to judgement gets worse. The only treatments are to generate less, or to raise judgement throughput, and the second has limits the first does not.

## The governance placebo

Shaukat's other observation is about what organisations say when asked how they manage this. He reports the near-universal reply: a description of the AI governance strategy, concluding with reassurance that there are humans in the loop.

His verdict is blunt: "human in the loop doesn't scale" (Tariq Shaukat, Sonar).

The phrase is doing something specific in those conversations, and it is worth naming. It converts an unsolved capacity problem into a solved-sounding policy. A human is in the loop — therefore the output is supervised, therefore the risk is managed. But the human in the loop at 30,000 changes a day is a human in the loop for a few seconds per change, which is the same human attention spread thinner and relabelled as control.

This is Chapter 6's independence argument in organisational form. A check that cannot fail is not a check. A reviewer who cannot refuse, because refusing means becoming the bottleneck for the entire org, is not a reviewer. Both are structures that produce the appearance of verification, and both are believed because the alternative is admitting the thing is unsupervised.

## What review is for decides what can be automated

The way out is not a better review tool. It is being precise about which of review's several jobs each change actually needs, because they have different answers.

**Correctness.** Does it work, is it safe, does it break anything. This is the most automatable job — tests, types, static analysis, and the automated reviewers of Chapter 6, used with the independence that chapter demanded.

**Coherence.** Does it fit the system, or does it duplicate something that exists and introduce a fourth way of doing a thing already done three ways. This is Chapter 9's decay problem. It is much harder to automate, because it requires a view of the whole that no individual change contains.

**Mental alignment.** Dex Horthy's answer to what code review is for: keeping the team on the same page about how the system is changing and why. Geoffrey Litt's argument in Chapter 1 is the same point from the individual side — understanding is what you carry to the next loop.

The third is the one that does not survive the volume, and it is the one nobody notices losing. Correctness is checkable. Coherence degrades visibly over months. Mental alignment degrades invisibly, and the symptom shows up quarters later as a team that cannot reason about its own system.

Horthy's practical answer from Chapter 4 is the best available: move the human attention upstream, to the plans, where one artifact covers a hundred lines of consequence and reading is still possible. You do not scale review by reading faster. You scale it by making fewer, larger decisions reviewable.

## What is actually true here

Three things, held together, because each alone is misleading.

Automated review is necessary and not sufficient. At these volumes there is no alternative to machine checks, and Chapter 6 explains why they cannot be the whole answer.

Human review does not scale, and saying so is not defeatism. It is the premise of any honest design. Systems built on the assumption that a person will catch it are already failing silently.

And the correct response to a queue is not always a faster queue. Sometimes it is less inventory. A team generating more changes than it can judge has a generation problem, not a review problem, and the cheapest intervention available is to stop producing work nobody has capacity to want.

## What follows

That last sentence is heresy in the environment this book describes, where the explicit goal is more throughput with less human involvement. The name for that ambition is the software factory, and it is the subject of the next part — argued by the people building one, and by the people who tried and wrote up what happened.
