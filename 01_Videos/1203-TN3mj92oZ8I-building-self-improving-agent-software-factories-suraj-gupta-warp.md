---
video_id: TN3mj92oZ8I
playlist_index: 1203
title: "Building Self-Improving Agent Software Factories — Suraj Gupta, Warp"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TN3mj92oZ8I"
duration: "12:52"
duration_seconds: 772
view_count: 30000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/TN3mj92oZ8I.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T16:49:18+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Suraj Gupta, who leads harness development at Warp, argues that software factories must improve themselves, not just ship code, and shows three loops from Warp's own open-source factory. An outer-loop agent watches a GitHub triage agent, gathers feedback signals, and opens PRs that update its skill, so every change is tracked in git and reviewed by a human. Persistent memory stores give agents such as a Sentry root-cause agent versioned, traceable facts across harnesses. Model routing rules, checked by an eval sidecar that runs best-at-k across models, send cheap tasks like UI work to GLM instead of Opus."
---

# Building Self-Improving Agent Software Factories — Suraj Gupta, Warp

## Summary
Suraj Gupta leads harness development at Warp, which began as an agentic development environment born from a terminal, with about a million active users, and now builds a cloud agent platform called Oz for software factories. His thesis: much has been said about self-improving agents and about software factories, but less about how the factory itself gets better, faster and cheaper over time. He expects maintaining factories to become a core engineering job. He gives three concrete mechanisms.

**1. Skills improved by an outer-loop agent**
Skills give agents procedural memory, but they go stale as humans give feedback and agents learn in their own runs. Warp's fix is an outer-loop agent that watches the inner-loop agent's runs. The demo uses a triage agent in Warp's open-source client repo, which "is fully run as a factory." On each new GitHub issue, a workflow runs the triage agent to find missing information, dedupe against existing issues, or decide whether to build. The outer-loop agent then reviews the triage decisions, collects feedback signals (thumbs up or down, user comments, Warp staff comments), synthesizes them, and opens a pull request that updates the triage skill. Because changes go through git, you get full history of how the skill evolved, and a human reviews each update so the outer loop cannot make the triage agent worse.

**2. Persistent memory**
Skills hold procedures; memory holds everything else. Without it, a Sentry agent that already found a root cause may or may not find it again, and wastes tokens regathering context. A memory store is "a fact store scoped to an agent." An outer-loop agent extracts facts, learnings and outcomes from runs. In Oz, memories are versioned, editable and deletable by humans, and traceable to the run that produced them, so you can drop a memory that was a "local maxima." The demo agent reported that it used five stored memories to speed up a new root-cause analysis. Memory works across harnesses, including Warp's own and third-party coding agents.

**3. Model routing**
Running simple work such as triage or easy CI fixes on Opus gets "prohibitively expensive." Warp ships "auto models" that it re-evaluates for Pareto efficiency as new models appear. Users can also write routing rules in a config file, for example database migrations to GLM and runbooks and API docs to another model. He admits this is "more of an art than a science." Internally, an eval sidecar uses a best-at-k approach: it runs one prompt across several models in Oz and learns which classes of task each model handles well. One finding: UI tasks run well on GLM, so they do not need Opus. Warp plans customer-facing evals so teams can tune routing on their own workflows, not on generic public benchmarks.

## Why it matters
- Gives a concrete inner-loop/outer-loop pattern for self-improving skills, with PRs as the safety gate on agent-written skill changes.
- Separates procedural memory (skills) from factual memory (memory stores) and shows why the second saves tokens on repeat incidents.
- Treats model routing as a factory cost lever and shows a best-at-k eval method to pick models per task class.
- Stresses human control points: reviewed skill PRs, editable and traceable memories, and workflow-specific evals over public benchmarks.

## Metadata
- Video: https://www.youtube.com/watch?v=TN3mj92oZ8I
- Duration: 12:52
- Playlist index: 1203
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Um my name is Siraj Gupta. I lead Harness development at Warp. Um in case you haven't heard of Warp before, um we started off by building a state-of-the-art agentic development environment. Um we have about a million active users that use that. Um it was born out of a modern-day terminal. Um and nowadays we're building a um cloud agent platform to enable teams to build software factories. Um today I'm going to talk about um self-improving software factories, which I know might sound kind of buzzy, um but I'm going to break it down and hopefully you can walk out of here with something concrete that you can implement yourselves. Um you've probably heard of both of these terms,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TN3mj92oZ8I.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
