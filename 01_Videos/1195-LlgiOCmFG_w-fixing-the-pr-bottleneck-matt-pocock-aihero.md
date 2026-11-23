---
video_id: LlgiOCmFG_w
playlist_index: 1195
title: "Fixing the PR Bottleneck — Matt Pocock, AIHero"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LlgiOCmFG_w"
duration: "22:35"
duration_seconds: 1355
view_count: 308000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/LlgiOCmFG_w.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T16:12:43+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Matt Pocock (AIHero) argues that a software factory full of accelerators becomes a 'slop cannon' unless it has brakes, and that the fix for the PR bottleneck is to make human review faster by leaning on two cheaper layers: deterministic checks and automated review. Checks can lie (tautological tests, structure-sensitive tests, over-mocked tests), so design deep modules, keep coding standards out of the overloaded implementer agent, and give them to a separate reviewer sub-agent that commits fixes. His PR skill flags one-way versus two-way doors and blast radius; his retro skill turns each review into new checks and standards."
---

# Fixing the PR Bottleneck — Matt Pocock, AIHero

## Summary
Matt Pocock (AIHero) frames the PR bottleneck as an old problem that AI has made much worse. A software factory adds accelerators: agents and deterministic triggers, such as slow-query reports, start work without a human. Pure acceleration gives you a "slop cannon." You need brakes, because "code is the environment your agent operates in," and bad code begets more bad code. His goal is to make human review faster by leaning on the two layers below it, and he uses his own skills as the rubric.

**Three layers of review**
Automated checks (lint, tests, types, quality metrics) sit at the bottom, then automated review by agents, then human review. Checks are cheap, costing only CPU, so most teams should add many more. But "checks can lie": a green CI does not mean the code is ready. The two review layers above are lie detectors.

**How checks lie**
- Tautological tests that restate the implementation, such as asserting a post character limit equals 280. He says Opus 5 "got addicted" to these.
- Structure-sensitive tests, such as reading a source file into memory to check that one UI section appears after another in the text.
- Tests that cannot fail because mocks stub out an API's real error modes.

**Design your way out**
Deep modules, after John Ousterhout, hide complex behavior behind small interfaces, so tests hit the interface rather than internals. A skill finds deepening opportunities and produces an HTML before-and-after report. A codebase-design skill gives the team one vocabulary: locality, leverage, seam.

**Keep standards out of the implementer**
The implementer's context window is already "overloaded" with exploring, editing and debugging. Review is "underloaded." So put standards in a `coding standards.md` file, not `agents.md`, and run a reviewer in a sub-agent that reads the diff and that file. He compares this to red-green-refactor: one context makes it work, another makes it good. Do not outsource review to a generic third-party bot; generic reviewers give false positives or are too narrow. The reviewer should commit fixes by default, not pile comments on the human.

**A human-friendly PR**
His new PR skill classifies each PR as a one-way or two-way door. Most PRs are two-way and revertible. An email blast to 60,000 people, an expensive migration or data loss is one-way: "review the hell out of that PR." Each PR ends with a "merge danger" summary of door type and blast radius. For the what and why, he borrows from a show-me skill in the HumanLayer skills repo: pseudo-code, Mermaid and simple diagrams instead of prose.

**Review the system, not just the code**
"You never want to write the same comment twice." His retro skill reads a session, a PR, or a week of PRs and reviews. It suggests new automated checks, updates to coding standards, navigation pointers for `agents.md`, more token-efficient tools, and cuts to bloated steering files and skills. Two-way doors do not all need human review; every one-way door does.

## Why it matters
- Gives a concrete taxonomy of how agent-written tests lie (tautological, structure-sensitive, over-mocked), usable as a review checklist.
- The overloaded-implementer versus underloaded-reviewer argument is a clear rule for where coding standards belong in an agent setup.
- One-way versus two-way door plus blast radius gives a triage rule for which agent PRs need careful human review.
- The retro loop turns each human review into durable checks and standards, a compounding mechanism for software factories.
- Argues against generic third-party review bots in favour of team-owned, repo-specific standards.

## Metadata
- Video: https://www.youtube.com/watch?v=LlgiOCmFG_w
- Duration: 22:35
- Playlist index: 1195
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. I'm here to talk about fixing the PR bottleneck and this is kind of a grand title for trying to fix the thing that most organizations struggle with, I think, and have kind of historically struggled with before AI, you know, we have always had huge numbers of PRs just laying around that no one's bothered to review and this is now increased massively because of the new strains on us because of AI imposing all these weird constraints. And to do this, I'm going to use the rubric of my skills, which is kind of heard about, maybe you've used them. And I have a couple of new skills to announce that are going to hopefully improve the way that you do PRs, improve the way that's or improve...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LlgiOCmFG_w.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
