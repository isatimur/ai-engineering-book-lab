---
video_id: 504PvfXou5Y
playlist_index: 738
title: "BDD, ADR, PRD, WTF: Capturing Decisions for Humans and AI Alike — Michal Cichra, Safe Intelligence"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=504PvfXou5Y"
duration: "12:49"
duration_seconds: 769
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/504PvfXou5Y.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-06-04T14:10:32+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Michal Cichra of Safe Intelligence argues that humans and LLMs share one weakness, limited context, so teams must write down why things are the way they are. Architecture decision records state a rule, its reason and how it is enforced; light PRDs capture the why, the problem, the goal and the user journey; BDD with Cucumber gives readable, executable specs that close the loop spec-driven development leaves open; a design system keeps agent-built UIs consistent. A loop of git hooks, CI, linters and focused skills enforces it all, rejects bad commits with links to the reasons, and lets agents survive 20-50 context compactions per session."
---

# BDD, ADR, PRD, WTF: Capturing Decisions for Humans and AI Alike — Michal Cichra, Safe Intelligence

## Summary
Michal Cichra works at Safe Intelligence, which had just released a new product to test agents. Before that he was at Microsoft and Red Hat and spent 10 years on a single product. His thesis: the consistency problems teams face with AI are the old problem of lost decisions, now arriving sooner. He opens with the five-monkeys story, where new monkeys keep enforcing a rule that none of them knows the reason for. Humans and LLMs share the same trait, limited context: "People forget. LLMs context compact." Teams end up asking why a flow exists or why code is shaped a certain way, with no founding engineer to ask.

**ADR: architecture decision records**
An ADR records why you do something and how you enforce it, with examples and code snippets. His examples: split code into layers to prevent N+1 queries, enforced by linting module imports; make database reads return plain shapes instead of ORM objects. His product has about 50 more. There is no required format, and text alone enforces nothing, so a tool must enforce the rule. When the tool fails, its message says what the rule is, why it exists and how to fix it, and the agent goes to the ADR for detail. An ADR can also state which files or folders it covers.

**PRD: product requirements documents**
A PRD can be light: why the feature exists, the problem, the goal, and the user journey that connects them. It serves agents and "you 6 weeks from now" alike.

**BDD with Cucumber**
Spec-driven development leaves a gap: how do you check the product adheres to a markdown spec? And "one thing harder than reading an AI code is reading AI tests". BDD adds a human-language layer that is both readable and executable. Cucumber, "almost forgotten, suddenly useful again", parses scenarios into steps that run as code. Scenarios link to PRDs and critical user journeys and are easier to review than ordinary tests.

**Design systems for consistent UI**
Agents find consistent UIs especially hard. The answer is unchanged from before AI: a design system and pattern library. Define the language (what a primary button looks like), the rules (one primary button visible on a page), and components with previews that both humans and agents can see. Build small pieces into bigger ones and reuse them.

**The enforcement loop**
The loop is git hooks, skills, CI, linters and other checks. Agents must use git to deliver a PR, so hooks run predefined tasks, and CI runs the same tasks to catch an agent that skips them. Checks cover linting, formatting, type checking, duplication, architecture and document linting. Style is no longer a review topic; it is automated rule. Architecture is enforced through import rules: the end-to-end BDD suite cannot import any module that touches the database, and templates cannot query the database, so N+1 queries cannot happen. A rejected commit links back to the document; the agent reads it, fixes and retries. Skills change the loop's focus: ADR and PRD skills, a UI skill that skips some checks and iterates fast in a browser, a test skill that picks tests from coverage and changed files, and one that records the model's decisions for later review.

**The cost**
It is context heavy; research can use half the context. But he no longer fears compaction: his sessions run 20-50 compactions, and the important rules survive because the agent looks them up again. The goal is multi-hour autonomous sessions with clear rules.

## Why it matters
- Error messages that state the rule, the reason and the fix, and link to an ADR, are a concrete way to make enforcement teach the agent instead of just blocking it.
- Using Cucumber as a readable, executable layer addresses a real gap in spec-driven development: verifying that the product matches the spec.
- Import-boundary rules (no database access from templates or from the BDD suite) show how to prevent whole bug classes, such as N+1 queries, instead of hunting them.
- Running the same checks as git hooks and in CI catches agents that skip local steps.
- The report of 20-50 compactions per session without losing key rules is practical evidence that externalised decisions make long agent sessions robust.

## Metadata
- Video: https://www.youtube.com/watch?v=504PvfXou5Y
- Duration: 12:49
- Playlist index: 738
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Hi, I'm Michal. Welcome to capturing decisions for humans and AI alike. Yesterday with a team from Safe Intelligence, we have released Spec 27, a new product to test agents. Before that, I was in Microsoft, Red Hat, and spent in 10 years working on a single product. The consistency problems we face with AI and the story of capturing decisions show up in every product I have seen. And these notes are distilled from the experience. And you can find me at the booth. Um So, BDD, PRD, ADR, like that's a lot of acronyms. Uh why does any of that matter? So, let's unpack it from the end. You probably know this story. Uh I hope it's not an urban legend, uh but scientists put five monkeys...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/504PvfXou5Y.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://cz.linkedin.com/in/michal-cichra-61188a84>
