---
video_id: "89NuzmKokIk"
playlist_index: 170
title: "Strategies for LLM Evals (GuideLLM, lm-eval-harness, OpenAI Evals Workshop) — Taylor Jordan Smith"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=89NuzmKokIk"
duration: "32:28"
duration_seconds: 1948
view_count: 12883
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/89NuzmKokIk.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:42:17+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Taylor Jordan Smith, an AI developer advocate in Red Hat's AI business unit, argues that production LLMs need layered evals, built incrementally like a software test pyramid. The base is system performance (latency, throughput, GPU use), then output formatting, factual accuracy, and finally safety, bias and custom checks. The hands-on labs climb that pyramid on L4 GPUs: serve an IBM Granite model with vLLM and sweep latency and throughput with GuideLLM, score MMLU Pro with lm-eval-harness, and run a custom safety eval. She separates benchmarking (fixed datasets, model comparison) from evaluation (end-to-end) and wants evals in CI/CD."
---
# Strategies for LLM Evals (GuideLLM, lm-eval-harness, OpenAI Evals Workshop) — Taylor Jordan Smith

## Summary
Taylor Jordan Smith is an AI developer advocate in Red Hat's AI business unit. In this 9 a.m. workshop she argues that putting generative AI into production is risky, and evals are how you manage that risk. Her method is incremental: do not try to evaluate everything on day one. Build layers, the way software teams build unit, integration and end-to-end tests.

**Why evals, in enterprise terms**
She lists the drawbacks enterprises face: policy limits on which AI staff may use, legal exposure, bias from a mostly Eurocentric and US-based internet, cost and performance at scale, and knowledge cutoffs. Her examples are the AI overview that repeated a satirical Reddit post about glue, a biased image-generation model, and model collapse as each model generation trains on more synthetic data and loses diversity and precision. She says most Red Hat customers are still in the first three maturity phases (automation, chatbot, RAG), not agents.

**Benchmarking is a subset of evaluation**
Evaluation assesses a system end to end. Benchmarking uses controlled datasets and tasks to compare models or hardware, for example a latency score or MMLU. The right metrics depend on the system: RAG needs retrieval checks, and agents need tool-calling checks.

**The eval pyramid**
- Base: system performance. "No matter how good your model is", if it is not fast, reliable and affordable, it fails. That means throughput, concurrency and GPU use.
- Formatting: for example, the model reliably returns the JSON the application needs.
- Factual accuracy: MMLU-style benchmarks, plus accuracy on fine-tuning data. Red Hat runs a branch of MMLU on customers' proprietary data.
- Top: safety, bias and application-specific custom evals.

**The labs**
Each attendee gets a Red Hat Linux system with an L4 GPU. Lab one serves an IBM Granite model with vLLM in a container. She notes that vLLM loads safetensors directly, unlike TensorRT, which needs a format conversion. Then GuideLLM runs a sweep and reports time to first token, inter-token latency, and mean, median and P99 figures. P99 matters for SLOs. The main knob is input and output token length, set to match a chat or RAG use case. Lab two runs MMLU Pro through lm-eval-harness, which took about ten minutes. Lab three runs a safety example in a customizable eval tool (captioned "prompt fu"). Some lab instructions failed to update, and the room's Wi-Fi was slow.

**Closing advice**
She says cost estimation is close to "black magic": you have to map inference performance back to tokens. When an attendee asks how to link evals to live production behaviour, she answers that eval tests belong in a CI/CD framework, just like unit tests.

## Why it matters
- The eval pyramid gives a book chapter a clean order of operations: performance first, then format, accuracy, and safety and custom checks.
- It frames system performance (latency, throughput, P99) as an eval layer, not a separate ops concern.
- The clear line between benchmarking and evaluation helps readers who use the two terms as synonyms.
- It shows a concrete open-source stack (vLLM, GuideLLM, lm-eval-harness) that a team can run on one small GPU.
- It adds an enterprise reality check: most customers she sees are still at chatbot and RAG maturity, not agents.

## Metadata
- Video: https://www.youtube.com/watch?v=89NuzmKokIk
- Duration: 32:28
- Playlist index: 170
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Hello everybody. Um, my name is Taylor Smith. I am an AI developer advocate slashevangelist slashtechnical marketing and other titles depending on where I am. Um, I work at Red Hat in our AI business unit because yes, we do also do AI too now. Great. Um, I'm really happy to be here. This is my first time at this conference. So, I'm new to the conference, new to speaking at this conference, ready to have a good time and also relax in about an hour and a half and just learn stuff. stoked that this was at 9:00 am. Um, my presentation clicker isn't working, so I'm gonna be a little bit glued over here. But to kind of overview what we're going to do today, I'm going to talk a little bit...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/89NuzmKokIk.txt]]
- Description cue: Accuracy scores and leaderboard metrics look impressive—but production-grade AI requires evals that reflect real-world performance, reliability, and user happiness. Traditional benchmarks...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.redhat.com/en/products/ai>
