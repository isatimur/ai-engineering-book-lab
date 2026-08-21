---
video_id: Z-c11pV_uvU
playlist_index: 990
title: "Anthropic's CCA Exam as a Field-Guide for Agentic Engineering — Frank Coyle, UC Berkeley"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Z-c11pV_uvU"
duration: "20:08"
duration_seconds: 1208
view_count: 49000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Z-c11pV_uvU.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:35:46+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Frank Coyle (UC Berkeley) walks through Anthropic's Claude Certified Architect exam, extracting anti-patterns: stop-reason checks, single-tool sub-agents, context forking, batch CI mode."
---

# Anthropic's CCA Exam as a Field-Guide for Agentic Engineering — Frank Coyle, UC Berkeley

## Summary
Frank Coyle, a UC Berkeley computer science lecturer, walks through Anthropic's Claude Certified Architect (CCA) exam: a timed, proctored, scenario-based exam ($99 for individuals, retakeable every six months) covering five weighted domains — agentic architecture (27%), Claude Code configuration and workflow (20%), prompt engineering and structured output, tool design and MCP integration, and context management and reliability — drawn from six production scenarios, four of which are randomly selected per sitting. He extracts an anti-pattern from each scenario: checking the model's stop reason (tool use, end of turn, or hitting a token limit) rather than blindly consuming whatever the agent loop returns; using hierarchical CLAUDE.md files at the project, folder, and subdirectory level; giving multi-agent systems specialized single-tool sub-agents instead of one agent loaded with every tool, partly to avoid inter-agent "groupthink" that comes from sharing reasoning context; forking subtask context so only a summary returns to the main thread, with compaction triggered once token count passes a set threshold he puts at roughly 150,000 tokens; and avoiding interactive permission-prompt modes in CI pipelines in favor of Claude's batch mode, which he describes as roughly 50% cheaper per token with about a 24-hour turnaround. He frames the current focus on "agentic loops" through Böhm and Jacopini's 1966 proof that sequence, conditionals, and loops are the three constructs needed for Turing completeness, arguing the loop is the piece giving current agent systems their power.

## Why it matters
- A structured, exam-derived taxonomy of agent-engineering anti-patterns — stop-reason handling, single-tool sub-agents, context forking and compaction, batch mode in CI — that doubles as a practical checklist for building production agent systems.
- Anthropic's own weighting of skill domains (agentic architecture 27%, Claude Code configuration 20%, etc.) is a data point on what a major lab considers the core competencies of agentic engineering.
- The Böhm-Jacopini framing gives a concrete theoretical grounding — a 1966 structured-programming theorem — for why "loops" are the current locus of agent-system power, useful for tracing agentic patterns back to CS fundamentals.

## Metadata
- Video: https://www.youtube.com/watch?v=Z-c11pV_uvU
- Duration: 20:08
- Playlist index: 990
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Okay, I'm getting rolling and uh welcome aboard. We just had a little technical issues, but uh we resolved them. So, my name is Frank Coyle. Uh I am a computer science guy. I've been teaching computer science for over 30 years, and I'm now teaching at Berkeley. And one of the problems that uh all my students, past and present, are having is AI, because computer science is no longer the magic pathway to a job. So, I've been trying to figure out ways to uh help them come up with schemes to help them get ready for this world of agentic AI. And one of the things that sort of uh dropped into my uh plate was the something called the Claude Certified Architect exam, which I will be...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Z-c11pV_uvU.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
