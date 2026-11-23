---
video_id: "zuMw0pkPXpU"
playlist_index: 453
title: "Tool Calling Is Not Just Plumbing for AI Agents — Roy Derks"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zuMw0pkPXpU"
duration: "25:18"
duration_seconds: 1518
view_count: 7465
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/zuMw0pkPXpU.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:18:59+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Roy Derks (IBM) argues that 'the agent is only as good as your tool', yet teams pour effort into agents and bury tools inside their framework. He contrasts traditional tool calling, where your app parses and runs each call, with embedded tool calling, a black box such as LangChain's create_react_agent. He favours separating tools from agents through MCP or a standalone tool platform (IBM's wxflows) so tools work across LangGraph, CrewAI and AutoGen, and he makes the case for dynamic tools where the LLM writes GraphQL or SQL against a schema instead of a hundred static tools."
---
# Tool Calling Is Not Just Plumbing for AI Agents — Roy Derks

## Summary
Roy Derks came to IBM through an acquisition after years in startups, and he has a long background in GraphQL, React and web development. His thesis: everyone debates agent frameworks, but tools get little attention, and tools are the first thing to break. The LLM calls a tool wrongly, picks the wrong tool, or the tool itself fails. So "the agent is only as good as your tool", and tools should be reusable, robust and portable across frameworks.

**Tool definitions are prompts**
His running example asks how far the Moon's orbit is in Amsterdam to San Francisco round trips (about 44). A tool definition has four parts:
- A simple name.
- A description, which "almost feels like a system prompt". Big agentic tools carry long descriptions.
- Input parameters.
- An output schema. He sees this more and more. It makes tools type-safe and lets you chain tool calls and use structured output.

**Traditional versus embedded tool calling**
- Traditional tool calling (a term he credits to a Cloudflare blog): your app sends the prompt and tools to the model, reads its tool call recommendation, runs a callback, and returns the result, many times over. You filter tool call messages yourself and handle queuing, retries and errors.
- Embedded tool calling: you pass tools, model and prompt to something like LangChain's create_react_agent and get an answer back. It is easy to start with, but it is a black box. You do not see how tools run or how decisions are made.

**Separate tools from agents**
As a developer who prefers separation of concerns, he points to two options:
- MCP, the protocol from Anthropic. A host (for example Claude Desktop) holds a client that talks to servers. The server is a small back end that exposes tools and assets, so the tool logic lives on the server side.
- A standalone tool platform. Tools are created by code or CLI and executed remotely, and agents pull them in through an SDK or API. The platform can chain tools (for example, look up a user's country from their IP, then query the CRM), and it handles authorization, credentials and errors. He names Arcade AI and others, and shows IBM's own wxflows feeding a LangGraph ReAct agent. The payoff: build tools once and switch between LangChain, LangGraph, CrewAI or AutoGen.

**Dynamic tools**
Ten tools are fine, but a hundred tools confuse the agent and need routers. His alternative: one tool that takes a GraphQL schema and lets the model write the query. In tests with clients, Llama, OpenAI and Claude models generated GraphQL well when given the schema. His tips: remove custom scalars, and keep nesting shallow (one level is fine, five levels confuse). This reuses existing APIs and business logic. The trade-off is that models can still hallucinate syntax.

## Why it matters
- It names a concrete failure order: in his experience tools, not the model or the loop, break first, so tool quality deserves engineering time.
- The traditional versus embedded split gives a clear way to talk about how much control a framework hides over the tool calling loop.
- Treating tool descriptions as system prompts and adding output schemas are two cheap, specific steps toward reliable tool use and tool chaining.
- The tool-sprawl numbers (10 tools fine, 100 confusing) and the GraphQL schema tips make dynamic tools a practical design option, with hallucinated queries as the stated cost.
- Moving tools behind MCP or a tool platform is his answer to framework lock-in and scattered credentials.

## Metadata
- Video: https://www.youtube.com/watch?v=zuMw0pkPXpU
- Duration: 25:18
- Playlist index: 453
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> tool calling is not just Plumbing for AI agents this talk I'm going to show you why tool calling is more important than some people think and how you can use tool calling with your AG gentic Frameworks we'll be looking at some of the techniques for Tool calling as regular tool calling or meta tool calling how this works with agent Frameworks and also some other considerations like do you need a separate tool platform or can you look at different types of tools where than the tools we today your own if you think about Plumbing uh some people say you should do your own Plumbing some other people say you should always hire a professional I hope at the end of this talk you'll be feeling like I...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zuMw0pkPXpU.txt]]
- Description cue: Tool calling is more than just a technical detail—it’s the most important piece of how AI agents get things done. It allows agents to connect to systems, access data, and perform all sorts...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/IBM/wxflows>
- resource: <https://hackteam.io/blog/build-your-first-mcp-server-with-typescript-in-under-10-minutes>
