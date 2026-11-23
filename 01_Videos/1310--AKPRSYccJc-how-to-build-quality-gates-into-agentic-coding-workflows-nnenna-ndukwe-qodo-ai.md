---
video_id: -AKPRSYccJc
playlist_index: 1310
title: "How to Build Quality Gates into Agentic Coding Workflows — Nnenna Ndukwe, Qodo AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-AKPRSYccJc"
duration: "57:45"
duration_seconds: 3465
view_count: 4300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-AKPRSYccJc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T21:02:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nnenna Ndukwe, developer relations lead at Qodo, runs a hands-on workshop arguing that code quality can break down at every SDLC phase, so teams must define quality, codify it as rules and skills in a shared context layer, and verify against the same standards early and often. On a FastAPI payments repo, a coding agent picks relevant rules, writes a structured plan with skill handoffs and TDD, passes deterministic local gates (linters, static analysis, conventional commits), then an AI PR review with severity-ranked rule violations feeds a resolver skill that auto-fixes and re-verifies."
---

# How to Build Quality Gates into Agentic Coding Workflows — Nnenna Ndukwe, Qodo AI

## Summary
Nnenna Ndukwe is developer relations lead at Qodo, a former full-time software engineer, and describes Qodo as an AI code review platform now expanding into code quality and governance across the SDLC. Her workshop walks through a structured AI coding process on a forkable repo, a small self-contained FastAPI payments API. Her parting advice: even if you do nothing else, ask your AI to analyze the repo's structure and borrow what fits your own workflow.

**The thesis**
Code quality can break down everywhere: planning, development, review, testing and deployment. So build "qualitydriven systems" with verification built in. Step one is to define what code quality means for your team. Step two is to codify it somewhere every interface (CLI, IDE, CI) can pull from, either in the repo or in a shared context management layer. Then verify "early and often," ideally against the same standards in every phase.

**The repo and its gates**
The repo holds an AGENTS.md file, a hidden plan directory, rules, skills, docs, tests, static analysis config and a CI workflow. The task is deliberately small but risky: add a refund workflow or capture-retry handling, because payment mutations are where AI code can look "plausibly correct" and still break things. The gates:
- **Standards gate:** the agent reads the rules and explains which ones apply to this change.
- **Planning and TDD gate:** a high-level plan plus a build-session execution plan. The template covers summary, problem, constraints, skill routing, scope, behavior scenarios, verification gates, failure and recovery rules, commit plan, starting state and definition of done, and it names the first implementation skill and the TDD prompt chained after it. Her finding: the more detailed and consistent the plan, the better the agent adheres and self-corrects.
- **Local verification gate:** linters, a type checker, a security scanner, tests, static analysis and conventional commits as "deterministic evidence." She is "a huge believer" in combining deterministic tools with AI, and says always run a local code review before another developer sees the code.
- **PR review and remediation gate:** the AI reviewer applies the same rules and skills, findings are fixed or documented as deferred, and verification reruns.

**Rules as managed assets**
In the Qodo portal, rules are ingested from a repo's rules directory or suggested from conventions inferred from the codebase, with good and bad examples for a human to accept. Each rule has a category (accessibility, correctness, maintainability, architecture, security) and a severity; high-severity findings can block merge. Her example: a docstring rule flagged as action required because her org set it that way. Attendees pressed on whether rule selection is deterministic; she says regulated enterprise customers want exactly that, and she is pushing for it.

**Results**
On the demo PR the review invoked five skills and found one bug (refund idempotency stored in a process-local dictionary, which is not durable), three rule violations and two skill insights. A resolver skill pulled the findings and auto-fixed all six, then reran verification and posted a fix summary to the PR. On an intentionally large PR for her own open-source tool, the full workflow left only one reliability bug for review to find. She also credits audit skills from Aaron Francis (boundaries, drift, names, abstractions, dead code, errors), points to a separate tool for evaluating skills, and names Packmind as an open-source context-layer option.

## Why it matters
- Gives a complete, copyable quality-gate sequence for agentic coding: rules selection, structured plan, TDD, deterministic local checks, AI review, automated remediation, re-verification.
- The planning template, with skill routing and an explicit implementation-skill handoff, is a concrete artifact for keeping long agent runs on track.
- Treats standards as managed assets with categories and severities, which lets teams decide which rule violations block a merge.
- Surfaces an open problem from the audience: AI choosing which rules apply is non-deterministic, and regulated industries want determinism.
- The idempotency bug in a payment refund is a clear example of the plausible-but-wrong code that gates exist to catch.

## Metadata
- Video: https://www.youtube.com/watch?v=-AKPRSYccJc
- Duration: 57:45
- Playlist index: 1310
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Um, so my name is Nana Andukquay and I am uh developer relations lead at Kodto. We're we used to be just like an AI code uh code review platform but now we're kind of expanding beyond that. that's all about code quality and governance across the software development life cycle. And I've spent a lot of time um thinking about and working on like what does a structured AI coding uh process look like. There are many different ways that we're all doing it. I would love to hear from y'all especially towards the end of this. But I'm just going to have what I want is to walk through what that can look like. There's a repo I have that everyone can fork. And if you do nothing else from this, ask your...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-AKPRSYccJc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
