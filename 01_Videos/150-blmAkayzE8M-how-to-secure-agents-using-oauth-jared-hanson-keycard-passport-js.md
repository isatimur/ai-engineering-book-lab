---
video_id: "blmAkayzE8M"
playlist_index: 150
title: "How to Secure Agents using OAuth — Jared Hanson (Keycard, Passport.js)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=blmAkayzE8M"
duration: "18:59"
duration_seconds: 1139
view_count: 7719
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/blmAkayzE8M.txt"
themes:
  - "Security & Guardrails"
ingested_at: "2026-04-24T11:41:21+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jared Hanson (Keycard) traces MCP auth from no-auth to a broken authorization-server-as-MCP-server draft to a fixed resource-server model, then outlines gaps like agent identity and transactional auth."
---
# How to Secure Agents using OAuth — Jared Hanson (Keycard, Passport.js)

## Summary
Jared Hanson (Keycard co-founder, Passport.js creator, ex-Auth0/Okta) traces MCP's authorization story through three versions: the original spec (about seven months old at talk time) had no auth at all, the March draft collapsed the OAuth authorization-server role into the MCP server itself (triggering viral critiques from Christian Posta and Aaron Parecki and a fix-it PR that drew some 400 comments), and the current draft separates the MCP server back out as a pure OAuth resource server that just verifies tokens. He then lays out gaps still unaddressed for agent-to-agent security: client-credentials flows for non-user-delegated agent communication; agent identity via URL and PKI-signed assertions instead of dynamic client registration (which he says has seen no meaningful adoption in the roughly ten years it has existed) or the emerging pushed-client-registration spec for public clients; remote attestation of the device and software an LLM runs in; transactional, fine-grained authorization (citing the Rich Authorization Requests spec) for agent-initiated financial transactions; cross-domain chain-of-custody via OAuth token exchange and the identity assertion grant; and async, out-of-band re-consent (SMS, push notifications) for agents that keep working after the user walks away.

## Why it matters
- Gives a first-hand, dated account of how MCP's auth model actually evolved in public (spec versions, specific blog posts, specific PR), useful as a primary-source timeline for a chapter on agent security standards.
- Names concrete open specs (Rich Authorization Requests, identity assertion grant, OAuth token exchange, pushed client registration) an engineer would need when designing agent-to-agent or agent-to-API authorization today.

## Metadata
- Video: https://www.youtube.com/watch?v=blmAkayzE8M
- Duration: 18:59
- Playlist index: 150
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]

## Transcript excerpt
> [Music] Thanks a lot everyone. Thanks for coming out. Uh we're going to talk about a topic that I consider one of the most uh important topics uh for what we're doing with AI and agents, which is how to secure agents using OOTH. Um I'm Jared Hansen. I'm the co-founder of a new company called Keycard where we're building identity and access management platform for AI and agents. I'm also the creator of Passport.js for any of the node uh developers in the audience very popular o framework and previously I was at Ozero where I built a lot of their core identity infrastructure and then and then at octa uh let's get into it. So I think we're all super excited about what's happening with LLMs and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/blmAkayzE8M.txt]]
- Description cue: We all know sharing passwords is bad (unless you want free TV), so why are we sharing API keys with AI?  We shouldn't, and that’s why we need to talk about OAuth.

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
