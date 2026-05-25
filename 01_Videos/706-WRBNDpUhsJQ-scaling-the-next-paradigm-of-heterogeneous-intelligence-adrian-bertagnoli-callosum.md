---
video_id: WRBNDpUhsJQ
playlist_index: 706
title: "Scaling the Next Paradigm of Heterogeneous Intelligence — Adrian Bertagnoli, Callosum"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WRBNDpUhsJQ"
duration: "15:13"
duration_seconds: 913
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/WRBNDpUhsJQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:51+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Adrian Bertagnoli, founding engineer at Callosum (formerly Colossyan), argues mathematically that heterogeneous multi-agent systems — where different models run on different hardware matched to subproblem complexity — outperform homogeneous systems on every reasonable benchmark. Concrete results: on the UlongBench agentic task, their heterogeneous system on Cerebras is 7x cheaper and 5x faster than GPT 5.2 alone; on SambaNova, 12x cheaper. On WebVoyager visual navigation, mixing Qwen 3 VL 8B with Kimi 2.5 beats GPT 5.2 alone by 18% while being 18x cheaper. The key insight: offloading simple subtasks (like zooming in a browser agent) to small cheap models and reserving frontier models for complex reasoning steps changes the Pareto frontier."
---

# Scaling the Next Paradigm of Heterogeneous Intelligence — Adrian Bertagnoli, Callosum

## Summary

Adrian Bertagnoli is a founding engineer at Callosum (formerly Colossyan), which received a £3 million grant from the UK's Aria Institute to build the first heterogeneous collocated compute cluster in the UK. The talk is a structured argument — backed by benchmark results — that heterogeneity in AI systems is not just a practical preference but a provably superior approach.

**The homogeneous paradigm and why it's changing**

The current era was defined by neural scaling laws: more data + more parameters = better models, trained and inferred on fleets of identical chips. This made sense in the training domain. In the inference domain, it's increasingly inefficient. Signs of mild heterogeneity already visible: mixture-of-experts (not all experts activated per token), multi-agent systems (different models for different sub-agents), and disaggregated prefill/decode hardware.

**The mathematical formalization**

Bertagnoli and colleagues formalized heterogeneity using a concept they call the *principle of maximum heterogeneity*. They model a multi-agent system as a "production function" — a distribution over a skill space — and show that for a given demand function (the problem being solved), a homogeneous system can only match the demand at one peak. A fully heterogeneous system, however, can match complex demand shapes by composing agents with complementary skill distributions. They validated this across neuroscience, economics, and ecology literature — in all cases, under reasonable constraints, heterogeneous systems outperform homogeneous ones.

**Experimental results**

*UlongBench (context-intensive agentic reasoning)*: GPT 5.2 alone: ~2,000 seconds per task, ~$3.75 per task. Their heterogeneous system on Cerebras: **5x faster, 7x cheaper**. On SambaNova: **3x faster, 12x cheaper**. The approach uses recursive language model architecture (from an MIT paper): treat context as an environment, let a coding agent interact with it via Python REPL (keyword search, regex), pass sub-contexts to the appropriate specialist model rather than loading everything into one context window.

*Video WebVoyager (visual web navigation)*: Mixing Qwen 3 VL 8B + Kimi 2.5 beats GPT 5.2 alone by **18%** while being **18x cheaper**. The key: visual web navigation decomposes into subtasks of different complexity (reasoning about layout, deciding next action, zooming into specific UI elements). Zooming does not need GPT — offloading it to a small open model is 11x faster and 43x cheaper for that subtask alone, with no quality loss.

**The automation layer**

Initially they manually decided which subtask maps to which model. They've since built an automation layer that detects task complexity and predicts the optimal model and hardware assignment automatically.

**The three eras of compute**

Bertagnoli's thesis on compute history: Era 1 = faster CPUs; Era 2 = massively parallel GPUs (Nvidia's era); Era 3 = heterogeneous compute, where different workloads run on optimally-matched hardware, managed by intelligence. "This is the worst our infrastructure will ever be."

## Why it matters
- The benchmark numbers (7–12x cheaper, 3–5x faster on agentic tasks) with no quality degradation make the cost case for heterogeneous model orchestration concrete and reproducible.
- The "zooming subtask" example is an immediately applicable design pattern: identify which steps in your agent pipeline require no reasoning, and route them to the cheapest capable model.
- The recursive context architecture (agent interacts with context as a file environment, extracting sub-contexts) is a direct solution to context rot on long-horizon tasks — and the benchmark results show it works at scale.

## Metadata
- Video: https://www.youtube.com/watch?v=WRBNDpUhsJQ
- Duration: 15:13
- Playlist index: 706
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Thank you for coming to my talk. My name is Adrian Bertagnoli. I'm a founding engineer at Colossyan and today I'm going to be talking about scaling the next paradigm of heterogeneous intelligence. So, I'm going to start um with explaining why we care about heterogeneity in the first place, what particular aspect make it very conducive for scaling AI, um how it is actually used in practice today, and how we can use utilize it in the future um to actually scale the next paradigm of intelligence. So, to give you an intuition about what I mean with heterogeneous intelligence, I want to take a step back and um explain the current prevailing paradigm of homogeneous uh intelligence. So,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WRBNDpUhsJQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
