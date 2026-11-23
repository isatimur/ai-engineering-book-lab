---
video_id: "k0VIgKAUkP4"
playlist_index: 493
title: "[Full Workshop] How to add secure code interpreting in your AI app: Vasek Mlejnsky"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=k0VIgKAUkP4"
duration: "1:48:16"
duration_seconds: 6496
view_count: 1175
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/k0VIgKAUkP4.txt"
themes:
  - "Security & Guardrails"
ingested_at: "2026-04-24T12:20:37+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vasek Mlejnsky, E2B co-founder, live-codes an open-source clone of Anthropic's Artifacts UI: a Next.js chat with Claude Sonnet 3.5 through the Vercel AI SDK, where a run_python tool sends AI-written code to an E2B code-interpreter sandbox running a Jupyter server and streams back stdout, errors and PNG charts. His thesis: AI-generated code belongs in a full Firecracker microVM per user session, not a container. VMs start in about 900 ms, can be customized from a Dockerfile, are destroyed after use, and will support memory snapshots for tree-search agents."
---
# [Full Workshop] How to add secure code interpreting in your AI app: Vasek Mlejnsky

## Summary
Vasek Mlejnsky, co-founder of E2B, runs a code-along workshop. Attendees build an open-source version of Anthropic's Artifacts UI, released two days earlier: a chat on the left and a live preview on the right. In Claude's version the preview only renders HTML, JS and CSS. This one runs AI-generated Python in a secure sandbox that can run "pretty much anything" a Linux machine can. The cookbook repo was too large to clone over the venue Wi-Fi, so he made a slim copy on the spot.

**The build, in five stages**
1. A Next.js API route streams Claude Sonnet 3.5 replies through the Vercel AI SDK, with a system prompt that casts the model as a skilled Python data-visualization developer. On the front end, `useChat` handles the streaming.
2. A `run_python` tool is defined with a Zod schema: code, plus a title and description for the UI. Its `execute` function runs when the model calls the tool. Mlejnsky notes that some users drop tool calling and parse code out of markdown instead, because tool streaming was painful.
3. The E2B code-interpreter SDK creates a sandbox, a small VM with a Jupyter server inside, and runs the code. To keep variables between snippets, the code lists running sandboxes and reconnects to the one tagged with the user's ID in its metadata. One sandbox per user session is the common pattern.
4. The result holds stdout, stderr, a structured runtime error with traceback ("that you can feed back into LM" for self-repair), and cell results: PNG, HTML, JSON, PDF or text from the last line of the cell.
5. A `StreamData` side channel tells the UI the tool is running or complete, and the artifact view renders the base64 PNG, for example a chart of a Monte Carlo simulation.

**Why Jupyter**
E2B tuned the default environment to the code LLMs actually write: data-science Python in notebook style, with common packages such as pandas preinstalled on Python 3.10. A Dockerfile lets you install anything else.

**Security model**
- Each sandbox is a Firecracker microVM, the open-source AWS VMM behind Lambda. It uses KVM and a jailer that restricts syscalls, which gives true multi-tenant isolation.
- Users get root. Escape attempts just restart the VM.
- A Dockerfile is run as a container, its filesystem extracted and converted to a Firecracker root filesystem. Startup takes about 900 ms and should soon drop to about 400 ms.
- Nothing is kept after a sandbox dies. Only the fact of an operation is logged, not its content. For persistence, mount S3-compatible storage over FUSE.

**Why not containers**
About 90% of customers arrive from in-house Lambda functions or Kubernetes container fleets. Containers can be made secure, but it takes more work and Docker-in-Docker hurts. A fast VM gives the LLM a full computer. The bigger bet is VM snapshots of filesystem and memory in about 80 ms. They would let many agent versions explore a tree of states, return to any node, and bring a little "determinism into non-deterministic" systems.

**Roadmap**
Open core: self-host on AWS first, then GCP and any Linux machine. Enterprise features for loading terabytes of data and for observing files and network calls inside the sandbox. No GPU sandboxes, by choice.

## Why it matters
- A complete, reproducible pattern for code interpreting in an LLM app: tool schema, a sandbox per session, structured results, and a streamed status side channel.
- It argues clearly for microVMs over containers to run untrusted AI code, with concrete security mechanisms (KVM, jailer, restart on escape).
- Feeding structured runtime errors back to the model is a simple, reusable self-correction loop.
- VM snapshots as nodes in an agent search tree is an early statement of an idea that matters for agent infrastructure and evals.
- Tuning the default sandbox to the code LLMs tend to write cuts first-run failures for new users, a useful design principle for any agent tool.

## Metadata
- Video: https://www.youtube.com/watch?v=k0VIgKAUkP4
- Duration: 1:48:16
- Playlist index: 493
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]

## Transcript excerpt
> [Music] hi everyone uh thanks for coming thanks for coming to my uh to my workshop uh my name is vask and uh today uh I will show you and you can code along um how to add AI code interpreting into your AI app or into your app so uh what what we will be building uh will be very similar to uh cla's new AI artifacts uh app that they or anthropics AI art artifacts app that they just released about two days ago uh so if you are not familiar with it the way it looks like is that uh you have a chat on the left and on the right you have this preview and what this preview does is that uh CLA can write code um in in Cloud's uh case it's supported just for HTML JS and CSS code if I'm not mistaken and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/k0VIgKAUkP4.txt]]
- Description cue: In this workshop, I'll show you how to add secure AI code execution that supports any LLM in your AI app using E2B. AI-powered code execution improves reasoning of LLMs and allows you to build...

## Book angles
- Could support a chapter/section on **Security & Guardrails**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/e2b-dev/e2b-cookbook>
- resource: <https://e2b.dev/docs/getting-started/api-key>
