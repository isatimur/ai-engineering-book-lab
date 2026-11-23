---
video_id: "UXOLprPvr-0"
playlist_index: 424
title: "Building AI Agents with Real ROI in the Enterprise SDLC: Bruno (Booking.com) & Beyang (Sourcegraph)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UXOLprPvr-0"
duration: "20:56"
duration_seconds: 1256
view_count: 14494
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/UXOLprPvr-0.txt"
themes:
  - "Org Design & Leadership"
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:17:44+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Bruno (developer experience product lead, Booking.com) and Beyang (CTO and co-founder, Sourcegraph) describe a year-long partnership to prove the ROI of AI coding tools on a codebase bloated by decades of dead experiment flags. Booking dropped 'hours saved' as a metric, defined four one-year KPIs, and found daily Cody users shipped 30% more merge requests. Joint hackathons produced three agents: a GraphQL generator for a schema over a million tokens long, a divide-and-conquer migration agent for 10,000-line legacy functions, and a rule-file code review agent tuned for precision. Their main lesson: developer education turns trial users into daily users."
---
# Building AI Agents with Real ROI in the Enterprise SDLC: Bruno (Booking.com) & Beyang (Sourcegraph)

## Summary
Beyang, CTO and co-founder of Sourcegraph, and Bruno, who leads the product side of developer experience at Booking.com, open with a familiar scene: the CEO says "we need to adopt AI", and six months later the CFO asks for the ROI. Their answer is a joint effort to build software development agents that remove toil from Booking's codebase, with metrics that a data-driven company accepts.

**The problem: decades of experiment flags**
Booking runs on A/B tests. Each experiment adds feature flags to the code, and the flags stay as dead code. After decades the codebase is "extremely bloated", cycle times grow, and Bruno says developer time on it becomes over 90% toil. Booking has more than 3,000 developers and surveys them at least once a quarter.

**The adoption timeline**
- Two years ago Booking adopted Sourcegraph code search. A year ago it rolled out the Cody assistant to all developers.
- Many tried it, saw no value and stopped. Booking first removed guard rails: one LLM and a token limit became multiple LLMs per developer, because models have different strengths (excavating legacy code versus building new services).
- From July, training turned lapsed users into daily users.
- The early metric was hours saved. Bruno calls the big public hours-saved claims "semi BS" and moved to four KPIs measurable within one year: lead time for change, quality, codebase insights, and modernization.
- By November, daily users were 30%+ faster. They shipped 30% more merge requests, and those merge requests held less code, a result Bruno cannot yet explain.
- Sourcegraph added an API layer in front of Cody so Booking could call it from Slack and Jira, outside the IDE.

**Three agents from a week-long Amsterdam hackathon**
Engineers who customized prompts began to chain calls into agents, with many early pitfalls. The teams then ran a joint hackathon.
- *GraphQL generation*: Booking's GraphQL schema is more than a million tokens long. The agent searches the schema, picks the relevant nodes, and walks up the tree to pull in parent nodes before it answers. The naive approach gave "garbage".
- *Automated code migration*: legacy functions run over 10,000 lines. Code search, a structured meta-prompt and divide-and-conquer let the team size the problem in two days, after developers had worked on it for months.
- *Code review*: off-the-shelf AI review tools are not customizable enough. Teams write rules in a flat file. The agent applies the relevant rules to the changed files and posts few comments, optimizing precision over recall.

**Declarative coding**
The forward idea is to declare the rules of a service and shift CI errors left into the IDE, each with a fix, so services become self-healing. Beyang ties this to The Mythical Man-Month: successful software accumulates tech debt and loses cohesion of vision. Senior engineers can now encode constraints that hold at review time and in the editor, for human or AI code. Compliance rules are a natural fit.

**The main lesson**
Education. Workshops and two-day hackathons for whole business units made developers passionate daily users.

## Why it matters
- A rare enterprise case that replaces self-reported hours saved with KPIs measurable within a year, and reports merge-request throughput for daily versus non-daily users.
- Shows that low adoption was a training problem, not a tool problem: lapsed users came back after education.
- The GraphQL agent is a concrete pattern for context that does not fit the window: search the schema, select nodes, then walk up to parents.
- The rule-file review agent, tuned for precision over recall, argues that review is organization-specific and that rules can serve both review and the editor.

## Metadata
- Video: https://www.youtube.com/watch?v=UXOLprPvr-0
- Duration: 20:56
- Playlist index: 424
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] uh so my name is biang uh I'm the CTO and co-founder of a company called Source graph we build Dev tools for uh big messy code bases yeah and I'm Bruno Bruno pasos and I lead uh the product side of developer experience at booking.com and um yeah over the past year I've been overseeing the um the Gen Innovation side of booking as well cool and today we're here to talk about uh how we're partnering to build software development agents uh that automate a bunch of toil inside booking that are actually having real Roi and impact so how many people have heard this before you know you're the you're working inside a large company the CEO comes in and says like hey we need to adopt AI uh and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UXOLprPvr-0.txt]]
- Description cue: Is your CEO asking, "What is the measurable ROI of AI coding agents in our enterprise?" One way to answer is to tackle a 10-year migration project to replatform the entire enterprise codebase....

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.

