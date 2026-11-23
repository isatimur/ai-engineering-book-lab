---
video_id: "BEKc4P87XKo"
playlist_index: 35
title: "Agentic Engineering: Working With AI, Not Just Using It — Brendan O'Leary"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BEKc4P87XKo"
duration: "27:03"
duration_seconds: 1623
view_count: 49340
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/BEKc4P87XKo.txt"
themes:
  - "Coding Agents"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T10:50:58+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Brendan O'Leary of Kilo Code argues that most engineers use AI but cannot explain how they work with it, and that agentic engineering means directing the agent like an 'energetic, enthusiastic, extremely well-read, often confidently wrong junior developer' that lacks judgment and business context. His tactics: treat context engineering as the core skill (quality degrades past about 50% full, bad context poisons sessions, so persist, select, compress and isolate context); run a research-plan-implement loop with read-only ask mode and a plan file before any code; keep agents.md minimal and use skills on demand; disable unused MCP servers; and review agent work like a pull request."
---
# Agentic Engineering: Working With AI, Not Just Using It — Brendan O'Leary

## Summary
Brendan O'Leary works at Kilo Code, after many years at GitLab and an earlier career as an engineering and product manager. He opens with a question: can you explain how you use AI, what you hand off, what you keep, and how you decide? Most engineers cannot, though he says 90% have used AI tools. That gap between using AI and articulating how you work with it is the talk.

**From autocomplete to collaborator**
Early-2020s tools finished lines; 2022 brought whole functions and GitHub Copilot; in 2025 models began to execute: break down a task, edit files, run tests, return a pull request. He quotes Armin, creator of Flask: we are no longer just using machines, we are working with them. Armin also reports gaining more than 30% of his day, but only because he knows what to hand off.

**The mental model**
Treat the agent as "an energetic, enthusiastic, extremely well-read, often confidently wrong junior developer." Fast, tireless, no ego, huge breadth, but no judgment and no business context. It writes code that is "technically correct and contextually wrong."

**Context engineering is the core skill**
- Context is expensive: the whole history goes back as input tokens every turn.
- More is not better. Quality degrades above about 50% full, a "dumb zone" that always-on MCP servers push you toward.
- Bad context poisons output: mixed tasks, stale comments, or trying to steer a session back after wrong turns, when old mistakes creep back in.
- Four moves: persist information outside the window (scratch pads, memory files, agents.md), select only what this step needs, summarize and compress after a debugging deep dive, and isolate work across parallel agents or sessions.
- Habits: one task per session, watch the context meter, and when it feels off the rails, start fresh with an agent-written summary you have checked.

His intern story makes the point: he gave interns a Balsamiq wireframe with Comic Sans and smiley placeholders, and got back a working prototype in Comic Sans with smileys. It was his fault for not giving context.

**Research, plan, implement**
Jumping straight to code creates wrong assumptions and the "garbage in, garbage out" experiences that make people anti-AI. Citing Dex Horthy, a bad line of research can become hundreds of lines of bad code. Research happens in Kilo's ask mode, which can only chat, and produces a document the human reviews. The plan names files, tests and verification commands, and states what is in and out of scope, in a plan file clear enough for a cheaper model to execute. Implementation runs in a new session with only the plan, with frequent commits; he treats local Git as his first PR review. Human time in research and planning is the highest-leverage time. AI "can only amplify the thinking you've done."

**Configuration**
Modes (ask, architect, code), workspace and global rules, auto-approve settings, and worktrees for parallel agents. agents.md is the always-on readme: keep it minimal with conventions, build and test commands and pre-commit checks. Skills are on-demand playbooks for repeated workflows. Disable MCP servers you are not using; a Postgres MCP during front-end work wastes tokens and may confuse the agent. For internal APIs: use an OpenAPI spec, else convert docs to markdown, else a reference URL, else build an MCP server. Isolate agent work and review it like a junior engineer's pull request.

## Why it matters
- The "confidently wrong junior developer" model gives a practical rule for what to delegate and what to keep.
- Turns context engineering into concrete habits: one task per session, watch the 50% mark, restart with a summary instead of steering a poisoned session.
- Research-plan-implement with a read-only research mode and a plan file is a reusable workflow that moves human effort to the highest-leverage phase.
- Clear split between always-on agents.md and on-demand skills, plus a four-step ladder for exposing internal APIs to agents.
- Warns that idle MCP servers cost tokens and can mislead the agent.

## Metadata
- Video: https://www.youtube.com/watch?v=BEKc4P87XKo
- Duration: 27:03
- Playlist index: 35
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Org Design & Leadership]]

## Transcript excerpt
> Let's talk a little bit about what I mean by agentic engineering. And let's maybe start with a question. If I were to ask you right now, how are you using AI in your work? Could you actually really explain it? Not just, you know, it helps me code faster. It can write code really fast, but like the real workflow. What you hand off, what you keep, how you decide in between. Most engineers can't and that's a little wild to me because 90% of engineers are already using AI tools or have used them. Maybe only half of them are using them on a regular basis, but that's a number that's definitely growing all the time. And that's the current state. So, the question isn't whether your team is using...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BEKc4P87XKo.txt]]
- Description cue: Coding agents are quickly moving from novelty to necessity, but most teams are still stuck between demos that feel magical and systems that break down in real-world engineering environments....

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://gitlab.com/brendan/boleary-dot-dev>
