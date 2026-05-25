---
video_id: L2r6vLlLgs8
playlist_index: 689
title: "Fighting AI with AI — Lawrence Jones, Incident"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=L2r6vLlLgs8"
duration: "17:29"
duration_seconds: 1049
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/L2r6vLlLgs8.txt"
themes:
  - "Security & Guardrails"
  - "Agent Architecture"
ingested_at: 2026-05-19T11:04:25+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Lawrence Jones, founding engineer at incident.io (used by Netflix, Etsy, Skyscanner), describes the meta-problem of building complex AI systems: the systems become too complicated for humans to debug tractably. Their AI SRE product runs hundreds of telemetry queries per incident, across thousands of customer accounts daily; evaluating it at scale requires AI itself. Jones presents three interlocking solutions: a CLI eval tool that lets coding agents (not just humans) read and modify YAML eval suites; a 'download your UI as a file system' pattern that replaces visual debugger UIs with file trees Claude Code can grep through; and a parallelized analysis pipeline ('scrapbook') that runs 25 agents concurrently to cluster failure modes across a backtest run and produce an actionable improvement report."
---

# Fighting AI with AI — Lawrence Jones, Incident

## Summary

Lawrence Jones is a founding engineer at incident.io, which builds an incident response management platform used by Netflix, Etsy, and Skyscanner. Their AI SRE product aims to fully automate production investigations: given an incident, it runs hundreds of telemetry queries against logs, metrics, traces, and historical incident data, cross-references with the codebase, and produces a root-cause analysis. The product has been under development for around two years.

The problem he addresses is not building the AI product — it's understanding how it's performing at scale. Behind a single investigation are "hundreds if not thousands of prompts." Across thousands of customer accounts, each with different infrastructure and incident patterns, manually reviewing outputs takes an hour per incident. Human review doesn't scale.

### Problem 1: Eval suites become unmaintainable

incident.io stores evals as YAML files alongside Go prompt files — each eval specifies input data, grading criteria, and expected pass/fail behavior. They call them "AI unit tests." Early on they added a button to "steal an eval from production," but production evals contain entire incident reports: 2MB+ YAML that overflows context windows and is impossible for coding agents to work with. Unit test suite quality degrades rapidly.

**Solution**: A small CLI tool called `eval tool` that lets agents interact with the eval suite through structured operations (list test cases, add one, replace one, edit one) instead of loading the full YAML. This enabled a runbook for coding agents: given a reported problem, the agent creates a failing eval that proves the issue, modifies the prompt to make it pass, runs the full suite to check for regressions, and consolidates the prompt (since repeated additions make prompts bloated).

### Problem 2: Visual debugger UIs don't work for agents

incident.io built rich browser UIs to help humans inspect AI traces — but humans don't have time to use them, and agents can't navigate browser UIs. They identified a key insight from Anthropic's Claude Code: coding agents are excellent at file systems. File trees, grep, standard tooling.

**Solution**: For each AI system, export the entire trace and inspection state as a downloadable file system. Drop it into a Claude Code sandbox. The agent can read the full structure of all prompts, tools, and intermediate outputs; navigate the hierarchy using standard Unix tools; identify which prompt or tool call caused the bad output; and then, because it also has access to the codebase, suggest the exact code change needed.

### Problem 3: Backtest results say "86% accurate" but not why

Daily backtests across hundreds of customer accounts produce a single aggregate number. That number goes up or down, but it doesn't explain the cohort of failures or point to a fix.

**Solution**: A repo called **scrapbook** — a parallelized analysis pipeline that downloads all backtest investigations as file systems, launches ~25 Claude Code agents in parallel (one per investigation), has each agent build an analysis, then runs a second stage of cohort clustering to identify meta-patterns across failures. The output is not just "what went wrong" but "why the system is performing badly for this customer and what to change." The pipeline is repeatable via structured markdown playbooks.

### Generalizable lessons

Jones closes with three principles he believes generalize to any complex AI system: (1) internal debugging tools must be agent-friendly — if your coding agent can't interact with your eval tool, fix the tool; (2) file systems are the best agent context medium, better than MCP servers or bespoke UIs; (3) any complex analysis process should have an AI runbook written for it, not just a human-readable dashboard.

## Why it matters
- The "download your UI as a file system" pattern is a transferable architectural insight for any team whose debugging tools are human-oriented but need to be agent-usable.
- The eval CLI pattern (structured agent-friendly access to YAML eval suites) addresses a widely felt pain point that most teams solve badly or not at all.
- The scrapbook parallelized analysis pipeline is a worked example of using AI agents for meta-analysis of AI system performance — a pattern applicable at any scale.
- Jones explicitly generalizes: these patterns apply to any complex AI system, not just incident response.

## Metadata
- Video: https://www.youtube.com/watch?v=L2r6vLlLgs8
- Duration: 17:29
- Playlist index: 689
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Um hi everyone. Uh so I'm here to talk today about how we use AI to manage the complexity of the AI products that we build um at incident.io. Uh and to share with you some of kind of the tips and tricks in the internal tools that we use when we're building um our AI SRE product. Uh but first I guess like who am I? Um so I'm Laurence. Uh I'm a founding engineer at a company called incident.io. Uh so we build if you haven't heard of us, uh we build an incident response management platform. So we're used by companies like Netflix, Etsy, Skyscanner, and actually probably a few of you in the room. Um we page you when things go wrong and we help you run your incident. And as you're...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/L2r6vLlLgs8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
