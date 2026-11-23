---
video_id: "2CXn-CByNoo"
playlist_index: 387
title: "The RAG Stack We Landed On After 37 Fails - Jonathan Fernandes"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=2CXn-CByNoo"
duration: "18:52"
duration_seconds: 1132
view_count: 10732
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/2CXn-CByNoo.txt"
themes:
  - "RAG & Retrieval"
  - "Models & Inference"
ingested_at: "2026-04-24T12:16:16+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jonathan Fernandes, an independent AI engineer who builds RAG for financial institutions, lays out the stack he settled on, split into a Google Colab prototype and an on-premise Docker Compose production setup: LlamaIndex for orchestration, open embeddings in production, a scalable vector database, closed or open LLMs served locally, tracing with Phoenix, a reranker, and an LLM-based RAG eval framework. On a 32-document railway help knowledge base, the question 'where can I get help in London' gets a poor naive answer, a still-weak answer after swapping embeddings and GPT-4, and a correct one only after adding a cross-encoder reranker post-retrieval."
---
# The RAG Stack We Landed On After 37 Fails - Jonathan Fernandes

## Summary
Jonathan Fernandes is an independent AI engineer who helps companies, often financial institutions, ship production generative AI. He aims for "the most ROI rag guide per minute." The title promises 37 fails, but the talk presents the resulting stack and one worked example, not a list of failures.

**The stack, prototype versus production**
He prototypes in Google Colab for the free hardware accelerator, and ships in Docker because clients often need data and processing on premise.
- Orchestration: LlamaIndex or LangGraph to prototype, LlamaIndex in production.
- Embeddings: closed API models to prototype; open models from Nvidia or a BGE model in production.
- Vector database: the one captioned as "quadrant", chosen because it scales from a couple of documents to hundreds of thousands.
- LLMs: closed APIs for simplicity, or open models such as Llama 3.2 or a 4B model from Alibaba Cloud, served by Ollama or Hugging Face Text Generation Inference.
- Monitoring and tracing: LangSmith or Phoenix to prototype, Phoenix in a Docker container in production, to see where time goes.
- Reranking: a closed Cohere reranker to prototype, an open Nvidia reranker in production.
- Evaluation: an LLM-based RAG evaluation framework (captioned as "raggas").

**The worked example**
The knowledge base is 32 HTML help pages for a London railway operator, including near-duplicate pages on wheelchair-friendly taxis in London and in Paris. The test question: "where can I get help in London? I'm at the station."
1. Naive RAG in a few lines of LlamaIndex (simple directory reader, in-memory vector store) answers with advice about black cabs having ramps. Not satisfactory.
2. Swapping in the scalable vector database, the open BGE small embedding model from Hugging Face (replacing the default OpenAI ada-002), and GPT-4 at temperature zero (replacing GPT-3.5 Turbo at 0.1) changes the answer to arriving 75 minutes before departure. Still not helpful. Source nodes show which two HTML files it used.
3. Retrieving five results and reranking to the top two with a cross-encoder gives the best answer: at the London international station, go to booth number five next to the Eurostar ticket gates.

**Why rerankers go after retrieval**
A cross-encoder sends query and document together through a BERT model and a classifier to get a 0 to 1 relevance score. It is accurate but slow and does not scale with long documents. A bi-encoder embeds query and document separately and compares them with cosine similarity, which is fast and scalable. So the bi-encoder belongs at the vector database, and the cross-encoder, also called a reranker, belongs post-retrieval on a few documents. He also adds a query-processing step before retrieval, for example to strip personally identifiable information.

**Production layout**
A Docker Compose file runs containers for data ingestion from the knowledge base, the vector database pulled from Docker Hub, a front end, Ollama or TGI for models, Phoenix for tracing, and the eval framework. He stresses that one question is not a test: use an eval framework over many queries.

## Why it matters
- A compact reference stack with explicit prototype and on-premise production choices for each RAG layer, useful for regulated environments.
- The three-step London example shows that a better LLM and embeddings did not fix the answer, while a reranker did, which makes the case for post-retrieval reranking concrete.
- The cross-encoder versus bi-encoder explanation gives a clear reason for where each sits in the pipeline.
- The near-duplicate London and Paris pages are a good small illustration of how naive semantic search retrieves plausible but wrong context.

## Metadata
- Video: https://www.youtube.com/watch?v=2CXn-CByNoo
- Duration: 18:52
- Playlist index: 387
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Models & Inference]]

## Transcript excerpt
> So this is the rag stack we landed on after 37 fails. Hi, I'm Jonathan Fernandez and I've been working with language models way before chat GBT appeared on the scene. So I work as an independent AI engineer and I help companies build and ship production ready generative AI solutions. Now if you are new to rag I'll give you a bit of an introduction but this is my objective is for this to be the most ROI rag guide per minute on the internet. Now if you're pretty familiar with rag uh then I want to give you the details straight away right and this is these are the headlines for the 37 fails and the learnings from those 37 fails. So uh I've broken them down into the components that uh I would...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/2CXn-CByNoo.txt]]
- Description cue: Retrieval returning irrelevant results? Can't deploy solutions in the cloud? If these questions keep you up at night, you're likely experiencing the common frustrations of building an effective...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Models & Inference**.
