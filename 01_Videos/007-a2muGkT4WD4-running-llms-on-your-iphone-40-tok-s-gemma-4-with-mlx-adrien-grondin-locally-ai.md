---
video_id: "a2muGkT4WD4"
playlist_index: 7
title: "Running LLMs on your iPhone: 40 tok/s Gemma 4 with MLX — Adrien Grondin, Locally AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=a2muGkT4WD4"
duration: "10:51"
duration_seconds: 651
view_count: 5689
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/a2muGkT4WD4.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T09:58:33+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Adrien Grondin, developer of the Locally AI app (just acquired by LM Studio), shows in a ten-minute talk that running an LLM on an iPhone is now easy: install Apple's MLX Swift LM package, pick a quantized model ID from the MLX Community on Hugging Face, and pass it to the framework. His thesis: on-device models are fast enough to be useful, with a small Gemma 4 model at about 40 tok/s on the latest iPhone and around 20 tok/s on older ones. He advises 4-bit to 8-bit quantization and names model download size, about 1 to 3 GB, as the main barrier."
---
# Running LLMs on your iPhone: 40 tok/s Gemma 4 with MLX — Adrien Grondin, Locally AI

## Summary
Adrien Grondin builds Locally AI, a fully native chatbot that runs on-device models on iPhone, iPad and macOS through MLX, Apple's framework optimized for Apple Silicon. The app can also chat with Apple's own foundation model. In this short, demo-led talk he argues that putting a language model inside an iOS app is now simple and fast enough for real use. He also announces that LM Studio has just acquired Locally AI.

**The three-step recipe**
- Install the MLX Swift LM package from GitHub in your iOS, iPadOS or macOS app. He leaves the integration to "your agent" and says the API is simple enough to get a model running in under 10 minutes.
- Go to the MLX Community organization on Hugging Face. It holds about 4,000 to 5,000 models. New lab releases appear there about 30 minutes after launch, in variants from BF16 and MXFP4 to 4-, 5-, 6- and 8-bit.
- Pass the model ID to MLX Swift LM. Its Hugging Face integration downloads the weights for you.

For Python or Mac apps he points to the wider MLX ecosystem: MLX VLM for vision models, MLX Audio for speech, and MLX Video for image and video generation. He says the ecosystem now covers omni models, text-to-speech and speech-to-speech.

**Quantization and speed**
Full-size weights are too large for a phone, so pick a quantized version. His range is 4-bit to 8-bit: below 4-bit, output quality drops sharply, and 8-bit is the upper bound for really small models. A small Gemma 4 model runs "easily" at 40 tok/s on the latest iPhone, live and offline, which he calls "more than acceptable" for many use cases. Older iPhones reach about 20 tok/s, still useful. He also ships tiny Liquid models fast enough to run inside Apple Shortcuts for text-processing automation. Qwen and Hugging Face's SmolLM models also run.

**Limits**
The main barrier is the download: about 1 to 3 GB per model. He expects it to shrink as models get smaller and smarter and iPhones get faster. Not every open model runs well on iPhone, so Locally AI ships a curated list. In Q&A he confirms MLX Swift LM supports tool calling, and says models are much better at it than a year ago. Structured generation is not supported yet; separate packages on top of MLX Swift LM work on it.

**LM Studio**
LM Studio downloads any model from Hugging Face and runs it with llama.cpp or MLX, so you can compare engines. It can also serve models locally through OpenAI- or Anthropic-style APIs.

## Why it matters
- It gives a concrete on-device baseline: about 40 tok/s for a small Gemma 4 model on a current iPhone and about 20 tok/s on older ones.
- The 4-bit floor and 8-bit ceiling is a simple, practitioner rule for choosing quantization on phones.
- It names the real bottleneck for on-device apps as model download size (1 to 3 GB), not inference speed.
- Tool calling in MLX Swift LM, without structured generation yet, marks where on-device agent features stand.

## Metadata
- Video: https://www.youtube.com/watch?v=a2muGkT4WD4
- Duration: 10:51
- Playlist index: 7
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [music] >> Okay, hello everybody. I'm going [clears throat] to show you today how to run Gemma 4 on iPhone with MLX. So, first let's introduce myself. I'm Adria. You can find my Twitter if you want to learn more about all on device things. I'm a developer of Locally AI, so maybe you have already seen the the app. So, Locally AI is a chatbot that allow you to run on device models on your iPhone with MLX. So, I will just go through what is MLX in a in a few few seconds. Basically, as I said, it's it's a chatbot. It's fully native. You can also chat with Apple Foundation with it. And and many models like that are compatible with MLX. And one of those models is Gemma 4. So, basically, [clears...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/a2muGkT4WD4.txt]]
- Description cue: See more:

## Book angles
- Could support a chapter/section on **Models & Inference**.
