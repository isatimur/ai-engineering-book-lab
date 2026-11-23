---
video_id: mJqwmmOx4WA
playlist_index: 1094
title: "How to avoid disaster when vibe-coding a billing engine — Andrew Garvin, Stripe"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=mJqwmmOx4WA"
duration: "17:49"
duration_seconds: 1069
view_count: 4800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/mJqwmmOx4WA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-10-30T01:10:53+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Andrew Garvin, co-founder of the usage-billing platform Metronome, now part of Stripe, live-demos Stripe Projects: from the CLI, a coding agent provisions a Stripe account and a Metronome billing agent, then builds a sandbox copy of Lovable's prepaid credit, auto-recharge pricing from one natural-language prompt. His thesis: billing is business-critical, so agents should speed you into a test environment, not ship to production without a human. Metronome guides agents with portable skills files, verbose self-correcting errors and seeded test usage. He frames agents as product, buyer and user, which pushes vendors such as HubSpot from seats to credits."
---

# How to avoid disaster when vibe-coding a billing engine — Andrew Garvin, Stripe

## Summary
Andrew Garvin is a co-founder of Metronome, a usage-billing platform that Stripe acquired earlier this year in what he calls Stripe's largest deal. The talk is mostly a live demo of Stripe Projects, launched the same week as the acquisition. Stripe Projects is an orchestrator: through the CLI it provisions a Stripe account plus back-end services such as Postgres and, here, a Metronome billing agent. Stripe has seen CLI use grow exponentially over the past five or six months, which he ties to coding agents. His thesis: people now expect to run a deep, complex product like Metronome through a coding agent, so the vendor must design the developer experience to keep the agent out of trouble.

**Why billing goes wrong**
Metronome has metered API calls for OpenAI and Anthropic since before they had revenue, so it runs metering at global scale. Modern pricing is not just pay-as-you-go: it mixes credits, commits, sales-led discounts and offers. In the last six months failures matter more because "agents can run away with spend". Metronome is working on controls customers can pass on, such as a wallet an agent can spend only from.

**The demo**
Garvin initializes Stripe Projects with Claude as the agent (with live-demo hiccups) and prompts in natural language to create a demo Metronome billing engine that mimics Lovable's pricing. That model uses prepaid credits with monthly auto-recharge, several credit types scoped to different usage, and an end-of-period invoice for overage. While it runs, he points out three design choices:
- An extensible, portable set of skills files gives the agent context on Metronome's API and its "foot guns", and users can install them on their own side.
- Errors are more verbose and clear so the agent can self-correct; developer experience teams hunt for failure cases, especially in setup.
- The goal is not to run the whole system without a human. The agent accelerates you into a sandbox, not production. A test setup must show usage, so the skills direct the agent to flow sample usage into the platform.

In the Metronome UI, the human onboarding wizard is no longer needed. The agent created a test customer with lifetime spend, a first-class credit object drawn down by usage, and a draft invoice with build, plan mode, cloud and AI gateway credits, matching Lovable's model from one prompt.

**Agent as product, buyer and user**
- Agent as product: an agent can run up a token bill, so you need usage-based pricing.
- Agent as buyer: in Stripe Projects the agent procures Stripe and back-end services, so services must be discoverable to agents, B2C on Stripe and B2B on Metronome.
- Agent as user: HubSpot is moving from seat-based to credit-based pricing, starting in EMEA, cutting seat prices and adding credits, because an agent could operate the whole system and seats lose meaning. At one demo day all five companies were sales-led agents that operate platforms like SAP or invoicing tools.

He adds that enterprise coding-agent vendors are adopting commit structures like cloud providers: prepaid and postpaid commitments and targeted offers. Other providers are onboarding to Stripe Projects to become discoverable to agents.

## Why it matters
- A vendor's view of how to make a complex, business-critical API safe for coding agents: portable skills files, verbose errors for self-correction, and a sandbox-first flow.
- Draws a clear line on autonomy: for billing, the agent should get you to a tested setup, with a human deciding what goes to production.
- The agent-as-product, agent-as-buyer, agent-as-user framing is a compact model for pricing and discoverability decisions.
- Concrete pricing evidence: runaway agent spend, agent wallets, and HubSpot's shift from seats to credits because agents may become the main user.

## Metadata
- Video: https://www.youtube.com/watch?v=mJqwmmOx4WA
- Duration: 17:49
- Playlist index: 1094
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] Hi everyone. My name is Andrew Garvin. I'm one of the co-founders of Metronome. Metronome, if you're not familiar, is the top platform for usage billing, which as you might imagine is taking off right now. Um, so much so that earlier this year we were acquired by Stripe in the largest deal that Stripe has ever done. Um, and what I'm going to show you today is a fun project that we've been cooking on with the Stripe team. Um, that is a demonstration of some of the things that we could work on together. Um, this is going to combine two very different uh products within Stripe. Um, if you haven't seen it already, I recommend looking at Stripe Projects. Just open up open that up on your...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/mJqwmmOx4WA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
