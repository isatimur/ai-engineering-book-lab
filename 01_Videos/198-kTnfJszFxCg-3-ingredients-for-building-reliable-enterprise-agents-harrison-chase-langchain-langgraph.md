---
video_id: "kTnfJszFxCg"
playlist_index: 198
title: "3 ingredients for building reliable enterprise agents - Harrison Chase, LangChain/LangGraph"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kTnfJszFxCg"
duration: "20:55"
duration_seconds: 1255
view_count: 54253
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/kTnfJszFxCg.txt"
themes:
  - "RAG & Retrieval"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:43:33+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Harrison Chase (LangChain) frames enterprise agent adoption as probability-of-success times value-when-right minus cost-when-wrong, and prescribes determinism, LangSmith observability, and human-in-the-loop gates."
---
# 3 ingredients for building reliable enterprise agents - Harrison Chase, LangChain/LangGraph

## Summary
Harrison Chase (LangChain/LangGraph), building on a conversation with Assaf (head of AI at Monday, GPT Researcher author), frames enterprise agent adoption as an expected-value equation: probability of success times value-when-right, minus cost-when-wrong, must exceed the cost of running the agent. He argues value goes up by targeting high-value verticals (legal, e.g. Harvey; financial research/summarization) or by shifting UX from fast quick-answer patterns toward longer-running "ambient" work (deep research, hours-long background agents). Probability of success goes up by making more of the system deterministic — arguing for "workflows and agents" rather than Anthropic's "workflows versus agents" framing, and citing LangGraph as built for that spectrum — plus using observability/eval tooling (LangSmith) not just for debugging but to lower enterprise review boards' perceived uncertainty, citing one customer who used LangSmith traces to get an agent approved in an unusually short review meeting. Cost-when-wrong goes down via reversibility (Replit Agent's per-file-change commits) and human-in-the-loop gates (PR review instead of direct-to-main commits), which he extends into a taxonomy of ambient-agent UX patterns: approve/reject, editable tool calls, agent-initiated clarifying questions, and "time travel" rollback to an earlier step. He closes by predicting a shift from synchronous chat agents to async/ambient agents (citing Factory's term "async coding agents"), with an "agent inbox" pattern for surfacing pending approvals, and notes in Q&A that code and math dominate current agent funding because they're verifiable (testable/compilable) domains with abundant training data, unlike less-verifiable domains like essay writing.

## Why it matters
- Supplies a compact, reusable decision framework (probability × value − cost-when-wrong vs. cost-to-run) for evaluating whether a proposed agent use case is worth building, directly usable in a chapter on agent ROI/adoption criteria.
- Names concrete production patterns (reversible commits, human-in-the-loop PR gates, agent inbox, time-travel rollback) and a concrete example (LangSmith traces shortening an enterprise approval review) that ground claims about "reliability" in specific tooling rather than generic advice.

## Metadata
- Video: https://www.youtube.com/watch?v=kTnfJszFxCg
- Duration: 20:55
- Playlist index: 198
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] I want to talk today a little bit about trying to build reliable agents in the enterprise. This is something we work with a bunch of people for both people building as developers inside of an enterprise looking to build agents for for their company but also people who are looking to build solutions and and and bring them and sell them into enterprises. Um and so I wanted to talk a little bit about some of what we see kind of being the the success tips and tricks for making this happen. So the the vision of the future that that I and other people I think have a have a similar view of for agents is that there'll be a lot of them. They'll be running around the enterprise doing...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kTnfJszFxCg.txt]]
- Description cue: It's easy to build a prototype of an agent, but hard to put an agent in production - especially in an enterprise setting. In this section, will talk about three ingredients for building reliable...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Org Design & Leadership**.
