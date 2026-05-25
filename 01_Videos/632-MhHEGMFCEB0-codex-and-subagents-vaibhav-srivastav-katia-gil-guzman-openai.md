---
video_id: MhHEGMFCEB0
playlist_index: 632
title: "Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MhHEGMFCEB0"
duration: "1:01:58"
duration_seconds: 3718
view_count: 2865
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/MhHEGMFCEB0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:34+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vaibhav Srivastav (VB) and Katia Gil Guzman from OpenAI's developer experience team (London) demo the Codex ecosystem at 3 million weekly active users — more than 3× since January. Their key architecture is a 'unified agent harness' layered over frontier models (GPT-5.4, with mini/nano for sub-agent tasks). Sub-agents are the headline feature: Codex can spin up to 20 parallel reviewers against 45 persona files, automatically entering plan mode for complex tasks. 100% of all OpenAI employee PRs across all repos are now reviewed by Codex code review by default — including Greg Brockman's. Plugins bundle skills + MCP servers + apps into reusable one-click workflows. Katia shows a Slack automation saving her 'hours per day' by triaging messages at 9am."
---

# Codex and Subagents — Vaibhav Srivastav & Katia Gil Guzman, OpenAI

## Summary

Vaibhav Srivastav (VB) and Katia Gil Guzman are on the OpenAI developer experience team based in London. This is a workshop demoing the Codex ecosystem live, delivered shortly after Codex crossed 3 million weekly active users — more than tripling since January.

**The Codex stack.** Codex is described as a "software engineering agent" rather than just a coding assistant — it runs commands, explores codebases, writes and runs tests, and interacts with external systems. The architecture: frontier models as foundation (GPT-5.4 flagship, GPT-5.4 mini and nano for fast/cheap sub-agent tasks), wrapped in a unified agent harness that manages tool execution, environment setup, and safety. Surfaces: Codex app (Mac and now native Windows with native sandbox), IDE extension, CLI, Slack, GitHub. WebSocket support delivers ~1.75x faster token streaming; a fast mode gets to ~2x.

**Plugins: bundled workflows.** Plugins combine skills (reusable instruction packages), apps (OAuth connections to external services like Notion, Linear, Google Drive), and MCP servers into single installable units. Katia demos a Google Drive plugin: Codex reads 57 event entries from YAML files in the repo and writes them to a spreadsheet in two minutes. Game studio plugin demo: Codex generates all game sprites via image generation, then uses Playwright interactive (headless browser with click capability) to debug the game — entirely unsupervised, producing a playable platformer from a single "do a platformer game with platforms made of bricks" prompt.

**Automations as cron jobs.** Katia uses automations daily: one checks Slack at 9am, flags time-sensitive messages, and summarizes the day's important channels; another triages email. She describes these as "saving hours per day." Automations are scheduled instructions with app connections, created conversationally or via a UI.

**Sub-agents.** VB demos spinning up 20 parallel sub-agents to review 45 curated persona TOML files in the Codex agents repo. Codex automatically enters plan mode (5-task decomposition), partitions files across reviewers, and each sub-agent gets exactly the files it should review plus repo-context pointers (agents.md, contributing.md). Results are collated by the orchestrator. Key sub-agent customization dimensions: model choice, reasoning effort, sandbox mode (read-only for review agents, write for doc writers), and MCP access (give a sub-agent Sentry or Linear access independently). Three default personas ship: general-purpose, worker (execution), and explorer.

**Code review at 100% of OpenAI.** All pull requests across all OpenAI repos made by all employees — including Greg Brockman — are reviewed by Codex code review by default. Codex review spins a new thread, uses a dedicated review system prompt, reads the diff plus surrounding context, and identifies second-order effects in code not touched by the PR itself.

## Why it matters
- The sub-agent persona system (custom model + sandbox mode + MCP per agent) is a concrete, shipping architecture for specialized parallel agents — not just theory.
- Automations-as-cron-jobs democratize agent scheduling without code: non-engineers on recruiting teams (demo in the transcript) are already building and running skills.
- 100% PR coverage including the CEO's commits is a concrete data point on AI code review achieving institutional trust.
- The plugins pattern (bundle skills + apps + MCPs into one install) is a direct precedent for how agent tooling distribution will work — relevant for any MCP chapter.

## Metadata
- Video: https://www.youtube.com/watch?v=MhHEGMFCEB0
- Duration: 1:01:58
- Playlist index: 632
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hi everyone. Thank you for being here. So today we're going to talk about codeex. My name is Katya Katya Gilusman and I'm with VB. Uh we are both uh working in the developer experience team at OpenAI based in London. And so our role is really to help developers build and get the most out of our products uh including Codeex. And so today we're going to start with a quick CEX overview. Uh just so we know how many of you here are using Codex. Can you raise your hands? >> Yay. >> Okay, cool. So, we we're not gonna stay too long on that overview part. Uh, and then we're gonna we're gonna do some demos. So, we're going to show you plugins and automations. Uh, VB is going to talk about sub agents...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MhHEGMFCEB0.txt]]
- Description cue: Codex is no longer just a coding assistant in a terminal. In this workshop, Vaibhav and Katia show how it becomes a full software engineering system, combining frontier models, the Codex app and CLI, plugins, automations, and subagents that can explore, review, and execute work in parallel. The session also dives into custom subagents: showing how specialized agents with different models, permissions, and tools can speed up code review, research, debugging, and long-running tasks while keeping control and safety in place.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
