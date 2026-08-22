---
video_id: "cZ5ZJy19KMo"
playlist_index: 446
title: "Mission-Critical Evals at Scale (Learnings from 100k medical decisions)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=cZ5ZJy19KMo"
duration: "12:15"
duration_seconds: 735
view_count: 3383
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/cZ5ZJy19KMo.txt"
themes:
  - "Evals & Reliability"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:18:42+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anterior built real-time, reference-free evals with a clinician-escalation ladder for prior authorization, citing active US healthcare AI lawsuits as the reason errors can't slip through."
---
# Mission-Critical Evals at Scale (Learnings from 100k medical decisions)

## Summary
Christopher Lovejoy (a medical doctor turned AI engineer at Anterior) describes eval infrastructure for prior-authorization decisions serving insurers covering 50 million lives, motivated in part by the fact that "many organizations in US Healthcare are being sued right now for using AI automation inappropriately." He illustrates the stakes with a concrete failure mode: the model treated a prior MRI finding "suspicious for" multiple sclerosis as equivalent to a "confirmed" diagnosis, a medically meaningful distinction that made the output wrong even though it looked reasonable on the surface. Human review alone doesn't scale: holding review volume at a fixed ratio of total decisions means clinician headcount must grow linearly with case volume (roughly 5 clinicians per 1,000 decisions/day scaling to 50 clinicians per 100,000/day), and offline eval sets lag behind edge cases that only appear in live traffic. Anterior's answer is a real-time, reference-free (label-free) eval layer — an LLM-as-judge plus confidence estimation scoring every case before ground truth exists — used to estimate live performance and to dynamically prioritize which cases get scarce human review, in what he calls "validating the validator." Depending on the reference-free eval's confidence, a case is returned to the customer as-is, sent to a more expensive model, escalated to an on-call clinician, or surfaced in the customer's own review dashboard; the team reports reaching an F1 of nearly 96% on prior authorization with a review team of under 10 clinicians, versus a competitor reported to employ over 800 nurses for the same task.

## Why it matters
- Verification here is a compliance response, not an optimization: the speaker cites live US lawsuits against healthcare organizations over inappropriate AI automation as the reason "we just can't make mistakes like this."
- A concrete escalation ladder exists for low-confidence outputs: route to a stronger model, an on-call clinician, or the customer's own review dashboard, rather than returning the answer as-is.
- Reported figures (F1 near 96%, under 10 clinicians vs. a competitor's 800+ nurses) are transcript-grounded, self-reported claims from the speaker, not independently verified third-party statistics.

## Metadata
- Video: https://www.youtube.com/watch?v=cZ5ZJy19KMo
- Duration: 12:15
- Playlist index: 446
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Org Design & Leadership]]

## Transcript excerpt
> hi my name is Christopher ljy and I'm a medical doctor turned AI engineer and in this talk I'm going to consider what it means to build an eval system that works at scale and in particular one that supports Mission critical decisions like in healthcare where there's no room for error now this is something we've had to figure out at anterior as we've scaled to now serve insurance providers covering 50 million American lives so I'll share what we've learned in the last 18 months why real-time reference-free evals can be the special source that enables customer trust and how you can build them for your company so we've all seen that it's pretty easy to create an MVP product powered by llms and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/cZ5ZJy19KMo.txt]]
- Description cue: So you've built your LLM product, have paying customers and your LLM throughput is increasing. Great! But scale introduces its own problems: it'll uncover new edge case user inputs and failure...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://chrislovejoy.me/mission-critical-evals>
