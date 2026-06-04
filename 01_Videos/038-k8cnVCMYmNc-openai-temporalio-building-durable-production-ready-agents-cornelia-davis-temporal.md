---
video_id: "k8cnVCMYmNc"
playlist_index: 38
title: "OpenAI + @Temporalio : Building Durable, Production Ready Agents - Cornelia Davis, Temporal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=k8cnVCMYmNc"
duration: "1:18:30"
duration_seconds: 4710
view_count: 28078
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/k8cnVCMYmNc.txt"
themes:
  - "Agent Architecture"
ingested_at: "2026-04-24T10:51:06+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Cornelia Davis (Temporal, ex-Pivotal Cloud Foundry) demonstrates that the production agent problem is fundamentally a distributed systems problem — not a model problem. Temporal provides durable execution as a backing service: developers write the happy path; Temporal handles failures, retries, crashes, and state reconstitution through event sourcing. Live demo shows an agent surviving a mid-run process kill and resuming exactly where it stopped, with no application-level recovery code."
---
# OpenAI + @Temporalio : Building Durable, Production Ready Agents - Cornelia Davis, Temporal

## Summary

Cornelia Davis brings a distributed systems veteran's eye to the agent durability problem. Her background is telling: she helped build Cloud Foundry at Pivotal (container orchestration before Kubernetes) and wrote a book on cloud-native patterns. Her argument is that the failures people encounter with production AI agents — timeouts, crashes, partial execution, lost state — are exactly the class of problems distributed systems engineering has been solving for decades, and Temporal is the materialization of those solutions as a backing service.

**The core Temporal model:** Temporal sits alongside your application as a backing service (like Redis or Kafka). You annotate functions with `@activity` decorators. When those activities execute, Temporal intercepts them, records every result to an event log, and handles retries, timeouts, and state persistence automatically. If your process crashes mid-agent-run, the next worker to pick up the workflow reconstitutes state via event sourcing — replaying the event log — and continues from exactly where the previous process left off. No application-level recovery code required.

**The live demo is the argument.** Davis demonstrates a weather-alert agent running through the OpenAI Agents SDK + Temporal integration. Partway through an agent run, she kills the worker process (Ctrl+C). The Temporal UI shows the workflow paused mid-activity. When she restarts the worker, the agent resumes seamlessly — the LLM call results and tool call results from before the crash are preserved in the event log and don't need to be re-executed. This is the central claim made tangible: on the 1,350th turn of a long agent run, if your process crashes, Temporal gets you back to turn 1,350 for free.

**OpenAI Agents SDK integration specifics:** The integration provides `activity_as_tool()` — a public API that wraps a Temporal activity as an agent tool, auto-generating the JSON tool description from Python docstrings. This replaces the need for internal API hacks. Adding `temporal_plugin` to the agents SDK configuration is all that's needed to wire the two systems together.

**On idempotency:** Davis acknowledges that activities should be idempotent (since Temporal may retry them), but Temporal doesn't enforce this — it's developer responsibility. Since Temporal doesn't know whether a retry request reached the downstream service, it will keep retrying until it receives a response. Latency overhead for the Temporal round-trip is ~tens of milliseconds — acceptable for agents running at minute/hour scale.

**Real-world signal:** OpenAI Codex runs on Temporal. OpenAI's image generation runs on Temporal. Snapchat, Airbnb, and Lovable all use Temporal for non-AI workloads. The platform is production-proven at scale before the AI use case arrived.

## Why it matters

This is the canonical Temporal introduction in the corpus. It makes the strongest empirical case that durable execution is not optional for serious agent deployments — it's the infrastructure primitive that separates demo agents from production agents. The crash-and-resume demo is more persuasive than any theoretical argument for durability.

## Metadata
- Video: https://www.youtube.com/watch?v=k8cnVCMYmNc
- Duration: 1:18:30
- Playlist index: 38
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Coding Agents]]

## Key claims (for claims ledger)
- Production agent failures are infrastructure failures, not model failures — the model doesn't crash, the process does.
- Temporal reconstitutes agent state via event sourcing; crashed agents resume without application-level recovery logic.
- Temporal round-trip latency is ~tens of milliseconds — negligible for agents running at minute/hour scale.
- OpenAI Codex and OpenAI image generation both run on Temporal in production.
- The `readonly` annotation in MCP parallels Temporal's activity semantics — both encode whether an operation has side effects.

## Book angles
- Chapter 4 (durable runtime) — primary source. The crash-and-resume demo is the clearest illustration of why durability primitives are non-negotiable.
- Chapter 7 (reliability) — Temporal's retry/timeout model as infrastructure-layer reliability.
- Chapter 8 (constrained delegation) — workflow-as-code gives the human control plane visibility into every agent action via the Temporal UI.
