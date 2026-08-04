---
video_id: "zlZz0mDF2eg"
playlist_index: 200
title: "Machines of Buying and Selling Grace - Adam Behrens, New Generation"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zlZz0mDF2eg"
duration: "19:37"
duration_seconds: 1177
view_count: 541
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/zlZz0mDF2eg.txt"
themes:
  - "MCP & Tooling"
ingested_at: "2026-04-24T11:43:39+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Adam Behrens outlines four challenges for agentic commerce: checkout authorization, intent-to-SKU mapping, inventory discovery, and preference representation, illustrated via Samsung's MCP rollout."
---
# Machines of Buying and Selling Grace - Adam Behrens, New Generation

## Summary
Adam Behrens (New Generation) defines a store as "a location for and a protocol that facilitates transactions" and argues AI digitizes the participants (merchant agents, consumer agents) the way e-commerce digitized merchandise and distribution. He walks through four concrete technical challenges for agentic commerce: checkout when software clicks "buy" (contrasting today's virtual-card/Stripe-SDK pattern with Visa's delegated-authentication approach that lets an agent use the user's actual card), mapping fuzzy conversational buyer intent to specific SKUs (currently forced via product-detail-page URLs, though he notes AI-channel traffic already shows much higher conversion and dollar value), discovering inventory across thousands of merchants (rejecting both Google product feeds and web scraping in favor of a proposed unified product-data API, "like Plaid but for products"), and representing two-sided buyer/seller preferences given built-in incentives to misreport, which he likens to how financial markets rely on third-party market makers, drawing on his own experience at Bridgewater. As a working example, he describes New Generation's engagement with Samsung — a 150-year-old company with 10 separate product verticals — building a unified API/MCP server, wiring it to brand and design-system data, an experimental AI subdomain for generative interfaces, and agentic transaction handling. In Q&A he floats stablecoins as the conceptually native agentic-payment rail (with credit cards as the practical bridge for now) and expects merchant monetization to resemble affiliate revenue rather than advertising.

## Why it matters
- Grounds "agentic commerce" in named technical problems — checkout authorization, intent-to-SKU mapping, cross-merchant inventory discovery, preference representation — rather than hype, backed by a concrete Fortune 500 (Samsung) implementation example.
- The Visa delegated-authentication vs. virtual-card contrast and the "Plaid for product data" framing are specific, citable patterns for a chapter on agents transacting on behalf of users, plus a market-design angle on buyer/seller preference asymmetry borrowed from finance.

## Metadata
- Video: https://www.youtube.com/watch?v=zlZz0mDF2eg
- Duration: 19:37
- Playlist index: 200
- Transcript status: `auto_en_orig`

## Theme hooks
- [[MCP & Tooling]]

## Transcript excerpt
> [Music] So, as a philosopher turned engineer, I have, for better or for worse, been obsessed with two questions my whole life. Uh, what is a thing and why does it exist? So, we're here talking about AI and the Fortune 500 and the future of AI commerce. So, let's ask a hopefully straightforward question. What is a store? A 100 years ago, a store looked like this. Something we don't really recognize today. Inventory was in the back of a shop. You had to talk to a clerk, tell them what you wanted. They went and then fetched it and brought it to you. It wasn't until the 1950s and60s with information systems that we were able to actually scale the concept of a store and you saw big box retailers...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zlZz0mDF2eg.txt]]
- Description cue: How to go beyond browser automation to truly agentic commerce, where AI can buy, sell and negotiate on behalf of users and merchants.

## Book angles
- Could support a chapter/section on **MCP & Tooling**.
