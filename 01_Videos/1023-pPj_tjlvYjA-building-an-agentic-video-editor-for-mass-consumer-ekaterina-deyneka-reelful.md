---
video_id: pPj_tjlvYjA
playlist_index: 1023
title: "Building an Agentic Video Editor for Mass Consumer — Ekaterina Deyneka, Reelful"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pPj_tjlvYjA"
duration: "12:45"
duration_seconds: 765
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/pPj_tjlvYjA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-20T22:28:12+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Reelful's Ekaterina Deyneka describes an agentic video editor that plans, executes in a sandbox, composes via Remotion, and verifies before rendering user footage."
---

# Building an Agentic Video Editor for Mass Consumer — Ekaterina Deyneka, Reelful

## Summary
Ekaterina Deyneka, founder and CEO of Reelful, describes an agentic video-editing pipeline that takes user-supplied media plus a prompt and turns it into a rendered clip. The pipeline runs media understanding and speech transcription, produces a creative plan for user approval, then spins up a sandbox where an agent equipped with skills (cut rules for selecting moments, font pairing, B-roll generation) triggers sub-processes for music, voiceover, sound, and image animation. The agent assembles the result as code using Remotion, an open-source React-based video framework, and a verification layer checks the composition and lets the agent re-iterate before final render. Deyneka contrasts editing real footage with generating content from scratch: because footage can be messy or incomplete, the agent must decide what to keep and omit rather than work from a blank canvas, while still producing a professionally polished result. Reelful ships mobile-first, offers prompt-free "directional templates" (e.g., speak-to-camera, B-roll, voiceover) plus a manual editor for tweaks, and the company recently received a16z Speedrun funding.

## Why it matters
- Concrete instance of "agent writes code, not pixels": using Remotion to let an agent express a video edit as a React composition, wrapped in a sandbox-execute-verify loop with re-iteration on failure — a transferable pattern for agentic creative tooling.
- Names a real difficulty ordering for agent products: generating from a blank canvas is easier than editing imperfect real input, since editing requires selection/omission judgment under constraints.
- Shows a consumer-product mitigation for prompt friction — directional templates plus a plan-approval checkpoint before the agent executes — relevant to how agent products manage user trust and control.

## Metadata
- Video: https://www.youtube.com/watch?v=pPj_tjlvYjA
- Duration: 12:45
- Playlist index: 1023
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Hi everyone. I think we can start. Uh but before we start, I want to ask you a couple of questions. So, first of all, how many of you took a photo or video during this conference? Please raise your hands. Okay, and how many of you actually posted any video content from it online? Not that many. And um to be honest, that was me. I I was recording a lot of content during conferences, events, trips, meetups, uh and I never posted them online because video editing is hard. Uh it sounds and it is a lot of work. Uh it's tedious and it's largely still manual. So, and and it also feels like an art and not really automated. And that's why we're building RealFull and we're trying to tackle...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pPj_tjlvYjA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
