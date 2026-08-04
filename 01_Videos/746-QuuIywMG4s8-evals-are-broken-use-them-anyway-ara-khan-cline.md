---
video_id: QuuIywMG4s8
playlist_index: 746
title: "Evals Are Broken, Use Them Anyway — Ara Khan, Cline"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=QuuIywMG4s8"
duration: "19:04"
duration_seconds: 1144
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/QuuIywMG4s8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-09T21:18:31+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cline's Ara Khan critiques benchmark-literalism and pure vibes, then details building agentic evals from real coding sessions and using Terminal-Bench/Harbor to hill-climb via failure-trace analysis."
---

# Evals Are Broken, Use Them Anyway — Ara Khan, Cline

## Summary
Ara Khan (Cline) argues most people misuse evals in one of two ways: an "objective metrics" camp that over-trusts benchmark dashboards (citing a Meta benchmark-maxing critique and skepticism that GPT-5.x and Gemini scoring similarly means they perform the same), or a "taste" camp that dismisses evals as pure vibes. His interpretation heuristics are: never trust a model provider's self-reported eval number at face value, stay current without being the earliest adopter (let a new model "settle" for weeks before switching), and prefer newer, precise evals over stale standardized ones — citing OpenAI's own admission that SWE-bench Verified no longer measures frontier coding capability. He describes how Cline, finding no adequate agentic coding benchmark, built one from real user sessions (opted-in, paid contributors) because agent tasks — searching files, setting up environments, running scripts and tests across many turns — can't be graded like single-turn Q&A, and adopted Stanford's Terminal-Bench (89 real-world-style tasks such as race conditions and infra/database issues, each taking up to 30-40 minutes) run in parallel isolated VMs via Harbor infrastructure (using providers like Modal). His hill-climbing process: run the 89 tasks, take the failures, replay the LLM-call traces through another agent to attribute each failure to a specific cause (broken retry tool, timeout, etc.), then target fixes — distinguishing whether a failure comes from the underlying model, the harness (he notes Anthropic models sometimes perform much better paired with Claude Code than with other harnesses), or a bad eval task itself — improving Cline's own score from a 43% baseline through three zones: fixing obvious harness bugs, making nuanced model-family-specific prompt tweaks, and (a zone to avoid) overfitting/gaming the benchmark.

## Why it matters
- Gives a specific, working definition of agentic-eval failure attribution (replay traces to classify why each task failed: model, harness, or bad eval) that goes beyond generic "build evals" advice.
- Documents Terminal-Bench and Harbor as concrete, named infrastructure for running isolated, parallelized multi-turn coding-agent benchmarks — citable tooling for a chapter on agent evaluation practice.
- The claim that identical models perform differently depending on harness (Anthropic models plus Claude Code vs. other agents) is a specific, checkable data point about where quality actually comes from in coding agents, distinct from raw model capability.

## Metadata
- Video: https://www.youtube.com/watch?v=QuuIywMG4s8
- Duration: 19:04
- Playlist index: 746
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. All right. First of all, thank you so much for for coming. I'm actually rather surprised. Um A lot of times like you're you're working on the stuff and you're like cooked up in a room and you're like no one cares. And then it's like so many people showed up. So I just thought that someone cares. Um so anyway, so the the title of my talk today is evals are broken and you should use them anyway. And a lot of this talk is just like a straight-up critique of like the way we do evals these days. And I kind of want to help you out. I kind of want to give you a way out of this. It's like you have this like interesting technology and you can use it, but there's like so many ways to like...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/QuuIywMG4s8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
