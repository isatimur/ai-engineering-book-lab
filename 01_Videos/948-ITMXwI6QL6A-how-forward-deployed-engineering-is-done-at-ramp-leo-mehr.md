---
video_id: ITMXwI6QL6A
playlist_index: 948
title: "How Forward Deployed Engineering is done at Ramp — Leo Mehr"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ITMXwI6QL6A"
duration: "14:05"
duration_seconds: 845
view_count: 1100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ITMXwI6QL6A.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:16+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ramp's Leo Mehr gives two FDE principles - always be scoping (a costly mobile-platform anecdote) and scale with tokens, via a Notion agent on FDE requests cutting scoping time ~20%."
---

# How Forward Deployed Engineering is done at Ramp — Leo Mehr

## Summary
Leo Mehr, director of engineering at Ramp, joined when its FDE function was two engineers and now runs about 30 across deployed, developer API, and a new AI-services line; he distills the group's practice into two principles: "always be scoping" and "scale with tokens." On scoping, he tells two cautionary stories: an urgent Friday-night request for an SAP S/4HANA integration that turned out to be sales-quota pressure rather than customer need, and a reimbursement feature his team built for both iOS and Android — only to learn afterward the customer mandated iOS-only devices, wasting weeks of engineering effort that better upfront questioning would have caught. On scaling with tokens, Ramp replaced manual triage of its internal "FDE requests" Slack/Notion pipeline with a Notion agent that asks clarifying questions back and forth with the submitter before drafting a spec, cutting reply latency from hours/days to seconds and saving what Mehr estimates at roughly 20% of scoping time; he frames spec-to-implementation as already largely solved by frontier models one-shotting medium-size features, leaving context-gathering and scoping as the harder, unsolved middle of the pipeline. He argues the two principles are complementary failure modes: scoping without automation doesn't scale, while token-scaling without good scoping produces what he calls a "token-maxing slop cannon."

## Why it matters
- Two concrete, verifiable anecdotes (the SAP request driven by sales urgency, the iOS-only reimbursement feature) are citable examples of scoping failures specific to enterprise-facing engineering, useful wherever the book discusses requirements-gathering under AI-accelerated delivery.
- The claim that spec-to-code is "already largely solved" while context-gathering/scoping remains the hard, unautomated middle is a specific, falsifiable position on where agentic automation currently plateaus in a real production pipeline.
- Concrete before/after numbers (hours/days to seconds in reply latency, ~20% time saved) and the "token-maxing slop cannon" framing give the book a memorable data point and phrase for the risk of automating without first fixing scoping discipline — pairs directly with the Palantir/Anthropic FDE talk in this same cluster for a compare-and-contrast.

## Metadata
- Video: https://www.youtube.com/watch?v=ITMXwI6QL6A
- Duration: 14:05
- Playlist index: 948
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Awesome. Thank you, guys. Awesome. It's great to to meet everyone. I mean, I hope that after the talk, you know, if you want to come out and we can chat, we'd love to. Um Cool. So, yeah, today my goal is to share with you guys the two most important principles from what we learned doing FDE at Ramp. So, just yeah, briefly a little bit about myself. Yeah, I'm a director of engineering at Ramp. Uh I joined the company 2 and 1/2 years ago when it was just you know, FDE was just two engineers at the time. And today, my org is about 30 engineers across four deployed developer API and our new AI services um business. So, I know this is kind of a running theme, but like no one knows...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ITMXwI6QL6A.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
