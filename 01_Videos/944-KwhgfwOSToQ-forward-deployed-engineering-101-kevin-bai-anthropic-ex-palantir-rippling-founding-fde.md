---
video_id: KwhgfwOSToQ
playlist_index: 944
title: "Forward Deployed Engineering 101 — Kevin Bai, Anthropic, ex Palantir & Rippling Founding FDE"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=KwhgfwOSToQ"
duration: "17:48"
duration_seconds: 1068
view_count: 10000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/KwhgfwOSToQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:06+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kevin Bai (Anthropic, ex-Palantir/Rippling) defines forward deployed engineering as customer-facing engineers building on shared platform primitives, needed only when selling technical products to non-technical buyers."
---

# Forward Deployed Engineering 101 — Kevin Bai, Anthropic, ex Palantir & Rippling Founding FDE

## Summary
Kevin Bai, now at Anthropic's applied AI team after being the first FDE hire at Rippling (grown to ~25 people in a year) and earlier work at Palantir, frames forward deployed engineering as a design partnership pattern scaled to enterprise: engineers embed with a customer and build a solution, but critically assemble it from a shared set of platform primitives rather than writing bespoke software from scratch — otherwise, he says, "you have a dev shop," not an FDE function. He argues FDE is only needed in the specific quadrant where a technically complex product (like Palantir's Foundry, a data-ontology and app-building platform) is sold to a non-technical enterprise buyer (e.g., an oil-and-gas Fortune 500 company); technical products sold to technical buyers (GitHub, Datadog) or simple configurable products sold to non-technical buyers (Rippling, Jira, Slack) don't need it. He cites public-company ACV (average contract value) figures to argue the model works — Palantir around $4M, ServiceNow next at $1.2M, Workday at $600K, with no other public SaaS company cracking half a million — and claims the reason FDE is suddenly relevant industry-wide in 2026 is that AI has made nearly every software platform agentic and customizable, putting most vendors into the same "customer doesn't understand what we do" situation Palantir solved for. In Q&A he adds that primitive granularity depends on the domain (citing AWS's DynamoDB as a shared primitive serving a broad customer base), that generalizable engineering work should migrate onto the platform while bespoke work stays with the customer engagement, and that "an FDE is nothing more than a customer-facing software engineer."

## Why it matters
- Gives a precise, falsifiable definition of FDE (customer-embedded engineer assembling shared platform primitives, not building from scratch) that distinguishes it from a dev shop — useful for a book chapter drawing boundaries around this emerging role.
- The 2x2 framework (technical/non-technical product x technical/non-technical buyer) is a reusable lens for deciding when a company needs an FDE motion versus DevRel or traditional sales-led GTM.
- Directly argues that agentic AI is the reason FDE-style roles are proliferating now — every platform becoming customizable puts more companies in Palantir's original bind — a causal claim worth testing against other clusters in this batch (e.g. the Ramp FDE talk).

## Metadata
- Video: https://www.youtube.com/watch?v=KwhgfwOSToQ
- Duration: 17:48
- Playlist index: 944
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Thank you so much, Basil, for the introduction. Hello there. Those of you in the audience, thank you so much for joining us today. My name is Kevin. Uh, technically we don't really have titles. So I am member of technical staff at Anthropic working on the applied AI team. Uh before this I joined Ripling to help build their FTE function. I was the first person to join that team and we grew it to uh around 25 in a year. Um and so that's pretty cool. And then before that did a bunch of stuff at Palunteer. But you know list of companies is not really that interesting right because we're talking about a function. And what I I hope you're all here for is to hear about forward deployed...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/KwhgfwOSToQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
