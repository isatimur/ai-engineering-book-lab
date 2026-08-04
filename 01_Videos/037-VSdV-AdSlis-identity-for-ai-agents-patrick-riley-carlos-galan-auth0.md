---
video_id: "VSdV-AdSlis"
playlist_index: 37
title: "Identity for AI Agents - Patrick Riley & Carlos Galan, Auth0"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=VSdV-AdSlis"
duration: "1:22:12"
duration_seconds: 4932
view_count: 7411
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/VSdV-AdSlis.txt"
themes:
  - "Security & Guardrails"
ingested_at: "2026-04-24T10:51:04+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Auth0's Patrick Riley & Carlos Galan demo Token Vault and CIBA-based async authorization for agents, warning against simply forwarding a user's access token to an agent."
---
# Identity for AI Agents - Patrick Riley & Carlos Galan, Auth0

## Summary
Patrick Riley and Carlos Galan (Auth0/Okta) run a hands-on workshop demoing identity features from a product release shipped that same week: Token Vault, async authorization, and (briefly, not covered in depth) fine-grained authorization/RBAC. Token Vault stores and manages upstream OAuth tokens and scopes on the agent's behalf, performing token exchange so an agent can call downstream APIs (e.g., Slack) without ever holding raw user credentials. For long-running or autonomous agents that need step-up approval before a sensitive action (their example: calling a "create order" tool), they demo async auth built on CIBA (Client Initiated Backchannel Authentication), where the agent triggers a back-channel authorization request and the SDK waits for out-of-band user verification before issuing a scoped access token. They also model MCP servers as first-class OAuth clients via a "custom API client" mechanism, and explicitly warn against a common shortcut — forwarding the user's own access token to the agent — because it conflates identities and breaks down once the token expires and the user isn't present to re-authenticate.

## Why it matters
- Names concrete, shippable primitives (Token Vault, CIBA-based async auth, custom API clients for MCP) rather than abstract "agents need identity" claims — useful for a security/guardrails chapter on agent-to-API authorization.
- Documents a specific anti-pattern (forwarding the user's access token directly to an agent) with the stated reason it fails, giving the book a concrete "don't do this" example.
- Shows how an identity vendor is adapting existing protocols (OAuth token exchange, CIBA) to agentic workloads rather than inventing new auth models from scratch.

## Metadata
- Video: https://www.youtube.com/watch?v=VSdV-AdSlis
- Duration: 1:22:12
- Playlist index: 37
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]

## Transcript excerpt
> [music] We're talking today about identity for AI agents and how we authorize uh agents, MCP servers and uh the Um, we launched a new product uh actually this week. So, uh, that made this presentation fun. [laughter] Uh, had a major release just a few days ago um, for several of these features and ging these. Um, um, additionally, I should probably preface by saying a lot of this workshop material has been repurposed and um, our our architect uh, Abbyek, he goes by nicknames Shrek. um kind of prepared a lot of this and we've kind of massaged it into this presentation. Um yeah, so we're going to cover each of these in depth. um some of the core features of this new release whether it's token...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VSdV-AdSlis.txt]]
- Description cue: Implementing secure identity and access management for AI agents with Okta!

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
