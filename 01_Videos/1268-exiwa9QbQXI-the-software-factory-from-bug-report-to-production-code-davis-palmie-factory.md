---
video_id: exiwa9QbQXI
playlist_index: 1268
title: "The Software Factory: From Bug Report to Production Code — Davis Palmie, Factory"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=exiwa9QbQXI"
duration: "18:32"
duration_seconds: 1112
view_count: 18000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/exiwa9QbQXI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T19:24:16+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Davis Palmie, member of technical staff at Factory, describes the software factory: a system of agents that turns input signals such as bug reports and user feedback into production code, while engineers govern guardrails, catch drift and set direction. Coding was never the bottleneck; review, bug reproduction, stale docs and team silos are. He argues for model-agnostic, sovereign, SDLC-wide factories, an incremental rollout that starts with narrow, verifiable incident triage, eight agent-readiness pillars, and outcome metrics such as signal-to-production time and cost per PR instead of token leaderboards."
---

# The Software Factory: From Bug Report to Production Code — Davis Palmie, Factory

## Summary
Davis Palmie is a member of technical staff at Factory. He co-founded an agent platform for investment teams that went through Y Combinator and was acquired by Factory, and before that led engineering at Slalom's innovation lab. His subject is the software factory: an autonomous system that turns input signals into production code.

**Climbing the abstraction ladder**
AI engineering has moved from tab autocomplete, to whole-file generation (the engineer as "discerning copy paster"), to agents that gather context, call tools and debug their own output. Next is whole systems. Each step up has made engineers more valuable. Engineers now move from typing code to governing agents, and then to organising agents into a factory. Their job becomes tight guardrails, catching code drift and setting priorities, while the system ingests bug reports and feedback and outputs code.

**Coding was never the bottleneck**
Look at median PR review time, time to reproduce bug reports, who keeps docs current, who maintains tests. The time from code written to code in production dwarfs the time spent writing it. Docs go stale, dead code lingers, and testing, engineering and product teams sit "on their own continent". That lack of cohesion hurts humans and hurts agents more. The factory must bridge all of these services.

**Start narrow**
A full factory has agents triaging incidents, planning, updating docs, coding, reviewing, testing, rolling out and monitoring. Do not start there. Begin with something narrow and verifiable, such as incident triage: the agent reads a Sentry alert, pulls traces and posts a diagnosis in Slack for engineers to judge. As correct diagnoses accumulate, trust grows. Automate each pillar before you let the pipeline loop. Once outputs tie back to input signals, the organisation can improve itself.

**Three principles**
- Model agnostic. Factory found GPT 5.2 matches the latest Opus models on code review at half the price, and open-source models can be 10 to 30x cheaper. Match model to task: for an algebra tutor, you can find someone cheaper than Albert Einstein.
- Sovereign deployment: fully managed, bring your own machine, or air-gapped.
- Integrated across the SDLC: docs inform code and code informs docs; planning goals inform tests.

**Enterprise case**
Common patterns: agent diagnosis before a human answers the page, proactive secret and vulnerability scans, test maintenance, docs kept in sync with code and meetings, PR review, rollouts and release monitoring. Improvements are transitive across teams. Fragmented organisations feel linear pain; define guardrails, docs and testing policy once and the factory turns that pain from O(n) to O(1), pulling everyone to the highest bar. Agents should be surface-agnostic (remote machines, CLI, Slack) but share one harness and context.

**Agent readiness: eight pillars**
Validation (linters, formatters), build system (documented commands and CI), feedback loops (unit and integration tests), docs (READMEs, agents.md), reproducible dev environments, modular code with rules against sprawl, observability, and proactive security scanning. If agents and humans "walk the same roads, paving them well is doubly useful."

**Governance and metrics**
Every action is auditable, with role-based access and least privilege. "Precise execution does not prevent poor design": humans still own architecture, strategy and direction, and act as validation gates. Measure outcomes, not tokens. Lines of code and token leaderboards are gameable and reward "profligate spending". Factory prefers signal-to-production time, human intervention count, median time to repair, code shelf life and cost per PR.

## Why it matters
- It relocates the bottleneck: review, reproduction, docs and cross-team handoffs, not code writing, dominate time to production.
- The 'start with incident triage' advice gives a concrete, low-risk first pillar that builds trust before any loop closes.
- The eight agent-readiness pillars work as an audit checklist that also improves the codebase for human engineers.
- The GPT 5.2 versus Opus code review result (same quality, half the price) supports routing models per task rather than backing one lab.
- The outcome metrics (signal-to-production time, intervention count, cost per PR) offer an alternative to token-spend leaderboards, which he calls gameable.

## Metadata
- Video: https://www.youtube.com/watch?v=exiwa9QbQXI
- Duration: 18:32
- Playlist index: 1268
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hey folks, I'm Davis Palmy, a member of technical staff here at factory. Uh before this I co-founded Lummetric which was an agent platform for investment teams that we took through Y Combinator and was acquired by factory and prior to that I was a engineering lead for Slalom's innovation lab. So I've seen AI deployments both across large enterprises and more AI native orgs. With that in mind, today I'm going to be talking to you about the software factory and how you can move towards an autonomous system that translates input signals into production code. So, first we've moved through three distinct eras of AI engineering. First, we had tab autocomplete, next token prediction, and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/exiwa9QbQXI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
