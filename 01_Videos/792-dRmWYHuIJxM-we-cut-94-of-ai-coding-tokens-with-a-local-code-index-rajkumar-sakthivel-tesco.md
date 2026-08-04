---
video_id: dRmWYHuIJxM
playlist_index: 792
title: "We Cut 94% of AI Coding Tokens With a Local Code Index - Rajkumar Sakthivel, Tesco"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=dRmWYHuIJxM"
duration: "10:43"
duration_seconds: 643
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/dRmWYHuIJxM.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-06-28T23:47:37+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sakthivel describes a local hybrid-search code index that cut AI coding context tokens 94% (83K to 4.9K per query) by fixing input tokens instead of model choice or output compression."
---

# We Cut 94% of AI Coding Tokens With a Local Code Index - Rajkumar Sakthivel, Tesco

## Summary
Rajkumar Sakthivel and collaborator Foss found their AI coding bill spiked without any change in usage, and traced it to context: a typical query sent 45,000 tokens but only about 5,000 were actually relevant. They show three fixes that didn't work — shortening prompts (cost is already sunk once context is sent), tuning model settings like max tokens/temperature (affects output, not input), and output compression (cut output 75% but saved only ~8% overall, since output is just 10% of cost versus 90% for input) — before concluding the fix has to target input tokens directly. Their solution is a local search layer that chunks code into functions/classes, runs semantic and keyword search in parallel and merges results (each alone misses about 1 in 4 relevant matches, combined misses about 1 in 10), compresses matches to name-plus-description, tracks caller/callee relationships, and scores/discards low-relevance results with a simple weighted formula (50% semantic, 30% keyword, 20% recency) that runs in 0.4ms with no extra LLM calls. Benchmarked against the FastAPI repo (53 files, 20 developer questions), this cut tokens per query from 83K to 4.9K (94% reduction, 523 with added compression) while still surfacing the right code about 90% of the time, though recall dropped to near zero on a larger 396-file codebase with files that do many things at once. They also built a shared index and memory layer so Claude Code, Cursor, and Copilot draw on the same retrieval results instead of each re-explaining the codebase from scratch, reporting 12.4 million tokens (~$186) saved across 247 real queries and arguing that model choice (Opus vs. Sonnet) is a smaller cost lever than fixing what context gets fed in.

## Why it matters
- Concrete, numbers-driven case study of AI coding cost root-causing: quantifies the 90/10 input/output token split and walks through three failed cost-cutting attempts before landing on retrieval-based context reduction — useful evidence against the "just compress the output" or "use a cheaper model" instincts.
- Documents a reusable context-engineering pattern for coding agents — chunked hybrid (semantic + keyword) search, call-graph tracking, and a cheap weighted relevance score (0.4ms, no LLM judge) instead of an AI-judges-its-own-results approach that proved too slow.
- Supplies benchmarked, publicly reproducible numbers (94% token reduction, 90% retrieval accuracy, 12.4M tokens/$186 saved over 247 queries) plus honest failure modes (near-zero recall on large multi-purpose codebases) for a chapter on context engineering or the real cost structure of AI coding tools.

## Metadata
- Video: https://www.youtube.com/watch?v=dRmWYHuIJxM
- Duration: 10:43
- Playlist index: 792
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hey, I'm Raj. I want to tell a story. Me and my friend Foss, we are building project together. We are using AI coding tools everyday. Cloud code, cursor, co-pilot, code X, normal stuff. One month our AI bill was fine. Next month, huge. We did nothing different. Same project, same tools, just more of it. We panicked. We looked what was happening and we found something surprising. Most of the money was not the AI thinking. Most of it was sending too much context. Files the AI don't need. Context is important. Code that was not relevant sent anyway every time. So, me and my friend Foss, we started to building something to fix it. In this talk, is about what we built and what we learned. Every...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/dRmWYHuIJxM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.
