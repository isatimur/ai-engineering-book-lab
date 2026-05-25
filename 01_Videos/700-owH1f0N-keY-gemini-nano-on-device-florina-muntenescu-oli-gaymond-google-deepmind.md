---
video_id: owH1f0N-keY
playlist_index: 700
title: "Gemini Nano on device — Florina Muntenescu & Oli Gaymond, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=owH1f0N-keY"
duration: "19:38"
duration_seconds: 1178
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/owH1f0N-keY.txt"
themes:
  - "Coding Agents"
  - "MCP & Tooling"
  - "Voice & Realtime"
ingested_at: 2026-05-24T23:36:41+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Florina Muntenescu (developer relations engineer) and Oli Gaymond (PM for Android AI) at Google explain how Gemini Nano reaches Android devices via the AI Core system service — a shared model (~3–4 GB) installed once at the OS level so no individual app pays the storage cost. The ML Kit GenAI Prompt API gives apps text+image input, text output. Key practical issue: Nano currently only runs on recent flagships (Pixel 9/10 class); Firebase AI Logic's hybrid inference API lets apps fall back to cloud Gemini when the on-device model isn't available, maintaining consistent behavior across the device matrix."
---

# Gemini Nano on device — Florina Muntenescu & Oli Gaymond, Google DeepMind

## Summary

Florina Muntenescu is a developer relations engineer at Google, and Oli Gaymond is the PM for Android AI — he's been working on Android AI since before the field was called AI. This is primarily a Q&A-style session with a brief setup presentation, aimed at Android developers who may not know what's available for on-device inference.

**The three paths for on-device intelligence on Android**

1. **ML Kit GenAI APIs (AI Core / Gemini Nano)**: Access the shared system model. No APK size impact; Google handles model delivery, optimization, and hardware-specific tuning. The model (~3–4 GB) is installed once at the OS level; all apps share it via AI Core. Currently limited to roughly Pixel 9/10-class and equivalent OEM flagships.

2. **LiteRT LLM (custom models)**: Embed your own model inside your app. Full customization but you carry the storage cost and testing burden. This is the path if you need models not available in AI Core. (Covered separately in Cormac Brick's talk.)

3. **Cloud (Firebase AI Logic)**: Use Gemini API or Vertex AI from Android. For cases where the device model isn't available, or when you need more capable models (Pro, Flash Light, etc.).

**The hybrid inference pattern**

Firebase AI Logic launched hybrid inference support shortly before the talk: the SDK checks whether Gemini Nano is available on the device; if yes, run locally; otherwise, fall back to Gemini Flash in the cloud. This means you write one API call and get consistent feature behavior across the full device matrix — a significant reduction in conditional logic and testing surface.

**The ML Kit Prompt API**

The main access point for Gemini Nano: accepts text and image input, returns text. Additional specialized APIs exist (summarization, proofreading, rewriting) for common tasks. An embedding API is on the roadmap, which will enable on-device RAG-like solutions. For devices that don't meet the hardware threshold, the API gracefully fails and you route to cloud.

**Practical realities from Q&A**

- Battery impact from Nano is real for heavy batch workloads; AI Core handles scheduling and queuing so apps in the foreground get priority and background processing can run overnight on charge.
- Hundreds of apps sharing the same AI Core model is by design — centralizing the 3–4 GB cost is the whole point. System-level quota management prevents any single app from monopolizing the model.
- Building RAG with Nano is possible with the Prompt API today; the embedding API will make it much easier.

## Why it matters
- The shared-model-at-OS-level pattern is the practical solution to the storage and battery cost problem that blocked per-app model shipping — worth understanding for any mobile AI architecture decision.
- Hybrid inference (on-device when available, cloud fallback) is now a first-class API pattern on Android, removing the need to build conditional logic yourself.
- The device matrix constraint (only flagship devices) means feature planning must account for graceful degradation — not all users will hit the local path.

## Metadata
- Video: https://www.youtube.com/watch?v=owH1f0N-keY
- Duration: 19:38
- Playlist index: 700
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[MCP & Tooling]]
- [[Voice & Realtime]]


## Transcript excerpt
> [music] >> Hi everyone. I'm Florina Montanescu. I'm a developer relations engineer working on lots of things AI both intelligent experiences what we're going to talk about today and also developer productivity. So if you want to talk about that find me at the booth later on. I'm Ollie PM for Android AI. Our work spans a bit of everything. I've been working on this since before we called AI and back when we were calling it just ML. So we do a bit of everything from helping build features, things that run directly in the OS with applied AI. So things like background tasks that optimize the screen brightness and system memory and everything through to developer tools and infrastructure to make...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/owH1f0N-keY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Voice & Realtime**.
