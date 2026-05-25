---
video_id: JomVvNDjGb8
playlist_index: 697
title: "Your Coding Agent Should Do AI System Engineering — Ben Burtenshaw, Hugging Face"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JomVvNDjGb8"
duration: "18:25"
duration_seconds: 1105
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/JomVvNDjGb8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:36+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ben Burtenshaw of Hugging Face argues that coding agents are now capable enough to tackle AI systems engineering — writing CUDA kernels, fine-tuning models, and running multi-agent research loops — not just generating application code. The concrete benchmark: an agent generated a custom kernel for Qwen 3 8B on H100, achieving a 94% speedup. The headline project is AutoLab, a distributed multi-agent AI research system that runs researchers, planners, workers, and reporters in parallel, using Hugging Face Hub for compute, Trackio for observability, and a shared git repo for coordination. Surprising angle: the standard assumption (memory bandwidth, not compute, is the GPU bottleneck) explains why custom kernel writing is worth automating at all."
---

# Your Coding Agent Should Do AI System Engineering — Ben Burtenshaw, Hugging Face

## Summary

Ben Burtenshaw, AI engineer at Hugging Face and contributor to GPU Mode, argues that AI engineers should use coding agents to tackle the hardest problems in their field — not just application code. The talk has three escalating "bosses."

**Boss 1: Writing CUDA kernels**

Burtenshaw explains why custom kernels matter: on a modern GPU like the H100, compute capacity is ~1 petaflop/sec but memory bandwidth is only ~3 TB/sec, so GPUs are typically idle waiting for data. Custom kernels increase arithmetic intensity — more computation per memory read/write, keeping the GPU hot (Flash Attention being the canonical example). Writing these was historically considered out of reach for agents due to complex hardware-specific DSLs and install hell.

Hugging Face's `kernels` library distributes community-written kernels via the Hub, with a TOML file declaring hardware compatibility. Using a skill that provides benchmarking scripts and examples, Burtenshaw's team used an agent to generate a Qwen 3 8B kernel for H100, achieving a 94% speedup — framed not as state-of-the-art but as easily accessible low-hanging fruit from the compatibility gap between popular models and specific hardware configurations.

They also open-sourced `upskill`, a library that generates evals for a given skill, lets you benchmark different models against the same skill, and compares accuracy/token-cost tradeoffs.

**Boss 2: Fine-tuning models**

A briefer section: agents can now run full fine-tuning jobs zero-shot ("fine-tune Qwen 3 6B on this dataset"), integrated with Hugging Face Hub for GPU compute and HF CLI skills. Blog posts with free compute credits are available.

**Boss 3: AutoLab — multi-agent research**

Inspired by Karpathy's Auto Research project (one agent iterating on a training script), Burtenshaw distributed the problem across four agent roles:
- **Researcher**: searches HF Papers (has a CLI for pulling arXiv/Hub papers), generates hypotheses
- **Planner**: maintains a job queue from those hypotheses
- **Workers**: implement each hypothesis as a change to a training script, submit jobs to Hugging Face Hub
- **Reporter**: monitors runs, maintains a Trackio dashboard

The shared git repo holds the training scripts; a score data structure in the main branch tracks results. Trackio is key for agent observability because its underlying data layer is open parquet files — the agent can write Gantt charts or any visualization without needing a specific dashboard integration.

**The takeaway on primitives**

Burtenshaw argues that agents work best with open, fully inspectable primitives. Abstracted APIs create ceilings. The Hugging Face Hub is ready for agentic workloads: storage, tracking, and compute all accessible via CLI and open APIs.

## Why it matters
- AutoLab is a real working implementation of a multi-agent AI research loop that goes beyond toy examples — researcher → planner → worker → reporter with GPU compute on Hub.
- The hardware/software gap between popular models and specific GPU generations is a source of easily-automatable speedups; agents can close that gap without needing expert kernel writers.
- The "open primitives beat abstracted APIs" principle is a design heuristic for any system where agents need to do novel work.

## Metadata
- Video: https://www.youtube.com/watch?v=JomVvNDjGb8
- Duration: 18:25
- Playlist index: 697
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hi everyone. As you heard, I'm Ben from Hugging Face and the talk that I'm going to present to you today is called your coding agent should do AI systems engineering. So, there are two main takeaways that I want you to get from this talk. One, and probably the fun part, is that we can use coding agents to tackle the hardest engineering problems in AI, so systems engineering and machine learning engineering. And maybe the boring part is that in order to do this, we're going to need standard repos and we're going to need those on the hub. And in many cases, we already have them. So, I think in this case, I'm preaching to the choir here, but in case you haven't noticed, coding...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JomVvNDjGb8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
