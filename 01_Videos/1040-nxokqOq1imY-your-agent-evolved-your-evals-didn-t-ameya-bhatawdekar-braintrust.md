---
video_id: nxokqOq1imY
playlist_index: 1040
title: "Your Agent Evolved. Your Evals Didn't. — Ameya Bhatawdekar, Braintrust"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=nxokqOq1imY"
duration: "24:13"
duration_seconds: 1453
view_count: 484
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/nxokqOq1imY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:46+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Braintrust's Ameya Bhatawdekar traces agent architectures from single-prompt to RAG chains to ReAct loops to workflow graphs and back, arguing evals must evolve each shift, citing pass@k/pass^k."
---

# Your Agent Evolved. Your Evals Didn't. — Ameya Bhatawdekar, Braintrust

## Summary
Ameya Bhatawdekar, field CTO at Braintrust, walks through generations of AI agent architecture using a running example of an SRE agent with read and write tool access (it can roll back a deployment or page a human): single-prompt/single-model-call, then RAG-style chains, then ReAct-style reasoning-and-acting loops (following the React paper's popularity in late 2023/early 2024), then hand-coded workflow graphs and state machines built to compensate for unreliable tool calling, then back to ReAct loops once mid-to-late-2025 Anthropic and OpenAI models made tool calling and long-horizon planning reliable enough. He argues each architectural generation opens new failure surfaces that old evals don't cover, so evals must be rebuilt alongside the architecture rather than treated as static. Because the newer agentic loops show high trajectory variance for the same input, he introduces pass@k (does it succeed at least once in k runs, a capability measure) and pass^k (does it succeed in all k runs, a reliability measure) as the relevant statistical metrics. He describes Braintrust's "Topics" feature, which runs cluster analysis over production traffic to surface new, previously unanticipated failure modes that teams can then turn into eval cases.

## Why it matters
- Gives a concrete generation-by-generation taxonomy of agent architectures (single-call, RAG chain, ReAct loop, workflow graph, ReAct loop again) tied to specific model capability unlocks, useful for structuring an evals or agent-architecture chapter.
- Names concrete reliability metrics (pass@k, pass^k) for evaluating agents with high trajectory variance, plus a specific vendor mechanism (Braintrust's Topics clustering) for discovering unanticipated failure modes from production data.
- The single running SRE-agent example makes it easy to show, step by step, how eval surface area expands as orchestration moves from hard-coded logic back to model-driven reasoning.

## Metadata
- Video: https://www.youtube.com/watch?v=nxokqOq1imY
- Duration: 24:13
- Playlist index: 1040
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hello everyone. My name is Amaya Bhavadkar and I am the field CTO at Brain Trust. Uh Brain Trust is a eval observability platform that helps AI teams build and improve their AI with confidence. So, I'm sure all of you, if not, you know, I I'm sure everyone here has built some application over the last couple of years that has a model at the center of it, right? Some sort of a chatbot or a AI agent or some system that's doing batch processing using AI at the heart of it. And I'm sure all of you over that time span have done significant uh changes to that application. You have either rewritten that application entirely or you have like done some pretty complex surgery on your...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/nxokqOq1imY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
