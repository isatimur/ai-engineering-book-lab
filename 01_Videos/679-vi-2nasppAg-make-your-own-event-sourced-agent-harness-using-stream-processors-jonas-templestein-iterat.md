---
video_id: vi-2nasppAg
playlist_index: 679
title: "Make your own event-sourced agent harness using stream processors — Jonas Templestein, Iterate"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=vi-2nasppAg"
duration: "1:04:27"
duration_seconds: 3867
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/vi-2nasppAg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:04:03+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jonas Templestein (co-founder, Iterate) presents a live hackathon demo of events.iterate.com — a proof-of-concept event-sourced agent harness. The core insight: if you model an agent harness as a pure event stream (type + payload + offset), every step is inspectable, debuggable, replayable, and composable. Plugins (Rust, TypeScript, Python) attach to the stream and handle slices of it. Agents get a persistent URL from the moment they are created; state lives in the stream, not in ephemeral memory. Tradeoffs acknowledged: race conditions and infinite loops are real risks with distributed event-sourced systems. Predicts this pattern will be common within a year."
---

# Make your own event-sourced agent harness using stream processors — Jonas Templestein, Iterate

## Summary

Jonas Templestein (co-founder, Iterate) runs a live hackathon demo with co-founder Misha, building out their proof-of-concept service `events.iterate.com` in front of the audience. The session is openly exploratory ("I would like to find out whether this is dumb or cool") but surfaces a genuinely novel architectural approach.

**The core idea: agents as pure event streams.**

Traditional agent harnesses maintain state in memory — the conversation history, tool call results, context window. This state is fragile: process crash = lost state. Templestein's proposal: model the entire agent session as an append-only log of structured events, where each event has a `type`, `payload`, and `offset`. The stream is the agent. Everything the agent receives and everything it produces is an event in the log.

**Event structure:**

```yaml
type: user_message | tool_call | tool_result | llm_response | error
payload: { ... }
offset: 42   # monotonically increasing position in the stream
```

This is pure event sourcing applied to agent harnesses. The offset makes events addressable and replayable. SSE (Server-Sent Events) is used to stream events to subscribers in real time. An agent gets a persistent URL from the moment it is created — the URL identifies the stream, not a running process.

**Plugins as stream processors:**

Functionality is added by attaching stream processors that handle subsets of events. A plugin receives the stream, acts on the events it cares about, and emits new events back. Plugins are written in any language (Rust, TypeScript, Python demonstrated). This is architecturally equivalent to Kafka consumers — stateless processors over a durable log.

Examples of plugins:
- **LLM plugin**: listens for `user_message` events, calls the LLM, emits `llm_response` event
- **Tool registry plugin**: listens for `tool_call` events, routes to the right tool, emits `tool_result`
- **Memory plugin**: listens for any event, maintains a rolling summary, injects into context
- **Eval plugin**: listens for `llm_response` events, grades output, emits `eval_result`

**Why this architecture:**

1. **Debuggability**: the entire agent history is in the stream. Replay any event to see what the agent saw at any moment. Classic event sourcing benefits apply.
2. **Composability**: plugins are independent processes. Add, remove, replace plugins without touching agent logic.
3. **Durability built-in**: state is the log, not process memory. Agent resumes from last offset after crash.
4. **Distributed by default**: plugins can run in different processes, different machines, different languages.
5. **Inspectable mid-run**: any external process can subscribe to the stream and observe the agent in real time.

**Tradeoffs and open problems:**

Templestein is honest about the risks. Event-sourced distributed systems introduce race conditions: two plugins can both emit in response to the same event. Infinite loops are possible (plugin A emits event X → plugin B emits event Y → plugin A responds to Y → ...). Both are known failure modes in distributed stream processing and require careful design (idempotency, offset guards). Templestein acknowledges these are unsolved in the current proof of concept.

**Where it sits relative to Temporal and Trigger.dev:**

Temporal solves durability via an opaque event log managed by the Temporal service. Trigger.dev solves it via Firecracker VM snapshots. Templestein's approach makes the event log the primary interface — it's the agent's runtime, not just a recovery mechanism. This is the most radical of the three positions in the corpus: agents don't run on top of infrastructure, they *are* infrastructure.

**Demo outcome:** The live demo builds a working event-sourced agent — a TypeScript plugin that listens for user messages, calls GPT, and streams the response back as events. A Rust plugin handles tool routing. They are composed at runtime by subscribing to the same stream URL.

## Why it matters

This is the most architecturally radical treatment of agent durability in the corpus. Where Temporal and Trigger.dev add durability as a layer on top of existing agent designs, Templestein proposes making event sourcing the first-class primitive — the agent session *is* the event stream. The composable plugin model (stream processors in any language) is a genuine alternative to framework-level orchestration and pairs naturally with the MCP protocol's tool-as-activity model. The approach is still proof-of-concept, but the core insight — if everything is an event, everything is debuggable — is sound and will generalize.

## Metadata
- Video: https://www.youtube.com/watch?v=vi-2nasppAg
- Duration: 1:04:27
- Playlist index: 679
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Coding Agents]]
- [[Evals & Reliability]]

## Key claims (for claims ledger)
- An agent session modeled as a pure append-only event stream (type + payload + offset) is inherently durable, debuggable, and composable — state lives in the log, not in process memory.
- Plugins as stream processors (Kafka-style consumers) allow any-language, independently-deployed components to extend agent behavior without touching core logic.
- Agents get a persistent URL from creation — the URL identifies the stream, enabling resume after crash without application-level recovery code.
- Race conditions and infinite loops are the primary risk of distributed event-sourced agent harnesses; they require idempotency guards and offset-based deduplication.
- This architecture makes the event log the runtime, not just a recovery mechanism — the most radical durability position in the corpus.
- Predicted: event-sourced harness patterns will be common within a year of this talk.

## Book angles
- Chapter 4 (durable runtime) — alternative to Temporal/snapshot models: event stream as the agent itself. Pairs with Cornelia Davis (#38), Samuel Colvin (#99), Eric Allam (#666).
- Chapter 6 (software factory) — plugin composability as a model for modular agent workflows; each plugin = a specialist role.
- Chapter 7 (reliability) — event sourcing makes every agent decision auditable; strongest debuggability story in the corpus.
- Chapter 8 (constrained delegation) — stream as control plane: any observer can subscribe and monitor the agent in real time.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/vi-2nasppAg.txt]]
