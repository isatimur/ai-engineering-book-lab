---
video_id: EcqMYoIV57A
playlist_index: 752
title: "Why More Context Makes Your Agent Dumber and What to Do About It — Nupur Sharma, Qodo"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=EcqMYoIV57A"
duration: "26:27"
duration_seconds: 1587
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/EcqMYoIV57A.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-09T21:18:41+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Qodo's Nupur Sharma details a benchmarked lost-in-the-middle pattern in agents, then covers fixes: context engines vs. knowledge graphs vs. iterative retrieval, an 80/20 research-vs-validation split, and judge agents."
---

# Why More Context Makes Your Agent Dumber and What to Do About It — Nupur Sharma, Qodo

## Summary
Nupur Sharma, from Qodo (an agentic code-review company), argues from internal benchmarking that dumping more context into an agent doesn't make it smarter: their tests on multi-agent code-review tasks showed a "U-curve" pattern where models attend to the start and end of the provided context while effectively discarding what's in the middle (e.g., linked Jira tickets or MCP data placed mid-prompt get purged rather than used). Her fix is strategic context optimization rather than brute-force stuffing, comparing four techniques by cost/scale tradeoffs: context engines (ranking/search "bouncers" that work well until indexing degrades past roughly 600-700 repos), hierarchical summarization (needs heavy upfront LLM cost per file/folder), knowledge graphs (best for cross-file logical dependencies but expensive to set up), and iterative retrieval (a lightweight "library card" index approach she says gives the best result for lowest developer setup cost). She names a second failure mode, the "orchestration paradox," where more capable models (she cites Opus) burn tokens endlessly re-researching which method or tool to use instead of executing, which Qodo addresses with an 80/20 split: high-reasoning models get free rein for the exploratory 80% of a task, while the final 20% (validation, summarization) is handled by simpler, more deterministic models with hard gates, loop counters, and timeouts. For multi-agent setups (built on LangChain), Qodo runs a "context collector" that distributes filtered, per-agent-relevant context to specialized sub-agents (security, code diff, Jira-linked issues), then reconciles their outputs with a "judge agent" that weighs each recommendation against indexed PR history — suggestions developers previously accepted get weighted up, ones repeatedly rejected get weighted down.

## Why it matters
- Provides a named, benchmarked description of context degradation ("lost in the middle" as a U-curve) directly relevant to any book discussion of context engineering and window limits, distinct from Chroma's context-rot framing cited elsewhere in the corpus.
- Compares four concrete context-retrieval architectures (context engine, hierarchical summarization, knowledge graph, iterative retrieval) with explicit scaling and setup-cost tradeoffs — useful as a practitioner-facing decision table for a book chapter on RAG/context architecture choices.
- Documents two specific multi-agent failure modes and fixes (the "orchestration paradox" solved via an 80/20 reasoning/validation model split; single-overloaded-agent task loss solved via specialized sub-agents plus a judge agent) that ground the book's multi-agent-architecture discussion in a shipped production system (Qodo's PR-review pipeline) rather than theory.

## Metadata
- Video: https://www.youtube.com/watch?v=EcqMYoIV57A
- Duration: 26:27
- Playlist index: 752
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> I'm Nupur. I work with Kodo. Uh at Kodo we do agentic reviews. Uh I have a background in dev sec ops. So I'm coming from an industry where everything was deterministic. The pipelines they run they crash. If they crash, we fix them. Uh to a place where we are doing agents where nothing is deterministic. So in my last few years I have learned where and how agents fail, what are the learnings and today I'll be sharing some of my learnings with you. So um if you see the evolution of agents, it started with static prompts where it was a 4K context window and we tried to put whatever was important or whatever we deemed important and the AI models will process it and provide you with a result....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/EcqMYoIV57A.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
