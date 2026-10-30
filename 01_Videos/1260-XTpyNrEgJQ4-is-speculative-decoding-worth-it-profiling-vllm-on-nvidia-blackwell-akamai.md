---
video_id: XTpyNrEgJQ4
playlist_index: 1260
title: "Is Speculative Decoding Worth It? Profiling vLLM on NVIDIA Blackwell — Akamai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=XTpyNrEgJQ4"
duration: "15:17"
duration_seconds: 917
view_count: 4800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/XTpyNrEgJQ4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T19:05:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Akamai shares a practical take on Is Speculative Decoding Worth It? Profiling vLLM on NVIDIA Blackwell. Key angle: emphasizes evaluation and measurement; covers model serving or inference tradeoffs."
---

# Is Speculative Decoding Worth It? Profiling vLLM on NVIDIA Blackwell — Akamai

## Summary
Akamai shares a practical take on Is Speculative Decoding Worth It? Profiling vLLM on NVIDIA Blackwell. Key angle: emphasizes evaluation and measurement; covers model serving or inference tradeoffs.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=XTpyNrEgJQ4
- Duration: 15:17
- Playlist index: 1260
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> My name is Sheila. I'm a DA at Akami and we're here today to discuss um the topic speculative decoding and how you can um figure out whether it's worth enabling for your workloads. Okay, I'm a little anxious. Okay. So, typically when you ask LLM a question, there are usually two phases that happen under the hood. The first is the model would read your prompt, process all the input tokens and then build what is known as a KV cache um which is essentially the model's working um memory um for the rest of the request. And this happens only once. Um and then you have the decoding phase which is uh when the model starts to actually write the answer. Um so because every token depends on the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/XTpyNrEgJQ4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
