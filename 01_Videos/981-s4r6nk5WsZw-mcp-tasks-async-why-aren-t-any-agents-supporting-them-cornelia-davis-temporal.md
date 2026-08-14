---
video_id: s4r6nk5WsZw
playlist_index: 981
title: "MCP Tasks (async): Why Aren't Any Agents Supporting Them? — Cornelia Davis, Temporal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=s4r6nk5WsZw"
duration: "23:54"
duration_seconds: 1434
view_count: 2700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/s4r6nk5WsZw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-04T17:21:55+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Temporals Cornelia Davis explains why no MCP client supports async Tasks yet, demos her durable implementation for a purchase-order use case, and previews V2 dropping the stateful task-list endpoint."
---

# MCP Tasks (async): Why Aren't Any Agents Supporting Them? — Cornelia Davis, Temporal

## Summary
Cornelia Davis (Temporal) argues that MCP clients don't support the async Tasks specification (published November, marked experimental) mainly because it's genuinely hard to implement, not because builders are lazy. She grounds this in a live purchase-order demo: a PO triggers parallel back-office updates and an invoice payment that runs through a long-running MCP tool (ERP validation, human-in-the-loop approval, reconciliation, retry-laden payment), surviving server crashes and reconnects because she built the durability herself on top of Temporal, since — as she states — no MCP client library implements task durability out of the box. She walks through the V1 task lifecycle (working → input-required → working → complete/canceled/failed) and its two weak points: an unfiltered `task/list` endpoint that can't scale past a handful of tasks, and an `input-required` flow tunneled through a fragile long-running session. She previews the V2 spec (per a May blog post from the foundation now hosting MCP), which drops `task/list`, moves tasks into an optional "extension" on top of a stateless core, and replaces the session-based elicitation with a client-side update call resembling a Temporal signal — while leaving the task lifecycle itself unchanged. She closes by flagging two open problems even under V2: polling still doesn't scale to millions of tasks (a notifications-based fix is in progress), and she's working toward a reference client implementation in FastMCP.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=s4r6nk5WsZw
- Duration: 23:54
- Playlist index: 981
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> I know it's 1 minute ahead, but these 20-minute sessions are really short, so I'm going to get started. So, title of my talk you all have seen cuz you're all here, which is why the heck aren't any agents supporting MCP tasks. If you don't know what tasks are, don't worry, you will know in just a moment. But, the first answer to that question is, well, cuz they're smart. The people who are building those clients are smart. What I mean by that is that the MCP tasks specification that came out in November was marked as experimental. And so, well, you might shrug and say, well, gosh, those clients and servers, they're all supporting a whole bunch of experimental things. Why not MCP...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/s4r6nk5WsZw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
