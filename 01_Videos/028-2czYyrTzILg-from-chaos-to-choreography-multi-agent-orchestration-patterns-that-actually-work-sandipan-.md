---
video_id: "2czYyrTzILg"
playlist_index: 28
title: "From Chaos to Choreography: Multi-Agent Orchestration Patterns That Actually Work — Sandipan Bhaumik"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=2czYyrTzILg"
duration: "26:29"
duration_seconds: 1589
view_count: 26381
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/2czYyrTzILg.txt"
themes:
  - "Agent Architecture"
ingested_at: "2026-04-24T10:50:42+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sandipan Bhaumik, 18 years in data systems at AWS and now Databricks, argues that going from one agent to five is not adding features but building a distributed system, and most failures come from bad architecture, not bad AI. A credit-decisioning war story shows a stale cache giving the risk agent a 680 score instead of 750, which skewed 20% of risk ratings. He gives a decision framework for choreography versus orchestration, then four patterns: immutable versioned state snapshots, data contracts at each handoff, circuit breakers on every agent call, and saga-style compensation, mapped onto a Databricks reference architecture."
---
# From Chaos to Choreography: Multi-Agent Orchestration Patterns That Actually Work — Sandipan Bhaumik

## Summary
Sandipan Bhaumik ("Sandy") has spent 18 years building distributed data systems, first at AWS and now at Databricks, and the last two years deploying multi-agent systems in production. His thesis: engineers treat more agents like more features. "It's not. It's building a distributed system."

**The war story**
His team built a credit-decisioning system for a financial services company. The credit score agent ran two weeks in production with zero issues. Then they added income verification, risk assessment, fraud detection and final approval. Within three days, 20% of decisions had wrong risk ratings, and customers who should have been flagged were approved. It took two days to find the cause: the score agent wrote 750 to PostgreSQL, but the cache was not invalidated, so the risk agent read a stale 680 just 500 milliseconds later. "The race condition wasn't in the database, it was in the architecture."

**Why complexity explodes**
Five agents have at least ten potential connections, and each one is a failure point, race condition or sync problem. He calls it 25 times more complex, not five.

**Choreography versus orchestration**
- **Choreography**: agents publish and subscribe to events on a message bus. Loosely coupled and easy to extend, but debugging is "the nightmare". It needs strong observability and delivery guarantees. Teams that pick it because it "feels more agentic" spend months firefighting.
- **Orchestration**: a central coordinator calls each agent, runs parallel steps, holds state, retries and logs. "Agents are dumb." His financial services work uses it almost exclusively, for debugging and rollback.
- **Decision framework**: simple workflow and high autonomy means choreography; complex workflow and low autonomy means orchestration; complex and autonomous means a hybrid with saga compensation.

**State and contracts**
Shared mutable state causes lost updates. Teams rely on default isolation and skip explicit locks, as his team did. The fix is immutable, versioned state snapshots in an append-only log: each agent validates the incoming schema and inserts version N+1, never updating. A frozen Python class enforces it. This gives lineage, rollback to the last good version, and a way to "binary search" state history. Data contracts check each handoff; for example the analysis agent rejects research output with confidence below 0.7, so bad data fails at the boundary, not three agents downstream.

**Designing for failure**
- **Circuit breakers** on every agent call: open after repeated failures (for example five), fail fast, go half-open after about 60 seconds, then degrade gracefully with skipped steps, cached results or a human alert. He calls it the single most important recovery pattern.
- **Saga compensation**: each agent has execute and compensate methods; on failure the orchestrator walks back through completed agents in reverse order.

**Reference architecture on Databricks**
A LangGraph orchestrator wired into the Mosaic AI Agent Framework; agents as Unity Catalog functions or models; circuit-breaker policies at the serving layer via AI Gateway; state versions as rows in Delta tables; MLflow traces tying each run to a state version. His close: "Be a systems engineer."

## Why it matters
- The stale-cache story is a concrete, numbered case of a multi-agent bug that no prompt or model change could fix.
- The two-axis choreography-versus-orchestration framework gives a clear rule for picking a coordination style, with a warning against choosing choreography for its autonomy appeal.
- Immutable versioned state plus data contracts at handoffs is a transferable design that removes race conditions and makes debugging a search through versions.
- Circuit breakers and saga compensation bring proven distributed-systems recovery patterns into agent workflows, including in regulated industries.

## Metadata
- Video: https://www.youtube.com/watch?v=2czYyrTzILg
- Duration: 26:29
- Playlist index: 28
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]

## Transcript excerpt
> Hi everyone, I'm Sandy. I have spent 18 years building data systems, a major part of it focusing on building and scaling distributed data systems in the cloud. I've done it for multi-tenant systems for software and SaaS companies, and then for scaling data and AI platforms in regulated industries like financial services and healthcare. I've learned a great deal about production grade distributed systems while I have been working at AWS and now in Databricks. For the last 2 years, I've been deploying multi-agent AI systems in production. And I have watched brilliant engineers make the same mistakes over and over. They think adding more agents is just like adding more features. It's not. It's...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/2czYyrTzILg.txt]]
- Description cue: One AI agent is a feature. Fifty agents is a distributed systems problem nobody's discussing. I've seen this pattern: teams build one agent, then five, then drown in coordination problems unrelated...

## Book angles
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://drive.google.com/file/d/18LqVzhfVS3iULYuy2EshWoMLmQt3rdpT/view>
