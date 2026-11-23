---
video_id: I2LL_wd89-A
playlist_index: 1227
title: "How VS Code Went from Monthly to Weekly Releases with AI — Harald Kirschner"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=I2LL_wd89-A"
duration: "19:35"
duration_seconds: 1175
view_count: 7500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/I2LL_wd89-A.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T17:45:37+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Harald Kirschner, who works on VS Code, explains how a small team shipping to over 50 million users moved from monthly releases, used for over 10 years, to weekly ones. His thesis: the gain comes not from using more AI day to day but from rebuilding the whole shipping system around agents, in three stages: ship faster, hold quality, learn faster. Evidence includes code survival rising from 55% to 86%, a 10x build speed-up from TypeScript Go, screenshot diffs of every component, mandatory AI code review, auto-filed crash issues with agent-opened fix PRs, staged rollouts and an in-house eval bench."
---

# How VS Code Went from Monthly to Weekly Releases with AI — Harald Kirschner

## Summary
Harald Kirschner works on VS Code, a small team shipping to over 50 million users. The talk is not about the agents inside VS Code. It is about how the team uses agents to build VS Code, and what broke along the way. After more than 10 years of monthly releases, the team moved to weekly ones. His point: you do not get there by "token maxing". You get there by changing the whole shipping system.

**The trust metric**
The team tracks code survival: the percent of agent-written code that gets committed. The earliest model they tracked started at 55%. With harness work and newer models, the best model now sits at 86%. Success brought new load: more issues (both better human issues and low-quality automated ones), more open PRs, and, to his surprise, more merged community PRs.

**Stage 1: ship faster**
- Make the codebase agent-ready with a light agents.md that maps where to look. Treat it as a living document that changes when the agent makes mistakes.
- Encode expert knowledge in skills. An accessibility skill, maintained by the accessibility area owner, replaced the one person who used to be pulled into every review.
- Litmus test: can a PM vibe-code in the VS Code repo and get the work accepted?
- Fix slow builds. With 10 or 20 agents hitting the same CI loop, every slow step compounds. The switch to TypeScript Go made builds 10 times faster.
- Let agents use the app. A component browser screenshots every VS Code component on each change and flags diffs. A /launch skill opens VS Code with browser automation, clicks through a scenario, reads logs, and checks a fix before and after. He also praises Xcode MCP for iOS work.
- AI code review on GitHub is now mandatory, with low, medium and high effort settings. Humans do not look at a PR until its review comments are resolved.

**Stage 2: hold quality**
AI filters spam, enriches and translates issues, and assigns area owners. A Chrome extension lets humans correct duplicate detection, and that feedback flows back to the agent. Raw telemetry, 51 billion events per day, is filtered to full error stacks, then fingerprinted and bucketed. The result: about 10 issues filed to area owners, each with an auto-opened fix PR. In one example the agent traced a crash to a missing cancellation request in the RPC protocol, and the team just merged the fix. Releases no longer go to 100% on day one. Staged rollouts watch error logs, because rollbacks of an installed app are expensive.

**Stage 3: learn faster**
VSC bench is the team's own eval suite. Filing a GitHub issue for a new scenario makes an agent bootstrap it from a template. The team hill-climbs offline, then runs online experiments. A trivial 'hello world' file-write eval showed the most expensive model using 70x more tokens than others, and it was not the high-reasoning model. Kirschner now prototypes more than he lands PRs, which enables daily feedback sprints and smaller squads with durable ownership.

## Why it matters
- Code survival rate (55% to 86%) is a simple, concrete metric for developer trust in agent output that any team can track.
- It shows that agent parallelism turns CI speed into a first-order bottleneck; a 10x build speed-up paid off because 10 to 20 agents share the loop.
- The telemetry-to-PR pipeline (51 billion events per day down to about 10 auto-fixed issues) is a worked example of mixing deterministic systems with agents in triage.
- Visual self-verification (component screenshot diffs, a /launch skill) addresses the common failure where agents claim a UI looks right when it does not.
- The 70x token gap on a five-character task argues for measuring how each model behaves inside your own harness, not just on public benchmarks.

## Metadata
- Video: https://www.youtube.com/watch?v=I2LL_wd89-A
- Duration: 19:35
- Playlist index: 1227
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey uh everyone. This is a hard tone to follow. Why did everybody leave? No. Um this is the rerun of a talk that she gave yesterday upstairs. So this will be better than the one yesterday. So uh kudos to you for catching this one. I'm working on VS Code and we move from a monthly release to a weekly release cycle thanks to AI. And this is about the things we learned, the systems that made this work, not just to ship faster, but actually to ship more effectively. So, it's not about how we build agents into VS Code, which we can try out anytime. You can come by the booth and see us showing of agents, but this is about how we use agents to build the product itself. And that's VS Code, that's...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/I2LL_wd89-A.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
