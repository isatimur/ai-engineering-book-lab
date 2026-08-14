---
video_id: 9HbzAWnKbo4
playlist_index: 931
title: "From Signal to PR: Anatomy of a Self-Improving Agent — Jason Lopatecki, Arize"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=9HbzAWnKbo4"
duration: "20:36"
duration_seconds: 1236
view_count: 1300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/9HbzAWnKbo4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:25+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Arize founder Jason Lopatecki demos Signal, an agent that watches 10x more traces/logs than humans would tolerate, uses observability skills to gather evidence, and opens GitHub PRs so engineers move from responder to reviewer."
---

# From Signal to PR: Anatomy of a Self-Improving Agent — Jason Lopatecki, Arize

## Summary
Jason Lopatecki, founder of Arize, argues observability is shifting from human-clicked dashboards to a loop where agents consume telemetry directly, so systems should trace and log an order of magnitude more than they do today because the agent, not a human, is now doing the digging. He demos Signal, Arize's agent (built on their AX SaaS platform, with Phoenix as the open-source counterpart) that runs periodically or on triggers, pulls traces/logs into a repo via observability "skills," and opens a GitHub issue or PR with the fix already drafted — walking through a real example where a "stream canceled" error in Arize's own in-product assistant, Alex, was resolved with a one- or two-line fix. He stresses that the bottleneck has moved from generating a fix to trusting it, so the job shifts from responder to reviewer, and that customers like Uber and Booking.com run the agent inside their own VPC (via Arize sandboxes or alternatives like Daytona) rather than sending production data to a model provider. Asked why engineers couldn't just point Claude Code at the data directly, he said the real work is designing narrow, composable skills that fetch the right traces into files in the repo (sometimes 10MB dumps) rather than exposing raw data to the agent. He also frames evals as "online evals" layered onto production traces — LLM-as-judge checks built for specific failure modes the team has already seen — whose aggregate signals feed into Signal's fix-generation loop alongside raw trace data.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=9HbzAWnKbo4
- Duration: 20:36
- Playlist index: 931
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Well, thank thank you all. Um, let me get set up here. So, not just the the founder of Arise, but but I tend to build an incredible amount of stuff. Um, let's see if we get this going here. Oh, sorry. One more second. Um, so not just a founder here, but but also a builder and I do my best to um uh to to to build agents assistance. Um, we have an agent in product. We have an agent in product called Alex and uh and a lot of I think a lot of my experience has come from actually um trying to make the stuff work and work well. Our first version of our our own agent frankly sucked. Uh it was many years ago uh probably two years ago when the first in the space to do it. Um and a lot of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/9HbzAWnKbo4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://arize.com/author/jason-lopatecki>
