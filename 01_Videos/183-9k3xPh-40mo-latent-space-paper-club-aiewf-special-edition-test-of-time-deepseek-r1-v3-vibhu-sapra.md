---
video_id: "9k3xPh-40mo"
playlist_index: 183
title: "Latent Space Paper Club: AIEWF Special Edition (Test of Time, DeepSeek R1/V3) — VIbhu Sapra"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=9k3xPh-40mo"
duration: "53:54"
duration_seconds: 3234
view_count: 1195
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/9k3xPh-40mo.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T11:42:52+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vibhu Sapra hosts a live Latent Space Paper Club at the World's Fair. He launches a Test of Time paper club, a six-month course of 50 to 100 foundational papers, then revisits DeepSeek V3 and R1. His thesis: pretraining scale is hitting cost limits, and pure RL on verifiable math and code opened a new axis, test-time compute. He walks through R1-Zero (GRPO on a base model, aha moments), R1's four-stage pipeline, and SFT distillation into small models. The May 28 R1 update roughly doubled reasoning tokens (about 12,000 to 25,000), lifted AIME from 70% to 87.5%, and its 8B distill matches a 235B thinking model."
---
# Latent Space Paper Club: AIEWF Special Edition (Test of Time, DeepSeek R1/V3) — VIbhu Sapra

## Summary
Vibhu Sapra runs the Latent Space Paper Club, which has met every Wednesday at noon for about a year and a half without a missed week. It draws about 100 people a session, and 300 joined live for DeepSeek V3. At the World's Fair he does two things: he launches a second club, and he re-presents DeepSeek with the new May 28 R1 update.

**Test of Time paper club**
The new club is curriculum-based and runs from July to December, in person in San Francisco and remotely. Each week covers two to four foundational papers, 50 to 100 in total. Planned topics: deep learning foundations (attention, optimizers, basic RL), pre-LLM models (RNNs, LSTMs, BERT, GPT-2), scaling laws and distillation, generative models, fine-tuning (LoRA, DPO, GRPO), voice, inference optimization (speculative decoding, flash attention), evals and recommender systems. Sessions stay on YouTube as a reference.

**Why reasoning models were needed**
Sapra's framing: teams moved from Chinchilla-optimal training to heavy overtraining for cheap inference, with Llama 3 at 15 trillion tokens and newer runs near 45 trillion. Another 10x is not cost-efficient. Earlier test-time hacks such as MCTS, beam search and process reward models never got close to o1. What worked was "native pure beautiful scaled up RL." He adds that GPU export limits pushed DeepSeek to get clever with efficiency.

**DeepSeek V3, R1-Zero and R1**
V3 is the base: 671B parameters with 37B active, multi-head latent attention, multi-token prediction for sample efficiency, about 15 trillion tokens, context extended from 32K to 128K, and a claimed training cost near $5 million. R1-Zero applies GRPO directly to the base model, with rewards for verifiable accuracy (correct math, compiling code) and format (thinking inside think tags). Reflection and "aha moments" emerge as reasoning gets longer. But readability is poor and it mixes languages. R1 fixes this in four stages: a cold-start SFT on a few thousand human-annotated chain-of-thought examples, reasoning RL, rejection sampling over 800,000 samples (600,000 reasoning, 200,000 chat), and a final RL stage for helpfulness.

**Distillation beats RL for small models**
DeepSeek distilled R1 traces into Qwen and Llama models from 1.5B to 70B with plain SFT. Running RL directly on a 32B base model for 10,000 steps did worse than distillation.

**The May 28 update**
Only post-training changed, and the name stayed the same. Average reasoning tokens on AIME roughly doubled, from about 12,000 to 25,000, and the AIME 2024 score rose from 70% to 87.5%. Sapra puts it at o3 and Gemini 2.5 level. It adds native function calling and JSON output and hallucinates less. A new distill into an 8B model (captioned "Quen 3 8B") gains about 10% over the old distill and matches a 235B thinking model. Sapra notes that the DeepSeek API was cheap at launch but unreliable, yet DeepSeek still takes about 10% of OpenRouter usage.

## Why it matters
- It gives a compact narrative of why test-time compute became the new scaling axis once pretraining scale got too expensive.
- The R1-Zero to R1 contrast shows what pure RL does well (reasoning) and what still needs SFT and RLHF (readability, chat).
- The distillation results, including RL on a 32B base underperforming SFT distillation, give a concrete recipe for building strong small models.
- The May 28 update is a data point that post-training alone, with longer reasoning, can move a model a full tier without a new base model.
- The Test of Time syllabus doubles as a ready-made reading list for a book's foundations chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=9k3xPh-40mo
- Duration: 53:54
- Playlist index: 183
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Okay, so Paper Club year in review. We've gone over a year, like a year and a half, no missed weeks. We've always done Paper Club and it's pretty interesting. You know, I don't think any of us expected it to get this far, but every week for the past year and a half, we have always done a paper club Wednesday at noon. We've had a bunch of authors come share their work. People from Nvidia, Meta, uh, Alen Aai, Amazon together, writer, bunch of authors come, we get direct one-hour sessions with them. They share their work. We get nice feedback. And, you know, some of these have started to do pretty well. On average, we get about 100 people in here every every session. And just for you...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/9k3xPh-40mo.txt]]
- Description cue: Recorded at the AI Engineer World's Fair in San Francisco. Stay up to date on our upcoming events and content by joining our newsletter here:

## Book angles
- Could support a chapter/section on **Models & Inference**.
