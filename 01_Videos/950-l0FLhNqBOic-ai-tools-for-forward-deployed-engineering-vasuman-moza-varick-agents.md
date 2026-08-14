---
video_id: l0FLhNqBOic
playlist_index: 950
title: "AI tools for Forward Deployed Engineering — Vasuman Moza, Varick Agents"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=l0FLhNqBOic"
duration: "20:23"
duration_seconds: 1223
view_count: 6200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/l0FLhNqBOic.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:20+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Varick Agents' Vasuman Moza and JD Pruitt describe an internal FD agent that helps forward-deployed engineers map client workflows via a dependency graph and post-trained models instead of frontier-model calls."
---

# AI tools for Forward Deployed Engineering — Vasuman Moza, Varick Agents

## Summary
Vasuman Moza, of Varick Agents, argues that AI coding agents and MCP tooling have solved execution, so the remaining bottleneck for enterprise AI adoption is understanding how a specific business actually works — including its undocumented exception paths — and re-engineering the workflow around AI before automating it. He cites the MIT finding that 95% of generative-AI pilots fail to reach production (and a separate 87%-no-measurable-ROI figure) as evidence that AI bolted onto broken processes doesn't deliver value, and notes a client that spent $5,000,000 and five years migrating to NetSuite as the reason Varick builds agents on top of existing systems of record (NetSuite, Dynamics, SAP, Salesforce) rather than asking enterprises to migrate off them. He claims department-wide transformations return 25-50-75% ROI versus 5-10% for single-point-solution automations. Engineering lead JD Pruitt then describes their internal "FD agent," built in three stages — an engagement assistant that synthesizes client documentation and notes, a workflow agent embedded in their platform that flags missed edge cases while FDEs build workflows, and a not-yet-shipped autonomous change agent — all backed by a dependency graph as the single source of truth for a client's processes. Pruitt says frontier models like Claude were too verbose for concise, consultant-style analysis, so the team post-trained smaller open-source models and built a custom RL environment with tools for tasks like resolving duplicate-name entities and detecting cycle violations in the dependency graph.

## Why it matters
- Reframes the FDE bottleneck explicitly as business-process understanding rather than execution, with cited failure-rate statistics (95% of pilots not reaching production) that ground the "AI on broken processes doesn't work" argument.
- The NetSuite migration anecdote ($5M, 5 years) is a concrete, quotable illustration of why enterprise AI vendors build on top of systems of record instead of requiring migration.
- Documents a specific architecture choice — post-training smaller open-source models plus a custom RL environment for graph traversal, rather than calling frontier models directly — motivated by frontier-model verbosity on internal analysis tasks.

## Metadata
- Video: https://www.youtube.com/watch?v=l0FLhNqBOic
- Duration: 20:23
- Playlist index: 950
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right, first and foremost, thanks so much for being here. Um it's uh been a great experience, you know, obviously chatting amongst uh other industry giants like Cursor and Factory and Anthropic. I'm sure you guys are mostly here for them, but thanks for sticking around for this talk. Uh my name is Varick. I'm the CEO of Varick Agents. We work with some of the largest companies on the planet transforming them from the inside out with uh AI and agents. Um and because of the nature of our work, which is highly bespoke, we go very deep into our clients. It requires a lot of forward-deployed engineering. And this conversation is around why that's so important, how we approach it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/l0FLhNqBOic.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
