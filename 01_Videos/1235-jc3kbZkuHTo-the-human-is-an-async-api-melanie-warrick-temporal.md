---
video_id: jc3kbZkuHTo
playlist_index: 1235
title: "The Human Is an Async API — Melanie Warrick, Temporal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jc3kbZkuHTo"
duration: "19:16"
duration_seconds: 1156
view_count: 11000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/jc3kbZkuHTo.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T18:03:30+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Melanie Warrick of Temporal argues that durability belongs in every agent harness, and that a human in the loop should be modelled as an async API, not a blocking function call. Using a live multi-agent ice cream delivery demo (fleet and customer agents on Google ADK, a dispatch agent on LangGraph), she shows two primitives, a wait condition and a signal, that park one workflow while the rest keep running. She kills the worker mid-approval and shows the event log replay to the exact point it left off. Her rule for when to involve a human: weigh the cost of being wrong against alert fatigue."
---

# The Human Is an Async API — Melanie Warrick, Temporal

## Summary
Melanie Warrick works at Temporal and says openly that the talk is a pitch. Her argument is broader than the product: an agent is a loop (reason, act, observe), the harness is the structure that gets the loop into production, and durability must be part of that structure. Humans are a tool to the agent too, but a slow and unreliable one. Treat them as an async API.

**The demo**
A fictional ice cream shop run by Temporal's mascot, Ziggy, delivers orders from the Ferry Building. Three agents coordinate: a fleet agent researches drivers with Google Maps, a customer agent researches orders with Google Search, and a dispatch agent decides. The first version runs on Google ADK with Temporal built in. A customer changes an order. Only that driver pauses while a human approves the change; every other order keeps flowing.

**Temporal's primitives**
- Worker: runs the code.
- Workflow: tracks the steps. An agent loop or an ADK framework runs inside one. Workflows are deterministic.
- Activity: anything that touches the outside world, such as model calls and tool calls. Activities are non-deterministic.
Temporal is free and open source in Python, TypeScript, Rust and other languages. You can self-host it or pay for the managed service.

**Why a plain function call fails**
If you write 'ask the human' as a function, it blocks, and if the service goes down the system loses track of the human's response. The fix is two primitives: a wait condition that pauses one workflow and stores its state in the durability layer, and a signal that injects the human's input into the running workflow at any time. No thread is held. Timeouts are built in. Parked workflows leave memory, and "millions of workflows" can sit parked.

**Code shape**
For ADK: wrap the model in a Temporal model class, wrap tools as activity tools, and pass the Google ADK plugin to the worker. The wait condition is an asyncio-style await on that one workflow; other coroutines and workflows keep running. For LangGraph, Temporal wraps each graph node. Model invokes and tool calls become activities, and steps become workflows. LangGraph's interrupt calls out to the human, a wait condition pauses, and a signal carries the answer back. Temporal is framework-agnostic.

**The crash test**
The second demo mixes frameworks: customer and fleet agents on ADK, dispatch on LangGraph, with child workflows per order. A high-value order makes the dispatch agent pause for human approval. Warrick kills the worker, clicks approve while it is offline, and restarts it. The event log is "replayed, not redone" up to the point it left off, the approval is applied, and the order is delivered.

**When to bring in a human**
Case by case. Weigh the cost of being wrong, especially for security, against alert fatigue, where people just "start saying yes, yes, yes". Models are still probabilistic, so you must evaluate this per problem. Humans respond in minutes, days or weeks, not 200 milliseconds.

## Why it matters
- It gives a precise engineering definition of human-in-the-loop: a parked workflow plus a wait condition and a signal, not a blocking call.
- The kill-the-worker demo shows what durable execution buys an agent system: approvals survive crashes because state lives outside the service and the event log replays.
- The deterministic workflow versus non-deterministic activity split is a clean rule for where model and tool calls sit in an agent loop.
- It shows one durability layer spanning two agent frameworks (ADK and LangGraph) in one system.
- The frame of cost of being wrong versus alert fatigue is a usable heuristic for deciding where approval gates go.

## Metadata
- Video: https://www.youtube.com/watch?v=jc3kbZkuHTo
- Duration: 19:16
- Playlist index: 1235
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Well, I'm here to talk to you today about this demo and I've already stepped outside the box they told me not to step outside of. Anyways, I'm here to talk to you today about an ice cream delivery demo that I've got for you and ultimately I'm here to talk to you about Temporal. So, you're going to hear me pitching about the company that I work for and specifically in a way that will be about this ice cream delivery that's happening as you can see online right now. So, what's happening? Well, this is Ziggy. Ziggy's Ziggy's is our mascot. I love Ziggy. And Ziggy has an ice cream store, not really, but let's say he does down in the Ferry Building. Currently working hard delivering...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jc3kbZkuHTo.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

