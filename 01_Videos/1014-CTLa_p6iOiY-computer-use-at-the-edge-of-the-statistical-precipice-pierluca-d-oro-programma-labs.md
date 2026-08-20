---
video_id: CTLa_p6iOiY
playlist_index: 1014
title: "Computer Use at the Edge of the Statistical Precipice — Pierluca D'Oro, Programma Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CTLa_p6iOiY"
duration: "17:28"
duration_seconds: 1048
view_count: 924
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/CTLa_p6iOiY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:27:56+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Pierluca D'Oro shows deterministic replay agents match frontier models on OSWorld-style benchmarks and that pass@k is provably equivalent to scoring a replay agent, then proposes fixes."
---

# Computer Use at the Edge of the Statistical Precipice — Pierluca D'Oro, Programma Labs

## Summary
Pierluca D'Oro (Programma Labs, work done at Meta Superintelligence Labs) demonstrates that a "replay agent" — a script that blindly replays a frontier model's previously recorded successful action trace, with no actual model in the loop — matches or beats that frontier model's success rate on standard computer-use benchmarks such as OSWorld and mobile-agent benchmarks, because those environments are static and deterministic. He and collaborators formally prove in the accompanying paper that the popular pass@k metric is, on deterministic environments, mathematically equivalent to scoring this replay agent, meaning much of the field's reported computer-use progress may reflect benchmark determinism rather than model capability. As a fix, he describes a set of environment-design principles (which he calls "PRISM principles": stochastic variation of instance, data, theme, and starting state; verification of every generated variant; sandboxing; support for privileged verifiers; and realism) and a new Android benchmark built on them — 15 apps, 387 verified scenarios, and 3.2 million valid configurations generated and filtered by a compiler-like system from parameterized task templates. On this benchmark, replay agents score near baseline as intended, while frontier models turn out to be far less robust than expected to nuisance variations like starting screen or app theme. He also shows that confidence intervals computed only from base-case rollouts (ignoring environment-configuration variance) achieve only about 17-20% real coverage against a claimed 95%, and that this overconfidence can cost real money — citing an example of a 4%-in-reality performance mismatch across a million tasks at roughly $12 per mistake, adding up to hundreds of thousands of dollars a month in bad deployment decisions.

## Why it matters
- Documents a concrete, formally provable benchmark exploit (replay agents equaling pass@k on deterministic environments) that undercuts how much reported computer-use progress can be trusted at face value.
- Supplies a named, reusable checklist for building non-gameable eval environments (stochastic variation, per-variant verification, sandboxing, verifiers, realism) plus a worked example (15-app Android benchmark, 3.2M configs) an author could cite as a concrete methodology.
- Quantifies the business cost of statistically naive evals (17-20% real CI coverage vs. claimed 95%; hundreds of thousands of dollars/month from a 4% mismatch at scale), a hard number for a book section on why evaluation rigor matters commercially, not just academically.

## Metadata
- Video: https://www.youtube.com/watch?v=CTLa_p6iOiY
- Duration: 17:28
- Playlist index: 1014
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi everyone, I am Pugadoro and I'm the founder at Programmabs and today I'm going to talk about computer use agency evaluation and most of the work um and the details about it are in a in a paper with this title and I did this work while Meta super intelligent labs with the collaborators you see on this slide. And so to start I want to introduce this type of uh agent is a weird type of agent that I call a replay agent. So imagine we run this process um we run our frontier a frontier model a good one uh on a benchmark we like and then for every task we collect uh a successful trace or a successful trajectory and we have a recorded tape of this type. So the actions might be tapping uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CTLa_p6iOiY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- paper: <https://arxiv.org/abs/2605.08261>
