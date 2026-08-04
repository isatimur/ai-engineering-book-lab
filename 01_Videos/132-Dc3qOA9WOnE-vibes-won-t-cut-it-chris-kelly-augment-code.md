---
video_id: "Dc3qOA9WOnE"
playlist_index: 132
title: "Vibes won't cut it — Chris Kelly, Augment Code"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Dc3qOA9WOnE"
duration: "15:34"
duration_seconds: 934
view_count: 86684
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Dc3qOA9WOnE.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:25:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Augment Code's Chris Kelly argues AI-generated code still needs production engineering discipline (docs, tests, code review), since LLMs pattern-match rather than make architectural decisions."
---
# Vibes won't cut it — Chris Kelly, Augment Code

## Summary
Chris Kelly (Augment Code) argues that predictions of software engineers disappearing misread the situation: AI-generated code is still code, written in the same 50-year-old languages, that still has to run in complex production systems with emergent failure modes someone must diagnose. He distinguishes "vibe coding" (accepting AI output unexamined) from professional engineering for systems with four-nines uptime and real users, and reframes the job itself — quoting Jeff Atwood's "the best code is no code at all" — as making the thousands of architectural decisions (e.g., monolith vs. microservices vs. event-driven) that LLMs, which pattern-match and generate text rather than decide, cannot make, especially once a codebase becomes a "snowflake" too idiosyncratic to pattern-match against. His concrete recommendations for making a codebase AI-tractable are: documented standards/practices, reproducible dev environments, fast local testing, clearly bounded task scope, and well-defined work items, paired with a claim that code review — not code generation — is the underrated, undertrained skill that will matter most as agents write more code, calling current code-review tooling (lexicographically sorted diffs) inadequate for the task. He closes with practical tips: distrust an LLM's self-reported actions since it only generates plausible text (e.g., claiming it "skimmed" rather than read a file), tolerate stylistic differences in AI-written code via linters/rule files rather than manual style policing, and use a "create-refine loop" — have the model draft a markdown plan first, iterate on the plan, then generate and refine code against it.

## Why it matters
- Directly engages a live industry debate (will AI replace engineers / is vibe coding sufficient for production) with a practitioner's specific counter-framing: code generation vs. the decision-making work of engineering.
- Supplies a concrete, actionable checklist (docs, reproducible environments, fast tests, bounded scope, defined tasks) for what makes a codebase tractable for AI coding agents — useful as engineering-practice material rather than opinion.
- Raises code review as the emerging bottleneck skill and critiques existing code-review tooling, a specific and testable claim for a chapter on how engineering workflows must adapt around agents.

## Metadata
- Video: https://www.youtube.com/watch?v=Dc3qOA9WOnE
- Duration: 15:34
- Playlist index: 132
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> [Music] Thanks for coming, by the way, and uh for sticking around for a little while. Um, if you aren't prepared, I hate to break it to you, but this time next year, half of us won't even be here anymore. That's basically if you listen to whatever the hype is about AI and AI coding. You know, there's lots of fanfare, no disrespect, very intelligent people um that made these quotes. Um but I think they're probably wrong. Not because I don't think AI coding is going somewhere important, but probably because they haven't actually touched a production system in a very very long time. And so maybe generating code at 30% isn't really what they think it is because really AI code is still code. One...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Dc3qOA9WOnE.txt]]
- Description cue: What's the role of vibe coding in a production-grade applications? Join Augment Code's Chris Kelly as he talks about the role of context in software engineering, not code.

## Book angles
- Could support a chapter/section on **Coding Agents**.
