---
video_id: ZRM_TfEZcIo
playlist_index: 775
title: "Turn 10,994 Notes Into Memory - Paul Iusztin, Decoding AI & Louis-François Bouchard, Towards AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ZRM_TfEZcIo"
duration: "39:32"
duration_seconds: 2372
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ZRM_TfEZcIo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:11+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Paul Iusztin (Decoding AI) and Louis-François Bouchard (Towards AI) show their AI Research OS, a set of Claude Code and Codex skills that turns a second brain (about 5,000 Obsidian and 5,000 Readwise notes) into project memory. It evolved in three versions: deep research over hand-picked golden links, then the same loop aimed at Obsidian, Readwise, NotebookLM and GitHub, then a living wiki of raw files, an index.yaml catalogue and LLM-written concept, entity and comparison pages. Their thesis: skip vector databases and knowledge graphs for personal research; plain markdown files and layered references keep queries token-efficient, and every question updates the wiki."
---

# Turn 10,994 Notes Into Memory - Paul Iusztin, Decoding AI & Louis-François Bouchard, Towards AI

## Summary
Paul Iusztin, founder of Decoding AI and co-author of a bestselling LLM engineering handbook, and Louis-François Bouchard, co-founder and CTO of Towards AI, present the AI Research OS they use daily. Iusztin spent 18 months on it. His second brain holds over 5,000 Obsidian notes and 5,000 Readwise notes, growing about 250 files a month, and his reading list is a graveyard: he never recalls what he saved when work starts.

**When to build this at all**
Bouchard gives a decision path. For quick answers, use a chat assistant. For a one-off change, use Codex or Claude Code. NotebookLM is strong for research but you do not own it, it is not agent native, and it is weak for code. A RAG pipeline with a vector database suits products but needs infrastructure and is hard to inspect by hand. Build your own system when you want research that compounds and stays inspectable. The core problem with plain agent sessions: the context window has to be the database, file system, memory and reasoning space, and it loses everything when the session ends. Bouchard moved Granola meeting recaps, Apple Notes and saved tweets into Obsidian so agents can read them as local files.

**Three versions**
- V1: topic plus hand-picked golden links in, a static research.md out. Golden links are scraped as seed context. An orchestrator writes questions; sub-agents use Gemini grounded in Google search and summarise each link. Three rounds of six queries gave 40–50 links, so a ranking step scores sources against the topic, fully scrapes the top K and keeps summaries for the rest. It produced 35 course lessons quickly.
- V2: the same loop aimed at their second brains (Obsidian, Readwise, NotebookLM, GitHub) plus the web, so the topic alone is enough input.
- V3: a static file goes stale and re-running research is expensive, so they add a wiki layer: raw files (immutable), an index, and LLM-generated wiki pages.

**The file-only design**
Iusztin says to forget the vector databases, knowledge graphs and semantic search you think you need. An index.yaml lists each source with origin, title, authors, date and summary, and points to wiki pages. The wiki holds source summaries, concepts (for example context compaction, sandboxing), entities, comparisons, notes and open questions. Queries go in layers: index, then source summary, then derivative pages, and only then the full raw source. Every question leaves a trace: new pages and a log entry. The LLM never edits his hand-written Obsidian notes; each project gets a scoped wiki built from the global vault.

**Demos**
The repo ships as a Claude Code plugin. Research depth has presets: light (one round of three queries) and fast (two rounds of three); a run takes 10 to 20 minutes. Demos built a wiki on agentic harness engineering from a brain dump, ingested three open-source harness repos (open code, Pi and Hermes) to compare permission flows and memory systems, and ingested three plain links with only Git and curl.

**Known gaps**
More connectors, weak source provenance and ranking, better linting and memory compaction. It stays a terminal builder workflow by design, because the goal is to teach memory and context management.

## Why it matters
- Makes a concrete case for plain files plus an index over vector stores for personal or small-team memory, with inspectability as the main reason.
- The layered read path (index, summary, derivative, raw) is a reusable pattern for token-efficient retrieval by agents.
- Shows deep research evolving into a living wiki, which answers the problem of expensive, stale one-shot research reports.
- Keeping human notes immutable and letting the LLM write only derivative pages is a clear boundary for agent-maintained knowledge bases.
- Ingesting several agent harness repos to auto-generate architecture comparisons is a practical way to study harness design from code.

## Metadata
- Video: https://www.youtube.com/watch?v=ZRM_TfEZcIo
- Duration: 39:32
- Playlist index: 775
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> I spent 18 months turning my second brain into my living research memory. Let me explain. So, within my second brain, I currently have over 5,000 notes in Obsidian and another 5,000 notes in Readwise and some scattered in Notion and Google Drive. And all of this is growing on every week 250 files per month. And this is what I want. On the left, you can see my whole Obsidian vault, this huge mass. And whenever I start working on something such as an article, a new project, a new code base, a new feature, or whatever, I want to actually pull high-signal notes that are actually useful for my current work. And you would ask yourself, why not use directly Codex Cloud or Notebook LM? And I think...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ZRM_TfEZcIo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/iusztinpaul/ai-research-os-workshop>
- resource: <https://academy.towardsai.net/courses/agent-engineering>
