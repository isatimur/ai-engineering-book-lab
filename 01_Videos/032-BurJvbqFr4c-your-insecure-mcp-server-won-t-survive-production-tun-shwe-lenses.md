---
video_id: "BurJvbqFr4c"
playlist_index: 32
title: "Your Insecure MCP Server Won't Survive Production — Tun Shwe, Lenses"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BurJvbqFr4c"
duration: "24:34"
duration_seconds: 1474
view_count: 1318
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/BurJvbqFr4c.txt"
themes:
  - "MCP & Tooling"
  - "Security & Guardrails"
ingested_at: "2026-04-24T10:50:52+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Lenses' Tun Shwe and Jeremy Frenay give five MCP hardening principles mapped to OWASP MCP Top 10 risks, then trace MCP auth from static API keys through DCR to CIMD (preferred since Nov 2025)."
---
# Your Insecure MCP Server Won't Survive Production — Tun Shwe, Lenses

## Summary
Tun Shwe and Jeremy Frenay (Lenses) argue that MCP design and MCP security are the same discipline, and lay out five principles for hardening servers: shrink the attack surface by collapsing fine-grained API calls into single coarse-grained outcome-based tools; constrain input schemas with enums/dictionaries or Pydantic rather than free-form nested payloads to block command injection; treat tool descriptions as a defensive layer against tool poisoning (OWASP MCP Top 10 #3); return only the minimum data needed to prevent context oversharing (OWASP MCP Top 10 #10); and scope permissions at the tool/resource level, not the session level. They cite a load test in which stdio transport failed 20 of 22 requests at just 20 simultaneous connections, the reason for moving to streamable HTTP. Frenay then traces MCP authorization's evolution from long-lived, unscoped API keys (still over 50% of deployed servers, prone to "confused deputy" pass-through vulnerabilities) through OAuth 2.1 dynamic client registration (DCR, with PKCE and RFC 8693 token exchange) to Client ID Metadata Documents (CIMD), the approach preferred since November 2025 because it avoids DCR's growing registration database and phishing risk. Enterprise readiness beyond OAuth requires tool/resource-level RBAC, PII data masking, per-call audit logging for EU AI Act compliance, and end-to-end request tracing.

## Why it matters
- Documents a concrete, numbered checklist (five design principles mapped to specific OWASP MCP Top 10 risks) that a book chapter on MCP security could use as a reference framework rather than abstract advice.
- Traces the actual evolution of MCP auth standards in production (static keys → DCR → CIMD, RFC 8693 token exchange) with a dated inflection point (CIMD preferred since November 2025), useful as primary evidence for how the ecosystem is converging on a standard.
- Supplies a hard data point (stdio transport failing 20/22 requests at 20 concurrent connections) that grounds the common "local dev vs. production" claim about MCP in an actual measurement rather than assertion.

## Metadata
- Video: https://www.youtube.com/watch?v=BurJvbqFr4c
- Duration: 24:34
- Playlist index: 32
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]
- [[Security & Guardrails]]

## Transcript excerpt
> Hey folks, thank you for joining us for this session on why your insecure MCP server won't survive production. My name is Tin Shway and I lead AI at Lenses and day-to-day I'm an AI engineer and you can connect with me here on LinkedIn. And I'm Jeremy Fronae. I work on AI engineering at Lenses. First, a quick note on where we work. Lenses is a data operating fabric that sits between your agents and Lenses is the de facto streaming data layer for providing trusted real-time context to agentic AI. Companies work with us because we have governance, security and large scale at the top of mind. Here are a selection of our customers which gives us exposure to lots of different industry use cases...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BurJvbqFr4c.txt]]
- Description cue: Tun Shwe and Jeremy Frenay from Lenses.io address the critical security and design challenges involved in moving Model Context Protocol (MCP) servers from local development to enterprise production...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Security & Guardrails**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/lensesio/lenses-mcp>
- resource: <https://drive.google.com/file/d/1zLzkVO7_kBoV6bI7lhYIi3AxUH6j7xH_/view>
