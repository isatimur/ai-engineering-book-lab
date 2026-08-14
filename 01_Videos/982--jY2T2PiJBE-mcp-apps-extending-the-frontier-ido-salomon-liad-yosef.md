---
video_id: -jY2T2PiJBE
playlist_index: 982
title: "MCP Apps: Extending the Frontier — Ido Salomon & Liad Yosef"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-jY2T2PiJBE"
duration: "18:38"
duration_seconds: 1118
view_count: 2900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-jY2T2PiJBE.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-08-04T17:21:57+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ido Salomon and Liad Yosef explain MCP apps, the Anthropic/OpenAI-backed MCP extension letting servers return interactive HTML UI, with adopters including Shopify, Postman, Goose, and Block."
---

# MCP Apps: Extending the Frontier — Ido Salomon & Liad Yosef

## Summary
Ido Salomon (creator of MCP-UI, launched May 2025) and Liad Yosef (co-founder of Aura, a research lab for the "agentic web") describe MCP apps, an official extension to the Model Context Protocol built with Anthropic and OpenAI on top of MCP-UI: instead of returning plain text, an MCP server returns a resource containing HTML, which a supporting host (Claude, ChatGPT, VS Code, Cursor, GitHub Copilot) renders as a sandboxed, branded, interactive widget, with a callback protocol so the app can ask the host to run a tool or prompt when the user interacts with it — demoed live with a PostHog funnel widget rendered inside Claude. They cite early MCP-UI adopters (11Labs, Shopify, Postman, Goose, from about a year ago) and note that Block's newly released agentic-commerce product is built on MCP apps via Goose; a tri-weekly open working group with Anthropic, OpenAI, and partners governs the spec at the public x-apps GitHub repository. Their broader claim is that this turns UIs into composable "atoms" a personal assistant can assemble — e.g., planning an anniversary across Google Calendar, Amazon, and Booking.com inside one chat instead of 20 browser tabs — with the host, not the individual app, controlling the user's journey for auditability. Upcoming spec work includes persistent/reusable views for heavy renders (e.g. Autodesk's 3D apps), "view/app tools" that let the host fill out an app's UI on the user's behalf (paralleling Google's Web MCP), and interoperability with generative/declarative UI standards like A2UI, following a guide they just published.

## Why it matters
- Gives a concrete, named architecture for how agent hosts render interactive third-party UI over MCP (resource + HTML + callback protocol), with real production adopters (Shopify, Postman, Block, 11Labs) — useful for a chapter on tool/agent UI standards.
- States an explicit "agentic web" thesis — UIs decomposed into composable atoms assembled by a personal assistant, with the host rather than the individual app controlling the user's journey — a specific architectural claim worth citing or challenging.
- Roadmap items (persistent views, app/view tools, A2UI interoperability) mark where the standard is still unsettled, useful evidence for tracking how MCP-based tooling is evolving.

## Metadata
- Video: https://www.youtube.com/watch?v=-jY2T2PiJBE
- Duration: 18:38
- Playlist index: 982
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] >> Hi. So, hi everyone. We built this talk yesterday, so it might be out of date. I'm Ido Sadan, I am the creator of MCPY and co-creator and maintainer of MCP apps in the MCP steering committee. I also created Adam Craft if you were in the talk yesterday. >> I'm the Adi. I work with Ido on MCPY. I'm also the co-creator and maintainer of the MCP apps spec and recently co-founded Aura, which is a research lab for the agentic web. And we're going to talk a little bit more about it later. >> So, MCP apps are all around us. You might not even realize it, but all the fancy apps you have today in ChatGPT and VS Code and Slack are actually all based on MCP and the MCP app spec. >> And if we...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-jY2T2PiJBE.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
