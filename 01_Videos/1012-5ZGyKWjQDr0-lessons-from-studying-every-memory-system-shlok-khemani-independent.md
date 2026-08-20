---
video_id: 5ZGyKWjQDr0
playlist_index: 1012
title: "Lessons from Studying Every Memory System — Shlok Khemani, Independent"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=5ZGyKWjQDr0"
duration: "19:31"
duration_seconds: 1171
view_count: 1900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/5ZGyKWjQDr0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-14T11:36:38+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Shlok Khemani contrasts ChatGPT's dense 4,000-token running profile with Claude's smaller, visible 1,000-token one, framing memory design as a compute tradeoff and a form of continual learning."
---

# Lessons from Studying Every Memory System — Shlok Khemani, Independent

## Summary
Shlok Khemani spent a year reverse-engineering how ChatGPT, Claude, Gemini, and Poke implement memory, and traces ChatGPT's path from a February-2024 v1 (a user-visible, user-edited list of extracted facts that quickly went stale) to an April-2025 v2 "running profile" — a dense, roughly 4,000-token, keyword-packed summary regenerated every few days, hidden from users, and viewable only via a jailbreak prompt he found. Claude took the opposite approach in its August-2025 v1: no persistent profile at all, just two tools letting the model search past conversations by keyword/topic or by time period, so every conversation starts stateless. After Khemani's blog post contrasting the two architectures hit Hacker News, Claude shipped v2 that same day: a smaller (~1,000-token), user-visible, user-editable profile written in full sentences and refreshed every 24 hours, versus ChatGPT's larger, opaque, less-frequently-updated one — a tradeoff he calls "memory is a function of compute," where update cost trades against per-conversation serving cost. He illustrates the promise and limits of this update loop, which he argues is already a form of continual learning happening outside model weights, with a real failure case: ChatGPT still believes he visited Turkey in 2025 based on a conversation weighing travel destinations, when he actually booked and flew to Thailand, and the product never noticed the contradiction. He closes on the observation that no product reasons over a user's email, calendar, or photos, so personal context stays fragmented and has to be rebuilt separately in every app.

## Why it matters
- Documents concrete, comparable design parameters (token budget, update frequency, visibility) across ChatGPT's and Claude's shipped memory systems — rare specificity for arguing that memory architecture is a real engineering tradeoff, not a solved commodity.
- The Turkey/Thailand staleness case is a reproducible, named failure mode (a system confidently holding a stale fact and never questioning it) useful as a concrete example in a reliability or hallucination discussion.
- Frames running-profile updates as continual learning already happening in production today, outside model weights — a data point that complements more research-focused continual-learning talks in this corpus.

## Metadata
- Video: https://www.youtube.com/watch?v=5ZGyKWjQDr0
- Duration: 19:31
- Playlist index: 1012
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Okay. Uh, hi everyone. I'm Schllo and I've spent the past year studying different memory systems. Now before I get started, one thing I've realized speaking to people over the last two days is that memory is a very overloaded term now. It can mean a lot of different things. So when I talk about memory today, it is going to be in the context of personalization, especially for consumer AI applications. Now a little bit about me. My claim to fame, the reason I get to speak to you here is that I've spent the past year trying to reverse engineer how products like ChatGpt, Claude, Gemini, and Poke implement their memory systems. And I've then worked with multiple teams across different domains in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/5ZGyKWjQDr0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
