---
video_id: "EnT4Wej5M5k"
playlist_index: 389
title: "The Benchmarks Game: Why It's Rigged and How You Can (Really) Win - Darius Emrani"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=EnT4Wej5M5k"
duration: "11:20"
duration_seconds: 680
view_count: 769
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/EnT4Wej5M5k.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:16:20+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Darius Emrani, CEO of Scorecard and a former self-driving and SpaceX eval builder, argues that public AI benchmarks are rigged because a measure stops working once it becomes a target, and single scores now move billions in value. He names three tricks: apples-to-oranges comparisons (xAI comparing its best configuration against rivals' standard ones, omitting o3 at consensus 64), privileged test access (OpenAI funding FrontierMath and seeing the data set), and style over substance (Meta entering 27 private Llama 4 Maverick variants in LM Arena). His fixes: equal compute, open rotated test sets, style control, public attempts, and custom evals on real production queries."
---
# The Benchmarks Game: Why It's Rigged and How You Can (Really) Win - Darius Emrani

## Summary
Darius Emrani is CEO of Scorecard. He built evaluation systems for self-driving cars, including at Uber ATG, which he calls "the OG AI agents", and for rockets at SpaceX, and he holds patents on evaluating autonomous systems. His thesis: the AI benchmarks game is rigged because too much money rides on it, so teams should stop playing it and build their own evals.

**Why benchmarks carry so much weight**
A benchmark is a model, a test set, and a metric. It bundles many evals and standardizes the test set and metric so models are comparable, like the SAT. Those scores now drive investment, enterprise contracts, and developer mind share. He cites an acquisition of a coding agent company that followed strong SWE-bench results: "a single number can define market leaders and destroy competitors."

**Three tricks**
1. Apples-to-oranges comparisons. xAI's launch charts compared its best configuration against other models' standard configurations and left out OpenAI o3 at consensus 64, where the model runs 64 times and takes the consensus answer. That is far more expensive, but leadership claims must compare best to best.
2. Privileged access to test questions. OpenAI funded FrontierMath and got access to the whole data set. There is a verbal agreement not to train on it, and OpenAI staff call it held out, but the funder saw the questions and announced o3's surprising 25% before independent verification. Even if above board, it creates a trust problem.
3. Style over substance. Meta entered 27 private versions of Llama 4 Maverick into LM Arena, each tuned for appeal. One answered a riddle request with a long, emoji-filled, flattering response that made no sense and still beat Claude's correct answer. When LM Arena researchers controlled for length, formatting, and personality, rankings changed and Claude 3.5 Sonnet tied for first. "We're measuring which model is most charming." Even on the SAT, 39% of score variance is essay length.

All of this follows from the law he cites: "When a measure becomes a target, it ceases to be a good measure." He quotes benchmark insiders, including Karpathy ("there is an evaluation crisis") and the creator of SWE-bench ("we kind of just made these benchmarks up").

**Fixing public benchmarks**
- Comparisons: same compute budget and constraints, no cherry-picked configurations, and transparent cost-performance trade-offs, as the ARC Prize shows.
- Test sets: open-source data, methodology, and code, no financial ties between benchmark creators and model companies, and regular question rotation.
- Metrics: control for style, and make all attempts public so nobody can cherry-pick a best run.
He points to style-controlled rankings and domain benchmarks such as LegalBench and MedQA as progress.

**Winning by not playing**
1. Gather real data: five real production queries beat 100 academic questions.
2. Choose metrics (quality, cost, latency) that fit the application.
3. Test the top five models on your own data; a leaderboard leader may fail on your legal documents.
4. Systematize for consistent, repeatable runs.
5. Keep iterating as models and needs change.
Scorecard's loop: identify issues, build improvements, run evals before deployment, deploy only at the quality bar, monitor, repeat. "All benchmarks are wrong, but some are useful."

## Why it matters
- Gives three named, sourced patterns of benchmark gaming that a reader can check any launch chart against.
- The LM Arena style-control result shows a concrete way human-preference leaderboards reward charm over accuracy.
- Offers a short, actionable alternative: a five-step custom eval process built on a handful of real production queries.
- Frames benchmark distrust as an incentive problem (a measure turned into a target), not a technical one, which explains why it persists.

## Metadata
- Video: https://www.youtube.com/watch?v=EnT4Wej5M5k
- Duration: 11:20
- Playlist index: 389
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> I'm about to show you how the AI benchmarks game is rigged and why the biggest players have every incentive to keep it that way. I'm Darius, CEO of Scorecard. I built evaluation systems at Whimo and Uber ATG for salt driving cars, which are really the OG AI agents and for rockets at SpaceX. I also have patents from Whimo on how to evaluate autonomous systems. Now, my team and I work with leaders in AI across legal tech, health tech, and finance, and we've seen every eval trick in the book. Here's what we'll cover. First, why benchmarks control billions in market value and mind share. Second, the three most common ways companies gain the system. And third, how to build evaluations that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/EnT4Wej5M5k.txt]]
- Description cue: AI benchmarks control billions in investment and shape entire markets - but the game is rigged. In this talk, I'll expose the three "cheat codes" companies use to game benchmarks:

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
