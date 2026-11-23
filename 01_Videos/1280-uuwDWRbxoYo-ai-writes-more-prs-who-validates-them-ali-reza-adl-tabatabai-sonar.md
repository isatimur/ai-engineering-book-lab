---
video_id: uuwDWRbxoYo
playlist_index: 1280
title: "AI Writes More PRs. Who Validates Them? — Ali-Reza Adl-Tabatabai, Sonar"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=uuwDWRbxoYo"
duration: "11:34"
duration_seconds: 694
view_count: 10000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/uuwDWRbxoYo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T19:53:17+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ali-Reza Adl-Tabatabai, co-founder of an agentic PR-validation startup that Sonar acquired a month before the talk, argues that AI makes the CI-plus-code-review phase the new bottleneck: more and bigger PRs force teams to choose between slow careful review and rubber-stamping. His answer is an agent that reviews PRs, explains CI failures and flaky tests, auto-fixes issues in a loop until the PR is green, and then auto-approves and merges under user-defined rules. Users climb a trust ladder toward full automation, and he expects agents plus classic program analysis to beat either alone."
---

# AI Writes More PRs. Who Validates Them? — Ali-Reza Adl-Tabatabai, Sonar

## Summary
Ali-Reza Adl-Tabatabai co-founded a PR-validation startup and was its CEO until about a month before this talk, when Sonar acquired it. In this short sponsor talk he argues that the centralized validation phase, CI plus code review, is where AI-era software teams now lose time and money, and that an agent should run the whole phase.

**Why validation becomes the bottleneck**
The validation phase enforces security, compliance and quality gates, and it sits on the critical path to production. It is already slow at scale: long builds, asynchronous review across sites and time zones, fragmented tools held together by bespoke scripts, and a headcount-limited platform team. Failures here open an outer loop "measured in hours and days." AI makes it worse. Teams get more PRs and bigger PRs, so cost shifts right. The choice is grim: slow down and review every PR carefully, or "rubber stamp PRs" and risk production incidents.

**What the agent does**
- Reviews each PR and posts issues and inline comments, with a stated goal of being as noise-free as possible.
- Accepts custom rules, custom checks and custom workflow automations, and can block merge while findings stay unresolved.
- Analyzes CI failures, posts a root-cause summary, catches flaky tests, and can retry flaky tests automatically (he calls this a popular feature).
- Fixes review findings and CI failures, either on request or in a loop until the PR is green.
- Auto-approves and merges green PRs under rules the user defines.

**The trust ladder**
Users move toward full automation in steps. First they read reviews and learn the reviews are accurate. Then they "give teeth to the agent" by letting it block PRs. Then they use autofix. The newest step is rules for automatic approval and merge. Each step unlocks more value.

**Insights from processing every PR**
Because the agent sees every PR, it can categorize top CI failures (flakiness, infrastructure, other) for platform teams, and categorize landed PRs (features, fixes, chores, refactors) for leadership.

**Architecture**
Three parts: a control plane that orchestrates PR workflows; an in-house agent harness for multi-agent execution, context and memory management, tool calling and integrations; and an LLM proxy for model routing and failover. Owning the harness lets them tune token cost, precision and coverage for validation, which supports a fixed price per PR. After the acquisition they are combining the agent with SonarQube program analysis: taint, control-flow, data-flow and software composition analysis. His closing claim is that agentic validation plus algorithmic analysis will be better than either alone.

## Why it matters
- States the core economic problem of AI coding plainly: generation speed moves the cost into review and CI, and teams must either slow down or rubber-stamp.
- The trust ladder (review, then block, then autofix, then auto-merge) is a concrete adoption path for handing a gate to an agent one level at a time.
- The fix-until-green loop treats a passing PR, not a comment, as the agent's output, which is a useful definition of done for validation agents.
- The plan to pair agents with taint, control-flow and data-flow analysis is a clear example of mixing deterministic checks with LLM judgment.
- Fixed price per PR, enabled by a purpose-built harness, shows how owning the harness turns token cost into a product decision.

## Metadata
- Video: https://www.youtube.com/watch?v=uuwDWRbxoYo
- Duration: 11:34
- Playlist index: 1280
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Let's get started. Um, good afternoon everyone. I'm Ali and um, I'm one of the founders of guitar.ai AI and previously the CEO up until about a month ago where we were acquired by Sonar and now we are part of Sonar and you've heard a lot in the past few days about the importance of verification in the age of AI and so today I'm going to focus my talk on code and verifying code. So in in almost all software teams there is this centralized validation phase that is basically CI plus code review and as you scale your engineering this plays this phase plays a very critical part especially in an AI world. Uh first it enforces all your quality gates centrally. So these are security compliance code...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/uuwDWRbxoYo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
