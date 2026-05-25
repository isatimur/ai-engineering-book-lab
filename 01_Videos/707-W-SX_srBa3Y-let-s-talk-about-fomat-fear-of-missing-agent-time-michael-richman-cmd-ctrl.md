---
video_id: W-SX_srBa3Y
playlist_index: 707
title: "Let's Talk About FOMAT: Fear of Missing Agent Time — Michael Richman, Cmd+Ctrl"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=W-SX_srBa3Y"
duration: "16:17"
duration_seconds: 977
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/W-SX_srBa3Y.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-05-24T23:36:52+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Michael Richman, engineering leader at Bitly and co-author of the Bitly MCP server, introduces FOMAT — Fear Of Missing Agent Time — and demos Command and Control, a mobile/web app he built to solve it. The problem: agents stop and wait for human input unpredictably; when tasks run for hours or days, being locked to a terminal is unworkable. Command and Control aggregates all coding agent sessions (Claude Code, Codex, Cursor, Gemini) into a single mobile UI with push notifications, session management, and the ability to start or respond to sessions from anywhere including your watch. The philosophical argument: the new developer 'flow state' is agent choreography, not solo focus — and breaks from the computer are where the best ideas happen, so agents must be reachable during those breaks."
---

# Let's Talk About FOMAT: Fear of Missing Agent Time — Michael Richman, Cmd+Ctrl

## Summary

Michael Richman (introduced as Michael Richmond in the transcript) leads several engineering teams at Bitly and co-leads their AI coding tools strategy. He wrote the Bitly MCP server and trains engineers on AI practices. The talk gives a name to a friction point everyone working with coding agents has experienced.

**Defining FOMAT**

Fear Of Missing Agent Time:
- You're on a walk, you have an idea, you can't act on it until you get back to your machine.
- You left an agent running for 30 minutes, came back to find it blocked on a clarifying question for the last 28 minutes.
- You started 5 sessions and can no longer track which one needs input.

The problem gets worse as task duration increases. Current tasks run 5–45 minutes; you can ballpark when to check in. As tasks extend to 5 hours or 5 days, the probabilistic blocking window grows enormously and unpredictable wait is the norm, not the exception.

**Command and Control**

Richman built Command and Control to solve this — available as a mobile app (iOS and Android), web, and even Apple Watch. Architecture:

- **Daemon per agent**: Each coding agent platform (Claude Code, Codex CLI, Cursor, Gemini, Open Code) runs a daemon process alongside it that monitors session lifecycle.
- **Control plane**: Daemons report state changes (blocked, completed, errored) to a central API layer, regardless of which machine or platform the agent is on.
- **Single UI**: Mobile app aggregates all sessions. Sessions are organized into: subscribed (push notifications for every message), on-my-radar (watch but don't notify on every message), recent (last 24 hours), and archive.

Features: start new sessions from the mobile UI (pick agent, directory, issue prompt), respond to blocked agents from anywhere, session management dashboard with AI-generated standups of recent session activity.

**Demo highlights**

- Push notification received 2 seconds after an agent task completed, with one-click navigation back to the session.
- Sessions started from the phone pick up seamlessly in the CLI when back at the desk — same session, same context.
- The daemon is open source, so any custom agent framework can integrate.

**The deeper argument: agent choreography as the new flow**

Richman argues that the "flow state" of solo deep focus coding doesn't map to the agentic world. The new flow is choreography: moving between multiple agents, unblocking one, redirecting another, seeing results accumulate. The elegance is in the choreography, not in the individual task. But this requires being reachable — which means agents must be able to reach you outside the terminal.

He also notes the cognitive load of managing 4+ concurrent sessions is genuinely exhausting, and taking breaks is where good ideas happen. The system should enable those breaks rather than penalize them.

## Why it matters
- FOMAT is a precise and useful term for a real workflow friction that will intensify as agent task durations grow — naming it helps reason about solutions.
- The daemon-plus-control-plane architecture is a template for anyone building agent observability tooling: decouple agent lifecycle monitoring from the agent platform, aggregate into a single UI.
- The agent choreography framing shifts the mental model of developer productivity away from individual focus sessions — relevant for teams trying to set norms around how developers work with multiple concurrent agents.

## Metadata
- Video: https://www.youtube.com/watch?v=W-SX_srBa3Y
- Duration: 16:17
- Playlist index: 707
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Thank you, everybody. My name is Michael Richmond. Um I lead several teams at Bitly, the link shortener, but today I'm here to talk to you about FOMAT. Uh fear of missing agent time. You know FOMO, fear of missing out. You also know FOMAT, you just didn't have a name for it. Um What is fear of missing agent time? It's being out on a walk and having an idea that you want to task your agent with and having to wait to get back to your dev machine to actually do it. It is when you get up from your desk and you had an agent working 30 minutes ago chugging away and you get back and you realize that after 2 minutes it actually stopped to ask you a question. And it's been waiting there...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/W-SX_srBa3Y.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
