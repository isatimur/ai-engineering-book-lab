---
video_id: "ksgLoPxEQzM"
playlist_index: 556
title: "Build enterprise generative AI apps using Llama 3 at 1,000 tokens/s on the SambaNova AI platform"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ksgLoPxEQzM"
duration: "54:34"
duration_seconds: 3274
view_count: 3742
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/ksgLoPxEQzM.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:23:43+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "SambaNova's director of solutions engineering and a principal AI engineer run a workshop arguing that enterprises can get the breadth of a large closed model and the control of small open ones through a composition of experts: many fine-tuned models behind one secure endpoint, with a router, scheduled fine-tuning and model-level access control. Their own SN40L chip, with a three-tier memory of on-chip SRAM, HBM and up to 6 TB of DDR, holds up to 5 trillion parameters and swaps models fast, which they credit for Llama 3 8B at about 1,000 tokens per second. Hands-on parts call the endpoint through LangChain and build a RAG Q&A app over a PDF."
---
# Build enterprise generative AI apps using Llama 3 at 1,000 tokens/s on the SambaNova AI platform

## Summary
A SambaNova workshop in two halves. The director of solutions engineering explains the platform and its chip. A principal AI engineer then leads two hands-on exercises. Their thesis: enterprises should not have to choose between one large closed model and a sprawl of small fine-tuned ones. A composition of experts on hardware built to hold many models gives both.

**The company**
SambaNova, founded in 2017 out of Stanford with two Stanford professors among its co-founders, builds the full stack: its own chip, the system and the software. It is on its fourth-generation chip and has raised over a billion dollars. Customers are enterprises and governments, including sovereign AI projects.

**Monolithic versus small expert models**
Large closed models are broad and easy to integrate. But enterprises have proprietary data kept off the internet, they worry about privacy and owning the model, and per-token costs climb with use. Small open models such as Llama 3 8B can be fine-tuned for accuracy and owned outright. But many micro-models are hard to manage, and fine-tuning each one costs money.

**Composition of experts**
Their answer has four parts:
- All expert models (legal, HR, coding) sit behind one secure endpoint.
- A router sends each prompt to the best-suited expert; direct calls and model chaining for agentic flows are also supported.
- Fine-tuning runs on a schedule per expert, for example finance yearly and code quarterly.
- Model-level role-based access control decides which apps, people or groups can use which models.

The pre-composed version holds 92 experts on seven foundation architectures, including Llama 2, Llama 3, Falcon and Bloom, plus multimodal models. Twelve were built or co-built by SambaNova, covering Thai, Japanese and Hungarian, text-to-SQL, and a contribution to a large multilingual chat model. On their own enterprise benchmark (information extraction, text-to-SQL, coding, function calling) they say they meet or beat GPT-3.5 Turbo and GPT-4.

**The chip**
The SN40L is a reconfigurable dataflow unit (RDU) with three memory tiers: on-chip SRAM, 512 GB of high-bandwidth memory and up to 6 TB of DDR. It stores up to 5 trillion parameters and moves models up the tiers when they run. On GPUs, hosting 500 models means spreading them across many systems; here it is one system.

**Speed demo**
The web demo showed Llama 3 8B at about 1,000 tokens per second with a 0.09 second time to first token, next to a visibly slower ChatGPT. Third-party benchmarks from Artificial Analysis are cited. A real-time mode updates the answer as you type the prompt.

**Hands-on**
Exercise one calls the endpoint through a LangChain wrapper. A practical lesson: raw open-model calls ramble unless you add Llama 3's special prompt tags from the model card, or use a prompt template in a chain. Exercise two builds a RAG Q&A app (notebook and Streamlit) over their SN40L paper: a PDF loader, recursive splitting with chunk size 1,200 and overlap 240 (89 chunks from 15 pages), E5-large-v2 embeddings on CPU or their chip (four seconds), a Chroma store, and top-3 retrieval. It pulled a figure from a table correctly. For complex tables they recommend switching to an unstructured loader.

## Why it matters
- Lays out a concrete enterprise pattern for many fine-tuned models: one endpoint, a router, per-expert retraining schedules and model-level access control.
- Shows a hardware argument for multi-model serving: a large DDR tier lets one system hold many models, where GPUs would spread them across systems.
- The missing-prompt-tags lesson is a common, practical pitfall when moving from closed APIs to open models.
- The RAG exercise gives reproducible baseline settings (chunk size 1,200, overlap 240, top-3) and a clear loader trade-off for PDFs with tables.

## Metadata
- Video: https://www.youtube.com/watch?v=ksgLoPxEQzM
- Duration: 54:34
- Playlist index: 556
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] all right well hi everyone thanks so much for joining us today um so today I get the great opportunity of introducing Sova and some of our capabilities around reaching over a th000 tokens per second using llama 3 today I'm going to spend a little bit of time getting you oriented around Sova some of the capabilities that we provide as an AI platform and also some of the underlying technologies that are providing the means of achieving some of the accomplishments like a th000 tokens per second before I start jumping into the content I want to take the opportunity to introduce some of my colleagues really quick so joining me today I have Petro Milan who is a principal AI engineer he's...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ksgLoPxEQzM.txt]]
- Description cue: In this workshop, you will learn how to build LLM-based apps, such as a question-answering system with RAG, in LangChain using Llama-3 at 1,000 tokens per second on the SambaNova AI Platform....

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/sambanova/ai-starter-kit>
