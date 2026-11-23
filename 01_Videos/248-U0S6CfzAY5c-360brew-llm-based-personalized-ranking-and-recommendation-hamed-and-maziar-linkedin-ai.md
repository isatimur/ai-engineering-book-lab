---
video_id: "U0S6CfzAY5c"
playlist_index: 248
title: "360Brew: LLM-based Personalized Ranking and Recommendation - Hamed and Maziar, LinkedIn AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=U0S6CfzAY5c"
duration: "21:59"
duration_seconds: 1319
view_count: 2691
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/U0S6CfzAY5c.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:09:58+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Hamed and Maziar (LinkedIn AI) describe 360Brew, one LLM-based foundation model meant to solve all of LinkedIn's personalization and ranking tasks, with zero-shot use on new surfaces, in-context learning for cold-start users and instruction following. User history becomes a prompt (promptification). From an open-source model they build a 150B XL model through continued pre-training, fine-tuning and alignment, then distill step by step to 3B and 1B. Quality scales with data, model size and context length. Gradual pruning, mixed FP8 precision with an FP32 LM head, and sparse attention cut latency 7x and raised throughput 30x."
---
# 360Brew: LLM-based Personalized Ranking and Recommendation - Hamed and Maziar, LinkedIn AI

## Summary
Hamed and Maziar of LinkedIn AI tell how they built 360Brew, a large language model for personalization and ranking, and took it to production. Today's recommender systems are trained per task, optimized separately, slow to adopt new architectures and rolled out one by one. Their question: what if one model solved every task at once?

**Goals**
One foundation model with a holistic view of the member's journey on LinkedIn, plus three traits:
- **Zero-shot**: for a new surface, prompt the model with the task, the entity and the user instead of collecting data and building a new ranker.
- **In-context learning**: help cold-start users from a few examples or a short description of their interests.
- **Instruction following**: let members state niche interests in their own words and have the feed follow them.

**Building the model ("brewing")**
Maziar describes "promptification": turning profile, history and past interactions into a prompt with an instruction, profile details, past interactions with shown items, and a question about what the member will do with a new item. An off-the-shelf LLM does this only a little. The pipeline starts from an open-source model, upcycles it to control size and throughput, then runs continued pre-training, fine-tuning, instruction fine-tuning and alignment. The result is an XL model of about 150 billion parameters. It cannot serve online, so they distill it to about 3B. Heavy automation keeps the many stages manageable. Training a small model directly did not work well: "You have to first go big and then go small."

**Scaling levers**
Performance improved with more data, with model size (a mixture-of-experts series from 7B to 8x22B), and with context length, which sets how much member history the model sees. Performance fell at the longest contexts, which they attribute to the model generalizing poorly to long contexts, not to less useful history.

**Results**
The gap over production models grows as members have fewer interactions (under five, under 100), which they credit to the LLM's world knowledge. On four fully out-of-domain tasks, the model matched or beat production models trained for those tasks, letting teams launch surfaces faster.

**Serving at tens of thousands of QPS**
Hamed explains how to meet 400 to 500 millisecond latency:
- **Distillation** step by step, from 150B to 8B to 3B to 1B, works far better than one jump.
- **Gradual pruning** of heads and MLP layers, alternating with distillation, shows almost no quality loss; aggressive pruning upfront cost up to 1%.
- **Quantization**: FP8 everywhere hurt quality, so they use mixed precision. The LM head must stay in FP32, or the probabilities collapse and items cannot be told apart.
- **Sparse attention**: history items need not all attend to each other, and up to 500 candidates are scored in one prefill without attending to each other, using a custom attention-mask kernel.
Over four or five releases, latency fell 7x and throughput per GPU rose 30x.

**Q&A**
They track generalization with 50 to 60 internal and external benchmarks, including instruction following. Chronological order of history was good enough for most applications, since recommenders favor freshness, and smarter ordering can break KV caching. Balancing positives and negatives in context is the harder problem. Automation that pushes experiment results straight into a spreadsheet keeps iteration fast.

## Why it matters
- The go-big-then-go-small recipe, with step-by-step distillation and gradual pruning, is a concrete, tested path from a 150B quality model to a servable 1B to 3B model.
- The FP32 LM head finding is a sharp, specific lesson: low precision collapses the output probabilities that ranking depends on.
- Scoring up to 500 candidates in one prefill with a mask that stops them attending to each other is a reusable serving trick for LLM rankers.
- Results on cold-start users and on unseen surfaces show where an LLM's world knowledge beats task-specific production models.
- The emphasis on automation and a 50-to-60-benchmark suite shows the engineering cost behind making one model serve many tasks.

## Metadata
- Video: https://www.youtube.com/watch?v=U0S6CfzAY5c
- Duration: 21:59
- Playlist index: 248
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] Hi everyone. Very excited to be here and I'm Ahmed. This is Mazar. And uh today uh uh we're going to talk about our journey in leveraging large language models for personalization and ranking u and our path to production such a large model for uh for LinkedIn use cases. Oop uh recommendation ranking and personalization is deeply integrated our daily life. uh when you go to a feed to to read an article, when you're looking for a for a job, when you're searching for something, when you're buying something online, the the the back end uh powered by recommendation system tries to find the the the best uh content or best entity based on your uh your interest and and relevancy to to your...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/U0S6CfzAY5c.txt]]
- Description cue: We will give a talk about our journey of building a foundation model for solving ranking and recommendation tasks

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
