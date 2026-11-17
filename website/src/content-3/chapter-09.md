# Chapter 9 — Brownfield and Spec Rot


Every chapter so far has quietly assumed a system you are building. Most software is not that. It is large, old, partly understood, and maintained by people who inherited it — and a specification for it cannot be written in advance, because the thing already exists and disagrees with whatever you were going to write.

Chapter 3 argued that code is a lossy projection of the reasoning that produced it. Brownfield work is that argument run backwards: you have the projection, you need the reasoning, and the people who held it are gone.

## The scale problem is a context problem

Dan Adler of Sourcegraph states the condition plainly. The massive codebases "that keep the world running are beginning to decay" — millions of lines, tens of thousands of repositories, "way too much to fit into a context window or even just to clone and GP in real time. That's just not possible" (Dan Adler, Sourcegraph).

Chapter 4 established why that matters mechanically: an agent degrades as its window fills, and a system that cannot fit in the window at all cannot be reasoned about whole. So agents work on slices. And Adler's next observation is what happens when many of them do: features and patches ship at record speed, with "different coding standards being applied in different places by different agents across the codebase" and duplicated code proliferating — a new implementation of something the codebase already had, because the agent that needed it could not see the existing one (Dan Adler, Sourcegraph).

This is a specific and underappreciated failure. It is not bad code. Each slice is locally reasonable. The damage is to coherence, which no local review can see, and coherence is what made the system comprehensible in the first place. Generation at volume against a system too large to hold in view produces drift by default.

## Nobody wants to touch it

Denys Linkov describes the human half with unusual honesty. His team faced three problems: too slow to meet customer demand, an AI pipeline too complicated to update, and — the one that governs — "because it's a legacy code base, or actually more than 10 repos, nobody actually wants to touch the code. It's not a fun experience" (Denys Linkov, Wisedocs).

They committed to a six-month refactor, and he frames the talk around the question worth asking before any such project: "Is this the right move to do?" (Denys Linkov, Wisedocs).

That question deserves to stay open, because the available answers have gotten worse in an interesting way. Cheap generation makes rewriting look more attractive than it has ever looked — the code arrives fast now. What has not changed is the part that actually made rewrites fail: the accumulated knowledge is in the old system, undocumented, mostly as handling for cases nobody remembers encountering. Generation speed addresses the easy half of a rewrite and leaves the hard half untouched, while making the whole thing look tractable.

## Recovering the specification

If the specification cannot be written in advance, it has to be recovered. The most thorough version of this in the corpus is Postman's mapping exercise, and the detail is the point.

They catalogued every microservice in production, identified every endpoint exposed by each REST service, and captured how each was implemented "right down to the exact line of code where it was implemented". Then they mapped how services talk to each other, how endpoints connect, and how data moves "all the way down across the stack, including databases and caches" — and how front ends, CLIs and APIs interact with all of it (Kamalakannan Nandagopal, Postman).

Notice what that produces. Not documentation, which Chapter 4 observed is where the lies accumulate. A derived artifact — generated from the system as it is, re-derivable when the system changes. That distinction is the whole discipline of brownfield specification. A hand-written description decays silently from the moment it is written. A generated map is wrong only until the next run.

This is the honest answer to spec rot, and it is less satisfying than it sounds, because somebody has to build the generator and keep it working. The alternative, though, is a document that is confidently wrong and a team that trusts it.

## The war room

Ford Prior's team at GEICO took the opposite approach for a different problem class, and the contrast is instructive.

Faced with major changes where the missing ingredients were collaboration and intelligence at scale, they built what he calls "a multiplayer AI-native war room": a roster of key decision makers and subject matter experts relevant to the topic, "a driver to wield these expensive AI tools", and a shared environment for the chatter and the design work (Ford Prior, GEICO).

The structure is worth reading carefully, because it inverts the usual automation story. The scarce resource is not generation. It is the subject matter experts — the people who know why the system is the way it is — and the design concentrates their attention rather than replacing it. One skilled operator drives the tools so the experts never have to, and the experts answer the questions only they can answer. That is a deliberate allocation of the thing Chapter 1 identified as the real constraint.

Mapping and the war room solve different halves. A generated map tells you what the system does. It cannot tell you which behaviours are load-bearing because a customer depends on them and which are accidents nobody noticed. That knowledge lives in people, and brownfield work is largely the business of getting it out of them before they leave.

## Spec rot, specifically

Three distinct decays hide under the phrase, and they need different responses.

**The document drifts from the code.** The familiar one. The answer is derivation: generate the description from the system, or accept it will be wrong.

**The code drifts from itself.** Adler's problem. Many agents working on slices of a system none of them can see, each locally correct, collectively incoherent. No per-change review catches it, because every change is fine.

**The intent is lost entirely.** The deepest one. The code is consistent and the behaviour is intentional, but nobody alive knows which parts are load-bearing. Nothing generated recovers this. It is an interview problem, and it has a deadline attached to people's careers.

Only the first is really about documents. The term *spec rot* flatters the problem by making it sound like a filing issue.

## What follows

Running through this chapter, and the two before it, is a constraint that has not yet been faced directly: somebody still has to look at all of this. More changes, arriving faster, against systems too large to hold in view, needing judgement that only a few people have.

That is the review wall, and it is Chapter 10.
