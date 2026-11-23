---
video_id: "fL1iJHtl51Q"
playlist_index: 91
title: "Building Cursor Composer – Lee Robinson, Cursor"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=fL1iJHtl51Q"
duration: "15:36"
duration_seconds: 936
view_count: 24126
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/fL1iJHtl51Q.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:22:32+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Lee Robinson of Cursor explains how Cursor built Composer, its first agent model: a large mixture-of-experts model trained with RL to be both fast and smart, about four times more token-efficient than models of similar intelligence and slightly below the latest frontier. The key idea is to make training match production: same tools, same formats, rollouts in the same cloud-agent VMs. He argues the ML challenges were really infrastructure problems, solved with low-precision custom kernels (3.5x faster MoE layers on Blackwell), load-balanced rollouts and a fleet of hundreds of thousands of VMs. RL taught parallel tool calls and search-before-edit."
---
# Building Cursor Composer – Lee Robinson, Cursor

## Summary
Lee Robinson speaks for Cursor's engineering and research teams about Composer, Cursor's first agent model, released in Cursor 2.0. On Cursor's own benchmarks it beats the best open models, sits slightly below the latest frontier models, and is about four times more efficient at token generation than models of similar intelligence. The aim is a model that is both fast and smart.

**Why Cursor built a model**
Cursor already trains Tab, a low-latency autocomplete model, and wanted the same approach for agents. An early prototype, released under the slug "cheetah," won praise for speed but was "not really smart enough" to be a daily driver. So the team built an internal benchmark based on its own repos and set a bar: a checkpoint Cursor's developers would use every day. Parallel tool calls and effective use of semantic search pushed it over that bar.

**The RL setup**
The agent has about ten tools; he focuses on five: read file, edit file, codebase search, lints, and shell commands. The goal is to mirror the Cursor production environment as closely as possible. From one starting point the system runs many rollouts with different tool sequences, scores them, and updates the weights. Three challenges arise at scale:
- Matching training and inference for a large mixture-of-experts model spread across thousands of GPUs.
- Complex rollouts that use hundreds of thousands to millions of tokens and hundreds of tool calls, each finishing at a different time.
- Consistency: identical tool formats and responses to production, despite bursty training compute.

"All of the solutions coincidentally are actually infrastructure problems."

**Infrastructure answers**
Three server types: a PyTorch trainer, an inference server for rollouts on Ray, and environment servers that simulate Cursor. Custom kernels allow very low-precision training, giving about a 3.5x speedup for the MoE layer on Nvidia Blackwell chips and easier shipping to inference. Load balancing across threads and processes stops idle time when one rollout installs packages or makes many tool calls. The cloud agents product, which runs Cursor agents in sandboxed VMs from phone, web or Slack, turned out to be "the perfect infra for RL"; Cursor orchestrates hundreds of thousands of VMs across clusters.

**Why match production**
Real tools can be trained in. Cursor trained its own embedding model for semantic search; it helped every model in the Cursor harness but helped Composer most, because the model trained in the same environment "becomes a power user of this tool."

**What RL changed**
Performance started near the best open model and kept rising with compute. The model learned to read ten files in parallel instead of one at a time, and to search and read more before editing, after early versions made unnecessary edits.

**Airplane Wi-Fi and the semi-async valley**
Agents that take 10 to 20 minutes feel like airplane Wi-Fi: working, but slow enough to frustrate. Developers want either very fast or very smart long-running models. Composer brings back synchronous, in-the-loop coding. His own workflow: plan with a frontier model, then build the plan with Composer.

**Reflections**
RL works "surprisingly well" for narrow models with good data and enough compute; Cursor is "not trying to build AGI." Using Cursor speeds up Cursor's own research. And ML training and infrastructure are more linked than people think.

## Why it matters
- A concrete case of training in the production harness: real tools, real formats and real VMs, with semantic search as the payoff.
- Supports the argument that RL for agents is mainly an infrastructure problem (kernels, rollout load balancing, VM fleets).
- The "semi-async valley of death" framing explains why speed is a product feature, not only a cost metric.
- Shows RL shaping agent behaviour (parallel reads, search before edit), not only accuracy.
- The plan-with-frontier, build-with-fast-model workflow is a practical split of work between model tiers.

## Metadata
- Video: https://www.youtube.com/watch?v=fL1iJHtl51Q
- Duration: 15:36
- Playlist index: 91
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] It's great to be back in New York and I'm very excited to be here and talk on behalf of all of our engineering and research teams at Curser about building Cursor Composer, our first agent model and my colleague Sasha actually gave a version of this talk recently. So I'm excited to give my own uh my own take on it. So cursor composer is a model designed for real world real world software engineering and it tries to be both fast and smart. So as we've measured it against our own benchmarks. It's better than the best open source models. It's like up against recent Frontier models but kind of slightly below the latest frontier with Sonnet 45 GPT 5.1 codecs. But where it really shines is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/fL1iJHtl51Q.txt]]
- Description cue: Learn about the infrastructure, training, and evaluations used to build Cursor Composer, our first coding model. (

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://cursor.com/blog/2-0>
