# Chapter 5 — Execution Under a Spec


The plan is written and somebody has read it. Now something runs it, and the questions change from editorial to operational. What is the agent allowed to touch? What happens when step six turns out to be wrong? And what exactly is holding it to the plan while nobody is watching?

That last question is the one most process discussions skip. A specification does not bind anything by existing. Something has to make deviation expensive.

## The permission trade-off nobody wants to make

Robert Brennan of OpenHands describes the choice every person running a local agent actually faces. You can sit there approving each action — yes, you may do that, yes, that too — and "babysit the agent while it works" (Robert Brennan, OpenHands). Or you can turn the approvals off and let it run.

The second option is the one people take. Brennan asked a room how many run a local coding agent, then asked them to keep their hands up if they skip permissions entirely. More hands went up for the dangerous setting than had gone up for the question before it.

That is worth sitting with, because it is not carelessness. Approving every action destroys the only thing autonomy was for. If a person must watch each step, the agent has not removed the constraint; it has converted the engineer into a very slow interpreter. So people switch the guardrails off, and the agent gets whatever reach the laptop has — credentials, repositories, the filesystem.

The resolution is not more discipline about clicking. It is to change what the agent can reach.

## Isolation is what makes autonomy affordable

Brennan's argument is that sandboxing stops being a nice-to-have the moment you stop watching. An agent with a constrained blast radius can be allowed to act freely inside it, because the worst case is bounded and disposable.

His most practical version of this uses infrastructure teams already run. An ephemeral CI environment gives you an isolated machine with a secrets registry, and everything disappears when the job spins down — and "you can run as many GitHub Actions as you're willing to pay for" (Robert Brennan, OpenHands). Once agents run there instead of on a laptop, two things follow that are hard to get otherwise: they can run on a schedule, and they can run on events. An agent that updates dependencies every Monday morning. An agent that reviews every pull request as it opens.

Notice what this does to the question of trust. Nobody granted the agent more judgement. They moved it somewhere its mistakes are cheap, and that is what allowed the supervision to drop.

## The work changes shape at scale

Once execution is isolated and repeatable, a category of work becomes available that was not practical before.

Brennan describes a client using OpenHands to remediate CVEs across their estate: tens of thousands of developers, thousands of repositories. Every time a new vulnerability is announced in an open-source project, somebody has to "go through their entire codebase, figure out which of their repos are vulnerable" and open a pull request against each one (Robert Brennan, OpenHands).

That is not a problem that was ever hard. It was tedious, and tedium at that scale is its own kind of impossible — the work never finished, so it was triaged, and the triage was the risk. The specification for this work is short and unambiguous, which is exactly why it parallelises: thousands of instances of one well-specified change, each verifiable on its own.

This is the honest shape of the current frontier. Where the spec is crisp and the verification is mechanical, scale is available now. Where the spec is contested, nothing about parallelism helps.

## Parallelism arrives as a human problem

Rustin Banks works on Jules, which he describes as "an asynchronous coding agent meant to run in the background and do all those tasks that you don't want to do" (Rustin Banks, Google). The design assumption is that the interesting unit is no longer a session you sit through. It is a task you hand off and collect later.

That assumption breaks something on the human side, and the breakage is the subject of his talk. One agent, watched, fits the way engineers have always worked. Five agents running asynchronously does not. The work becomes dispatch, context-switching, and judging returned results — a management problem arriving without the training that usually accompanies one.

Arjun Singh of Superconductor names the gap directly. A great deal of current attention goes to "putting the agents at the center of everything" (Arjun Singh, Superconductor), which he grants makes sense given how capable they are. His own framing — "multiplayer agentic engineering or how to enable your whole team and your best agents to work together" (Arjun Singh, Superconductor) — puts the team back in the frame rather than the individual operator with a fleet.

The distinction matters because the failure modes differ. A solo engineer running five agents is managing their own attention. A team running agents is managing a shared codebase that several non-communicating processes are editing at once, and the coordination problem that creates is not solved by any of them individually being good.

## What actually holds the work to the plan

Return to the question this chapter opened with. During execution, a specification binds through exactly two mechanisms, and everything else is advisory.

The first is what the agent can reach. A constraint it cannot violate is worth more than an instruction it was asked to follow, which is the real content of the sandboxing argument. Permissions are specification, enforced.

The second is what gets checked afterwards. A plan step with a stated verification — this test passes, this command exits zero, this file contains that line — is a step whose completion is a fact. A step without one is a step whose completion is a claim, and the thing making the claim is the same thing that did the work.

Everything in the written plan that is neither a constraint nor a check is a suggestion. That is not an argument against writing it; Chapter 4 made the case for the plan as the place where thinking gets reviewed. It is an argument against believing that the writing, by itself, constrains anything once execution starts.

Which leads directly to the next problem, and the hardest one in the book. If completion is verified by checks, who verifies that the checks are any good — particularly when the thing that wrote the checks is the thing being checked?

## What follows

That is Chapter 6. It is the point where this book's own history stops being decoration and starts being evidence, because the Lab has repeatedly built verification that reported success without checking anything, and did not notice until something unrelated went wrong.
