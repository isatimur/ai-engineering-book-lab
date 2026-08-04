---
video_id: "wjk0ulMAkbc"
playlist_index: 6
title: "Taste & Craft: A Conversation with Tuomas Artman, CTO Linear & Gergely Orosz, @The Pragmatic Engineer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wjk0ulMAkbc"
duration: "29:17"
duration_seconds: 1757
view_count: 4778
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wjk0ulMAkbc.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T09:58:31+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Linear CTO Tuomas Artman on why AI-driven shipping speed removes the natural gate on feature quality, and how Linear enforces taste via Quality Wednesdays, a zero-bug policy, and ~10% auto-fixed bugs."
---
# Taste & Craft: A Conversation with Tuomas Artman, CTO Linear & Gergely Orosz, @The Pragmatic Engineer

## Summary
Artman argues that when agents make shipping nearly free, the old gate on feature sprawl (engineering effort was slow and expensive) disappears, and without deliberate taste a team will ship convoluted, low-quality software even faster — drawing the Uber-vs-Lyft-pool parallel, where two functionally identical products diverge slowly on quality with no A/B test to catch it. At Linear, roughly 10% of incoming bugs are already auto-fixed and auto-landed by a single-shot AI instance with no engineer involved, a share he expects to keep rising. Linear enforces quality through two concrete mechanisms: "Quality Wednesdays," a weekly 30-minute call where every engineer (about 25 people) must find and fix one small polish issue themselves — started after a single UI menu review turned up 35 problems, and the practice has since fixed roughly 2,500–3,000 such details — and a "zero bug policy" where reported bugs are auto-assigned and fixed within days (often in 2–3 hours), following one initial three-week freeze on new features to pay the bug backlog down to zero. Artman's view on AI limits: agents lack "taste" because they have no felt sense of time (they can't experience a two-second click as frustratingly slow) and no ability to judge whether an animation feels natural, which is why one of Linear's design engineers still hand-tunes AI-generated animations after the agent gets the mechanics right.

## Why it matters
- Gives concrete, named practices (Quality Wednesdays, zero-bug policy, ~10% auto-fixed bugs) for how a real product org counterbalances AI-driven shipping speed with deliberate quality control.
- Articulates a specific, falsifiable claim about a current AI limitation — no felt sense of latency or animation feel — useful for a book section on where agentic coding still needs human judgment.
- The Uber-pool/Lyft-pool anecdote is a concrete case study of how quality differences between functionally identical products play out slowly, without a measurable A/B signal, which is a useful cautionary data point for "ship fast with AI" narratives.

## Metadata
- Video: https://www.youtube.com/watch?v=wjk0ulMAkbc
- Duration: 29:17
- Playlist index: 6
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> Awesome. So, we didn't see it, but hands up if you do use linear and hands up if you heard of linear and hands up if you want to use linear. Awesome. Great to see. So we're we could be talking about linear but we're gonna talk about something a bit bigger which is a bit of a new trend that with Thomas we're talking about things are trending the wrong way right now. What is trending the wrong way? The so what happens when when agents um are capable of doing everything um immediately for you? uh the the fact that might be that like the pendulum has swung too far into the into the wrong direction where if you get a feature request you might now be in the position to just immediately ship it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wjk0ulMAkbc.txt]]
- Description cue: Tuomas Artman is Cofounder and CTO of Linear.

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
