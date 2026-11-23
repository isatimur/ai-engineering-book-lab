---
video_id: EL123UNokkI
playlist_index: 1091
title: "Building uReview, Uber’s Multi-Agent Code Review Engine — Will Bond & Ameya Ketkar, Uber"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=EL123UNokkI"
duration: "15:07"
duration_seconds: 907
view_count: 10000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/EL123UNokkI.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T01:03:45+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Will Bond and Ameya Ketkar describe uReview, Uber's in-house multi-agent code review engine, built because first time to review grew from 3 hours in 2024 to 9 hours in 2026 and code review became the bottleneck. A central service routes requests from GitHub, the legacy review tool and the agent loop to generators tuned for cost and quality, then rates, filters and deduplicates comments. Reply sentiment, address rate and agent trajectories drove tuning; team-owned AI linters and custom agents ride on Uber's ownership model. Results: about 25,000 comments a week, 67% addressed, 60% lower cost and about 70% higher accuracy than a naive build."
---

# Building uReview, Uber’s Multi-Agent Code Review Engine — Will Bond & Ameya Ketkar, Uber

## Summary
Will Bond and Ameya Ketkar of Uber present uReview, the company's automated code review system. Uber has thousands of engineers in hundreds of teams across 12 sites, working mostly in six language-specific monorepos. PR volume and size have grown, and first time to review rose from 3 hours in 2024 to 9 hours in 2026. "Code review is now the bottleneck." Their thesis: at this scale, AI review must be a platform with routing, team-owned customization and deep observability, and it must serve agents in the inner loop as well as humans.

**Why build in-house**
Uber long used a legacy review tool and is migrating to GitHub; most vendors do not support the legacy tool. Agents in the inner loop must get the same review and rules as humans. Hundreds of teams cannot be managed centrally, so customization must plug into the existing team ownership system. Review depth must depend on the risk and complexity of a change. Security and compliance reviews must run on everything, not depend on teams remembering to run a skill.

**Architecture**
Review surfaces (GitHub, the legacy tool and the agent loop) feed the uReview service, which takes requests, collects user feedback and routes work to several generators tuned for different cost and performance points. It can also plug in third-party reviewers for comparison. Because many generators produce many, often duplicate, comments, post-processing rates, categorizes, filters and deduplicates them so engineers see only high-confidence, actionable comments.

**Observability drove quality**
uReview began as a single per-file logic-check prompt, a thorough-review agent and a dispatcher. Early signals were shallow: cost, an NPS survey, Google Forms and Slack support. The quality-to-cost ratio was "all over the place". The team then classified the sentiment and category of developer replies, which exposed fixable classes of issues. Next came address rate (does the developer act on the comment) and agent trajectories (tool calls and reasoning), used to tune the runtime for fast, cheap, high-quality reviews. Two lessons: the model "doesn't know that it's wrong" and needs each team's style guides and anti-patterns, and agents need guardrails on what not to waste turns on, since review has a time budget.

**Team customization**
The stack has single-file reviewers for logic bugs, multi-file deep reviewers carrying each monorepo's anti-patterns, AI linters (few-shot rules with deterministic context for mechanical issues) and custom agents that teams link to a knowledge base, past PRs and a review skill. To make this work they built on the ownership model, co-located customizations next to the code, used deterministic routing to pick reviews, models and generators per team, and surfaced trajectories, address rates and sentiment back to rule owners. Writing a skill was easy (teams asked Claude to write one from past PR reviews); running skills at scale with consistent quality and low cost took many iterations.

**Results**
About 25,000 comments a week; 10 percent get feedback and only 4 percent of PRs get negative feedback. Overall address rate is about 67 percent, and about three quarters of high-severity issues are addressed. Against a naive build, cost fell 60 percent and accuracy rose about 70 percent.

**Inner versus outer loop**
In the inner loop, accuracy must be higher, or agents fix low-quality comments and then fix backwards on the next review. Agents will happily fix 100 nits that frustrate humans. The bigger issue is feedback: quality came from human signals, and removing humans risks slop. Their view is not to kill the outer loop but to expand it, moving engineers up to architecture, domain expertise and product thinking.

## Why it matters
- A concrete enterprise case where review latency (3 hours to 9 hours) is the measured bottleneck that AI code generation created.
- Shows that comment post-processing (rate, categorize, filter, deduplicate) is a core component of multi-generator review, not an afterthought.
- Address rate, reply sentiment and agent trajectories are practical production signals for evaluating a review agent; they cut cost 60 percent and raised accuracy about 70 percent.
- Writing the skill is easy; running it at scale is hard. That is a useful lesson for any platform that lets teams ship their own agent rules.
- Raises a real design problem for agentic SDLC: inner-loop agents need higher-precision review, and human feedback signals shrink as humans leave the loop.

## Metadata
- Video: https://www.youtube.com/watch?v=EL123UNokkI
- Duration: 15:07
- Playlist index: 1091
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right, hello everyone. My name is Will and uh I'm here to talk to you about automated code review. Uh my teammate Amir and I work at Uber and we're going to be walking through U Review, a system that Uber has built uh to help increase the velocity of our software engineering teams. Um for a little bit of context about what software engineering org at Uber looks like, we have thousands of software engineers who work across hundreds of teams uh located across 12 different sites and uh they work in primarily one of six language-specific monorepos. As many of you have probably noticed over the past 24 months, the volume of PRs, the size of PRs has been growing. One of the ways...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/EL123UNokkI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
