---
video_id: "XNneh6-eyPg"
playlist_index: 215
title: "Practical GraphRAG: Making LLMs smarter with Knowledge Graphs — Michael, Jesus, and Stephen, Neo4j"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=XNneh6-eyPg"
duration: "19:46"
duration_seconds: 1186
view_count: 40346
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/XNneh6-eyPg.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:44:20+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Neo4j engineers argue vector RAG lacks relevance/explainability, citing GraphRAG research and LinkedIn's 28.6% faster ticket resolution via knowledge-graph RAG."
---
# Practical GraphRAG: Making LLMs smarter with Knowledge Graphs — Michael, Jesus, and Stephen, Neo4j

## Summary
Michael Hunger (VP of product innovation, Neo4j) and Stephen (developer relations lead, Neo4j) — co-authoring O'Reilly's "GraphRAG: The Definitive Guide" — argue plain vector RAG breaks down at enterprise scale because vector similarity isn't the same as relevance and results aren't explainable. They cite Microsoft Research's GraphRAG paper (better answers at lower token cost), a data.world study showing 3x higher accuracy for RAG-on-graph versus RAG-on-SQL, and a LinkedIn customer-support case study where knowledge graphs cut median per-issue resolution time by 28.6%. They walk through a three-phase construction pipeline — unstructured text into a lexical graph of documents and chunks, LLM-driven entity/relationship extraction against a supplied schema, then enrichment via graph algorithms like PageRank and community detection/summarization — followed by retrieval that starts with an index search (vector, full-text, or hybrid) to find entry points and then walks relationships outward, optionally filtered by the querying user's role, to hand the LLM a subgraph rather than isolated text fragments. They demo Neo4j's open-source knowledge-graph-builder (ingesting PDFs, YouTube transcripts, and Wikipedia articles with vector/graph/full-text/entity retrievers and per-answer source explainability), an agentic pattern where domain-specific Cypher-query retrievers act as tools in a loop, a Python GraphRAG package, and the graphrag.com pattern catalog.

## Why it matters
- Supplies concrete case-study numbers (LinkedIn's 28.6% faster ticket resolution, data.world's 3x accuracy gain for graph vs. SQL retrieval) that a book chapter can cite when arguing RAG-vs-GraphRAG trade-offs.
- Lays out a reusable reference architecture — lexical graph construction, LLM entity extraction, algorithmic enrichment, multi-index graph retrieval — for a chapter on retrieval system design beyond basic vector search.
- Points to citable open-source artifacts (Neo4j's knowledge-graph-builder, the GraphRAG Python package, graphrag.com) as concrete tooling references rather than abstract claims.

## Metadata
- Video: https://www.youtube.com/watch?v=XNneh6-eyPg
- Duration: 19:46
- Playlist index: 215
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] We are talking about graph rack today. That's the graph rack trick of course. Uh and we want to look at patterns for successful graph applications uh for um making LLMs a little bit smarter by putting knowledge graph into the picture. My name is Michael Hunga. I'm VP at of product innovation at Neo Forj. My name is Steven Shin. I lead the developer relations at Neo Forj. And um actually we're we're both co-authoring. This is fun because we're both already authors and finally we've been friends for years and we finally get to co-author a book. We're co-authoring Graph Ragg, the definitive guide for O'Reilly. So basically we didn't sleep this past weekend because we had a book...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/XNneh6-eyPg.txt]]
- Description cue: RAG has become one standard architecture component for GenAI applications to address hallucinations and integrate factual knowledge. While vector search over text is common, knowledge graphs...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
