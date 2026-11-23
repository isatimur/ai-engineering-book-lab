---
video_id: ghJmWQCIHRM
playlist_index: 762
title: "WebMCP: How every website talks to agents — Tara Agyemang, Google Chrome"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ghJmWQCIHRM"
duration: "21:34"
duration_seconds: 1294
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ghJmWQCIHRM.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
  - "MCP & Tooling"
ingested_at: 2026-06-20T09:01:48+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tara Agyemang, developer relations engineer on Google Chrome, introduces WebMCP, a proposed web standard that lets a site expose its capabilities as structured tools for in-browser AI agents, instead of making agents parse the DOM, read the accessibility tree, screenshot and click by coordinates. It has a declarative API (attributes on HTML forms, with an auto-generated JSON schema) and an imperative registerTool API for multi-step flows. Demos: a maze game playable only through tools, and a concert site where Gemini buys two VIP tickets in three tool calls. Her advice: fix accessibility and performance first. WebMCP is an early preview behind a flag in Chrome 146 and up."
---

# WebMCP: How every website talks to agents — Tara Agyemang, Google Chrome

## Summary
Tara Agyemang is a developer relations engineer on the Google Chrome team. Her talk introduces WebMCP, the Web Model Context Protocol, a proposed web standard. The thesis: the web was built for human eyes and hands, agents now use it on our behalf, and they should not have to screen-scrape to do simple things.

**The problem with today's browser agents**
On her concert-ticket demo site, a prompt to buy two festival tickets makes an agent parse the whole DOM, read the accessibility tree, take a screenshot, measure where to click, and click. The process is long, brittle and token-heavy, and a late-loading ad can push content down so the click misses.

**Foundations first**
Before WebMCP, she says, improve web foundations. A site that is accessible to everyone is accessible to agents by default. Semantic HTML, solid accessibility, fast pages and Core Web Vitals, and clean user flows get you halfway to an agent-ready site. Only then does WebMCP make sense.

**What WebMCP is**
WebMCP lets a site define its capabilities as structured tools, a menu the agent reads instead of guessing. She contrasts it with MCP: MCP connects agents to server-side applications you host, reachable anywhere; WebMCP implements only the tools part of MCP, runs client-side, and needs the browser window open. Her analogy: it is inspired by MCP the way JavaScript was inspired by Java. Use cases include flight booking, product filtering, complex medical or financial forms, and hidden fixes on a page. Users can browse, hand control to the agent, and take it back at any time.

**Two APIs**
- Declarative: add a tool name and description to a standard HTML form. The browser generates a JSON schema from the form fields. Extra attributes exist, such as an agent-invoked Boolean that tells you whether an agent or a human filled the form.
- Imperative: call registerTool with a name, a hand-written schema, a descriptive description so the agent knows when to call it, and an execute block of normal JavaScript that returns a result to the agent. She says this one is used most, because real flows are multi-step.

**Demos**
A maze game built by Chrome DevRel can only be played through tools. The Model Context Tool Inspector extension lists tools in scope; one start-game tool becomes a set of move, look, and item tools on the next page. Vague prompts made the agent backtrack; telling it the exit is bottom right made it efficient. On the concert site, Gemini 3.1 chained search concerts, open concert page and purchase ticket to buy two VIP tickets. Each step updated the UI so the user sees what happens, and she would leave the real payment step to the user.

**Status**
WebMCP is an early, experimental preview whose API has changed week to week. It is enabled in Chrome 146 and up; she recommends Chrome Canary with the testing flag, the inspector extension, the early preview program docs, and a GitHub repo with six or seven demos and an eval CLI for testing your own tools.

## Why it matters
- Gives a clear contrast between screen-scraping browser agents (DOM, accessibility tree, screenshots, coordinates) and site-declared tools, with the cost and brittleness spelled out.
- Draws a crisp line between MCP (server-side, always reachable) and WebMCP (client-side, tools only, browser open), useful for any chapter on agent tool surfaces.
- The declarative versus imperative split gives site owners a cheap entry point (annotate forms) and a path for complex multi-step flows.
- States a design rule for agent actions in shared UIs: keep the UI in sync with tool calls and leave payment confirmation to the human.
- Reinforces that accessibility work is agent-readiness work, so existing web best practice comes before any new protocol.

## Metadata
- Video: https://www.youtube.com/watch?v=ghJmWQCIHRM
- Duration: 21:34
- Playlist index: 762
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hello, hello. Hello, can you hear me okay? Okay, cool. Let's get started. So, we are going to be talking a little bit about Web MCP. Has anybody, just out of curiosity, has anybody already played around with Web MCP? Only a few people. Okay, great. Those few people, you have a bit of a head start, but for everyone else, we'll be going into a bit more of the background, how it works, what it does. So, my name is Tara. I am part of the Google Chrome team. Um I'm a developer relations engineer, and I'm here with a few of my colleagues from Google Chrome, alongside the DeepMind team, too. So, we'll be really interested to talking to you afterwards around the DeepMind booth, if you like have...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ghJmWQCIHRM.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uk.linkedin.com/in/taraojo>
