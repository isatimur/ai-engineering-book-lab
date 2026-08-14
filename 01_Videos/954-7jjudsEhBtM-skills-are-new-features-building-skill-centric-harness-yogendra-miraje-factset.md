---
video_id: 7jjudsEhBtM
playlist_index: 954
title: "Skills are new features: Building Skill-Centric Harness — Yogendra Miraje, FactSet"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=7jjudsEhBtM"
duration: "17:24"
duration_seconds: 1044
view_count: 2500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/7jjudsEhBtM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "FactSet's Yogendra Miraje argues skills are the new features in agentic products, with descriptions as routing signals, and that skills need evals since a model upgrade silently broke skill compliance with no skill changes."
---

# Skills are new features: Building Skill-Centric Harness — Yogendra Miraje, FactSet

## Summary
Yogendra Miraje, principal AI engineer at financial data company FactSet, describes migrating from a prior year's internal "blueprints" convention (fixed recipes handed to agents) to Anthropic's open-sourced skills standard once it shipped, and argues that in agent-first products — where prompts define who the agent is and tools define what it connects to — skills are what define how a task gets done, effectively becoming "the new features" that replace UI screens for workflows like equity research and wealth management. He walks through a minimal skill-enabled harness (a skill registry plus system prompt plus file-read tool, with bash/sandbox added for script execution) and progressive disclosure, where only each skill's name/description/path — not its full body — is loaded into the system prompt, making the description the "routing signal" that determines which skill fires (e.g., a report-PDF skill only triggers on the word "PDF" in the request). He reports two concrete lessons from production: skill libraries should be cut by user intent rather than by underlying data model (narrow skills like "estimation analysis" or "fundamentals" were refactored into intent-shaped skills like "earnings preparation" or "pre-market briefing"), and a model upgrade silently broke skill compliance with zero changes to the skill file because the new model weighted the beginning of the skill more heavily while FactSet's critical instructions sat at the end — leading him to conclude "skills without evals are really just wishful thinking" and that skills are version-pinned contracts that must be re-evaluated on every model upgrade. At scale (over ~10 skills) he recommends shortlisting mechanisms (embeddings/similarity search or a smaller routing model) before stuffing all skills into the prompt, and at hundreds of skills, formal governance across five axes — admission, ownership, boundaries, lifecycle, coherence — borrowed directly from code-review practices (PR-style gating, named skill owners, semantic versioning and deprecation warnings, tool allow-lists, periodic audits).

## Why it matters
- The claim that a model upgrade silently broke skill compliance with an unchanged skill file (due to positional attention bias toward the start of the document) is a concrete, testable failure mode for any chapter on skills/prompt reliability across model versions.
- "Skills are the new features, harnesses are the new product" reframes the engineer's job in agent-first products — a specific organizational claim (who ships what) worth citing alongside other skills/harness talks in this cluster.
- The governance model (admission, ownership, boundaries, lifecycle, coherence, mapped to existing code-review practices) is a concrete, adoptable framework for enterprise skill-library management once a company passes single-digit-to-low-hundreds skill counts.

## Metadata
- Video: https://www.youtube.com/watch?v=7jjudsEhBtM
- Duration: 17:24
- Playlist index: 954
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi everyone, I am Yogi. I work at Faxet as principal AI engineer. We are a financial data and research company. I'm going to talk about how to build skill centric agentic products and I'm going to post slides so you don't have to keep uh taking photos. So that's my exandle yogi not the bear. Um so let's connect there and uh let's begin. So in the last year's talk in this very conference I talked about blueprints and what blueprints were really a simple set of steps or recipe that you can hand over to agents so that agent doesn't have to discover its path every time and when I look back it was simply a skill in a very naive form and a lot has changed since Then Antropic has shipped...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/7jjudsEhBtM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
