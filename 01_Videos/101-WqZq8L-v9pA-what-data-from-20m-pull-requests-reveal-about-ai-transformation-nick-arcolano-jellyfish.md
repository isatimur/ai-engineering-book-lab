---
video_id: "WqZq8L-v9pA"
playlist_index: 101
title: "What Data from 20m Pull Requests Reveal About AI Transformation — Nick Arcolano, Jellyfish"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WqZq8L-v9pA"
duration: "17:57"
duration_seconds: 1077
view_count: 1763
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/WqZq8L-v9pA.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:22:56+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jellyfish data from 20M pull requests across 1,000 companies shows AI coding adoption climbing to ~90%, roughly doubling PR throughput, but those gains vanish in highly distributed repo architectures."
---
# What Data from 20m Pull Requests Reveal About AI Transformation — Nick Arcolano, Jellyfish

## Summary
Nick Arcolano, head of research at Jellyfish, presents findings from a dataset of about 20 million pull requests spanning roughly 1,000 companies and 200,000 developers, tracked from June 2024 to the present. Median AI adoption rate (share of coding time using AI tools) rose from about 22% last summer to near 90% now, while autonomous agents (Devin, Codex-style) remain early: only 44% of companies used one at all in the past three months, accounting for under 2% of merged PRs. Full AI adoption correlates with roughly a 2x increase in PR throughput and a 24% drop in cycle time, PRs get about 18% larger (more net lines added, not more files touched), and neither bug-ticket rates nor PR reverts show a statistically significant relationship with AI adoption. The standout finding is that code architecture gates the payoff: companies with centralized or balanced repo structures see closer to 4x PR-throughput gains from AI adoption, while highly distributed architectures (many active repos per engineer) show flat-to-slightly-negative correlation, which Arcolano attributes to today's coding tools mostly working one repo at a time and cross-repo context rarely being documented.

## Why it matters
- Gives a large-scale empirical baseline (20M PRs, 1,000 companies) for AI coding adoption rates and productivity gains, useful for grounding claims about AI engineering ROI in real data instead of anecdote.
- Surfaces a concrete, counterintuitive case study — that repo/codebase architecture determines whether AI adoption actually translates into productivity gains — relevant to any chapter on context engineering or the limits of current coding agents.

## Metadata
- Video: https://www.youtube.com/watch?v=WqZq8L-v9pA
- Duration: 17:57
- Playlist index: 101
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> Hi, my name is Nicholas Arcolano and I'm the head of research at Jellyfish. Today, I'd like to talk to you about AI transformation, specifically what real world data can tell us about what's actually happening in the wild. Now, a lot of AI native companies are being founded right now, and there are many more existing companies that are trying to transform themselves into being AI native. I've talked to many folks from these companies, and they all have the same big questions. Number one, what does good adoption of AI coding tools and agents actually look like? Uh, number two, what productivity gains should I be expecting as we transform our team and the tools that we use? Uh, three, what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WqZq8L-v9pA.txt]]
- Description cue: Engineering teams are spending millions on AI coding tools, but most have no idea what's actually working. Without hard data, you're flying blind – unable to tell which teams are actually...

## Book angles
- Could support a chapter/section on **Coding Agents**.
