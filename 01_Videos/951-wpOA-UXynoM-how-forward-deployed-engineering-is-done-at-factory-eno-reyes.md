---
video_id: wpOA-UXynoM
playlist_index: 951
title: "How Forward Deployed Engineering is done at Factory — Eno Reyes"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wpOA-UXynoM"
duration: "21:21"
duration_seconds: 1281
view_count: 3400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/wpOA-UXynoM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eno Reyes, co-founder and CTO of Factory, says deployed engineers are the tip of the spear of the product, not professional services. They carry signals from large customers back into the product and help each customer build a software factory: an uninterrupted flow from signal to deploy on Droid, a model-independent harness that customers can air-gap. The key prerequisite is agent readiness, the density of deterministic validation loops in a codebase, because long-running agents such as Missions are only as good as their verification. Factory itself runs at 15 to 20% autonomy."
---

# How Forward Deployed Engineering is done at Factory — Eno Reyes

## Summary
Eno Reyes is co-founder and CTO of Factory, which builds autonomous software engineering agents for enterprise teams; he worked earlier in ML and software roles at Hugging Face and Microsoft. He opened the conference's forward deployed engineering track. His thesis: deployed engineers should be the "tip of the spear of the product", not a professional services arm.

**Why not professional services**
In the Palantir-era model, engineers parachuted in because the code and data were only reachable behind the customer's curtain. The role has since forked into many shapes. Factory refuses to run a customer's codebase modernization for them, even with its own product, because that brings revenue but does not improve the product or scale the business. Deployed engineers instead stream what engineering leaders and on-the-ground engineers at the largest customers think back into the product, so Factory can adjust fast and, ideally, self-assemble in the customer's environment.

**The software factory**
Every organization runs an implicit loop. Signals (customer conversations, bug reports, Slack threads, an executive decision) flow in. Humans triage and plan. Developers make changes. Changes pass review, QA, security analysis, SAST, linters and type checkers, then ship. Deployed software produces more signals. Most organizations instrument this loop poorly. With AI at each stage, the flow from signal to deploy can run with no human interruption, while humans still engineer the system. It is "built, not bought".

**Droid and the ROI story**
Droid is a model-independent agent harness. Reyes warns against building the factory on a single-model, vendor-locked tool and against not owning the traces. Customers in finance, healthcare and government air-gap it. Self-assembly matters at 45,000 people and tens of thousands of codebases. The ROI chain must be clear from day one: a change that gets AI code review, QA and security analysis is "maybe 87%" less likely to hit a bug, which ties to bug rate, satisfaction and revenue.

**Agent readiness**
Agent readiness measures how many deterministic validation loops a codebase has. More loops let agents work longer on harder tasks. Droid can fix maybe 30 to 40% of the gaps on request; the rest need workflow changes, because humans are not used to how nitpicky automated checks are. Missions is a long-running harness that needs a human only for planning a bounded, verifiable task; he says it has migrated 30 to 50 million-line codebases fully autonomously. His reason: models get dense reward in post-training, and verification signals supply it.

**Autonomy today**
Factory's own code runs at about 15 to 20% autonomy, with an autonomy ratio in the upper 80%. Its legal workflow is about 100% autonomous. The core terminal harness is not, because no validator catches visual bugs like flickering. He uses Epcot as an analogy: build a working example of the codebase of the future, but not so advanced that teams dismiss it as a theme park.

**Who fits**
Former founders, strong technical communicators with executive presence, and systems thinkers. DevEx people and very technical PMs adapt well to moving from editing software to managing a system that builds software.

## Why it matters
- It defines agent readiness as a measurable property (density of deterministic validation loops), which gives the evals chapter a concrete prerequisite for autonomy.
- The link between verification and dense reward in post-training explains why long-running agents succeed only on verifiable tasks.
- Refusing services work in favour of product feedback is a sharp position for the FDE chapter's debate on where the role sits.
- The honest autonomy numbers, and the flicker example of what still cannot be verified, show where human judgement remains in the loop.

## Metadata
- Video: https://www.youtube.com/watch?v=wpOA-UXynoM
- Duration: 21:21
- Playlist index: 951
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> This is the forward deployed engineering track in case you're in the wrong room. Um as you already know, forward deployed engineering is one of the hottest topics in AI. The most important companies on the planet are building out massive FTE teams. So, think OpenAI, Anthropic, Google DeepMind, you get the idea. Forward deployed engineering was pioneered by Palantir many years ago to embed really strong software engineers directly into their customers' orgs uh to implement customize their platforms around the nuances of the real world. So, today we brought in some amazing speakers from Anthropic, Cursor, Factory, Ramp, Decagon, and many more uh to talk about the current state of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wpOA-UXynoM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
