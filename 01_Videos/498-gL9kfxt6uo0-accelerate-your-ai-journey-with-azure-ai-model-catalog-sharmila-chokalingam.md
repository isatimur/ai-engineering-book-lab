---
video_id: "gL9kfxt6uo0"
playlist_index: 498
title: "Accelerate your AI journey with Azure AI model catalog: Sharmila Chokalingam"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=gL9kfxt6uo0"
duration: "23:14"
duration_seconds: 1394
view_count: 208
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/gL9kfxt6uo0.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:20:49+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sharmila Chokalingam, Azure AI product marketing manager, and an Azure AI product manager argue that model choice matters because real apps mix models: prototype across the 1,600-plus models in the Azure AI model catalog, optimize with prompting, RAG and fine-tuning, then operationalize. They demo deploying Cohere Command R as a serverless API in under a minute, grounding a chat playground on an index, Mistral Large function calling, and a prompt flow RAG app with a query-rephrasing step. A standard inference API lets teams swap models, and customers EY, a logistics firm and Bridgestone each run several models."
---
# Accelerate your AI journey with Azure AI model catalog: Sharmila Chokalingam

## Summary
Sharmila Chokalingam, a product marketing manager on Azure AI, interviews an Azure AI product manager whose name the captions garble. This 23-minute vendor session tours the Azure AI model catalog. The thesis: models ship every week, no single one fits every use case, and teams increasingly mix several. A platform should make choosing, swapping and governing models cheap.

**Three questions, three stages**
Can AI solve my use case? What is the best model for it? How do I scale it? These map to prototyping (try models, compare benchmarks, shortlist), optimizing (cost, latency, regional needs, using prompt engineering, RAG and fine-tuning) and operationalizing (monitoring, scale, data privacy, content filtering).

**What is in the catalog**
More than 1,600 models: OpenAI models including GPT-4 and GPT-4o (function calling and JSON for agent workflows), Mistral, Llama and Cohere models, small language models, embedding and image models, region- and language-specific models such as an Arabic LLM and a multilingual Cohere embedding model, and hundreds of open Hugging Face models. Partners include Meta, Databricks, Snowflake and NVIDIA.

**Demos**
- Deploy Cohere Command R: filter the catalog, read the model card with LangChain and LiteLLM starter code, subscribe through Azure Marketplace (used only for billing), toggle the content filter, and get a URL and key in under a minute.
- Model benchmarks compare accuracy, coherence and groundedness.
- Chat playground: Mistral Large gives a generic answer about Microsoft's giving culture. With an internal index added, it answers specifically: a $50 new-hire giving credit.
- Function calling: a stationery-shop bot defines a `get_bill_amount` tool. Mistral Large calls it for 10 staplers and returns $45 including discounts. Because of the system prompt, it also adds an environmental reminder.
- Prompt flow RAG shopping assistant with a rephrase step. A terse question ("do you have any new hiking shoes") is expanded before lookup, because more verbose queries gave better RAG results. Variants swap the generation model or the embedding model, and evaluation runs compare Command R, Llama 3 and Mistral Large on the same flow.

**Two deployment modes and one API**
Managed compute: you bring GPU quota, pay per VM hour, and can run hundreds of open models. Serverless API: about 30-plus flagship models, billed per input and output token. Microsoft worked with providers on a standard REST schema and SDK, so every endpoint has the same structure and works with LangChain or provider SDKs. Swapping a model means changing the endpoint.

**Enterprise controls**
Prompts and completions are not shared with model providers or used for training. Models labeled as curated by Azure AI are scanned for embedded malware, backdoors, known vulnerabilities and tampering. Private networking routes traffic through VNets, FQDN rules approve outbound access, and Azure Policy allow and deny lists control which model collections are open in dev, test and production.

**Customer stories**
EY moved from Azure OpenAI toward Llama for task-specific summarization and documentation. Its internal chat tool reached 275,000 employees, and EY's lesson is that evaluation must be continuous. A global sea, land and air logistics company replaced traditional robotic process automation with a Mistral-based chatbot for customer-care agents, cutting response latency and raising satisfaction. Bridgestone uses a time-series forecasting model from the catalog for monthly product demand and cut forecasting errors by nearly 30% on average.

## Why it matters
- It frames model selection as a lifecycle (prototype, optimize, operationalize), not a one-time pick, which is useful for chapters on model strategy.
- The standardized inference API across providers is the enabling piece for multi-model apps and for evaluating models side by side.
- The query-rephrasing step in RAG (expand terse user questions before retrieval) is a small, reusable technique with a stated reason.
- The managed-compute versus serverless-API split is a clear statement of the hosting choice between per-hour GPU and per-token pricing.
- The customer cases (EY at 275,000 users, a nearly 30% forecasting-error cut at Bridgestone) are vendor-reported, but they show multi-model use in production.

## Metadata
- Video: https://www.youtube.com/watch?v=gL9kfxt6uo0
- Duration: 23:14
- Playlist index: 498
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hi everyone thank you for joining us for the session on how you can accelerate your AI Journey with the aurei model catalog this is shuie I'm one of the product managers on aurei and I'm sharmi I'm one of the product marketing managers on Azure AI great so let's get started so today we'll be talking about how we offer the best collection of foundation models on Azure why the model Choice matters so much when you have such a huge collection of models and how does the Azure AI model inference API make it standard and easy for you to switch between multiple models swpe one out for another without disturbing your rest of the code base and then how you can build generative AI apps on top...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/gL9kfxt6uo0.txt]]
- Description cue: Learn how the Azure AI model catalog helps you discover and operationalize flagship LLMs and SLMs on Azure and unlocks access to a wide collection of models with enterprise data privacy, content...

## Book angles
- Could support a chapter/section on **Models & Inference**.
