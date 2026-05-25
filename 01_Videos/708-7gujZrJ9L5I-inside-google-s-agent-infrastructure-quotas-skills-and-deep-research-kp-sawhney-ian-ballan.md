---
video_id: 7gujZrJ9L5I
playlist_index: 708
title: "Inside Google's Agent Infrastructure: Quotas, Skills, and Deep Research — KP Sawhney, Ian Ballantyne"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7gujZrJ9L5I"
duration: "25:13"
duration_seconds: 1513
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/7gujZrJ9L5I.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:54+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "KP Sawhney (software engineer on DeepMind's AI platform team) and Ian Ballantyne (developer relations, Google DeepMind) give a rare view inside Google's internal agentic infrastructure: a custom harness called Antigravity, a skills library curated Darwinian-style (only the best survive), a custom observability web app with agent trajectory stores, and the ongoing work to extend the Deep Research pipeline into a shared-filesystem collaborative agent system. The candid admission: quota management is the top infrastructure problem — even Googlers hit hard limits, and the subscription pricing model doesn't work for token-hungry agentic workflows."
---

# Inside Google's Agent Infrastructure: Quotas, Skills, and Deep Research — KP Sawhney, Ian Ballantyne

## Summary

KP Sawhney is a software engineer on DeepMind's AI platform team; Ian Ballantyne is a developer relations engineer at Google DeepMind. The session is a panel-style Q&A with a live demo of Antigravity — Google's internal agent harness — and a discussion of how DeepMind actually uses and scales agentic systems internally.

**Antigravity: the internal harness**

Antigravity is a VS Code-style IDE with an agent manager built into it. You can spawn multiple agents working on different projects from within the same interface. It includes:
- A planning system (implementation plan presented before execution, editable by the human before proceeding)
- Browser control (the agent can open a browser, inspect the DOM, take screenshots, verify feature behavior visually)
- A scratchpad for agent notes during task execution — a trace of what the agent is figuring out in real time
- Video/screenshot capture of agent-driven browser interactions

In the demo, the agent rewrites a game from scratch based on a spec, spawns a browser to run it, then inspects the DOM to debug behavior. KP's day-to-day focus is now generalizing Antigravity beyond coding — particularly the Deep Research pipeline.

**The skills library — Darwinian curation**

Google has built a large library of skills internally that help engineers do their jobs faster. The problem at Google's scale: skills sprawl. KP's current focus is making the skills library self-curating — only the best skills survive, with contributions from domain experts who are also the people best positioned to maintain them. The model: expert contributes a skill for their area, everyone else (and their agents) gets that expertise for free.

**Deep Research and the shared filesystem direction**

KP worked on the Deep Research agent (now available via the Gemini API). Current architecture passes large blobs of text through the research pipeline. The new direction: restructure Deep Research so different pipeline stages collaborate via a shared filesystem rather than passing context blobs. This mirrors how humans actually do deep research — files, notes, working documents shared among collaborators. Expected benefits: cheaper (less context duplication), higher-quality results (infographics, support artifacts, structured outputs as natural side effects), and easier to debug.

**Quota: the infrastructure ceiling**

The most candid section. KP's top-of-mind infrastructure problem is quota management at scale. Key observations:
- Googlers have *worse* quota limits than paying customers because Google prioritizes external users.
- Even power users at DeepMind hit hard limits — currently handled by brute-force quotas per user/team.
- The subscription pricing model doesn't work for agentic workloads because sessions are orders of magnitude more token-hungry than chat.
- The intended future: seamless fallback when one model's quota is exhausted — automatically downgrade to Flash, then Gemma (effectively free on available TPUs), without interrupting the workflow. The notification should be a seamless model switch, not "you've hit your limit, sorry."

**Auto-review at code review scale**

DeepMind has per-language auto-review models fine-tuned on style guides and good code examples. These comment on PRs automatically. As agent-submitted code volume increases (GitHub reportedly sees trillions of lines from agents now), the review infrastructure needs to scale in parallel — the goal being human supervisors on a digital assembly line, not reviewers reading every line.

**On MCP vs skills**

KP's personal view: MCP may be a flash in the pan; skills have worked very well for him. He likes MCP for auth. The combination of skills + guardrail CLI interactions has been the most productive pattern in his experience.

## Why it matters
- The shared-filesystem direction for Deep Research is an early public signal of where large-scale multi-step agentic pipelines are heading architecturally — away from context passing, toward file-based agent collaboration.
- The quota crisis is the unsexy infrastructure problem that will define agentic system design at enterprise scale: subscription models don't work, per-token costs need graceful degradation paths, and power users will always break naive quota systems.
- The Darwinian skills curation model (expert-maintained skills, only the best survive) is a concrete answer to the skills sprawl problem that will affect any organization deploying agents at scale.

## Metadata
- Video: https://www.youtube.com/watch?v=7gujZrJ9L5I
- Duration: 25:13
- Playlist index: 708
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Okay. Hello everybody. So, my name is N Ballantyne. I'm a developer relations engineer at Google DeepMind. Hi folks. I'm KP Sawney, software engineer in DeepMind's AI platform team. We're going to do an agentic panel today to talk a little bit about how DeepMind thinks about agentic software, how we build kind of our own stacks. We're going to start very briefly by just showing a quick demo and then we'll go into like a like a discussion about some of the stuff that KP works on and hopefully we can just you can ask lots of questions, find out all the things you want to know about how DeepMind and Google think about agents and yeah, let us know your thoughts as well. So, quick show of hands,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7gujZrJ9L5I.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
