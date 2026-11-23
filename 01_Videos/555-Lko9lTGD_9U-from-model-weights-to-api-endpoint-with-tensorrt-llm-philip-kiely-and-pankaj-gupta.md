---
video_id: "Lko9lTGD_9U"
playlist_index: 555
title: "From model weights to API endpoint with TensorRT LLM: Philip Kiely and Pankaj Gupta"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Lko9lTGD_9U"
duration: "1:40:01"
duration_seconds: 6001
view_count: 5019
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Lko9lTGD_9U.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:23:40+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Philip Kiely (developer relations) and Pankaj Gupta (co-founder) of an inference platform run a two-hour workshop on TensorRT-LLM. Their thesis: an optimized engine is a made-to-measure suit, built for one GPU, sequence length, batch size and precision, and the payoff is worth the steep learning curve. They build a TinyLlama 1.1B engine by hand on a rented 4090, then an FP8 engine at half the size, explain why FP8 makes KV-cache quantization practical, automate the build with their open-source Truss framework, and benchmark with percentiles to show performance is not linear in batch size. They close on autoscaling and cold starts."
---
# From model weights to API endpoint with TensorRT LLM: Philip Kiely and Pankaj Gupta

## Summary
Philip Kiely leads developer relations and Pankaj Gupta is a co-founder at the inference platform where they both work. In this two-hour workshop they take a model from weights to a production API endpoint with NVIDIA's TensorRT-LLM. Their thesis: optimizing a model is like a made-to-measure suit from a tailor, not a one-size shirt. You must know your GPU, sequence lengths, batch size and precision in advance, and the performance is worth the steep learning curve.

**What TensorRT and TensorRT-LLM are**
TensorRT takes a model's computation graph, finds patterns, and compiles an optimized engine for NVIDIA GPUs. TensorRT-LLM adds plugins for LLM work (flash attention, LoRA, Medusa heads, paged attention, speculative decoding), in-flight batching, which Gupta calls a 10x or 20x gain you must have, and kernels tuned to specific input and output sizes. Trade-offs: engines are not portable across GPU types, some parts are not fully open source, and engines are large, which slows cold starts. It covers about 50 foundation models plus Whisper, which fits because it is an autoregressive encoder-decoder transformer.

**Performance claims**
On a third-party benchmark, Artificial Analysis, their optimized 7B deployment reached 216 perceived tokens per second and 180 ms time to first token, mostly network latency; GPU time was under 50 ms. Newer GPUs gain more than raw specs suggest, because the compiler uses architectural features: SDXL on TensorRT gained 25 to 30% on an A10G and 70% on an H100. Compared with another popular serving framework, Gupta says TensorRT-LLM won most of their tests because it is optimized from CUDA kernels through a C++ batching engine to Triton. The gain matters most at A100 and H100 scale, not on one or two small GPUs.

**FP8 and parallelism**
FP8 post-training quantization takes about five minutes, is hard to tell apart in quality, and is about 40% better in most scenarios. Weights quantize easily, but the KV cache did not survive int8 in practice; FP8's exponent bits give the dynamic range to quantize both. Quantizing both sides lets tensor cores speed up the compute-bound prefill phase. Calibration on a dataset sets per-layer min and max ranges. Tensor parallelism splits matrices across GPUs and saves latency; pipeline parallelism does not, so it is rarely used for inference.

**The live build**
On a rented RTX 4090: install TensorRT-LLM from NVIDIA's package index, download TinyLlama 1.1B with HF transfer at about 1 GB per second, convert the checkpoint (format, some quantization, tensor-parallel splits), build a 2 GB engine, and run it. The FP8 rebuild came out at 1.2 GB with near-identical output. Then they automated the same build through a YAML config in Truss, their open-source serving framework: 2,000-token input and output, batch size 64, int8 because the A10 lacks FP8 support.

**Benchmarking**
Measure time to first token, per-user tokens per second (30 to 50 matches reading speed; code needs more) and total throughput, at p50, p90, p95 and p99. Performance is not linear: on one model, time to first token barely moved from batch 32 to 64, then jumped at 128. In the demo, total throughput rose from 5,000 to 7,000 tokens per second as concurrency went from 32 to 64. Batch-manager logs show active requests and KV-cache blocks in use (832 used, 4,500 free).

**Production**
Engines run on Triton. Autoscaling uses a forked Knative so settings apply in about a second. Scale to zero only works with fast cold starts: they aim for under 10 seconds for 10 GB models and under a minute for 50 GB models.

## Why it matters
- The made-to-measure framing explains why optimized inference engines tie you to one GPU, shape and precision, and why that matters for autoscaling.
- Gives a clear mechanical reason FP8 is a turning point: it makes KV-cache quantization practical and lets tensor cores speed up prefill.
- The non-linear batch-size result is a strong argument for percentile benchmarking before production, not a single quick test call.
- The cold-start targets (10 GB in under 10 seconds, 50 GB in under a minute) show what scale to zero really demands.
- A useful cost rule of thumb: framework-level gains matter at hundreds of thousands of dollars a year of GPU spend, less on one or two small GPUs.

## Metadata
- Video: https://www.youtube.com/watch?v=Lko9lTGD_9U
- Duration: 1:40:01
- Playlist index: 555
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] I am here with uh with Punk scupa he's the co-founder of base 10 um actually so today uh I was I was checking slack and in the random slack channel one of the people in the company uh was saying like hey you know I heard someone say call someone cracked what does what does cracked mean um and you know those uh those of you who are you know jenzy like me or or or know someone like that is like laughing right now because crack just means a uh an exceptional engineer and so Punk is the most crack software engineer I've ever had the uh pleasure of working with um he's uh from San Francisco his favorite model is llama 38b um we're going to be working with a smaller version of that today...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Lko9lTGD_9U.txt]]
- Description cue: TensorRT-LLM is the highest-performance model serving framework, but it can have a steep learning curve when you’re just getting started. We run TensorRT and TensorRT-LLM in production and...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.

