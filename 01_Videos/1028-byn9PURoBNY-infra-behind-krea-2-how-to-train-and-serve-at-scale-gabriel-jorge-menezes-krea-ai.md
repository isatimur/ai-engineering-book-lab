---
video_id: byn9PURoBNY
playlist_index: 1028
title: "Infra behind Krea 2: How to train and serve at scale — Gabriel Jorge Menezes, Krea.ai"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=byn9PURoBNY"
duration: "16:55"
duration_seconds: 1015
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/byn9PURoBNY.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-08-20T22:28:21+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Krea's Gabriel Menezes details training Krea 2 on GPU clusters prone to frequent crashes, and a Kueue/Virtual Kubelet/taints system that shares GPUs between training and production inference."
---

# Infra behind Krea 2: How to train and serve at scale — Gabriel Jorge Menezes, Krea.ai

## Summary
Gabriel Jorge Menezes (Krea.ai) describes training Krea 2, an image-generation diffusion transformer pretrained from scratch with no base checkpoint on a large Infiniband-connected GPU cluster, released as a raw checkpoint for post-training plus a fast "turbo" post-trained version that generates an image in under a second. Scaling from small ablation runs up to hundreds of GPUs (128, 256, 512+) caused frequent, often-silent failures — training runs regularly crashed before the 8-hour mark, worse than the failure rates a Meta paper had led the team to expect — so the team leaned on checkpointing every 20-30 minutes (writing about a terabyte of data in under 30 seconds) after abandoning CephFS for a paid, higher-throughput file system rated at 1.8 TB/s read and near 1 TB/s write. Menezes argues GPU utilization is a misleading metric ("100% is a lie") and that tensor core utilization, InfiniBand metrics, and NVLink error counts (none exported by default via NVIDIA's DCGM) were the signals that actually caught cross-node communication failures, alongside a hard rule to pull any GPU running above 78°C. For serving, Krea runs training and inference on one shared cluster: gang scheduling via the open-source Kueue project (with a two-tier priority system) lets training jobs preempt inference, a custom Virtual Kubelet-based system flips workloads between clusters and external GPU providers, and Kubernetes taints plus a descheduler reclaim GPUs for training and migrate inference pods back gradually rather than cutting them off all at once, coordinated with Prometheus metrics.

## Why it matters
- Gives a concrete operational playbook for large-scale training reliability: which metrics actually matter (tensor core utilization over raw GPU utilization, InfiniBand/NVLink error counts not exported by default) versus a published failure-rate estimate that didn't hold for their cluster.
- Shows a specific, reusable pattern for maximizing GPU ROI — sharing one cluster between training and inference via Virtual Kubelet plus Kubernetes taints/descheduler, with training preempting production without taking it down.
- Treats frequent crashes and sub-8-hour training runs as the default condition of large-scale pretraining rather than an edge case, making checkpointing cadence and file-system throughput a first-class design decision.

## Metadata
- Video: https://www.youtube.com/watch?v=byn9PURoBNY
- Duration: 16:55
- Playlist index: 1028
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Hello everyone. My name is Gabriel. I work at Korea and I'll be talking about the infrastructure that allowed us to train K2 and also how we serve it. So, what is K2? K2 is our pre-trained from scratch model we just released like less than a month ago and the whole idea about training this model was because we were kind of bored of AI images. They're quite, you know, soulless. They have no spice. And the whole idea was we want to give creatives tools to to explore out of distribution extremely interesting images, do composition and like actually give tools to creatives and that was the whole idea of the model. The model was trained from scratch. No base checkpoint, not anything....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/byn9PURoBNY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.
