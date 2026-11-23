---
video_id: TNwJ1LMiENk
playlist_index: 760
title: "Stop Making Models Bigger, Make Them Behave — Kobie Crawford, Snorkel"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TNwJ1LMiENk"
duration: "20:56"
duration_seconds: 1256
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/TNwJ1LMiENk.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-20T09:01:43+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kobie Crawford, developer advocate at Snorkel, presents research with a UC Berkeley lab in which GRPO training made a 4-billion-parameter model beat a 235-billion-parameter reasoning model on tool use for financial analysis. The big model queried tables that did not exist and then hallucinated; the trained small model listed tables, read schemas and recovered from SQL errors. One 21-hour run cost under $500 and roughly doubled pass@1; the harder multi-table set rose from 13.9% to 26.6% even though single-table training worked best. His thesis: the failure was tool discipline, not reasoning, so find the specific behaviour and fix it with expert-built data."
---

# Stop Making Models Bigger, Make Them Behave — Kobie Crawford, Snorkel

## Summary
Kobie Crawford is a developer advocate at Snorkel, which calls itself a frontier AI data lab and builds expert-in-the-loop datasets for model training. He presents research done with the RLLM team, part of UC Berkeley. The goal: make a 4-billion-parameter model outperform a 235-billion-parameter model on a tool-use task for financial analysis. The title is punchy on purpose; the point is that the right data on the right problem can beat a bigger model.

**Why not just use a bigger model**
Teams often build a proof of concept on a large model, then hit production limits: cost, speed, security, on-premise deployment and data control, especially in finance and healthcare. When performance falls short, the reflex is to swap in a larger model. Crawford calls that a sledgehammer to crack a walnut. The Berkeley team named it the Terence Tao effect: a financial analyst does not need all of mathematics to run a SQL query and do some addition and subtraction. Their intuition is that RL suits changing behaviour, not adding knowledge.

**How the big model failed**
Asked for the year-over-year growth of YouTube ads revenue from 2023 to 2024, the 235B reasoning model queried a table that did not exist without inspecting the environment. It guessed again, got nothing, and then hallucinated an answer. Its reasoning skill did not help it use tools.

**The recipe**
- Data: questions built with domain experts (PhD-level and industry veterans), then verified so each task is queryable and has a verifiable answer.
- Training: GRPO on a 4B model with the RLLM framework, in a 21-hour job costing under $500 per run.
- Environment: a self-contained FinQA environment with built-in tools and no external dependencies, published on Prime Intellect's infrastructure and in the OpenEnv repo, hosted in Hugging Face spaces. It holds two benchmarks: FinQA with 290 samples and FinQA reasoning with 79 harder multi-table samples.

**Results**
The 4B model beat the 235B model, and pass@1 roughly doubled. Its trace shows the learned behaviour: call get table names, then get table info to read the schema, run a query, hit an error on a missing revenue column, and correct itself. The tool existed for the big model too; it simply never called it. Two surprises from the ablation of single-table, mixed, and curriculum training: single-table-only training gave the largest uplift, and it still doubled performance on the harder multi-table set, from 13.9% to 26.6%. Fixing the core failure mode generalised.

**Rubrics to find the behaviour**
Snorkel's research team now builds rubrics into evals. A rubric splits rightness into many questions, which points to the actual failing behaviour and guides which data to generate. GRPO still trains on a single reward value.

## Why it matters
- A clean counter-example to scaling up by default: a 4B model trained for tool discipline beat a 235B reasoning model on its target task.
- Shows that RL for a narrow behaviour is cheap and tractable (one 21-hour run under $500), which matters for teams that must self-host for cost or data control.
- The failure trace (no table discovery, blind queries, then hallucination) is a concrete pattern to test for in any tool-using agent.
- The ablation result, single-table training generalising to multi-table questions, supports targeting the core failure mode over broad data mixes.
- Separates two eval roles: rich rubrics for diagnosing which behaviour to fix, a single scalar reward for the RL loop itself.

## Metadata
- Video: https://www.youtube.com/watch?v=TNwJ1LMiENk
- Duration: 20:56
- Playlist index: 760
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> This is the the last presentation I have to give this uh conference. So, I'm feeling already a little bit of the euphoria of like, "Ah, it's all done." Um I know we're we're at a uh at a uh also closer to the end of the whole sequence uh is hasn't been I mean I I keep finding these conferences to be like some of the highest signal that I get like wherever I'm wherever I go. So, how how generally is it people feel like like they're getting what they came for here? I'm just curious because like I you know we're we're Snorkel um when we we put in a sponsorship and we want to know that like people are getting what they want out of they know they're going to come back because we want...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TNwJ1LMiENk.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://snorkel.ai/author/kobie-crawford>
