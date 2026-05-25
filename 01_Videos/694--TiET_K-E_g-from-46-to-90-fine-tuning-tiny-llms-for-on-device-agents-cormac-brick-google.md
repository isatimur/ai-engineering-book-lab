---
video_id: -TiET_K-E_g
playlist_index: 694
title: "From 46% to 90%: Fine-Tuning Tiny LLMs for On-Device Agents — Cormac Brick, Google"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-TiET_K-E_g"
duration: "21:01"
duration_seconds: 1261
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-TiET_K-E_g.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cormac Brick, tech lead on Google's AI Edge stack, shows that tiny LLMs (sub-1B parameters) can become reliable function-callers through synthetic fine-tuning rather than prompting. The headline number: Function Gemma (270M params, built on Gemma 3) scored 46% out-of-the-box on app intent tasks, then jumped to 90%+ on 8 of 10 functions after fine-tuning on a synthetically generated dataset. He also demos a lightweight on-device skill harness built on Gemma 4, running on the LiteRT runtime, capable of lazy-loading skills on demand. Surprising angle: at 270M parameters, the model hits 2,000 tokens/sec prefill on a Pixel 7 — making voice-to-function-call workflows genuinely viable on legacy hardware."
---

# From 46% to 90%: Fine-Tuning Tiny LLMs for On-Device Agents — Cormac Brick, Google

## Summary

Cormac Brick leads Google's AI Edge stack — the LiteRT runtime (formerly TensorFlow Lite), LiteRT LLM, and MediaPipe — and this talk is a practical tour of what you can actually build on-device in 2025.

**The two-tier on-device architecture**

Google's framing distinguishes *System GenAI* (Gemini Nano delivered via AI Core, pre-installed, shared by all apps, ~3–4 GB once on device) from *App GenAI* (LiteRT LLM, embedded inside your APK, fully custom). AI Core is the zero-friction path; LiteRT LLM is the customization path, with the obvious tradeoff of APK size and more developer work. The same stack supports CPU, GPU, and NPU, and runs on 2.7 billion+ devices.

**On-device skills with Gemma 4**

The demo showcases a skill harness built on top of Gemma 4 in Google's open-source AI Edge Gallery app. The architecture is deliberately lazy: the model knows skill *descriptions* upfront but only loads full skill definitions on demand via a `load_skill` tool call. This keeps the prompt small. Skills themselves can include small JavaScript snippets that render custom UI in-app (the "restaurant roulette" demo spins a wheel rendered by the skill's own JS). The team had already built ~80 skills using Gemini CLI to write skills for skills.

**The 46% → 90%+ number**

For the app intents feature (add calendar, send email, etc.), Brick's team started with Function Gemma — a 270M-parameter model fine-tuned on Gemma 3 specifically for function calling. Out-of-the-box accuracy on their task set was ~46%. After synthetically generating a training dataset using Flash (larger model → synthetic data → fine-tune tiny model), they got 90%+ accuracy on 8 of 10 target functions. The remaining two had lower accuracy due to inherent task complexity.

**Why this matters for tiny models**

At 270M parameters, Function Gemma runs at ~2,000 tokens/sec prefill on a Pixel 7 — old hardware. This makes voice-to-function-call pipelines fast enough to feel responsive without a network call. Brick's Eloquent transcription app (iOS, not yet available in Europe) chains two sub-100M models — an ASR engine and a "text polisher" that removes filler words — both fine-tuned on Gemma 3 tech.

**Practical guidance**

- Start with AI Core (Gemini Nano) for most use cases; switch to LiteRT LLM only if you need custom models or unsupported capabilities.
- For narrow tasks below ~1B params, expect to fine-tune on synthetic data rather than prompting.
- The LiteRT LLM format (`.lltm`) bundles tokenizer and model into one file; Swift API is coming, at which point the iOS version of AI Edge Gallery will be open-sourced.

## Why it matters
- Establishes a concrete benchmark for on-device fine-tuning ROI: synthetic data fine-tuning can more than double accuracy (46% → 90%) for tiny models that would otherwise need a large system prompt that they can't handle well.
- The lazy skill-loading pattern is directly applicable to any agent system with a large tool surface area and limited context.
- Quantifies what "tiny" means in practice: 270M params, Pixel 7, 2k tokens/sec — this is the floor for viable on-device agent function calling today.

## Metadata
- Video: https://www.youtube.com/watch?v=-TiET_K-E_g
- Duration: 21:01
- Playlist index: 694
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Yeah, so while we wait for it to come up cuz I know we're short of time, uh I'm going to talk about um agents on device. So, I know whoever asked the question about skills and AI Core, we have an answer to that. Uh we've built a simple skill harness on top of AI Core that you can build skills on. We'll be able to show that. Also going to talk about Tiny LLMs, uh which are we would call LLMs that are like smaller than a billion parameters. They're small enough to build into your app if you want to have more customization or you want to do something that isn't already available for you in AI Core. So, that's the gist. So, uh quick overview of AI Edge, well, how we think about uh small...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-TiET_K-E_g.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
