---
video_id: zMiSRliEzv4
playlist_index: 758
title: "Self Driving Products: Product Signals to Pull Requests — Joshua Snyder, PostHog"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zMiSRliEzv4"
duration: "15:39"
duration_seconds: 939
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/zMiSRliEzv4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-20T09:01:40+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "PostHog's alpha pipeline turns product signals (errors, replays, Slack, experiments) into ready-to-merge PRs via signal grouping, a research agent, and an execution agent iterating until CI is green."
---

# Self Driving Products: Product Signals to Pull Requests — Joshua Snyder, PostHog

## Summary
Joshua Snyder (PostHog) describes an internal pipeline, currently in alpha, that turns product observability data — errors, session replays, Slack messages, experiment results — directly into ready-to-merge pull requests instead of dashboards someone has to interpret. The pipeline ingests trillions of events per month, runs an LLM safety classifier to drop adversarial signals, normalizes heterogeneous sources into a common schema (source, type, content, weight, embedding), and groups related signals into weighted "reports" that get promoted for investigation once a threshold is crossed. A research agent (Claude Agent SDK running in a Modal sandbox, using PostHog's own MCP server plus external MCPs like Linear and Notion, and codebase context) assesses whether a report is actionable, needs human input, or should keep collecting evidence, then an execution agent clones the repo, writes a fix, and iterates against CI failures and PR comments by snapshotting and rehydrating the sandbox until the PR is green. Snyder highlights two counterintuitive lessons: off-the-shelf embedding models cluster by structural similarity rather than meaning (grouping all errors together regardless of topic), so PostHog instead generates LLM queries describing each signal and embeds those; and trying to minimize agent calls for cost reasons early on was a mistake, since running an agent hundreds of times on similar problems reveals recurring patterns that can then be distilled into a cheap one-shot LLM call or a trained model. The stated end goal is a fully self-driving product that ships experiments and low-risk fixes behind feature flags without human review, rolling back on failure and learning from every outcome.

## Why it matters
- A concrete production case study of an agent pipeline (signal ingestion → grouping → research agent → actionability triage → execution agent) that turns raw telemetry into merged PRs — direct material for a chapter on coding agents and multi-agent orchestration.
- Documents a specific embedding-clustering failure mode (structural vs. semantic similarity across heterogeneous data sources) and the query-generation fix, a reusable pattern for anyone grouping mixed-format signals.
- Offers a counterintuitive cost/evals lesson: don't prematurely optimize away agent calls, since repeated agent runs expose patterns that can be distilled into cheaper one-shot models — relevant to discussions of evals, reliability, and agent cost engineering.

## Metadata
- Video: https://www.youtube.com/watch?v=zMiSRliEzv4
- Duration: 15:39
- Playlist index: 758
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> So, I'm Josh. I'm from PostHog. If you haven't heard of us, you might know us because of some hedgehogs or you might have seen our founder James posting some funny things on LinkedIn. He's quite popular. I'm going to be talking today about what if your product built itself? And the pipeline that we're currently working on which we're trying to turn observability data instead of something that you read and that you interpret based on dashboards, we're trying to turn turn that into something that submits pull requests for you. Cool. Yeah, so quick background on PostHog. We've got a bunch of tools. We started out as a product analytics company. We now have session replay, web analytics, error...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zMiSRliEzv4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
