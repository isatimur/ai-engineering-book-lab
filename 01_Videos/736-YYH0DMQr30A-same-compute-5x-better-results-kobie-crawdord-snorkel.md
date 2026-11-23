---
video_id: YYH0DMQr30A
playlist_index: 736
title: "Same compute, 5x better results — Kobie Crawdord, Snorkel"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YYH0DMQr30A"
duration: "20:40"
duration_seconds: 1240
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YYH0DMQr30A.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:10:28+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kobie Crawford (spelled Crawdord in the title), developer advocate at Snorkel, argues that for agentic terminal-bench-style tasks, task quality is data quality, and shows it empirically. Snorkel accepts a task only if it is achievable, non-trivial, functionally correct and runs in a reliable environment. Accepted tasks needed twice as many tool calls, had lower pass rates, more output tokens and cleaner failures. Two RL runs with the same model, compute and task count improved the base model by about 1% on rejected tasks and about 6% on accepted ones, a 5x gap. Under-specified tasks and hidden test dependencies make tasks look harder."
---

# Same compute, 5x better results — Kobie Crawdord, Snorkel

## Summary
Kobie Crawford (the title spells it Crawdord; he introduces himself as Crawford) is a developer advocate at Snorkel, which calls itself a frontier AI data lab that builds data sets for foundation models. The company grew out of a Stanford research lab and has held one thesis since 2019: data quality is critical. This talk tests that thesis for agentic work and argues that "task quality and data quality" are largely the same thing. The harness and architecture matter, but data quality sits under all of it.

**The setting**
The study uses agentic terminal-bench-style tasks: a containerised environment plus a task definition, as in frameworks such as Harbor and OpenEnv. Containers give reproducibility, isolation and parallel rollouts for evaluation, benchmarking and RL.

**Four acceptance criteria**
Snorkel's research harness checks that a task is achievable, non-trivial and functionally correct (its logic plays out as expected), and that its environment is reliable. Tasks that pass all four go into an accepted bucket; the rest go into a rejected bucket. The two buckets stand for high- and low-quality tasks.

**Do the criteria track real difficulty?**
They ran both buckets through two agent setups, including Codex with several GPT versions. Compared with rejected tasks, accepted tasks averaged twice as many tool calls, had a lower pass rate, and needed more output tokens, so more reasoning.

**Failure modes**
A low pass rate can hide meaningless failures, so they sorted failures into categories. Some are meaningful, such as a logic error or an incomplete task. Others are degenerate, such as an environment problem that no model could get past. The logic-error and incomplete-task shares reversed between the two buckets. His conclusion: accepted tasks produce "cleaner failures", caused by real difficulty, which is what a model can hill-climb on.

**The training result**
They then ran RL twice with the same model, the same compute budget and the same number of tasks. Low-quality tasks improved the base model by about 1%; high-quality tasks by about 6%. That 5x gap from quality alone is the talk's headline. Snorkel builds its data sets and RL environments with experts in the loop, which it sees as key to quality.

**Q&A points**
- Impossible tasks in public benchmarks add noise: some tasks can never be completed, which hides whether models are really improving.
- Rejected tasks are often under-specified: tests expect outcomes the task never asked for, or rely on implicit dependencies the model was never told about. These mismatches make a task look harder than it is.
- Snorkel is also working on less verifiable and long-horizon tasks, including an open benchmark grants program and human-centric domains where several outcomes are scored on a spectrum.
- For quality control it combines human experts and LLM judges with long rubrics, and checks inter-annotator agreement between humans and between judges and humans.

## Why it matters
- The controlled comparison (same model, compute and task count) isolates task quality as a training variable and puts a number on it: about 1% versus about 6% uplift.
- The four criteria (achievable, non-trivial, functionally correct, reliable environment) are a practical checklist for anyone building agent eval or RL tasks.
- Separating meaningful failures from environment-caused ones shows why a raw pass rate can mislead when you judge task difficulty.
- The note that under-specified tasks and hidden test dependencies inflate apparent difficulty is a direct warning for benchmark authors.
- Measuring inter-annotator agreement between LLM judges and humans gives a concrete quality-assurance step for rubric-based evaluation.

## Metadata
- Video: https://www.youtube.com/watch?v=YYH0DMQr30A
- Duration: 20:40
- Playlist index: 736
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]


## Transcript excerpt
> My name is Kobe Crawford. I'm a developer advocate at Snorkel. We are the frontier AI data lab. And what that means is that we produce data sets for foundation models to help climb on. So our research team is highly integrated with the work that we do in terms of our production work. And we put a lot of emphasis on how we integrate research in that. This company's origins actually begin from a Stanford University AI research lab and uh the work that they were doing there actually was part of one of the the CEO's CC PhD thesis and then that became a library that was used open source for a while and then we've grown into focusing on delivering things uh uh with data sets for our customers. Uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YYH0DMQr30A.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://snorkel.ai/author/kobie-crawford>
