---
video_id: "liG97YXaTSA"
playlist_index: 233
title: "OpenThoughts: Data Recipes for Reasoning Models — Ryan Marten, Bespoke Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=liG97YXaTSA"
duration: "19:59"
duration_seconds: 1199
view_count: 3455
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/liG97YXaTSA.txt"
themes:
  - "Evals & Reliability"
  - "Models & Inference"
ingested_at: "2026-04-24T12:09:16+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ryan Marten (founding engineer, Bespoke Labs) presents OpenThoughts 3, an open reasoning dataset whose 7B model beats the DeepSeek R1 distill it set out to reproduce. His thesis: DeepSeek gave the field a training recipe (R1's final weights are SFT on 800K examples) but not the data recipe, and SFT distillation is easy and effective. From about a thousand experiments: sample 16 answers per question, a strong model can be a weak teacher, synthetic questions work, filter by difficulty or answer length, prefer few good sources over diversity, and answer verification barely helps for SFT."
---
# OpenThoughts: Data Recipes for Reasoning Models — Ryan Marten, Bespoke Labs

## Summary
Ryan Marten, a founding engineer at Bespoke Labs, presents OpenThoughts 3, released two hours before the talk. OpenThoughts is the project's effort to build the best open-source reasoning datasets. His starting observation: DeepSeek R1's released weights are DeepSeek V3 base fine-tuned on 800K SFT examples, 600K of them reasoning. RL produced the model that generated the data, but the final step was SFT. DeepSeek also released strong small distilled models without describing their data. So the field had a training recipe but not a data recipe. OpenThoughts sets out to find that "missing link".

**Results**
The 7B model trained on OpenThoughts 3 is the state-of-the-art open-data reasoning model across math, code and science, plus held-out benchmarks. It clearly beats the DeepSeek R1 distill at 7B. Trained on the same base model, the OpenThoughts recipe shifts the scaling curve above Nvidia's released Nano dataset. Scaling data improves accuracy, but each step costs exponentially more, so the recipe matters.

**Method**
The team split the pipeline into steps: source questions, mix sources, filter questions, generate answers with a teacher model, filter answers, and choose the teacher. They ran about a thousand experiments (their Hugging Face page shows over 5,000 datasets and almost 3,000 models). They found signal at the smallest scale, chose empirically, and then scaled, which Marten suggests mirrors frontier-lab practice.

**Key learnings**
- Sampling 16 reasoning traces per question performs about as well as 16 times more unique questions at the same total size. That gives a 16x scaling lever.
- A better model is not always a better teacher: "a brilliant researcher who's maybe a terrible lecturer." A smaller 32B model (captioned "Quen 32B") taught better than DeepSeek R1, and Claude was "a terrible teacher".
- Fully synthetic question sources beat scraped forum or human-written sources, and synthetic generation scales.
- Filter questions by LLM-rated difficulty or by the length of an LLM's answer. These beat embedding and fastText-style classifiers common in pre-training.
- What did not work: many diverse sources (a few high-quality sources won) and answer verification. Wrong answers to the hardest problems still help.

**Adapting the recipe**
Start from the recipe and iterate per domain. Difficulty labels worked best for code, response length for math and science. Use synthetic question generation when domain data is scarce; the team's open library is Curator. Evaluation is "paramount": their Evalchemy library handles sharding and parallelism, and small eval sets should run many times. The math benchmark has only 30 questions a year, so they ran each 10 times and averaged.

**Distillation can surpass the teacher**
On a legal task, classifying Supreme Court decisions, they took 2K questions, sampled five answers each, and dropped wrong answers. Here verification did matter. The fine-tuned 7B model surpassed R1. In Q&A Marten explains that plain SFT teaches long thinking because the training answers contain the thinking traces.

## Why it matters
- It reframes reasoning-model training as a data problem: plain SFT on good traces, not RL, produced R1's final weights and the OpenThoughts results.
- The 16-samples-per-question result and synthetic questions give teams with little domain data two cheap ways to scale.
- Teacher choice is empirical: benchmark strength did not predict teaching quality, a direct warning against defaulting to the strongest model for distillation.
- The split finding on verification (no help for general SFT, needed for the legal task) is a useful nuance for chapters on synthetic data quality.
- The evaluation advice (repeat tiny eval sets and average) is a concrete reliability practice for any small benchmark.

## Metadata
- Video: https://www.youtube.com/watch?v=liG97YXaTSA
- Duration: 19:59
- Playlist index: 233
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] I'm Ryan. I'm a founding engineer at Bespoke Labs. And today I'm going to talk to you about Open Thoughts, which is our project to create the best open-source reasoning data sets. And I'll be switching tack a little bit from our earlier discussions on reasoning and RL and focus on the reasoning part and you'll see why. So just so we're on the same page, we've talked a lot about reasoning, but what's actually going on here? So I like this graph from JSON which shows this incredible performance that's happened in the last several months where models are getting much much much better on certain benchmarks. Um, and if you look at that, this is reasoning. This is test time scaling. I...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/liG97YXaTSA.txt]]
- Description cue: Peel back the curtain on state of the art model post-training through the story of OpenThinker, a SOTA small reasoning model (outperforming DeepSeek distill), built in the open. Learn about...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Models & Inference**.
