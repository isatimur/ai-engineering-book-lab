---
video_id: khVX_BUnEwU
playlist_index: 912
title: "Active Graph Agent Runtime (BabyAGI 4) — Yohei Nakajima, Untapped Capital"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=khVX_BUnEwU"
duration: "17:34"
duration_seconds: 1054
view_count: 2300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/khVX_BUnEwU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:21:55+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Yohei Nakajima (Untapped Capital, creator of BabyAGI) presents ActiveGraph, an experimental open-source, event-sourced graph runtime for auditable agents. Instead of building around the LLM, he builds around one immutable typed event log that records both what the agent does and every change to the agent; the log projects a graph that is the agent's state. Behaviors react to graph changes and emit events, LLMs never talk to each other directly, and policies gate changes such as prompt edits. The payoff is native replay, rollback and forks, resumable long runs, and gated self-improvement loops that remember what failed."
---

# Active Graph Agent Runtime (BabyAGI 4) — Yohei Nakajima, Untapped Capital

## Summary
Yohei Nakajima, "VC by day, builder by night" at Untapped Capital, released BabyAGI in March 2023. It went viral and "didn't work at all." Nine iterations later, his research theme is still "the simplest thing that can build itself." ActiveGraph is his new experimental, open-source answer, described in his first arXiv paper, "the log is the agent." His opening premise: agents are awesome, but long-running agents break.

**Build around the log, not the LLM**
Most teams start with an LLM and add tools, memory and logging. What the agent does and how the agent changes usually live in two places; he flattens both into a single immutable, typed event log that is the ground truth. The log projects a graph, which is the agent's current state. He stresses that it is a runtime, not a harness: you can rebuild common harnesses on top of it.

**The building blocks**
- **Behaviors** subscribe to graph changes and emit events. A planner fires on "goal created" and adds research and write-memo tasks; a relation behavior on an unblock edge lets the memo start when research finishes. Subscriptions can be graph queries, for example run a contradiction detector when a new claim contradicts an existing one. Behaviors can be deterministic or call an LLM.
- **Views** do context management as a graph query: a behavior sees only a subset of the graph.
- **Policies** decide how the graph may change. Adding a source article may be free; editing a prompt may need a human; a new fact may need a no-contradiction check. Some changes require a proposed patch before approval.
- **Packs** bundle object schemas, tools and behaviors with a pack policy (core, tool, secret, memory, identity, communication, chat), so you can swap one memory pack for another.

The design borrows from blackboard architecture and Kafka: micro workers that share state instead of messaging each other. A ReAct agent becomes "on goal created, add a thought; on thought created, reason." Blackboard systems were hard to write and their workers were dumb; now AI writes the code and the workers can reason.

**Experiments**
- Log as memory on LongMemEval: embed the query, fetch matching log messages plus neighbours, no fact or entity extraction. It did "pretty well." When his API key died around question 350 of 500, the run resumed from question 353 instead of restarting.
- Reference coding and deep-research agents, built by asking Replit to use ActiveGraph, came with an event log and evidence graph for free.
- Controlled self-modification: classify each failure type, allow edits only to the matching part of the agent, fork, run static and sandbox gates, and accept only if accuracy rises on 50 questions. Loops ran 8 to 13 times and accepted four or five patches, for a modest but statistically significant LongMemEval gain.
- ActiveGraph Lab proposes and runs experiments, writes posts, and once fixed a bug in its own code.
- A Kaggle Pokémon deck competition: over about 80 passes, the agent turned casual asks into 200 simulated games against three reference agents with a statistical acceptance threshold, and accepted 20 to 30 changes. The key gain: it remembered what did not work.

**Surprises and hypothesis**
AI seems better at architecting these agents, perhaps because decades of blackboard and Kafka writing sit in the training data. Debugging moved from session logs to the ActiveGraph database. He argues that long-running agents need an "experiential world model" alongside a predictive one, like a hippocampus, so the harness will not disappear as models improve. An agent's identity may derive from its own log.

## Why it matters
- Treating the event log, not the message list, as the source of truth gives replay, rollback, forks and crash-resumable long runs without extra engineering.
- Policies as gates on graph changes give a concrete mechanism for safe self-modification: classify the failure, fork, test, accept only on measured gain.
- Recording failed experiments, not just successes, is what made his iterative agent loops cumulative instead of YOLO trial and error.
- The blackboard-style shared-state design is a real alternative to agent-to-agent messaging in multi-agent architecture.
- His counter to the claim that harnesses vanish as models improve is a useful position for any harness-engineering debate.

## Metadata
- Video: https://www.youtube.com/watch?v=khVX_BUnEwU
- Duration: 17:34
- Playlist index: 912
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hi everybody. Thanks for coming. I'm excited to be here. AI engineer warfare has been so fun meeting everybody. Um, but I'm here to talk about active graph, which is my new open-source experimental approach to building agents, which looks a little bit different than maybe you've been building agents. Uh, it's definitely experimental. The idea is more to give you inspire you with some potentially new ideas. Um, agents are awesome, but long-running agents break. And if they're so awesome, why am I still building them? Why they should build themselves. Let's build the simplest thing that can build itself has basically been kind of my research theme for the last 3 years since I did...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/khVX_BUnEwU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/yoheinakajima/activegraph>
