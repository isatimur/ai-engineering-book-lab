---
video_id: pOvWgX7IJsc
playlist_index: 1073
title: "Can LLMs Write Fast Multi-GPU Kernels? — Simran Arora, Together AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pOvWgX7IJsc"
duration: "30:00"
duration_seconds: 1800
view_count: 3500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/pOvWgX7IJsc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-28T01:25:36+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Simran Arora (Together AI) on how better single-GPU kernels moved the bottleneck to multi-GPU communication, and whether frontier models can reason about the fundamentals — evaluated with a purpose-built benchmark, ParallelKernelBench."
---

# Can LLMs Write Fast Multi-GPU Kernels? — Simran Arora, Together AI

## Summary
Simran Arora, principal scientist at Together AI, argues the performance bottleneck has moved. Investment in better single-GPU kernels — flash attention, memory-efficient architectures, sparse attention, Mamba — plus better DSLs shifted the constraint from intra-GPU memory access to multi-GPU communication. She grounds the problem in hardware, walking through the memory hierarchy on an H100: register memory reaches about 130 TB/s but there is very little of it, and capacity grows as latency does, which she frames as simple physics. She then asks whether frontier models understand these fundamentals well enough to reason about them, and reports results on ParallelKernelBench, a benchmark her team built for multi-GPU kernel generation.

## Why it matters
- A team built its own benchmark because existing evals did not measure the thing that mattered — the book's argument that evals are built, not adopted.
- Tests model reasoning in a domain where correctness is checkable and performance is the score, so claims are falsifiable.
- Useful case of asking whether a model holds a mental model rather than whether it produces passing output.

## Metadata
- Video: https://www.youtube.com/watch?v=pOvWgX7IJsc
- Duration: 30:00
- Playlist index: 1073
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi everyone. Uh, sorry it's a bit loud in here. Was not expecting this. Um, I'm Siman. I'm a principal scientist at Together AI. Um, I previously did my PhD in the Hazy Research Lab with Chris Ray at Stanford and I'm an incoming professor at Caltech. Um I lead the frontier performance research team at together where we develop systems, frameworks and algorithms to extract as much performance as possible out of modern um AI hardware. Today I want to share a little bit about our contributions towards simplifying the development of uh multi-GPU AI kernels. A few years ago, um, GPU utilization used to be limited by poor intraGPU memory access and single GPU kernels. But with significant...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pOvWgX7IJsc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/togethercomputer/ParallelKernelBench>
