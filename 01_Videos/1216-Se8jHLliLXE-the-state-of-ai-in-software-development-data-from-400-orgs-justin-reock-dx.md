---
video_id: Se8jHLliLXE
playlist_index: 1216
title: "The State of AI in Software Development: Data from 400+ Orgs — Justin Reock, DX"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Se8jHLliLXE"
duration: "19:09"
duration_seconds: 1149
view_count: 140000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Se8jHLliLXE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T17:19:19+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Justin Reock, deputy CTO at DX, walks through DX platform data on how AI is changing software delivery. Deploy frequency keeps rising, but perceived delivery speed rose only about 4.5% in a year, change failure rate swings widely by company, change confidence fell 6% while maintainability rose 4%, average PR size grew from about 44 to 72 lines, and the median velocity gain was only 7.7%, with nobody near 2x. His prescription: measure utilization, impact and cost against trusted foundational metrics, invest in AI readiness (which is just good developer experience), and attack the real bottleneck beyond code generation."
---

# The State of AI in Software Development: Data from 400+ Orgs — Justin Reock, DX

## Summary
Justin Reock is deputy CTO at DX, whose research platform was built by people behind the DORA metrics, the SPACE framework and the DevEx framework. DX publishes quarterly state-of-AI and AI-impact reports. This talk covers organizational trends from that data, about 200,000 engineers in one cut, rather than the raw numbers of the newest report.

**Velocity: up, but modest**
DORA deploy frequency keeps rising, though it is tapering. North America trends up; Europe pulled back last quarter, which he links to differences in spending, token budgets and regulation. Perceived rate of delivery rose only about 4.5% over a full year, despite heavy AI spend. He contrasts this with the small, "flawed" 16-engineer study in which productivity fell about 19% while perceived productivity rose about 20%.

**Quality: volatile**
Per-company change failure rate lines swing widely. Some companies rose by as much as 2 points against an industry benchmark of about 4%, so potentially 50% more defects. The pattern predates AI and depends on release pipelines and testing, but "the amplitude has changed." Two metrics that usually move together have split: perceived code maintainability rose almost 4%, while change confidence fell 6%. Developers find code easier to change but trust the output less.

**Bigger PRs**
Average PR size grew from about 44 to 72 lines in a year, which he calls one of this year's most important metrics. Causes: models trained toward "relatively mediocre code" by the law of averages, and slow 45-to-60-minute builds that push people to cram several AI-made functions into one PR. Every extra line is a potential bug and more to review. The sentiment that developers work in small incremental changes fell 10%.

**Who benefits**
Juniors use AI most and spend more tokens per use case. Staff-plus engineers save about the same time with fewer tokens, because they spot hallucinations and understand the architecture. Smaller companies lead in time savings thanks to simpler pipelines and less friction.

**How to measure**
Keep foundational metrics. DX's AI measurement framework has three dimensions, often adopted in order: utilization (daily and weekly active users, use cases), impact, and cost. Compare cohorts of users, built from tool telemetry, on PR cycle time, PR size and review pushback. Measure platform AI readiness: clear docs, simple data relations, modular code, reliable local CI, non-flaky tests. "What's good for humans is also good for agents." DX also gathers feedback from agents themselves about steering, context and feedback cycles, broken down by use case and token spend.

**Attack the real bottleneck**
Even perfect instant code would touch only about 14 to 16% of the value stream. In a DX study running to February, the median PR-throughput gain was 7.7% and the average 13%; top performers reached about 70%. "Nobody hit 2x, nobody hit 5x, nobody hit 10x." Meetings, context switching and friction outweigh the savings, and, citing theory-of-constraints thinking, an hour saved off the bottleneck is worthless. Examples:
- Morgan Stanley's DevGen AI agent reads legacy mainframe code and writes PRDs for engineers, saving about 300,000 hours a year.
- Zapier cut standups from five to two a week with agent summaries, onboards engineers in about two weeks against a benchmark of over a month, sees about 15% more value per engineer, and is hiring more than ever. "This is not a headcount replacement story." It also runs about 3,000 automated code reviews a week: a superficial agent first pass recorded in PR comments, with humans still in the loop.
- Spotify's SRE agent gathers runbook steps and incident context into incident channels.

## Why it matters
- Supplies cross-company numbers (7.7% median velocity gain, PR size from 44 to 72 lines, change confidence down 6%) that temper 10x productivity claims.
- The split between rising maintainability and falling change confidence is a precise signal of the trust problem with AI output.
- Links bigger PRs and less incremental delivery to slow builds and model output, giving concrete levers for leaders.
- Gives a usable measurement model (utilization, impact, cost, compared by cohort on foundational metrics) for AI investment.
- Grounds the theory-of-constraints argument in named enterprise cases that target non-coding bottlenecks.

## Metadata
- Video: https://www.youtube.com/watch?v=Se8jHLliLXE
- Duration: 19:09
- Playlist index: 1216
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Uh I'm Justin Rio. I'm the deputy CTO at DX. I get to do a lot of our research around uh developer experience and its relation to developer productivity. And certainly over the last year, a lot of that research has focused on AI's impact on the developer experience and basic aspects of productivity uh within an organization. Uh so we produce these quarterly reports, our our state of AI and AI impact reports which looks at really a lot of raw data that we're able to get from our platform. Our platform is a researchback platform uh built from the same folks who worked on Dora metrics and the space framework and the DevX framework. Uh and really at the end of the day it's a data gathering...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Se8jHLliLXE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
