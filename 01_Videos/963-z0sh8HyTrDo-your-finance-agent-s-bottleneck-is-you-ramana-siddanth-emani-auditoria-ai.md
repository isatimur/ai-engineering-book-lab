---
video_id: z0sh8HyTrDo
playlist_index: 963
title: "Your Finance Agent's Bottleneck Is You — Ramana Siddanth Emani, Auditoria AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=z0sh8HyTrDo"
duration: "13:42"
duration_seconds: 822
view_count: 1900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/z0sh8HyTrDo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:49+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ramana Siddanth Emani, a data scientist at Auditoria AI, which builds production agents for finance, argues that demos fail in production not because of models, GPUs or frameworks, which all get swapped, but because of slow developer loops. His four primitives: parallel subagents in git worktrees, skills as the organization's secret recipes, MCP tools, and a minimal one-pane UX. In a nine-step bug-fix pipeline a human is needed only at the first and last steps. Then the loop improves itself with goals and dreaming, and the human stays the verifier, not the throughput ceiling."
---

# Your Finance Agent's Bottleneck Is You — Ramana Siddanth Emani, Auditoria AI

## Summary
Ramana Siddanth Emani is a data scientist at Auditoria AI, which builds production agents for finance. The talk sits between harness engineering and AI for finance. Despite the title, his target is the internal harnesses developers use to build and fix production agents. His thesis: once a demo becomes a pilot and meets customer data it has never seen, the fix rate depends on "your dev loop velocity", not on the model.

**Why not the model, GPU or framework**
A new model arrives every three and a half months, faster chips every year, and new frameworks every day. All of these can be swapped. What you must build yourself is an automated developer loop that keeps pace with fast-rising model capability.

**Four primitives**
- Subagents in parallel git worktrees. Each worktree is an isolated folder, so agents do independent tasks without fighting. He claims a MacBook with 48 GB of RAM can run about 50 active worktrees. Each Jira ticket from QA gets its own worktree and agent, which can spawn more subagents. Do not queue tasks yourself.
- Skills, "your organization secret recipes", so agents use the correct workflows.
- MCP tools, so the agent can reach whatever system holds client data.
- Minimal UX. His team uses one macOS widget that shows Kubernetes services and pods, system logs, Jira tickets, GitHub PRs and a coding-agent session. He jokes that it cuts the number of "neck rotations" per change across two or three monitors.

**A nine-step example harness**
QA reports bugs. An agent parses requirements, does root cause analysis, pulls traces and logs into a worktree, writes tests first, implements the fix, runs local end-to-end tests, opens a PR, merges after review, builds Docker images, deploys to development and stage, and hands back to QA. He argues a human is needed only at step 1, to see what the agent does, and step 9, to validate what shipped.

**The finance constraint**
Without AI, a human auditor reviews code and a controller signs off for compliance. Agent-to-agent review leaves no one accountable: if production breaks, you cannot blame the model. With many subagents, human attention becomes the bottleneck, and moving fast and breaking things means something else in finance.

**Removing yourself from the loop**
Treat production failures as input. Let the loop run for a day or two, solve five or six tickets, then ask the agent to list the bottlenecks in its own process and remove them one by one. After about a month, one sentence ("fix this bug for me") triggers log, trace and ticket fetching through to the QA handoff. Combine goals and loops: set a goal such as fixing a report whose numbers do not match the source data, then walk away, even monitor from a phone. "Dreaming" runs in the background, gathers customer sessions with repeated problems, and compacts them into data the system uses to improve itself.

**Closing rule**
Keep the human "as a verifier, but not the throughput ceiling", because human attention is very limited.

## Why it matters
- It moves the reliability question from model choice to developer-loop speed, a useful frame for the harness chapter.
- The nine-step pipeline with humans only at the ends is a concrete map of where agents can replace hand-offs in bug fixing.
- The finance accountability problem (no one to blame for agent-to-agent review) shows why regulated teams cannot remove the human verifier.
- The self-improvement recipe (run the loop, have the agent list its own bottlenecks, remove them daily) is a simple, testable practice for internal harnesses.

## Metadata
- Video: https://www.youtube.com/watch?v=z0sh8HyTrDo
- Duration: 13:42
- Playlist index: 963
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello everyone. Welcome to this session about your finance agent's bottleneck is you. So, sorry for the rude title. I don't mean to call the audience here the bottlenecks, but I'm here to talk about the harnesses that you guys are developing and using these internal harnesses to build your production agents. So, my name is Siddhant Imani and I'm a data scientist at Auditoria AI and we build production agents for finance. So, if you're a CFO in the audience, I would love to speak to you after the session. This talk is in between the harness engineering track and AI for finance. So, this talk is mostly about identifying the bottlenecks within your developer and if you're a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/z0sh8HyTrDo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Evals & Reliability**.

