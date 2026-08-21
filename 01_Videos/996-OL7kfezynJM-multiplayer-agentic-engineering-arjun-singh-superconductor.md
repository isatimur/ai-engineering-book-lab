---
video_id: OL7kfezynJM
playlist_index: 996
title: "Multiplayer agentic engineering — Arjun Singh, Superconductor"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OL7kfezynJM"
duration: "18:44"
duration_seconds: 1124
view_count: 3200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/OL7kfezynJM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:06+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Superconductor's Arjun Singh gives lessons for multiplayer agentic engineering: model agnosticism, cross-interface sessions, least-privilege cloud sandboxing, and benchmarking agents on your own code."
---

# Multiplayer agentic engineering — Arjun Singh, Superconductor

## Summary
Arjun Singh, co-founder of Superconductor (he and cofounder Sergey previously built and sold GradeScope, met in the PhD program at Berkeley), lays out lessons for "multiplayer agentic engineering." He argues for staying model- and harness-agnostic since the best option can change weekly and open-weight models like GLM 5.2 are now cheap and competitive, and for keeping one persistent agent session usable across Slack, a desktop/mobile app, and GitHub rather than trapping it in a single interface, with all team members and agent-produced artifacts (screenshots, video) visible to the whole team including non-technical members. He demonstrates a "meeting bot" that sat in a 4-hour Google Meet at their conference booth, autonomously created a ticket from an idea raised in the conversation (adding acceptance-criteria fields to their own ticket form), and produced a screenshot of the change with no manual triggering. He argues agents should run in an isolated cloud sandbox rather than on laptops — explicitly building on the preceding GitHub Next talk's point about least-privilege agent access — both to remove "lid anxiety" and to prevent scenarios like an agent finding a stray production token on a laptop and wiping the wrong database, and says this same sandboxing lets non-engineers trigger real fixes via Slack. He reports benchmarking agent harnesses against their own Ruby-on-Rails pull requests, since public benchmarks like SWE-bench are Python-only: Anthropic/Claude models kept improving in quality but not speed and cost far more, while Codex was faster and cheaper and became their default, with the team spending about 1.5 billion tokens in a month across roughly 3,300 Claude Code runs (about $10,000/day in list-price tokens) versus about four times as many, cheaper Codex sessions.

## Why it matters
- The "meeting bot" example is a concrete case of turning an unstructured external signal (a live conversation) directly into a shippable code change with no manual hand-off — useful evidence for a chapter on agent-triggered workflows.
- The benchmarking argument (public benchmarks like SWE-bench don't transfer to a Ruby-on-Rails codebase) is a concrete, sourced case for why teams should build their own quality/cost/time evals rather than trust generic leaderboards.
- Singh's explicit agreement with the preceding GitHub Next talk on least-privilege sandboxing shows independent convergence, from a different vendor, on agent security as a precondition for giving agents broader autonomy.

## Metadata
- Video: https://www.youtube.com/watch?v=OL7kfezynJM
- Duration: 18:44
- Playlist index: 996
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. Hey everyone, I'm Arjun Singh. Today I'm going to talk to you about multiplayer agentic engineering or how to enable your whole team and your best agents to work together. If you go to the talks or go around the expo, you're going to see that a lot of people are talking about putting the agents at the center of everything. Makes sense, they're really powerful, they're really cool. But you don't see a lot of people talking about the people. Like this is all for us to make us our lives better, our more our more productive, whatever. And so we're going to really focus on how the people fit into these agentic workflows. Just a little bit about us first. So our team has...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OL7kfezynJM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
