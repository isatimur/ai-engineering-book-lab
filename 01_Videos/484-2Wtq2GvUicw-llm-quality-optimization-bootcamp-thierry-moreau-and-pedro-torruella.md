---
video_id: "2Wtq2GvUicw"
playlist_index: 484
title: "LLM Quality Optimization Bootcamp: Thierry Moreau and Pedro Torruella"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=2Wtq2GvUicw"
duration: "53:05"
duration_seconds: 3185
view_count: 1122
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/2Wtq2GvUicw.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:20:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Thierry Moreau, OctoAI co-founder, with Pedro Torruella assisting, argues that fine-tuning is the run stage of LLM quality work: try prompt engineering, then RAG, and fine-tune only for a narrow task with plenty of good data. In a live notebook he builds 10,000 logged-style samples for PII redaction via function calling, trains a Llama 3 8B LoRA on OpenPipe, serves it on a shared OctoAI endpoint, and scores it against GPT-4 with a ground-truth accuracy metric: 0.97 versus 0.68, at 15 cents versus 30 dollars per million tokens, a claimed 200x cost cut."
---
# LLM Quality Optimization Bootcamp: Thierry Moreau and Pedro Torruella

## Summary
Thierry Moreau, a co-founder of OctoAI, runs a lunch-and-learn on fine-tuning, with his colleague Pedro Torruella helping from the floor. He targets two pains he sees in customers: a generative AI bill of tens or hundreds of thousands of dollars a month, and prototypes that never reach the production quality bar. The goal is to move from the high-cost, low-quality corner to the low-cost, high-quality one.

**Crawl, walk, run**
Fine-tuning is "not really a silver bullet". Start with prompt engineering (specificity, few-shot, chain of thought). Then add RAG to fill the gaps in the model's parametric memory. Fine-tune only after weeks of that fails, when the task is narrow (classification, extraction, function calling), you have plenty of good data, and cost is a driver.

**The deployment cycle**
Dataset, fine-tune, deploy, evaluate, repeat. Production data drifts, so "there is no Finish Line". His decision points:
- Data: real prompts with human responses are best, real prompts with GPT-4 or Claude responses are a middle ground, and fully synthetic is a fine start. Keep separate train, validation and test splits.
- Open versus closed: open source means you own the weights and can pick where to serve them.
- Size: start with Llama 3 8B or Mistral 7B and go bigger only if needed.
- LoRA versus full fine-tune: a LoRA is about 50 MB against a 15 GB checkpoint, and many LoRAs can share one GPU. Full fine-tunes help more with reasoning tasks.
- DIY versus SaaS for both training (Axolotl versus OpenPipe) and serving (vLLM, TensorRT-LLM, TGI versus a hosted endpoint).

**The demo: PII redaction by tool call**
The data is a 200,000-entry synthetic PII-masking set from Hugging Face with 54 PII classes across 229 subjects. The model gets a long system prompt listing the categories and a redact tool whose schema uses an enum of types. It returns a tool call, not redacted text, so downstream code can mask, obfuscate, or map each entity to a consistent fake. Moreau formats 10,000 samples as logged LLM conversations in JSONL and uploads them to OpenPipe. OpenPipe makes a 90/10 split, picks the hyperparameters itself, and estimates about $40 to train a Llama 3 8B 32k-context base. He exports an fp16 LoRA and uploads it to the OctoAI asset library. The live upload fails, so he falls back to an asset he uploaded earlier and calls it through a standard chat-completions request.

**Evaluation and results**
The labels give ground truth, so no LLM judge is needed. The metric penalizes missed and spurious entities and uses a similarity match for near misses. On 100 test samples (about $1 of GPT-4 calls), GPT-4 averages 0.68 and the fine-tune 0.97. Moreau frames that as the gap between a prototype and the one or two nines that production needs. Cost: 15 cents per million tokens on OctoAI against $30 for GPT-4, about 150 tokens per second, and no extra charge for serving a fine-tune.

He also warns that a GPT-4 judge may favor GPT-4's own answers.

## Why it matters
- It gives a clear ladder for when to fine-tune (prompting, then RAG, then fine-tuning), with entry criteria: a narrow task, your own data, and cost pressure.
- It is a full worked example of a small open model beating GPT-4 on a structured function-calling task, with the scores and per-token prices stated.
- Returning a tool call instead of rewritten text is a reusable design that separates detection from the redaction policy.
- The LoRA serving point (50 MB adapters sharing one GPU) explains why fine-tunes can cost the same as base models.
- The ground-truth scoring, plus the warning about self-preference in GPT-4 judges, is useful material for an evals chapter.

## Metadata
- Video: https://www.youtube.com/watch?v=2Wtq2GvUicw
- Duration: 53:05
- Playlist index: 484
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] so welcome everyone thanks for making it to this lunch and learn uh my goal today is to make sure that I get to uh share my knowledge and experience on llm fine-tuning uh just to get a quick sort of pull from the audience here how many of you are have heard of the concept of fine-tuning here okay so quite a few people how many of you have actually had hands-on experience in fine-tuning llms okay all right that's pretty good uh that's more than I'm usually used to I mean this is quite a fantastic that in this conference the makeup of AI engineer is close to 100% that's not a something I'm generally used to when presenting at other you know hackathons and conferences so I feel like...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/2Wtq2GvUicw.txt]]
- Description cue: Lunch & Learn: In this bootcamp we demonstrate how smaller open source models, fine-tuned to excel at specialized tasks (e.g. classification, function calling etc.) can deliver comparable if...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://colab.research.google.com/drive/1DVw6vfEtzYV7QfcVXhmmjTVBOiJiJ02b>
