---
video_id: z1dqv74SpUs
playlist_index: 1026
title: "Voice agents with Realtime Video — Sidney Primas, LemonSlice"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=z1dqv74SpUs"
duration: "26:36"
duration_seconds: 1596
view_count: 1400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/z1dqv74SpUs.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-20T22:28:18+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "LemonSlice's Sidney Primas describes training a causal, single-step video diffusion model for real-time avatars, its Trump/Roosevelt demo, and a bet on a future end-to-end EQ model."
---

# Voice agents with Realtime Video — Sidney Primas, LemonSlice

## Summary
Sidney Primas (CTO/founder, LemonSlice) frames the company's goal as the "Avatar Turing test": photorealistic, full-body avatars indistinguishable from a human on a video call, demonstrated via a Microsoft partnership that let visitors talk to a real-time Teddy Roosevelt avatar in a replica Oval Office, including real footage of Trump interacting with it and staying far longer than scheduled. Rather than compositing standard avatar rigs, LemonSlice trains its own video diffusion transformer as a human-focused "world model," using custom audio embeddings — Primas says standard audio encoders, trained on monotone audiobook data, don't transfer — to drive emotion and micro-expressions from a single input image. To make the model interactive they trained it with a causal attention mask so it only conditions on the past (ordinary video diffusion models are bidirectional), and cut denoising from roughly 30 steps to one step for real-time generation; the main open problem is error accumulation over long-running sessions, since some avatars run continuously for 8-16 hours, which he says LemonSlice has solved with an undisclosed method. He reports generation costs now comparable to a voice model despite far heavier pixel throughput, and describes a roadmap toward a single end-to-end model that unifies audio/video generation with an internal emotional state (an "EQ layer"), paired with a separate model for reasoning and tool calling, which he expects to see in the market within two to three years.

## Why it matters
- Gives concrete production numbers for real-time generative video — collapsing ~30-step diffusion to a single step, causal attention masking to make a bidirectional video model interactive, multi-hour continuous generation runs — specifics that are rare in avatar demos.
- Names "model hardness" (GPU/CPU orchestration, queues, interrupts, buffering to keep video stutter-free) as an underrated but critical cost of productizing real-time generative systems, a pattern applicable beyond avatars.
- The proposed split between an "EQ" model (emotional, real-time, end-to-end audio/video) and a separate "IQ" model (reasoning, tool calling) is a concrete architectural bet on how multimodal real-time systems might specialize and compose.

## Metadata
- Video: https://www.youtube.com/watch?v=z1dqv74SpUs
- Duration: 26:36
- Playlist index: 1026
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> My name is Sydney. I'm the CTO and founder of Lemon Slice. And Lemon Slice is on a mission to break the Avatar Turing test. What we mean by this is making an Avatar that is indistinguishable from a human on a video call. And all of this is of course making the Avatar photo-realistic. But there's actually a long tail of technical problems that we care a lot about that I'll be talking about today that we're planning to solve. those problems are things like getting the emotions right, getting the object interactions right, getting the like micro-expressions right, and even figuring out an internal state for these Avatars so that they feel like a real human being. So what I'm going...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/z1dqv74SpUs.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
