---
video_id: zTLJNHj0DeQ
playlist_index: 670
title: "Why MLX — Prince Canuma, Neywa Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zTLJNHj0DeQ"
duration: "23:10"
duration_seconds: 1390
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/zTLJNHj0DeQ.txt"
themes:
  - "Models & Inference"
ingested_at: 2026-05-19T11:03:43+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Prince Canuma, founder of Neywa Labs and a core MLX contributor, makes the case that Apple Silicon is now the best platform for running production AI agents entirely on-device — no cloud subscription required. His central claim: MLX has crossed a threshold where you can run frontier-class open-source models (Gemma 4, Qwen 3 Omni) on a MacBook or iPhone, with 1-million-token context windows enabled by his own TurboQuant implementation (4× KV-cache compression, published 25 March, 700K Twitter views overnight). He demos real-time object detection, background blurring, and voice-cloning on a consumer Mac, and argues that accessibility — his father went blind in 2020 in rural Africa, where cloud latency and subscription costs make cloud AI unusable — is the moral driver behind on-device AI. The contrarian angle: MLX deliberately uses the GPU, not Apple's Neural Engine, because Core ML's private APIs block developer access; Canuma expects WWDC to change this."
---

# Why MLX — Prince Canuma, Neywa Labs

## Summary

Prince Canuma, a core contributor to Apple's MLX framework and founder of Neywa Labs, argues that on-device AI has crossed from hobbyist curiosity to production viability — and that Apple Silicon is uniquely suited to replace cloud inference for a broad class of workloads.

### The origin story

Canuma's father went blind in 2020, living in rural Africa where cloud subscriptions are prohibitively expensive and internet connectivity is unreliable. That constraint pushed Canuma toward on-device inference as a hard requirement, not a convenience. He joined the MLX project shortly after Apple released its M1 chip, became one of the framework's most prolific contributors, and three years later the ecosystem has over 1.5 million downloads and 4,000 ported models.

### What MLX is and what it can do

MLX is an array framework for Apple Silicon — conceptually similar to PyTorch or TensorFlow but designed from the ground up for the unified memory architecture of M-series chips. Key capabilities demonstrated in the talk:

- **Vision**: Real-time object detection (RF Detector by Roboflow) and background blurring running entirely offline on a Mac with no internet
- **Large models on-device**: Gemma 4 (released the week of the talk) running via `mlx_vlm.chat_ui` on a 96GB MacBook, with the demo explicitly turning off Wi-Fi to prove no cloud call is made
- **Audio stack**: Text-to-speech (Marvis, sub-100ms latency), speech-to-text (Whisper-class), and a modular speech-to-speech pipeline that chains ASR + LM + TTS with each component swappable per hardware budget
- **Video generation**: Cartoon video generation on a 16GB MacBook using MLX Video, with chained generation to maintain narrative coherence across clips
- **Robotics**: A consumer robot ("Richie Mini") powered by MLX vision + audio with real-time voice cloning of the JARVIS voice

### The TurboQuant breakthrough

Canuma published a TurboQuant implementation 30 minutes after the paper dropped (25 March), achieving a 4× reduction in KV-cache RAM usage. This enabled 1-million-token context windows on consumer hardware — a claim he backs with a public performance table showing throughput roughly doubles at 300K context. The tweet got 700K views overnight.

### The GPU-vs-Neural-Engine tension

A question from the audience surfaces a meaningful gap: MLX uses the GPU, not Apple's Neural Engine, because the Neural Engine requires Core ML's private APIs that are not currently accessible to developers without Apple's permission. Canuma notes the M5 chip has begun moving Neural Engine components into the GPU, and expects WWDC to clarify direction — at which point his team has internal projects ready for hybrid GPU/Neural Engine inference.

### The broader pitch

Canuma frames on-device as the future for privacy-sensitive applications, accessibility tools, edge robotics, and anyone who wants to eliminate per-token cloud costs. His closing demo — a robot with MLX-powered vision and audio — is the most explicit gesture toward where the ecosystem is heading.

## Metadata
- Video: https://www.youtube.com/watch?v=zTLJNHj0DeQ
- Duration: 23:10
- Playlist index: 670
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Good morning everyone. How many of you here have ever tried to run AI on your phone, on your MacBook? How was that experience? Was good? With MLX, yes. More or less? Okay. So, this talk today is for you. I'm going to show you how you can deploy and manage AI agents, or even voice agents if you will, completely on device using MLX. Today's agenda, of course, we're going to start with why on device. A lot of you use cloud code subscriptions and many other subscriptions. I want to convince you today to offload some of that subscription completely on device and then all you need to pay is your energy bill. Then I'm going to talk about MLX, and I'll give you a small demo and I'll show you some...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zTLJNHj0DeQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
