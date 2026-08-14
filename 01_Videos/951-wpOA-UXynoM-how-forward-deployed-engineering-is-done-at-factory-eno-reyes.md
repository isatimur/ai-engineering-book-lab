---
video_id: wpOA-UXynoM
playlist_index: 951
title: "How Forward Deployed Engineering is done at Factory — Eno Reyes"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wpOA-UXynoM"
duration: "21:21"
duration_seconds: 1281
view_count: 3400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/wpOA-UXynoM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Factory CTO Eno Reyes describes forward-deployed engineering: the Droid harness, agent-readiness validation loops, and Missions tasks, citing 87% fewer bugs and 30-50M-line autonomous migrations."
---

# How Forward Deployed Engineering is done at Factory — Eno Reyes

## Summary
Eno Reyes, co-founder and CTO of Factory (previously ML/software engineering at Hugging Face and Microsoft), frames forward-deployed engineering as feeding customer signals back into the product rather than doing custom professional-services work. Factory's core product, the Droid harness, is a model-independent agent system that lets enterprises build "software factories" — automated signal-to-deploy pipelines with AI code review, QA, and security checks that Reyes says make a code change roughly 87% less likely to hit a bug. He defines "agent readiness" as the density of deterministic validation loops (linters, type checkers, security scans) in a codebase: Droid can autonomously fix an estimated 30-40% of flagged issues outright, while the rest require workflow changes. Factory's own codebase runs at 15-20% autonomy with an autonomy ratio in the upper 80%, and its internal "Legal Droid" workflow is fully autonomous; a separate product called Missions is a long-running harness for bounded, verifiable tasks, which Reyes says has been used for fully autonomous migrations of 30-50 million-line codebases, biomedical/healthcare deep-learning work, and financial equity-research modeling.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=wpOA-UXynoM
- Duration: 21:21
- Playlist index: 951
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> This is the forward deployed engineering track in case you're in the wrong room. Um as you already know, forward deployed engineering is one of the hottest topics in AI. The most important companies on the planet are building out massive FTE teams. So, think OpenAI, Anthropic, Google DeepMind, you get the idea. Forward deployed engineering was pioneered by Palantir many years ago to embed really strong software engineers directly into their customers' orgs uh to implement customize their platforms around the nuances of the real world. So, today we brought in some amazing speakers from Anthropic, Cursor, Factory, Ramp, Decagon, and many more uh to talk about the current state of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wpOA-UXynoM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
