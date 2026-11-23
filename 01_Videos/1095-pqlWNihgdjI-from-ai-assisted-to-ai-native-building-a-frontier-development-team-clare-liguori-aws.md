---
video_id: pqlWNihgdjI
playlist_index: 1095
title: "From AI-Assisted to AI-Native: Building a Frontier Development Team — Clare Liguori, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pqlWNihgdjI"
duration: "20:57"
duration_seconds: 1257
view_count: 156000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/pqlWNihgdjI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T02:06:54+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Clare Liguori, senior principal engineer at AWS working on the Kiro coding agent, reports Amazon pilots where 'frontier developer' teams reached a median 4.5x gain in deployment velocity, sometimes over 10x. Bedrock Mantle rebuilt an inference data plane with six people in 76 days against a 30-person, 18-month estimate. In a 50-team Amazon Stores pilot, the gap came from changing how teams work, not from tools. Five habits: invest in agent context, slow down to speed up, feed agents instead of babysitting them, make intent explicit through specs, and shift testing left with local mocks. Risks: burnout, rolling out too broadly, and decision speed as the new bottleneck."
---

# From AI-Assisted to AI-Native: Building a Frontier Development Team — Clare Liguori, AWS

## Summary
Clare Liguori is a senior principal engineer at AWS who mostly works on Kiro, Amazon's agentic coding assistant. She traces the path from inline completion to chat to vibe coding, each of which made her feel only 10 to 20 percent more productive. Now Amazon pilots show a median 4.5x productivity gain and sometimes more than 10x. Her thesis: the step change comes from intentionally changing how you work, not from the tools.

**What a frontier developer does**
Three behaviors: hands-off coding (they write maybe 1 to 2 percent of the code; agents write the rest), infrequent interaction (agents run for up to hours without intervention), and minimal idle time (several agents in parallel churn through a backlog).

**Three experiments**
- Bedrock Mantle: the Bedrock team needed a new inference data plane, estimated at 30 people over 18 months. Six people built it in 76 days with Kiro, up to a 20x gain measured by commits. But the six included two distinguished engineers, so many teams saw it as unachievable.
- Prime Video: six engineers in a 10-day sprint cut a project estimate from 90 weeks to 24. But they had no on-call, few meetings, and a senior engineer had spent three weeks writing small, well-scoped tasks first.
- Amazon Stores: a structured pilot watched 50 ordinary teams with mixed seniority on existing, brownfield systems for most of last year, measuring deployment velocity to production. Half got under 3x; the rest got a median 4.5x and sometimes over 10x. About 90 percent used Kiro, so the tool was not the difference. The winners changed how they worked; the others "sprinkled" tools on top of old habits.

**Five habits**
1. Invest in agent context. Write down what used to live in Slack, onboarding and code review. Each time the agent errs, ask what is missing in skills or steering files. As models improve (fewer "do nots" needed than with Sonnet 3.7), ask whether old rules now just bloat context.
2. Slow down to speed up. Almost every team's productivity first went down. They built agent context, improved tool error messages, built MCP servers, restructured code for navigation, and some moved from untyped Python or JavaScript to TypeScript or Rust for compiler feedback.
3. Feed agents, do not babysit them. Back-and-forth chat keeps you in the loop and blocks parallel work. Give the agent the task and the way to self-validate (compiles, passes tests, coverage), then put that in the steering file.
4. Make intent explicit. Amazon uses behavior-driven development. For ambiguous features, iterate with the model on a generated specification, which is easier than iterating on code spread across a codebase.
5. Shift testing left. Linters plus unit, integration, performance and security tests give fast feedback, and the ROI is finally high enough. Teams build local mock services with deterministic responses so agents can run every loop on a laptop.

**What is still hard**
Burnout is real: engineers stay up late perfecting prompts for overnight runs, and running parallel agents raises cognitive load. Reviewing AI output can be harder than writing it, especially for early-career engineers. Leaders must accept the initial slowdown instead of asking why teams are not faster. Rolling out too broadly too fast would have skipped the learning; Amazon's 2026 task is scaling from 50 teams to the next 2,000. New bottlenecks appear: when code takes one to two months, two months to decide and two months to approve a launch become the long pole. Frontier teams often spend more time on decisions than code, so fast, reversible decisions matter.

## Why it matters
- Gives rare enterprise data: a 50-team brownfield pilot measured on deployment velocity, not commits, with a median 4.5x for teams that changed how they worked.
- Each success story comes with its caveat (distinguished engineers, a sheltered sprint), which helps a chapter separate achievable gains from showcase results.
- The five habits are concrete and testable, especially 'feed, don't babysit' and local deterministic mocks for fast agent feedback.
- Names the J-curve: productivity drops before it rises, and leaders must budget for that.
- Points to decision speed and launch review as the next bottleneck once code is cheap.

## Metadata
- Video: https://www.youtube.com/watch?v=pqlWNihgdjI
- Duration: 20:57
- Playlist index: 1095
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> My name is Claire La Gory and I'm a senior principal engineer at AWS. I mostly work on Kuro, our agent encoding assistant, but today I want to talk about some of the practices we've been seeing inside of Amazon and Amazon teams where we've been seeing really exciting results of productivity increases that are step function improvements since what what we've been seeing with AI so far. So, I've been working on agentic AI for over 3 years now and I've kind of seen the evolution that's happened in our industry when it comes to coding assistance with AI. First, we had this inline code completion helping us to write the next line, maybe the next function. We moved on to chat, asking...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pqlWNihgdjI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
