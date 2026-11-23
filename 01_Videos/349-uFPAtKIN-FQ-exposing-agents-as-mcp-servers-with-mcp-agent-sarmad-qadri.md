---
video_id: "uFPAtKIN-FQ"
playlist_index: 349
title: "Exposing Agents as MCP servers with mcp-agent: Sarmad Qadri"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=uFPAtKIN-FQ"
duration: "18:05"
duration_seconds: 1085
view_count: 7742
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/uFPAtKIN-FQ.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:14:45+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sarmad Qadri, CEO of Last Mile AI and a former Language Server Protocol engineer at Microsoft, argues that MCP does for LLMs what LSP did for IDEs, and that MCP servers can be agents, not just thin wrappers over REST APIs. His open-source mcp-agent library implements the patterns from Anthropic's Building Effective Agents post (augmented LLM, evaluator-optimizer, fan-out, orchestrator). It treats agents as microservices exposed as MCP servers and as async workflows on Temporal that can pause, resume, retry and wait for humans. A demo grades a short story with an orchestrator and five sub-agents in about 100 lines, then runs the same agent from Claude Desktop."
---
# Exposing Agents as MCP servers with mcp-agent: Sarmad Qadri

## Summary
Sarmad Qadri is CEO of Last Mile AI. From 2016 to 2018 he worked on the Language Server Protocol at Microsoft, which replaced one API per editor with one standard interface. Since the ChatGPT plugins era he wanted the same for LLMs, and he sees MCP as that protocol. His thesis: most MCP servers today are one-to-one maps of REST APIs, but an MCP server can be a whole agent.

**The 2025 agent stack**
- Better models: reasoning and test-time compute move patterns like chain of thought and ReAct from the framework layer into the inference layer.
- MCP: one standard interface for tools, data and resources, which Google, OpenAI, Microsoft and others have adopted.
- Simpler architectures: agents are now orchestrators of good models and MCP in well-defined patterns, so heavy monolithic frameworks are no longer needed.

He walks through the patterns in Anthropic's Building Effective Agents post: the augmented LLM in a loop with tools and data, the evaluator-optimizer pair that iterates until the evaluator is satisfied, fan-out and fan-in to sub-agents, and the orchestrator that plans and assigns tasks dynamically, as in Claude Code.

**mcp-agent's three opinions**
He built mcp-agent over a Christmas break to implement those patterns.
1. MCP will be everywhere. Business apps such as Notion, Google Docs, Cursor and Claude become MCP clients, and every SaaS product gets an MCP server.
2. Agents are microservices and can be deployed as MCP servers. A client can then call agents like any other server, and agents can call other agents over the same protocol. Benefits: composable multi-agent systems, platform-agnostic agents you build once, and scalable agents whose compute runs apart from the client.
3. Agents are async workflows. They pause, resume, retry on failure, wait for human feedback, and can be triggered by webhooks or cron jobs, not only by chat. mcp-agent uses Temporal as the durable execution backend.

**Demo**
The task: load a student's short story from a markdown file, grade it on proofreading, factual and logical consistency, and adherence to an APA style guide fetched from a URL, then write a graded report. The agent connects to the fetch and filesystem MCP servers and defines finder, writer, proofreader, fact-checker and style-enforcer agents plus an orchestrator. The workflow is about 100 lines. In the Temporal UI the orchestrator first writes a plan, then runs each step, and any step can fail and retry. He then exposes the same agent as an MCP server in Claude Desktop. Claude starts the workflow and polls its status. Because the agent runs in a separate environment, he can close Claude Desktop and fetch the result later.

## Why it matters
- Reframes MCP servers from API wrappers to agents, which gives multi-agent composition over a standard protocol.
- Treats long-running agents as durable workflows, which answers how to handle retries, human approval and scheduled runs outside a chat session.
- The LSP analogy explains why one standard interface beats per-platform connectors.
- Shows that a multi-agent orchestrator pattern can be small, about 100 lines, once tools come from standard MCP servers.

## Metadata
- Video: https://www.youtube.com/watch?v=uFPAtKIN-FQ
- Duration: 18:05
- Playlist index: 349
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> My name is Sarmad and today I want to talk about building effective agents with model context protocol or MCP. So a lot has changed in the last year. Um especially as far as agent development is concerned. I think 2025 is the year of agents and uh things like MCP make agent design simpler and more robust than ever before. So I want to talk about what the agent tech stack looks like in 2025. The second thing is a lot of uh MCP servers today are just you know onetoone mappings of existing REST API uh uh services to MCP tools. Uh but MCP servers can be a lot more than that. They could even be agents and so I want to show how uh agents can be represented as MCP servers. And the last thing is uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/uFPAtKIN-FQ.txt]]
- Description cue: In this talk, we will show that agents can be represented as MCP servers, allowing them to be run from any MCP client (such as Claude, Cursor and other applications).

## Book angles
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/lastmile-ai/mcp-agent>
- resource: <https://modelcontextprotocol.io/introduction>
- resource: <https://www.anthropic.com/news/model-context-protocol>
- resource: <https://www.anthropic.com/research/building-effective-agents>
