---
video_id: "kmV-qg4uoNI"
playlist_index: 44
title: "Building durable Agents with Workflow DevKit & AI SDK - Peter Wielander, Vercel"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kmV-qg4uoNI"
duration: "1:09:49"
duration_seconds: 4189
view_count: 8038
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/kmV-qg4uoNI.txt"
themes:
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: "2026-04-24T10:51:23+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Peter Wielander (Vercel) live-codes Vercel's open-source Workflow DevKit, which solves the gap between an agent that works locally and one that survives production. His core argument: long-running agents on serverless fail silently because there is no durable execution layer — every step's output is lost if the function times out. The DevKit adds three things: step-level caching and retry (if a step has completed its output is replayed, not re-executed), resumable streams (lose connection, reconnect, pick up mid-generation), and a `sleep` / `webhook` primitive that suspends the workflow — consuming zero resources — until a timer fires or a human clicks a URL. The surprising demo: a workflow that woke up and resumed after a human clicked an approval link, enabling native human-in-the-loop without polling or database state management."
---
# Building durable Agents with Workflow DevKit & AI SDK - Peter Wielander, Vercel

## Summary
Peter Wielander from Vercel leads a live-coding workshop introducing the open-source Workflow DevKit, a TypeScript library for building durable, production-grade AI agents. The session converts a barebones vibe-coding agent (Next.js + Vercel AI SDK + E2B sandbox) into one that survives serverless timeouts, dropped connections, and human approval gates — without adding queues, a database, or custom retry logic.

**The production problem the DevKit solves**
A local coding agent works by holding all state in memory inside a long-running process. In production on serverless, the function times out (typically 5–15 minutes depending on platform), the state is gone, and the agent fails silently. The standard workaround — adding queues and a database — is boilerplate that every team reinvents. The DevKit handles it with two annotations: `"use workflow"` (marks the orchestration function as deterministic/re-entrant) and `use step` (marks individual tool calls or LLM calls as cacheable execution units).

**How it works**
The workflow orchestration layer is compiled into a separate bundle that must be deterministic. When the orchestration function re-runs after a serverless restart, it replays cached step outputs rather than re-executing them. Only steps that haven't yet completed actually run. This means:
- An agent that timed out mid-task will resume exactly where it left off after restart.
- The same code behaves identically locally and in production — the local dev server uses files as the persistence layer, production uses Redis or a provider's durable store.
- A `workflow web` CLI command provides the same observability UI locally and against a production deployment.

**Resumable streams**
The stream is no longer bound to the API handler. When a client disconnects and reconnects, it can call a separate `/chat/:id/stream` endpoint with the workflow run ID to resume from a specific stream chunk. The stream continues even if the API handler that started it has already completed or terminated.

**Sleep and human-in-the-loop**
`sleep(duration)` inside a workflow suspends the entire execution and consumes zero compute for the sleep period. Combined with webhooks (`createWebhook()`, `await webhook`), this enables agents that wait for an external event — a human clicking an approval URL, a cron interval, a GitHub webhook — and resume immediately when that event fires. Wielander demo'd an agent that paused, displayed an approval link in the UI, and resumed building a Pokédex when the link was clicked.

**Scaling properties**
Every workflow runs in its own serverless instance; there is no practical concurrency limit. Workflows are tied to a specific deployment, so a long-running workflow that spans multiple deploys continues on the old deployment version. An upgrade mechanism (checking step-signature compatibility) allows migrating a live workflow to a new deployment.

**The step timeout caveat**
Individual steps are still subject to serverless timeouts. A step that runs longer than the platform limit will fail and retry. The solution is to split it into two steps. The observability UI makes this visible, showing repeated retries on the same step.

## Why it matters
- The DevKit makes durable execution — previously requiring Temporal, Inngest, or custom queue infrastructure — available as two TypeScript annotations and a single npm package.
- The `sleep` + `webhook` primitives provide a native human-in-the-loop mechanism that doesn't require polling or external state management.
- Resumable streams solve a real UX failure mode (page refresh kills a long generation) without any client-side tricks.
- The deploy isolation model (workflows stay on the deployment that created them) is an important production constraint to understand before building long-running workflows.

## Metadata
- Video: https://www.youtube.com/watch?v=kmV-qg4uoNI
- Duration: 1:09:49
- Playlist index: 44
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[MCP & Tooling]]

## Transcript excerpt
> Thank you all for coming. Hello. Hello. >> Got you. Uh, I don't know about you, but um, my ride agents, I like focusing on the capabilities and the features, and I like not thinking about um, all of the extra effort that goes into getting something that works locally into production. And something that's very useful for that is uh, a workflow pattern. And that's why we developed the workflow def kit which is what we're talking about today. Presumably if you're here you've had similar issues. Um and today uh we are going to um turn a agent uh coding agent um into a workflow supported coding agent throughout this session. So this slide. So we um have a open- source example um ready to go. Uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kmV-qg4uoNI.txt]]
- Description cue: Learn to build and deploy AI agents using Vercel's new open source Workflows platform.

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
