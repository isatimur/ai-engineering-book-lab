---
video_id: VaS2h-dY1-4
playlist_index: 698
title: "Scaling Agents on Kubernetes with acpx and ACP — Onur Solmaz, OpenClaw"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=VaS2h-dY1-4"
duration: "19:00"
duration_seconds: 1140
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/VaS2h-dY1-4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-05-24T23:36:38+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Onur Solmaz, founding engineer at TextCortex and OpenClaw maintainer, describes building ACPX — a CLI-based workflow engine on top of the Agent Client Protocol (ACP) — and Spritz, an open-source Kubernetes orchestrator that spins up isolated agent pods on demand. His core problem: OpenClaw receives 300–500 PRs per day from AI-generated contributions; he needed automated triage workflows that classify intent, judge implementation quality, and manage CI loops without human babysitting. Surprising angle: he runs a full Discord-based multi-agent IDE from his phone — parallel Codex sessions, channel-per-agent — as his personal development environment."
---

# Scaling Agents on Kubernetes with acpx and ACP — Onur Solmaz, OpenClaw

## Summary

Onur Solmaz has been building coding harnesses since before ChatGPT, starting with a JupyterLab extension over the original Codex/DaVinci model. He is now a founding engineer at TextCortex and an OpenClaw maintainer, focused on agent interoperability and enterprise adoption. The talk covers two things he built: ACPX (an ACP-based workflow engine) and Spritz (a Kubernetes-native agent orchestrator).

**The OpenClaw PR problem**

OpenClaw has 60,000+ total PRs with 300–500 arriving per day. Most are AI-generated with minimal thought; contributors just ran into a bug and sent whatever their agent produced. Solmaz needed a way to extract signal from this noise at scale without discarding any of it — each PR is feedback about what's broken, even if the fix is wrong. His workflow: classify intent → judge implementation quality → check for conflicts → loop for superficial refactors → escalate structural issues to a human. He codified this as abstract workflow templates and built it into ACPX.

**What ACP is (and isn't)**

ACP (Agent Client Protocol) standardizes human-to-agent interaction via a CLI interface, so you don't have to build separate Slack, Teams, and Discord integrations per agent. It's different from agent-to-agent protocols. Solmaz chose ACP because it was the only one with working adapters for both Codex and Claude Code when he needed them. ACPX extends ACP into a workflow engine — think n8n-style workflows but driving Codex sessions.

**The Discord multi-agent IDE**

Solmaz's personal development setup is a Discord server where each channel maps to a running Codex agent via ACP. He works with 1–5 parallel agents at any moment from his phone, binding channels to agent sessions for different tasks. He describes building ACPX itself through this same Discord-driven workflow.

**Spritz: on-demand Kubernetes agent pods**

TextCortex's production problem: 100 employees on Slack, needing to dispatch agents to debug production issues. The solution is Spritz (open-source at `textcortex/spritz`), a Kubernetes operator that spins up a full pod per agent task — giving each agent an isolated VM with full filesystem access. Solmaz's argument: giving agents a full computer (as Devin and similar tools demonstrated) is dramatically more powerful than container-level sandboxing, even if it's more expensive. The orchestrator handles Slack/Teams wiring, session lifecycle, and UX (a hosted React app in the same cluster).

**On disposable agents and multi-instance provisioning**

Solmaz points out a gap in current chat platforms: you can't easily create multiple named agents with different profiles from the same app. Until messaging platforms support multi-agent provisioning at the cosmetic level, enterprise agent workflows require custom infrastructure like Spritz.

## Why it matters
- ACPX represents an early worked example of encoding PR triage and review logic as agent workflows, applicable to any project receiving high-volume automated contributions.
- The Discord-as-IDE pattern is a practical model for mobile-first agent development when you want parallel sessions without switching contexts.
- Spritz's "full VM per agent task" design is a different point on the isolation/cost curve than containers — and Solmaz argues it's the better abstraction for complex agentic tasks.

## Metadata
- Video: https://www.youtube.com/watch?v=VaS2h-dY1-4
- Duration: 19:00
- Playlist index: 698
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Welcome. Um So, the talk is building an ICP on uh at Open Claw. It's uh also about other things like how to uh put open-source agents on open-source agent frameworks on Kubernetes and stuff. So, I'm I'm I hope uh to I will today share in a nice way what I've been working on in the last 2 months. Um A little bit about me, very brief. My uh A little bit about me. I've been building harnesses since a few months before ChatGPT came out. I built a Jupiter Lab extension over OG Codex model like DaVinci code two. Um back in the days that eventually So, I'm currently working for a startup. That that initial coding harness turned into its current harness over time like a ship of Theseus. It got...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VaS2h-dY1-4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
