---
video_id: wflNENRSUb4
playlist_index: 675
title: "The Agent Gets a Computer: Building with AI SDK v6 — Nico Albanese, Vercel"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wflNENRSUb4"
duration: "1:08:53"
duration_seconds: 4133
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/wflNENRSUb4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:03:54+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nico Albanese, Vercel AI SDK engineer, runs a live 68-minute workshop building an agent with AI SDK v6. The v6 headline feature is a 'global provider' (defaults to AI Gateway) so models are referenced as plain strings. The workshop's architectural thesis: three building blocks matter in 2026 — agent runtime, tools, and a persistent computer (named sandbox). A Vercel internal data agent whose file-system-backed scratchpad gave it a plan.md to follow reduced support tickets by 90% with 'thank you' responses. Albanese's own coding agent ran 104 minutes autonomously (316 tool calls, 29 files, 32% context window, zero compaction), making the case that million-token windows have made aggressive context pruning unnecessary. The contrarian note: invalidating the input cache by stripping old tool calls costs more than it saves."
---

# The Agent Gets a Computer: Building with AI SDK v6 — Nico Albanese, Vercel

## Summary

Nico Albanese, a Vercel engineer on the AI SDK team, delivers a live 68-minute workshop at AI Engineer Summit London, building an agent step-by-step using AI SDK v6 on a fresh Next.js app. The session functions as both a tutorial and a window into Vercel's internal thinking about agent architecture.

### What changed in AI SDK v6

In previous versions of the SDK, you imported a provider package (e.g. `@ai-sdk/openai`) and instantiated a model from it. v6 introduces the concept of a **global provider**: by default the AI Gateway acts as the global provider, so you can reference any model as a plain string without importing anything per-provider. This is a convenience for getting started and for switching models; you can override the global provider if you need direct access to a specific vendor.

The core primitives from v4 (`generateText`, `streamText`, `generateObject`, `streamObject`) still exist, but the SDK now offers a more object-oriented approach centered on the `ToolLoopAgent` class — an agent definition that encapsulates the model, instructions, tools, and streaming behavior in one reusable unit. The motivation: in larger apps the route handler (`api/chat/route.ts`) was ballooning to 2,000+ lines because tool definitions and system prompts were defined inline at the call site.

### Three building blocks for agents in 2026

Albanese frames the workshop around three components:

1. **Agent runtime**: the harness that manages the loop, context, and step lifecycle. The SDK's `prepareStep` callback fires before every step and receives the current messages, step number, and model — allowing you to modify any parameter mid-run (e.g. trim old tool calls from the context window as a sliding filter).

2. **Tools**: classified into three types:
   - *Custom tools*: developer-defined with description, input schema, and execute function
   - *Provider-defined tools*: the LLM provider pre-trains the model to use these effectively (e.g. Anthropic's bash tool, computer-use tool); the developer only provides the execute function
   - *Provider-executed tools*: entirely run server-side by the provider (e.g. web search); the developer just opts in and the provider adds results to the message state automatically

3. **A computer** (persistent sandbox): the most architecturally significant addition. Albanese spent months building lifecycle management for sandboxes manually — tarring the entire file system after each request, storing to blob, spinning up new containers. Vercel Sandboxes' new **named sandboxes** feature (in beta at the time of the talk) solves this: every sandbox has a name, sessions are instances of that named sandbox, and on inactivity Vercel snapshots the file system and spins down — then restores it on the next request. From the application's perspective, it's always the same machine.

### The file-system insight from Vercel's internal agent

Albanese's most concrete example: Vercel's internal data agent (D0) had access to dozens of tools — Salesforce, the entire admin backend, all analytics. When given many tools, it would use 5-10 and return somewhat hallucinated answers. The transformation happened when someone added a persistent file system with instructions to:
- Create a `plan.md` at the start of every session with the objective at the top
- Follow that plan file to the letter, checking things off as it progresses

The agent started following through on entire tasks because the objective was anchored externally — not buried in a context window that scrolls past. The D0 agent that adopted this pattern cut customer support tickets by 90%, with users responding "thank you" — rare feedback for a support bot.

### The context-window management take

Albanese's agent ran for 104 minutes in a single turn, used 316 tool calls, modified 29 files, and consumed only 32% of GPT-4's context window — with no compaction. His current view: with million-token context windows, aggressive context pruning (stripping old tool calls to stay between 40-60% of the window) invalidates the input cache every time and isn't worth the complexity. Instead, he prefers sub-agents that handle discrete chunks of work and return a ~1,000-token summary, plus a dedicated handoff tool (borrowed from the Amp team) that lets the agent checkpoint context into a new thread when needed.

### End-to-end type safety in the SDK

The SDK propagates types from the agent definition through to the client: `inferAgentUIMessage<typeof myAgent>` gives you a fully typed message object that knows about every tool call's input and output shapes. This flows from the agent definition as the single source of truth rather than requiring separate type declarations at the route handler and the UI layer.

## Metadata
- Video: https://www.youtube.com/watch?v=wflNENRSUb4
- Duration: 1:08:53
- Playlist index: 675
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> I now have my live deployment here and I can continue to dashboard and I've got my project. One out of five things for the production checklist. Is that all? Were you able to get that? Cool. So we're going to jump over to the repository on GitHub that clicking that big repo button. And then I'm going I'm going to quit out of Slack and all these things and I'm going to jump into a terminal. Head over to directory that I'm happy with. And I'm happy to pop this in and I'm going to get clone that oops, that's not it. Need to copy it. Obviously click the big green code button. Copy the clone and then get clone AI London demo. Awesome. I'm going to jump into that uh that repo there and then if we...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wflNENRSUb4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
