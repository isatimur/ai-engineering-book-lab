---
video_id: "_-oIuRH4oGA"
playlist_index: 375
title: "How agents broke app-level infrastructure - Evan Boyle"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_-oIuRH4oGA"
duration: "13:32"
duration_seconds: 812
view_count: 575
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/_-oIuRH4oGA.txt"
themes:
  - "MCP & Tooling"
  - "Models & Inference"
ingested_at: "2026-04-24T12:15:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Evan Boyle, founder and CEO of GenSX, argues that agents broke the compute assumptions of web 2.0: requests now take seconds to hours, model providers have correlated outages and bursty rate limits, and full-stack AI engineers end up as data engineers. Common serverless platforms time out after about five minutes and lack native streaming. His answer, open-sourced as GenSX, is a React-inspired 'anti-framework' of idempotent, testable components with retry and error boundaries and tracing, deployed on a platform that splits the API layer from a stateless compute layer and routes all status and output through a resumable stream."
---
# How agents broke app-level infrastructure - Evan Boyle

## Summary
Evan Boyle is the founder and CEO of GenSX and has spent his career on cloud and developer tools. His thesis: the infrastructure built for the last ten years of the web does not fit agent workloads, and the compute layer is where it breaks first.

**The journey every AI engineer takes**
You start with a prompt and a few tool calls. Then you build workflows: chain tailored, evaluated prompts and control context to make as much as possible deterministic, and runtime grows from 30 seconds to minutes. Then you "accidentally become data engineers", because the hardest part is getting context into prompts: crawling an inbox, ingesting GitHub code, with lots of LLM processing.

**Broken assumptions**
- Web 2.0 requests returned in tens of milliseconds. In AI apps a couple of seconds is the best case, and only with a fast model or a prompt cache. In the old world a multi-second request paged on-call.
- Providers are unreliable. He shows a status Slack channel with an outage that keeps coming back overnight, doubts a 99.9% uptime figure, and notes that failing over to Gemini would not have helped: it had an outage in the same window.
- Rate limits bite on bursty traffic such as batch document processing or onboarding new customers, and high tiers need thousands of dollars of spend.

**Why existing tools do not fit**
Queues like SQS, Airflow, and durable execution engines like Temporal exist, but Boyle is a TypeScript full-stack developer who would rather use serverless. Most serverless providers time out after five minutes, some limit outgoing HTTP, and none treat streaming as native. Long tasks need resumability because users refresh the page.

**Two product experiences**
Onboarding: the user enters a URL, one LLM call finds pages to scrape, then hundreds of LLM calls run in the background while the user starts using the product and sees enrichment progress. Waiting ten minutes would raise funnel drop-off. Content generation: a blog-post agent shows research, outline, and section steps over 3 to 4 minutes. His team avoided workflows longer than five minutes because migrating off their serverless provider took deep infra work, which slowed experiments.

**The GenSX design**
- A component model inspired by React, applied to the backend: "abstraction is bad when building agents," so share, compose, and reuse. Components are reusable, idempotent, independently testable steps; workflows are collections of components.
- A wrapped OpenAI SDK with the same surface plus retries and tracing. Each component gets a retry and error boundary, nested traces show tokens and messages, and a fluent API adds exponential retry policies and caching.
- Each workflow becomes REST APIs for sync and async calls, with endpoints for intermediate and final output streams.
- The API layer passes the compute layer a stream ID and never talks to it again. Status, output, and heartbeats flow through the stream, so background monitors can restart crashed runs. Compute is stateless and pluggable (ECS by default, or bring your own), and users can refresh or navigate away without losing history.

**Lessons**
Start simple but plan for long-running agents, as coding agents and deep research suggest. Keep compute and API planes separate. Take care deploying hour-long workflows: drain workers and use blue-green patterns. "Easy to get started, but very hard to get this right."

## Why it matters
- Names the latency, reliability, and rate-limit gap between web-era infra and agent workloads with concrete examples, including correlated outages that defeat naive provider failover.
- The API/compute split with a single stream as the source of truth is a reusable architecture for resumable, refresh-safe agent UIs.
- Shows how serverless timeouts quietly shape product decisions: the team avoided workflows over five minutes because of their platform.
- Treating each agent step as an idempotent component with its own retry boundary and trace is a practical reliability pattern.

## Metadata
- Video: https://www.youtube.com/watch?v=_-oIuRH4oGA
- Duration: 13:32
- Playlist index: 375
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Models & Inference]]

## Transcript excerpt
> How agents broke infrastructure. Particularly, we're going to focus on the compute layer today. My name is Evan Bole, the founder and CEO in Genisx. I was an early employee of Palumi and I've spent my entire career working on cloud and developer tools. Typo warning. In the spirit of embracing AI for this talk, all diagrams are AI generated, but 40 still has some spelling issues. So, thank you for your patience. We all know this journey. We start off as AI engineers with a simple prompt and a couple of tool calls and typically this is enough to raise our $10 million seed round. But from there, when rubber meets the road, we end up building workflows, right? We take that fully...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_-oIuRH4oGA.txt]]
- Description cue: LLMs have completely broken our assumptions about app-level workloads. Compared to querying a database, LLMs are extremely flakey and slow. In web 2.0, p99 latency was just a few hundred millisecon...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Models & Inference**.
