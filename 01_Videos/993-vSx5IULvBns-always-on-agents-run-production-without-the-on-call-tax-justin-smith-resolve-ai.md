---
video_id: vSx5IULvBns
playlist_index: 993
title: "Always-on agents run production without the on-call tax — Justin Smith, Resolve AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=vSx5IULvBns"
duration: "24:56"
duration_seconds: 1496
view_count: 2100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/vSx5IULvBns.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:00+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Justin Smith (Resolve AI) cites a 70% stat for time engineers spend running vs writing code, and demos background agents for deployment monitoring, health checks, and Slack first-response."
---

# Always-on agents run production without the on-call tax — Justin Smith, Resolve AI

## Summary
Justin Smith (Resolve AI), a former Splunk observability architect, cites a survey finding that roughly 70% of an engineer's time goes to running and operating shipped code rather than writing it — on-call, incident investigation, runbooks, hotfixes, escalations — and argues that AI-driven code velocity is increasing production complexity faster than teams can absorb it. He briefly describes Resolve's on-call/incident agents, then focuses on "background agents": always-on, sandboxed cloud agents triggered by schedules, event streams (e.g., CI/CD release tags), or Slack messages, backed by a persistent memory/learning system that accumulates understanding of a company's specific services over time. He demos four workload patterns: deployment monitoring that builds a custom per-release check plan instead of static CI/CD checks (e.g., watching checkout latency and a Kafka pipeline after a "checkout replaces currency service" change); scheduled health/anomaly checks; operational reports such as a recurring Thursday on-call handoff summary that the user can tell to be less verbose; and a Slack-based "first responder" agent that passively watches channels and DMs the user to confirm an uncertain answer before posting it. He frames a "task" as execution plus production context, arguing the latter — recognizing that a metric "smells off" — matters more than the ability to execute, and notes the same capabilities are exposed via MCP servers so they can be grafted into a team's own agent harness.

## Why it matters
- The cited 70%-of-time-on-operations stat is a citable (if third-party, survey-sourced) data point for grounding claims about where engineering effort actually goes once AI accelerates code output.
- The four named background-agent workload patterns (deployment monitoring, scheduled health checks, ceremonial handoff reports, passive Slack first-response) are concrete examples of agents that operate systems rather than write code — a distinct category from coding agents.
- The execution-vs-production-context framing, plus the emergent "agent DMs the human to confirm before replying" behavior, illustrate concrete trust/autonomy calibration choices in deployed production agents.

## Metadata
- Video: https://www.youtube.com/watch?v=vSx5IULvBns
- Duration: 24:56
- Playlist index: 993
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello. Hello. Everybody, welcome to this talk always on agents run production without the on-call tax. My name is Justin Smith. One of the founding product engineers at Resolve AI. Been in the space for about 15 plus years in the sort of monitoring, observability, how do you kind of operate production systems space. Was at Splunk for a while. Was one of the architects on the observability suite there. Spent a good 10 year at VMware. Really really enjoy like product design and front-end architecture. How do you How do you How do people experience a product or use case or something like that? That's the stuff I like to dabble in. Um but I want to talk a little bit about the first...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/vSx5IULvBns.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://resolve.ai/events/behind-the-build/agents-for-engineering-workflows>
