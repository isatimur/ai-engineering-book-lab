---
video_id: dyHpnnlkTc8
playlist_index: 699
title: "Cooking with Agents — Liam Hampton, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=dyHpnnlkTc8"
duration: "17:04"
duration_seconds: 1024
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/dyHpnnlkTc8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-05-24T23:36:39+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Liam Hampton, a developer advocate at Microsoft, makes the case that VS Code should be a single control plane for three distinct agent modes — local (hands-on, human-in-the-loop), background (Git worktree-isolated, semi-autonomous), and cloud (GitHub Actions, fully hands-off). His demo runs all three simultaneously on one codebase: local agent writing tests, background agent building a new front end in a Git worktree, cloud agent writing documentation. The practical concern driving the talk: businesses are spending on AI infrastructure but not yet seeing ROI, partly because developers are one-shotting with massive prompts instead of orchestrating agents appropriately."
---

# Cooking with Agents — Liam Hampton, Microsoft

## Summary

Liam Hampton works at Microsoft and focuses on GitHub Copilot in VS Code. He opens with a direct challenge: companies are investing in AI tooling and not yet seeing the ROI — partly because developers are still trying to one-shot complex tasks with a single massive prompt instead of distributing work across appropriately chosen agent modes.

**The three agent modes**

Hampton's framework maps agent modes to task characteristics:

- **Local agents** (VS Code chat with full human-in-the-loop): Use when you care about what's happening step-by-step. His example: writing unit tests, where you want to understand and review each decision.
- **Background agents** (GitHub Copilot CLI with Autopilot mode, running in an isolated Git worktree): Use for substantial work where you want partial oversight but not constant back-and-forth. His example: building a new front-end UI. Git worktrees give isolation — the background agent's work lives in a subdirectory branch and can't contaminate the main working tree.
- **Cloud agents** (GitHub Actions, fully remote): Use for hands-off tasks where correctness doesn't require human review of individual steps. His example: documentation, open-source readme files. Cloud agents run in GitHub Actions with network firewalls, no access to the main branch, and access to the GitHub MCP server and Playwright MCP for automated testing.

**The demo**

Hampton demonstrates all three running simultaneously against a simple Python CRUD app: background agent builds a React front end in a worktree (he reviews and tests it locally before it raises a PR), cloud agent adds open-source documentation files, local agent (Claude Opus 4.6, medium reasoning) writes and iterates on unit tests. He shows the new VS Code agent control panel — a single modal for managing all agents, custom agents, skills, MCP servers, instructions, hooks, and third-party AI providers (Claude included).

**The broader point on token economics**

Hampton notes a growing concern about token spend. He references a LinkedIn post about someone using pirate-speak in system prompts to reduce token consumption — a signal that developers are getting creative about controlling costs. Context management and selective model use (local models, different tiers for different tasks) are becoming practical engineering decisions, not afterthoughts.

**Awesome Copilot**

Microsoft maintains an open-source repository of skills and customizations at `aka.ms/awesomecopilot` — explicitly framed as usable beyond Copilot, applicable to any AI coding tool.

## Why it matters
- The local/background/cloud taxonomy is a clean mental model for deciding how much autonomy to grant an agent based on task type and oversight appetite.
- Git worktrees as the isolation primitive for background agents is a lightweight alternative to full VMs or containers for parallel coding work.
- The cloud agent security model (GitHub Actions, whitelisted networks, no main branch access) describes the minimum viable trust boundary for hands-off agent execution in a professional codebase.

## Metadata
- Video: https://www.youtube.com/watch?v=dyHpnnlkTc8
- Duration: 17:04
- Playlist index: 699
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hello everybody. It's great to see so many of you who are still here at the final on final day right at the end. So I hope you all had a great conference. Show of hands, who here uses GitHub Copilot? Awesome. Lovely stuff. Who here uses VS Code with GitHub Awesome. So I'm going to be talking about both these things today. I'm going to be talking about cooking with agents in VS Code. Now gentleman before was speaking about cognitive load of agents and that is absolutely correct. You see so many different things now with agents and they're popping up all over the place from the CLI, in the terminals, in chat windows, in other editors, etc. etc. But we still somehow seem to find ourselves in...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/dyHpnnlkTc8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
