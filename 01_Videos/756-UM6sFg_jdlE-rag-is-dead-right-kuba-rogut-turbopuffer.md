---
video_id: UM6sFg_jdlE
playlist_index: 756
title: "RAG is dead, right?? — Kuba Rogut, Turbopuffer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UM6sFg_jdlE"
duration: "11:13"
duration_seconds: 673
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/UM6sFg_jdlE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-09T21:18:48+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kuba Rogut (Turbopuffer) argues RAG isn't dead but is becoming iterative, hybrid retrieval, contrasting Claude Code's per-session grep loop with Cursor's Merkle-tree indexing and its cited accuracy gains."
---

# RAG is dead, right?? — Kuba Rogut, Turbopuffer

## Summary
Kuba Rogut (deployed engineer at Turbopuffer) argues "RAG is dead" tweets misdiagnose what's actually happening: naive one-shot vector search is being replaced not by pure agentic grep but by hybrid, tool-rich, iterative retrieval that agents call repeatedly during a session. He contrasts two traces — Claude Code's per-session grep-read-assess loop, which he says can burn thousands of tokens rediscovering the same code-base facts every session (Boris Cherney has said Claude Code dropped its local vector DB because it didn't work out), against Cursor's upfront-indexing model, which uses Merkle-tree hashing to reuse embeddings across the ~100 engineers on a team who mostly open the same few codebases and only re-embeds changed files. He cites Cursor's own (non-public) benchmarks: roughly 12.5-13.5% average answer-accuracy gains from semantic search across models (nearly 24% for their Composer model pre-Composer-2), plus an online A/B test showing about 2.6% better code retention and a 2.2% drop in dissatisfied requests in large codebases. He closes with Jeff Dean's line that huge context windows still need staged retrieval — "you don't need a trillion tokens at once, you need the right million" — framing embeddings as reusable "cached compute" rather than a technique to abandon.

## Why it matters
- Directly rebuts a circulating claim ("RAG is dead") with a named vendor's production benchmarks (Cursor's accuracy/retention numbers), giving the book a concrete data point on when vector search still earns its keep versus pure agentic grep.
- The Claude Code vs. Cursor trace comparison is a clean case study for a chapter on retrieval architecture trade-offs — per-session rediscovery cost vs. upfront indexing cost — grounded in a real engineering decision (Claude Code dropping its vector DB).

## Metadata
- Video: https://www.youtube.com/watch?v=UM6sFg_jdlE
- Duration: 11:13
- Playlist index: 756
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right, welcome everyone. Thanks for coming out. I see it's a full room, so I appreciate everyone coming out. So welcome to the talk about rag is dead, right? So my name is Kuba. I'm deployed engineer at Turbo puffer. So for those that don't know what Turbo puffer is, we are a full text search and vector search database built from first principles on top of object storage. If you would love to learn more, I'll just come find me after the talk if you have any questions. So let's get started. So this talk I get is up sorry about how rag is dead, how hybrid tool tool rich retrieval is becoming a default for serious agentic search. So you guys have been on Twitter or other social...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UM6sFg_jdlE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
