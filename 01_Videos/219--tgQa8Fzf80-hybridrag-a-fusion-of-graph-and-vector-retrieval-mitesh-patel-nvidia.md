---
video_id: "-tgQa8Fzf80"
playlist_index: 219
title: "HybridRAG: A Fusion of Graph and Vector Retrieval  - Mitesh Patel, NVIDIA"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-tgQa8Fzf80"
duration: "20:24"
duration_seconds: 1224
view_count: 19233
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/-tgQa8Fzf80.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:44:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "NVIDIA's Mitesh Patel details a HybridRAG pipeline where LoRA fine-tuning Llama 3.1 for triplet extraction raised accuracy from 71% to 87%, evaluated via Ragas and the Nemotron-4-340B reward model."
---
# HybridRAG: A Fusion of Graph and Vector Retrieval  - Mitesh Patel, NVIDIA

## Summary
Mitesh Patel (NVIDIA developer advocacy) walks through building a HybridRAG pipeline that combines a knowledge-graph store (entity-relationship-entity triplets) with a semantic vector database, drawn from a partner engagement. He argues that ontology design and triplet-extraction prompting consume roughly 80% of build time, and shows that fine-tuning a Llama 3.1 model with LoRA to extract triplets — plus basic data cleaning (stripping regex artifacts and stray apostrophes) — raised extraction accuracy from 71% to 87% on a 100-document test set. Multi-hop graph traversal improves answer quality but adds latency, a tradeoff he addresses with NVIDIA's cuGraph acceleration library (integrated into NetworkX) to keep large-graph queries fast. For evaluation he uses the Ragas library (faithfulness, answer relevancy, precision/recall) alongside NVIDIA's Nemotron-4-340B reward model to score LLM responses. He frames the graph-vs-vector-vs-hybrid decision as depending on whether source data is already structured (retail, financial services, employee databases) or whether a usable knowledge graph can be extracted from unstructured text.

## Why it matters
- Gives a concrete before/after accuracy number (71% to 87%) for fine-tuning an LLM specifically for knowledge-graph triplet extraction — useful evidence for a chapter on structured extraction and data prep in RAG systems.
- Names concrete evaluation tooling (Ragas metrics, Nemotron-4-340B reward model) worth grounding a RAG-evaluation chapter in.
- Articulates a practical decision framework (structured vs. unstructured source data) for when graph-based retrieval is worth its added latency and compute cost, useful for a GraphRAG-vs-vector-RAG tradeoffs section.

## Metadata
- Video: https://www.youtube.com/watch?v=-tgQa8Fzf80
- Duration: 20:24
- Playlist index: 219
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] to quickly introduce myself. My name is Mitesh. I lead the develop advocate team at Nvidia. And the goal of my team is to uh create technical workflows, notebooks uh for different applications and then we release that codebase uh on GitHub. So developers in general which is me and you all of us together we can harness that uh that knowledge and take it further for the application or use case that you're working on. So that is what my uh my team does including myself. In today's talk, I'm I'm I'm going to talk about this project that we did with one of our partners um um and some of my colleagues at Nvidia and our partner about how can we create a graph rack system what are the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-tgQa8Fzf80.txt]]
- Description cue: Interpreting complex information from unstructured text data poses significant challenges to Large Language Models (LLM), with difficulties often arising from specialized terminology and the...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
