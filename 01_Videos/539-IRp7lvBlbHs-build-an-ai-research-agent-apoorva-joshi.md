---
video_id: "IRp7lvBlbHs"
playlist_index: 539
title: "Build an AI Research Agent: Apoorva Joshi"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IRp7lvBlbHs"
duration: "27:33"
duration_seconds: 1653
view_count: 17816
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/IRp7lvBlbHs.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:22:58+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Generic LangChain agent-building workshop (tool calling, ReAct, memory) using arXiv paper search as example data; no science-specific constraints appear."
---
# Build an AI Research Agent: Apoorva Joshi

## Summary
Apoorva Joshi (MongoDB) runs a hands-on workshop teaching general agent-building concepts — when to use an agent versus simple prompting or RAG, planning patterns (chain-of-thought, tree-of-thought, ReAct, reflection), short-term versus long-term memory, and tool calling — using a "research agent" that fetches and summarizes arXiv papers as the worked example. The actual build is generic LangChain scaffolding: a tool-calling or ReAct agent constructor, an agent-executor loop, three tools (a papers-to-read list, a paper-summary tool, and a MongoDB-vector-store Q&A tool), and short-term memory persisted through a MongoDB-backed chat-history wrapper. The talk does not address verifying scientific claims, catching hallucinated citations or summaries, or any escalation path for wrong answers about research findings; arXiv papers serve only as sample data for a standard RAG/agent tutorial, not as a source of distinct requirements.

## Why it matters
- No domain-specific constraint appears: this is a generic agent-architecture tutorial (tool calling, ReAct, memory) that happens to use arXiv paper search as its example dataset.
- There is no discussion of verifying scientific claims, catching hallucinated summaries/citations, or any human-review step for research-agent output — the science domain is incidental, not load-bearing.
- Most useful as a reference for baseline agent-building patterns (LangChain tool-calling vs. ReAct constructors, short/long-term memory design) rather than as evidence about AI in scientific research specifically.

## Metadata
- Video: https://www.youtube.com/watch?v=IRp7lvBlbHs
- Duration: 27:33
- Playlist index: 539
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] hello everyone and welcome to this Workshop I like to call the a toz of building AI agents so during the workshop today uh we'll spend about 20 to 30 minutes talking about the basic concepts of what AI agents are when to use them the different components of agents and Concepts that you'll find helpful during the Hands-On portions of the workshop and then you will spend the rest of the time building an AI agent of your own with help and assistance from me and I have my awesome team back there there's Tom Ben and Fabian so if you run into issues call upon one of us and we'll figure it out here's a little bit about me I'm Aura and I'll be your uh lead instructor for today five months...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IRp7lvBlbHs.txt]]
- Description cue: In this 2 hour workshop, we will build an AI research agent that can search for research papers, summarize them, and answer questions on topics based on past research. We will use MongoDB as...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://mongodb-developer.github.io/ai-agents-lab/docs/dev-env/dev-setup>
