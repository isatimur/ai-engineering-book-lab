---
video_id: YNJvm7t3yq8
playlist_index: 688
title: "Why Your AI UX Is Broken (and It's Not the Model's Fault) — Mike Christensen, Ably"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YNJvm7t3yq8"
duration: "18:38"
duration_seconds: 1118
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YNJvm7t3yq8.txt"
themes:
  - "Org Design & Leadership"
  - "General AI Engineering"
ingested_at: 2026-05-19T11:04:23+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mike Christensen, staff engineer at Ably (real-time messaging platform, 2 billion+ devices/month), argues that the default HTTP streaming pattern — a single persistent connection between one client and one agent — is structurally incapable of delivering production-quality AI UX. Drawing on conversations with 40+ companies across 10 industries, he identifies three capabilities that separate a fragile demo from a great AI product: resilient delivery (streams that survive disconnections), cross-surface continuity (session state follows the user across tabs and devices), and live control (bidirectional communication with agents mid-task). His solution is durable sessions — a pub/sub layer that decouples agents from clients — which eliminates the irreconcilable conflict between resumability and cancellation that SSE-based architectures face."
---

# Why Your AI UX Is Broken (and It's Not the Model's Fault) — Mike Christensen, Ably

## Summary

Mike Christensen is a staff engineer at Ably, a real-time messaging platform that handles over 2 billion devices and 30 billion connections per month. The talk is built around a structural diagnosis: almost every AI chat product is built on direct HTTP streaming (SSE by default in frameworks like Vercel AI SDK and LangChain), and this paradigm is fundamentally oriented around a single client → single connection → single agent pattern. That works for a demo, but it prevents the three capabilities that define great AI UX.

### The three production capabilities

**Resilient delivery**: When a mobile user walks out of Wi-Fi range, their connection severs. With direct HTTP streaming, the LLM is still generating tokens with nowhere to go. Implementing resumability requires the agent to buffer events in Redis with sequence numbers, expose a resume handler, and replay only the events each individual client missed — complex plumbing that has to be built from scratch per product.

**Cross-surface continuity**: If a user opens the same session in a second tab, that tab has no visibility into the in-progress response because it didn't originate the request. The same problem arises when switching to mobile mid-task — the phone can't see what the agent is doing or send follow-up messages to it.

**Live control**: The best AI products allow users to steer agents while they're working (add a message, cancel a task). With SSE, this is architecturally impossible: SSE is strictly one-way. Closing the connection to simulate cancellation creates an ambiguity — the agent can't distinguish "client dropped" from "user hit stop." Vercel's AI SDK documentation explicitly states that its abort functionality is incompatible with resumability for this reason.

### The durable sessions pattern

Christensen's solution is to decouple the agent layer from the client layer via a shared stateful resource he calls a **durable session**. All agents write events to the session independently; all clients subscribe to the session and receive all events regardless of which agent produced them. Because the session persists across connection lifecycles:

- Clients can reconnect and resume from the exact event they missed.
- Any tab or device can subscribe and get full session visibility.
- Any client can send a follow-up or cancellation to the agent via the session's bidirectional channel.
- Multiple agents working concurrently on subtasks can all write to the same session without a centralized orchestrator having to proxy their updates.

This pattern maps naturally onto pub/sub. Ably implements it via channels — independently addressable, persistent, fully resumable, with automatic multiplexing for concurrent activity.

### Demo

A toy retail chat interface demonstrates all three capabilities in sequence: the session stays in sync across two browser tabs; a page refresh reconnects automatically without agent-side logic; killing the network and restoring it carries on without missing events; cancellation works bidirectionally from any tab; two agents work concurrently (product research + order cancellation); a human support agent joins the session seamlessly with full context of the prior AI conversation.

Christensen frames the human handoff case as an underappreciated benefit of durable sessions: a human agent joining the session sees the complete interaction history and can participate as just another session member.

## Why it matters
- The SSE resume/cancel conflict (documented in Vercel AI SDK's own docs) is a concrete, verifiable production limitation that most teams discover too late — a strong case-study anchor for a chapter on AI infrastructure.
- Durable sessions as a pattern generalizes beyond Ably: any pub/sub layer (Redis Streams, Kafka, etc.) can implement it, making the concept framework-agnostic.
- The multi-agent concurrent write scenario (all agents write independently to a shared session, no orchestrator needed for fanout) is an underappreciated architectural simplification.
- The human handoff case shows durable sessions as a foundation for hybrid human-AI workflows, not just pure-AI products.

## Metadata
- Video: https://www.youtube.com/watch?v=YNJvm7t3yq8
- Duration: 18:38
- Playlist index: 688
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay. Um I think it's time to start. >> [applause and cheering] >> Uh can we start with a quick show of hands? So, who here's built some kind of AI chat app, right? Some kind of AI chat experience? Okay, well, that was quick, right? Almost everybody in this room, right? So, this is the case where you've got some kind of chat app, you've got an agent on the back end. The user sends a message to the agent, and the agent streams a response back live to the user as it's being generated, right? And this is fundamental building block of AI user experiences. We see in every AI chat app today. And first, I want to have a quick look at how this is implemented today, right? So, the default...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YNJvm7t3yq8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
