---
video_id: "z_Xh2MzqKDM"
playlist_index: 491
title: "[Full Workshop] Llama 3 at 1,000 tok/s on the SambaNova AI Platform"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=z_Xh2MzqKDM"
duration: "1:00:58"
duration_seconds: 3658
view_count: 818
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/z_Xh2MzqKDM.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:20:32+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "SambaNova's director of solutions engineering and a principal AI engineer pitch a full-stack platform built on their own SN40L reconfigurable dataflow unit, whose three-tier memory (on-chip SRAM, HBM, up to 6 TB of DDR) holds up to five trillion parameters and lets one system host many models. Their thesis: a composition of experts behind one secure endpoint, with routing, scheduled fine-tuning and model-level access control, joins the ease of big closed models with the cost, privacy and ownership of small open ones. Hands-on, attendees call Llama 3 8B at about 1,000 tokens per second through LangChain and build a RAG Q&A app on Chroma."
---
# [Full Workshop] Llama 3 at 1,000 tok/s on the SambaNova AI Platform

## Summary
SambaNova's director of solutions engineering opens the workshop with a company pitch, and a principal AI engineer then leads two hands-on exercises. Auto-captions garble their names, so this note does not name them. SambaNova was founded in 2017 out of Stanford, has raised over a billion dollars, and builds the whole stack: chip, system and software for pre-training, fine-tuning and fast inference.

**Big closed models versus small open experts**
Large monolithic models are broad and easy to integrate. But enterprises keep their own data apart from the internet, worry about privacy and model ownership, and watch per-token bills climb. Small open models such as Llama 3 8B can be fine-tuned to enterprise needs and owned outright, but many micro-models are hard to manage and costly to fine-tune one by one. SambaNova's answer is a composition of experts (CoE):
- All expert models sit behind one secure endpoint.
- A router sends each prompt to the best-suited expert. Direct calls and model chaining for agentic flows are also supported.
- Each expert gets its own fine-tuning cadence, for example finance once a year when policies change and coding once a quarter.
- Model-level role-based access control decides which apps and groups can reach which experts.

The precomposed version has 92 experts on seven foundation architectures, including Llama 2 and 3, Mistral, Falcon, Bloom and multimodal models. Twelve were built or co-built by SambaNova, among them Thai, Japanese and Hungarian language models and a text-to-SQL model. The company claims its in-house enterprise benchmark meets or beats GPT-3.5 Turbo and GPT-4 on tasks such as information extraction, text-to-SQL, coding and function calling.

**The chip**
The SN40L is a reconfigurable dataflow unit (RDU) with three memory tiers: 4 GB of on-chip SRAM, 512 GB of high-bandwidth memory and up to 6 TB of DDR. Models move up the tiers as they run. Up to five trillion parameters fit on one system, where a GPU setup would spread hundreds of models across many machines. Asked about a rival fast-inference startup, the engineer says it uses 576 chips at reduced precision, while SambaNova uses 16 chips at full precision.

**Demo**
The public chat UI runs Llama 3 8B at about 1,000 tokens per second with a time to first token of 0.09 seconds. A real-time mode updates the answer as the user types the prompt. The speakers cite an independent Artificial Analysis benchmark of throughput across providers.

**Exercise 1: basic call**
Set an API key in a `.env` file, use the LangChain wrapper for the platform, and set sampling, temperature and max tokens. The CoE endpoint selects Llama 3 8B Instruct as the expert. Lesson: open models ramble unless the prompt includes the special tokens from Meta's model card. LCEL chains a prompt template, the LLM and an output parser.

**Exercise 2: enterprise RAG**
Load a PDF (the SN40L arXiv paper), split it with a recursive splitter (chunk size 1200, overlap 240, which gives 89 chunks from 15 pages), embed with E5-large-v2 on CPU or on the RDU (batch size 32 takes about 4 seconds), store in Chroma, retrieve the top 3 chunks, and answer. The app answers a question from a table correctly. For harder tables the engineer advises switching from the PyPDF loader to the unstructured loader. The app comes as a notebook and as a Streamlit UI.

## Why it matters
- The composition-of-experts design (one endpoint, a router, per-expert fine-tuning schedules, model-level access control) is a concrete pattern for serving many specialised models in an enterprise.
- It makes a hardware argument for multi-model serving: a large DDR memory tier lets one system swap many models in and out, where GPUs would need many systems.
- The special-token lesson shows why raw open-model endpoints ramble without the model card's chat template.
- The RAG exercise gives concrete settings (chunk 1200 and overlap 240, top-k 3, E5-large-v2, Chroma) and a loader tip for PDFs heavy with tables.
- It is a vendor workshop, so treat the benchmark and speed claims as the vendor's own figures.

## Metadata
- Video: https://www.youtube.com/watch?v=z_Xh2MzqKDM
- Duration: 1:00:58
- Playlist index: 491
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] all right well hi everyone thanks so much for joining us today um so today I get the great opportunity of introducing Sova and some of our capabilities around reaching over a th000 tokens per second using llama 3 today I'm going to spend a little bit of time getting you oriented around Sova some of the capabilities that we provide as an AI platform and also some of the underlying technologies that are providing the means of achieving some of the accomplishments like a th000 tokens per second before I start jumping into the content I want to take the opportunity to introduce some of my colleagues really quick so joining me today I have Petro Milan who is a principal AI engineer he's...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/z_Xh2MzqKDM.txt]]
- Description cue: In this workshop, you will learn how to build LLM-based apps, such as a question-answering system with RAG, in LangChain using Llama-3 at 1,000 tokens per second on the SambaNova AI Platform....

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/sambanova/ai-starter-kit>
