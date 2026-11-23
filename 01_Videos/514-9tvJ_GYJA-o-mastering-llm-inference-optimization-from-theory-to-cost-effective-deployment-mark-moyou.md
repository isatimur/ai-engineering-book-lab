---
video_id: "9tvJ_GYJA-o"
playlist_index: 514
title: "Mastering LLM Inference Optimization From Theory to Cost Effective Deployment: Mark Moyou"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=9tvJ_GYJA-o"
duration: "33:39"
duration_seconds: 2019
view_count: 40517
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/9tvJ_GYJA-o.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:21:53+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mark Moyou, an NVIDIA architect who works with retail clients, builds intuition for why LLM inference cost is driven by the KV cache. He walks from tokenization and prefill to one-token-at-a-time decoding, shows that key and value matrices are the model's memory, and gives a rule of thumb: parameters times two equals FP16 gigabytes, so a Llama 8B on a 20 GB L4 leaves 4 GB for tokens. He then covers what to measure (time to first token, token-to-token latency, total generation time, input and output length histograms across four query patterns), and NVIDIA tooling: TRT-LLM engines compiled per GPU, Triton, in-flight batching, FP8 and seasonal engines."
---
# Mastering LLM Inference Optimization From Theory to Cost Effective Deployment: Mark Moyou

## Summary
Mark Moyou is an architect at NVIDIA who works mainly with retail clients and now focuses on LLM inference. He squeezed a planned 45-minute session into about 20 minutes. His goal is to sharpen intuition for what happens on the GPU, how to size and measure a deployment, and how to control cost, which he sees as the main barrier to scale. Most teams he sees run a hybrid: some queries to a big-box API, some to a hosted open-source or fine-tuned model.

**The workload, step by step**
Text is tokenized into token IDs (a token is about four characters; the Llama tokenizer has 128,000 tokens), then turned into a matrix of embedding vectors. Prefill computes attention over the whole prompt, per user: a million users sending 10,000 tokens each means a million times 10,000 attention computations, while other users are still generating. Decoding then produces "one token that's generated at a time", and each new token goes back onto the GPU. The query, key and value projections come from the model weights. Key and value are "your llms memory": the KV cache means each new token only attends against stored state instead of reprocessing the prompt. Llama has 32 attention heads, so 32 KV caches run at once.

**Memory rule of thumb**
Parameters times two gives FP16 gigabytes. A Llama 8B takes 16 GB, so on a 20 GB L4 only 4 GB remain for KV cache. On the GPU "it's either the model weights or tokens". Unlike other models, you rarely pack several LLMs on one GPU; the spare space is all KV cache.

**What to measure**
- Time to first token (attention and prefill quality under load), token-to-token latency (should stay flat as sequences grow), and total generation time.
- Four query patterns drive cost and performance: long input short output, long input long output (the most costly; data scientists sending huge prompts "are killing my deployment"), short input long output, and short-short. Benchmarks often cherry-pick one or two.
- A 2D histogram of input vs output sequence length sets engine maximums from real traffic. Users may be allowed 4,000 tokens but send about 1,300.
- Box plots of completion time, and the slope of time to first token against input length. An open-source tool called gen perf produces these plots.

**Tooling and direction**
TRT-LLM compiles an engine for one specific GPU; it cannot move to another GPU. Triton serves it and many other frameworks through one C++ server. Features include in-flight batching, quantized and paged KV cache, tensor parallelism within a node and pipeline parallelism across nodes. FP8 on Hopper and Ada Lovelace halves memory at almost the same accuracy; Blackwell brings FP4. NVIDIA inference microservices package tuned configurations, and build.nvidia.com gives a thousand free requests for benchmarking.

**Q&A**
He proposes "seasonal engines" built for different daily traffic patterns, and expects agents to change query patterns again. Long contexts are costly, so models train short and interpolate; flash attention and NVLink across 72 GPUs attack the same attention bottleneck.

## Why it matters
- The parameters-times-two rule and the L4 example make GPU memory budgeting for KV cache concrete.
- It names the four input/output length patterns as the real cost driver, and warns that benchmarks cherry-pick them.
- Sizing engines from a measured input/output histogram, and even seasonal engines, is a practical capacity-planning method.
- It gives a monitoring checklist (TTFT, token-to-token drift, TTFT slope against prompt length) for production LLM serving.
- FP8 as half the memory at near-equal accuracy explains why precision is a direct cost lever.

## Metadata
- Video: https://www.youtube.com/watch?v=9tvJ_GYJA-o
- Duration: 33:39
- Playlist index: 514
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] it's very difficult to teach um extremely technical material in about 20 20 minutes initially I had planned for at least a 45 minute session so I left some reading material for you at the end and um all of the resources you could download slides and everything so feel free to take screenshots or not and so I work at Nvidia I'm a Architects I work primarily with retail clients and it's my job to essentially work with those clients understand sort of what their main challenges are this is data processing computer vision um across all of the different use cases and then now I'm focused on llm inference so my hope today is that um you get a better intuition of exactly what's happening...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/9tvJ_GYJA-o.txt]]
- Description cue: LLM inference is not your normal deep learning model deployment nor is it trivial when it comes to managing scale, performance and COST. Understanding how to effectively size a production grade...

## Book angles
- Could support a chapter/section on **Models & Inference**.

