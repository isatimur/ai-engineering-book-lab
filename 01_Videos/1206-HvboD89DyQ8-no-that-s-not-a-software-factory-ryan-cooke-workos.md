---
video_id: HvboD89DyQ8
playlist_index: 1206
title: "No, That's Not a Software Factory — Ryan Cooke, WorkOS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=HvboD89DyQ8"
duration: "19:00"
duration_seconds: 1140
view_count: 29000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/HvboD89DyQ8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T16:56:12+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ryan Cooke, an engineer at WorkOS, argues that a sandbox plus a coding agent that turns a prompt into a PR is not a software factory, and that PR counts are output metrics that hide whether anything improved. WorkOS's first sandbox was indistinguishable from engineers running agents on laptops, so it encoded its product engineering process instead: TARS listens to Slack, Linear and GitHub webhooks, drafts the PRD-style hilltop doc, splits it into dependent tickets and picks up the next one. Horizon runs the infrastructure behind an internal MCP gateway, a context engine over Snowflake that became useful far beyond the factory."
---

# No, That's Not a Software Factory — Ryan Cooke, WorkOS

## Summary
Ryan Cooke, an engineer at WorkOS, takes aim at the standard factory setup that spread after Ramp's blog post: put code in a sandbox, add a coding agent, prompt it, merge the PR. His complaint is with how success is measured. Percentage or number of AI PRs is an output metric that "can actually disguise how well these systems are working." WorkOS measures outcomes instead: does the factory speed up feature delivery? The dream is that each engineer gets "a small engineering team for themselves."

**The plain sandbox did not help**
WorkOS first built the standard version: a sandbox on Cloudflare with an OpenCode agent and prompts. The result was "pretty indistinguishable" from engineers running coding agents on their laptops. So the team set out to embed its engineering process into the factory, not just code generation.

**Two systems**
- TARS is the user-facing agent. It lives in Slack, Linear and GitHub and subscribes to webhooks, so it tracks project progress as well as writing code.
- Horizon is the infrastructure orchestration layer, closer to other companies' background-agent systems, and it sits in front of an MCP gateway.

**Encoding product engineering**
WorkOS has no product managers on teams; engineers own the product role. A ritual is the "hilltop" document, a PRD covering purpose, customer evidence, competitive analysis, early designs and milestones. A PM agent drafts the hilltop from a short brief, reads human reviews, and breaks the plan into Linear tickets with dependencies. When a ticket closes, a webhook lets TARS pick up the next one, and TARS can re-evaluate the project for missing tickets as gaps appear. In his demo, a Slack command with a few sentences launched a new API project for the Vaults product. TARS created the Linear project, a Notion draft, decision logs and open questions. The agent sometimes "grossly overestimates" scope and humans cut it back, but it solves the blank-page problem, and teams now write more briefs and hilltops. Engineers can still use other tools, such as Devin or a local Claude Code session, which pull the same context through MCP. TARS also triages bug reports from Slack and support requests from customers in shared channels, using the code.

**The MCP gateway as context engine**
The gateway connects all internal systems and also tells agents how and when to use each tool. It points agents at semantic tables in Snowflake on product use and customer conversations, with guidance on which tables answer which questions. The surprise: teams now query it straight from Slack for data and customer analysis, and build other tools on it. His advice: invest in an internal MCP gateway early.

**Owning the stack to self-improve**
TARS is now building WorkOS's own sandbox infrastructure, for deep control of session data. Next is a memory layer of evergreen context on people, teams, products and company semantics, usable outside the factory too. Metrics: shipping and customer impact, defect rate and time to recovery, and whether engineers choose cloud sandboxes over local harnesses. Owning the infrastructure lets agents read sessions to find missing or obsolete skills. Open problem: authorization, which WorkOS has not solved.

## Why it matters
- Separates output metrics (PR counts, percent of code by AI) from outcome metrics (feature delivery, defect rate, time to recovery) when judging a factory.
- Reports a negative result: a sandbox plus coding agent gave no measurable gain over local agents until the team encoded its own process.
- Shows webhook-driven autonomy: ticket dependencies in Linear let the agent chain work and refresh the plan with no human shepherding each step.
- Makes a strong case for an internal MCP gateway with tool and data-layout guidance as the highest-leverage early investment.
- Flags authorization as an unsolved problem for software factories.

## Metadata
- Video: https://www.youtube.com/watch?v=HvboD89DyQ8
- Duration: 19:00
- Playlist index: 1206
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Well, thank you for joining the final day of the conference here. I know it's been a long week. But I'm excited to talk about a topic here that is very near and dear to me. Software factories. Um You this is probably not a new concept to any of you. I'm guessing if you're all here, you're very familiar with software factories. You know, Ramp blogged about their inspects several months ago. I think maybe December last year. I forget exactly when. It's been a little while. And that really kind of like excited the entire industry of thinking like, oh, we can actually build software very differently now that AI is extremely capable of writing code. Um a lot of other companies have followed...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/HvboD89DyQ8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
