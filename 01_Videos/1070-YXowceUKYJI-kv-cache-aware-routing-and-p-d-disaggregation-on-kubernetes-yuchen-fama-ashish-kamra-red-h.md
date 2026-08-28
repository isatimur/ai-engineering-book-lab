---
video_id: YXowceUKYJI
playlist_index: 1070
title: "KV Cache-Aware Routing and P/D Disaggregation on Kubernetes — Yuchen Fama & Ashish Kamra, Red Hat"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YXowceUKYJI"
duration: "21:48"
duration_seconds: 1308
view_count: 2800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YXowceUKYJI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-28T01:25:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Red Hat's inference team shows how agentic traffic breaks classic LLM-serving assumptions — multi-turn sessions up to 3,000 turns, cache hit rates above 90%, input:output ratios over 100:1 — and covers KV-cache-aware routing and prefill/decode disaggregation as the serving answers."
---

# KV Cache-Aware Routing and P/D Disaggregation on Kubernetes — Yuchen Fama & Ashish Kamra, Red Hat

## Summary
Ashish Kamra and Yuchen Fama argue that public inference benchmarks report a sanitized steady state that agentic traffic never reaches. Real agentic workloads run multi-turn — from a few turns up to 3,000 — and reuse system prompts and tool definitions hard enough to push cache hit rates well past 90%, while input:output ratios often exceed 100:1. The talk covers KV-cache-aware routing and prefill/decode (P/D) disaggregation as the two serving techniques that exploit those properties on Kubernetes, closing with a case study on the GLM-5.2 coding model. Their operational point is a measurement one: capacity planning needs distributions and P90s, because with variance this high an average describes no real session.

## Why it matters
- Concrete serving-layer evidence that agent workloads break the assumptions classic LLM inference was tuned for.
- Names a measurement error directly — averaging hides the variance that decides whether an agent deployment holds up under load.
- Useful counterweight to benchmark-driven capacity claims: the published numbers and the production numbers measure different things.

## Metadata
- Video: https://www.youtube.com/watch?v=YXowceUKYJI
- Duration: 21:48
- Playlist index: 1070
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Um, welcome everyone to yet another inference talk. I hope you have had a good conference so far. And u, so in this session, I mean I'm sure you people who have been in the room uh must have heard these terms many times by now. So we're going to do a little bit more deep dive into the challenges of LLM deployments for agentic workloads and uh in this session we'll focus specifically on KV cache away routing and uh PD disagregation um and also you know when you when you look at public inference uh benchmark results you are typically looking at very steady state isolated highly sanitized numbers and what those benchmarks actually don't show you u is the chaotic reality of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YXowceUKYJI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/llm-d/llm-d>
