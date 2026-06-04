---
video_id: "gvIAkmZUEZY"
playlist_index: 56
title: "Amp Code: Next Generation AI Coding – Beyang Liu, Amp Code"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=gvIAkmZUEZY"
duration: "18:31"
duration_seconds: 1111
view_count: 47323
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/gvIAkmZUEZY.txt"
themes:
  - "Coding Agents"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T10:51:53+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Beyang Liu (co-founder, Amp Code) presents Amp's architectural philosophy: an opinionated, sub-agent-first coding agent that deliberately rejects the model-selector paradigm in favor of specialized role-based sub-agents (Finder, Oracle, Librarian, Kraken). Key tension: context exhaustion vs. thoroughness, solved by sub-agents with isolated context windows. The review bottleneck insight: engineers now spend most time reading agent output, not writing code — Amp builds a custom diff viewer with guided tour to address this. Rejects MCP-first approach: generic MCP servers don't know your agent's goal and pollute the tool space with irrelevant options."
---
# Amp Code: Next Generation AI Coding – Beyang Liu, Amp Code

## Summary

Beyang Liu (co-founder, Amp Code, formerly Sourcegraph) presents Amp's architecture with a series of deliberate, contrarian choices that distinguish it from other coding agents.

**First principles: what an agent actually is.** All an agent is, at its core, is a for-loop with tool calls and a model. This framing tells you your actual levers: model choice, tool descriptions, and iteration behavior. Amp's opinionated choices are made across all three dimensions.

**The MCP decision — and why Amp rejected it.** One of the first architectural decisions: how much to invest in MCP integrations? Amp's answer: don't — at least not as the primary tool layer. Two reasons. First, feedback loops: good coding requires helping the agent close feedback loops between action and outcome. Generic MCP servers don't know what your agent is trying to accomplish and can't tune for that. Second, context confusion: more tools in the context window means more things for the agent to choose from, most of which aren't relevant to the current task. Amp instead built a curated, tightly-integrated tool set optimized for finding relevant context and closing those loops.

**Context exhaustion as the core problem.** The naive context fix — prompt the agent to do fewer reads — leads to what Beyang calls the "doom loop": the agent doesn't gather enough context, can't figure out what to do, and retries the same action repeatedly. The correct fix is sub-agents with isolated context windows.

**Amp's four specialized sub-agents:**

1. **Finder** — codebase search agent. Uses a small, fast model with a minimal tool set optimized specifically for discovering relevant context quickly. Not a general agent — purpose-built for retrieval.

2. **Oracle** — reasoning sub-agent. Instead of mixing reasoning into model selection (switching to a reasoning model for the entire session), Amp routes hard problems to a dedicated Oracle. The main agent stays fast and multi-tool capable; Oracle is invoked only when genuinely stuck. Beyang: "four out of five times it just magically finds the underlying issue."

3. **Librarian** — external context beyond the codebase. Handles library and framework documentation.

4. **Kraken** (experimental) — large-scale refactoring via code mods, not file-by-file editing. Designed for wide codebase changes.

**Rejecting the model selector.** Most coding agents expose a model selector as a core UX feature. Amp doesn't. The problem: with n different models, you're never optimizing for any one model's capabilities. Amp instead has two top-level agents — Smart (full sub-agent access, better for complex tasks) and Rush (fast, for tight inner-loop edits) — tuned specifically for the models that power them.

**The review bottleneck.** A key product insight: engineers using agents heavily now spend most time doing code review, not writing code. The constraint on parallelism is how fast you can review agent output. Amp built a custom diff viewer with a guided tour feature: it tells you which files to read first and in what order, cutting the cognitive overhead of reviewing large agent changes.

**Thread sharing for team learning.** A social feature that turned out to be heavily used: engineers can share agent session threads with teammates. Used to propagate good prompting patterns and to get help when an agent gets stuck. Agents-as-craft is a learnable skill; thread sharing makes that learning social.

**Ads in the terminal.** An unexpected choice: Amp ships a mini ad network for other developer tools in the terminal and editor. Purpose: subsidize inference costs so the Rush agent can be free or near-free for students and developers on tight budgets. Cost is a real barrier; many college students haven't used a coding agent because of API costs.

## Why it matters

This is the most architecturally precise account of sub-agent design in the early corpus. The Finder/Oracle/Librarian/Kraken taxonomy is a concrete answer to "how do you structure specialized sub-agents?" — each one has a well-defined scope, a specific model choice, and a reason for existing. The anti-MCP position and the review-bottleneck insight are both contrarian takes that have held up: the review problem is the same one Brian Scanlan (#682) identifies at Intercom as the constraint on parallelism.

## Metadata
- Video: https://www.youtube.com/watch?v=gvIAkmZUEZY
- Duration: 18:31
- Playlist index: 56
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Org Design & Leadership]]

## Key claims (for claims ledger)
- An agent is a for-loop with tool calls and a model; all architectural choices are variations on model, tool descriptions, and iteration.
- Generic MCP servers cause context confusion and can't be tuned for a specific agent's feedback loops — custom tool sets outperform MCP-first approaches.
- Sub-agents with isolated context windows solve the doom-loop failure mode (not enough context → retries the same action forever).
- Model selectors are the wrong abstraction — purpose-built top-level agents tuned for specific models outperform generic multi-model configurations.
- The primary bottleneck for engineers using AI agents is code review speed, not code writing speed.
- Cost is the primary barrier to agent adoption for students and early-career developers.

## Book angles
- Chapter 6 (software factory) — Finder/Oracle/Librarian/Kraken as the clearest role taxonomy for specialized sub-agents in the early corpus.
- Chapter 7 (reliability) — doom loop failure mode: not enough context → infinite retry. Sub-agent isolation as the fix.
- Chapter 9 (org design) — review bottleneck: parallelism is limited by human review throughput, not agent throughput. Directly supports Intercom's auto-approval pipeline rationale.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/gvIAkmZUEZY.txt]]
