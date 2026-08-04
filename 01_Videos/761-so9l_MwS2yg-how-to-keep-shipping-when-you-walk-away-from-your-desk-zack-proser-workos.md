---
video_id: so9l_MwS2yg
playlist_index: 761
title: "How to Keep Shipping When You Walk Away from Your Desk — Zack Proser, WorkOS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=so9l_MwS2yg"
duration: "25:17"
duration_seconds: 1517
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/so9l_MwS2yg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-20T09:01:46+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "WorkOS's Zack Proser argues human attention, not agent capacity, is now the bottleneck, and shows an MCP/voice/remote-control stack with tiered verification gates to avoid burnout."
---

# How to Keep Shipping When You Walk Away from Your Desk — Zack Proser, WorkOS

## Summary
Proser (WorkOS, Applied AI team) opens with a concrete example: he gave Claude Code MCP access to Slack and his existing Linear access, told it to fix a sentence-case bug mangling acronyms and "verify your own work," and came back to a fully closed loop — the agent fixed the bug, pushed the update through the Slack bot it affected, and confirmed the outcome without him checking in. His thesis is that agents no longer are the bottleneck (they scale infinitely, now also exposed via the Claude API) — human attention is, since it "still degrades under load," citing Simon Willison saying he's "wiped out by 11am" running four parallel agents. His proposed stack has four layers: "signal layers" (agents reading Slack/Linear on a loop to triage at-mentions and dedupe asks so he isn't pulled off task), voice-first coding (he reports hitting ~184 words per minute versus 90 wpm typing, enabling speaking into multiple parallel Claude/Cursor/Codex sessions at once), "remote control" (starting a Claude Code session at his desk, then messaging it from his phone miles away, tied to the "shower principle" that diffuse-mode insight no longer requires stopping work), and having the system improve itself by having an agent periodically mine his saved Claude Code JSONL conversation logs for recurring friction points to convert into new skills or MCP servers. He layers three verification gates on top: lint/build/unit tests, browser click-through to check nothing user-facing broke, and a "constitutional AI"-style setup where a second agent grades the first agent's work against a written policy.

## Why it matters
- Documents a concrete, working multi-agent + MCP setup (Slack, Linear, browser, JSONL self-review) for asynchronous, verification-gated agentic coding, useful as a real operational pattern rather than a hypothetical.
- Reframes the bottleneck question in agentic engineering from model capability to human attention and burnout, a counterpoint worth pairing with more capability-focused talks.
- Names concrete practices (tiered verification gates, mining session logs to auto-generate skills) that a book chapter on sustainable agentic workflows could cite as reusable techniques.

## Metadata
- Video: https://www.youtube.com/watch?v=so9l_MwS2yg
- Duration: 25:17
- Playlist index: 761
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hey everyone. Uh I'm Zach. I work at WorkOS. Thanks for coming. Uh WorkOS is um provides drop-in APIs that allow you to take your software and go upmarket and sell larger deals to enterprises. Uh but what I'm going to talk about now is um sort of the way that I'm finding to try and maintain balance with all the insane new tools that we're getting every day. So, show of hands if anyone is uh AI coding with agents lately and feels a little bit like this and yeah, despite, you know, getting more done than ever before, like you're completely fried at the end of the day, right? And like adrenaline dumping constantly. So, this has been my experience and I've noticed that some of the worst of it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/so9l_MwS2yg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
