---
video_id: 5dCAmSDOAjI
playlist_index: 1029
title: "The Next Medium: Why Real-Time Interactive Video Changes Everything — Ahmed Ahres, Reactor"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=5dCAmSDOAjI"
duration: "17:30"
duration_seconds: 1050
view_count: 1100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/5dCAmSDOAjI.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
  - "Voice & Realtime"
ingested_at: 2026-08-20T22:28:23+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ahmed Ahres (Reactor) argues real-time interactive video is a new medium, demos live prompt-driven scene changes, and calls evaluating world-model consistency an unsolved research problem."
---

# The Next Medium: Why Real-Time Interactive Video Changes Everything — Ahmed Ahres, Reactor

## Summary
Ahmed Ahres, head of go-to-market at Reactor (a Series A startup building infrastructure for real-time "world models"), argues that today's video generation models (he names Veo and Sora, plus one other model whose name is garbled in the transcript, transcribed as "C dance 2") are a "slot machine": you prompt once and get back a fixed, uneditable file, whereas real-time, programmable video is a genuinely different medium. He grounds this in two historical analogies — GPS turning static maps real-time enabled Uber, and digital cameras turning film real-time (see-what-you-shoot) enabled Instagram and TikTok — and runs a live demo prompting a cat into an already-running, real-time-generated video of a dog. He splits current real-time video models into three categories: infinite/interactive video generation, character-controllable "world models" like Google's Genie 3 (cited use cases: games, branching interactive narrative in the style of Netflix's Bandersnatch, generating synthetic training data for robotics, and experiential education), and live interactive avatars for customer support, training, sales, and streaming. Reactor exposes four named models via API — Helios (an interactive video model from ByteDance), a Genie-3-like world model trained by Alibaba (transcribed as "Link Bot"), a multi-shot consistent-story model from Nvidia (transcribed as "Long Live 2"), and an Nvidia video-to-video editing model (transcribed as "Sound Streaming") — reachable, per Ahres, in about ten lines of code. In Q&A he states that evaluating consistency and fidelity in real-time world models is an unsolved problem across the research community, including at DeepMind, and today is judged only by eye (human judgment), while a live demo ran at 16 FPS with 30 FPS reachable via multi-GPU inference, weight optimization, and quantization.

## Why it matters
- One of the few talks in this corpus arguing for an entirely new content medium (real-time interactive video) rather than an incremental LLM/agent feature — useful evidence for a "beyond text and chat" chapter on AI-native media formats.
- States plainly, from someone building in the space, that evaluation of real-time world-model consistency and fidelity is unsolved industry-wide and judged only by human eyeballing today — a concrete, named data point for a chapter on evals and reliability gaps in generative AI.
- Names concrete infrastructure constraints unique to real-time generative video (pixel streaming vs. batch inference, maintaining live session memory/context across a running generation, sub-100ms global latency requiring geographically distributed GPUs) — useful contrast case for how real-time AI product architecture differs from typical request/response LLM apps.

## Metadata
- Video: https://www.youtube.com/watch?v=5dCAmSDOAjI
- Duration: 17:30
- Playlist index: 1029
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]
- [[Voice & Realtime]]


## Transcript excerpt
> [music] >> Hi everyone. Welcome to the talk. First of all, thank you all for making the time. I know it's the last talk of the day probably or I think the last one is at 3:45 but yeah, thank you all for your time. I know you're all probably very busy. >> [snorts] >> Today I'm going to be talking about something that is a little bit slightly futuristic though not for San Francisco and that's world models. I know here it's written real time interactive video but the way we think about world models is really in the real time interactive video and I'll explain why. And in today's world I think world models is a little bit of a marketing term that people think about it from a Gaussian splatting...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/5dCAmSDOAjI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Voice & Realtime**.
