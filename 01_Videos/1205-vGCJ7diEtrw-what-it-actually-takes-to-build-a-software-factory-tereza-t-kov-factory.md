---
video_id: vGCJ7diEtrw
playlist_index: 1205
title: "What It Actually Takes to Build a Software Factory — Tereza Tížková, Factory"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=vGCJ7diEtrw"
duration: "22:49"
duration_seconds: 1369
view_count: 150000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/vGCJ7diEtrw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T16:53:54+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tereza Tížková of Factory defines a software factory as the whole autonomous software life cycle (signals, prioritizing, orchestrating, executing, validating, iterating, learning), not a swarm of coding agents, since writing code is the easy part. She sets three principles: agnostic (any tool, subscription or model, with a router that picks the cheapest model above a difficulty threshold), autonomous (missions where an orchestrator hands work to sequential workers and validators judge code they did not write, with validation taking 40% of a 16-hour run), and always improving (a deferred context engine, agent-readiness checks, plugins)."
---

# What It Actually Takes to Build a Software Factory — Tereza Tížková, Factory

## Summary
Tereza Tížková works at Factory, which she says builds software factories in production for enterprises such as EY and Adobe. Her definition: the whole software life cycle run with autonomy. That means collecting signals from user feedback and logs, prioritizing, orchestrating, executing, validating, testing in production, and iterating, while the factory keeps learning. Early 2023 attempts at continuous agent loops failed on hallucination, short context, weak reasoning and no isolated environments. She defines the factory by what it is not: not a coding agent, not even thousands of them, because "writing code, that's the easy part." It is also not a consultancy project dropped into an org; she argues for rebuilding the organization from the ground up. Her three principles: agnostic, autonomous, always improving.

**Agnostic**
Work across Slack, GitHub and existing tools, let people bring their own subscriptions, and stay independent of models, since nobody can predict which model will win. She cites a chart from Coinbase's CEO showing AI cost falling while token use kept rising, through cheaper default models, caching, results-based spend review and routing. Factory's automatic model routing has four parts: assign the task; apply per-team defaults and permissions; classify difficulty from the prompt, codebase and tools; then pick "the cheapest model above the threshold." It can upgrade mid-task if a model fails, and switch providers during outages. Open models are often faster. A conservative benchmark shows about 25% savings. Caching works for self-hosted open models too, so passing on cache discounts is "a pricing decision," not a technical one.

**Autonomous**
Loops are not new; the hard question is how to define "done" when tasks are open-ended. Agents can cheat by passing tests without meeting the goal. Factory's "missions" run for weeks. An orchestrator writes a "validation contract" before any code exists, then hands work to workers that run in sequence, not in parallel, for fresh context, each with their own sub-agents. Validators review code they did not write. A scrutiny validator checks linters, types and tests. A user-testing validator clicks through the app in a virtual machine. In one migration it caught a result that looked right in code but was not interactive. In one 16-hour customer mission, validation took 40% of the time.

**Always improving**
Enterprises use hundreds of tools, and their schemas bloat context and cause wrong tool picks. A "deferred context engine" shows short tool descriptions first and loads full ones only when needed; nothing is removed, only hidden. She claims 50% or more token savings at scale. AI adoption follows a power law: without a structured, documented codebase, AI can make code worse, and she cites Stanford data on this. Factory's agent-readiness check scores reproducible dev environments, tests, docs, style and linters, then recommends fixes. Plugins package skills and unwritten team context, and an auto-documentation feature keeps docs current.

**Humans move up**
She expects people to move up a level, as before from human computers to programming languages to coding agents: humans decide what to build, agents decide how. AI will take the annoying alignment and status-sync work.

## Why it matters
- Gives a concrete, testable definition of a software factory that excludes swarms of coding agents.
- Describes a model router in detail: per-team defaults, difficulty classification, cheapest model above threshold, and upgrade or provider failover.
- The mission design (validation contract written first, sequential workers for fresh context, validators that did not write the code) is a reusable pattern for long-running agents.
- The 40% validation share and the user-testing validator that clicks through the app show where the cost of reliable autonomy actually goes.
- Deferred tool loading and agent-readiness checks are practical answers to context bloat and to codebases that are not ready for agents.

## Metadata
- Video: https://www.youtube.com/watch?v=vGCJ7diEtrw
- Duration: 22:49
- Playlist index: 1205
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Uh hi everyone. Hey what's up? I'm Teresa. Uh and today I will be talking about software factory. uh everyone is talking about software factory but only few people are actually building one and even fewer people know what it actually takes to build one and how to define it. So I will be talking about what is a software factory, should I build your own or outsource it, what works in production already, what are the main challenges and how much is this all going to cost? Uh my name is Theresa. I work at a company called factory.com and we've been building uh this concept of the software factory for quite a long time but finally uh the technology is catching up and it's possible to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/vGCJ7diEtrw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
