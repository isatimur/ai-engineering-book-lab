---
video_id: _B4Pv9ttFgY
playlist_index: 744
title: "Building Agent Interfaces: Lessons from Chrome DevTools (MCP) for Agents — Michael Hablich, Google"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_B4Pv9ttFgY"
duration: "22:38"
duration_seconds: 1358
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_B4Pv9ttFgY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-09T21:18:28+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Google's Michael Hablich shares four Chrome DevTools MCP lessons: semantic summaries over raw traces, tokens-per-successful-outcome as the efficiency metric, error-recovery playbooks, and trust boundaries."
---

# Building Agent Interfaces: Lessons from Chrome DevTools (MCP) for Agents — Michael Hablich, Google

## Summary
Michael Hablich (Google, Chrome DevTools PM) shares four engineering lessons from building Chrome DevTools MCP for agentic use. First, feeding agents a raw 50,000-line performance trace file blew through the context window, so DevTools now returns markdown semantic summaries (e.g. LCP/INP/CLS metrics) instead of raw data. Second, he proposes measuring interface efficiency as "tokens per successful outcome" (not tokens per outcome, since a cheap-but-failed run isn't efficient) compared only within a user journey, not globally, and attacks token burn via tool categorization (hiding niche tools like extension debugging behind CLI flags), a "slim mode" exposing only 3 tools (select page, navigate page, evaluate script) at the cost of extra agent turns, and a CLI interface that lets agents pipe/grep results locally instead of passing everything through tokens. Third, on error recovery, he describes adding actionable error messages that let agents self-heal, "proactive detours" that override training bias toward the wrong tool (e.g. steering to start-performance-trace instead of a Lighthouse audit), and diagnostic-playbook skills for common setup failures. Fourth, on discoverability, a single monolithic "debug webpage" tool didn't work, so it was decomposed into 25 tools — which just traded the problem for tool-selection confusion, citing a paper finding 97% of MCP tool descriptions have "quality smells"; his fix is clear purpose statements and explicit activation criteria in tool schemas, while noting that skills have the same trade-off in reverse (too many skills reintroduce the discovery problem). On trust, Chrome DevTools deliberately kept per-session consent friction on its "autoconnect" feature rather than remembering approval, citing Simon Willison's "lethal trifecta" and a three-tier trust model (local dev with human-in-loop, CI with container/profile isolation, and full-internet "YOLO mode" requiring domain allowlists and prompt-injection mitigations).

## Why it matters
- A production MCP team's concrete before/after on context-window failure (raw trace data vs. semantic summaries) is directly usable evidence for a chapter on tool-output design for agents.
- "Tokens per successful outcome," measured per user journey rather than globally, is a specific, adoptable efficiency metric distinct from generic cost/latency framing.
- Ties tool-schema design (97% of MCP descriptions have quality smells, per cited research) and the monolithic-vs-25-tools discoverability trade-off to a named security frame (lethal trifecta, three-tier trust model) — useful cross-cutting material for chapters on both agent tooling and agent security.

## Metadata
- Video: https://www.youtube.com/watch?v=_B4Pv9ttFgY
- Duration: 22:38
- Playlist index: 744
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Let's get started in in in interest of time, right? So, hi. Welcome. Let's talk about building agent interfaces today. So, let me start with a question first. Who in here is already using MCP servers or CLI tools on your uh agent Okay, everybody? That is unsurprising, to be honest. Um who in here have already built MCP servers and deployed them for effect? Okay, it's approximately half of the people. Well, today I'm going to share four engineering lessons from the Chrome uh DevTools team on how we build Chrome DevTools for agents and how we deployed it for effect. Quick context setting. Chrome DevTools for humans is used by millions of web developers on a daily basis to debug web...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_B4Pv9ttFgY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
