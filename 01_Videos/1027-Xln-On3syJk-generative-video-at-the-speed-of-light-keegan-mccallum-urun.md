---
video_id: Xln-On3syJk
playlist_index: 1027
title: "Generative Video at the Speed of Light — Keegan McCallum, uRun"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Xln-On3syJk"
duration: "8:43"
duration_seconds: 523
view_count: 1400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Xln-On3syJk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:19+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "uRun founder Keegan McCallum demos Helios, a distilled real-time video model, and argues efficiency, not just quality, is the frontier metric for generative video."
---

# Generative Video at the Speed of Light — Keegan McCallum, uRun

## Summary
Keegan McCallum, founder of uRun, an inference provider for interactive/generative video, argues the industry over-focuses on video-model quality (tracing that axis from the 2023 "Will Smith eating spaghetti" clip through Sora, Sora 2, and this year's SeeDance) while under-covering an efficiency axis. He demos Helios, a distilled 14B-parameter model built on a base he names as "Wan 2.1" (transcribed "Juan 2.1"), released in March, which generates near-frontier-quality video in real time at roughly 1/100th the cost of non-real-time generation, and states at least 40 real-time or long-horizon video models shipped this year. He quantifies the resulting cost curve: $10 buys about 3 hours of continuous generated video, $50 about 15 hours (close to a full day). Use cases he lists include a real-time "magic mirror" webcam transform, visual/accessible interaction for people who think in images rather than text, and content creation with sub-second in-generation steering in place of the current per-shot prompting workflow he estimates at roughly $10/minute. uRun's own product is a React component plus a programmable Python runtime for embedding interactive generative video in an app, with a CLI/MCP server so agents can build these pipelines directly.

## Why it matters
- Gives quantified economics for real-time generative video (cost per hour, an order-of-magnitude-plus cost drop for real-time vs. batch generation) — concrete figures for a book chapter on inference cost curves in generative/agentic systems.
- Names a shift in the interaction model: sub-second in-generation steering instead of prompt-and-regenerate cycles, relevant to a book's treatment of human-agent control loops and real-time system design (WebRTC/ICE/TURN, multi-model streaming pipelines).
- Frames "software factories" (CLI/MCP access for agents building generative-video pipelines) as an emerging developer surface — an example of agent-facing infrastructure outside the usual text/code-agent scope.

## Metadata
- Video: https://www.youtube.com/watch?v=Xln-On3syJk
- Duration: 8:43
- Playlist index: 1027
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> I am Keegan. I'm the founder of U Run, um, a new kind of inference provider focused around, uh, interactive media. And I'm here to talk about generative video. So, we hear a lot about generative video improving along the quality axis at the frontier. We have the classic Will Smith eating spaghetti from 2023. It is nightmare fuel and not something you would ever mistake for reality. In 2024, we got Sora and it gets a little better. It still has a bit of, you know, an AI feel to it, but it it's getting there. And Sora 2, you know, even better. But SeeDance this year, um, absolutely incredible. So photorealistic. And it's it's no wonder that we talk a lot about quality, but I'm here...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Xln-On3syJk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
