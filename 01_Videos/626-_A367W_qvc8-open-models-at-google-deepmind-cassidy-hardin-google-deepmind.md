---
video_id: _A367W_qvc8
playlist_index: 626
title: "Open Models at Google DeepMind — Cassidy Hardin, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_A367W_qvc8"
duration: "19:02"
duration_seconds: 1142
view_count: 9933
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_A367W_qvc8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:24+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cassidy Hardin, a researcher at Google DeepMind, walks through the architecture of Gemma 4, launched the week before under an Apache 2.0 license. It comes in four sizes: a 31B dense model, the first Gemma mixture-of-experts (26B total, about 3.8B active, 128 experts with 8 active plus one shared), and effective 2B and 4B on-device models. She explains the 5:1 local-to-global attention, grouped query attention, per-layer embeddings kept in flash memory instead of VRAM, variable aspect ratio and resolution for images with a chosen soft-token budget, and a conformer audio encoder on the small models."
---

# Open Models at Google DeepMind — Cassidy Hardin, Google DeepMind

## Summary
Cassidy Hardin is a researcher at Google DeepMind. This 19-minute talk explains the architecture behind Gemma 4, launched the week before. Her thesis: small open models can now set "a new precedent", and the gains come from specific, explainable choices in attention, embeddings and multimodal encoders. Gemma 4 also moves to an Apache 2.0 license, chosen to make the models easier for everyday developers to take from testing to deployment.

**Four sizes, two jobs**
- 31B dense: multimodal, built for advanced reasoning, 256K context, native thinking, function calling and structured JSON output. She says it ranked third on the arena leaderboard and beats models over 20 times its size.
- 26B mixture of experts: the first MoE in the Gemma family. It has 128 small feed-forward experts, 8 picked by the router per pass, plus one shared expert three times the normal size that runs every pass. She gives about 3.8 billion active parameters (3.9 in one slide).
- Effective 2B and 4B: on-device models for phones, iPads and laptops, with text, image and audio input and text output.
- Both large models rank in the top six open models on the arena.

**Attention changes**
Local sliding-window layers alternate with global layers at 5:1 (4:1 on the E2B), and the last layer is always global. The window is 512 tokens on small models and 1,024 on large ones. Global layers still attend to every token, so they use grouped query attention: two queries share a key-value head in local layers, eight in global layers. To offset the fewer heads, global key-value heads are 512 long instead of 256.

**What "effective" means**
The E2B runs with 2.3 billion parameters but has 5.1 billion representational parameters. The trick is per-layer embeddings (PLE): every layer, 35 in the E2B and 42 in the E4B, gets its own 256-dimension embedding table. It sits in flash memory instead of VRAM, the main limit on devices, and is projected up to full size at the end of each decoder block.

**Vision and audio**
The large models use a 550 million parameter vision encoder and the small ones a 150 million parameter encoder. Gemma 3 needed pan-and-scan, which split an image into padded squares and processed them one by one. Gemma 4 adds variable aspect ratio and variable resolution, with spatial position encoding for 16x16 pixel patches. Every 3x3 grid of patches becomes one soft token. Developers pick one of five soft-token budgets: low for text-heavy apps, 560 or 1120 for OCR and object detection. A budget of 280 means 2,520 patches. Audio on the small models goes through a mel spectrogram, two convolution layers and a 35 million parameter conformer, for speech recognition and translation.

**Getting started**
Self-host from Hugging Face, Kaggle or a local model runner, or use the two large models hosted in AI Studio and Vertex for agentic prototypes and function calling.

## Why it matters
- Gives exact, citable numbers for a current open-weight MoE: 128 experts, 8 active, one shared expert, about 3.8B active of 26B.
- Per-layer embeddings in flash memory show a concrete way to beat the on-device VRAM limit, and explain what an effective parameter count means.
- The user-selected soft-token budget for images makes vision cost a developer choice: spend tokens on OCR, save them on text tasks.
- The local/global attention ratio plus grouped query attention is a clear case study of trading memory for long-context quality.
- The move to Apache 2.0 is a licensing data point for chapters on choosing open models.

## Metadata
- Video: https://www.youtube.com/watch?v=_A367W_qvc8
- Duration: 19:02
- Playlist index: 626
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone, my name is Cassidy and I'm a researcher at Google DeepMind. Today I'm really excited to share with you some of the technical improvements and architecture that we have with Gemma 4. Last week we launched Gemma 4 which is the latest addition to our family of open source models. Gemma 4 brought incredible improvements at a scale that has not been seen before. We have a family of very small models with incredible performance setting a new precedent for what's possible with small open source models. Gemma 4 comes in four sizes. We have two smaller effective models which are geared towards ondevice applications. These models have been adapted and and improved in order to provide...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_A367W_qvc8.txt]]
- Description cue: Open models are getting smaller, faster, and far more capable. In this talk, Cassidy Hardin walks through the latest advances in the Gemma family, with a focus on Gemma 4 and what it enables for developers building on-device and open-weight AI systems. She covers the architecture behind Gemma’s dense, effective, and mixture-of-experts models, including improvements to attention, multimodal support for text, vision, and audio, and the design decisions that make strong reasoning, coding, and agentic workflows possible at practical sizes.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uk.linkedin.com/in/cassidyhardin>
