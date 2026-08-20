---
video_id: MkRYPFIMCSA
playlist_index: 1020
title: "Security Firewall for Agents — Ryan Dahl, Deno"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MkRYPFIMCSA"
duration: "19:06"
duration_seconds: 1146
view_count: 1800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/MkRYPFIMCSA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:07+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Deno's Ryan Dahl argues alignment isn't enough security for agents with production access, and demos Claw Patrol, a byte-level proxy that blocks a live psql DELETE via protocol-aware rules."
---

# Security Firewall for Agents — Ryan Dahl, Deno

## Summary
Ryan Dahl (creator of Node.js, now CEO of Deno) describes giving AI agents — including one referred to in the talk as "OpenClaw," and separately Codex — broad read/write access to Deno Deploy's production systems (Postgres, Kubernetes, ClickHouse, AWS, GitHub, Slack) so they can auto-resolve on-call incidents, and reports that Claude Opus reliably refuses direct requests to do destructive things like drop the users table, but argues alignment alone isn't a sufficient security boundary given the risk of prompt injection from agents wired into support channels. His team's stance is that agents must be treated as untrusted software: every action they take, good or bad, eventually surfaces as bytes on the network, so the guard has to sit outside the agent and understand non-HTTP protocols too, since an agent can simply spawn a `psql` subprocess and tunnel through an EKS endpoint into a VPC-isolated production database. He argues existing options fall short — credential scoping alone creates composition-of-access holes across systems, MCP-tool permissioning breaks the moment an agent spawns a raw subprocess, and LLM gateways or HTTP-layer proxies (OpenRouter/LiteLLM guardrails, HTTP jail, Brex's Crabtrap) only see LLM or HTTP traffic, not protocols like the Postgres wire protocol — and describes Deno's answer, Claw Patrol: an open-source, MIT-licensed proxy that parses protocols like Postgres directly, injects credentials so the agent never sees secrets, enforces a roughly 1,000-line HCL rule file (with its own fixture-based unit tests) that can deny a request, require Slack approval, or route it through an LLM judge, and runs over Tailscale or WireGuard as an exit node. In a demo, Codex is instructed to delete the users table, spawns a `psql` subprocess to do it, and Claw Patrol parses the Postgres protocol traffic and blocks the destructive query before it reaches the database.

## Why it matters
- A concrete real-world example of prompt-injection risk in a production ops agent with wide system access, paired with a specific architectural answer — a network-level, protocol-aware proxy — instead of relying on model alignment.
- Names specific failure modes of higher-level controls (MCP permissioning, LLM gateways, HTTP-only proxies) once an agent can spawn a raw subprocess like `psql` — a concrete argument for why security has to operate below the application/HTTP layer.
- The demoed Claw Patrol blocking a live `DELETE FROM users` attempt is a rare recorded instance of agent-security tooling actually stopping a destructive action, useful as a case study for an agent-safety chapter.

## Metadata
- Video: https://www.youtube.com/watch?v=MkRYPFIMCSA
- Duration: 19:06
- Playlist index: 1020
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] How's it going? >> Um, my name is Ryan. Um, I'm going to I I'm I'm the CEO at Dino and uh yeah, you been developing software for for quite a while at this point. You might know one of my projects, Node.js. Um, I want to talk about um a service that we're running at Dino called Dino Deploy. This is a system for hosting websites and it has incidences. It's it it has downtime occasionally and uh we've got a pager duty that fires. I'm sure you're all very familiar with the very scary alarm sound that wakes you up in the middle of the night. Um, and recently we've been playing around with using agents to automatically service these incidences. Um, in particular, OpenClaw, but other other...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MkRYPFIMCSA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
