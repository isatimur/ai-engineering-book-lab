---
video_id: "u0TOSBbAw7c"
playlist_index: 29
title: "Cognitive Exhaust Fumes, or: Read-Only AI Is Underrated — Šimon Podhajský, Head of AI, Waypoint"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=u0TOSBbAw7c"
duration: "11:31"
duration_seconds: 691
view_count: 1577
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/u0TOSBbAw7c.txt"
themes:
  - "RAG & Retrieval"
  - "MCP & Tooling"
ingested_at: "2026-04-24T10:50:44+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Šimon Podhajský, Head of AI at Waypoint, built a personal AI with read access to six data sources and no write permissions. He calls the byproducts of thinking (email, journal, tasks, CRM, browser tabs) 'cognitive exhaust fumes': waste alone, but cross-source analysis reveals intention-action gaps, attention drift and relationship decay. Demos show Claude skills producing a weekly reflection and matching recent reading to contacts. His thesis: risk is asymmetric (a read-only error costs nothing, a write error is unbounded), writes contaminate the signal, and observers are a separate product category, not a step toward agents. He admits the mosaic effect and shell access remain open risks."
---
# Cognitive Exhaust Fumes, or: Read-Only AI Is Underrated — Šimon Podhajský, Head of AI, Waypoint

## Summary
Šimon Podhajský, Head of AI at Waypoint, pushes against a personal AI space "obsessed with agents that act on your behalf." He built the opposite: a system that knows him but will not act for him. It reads six sources, has no write permissions, and the limit is "fully intentional."

**Cognitive exhaust fumes**
His term for digital activity that is a byproduct of cognition. Like a car's exhaust, each piece is waste, but analysis can "diagnose the engine." The top three uses are intention-action gaps, attention drift and relationship decay. No single tool sees these: "The cross-source signal is the product."

**Architecture in three zones**
Read-only sources the AI never writes back to; a workspace where analysis runs; and outputs that land in a separate Obsidian vault (or any separate store) for human review.

**Two demos**
- **Weekly reflection**: a Claude skill runs a Python script that pulls data from all sources, calls the Anthropic API for structured outputs with prepared prompts, and writes a markdown report. It covers themes, tensions, commitments and relationships ("mostly notable by its omissions"), and reflection questions. "This is not a productivity report."
- **Who should I discuss my reading with?** A plain-language question triggers a cross-source skill. It reads the Vivaldi browser's SQLite database for the most-read and still-open articles, searches his CRM through an MCP server (the slowest step), and maps contacts to one article each. It even found the author of one article in his network. Nothing was sent or scheduled. He warns the query eats a lot of context, so run it in a clean session.

**Why stay read-only**
- **Asymmetric risk**: "The downside of a read-only error is zero... The downside of a write error is unbounded." Personal AI touches relationships, career and reputation.
- **Clean signal**: once the AI writes to your sources, the exhaust is contaminated, and you observe a human-AI hybrid. The feedback loop should be mediated by you.
- **More value per interaction**: an agent saves 30 seconds on a weather check; the observer shows he has avoided his most important project for two weeks.
- **A different product category**: the industry treats read-only as a limitation you graduate from. He thinks that is wrong.

**The paranoid hat**
The mosaic effect means the same cross-referencing that makes the system useful makes it "a devastating target." Read-only does not fully break Simon Willison's three-factor risk model (private data, untrusted content, external communication), because shell access still allows outbound communication, and data still goes to Anthropic. "The worst security posture is the one you haven't examined."

## Why it matters
- Offers a clear counter-pattern to action-taking personal agents: read-only observers with a separate output store, justified by asymmetric risk.
- The cross-source framing (value comes from joining tools that were never designed to talk) is a strong argument for personal RAG over email, tasks, CRM and browser data.
- The "contaminated exhaust" point is a fresh reason to keep AI writes out of data you later want to analyze.
- Honest threat modeling: read-only reduces but does not remove exfiltration risk when the system has shell access and sends data to a model provider.

## Metadata
- Video: https://www.youtube.com/watch?v=u0TOSBbAw7c
- Duration: 11:31
- Playlist index: 29
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[MCP & Tooling]]

## Transcript excerpt
> Hi, my name is Shimon. Today, I'll talk about a personal AI system that knows you, but won't do anything instead of you or on your behalf, and won't blow up your life. So, that's good. In the process, I'll talk about the risks of personal AI and how read-only AI systems like this one mitigate them. Let's get started. The whole personal AI space is obsessed with agents that act on your behalf. I built something different. The starting point, six sources, read access only, no write permissions. The limitation is fully intentional. But first of all, what are cognitive exhaust fumes? What are they? It's my term for the digital activity that is a byproduct of your cognition. Like exhaust fumes...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/u0TOSBbAw7c.txt]]
- Description cue: Every other personal AI demo has agents sending emails and managing calendars. I built the opposite: a read-only system that queries my data sources (email, journal, tasks, CRM, browser sessions,...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/shippy/personal-intelligence-kit>
- resource: <https://slides.podhajsky.net/read-only-ai>
