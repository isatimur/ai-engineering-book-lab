---
video_id: G7cgLjZtmMU
playlist_index: 1071
title: "The Agentic Commerce Stack — Ahnaf Prio, Best Buy"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=G7cgLjZtmMU"
duration: "20:38"
duration_seconds: 1238
view_count: 3900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/G7cgLjZtmMU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-28T01:25:33+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Best Buy's Ahnaf Prio reports ~45% of sessions on major AI assistants are shopping-related, contrasts the failed DOM-scraping generation of shopping agents with today's human-in-the-loop stack, and sketches the path to autonomous shopping."
---

# The Agentic Commerce Stack — Ahnaf Prio, Best Buy

## Summary
Ahnaf Prio, a senior engineering manager at Best Buy, reports that roughly 45% of agent sessions on major assistants such as ChatGPT and Google Gemini are shopping-related, and sizes agentic commerce at about $7B today against a projected $65B by 2030. He contrasts the failed first generation — browser extensions that took screenshots, read the DOM, navigated merchant sites and filled forms — with what works now. That approach was clunky and brittle, and more decisively, merchants' engineering teams read an AI driving a browser as impersonation and blocked it, often at the payment step. The talk maps the current human-in-the-loop mental model and gives the architecture for extending it toward autonomous shopping.

## Why it matters
- A named-retailer account of agents moving into money-handling actions, where a wrong step is not recoverable by a retry.
- The DOM-scraping failure is a clean case of an integration defeated by trust boundaries rather than by model capability.
- Merchant-side blocking shows the counterparty, not just the operator, decides how much autonomy an agent gets.

## Metadata
- Video: https://www.youtube.com/watch?v=G7cgLjZtmMU
- Duration: 20:38
- Playlist index: 1071
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> My name is Anup Priyo. I'm a senior engineering manager at Best Buy. And me and my team are working together right now to figure out what does Agentic Commerce mean and how can we meet our customers where they're at. And the newest place that they're at is at Agentic Services. I'm excited to give my talk today and well, what's what's my credentials? Where ever since I was a young boy, I dreamed of high throughput inference, harnessing my tools within a context window, kept in check with evals. Yeah, that's absolutely correct. In 2003, all those things definitely existed. I kid. Uh over the last 1 year, uh we have been learning a lot. Shopping isn't new. Shopping is probably one...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/G7cgLjZtmMU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
