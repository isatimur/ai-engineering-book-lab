---
video_id: "ePMvfa8vgL8"
playlist_index: 470
title: "Customized, production ready inference with open source models: Dmytro (Dima) Dzhulgakov"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ePMvfa8vgL8"
duration: "18:55"
duration_seconds: 1135
view_count: 1620
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/ePMvfa8vgL8.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:19:39+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dmytro (Dima) Dzhulgakov, Fireworks AI co-founder and five-year core maintainer of Meta's deep learning framework, argues that open models beat one big proprietary model for narrow domains: a fine-tuned Llama 3 matches function-calling quality at up to 10x speed, and a GPT-4 bill of about 7 million dollars a year shrinks. The hard parts are setup, use-case-specific tuning and production readiness. Fireworks answers with a custom serving stack, cost minimised under a latency limit, thousands of adapter fine-tunes on one GPU, and FireFunction models as the core of compound AI systems."
---
# Customized, production ready inference with open source models: Dmytro (Dima) Dzhulgakov

## Summary
Dmytro (Dima) Dzhulgakov co-founded Fireworks AI and stood in for a co-founder who could not attend this AI Engineer World's Fair session in San Francisco. The founding team came from framework leads at Meta and veterans of Google AI, and he was a core maintainer of Meta's deep learning framework for five years. His thesis: open models are the future for GenAI applications, and the work is to make them production ready.

**Why go small**
Most production inference still runs on proprietary frontier models. But one model serves every use case the same way, and you pay for skills you do not need: a support chatbot does not need to know "150 Pokémons" or write poetry. That causes three problems.
- Latency: big models answer slowly, which hurts voice assistants and agents that call the model many times. Smaller models such as Llama or Gemma can match or beat quality in a narrow domain at up to 10 times the speed; on a Berkeley function-calling benchmark a fine-tuned Llama 3 performed similarly at 10x speed.
- Cost: a 5K-token prompt, 10,000 users and 20 calls each per day adds up on GPT-4o to about 10K dollars a day, about 7 million a year.
- Domain adaptability: open weights mean tens of thousands of variants on Hugging Face (code, medicine, Indian languages) and the freedom to tune your own.

**The three challenges with open models**
Complicated setup and maintenance (find GPUs, pick frameworks, re-optimise on every new release); optimisation settings that depend on the use case (latency versus throughput, short versus long prompts), where good choices give multiple-x gains; and production readiness (unreliable GPUs, scalability, telemetry, observability).

**How Fireworks responds**
- A serving stack built from the ground up, from custom CUDA kernels to deployment orchestration, tuned per workload. For long RAG prompts it uses caching and settings that raise throughput while holding latency; Artificial Analysis ranked it fastest on long prompts.
- Other modalities: fastest SDXL provider, and the only server of Stability's SD3, whose API routes to Fireworks.
- A framing for LLM performance: minimise cost under a latency constraint, for example a set number of tokens in two seconds. Cross-stack tuning to that cut-off gives multiple times the throughput, so fewer GPUs.
- Fine-tuning on the platform, and serving thousands of adapter fine-tunes on one GPU, so customers keep pay-per-token serverless pricing without fixed cost.

**Model is not the product**
Models hallucinate and no single model covers every modality, so apps become compound AI systems: RAG, chained models and external tools. Fireworks puts a function-calling model at the centre. Its FireFunction series (the latest released two weeks before the talk) powers an open-source demo: asked for a bar chart of the big three cloud providers' stock prices, it infers which companies, calls stock APIs and a chart API, adds Oracle when asked while keeping context, and drops context when the topic changes. It uses JSON and grammar modes for structured generation.

**Offering and scale**
Tiers run from serverless pay-per-token to dedicated on-demand hardware to enterprise contracts. Fireworks serves over 150 billion tokens per day for customers including Quora, Cursor and Upstage, and is OpenAI API compatible.

## Why it matters
- The cost example (5K-token prompts, 10,000 users, 20 calls a day, about 7 million dollars a year on GPT-4o) gives a reusable back-of-envelope for the case for smaller models.
- Minimising cost under a latency constraint is a clear, quotable way to frame inference optimisation for chapters on serving.
- Serving thousands of adapter fine-tunes on one GPU explains how per-customer customisation can stay serverless and cheap.
- The FireFunction chart demo is a compact illustration of function calling with multi-step reasoning and context handling inside a compound AI system.

## Metadata
- Video: https://www.youtube.com/watch?v=ePMvfa8vgL8
- Duration: 18:55
- Playlist index: 470
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hello everyone so my name is Dima um as mentioned uh unfortunately my co-founder Lino was on the schedule couldn't make it today because of some personal emergency so you got me and as you saw we don't have yet AI to figure out video projection but we have a for a lot of other things uh so today I'm going to talk about fireworks Ai and generally I'm going to continue this te which kin started about open models uh and how we uh basically focus on productionize but first uh as an introduction uh what's our background uh so the founding team of fireworks comes from PCH leads at meta and some veterans from Google AI so we combined have like probably decade of experience in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ePMvfa8vgL8.txt]]
- Description cue: Recorded live in San Francisco at the AI Engineer World's Fair. See the full schedule of talks at  & join us at the AI Engineer World's Fair...

## Book angles
- Could support a chapter/section on **Models & Inference**.
