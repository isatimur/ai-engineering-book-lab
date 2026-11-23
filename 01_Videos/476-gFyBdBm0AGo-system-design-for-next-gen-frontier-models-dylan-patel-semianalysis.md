---
video_id: "gFyBdBm0AGo"
playlist_index: 476
title: "System Design for Next-Gen Frontier Models — Dylan Patel, SemiAnalysis"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=gFyBdBm0AGo"
duration: "18:29"
duration_seconds: 1109
view_count: 6643
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/gFyBdBm0AGo.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:19:54+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dylan Patel of SemiAnalysis argues that the apparent model stagnation exists because today's models are still 2022-scale models trained longer, and that 100,000-GPU clusters will soon bring models with tens of trillions of parameters. He splits inference into compute-bound prefill and bandwidth-bound decode (GPT-4 at 1.8 trillion parameters needs about 60 TB/s for 64 users at 30 tokens per second), and names what open-source serving of Llama 3 405B still needs: continuous batching, disaggregated prefill, and context caching. At scale, optics fail every few minutes and one slow GPU can cut training speed 25 percent."
---
# System Design for Next-Gen Frontier Models — Dylan Patel, SemiAnalysis

## Summary
Dylan Patel of SemiAnalysis gives a hardware-centred view of where frontier models are going and what it takes to serve them. His opening claim: people talk about model stagnation because the models in use (GPT-4, GPT-4 Turbo, GPT-4o) are largely 2022-era models, made smaller and trained longer. Anthropic's new 3.5 model is smaller than Opus yet better for the same reason. No truly larger model has shipped yet, "but we will soon".

**Prefill versus decode**
Inference has two workloads. Prefill (prompt processing) is compute-heavy: a 2,000-token prompt to GPT-4 costs about a petaflop, a 32,000-token prompt about 20 petaflops. Decode generates tokens one at a time and is memory-bandwidth-heavy: at a reasonable batch size all experts activate, so all 1.8 trillion parameters load for every token. Serving 64 users at 30 tokens per second each needs about 60 TB/s of memory bandwidth; an H100 has about 3. Decode is cheap on compute, which is why API prices show a three-to-one or four-to-one ratio between output and input tokens, for example $5 per million input and $15 per million output.

**What open-source serving of Llama 3 405B needs**
You cannot just run llama.cpp on a 405B model. He lists three techniques that labs use and open source still lacks or is building:
- Continuous batching. Batch size one in the cloud costs 10x to 100x more. Requests arrive at different times, so the server must add new users on every iteration.
- Disaggregated prefill. Run prefill on one set of accelerators and hand off decode to another. The main reason is noisy neighbours: one user who submits 10,000 database rows at once can slow time to first token and make tokens per second swing for everyone. Rate limits are "the most annoying thing ever", so isolation is the better fix. He believes OpenAI and Anthropic do this, and Together and Fireworks have hinted at it.
- Context caching. Google offers it for Gemini 1.5 Pro with up to 2 million tokens of context. Instead of fine-tuning a weaker open model, put your data in the context of the best model and cache the KV state rather than recompute it. For legal or contract review, prefill dominates API cost. The cache is too big for GPU memory, so it lives in CPU memory or storage; an open-source inference library is building this.

**The next generation of systems**
GPT-4 used about 20,000 chips for 90 to 100 days and about 2e25 FLOPs. OpenAI, xAI, Anthropic and others are building 100,000-chip clusters that could train GPT-4 in about three days and reach 1e26 to 1e27 FLOPs, enough for models with tens of trillions of parameters. Microsoft's Arizona site has about 100,000 GPUs at 150 megawatts. A planned 300,000-GPU cluster would cost about $500 million a year in power, on top of over $10 billion for the hardware. These clusters span buildings and cannot be fully connected.

**Reliability at scale**
Optical transceivers are unreliable. In a 100,000 to 500,000 GPU cluster something fails about every five minutes. Chips also vary (the silicon lottery). Training is synchronous, so one slow GPU slows everyone: a paper from a company captioned "bite dance" found one GPU, within NVIDIA's spec, that cut speed on a 20,000-GPU cluster by 25 percent until removed.

He ends on the hope many AGI researchers hold: that 100x compute will remove much of today's scaffolding against hallucinations.

## Why it matters
- The prefill/decode split with concrete numbers (petaflops per prompt, 60 TB/s versus 3 TB/s per H100) explains why output tokens cost more and why decode is a systems problem.
- Continuous batching, disaggregated prefill and context caching form a clear checklist for anyone serving large open models themselves.
- The noisy-neighbour argument links infrastructure design to user-facing latency and SLAs, and argues against rate limits as the main defence.
- Failure every five minutes and the 25 percent straggler slowdown show why reliability engineering dominates frontier-scale training.

## Metadata
- Video: https://www.youtube.com/watch?v=gFyBdBm0AGo
- Duration: 18:29
- Playlist index: 476
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] couple different things right like you know people have been talking about stagnation um and uh it's I I don't think anyone else anyone here sees that a lot of people have been talking about stagnation of models and a lot of a lot of that has to just do with the fact that we haven't seen a big capabilities leap uh the last bit uh but that that comes really from uh models that we're using today are largely the same as the models that were trained in 2022 right gp4 4 Turbo 40 those are just smaller models that are trained for longer so similar quality right um you know 3.5 CET came out recently but again that's actually smaller than Opus but it's somehow better because they trained it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/gFyBdBm0AGo.txt]]
- Description cue: Current and future hardware requirements for next generation frontier models.

## Book angles
- Could support a chapter/section on **Models & Inference**.
