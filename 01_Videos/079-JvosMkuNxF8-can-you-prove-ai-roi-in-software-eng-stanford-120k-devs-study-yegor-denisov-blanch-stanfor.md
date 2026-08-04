---
video_id: "JvosMkuNxF8"
playlist_index: 79
title: "Can you prove AI ROI in Software Eng? (Stanford 120k Devs Study) – Yegor Denisov-Blanch, Stanford"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JvosMkuNxF8"
duration: "16:40"
duration_seconds: 1000
view_count: 33898
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/JvosMkuNxF8.txt"
themes:
  - "Org Design & Leadership"
  - "Coding Agents"
ingested_at: "2026-04-24T10:52:50+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Stanford study: AI usage correlates weakly with dev productivity, but codebase cleanliness does; a 350-person case found AI adoption raised PRs 14% while quality fell 9% and rework rose 2.5x."
---
# Can you prove AI ROI in Software Eng? (Stanford 120k Devs Study) – Yegor Denisov-Blanch, Stanford

## Summary
Denisov-Blanch (Stanford) presents two years of research on AI's impact on software engineering productivity, measured via a machine-learning model trained to replicate a panel of 10-15 human experts who score code commits on implementation time, maintainability, and complexity. Comparing 46 AI-using teams against 46 matched non-AI teams, he finds median net productivity gains of about 10% as of July, with a widening gap between top and bottom performers over time. Token usage per engineer correlates only loosely with productivity (roughly R²=0.2, with a "death valley" around 10 million tokens/month), while an experimental "environment cleanliness index" (tests, types, documentation, modularity, code quality) correlates more strongly (R²≈0.40) — codebase hygiene amplifies AI gains, and unmanaged AI use accelerates the tech-debt entropy that erodes them. He also outlines an AI-practices benchmark that scans git history for "AI fingerprints" across five maturity levels (no AI, personal use, team use, autonomous task-level AI, full agentic orchestration), and a case study of a 350-person team where AI adoption raised PR count 14% but dropped code quality 9%, increased rework 2.5x, and left his proposed "engineering output" metric essentially flat — the core argument being that PR counts and DORA-style metrics are misleading proxies for AI ROI.

## Why it matters
- Supplies a concrete methodology (expert-panel-trained ML model, environment cleanliness index, AI-fingerprint benchmark) for measuring AI's real effect on engineering output, rather than relying on adoption or PR-count vanity metrics.
- The 350-person case study is a specific, citable counterexample to the "AI obviously boosts output" narrative: PRs up 14%, code quality down 9%, rework up 2.5x, output flat — useful evidence for a chapter on measuring AI ROI or evaluation practices.
- Frames codebase cleanliness/tech-debt management as a precondition for AI productivity gains, connecting AI adoption to org-level engineering practices rather than tool choice alone.

## Metadata
- Video: https://www.youtube.com/watch?v=JvosMkuNxF8
- Duration: 16:40
- Playlist index: 79
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Coding Agents]]

## Transcript excerpt
> [music] So companies spend millions on AI tools for software engineering. But do we actually know how well these tools work in the enterprise or are these tools just all hype? To answer this and for the past two years, we've been researching the impact of AI on software engineering productivity. And our research is time series because we look at get historical data, meaning we can go back in time. And it's also cross-sectional because we cut across companies. And the way we use to measure most of the of the impact is by a machine learning model that replicates a panel of human experts. The way this works is that imagine you have a software engineer who writes a code commit and this code...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JvosMkuNxF8.txt]]
- Description cue: You’re investing millions in AI for software engineering. Can you prove it’s paying off?

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Coding Agents**.
