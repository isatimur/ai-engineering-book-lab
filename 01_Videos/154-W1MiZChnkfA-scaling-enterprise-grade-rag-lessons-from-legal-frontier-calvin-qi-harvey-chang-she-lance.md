---
video_id: "W1MiZChnkfA"
playlist_index: 154
title: "Scaling Enterprise-Grade RAG: Lessons from Legal Frontier - Calvin Qi (Harvey), Chang She (Lance)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=W1MiZChnkfA"
duration: "16:40"
duration_seconds: 1000
view_count: 5648
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/W1MiZChnkfA.txt"
themes:
  - "Security & Guardrails"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:41:32+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Harvey's Calvin Qi and LanceDB's Chang She describe legal RAG at three data scales (on-demand uploads, project vaults, tens-of-millions-doc corpuses), a tiered eval strategy from expert review to automated precision/recall, and LanceDB's Lance format for multimodal AI data lakehouses."
---
# Scaling Enterprise-Grade RAG: Lessons from Legal Frontier - Calvin Qi (Harvey), Chang She (Lance)

## Summary
Calvin Qi, who leads a RAG team at legal-AI company Harvey, breaks down retrieval at three scales — on-demand assistant uploads (1-50 docs), project "vaults" (data rooms for a deal or litigation), and country-scale "data corpuses" of legislation and case law running to tens of millions of documents — and walks through a real query ("applicable regime for covered bonds issued before 9 July 2022 under directive EU 2019/2062 and article 129 of the CRR") to show how legal queries mix semantic search, date filters, keyword regulation IDs, and multi-part references. He argues most of Harvey's engineering effort goes into eval-driven development rather than fancy retrieval algorithms, using a spectrum from expensive expert review, to expert-labeled criteria sets, down to fast automated metrics like precision/recall and folder/section correctness. Chang She, pandas co-author and LanceDB CEO, then presents LanceDB as an "AI-native multimodal lakehouse" built on the open-source Lance format (Parquet+Iceberg+secondary-indices for AI data), citing a GPU-indexing benchmark of roughly 3-4 billion vectors in a single table indexed in under 2-3 hours, and interoperability with Spark, Ray, PyTorch, pandas, and Polars via Apache Arrow.

## Why it matters
- Gives a concrete, non-toy example of what "enterprise RAG" query complexity actually looks like in a regulated domain (multi-part legal citations mixing semantic, keyword, and date-filter requirements), useful evidence against simplistic RAG demos.
- Qi's tiered eval framework (expert review vs. labeled criteria vs. automated precision/recall) is a directly reusable model for how much a team should invest in evaluation infrastructure at different stages.
- She's Lance format and lakehouse pitch is a concrete data-infrastructure counterpoint to treating a vector database as a standalone component, relevant to any chapter on RAG infrastructure at scale.

## Metadata
- Video: https://www.youtube.com/watch?v=W1MiZChnkfA
- Duration: 16:40
- Playlist index: 154
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] All right. Uh, thank you everyone. We're excited for to be here and thank you for uh, coming to our talk. Uh, my name is Chong. I'm the CEO and co-founder of LANCB. I've been making data tools for machine learning and data science for about 20 years. I was one of the co-authors of pandas library and I'm working on LANCB today for all of that data that doesn't fit neatly into those pandas data frames. And I'm Calvin. I lead one of the teams at Harvey Aai working on rag um tough rag problems across massive data sets of complex legal docs and complex use cases. So yeah, our talk is about Oh, one sec. Maybe we should have used the other clicker. Yeah. Yeah. All right, that's okay. We...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/W1MiZChnkfA.txt]]
- Description cue: In domains like law, compliance, and tax, building enterprise-grade RAG means very large scale, spikey workloads, a focus on accuracy, and non-negotiable privacy. In this talk, we'll share...

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
- Could support a chapter/section on **Org Design & Leadership**.
