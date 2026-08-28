---
video_id: qqrk7CtkuIw
playlist_index: 1072
title: "How Anthropic Builds: Lessons from Labs — Mike Krieger, Anthropic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=qqrk7CtkuIw"
duration: "26:11"
duration_seconds: 1571
view_count: 3500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/qqrk7CtkuIw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-28T01:25:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mike Krieger on Anthropic's internal shift from task delegation to stating an end state, async multiplayer delegation via tagging, and review as a comprehension bottleneck — 'bottlenecked on human ability to even fully conceptualize what we're doing'."
---

# How Anthropic Builds: Lessons from Labs — Mike Krieger, Anthropic

## Summary
Mike Krieger describes moving from breaking work into steps himself to describing a goal and letting the model work, then discussing the trade-offs it made. Internally, most usage at Anthropic is not interactive CLI sessions but async, multiplayer delegation via tagging, where an agent holds context, keeps memory, and takes on work proactively — he describes watching a colleague make Claude responsible for part of a codebase and a feedback channel, and realising he had been underusing it. He reports the team is still bottlenecked on review, but says the deeper constraint is "bottlenecked on human ability to even like fully conceptualize what we're doing": a reviewer handed 2,000 lines says it looks like code to them. Anthropic's answer is to share an artifact carrying the intent and trade-offs rather than the diff alone. He also recounts porting a few hundred thousand lines from Python to TypeScript over a weekend, and argues first-generation AI products boxed models in so tightly that users could not be ambitious with them.

## Why it matters
- The clearest first-party statement of this book's thesis: moving from copilot to colleague is a delegation and comprehension problem, not a capability one.
- Reframes code review as a comprehension bottleneck — the constraint is understanding the change, not finding time to read it.
- Sharing intent-and-trade-off artifacts instead of raw diffs is a concrete practice for keeping humans in the loop at volume.
- The 'too constrained to be unreasonable' argument bears directly on how much tool access a harness should grant.

## Metadata
- Video: https://www.youtube.com/watch?v=qqrk7CtkuIw
- Duration: 26:11
- Playlist index: 1072
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Joining us on stage is the co-founder of Instagram [music] and a member of technical staff at Anthropic. Mike Krieger. >> How's everybody doing? I mean, good morning. Nice. Um >> Mike, thank you for releasing Fable just in time for us. >> Exactly for the conference. We timed it. >> [laughter] >> Um we're we're so glad to have you. Uh you're uh one of the preeminent builders and you're a leading labs at Anthropic. Um how has your model usage changed as as you've, you know, seen models internally grow? >> Yeah, I mean, for me it's been like both the model shift and then my role shift. So, I for like the first 2 years I was at Anthropic, I was chief product officer. And then I kept...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/qqrk7CtkuIw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
