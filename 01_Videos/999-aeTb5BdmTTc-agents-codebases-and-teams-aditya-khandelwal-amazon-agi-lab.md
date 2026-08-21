---
video_id: aeTb5BdmTTc
playlist_index: 999
title: "Agents, codebases, and teams — Aditya Khandelwal, Amazon AGI Lab"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=aeTb5BdmTTc"
duration: "16:57"
duration_seconds: 1017
view_count: 2600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/aeTb5BdmTTc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-14T11:36:11+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Amazon AGI Lab's Aditya Khandelwal argues team-scale coding-agent adoption is a leadership problem, citing his team's shared 'ship' skill and concrete token-burn diagnostics."
---

# Agents, codebases, and teams — Aditya Khandelwal, Amazon AGI Lab

## Summary
Aditya Khandelwal (Amazon AGI Lab), who led a team of about 10 engineers, argues that agent setups which work for a single repo or individual routinely break at team scale, and traces an "enterprise journey" from early outsized individual leverage, to company-wide mandates and "token maxing," to AI-slop incidents and cost-driven pullback — framing team members along two axes: fear (job-security anxiety) and confidence/utilization of the tools. He lists concrete symptoms of a broken setup — engineers babysitting agents, blaming "the model got dumber" when only the harness changed, sessions silently burning context from roughly 500k to 750k tokens and hitting auto-compact on simple tasks, and a growing "slop factory" — and argues this is a leadership problem, not an individual one, because left unmanaged it splits a team into people shipping ten PRs a day and people stuck reviewing that output while shipping one or two themselves. His playbook rests on three practices: harness engineering per codebase (e.g., keeping runbook-style documentation in code comments so an agent that greps into a file finds the context it needs), a closed self-healing loop to continuously catch and remove slop, and treating adoption as an ongoing human-management problem rather than a one-time rollout. Concretely, his team codified their best ICs' practices, capped skill.md files at roughly 100 lines (treating a skill as a folder with a thin index), built one high-leverage shared skill called "ship" that automated the entire path from finished code to a reviewable PR including CI-failure handling — an hour-plus run that won over skeptics once they saw it worked — and wired a nightly "code gardener" agent plus issue/board integration into CI/CD to keep the codebase organized. He also reports failure modes along the way, including issue counts exploding to 400-500 within a couple of weeks because uncoordinated agents opened issues on their own, and reframes long agent run times as a good sign rather than a problem, recommending teams watch first-prompt token burn (roughly 20-25k tokens as a healthy baseline, 40-50k as a red flag) as a concrete progressive-disclosure health check.

## Why it matters
- Reframes coding-agent adoption as an organizational/leadership problem rather than an individual-tooling problem, with a concrete failure mode (uneven PR throughput splitting a team into shippers and reviewers) directly useful for a chapter on team-scale agent rollouts, distinct from single-developer productivity narratives.
- Gives specific, measurable health signals for agent setups (first-prompt token-burn thresholds like 20-25k vs. 40-50k, auto-compact from 500k to 750k tokens on simple tasks, skill.md capped at ~100 lines) — concrete diagnostics rather than vague "it feels off."
- Documents a real internal tooling pattern (a shared "ship" skill automating code-to-PR-ready, a nightly "code gardener" agent, wiring issues/boards into CI/CD) and its actual failure mode (issue counts exploding to 400-500 within weeks from uncoordinated agents) — a grounded case study of what breaks when agent workflows scale to a team.

## Metadata
- Video: https://www.youtube.com/watch?v=aeTb5BdmTTc
- Duration: 16:57
- Playlist index: 999
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Today, I'm going to be talking about agents code bases and teams. Essentially, how do you get your team to actually ship together with agents? And like, I think for the longest time, like the one thing that's bugged me is like there's so much content about, you know, how do you set up your own code base to like work well with agents, you know, like what skills do you add? You know, this skill's better, that setup's better. But it all seems to break the moment you like actually try to use it with your team in your actual production setup. And like for individual repos, it kind of makes sense. But the moment you actually try to use it with your own like team setup, it tends to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/aeTb5BdmTTc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
