---
video_id: "a0WvaMRZ9hc"
playlist_index: 499
title: "AI Templates: Gabriela and Aishwarya"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=a0WvaMRZ9hc"
duration: "1:03:20"
duration_seconds: 3800
view_count: 290
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/a0WvaMRZ9hc.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:20:53+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Gabriela, Microsoft's director of AI for startups, and Aishwarya, a Microsoft for Startups AI advisor, pitch Founders Hub credits and open-source AI templates that let startups run complex apps in minutes. Python cloud advocate Pamela Fox then deploys three templates from Codespaces with infrastructure as code: a streaming chat quickstart, RAG on Postgres with hybrid pgvector and full-text search plus LLM-generated SQL filters, and RAG on documents with Azure AI Search. Her strongest claim: vector search alone gives poor results. Use hybrid search with a semantic ranker, add a query-rewriting step, and evaluate."
---
# AI Templates: Gabriela and Aishwarya

## Summary
Three Microsoft speakers run this workshop. Gabriela, director of AI for startups, and Aishwarya ("Ash"), a senior AI advisor with Microsoft for Startups, open with the program. Pamela Fox, a Python cloud advocate who maintains the open-source repos, leads the hands-on part. A large share of the recording is setup and floor help.

**The startup pitch**
Founders Hub is open to founders at any stage, funded or not, and sign-up takes under five minutes. It offers up to $150,000 in Azure credits, including Azure OpenAI, rising to $250,000 through partner VCs. It also includes one-on-one expert calls, early access to private previews, and go-to-market help. The pain point the templates target: startups need fast experiments, but getting a first end-to-end app running from documentation can take weeks. The templates are "not 101 level examples". They are complex, open-source apps you can run in minutes and then customize.

**Workshop mechanics**
Attendees get a 7-day, $50 Azure pass and a proxy to Azure OpenAI that skips the approval form. Fox notes she normally warns against API keys in favor of keyless managed identity. Everything runs in GitHub Codespaces for a consistent environment. She explains that Azure OpenAI uses named deployments of models, not raw model names.

**Template 1: chat quickstart**
An async Python backend (she stresses async frameworks for concurrent LLM calls) streams tokens to the browser as newline-delimited JSON, so users see the first token sooner. She develops locally first, can point the app at local small models, then deploys with one command to Azure Container Apps through Bicep infrastructure as code.

**Template 2: RAG on Postgres**
For existing product tables. Hybrid search combines pgvector with Postgres full-text search. An advanced flow first rewrites the user's question into a better search query, which matters for multi-turn follow-ups such as "more options". It also uses function calling to turn "climbing gear cheaper than $30" into a SQL price filter.

**Template 3: RAG on documents**
The most deployed template, run "like a 100 thousand times". Ingestion cracks PDFs, HTML, DOCX, PPTX, XLSX and images with Azure Document Intelligence, chunks them at about 500 tokens, embeds them, and stores them in Azure AI Search. Answers cite the source page. Demos run on an employee handbook and on Fox's own blog. One gotcha: OCR pulled code out of images in some documentation she indexed and polluted her RAG results.

**Fox's warnings about vectors**
- Vector search "will always get results", even far-off ones, and LLMs are very distractible by noisy context.
- In her own evaluation, text-only search scored 4.87 for groundedness, and adding vectors gave only a tiny gain.
- Naive reciprocal rank fusion of text and vector results can do worse. The best results came from hybrid search plus the semantic ranker.
- Her conclusion: "evaluate and be careful with your vectors".

**In production**
Users run the documents template on government sites, for HR material, for meeting transcripts and for sales training manuals. To keep indexes fresh, use AI Search indexers on blob storage or a triggered Azure Function. A closing tip: stop idle Codespaces, or they cost money.

## Why it matters
- It gives evaluation-backed practitioner advice that hybrid search with reranking beats vector search alone, with a concrete groundedness number.
- Query rewriting before retrieval, including LLM-generated structured filters, is presented as standard RAG practice, not an advanced trick.
- It compares three RAG shapes (plain chat, RAG over structured rows, RAG over unstructured documents) and shows where the complexity comes from: ingestion.
- It offers small production habits worth citing: async backends, streaming newline-delimited JSON, local-first development, and keyless auth over API keys.
- It shows how sample code hardens into production use (government and HR deployments) and what that means for template maintainers.

## Metadata
- Video: https://www.youtube.com/watch?v=a0WvaMRZ9hc
- Duration: 1:03:20
- Playlist index: 499
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] thank you so much for coming my name is Gabriela deero uh I work at Microsoft as you can tell I'm director of AI working on uh with startups and doing events like this Outreach talking to Founders and then I have Ash my colleague hi I'm a senior R adviser with Microsoft startups so pretty much spending my day today talking to Startup helping them build their their AI Tech stack primarily on Azure but like no BMS uh I'm Pamela I'm a python Cloud Advocate just on this and uh I spend most of my time working on open source repositories like the ones we'll be using today and then also doing live streams and conferences and all that sort of fun stuff like here awesome so uh we'll have a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/a0WvaMRZ9hc.txt]]
- Description cue: Building and deploying generative AI solutions can be challenging and time-consuming, especially for startups with limited resources and expertise. In this workshop, you will learn how to use...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://aka.ms/aie-workshop>
