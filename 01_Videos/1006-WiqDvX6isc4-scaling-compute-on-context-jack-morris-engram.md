---
video_id: WiqDvX6isc4
playlist_index: 1006
title: "Scaling Compute on Context — Jack Morris, Engram"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WiqDvX6isc4"
duration: "19:42"
duration_seconds: 1182
view_count: 526
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/WiqDvX6isc4.txt"
themes:
  - "Coding Agents"
  - "MCP & Tooling"
  - "RAG & Retrieval"
ingested_at: 2026-08-14T11:36:24+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jack Morris (Engram) frames private-data learning as scaling compute, not data, arguing naive fine-tuning collapses and self-improvement is the missing piece."
---

# Scaling Compute on Context — Jack Morris, Engram

## Summary
Jack Morris, of the startup Engram, argues that pretrained models scale on public data (Wikipedia, Reddit, arXiv, GitHub, plus hired-labeler data from firms like Scale AI, Surge AI, and Mercor) but never learn a person's or company's private context, so the real problem is scaling compute — not data — against a fixed private corpus. He shows that naive next-token fine-tuning on a fixed set (his example: 10K financial reports trained to a loss of 0.0001) makes the model memorize perfectly but collapse on generation, so it doesn't generalize. He surveys alternatives — KV-cache context compaction, on-policy distillation that trains a model to behave as if data were still in its context (citing the "cartridges" paper's self-study technique of generating synthetic Q&A pairs from the data), synthetic-data continued pretraining, and unsupervised RL with GRPO-style losses — and says each one eventually plateaus because the underlying dataset is finite. His proposed fix, and what Engram is building toward, is a self-improvement loop analogous to AlphaGo generating progressively harder training data as the model improves, so compute can keep adding depth on a fixed private dataset instead of hitting a data wall.

## Why it matters
- Names a concrete failure mode of naive private-data fine-tuning (loss to 0.0001, generation collapse) that's directly useful for any book section on personalization or continual learning pitfalls.
- Surveys and contrasts several real techniques (KV compaction, on-policy distillation, cartridges-style self-study, synthetic continued pretraining, RL environments) for teaching models proprietary data, giving a taxonomy rather than a single anecdote.
- Frames the open research question — self-improvement loops that avoid a "data wall" — as the actual frontier problem in continual learning, distinct from standard pretraining/post-training scaling.

## Metadata
- Video: https://www.youtube.com/watch?v=WiqDvX6isc4
- Duration: 19:42
- Playlist index: 1006
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[MCP & Tooling]]
- [[RAG & Retrieval]]


## Transcript excerpt
> [music] >> All right. Hi, everybody. Uh my name's Jack. I'm here to talk about scaling compute on context and also our startup N gram, which launched last week. Um more This isn't going to be like a super detail-oriented talk where I go through a lot of experiments we've been running or talk too much about what our models do. I just want to frame like the high-level problem of what we call scaling compute on context. People have many names for this. It's maybe like a a sub problem of continual learning or maybe even just the the answer that we see to the problem. Um I guess a little bit about myself at first. I'm Jack. I'm a researcher. I'm uh part of the startup N gram. You can see me on...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WiqDvX6isc4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **RAG & Retrieval**.
