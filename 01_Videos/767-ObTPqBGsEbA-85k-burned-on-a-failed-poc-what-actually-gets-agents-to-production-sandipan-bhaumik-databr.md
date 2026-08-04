---
video_id: ObTPqBGsEbA
playlist_index: 767
title: "£85K Burned on a Failed PoC: What Actually Gets Agents to Production — Sandipan Bhaumik, Databricks"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ObTPqBGsEbA"
duration: "37:06"
duration_seconds: 2226
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ObTPqBGsEbA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-20T09:01:57+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Databricks' Sandipan Bhaumik details a 5-pillar framework (eval, observability, data, orchestration, governance) from a banking chatbot case where a prior 85K POC failed before a rebuild succeeded."
---

# £85K Burned on a Failed PoC: What Actually Gets Agents to Production — Sandipan Bhaumik, Databricks

## Summary
Sandipan Bhaumik, a Databricks technical lead for data/AI and former AWS principal architect, presents a five-pillar production framework - evaluation, observability, data foundation, orchestration, governance - built from client work, including a retail-banking chatbot case where a prior vendor burned 85K over six months on a POC that never reached production. His fix: an eight-week rebuild that deferred model selection to week seven, spending weeks one and two building an evaluation dataset (200 real human-agent responses) and defining numeric success criteria (60% query deflection, 85% accuracy), then adding a three-layer eval stack (deterministic regex/entity checks, LLM-as-judge for groundedness and safety, and "behavioral" checks for tool-call loops and duplicate API calls) before touching a model. Post-launch, tracing caught a real incident: a bank policy change wasn't reflected in the vector database's embeddings, causing stale chatbot answers and a CSAT drop that was only diagnosable because traces showed the agent citing an outdated policy document. He also describes Databricks' own stack for this (Delta Lake, Unity Catalog, Agent Bricks, MLflow LLM-judges), three multi-agent orchestration patterns (orchestrator-worker, choreography via message bus, human-in-the-loop), a "production incident playbook" (detect via eval dashboard, diagnose via tracing, contain via prompt rollback or circuit-breaker patterns, fix via the test-case library), and governance specifics like catching 47 PII breaches during testing and treating prompt changes as versioned, documented change management.

## Why it matters
- Provides a named, numbered case study (a failed six-figure-scale POC turned into a chatbot hitting defined 60%/85% targets) that grounds "AI to production" claims in a concrete before/after.
- Lays out a reusable three-layer eval taxonomy (deterministic, LLM-as-judge, behavioral) and a concrete incident (stale RAG embeddings after a policy change) that illustrates why observability and tracing are production requirements, not nice-to-haves.
- Documents specific governance mechanics (prompt versioning as change management, PII-breach counts, an incident playbook) that give operational detail on enterprise AI governance beyond generic "add guardrails" advice.

## Metadata
- Video: https://www.youtube.com/watch?v=ObTPqBGsEbA
- Duration: 37:06
- Playlist index: 767
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. Um, thank you for joining my session. >> [applause] >> Thank you, man. Uh, I'm Sandy. Uh, I'm a technical lead uh, for data and AI at Databricks. Um, prior to working in Databricks, I worked in Amazon Web Services uh, for 5 years as a principal architect for data and AI. Uh, in the past few years, I worked extensively uh, building and scaling data and AI platforms using distributed systems and technology. And in the past couple of years, specifically, I've been working with customers trying to figure out what we do with this new AI technology. Uh, when I say new AI, AI has been here for a long time, but we all started experimenting quite exponentially uh, in in the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ObTPqBGsEbA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
