---
video_id: kRkcNOsRyYg
playlist_index: 921
title: "AI on Your Lakehouse: Context Comes in Shapes, Not Queries — Zach Blumenfeld, Neo4j"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kRkcNOsRyYg"
duration: "1:59:10"
duration_seconds: 7150
view_count: 1200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/kRkcNOsRyYg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:10+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Zach Blumenfeld, an AI research engineer at Neo4j, runs a two-hour hands-on workshop arguing that text-to-SQL and vector search reach lakehouse data but give agents the wrong context for estate-level questions such as what documentation is missing. Using a fictional auto repair chain on BigQuery and Claude Code, he builds three graph shapes: a metadata semantic layer for joins (no ETL of the warehouse data), a deterministic table-of-contents tree with hierarchical URIs and cross-links plus scoped full-text search, and Leiden community themes from document links with no LLM labelling. The agent combines them to find gaps and patterns."
---

# AI on Your Lakehouse: Context Comes in Shapes, Not Queries — Zach Blumenfeld, Neo4j

## Summary
Zach Blumenfeld is an AI research engineer at Neo4j. This is a two-hour hands-on workshop, run through a free GraphAcademy course in Codespaces, with Claude Code as the agent. His thesis: on a lakehouse, access is no longer the problem, because text-to-SQL and vector search reach the data. The problem is context shape. With hundreds of tables and millions of documents, a copilot gets "confidently wrong," and some questions cannot be answered by similarity at all.

**The scenario**
A fictional national auto repair chain keeps a BigQuery warehouse of work orders, vehicles, diagnostic codes, procedures and parts, plus a bucket of PDF manuals, safety bulletins and recalls. Leadership wants a copilot for floor technicians, whose shop goal is a low comeback ratio. The hard questions are estate-level: what documentation is missing or unused, what we keep failing to fix, how records relate across lookalike tables. Proving a negative is impossible with semantic search, which "can only match similar things."

**Shape 1: connections (a semantic layer)**
A Neo4j labs project, Neocarta, pulls only BigQuery metadata through an MCP server into a graph: database, schema, tables, columns, sample values, and join paths (six tables, five join paths here, from primary and foreign keys; query logs or manual terms also work). The agent reads this graph, then writes SQL. There is no ETL of warehouse data. He explains why not: terabytes that change constantly, sync cost, and security posture. Bring data into the graph only when you need graph-speed queries or algorithms. His distinction: an ontology helps something reason about data; a semantic layer gives agreed terms so it can query accurately.

**Shape 2: table of contents**
Documents load deterministically, with regex and no LLM extraction: a containment tree (library, folder, document, nested sections) plus next-section and links-to edges. The load is idempotent and fast. Every node has a hierarchical URI, so a script returns an outline from any URI at a chosen depth, and the agent can drill into subtrees and follow cross-links. A companion full-text index over documents and sections, post-filtered by URI prefix, scopes search to a subtree, for example only recalls. Instead of wiring vector vendors, he uses "semantic expansion": the model adds synonyms, so engine stuttering also searches misfire or rough idle. Short, shared relationship names keep queries simple.

**Shape 3: themes**
Links between documents are collapsed to document level, projected into memory, and clustered with Leiden community detection from the graph data science library. Each theme lists its documents, how tightly they interlink, top shared link targets and the most central documents. With no LLM naming, clusters emerge such as body-control and bus systems or brakes; gamma tunes granularity (13 groups at default, 14 at gamma two). It is stable and cheap compared with LLM-summarized graph RAG communities, but only as informative as the document titles and link labels.

**Putting it together**
The agent writes the complex graph queries from specs in a docs folder, using the Neo4j CLI with its query-language and graph data science skills, because generic web knowledge gives "outdated bad" queries. Demo answers: a VIN-plus-code question resolves to a revised ignition coil by combining full-text grounding, tree links and warehouse join paths; a gap question finds field codes with no code-level documentation and codes diagnosed with the wrong procedure; a pattern question groups work orders under themes. The structured and unstructured graphs are not linked; the agent joins them in real time. He has no benchmarks for this course and says customers benchmark their own ontologies against vector search.

## Why it matters
- The idea that context comes in shapes reframes retrieval design: pick the structure (join graph, outline, clusters) that matches the question type, not just a better query.
- A metadata-only semantic layer gives agents correct joins over a warehouse without copying data, a pattern that respects security and sync limits.
- Deterministic, idempotent document graphs with hierarchical URIs are a cheap alternative to LLM entity extraction when documents already carry structure.
- It names a hard limit of similarity search, proving a negative, and shows graph navigation answering gap and coverage questions.
- The spec-first approach, with vendor skills for the query language, is a concrete way to make agents write correct domain queries.

## Metadata
- Video: https://www.youtube.com/watch?v=kRkcNOsRyYg
- Duration: 1:59:10
- Playlist index: 921
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. Welcome today to get started on AIE. Um, so right here, uh, there's some steps for getting started. I went over this around 10 minutes ago. Um, but basically our workshop that we're going to take today is driven by a website called Graph Academy. And if you go to that first QR code there to the left, uh, that'll take you there. You have to enroll with your email. Um, and then if you go down to set up your environment, uh, there's a code spaces there with everything set up and you can get that rolling now. It'll take maybe about five minutes or so. Um, and you can grab your credentials then as well. There's um an anthropic API key. Uh if you have your own cloud code key um or...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kRkcNOsRyYg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://graphacademy.neo4j.com/courses/workshop-lakehouse>
