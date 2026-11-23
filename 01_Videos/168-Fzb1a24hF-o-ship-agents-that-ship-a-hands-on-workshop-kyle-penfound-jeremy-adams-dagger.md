---
video_id: "Fzb1a24hF-o"
playlist_index: 168
title: "Ship Agents that Ship: A Hands-On Workshop - Kyle Penfound, Jeremy Adams, Dagger"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Fzb1a24hF-o"
duration: "1:21:00"
duration_seconds: 4860
view_count: 3128
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Fzb1a24hF-o.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:42:11+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kyle Penfound and Jeremy Adams of Dagger's ecosystem team live-build a coding agent inside a Dagger module and ship it to GitHub Actions. Their thesis: an agent is just another workflow, so the same containerized build and test functions your CI runs should become the agent's tools. They give the agent a narrow workspace (read file, write file, list files, test), a typed environment with a 'completed' output, and a prompt that says to run the tests; the code then runs the tests again before it returns. Labeling a GitHub issue 'develop' makes the agent open a PR that closes the issue."
---
# Ship Agents that Ship: A Hands-On Workshop - Kyle Penfound, Jeremy Adams, Dagger

## Summary
Kyle Penfound (background in DevOps and platform engineering) and Jeremy Adams, both on Dagger's ecosystem team, run an 80-minute hands-on workshop on bad conference Wi-Fi. They build a software engineering agent for a sample Vue.js app in Python and deploy it to GitHub Actions. Their thesis: CI pipelines and agents are the same kind of thing, a workflow that orchestrates tools in sandboxed containers. So the build and test functions a team already wrote for CI should become the agent's tools.

**Dagger as the substrate**
Dagger is a container runtime and workflow engine from the founders of Docker. Docker made one application portable; Dagger makes a whole workflow portable. Workflows are code in Go, Python, TypeScript, Java or PHP, with cross-language modules shared on the Daggerverse. LLMs are one more core type next to containers, directories and files, not a separate agent framework.

**Narrow tools, on purpose**
The agent gets a workspace submodule with exactly four functions: read file, write file, list files (a `tree` in an Alpine container), and test. The speakers argue for "the right amount of tools": enough freedom to choose a path, not so much that the agent gets "lost and confused and fails half the time." The test tool runs the project's real test command, so the agent never guesses at test flags. Tool schemas come from function signatures and doc strings; nobody writes JSON tool descriptions.

**Environment, prompt, and a typed output**
The `develop` function builds an environment with an `assignment` string input, a workspace input and a workspace output called `completed`. The markdown prompt tells the agent to analyze the workspace first, avoid unnecessary changes, run the tests, and not stop until the tests pass. The speakers joke that they told it to run the tests three times. After the LLM returns, the code runs the tests again itself before it hands back the directory. All edits happen in containers, so ten agents can run in parallel without touching local state.

**Observability drives prompt work**
Dagger Cloud shows each OpenTelemetry trace: list objects, list methods, list files, read `App.vue`, write file, run tests. Penfound uses these traces to fix tool descriptions and prompts. For example, when he sees an agent call write file and return, he adds an instruction to read and test first.

**From laptop to GitHub**
A `develop_issue` function wraps the same agent. It reads a GitHub issue through a community module, passes the body as the assignment, and opens a PR whose body closes the issue. A short Actions workflow fires when an issue gets the `develop` label. In the live run, the PR changed the greeting and also deleted an unrelated block. A larger demo repo adds PR-feedback, review and test-failure-fix agents.

**Q&A points**
Dagger modules can be exposed as MCP servers. An agent can call other agents inside its environment. Agents that write Dagger code run Dagger inside Dagger. An agent that edits tests to make them pass is a known risk that needs its own check.

## Why it matters
- It makes the argument for reusing CI functions as the agent's toolset concrete: the same test function serves developers, CI and the agent, so the agent cannot invent its own test command.
- It shows a two-layer validation pattern: the prompt tells the agent to test, and deterministic code re-runs the tests after the LLM returns.
- The four-tool workspace is a clean worked example of scoping tools for reliability over generality.
- The live PR that deleted an unrelated block is an honest data point for why human review and test-tampering checks still matter.
- It uses trace visualization as the main loop for improving prompts and tool descriptions.

## Metadata
- Video: https://www.youtube.com/watch?v=Fzb1a24hF-o
- Duration: 1:21:00
- Playlist index: 168
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> [Music] Okay, we're going to kick this off. Uh we're trying to sort out some internet options here, but uh in the meantime, I'll uh give us our little intro. Um so, first of all, we're I'm Kyle. This is Jeremy. We're from Dagger. Uh, and you'll see more about what Dagger is through this workshop where we're going to build a cool uh, sweet agent and we're actually going to deploy it to GitHub. And so even like worst case scenario, if we can't get things running locally when we actually push things to GitHub and see agents running GitHub, then that's going to be out of our internet hands and it's all going to be really cool. So, uh, first of all, on the left side here, cool. Uh on the left...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Fzb1a24hF-o.txt]]
- Description cue: Coding agents are transforming how software gets built, tested, and deployed, but engineering teams face a critical challenge: how to embrace this automation wave without sacrificing trust,...

## Book angles
- Could support a chapter/section on **Coding Agents**.
