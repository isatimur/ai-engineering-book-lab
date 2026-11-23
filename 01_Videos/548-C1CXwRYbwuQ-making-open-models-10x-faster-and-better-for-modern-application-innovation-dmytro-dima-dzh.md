---
video_id: "C1CXwRYbwuQ"
playlist_index: 548
title: "Making Open Models 10x faster and better for Modern Application Innovation: Dmytro (Dima) Dzhulgakov"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=C1CXwRYbwuQ"
duration: "18:55"
duration_seconds: 1135
view_count: 1842
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/C1CXwRYbwuQ.txt"
themes:
  - "Models & Inference"
  - "Coding Agents"
ingested_at: "2026-04-24T12:23:22+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dmytro (Dima) Dzhulgakov, co-founder of Fireworks AI and a long-time core maintainer of a major open-source deep learning framework at Meta, argues that small, tuned open models beat big general models on latency, cost and domain fit: a fine-tuned Llama 3 can match function-calling quality at 10x the speed. He explains Fireworks' custom serving stack, tuning for cost under a latency limit, serving thousands of adapter fine-tunes on one GPU at per-token prices, and the shift from model-as-product to compound AI systems built around a function-calling model, shown with a FireFunction demo. He cites more than 150 billion tokens served per day."
---
# Making Open Models 10x faster and better for Modern Application Innovation: Dmytro (Dima) Dzhulgakov

## Summary
Dmytro (Dima) Dzhulgakov stood in for his co-founder at short notice. He is a co-founder of Fireworks AI, whose founding team came from deep learning framework leads at Meta and veterans of Google AI, and he was a core maintainer of that framework for five years. His thesis: open models are the future for generative AI applications, and the hard part is making them production-grade.

**Why go small**
Most production inference still runs on proprietary frontier models. They are good at many things, but they are served the same way for every use case, and you pay for capabilities you do not need: a support chatbot does not need to know "150 Pokémons" or write poetry. Three problems follow:
- **Latency**: big models respond slowly, which hurts voice assistants and agents that call the model many times. A fine-tuned Llama 3 can reach similar function-calling quality on a Berkeley benchmark at 10x the speed.
- **Cost**: a 5K-token prompt, 10,000 users and 20 calls each per day adds up to about 10K dollars a day on GPT-4 class models, or roughly 7 million a year.
- **Domain fit**: open weights allow tens of thousands of variants (code, medicine, Indian languages) tuned to your task.

**The challenges with open models**
Setup and maintenance (find GPUs, pick frameworks, download, tune, repeat on every release); optimisation, because the right settings depend on latency or throughput needs and prompt length; and production readiness, since GPUs are not always reliable and enterprise scale needs scalability, telemetry and observability.

**What Fireworks built**
A custom serving stack from CUDA kernels up to orchestration, tuned per workload. For RAG with long, often cacheable prompts, they tune for throughput while holding latency, and he says an independent benchmark (Artificial Analysis) ranks them fastest on long prompts. They serve SDXL, and Stability's SD3 API routes to their servers. His framing for LLM performance: minimise cost under a latency constraint, such as N tokens in two seconds; cross-stack tuning then gives several times the throughput, so fewer GPUs. Adapter fine-tunes can share one GPU, thousands of them, so customers keep serverless per-token pricing with no fixed cost.

**Compound AI systems**
The model is not the product. Models hallucinate and need grounding through RAG, no single model covers every modality, and apps need tools. He places a function-calling model at the centre, routing to specialised models and external APIs. Their FireFunction models are open on Hugging Face. In a live demo, a request for a bar chart of the big three cloud providers' stocks needs several steps: work out which companies, query prices, then call a charting API. Adding Oracle keeps context; switching to a cat photo drops it. The demo uses structured generation with JSON and grammar modes.

**Offering and scale**
Serverless per-token pricing, on-demand dedicated hardware, and enterprise contracts with tuning help. They serve more than 150 billion tokens per day for companies including Quora (Poe), Cursor and Upstage, and the API is OpenAI-compatible.

## Why it matters
- The cost arithmetic (5K-token prompt, 10,000 users, 20 calls a day, about 7 million a year) is a reusable way to show when a frontier model gets too expensive.
- Minimising cost under a latency constraint is a clear objective for inference tuning, better than chasing raw speed or raw throughput.
- Packing thousands of adapter fine-tunes onto one GPU explains how per-customer fine-tuning can keep serverless pricing.
- The demo shows the context rules a function-calling agent needs: keep context for follow-ups, drop it on a topic switch.

## Metadata
- Video: https://www.youtube.com/watch?v=C1CXwRYbwuQ
- Duration: 18:55
- Playlist index: 548
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] hello everyone so my name is Dima um as mentioned uh unfortunately my co-founder Lino was on the schedule couldn't make it today because of some personal emergency so you got me and as you saw we don't have yet AI to figure out video projection but we have a for a lot of other things uh so today I'm going to talk about fireworks Ai and generally I'm going to continue this te which kin started about open models uh and how we uh basically focus on productionize but first uh as an introduction uh what's our background uh so the founding team of fireworks comes from PCH leads at meta and some veterans from Google AI so we combined have like probably decade of experience in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/C1CXwRYbwuQ.txt]]
- Description cue: Generative AI powers the next generation of real time applications. The key to success of modern application development in the Gen AI era is secure, latency-sensitive and low cost LLM serving...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Coding Agents**.

