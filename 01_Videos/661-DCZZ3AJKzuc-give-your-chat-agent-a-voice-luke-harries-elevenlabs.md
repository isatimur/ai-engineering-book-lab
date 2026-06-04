---
video_id: DCZZ3AJKzuc
playlist_index: 661
title: "Give Your Chat Agent a Voice — Luke Harries, ElevenLabs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=DCZZ3AJKzuc"
duration: "8:12"
duration_seconds: 492
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/DCZZ3AJKzuc.txt"
themes:
  - "Voice & Realtime"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-05-09T18:24:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Luke Harries argues that voice is becoming a natural front end for existing chat agents, and that the fastest path is often to wrap a proven text agent with a dedicated voice engine for STT, TTS, turn-taking, and telephony."
---

# Give Your Chat Agent a Voice — Luke Harries, ElevenLabs

## Summary
Luke Harries argues that the quickest route to a usable voice agent is often **not** rebuilding the whole agent stack. Instead, teams can keep an existing chat agent with its tools and evaluation work intact, then attach a dedicated voice engine that handles speech-to-text, text-to-speech, turn-taking, languages, and phone delivery. The deeper claim is architectural: voice should often be treated as an interface layer wrapped around an already-capable agent runtime.

## Why it matters
- Shows a pragmatic migration path from chat agents to voice agents without throwing away existing tool-calling or eval infrastructure.
- Reinforces a recurring corpus theme: good agent systems are modular stacks, not monoliths.
- Useful for the book's voice/realtime chapter as evidence that low-latency interaction changes interface design more than it changes core agent logic.

## Metadata
- Video: https://www.youtube.com/watch?v=DCZZ3AJKzuc
- Duration: 8:12
- Playlist index: 661
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> And so really excited to talk to you about giving your chat agent a voice. Um and 2025 was the year of the chat agents. And I think you either like died a SAS or you became AI first by adding a chat agent to your app. And so lots of you probably saw this tweet which went viral where it was linear post hog SEO where they all went and added their home screen is now the chat interface. And I actually really agree with this. It's like that's the default way that you want to now be interacting with AI. You can use the tool calling, you can use the rag. It's just very declarative. It's a great quick start. You even have the government doing the same. This is the gov.uk um approach into...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/DCZZ3AJKzuc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
