---
video_id: "AUuktOQPWYg"
playlist_index: 528
title: "Decoding Mistral AI's Large Language Models: Devendra Chaplot"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AUuktOQPWYg"
duration: "18:16"
duration_seconds: 1096
view_count: 4106
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/AUuktOQPWYg.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:22:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Devendra Singh Chaplot, research scientist at Mistral AI, explains why and how Mistral releases open models. He traces the first year: a 7B dense model that was the first 7B to score 60 on a key benchmark, the 8x7B and 8x22B sparse mixture-of-experts models, and a 22B code model. Open source is complementary to profit: it is branding without a marketing team, customer acquisition and community-driven customization. He outlines pretraining, instruction tuning with masked prompts, and RLHF or DPO, notes that hyperparameters are still set by intuition, and advises prototyping on top commercial models, then fine-tuning a small open model for cost."
---
# Decoding Mistral AI's Large Language Models: Devendra Chaplot

## Summary
Devendra Singh Chaplot is a research scientist at Mistral AI. Speaking on an open models track, he covers why Mistral open-sources its models, how such models are trained, and when to choose open over commercial models.

**One year of releases**
Mistral started about a year before the talk. It released a 7B open model in September 2023, its first sparse mixture-of-experts open model (8x7B) in December alongside its API platform and commercial models, a flagship large model in February with strong reasoning and math, an 8x22B open model in April, and a 22B code model in June. The mission is to bring frontier AI to everyone, with a focus on developers. Principles: openness, portability (Azure, AWS, GCP, virtual private cloud, or on-prem with licensed weights), the best performance-to-speed ratio for a given size, and customization through an open-source fine-tuning library, a fine-tuning API and an open-source inference library.

**The open models**
- The 7B dense transformer was the first 7B model to reach 60 on a popular knowledge benchmark (captioned as MML), which he calls the bare minimum where models become useful. It runs at reasonable speed on laptops and phones.
- Mixture of experts keeps many total parameters for knowledge but uses only a small subset per token, so inference is fast and cheap.
- The 8x22B model adds better performance, a longer context window and multilingual support (English, French, Italian, German, Spanish and more).
- The 22B code model, trained on more than 80 programming languages, has instruct and fill-in-the-middle modes. He says it beats a 70B code Llama model, a 33B code model from another lab and a 70B Llama 3 while being much smaller. It is free in the chat interface, has IDE plugins, and API access free until about end of July.

**Why open source pays**
He calls it a misconception that open source competes with profit. Open models serve as branding and marketing ("we do not have a marketing team in house"), drive customer acquisition when users upgrade to proprietary models, and let the community find new ways to customize and deploy them.

**How models are trained**
- Pretraining: next-token prediction over tens of trillions of tokens. It needs heavy cleaning, deduplication and curation, because noisy data hurts. Runs cost tens to hundreds of millions of dollars, and small companies rarely get a second chance after a failed run. Hyperparameters do not transfer from small to large models; on a Llama 1 table he asks why one model has the layer count it has, and answers "we don't know".
- A pretrained model asked for a prime-checking function may describe the approach instead of coding it, but a function signature and docstring trick it into writing code. It knows the answer but is not aligned.
- Instruction tuning: prompt-response pairs (100 to hundreds of thousands), next-token loss with the prompt masked, about 100 GPUs for hours or days.
- Learning from human feedback: preferences are cheaper than full annotations; RLHF and DPO use them.

**Practical advice**
With commercial models use prompt engineering, few-shot, chain of thought and RAG, since they usually do not allow fine-tuning. Commercial models are easier for new apps. At production volume, open models fine-tuned on a task can beat them. The common path: prototype with the highest-end models, then fine-tune a 7B or 8x7B open model to optimize the performance-to-cost ratio.

## Why it matters
- Gives a model lab's own business case for open weights: branding without a marketing team, a path to paid upgrades, and community-led customization.
- The plain explanation of mixture of experts (many total parameters, few active per token) links architecture directly to inference cost.
- The three-stage training overview, with data and compute scale per stage, is a compact primer for engineers who fine-tune.
- The admission that large-model hyperparameters come from intuition, and a failed run may end a small lab's funding, shows how risky pretraining is.
- The prototype-on-commercial, fine-tune-open-for-production path is a concrete model-selection strategy.

## Metadata
- Video: https://www.youtube.com/watch?v=AUuktOQPWYg
- Duration: 18:16
- Playlist index: 528
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hi everyone I'm uh very excited to be here um I am very um happy that there is an open models track um so I'm going to talk about the um open models of mral AI and uh go a little bit deeper into why we do open source and how we do open source so first of all uh Mr Alia we uh started last June about one year ago uh we released our first open model M 7B in September 23 um and then after that in December we released our first mixture of experts open model 8X 7B uh and along with that we released our platform with model apis uh and also commercial models mral medium and M embed and then uh earlier this year in February we released M large which is our Flagship model uh which has the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AUuktOQPWYg.txt]]
- Description cue: In this talk, Devendra Singh Chaplot, Research Scientist at Mistral AI will explore the building blocks and training strategies that power Mistral AI’s large language models. It will feature...

## Book angles
- Could support a chapter/section on **Models & Inference**.
