---
video_id: "qeDPKbWjsuk"
playlist_index: 466
title: "Keynote: The AI developer experience doesn't have to suck – why and how we built Modal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=qeDPKbWjsuk"
duration: "21:38"
duration_seconds: 1298
view_count: 1446
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/qeDPKbWjsuk.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:19:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Keynote: the AI developer experience doesn't have to suck – why and how Modal was built. CEO Eric Bernhardson (captioned spelling), formerly of Spotify, argues the cloud was a step backwards for developer experience and fast feedback loops need very fast container cold starts. He live-codes a Python function that runs remotely, moves it to an H100 with one decorator argument, and fans out to 10,000 calls. Modal built its own scheduler and file system instead of Kubernetes or Docker: content-addressed storage, lazy loading, prefetching from past runs, and CPU memory snapshots in gVisor, which also make serverless GPU pooling cheap."
---
# Keynote: The AI developer experience doesn't have to suck – why and how we built Modal

## Summary
This keynote title says it: the AI developer experience doesn't have to suck – why and how we built Modal. Eric Bernhardson (spelling as captioned) is CEO of Modal, based in New York. He built a music recommendation system at Spotify and started Modal four or five years ago, during the pandemic, to make data, AI and ML infrastructure fun again. GenAI turned out to be the perfect use case. His thesis: productivity comes from fast feedback loops; the cloud is powerful but "arguably a step backwards" for developer experience; the fix is to start containers in the cloud so fast that remote code feels local.

**What Modal is**
A fully managed, "high code" platform, closer to Kubernetes or AWS Lambda than to an AI API. It runs arbitrary Python code over a pool of thousands of GPUs (H100, A100, L4, T4) and CPUs. A decorator turns any Python function into a serverless function. The biggest use case is GenAI inference, with traction in diffusion models (music, video, images), large batch jobs such as medical images and video frames, computational biology like protein folding, fine-tuning and batch embeddings.

**The live demo**
- A function that squares a number runs in a cloud container from the command line and streams output back; edits are picked up without a manual rebuild and push.
- Setting the GPU to one H100 on the decorator gets a GPU in seconds. The image is defined in code: Debian slim plus pip install torch. Loading torch adds about a second.
- A map over 10,000 inputs fans out to many containers; the UI showed 18 at peak, plus logs, GPU temperature and power draw.
- A deploy creates a persistent endpoint callable from any Python context. Containers stay warm 60 seconds by default.

**Under the hood**
Fast cold start was "a very very deep rabbit hole". Modal could not use Kubernetes or Docker, so it built its own scheduler and file system around the gVisor container runtime. Two observations drive the design: container images carry junk you never read (Perl, man pages, time zone data for Uzbekistan), and different images share most of their files. So Modal uses content-addressed storage, the same technique as AWS Lambda: images become metadata pointing to hashed, deduplicated blobs, highly cacheable and lazily loaded. Python start-up reads thousands of modules in sequence, so each file access must be fast; Modal prefetches based on files read in historical runs. More recently it snapshots CPU memory, so Stable Diffusion with 5 to 10 GB of weights starts in a couple of seconds. GPU snapshotting is next. Storage uses R2 and a CDN across many regions.

**Why cold start also enables serverless**
Fast starts let Modal pool many users on expensive GPUs, raise utilization, lower relative variance and remove capacity planning. Behind the scenes Modal runs thousands of GPUs across cloud vendors and regions and solves a mixed integer programming problem to minimize cost, keeping a buffer so a request for 100 GPUs is often served at once. Pricing is fully usage based. Every user gets $30 a month in free credits; startups can get up to $50,000.

## Why it matters
- The talk links a developer-experience goal (local-speed feedback) directly to deep infrastructure choices, a strong case study for why AI platform teams sometimes rebuild the stack.
- Content-addressed images, lazy loading, prefetching from past runs and memory snapshots form a concrete recipe for cutting container cold start on large model workloads.
- The argument that fast cold start is what makes serverless GPU pooling economical explains how usage-based GPU pricing can work.
- The demo shows the code-first workflow (decorator, image in code, map fan-out, deploy) that chapters on inference hosting can reference.

## Metadata
- Video: https://www.youtube.com/watch?v=qeDPKbWjsuk
- Duration: 21:38
- Playlist index: 466
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> hi my name is Eric bernhardson it's great to be here virtually uh who am I I am the CEO of a company called modal we are based here in New York most of my background is in data AI machine learning and in particular I was at Spotify for many years and built a music recommendation system there I did leave about 10 years ago and did all kinds of other stuff in between but started modol about 4 or five years ago during the pandemic and the mission I had at that point was to build an infrastructure platform for data AI machine learning in a way that takes all the that that makes it fun again to write these applications to to basically to to deploy models scale them out run large scale back jobs...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/qeDPKbWjsuk.txt]]
- Description cue: Modal provides infrastructure for AI and other compute-heavy applications. In order to deliver the developer experience we wanted, we realized early that we would have to throw out Kubernetes...

## Book angles
- Could support a chapter/section on **Models & Inference**.
