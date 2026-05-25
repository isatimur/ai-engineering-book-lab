---
video_id: "LLuKshphGOE"
playlist_index: 105
title: "Context Engineering: Connecting the Dots with Graphs — Stephen Chin, Neo4j"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LLuKshphGOE"
duration: "26:50"
duration_seconds: 1610
view_count: 5610
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/LLuKshphGOE.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:23:05+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Stephen Chin, VP of Developer Relations at Neo4j, argues that knowledge graphs are the missing layer between vector similarity search and the multi-hop relational queries real enterprise agents need. His core claim: standard vector RAG fails when an answer requires connecting two or more related facts that don't appear in the same document chunk — this is exactly the use case where Graph RAG outperforms. He demonstrates two concrete patterns: (1) a two-pass retrieval (vector similarity → graph traversal of related nodes → pass both to LLM) on a security vulnerability dataset, where the agent-assisted graph traversal produced a far more detailed CVE analysis than the vector-only approach; (2) graph-based episodic memory that stores conversations as entity/relationship nodes with timestamps, enabling a query like 'update the presentation from the last time I presented with Sid' to resolve the correct people, event, and time period from the graph."
---
# Context Engineering: Connecting the Dots with Graphs — Stephen Chin, Neo4j

## Summary
Stephen Chin is VP of Developer Relations at Neo4j. The talk covers context engineering as an evolution from prompt engineering: instead of crafting one clever prompt, you architect what information the model receives and how. Graphs are Chin's proposed infrastructure layer for the cases where vector similarity search is insufficient.

**Context engineering vs. prompt engineering**
Prompt engineering gets a single clever phrasing to elicit a result. Context engineering builds dynamic pipelines that selectively curate information — pulling from multiple sources, maintaining state and history, structuring output for downstream tools — and gives the model a high signal-to-noise context. The key challenge: large context windows with poor attention focus, where the model ignores the right parts of a long context and produces hallucinations or misses key facts.

**Why graphs complement vectors**
Vectors answer: "what chunks are semantically similar to this query?" Graphs answer: "given these related nodes, what other nodes are connected, and how?" The value of graphs appears when an answer requires two or more hops of relational context — facts that are related but wouldn't appear in the same document chunk. Chin's rule: if you can answer with a single vector similarity search, standard RAG is fine. If the answer requires connecting two or more related facts, graph RAG adds substantial value.

**Knowledge graph construction**
Using Neo4j's open-source LLM Knowledge Graph Builder, Chin loaded a supply chain SBOM document and a VEX security vulnerability document (covering Jackson library CVEs) into a Neo4j Aura instance. The builder uses an LLM ingest phase to extract nodes (entities), relationships, and properties (including vector embeddings on node text) from unstructured documents.

**Demo 1: Two-pass Graph RAG on security data**
The retrieval pipeline: (1) vector similarity search to find semantically related nodes; (2) graph traversal from those nodes to collect connected context; (3) pass combined context to LLM. The demo asked about Jackson library vulnerabilities. The LLM-only pass gave a limited answer. The graph RAG pass — with traversal pulling related nodes — gave a detailed response including: CVE number, affected versions, attack type, severity, technical description, and specific upgrade version for remediation. Asking about Jasper (not in the graph) correctly returned no information — bounded knowledge.

**Demo 2: Claude Code with Neo4j MCP server**
The second demo used the Neo4j Cypher MCP server (open-source, configured with DB credentials) wired into Claude Code. When asked about the Jackson vulnerability, Claude autonomously planned a multi-step graph query: first fetched the schema (so it could write valid Cypher), then fired multiple queries, then pulled text chunks from related nodes. Result: substantially more detailed than the fixed two-pass pipeline because the agent could adapt its traversal strategy mid-query.

**Graph-based episodic memory**
For long-term agent memory, Chin describes storing conversation entities and relationships as graph nodes with temporal properties. The example: "update the presentation from the last time I presented with Sid." A standard vector search might surface both people but lose the temporal and event relationship. A graph query can retrieve: person (Stephen Chin, VP Devrel) + person (Sid, community manager) + event (GIDS, Bangalore) + time (previous occurrence), and pass all of that as structured context to the LLM.

**Three retrieval approaches on a spectrum**
1. *Explicit retrieval*: pre-authored Cypher queries, reliable but inflexible.
2. *Text-to-Cypher*: LLM generates Cypher from natural language, using the schema for guidance — more flexible.
3. *Agentic traversal*: iteratively navigate the graph, accumulate context until the question is answered — most powerful for multi-hop questions.

**Role-based access via graph**
Graphs support overlaying access control directly on nodes: a doctor sees diagnosis nodes; an admin sees contact information nodes. This enables explainable, auditable access control that standard vector stores cannot provide natively.

## Why it matters
- The two-hop rule provides a practical decision criterion for when to invest in graph RAG vs. standard vector search.
- The demo comparison (fixed pipeline vs. agentic MCP traversal) is a concrete illustration of why agent-driven retrieval outperforms fixed retrieval for complex relational queries.
- Graph-based episodic memory with temporal relationships is a genuinely different approach to agent memory from the vector-only alternatives.
- The role-based access control capability addresses an enterprise requirement (patient data, financial data) that vector stores can't handle without application-level filtering.

## Metadata
- Video: https://www.youtube.com/watch?v=LLuKshphGOE
- Duration: 26:50
- Playlist index: 105
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> Hello everybody and welcome to my session at a engineer code summit and I'm going to talk a bit about how you can connect the dots with graph technology and solve problems like context engineering um improving retrieval patterns and also agentic memory. So we're going to have a lot of fun. My name is Stephen Chin. I'm VP of developer relations at Neo Forj and you can find me at all the different social media outlets with my handle Steve on Java. So excited you're all here to join for the session today. And I think this is how a lot of us have felt the past couple years as AI technology has basically taken our jobs away. We've become slaves to um AI programming, to prompt development, to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LLuKshphGOE.txt]]
- Description cue: AI systems need more than intelligence; they need context. Without it, even the most advanced models can misinterpret information, lose track of details, or arrive at conclusions that don’t...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
