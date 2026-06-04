---
video_id: "flf_IKnFYnE"
playlist_index: 99
title: "From Stateless Nightmares to Durable Agents — Samuel Colvin, Pydantic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=flf_IKnFYnE"
duration: "22:13"
duration_seconds: 1333
view_count: 12860
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/flf_IKnFYnE.txt"
themes:
  - "Agent Architecture"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:22:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Samuel Colvin (Pydantic) demonstrates Pydantic AI's Temporal integration and the case for durable execution in agent workflows. The core demo: a two-agent '20 questions' game — isomorphic to deep research — shows agents surviving process kills and resuming via Temporal event sourcing. Key insight: Temporal replays already-completed activities instantly (from its event log), so resumed agents zoom forward to the crash point without re-running LLM calls. Also covers Pydantic evals for benchmarking model performance across agent tasks."
---
# From Stateless Nightmares to Durable Agents — Samuel Colvin, Pydantic

## Summary

Samuel Colvin demonstrates Pydantic AI's integration with Temporal (and Dagger), making the case for durable execution through a live demo rather than argument.

**The demo structure:** Two agents play a modified 20 questions game — one answers yes/no/kind of, the other guesses. Colvin notes this is directly equivalent to deep research: the agent iterates through intermediate steps (tool calls) to converge on an answer, exactly like a web-research agent iterates through search queries. The toy surface makes the durability mechanics visible.

**Without Temporal:** If the process dies partway through — Kubernetes scaling event, flaky endpoint, anything — you restart from scratch. For a 50-step game, that's manageable. For a deep research agent with 200 web searches, it's catastrophic.

**With Temporal:** Temporal records every activity's inputs and outputs to an event log. When a worker picks up a previously-interrupted workflow, it replays the log. Already-completed activities return their cached results in ~5ms rather than re-executing. The agent "zooms forward" to the crash point at procedural speed, then continues live. In Colvin's demo: he kills the process at question 6, restarts, and the agent resumes at question 6 with no application-level recovery code whatsoever.

**Important implementation detail:** OpenAI claims Temporal support in their Agents SDK, but Colvin notes they don't support tool calls as Temporal activities — meaning the most important non-deterministic operations (LLM tool invocations) aren't recorded. He describes this as "a chocolate teapot." Pydantic AI's integration wraps tool calls as activities, which is what makes resume actually work in multi-step agents.

**On adding durability retroactively:** You can apply Temporal to an existing Pydantic AI agent without rewriting agent logic — add the `TemporalAgent` wrapper, define the workflow, connect to a Temporal server. The agent code itself is unchanged.

**Also covered:** Pydantic Evals — a lightweight eval framework integrated into Pydantic AI. Colvin ran evals on different models (Claude Haiku 3.5, etc.) to compare performance on the 20 questions task, showing the framework gives you a clean way to benchmark model choices against real agent tasks rather than synthetic benchmarks.

## Why it matters

This is the Pydantic-native complement to Cornelia Davis's Temporal talk. Together they establish that durable execution is not a Temporal-specific concern — it's a pattern that multiple frameworks are independently converging on, because the problem (long-running agents on unreliable infrastructure) is real and universal. Colvin's "chocolate teapot" critique of shallow Temporal integrations is also a useful quality signal: not all durability claims are equal.

## Metadata
- Video: https://www.youtube.com/watch?v=flf_IKnFYnE
- Duration: 22:13
- Playlist index: 99
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]

## Key claims (for claims ledger)
- A multi-step agent workflow (20 questions, deep research) is structurally identical — the demo is not a toy, it's the real pattern made visible.
- Temporal event sourcing lets a resumed agent skip already-completed activities in ~5ms instead of re-running them.
- OpenAI's Temporal integration doesn't cover tool calls as activities — making it insufficient for real durable agents.
- Pydantic AI can add Temporal durability to an existing agent without changing agent logic.
- Pydantic Evals provides agent-native benchmarking that tests real task performance, not synthetic metrics.

## Book angles
- Chapter 4 (durable runtime) — strong complement to Cornelia Davis #38; establishes convergent multi-framework evidence.
- Chapter 5 (evals) — Pydantic Evals as a lightweight eval framework, especially for structured-output agent tasks.
- Chapter 7 (reliability) — the "chocolate teapot" critique as a quality signal for evaluating durability claims.
