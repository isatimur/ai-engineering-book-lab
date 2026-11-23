---
video_id: "c5-kx2bwoCk"
playlist_index: 25
title: "Running LLMs locally: Practical LLM Performance on DGX Spark — Mozhgan Kabiri chimeh, NVIDIA"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=c5-kx2bwoCk"
duration: "10:16"
duration_seconds: 616
view_count: 3346
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/c5-kx2bwoCk.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T10:50:35+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mozhgan Kabiri chimeh, developer relations manager at NVIDIA, benchmarks open models from 1.5B to 14B parameters served with vLLM on a DGX Spark (GB10 Grace Blackwell, 128 GB unified memory). Her thesis: local hardware does not replace the cloud but brings development closer to the developer, and quantization format matters as much as the hardware. A 14B model in NVIDIA's 4-bit floating-point format ran at 20.19 tokens/s against 8.40 for the 14B base model, with 3.4x faster time to first token, because memory bandwidth, not capacity, governs throughput. She shows a reproducible Docker harness with warm-ups and per-second GPU logging."
---
# Running LLMs locally: Practical LLM Performance on DGX Spark — Mozhgan Kabiri chimeh, NVIDIA

## Summary
Mozhgan Kabiri chimeh is a developer relations manager at NVIDIA. In this short, data-backed talk she asks what is actually practical on a single desk-side system. Developers hit two walls: they run out of memory, or they lack the right software stack, so they push everything to the cloud. There, shared infrastructure slows iteration, and production brings concerns about cost predictability, data residency and deterministic latency. Her answer is "not replacing the cloud, but bringing powerful AI development closer to the developer."

**The hardware and setup**
The DGX Spark runs on the GB10 Grace Blackwell superchip, with CPU and GPU sharing 128 GB of unified memory. With 4-bit support it fits models up to around 200 billion parameters. It runs the same NVIDIA software stack as data center deployments. She served quantized models with vLLM inside an NVIDIA-optimized container, so the environment matches production.

**A reproducible benchmark harness**
Every run, from 1.5B to 14B parameters, follows one protocol: Docker isolation, three mandatory warm-up runs, and background GPU metric logging at one-second intervals. An orchestrator script writes each run to a unique directory named by timestamp and sanitized model ID, with the full endpoint response, metadata and results. Time to first token is measured by timestamping the first chunk of the streaming response, because it "defines the user's perceived performance."

**The numbers**
- The 1.5B instruct model reached 61.73 completion tokens per second.
- The 14B model in NVIDIA's 4-bit floating-point format reached 20.19 tokens per second, nearly 10 times larger yet still faster than human reading speed. She calls it "a critical engineering sweet spot."
- The 14B base model dropped to 8.40 tokens per second.
- The quantized 14B model reached first token 3.4 times faster than the base 14B model.

**The key lesson**
"Memory capacity is not the same as the memory bandwidth." The 128 GB fits large models, but throughput depends on how fast data moves. Quantization raises "intelligence per byte", so a 14B model feels as responsive as a much smaller one. She recommends local hardware for steady-state workloads, privacy-sensitive data and rapid prototyping: run locally, iterate fast, then scale to data center or cloud.

## Why it matters
- Gives concrete local-inference numbers on one machine: 61.73, 20.19 and 8.40 tokens per second across model size and precision.
- The capacity-versus-bandwidth distinction explains why a model that fits in memory can still be too slow to use.
- Shows quantization format as a first-order design choice, worth a 2.4x throughput gain and 3.4x faster first token at 14B.
- The benchmark protocol (container isolation, warm-ups, per-second GPU logs, versioned run directories, streaming TTFT timing) is a reusable template for honest inference measurement.
- Frames local hardware as a complement to the cloud for privacy, cost predictability and iteration speed.

## Metadata
- Video: https://www.youtube.com/watch?v=c5-kx2bwoCk
- Duration: 10:16
- Playlist index: 25
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> Hello everyone. I'm Moska Gabricima, developer relations manager at Nvidia, where I work closely with developers building and deploying AI systems. Today, we're looking at running LLMs locally, practical LLM performance on the Jetson Spark. This isn't a theoretical talk. It's a data-backed journey through the trade-offs of modern AI infrastructure. Findings are based on hands-on experiments with the goal of understanding what's actually practical on a single system. The evolution in AI puts greater demand on developer systems, creating two main challenges. You either run out of memory or you do not have access to the right software stack. Then you end up and pushing everything to the cloud...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/c5-kx2bwoCk.txt]]
- Description cue: Moving LLM workloads from the cloud to local infrastructure requires a shift in engineering strategy. In this talk, I share my journey of serving and benchmarking open-source models (1.5B to...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.
