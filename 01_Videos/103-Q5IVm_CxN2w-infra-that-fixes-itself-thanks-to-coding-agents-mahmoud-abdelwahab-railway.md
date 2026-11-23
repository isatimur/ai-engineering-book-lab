---
video_id: "Q5IVm_CxN2w"
playlist_index: 103
title: "Infra that fixes itself, thanks to coding agents — Mahmoud Abdelwahab, Railway"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Q5IVm_CxN2w"
duration: "18:08"
duration_seconds: 1088
view_count: 948
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Q5IVm_CxN2w.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:23:00+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mahmoud Abdelwahab of Railway demos Railway Autofix, which turns a production alert into a pull request. His thesis: alerts only tell you something is wrong, and you still dig through logs, metrics and traces yourself. A coding agent should do the investigation and ship a fix you just review. Three durable workflows run on a schedule: check project health against thresholds over a time slice, pull logs and context for affected services, then have an LLM write a plan and hand it to a headless Open Code server on Railway that clones the repo, fixes the code and opens the PR."
---
# Infra that fixes itself, thanks to coding agents — Mahmoud Abdelwahab, Railway

## Summary
Mahmoud Abdelwahab works at Railway and builds Railway Autofix, a project that watches a Railway deployment and opens pull requests with fixes. His thesis: "your app's infrastructure should fix itself". Today a threshold fires, you get paged, and you still piece together logs, metrics and traces by hand. He proposes that a coding agent does that investigation and leaves you with a PR to review.

**The broken services**
His demo project has deliberately faulty services. One leaks memory, with memory climbing fast, a 94% request error rate and multi-second responses. Another looks healthy on CPU and memory but runs very slow Postgres queries, so a page can take 30 seconds to load. The second case shows that not every problem is obvious from resource charts.

**Three workflows from issue to PR**
- **Monitor project health**, on a schedule (every 10, 15 or 30 minutes). It fetches the project architecture (services, databases, volumes, repos), then CPU, memory and HTTP metrics (4xx and 5xx error rates, latency) for each service in parallel, and returns the services that crossed thresholds.
- **Pull service context** for those services: HTTP, build and deployment logs plus a Markdown architecture summary. He suggests going further, for example inferring upstream providers from the code and checking their status pages, so the agent can say "wait out this issue" when a payment processor is down.
- **Generate fix**: an LLM analyses the data and writes a plan with debugging steps (such as reproducing locally under the same load) and recommendations. A coding-agent session per repo then clones it, builds a to-do list, implements the fixes and opens a PR with a root-cause analysis.

**Why polling, not alert webhooks**
He prefers analysing a slice of time over reacting to each threshold breach. A spiky workload can hit 80% CPU while everything is fine, and high usage may simply mean success. A per-alert trigger would be noisy.

**Durable execution**
He builds the workflows on a durable-execution engine. Each step retries automatically, with configurable backoff, and caches its result on success. A failed run resumes where it stopped instead of repeating finished work, which is faster and cheaper. He explains it with a transcribe, summarize and store example.

**Open Code as a headless agent**
He picks Open Code because it is open source, model-agnostic and split into a terminal UI client and a server with an API. That lets him run only the server on Railway. The Dockerfile installs curl, jq, bash, git and the GitHub CLI, configures git, authenticates the CLI and exposes the port. The server is a small Bun app that calls a create-server function. In the demo, a service using 31.96 GB of a 32 GB memory limit is flagged, and the run ends with an open PR.

## Why it matters
- A worked reference design for turning observability data into agent work: architecture plus metrics plus logs, written as a plan, then a coding agent.
- The polling-over-a-time-window choice is a useful counter to alert-driven triggers that would flood an agent with noise.
- Shows durable execution (per-step retry and cached results) as the reliability layer under multi-step agent pipelines.
- Running a coding agent headless through its server API, in a container with git and the GitHub CLI, is a pattern for agents that act outside a developer's terminal.
- The human still reviews and merges, which keeps the PR as the control point for automated fixes.

## Metadata
- Video: https://www.youtube.com/watch?v=Q5IVm_CxN2w
- Duration: 18:08
- Playlist index: 103
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> your app's infrastructure should fix itself. Let me show you. So, right now I'm on the Rayway dashboard and I have a bunch of services that are deployed and all of these services have one thing in common. They all have bugs and problems. So, for example, this service has a memory leak. If I click on it, go to metrics, we can just see memoryization keeps growing high and very quickly. This is just a sign of a memory leak and pretty sure the service would eventually crash. If I look over at the amount of requests, we have a high number of 500s. So, the server is failing to respond. We have a high request error rate of 94%. And we also have an extremely high response time of like multiple...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Q5IVm_CxN2w.txt]]
- Description cue: This talk shows how we built Railway Autofix, a plug-in template you can drop into any Railway project to monitor your infrastructure, and open PRs with fixes when issues are detected. We use...

## Book angles
- Could support a chapter/section on **Coding Agents**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/m-abdelwahab/railway-autofix>
