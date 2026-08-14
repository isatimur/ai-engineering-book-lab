---
video_id: xyL2Ltkh-SA
playlist_index: 932
title: "YouTube's Model Whisperers: How Evals & Prompts Shape Behavior  — Preetika Bhateja & Daniel Bump"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=xyL2Ltkh-SA"
duration: "19:29"
duration_seconds: 1169
view_count: 1400
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/xyL2Ltkh-SA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "YouTube ads engineers describe an eval maturity path (tool hardening, critique loop, intuition-based vibing, then scaled rater eval) and a disclaimer-removal bug caught only via agent trace review."
---

# YouTube's Model Whisperers: How Evals & Prompts Shape Behavior  — Preetika Bhateja & Daniel Bump

## Summary
Preetika Bhateja and Daniel Bump, who build image and video generation agents for YouTube ads, describe an eval-maturity progression: first harden the agent's LLM-facing tools and add an independent critique-and-remediation loop, then run deliberately unscalable "vibing" (intuition-based) evals before building a comprehensive golden set, because scaling human raters too early causes unstable, hard-to-interpret swings. For human/scale raters they found the biggest gains came from giving a clear rubric with concrete examples, requiring written explanations rather than just pass/fail (including in multi-output evals where an ad could pass on brand safety but fail on accuracy), and tracking human/LLM-judge agreement rates as a calibration signal. They describe a concrete failure caught only by reading agent traces, not aggregate pass rates: an agent explicitly instructed never to remove legal disclaimers still detected a disclaimer in a sample "public parks" ad (footer text "paid by the community of parks of keep parks clean") and removed it anyway, visible only in its reasoning trace. They recommend refreshing test sets with production data, focusing on failure patterns across the golden set rather than single anecdotal fixes, and investing in online evals, and for launch readiness recommend defining precision/recall or other gatekeeping thresholds upfront to distinguish acceptable regressions from critical failures.

## Why it matters
- Gives a concrete maturity model for building evals (tool hardening, critique loop, intuition-based vibing, then scaled golden-set rater eval) that offers a reusable framework for a book chapter on evals.
- The disclaimer-removal trace example is a rare, specific "eval blind spot" case study showing why aggregate pass/fail metrics miss real failures and why trace review matters.
- The rater-calibration practices (rubrics plus examples, requiring explanations, monitoring human/LLM agreement) are production-tested, actionable guidance for scaling human-in-the-loop evaluation.

## Metadata
- Video: https://www.youtube.com/watch?v=xyL2Ltkh-SA
- Duration: 19:29
- Playlist index: 932
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi everyone. Uh sounds like everybody came back from lunch. So hope everybody is recharged and not sleepy at all. It's always interesting to do a talk right after lunch because you never know. It's a mixed crowd. Uh but we're very happy to be here. Happy to see you all. Our talk is going to be about eval. Of course, we're in the eval track. We're going to talk you through what are some things that worked for us while we were building eval uh especially for YouTube ads. We work on the YouTube ads team as part of the we do image and video models for YouTube ads. So, building an agent is hard. I think anybody who's here in the audience probably has built an agent as a side project or...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/xyL2Ltkh-SA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
