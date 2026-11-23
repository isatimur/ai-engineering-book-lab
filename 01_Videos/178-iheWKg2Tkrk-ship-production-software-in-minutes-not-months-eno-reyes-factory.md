---
video_id: "iheWKg2Tkrk"
playlist_index: 178
title: "Ship Production Software in Minutes, Not Months — Eno Reyes, Factory"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=iheWKg2Tkrk"
duration: "16:06"
duration_seconds: 966
view_count: 5849
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/iheWKg2Tkrk.txt"
themes:
  - "Org Design & Leadership"
  - "Coding Agents"
ingested_at: "2026-04-24T11:42:38+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eno Reyes of Factory argues that software is moving from human-driven to agent-native development, where teams delegate most work across the whole life cycle to agents (droids), not only coding. His core claim: agents usually fail because they lack context, not because the model is weak. So the work is feeding them standups, meeting transcripts, design docs and incident history. He shows droids that plan before acting, turn three months of customer transcripts into a PRD and eight parallel tickets, and turn a Sentry alert into a root-cause analysis. Documentation becomes a map that agents learn your team's thinking from."
---
# Ship Production Software in Minutes, Not Months — Eno Reyes, Factory

## Summary
Eno Reyes of Factory started working on LLMs about two and a half years earlier, when GPT-3.5 came out. In this 16-minute talk he argues that the industry is "transitioning from the era of human-driven software development to agent-driven development." Most current tools, he says, are 20-year-old human tools with AI sprinkled on top: faster horses. The real gain comes only when a team delegates the majority of its tasks across the software life cycle to agents.

**What that requires**
He names four platform needs: an intuitive interface for managing and delegating tasks, centralized context from all engineering tools, agents with reliable output, and infrastructure for thousands of agents in parallel. He pushes back on vibe coding: "You can't vibe code a legacy Java 7 app" that runs 5% of global bank transactions. Agents are climbing gear for Mount Everest, not a replacement for human skill.

**Context is the failure mode**
Factory studied thousands of droid sessions. The pattern: agents fail most often because they miss crucial context, not because the LLM is weak. Better models help, but the fix is giving the agent the morning standup, the whiteboard photo, the meeting notes. He calls prompt engineering mental modelling of "this alien intelligence" that holds only a slice of the world.

**A delegated task, step by step**
In the demo, a droid grounds itself first. It searches the codebase, checks the git branch and the machine, reads recent changes, and recalls user-level and org-level memory. Then it returns a plan with clarifying questions, writes code, runs pre-commit hooks and lints, and opens a PR that passes CI. Reyes wants agents that question the request, not take it at face value.

**Planning as delegated research**
The hardest part of software is deciding what to build. For a cloud development environment feature, Factory fed three months of customer transcripts, an ad hoc meeting note and architecture docs to a knowledge droid. They did not ask it to plan the feature. They asked it to find patterns that match their assumptions and to flag technical limits. Four or five intermediate documents became a PRD, then a roadmap of eight dependent tickets for eight code droids. PRDs, design docs and RCA templates stop being a burden. They become "a knowledge base and a map" for droids.

**Incident response**
A droid turns a Sentry incident into an RCA and mitigation plan by pulling logs, past incidents, runbooks and Slack threads. Reyes says teams cut response time in half, see fewer repeat incidents because the droid suggests a fix the third time, and onboard faster. He says the acceptable time to act should be zero.

**Enterprise close**
Factory positions itself as an enterprise platform: audit logs, ownership and indemnification matter, and "yolo mode" does not belong inside an enterprise.

## Why it matters
- It gives a field-tested diagnosis that agent failures come mostly from missing context, which moves the fix from model choice to context plumbing.
- The planning workflow shows how to ask agents for analysis (patterns, constraints), not finished answers, before a human writes the PRD.
- Reframing documentation and meeting transcripts as agent training material gives teams a concrete reason to write down why decisions were made.
- The move from the inner loop to the outer loop is a useful lens on how senior engineers' work changes with agents.
- It raises the accountability question, who owns the outcome when an agent runs a destructive command, as a gate for enterprise adoption.

## Metadata
- Video: https://www.youtube.com/watch?v=iheWKg2Tkrk
- Duration: 16:06
- Playlist index: 178
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] Hi everybody, my name is Eno. I really appreciate that introduction. Um, and maybe I can start with a bit of background. Uh, I started working on LLMs about two and a half years ago. uh when uh GBT3.5 was coming out and it became increasingly clear that agentic systems were going to be possible with the help of LLMs. At factory we believe that the way that we use agents in particular to build software is going to radically change the field of software development. We're transitioning from the era of human-driven software development to agent-driven development. You can see glimpses of that today. You guys have already heard a bunch of great talks about different ways that agents can...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/iheWKg2Tkrk.txt]]
- Description cue: Planning, coding, testing, monitoring—the endless cycle that spans 10+ tools that fragment our focus and slows delivery to a crawl. Vibe coding doesn't work when you've got 10TB of code....

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Coding Agents**.
