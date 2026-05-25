---
video_id: "rcsliSIy_YU"
playlist_index: 42
title: "Automating Large Scale Refactors with Parallel Agents - Robert Brennan, OpenHands"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=rcsliSIy_YU"
duration: "1:16:21"
duration_seconds: 4581
view_count: 6215
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/rcsliSIy_YU.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T10:51:18+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Robert Brennan, co-founder and CEO of OpenHands (MIT-licensed coding agent), argues that the biggest untapped opportunity for coding agents is not interactive feature work but the mountain of tech debt every company has been deferring for years. His core claim: parallel agent orchestration can reduce CVE remediation time by 30x, but only if you decompose correctly — single-commit, single-PR tasks that an agent can one-shot, ordered by dependency graph. He gives concrete strategies for three decomposition patterns (piece-by-piece, dependency-tree ordering, scaffolding for dual-state migration) and four context-sharing approaches (share everything, human pastes manually, shared AGENTS.md, inter-agent messaging). The surprising insight: most developers won't use orchestration; it's a 1% skill that delivers order-of-magnitude lift on specific task classes."
---
# Automating Large Scale Refactors with Parallel Agents - Robert Brennan, OpenHands

## Summary
Robert Brennan is co-founder and CEO of OpenHands, an MIT-licensed coding agent that started as "OpenDev" the day after Devin's debut video. The talk covers agent orchestration for large-scale refactors — tasks too big for a single agent to one-shot but highly automatable with a thoughtful decomposition. A second segment by engineer Calvin demonstrates the OpenHands Refactor SDK live, then the talk turns into a hands-on workshop on CVE remediation.

**The evolution of coding agents**
Brennan frames the history as four phases: context-unaware code snippets → context-aware autocomplete (Copilot) → autonomous agents (can run code and fix errors) → parallel agent orchestration. Most developers are at phase 2–3; the top 1% experimenting with phase 4 are getting massive lifts on specific task classes.

**When to use orchestration vs. a single agent**
Use orchestration for tasks that are highly repeatable, automatable, and can be parallelized: CVE remediation, dependency updates, type annotation, monolith-to-microservice migration, dead code removal, error pattern fixes. One OpenHands client with tens of thousands of developers achieved 30x faster CVE resolution time by running a fleet of agents — one per vulnerability — each scanning, patching, and opening a pull request automatically.

**Why large tasks aren't one-shottable**
Context window limits, agent laziness (after migrating 3 of 100 services: "you'll need a team of six for the rest"), compounding errors, lack of codebase domain knowledge, and the human's inability to convey their mental model of the intended architecture.

**Task decomposition patterns**
1. *Piece-by-piece*: iterate over every file or function independently. Works when dependencies are loose (e.g., adding type annotations).
2. *Dependency-tree ordering*: start at leaf nodes (utility files), work up. Ensures each agent's output is already correct when the next agent builds on it. This is what Calvin demoed with the Refactor SDK — a batch graph where batches are colored by status (green = verified, red = failed) and ordered by dependency.
3. *Scaffolding for dual-state migration*: add a shim that lets the app run on both old and new systems simultaneously; migrate each component in parallel; remove the shim at the end. OpenHands used this to migrate from Redux to Zustand — each component had a separate parallel agent.

**The Refactor SDK: verifier + fixer pipeline**
The SDK wraps the decomposition cycle: a verifier (programmatic lint/test, or LLM for code-smell detection) marks batches green or red; a fixer spins up an OpenHands agent for red batches with file access, test execution, and docs; each fix produces a clean PR for human approval. Scope is narrow by design — a few hundred lines, tightly focused.

**Context sharing between agents**
Four strategies, roughly ordered by sophistication and risk:
- Share everything → defeats the purpose (same as one serial agent).
- Human manually pastes messages into each agent's chat → works but doesn't scale.
- Shared AGENTS.md file the agents can write to as they learn things → risk of agents over-populating it.
- Inter-agent messaging (broadcast or point-to-point) → powerful but increases non-determinism. One experiment had two agents enter a loop of "wishing each other zen perfection."

**Target concurrency for beginners**
Start at 3–5 concurrent agents before your brain breaks. Scale to hundreds or thousands once you have reliable intermediary review and clear dependency ordering. 90% automation is the goal, not 100% — human review of intermediate outputs remains essential.

## Why it matters
- The 30x CVE remediation improvement is a concrete benchmark for what parallel orchestration delivers on the right task class.
- The three decomposition patterns (piece-by-piece, dependency tree, scaffolding) are directly applicable to any large-scale migration project.
- The verifier+fixer loop is a reusable pattern for quality-gated parallel agent workflows.
- The inter-agent messaging section honestly catalogs the failure modes that make agent-to-agent communication tricky.

## Metadata
- Video: https://www.youtube.com/watch?v=rcsliSIy_YU
- Duration: 1:16:21
- Playlist index: 42
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> All right. Thank you all for for joining for automating massive refactors with uh with parallel agents. Um super excited to talk to you all today about uh you know what we're doing with open hands to really automate large scale chunks of software engineering work. Lots of uh lots of toil related to tech debt, code maintenance, code modernization. Uh these are tasks that are super automatable. Uh you can throw agents at them, but they tend to be way too big for like you know a single just one shot. So it involves a lot of what we call agent orchestration. Uh we're going to talk a little bit about how we do that uh with Open Hands and also just more generically. Uh a little bit about me. Um...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/rcsliSIy_YU.txt]]
- Description cue: Today's agents are best at small, atomic coding tasks. Much larger tasks--like major refactors and breaking dependency updates--are highly automatable but hard to one-shot.

## Book angles
- Could support a chapter/section on **Coding Agents**.
