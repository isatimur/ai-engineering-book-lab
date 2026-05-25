---
video_id: "NTBX-wxUhHs"
playlist_index: 104
title: "Context Platform Engineering to Reduce Token Anxiety — Val Bercovici, WEKA"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=NTBX-wxUhHs"
duration: "23:52"
duration_seconds: 1432
view_count: 1525
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/NTBX-wxUhHs.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:23:03+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Val Bercovici (WEKA chief AI officer) and Kellen Fox present a systems-level case that KV cache hit rate is the single most important metric for production AI agents — citing Manis's context engineering blog. The core argument: without deliberate context platform engineering, agentic workloads thrash the KV cache and re-prefill the same tokens 15–16x, burning 10x the cost of a cache hit and triggering rate limits. WEKA's answer is an open-sourced Context Platform Engineering Toolkit featuring a configurable load generator plus an augmented memory grid (NVMe-backed, ~1000x denser than DRAM) that keeps the KV working set resident at provider-sustainable cache hit rates. Contrarian angle: when you buy a subscription API tier, you are actually purchasing KV cache slot allocations — not just token throughput."
---
# Context Platform Engineering to Reduce Token Anxiety — Val Bercovici, WEKA

## Summary
Val Bercovici (WEKA chief AI officer) and Kellen Fox (head of product) co-present at the AI Engineering Code Summit, making a hardware-infrastructure argument about why most teams suffer from unnecessary "token anxiety."

### The KV Cache Hit Rate Claim
Bercovici opens by citing Manis's context engineering blog: KV cache hit rate is the single most important metric for production-grade AI agents. In the absence of context platform engineering, teams default to "context financial engineering" — prompt arbitrage across cache write/read pricing tiers, trying to predict whether a 5-minute or 1-hour TTL cache window will pay off. This is fragile and expensive.

### What the Data Shows
Fox presents WEKA Labs benchmark data visualizing real agentic coding workloads (including Claude Code). Key findings:
- In a typical agentic coding session, the actual user input is a small fraction of context; the majority is tool use and tool responses.
- Median time between requests is 10–15 seconds; mean is minutes-to-hours due to human response latency — a bimodal distribution that wrecks 1-minute TTL caches.
- With a 1-minute cache TTL, the same token chunk gets re-prefilled 15–16 times. Extending TTL to 1 hour brings this close to 1.
- At 10x price differential between cache-miss and cache-hit tokens, this directly translates to unnecessary cost.

### The Memory Tier Problem
DRAM is the default KV storage tier, but it is limited in size and tightly coupled to compute — you can't expand it without degrading performance. WEKA's augmented memory grid uses NVMe-backed storage roughly 1000x denser than DRAM, attached to the inference system. Benchmark results (decode-focused workloads): HBM + WEKA maintains cache hit rate at significantly higher user concurrency compared to HBM + DRAM, which drops off sharply as the working set overflows DRAM capacity.

### Subscription Tiers as Cache Slot Purchases
The provocative reframe: when you pay for a token subscription tier, you are actually purchasing KV cache slot allocations. Inference providers incentivize users to stay in a certain cache hit rate band because if agentic workloads miss cache at scale, GPU clusters melt.

### Toolkit
WEKA open-sourced the Context Platform Engineering Toolkit on GitHub: a load generator that simulates agent swarms with configurable SLOs, deterministic and random prompt cycles, model parallelism options, and disaggregated prefill/decode modes.

## Why it matters
- KV cache hit rate is a first-class engineering metric, not a provider implementation detail — teams should design prompt structure and context windows around it.
- The DRAM ceiling is a real bottleneck for multi-agent workloads; understanding memory tiers matters when choosing inference infrastructure.
- The "cache slot purchase" framing reframes API pricing in a way that changes how you reason about agentic workload economics.
- The open-source toolkit gives practitioners a concrete way to benchmark context platform configurations before committing to infrastructure choices.

## Metadata
- Video: https://www.youtube.com/watch?v=NTBX-wxUhHs
- Duration: 23:52
- Playlist index: 104
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> This is Valberkichi, Weta's chief AI officer, and I am joined by >> Kellen Fox, head out of the product management team here at WA >> and we're both thrilled to present context platform engineering to you at the AI.engineering code summit. Now, let's kick this off with uh an announcement we're making. We're actually open sourcing our context platform engineering toolkit. And this toolkit features a really cool load generator that Kalen wrote that lets you configure agent swarms uh and agent subtasks with very specific SLOs's being able to cycle through deterministic and random prompt cycles and engineer context platforms with all sorts of model parallelism options, disagregated or...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/NTBX-wxUhHs.txt]]
- Description cue: Context Platform Engineering is the set of skills and tools to design, size, and configure systems optimized for Agent Swarm Context, at any scale.

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
