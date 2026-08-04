---
video_id: KLSuFPj2ld0
playlist_index: 745
title: "Building safe Payment Infrastructure for the autonomous economy — Steve Kaliski, Stripe"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=KLSuFPj2ld0"
duration: "18:46"
duration_seconds: 1126
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/KLSuFPj2ld0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-06-09T21:18:29+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Steve Kaliski (Stripe) demos shared payment tokens, an HTTP 402 machine payments protocol with Tempo, and the Agent Commerce Protocol for letting AI agents transact money deterministically."
---

# Building safe Payment Infrastructure for the autonomous economy — Steve Kaliski, Stripe

## Summary
Steve Kaliski (principal engineer at Stripe, formerly leading its card-issuing team) argues discovery should stay non-deterministic but payments, credentials, and checkout must become deterministic once agents act as economic buyers. He walks through three Stripe-built primitives with live demos: shared payment tokens, which let an agent hand a seller a credential scoped to a specific seller, currency, amount, and expiry (demoed enforcing a $25 limit that rejects a $50 charge but passes a lower one); the machine payments protocol built with Tempo, where a protected API endpoint returns an HTTP 402 with a payment payload that the agent settles on-chain (shown landing a one-cent USD transaction on the Tempo blockchain); and the Agent Commerce Protocol (ACP), built with OpenAI and demoed against Stripe Press's book catalog, which exposes product catalogs as structured JSON and lets buyer and seller negotiate cart state (line items, tax, shipping) via API instead of the agent scraping a checkout UI. He frames the core failure modes as buying from the wrong place, buying the wrong thing, spending the wrong amount, or leaking the wrong credential.

## Why it matters
- Documents concrete, shipped infrastructure (shared payment tokens, x402-style HTTP 402 flows, ACP) for letting AI agents transact money, directly relevant to any chapter on agentic commerce or tool-use safety.
- The wrong-place/wrong-thing/wrong-amount/wrong-credential framing is a reusable risk taxonomy for agent-initiated real-world actions beyond payments.

## Metadata
- Video: https://www.youtube.com/watch?v=KLSuFPj2ld0
- Duration: 18:46
- Playlist index: 745
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Just want to thank everyone for being here. Um, I'm from Stripe and today I'm going to talk about building safe payment infrastructure for the autonomous economy or how we can let robots spend money and how businesses can receive money from robots. So just about me, I'm a principal software engineer at Stripe. Spent my first four years leading our issuing team, so that's our product that lets developers create physical and virtual credit cards that historically would be for humans and increasingly for robots. In the last two years, I've been exploring how to let robots spend money and how Stripe businesses can adapt to that new kind of buyer. And if I just want to take away, if you stop...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/KLSuFPj2ld0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
