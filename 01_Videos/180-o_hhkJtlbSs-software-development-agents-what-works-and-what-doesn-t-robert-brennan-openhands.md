---
video_id: "o_hhkJtlbSs"
playlist_index: 180
title: "Software Development Agents: What Works and What Doesn't - Robert Brennan, OpenHands"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=o_hhkJtlbSs"
duration: "16:46"
duration_seconds: 1006
view_count: 19963
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/o_hhkJtlbSs.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:42:44+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Robert Brennan, co-creator of the open-source agent OpenHands (formerly OpenDevin), argues that coding is going away but software engineering is not: agents handle the write-run inner loop, and humans keep the big-picture thinking. He explains the agent loop and its three hard tools: a diff-based editor, a terminal with long-running and background commands, and a browser that reads accessibility trees or labeled screenshots. His advice: run agents in Docker with least-privilege credentials, start with small tasks that have a clear definition of done, say how as well as what, throw bad attempts away, and always review the code. A human's face goes on every agent PR."
---
# Software Development Agents: What Works and What Doesn't - Robert Brennan, OpenHands

## Summary
Robert Brennan has built open-source developer tools for over a decade, and his team created OpenHands, formerly OpenDevin. His thesis: "coding is going away", but software engineering is not. Agents are good at the inner loop of write code, run code. They are weak at big-picture work: empathizing with users, weighing business goals, choosing an architecture. That is where engineers now spend their time.

**From autocomplete to autonomous agents**
He traces a path from Copilot-style autocomplete (two or three lines at the cursor), through AI IDEs that take a few steps alone, to agents like Devin and OpenHands. These take one or two sentences, work for 5 to 15 minutes, and return a solution. You can run several at once.

**How the agent works**
An agent is a loop. The LLM picks the next action (read a file, edit, run a command, open a page), the system runs it, and the output goes back to the LLM. The three core tools each hide real design problems:
- Editor: rewriting a whole file wastes tokens, so modern agents use find-and-replace or diff edits, often with an abstract syntax tree for navigation.
- Terminal: what to do with a long command that prints nothing, parallel commands, or a background server you then curl.
- Browser: raw HTML is expensive. Accessibility trees, markdown conversion, scrolling and labeled screenshots work better. One recent contribution doubled OpenHands' web-browsing accuracy.

**Sandboxing**
Agents run in a Docker container by default, so they cannot delete your home directory. Third-party credentials such as GitHub tokens or AWS access must be tightly scoped, following least privilege.

**Best practices**
- Start small: single-commit tasks with a clear definition of done, such as a failing test, lint errors or merge conflicts. For Brennan and his biggest power users, about 90% of code now goes through the agent.
- Be specific: say how, not just what. Name frameworks, TDD, files and functions. This improves accuracy, speed and token cost.
- Code is cheap: he dictates ideas on his walk to work and finds a PR waiting. He throws away about half. If an attempt is way off, start fresh with a better prompt.
- Review everything: teams that auto-merged AI output got duplicate code and growing tech debt.

**Ownership lesson**
Early OpenHands PRs showed the OpenHands logo as owner. The person who triggered one could approve it and bypass review, and failing PRs sat with nobody responsible. Now the triggering human's face is on the PR, and that person owns merging and any breakage.

**Good day-one use cases**
Merge conflicts (solved about 99% of the time), addressing PR review comments, small bugs fired off from Slack, Terraform and memory changes, database migrations with proper indexes and foreign keys, fixing failing tests, expanding test coverage, and internal greenfield apps that do not need line-by-line review.

## Why it matters
- It separates the inner loop (agent work) from big-picture judgement (human work), which gives a clear frame for how engineering roles change.
- The editor, terminal and browser breakdown shows that agent quality depends on tool design, not only on the model.
- The PR ownership story is a concrete governance fix: tie every agent PR to an accountable human so review cannot be skipped.
- The ranked list of safe starter tasks gives teams a practical adoption path from chores to larger work.
- His keep-or-throw-away habit puts numbers on the idea that cheap code changes how engineers prototype.

## Metadata
- Video: https://www.youtube.com/watch?v=o_hhkJtlbSs
- Duration: 16:46
- Playlist index: 180
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> [Music] Today I'm going to talk a little bit about uh coding agents and how to use them effectively really. Um if you're anything like me, you found that uh you found a lot of things that work really well and a lot of things that uh don't work very well. Um, so a little bit about me. Uh, my name is Robert Brennan. I've been building, uh, open source development tools for for over a decade now. Uh, and my team and I, uh, have created, uh, an open-source, uh, software development agent called Open Hands, formerly known as Open Devon. So, to to state the obvious, in 2025, software development is changing. Uh, our jobs are are very different now than they were 2 years ago. Uh, and they're going...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/o_hhkJtlbSs.txt]]
- Description cue: The adoption of AI into software development has been bumpy. While autocomplete tools like Copilot have gone mainstream, autonomous agents like Devin and OpenHands have generated both enthusiasm...

## Book angles
- Could support a chapter/section on **Coding Agents**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.openhands.dev/blog>
