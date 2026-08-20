---
video_id: iqloyWCGYQQ
playlist_index: 1003
title: "Beyond Static Intelligence: Evaluating Continual Learning — Parth Asawa, UC Berkeley"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=iqloyWCGYQQ"
duration: "20:30"
duration_seconds: 1230
view_count: 691
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/iqloyWCGYQQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:18+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Parth Asawa (UC Berkeley) proposes Continual Learning Bench, arguing LLM benchmarks wrongly reset memory between tasks and fail to measure sample-efficient online learning."
---

# Beyond Static Intelligence: Evaluating Continual Learning — Parth Asawa, UC Berkeley

## Summary
Parth Asawa (UC Berkeley) argues that current LLM benchmarks evaluate models as if memory resets after every task, so they cannot measure continual learning — which he defines as sample-efficient online learning that stays stable over long horizons. He proposes three design criteria a continual-learning benchmark must satisfy: headroom (tasks that require online adaptation rather than being solvable by offline pretraining), shared structure across task instances (unlike traditional independent benchmark items), and an explicit learning mechanism (reward, error messages, or textual feedback). His group's Continual Learning Bench 1.0 covers six domains — blind spectrum monitoring, codebase adaptation, epidemiology cohort studies, exploitable poker, database exploration, and sales prediction — and scores systems on reward, "gain" (stateful minus stateless reward, isolating learning from base-model strength), and cost, all measured as Pareto frontiers. In initial results, vanilla in-context learning outperformed more elaborate context-management systems on both reward and cost; observed failures split into stability failures (a sales-forecasting model forgetting its own prior correction and reverting to over-prediction) and plasticity failures (a notepad-based agent dismissing relevant schema information as belonging to "a different study").

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=iqloyWCGYQQ
- Duration: 20:30
- Playlist index: 1003
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi everyone. Uh my name is Partasawa. I'm a PhD student at UC Berkeley. We're all at these AI and machine learning conferences, but everyone is just talking about how smart these agents are. We're not actually talking about learning ability or how much these agents learn. And so today I want to talk about that. You've seen the way we evaluate language models today. Every time there's a new model release, we see charts and graphs that look something like this, right? The way we evaluate these language models is we ask them to do one task and then completely independently we ask them to do another task and then another. And then we repeat this across a variety of different benchmarks,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/iqloyWCGYQQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
