---
video_id: CD6R4Wf3jnY
playlist_index: 624
title: "What we learned scaling MCPs to Enterprise — Karan Sampath, Anthropic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CD6R4Wf3jnY"
duration: "17:48"
duration_seconds: 1068
view_count: 11004
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/CD6R4Wf3jnY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:21+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anthropic's Karan Sampath argues enterprises stall on MCP due to observability, access-control, and security gaps, proposing a single gateway as the root-of-trust layer separating agent harnesses from data."
---

# What we learned scaling MCPs to Enterprise — Karan Sampath, Anthropic

## Summary
Karan Sampath, a forward-deployed engineer at Anthropic, argues that despite thousands of servers in the official MCP registry, enterprises stall at using only single-digit numbers of MCPs because of a "three-headed hydra": missing observability (who's using which tools, what's failing), missing access control (scoping tools/servers to the right teams), and unresolved security (verifying server safety, preventing data exfiltration, trusting untrusted remote clients). His proposed fix is a gateway — a middle layer between MCP servers and clients that a security team "blesses" as the sole root of trust, handling authorization/authentication, role-based access control, proxied routing, a secured tunnel, an internal sub-registry, and CLI tooling — so that individual teams (his example: a legal team building a contract-review MCP) only need to own business logic, not infrastructure. He claims this unlocks several follow-on benefits once in place: any new client surface (Claude.ai, Claude Code) plugs into the same gateway without per-server reconfiguration, connections become more secured for sensitive internal data, teams iterate faster without repeated security reviews, the gateway can encode a company's standard operating procedures as enforced primitives, and it supports pluggable credential types while scaling to hundreds of thousands of agents. He closes by framing the gateway as an investment that separates the agent harness from where enterprise data lives, letting a company treat "which agents run in-house vs. externally" as an interchangeable decision rather than one baked into MCP server design.

## Why it matters
- Names a specific, recurring enterprise-adoption blocker for MCP (observability/access-control/security gaps, not model capability) with a named architectural fix (gateway as root of trust) — directly usable for a chapter on enterprise agent infrastructure.
- Gives a concrete anatomy of what a production MCP gateway contains (auth, RBAC, proxy routing, secure tunnel, sub-registry, CLI), useful as a reference architecture rather than an abstract concept.
- The "separate the agent harness from the data layer" framing is a specific claim from an Anthropic practitioner about where agent architecture is heading, worth citing as forward-looking industry perspective.

## Metadata
- Video: https://www.youtube.com/watch?v=CD6R4Wf3jnY
- Duration: 17:48
- Playlist index: 624
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. Um so everyone, I'm uh Karan Sampath. I'll be talking to you about how we Anthropic think about MCPs in the enterprise. I've alternatively titled it, I think more catchily, is why we think gateways are all you need. Um so before I go into the talk, uh I'm going to quickly tell you a bit about me. I was uh I'm a forward deployed engineer at Anthropic, um first one outside uh the US. Uh a lot of my work includes working with enterprises on things like MCPs, and I also work on our internal use cases. In this talk, I'm going to be positing to you what we think the problems with enterprises, what enterprises face with MCPs today, why we think gateways and the the necessary...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CD6R4Wf3jnY.txt]]
- Description cue: MCPs are often flaky, face multiple security vulnerabilities, and are generally hard to scale. Most enterprises struggle to use more than single digit numbers of MCPs due to issues with security, observability, and access control. In this talk, we'll explore the approaches and learnings we at Anthropic have been taking to solve this, and make MCPs more enterprise ready.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
