---
video_id: 2bvtay8wGYI
playlist_index: 973
title: "Scaling to Long Horizons — Ross Taylor & Chengxi Taylor, General Reasoning"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=2bvtay8wGYI"
duration: "18:07"
duration_seconds: 1087
view_count: 1100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/2bvtay8wGYI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-04T17:21:39+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ross & Chengxi Taylor (General Reasoning) trace Galactica's RL lessons to long-horizon RL: compaction, value-model critics, pipeline RL, and the money-losing football-betting Kelly bench."
---

# Scaling to Long Horizons — Ross Taylor & Chengxi Taylor, General Reasoning

## Summary
Ross Taylor (CEO of General Reasoning, formerly reasoning lead at Meta AI on Llama and Galactica, and a Papers With Code co-founder) recounts how Galactica — released two weeks before ChatGPT and undermined by base-model hallucinations — nonetheless beat PaLM, Chinchilla, and GPT-3.5 in scientific domains (68% vs. GPT-3.5's 49% on a math benchmark; 36% vs. PaLM's 19% on a chain-of-thought benchmark) using a 105-billion-token curated corpus, early multi-epoch training, and "thinking token" tags that anticipated later reasoning-token approaches like DeepSeek R1. He describes an unpublished internal Llama 2 recipe — continued pretraining on math/science data plus PPO with verifiable rewards, using an outcome reward model to initialize the value model — that reached state-of-the-art internal math results but never produced o1/R1-style inference-time reflection, concluding in hindsight that the missing ingredient was simply better base models, more RL compute, and larger context windows. Chengxi Taylor, co-founder and president of the company, then frames long-horizon tasks as fundamentally context-constrained (a decade-long proof like Fermat's Last Theorem would require tens to hundreds of billions of tokens against today's roughly 1-million-token windows), and describes RL-trained compaction, value-model critics to counter gradient variance and sparse rewards, and "pipeline RL" that trains on partially generated sequences (tolerating roughly up to eight steps of off-policy staleness) to keep GPUs busy during week-long rollouts. He cites the company's "Kelly bench" — agents building ML models to bet on a full season of Premier League matches starting from a 100K bankroll, where every frontier model tested lost money, a result covered on the front page of the Financial Times — as evidence current models are overfit to narrow, procedural coding tasks rather than open-ended, multi-agent, real-world complexity, and points to the company's Open Review platform (openreview.ai), which hosts over 350 RL environments behind a single API and is used internally as well as by other labs.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=2bvtay8wGYI
- Duration: 18:07
- Playlist index: 973
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Uh so this talk is called scaling to long horizons. My name is Ross. Uh I'm the CEO of GR. We're a London-based reinforcement learning company. Uh before GR, I was the reasoning lead at Meta AI working on Llamas, uh Galactica, lots of other models back in the day. I'm joined by Chengxi, uh co-founder and president of GR. Uh and yeah, hit today we're going to talk about algorithms, environments, compute, all the things you need to do to get agents scaling uh to kind of long with tasks. So we're going to have two parts of this talk today. I'm going to first of all start with a personal perspective about, you know, the early days, the golden age of language modeling in between like maybe 2020...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/2bvtay8wGYI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
