---
video_id: shRR1e2HXMk
playlist_index: 997
title: "Codex, Behind the Harness — Dominik Kundel, OpenAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=shRR1e2HXMk"
duration: "20:55"
duration_seconds: 1255
view_count: 4700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/shRR1e2HXMk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:36:08+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dominik Kundel (OpenAI) details the open-source Codex harness's context management, sandboxing, auto-review sub-agent, WebSocket transport, and goal/compaction loop internals."
---

# Codex, Behind the Harness — Dominik Kundel, OpenAI

## Summary
Dominik Kundel (OpenAI) walks through internals of the open-source Codex harness (MIT/Apache-2, written in Rust), which communicates over two protocols: an app-server protocol between UI and harness, and the responses API between harness and model inference. He details context-window management — deferred tool loading so unused tools/MCPs don't bloat the prompt, available-skill descriptions capped at 2% of the max context window, and a tool-search capability available in the responses API since GPT-5.4 — plus three agent action categories: spawnable sub-agents and background terminals for async work; code-executed "computer use," where the agent writes JavaScript/Playwright-style code against a persistent Node REPL instead of issuing one action at a time; and file-system edits via an apply-patch tool (which GPT-5-generation models were trained on) plus a bundled Ripgrep binary, with platform-specific sandboxing (Seatbelt on macOS, Bubblewrap on Linux, a custom-built sandbox on Windows). To cut approval fatigue without granting full access, Codex spins up a separate, read-only "auto-review" sub-agent that judges each risky action (e.g., a file deletion) against the user's stated authorization and a risk taxonomy before auto-approving or escalating it. He also covers a WebSocket transport mode — adopted after GPT-5.3 "Codex Spark," running on Cerebras at 1,000 tokens/second, exposed the network rather than inference as the bottleneck — that sends only deltas instead of full transcripts each turn, a `/goal` construct where the harness auto-injects a continuation prompt until the model calls an update-goal tool, and server-side auto-compaction (introduced the prior year) that the model was trained to handle without a performance drop.

## Why it matters
- Names specific, dated engineering mechanisms (tool search since GPT-5.4, apply-patch training since GPT-5, WebSocket mode after the Cerebras-hosted "Codex Spark" release) rather than generic claims, giving the book verifiable specifics on how a production coding-agent harness actually manages context and tool access.
- The auto-review sub-agent pattern — a separate, read-only judge agent that scores an action against user-authorization and risk taxonomy before approving or escalating it — is a concrete, reusable answer to the recurring "approval fatigue vs. full autonomy" trade-off in agent design.
- The Cerebras/WebSocket anecdote (1,000 tok/s exposing network round-trips, not inference, as the new bottleneck) is a specific, transcript-grounded data point on where production agent latency actually comes from once inference gets fast.

## Metadata
- Video: https://www.youtube.com/watch?v=shRR1e2HXMk
- Duration: 20:55
- Playlist index: 997
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hi everyone. Uh we're going to start right on time because I'm going to speak basically at 2x. I'm sorry, I have a lot of content. I'm trying to get you out of here on time. I want to start with a quick raise of hands. So, how many of you have built your own agents or are currently building your own agents? Perfectly. You're the right audience for this. Um over the next 20 minutes, I want to talk to you about a couple of different things that we're doing in the Codex harness that hopefully you can learn to apply to your own use cases or even just use the Codex harness with this in um uh in your own projects or at bare minimum learn what happens when you actually use Codex. Uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/shRR1e2HXMk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/openai/codex>
