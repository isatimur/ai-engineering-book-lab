---
video_id: maRzp4kImJ4
playlist_index: 998
title: "Taking Reinforcement Learning Cross Datacenter — Nan Jiang, Modal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=maRzp4kImJ4"
duration: "19:50"
duration_seconds: 1190
view_count: 1700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/maRzp4kImJ4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:10+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Modal's Nan Jiang describes Stitch: decoupling RL rollout from the trainer cluster by shipping bitwise weight diffs (~500GB to ~500MB) via Adam-step/BF16-rounding absorption."
---

# Taking Reinforcement Learning Cross Datacenter — Nan Jiang, Modal

## Summary
Nan Jiang (Modal) argues that reinforcement-learning post-training loops don't need to live in one RDMA-connected cluster: only the trainer's backpropagation and gradient all-reduce require tight coupling, while the rollout fleet that generates trajectories has no cross-node collective and can run as independent "islands" on scattered, globally distributed GPU capacity. The remaining obstacle is weight synchronization — naively shipping a full checkpoint (he cites a Kimi-scale NVFP4 checkpoint around 500GB) takes minutes to hours over a commodity network link, too slow for near-real-time async training. His fix exploits a numerical property of Adam-optimized training: because Adam's per-step update is on the order of the learning rate (roughly millionths in magnitude) while low-precision served formats like BF16 have a much coarser rounding boundary (roughly theta/256), the large majority of weight updates get absorbed and never change the served, low-precision weight value — he cites measurements showing roughly 99% of steps are bit-identical in the served weights across model families, and an internal run (a model served in FP8) showing only about 0.15% of weights changing on the first, high-learning-rate step, dropping to about 0.05% per step once training stabilizes. This lets the system ship a lossless bitwise diff instead of a full checkpoint, shrinking transfers from roughly 500GB to roughly 500MB. Modal's implementation, Stitch, has the trainer publish immutable weight versions to a shared registry while a "sidecar" component makes each rollout engine version-aware — serving from cache, applying a missing delta, or returning "not ready" — letting rollout capacity scale elastically across regions and providers using standard formats like Hugging Face safetensors served by backends such as SGLang and vLLM.

## Why it matters
- A concrete numeric argument for decoupling RL rollout from the trainer: Adam's per-step update (roughly learning-rate scale, ~1e-6) versus BF16's rounding boundary (~theta/256) means most served weight bits don't change per step — a specific, falsifiable claim about the optimizer/precision interaction relevant to training-infra design.
- A named, working system (Stitch: version publishing plus a version-aware sidecar proxy) for cross-region, cross-provider RL training that shrinks weight-sync payloads roughly 1,000x (500GB to ~500MB) — a concrete infra pattern for scaling RL beyond single-cluster capacity limits.
- Explicitly flags open questions — whether the absorption argument holds for Muon-based optimizers used by other labs, how scalable fully async RL is at this scale, and whether the technique generalizes to pretraining, mid-training, or SFT — useful for showing where the technique's limits currently sit, not just its wins.

## Metadata
- Video: https://www.youtube.com/watch?v=maRzp4kImJ4
- Duration: 19:50
- Playlist index: 998
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] All right, cool. Hi everyone. Uh, hope you all have a good time at the conference. Uh, I'm N from Moto. Uh, at Moto, we spend a lot of time thinking about GPU capacity, like where it exists, how do we make it elastic, and what kind of workload can we actually use it. Today I want to talk about one place where everything became like gets really interesting the IO post training. A lot of IO discussion right now is about algorithm and the environments sandbox PO GRPO like to call maybe low precision training maybe deterministic kernels. Um but when you run those experiments at a scale the problem became more physical. Where are the GPUs? Are they in the same region? Uh do they have...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/maRzp4kImJ4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
