---
video_id: GIRpQEfYf3U
playlist_index: 696
title: "Any-to-Any: Building Native Multimodal Agents - Patrick Löber, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=GIRpQEfYf3U"
duration: "16:21"
duration_seconds: 981
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/GIRpQEfYf3U.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-05-24T23:36:34+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Patrick Löber, member of technical staff on the Gemini API and AI Studio at Google DeepMind, builds a NotebookLM-style agent live to demonstrate any-to-any multimodal output. Key claims: Gemini's 1M-token context window fits 9+ hours of audio; context caching cuts repeated-query costs by 90%; native image generation (Nano Banana 2) and a real native audio-in/audio-out model (Gemini 3.1 Flash Live) are now callable via the same SDK pattern. The architecture insight: use a reasoning Gemini model as orchestrator with function-call tools that invoke specialized generation models — not one monolithic pipeline."
---

# Any-to-Any: Building Native Multimodal Agents - Patrick Löber, Google DeepMind

## Summary

Patrick Löber is a member of the technical staff at Google DeepMind, focused on the Gemini API and AI Studio. The talk builds toward a working NotebookLM clone step by step, exposing the plumbing required for true any-to-any multimodal agents.

**What "any-to-any" actually means today (and the honest caveat)**

Löber opens by showing a slide of all capabilities — text, image, audio, video, code in; text, image, speech, video, function calls out — and then immediately corrects it: these are still different models. The vision of one model doing everything is a roadmap item, not current reality. Today, you have the main Gemini series (multimodal understanding, text output only) plus specialized native generation models: Nano Banana 2 for images, a TTS model for speech, and Gemini 3.1 Flash Live for real-time audio.

**Phase 1: Multimodal understanding**

The Google AI SDK lets you upload PDFs, videos, and MP3s via the File API and pass them together in a single `client.models.generate_content()` call. Practical numbers: 1 minute of audio = ~1,920 tokens; Gemini's 1M token limit fits 9+ hours of audio or ~1 hour of video. For repeated queries on the same large file, context caching is built into the API and cuts costs by ~90%.

**Phase 2: Agentic multimodal generation**

The architecture places Gemini as the reasoning model, connected via function/tool calls to the specialized generation models. Löber defines two function declarations — `generate_image(prompt: str)` and `generate_audio(prompt: str)` — and passes them as tools to the Gemini model with an agent prompt that tells it to decide which concepts need visual diagrams and which sections need audio summaries. The model then calls these tools in a loop, reasoning about whether the assets are complete.

**Why native generation matters**

Because Nano Banana and the TTS model are trained on Gemini's world knowledge, they understand context at a level earlier models didn't. The image model can create a picture of the Golden Gate Bridge from an arrow drawn on a map, or correct math homework by understanding the math. The TTS model produces multi-speaker "podcast" audio and handles accents (Bavarian demo was demonstrated live).

**Real-time audio: the Live API**

Gemini 3.1 Flash Live is a single audio-in / audio-out architecture — no cascaded ASR-then-TTS pipeline. Available to try at ai.studio/live. For the NotebookLM clone this enables the "deep dive conversation" feature.

**Getting started**

Free API key at ai.studio; Gemini API Skill available to wire agents to the SDK automatically. Context caching is a single API flag. The pattern is transferable across domains — the same reasoning+tool-calling structure applies to any workflow that mixes understanding and generation.

## Why it matters
- The reasoning-model-as-orchestrator plus specialized-generation-models-as-tools pattern is the cleanest current architecture for multimodal output agents — contrasts with attempts to force one model to do everything.
- Context caching at 90% cost reduction for repeated large-file queries is a material cost consideration for any production multimodal app.
- The Live API's native audio-in/audio-out model eliminates the latency and quality degradation of the cascaded ASR + LLM + TTS stack.

## Metadata
- Video: https://www.youtube.com/watch?v=GIRpQEfYf3U
- Duration: 16:21
- Playlist index: 696
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Okay? I'm assuming yeah. Thank you everyone for joining the session. If you joined the previous session, we are switching slightly the topic and talking more about Gemini now, but I have two slides about Gemini as well. So, to make guest happy. I'm Patrick. I'm a member of the technical staff at Google DeepMind. I work on the Gemini API and AI Studio. And today I want to talk about any-to-any building native multimodal agents. So, I want to talk about multimodal understanding, multimodal generation, real-time interactions, and then also build an example app together. So, at the end of this session, you should be able to build this for yourself, a little notebook LM clone. So, what does...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/GIRpQEfYf3U.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
