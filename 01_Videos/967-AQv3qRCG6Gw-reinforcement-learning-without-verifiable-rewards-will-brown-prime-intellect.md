---
video_id: AQv3qRCG6Gw
playlist_index: 967
title: "Reinforcement Learning without Verifiable Rewards — Will Brown, Prime Intellect"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AQv3qRCG6Gw"
duration: "19:27"
duration_seconds: 1167
view_count: 705
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/AQv3qRCG6Gw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:57+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Will Brown, who leads applied research at Prime Intellect, argues that most real agent work (reports, bookings, refunds) has no clean verifiable reward, so teams must manufacture signal. His three tools: grounding in source material such as production traces, documents and real PRs; LLM judges that look back on a finished rollout; and test-time search that mines traces, calibrates task difficulty and distills judge findings into rubrics. Working backwards from a known-reachable end state gives supervision for free. The goal is continual learning, where deployed agents turn production failures into new training tasks."
---

# Reinforcement Learning without Verifiable Rewards — Will Brown, Prime Intellect

## Summary
Will Brown leads applied research at Prime Intellect. In this short post-training session talk he argues that RLVR, the current main way to scale reinforcement learning, covers only the easy cases. Math answers can be parsed and checked, code has test cases and linters, and tool use often ends in a known database state. Most real agent work is not like that: writing reports over many documents, booking flights, buying things, or handling a refund. There is often no clean best answer, so teams must manufacture the signal.

**The frame: environments are evals**
An agent is a model plus a harness. An environment is a task plus a world (a Docker image, a code base, tools, skills, browser tabs) plus a scoring rule. Brown stresses that environments and evals are "really the same thing." The same object can generate static data for SFT, drive RL or on-policy distillation, feed prompt optimization, or act as a test bed for harness work. Prime Intellect builds the stack for this: GPU orchestration, the Prime RL training framework, mix-and-match task sets, harnesses and verifiers, and a platform called Lab for hosted training, evals and inference on open base models. The stated aim is to let more teams "become their own research lab."

**Three ways to manufacture signal**
- Grounding: start from source material and exploit the capability gap between a model with and without it in context. Production traces show the real task distribution even before you have labels. Document corpora and repos also work.
- Judges: LLMs are strong general reasoners. Set up well, they spend compute to decide whether an action was good. Mistakes are easier to spot in hindsight, and agreement across seven models is a useful signal.
- Scaling search: spend test-time compute to mine traces, calibrate task difficulty (not too easy, not too hard, so the advantage gap exists), refine simulators, red-team rewards with adversarial prompt optimization, and distill findings into rubric questions that make later audits cheap.

**Working backwards**
Start from a solution or a known-reachable end state and make the real task sit further upstream. For documents: sample a document, generate grounded question-answer pairs, verify them with other models, then throw away the original search. For code: take real PRs, diffs, descriptions and tests, remove pieces, and train the model to reach the end state again. For tools and web apps whose back end you cannot program, build high-fidelity simulators grounded in production traces. Full control of the simulated back end lets you plant the answer, so verifiability is built in.

**Reward hacking and training as validation**
Reward hacking appears when a loose proxy is undefined at the boundaries. Brown says simple checks often work, because many hacks are obvious to a human. Judges are less good at catching them. Teams should build a corpus of past hacks and run small training runs per environment, because some problems only show up once RL starts.

**Toward continual learning**
He cites a Prime Intellect blog post on a general agent: an online loop that generates, solves and synthesizes tool-use tasks, gated on pass rate, with uplift on popular tool-use benchmarks. He also cites the Echo work: adding supervised signal from the environment itself gives the model a world model of what the environment will return, and puts new knowledge into the weights, which RL alone does poorly. The end state is a loop where deployed models find issues in production and turn them into new training tasks.

## Why it matters
- The claim that environments and evals are the same object lets one artifact serve SFT, RL, distillation, prompt optimization and harness testing.
- Working backwards from a known end state (dropped search results, removed PR code, planted simulator answers) is a reusable recipe to get verifiable tasks out of unverifiable domains.
- Production traces are treated as the task distribution before any labels exist. That ties evaluation directly to what users actually ask.
- Practical reward-hacking guidance: keep a corpus of past hacks, do not trust judges alone to catch them, and validate each environment with small training runs.
- The point that RL refines skills but adds little new knowledge explains why Brown blends RL with supervised signal from the environment.

## Metadata
- Video: https://www.youtube.com/watch?v=AQv3qRCG6Gw
- Duration: 19:27
- Playlist index: 967
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Uh thanks all for coming to AI engineer and checking out the post training session. Um hopefully lots of fun stuff today and throughout the conference. Um I'm Will Brown. I lead applied research at Primordial AI and today I want to talk about reinforcement learning without verifiable rewards. And so many of people may have been learning about RLVR over the past uh year or so uh year and a half as this stuff has really taken off and become the main way that we think about scaling reinforcement learning. Um but often we don't actually have verifiable rewards. And so messy real world tasks often we're kind of figuring out as we go. We're having our agents run around and we kind of in hindsight...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AQv3qRCG6Gw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
