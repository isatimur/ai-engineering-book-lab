---
video_id: 9HbzAWnKbo4
playlist_index: 931
title: "From Signal to PR: Anatomy of a Self-Improving Agent — Jason Lopatecki, Arize"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=9HbzAWnKbo4"
duration: "20:36"
duration_seconds: 1236
view_count: 1300
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/9HbzAWnKbo4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:22:25+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jason Lopatecki, founder of Arize, argues that observability is moving from dashboards humans click to a loop where agents read telemetry and propose fixes. The bottleneck is no longer writing the fix but trusting it, so the engineer's job moves from responder to reviewer. He demos Signal, which runs a coding-agent harness in a sandbox on a schedule or on errors, pulls traces and logs into the repo as files through composable skills, and opens GitHub issues or PRs. His advice: trace and log 10 times more, because agents, not humans, now dig through the noise."
---

# From Signal to PR: Anatomy of a Self-Improving Agent — Jason Lopatecki, Arize

## Summary
Jason Lopatecki is the founder of Arize and calls himself a builder first. His team ships an in-product agent called Alex, and he admits the first version "frankly sucked". Signal is the next generation: it automates the debugging work his team does every day. This is a short talk with a product demo and a Q&A.

**Observability is now for agents**
Observability used to be for humans: a UI you click, a graph you look at. Lopatecki says telemetry is now the "smoke" a system throws off, and it tells an agent which code path the software took. Without it the agent guesses among a million paths. You can build at agent speed, but you cannot yet improve systems at agent speed. The bottleneck is no longer the fix. It is confidence that the fix is the right one to push.

**The inverted loop**
In the old loop a human looks at the data and an agent fixes it. In Signal's loop the agent reads the data first and opens an issue, so a person wakes up to issues with deep evidence already attached. The loop has four parts: an event or a periodic trigger (for example every five minutes, or on each error), context gathered through skills, the repo, and a sandbox to run in. The skills pull small temp files of traces and logs into the repo, so the agent sees what happened next to the code that ran.

**A concrete example**
Alex hit a "stream canceled" error while it called its to-do update tool many times. Signal found it in the background and proposed a one- or two-line fix. Lopatecki says bigger fixes still need a human to carry them over the line, but the agent gives a cold start. Your job moves "from responder to reviewer".

**Trace ten times more**
Teams logged less in the past because humans cannot dig through all the logs; it is noise. If an agent does the digging, you should trace and log 10 times more, in some places every inch of the software.

**An open box, not a black box**
Signal runs in the AX SaaS platform; Phoenix is the open-source product. You pick the harness (Claude Code in the demo), the sandbox, the prompt and the skills. Customers such as Uber and Booking do not want to connect production systems to a model provider, so Arize installs sandboxes in their VPC; Daytona is an alternative. Every session keeps a transcript you can download and resume locally.

**Q&A: why not just point Claude Code at the data?**
You should, he says, but the work is in skill design: find the right group of traces first, then write them into the repo as files, because harnesses are "magical with files". Some files reach 10 MB. Pyroscope skills can find memory issues and cohort by customer.

**Where evals fit**
Evals are online LLM-as-judge checks layered on production traces. Teams usually build one for a failure they have already seen, such as prompt injection. Signal reads eval results from the traces together with the raw data.

## Why it matters
- It names a clear shift for the reliability chapter: the cost of a fix falls to near zero, so trust and review become the bottleneck.
- The trace-ten-times-more argument reverses old logging advice, because the agent, not a human, now pays the cost of noise.
- The Q&A gives a concrete skill-design rule: fetch narrow trace sets and write them into the repo as files, instead of giving the agent raw data access.
- The VPC sandbox point shows why self-improving loops in enterprises must run next to production data, not at a model provider.

## Metadata
- Video: https://www.youtube.com/watch?v=9HbzAWnKbo4
- Duration: 20:36
- Playlist index: 931
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Well, thank thank you all. Um, let me get set up here. So, not just the the founder of Arise, but but I tend to build an incredible amount of stuff. Um, let's see if we get this going here. Oh, sorry. One more second. Um, so not just a founder here, but but also a builder and I do my best to um uh to to to build agents assistance. Um, we have an agent in product. We have an agent in product called Alex and uh and a lot of I think a lot of my experience has come from actually um trying to make the stuff work and work well. Our first version of our our own agent frankly sucked. Uh it was many years ago uh probably two years ago when the first in the space to do it. Um and a lot of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/9HbzAWnKbo4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://arize.com/author/jason-lopatecki>
