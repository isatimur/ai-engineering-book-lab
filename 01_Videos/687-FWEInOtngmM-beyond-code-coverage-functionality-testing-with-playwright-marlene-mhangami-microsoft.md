---
video_id: FWEInOtngmM
playlist_index: 687
title: "Beyond Code Coverage: Functionality Testing with Playwright — Marlene Mhangami, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=FWEInOtngmM"
duration: "19:45"
duration_seconds: 1185
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/FWEInOtngmM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-19T11:04:21+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Marlene Mhangami, senior developer advocate at Microsoft and GitHub (Core AI group), diagnoses a structural problem with AI-assisted development: code volume is surging — 14 billion commits projected by end of 2026 vs. 1 billion in 2025 — but AI-generated tests are often self-affirming unit tests that pass without validating behavior. Her prescription is feature-level TDD using Playwright for end-to-end functionality tests. The key claim, backed by a Stanford study of 120,000 developers: clean codebases amplify AI productivity gains, while unchecked AI amplifies entropy. Using GitHub Copilot CLI with the Playwright MCP server, she demos an agent-driven red-green-refactor cycle for a toy-store search and filter feature, with the refactor phase kept deliberately human-led."
---

# Beyond Code Coverage: Functionality Testing with Playwright — Marlene Mhangami, Microsoft

## Summary

Marlene Mhangami is a senior developer advocate at Microsoft and GitHub, working in the Core AI group. She opens with striking commit data: GitHub saw ~1 billion commits in 2025 (its biggest year ever); extrapolating from a COO tweet of 275 million commits per week in early 2026, the platform is on track for ~14 billion commits by year end. A growing share are AI-co-authored. But the headline question is not volume: does AI actually make developers more productive?

### The productivity evidence

Mhangami cites a Stanford University study of 120,000 developers presented at a prior AI Engineer conference. The key finding: AI gains depend on codebase cleanliness. Clean codebases amplify AI productivity; unchecked AI in a messy codebase amplifies entropy. In one case study from that study, a team that used AI without quality guardrails saw PR volume rise but code quality drop, leading to extensive rework — net productivity improvement of roughly 1%.

Her conclusion: developers using AI need to invest in good test coverage, type coverage, documentation, and modularity as preconditions for realizing AI gains.

### Why unit-test-focused TDD fails in the AI era

The 2014 TDD critique from DHH (Rails creator) applies more sharply now: overindexing on unit tests leads to testing implementation details rather than behavior. A test tied to a method name breaks on rename even when functionality is unchanged. More critically, AI coding assistants generate tests that are often self-affirming — the test passes, the coverage metric is green, but actual system behavior is not validated.

### Feature-level TDD with Playwright

Mhangami's prescription reorients TDD around features rather than methods. The trigger for writing a test is not "I added a method" but "I received a feature request." The flow:

1. **Red**: the agent writes a failing Playwright test that describes the feature's expected behavior.
2. **Green**: the agent generates code as fast as possible to make the test pass, without concern for quality.
3. **Refactor**: the human reviews the agent's code and improves it — this phase is deliberately kept human-led and intentionally the largest time investment.

Playwright is a browser-based end-to-end testing framework (Python, TypeScript, C#) built by Microsoft. It simulates user interactions, supports headed and headless modes, and captures screenshots on test runs.

### Demo

Using GitHub Copilot CLI with the Playwright MCP server installed, Mhangami demonstrates a TDD workflow for a toy-store website (Tail Spin Toys). The agent reads a feature request from an email (via Microsoft's WorkIQ M365 skill), writes failing Playwright tests for a search bar and category/price filter, generates code to pass the tests, and runs Playwright — the browser opens, types search terms, clicks filter buttons, and validates results, all without human keyboard input. After tests pass, the developer takes over for the refactor phase.

### Best practices

- Add Playwright screenshots to PRs as documentation of what was tested.
- Run in headless mode for CI pipelines.
- Commit before asking the agent to make code changes, to preserve history.
- Generate one test per feature to keep tests focused and maintainable.
- For complex state management, use `playwright agents` mode, which installs specialized planner, generator, and healer agent instruction files.

## Why it matters
- The Stanford 120k-developer study grounds the codebase-cleanliness argument in hard evidence, not intuition — a citable data point for a chapter on AI-assisted development.
- The self-affirming test problem is an underappreciated failure mode of AI coding agents that has no coverage in most AI engineering discussions.
- Feature-level red-green-refactor with Playwright is a concrete, teachable workflow for keeping agent-written code maintainable.
- The deliberate human-led refactor phase is a useful counterpoint to "let the agent do everything" narratives.

## Metadata
- Video: https://www.youtube.com/watch?v=FWEInOtngmM
- Duration: 19:45
- Playlist index: 687
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Okay. Hi everyone. Um, my name is Marlene and I am a senior developer advocate at both Microsoft and GitHub. So I work at I work in a group called core AI which looks at how developers are using AI across our products. Um so this is kind of new. To start off today I wanted to show you some stats about GitHub from GitHub Octoverse uh last year's GitHub Octoverse report in 2025 which shows data about how developers are using GitHub. What we saw from our report was that more code was added to GitHub last year than ever before. So about a billion commits were pushed to the platform in 2025, which is GitHub's most active year ever. Okay. What we know now in 2026 is that this growth is...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/FWEInOtngmM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
