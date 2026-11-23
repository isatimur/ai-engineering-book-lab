---
video_id: "UcW_s4BmuD0"
playlist_index: 377
title: "The Demo I Wish I'd Had: OpenAI's Agents SDK... serverless! - Brook Riggio"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UcW_s4BmuD0"
duration: "17:51"
duration_seconds: 1071
view_count: 3876
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/UcW_s4BmuD0.txt"
themes:
  - "MCP & Tooling"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:15:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Brook Riggio, a technology partner who runs production AI workloads, picks one working stack out of the 'at least 42 million combinations' of client app, agent framework, orchestrator, and serverless host: Next.js on Vercel, OpenAI's Python-only Agents SDK as Vercel Python functions, and an event-driven step orchestrator with retries and step-level observability. His open-source newsletter demo splits work into steps (research agent, formatting agent, save to blob storage) so each fits within a cloud function time limit. He warns that LLMs do not know how to wire this stack and that code outside a step may run more than once."
---
# The Demo I Wish I'd Had: OpenAI's Agents SDK... serverless! - Brook Riggio

## Summary
Brook Riggio is a technology partner who has run production AI workloads in full-stack serverless setups. He asks the "question of 2025": how do we deploy "zero ops resilient" agent-powered apps? Every app needs a client, an agent framework, an orchestration layer, and a serverless host, and each layer has many options. He gave this talk because he struggled to make one combination work in production, and because LLMs give code that "might kind of work": there is little reference code for any given stack in the training data.

**His chosen stack**
- Client: Next.js, for built-in streaming, server actions, file-based nested routing, and deep integration with Vercel hosting.
- Agent framework: OpenAI's Agents SDK, for native tool calling, multi-agent calls, built-in tracing and eval hooks, OpenAI backing, and the ability to swap models.
- Orchestration: an event-driven service (captioned as "ingest") with no state-machine JSON, on-demand execution with no warm servers, automatic retries, step-level observability, and a one-click Vercel integration.
- Host: Vercel, for preview deployments on every push, an edge network and CDN, and integrated database options from Postgres to blob storage.

**Architecture**
The user hits the Next.js app, which checks the database for cached or finished work. If new work is needed, it sends an event to the orchestrator. The orchestrator calls Python serverless functions where the agents run. The Agents SDK is Python-only, but Vercel detects Python and hosts it automatically. Results return to the orchestrator, get cached, and the front end picks them up.

**The newsletter demo**
The open-source repo generates a newsletter from comma-separated topics (he uses AI engineering and Seattle). Local development needs three terminals: Python agents, Next.js, and the orchestrator's dev server. The page polls Vercel blob storage while the orchestrator dashboard shows each step: research agent, formatting agent, save to blob. Each step can run for the full cloud function limit, which he recalls as about a minute on the free plan and more on pro, so splitting the task into steps buys time. The agents sit in a FastAPI app in a top-level `api` directory, which Vercel serves as independent functions with no `vercel.json`. He says he "went in circles" with the LLM over this before finding it.

**Practical gotchas**
- He defines every step at the top of the workflow and calls functions defined below, so the high-level orchestration reads clearly, with type checks between steps.
- Each `step.run` runs in order, but code outside `step.run` may execute multiple times as the orchestrator replays the function. Watch for duplicated side effects.
- Deployment needs only two environment variables: an OpenAI API key and a blob storage token. The Vercel CLI can pull production variables to run locally, and build logs show the agents deployed as a Python 3.12 function.

## Why it matters
- A worked reference for a problem the speaker says LLMs cannot yet solve alone: wiring a full-stack, serverless agent app end to end.
- Shows step decomposition as the way to fit long agent work inside serverless time limits, with retries and observability per step.
- The replay warning (code outside a step can run more than once) is a concrete durable-execution pitfall worth teaching.
- Illustrates a polyglot pattern: a TypeScript front end and orchestrator calling Python-only agent code as serverless functions.

## Metadata
- Video: https://www.youtube.com/watch?v=UcW_s4BmuD0
- Duration: 17:51
- Playlist index: 377
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Agent Architecture]]

## Transcript excerpt
> What does full stack AI engineering even look like today in the serverless environment? Let's talk about it. My name is Brook Riio. I'm a technology partner with thrive.com and excited to share with you some things I've learned about running production AI engineering workloads in a full stack and serverless environment. So let's dive in. The question of 2025 is how do we deploy zero ops resilient agentpowered user ready apps today? How do we make it happen to get a agentic workflows into the hands of users as AI engineers? This is what uh our job is. This is our goal. Let's think about how we do this in a modern way. There are of course so many options. We are uh overwhelmed with different...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UcW_s4BmuD0.txt]]
- Description cue: Deploying and orchestrating significant AI workflows on serverless platforms like Vercel presents unique infrastructure challenges, like managing time limits and persistent state, handling...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/brookr/serverless-agents>
