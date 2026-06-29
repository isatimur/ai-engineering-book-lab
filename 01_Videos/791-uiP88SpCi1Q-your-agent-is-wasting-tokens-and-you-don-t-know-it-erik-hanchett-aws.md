---
video_id: uiP88SpCi1Q
playlist_index: 791
title: "Your Agent Is Wasting Tokens and You Don't Know It - Erik Hanchett, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=uiP88SpCi1Q"
duration: "5:55"
duration_seconds: 355
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/uiP88SpCi1Q.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Erik Hanchett shares a practical take on Your Agent Is Wasting Tokens and You Don't Know It. Key angle: focuses on agent design and orchestration; connects the topic back to software engineering practice."
---

# Your Agent Is Wasting Tokens and You Don't Know It - Erik Hanchett, AWS

## Summary
Erik Hanchett shares a practical take on Your Agent Is Wasting Tokens and You Don't Know It. Key angle: focuses on agent design and orchestration; connects the topic back to software engineering practice.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=uiP88SpCi1Q
- Duration: 5:55
- Playlist index: 791
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey everyone, my name is Eric Hanchett. I am a senior developer advocate at AWS and I'm going to talk to you about how you can save on token costs. Now, I'm going to show you five ways that you can reduce your token costs while using and creating agents. So, the first way you can do that is to cache your system prompt. Let me show you some code. Now, I'm using AWS's Strands agents. This works with all different providers. This is a little bit of pseudo code, but the idea is that you can add cache prompt equals default. And what that'll do is on the first call of your agent, it will send the full system prompt over and then on every subsequent call, it will have a much reduced system prompt...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/uiP88SpCi1Q.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
