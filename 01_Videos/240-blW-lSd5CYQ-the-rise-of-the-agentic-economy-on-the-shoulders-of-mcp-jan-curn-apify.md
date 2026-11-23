---
video_id: "blW-lSd5CYQ"
playlist_index: 240
title: "The rise of the agentic economy on the shoulders of MCP — Jan Curn, Apify"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=blW-lSd5CYQ"
duration: "18:08"
duration_seconds: 1088
view_count: 6285
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/blW-lSd5CYQ.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:09:36+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jan Curn, founder of Apify, argues that general intelligence will emerge from many agents interacting, as it does in neurons, markets and companies, and that MCP is the missing fabric. Tool discovery is MCP's killer feature: Apify exposes about 5,000 Docker-based actors through one MCP server, adding tools on demand. The blocker is that agents cannot buy services on their own. Rather than agents signing up or waiting for new agent payment rails, he proposes a central marketplace where one account unlocks every tool and creators wrap third-party APIs and MCP servers, even Browserbase's, without the target service knowing."
---
# The rise of the agentic economy on the shoulders of MCP — Jan Curn, Apify

## Summary
Jan Curn, founder of Apify, opens with an analogy. Intelligence emerges in brains from neurons that connect to pursue their own interest, in markets from self-interested participants, and in companies (provocatively) through Slack. He expects general intelligence in computing to emerge the same way: many agents pursuing their own goals and interacting, not one ever-larger model. MCP, he says, supplies the missing piece, an "agentic mesh" where agents find counterparts and buy services from businesses, tools and other agents.

**Apify and actors**
Apify is a marketplace of about 5,000 tools called actors, mostly web data extraction from its web-scraping roots, built by Apify and by creators who earn money from them. An actor is self-contained Docker-based software with well-defined input and output, such as a Google Maps scraper that returns more data than the Google Places API. Clear inputs and outputs make actors easy to call from SDKs, a CLI, workflow tools such as Zapier and Clay, and now MCP.

**Tool discovery is the killer feature**
Apify cannot publish 5,000 tools as an OpenAPI list: the context would be too large, and more tools make results riskier. With MCP tool discovery, the client connects and adds tools as the workflow needs them. Curn notes VS Code and Anthropic's desktop client had just added support. He cites Google Trends data that MCP dominates OpenAPI and Google's A2A, and points to the many MCP registries, including a registry of registries.

**The real blocker: agents cannot buy things**
Even through Zapier's MCP with 5,000 apps, a human must connect each account. Agents cannot find and purchase services themselves, and Curn argues agentic systems will not reach a higher level of intelligence until they can. Three options:
- Agents sign up themselves with email, card, phone and captchas. Impractical, since many services need a real person.
- A central identity and payments provider. Coinbase, Stripe, Mastercard and Visa are working on this, but new payment rails face the marketplace chicken-and-egg problem. He cites PayPal paying about $100 million a month to buy the market, and credit cards in the 1970s.
- A central marketplace of MCP services. One account reaches everything. Developers put their own card and account on the third-party service, set a price per call, and publish. Nested MCP servers let a parent server expose child servers' tools. This scales "even without the target services knowing."

**Demo**
In a recorded demo, the desktop client searches Apify's store, uses a RAG web browser actor to find the AI Engineer World's Fair venue, then adds a Twitter-scraping actor to its context on demand. Apify had also published Browserbase's MCP server on its store with its own token, without Browserbase knowing, and the agent uses it to fill an email form on the conference site.

**Numbers and open questions**
Actors generate over half a million dollars a month, and the ecosystem has about a million monthly visitors. Curn leaves three questions open: will autonomous tool discovery be reliable enough to add value, how agents can trust tools and each other, and whether agent interaction can lead to AGI.

## Why it matters
- It names a concrete gap in agent autonomy: tools are discoverable through MCP, but paying for them still needs a human to set up accounts.
- The three-way comparison (self-signup, new payment rails, central marketplace) is a clean framework for chapters on agent commerce.
- Dynamic tool discovery is presented as the fix for tool-list bloat in context, a design pattern that matters for any large tool catalog.
- Republishing third-party MCP servers without their consent shows both the speed and the trust and governance risks of nested MCP ecosystems.
- Curn's own open questions on reliability and trust give an honest counterweight to the agent-economy vision.

## Metadata
- Video: https://www.youtube.com/watch?v=blW-lSd5CYQ
- Duration: 18:08
- Playlist index: 240
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> [Music] So let me start with a question. How does intelligence emerges in biological systems? Right? Well, it's through neurons, right? When neurons are born, they are just like individual cells. But like over time, they grow their axons and dendrites and establish connections with other cells or other neurons and actually learn how to communicate in order to pursue their own interest basically like to get nutrients and so on. And over time they learn how to how to communicate with each other and with other cells to get nutrients and basically thrive, right? And this collective behavior if you like zoom out and look at like really large number of them uh is something we call intelligence...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/blW-lSd5CYQ.txt]]
- Description cue: Thanks to MCP and all the MCP server directories, agents can now autonomously discover new tools and other agents. This lays down the foundation for the future agentic economy, where businesses...

## Book angles
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://blog.apify.com/author/jancurn>
