---
video_id: 7vn4WpqNpck
playlist_index: 991
title: "Benchmarking Coding Agents on New vs Legacy Codebases — Denys Linkov, Wisedocs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7vn4WpqNpck"
duration: "18:08"
duration_seconds: 1088
view_count: 2900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/7vn4WpqNpck.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:35:48+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Wisedocs' Denys Linkov benchmarks the same pipeline refactor across O3, Sonnet 4.6, Opus 4.8, and a GPT-5.5 zero-shot attempt to gauge coding-agent progress."
---

# Benchmarking Coding Agents on New vs Legacy Codebases — Denys Linkov, Wisedocs

## Summary
Denys Linkov (Wisedocs, which processes medical-claim PDFs that can run over 10,000 pages) describes refactoring an AI pipeline that had sprawled across more than 10 repositories into a single monorepo over roughly six months starting in April, driven by slow throughput, brittle complexity, and low developer willingness to touch the legacy code. Before committing, his team spent about two months benchmarking five open-source orchestrator frameworks against 17 evaluation criteria with a team of three — work done before Deep Research existed, which he estimates could now run roughly 90% faster with agentic research and sub-agent workflows. He reran the same refactor task across model generations: O3 took three hours of back-and-forth in Cursor and made 10 major mistakes; Sonnet 4.6 solved it with one extra iteration; Opus 4.8 one-shot it — roughly a fivefold speedup — while newer harnesses added sub-agents, plan calls, shell commands, and verification steps that O3-era tooling lacked. Citing task-completion time-horizon data he attributes to METR, he argues an 80%+ accuracy threshold is more meaningful than the commonly cited 50% one, and separately found that a zero-shot attempt with GPT-5.5 "extra high" to autonomously redo the whole refactor finished in about 10 minutes but produced only shallow scaffolding — missing the Ray Serve deployment and bootstrap command — rather than a working result. He judges the refactor worthwhile in hindsight: the team hit prior feature parity within six months and kept accelerating afterward, developer commit activity and the number of contributors touching the codebase both grew, they got 15 of 17 requirements right, and the resulting monorepo now ships features in under a week that previously took multiple months.

## Why it matters
- Gives a concrete, quantified before/after benchmark of the same refactoring task across model generations (O3 vs. Sonnet 4.6 vs. Opus 4.8, plus a GPT-5.5 zero-shot attempt) — rare longitudinal evidence for a book chapter on measuring coding-agent progress against a real, not synthetic, task.
- Surfaces a specific failure mode of "zero-shot the whole refactor": a model can produce fast, plausible-looking output that is actually shallow scaffolding missing core pieces — a caution against equating speed or line count with genuine completion.
- Frames the timing of a refactor as a legitimate cost/ROI tradeoff against continuously improving models, using a METR-style task-horizon curve and an 80%+ accuracy threshold as decision criteria — a transferable framework for engineering-leadership decisions about AI-era technical debt.

## Metadata
- Video: https://www.youtube.com/watch?v=7vn4WpqNpck
- Duration: 18:08
- Playlist index: 991
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> So, it's not just my AI pipeline that's on fire, but also my PowerPoint. So, it's 2025. Uh we're scaling as a business and things are going poorly. We're adding too many customers, we're not getting the throughput we need, and we need to improve our underlying technology. And there's three main issues that we're facing. The first one is that we're too slow to meet customer demand. The second one is that this AI pipeline that we've built is too complicated to update. And the third one is because it's a legacy code base, or actually more than 10 repos, nobody actually wants to touch the code. It's not a fun experience. So, we made this decision to refactor over the course of 6...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7vn4WpqNpck.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
