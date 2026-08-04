---
video_id: "w9u11ioHGA0"
playlist_index: 156
title: "Layering every technique in RAG, one query at a time - David Karam, Pi Labs (fmr. Google Search)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=w9u11ioHGA0"
duration: "20:22"
duration_seconds: 1222
view_count: 17446
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/w9u11ioHGA0.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:41:38+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "David Karam (Pi Labs, ex-Google Search) lays out a quality-engineering loop for RAG: baseline, find losses, then add techniques by complexity-adjusted impact, from BM25 to rerankers and query fan-out."
---
# Layering every technique in RAG, one query at a time - David Karam, Pi Labs (fmr. Google Search)

## Summary
David Karam (Pi Labs, formerly Google Search) argues that RAG technique selection should follow a "quality engineering loop" — baseline against easy/medium/hard query sets, do loss analysis to find what's actually broken, then pick techniques by complexity-adjusted impact — rather than starting from a technique ("should I use BM25 or vectors?") divorced from what's failing. He walks the resulting technique ladder: dumping documents straight into context (e.g. NotebookLM) until context windows overflow; BM25 for keyword-shaped queries; vector/relevance embeddings for natural-language queries (illustrated with an iPhone-battery-life example) once BM25 fails; cross-encoder rerankers to resolve conflicting candidate sets from combined BM25+vector retrieval, at higher compute cost; and custom domain embeddings when relevance alone can't capture vertical vocabulary (his legal-domain example: "regime," "moot," and "material" carry meanings a generic embedding misses). He stresses that ranking ultimately needs non-relevance signals too — price signals (a Perplexity demo that fails a "$50 or more" gift-budget query), merchant/popularity signals, PageRank-style prominence, and click-through/thumbs-up-down user-preference signals combined into one scoring function — plus query-orchestration fixes like fanning a complex query into many narrower sub-queries (citing Google AI Mode issuing 15-20 queries) because an LLM alone can't infer a search backend's capabilities from a prompt. His closing point is that at sufficient system complexity, failures are irreducible and stochastic, so the product itself must gracefully degrade or upgrade its UI based on confidence (Google Shopping's high-promise filterable UI vs. bag-of-words fallback) rather than trying to eval its way past the ceiling, and that model distillation only becomes worthwhile once GPU cost or latency (not quality) is the binding constraint.

## Why it matters
- Provides a concrete, non-hype decision framework (baseline → loss analysis → complexity-adjusted technique selection) for choosing among RAG techniques, directly useful for a chapter that needs to move past "is RAG dead" debates.
- Supplies specific, checkable examples (BM25 vs. vector-query shapes, legal-domain vocabulary failures, a Perplexity price-signal failure, Google AI Mode's query fan-out) that illustrate why relevance alone is an incomplete ranking signal.
- The closing argument that stochastic failure is irreducible and must be absorbed by UX design (graceful degradation) rather than engineered away is a useful counterpoint to eval-only narratives about reliability elsewhere in the book.

## Metadata
- Video: https://www.youtube.com/watch?v=w9u11ioHGA0
- Duration: 20:22
- Playlist index: 156
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] I'll I'll just give you all a little bit of context. So uh my co-founder and I and a lot of our team were actually working on Google search and then we left and like started Pyabs and uh I I loved I love the exit talk and like we're all nerds for information retrieval and search and uh so this is going to be a little bit of that. Uh just going to go through a whole bunch of ways you can actually show up and improve your rack systems. Uh I think one thing that I personally uh sometimes struggle with is there's a lot of talk about things sometimes like too much in the buzzed like oh specific techniques and you can do RL this way and you can tune the model this way and it's like...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/w9u11ioHGA0.txt]]
- Description cue: Start with the simplest Search - in-memory embeddings with relevance ranking. End with the most complex planet-scale Search - 70+ corpus mix of token, embeddings, and knowledge graphs, all...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
