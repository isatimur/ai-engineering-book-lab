---
video_id: _ehJyfHg1Vk
playlist_index: 1044
title: "The Era of Compound Engineering — Kieran Klaassen, Every/Cora"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_ehJyfHg1Vk"
duration: "20:38"
duration_seconds: 1238
view_count: 640
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_ehJyfHg1Vk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-20T22:28:53+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kieran Klaassen (Every/Cora) describes compound engineering: a brainstorm-plan-work-review-polish loop that extracts his judgment into a memory system and plugin used in Claude Code, Cursor, and Codex."
---

# The Era of Compound Engineering — Kieran Klaassen, Every/Cora

## Summary
Kieran Klaassen, who built and solo-runs Cora (an agent-native AI email client at Every, in a from-scratch rebuild since January) says the bottleneck moved over two years from bad/hallucinating code, to weak plans, to deciding what to build, to his own repetition — which he solved by building a memory system, starting in a single CLAUDE.md file and growing into what he calls "compound engineering." His loop is brainstorm, plan, work, review, polish, compound, repeat, which he frames as a "human-AI sandwich": the human supplies judgment and taste at both ends (brainstorming and final review) while AI executes the middle, and his rule is to spend 50% of time building the feature and 50% teaching the system what it got wrong so the same mistake doesn't recur. He ships this as an open-source "compound engineering plugin" (built with co-contributor Trevan Chowo) that runs in Claude Code, Cursor, Codex, and others, with commands including CE-ideate (turns Linear/GitHub/Slack/Intercom backlogs into a scored, strategy-aligned HTML brief), C doc review (critiques a PRD with pointed questions), C brainstorm, C LFG (an unattended multi-hour loop that plans, works, reviews, tests, opens a PR, and attaches before/after video), C polish, and C compound (extracts the learning into a stored "solution document"). He claims the plugin is used by hundreds of thousands of people daily and argues that as implementation cost keeps falling, judgment and taste become the durable bottleneck.

## Why it matters
- Offers a concrete, named workflow ("compound engineering": brainstorm-plan-work-review-polish-compound) and a specific rule (50% building, 50% teaching the system) for turning one engineer's judgment into a reusable system, rather than a vague call to "use AI more."
- Documents a bottleneck-migration narrative (code quality to planning to product decisions to repeated instructions) that maps well onto a chapter about how AI engineering pain points shift as model capability improves.
- Gives concrete, checkable artifacts — named plugin commands (CE-ideate, C doc review, C brainstorm, C LFG, C polish, C compound) and a claimed adoption figure (hundreds of thousands of daily users, self-reported by the speaker) — worth citing carefully with that provenance noted.

## Metadata
- Video: https://www.youtube.com/watch?v=_ehJyfHg1Vk
- Duration: 20:38
- Playlist index: 1044
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] Hello. Hello everyone. Welcome. I want to start with saying I haven't written a single line of code this year. Um, maybe I haven't even looked at most of it yet. I do ship. Uh, I have a product I built that thousands of people use and trust with their email inbox, which is amazing. I'm actually proud of the code I ship and I'm proud of the product I ship. I've been doing this for two years and trying to extract my thinking and my taste into a system that compounds. And I'm going to share you how I do that. Lots of stuff you hear is like, "Oh, you should use this the factory dark factory do that blah blah blah all the new hip cool things." Uh, what I'm trying to do is not that today....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_ehJyfHg1Vk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
