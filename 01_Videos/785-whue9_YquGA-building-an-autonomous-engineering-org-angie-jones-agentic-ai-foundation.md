---
video_id: whue9_YquGA
playlist_index: 785
title: "Building an Autonomous Engineering Org - Angie Jones, Agentic AI Foundation"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=whue9_YquGA"
duration: "17:36"
duration_seconds: 1056
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/whue9_YquGA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:26+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Angie Jones describes moving Block's 3,500-person engineering org from 90% AI tool use with no faster shipping to an autonomous org. She defines a six-stage maturity model (0 to 5), applies the 1-9-90 rule by picking about 50 AI champions who spend 30% of their time making repos AI ready, and lets anyone delegate work to the Goose agent from Slack, Jira, Linear or GitHub. After three months, AI-authored code rose 69% and automated PRs 21x. Codex review with an auto-fix loop, isolated cloud workspaces, an orchestrator called Builder Bot and a world model of 25,000 repos reached stage five. She ends with a layoff and the question of where this leads."
---

# Building an Autonomous Engineering Org - Angie Jones, Agentic AI Foundation

## Summary
Angie Jones spent two years turning Block's 3,500-person engineering org into an autonomous one. Block started early: it built Goose, its internal coding agent, before LLMs supported tool calling, was a design partner with Anthropic on the first MCP release, and Goose became the reference MCP client. Within months about 90% of engineers used Goose or Claude Code. Yet the CEO believed engineering was not using AI at all, because nothing shipped faster. Jones had the metrics and token bills to prove usage, but admits he was right about outcomes.

**Defining the target**
She frames AI enablement in three phases: experimentation, adoption, impact. After leading enablement for all 12,000 employees in the first half of 2025, she was asked to build an agentic engineering org: one where engineers use agents as their primary means of producing outcomes, decomposing, delegating, reviewing and verifying. Her maturity model, reshaped after Steve Yegge's Gastown article: stage 0 no AI, 1 autocomplete, 2 chatting with agents but no PRs, 3 delegating tasks and reviewing output, 4 running agents in parallel, 5 delegating complete tasks with shippable results. Most engineers sat at stages one and two.

**The 1% strategy**
Fast-changing best practice, AI fatigue and resentment of top-down pressure ruled out leveling up everyone. Using the 1-9-90 rule of online communities, she hand-picked about 50 AI champions from critical repos across Square, Cash App, Afterpay and Tidal. Each had to give at least 30% of their time and tolerate non-determinism.

**Stage three: AI-ready repos**
Champions embedded AI into repos so the whole team benefits. Monorepos got shared context and rules at the root with service-level layers; web and mobile, even Android and iOS, needed different approaches. Teams chose their own tools, then converged. The standard kit: context files (agents.md or claude.md), rules files as guardrails, slash commands and later skills, an AI code reviewer with instructions, and AI attribution on PRs.

**Delegation where work already arrives**
Champions wired agents into Jira, Linear, GitHub issues and Slack. In one Slack thread, an engineer tagged Goose about a bug; it confirmed the bug, offered three fixes, and opened a PR for the chosen one, all in about five minutes. Teams assigning tickets to agents ran out of sprint work twice. Three months in: AI-authored code up 69%, reported time savings up 37%, automated PRs up 21x.

**Stage four and five**
Parallel agents tripled or quadrupled PRs and choked review. Codex was enabled on all repos, with an auto-fix loop where another agent fixes the issues Codex finds and commits them. Laptops ran out of memory, so each agent got an isolated cloud workspace. Engineers running four or five agents built an orchestrator, Builder Bot, plus a company world model: a machine-readable map of every service across 25,000 repos, so agents can explore in parallel and plan across code bases. Anyone at the company could then ask the bot in Slack to fix a bug or build a feature, without GitHub.

**The ending**
Then came a layoff. Jones asks whether enabling people to do their best work led to their dismissal, and leaves the audience with: what are we doing, and where are we heading?

## Why it matters
- Gives a concrete six-stage maturity model for how engineers relate to agents, useful for measuring adoption beyond tool-usage numbers.
- Documents the gap between high AI usage (90%) and zero delivery impact, and the specific moves that closed it: repo readiness and delegation from existing ticket and chat channels.
- The champions approach (about 50 hand-picked engineers at 30% time) is a reusable rollout pattern grounded in the 1-9-90 participation rule.
- Lists the infrastructure that parallel agents demand: AI review with an auto-fix loop, isolated cloud workspaces, an orchestrator, and a world model of service dependencies.
- Raises the human cost directly, which gives any chapter on autonomous engineering orgs a first-hand counterweight to the productivity numbers.

## Metadata
- Video: https://www.youtube.com/watch?v=whue9_YquGA
- Duration: 17:36
- Playlist index: 785
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> So, I've spent the last couple of years transforming Block's 3,500-person engineering org into an autonomous one. And this is a challenge that most tech companies are actively trying to solve or will be in the very near future. So, today I'll share our path to getting there. Our agentic coding journey started very early. We were building Goose, our internal coding agent, even before the LLM supported tool calling. We worked with Anthropic as design partners for the initial release of MCP, and Goose became the reference implementation for the MCP client. So, internally, our most curious engineers were some of the very first in the industry to use these types of coding agents. After a couple...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/whue9_YquGA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
