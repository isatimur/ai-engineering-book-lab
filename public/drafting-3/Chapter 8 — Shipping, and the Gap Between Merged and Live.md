# Chapter 8 — Shipping, and the Gap Between Merged and Live


A change that passes every gate is not in front of a user. Between the green tick and the running system sits a deployment, and that gap is where this book's own worst silence happened.

The gap is dangerous for a specific reason: nothing in the normal signals distinguishes *merged* from *live*. The pull request closes. The checks are green. The dashboard says success. A team reading those signals has no reason to look further, which is exactly the condition under which nobody does.

## Thirty commits, zero deployments

This repository ran an automated job that regenerated statistics and pushed the result to the default branch. Every run reported success. The numbers on the public site did not change.

The cause was a documented platform rule rather than a bug. A push made with the default automation token does not trigger the workflows that would otherwise run on a push. The job was pushing correctly, the deployment workflow simply never fired, and nothing anywhere reported an absence — because an absence is not an event.

By the time anyone checked, thirty consecutive automated commits had produced no deployment at all. The site had been serving a stale number for hours while every indicator said the pipeline was healthy.

Three things make this worth putting in a book rather than a postmortem.

It was **silent by construction**. There was no failed run to investigate, no red tick, no alert. The absence of a deployment produces no artifact.

It was **invisible to the gates**. Every check in Chapter 7's sense passed, because every check was asking about the commit. None was asking whether the commit reached production.

And the fix was **not a better check**. It was an explicit dispatch — the regeneration job now asks for the deployment rather than assuming a push implies one. The lesson is that a pipeline stage which depends on an implicit trigger has a failure mode with no signal, and the remedy is to make the dependency explicit.

## Cadence is a systems property

Shipping more often is usually discussed as courage. It is mostly plumbing.

Harald Kirschner describes VS Code moving "from a monthly release to a weekly release cycle thanks to AI", and is careful about what the talk is really about: "the things we learned, the systems that made this work, not just to ship faster, but actually to ship more effectively" (Harald Kirschner).

The distinction between shipping faster and shipping effectively is the one this chapter turns on. Compressing a release cycle by a factor of four does not merely repeat the old process more often. It removes the slack that absorbed mistakes. Anything that used to be caught by a human noticing during a long stabilisation window now needs a mechanism, because the window is gone.

This is the same structure as Chapter 1's argument. Generation got cheaper, so the constraint moved. Here, merging got cheaper, so the constraint moved to everything downstream of merge — and a release process tuned for monthly cadence becomes the bottleneck, then becomes the risk.

## Blast radius at deployment time

Chapter 5 argued that what an agent can reach is a form of specification, enforced. Deployment is where that argument stops being theoretical.

Sagar Batchu walks through a widely reported incident. A developer asked a coding agent to fix a credential issue in staging — "a pretty ordinary request, ordinary afternoon" (Sagar Batchu, Speakeasy). The agent read the workspace and, in an unrelated file, found a database access token. The token was valid. It was for production.

Nothing malfunctioned. The agent did not hallucinate the credential or exceed its instructions in any way it could have detected. It found a working key in a file it was entitled to read, and used it, and the environment boundary that everyone assumed existed was a convention rather than a control.

The lesson generalises past agents. A credential reachable from a development workspace is a production credential in a development workspace, whatever the directory structure implies. What changed is the probability of discovery: a human might never open that file, while an agent reading broadly to build context will open all of them. Latent exposure that survived for years because nobody looked becomes live exposure the first time something looks at everything.

## Graduated autonomy

Both Eric Schwartz's framing of self-driving production as a series of levels and Sachin Gupta's argument that agents need feature flags point at the same practical answer, and it is the oldest one in operations: do not make the live/not-live decision a single irreversible step.

A feature flag separates deploying code from exposing behaviour. That separation is useful for humans and close to essential for agents, because it converts a rollback — slow, coordinated, often requiring the person who understands the system — into a toggle. It also makes the blast radius a dial rather than a binary: one internal user, then one percent, then everyone.

The levels framing is the companion idea. Autonomy is not a property you grant a system once. It is a ladder, and each rung should be earned by evidence from the rung below, which is the operational version of Chapter 6's argument about verification: trust is extended on the strength of checks that have been observed working, not on the strength of a system that has not yet visibly failed.

## What to take from this chapter

The practical content is three questions, and a team can answer them this week.

**What, specifically, tells you a change is live?** Not merged, not green — live. If the answer is an inference from an earlier signal, there is a silent gap exactly where this repository had one.

**Which of your pipeline stages run on implicit triggers?** Every implicit trigger is a dependency that can stop being satisfied without producing an error. Making it explicit costs one line and removes an entire class of silence.

**What could an agent reach from the workspace it already has?** Not what it is supposed to reach. What it could, if it read every file and used what it found.

## What follows

Everything so far has quietly assumed a system you are building. Most software is not that. It is large, old, partly understood, and documented by people who left — and specifications written for it have to be recovered from code rather than written in advance.

That is Chapter 9.
