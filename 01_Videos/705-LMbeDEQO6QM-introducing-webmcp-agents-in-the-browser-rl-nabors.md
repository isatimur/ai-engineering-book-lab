---
video_id: LMbeDEQO6QM
playlist_index: 705
title: "Introducing WebMCP: Agents in the Browser — RL Nabors"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LMbeDEQO6QM"
duration: "23:08"
duration_seconds: 1388
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/LMbeDEQO6QM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:49+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "RL Nabors (Rachel Lee Nabors), principal DX engineer at a-rise and former Mozilla/W3C/React team contributor, introduces WebMCP — a browser-native API proposal that lets agents call JavaScript functions directly on a page instead of scraping screenshots or chewing through DOM XML. She builds this from her own comics archive site, demonstrating MCP tools over HTTP, MCP apps (self-contained HTML/CSS/JS bundles returned as tool results for rich in-agent UI), and WebMCP's declarative and imperative registration APIs. Side argument: MCP resources are completely unimplemented in current clients — a gap she considers the most important missing piece for documentation and corpus-scale context loading."
---

# Introducing WebMCP: Agents in the Browser — RL Nabors

## Summary

RL Nabors (Rachel Lee Nabors) has worked on web standards with Mozilla and the W3C, was a PM on Edge, and contributed to React (react.dev, react-native.dev). She runs a newsletter called The Agentic Web and recently joined a-rise as a principal developer experience engineer. The talk is structured around her web comics archive site as a practical example — she wanted to make the site available to human browsers, agents in chat interfaces, and browser-native agents all at once.

**STDIO vs HTTP transports**

MCP servers communicate with agents via transports. STDIO (runs as a local process, spawned by the client) is the most common today — but for end users, configuration is a wall of JSON with command-line inputs. HTTP-based MCP servers run as web services listening on an endpoint, work with serverless deployments, and can be configured by simply entering a URL in the agent client. Nabors strongly recommends HTTP for anything user-facing.

**MCP apps: interactive UIs in agent responses**

MCP tools normally return structured data (JSON, text, markdown). But a tool can also return an MCP app — a self-contained single HTML file (HTML + CSS + JS bundled, all assets base64-encoded) that renders as an interactive component inline in the agent UI. Nabors's `get_page` tool returns a full comic reader: she can navigate pages, read transcripts, see comments — everything the website can do — directly within Claude's chat interface.

Key constraints: MCP apps are sandboxed iframes with no local storage, no external network access without explicit CSP headers, and a "mother may I" pattern for links (must call a host permission function). Fonts and CDN assets need to be listed in the content security policy. Tools called from within an MCP app should be tagged `visibility: app` to prevent the model from trying to interpret the JSON as text output.

**The MCP resources gap**

Nabors's most emphatic point: MCP resources — the part of the spec designed for loading corpus-scale data (documentation, transcripts, all 533 comics) into an agent's context — exist in the spec but are not implemented in any current agent client she could find. She would prefer to serve her 533 comics as resources for meta-analysis rather than having an agent call `get_transcript` 533 times via tools. Her call to action: agent harness builders should implement even a bare-bones resource loading mechanism.

**WebMCP: agents in the browser, natively**

Current in-browser agents navigate by taking screenshots (burns vision model tokens) or parsing DOM XML (expensive and fragile). WebMCP is a browser API proposal where pages expose their JavaScript functions directly to browser-native agents via `navigator.modelContext.registerTool()`. An agent visiting the page can call these registered functions — navigate forward/backward, submit forms, trigger workflows — without needing to see the visual layout.

WebMCP comes in two flavors:
- **Declarative**: Add `tool-name` and `tool-description` attributes to existing HTML forms. Immediately exposes the form as an agent tool.
- **Imperative**: Call `navigator.modelContext.registerTool(name, description, schema, callback)` from JavaScript. For API calls, data transformations, arbitrary workflows.

Nabors notes WebMCP is "to MCP as JavaScript is to Java" — inspired by, not a strict spec implementation. Standards discussions are ongoing; the current reference implementation came from an Amazon engineer solving auth bypass problems.

**The broader argument: the browser is an infinite canvas**

Nabors's framing goes back to her 2006 comics days: the browser is not just a document reader, it's an infinite canvas (video, audio, animation, WASM, Canvas — all APIs already exist). The same is true for agentic experiences. Chat interfaces are the CLI of the agentic web — functional but not the end state. Rich inline experiences via MCP apps, and direct tool access via WebMCP, are the path toward agentic UX that doesn't require the user to know exactly what to ask.

## Why it matters
- MCP apps (HTML/CSS/JS tool results) are the current best mechanism for rich UI in agent responses — the design pattern and constraints are production-relevant now.
- The MCP resources gap is an actionable issue: any team building agent harnesses or tooling could make a significant quality-of-life improvement by implementing even basic resource loading.
- WebMCP's `navigator.modelContext.registerTool()` API, if adopted, would make every JavaScript-powered website natively navigable by agents without screenshot/DOM-parsing overhead.

## Metadata
- Video: https://www.youtube.com/watch?v=LMbeDEQO6QM
- Duration: 23:08
- Playlist index: 705
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> And even though I know some people are still coming in, I've also been informed to start directly on time. So much apologies to anyone who was hustling up here from one of the talks downstairs. You should have known this was the best track and hung out here from hour zero, but uh by all means come in, have fun. Hi there. I am Rachel Lee, Rachel Lee Neighbors, Neighbors like Nearest Neighbors, but not spelled that way. I have worked on the standards that powers today's web today's web with Mozilla on Firefox DevTools, the W3C on web standards like the Web Animations API. I've even been a PM on Microsoft's Edge browser, and you may know me from my pandemic babies on the React team,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LMbeDEQO6QM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
