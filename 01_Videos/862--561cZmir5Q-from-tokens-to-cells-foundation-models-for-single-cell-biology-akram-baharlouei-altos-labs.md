---
video_id: -561cZmir5Q
playlist_index: 862
title: "From Tokens to Cells: Foundation Models for Single-Cell Biology - Akram Baharlouei, Altos Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-561cZmir5Q"
duration: "16:57"
duration_seconds: 1017
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-561cZmir5Q.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
  - "RAG & Retrieval"
ingested_at: 2026-07-26T22:48:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A research talk on single-cell biology foundation models and data-quality tradeoffs, with no agent, verification, or regulatory content despite the health domain tag."
---

# From Tokens to Cells: Foundation Models for Single-Cell Biology - Akram Baharlouei, Altos Labs

## Summary
Akram Baharlouei (Altos Labs) surveys foundation models for single-cell biology, framed around cellular reprogramming (the Yamanaka factors) and the goal of a "virtual cell." The core domain-forced constraint is data quality, not model architecture: RNA-seq measurements are single time-point snapshots of a continuously changing cell, noisy from both biological heterogeneity and lab/instrument variation, so scaling the dataset alone doesn't fix the signal. Benchmarking work he cites (two NeurIPS papers) found that transformer-based single-cell foundation models — which treat a cell as a "sentence" of gene tokens and mask-predict expression BERT-style — often perform no better than simple linear baselines despite heavy compute cost, because compressing expression data into a latent vector loses information. Flow-matching models, which learn to match the full expression distribution rather than predict a mean, outperformed transformer- and autoencoder-based approaches in his comparisons. There is no discussion of agent deployment, verification, audit trails, or regulation in this talk — it is model-architecture research, not an operational AI-agent case study.

## Why it matters
- No agent, verification, or regulatory content here — this is representation-learning research for scRNA-seq foundation models, useful as background but not evidence for the thesis either way.
- The real domain-forced constraint is data, not compliance: single-cell measurements are noisy snapshots of a dynamic process, and transformer-style compression loses signal that flow-matching preserves.
- A negative case for the corpus scan: this talk sits outside the "regulated domain changes the constraints" thesis rather than confirming or denying it.

## Metadata
- Video: https://www.youtube.com/watch?v=-561cZmir5Q
- Duration: 16:57
- Playlist index: 862
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]
- [[RAG & Retrieval]]


## Transcript excerpt
> Okay, let's get it started. Uh My name is Akram. I'm a machine learning engineer at Altos Labs. Altos Labs is a biotech startup and the goal is to restore cell health and resilience through cellular rejuvenation to inverse disease and disabilities that can happen throughout the life. And the title of my talk is uh from tokens to cells. And this is uh my kind of view as someone without bio background to kind of looking into the engineering challenges of foundation models for single-cell biology. And what I want to talk about first, what is single-cell? Why do we care about single-cell? How do How do we measure it? What are the problems with the data, getting the data? And then looking at...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-561cZmir5Q.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **RAG & Retrieval**.
