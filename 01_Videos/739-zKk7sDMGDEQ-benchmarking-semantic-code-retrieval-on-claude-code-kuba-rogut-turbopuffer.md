---
video_id: zKk7sDMGDEQ
playlist_index: 739
title: "Benchmarking semantic code retrieval on Claude Code — Kuba Rogut, Turbopuffer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zKk7sDMGDEQ"
duration: "16:08"
duration_seconds: 968
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/zKk7sDMGDEQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:10:34+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kuba Rogut (Turbopuffer) tests whether adding vector search to Claude Code, which ships with grep-only agentic search, helps it find the right code. He built a CLI tool called Turbo Grep that parses and chunks a repo, embeds it with Voyage Code 3 and indexes it in Turbopuffer, then scored three setups on 50 Context Bench tasks. Windowed reads plus semantic search raised file precision from 65% to 87%, but recall barely moved: semantic search wins on behaviour-adjacent files without shared keywords, grep wins on import tracing. His thesis: embeddings are cached compute, and agents need several lightweight retrieval tools."
---

# Benchmarking semantic code retrieval on Claude Code — Kuba Rogut, Turbopuffer

## Summary
Kuba Rogut works at Turbopuffer, a serverless full-text and vector search database built on object storage. In this short talk he asks a direct question: Claude Code dropped semantic search in favour of grep-style agentic search, while Cursor, one of Turbopuffer's first customers, indexes code bases and reports real gains. Who is right? He built a tool and ran a benchmark to find out.

**The case for vectors: embeddings are cached compute**
Rogut cites Cursor's blog post: semantic search gave its Composer model about a 24% relative improvement in answer accuracy, and roughly 12.5–13% across all models. An online A/B test showed a 2.6% increase in code retention on large code bases and a 2.2% drop in dissatisfied user requests. The numbers look small because most queries never need semantic search. His framing: an agent that greps repeats the same exploration in every session and every parallel agent (about 6,000 tokens in his example trace). An index pays once up front, then answers "how is metadata filtered" from a cache of meaning.

**The tool and the benchmark**
Turbo Grep is a simple CLI for Claude Code. It walks the file system, parses and chunks code with a splitter library, embeds chunks with Voyage Code 3 and uploads them to Turbopuffer. A V1 is open source; V2 is coming. He scored it on Context Bench, a human-labelled dataset that checks the process, not the outcome: did the agent read the right files, lines and symbols on the way to solving the task? Three conditions on 50 tasks: raw Claude Code, Claude Code with reads capped at 50 lines, and the capped reads plus the semantic search tool. The 50-line cap was needed because whole-file reads of 1,000 lines made the numbers too noisy.

**Results**
- Precision rose with each tool. Baseline file precision was 65% (33% line, 43% symbol); with windowed reads plus semantic search it reached 87%. In plain terms, one in three baseline file reads was wasted, one in five with windowed reads, one in eight with semantic search.
- Recall did not improve. Raw Claude Code won file recall because it explores everything, but its line recall dropped because it read many files without golden lines.
- Per-task breakdown showed the two methods find code differently. Semantic search won when relevant files shared behaviour but not keywords (an example handling many ORMs across libraries). Grep won on import tracing once it hit the right keyword in the first tool calls.

**Why the gains were smaller than Cursor's**
Claude Code is built for grepping. A bolted-on tool with a note that says use it sometimes does not teach the model when or why to call it. Composer treats semantic search as a built-in tool it was trained to use.

**Q&A points**
Semantic search works best on code with inline comments, because the embedding captures more meaning. He did no preprocessing; an audience member suggested Cursor injects synthetic comments before embedding. Grep is zero-cost locally; vector stores fit multiplayer data, knowledge bases such as Notion, and multimodal data you cannot grep.

## Why it matters
- Gives a concrete eval design for retrieval inside coding agents: score the trajectory (files, lines, symbols read) against human-labelled golden context, not just task success.
- Shows that precision and recall move separately; semantic search cut wasted reads from one in three to one in eight without raising recall.
- Supports an architecture of several lightweight retrieval tools, since grep and vectors win on different task types.
- Explains why a bolted-on tool underperforms: the model must know when to call it, which argues for training or strong tool descriptions, not just adding the tool.
- The "embeddings are cached compute" argument gives a cost model for parallel agents that re-explore the same code base each session.

## Metadata
- Video: https://www.youtube.com/watch?v=zKk7sDMGDEQ
- Duration: 16:08
- Playlist index: 739
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hi everyone. Welcome to benchmarking semantic search or semantic code retrieval on cloud code. My name is Kuba. I'm here from Turbo Puffer. For those unfamiliar with Turbo Puffer, we are a serverless full text and vector search database built from first principles on top of object storage. We serve some of the fastest growing AI companies in the world and if you'd like to know more about the talk or any question about Turbo Puffer or anything, just find feel free to find me after. So let's get started. So for those of you who are unaware, cloud code by default or I mean yeah, by default doesn't use semantic code search. There's actually a tweet from Boris. Those unfamiliar with...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zKk7sDMGDEQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://ca.linkedin.com/in/kubarogut>
