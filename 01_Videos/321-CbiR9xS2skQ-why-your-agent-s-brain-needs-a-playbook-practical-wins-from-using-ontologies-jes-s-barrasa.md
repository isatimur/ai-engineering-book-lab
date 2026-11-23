---
video_id: "CbiR9xS2skQ"
playlist_index: 321
title: "Why Your Agent’s Brain Needs a Playbook: Practical Wins from Using Ontologies - Jesús Barrasa, Neo4j"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CbiR9xS2skQ"
duration: "13:54"
duration_seconds: 834
view_count: 1736
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/CbiR9xS2skQ.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:13:34+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jesús Barrasa, field CTO for AI at Neo4j, explains graph RAG (RAG with a knowledge graph in place of a vector database) and argues for being model driven with ontologies. First, an ontology is an implementation-agnostic schema, for example a W3C-standard file such as a public financial-industry ontology. It can drive graph building from both structured mappings and LLM entity extraction, instead of separate JSON, Python-class or prompt schemas. Second, if you store the ontology in the graph, a retriever can read which relationships are marked as contextualizing and follow only those after a vector hit. Change the ontology and the retriever changes too."
---
# Why Your Agent’s Brain Needs a Playbook: Practical Wins from Using Ontologies - Jesús Barrasa, Neo4j

## Summary
Jesús Barrasa is the field CTO for AI at Neo4j. In a 14-minute talk on the graph RAG track, he argues that ontologies, formal descriptions of a domain, give two practical wins: a single schema to build knowledge graphs from any source, and a way to make retrievers dynamic and data-driven.

**Graph RAG in one minute**
Graph RAG is RAG with the vector database replaced by a knowledge graph on a graph database. The flow is the same: retrieve from a curated, trusted knowledge base and pass the results to the LLM so it answers from grounded information. The graph adds richer retrieval strategies: vector search, contextualization by following connections, and generated structured queries. Barrasa claims better completeness, relevance, precision and faithfulness.

**What the graph holds**
Neo4j uses the property graph model: nodes for entities (people, objects, locations, events, documents) and directed relationships, both with key-value properties. This is the domain graph. Graphs built from unstructured data add a lexical graph: a document node with its chunks, a simple sequence or a tree of sections and clauses for something like a contract. Entity extraction links chunks to the domain entities they mention. Chunk nodes can store vectors as properties, so vector storage and connected data live on one platform.

**Problem: schemas diverge**
"There's no graph rack without a graph." Structured pipelines map tables to node and relationship types against a target schema. Unstructured pipelines (Neo4j's graph RAG package, and its LangChain integration) split, embed and run entity extraction, which also needs a schema: medical patients and symptoms, or financial accounts and transfers. But each path expresses the schema differently: JSON, a Python class description, or natural language in a prompt.

**Win 1: ontology as the agnostic schema**
An ontology is a shared, implementation-agnostic formal schema. W3C standards define them, with XML, JSON and other serializations. Barrasa shows a fragment of a public financial-industry ontology: a stock corporation is a subclass of a privately held company and is governed by a board agreement. Classes map well to a graph model, so one ontology can drive both pipelines. His advice is to be model driven: it is good data-engineering practice, builds a better graph, and improves text-to-query accuracy and contextualization later.

**Win 2: ontology-driven retrievers**
A vector index is a new entry point into the graph. Embed the query, find nearby chunk vectors, then dereference them to their nodes and navigate, filter or aggregate. In a movie example, a plot search for a hacker who learns his world is a simulation run by machines returns the top three hits. A retrieval query then explores around each one. The catch: the developer must hard-code the model (actors act in movies) into that query. If the ontology is stored in the graph, with some relationships annotated as contextualizing, a dynamic query can read the ontology and follow only those. For The Matrix, it follows the acting relationships, not producer or director. Change the ontology, a data artifact, and the retriever changes on the fly.

## Why it matters
- Gives a clear definition of graph RAG and its extra retrieval modes (vector entry, graph contextualization, structured queries) to compare against plain vector RAG.
- Names a real pain point, schema drift across extraction pipelines (JSON, Python classes, prompts), and proposes one standard artifact to fix it.
- The ontology-driven retriever is a concrete pattern for moving retrieval logic out of code and into data, so domain experts can tune context without redeploying.
- The lexical-graph idea (documents, chunk trees, entity mentions) is a useful design reference for any pipeline that must trace answers back to source text.

## Metadata
- Video: https://www.youtube.com/watch?v=CbiR9xS2skQ
- Duration: 13:54
- Playlist index: 321
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] welcome. Thank you for joining my session this morning. I was thinking that I was in some kind of niche space where people would not be interested, but I'm curious to hear, you know, what brought you to to this session. Anyway, I'm I'm Jesus Barasa. I'm the I'm the field CTO for AI with NEOJ and uh and yeah, for the next like uh 14ish minutes, I'm going to be diving a bit deeper into this uh really powerful combination which is knowledge graphs and uh and large language models to build AI applications and and in particular I'm going to be focusing on this interesting knowledge artifacts that are ontologies and and how we can use them uh to get some some practical wins in in our...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CbiR9xS2skQ.txt]]
- Description cue: You're trying to guide how your agents think and act. Code-orchestrated workflows are too rigid, but LLMs charting their own course feel too chaotic. When you need a middle ground, it’s time...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
