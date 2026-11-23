---
video_id: "YYcNm2RexnY"
playlist_index: 463
title: "Lessons from building GenAI based applications — Juan Peredo"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YYcNm2RexnY"
duration: "33:13"
duration_seconds: 1993
view_count: 824
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/YYcNm2RexnY.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:19:23+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Juan Peredo, a founder, architect and consultant with over 15 years in IT, distils a year and a half of building GenAI applications. His thesis: a chatbot is easy to build, but adding AI brings a new layer of work (model choice, hosting, hallucination control, evaluation, cost, observability). He walks through prompt engineering, guardrail LLMs, RAG and fine-tuning, argues that prompts must never be hard-coded, and shows that a 3,000-call-per-day agent on OpenAI o1 costs almost $300,000 a month versus about $50,000 on Llama 3.3 70B. Agent traces found a bug that came from a lowercase user name."
---
# Lessons from building GenAI based applications — Juan Peredo

## Summary
Juan Peredo calls himself a founder, architect, consultant and developer with over 15 years in IT. This solo talk collects what he learned in a year and a half of building GenAI applications. His starting point: AI tools help you code faster, but the moment AI faces your user, a new block of work appears next to the usual front end, back end and infrastructure. You must pick a model, decide on fine-tuning, prompt engineering or RAG, stop hallucinations, keep evaluating new models that arrive "every other week", and plan for GPUs.

**Hosting choices**
For local exploration he uses a local model runner that downloads many models to your machine for free, or a plain Hugging Face library. For the cloud, beyond Google Cloud, AWS and Azure, he names a new class of deployment platforms: one where you add decorators to Python code, deploy with its CLI, and it builds and pushes the containers; and SkyPilot, which spreads clusters across clouds to cut cost.

**No single technique guarantees correct answers**
A chatbot takes an hour or two to build; one model told him three times three is 33. He reviews four tools and the cost of each. Prompt engineering needs precise instructions, and the model may still ignore them. A guardrail is a second LLM that classifies questions or answers as safe or bad, at the cost of extra latency and money. RAG is only as good as the data in the vector database: stale data gives stale answers. Fine-tuning is the most expensive, takes longest, and can degrade the model by making it forget or confuse knowledge. Combine them.

**Evaluate at every step, and externalize prompts**
He maps tools to the life cycle: the local runner and Hugging Face Spaces to explore, OpenRouter to compare models (it routes to the cheapest provider; $50 put in six months ago still has about $40 left, with daily use), and an evaluation platform from the LangChain creators to record runs and compare them over time. Prompts belong outside the code, for example in LangChain Hub, so a domain expert who has never coded can tune them and commit changes. This also future-proofs the app when a new model version breaks old prompts.

**Agents: latency and cost**
An agent is an assistant LLM that calls tools (functions) in a loop. Each LLM call takes seconds, so four or five calls take 12 to 15 seconds. Frameworks such as LangChain allow concurrent calls and branching to cut that wait: two two-second steps run in parallel save time. His cost example: a call centre with 3,000 calls a day, 15 tool calls per call, on OpenAI o1 at $15 per million input tokens and $60 per million output tokens, costs almost $300,000 a month. The same load on Llama 3.3 70B costs almost $50,000. Price across models differs over 20 times, and the fastest providers serve Llama 3.1 70B at over 1,000 tokens per second (Cerebras over 2,000) while slow providers serve about 30. An A100 costs four or five dollars an hour against cents for a CPU instance. His line: "small is beautiful".

**Observability**
Agents are probabilistic, so a step that ran 100 times can fail on the next one. A database lookup for user "John" failed because users typed it in lowercase. Traces showed the cause, and adding "ignore case" to the externalized prompt fixed it. His advice: use an existing tracing tool or build your own, "because you are going to need it".

## Why it matters
- The o1 versus Llama 3.3 call-centre calculation (about $300,000 versus $50,000 a month) is a ready worked example for model-selection and cost chapters.
- The four-technique comparison (prompting, guardrail LLM, RAG, fine-tuning), each with its own failure mode, supports the argument that reliability comes from layering, not one fix.
- The lowercase-name trace story is a concrete case for agent observability and for keeping prompts outside the code.
- Prompts in a hub that non-coding domain experts can edit is a practical pattern for team workflows and model upgrades.

## Metadata
- Video: https://www.youtube.com/watch?v=YYcNm2RexnY
- Duration: 33:13
- Playlist index: 463
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> hello and welcome today we're going to talk about the lessons I've learned from building gen application over the last year and a half my name is Juan pero and I'll be your guide in this journey I'm a Founder architect consultant developer and everything in between uh and I have over 15 years experience uh in the IT industry and one of the first things uh everyone hears when they're talking about AI is about how much faster developers can code thanks to AI you can hear this and you've heard this before I can guarantee that nowadays you can just take a prompt put it into an llm and you will and the llm will code your website for you in about a minute or so and we all know that that's not...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YYcNm2RexnY.txt]]
- Description cue: Integrate GenAI into your applications to deliver value without hidden complexities or budget surprises. Join us for a fast-paced session packed with hard-won insights.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
