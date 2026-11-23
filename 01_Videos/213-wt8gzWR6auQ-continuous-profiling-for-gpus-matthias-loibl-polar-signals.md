---
video_id: "wt8gzWR6auQ"
playlist_index: 213
title: "Continuous Profiling for GPUs — Matthias Loibl, Polar Signals"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wt8gzWR6auQ"
duration: "11:31"
duration_seconds: 691
view_count: 343
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wt8gzWR6auQ.txt"
themes:
  - "Models & Inference"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:44:14+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Matthias Loibl of Polar Signals argues that GPU efficiency needs always-on, low-overhead sampled profiling in production, not one-off traces on a dev machine. Polar Signals uses Linux kernel instrumentation, so no app changes are needed, with under 1% CPU overhead at 100 samples per second. It reads NVML metrics (utilization per process, memory, clock, power, temperature, PCIe throughput) and links dips in GPU use to CPU flame charts, often showing the CPU busy loading data. A new GPU time profiling feature measures each CUDA kernel's duration on the GPU and attaches it to the calling CPU stack."
---
# Continuous Profiling for GPUs — Matthias Loibl, Polar Signals

## Summary
Matthias Loibl flew in from Berlin. He is director of Polar Signals Cloud and a maintainer of Prometheus, the Prometheus Operator and the open-source version of the profiler he demos. His thesis: to use GPUs to the fullest you need profiling that is always on and runs in production, because "your machine is not the production environment".

**Why sampled profiling**
Profiling dates back to the 1970s. Its purpose is performance and money: make software 10% faster and you may turn off 10% of your servers. Tracing profilers record every event, which gives the best view but costs too much to run all the time. Polar Signals samples instead, for example 100 or 20 times per second over 10-second windows. That costs under 1% CPU and about four megabytes for memory profiling. You will miss rare stacks, but always-on sampling eventually shows what matters, and a stack that ran once is not relevant anyway.

**No instrumentation**
The profiler hooks into the Linux kernel (captioned as EVPF), so applications need no changes. One process profiles every application on the machine. It sees compiled languages such as Rust, and interpreted runtimes such as Python, Ruby and the JVM. It works for web servers and databases too, not only GPU jobs.

**GPU metrics linked to CPU stacks**
After three or four years of CPU and memory profiling, the team started a GPU preview this year. It reads metrics from Nvidia NVML: node-wide and per-process utilization, memory utilization, clock speed, power draw against the power limit, temperature, and PCIe send and receive throughput. Temperature matters because a GPU that sits at around 80 degrees Celsius gets throttled hard. PCIe shows whether you are bound by data transfer between CPU and GPU. When utilization dips, you select that time range and get a CPU flame chart for it. Often it shows the CPU busy loading data instead of keeping the GPU fed.

**GPU time profiling**
The feature launched the morning of the talk. The kernel reports when a CUDA kernel starts and when it ends, so the profiler knows how long each kernel ran on the GPU. The flame graph then shows the CPU stack from the Python main function down through the CUDA library, with GPU time as the leaf. Width is time on the GPU and colors mark different binaries.

**Getting started**
It runs as a plain binary, under Docker, or as a Kubernetes DaemonSet with a token. Existing CPU-profiling customers are adding GPU profiling. Loibl names a vector database company (captioned as Turbo Puffer) that wants to speed up its vector engine.

## Why it matters
- The CPU-side flame chart during GPU utilization dips gives a concrete method for finding the common cause of idle GPUs: a data-loading bottleneck on the host.
- Per-kernel GPU time attached to the calling CPU stack closes the gap between Python code and the CUDA work it launches, which most metrics dashboards cannot show.
- The sampled-versus-tracing trade-off (under 1% overhead, eventual coverage) is a clear argument for running profiling in production all the time.
- Temperature throttling and PCIe throughput are named as hidden limits on inference and training speed, which is useful for any chapter on GPU cost and efficiency.

## Metadata
- Video: https://www.youtube.com/watch?v=wt8gzWR6auQ
- Duration: 11:31
- Playlist index: 213
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Great. Uh, thank you for for coming. Um, I'm going to talk about maximizing GPU efficiency with continuous profiling for GPUs. Um, so what is profiling? Profiling is pretty much as old as programming. I think it was like firstly first first done in like the 1970s. I think some IBM folks were were trying to figure out what was happening on their computers back then. So it's been around basically forever in computer science. And uh what are we doing with profiling? We are profiling um basically uh anything that that we can to to inform our um view of the world. We want to see like the memory or CPU and GPU um time spent. We want to see the usage of the individual instructions and the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wt8gzWR6auQ.txt]]
- Description cue: Continuous Profiling for GPUs extends our industry-leading continuous profiling platform to provide deep, always-on visibility into your GPU workloads.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Org Design & Leadership**.
