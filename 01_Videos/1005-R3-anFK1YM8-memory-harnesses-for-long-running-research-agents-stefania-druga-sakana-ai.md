---
video_id: R3-anFK1YM8
playlist_index: 1005
title: "Memory Harnesses for Long-Running Research Agents — Stefania Druga, Sakana.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=R3-anFK1YM8"
duration: "13:04"
duration_seconds: 784
view_count: 3400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/R3-anFK1YM8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:21+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sakana AI's Stefania Druga tests recall policies (RAG, ranked ledger, oracle) for long-horizon agent memory entirely on local models, finding ranked recall wins once tasks exceed context."
---

# Memory Harnesses for Long-Running Research Agents — Stefania Druga, Sakana.ai

## Summary
Stefania Druga (research scientist, Sakana AI) presents an on-device memory harness for long-running research agents, built entirely on local models — Qwen 27B (4-bit quantized) and DeepSeek V4 Flash — running on an M3 Ultra Mac with 96GB RAM. She models memory as a write-manage-read control loop with three parts: a core of traces always shown to the agent, a recall block tested under different policies, and an archival block for cross-session state. Testing a ladder of recall policies — no memory, vector RAG, a ranked decision ledger, and an oracle given ground-truth memory — on a literature-review task (built around a retracted Nature paper's claim of 742,000 discovered materials) and on X-Bench (a long-horizon memory benchmark, 68 questions with answers many steps outside the context window), she finds memory adds nothing when the task still fits in context, but the ranked-ledger policy clearly beats both no-recall and simple memory-gating once tasks exceed the window. The oracle still falls short of maximum score because retrieving the right memory doesn't force the model to use it. The ranked-recall advantage held across both local models and on a second benchmark (Spider V2), and it also cut token cost relative to worse recall policies — leading her to argue recall policy should be treated as a first-class, measurable design choice.

## Why it matters
- Provides an ablation-style comparison of memory/recall strategies (no-memory, vector RAG, ranked ledger, oracle) on a named long-horizon benchmark (X-Bench) plus a second benchmark (Spider V2), with a concrete result: ranked recall beats simple gating and lowers token cost.
- Demonstrates a full experimental harness run entirely on local/on-device models (Qwen 27B 4-bit, DeepSeek V4 Flash on an M3 Ultra), evidence for arguments about local-model viability and AI "sovereignty" as an emerging engineering practice.
- Surfaces a specific negative result — memory adds no benefit, only cost, when a task still fits in context — that sharpens when a memory harness is actually worth building.

## Metadata
- Video: https://www.youtube.com/watch?v=R3-anFK1YM8
- Duration: 13:04
- Playlist index: 1005
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello. Welcome. Uh this is a big room, so you're if you're in the back, don't hesitate to come closer. Um My name is Stefania Druga. I'm a research scientist at Sakana AI in Tokyo. Uh I used to be based here and AI engineering uh is home community for me before being the hyperloop. So, it's very good to be back. And today I'm going to talk to you about memory harnesses for long-running research agents on device. So, if you work with long horizon tasks, you probably run into this issue of context blow. Right? Like when the model starts contradicting itself, or it has to redo the work because it forgot it did that task in the first place, or it starts to drift from your questions...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/R3-anFK1YM8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
