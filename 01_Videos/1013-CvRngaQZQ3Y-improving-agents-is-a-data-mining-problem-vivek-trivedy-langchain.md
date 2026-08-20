---
video_id: CvRngaQZQ3Y
playlist_index: 1013
title: "Improving Agents is a Data Mining Problem — Vivek Trivedy, LangChain"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CvRngaQZQ3Y"
duration: "20:02"
duration_seconds: 1202
view_count: 3200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/CvRngaQZQ3Y.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:40+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "LangChain's Vivek Trivedy treats agent improvement as data mining over traces, citing a Harvey legal-AI case where trace-informed harness engineering matched Opus quality on a cheaper open model."
---

# Improving Agents is a Data Mining Problem — Vivek Trivedy, LangChain

## Summary
Vivek Trivedy (applied research lead, LangChain) frames continual agent improvement as a data-mining problem: ship the agent, collect its tool-call and message traces at scale, mine those traces for patterns, then run data-driven experiments to test whether a new prompt, tool, or orchestration actually improves on prior behavior. He identifies two problems that dominate at scale — reading millions of tokens of trace data is expensive, and traces from long coding-agent sessions (citing Claude Code and Codex) don't fit in any single context window, so teams need agents that can query trace data as an external object rather than loading it wholesale. LangChain centralizes traces per project and has agents read other agents' traces to find good and bad interactions, check whether quality degrades after repeated context compaction, and run model-swap counterfactuals; in work with legal-AI company Harvey on a legal benchmark, they matched Opus's trace-judging quality with a cheaper open model by using traces to inform harness engineering, at roughly one to two orders of magnitude lower cost. Their internal trace-mining product produces three outputs: SFT/distillation datasets built from a larger model's good traces (for example distilling GLM 5.2 runs into a 9B–13B model), auto-generated evals, and human-readable review material for high-trust domains like legal and medical. Trivedy's recommended sequence is harness engineering first for fast feedback (on the order of minutes), fine-tuning once harness tweaks plateau, then more harness engineering in a repeating "sandwich," with continual learning ultimately requiring updates across training data, harness design, and non-append-only agent memory over time.

## Why it matters
- Gives a concrete, named case study (Harvey legal benchmark) quantifying open-model cost savings — one to two orders of magnitude — achieved through trace-informed harness engineering rather than raw model quality, direct evidence for the harness-vs-model-capability tradeoff.
- Names two specific scaling problems in trace-based observability (token cost of reading traces at volume, traces exceeding context windows for long-running coding agents) that any team building agent observability will hit.
- Proposes a practical decision order for improving agents (harness engineering, then fine-tuning, then more harness engineering) and ties continual learning to three concrete levers: training data, harness evolution, and agent memory that isn't just an append-only log.

## Metadata
- Video: https://www.youtube.com/watch?v=CvRngaQZQ3Y
- Duration: 20:02
- Playlist index: 1013
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hey everyone. I'm Vic and I lead applied research at LangChain and I'm going to talk about something that I think is sexy, which is data mining, but it's not as sexy as LLM, so we're going to try to like make it sexy together. And the problem that we're going to talk about today is how do we continuously improve agents, but how do we do that via data? So, to start, I'm going to tell a little story that I think maybe a lot of us have felt before. Like, I ran my agent, it did a bunch of things, it made some mistakes. Now, I ask someone like, what do I actually do about that? Like, I have all this data, made some mistakes, what now? Basically, what we're going to do today is we're...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CvRngaQZQ3Y.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
