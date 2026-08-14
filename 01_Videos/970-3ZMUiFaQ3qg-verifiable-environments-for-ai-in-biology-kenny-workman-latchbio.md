---
video_id: 3ZMUiFaQ3qg
playlist_index: 970
title: "Verifiable Environments for AI in Biology — Kenny Workman, LatchBio"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=3ZMUiFaQ3qg"
duration: "17:42"
duration_seconds: 1062
view_count: 64
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/3ZMUiFaQ3qg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:58:03+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Latch's Kenny Workman describes building SpatialBench and biosecurity red-team evals for AI biology agents, using SWE-bench-style verifiable graders and human-verified ground truth."
---

# Verifiable Environments for AI in Biology — Kenny Workman, LatchBio

## Summary
Kenny Workman, co-founder and CTO of Latch (a vertical AI lab for biology benchmarking and agent engineering), argues that data-heavy experimental biology — single-cell, spatial, and proteomics assays generating 2-7 terabytes per run — gives code-like verifiable substrate for training and evaluating agents. Latch built SpatialBench (146 problems, published last December) modeled on SWE-bench: each eval pairs a data node with a task prompt, grader config, and a deterministic Python grader, and Latch requires evals to be verifiable, durable across valid analysis paths, and to force multi-turn interaction with data rather than memorized answers. Human verification of model trajectories from January-March model releases exposed pervasive problem ambiguity (e.g., undefined "appropriate radius" or gene-list-splitting criteria) and arbitrary QC thresholds, leading Latch to publish a verified benchmark subset. Latch then built long-horizon tasks — each taking a three-person team about a week to construct — that simulate full paper result sections or drug-program go/no-go decisions (e.g., reconstructing a tumor's metastatic-seeding niche, which no current model solves), and is experimenting with rubric-based grading for these since verifiable end-rewards are too sparse at long horizons; the rubrics so far correlate only loosely with verified outcomes. Latch also built red-team biosecurity evals (with American Wetware and a surveillance company called Aquid) that disguise harmful requests as routine ones (e.g., a "GFP" cloning request that is actually a toxin), and found routine tasks get exercised far more often than the red-team probes.

## Why it matters
- Concrete, transferable benchmark-design methodology: SWE-bench-style verifiable graders plus a human-verification pass to catch ambiguous ground truth, applied outside pure software tasks.
- Surfaces a real dual-use/biosecurity eval gap — red-team tasks are under-triggered relative to routine tasks — direct evidence for chapters on safety-eval design and red-teaming.
- Names an open problem in agent evals: verifiable end-rewards become too sparse at long horizons, and rubric-based grading is only loosely correlated with verified outcomes so far.

## Metadata
- Video: https://www.youtube.com/watch?v=3ZMUiFaQ3qg
- Duration: 17:42
- Playlist index: 970
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Thank you to the organizers for having me. I'm one of the co-founders and CTO at Latch. We are basically a vertical AI lab for benchmark and agent engineering. I'm hoping to motivate and explain exactly what that means today. Starting directly with motivation for agents in in bio generally. Um Many people in my domain are familiar with this curve, but this is basically the log linear curve of data generated over the years in in biology. And the reason I'm bringing it up it will become directly important to the kinds of things we want to do in engineering. Um This curve is driven by a very small handful of experimental classes. One is called single cell biology. This is where we split up...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/3ZMUiFaQ3qg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
