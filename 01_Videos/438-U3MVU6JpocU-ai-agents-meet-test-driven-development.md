---
video_id: "U3MVU6JpocU"
playlist_index: 438
title: "AI Agents, Meet Test Driven Development"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=U3MVU6JpocU"
duration: "29:10"
duration_seconds: 1750
view_count: 13293
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/U3MVU6JpocU.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:18:24+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anita, who leads generative AI growth and education at Vellum, argues that the teams that ship reliable agentic workflows take a test-driven approach: experiment with prompts and models alongside domain experts, evaluate against hundreds of ground-truth examples or LLM judges, deploy with logging, fallbacks and versioning, then feed production edge cases back into evals. She proposes five levels of agentic behavior, from L0 (one LLM call plus retrieval) to L4 (an agent that invents its own tools), places most production systems at L1 and expects L2 planning agents to dominate innovation this year. She demos an SEO agent with a writer and an LLM-judge editor loop."
---
# AI Agents, Meet Test Driven Development

## Summary
Anita leads generative AI growth and education at Vellum, which has worked with hundreds of companies that deployed AI in production. Her thesis: the companies that adopted a test-driven development approach built more reliable systems. Model gains have slowed since the GPT-3.5 to GPT-4 jump, and reasoning models and new benchmarks help, but production success "isn't just about the models anymore it's about how you build around it".

**Why the build-around matters**
She cites Cursor reaching $100 million ARR in 12 months as proof that AI wrappers can be defensible. The reason is the techniques that grew alongside the models: chain of thought, RAG, memory, long context, graph RAG, reasoning models and agentic RAG.

**The test-driven loop: experiment, evaluate, deploy, improve**
- *Experiment*: try few-shot, chain of thought, prompt chaining and ReAct-style workflows. Bring in domain experts, because "Engineers shouldn't be the ones who are tweaking prompts". Stay model agnostic; she names Gemini 2.0 Flash as strong at OCR.
- *Evaluate*: build a dataset of hundreds of examples and trade off quality, cost, latency and privacy. Set priorities early. Prefer ground-truth data designed by subject matter experts; synthetic benchmarks do not cover your use case, and an LLM can judge another model's output when ground truth is missing. Use a flexible framework with custom metrics in Python or TypeScript, and add guard rails that check internal nodes at every step.
- *Deploy*: log every LLM call with inputs, outputs and latency. Add retries and fallback logic; she cites an OpenAI outage of four hours two months earlier. Use version control and staging so a prompt change does not regress another part of the workflow. Decouple AI deployments from the app release schedule.
- *Improve*: capture production responses and edge cases, rerun evals on new prompts, add a caching layer for repeat queries, and later fine-tune a custom model on the collected data.
For agents, evaluation must also check behavior: whether the agent makes the right decisions and follows the intended logic.

**Five levels of agentic behavior**
She does not define an agent; she rates control, reasoning and autonomy instead.
- *L0*: an LLM call, retrieval and inline evals; reasoning lives inside the prompt.
- *L1*: the model decides when to call tools; memory and per-step evals matter. Most production systems sit here, including Vellum customers such as Headspace.
- *L2*: structured reasoning; the workflow plans, executes, evaluates and refines in a loop, but it still terminates. She expects most innovation this year here, with o1, o3 and DeepSeek.
- *L3*: proactive and always on; it monitors email, Slack or Google Drive and acts or asks for input.
- *L4*: an inventor that creates its own agents, prompts and tools. It is out of reach today because of overfitting and inductive bias.

**The SEO agent demo**
Built between L1 and L2: an SEO analyst searches Google and analyzes top articles for a keyword, a researcher fills the gaps, a writer drafts, and an LLM-judge editor gives feedback through a memory component until a condition is met. On the keyword chain of thought prompting, one loop took about 118 seconds; runs with more loops take about 300. She closes by announcing Vellum's open-source workflow SDK, which keeps UI and code in sync.

## Why it matters
- Maps test-driven development onto LLM systems as a four-stage loop, with concrete practices at each stage (expert-built datasets, LLM judges, fallbacks, decoupled AI deploys).
- The L0 to L4 scale is a usable way to place an agent by control, reasoning and autonomy instead of arguing about definitions.
- Claims most production agents sit at L1, tool use plus orchestration, which grounds the 2025 agent hype.
- The writer and editor loop with memory and a break condition is a small, copyable pattern for LLM-as-judge inside a workflow.

## Metadata
- Video: https://www.youtube.com/watch?v=U3MVU6JpocU
- Duration: 29:10
- Playlist index: 438
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> hi everybody my name is Anita and I'm currently leading gen growth and education here at vum and over the last few years we worked with hundreds of companies who have successfully deployed reliable AI Solutions in production from simple to more advanced agentic workflows one thing became very clear those companies who have adopted a test driven development approach were able to build reliable and stronger systems for production today I'm excited to share how you can apply that same approach to build your own effective agentic workflow that actually works but before we jump in let's take a step back and truly understand how we got here in the first place I'm so excited to get started let's...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/U3MVU6JpocU.txt]]
- Description cue: Deploying agentic workflows in production is tough—bugs, hallucinations, and unexpected behavior can quickly turn a promising system into a support nightmare. But there’s a pattern we’ve...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.vellum.ai/blog/agentic-workflows-emerging-architectures-and-design-patterns>
- resource: <https://www.vellum.ai/blog/chain-of-thought-prompting-cot-everything-you-need-to-know>
- resource: <https://www.vellum.ai/blog/the-four-pillars-of-building-a-production-grade-ai-application>
- resource: <https://www.vellum.ai/blog/the-training-of-deepseek-r1-and-ways-to-use-it>
- resource: <https://www.vellum.ai/reasoning-models>
