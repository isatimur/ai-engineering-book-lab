---
video_id: YX4Z4XqZ9Vo
playlist_index: 1445
title: "Most of Your Docs Readers Are Now AI Agents - Hahnbee Lee, Mintlify & Lincoln Murr, Coinbase"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=YX4Z4XqZ9Vo"
duration: "18:52"
duration_seconds: 1132
view_count: 6100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/YX4Z4XqZ9Vo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-11-08T07:27:01+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Fireside chat between Hahnbee Lee (co-founder and CTO, Mintlify) and Lincoln Murr (head of AI product, Coinbase) on building for a web where agents are the main readers and buyers. Lee reports that agent traffic across Mintlify-hosted docs rose from about 10% to about 80% in one year, so page size, accuracy and freshness now matter more than design. Murr argues APIs are the base layer under MCP and CLI, and that giving agents money raises their autonomy: Coinbase's X402 payment standard has seen about 100 million on-chain agentic transactions in a year, mostly agents paying per call for APIs."
---

# Most of Your Docs Readers Are Now AI Agents - Hahnbee Lee, Mintlify & Lincoln Murr, Coinbase

## Summary
A short fireside chat. Hahnbee Lee is co-founder and CTO of Mintlify, a Series B company in San Francisco that powers developer docs for companies such as Coinbase. Lincoln Murr is head of AI product at Coinbase. They trade questions on one shared premise: agents, not people, are becoming the main actors on the internet, so docs and products must be built for them.

**Docs for agents, not eyes**
Lee admits it makes her a little sad, as a design-led founder, that agents "do not see your website" and do not care about branding. What matters now is page size (does it eat the context window?) and accuracy. An agent that hits one friction point while setting up a product does not debug it; it may brute-force, or it may just churn to a competitor. Because coding agents make engineering so much faster, the rest of the company must use AI and automations to keep docs from going stale.

**The 10% to 80% number**
Lee's key statistic: at the start of the year about 10% of viewership across Mintlify sites came from agents; now it is close to 80%. Human traffic is not falling; agent traffic is rising faster than the team's own internal bets predicted. Her framing: humans have small context windows next to agents, which can ingest far more content.

**APIs as the base layer**
Murr treats the agent shift as a repeat of web-to-mobile. Coinbase wants all human-facing functionality reachable by agents through APIs, with guardrails, rather than through browser use, which raises auth and security concerns for financial accounts. On MCP versus CLI versus API, he says the API is always the fundamental layer; MCP adds context for natural-language settings, a CLI needs a terminal, and teams need all of them. Lee agrees: agents "speak the language of developers" and are good at bash and CLI commands, so software companies should invest in seemingly traditional APIs.

**Agent payments**
Murr describes X402, Coinbase's internet-native payment standard, now moved into a foundation co-governed by Cloudflare, Stripe, Amex, Mastercard, Visa and others. Crypto's edge is micro-transactions: an agent can pay a thousandth or a millionth of a cent for an API call or paywalled page. He cites around 100 million agentic transactions in the past year, all on-chain and auditable, mostly agents buying API access one call at a time instead of a human signing up, funding an account and handing over a key. His analogy: today's web is like buying a store-specific gift card and loyalty account before you can shop. His belief: giving agents money is how you get longer-running, more autonomous agents, and it may finally deliver the DAO vision of automation at the core and humans at the edges.

**Human versus AI writing**
Lee keeps human writing for creative and narrative prose, but thinks the tedious parts of technical writing — gathering related PRs and Slack decisions, condensing them, and placing the result in the right spot in the docs — can be automated. Both warn that talking to an agent does not replace talking to users.

**The common pitfall**
Asked for the biggest mistake, Lee names build versus buy: teams build docs tooling at a hackathon and then nobody wants to maintain it, while agent crawling standards keep changing.

## Why it matters
- Gives a hard data point for agent-first docs: agent share of docs traffic went from about 10% to about 80% in a year.
- Names the new docs quality bar for agents: small pages, accurate steps, no stale content, because an agent that hits friction churns instead of debugging.
- States a clear layering view: the API is the durable base, with MCP and CLI as wrappers for different agent contexts.
- Adds the payments angle to agent design: per-call micro-payments (X402) replace the sign-up, fund and API-key flow that blocks autonomous agents.
- Separates which writing to automate (gathering and placing technical context) from which to keep human (narrative prose).

## Metadata
- Video: https://www.youtube.com/watch?v=YX4Z4XqZ9Vo
- Duration: 18:52
- Playlist index: 1445
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Hi. Nice to meet you all. Um, appreciate you guys all coming. Um, hope everyone is having a good start to their day. Um, nice to meet you. I'm Hamby. I'm a co-founder and CTO at Mintlify. Uh, Mintlify is a series B company based in San Francisco and we power developer documentation for companies like Coinbase. Um, would you like to give an intro? >> Yeah, sure. Everyone, my name is Lincoln. I'm the head of AI product at Coinbase, uh, which you might know as a crypto company, but is widely expanding into all sorts of assets and uh, payments as well and there's also an agentic angle, which we'll be talking about here shortly. >> Yeah. Um, do you want to go and ask the first...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/YX4Z4XqZ9Vo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
