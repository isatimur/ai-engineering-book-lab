---
video_id: "wsFd22SL1s8"
playlist_index: 365
title: "Arrakis: How To Build An AI Sandbox From Scratch - Abhishek Bhardwaj, OpenAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wsFd22SL1s8"
duration: "40:18"
duration_seconds: 2418
view_count: 8135
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wsFd22SL1s8.txt"
themes:
  - "MCP & Tooling"
  - "Security & Guardrails"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:15:23+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Abhishek Bhardwaj, solo founder of the open-source Arrakis sandbox, argues that sandboxes are the next unlock for agents: models call code tools during inference, RL needs sandboxes to run reward functions, and a full Linux box lets an agent debug its own app. He builds the case from Linux threads to containers (shared kernel, weak isolation) to microVMs, which use Rust VMMs, jail each device, boot fast and snapshot by dumping guest memory. Arrakis runs on Cloud Hypervisor with an overlay root filesystem, tap networking with port forwarding, Chrome over VNC, and snapshot-and-restore so agents can backtrack. A demo has Claude Desktop build a collaborative docs clone over MCP."
---
# Arrakis: How To Build An AI Sandbox From Scratch - Abhishek Bhardwaj, OpenAI

## Summary
Abhishek Bhardwaj is the solo founder and developer of Arrakis, an open-source, self-hosted sandbox service for code execution and computer use by AI agents. He studied distributed and operating systems at Carnegie Mellon, worked on Windows Subsystem for Linux at Microsoft, and worked on containers and microVMs at Google. The talk is half product tour, half systems tutorial on how to build an AI sandbox.

**Why agents need sandboxes**
- Reasoning models call tools such as code execution during inference, and those calls need somewhere to run.
- Reinforcement learning needs sandboxes to run reward functions at scale.
- With a full Linux box, an agent can run its app, inspect it with tools like ps and lsof, backtrack and replan. Models already know Linux from pre-training, so you need little prompting or framework.
- Agent code is like code pasted from the internet: it can be buggy or malicious and try to get root, so it must be locked down.

**From containers to microVMs**
- Containers are namespaces (process, mount, net) plus cgroups for resource limits. They package dependencies well, but they run as native processes on the host kernel, so one kernel bug can give root.
- You can shrink the attack surface with Linux capabilities and seccomp filters; he recommends the minijail library from Chrome OS. Jails still have limits.
- Virtual machines give each guest its own kernel. A VMM process sits on the KVM device and handles VM exits for disk and network. CPU-bound guest code pays almost no penalty; heavy I/O pays for exits.
- MicroVMs began with crosvm at Chrome OS, the first Rust VMM. Rust gives memory safety for emulated devices, each device is jailed to its own system calls, and support for only one or two architectures and the main devices means less code, fast boot and less memory. Firecracker (behind AWS Lambda) and Cloud Hypervisor forked from it. gVisor sits between containers and VMs and gets GPUs more easily.

**How Arrakis is built**
- A REST server manages microVMs on Cloud Hypervisor, chosen for memory hot-plug, GPU support, snapshots, and multi-company governance. It needs Linux and KVM.
- APIs: VMs, snapshots, commands, files and health, with a Python SDK, a Go CLI, an MCP server and an OpenAPI spec.
- Storage: a shared read-only root filesystem plus a per-sandbox read-write overlay, set up by the init script before PID 1. Snapshots save only the read-write layer.
- Networking: one tap device per sandbox on a host bridge, iptables forwarding rules, and port forwarding to the code server and VNC.
- The default image is Ubuntu 22.04 with Chrome, Node.js and Python, customizable with a Dockerfile.
- Boot takes under 7 seconds against about 40 for a traditional VM on macOS, with a change in review to get under one second.

**Snapshots for backtracking**
Agents fail on big tasks, often near the end of a long plan. A snapshot saves guest memory and the read-write layer, so files, processes and open windows come back as they were, like opening a laptop lid. The steps: pause the VM, dump memory, copy the overlay, resume. In the demo, Claude Desktop uses the MCP server to build a collaborative docs clone, snapshots it, adds dark mode, then restores the version without it. Next steps: sub-second boot, a filesystem built for incremental snapshots, and memory ballooning to pack more sandboxes per server.

## Why it matters
- Gives a clear security ladder for running agent code: plain containers, jailed containers, gVisor, microVMs, with the trade-off at each step.
- Snapshot and restore turns sandbox state into a checkpoint, so agents can backtrack and explore several paths instead of starting over.
- Links sandboxes to both inference-time tool use and RL reward execution, so the same infrastructure serves products and training.
- Shows that a capable model plus a full Linux sandbox can replace much of a custom coding-agent framework.

## Metadata
- Video: https://www.youtube.com/watch?v=wsFd22SL1s8
- Duration: 40:18
- Playlist index: 365
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Security & Guardrails]]
- [[Agent Architecture]]

## Transcript excerpt
> Hello everyone, my name is Abhishek. I'm the solo founder and developer of Arachis, an open-source code execution and computer use sandboxing service for AI agents. Today we'll chat about why sandboxing is the next big unlock in intelligence and what goes into building an AI sandbox like a little bit about my background. I went to school at Carnegie Melon where I studied distributed systems and operating systems. At Microsoft, I worked on Windows Subsystem for Linux and a smart watch OS from scratch. At Google, I worked on cutting edge systems using containers and inventing something called microVMs, which we'll discuss in plenty detail today. The last couple of years, I was at Replet...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wsFd22SL1s8.txt]]
- Description cue: Arrakis ( provides MicroVM-based secure sandboxes for code execution and full computer use. It features first-class support for backtracking, a Python SDK,...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Security & Guardrails**.
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/abshkbh/arrakis>
