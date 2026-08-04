---
video_id: "JsKTQbT58BY"
playlist_index: 106
title: "The Cure for the Vibe Coding Hangover — Corey J. Gallon, Rexmore"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JsKTQbT58BY"
duration: "57:02"
duration_seconds: 3422
view_count: 2927
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/JsKTQbT58BY.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:23:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Corey J. Gallon presents a framework (principles, process, tools) for production AI-agent coding: spec-driven planning, atomic features, dependency graphs, multisensory validation loops."
---
# The Cure for the Vibe Coding Hangover — Corey J. Gallon, Rexmore

## Summary
Corey J. Gallon (Rexmore) presents a named three-pillar framework — principles, process, tools — for building production software with AI coding agents instead of "vibe coding." Ten principles set the philosophy, including "you are the architect and the agent is the implementer," "specification is far greater than prompt engineering" (write the blueprint, not the prompt), "define done before implementing" via executable tests plus a multisensory feedback loop, "feature atomicity" (reduce until irreducible), and "make it work, make it right, make it fast." The process runs five sequential planning steps — vision capture into a master project specification, feature identification into a categorized feature inventory, iterative three-level specification (plain English, logic flow, formal interfaces) paired with equally leveled validation contracts, dependency analysis producing a validated dependency matrix/graph with named cycle-resolution strategies (elimination, revised specification, feature splitting, consolidation), and an implementation plan that topologically sorts features into phases — followed by a tight implementation loop where the agent writes code, executes it while gathering visual/auditory/tactile "sensory" feedback, runs tests, correlates the signals, and loops until convergence before an atomic git commit per feature. The tooling section names four required capabilities: an AI coding agent plus execution sandbox plus IDE plus voice input, a multisensory feedback system, context-engineering tooling (cross-references, slash commands, templates, markdown), and git combined with the implementation plan for progress tracking.

## Why it matters
- Provides a fully worked, named methodology — not just principles — for disciplined AI-agent-assisted development (spec-driven planning, atomic features, dependency graphs, multisensory validation) that works as a concrete case study for a chapter on moving from vibe coding to production-grade agentic engineering.
- The "multisensory feedback loop" (visual/auditory/tactile sensors alongside tests) and the three-level specification-refinement pattern are specific, reusable techniques for giving coding agents genuine self-validation and stop conditions, distinct from generic prompt-engineering advice.

## Metadata
- Video: https://www.youtube.com/watch?v=JsKTQbT58BY
- Duration: 57:02
- Playlist index: 106
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> Inspiration strikes. You've got an idea and you know exactly how you're going to build it. You fire up your favorite AI coding agent. You jam in those prompts and then you hand it over. Hey, look at him go. [music] He's done it. That is to say, you've done it. The app works. This is what 10x engineering really feels like. You're a genius. A rebel in the AI revolution. But then Monday rolls around. You want to add a feature or you want to change the way that it works and you realize that you don't understand it. You can't maintain it and you have to throw most or all of it away. Vibe coding is the low-spec zero planning approach to AI accelerated development that feels productive but results...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JsKTQbT58BY.txt]]
- Description cue: Download the slides, soundtrack and other resources from this talk at:

## Book angles
- Could support a chapter/section on **Coding Agents**.
