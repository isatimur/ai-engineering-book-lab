---
video_id: iOXM3zE-2dk
playlist_index: 680
title: "Mind the Gap (In your Agent Observability) — Amy Boyd & Nitya Narasimhan, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=iOXM3zE-2dk"
duration: "1:20:07"
duration_seconds: 4807
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/iOXM3zE-2dk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:04:06+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Amy Boyd (Microsoft Foundry developer relations lead) and Nitya Narasimhan (observability specialist) run an 80-minute hands-on workshop on agent observability using Microsoft Foundry. Their core claim: agents are non-deterministic not just in demos but in production, and teams need three interlocking practices — evaluate, monitor, and optimize — to manage that. They walk through per-step evaluation (intent resolution → tool call → response), trace-linked evaluations that let you jump from a failing metric directly to the offending trace step, and red-teaming via Microsoft's PyRIT integration. A surprising angle: they treat future 'fleet management' — observing hundreds of multi-agent systems across an organization — as nearly present-day, not a distant concern."
---

# Mind the Gap (In your Agent Observability) — Amy Boyd & Nitya Narasimhan, Microsoft

## Summary

Amy Boyd leads Microsoft Foundry developer relations; Nitya Narasimhan specializes in observability. Their workshop — structured as a four-hour curriculum compressed into ~80 minutes — uses the London Underground "Mind the Gap" sign as a running analogy: the gap between what an agent does and what your requirements say it should do is exactly what observability closes.

### The three-practice framework

Boyd opens with a sharp framing: non-determinism is not just a demo problem. When agents reach production customers, the variability of their behaviour becomes a reliability and trust issue. She organizes the response into three practices:

- **Evaluate**: run evaluators at build time and throughout the agent lifecycle to catch quality and safety regressions early.
- **Monitor**: continuous observation across changing models, customers, and environments — not just during development.
- **Optimize**: take the data you collect and act on it; surfacing scores without a clear improvement path is insufficient.

### Per-step evaluation along the agent workflow

Narasimhan introduces a weather-agent example to show that evaluation isn't a single end-of-pipeline score. The same agent run can be evaluated at three distinct points: (1) **intent resolution** — did the agent correctly parse what the user wanted?; (2) **tool call quality** — was the right tool called with the right arguments?; (3) **final response** — did the output meet task-adherence criteria? Task adherence, she notes, is typically the metric that needs tuning over time. Microsoft Foundry provides built-in evaluators for quality, risk, and safety, but custom evaluators can be layered in where built-ins fall short.

### Trace-linked evaluations

A key insight from Narasimhan: evaluations only become powerful when they are linked to traces. When a metric drops — say, tool-call selection degrades after a model swap — the engineer can navigate directly from the failing score into the specific trace step where the wrong tool was called. Without that link, you know something is wrong but not where. The Foundry portal makes this linkage automatic; the workshop shows how to replicate it in code via OTEL-based tracing.

### Multi-agent observability and fleet management

The session escalates to multi-agent traces, noting that debugging them is "exponentially more difficult" than single-agent traces. The presenters preview a fleet-management view that aggregates observability across all agents in an organization's control plane — a capability they frame as near-term rather than speculative. Red-teaming is treated as a first-class concern: Microsoft collaborates with the PyRIT open-source project and offers one-click red-teaming in Foundry.

### Workshop structure

Participants fork a GitHub repo containing four labs (simple agent → add tools → multi-agent workflow with tracing → evals → red teaming). The repo is maintained with evolving workshops; participants are directed to the AI Engineer Discord channel on Microsoft Foundry for ongoing support.

## Why it matters
- Demonstrates a concrete per-step evaluation pattern (intent → tool call → response) that maps directly to any agentic workflow.
- Trace-linked evaluations are underused; the talk gives a reproducible implementation path via OTEL + Foundry.
- Fleet-level observability across many multi-agent systems is treated as imminent, not speculative — useful for chapters on production-grade agent infrastructure.
- Red-teaming framed as integral, not optional, with an open-source path (PyRIT) for teams not on Azure.

## Metadata
- Video: https://www.youtube.com/watch?v=iOXM3zE-2dk
- Duration: 1:20:07
- Playlist index: 680
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone, welcome. Thank you for joining us this morning. Um, my name is Amy Boyd. I lead our foundry developer relations team at Microsoft. I'm joined by my colleague Nitia on the team who is an absolute expert in observability. And today we thought we'd have a nice catchy title uh given where we are in London of Mind the Gap in your agent observability. We'll talk a little bit through what we actually mean by mind the gap because it's got a deeper reason than just the nice sort of uh title there, but also we'll start going through some really interesting stuff and you'll have a load of assets to take away with you as well. Um this area is there's a lot there's so much to cover in the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/iOXM3zE-2dk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
