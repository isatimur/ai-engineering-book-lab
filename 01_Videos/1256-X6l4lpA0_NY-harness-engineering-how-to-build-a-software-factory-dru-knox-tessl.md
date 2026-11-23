---
video_id: X6l4lpA0_NY
playlist_index: 1256
title: "Harness Engineering: How to Build a Software Factory — Dru Knox, Tessl"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=X6l4lpA0_NY"
duration: "20:32"
duration_seconds: 1232
view_count: 65000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/X6l4lpA0_NY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T18:56:07+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dru Knox, head of product and design at Tessl, defines a software factory as a system where agents build the whole product and engineers build the factory. Teams climb three metrics in order: autonomy (how often humans must correct), automation (how much humans must review), then quality, which he argues ends up higher because backlogs vanish. Harness engineering builds three loops: a cheap inner loop before the PR, an expensive outer loop once it is up, and an outermost loop that mines logs and feedback. He explains why it is hard (fast-moving knowledge, unplanned work, illegible data) and what to build: control plane, agent access, improvement loops."
---

# Harness Engineering: How to Build a Software Factory — Dru Knox, Tessl

## Summary
Dru Knox is head of product and design at Tessl, which calls itself an agent enablement platform. His talk is for teams already running a few coding agent sessions at once, where agents usually get easy and medium tasks right. He says most of it is technique that works on any stack; the last part shows how Tessl packages it.

**What a software factory is**
A software factory is any agentic system where agents create the entire product shipped to users. Engineers "effectively become internal tool builders": they make the factory more autonomous, more automated and higher quality. Three metrics, in order:
- Autonomy: how much humans must correct or nudge the agent.
- Automation: how much humans must review before they accept the result. You can have high autonomy and low automation if agents one-shot tasks but you still review every line.
- Quality: user analytics, test quality, coverage.
Improve autonomy, then automation, while holding quality steady. Knox rejects the view that a little slop is worth a lot more features as short-term. The real payoff is that the backlog of bug fixes, test improvements and refactors disappears, so quality can rise.
**Harness engineering as three loops**
Harness engineering (lately also called "loop engineering") builds the loops that automate and improve the factory:
- Inner loop: while the agent works on a PR. Fast and cheap, run constantly. Improves autonomy.
- Outer loop: once the PR is up. Expensive, exhaustive checks that replace human verification, such as agentic QA or mutation testing of the test suite.
- The outermost loop: sits outside development, reads agent logs, PRs, issues and user feedback, finds mistakes that reached users or needed human correction, and feeds fixes back into the other loops. This is where you drive quality and how "AI native" you are.

**Why it is hard**
Three human problems. Knowledge moves so fast that teams "become an AI researcher" just to keep up, and best practices turn into anti-patterns within weeks. Harness work is unplanned work that competes with shipping, so teams skip it and stay stuck at a local maximum. And the signals you need sit in local agent logs, on someone's machine or in someone's head.

**Three layers to build**
1. Control plane. Make every agent touch point legible. At Tessl all work starts as an issue, goes to a headless agent in a sandbox, and comes back as a PR that engineers comment on. You need issue tracking that starts agent work, a review surface (GitHub PR review is easiest), and a way to distribute playbooks, usually a skills registry or shared repo.
2. Agent access. A "massive grab bag": CLI and API access, a way to click through the product, a written company brain of workflows, access to internal services (with governance), production logs (with compliance questions) and an execution environment. "I promise it's worse than you think."
3. Improvement loops, where most time goes: nightly or weekly repo sweeps, playbooks for common tasks such as adding a CLI feature, automating repeated tasks, and reviewing output quality to update skills.

**Tessl's product**
A governed skills registry, a Linear-to-GitHub connector and code review tools. An agent that mines PRs and issues for repeated work, such as a weekly flaky-test hunt, and turns it into a skill run by a GitHub action. One-click weekly maintenance scans. A launch command that runs any skill with a chosen coding agent in a permissioned sandbox that can open PRs.

**Metrics to track**
Fewer manual takeovers, fewer human PR comments, more PRs started without human input, and quality held, then raised.

## Why it matters
- The autonomy versus automation distinction separates agents getting it right from trusting them without review, two stages teams often merge.
- The inner, outer and outermost loop model gives a clear place for each check by cost and timing, from cheap per-iteration lint to PR-time mutation testing to log mining.
- It names why harness work rarely happens (it is unplanned and competes with deadlines) and proposes small incremental lifts instead of a big push.
- Making every agent touch point legible (issue to headless agent to PR) is a concrete prerequisite for any feedback loop that learns from agent mistakes.
- The success metrics (manual takeovers, human PR comments, PRs started without humans) give teams a measurable path toward a software factory.

## Metadata
- Video: https://www.youtube.com/watch?v=X6l4lpA0_NY
- Duration: 20:32
- Playlist index: 1256
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Quick introduction. My name is Drew Knox. I'm the head of product and design at Tessle. Tessle is an agent enablement platform. We help you go from scaling skills to building your own software factory. So today I'm going to talk about a few things. The core is going to focus on harness engineering which we see as sort of the new discipline of agentic development and how you can use it to ladder up to a software factory. So before we get started a few prerequisites. This is a bit of an advanced talk in the sense that like if you aren't already using coding agents what I'm about to walk through is probably not where you want to get started. So, I'm sort of assuming that if you're working with...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/X6l4lpA0_NY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
