---
video_id: DouK81O8R3o
playlist_index: 1386
title: "One Day, $1,000 in Tokens: An AI War Room for Legacy Code — Ford Prior, GEICO"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=DouK81O8R3o"
duration: "18:43"
duration_seconds: 1123
view_count: 9000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/DouK81O8R3o.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T23:56:41+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ford Prior, senior staff engineer and tech evangelist in GEICO claims tech, argues that agents sped up the coding inner loop but a risk-managed company stays stuck in the outer loop of decisions and approvals. His fix is a multiplayer AI-native war room: decision makers, one driver, a Slack mission channel, and FleetKit, a markdown rulebook built with Anthropic that dispatches research leads, queues human approvals, then dispatches builders. Betting $1,000 of tokens in one day, he ran it on three legacy claims domains (rentals, damages, salvage), saving 8,500 calls a month and producing a fully green-lit migration plan."
---

# One Day, $1,000 in Tokens: An AI War Room for Legacy Code — Ford Prior, GEICO

## Summary
Ford Prior is a senior staff engineer and tech evangelist in the claims technology group at GEICO, a 300-engineer group of about 32 pizza teams. His thesis: agents have "basically obliterated" the build step, but GEICO is "a risk management company," so it stays stuck in the outer loop of decisions, approvals and collaboration. The talk shows how his team made that outer loop keep pace.

**The problem**
Six months earlier, engineers had only 25% of their bandwidth, "on a good day," for major-version work after patches and minor upgrades. GEICO now offloads patch and minor work to agents from spec to deployment. Major work stays rate-limited by two missing things: collaboration (the right people in the room at the right time) and intelligence (fact checking and code crunching fast enough to answer each decision as it comes up).

**The war room**
The answer is a "multiplayer AI-native war room": a roster of decision makers and subject matter experts, one driver who runs the expensive AI tools, a comms channel, an interactive design studio, the code repositories, and workflows, agent skills, MCPs and agent fleets. The bet: with $1,000 of tokens in one day, map one legacy claims domain end to end (millions of lines of code), have the agent propose one serious change, an agent-callable API, and demo it to his boss at 4 p.m.

**Three runs**
Using the uplift, transform and reimagine taxonomy from Anthropic's code modernization plugin:
- Rentals (uplift): the agent extended an existing API and found a way to save 8,500 calls per month.
- Damages (transform): new agent-callable APIs to unlock a larger workflow.
- Salvage (reimagine): a migration plan with API specs and design mock-ups, green-lit by product and tech at every level. It also found a production bug.

**How it works**
The vendor supplies replaceable parts: harness, model, the plugin, and FleetKit. GEICO supplies what cannot be replaced: context (standards, decision "archaeology"), methods (skills) and judgment (who decides what at which gate), kept in repos that agents and humans both correct. FleetKit is a set of markdown rules and protocols built with Anthropic. It takes a goal, dispatches leaders to research, puts decisions in a human-in-the-loop queue such as GitHub issues, then dispatches builders, using beads to track work. Each mission gets a Slack channel. The agent pings the owner of a missing detail from the roster and produces HTML worksheets and architecture diagrams that teams kept afterwards. The driver's laptop was the runtime for a nine-step process, and the plugin checks deterministically that each step produced its artifacts.

**Lessons**
Do not let the agent set up crons, since each one launches a new expensive session and burns the budget. Prompt caching was higher than expected. Benchmarks against recently written code as golden data showed Sonnet 5.5 wrote legacy code as well as or better than Fable. Next steps: stronger gate enforcement, better search over plain markdown context, and audio transcription of war room talk.

## Why it matters
- It moves the AI productivity question from coding speed to the outer loop of decisions and approvals in regulated firms.
- The split between replaceable vendor parts and irreplaceable company context, methods and judgment is a reusable design rule.
- FleetKit's research, human approval queue, then build sequence shows a cheap way to gate agent fleets with humans.
- It gives concrete cost lessons: runaway crons, prompt caching, and a second model matching Fable on golden data.

## Metadata
- Video: https://www.youtube.com/watch?v=DouK81O8R3o
- Duration: 18:43
- Playlist index: 1386
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> For the past couple years, feels like all we've been talking about is how to increase the velocity of our SDLC. Y'all know what I'm talking about. And specifically this big fat build chunk in the middle, okay? Where we've been doing a lot of our coding and intellectual work. And sure enough, at least where I work, that step has basically been obliterated, right? And we've reclaimed a bunch of time. But I think and I'm no prophet in imagining some future where agents are doing the work and humans are there in the middle as exec or as executives signing off on each stage. But I work at Geico and we're not a tech company, we're a risk management company and risk management is baked...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/DouK81O8R3o.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
