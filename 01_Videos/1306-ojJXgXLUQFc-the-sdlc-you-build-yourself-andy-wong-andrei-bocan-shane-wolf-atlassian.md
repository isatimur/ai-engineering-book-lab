---
video_id: ojJXgXLUQFc
playlist_index: 1306
title: "The SDLC You Build Yourself — Andy Wong, Andrei Bocan & Shane Wolf, Atlassian"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ojJXgXLUQFc"
duration: "57:49"
duration_seconds: 3469
view_count: 11000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ojJXgXLUQFc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T20:53:20+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Andy Wong, Andrei Bocan and Shane Wolf of Atlassian argue that gains from AI coding tools are tapering, so the big opportunity is everything left and right of code: planning, orchestration, review and operations. A Wi-Fi-hobbled workshop tours the Jira coding agent, an AI reviewer with trained noise filters (about 40% comment resolution versus a 45% human baseline), prose standards, AutoDev that pulls agent-ready backlog tickets under WIP and cost limits, an incident agent, and a context engine that does agentic search over code across 15,000 repositories plus the teamwork graph."
---

# The SDLC You Build Yourself — Andy Wong, Andrei Bocan & Shane Wolf, Atlassian

## Summary
Andy Wong (four years at Atlassian, two and a half in AI), Andrei Bocan and Shane Wolf, a manager in Atlassian's developer space, run a workshop on how agents change the software development life cycle. Their premise: as AI coding tools multiply, the productivity gains from them taper, so Atlassian's biggest opportunity is "everything left and right of code." The hands-on part, a Jira coding agent sandbox, was mostly blocked by venue Wi-Fi, so much of the session became product walkthrough and Q&A.

**The product map**
- **Jira coding agent:** plans and implements a Jira ticket using organizational context from Jira, Confluence, Slack and email. Tickets can also go to third-party agents. It runs in a hosted container sandbox with Docker, can open a browser, and checks the ticket's acceptance criteria if the repo explains how to run things. Model choice sits at the top of the harness; skills and subagents can pin their own model. Smart routing is not shipped.
- **AI reviewer:** reviews PRs on GitHub, GitLab or Bitbucket Cloud against requirements and centrally managed standards. The team trained its own models to filter low-value, nitpicky comments, and reports about 40% human comment resolution, against a human baseline of 45%. Standards are prose in markdown; an attendee's request for deterministic, CI-style checks was taken as a feature idea.
- **AutoDev:** scans the backlog for tickets agents can do autonomously and opens PRs, with limits on credits, tickets per user and repos.
- **Incident agent:** pulls context from past incidents, Jira and Confluence to propose root-cause theories and remediation in Slack.
- **AI planner:** checks whether an idea is feasible in a repo and breaks it into an implementation plan.

**AutoDev design lessons (Bocan)**
AutoDev aims to give teams capacity back for feature work and to make codebases "agent ready" in a light-touch way. Key choices: work-in-progress limits (for example three to five PRs per person per week), because "nobody wants to spend time reviewing 50 PRs a day." Underspecified tickets that say only "do the thing" go to a human to specify first. Review is "where things go to die," so AutoDev nudges reviewers in Slack at the right time. Cost caps per ticket and per week are table stakes. Standards work two ways: the reviewer covers new code, and AutoDev brings old code into compliance with small, low-churn PRs. He calls large migrations across many similar services "organizational steering."

**The context engine**
Atlassian has about 15,000 repositories, so "where is X implemented" is hard. The engine is agentic search: it narrows the search space to where the answer likely lives in code, digs in, then layers on the teamwork graph of docs and tickets. Code is the current truth; docs are stale snapshots but keep the reasons behind past decisions, which agent-written code often loses. Fast on-demand code context let teams keep product repos instead of paying the tooling debt of a monorepo. Conflicting sources are resolved by favoring recent content and by a human-applied verified badge in Confluence, since automated authority is risky. A teamwork graph CLI exposes these capabilities to other agents.

## Why it matters
- Names a strategic shift: when code generation is commoditized, value moves to planning, review, orchestration and operations around the code.
- AutoDev's WIP limits, human-in-the-loop specification and Slack nudges are concrete fixes for review becoming the bottleneck in autonomous workflows.
- The noise-filtered reviewer gives a citable metric for AI review quality: comment resolution rate measured against a human baseline.
- The context engine argument (code as truth, docs as decision history, human verification for authority) is a clear model for enterprise agent context.
- Using standards in two directions, reviewer for new code and progressive low-churn PRs for legacy code, is a reusable pattern for agent-driven migrations.

## Metadata
- Video: https://www.youtube.com/watch?v=ojJXgXLUQFc
- Duration: 57:49
- Playlist index: 1306
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Welcome everybody. Welcome to the AI Engineers World Fair. Uh thank you everyone for joining for our workshop today. Quick introduction for myself. My name is Andy Wong. I've been working at Alaskan for four years now and I've been working in the AI space for two and a half. Joining me today are two of my wonderful teammates. We have Shane Wolf uh manager down in Devi space as well as Andre Bohan down here as well. So today we're just going to go over a lot of the things how how the agentic systems are kind of changing how we are uh handling the software development life cycle and how orchestration does change everything. Can you repeat? >> Yeah, he's Shane just is gonna walk around give...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ojJXgXLUQFc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
