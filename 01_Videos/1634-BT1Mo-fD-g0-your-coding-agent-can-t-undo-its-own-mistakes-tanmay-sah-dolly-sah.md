---
video_id: BT1Mo-fD-g0
playlist_index: 1634
title: "Your Coding Agent Can't Undo Its Own Mistakes - Tanmay Sah & Dolly Sah"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BT1Mo-fD-g0"
duration: "16:38"
duration_seconds: 998
view_count: 5900
transcript_status: auto_en
transcript_path: "99_Meta/transcripts/plain/BT1Mo-fD-g0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-11-19T00:27:00+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tanmay Sah & Dolly Sah shares a practical take on Your Coding Agent Can't Undo Its Own Mistakes. Key angle: focuses on agent design and orchestration; emphasizes evaluation and measurement."
---

# Your Coding Agent Can't Undo Its Own Mistakes - Tanmay Sah & Dolly Sah

## Summary
Tanmay Sah & Dolly Sah shares a practical take on Your Coding Agent Can't Undo Its Own Mistakes. Key angle: focuses on agent design and orchestration; emphasizes evaluation and measurement.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=BT1Mo-fD-g0
- Duration: 16:38
- Playlist index: 1634
- Transcript status: `auto_en`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. I am Tanmei. Today I'm with Dolly, and we're going to introduce the missing "cancel" button for programming agents. So, imagine a programming agent working on a problem in a repository. He applies the patch, runs the tests, and everything passes successfully. It even creates a release tag, but then the lower-level integration fails. Now the question arises. Can the agent actually return everything to its previous state? Git can tell us what has changed in the repository, but what about changes outside of Git, such as external API calls, runtime configurations, or notifications? And simply retrying an operation doesn't necessarily undo what has already happened . So we wanted...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BT1Mo-fD-g0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
