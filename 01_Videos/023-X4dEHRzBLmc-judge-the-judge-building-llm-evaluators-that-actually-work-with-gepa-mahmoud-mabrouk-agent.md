---
video_id: "X4dEHRzBLmc"
playlist_index: 23
title: "Judge the Judge: Building LLM Evaluators That Actually Work with GEPA — Mahmoud Mabrouk, Agenta AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=X4dEHRzBLmc"
duration: "40:51"
duration_seconds: 2451
view_count: 5452
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/X4dEHRzBLmc.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T10:50:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mahmoud Mabrouk, co-founder and CEO of Agenta, argues that generic judges like an off-the-shelf hallucination prompt give useless signal, and that an LLM-as-a-judge must be calibrated against human annotations. In a workshop on an airline customer-support benchmark (599 annotated traces), he derives four binary metrics from error analysis, then uses GEPA's optimize-anything API to evolve a policy-adherence judge. Validation accuracy rose to 74% and the bias toward 'compliant' fell from 98% to 64%, but merging candidates stalled. His lessons: write a custom reflection template, start with a 'compliant by default' seed, avoid small models, and budget for a few hundred dollars of tokens."
---
# Judge the Judge: Building LLM Evaluators That Actually Work with GEPA — Mahmoud Mabrouk, Agenta AI

## Summary
Mahmoud Mabrouk is co-founder and CEO of Agenta, an open-source LLMOps platform, with more than 15 years in machine learning. He opens with a familiar failure: a team drops a library hallucination judge into production, dashboards look fine, and customers still say the agent is broken. The judge prompt just says rate whether this is a hallucination. "If it could, then your app would have worked from the day one." His fix is a judge calibrated against human annotations through prompt optimization with GEPA.

**Why calibration matters**
The speed of the experiment loop equals the speed of evaluation. Humans are slow; an uncalibrated judge is fast but "won't go anywhere". Calibrated judges also power online monitoring and the data flywheel: observe traces, add evals from edge cases, optimize again.

**Four-step workflow**
1. **Design metrics from the use case.** Subject matter experts do error analysis on traces, comment, then cluster failure types. On an airline support benchmark built by Sierra he found four: policy adherence, response style, information delivery and tool calls. Each gets its own judge.
2. **Use binary verdicts with reasoning.** One-to-five scores are hard even for two humans to agree on. The written reasoning is essential, because the optimizer cannot guess why a long conversation broke policy.
3. **Optimize with GEPA.** The algorithm works like a genetic search: start from a seed prompt, sample candidates by reflective mutation or by merging two prompts, test them on mini-batches, and keep a Pareto frontier of the best candidate per task, not the best average.
4. **Validate** on a held-out split by task (480 training traces, 112 validation).

**Results**
The seed judge reached 61% validation accuracy but called 98% of traces compliant. After about an hour of optimization, the learned rubric captured parts of the cancellation and modification policy. Accuracy reached 74%, non-compliance recall rose from near zero, and the compliant rate fell to 64%. The Pareto frontier hit 100% on training: some candidate solved every task, but GEPA "struggled" to merge them into one prompt. Still far from 95%. He admits the data is weak: few traces, uneven distribution and AI-generated annotations.

**Lessons from failed runs**
- Small or older models failed as both judge and refiner; Gemini as refiner gave the best results.
- The default reflection template did not learn the policy. A custom template that shows the verdict and ground truth and asks for real policy rules was key.
- The seed should assume "compliant" unless there is a reason; otherwise the model's own biases produce a near-random start.
- Seeds without the agent's policy beat seeds with it pasted in, which he reads as a local minimum.
- Start small, overfit the training data first, and instrument the optimizer's traces before scaling to 200 to 300 iterations.
- Cost: even these small runs cost roughly two to three hundred dollars in tokens because trajectories are long.

## Why it matters
- Names the core risk of evals: a judge that does not correlate with humans makes the iteration loop fast but aimless.
- Gives a reusable recipe: error analysis, one binary judge per failure type, annotated reasoning, then automated prompt optimization.
- Honest numbers (61% to 74%, frontier at 100% but merge stalled) show what GEPA does and does not deliver on hard policy tasks.
- Practical tuning advice (custom reflection template, biased seed, no policy in the seed, strong refiner model) is rare and directly reusable.
- The cost note frames judge optimization as an upfront spend that pays off when a cheap judge runs on many production traces.

## Metadata
- Video: https://www.youtube.com/watch?v=X4dEHRzBLmc
- Duration: 40:51
- Playlist index: 23
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> Hello everyone and welcome to my talk slashworkshop judge the judge and today we're going to talk about LLM as a judge quite sure you know this scenario you have an agent in production and someone from the team says we need to monitor the reliability so you go to one of the libraries and maybe use the hallucination LM as a judge you put it in production within your observability platform and things looks fine But customers are actually saying that the agent is not working and you look at the traces, it's not working. You look now under the hood about this hallucination LLM as a judge and you'll find a prompt not very far from this one. You'll be given an LLM output rate whether it's in a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/X4dEHRzBLmc.txt]]
- Description cue: Miscalibrated evals are worse than no evals. They give false confidence while being, at best, useless. This workshop walks you through building a calibrated LLM-as-a-judge, from capturing ground...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- paper: <https://arxiv.org/abs/2507.19457>
- repo: <https://github.com/Agenta-AI/judge-the-judge-talk-2026>
- repo: <https://github.com/agenta-ai/agenta>
- repo: <https://github.com/gepa-ai/gepa>
- resource: <https://hamel.dev/blog/posts/field-guide>
