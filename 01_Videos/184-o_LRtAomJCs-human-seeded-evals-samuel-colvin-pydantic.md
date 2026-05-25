---
video_id: "o_LRtAomJCs"
playlist_index: 184
title: "Human seeded Evals — Samuel Colvin, Pydantic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=o_LRtAomJCs"
duration: "12:02"
duration_seconds: 722
view_count: 3160
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/o_LRtAomJCs.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:42:55+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Samuel Colvin (Pydantic creator) argues that building reliable AI applications is harder with GenAI than before, and that type safety is an underrated mitigation — not just for catching bugs in production, but because it lets coding agents like Cursor run type checking to grade their own output. The talk demonstrates Pydantic AI's agentic loop: a Pydantic validation error returned to the model as a tool response causes the model to self-correct, eliminating a large class of simple failures without prompt engineering. Contrarian claim: Pydantic AI is the only agent framework that works this hard to be type-safe end-to-end, including generic dependency typing that tools can access. Live demo uses Logfire to show per-call pricing and tracing — catching a retrieval bug in real time."
---
# Human seeded Evals — Samuel Colvin, Pydantic

## Summary
Note: despite the title, Colvin ran out of time and did not cover the "human-seeded evals" concept. The talk focuses on building reliable AI applications with Pydantic AI — specifically the type-safety argument and the validation-error feedback loop in the agentic loop.

### The Reliability Argument
Everything is changing fast, but some things are not: we still want reliable, scalable applications, and that is still hard — arguably harder with GenAI than before. Colvin's answer is type safety, for two reasons:
1. You will refactor your agent application multiple times because you don't know what it will look like when you start. Type safety lets you refactor with confidence.
2. Coding agents (e.g. Cursor) can use type checking to "mark their own homework" — check whether what they generated is correct in a way that's not possible with untyped frameworks. LangChain and LangGraph, by contrast, either decided against or couldn't build type-safe APIs.

### The Agentic Loop and the Validation Trick
Colvin live-demos a minimal Pydantic AI example: extract a structured `Person` model from unstructured text. The twist — a field validator requires `date_of_birth` to be before 1900. The model assumes "87" means 1987, gets a validation error, receives that error as a tool response ("please fix and retry"), and self-corrects on the second call. Two LLM calls total, verified in Logfire.

This demonstrates the core value of the agentic loop for even simple tasks: returning validation errors to the model is a cheap, reliable way to fix a large class of structured output failures.

### Type-Safe Dependencies
Pydantic AI agents are generic on both output type and deps type. Tools are registered with a typed `RunContext` that gives them access to injected dependencies. If you pass the wrong type as deps at runtime, you get a typing error. This makes large-scale refactoring and multi-tool agent code tractable in a way it isn't with dynamic frameworks.

### Logfire Integration
The live demo uses Logfire (Pydantic's observability platform) throughout. The trace view shows: each model call, the validation error exchange, tool invocations, per-call duration, and aggregate pricing across the trace. In the memory-tools example, a retrieval bug (substring mismatch) is caught live in the Logfire trace — an unrehearsed demonstration of why observability matters.

### What Colvin Did Not Cover
The "human-seeded evals" concept from the talk description was cut for time. The Pyon talk this was adapted from covered more ground.

## Why it matters
- The validation-error-as-tool-response pattern is immediately adoptable and eliminates structured output failures without prompt engineering.
- The type-safety argument for agentic frameworks is underrepresented in the discourse — most framework comparisons focus on features, not refactorability.
- The Logfire demo makes a practical case for instrumenting LLM applications from the start, before you have a bug to debug.
- The honest framing ("this is harder now, not easier") is a useful counterweight to hype-driven adoption.

## Metadata
- Video: https://www.youtube.com/watch?v=o_LRtAomJCs
- Duration: 12:02
- Playlist index: 184
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] I'll assume given the time we have that you kind of get who I am and what Pyantic is to some extent. So I will I will move on. This is this I'm using the talk I gave at Pyon. So uh it it was building uh AI applications the pantic way which is uh I guess somewhat akin as I say I'm not going to be able to get to the eval stuff today. Um but I I can talk about these two. So everything is changing really fast as we all get told repeatedly in ever more hysterical terms actually some things are not changing. We still want to build reliable scalable applications and that is still hard arguably it's actually harder with Gen AI than it was before. Whether that is using Genai to build it or...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/o_LRtAomJCs.txt]]
- Description cue: In this talk I'll introduce the concept of Human-seeded Evals, explain the principle and demo them with Pydantic Logfire.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
