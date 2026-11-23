---
video_id: "_gVFUEdhCyI"
playlist_index: 9
title: "Gemma, DeepMind's Family of Open Models — Omar Sanseviero, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_gVFUEdhCyI"
duration: "15:26"
duration_seconds: 926
view_count: 18701
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/_gVFUEdhCyI.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T09:58:38+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Omar Sanseviero of Google DeepMind presents Gemma 4, released seven days before the talk, as Google's most capable open model family: small E2B and E4B models for phones, a fast mixture-of-experts model, and a 31B dense model that still fits a consumer GPU. His thesis: open models keep getting better without getting bigger and can now do agentic, multimodal work fully on device. He explains per-layer embeddings, the switch to an Apache 2 license, the Gemini-based multilingual tokenizer, 10 million Gemma 4 downloads in a week, and community fine-tunes for sovereign and low-resource language AI."
---
# Gemma, DeepMind's Family of Open Models — Omar Sanseviero, Google DeepMind

## Summary
Omar Sanseviero of Google DeepMind gives his first conference talk on Gemma 4, released seven days earlier. Gemma is DeepMind's family of open models: you can download them, run them on your own infrastructure or devices, and fine-tune them. His thesis is that open models keep improving "without going bigger", so capable, agentic models now run entirely on a phone.

**From Gemma 3 to Gemma 4**
Gemma 3, released a year earlier, ranged from 1B to 27B parameters and was the most capable open model that fit on a single consumer GPU. Gemma 4 is "the most capable" open family Google has released. It has four kinds of model:
- Two small models, E2B and E4B, that run on Android phones, iPhones and even a Raspberry Pi, with multimodal input and reasoning.
- A mixture-of-experts model for very low latency.
- A 31B dense model for the most "raw intelligence", which still runs on a consumer GPU.

On LM Arena, which he admits is an imperfect proxy for how much the community likes a model, Gemma sits in the top-left corner: small and highly capable. Community feedback also pushed a license change: Gemma 4 uses Apache 2.

**Demos, all offline**
An Android phone in airplane mode runs Gemma in a full agentic setup that picks skills, for example to play the piano, plus on-device coding. On a laptop, 10 Gemma instances run in parallel with llama.cpp, each drawing a different SVG, at about 100 tokens per second.

**What the 'E' means**
E2B means "effectively 2 billion" parameters: the model has about 4 billion. Per-layer embeddings, an architecture DeepMind released the previous summer, give each layer an embedding that works as a lookup table, not a matrix multiplication. That part can live in CPU memory or on disk while only the effective parameters load into the GPU. In llama.cpp, an override-tensor flag moves the per-layer embeddings off the GPU.

**Multimodal and multilingual**
The small models understand images, video and audio, including speech-to-translated-text. The larger model handles fine-grained video detail, pointing and object detection. Gemma 4 was trained on over 140 languages and uses a Gemini-based tokenizer. Because of that tokenizer, fine-tuning for low-resource languages such as Quechua tends to work "out of the box".

**The Gemmaverse**
Gemma 4 reached 10 million base-model downloads and over 1,000 derived models in its first week. The whole family has over 500 million downloads and over 100,000 models. DeepMind works with Unsloth, MLX, llama.cpp, Hugging Face, vLLM and SGLang so that developers do not have to switch tools to use a new model. Official variants include ShieldGemma, guardrail models for filtering content, and a Gemma 3-based medical model for radiology and chest X-rays. Community examples include AI Singapore for Southeast Asian languages and Sarvam, part of India's push for national models. A DeepMind paper used Gemma 3 to propose cancer therapy pathways that a lab then validated. Android Studio's agent mode has an offline option that runs Gemma locally; Android datasets were part of its training.

He closes by asking the audience to spend one hour in the next two weeks with the latest open models. For the most raw intelligence, use an API model; for on-device work, open models are ready.

## Why it matters
- Per-layer embeddings show a concrete architecture trick for phones: keep a lookup-table share of the parameters off the GPU and load only the effective parameters.
- The size range, from E2B on a Raspberry Pi to a 31B model on one consumer GPU, gives a clear map for choosing an open model by deployment target.
- The move to Apache 2 after user complaints shows that licensing, not only capability, decides open-model adoption.
- The multilingual tokenizer argument explains why a base model's design choices can matter more than its raw scores for low-resource language fine-tuning.
- His closing split, API models for raw intelligence and open models for on-device, private or offline work, is a usable rule for model selection.

## Metadata
- Video: https://www.youtube.com/watch?v=_gVFUEdhCyI
- Duration: 15:26
- Playlist index: 9
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [music] >> All right. Hi everyone. It's cool here. So I'm super excited to give this talk because just 7 days ago we released Gemma 4. So before this conference, who here has heard about Gemma already? Okay, so most of you. Great. So Gemma is Google DeepMind's family of open models. Open models means that these are models that you can take, you can download, you can run in your own infrastructure, your own devices. You can fine-tune for your own use cases. So about a year ago we released Gemma 3. Back then Gemma 3 were the most capable open models that could fit in a single consumer GPU. So we designed models from 1 billion parameters all the way to 27 billion parameters. And back then in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_gVFUEdhCyI.txt]]
- Description cue: Google DeepMind’s Gemma family is expanding. Join us for a deep dive into the latest models of the Gemma ecosystem. From vibe fine-tuning to Sovereign AI, you'll learn about the latest model...

## Book angles
- Could support a chapter/section on **Models & Inference**.
