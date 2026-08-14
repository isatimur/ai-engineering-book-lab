---
video_id: 2aS7aKoXn64
playlist_index: 978
title: "Rethinking Environments for Long-Horizon Work — Rayan Garg, Theta Software"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=2aS7aKoXn64"
duration: "21:15"
duration_seconds: 1275
view_count: 1500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/2aS7aKoXn64.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-04T17:21:49+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Theta Software's Rayan Garg defines long-horizon tasks via METER human-hour vs. token/step metrics, proposes judge-model verifiers, and calls finance benchmarks like GDPval already saturated."
---

# Rethinking Environments for Long-Horizon Work — Rayan Garg, Theta Software

## Summary
Theta Software's co-founders (Rayan Garg and a co-founder/CTO) argue that "long horizon" is a scalar, not a binary category, measurable two ways: METER's human-time-horizon benchmark (e.g., a 50%-success threshold at a given hour count) and model-centric metrics like tokens, steps, and tool calls per trajectory — the latter noisy across models and harnesses (Codex models are cited as more token-efficient than Claude models) but useful for tracking frontier progress such as context-window and compaction gains. They propose measuring environment/task complexity along three axes — tool-coordination complexity, degree of state change (contrasting easily parallelizable multi-agent code analysis with sequential dashboard/log tasks where one bad early query cascades into downstream failures), and ambiguity of the starting instructions/artifacts — and warn that artificially chaining unrelated tasks to inflate duration doesn't meaningfully measure capability. Because many economically valuable domains (software operations, finance) can't be checked with a deterministic script or test suite, they use judge/critic models that score both the final environment state and the full trajectory to catch reward hacking (e.g., sandbox escapes, reading a hidden test suite), treating the judge itself as an agent that needs read-only access to the same tools and logs (GitHub, CloudWatch) the working agent used. They critique three existing finance benchmarks (including GDPval) for having average human-hours-per-task below their own long-horizon threshold, for being largely saturated already (one benchmark's investment-banking section resolves 100% of tasks in 57% of pass@1 cases), and for narrow domain coverage, contrasting this with Theta's own finance dataset, where tasks average 15 human-hours across a 50-task sample and current models still struggle significantly.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=2aS7aKoXn64
- Duration: 21:15
- Playlist index: 978
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> It's uh great to see all of you here today. We're super excited to talk about one of our favorite topics uh here at Theta. Um before we get started, we just want to introduce ourselves. Um so, hi, I'm a co-founder and CTO at Data Software. >> Hi, I'm Ryan. I'm a co-founder and CEO at Thata Software. Prior to this, I was previously a founding engineer at Deep Silken where we did research into turnary models. >> Awesome. So, I can get us started with the topic today. Um, we're going to be talking about oral environments uh within the context of long horizon tasks. And I think the most important thing for us to start with at the beginning is just talk about the trends and what long horizon...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/2aS7aKoXn64.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
