# Charles Frye

**Role:** Educator / Researcher, Modal  
**Organization:** Modal  
**Themes:** [[Models & Inference]]

## Overview

Charles Frye works at Modal (serverless GPU infrastructure) with a focus on ML infrastructure, GPU utilization, and inference engine performance. He brings a rigorous, measurement-first approach to questions about where compute bottlenecks actually sit in LLM workloads.

## Appearances in corpus

- [[228-y-UGrYbJsJk-what-every-ai-engineer-needs-to-know-about-gpus-charles-frye-modal|#228 — What Every AI Engineer Needs to Know About GPUs]] (Models & Inference)
- [[316-DeFF3J8T5Pk-how-fast-are-llm-inference-engines-anyway-charles-frye-modal|#316 — How Fast Are LLM Inference Engines Anyway?]] (Models & Inference)

## Key claims / positions

- Most AI engineers have a broken mental model of where GPU compute is actually spent — memory bandwidth, not FLOPS, is usually the bottleneck.
- Inference engine performance benchmarks are frequently misleading; conditions under which they were measured rarely match production.
- The gap between theoretical peak and achieved throughput is large and practitioner-accessible to close.
- Understanding hardware constraints lets you make better architectural decisions (batch size, quantization, KV cache sizing).

## Manuscript relevance

Chapter 4 (infrastructure) and Chapter 7 (reliability/performance) — GPU and inference fundamentals are under-covered in the manuscript; Frye's talks are the primary corpus sources for this layer.
