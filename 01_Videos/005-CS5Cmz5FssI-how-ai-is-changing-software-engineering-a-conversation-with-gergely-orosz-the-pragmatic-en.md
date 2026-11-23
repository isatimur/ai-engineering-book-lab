---
video_id: "CS5Cmz5FssI"
playlist_index: 5
title: "How AI is changing Software Engineering: A Conversation with Gergely Orosz, @The Pragmatic Engineer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CS5Cmz5FssI"
duration: "26:42"
duration_seconds: 1602
view_count: 10102
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/CS5Cmz5FssI.txt"
themes:
  - "Coding Agents"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T09:58:29+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Gergely Orosz, former Uber engineer and author of The Pragmatic Engineer newsletter, talks with the conference host about what AI is doing inside big tech. His thesis: individuals are clearly faster, but teams struggle to retrofit AI into old ways of working, and measuring token use has created 'token maxing', a Goodhart's-law game like lines of code. He describes token leaderboards at Meta and Microsoft, a monthly spend target at Salesforce, Uber-style rebuilds of internal infra (background agents, MCP gateways, risk-based code review), and argues that orchestrating agents is a tech-lead role, not people management."
---
# How AI is changing Software Engineering: A Conversation with Gergely Orosz, @The Pragmatic Engineer

## Summary
Gergely Orosz writes The Pragmatic Engineer newsletter and worked at Uber for four years. In this closing-keynote conversation with the conference host, he reports what engineers and managers at large companies tell him, anonymized, about AI adoption. His view: AI makes individuals more productive, but at team level the gain is "a bit question mark", because it is hard to retrofit AI into the way companies already work.

**Token maxing**
Large companies now measure token use. Meta had a token leaderboard, and managers there use token count as one data point in performance reviews. It can be "weaponized" against low performers. Engineers inflate their counts, for example by asking an agent to summarize docs they could read. At Microsoft, some run autonomous agents "to build junk" to push the number up. Meta closed its leaderboard after press coverage, but the behaviour continues. Salesforce has a minimum monthly spend target, which he thinks is about $175. He compares it to lines of code and PR counts from early developer-productivity tools: a metric everyone knew was stupid, now pushed by the top companies.

**Why leadership pushed**
Six months earlier, before models like Opus 4.5, AI tools were "mildly useful" on existing codebases, and experienced engineers held off. Leaders saw Anthropic write much of its code with Claude Code and concluded they must push usage. Coinbase's CEO emailed staff that anyone not using AI tools within a week would get a conversation; a week later he fired an engineer. Orosz links tolerance for token maxing to LeetCode hiring, which selects people "willing to put up with" nonsense to keep a high-paying job. Startups, he says, do not care about token counts.

**Getting good is slow**
The host cites a study of 30 developers who felt 20% faster but were 20% slower. The host's own view is that the bigger gain comes when non-technical colleagues can code and stop waiting for engineers. Orosz recalls Simon Willison telling him in 2024 that there is "no manual". Two lessons are hard for engineers: skill takes long practice, and understanding the theory does not make you better with the tools. The teams that get value are "low ego" and leave their priors behind.

**The role is widening**
Testing and DevOps already collapsed into the engineer role, and product work is next. Even early-career engineers face senior-level expectations. A VP at John Deere told him two-pizza teams are becoming one-pizza teams. He rejects "everyone is an engineering manager now": orchestrating agents is closer to a tech lead role, with no people drama and a much faster feedback loop than a six-month team project. He cites DHH's "mech suit" image and Mitchell Hashimoto, who runs one background agent and finds two agents enough.

**Big tech is rebuilding internal infra**
Uber ships few visible new features but is rebuilding its tooling: custom background coding agents in the monorepo, an MCP gateway tied to service discovery, retooled on-call, and code review that categorizes changes by risk. Airbnb, Intercom, Meta and Microsoft do the same. His reasons: it is a low-risk way to get hands-on, huge codebases get better results from custom tools than from vendors, and "anything that has AI in it gets funded". Shopify got early access to GitHub Copilot in 2021 by offering feedback from 3,000 people. It accepts churn and cost to stay months ahead and to attract hires.

The talk ends with the newsletter's growth: 100 people paid $100 upfront before he published anything. It reached 1,000 paying readers in six weeks and became the number one paid technology newsletter four months after launch.

## Why it matters
- Token maxing is a live case of Goodhart's law in AI adoption: when token spend becomes a performance signal, engineers produce tokens, not value.
- The split between individual speed-up and unclear team-level gains gives a precise frame for why AI productivity claims and measured results diverge.
- The Uber infra list (background agents, MCP gateway, risk-based code review, on-call tooling) is a concrete map of what large companies build in-house rather than buy.
- His "tech lead, not manager" framing of agent orchestration, with its faster feedback loop, is a usable counter to the "everyone is a manager now" claim.
- Shopify's trade of churn and cost for a head start shows when early, expensive adoption is rational and when a company can wait.

## Metadata
- Video: https://www.youtube.com/watch?v=CS5Cmz5FssI
- Duration: 26:42
- Playlist index: 5
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[RAG & Retrieval]]

## Transcript excerpt
> Sure game. >> All right. I going to assume most of you uh show of hands who subscribes to Pragmatic Engineer. Oh my god. >> Wow. uh he is uh he needs no introduction. Then let's get right into it. Um what is token maxing and should everyone here be doing it? >> So I I heard about token maxing a week ago or like week and a half ago first and you know some people have been doing it for longer and I tweeted about it I think three days ago saying oh there's this token maxing and again you see it on social media and my DMs were blowing up from from people at large companies. I don't want to name names but like you know Meta, Microsoft uh some so some some other ones as well like uh the likes of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CS5Cmz5FssI.txt]]
- Description cue: Gergely Orosz is a formar Uber and Skyscanner engineer and is the author of  and  , the #1 software/AI engineering newsletter...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://nl.linkedin.com/company/the-pragmatic-engineer>
