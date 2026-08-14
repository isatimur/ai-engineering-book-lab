---
video_id: iKQ78wyJEXU
playlist_index: 959
title: "We Vetted 2000 AI Skills Before They Reached Developers — Lucas Palma, Nubank"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=iKQ78wyJEXU"
duration: "16:24"
duration_seconds: 984
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/iKQ78wyJEXU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-07-31T20:57:39+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Lucas Palma (Nubank) built Skill Vector, a CI tool blending regex scans and LLM review to vet AI skills as supply-chain risk, finding 1,500+ risks across 2,000+ scanned skills."
---

# We Vetted 2000 AI Skills Before They Reached Developers — Lucas Palma, Nubank

## Summary
Lucas Palma (product security manager, Nubank) presents Skill Vector, a CI-gated security review system built to treat AI coding skills as supply-chain artifacts — alongside packages, containers, and models — rather than harmless configuration, in a regulated financial-services environment. The tool combines deterministic checks (regex-based scanning for destructive shell commands, hardcoded credential requests, overbroad permissions, unintentional data exposure) with an LLM review pass for behavioral context, and reports findings directly as PR comments plus a SARIF-formatted output that feeds Nubank's vulnerability management program, all before a skill can reach the internal marketplace. Across more than 2,000 scanned skills, the team identified over 1,500 distinct risks (a single skill can carry several), remediated roughly 1,000 of them immediately, and blocked a smaller set of especially risky skills outright before marketplace distribution; a retroactive historical scan also surfaced risks in skills created before Skill Vector existed. One specific failure mode Palma highlights: skills that instruct an agent to "ask for confirmation" can let the AI confirm its own action, creating an illusion of human-in-the-loop oversight where none actually exists. Nubank is extending the same deterministic-plus-LLM pattern to MCP servers ("MCP Vector") and agent rules, arguing that the whole developer workflow — not just the generated code — needs to be treated as supply chain.

## Why it matters
- Helps map the current AI engineering landscape into reusable patterns, tradeoffs, and case studies.
- Useful as raw material for theme synthesis and future book chapters.

## Metadata
- Video: https://www.youtube.com/watch?v=iKQ78wyJEXU
- Duration: 16:24
- Playlist index: 959
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] Hello everyone. Good afternoon. Today I'm going to talk about how we vetted 2,000 AI skills before they reach a developers. But before I before of that, I'm Lucas Palma, but many people call me LP. I'm the product security manager at New Bank, the product security structures, uh structure that's within security, looking upon how we make code safe and supporting engineers, product managers and everybody to making our products safer. I have uh over a decade of experience in financial services engineering background also a lot of years working here at security and a close relationship with the part that I love which is innovation. So before beginning I believe I want to bring to you uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/iKQ78wyJEXU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
