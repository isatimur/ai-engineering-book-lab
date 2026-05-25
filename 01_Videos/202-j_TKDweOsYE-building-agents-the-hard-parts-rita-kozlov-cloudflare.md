---
video_id: "j_TKDweOsYE"
playlist_index: 202
title: "Building Agents (the hard parts!) - Rita Kozlov, Cloudflare"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=j_TKDweOsYE"
duration: "21:12"
duration_seconds: 1272
view_count: 4447
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/j_TKDweOsYE.txt"
themes:
  - "Agent Architecture"
  - "Models & Inference"
ingested_at: "2026-04-24T11:43:45+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rita Kozlov (VP of product for Cloudflare's developer platform — Workers, Durable Objects, ~20% of internet traffic) presents a four-component agent architecture (client, AI/reasoning, workflows, tools) and argues the hard parts are MCP transport/auth/state and human-in-the-loop workflow coordination — not model selection. Cloudflare's answer is the Agents SDK, which uses Durable Objects to give MCP servers stateful memory without a separate database, auto-handles OAuth and HTTP streaming, and enables long-running workflows that pause for human approval. Live example: Knock notification company built a credit-card approval agent that defers tool execution until a human approves via Slack/email/in-app. Key stat: businesses already seeing 20% revenue increases and 90% faster support response times from agents."
---
# Building Agents (the hard parts!) - Rita Kozlov, Cloudflare

## Summary
Rita Kozlov (VP of product, Cloudflare developer platform: Workers, Durable Objects) opens with context that grounds her credibility: about 20% of all internet traffic flows through Cloudflare, including Uber, food delivery services, and most things people use daily.

### The Shift from Augmentation to Automation
A year ago, 44% of developers used AI in their day-to-day; Gartner predicted 50% of knowledge workers would by 2030. Today, over 75% of knowledge workers and 76% of developers already use AI — surpassing the 2030 forecast. The pattern: training workloads → inference workloads → now full automation/agents. The agentic impact is already measurable: 20% revenue increases in sales automation, 90% faster support response times, 50–75% time savings in general use.

### Four-Component Agent Architecture
Kozlov's framework for building an agent:
1. **Client**: the interface through which humans interact (chat UI, voice over WebRTC)
2. **AI/Reasoning**: the LLM doing the thinking — choosing what to do next
3. **Workflows**: the coordination layer that tracks what has been executed and what needs to happen next, including human-in-the-loop pauses
4. **Tools**: what the agent can actually do (APIs, web browsing, vector databases, internal services)

### The Hard Parts: Tools (MCP)
Anthropic introduced MCP in November. Kozlov's reframe of what actually matters about MCP: LLMs became really good at tool calling. MCP is the standard for exposing that capability. MCP servers have resources, prompts, tooling, and sampling. The hard parts of building MCP: transport protocol (SSE/WebSockets), OAuth, and state/memory.

**Cloudflare Agents SDK** solves these. Built on Durable Objects (serverless functions with state attached — no separate database needed), it provides:
- MCP server hosting with OAuth and HTTP streaming built in
- Real-time WebSocket communication
- React integration hooks
- Persistent memory across interactions — preferences stored in the Durable Object persist across every client that connects

Book recommendation demo: MCP server that learns genre preferences (Patricia Highsmith thrillers) via an `add_genre` tool, persists them in the Durable Object, and returns improving recommendations via `get_recommendations`. Memory is shared across all clients (Cursor, Claude, ChatGPT, custom app) because it lives in the Durable Object, not the client.

### The Hard Parts: Workflows (Human-in-the-Loop)
Human-in-the-loop workflows require long-running processes that can pause indefinitely — minutes, hours, days — and resume after a human responds. This also requires handling retries, horizontal scaling, and idempotency (can't approve the same card twice).

**Real customer example — Knock** (notification management): built a credit card approval agent using Agents SDK.
- User requests a new card via chat
- `issue_card` tool is wrapped in `require_human_input`
- Knock sends approval notifications via email/Slack/in-app
- Tool execution is deferred until approval arrives as a webhook
- Durable Object routes the webhook to the correct agent instance by user ID
- State management prevents duplicate approvals if two webhooks arrive simultaneously

The key mechanism: Durable Objects auto-route the incoming webhook to the specific long-running agent that is waiting for it — no custom routing logic required.

### The Easy Part: Model/Client
Kozlov explicitly skips model selection ("there's an entire conference dedicated to this"). On clients: once you've built an MCP server, you don't have to build a UI at all. Cursor, Claude, and ChatGPT all support remote MCPs — your users start using your agent through the tools they already have. Or build your own MCP client for more control.

## Why it matters
- The Durable Objects pattern for MCP state is a concrete architectural solution to the "memory without a database" problem that most MCP tutorials hand-wave.
- The Knock approval-workflow example is a complete, deployable pattern for human-in-the-loop coordination with idempotency — not a toy.
- The four-component model (client/AI/workflows/tools) is a useful decomposition for teams arguing about where to start building.
- The "deploy to Cloudflare" one-click MCP server path (used by Atlassian, Asana, Stripe, Intercom) lowers the entry cost for tool publishing significantly.

## Metadata
- Video: https://www.youtube.com/watch?v=j_TKDweOsYE
- Duration: 21:12
- Playlist index: 202
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hello everyone. Uh I'm Rita. I'm the VP of product for um Cloudflare's developer platform. So workers and durable objects. Thank you for the shoutouts. Um, I always like to start by talking a little bit about um, Cloudflare's mission and especially our mission for developers...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/j_TKDweOsYE.txt]]
- Description cue: AI workloads are rapidly shifting from AI being used for augmentation (co-pilots), to AI becoming responsible for full, end-to-end automation (agents). But building effective agents, and even...

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Models & Inference**.
