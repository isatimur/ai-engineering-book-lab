---
video_id: phchDt63qAA
playlist_index: 727
title: "How We Built Zeta2: Training an Edit Prediction Model in Production — Ben Kunkle, Zed"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=phchDt63qAA"
duration: "10:50"
duration_seconds: 650
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/phchDt63qAA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:10:09+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ben Kunkle shares a practical take on How We Built Zeta2: Training an Edit Prediction Model in Production. Key angle: emphasizes evaluation and measurement; keeps returning to production-grade engineering."
---

# How We Built Zeta2: Training an Edit Prediction Model in Production — Ben Kunkle, Zed

## Summary
Ben Kunkle shares a practical take on How We Built Zeta2: Training an Edit Prediction Model in Production. Key angle: emphasizes evaluation and measurement; keeps returning to production-grade engineering.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=phchDt63qAA
- Duration: 10:50
- Playlist index: 727
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> I'm Ben Kunkel. I'm the edit predictions lead at Zed. Um, we recently announced our model Zed 2 and this is how we trained it. I'm going to go through a lot. This is obviously a pretty short talk. So, I'm going to try and leave enough time for questions at the end, but it's if you're not familiar with training models, uh, it's going to be a bit of a whirlwind tour. So, if you're not familiar with edit prediction, it's essentially giving the model a region of code around the cursor, asking them to predict the next edit that you're going to make. We give it various data in such as your recent edits, your cursor position, the type definitions and variable definitions or of things...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/phchDt63qAA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
