---
video_id: "1izYWsokr9s"
playlist_index: 167
title: "Scaling AI Agents Without Breaking Reliability — Preeti Somal, Temporal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1izYWsokr9s"
duration: "15:01"
duration_seconds: 901
view_count: 3231
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/1izYWsokr9s.txt"
themes:
  - "Evals & Reliability"
  - "Agent Architecture"
ingested_at: "2026-04-24T11:42:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Preeti Somal (Temporal engineering team) makes the case that AI agents are complex distributed systems and should be treated as such, not as glorified switch statements. Key claims: Temporal has been in production for over a decade, Python SDK overtook all other languages in January, and one customer (Gorgeous, doing customer service for Reebok/Glossier/Timbuktu) runs agents in production at scale on Temporal today. The architectural pitch: wrap agent orchestration loops and tool calls in Temporal workflows and activities so retry logic, state management, and execution history are handled by the platform — not scattered across your application code. Cited velocity impact: 6x faster feature delivery for one customer after adopting Temporal."
---
# Scaling AI Agents Without Breaking Reliability — Preeti Somal, Temporal

## Summary
Preeti Somal opens with a rhetorical reality check: how many in the room have called an LLM and had it succeed 100% of the time? Nobody raised their hands. This is the foundation of her argument — agent reliability is not a solved problem, it's a distributed systems problem that Temporal was built to address.

### The Problem Statement
Agents are complex distributed systems. They need to:
- Orchestrate multiple processes, sometimes over long time horizons
- Handle inherent LLM unreliability (failed calls, timeouts, partial outputs)
- Manage state across interactions
- Support human-in-the-loop approvals
- Run tool calls in parallel
- Be debuggable after the fact

The debugging point is notable: insight into what an agent actually did has been "incredibly difficult" to get, especially in pre-production testing.

### Temporal's Architecture Model
Temporal abstracts the "plumbing code" — all the retry logic, error handling, and state management that developers otherwise scatter throughout their application. The core abstraction is a **workflow** (the orchestration logic, including interactive LLM loops, human approvals, signals from external systems) and **activities** (individual tool calls and LLM invocations, wrapped so Temporal handles failures transparently).

The workflow history is a complete, exportable record of every action the agent took — useful both for debugging and compliance.

### Production Evidence
- Customer Dust is building agents on Temporal.
- Gorgeous runs AI agents for brands like Reebok, Timbuktu, and Glossier; cited directly for agents running at production scale.
- Temporal has been deployed in mission-critical applications for over a decade.
- One customer cited 6x faster feature delivery velocity after adoption.
- Python SDK overtook all other languages in new Temporal usage in January (reflecting Python's dominance in AI engineering).

### Workflow Architecture for Agents
Temporal maps cleanly onto the standard agent loop:
- **Workflow**: defines the orchestration, interactive loops, and state
- **Signal**: how external events (user input, webhook responses) enter the workflow
- **Query**: read current workflow state without affecting it
- **Activities**: tool calls (LLM providers, APIs, databases) — retried automatically on failure

Ticket booking demo (also live at booth): user messages routed via signals, LLM validates inputs, tools wrapped as activities, full interaction history stored in workflow history.

### Concision
The worker code (your business logic) runs in your own environment inside your existing CI/CD. Temporal Cloud handles execution state, call stack, failure tracking, and scaling. Developer workflow: write business logic → let Temporal handle reliability.

## Why it matters
- Temporal's workflow/activity pattern provides a concrete template for making agent tool calls reliably retryable without bespoke error handling.
- Exporting workflow history for compliance or debugging is a capability most home-built agent orchestration doesn't provide.
- The Python-first stat reflects the broader ecosystem shift; Temporal meeting developers where they are matters for adoption.
- The "build an agent in weeks, not months" productivity claim has named customer evidence behind it (Gorgeous, Dust).

## Metadata
- Video: https://www.youtube.com/watch?v=1izYWsokr9s
- Duration: 15:01
- Playlist index: 167
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Agent Architecture]]

## Transcript excerpt
> [Music] Uh my name is Prii and I am part of the engineering team at Temporal. How many people here have heard of Temporal? Perfect. Great. So Temporal is the company that takes reliability incredibly seriously. so seriously that our mascot is a tardigrade. Does anybody know what a tardigrade is? Yes, some folks. Well, it is what is also called a water bear and is the most resilient animal known to humankind. And so that's how seriously we take reliability. Definitely stop by our booth for some stickers and some pins to just show how much you care about reliability. All right. So, my goal in the next 17 minutes or so is to convince all of you that temporal is the right choice of platform as...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/1izYWsokr9s.txt]]
- Description cue: As AI agents move from prototypes to production, developers are running into new challenges with orchestration, failure handling, and infrastructure. This session will unpack lessons from teams...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Agent Architecture**.
