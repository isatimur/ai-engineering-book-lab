---
video_id: rnDm57Py54A
playlist_index: 629
title: "Building your own software factory — Eric Zakariasson, Cursor"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=rnDm57Py54A"
duration: "1:23:36"
duration_seconds: 5016
view_count: 12003
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/rnDm57Py54A.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eric Zakariasson (engineer, Cursor, developer experience) describes building a software factory from inside one of the companies dog-fooding agents at scale. His key claims: most engineers are stuck at level 2–3 (pair programmer), the path to a factory requires primitives (code structure), guardrails (rules that emerge from agent failures, not pre-installed), and enablers (skills/MCPs that let agents act). He demos Cursor 3 — a full rewrite with no VS Code, agent-first — and cloud agents with per-VM isolated environments. Contrarian angle: rules should emerge dynamically from agent failures rather than being installed upfront; the popular 'install every Cursor rule for your stack' approach is wrong."
---

# Building your own software factory — Eric Zakariasson, Cursor

## Summary

Eric Zakariasson is an engineer at Cursor focused on developer experience and product. He dog-foods Cursor daily and uses the talk to share observations from building toward an autonomous software factory both personally and inside the company.

**Six levels of autonomy.** Zakariasson references Dan Shapiro's six-stage framework: from spicy autocomplete (Cursor circa 2022–23) up through pair programming, AI-majority code, delegation, and finally the "dark factory" — a black box where agents build, test, and ship with minimal human input. He estimates most developers are currently at level 2–3 and describes himself as operating at level 4 for most projects.

**What a factory actually needs.** He breaks factory prerequisites into three categories:

- **Primitives and patterns.** Modular, collocated code with well-established usage patterns (auth services, startup scripts, test helpers) so agents can locate relevant files in one directory scan rather than grepping the entire codebase. Well-structured code for humans = well-structured code for agents.
- **Guardrails.** Hooks (blocking sensitive areas like encryption/auth), tests (agent verifies own work), and rules. Critical insight: rules should emerge dynamically from observed agent failures — if the agent keeps creating wrong DB schemas, add a naming-convention rule. The popular approach of installing every available Cursor rule upfront is counterproductive; rule lists should grow from experience.
- **Enablers.** Skills and MCPs that expand what agents can do autonomously — feature-flag creation, external context (Linear, Notion, Datadog, Slack), environment startup, even computer use to click through a UI and record a video of the result.

**Isolated environments are essential for parallel agents.** When running multiple agents concurrently, shared workspaces cause merge conflicts and cross-contamination of databases/caches. Zakariasson's answer: each agent gets its own VM (Cursor cloud agents), with the database, internal tooling, and app running in that isolated environment. More expensive to set up, but then you can scale to hundreds or thousands of agents. He estimates Cursor runs multiple thousands of agent sessions per day against copies of its own codebase.

**Manager mindset shift.** Moving from sync to async means frontloading context (long specs, plans) before launching an agent, then trusting it to complete multi-hour tasks. The manager role involves identifying human-in-the-loop bottlenecks (copy-pasting logs, exporting Notion specs) and automating them away. When an agent fails to follow conventions, that's a factory-improvement signal — not just a one-off fix.

**Cursor 3 and verifiable outputs.** He demos Cursor 3, a complete VS Code-free rewrite oriented around agent-first workflows. Key new capabilities: cloud agents with per-VM isolation, computer use for self-testing (the agent records a video of itself clicking through the UI), Playwright e2e tests created by the agent for every feature it ships, and BugBot for automated PR review on GitHub.

## Why it matters
- The three-category factory checklist (primitives, guardrails, enablers) is a concrete, actionable framework for teams trying to move from pair-programming to autonomous agents.
- "Rules should emerge from failures, not be pre-installed" is a specific, contrarian, and practical claim about CLAUDE.md / agents.md management.
- Isolated-VM-per-agent as the only reliable path to parallel agent scaling is a direct architectural prescription with cost/benefit discussion included.
- The worker-to-manager mindset shift — identifying and automating every human-in-the-loop bottleneck — frames the ongoing role of a developer in a factory world.

## Metadata
- Video: https://www.youtube.com/watch?v=rnDm57Py54A
- Duration: 1:23:36
- Playlist index: 629
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Um, okay. So, we're starting five minutes early. Um, hey everyone. I'm Eric. I'm an engineer cursor and I mostly work at developer experience and product. And today I kind of wanted to talk to you about my experiences like working at Cursor dog fooding the product and like getting to a place where you can build your own like software factory and like what that kind of like takes and the practical steps getting there. To be honest, I don't think we're really there yet. Like sub parts of the product and sub parts of the company are running like fairly autonomously. U but building a software factory takes a lot of work. I mean like look at like real life uh factories producing like hardware....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/rnDm57Py54A.txt]]
- Description cue: Most of us are pair-programming with one agent and stopping there. There's a lot more on the table. This workshop is about going from one agent to many. We'll start with codebase setup, the foundational work that makes agents effective on their own. Then we'll scale up to running agents in parallel, kicking off async work that keeps going while you context-switch to something else, and setting up automations for the things you're still doing by hand.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
