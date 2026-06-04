---
video_id: svCnShDvgQg
playlist_index: 666
title: "Two Roads to Durable Agents: Replay vs. Snapshot — Eric Allam, Trigger.dev"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=svCnShDvgQg"
duration: "16:36"
duration_seconds: 996
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/svCnShDvgQg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-10T20:57:16+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eric Allam (Trigger.dev) provides the clearest taxonomy in the corpus of the two architecturally distinct approaches to durable agents: replay (Temporal-style event sourcing) and snapshot (VM-level checkpoint/restore). Replay works for transactions but breaks for long agent sessions as the journal grows unboundedly. Snapshot solves this by treating the agent's execution environment as state to be serialized and restored. Trigger.dev ships this via Firecracker micro-VM snapshots: sub-second snapshot, ~200ms restore, down to 14MB compressed, 15,000 VM starts per minute."
---

# Two Roads to Durable Agents: Replay vs. Snapshot — Eric Allam, Trigger.dev

## Summary

Eric Allam (co-founder, Trigger.dev) gives a compressed 30-year history of backend infrastructure to frame why agents represent a fundamental architectural shift — and what two different approaches to solving it look like.

**The history:** From CGI (stateless process per request) through the LAMP stack (shared-nothing, compute stateless, state in DB) to modern serverless — the dominant paradigm for 30 years has been stateless compute. Workflow engines like Temporal were layered on top to handle multi-step side effects with durable state.

**Why replay (Temporal's approach) has limits for agents:**
The replay model records each activity's result. On resume, it replays the journal to reconstitute state. This works well for bounded workflows (process order → charge card → send receipt). For agents, the journal grows with every LLM call and tool call — after enough turns, the journal grows to an unmanageable size or hits system limits. And agent capability duration is doubling every 4-7 months (currently ~hours, soon days) — replay's scaling characteristics don't match this trajectory.

**The distinction Allam draws:** Multi-step workflows are *transactions* — they start and end. Agent sessions are *sessions* — they last as long as the user wants. These have different durability requirements.

**Allam's two-component model for durable agents:**
1. **Context durability** — the append-only log of everything in/out of the LLM (system messages, user messages, tool calls, tool results). This is the most critical state. Can be stored in any durable primitive (DB, object storage). Makes agents resumable across code versions and crashes.
2. **Execution durability** — the compute environment state (cloned repos, installed packages, running dev servers, subprocess sandboxes). Can't be reconstructed from a log. Requires snapshot/restore.

**Trigger.dev's implementation — Firecracker micro-VM snapshots:**
- Snapshot entire VM state (not just process — everything on the machine)
- Previously used CRIU (process-level checkpoint, compatible with containers but slow and limited — doesn't capture FFmpeg, Chrome, etc.)
- Moved to Firecracker micro-VMs: snapshot in ~sub-second, restore in ~200ms
- Compressed via seekable compression with lazy page decompression on restore — 512MB VM compressed to ~14MB
- 15,000 VM starts per minute in benchmark
- Tool being open-sourced as `fcrun` — Docker-compatible CLI for Firecracker VMs with built-in snapshot/restore

**The two recovery modes:**
- LLM rate-limited: snapshot and restore when retry window opens (don't hold memory during wait)
- Machine crash or code bug: restore from context log on a fresh machine

**The thesis:** 30 years of stateless compute is giving way to stateful compute. The snapshot/restore primitive is what makes agent sessions durable without the scaling constraints of replay-based approaches.

## Why it matters

This is the most technically precise treatment of durability architecture in the corpus. It establishes the correct vocabulary (replay vs. snapshot, transaction vs. session, context durability vs. execution durability) and explains concretely why Temporal's approach, while excellent for workflow orchestration, hits a ceiling for long-horizon agents. Pairs with Cornelia Davis (#38) and Samuel Colvin (#99) to give a complete picture of the durability solution space.

## Metadata
- Video: https://www.youtube.com/watch?v=svCnShDvgQg
- Duration: 16:36
- Playlist index: 666
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Coding Agents]]

## Key claims (for claims ledger)
- Replay (Temporal-style) is optimal for bounded workflows; for open-ended agent sessions the journal grows unboundedly and hits system limits.
- Agent sessions are fundamentally different from workflow transactions — they have no defined end and require different durability semantics.
- Agent capability duration is doubling every 4-7 months; durability infrastructure must scale with this.
- Two components of agent state require different preservation strategies: context (append-only log) vs. execution environment (snapshot/restore).
- Firecracker micro-VM snapshots: sub-second snapshot, ~200ms restore, 512MB VM → 14MB compressed.
- Trigger.dev runs 15,000 VM starts per minute.

## Book angles
- Chapter 4 (durable runtime) — provides the clearest taxonomy for the replay vs. snapshot choice. Essential alongside Cornelia Davis.
- Chapter 7 (reliability) — the two recovery modes (LLM outage vs. machine crash) map to distinct infrastructure strategies.
- Chapter 8 (constrained delegation) — Firecracker VM isolation is a compute-level trust boundary; each agent session gets its own VM.
