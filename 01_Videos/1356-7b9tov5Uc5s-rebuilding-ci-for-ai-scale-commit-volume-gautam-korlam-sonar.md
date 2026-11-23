---
video_id: 7b9tov5Uc5s
playlist_index: 1356
title: "Rebuilding CI for AI-Scale Commit Volume — Gautam Korlam, Sonar"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7b9tov5Uc5s"
duration: "19:19"
duration_seconds: 1159
view_count: 9200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/7b9tov5Uc5s.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T22:48:53+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Gautam Korlam, co-founder and CTO of a PR-validation startup now part of Sonar and formerly a decade on Uber's monorepo build and merge infrastructure, argues that CI and review queues were built for human speed and become the bottleneck when agents open PRs. He cites a 10x rise in his team's commits, 25% monthly PR growth and CI failures on 13% of PRs. His fixes: make CI fast (10 minutes to under one), shift checks left, use AI review first, auto-approve low-risk changes by policy, never let an agent approve its own change, and keep durable audit records for compliance."
---

# Rebuilding CI for AI-Scale Commit Volume — Gautam Korlam, Sonar

## Summary
Gautam Korlam is co-founder and CTO of a PR-validation startup that Sonar acquired, where he is now a principal engineer. Before that he spent almost a decade on Uber's build and merge infrastructure for monorepos. His talk explains why CI and review break under agent-scale commit volume, with special attention to regulated industries such as banks that must stay compliant and auditable while moving fast.

**Uber had agent-scale volume before agents**
One giant monorepo took thousands of changes a day with long builds. Merging strictly one at a time would have taken up to 20 days to keep main green; merging freely left main red because changes that passed alone broke together. Uber built a merge-queue system (described in a paper) that tested likely combinations of incoming commits in parallel, predicted which PR would break, kicked it back to the author, and let a change onto trunk only if it passed with the other incoming commits. It still runs today.

**The new bottleneck**
CI and review queues were built for human speed, a few changes an hour. Now developers open several PRs a day, and software factories and background agents trigger more. His own team's commit rate has almost 10xed in about three years with the same small team, and PRs reviewed on his platform grow about 25% month over month. Every stage of the factory line slows: rebuilds, flaky integration tests that take hours to retry, human reviewers who become the queue or start rubber-stamping, and expiring logs that leave only an approval stamp. On his platform at least 13% of PRs had a recorded CI failure, each needing another round trip. Humans usually wait for green CI before reviewing, so review cannot run in parallel.

**What to do**
- **Make CI fast:** move expensive checks post-merge, parallelize, shard and cache. His team, using Rust, cut CI from about 10 minutes to under a minute for incremental builds by caching outputs and reducing compiler churn.
- **Make review fast:** run AI review as a first pass with quick signals, go deep only on high-risk changes, and have agents fix findings so humans see only what is left. At Uber, and still at most teams, review dominated P90 time to production. In one example, the AI reviewer caught a shared test database without guards that would cause cross-contamination and flaky tests under load, then committed the fix with the engineer as co-author.
- **Shift left:** checks caught locally are cheaper, and local agents have more context.
- **Enforce policy beyond CI:** Uber lost its London license after a feature-flag change let drivers onto the platform without proper checks. It won the license back by tracing every change that affected London to its controls. Compiling code does not prove compliance with regulatory policies that agents do not know about.
- **Auto-approve by policy:** documentation, non-breaking dependency bumps, security patches and low-risk internal tooling can be auto-approved by plain-English rules. Changes to sensitive areas such as payments need a human. An agent must never approve its own change, and the engineer who prompted it does not count as an independent approver.

**Audit records**
CI data expires, and force pushes after flaky reruns change what a branch points at. So record on the PR: which agent made it, which session and who or what triggered it, the commit CI trusted with a saved test report, how each finding was resolved, an approver independent of the bot, and any named overrides with reasons. He says agent trajectories and per-push outcomes become the source of truth as artifacts expire.

## Why it matters
- Grounds the AI-era CI problem in a decade of monorepo experience: the merge-queue logic Uber needed at thousands of changes a day now applies to every team using agents.
- Supplies concrete growth numbers (10x commits, 25% monthly PR growth, 13% of PRs with CI failures) for chapters on review and CI bottlenecks.
- The CI speedup from about 10 minutes to under one shows why fast feedback matters more when agents iterate on failures.
- Policy-based auto-approval, with a no-self-approval rule, gives a zero-trust model for letting agents merge low-risk changes.
- The audit-record checklist is a practical template for regulated teams who must prove what was checked after logs expire.

## Metadata
- Video: https://www.youtube.com/watch?v=7b9tov5Uc5s
- Duration: 19:19
- Playlist index: 1356
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello everyone. Uh welcome to my talk. Uh today we're going to be talking about how we are rebuilding CI for AI scale commit volume. And this comes from a lot of experience from build and merge infrastructure that I have been working on for a decade plus at this point. And kind of want to walk you through all the new bottlenecks we're seeing in software factories and also specifically for highly regulated industries and banks. How does that translate? How do we keep things more compliant and auditable while being able to move fast? So let's dive in. My name is Goautam. I am a co-founder and CTO at QAR and recently joined Sonar as a principal engineer. After the acquisition pre previous to I...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7b9tov5Uc5s.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
