---
video_id: "EY4O9M6AsWI"
playlist_index: 235
title: "Dream Machine: Scaling to 1m users in 4 days — Keegan McCallum, Luma AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=EY4O9M6AsWI"
duration: "19:03"
duration_seconds: 1143
view_count: 1691
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/EY4O9M6AsWI.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:09:22+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Keegan McCallum (Luma AI) tells how the June 2024 launch of Dream Machine, Luma's first video model, hit a million users in four days and overran 500 H100s. The team scaled to about 5,000 H100s by hand over SSH, then took the 4,000-GPU training cluster. He explains the rebuilt serving stack: vanilla PyTorch instead of Triton Inference Server, CPU workers decoupled from GPU workers through a global pull queue, dispatch limits for back pressure, fair scheduling that ranks jobs by percent of their tier's SLO, and an immutable model repo with YAML-driven hot rollouts."
---
# Dream Machine: Scaling to 1m users in 4 days — Keegan McCallum, Luma AI

## Summary
Keegan McCallum of Luma AI tells the infrastructure story behind Dream Machine, Luma's first video model. It launched at 9:00 a.m. on June 11th, 2024, and reached a million users in four days. He notes that ChatGPT took five days. In the first 12 hours Luma processed about half a million videos. Luma describes itself as a foundation model lab that aims at general multimodal intelligence, not only a video company.

**Launch day**
Luma had allocated about 500 H100 GPUs. A queue of almost 100,000 requests built up within the hour. The contingency plan was to take every GPU from every provider and spin up workers by running SSH commands by hand. That reached about 5,000 H100s in six hours, and the queue drained around 2 p.m. Then the CEO tweeted that Luma had scaled 10x, and the queue grew again. The team took over the training cluster, another 4,000 or so H100s, and "it barely made a dent."

**From Triton to vanilla PyTorch**
The launch stack was tightly coupled containers around Triton Inference Server. It ran on raw machines with no dependencies, but it was brittle: CPU processes did not know when Triton went down. Triton was not built for video models that span multiple GPUs and nodes, had weak support for non-Nvidia chips, and was hard for researchers to develop against. Luma rebuilt on vanilla PyTorch, because chip vendors make sure PyTorch runs on their hardware. A team of about ten engineers then optimizes low-level operations per chip with Nvidia and AMD.

**Decoupled, pull-based architecture**
CPU workers fetch and stage media inputs so GPUs never block. GPUs can run on any provider or VM, as long as they reach the queue and distributed storage (SeaweedFS) over a private network. A simple scheduler on Slurm grows and shrinks the GPU pool and can borrow the training cluster for bursts, which "our researchers hate me for." Problems they solved:
- **Back pressure**: too many jobs pulled into one cluster while GPUs elsewhere sat idle. A dispatch limit caps how many jobs wait inside a cluster.
- **Cold starts**: a video model has 10 to 20 sub-models, so traditional autoscaling wastes 10 to 20 minutes of GPU time per warm-up.

**SLO-based fair scheduling**
With Ray 2, a bigger model, compute became scarce. Strict priority across tiers (API, enterprise, unlimited, plus, lite, free) starved low tiers, and some users waited seven to nine hours. Aging is the standard fix, but Luma treated the aging function as "a product problem." Product sets a worst-case wait per tier. A first version jumped jobs to the front at 50% of their SLO, but long-SLO jobs then starved API jobs. The final version ranks every job by the percentage of its SLO already used, so an API job waiting one minute equals a lite job waiting ten.

**Model repo and rollouts**
Borrowed from Triton: each model has a folder in object storage with immutable versions that hold the full Python environment and checkpoints. A YAML file at the root names the active version. Workers switch versions on the fly without restart, across thousands of H100 and AMD GPUs, and rollback fixes most issues.

## Why it matters
- It is a vivid case of launch demand beating capacity by an order of magnitude, even after a 10x manual scale-up and a training-cluster takeover.
- The SLO-percentage ranking is a simple, reusable answer to starvation in multi-tier queues, and it hands the aging policy to product owners.
- Choosing vanilla PyTorch over a vendor serving server shows a portability trade-off: run anywhere first, then optimize per chipset.
- Decoupling CPU staging from GPU work and pulling from a global queue lets a team add GPUs from any provider without SSH heroics.
- Immutable model versions plus a YAML pointer give reproducible, instant fleet rollouts and rollbacks for large multi-model pipelines.

## Metadata
- Video: https://www.youtube.com/watch?v=EY4O9M6AsWI
- Duration: 19:03
- Playlist index: 235
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] So, it's 9:00 a.m. June 11th, 2024, and we send out the announcement and hold our breath waiting uh to see the user signups pour in. We're expecting significant traffic for the launch of Dream Machine, Luma's first video model, and we were woefully unprepared for what came next. Uh, we'd allocated about 500 H100 GPUs. We thought that was a lot at the time. It wasn't. Um, and uh, over the next hour, we saw request after request pour in and a giant queue of requests start to pile up. Luckily, we had a contingency plan for this um which was to take every GPU we had access to from every provider and start manually running SSH commands against them to spin up workers uh pulling in work...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/EY4O9M6AsWI.txt]]
- Description cue: Talking about Luma AI, our mission, and how our ML infrastructure enables SOTA multimodal model development

## Book angles
- Could support a chapter/section on **Models & Inference**.
