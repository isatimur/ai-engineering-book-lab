---
video_id: -tviRdpmHvs
playlist_index: 1022
title: "Training Krea 2: What matters in generative model training — Sangwu Lee, Krea.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-tviRdpmHvs"
duration: "21:46"
duration_seconds: 1306
view_count: 701
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-tviRdpmHvs.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:11+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Krea.ai's Sangwu Lee details the Krea 2 training pipeline: dedup, captioning, autoencoder filtering, Wikipedia concept coverage, and RL/preference-optimization stages for diffusion models."
---

# Training Krea 2: What matters in generative model training — Sangwu Lee, Krea.ai

## Summary
Sangwu Lee (Krea.ai) describes the training pipeline behind Krea 2 and its open-sourced medium variant, contrasting it with production models like ChatGPT-image and Nano Banana Pro, which he says trade output diversity for reliability by mode-collapsing toward "boring average" results. He details a data curation stack built on roughly 30-40 in-house classifiers: hash-based dedup (pHash, MD5) followed by embedding-based near-duplicate removal (SSCD, SigLip), a captioning pipeline that runs OCR before a vision-language-model pass, and sparse autoencoders trained on vision models to surface unsupervised tags (watermarks, blur, signatures) used for filtering. The team deliberately strips AI-generated images from training data to avoid inheriting a distilled "ChatGPT/Nano Banana" look, and boosts world-knowledge coverage by mining Wikipedia concepts above the 90th percentile of page rank, echoing the original CLIP paper's approach. Training follows a staged pipeline — low-to-high resolution pretraining, mid-training, SFT, pairwise preference optimization, then a GRPO-style RL stage scored by reward servers for text rendering and anatomy — plus a separate small LLM that expands short user prompts into long, in-distribution prompts. Lee says the team is now working on training specialized expert models (e.g., photography, text rendering) and merging their capabilities into a single student model.

## Why it matters
- A granular, numbers-and-technique-level account of what "data curation" means in practice at billion-image scale (dedup methods, sparse-autoencoder tagging, Wikipedia-driven concept coverage) — rare specificity for a data pipeline write-up.
- Shows LLM post-training patterns (pairwise preference optimization, GRPO-style RL, reward servers) migrating into diffusion model training, illustrating cross-modality convergence of training recipes.
- Gives a named, specific case of the diversity-vs-reliability tradeoff and mode collapse in production image models, useful as a counter-example when discussing model evaluation.

## Metadata
- Video: https://www.youtube.com/watch?v=-tviRdpmHvs
- Duration: 21:46
- Playlist index: 1022
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay. So, I am Sangwha. I'm from Korea. I'm going to be talking a little bit about how we recently trained our like image foundation model Create 2, as well as and we also recently like open-sourced the medium version of our model. So, I'll be like talking about like how we like trained that mostly from research perspective. Later in the day, uh like my colleague will also give a little bit of details on like infrastructure and training infrastructure and like everything that needed to be like set up for that. But, today I'll mostly be talking about like research. Also, public speaking is not one of my best abilities. So, take that in mind. But, anyways, I'll go ahead and start....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-tviRdpmHvs.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/krea-ai/krea-2>
- resource: <https://re-n-y.github.io/devlog>
