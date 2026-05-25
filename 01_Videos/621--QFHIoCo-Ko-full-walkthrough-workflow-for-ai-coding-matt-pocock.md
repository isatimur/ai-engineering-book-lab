---
video_id: -QFHIoCo-Ko
playlist_index: 621
title: "Full Walkthrough: Workflow for AI Coding — Matt Pocock"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-QFHIoCo-Ko"
duration: "1:36:29"
duration_seconds: 5789
view_count: 191169
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-QFHIoCo-Ko.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:17+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Matt Pocock (teacher, Total TypeScript / AI Hero) argues that software engineering fundamentals — not AI-specific tricks — are what make AI coding work. His core claims: LLMs degrade past ~100k tokens (the 'dumb zone'), compact/clear beats compacting, and 'specs-to-code' is vibe-coding with extra steps. The practical workflow he demos live runs grill-me → write-a-PRD → PRD-to-issues (vertical slices, not horizontal layers) → AFK Ralph loop with TDD. He shows sub-agents burning 93k tokens on Opus while the parent context stays thin. Contrarian angle: he doesn't read the PRD he generates; the grilling session is the alignment, not the document."
---

# Full Walkthrough: Workflow for AI Coding — Matt Pocock

## Summary

Matt Pocock (teacher, Total TypeScript / AI Hero) runs a two-hour live workshop demonstrating his complete AI coding workflow on a real course-management codebase. His central thesis is that AI is not a new paradigm — the same software engineering fundamentals that make human collaboration work (shared understanding, vertical slices, tight feedback loops, TDD) are what make AI coding reliable.

**The LLM smart zone / dumb zone model.** Pocock adopts Dex Hy's framing: LLMs do best work early in a conversation. Attention scales quadratically with tokens, so by ~100k tokens the model degrades noticeably — regardless of whether the context window is 200k or 1M. The 1M window just ships more dumb zone. Implication: keep each agent session small, clear context often, never compact if you can avoid it.

**Grill-me before writing any plan.** Rather than jumping to specs or plans, Pocock's first step is the grill-me skill: the LLM relentlessly interviews the developer one question at a time, provides a recommended answer for each, and builds a shared design concept. He cites Frederick Brooks on the "design concept" — the shared mental model that must exist between all participants before implementation. The grill-me session is the asset; the PRD is just a summary of it. He explicitly says he doesn't read the PRD he generates because he already has the alignment.

**PRD → vertical-slice issues.** After grilling, he runs write-a-PRD to create a destination document, then PRD-to-issues to break it into a directed acyclic graph of independently-grabbable tickets. Critical rule: issues must be vertical slices (cutting through schema + service + UI), not horizontal (schema first, API second, front-end third). AI naturally wants to code horizontally; engineers must push back. Vertical slices give the agent feedback on the full stack after each phase.

**The AFK Ralph loop.** Implementation is the only truly AFK phase. A bash script passes all issue files and the last five git commits to Claude Code in a loop with `--permission-mode except-edits`. The agent picks the next available ticket, uses TDD (red-green-refactor) to implement, and leaves a summary. Human reviews output; AI re-enters the smart zone on a clean context for each ticket. TDD is essential here because writing tests after implementation just confirms decisions rather than catching bugs.

**Sub-agents and parallelization.** Pocock shows a sub-agent burning 93.7k tokens on Opus to explore the repo, while the parent context stays thin. The kanban board structure enables parallelization: issues with no blocking dependencies can be grabbed simultaneously by independent agents. A sequential multi-phase plan can only be worked by one agent; a DAG of tickets scales to many.

**What stays human-in-the-loop.** Grilling (alignment), PRD review, and kanban shaping are human tasks. Implementation is AFK. QA and code review remain human, and Pocock acknowledges frankly that more AI-generated code means more code review — "I don't feel good saying that, but I think that's where we're going."

## Why it matters
- The grill-me → PRD → vertical-slice → AFK loop is one of the most detailed, live-demonstrated AI coding workflows on record — directly citable as a worked example.
- The "dumb zone at ~100k" heuristic challenges the assumption that larger context windows solve context degradation; useful as a concrete counter-claim.
- Vertical slices vs. horizontal layers is a transferable principle for any chapter on agent-driven development: AI left unconstrained codes horizontally, robbing itself of feedback.
- TDD with agents as the primary mechanism to prevent tests that just ratify implementation choices rather than validate behavior.

## Metadata
- Video: https://www.youtube.com/watch?v=-QFHIoCo-Ko
- Duration: 1:36:29
- Playlist index: 621
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Yeah, we good. >> Okay, folks, we're at capacity. Let's kick off. I don't want you waiting here for 25 more minutes before we some arbitrary deadline. So, welcome. My name is Matt. Uh I'm a teacher and I suppose now I teach AI. Um we have a link up here if you've not already been to this which is has the exercises for the um stuff we're going to do today. This is going to be around two hours. So we might just sort of kick off two hours from now. Is that right Mike? >> Yeah. Perfect. Um, and the theory behind this talk or at least the thesis under which I've been operating for the last kind of six months or so is that we all think that AI is a new paradigm, right? AI is obviously changing a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-QFHIoCo-Ko.txt]]
- Description cue: A hands-on workshop covering the full lifecycle of AI-assisted development, from turning ambiguous requirements into agent-ready plans to running autonomous coding agents that ship production features.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
