---
video_id: "tYCu_57jzL8"
playlist_index: 369
title: "The Knowledge Graph Mullet: Trimming GraphRAG Complexity - William Lyon"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=tYCu_57jzL8"
duration: "32:52"
duration_seconds: 1972
view_count: 2075
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/tYCu_57jzL8.txt"
themes:
  - "RAG & Retrieval"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:15:32+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "William Lyon of Hypermode argues for a 'knowledge graph mullet': property graph in the front for modelling and querying, RDF triples in the back for scale and data interchange. He shows how the open-source Dgraph stores triples with unique node IDs and posting lists, queries them with the GraphQL-inspired DQL, and treats GraphRAG as multiple subgraph entry points (vector, geospatial, image search) followed by graph traversal over a news knowledge graph. He then demos the Dgraph MCP server with Claude desktop, the Modus agent framework built on WebAssembly, and prompt-built Hypermode agents that can eject to code."
---
# The Knowledge Graph Mullet: Trimming GraphRAG Complexity - William Lyon

## Summary
William Lyon works at Hypermode. His thesis: property graphs and RDF are usually treated as rival paradigms, but you can combine them. The "knowledge graph mullet" is "property graph in the front and RDF triples in the back": expose a property graph model for how you think about and query the data, and use RDF triples for scale.

**Two paradigms, one store**
Property graphs have nodes with labels, typed and directed relationships, and key-value properties, usually queried with Cypher. RDF comes from the semantic web, uses ontologies, triples, and SPARQL. Lyon's working definition of a knowledge graph is an instance of a property graph where semantics live in the data model: "things, not strings," a canonical representation of each entity.

**How Dgraph does it**
Dgraph was open-sourced in 2017. The D is for distributed, and the original team came from Google. It uses the property graph model for modelling and querying, but RDF for interchange, with the triple as the smallest unit of record:
- The subject is always a unique node ID that maps to a disk offset, for fast traversal.
- The predicate is a relationship or a property; the object is another node ID or a value.
- A posting list groups by predicate and stores the IDs of all connected nodes.
- DQL, inspired by GraphQL, starts each traversal from an indexed root and uses a nested selection set that both picks fields and describes the traversal. Results come back as JSON in the same shape.

**GraphRAG as subgraph entry points**
The demo is a news knowledge graph built from New York Times articles: article, author, topic, organization, geographic area, and image nodes, with each paragraph stored as a chunk node carrying an embedding. In naive RAG, vector search returns chunks and you stop. In GraphRAG that is "just the starting point": you traverse from chunks to articles to topics to other articles. Entry points can be vector search on the lexical graph, a geospatial index (areas within 50 km of New York City), or image similarity. Queries in the workbench find articles close to an embedding of the phrase money laundering, then traverse topics to find related articles the vector search missed.

**MCP and agents**
- The latest Dgraph release folds all enterprise features into one open-source release and adds an MCP server per instance: a read-only endpoint (queries, schema) and a full one (mutations, schema changes).
- With Claude desktop, the model inspects an empty schema, designs an e-commerce schema, writes mutations, verifies the data, fixes missing relationships, renders a graph visualization, and builds recommendation queries (collaborative, content-based, demographic). It gets some queries wrong and iterates. Lyon calls this a good way to learn a new query language.
- Modus is an open-source agent framework and runtime for stateful, long-running agents. Logic in Go or AssemblyScript compiles to WebAssembly, which gives a sandbox, and Modus generates one GraphQL API from your types and function signatures.
- Hypermode agents start from a prompt plus MCP connections (GitHub, Notion, company docs). A social media intern agent reads the Hypernews repo, writes posts with code snippets, saves them to Notion, and can then "eject to code" as Modus code.

## Why it matters
- The mullet framing gives a clear way to explain that the user-facing graph model and the storage model can differ, instead of picking Cypher or SPARQL camps.
- Defines GraphRAG concretely as many entry points (vector, geo, image) plus traversal, which separates it cleanly from naive chunk retrieval.
- The Claude desktop demo shows a database MCP server where the model writes, runs, and verifies its own queries, errors included, with a read-only endpoint as a safety split.
- The prompt-first agent that can eject to code is a concrete pattern for moving from no-code prototype to owned code.

## Metadata
- Video: https://www.youtube.com/watch?v=tYCu_57jzL8
- Duration: 32:52
- Playlist index: 369
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Agent Architecture]]
- [[MCP & Tooling]]

## Transcript excerpt
> Hey everyone, my name is Will and in this talk we're going to be learning all about the knowledge graph mullet and how it can trim graph rag complexity. Uh let's jump right in. So bear with me a little bit in this analogy. Uh, but if you're famili familiar with the mullet haircut, this is a classic business in the front, party in the back, uh, sort of short up front, long in the back, uh, hairstyle that, uh, was popular in the in the 80s and '90s. And if we think of like what are the benefits of the mullet haircut, it's really all about lowmaintenance, easy to work with, but versatile and adaptable in different environments. And if we extend that analogy to knowledge graphs, that gives us...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/tYCu_57jzL8.txt]]
- Description cue: There are typically two approaches to working with graphs: property graphs and RDF. These systems are often thought of as different knowledge graph paradigms optimized for different workflows....

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/johnymontana/hyper-news>
- resource: <https://docs.hypermode.com/dgraph/overview>
- resource: <https://hyp.foo/agents>
