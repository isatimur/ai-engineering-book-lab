---
video_id: 7wu2hsRfvV0
playlist_index: 946
title: "How Forward Deployed Engineering is done at Decagon — Sunny Rekhi"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7wu2hsRfvV0"
duration: "18:09"
duration_seconds: 1089
view_count: 882
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/7wu2hsRfvV0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:12+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Decagon's Sunny Rekhi describes splitting forward-deployed engineering into agent builders and agent software engineers as headcount grew from 50 to 500, and argues restraint beats reflexive AI-coded one-off fixes."
---

# How Forward Deployed Engineering is done at Decagon — Sunny Rekhi

## Summary
Sunny Rekhi, CTO of Forward Deployed Engineering at Decagon (a 24/7 AI customer service agent), describes how the FDE org split into two lanes as headcount grew from 50 to 500 people in a year: "agent builders" who configure the agent's brain (tonality, user intents, hand-off rules) largely inside the UI, and "agent software engineers" who route recurring enterprise product requests back into the core platform. He argues that with AI coding now fast and cheap, the scarce skill has become restraint — not reflexively prompting Codex or Claude Code to patch one customer's one-off request, since that produces a brittle, unowned "black box" of prompts and patches. Decagon locks down success metrics and support channels in writing before building, staffs deals with industry-vertical specialists so domain knowledge compounds across similar customers, and converts repeated manual asks (he cites building the same custom CRM integration 25 times) into self-serve platform features. He gives Hertz as an example: onboarded to deflect inbound support calls, then expanded into proactive lease-renewal outreach using the same back-end integrations.

## Why it matters
- Gives a concrete, named example (Decagon) of the FDE-team bifurcation pattern — agent configuration vs. product engineering — that recurs as AI-agent vendors scale past initial hypergrowth.
- Names "restraint" against reflexive one-off AI coding as the scarce skill once coding agents make execution cheap, a useful counterpoint to "just let the agent build it."
- The Hertz land-and-expand example and the "custom becomes self-serve" ethos are concrete illustrations of platformizing forward-deployed work instead of accumulating bespoke code.

## Metadata
- Video: https://www.youtube.com/watch?v=7wu2hsRfvV0
- Duration: 18:09
- Playlist index: 946
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] [applause] >> Coming guys, can you hear me just fine? All good? Okay, awesome. Just so I can contextualize this talk a little bit, can I get a show of hands of who here is an engineer or is a forward and in a forward deployed motion at all? Okay. Okay, so I'm in my minority. Okay, awesome. Uh sounds good. So yes, um I'm Sunny. I'm the uh CTO of Forward Deployed Engineering here at Decagon. And today I'll talk about what it is that we do, why we have a forward deployed motion, how it has changed over time as we've gone from 50 people to 500 people over the course of a year. Um how it changes if you're working with a Fortune 20 versus a more mid-market brand. Uh thank thank you all...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7wu2hsRfvV0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
