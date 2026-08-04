---
video_id: EmhRyw6xeT0
playlist_index: 627
title: "One Login to Rule Them All: Cross-App Access for MCP — Garrett Galow, WorkOS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=EmhRyw6xeT0"
duration: "23:24"
duration_seconds: 1404
view_count: 1913
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/EmhRyw6xeT0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:26+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "WorkOS's Garrett Galow demos Cross-App Access (ID-JAG), an OAuth extension letting an IdP like Okta silently issue short-lived MCP access tokens, killing consent-screen fatigue and long-lived leaked tokens."
---

# One Login to Rule Them All: Cross-App Access for MCP — Garrett Galow, WorkOS

## Summary
Garrett Galow, who runs product at WorkOS (the SSO/auth backend behind Cursor's and Anthropic's login flows), diagnoses two concrete problems with MCP's current OAuth-per-server model: users re-click consent screens for every MCP server even when SSO is already in place, and leaked long-lived OAuth refresh tokens (he cites personally being hit by the recent Axios npm supply-chain compromise) can grant standing access for days or weeks even after IT revokes a compromised account's SSO session, since most companies lack SCIM-based token revocation. His proposed fix, Cross-App Access (XAA), builds on a new spec called ID-JAG (Identity JWT Authorization Grant): the MCP client (demoed in an XAA-enabled build of Claude Code) logs into the IdP (Okta) once, exchanges its refresh token for an ID-JAG token scoped to a target app's audience (e.g., Figma), and the target's authorization server validates that JAG with Okta before issuing a short-lived (~5 minute) standard OAuth access token — making every subsequent MCP connection automatic with no visible consent screen, and cutting off access within minutes of an IdP-side session revocation rather than days. He notes the ecosystem is early: Okta supports XAA today (with caveats), Microsoft Entra does not yet, and dynamic client registration (DCR) support is fragmented across MCP clients/servers, with a newer Client ID Metadata Document (CIMD) spec trying to supersede DCR. He's explicit in Q&A that XAA only solves authentication, not fine-grained authorization/scoping, which remains an open problem.

## Why it matters
- Documents a real, fast-moving standard (ID-JAG / Cross-App Access) for solving MCP's consent-screen and token-lifecycle problems — concrete plumbing detail a book chapter on agent security/identity would otherwise have to reconstruct from spec documents.
- The Axios supply-chain-compromise anecdote is a grounded example of why long-lived OAuth refresh tokens are a real production risk for agentic tooling, not a hypothetical.
- Captures the current state of ecosystem fragmentation (Okta vs. Entra support, DCR vs. CIMD) useful for a book documenting where agent-identity standards stood at time of writing, without overstating maturity.

## Metadata
- Video: https://www.youtube.com/watch?v=EmhRyw6xeT0
- Duration: 23:24
- Playlist index: 627
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right, good morning everybody. Thank you for coming to this talk. Hopefully your morning was eventful. I caught a little bit of the keynote. I wasn't able to catch all of it, but it was pretty good. Um, my name is Garrett Galo. Today I'm going to be talking about one login to rule them all. uh or crossop access for MCP in case you haven't heard about that. Uh quick intro about myself. Uh I run product at work OS. I've been building enterprise developer platforms for the past almost 15 years. Uh originally at Microsoft Azure, then at Cloudflare for a long time and now at work OS. >> If you haven't heard of work OS before, we make your app and also your agents enterprise ready. uh we...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/EmhRyw6xeT0.txt]]
- Description cue: Connecting a coding agent to multiple services often means facing a dozen OAuth consent screens, a dozen token lifecycles, and a dozen chances for something to break. Despite having Single Sign-On, users still find themselves signing in repeatedly.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
