---
video_id: XovaGv4f39A
playlist_index: 787
title: "When All Context Matters: Extended Cache Augmented Generation - Luis Romero-Sevilla, Orbis"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=XovaGv4f39A"
duration: "5:52"
duration_seconds: 352
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/XovaGv4f39A.txt"
themes:
  - "Evals & Reliability"
  - "RAG & Retrieval"
  - "Models & Inference"
ingested_at: 2026-06-28T23:47:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Luis Romero-Sevilla, VP of AI at Orbis, walks through a retrieval problem where every document in a fast-changing collection matters to the answer. Simple RAG drops relevant documents at the similarity threshold, and GraphRAG costs too much to rebuild each time the data is replaced. His answer is an extended form of cache augmented generation (CAG): split the documents into several cached context buckets that load in parallel, and let a smarter supervisor model interrogate each bucket, ask follow-ups, and synthesize the answer. Documents go into buckets in no particular order, because a supervisor told about domains tends to skip ones that look irrelevant."
---

# When All Context Matters: Extended Cache Augmented Generation - Luis Romero-Sevilla, Orbis

## Summary
Luis Romero-Sevilla is VP of AI at Orbis and says he is "on a mission to solve knowledge representation when all context matters." This is a six-minute lightning talk. It builds one retrieval design step by step, and each step answers the failure of the one before it.

**The scenario**
A large collection of documents, each one an event. All documents are relevant to the user's questions. The whole collection also goes stale fast and gets replaced with new information. Those two constraints together break the usual tools.

**Step 1: simple RAG**
Embed the documents, store the vectors, embed the question, and retrieve what passes a similarity threshold. Inserting into a vector database is fast, so replacing a stale collection is cheap. But when every document matters, a top-k cut leaves relevant material out, and you cannot pass the whole collection to the LLM through this path.

**Step 2: GraphRAG**
Global questions imply relationships across documents, which suggests a knowledge graph. GraphRAG uses an LLM to read every document, extract entities and relationships, build the graph, and navigate it at question time. He calls it an excellent fit when the collection changes rarely. Here the data is replaced often, and rebuilding the graph each time is computationally expensive and slow.

**Step 3: cache augmented generation**
His pivot: GraphRAG already passes every document through an LLM, so why not put all documents in context? CAG loads the documents into a large-context model and caches that context by storing the KV cache. The limit is the context window itself, and answer quality degrades when you fill it too much.

**Step 4: extended CAG**
Run several CAGs in parallel, each holding one bucket of documents. Each cache answers questions about its own content. A smarter supervisor model interrogates the buckets, builds its understanding progressively, asks a specific bucket follow-up questions when it finds something interesting, and synthesizes the final answer.

**How to fill the buckets**
Sorting documents by domain and telling the supervisor the categories sounds sensible. In practice, with dense cross-document relationships, the supervisor ignores domains that look irrelevant at first glance. So documents go in no particular order. The only rule is to balance the buckets so the fewest are needed.

**Claimed trade-offs**
Because all caches load in parallel, he says knowledge building is significantly faster than GraphRAG and more accurate than simple RAG. He admits KV cache can be expensive and says you reduce the cost by tuning how long each cache lives. He closes with no one-size-fits-all claim: every retrieval strategy trades compute, cost and speed. The talk gives no benchmark numbers.

## Why it matters
- A clean decision ladder for retrieval: it names the exact condition (all documents relevant, collection replaced often) under which RAG and GraphRAG each fail.
- The supervisor-over-cached-buckets pattern is a concrete alternative to chunk retrieval: it shards long context across parallel KV caches instead of retrieving pieces of it.
- The finding that domain labels make the supervisor skip buckets is a useful warning about giving an orchestrator model a taxonomy it can use to prune too early.
- It treats cache lifetime as the cost lever for KV caching, which links retrieval design to inference cost.
- The claims are qualitative only, so a chapter should cite it as a design pattern, not as measured evidence.

## Metadata
- Video: https://www.youtube.com/watch?v=XovaGv4f39A
- Duration: 5:52
- Playlist index: 787
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[RAG & Retrieval]]
- [[Models & Inference]]


## Transcript excerpt
> [music] >> Hi, I'm Luis Romero Sevilla and I'm the VP of AI at the Orbifold operation. I'm on a mission to solve knowledge representation when all context matters. So, let's start with a very specific example. Let's say we have a large number of documents and all documents represent an event and all documents in the collection are relevant to answer a set of questions that the user has. Not only that, there's one more challenge. The document in the collection becomes obsolete very fast and all documents get replaced with new information. Let's start with a simple approach. We could start with a simple rag. For that, we just need a vector database and an embedding model. An embedding model...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/XovaGv4f39A.txt]]

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Models & Inference**.
