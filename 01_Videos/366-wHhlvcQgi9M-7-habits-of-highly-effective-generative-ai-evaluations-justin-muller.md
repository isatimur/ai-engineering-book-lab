---
video_id: "wHhlvcQgi9M"
playlist_index: 366
title: "7 Habits of Highly Effective Generative AI Evaluations - Justin Muller"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wHhlvcQgi9M"
duration: "25:39"
duration_seconds: 1539
view_count: 5867
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wHhlvcQgi9M.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:15:25+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Justin Muller, a principal applied AI architect at AWS, argues that missing evaluations are the biggest barrier to scaling generative AI, and that an eval's main job is to find problems, not to produce a score. A document-processing project stuck at 22% accuracy reached 92% after it built an eval framework, and it launched. He urges teams to evaluate reasoning as well as outputs, to break big prompts into chained steps with an eval on each (a Python comparison fixed a weather prompt's wind math), and to aim for an eval loop of about 30 seconds. His habits: fast, quantifiable, explainable, segmented, diverse, and traditional where it fits, all built on a human-checked gold standard set."
---
# 7 Habits of Highly Effective Generative AI Evaluations - Justin Muller

## Summary
Justin Muller is a principal applied AI architect at AWS on a small specialist team that helps customers scale generative AI workloads. He has seen many succeed and fail, and his claim is that the missing piece in scaling is almost always evaluations. He has never seen a workload reach scale without them.

**The 22% project**
In July 2024 he was called into a document-processing project with six to eight engineers. Accuracy was 22% and the VP was close to cutting it. The team had zero evaluations, only one end-to-end number. Once an eval framework showed where the errors were, the fixes were trivial. By January accuracy was 92%, above their 90% launch bar, and it became the largest document-processing workload on AWS in North America at the time.

**Evals find problems first**
Coming from classic ML, people treat evals as a score like F1. Muller puts scoring a distant third. The main goal is to find problems and, with generative reasoning, suggest fixes. Like a good professor, the eval should explain what went wrong, not only give an F. He also uses evals as a project filter: a team that will not spend two hours on a gold standard set is running a science project; teams with 100x returns offer to spend four.

**Evaluate the reasoning**
A weather company's prompt got rain sensor data and wrote that it was sunny. The model's reasoning: mental health matters, so it skipped the rain. A correct answer with bad reasoning is just as dangerous, like drilling a good hole with an unsafe setup.

**Prompt decomposition**
An eval sees a prompt only end to end. The same weather prompt told the model that wind under five was calm; at scale, 2 to 3% of the time it said seven was less than five. Splitting the prompt into a chain lets you put an eval on each step and ask whether generative AI fits each one. A Python comparison replaced the math step and accuracy went to 100%. Semantic routing works the same way: route easy queries to a small model and hard ones to a large model, and remove dead tokens that cost money and confuse the model.

**The habits**
- Fast: aim for about 30 seconds per run. That is 10 seconds to generate 100 test cases in parallel, 10 to judge them against the gold standard, and 10 to summarize results by category, so you read trends, not 100 outputs.
- Quantifiable: scores jitter, so use many test cases and average them.
- Explainable: get reasoning from the generator and the judge, and give the judge a clear rubric.
- Segmented: evaluate each step, and use evals to prove the smallest model that works for each step, such as Nova Micro for a router.
- Diverse: cover every in-scope use case and include out-of-scope questions. Writing about 100 cases often surfaces product-scope debates.
- Traditional: use numeric checks, retrieval precision and F1, cost and latency where they fit.

**Gold standard set**
The system points at the gold standard set, so errors there become errors in the system. Do not generate it with AI; at most, let AI draft a silver set that humans review. Tag each case with a category for the summary step.

## Why it matters
- Reframes evals from measuring quality to finding where errors live, and the 22% to 92% case shows why that matters for getting to production.
- Gives a concrete speed target and recipe: generate, judge and summarize in parallel in about 30 seconds, so a team can test hundreds of changes a day.
- Prompt decomposition with per-step evals gives a method to find failing steps and move deterministic work, such as numeric comparison, to code.
- Evaluating reasoning catches right-for-the-wrong-reason outputs that a score-only eval passes.
- The note says seven habits, but the transcript names six; cite them as listed.

## Metadata
- Video: https://www.youtube.com/watch?v=wHhlvcQgi9M
- Duration: 25:39
- Playlist index: 366
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> Hello, welcome to my talk on the seven habits of highly effective generative AI evaluations. I'm Justin Mohler. I'm a principal applied AI architect at AWS. I have degrees in physics, math, law, and business. I've been working in natural language processing for about 15 years on and off and generative AI for the last four years uh inside of AWS. My team is a small specialist team that helps customers scale Genai workloads. So I've had the opportunity to work on many many workloads across all different industries, all different sizes of customers. Some small workloads, some of the largest in North America. Um, I'll also mention that because of that experience, I've seen a lot of workloads...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wHhlvcQgi9M.txt]]
- Description cue: Evaluations are the single most reliable indicator of the health and long term viability of any gen AI project.  As a Principal Applied AI Architect for AWS, I've had the opportunity to look...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://d2ot4ns4zf41bm.cloudfront.net/slides/7+Habits+AI+World>
