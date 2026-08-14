---
video_id: RVxym6mmIns
playlist_index: 949
title: "How Forward Deployed Engineering is done at Cognition — Jia Wu"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=RVxym6mmIns"
duration: "17:38"
duration_seconds: 1058
view_count: 10000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/RVxym6mmIns.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:18+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jia Wu describes how Cognition deploys Devin: FDEs map agent capabilities to SDLC bottlenecks, citing 82% faster delivery and 2x PR throughput, and frames FDE explicitly as go-to-market."
---

# How Forward Deployed Engineering is done at Cognition — Jia Wu

## Summary
Jia Wu, deployed engineering lead at Cognition (and a Windsurf-acquisition alum), traces Devin from its underwhelming 2024 launch (13% on SWE-bench, internally joked as "we're so cooked") to a product whose forward-deployed engineers split their time roughly evenly between customer calls and hands-on-keyboard work, mapping Devin's capabilities to specific SDLC bottlenecks — testing, review, deployment, maintenance — since raw code generation is, in her view, "a mostly solved problem" and only about 20% of the challenge. She cites internal case studies: a 3-month embedded engagement that delivered output equivalent to 150% of the customer's headcount, an 82% reduction in delivery-project timelines versus pre-Devin baselines, and roughly double the PR throughput compared with single-point tools like CLIs or IDEs. Public examples include Nubank completing a 50-engineer ETL migration in about a third of the projected timeline using Devin autonomously, a Latin American bank migrating a legacy (COBOL/JCL-era) tax-identification system with half the usual effort, and a company she calls Built generating the weekly output of more than 10 engineers. Notably, Wu frames Cognition's FDEs explicitly as go-to-market — "everybody is go-to-market because the target is to make the customer successful at all costs" — with engineers embedded on customer sites for months at a time (one for 10 months in Brazil), a framing that runs counter to other forward-deployed-engineering talks in this series that insist FDE is a product function, not a sales one.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=RVxym6mmIns
- Duration: 17:38
- Playlist index: 949
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> It's nice to be here. I appreciate you all. My name is Gia. I'm a deployed engineering lead at Cognition. And today, hopefully, what you'll take away from this is that how we deploy Devin in the field is very much a function of how we view deployed engineering at Cognition. So, how the four deployed motion makes AI engineering actually real. Before I start, how many people like have heard of Devin or like know of Devin? Oh, cool. And I'm not talking about like the Devin of today. Like, I'm talking about the Devin back in 2024 when we first released and it was like, "Oh, SweepBench 13%. We're so We're so back." And as engineers, we were like, "We're so cooked." But, I mean, after...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/RVxym6mmIns.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
