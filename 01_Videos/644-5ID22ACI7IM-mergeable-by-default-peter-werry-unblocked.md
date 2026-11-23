---
video_id: 5ID22ACI7IM
playlist_index: 644
title: "Mergeable by default — Peter Werry, Unblocked"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=5ID22ACI7IM"
duration: "1:41:25"
duration_seconds: 6085
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/5ID22ACI7IM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-07T23:19:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Peter Werry of Unblocked, with colleague Brandon, argues that code intelligence is no longer the bottleneck for coding agents; organizational context is. Agent output should feel written by someone on your team for 20 years. He debunks three myths (naive RAG over docs, wiring up many MCP servers, bigger context windows), names the 'satisfaction of search' failure, and lists lessons: surface unresolved conflicts, never cache answers, flow access controls through. On one task a context engine cut 2.5 hours and 21M tokens to 25 minutes and 10M. The workshop builds a social graph of code experts from PR reviews."
---

# Mergeable by default — Peter Werry, Unblocked

## Summary
Peter Werry of Unblocked runs this session with his colleague Brandon: a talk on context engines, then a workshop. His thesis: models are close to solving code intelligence, so "now the bottleneck is context". A new hire builds organizational context through mentors, incidents and battle scars: why things are the way they are. Agents start each task at ground zero. Until recently you were the context engine, handing the agent the ticket and correcting it. That does not scale to parallel or background agents, where the human becomes the bottleneck. His goal: AI-generated code should feel like it was written by someone on your team for 20 years.

**Three myths**
- Naive RAG over your docs is a context engine. It lacks personalization and conflict resolution, and it pulls in code from unrelated repos.
- Wire up a bunch of MCP servers and you are done. "Access doesn't equal understanding": the agent does not see the relationships or the history behind the data.
- A bigger context window will fix it. Long context finds a needle you already know about but reasons poorly across sources, and most organizations hold more than a million tokens of context anyway.

**Satisfaction of search**
He borrows the term from radiology: a reader finds one thing that explains the symptoms and stops looking. Agents do the same in docs and code. They miss the golden nugget in an old Slack thread or incident report, such as what the team tried and rejected.

**What a context engine needs**
Unified context that links data and distills patterns from past PR comments into memories; conflict resolution; targeted, personal retrieval (deep retrieval on the repos you contribute to, wider retrieval elsewhere); data governance, so private Slack channels only inform answers for people with access; and the right context at the right time for token efficiency. On conflicts, recency alone failed, and main-branch code alone failed too, because the agent needs to know where you are going, not only where you have been. Expert conversations outweigh random chatter.

**Hard lessons**
They first optimized for access over understanding. They hid conflicts they could not resolve instead of surfacing them for human feedback. And caching answers backfired: data changes, and feeding old answers back in makes the model "regress towards a mean".

**Results and uses**
On a task to add Anthropic's new adaptive thinking mode, plain Claude Code with GitHub and Slack MCP servers took 2.5 hours and 21 million tokens over four correction loops and dropped legacy code. With the context engine it took 25 minutes and 10 million tokens and kept backward compatibility. He admits the scoring numbers in the slide came from Claude, so trust the "vibe" more than the figures. The biggest win is in planning, then review, ticket enrichment, triage, incident management wired to error and monitoring tools, and engineering support channels. In one review, the bot flagged duplicated tests using a best practice distilled from earlier PRs by the same author.

**The workshop and Q&A**
Attendees build an MIT-licensed social graph from PR review data that clusters teams and maps experts by code area. In Unblocked, experts act as pivot points: "bottling the expert" gives retrieval a direction, and an expert's feedback carries more weight than a new engineer's. In Unblocked's data, Claude Code is the most used client, then Cursor. Context gathering takes about 90% of an agent's time, and output tokens, not input tokens, drive latency. Sentiment sits around 60 on a scale from minus 100 to 100.

## Why it matters
- Gives the book a sharp name and example for a common agent failure: satisfaction of search, where the agent stops at the first plausible source.
- The before/after numbers (2.5 hours and 21M tokens to 25 minutes and 10M) show that most savings come from avoiding correction loops, not from faster code writing.
- Three lessons apply to any context system: surface unresolved conflicts, never cache answers, and let only trusted experts' feedback reshape memory.
- Shows how access control limits synthesis: cross-team summaries, as in graph RAG, break permission boundaries unless kept in separate compartments.
- The claim that output tokens, not input tokens, drive latency argues for spending more effort on context before generation.

## Metadata
- Video: https://www.youtube.com/watch?v=5ID22ACI7IM
- Duration: 1:41:25
- Playlist index: 644
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right, thanks everyone. Sorry about the wait. Um, this is going to be a a bit of a strange session because um there is a workshop component to this. So, uh I guess everyone will be coding on their laps. Sorry. Um but anyways, sorry. I'm Peter and uh this is my colleague Brandon. Um so we're we're going to break this this session into two different parts. One is a um sort of a talk that I'm going to give about what context engines are are useful for and and how you might go about building one, what to think about. Um and then we'll we'll launch into the u the second part of it. So um just briefly um quick quick agenda. We're going to talk about three myths that are circulating uh right...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/5ID22ACI7IM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
