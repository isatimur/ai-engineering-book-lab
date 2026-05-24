---
video_id: OV56RddyFuU
playlist_index: 678
title: "Self-Training Agents: Hermes Agent, HF Traces, Skills, MCP & Finetuning  — Merve Noyan, Hugging Face"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OV56RddyFuU"
duration: "19:11"
duration_seconds: 1151
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/OV56RddyFuU.txt"
themes:
  - "Agent Architecture"
  - "Models & Inference"
ingested_at: 2026-05-19T11:04:01+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Merve Noyan from Hugging Face's open-source team surveys the full open agentic stack available through HF Hub: local coding agents (pie, llama-agent), inference routing across Groq/Cerebras/Novita, an MCP server exposing models and Spaces, a new Traces dataset type for storing agent sessions, and HF Skills — prompt-driven extensions that trigger fine-tuning on Hub infrastructure. Her central claim: the open-source gap with closed models has closed (GLM 5.1 leads SWE-Bench Pro). The flagship demo: asking Claude Code to fine-tune Qwen-2-VL on a vision-language dataset; the agent calculates VRAM, selects an instance, launches the job, and stores the checkpoint on Hub. A second example used agent-coordinated jobs to OCR 30,000 Hub research papers. Noyan, who has trained models for six years, calls these Skills 'absolute sci-fi.'"
---

# Self-Training Agents: Hermes Agent, HF Traces, Skills, MCP & Finetuning — Merve Noyan, Hugging Face

## Summary

Merve Noyan, from Hugging Face's open-source team, surveys the current state of the open agentic ecosystem — specifically the tools, models, and infrastructure Hugging Face Hub provides to run agents without relying on closed-source providers.

### The open-source model gap has closed

Noyan opens by addressing the lingering assumption that open-source models are worse than closed ones. She points to the Stanford AI Index, where open models (shown in green) have caught up with closed models (shown in black) on benchmark performance. As of the talk, GLM 5.1 leads SWE-Bench Pro — the benchmark for coding agents. Her framing: the case for open models is now performance parity, privacy (weights deployed locally, no data leaving your environment), and resilience to provider degradation (referencing a recent incident where a closed model's performance dropped without any public announcement).

### The agentic Hub: what's new

Hub hosts close to 3 million models, along with datasets, Spaces, and now infrastructure purpose-built for agents:

- **Benchmark datasets**: a new filter in Hub datasets showing popular benchmarks (SWE-Bench Pro, Humanity's Last Exam, AIME, etc.) with open models ranked by score, making model selection for agentic tasks more navigable
- **Inference providers**: a routing layer that selects the best provider (Groq, Cerebras, Novita, others) for a given model, with a "tool use" column specifically for agentic model selection
- **Local agent support**: pie, llama.cpp, LM Studio, llama-agent (a binary built into llama.cpp) — all integrating directly with Hub model IDs. Hardware compatibility guidance is available per model (e.g. Gemma 4's larger model fits on a 24GB L4 GPU at 4-bit quantization)
- **MCP server**: Hub's MCP server exposes models, datasets, Spaces, and Jobs to any LLM — including the ability to query Spaces, which Noyan describes as the "App Store of AI"

### Hermes Agent and the memory management advantage

Noyan's personal favorite in the ecosystem: Hermes Agent, which she positions as a step beyond local coding agents (like OpenClaw) in terms of memory management and multi-channel integration. Setup wizard handles configuration; it integrates into Slack, WhatsApp, or other messaging platforms. She demonstrated this by failing to integrate it into Slack herself, then asking GLM 5.1 via Hermes Agent to fix the integration — which it did autonomously.

### HF Traces: capturing agent sessions as training data

Hub now supports a Traces dataset type: agent sessions from Claude Code, OpenClaw, pie, or any other tool can be uploaded and stored as structured traces. The Hub dataset viewer renders them in a navigable UI, showing the full sequence of steps. Critically, these traces can then be used to fine-tune models — closing the loop from "agent produces trace" to "trace improves the next agent."

### Skills: agents that can train other models

The most unusual capability Noyan demonstrates: **HF Skills** — prompt-driven extensions that let agents invoke Hugging Face infrastructure to train, serve, and evaluate models. The LLM Trainer skill allows an agent to:
1. Receive a natural-language instruction ("train Qwen-2-VL on this vision-language dataset")
2. Calculate the VRAM requirements for the target model at the target batch size
3. Select an appropriate GPU instance
4. Launch the job on HF infrastructure
5. Store the resulting model checkpoint on Hub

Noyan calls it "absolute sci-fi" and says as someone who has been training models for six years, she still finds it disorienting that this works.

A second live example: Noyan's colleague OCR'd 30,000 research papers on Hub using an agent-coordinated pipeline — picking an OCR model from the benchmark dataset, writing the processing script via an LLM, launching batch jobs via HF Jobs, and storing results in HF Buckets (a cheaper, faster alternative to S3 with native Hub mounting). The entire pipeline was orchestrated through prompting and skills, with no manual infrastructure provisioning.

## Metadata
- Video: https://www.youtube.com/watch?v=OV56RddyFuU
- Duration: 19:11
- Playlist index: 678
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone and welcome to this talk in open agent ecosystem and I would like to call it having an AI engineer at your fingertips. I'm Marwa and I work in the open source team of hugging face. How many of you are hugging using hugging face on daily basis? Oh, let's change that. This is not okay. But first let's talk a bit about open source and what it is. So when it comes to machine learning open source is absolutely differential. Basically you have the open weights models that go in with non-commercial licenses. We call them open weights and then we have open source models that have commercially available licenses such as this one from deep seek. It's called MIT license or Apache 2.0...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OV56RddyFuU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
