---
video_id: jHMiYtjoJfA
playlist_index: 1011
title: "Designing Agents (The Floor Is the Frontier) — Ben Hylak, Raindrop"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jHMiYtjoJfA"
duration: "19:46"
duration_seconds: 1186
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/jHMiYtjoJfA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:36+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ben Hylak (Raindrop) distinguishes ceiling from floor in agent evals and gives tactical lessons: clusters aren't issues, code-mode trace classifiers scale, agents can't self-detect anomalies."
---

# Designing Agents (The Floor Is the Frontier) — Ben Hylak, Raindrop

## Summary
Ben Hylak, CTO/co-founder of Raindrop (which detects production issues in agents, verifies fixes, and simulates changes before deploy — used by Vercel, Speak, Framer), argues most eval discourse is stuck in the "chatbot era" of string-match tests that break the moment you swap models or harnesses. He splits the space into "benchmark maxers" (labs building general capability) versus "floor raisers" (companies imbuing domain-specific knowledge), and reframes agent quality as ceiling (best-case emergent capability) versus floor (worst-case failure, e.g., deleting data or emailing a competitor's recommendation) — arguing floor failures are what break user trust. His concrete advice: write evals as code/tests (citing Sentry's Vitest-evals and OpenAI's "macro evals") rather than managed prompt playgrounds; for floor-raising, track when an issue started and what percent of users it affects, not just that it exists. He gives three field lessons from Raindrop's own tooling: trace clusters are not issues (they don't track cleanly over time or generalize across companies), "code mode" — writing and sandboxing classifiers over traces — scales better than manual analysis, and agents are bad at anomaly detection so should be asked to investigate anomalies already surfaced by deterministic signals (e.g., keyword-frequency spikes) rather than to find them.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=jHMiYtjoJfA
- Duration: 19:46
- Playlist index: 1011
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Uh thank you all for coming, first of all. And um I want to talk today about uh raising the floor. So, it's this kind of a term we use a lot. Um mainly I want to talk about very, very practical, like what do I actually see, what do we actually see working in the real world, um how do people how are people making their agents better? So, the first thing I want to say is like um I could just I could just say a bunch of stuff. Like I think, you know, um the title of this track is like continual learning. I think it's like notable that in the real world, there's really not that much continual learning, right? Uh if you look at like the labs, if you look at like products that are in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jHMiYtjoJfA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
