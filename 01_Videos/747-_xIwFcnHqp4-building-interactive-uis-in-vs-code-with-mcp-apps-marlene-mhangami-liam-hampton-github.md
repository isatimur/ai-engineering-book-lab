---
video_id: _xIwFcnHqp4
playlist_index: 747
title: "Building Interactive UIs in VS Code with MCP Apps — Marlene Mhangami & Liam Hampton, GitHub"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_xIwFcnHqp4"
duration: "16:06"
duration_seconds: 966
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_xIwFcnHqp4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-06-09T21:18:33+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "GitHub's Marlene Mhangami and Liam Hampton demo MCP apps, letting server tools return sandboxed-iframe UI rendered by the host, and build a live Go-profiling flame-graph app inside VS Code chat."
---

# Building Interactive UIs in VS Code with MCP Apps — Marlene Mhangami & Liam Hampton, GitHub

## Summary
Marlene Mhangami and Liam Hampton (GitHub/Microsoft, VS Code and Copilot developer advocacy) explain that early MCP servers could only return text, which they say is why so many project READMEs lean on ASCII art and emoji-heavy formatting as a workaround for the lack of rich output. MCP apps fix this by letting a server tool return a UI resource reference alongside its result: the host (not the MCP client) fetches the referenced HTML and renders it inside a sandboxed iframe in the chat, with the app able to call back to the server for live data updates — illustrated by an Excalidraw MCP server producing a diagram the user can drag and edit instead of static ASCII art. They frame the main use cases as data exploration (clicking through charts instead of typing follow-up questions) and in-chat e-commerce checkout, citing Shopify's work on MCP apps to preserve brand-consistent UI and Excalidraw and Figma as other adopters. Hampton then live-builds an MCP app using an Anthropic-provided "skill" from the Model Context Protocol repo, run through GitHub Copilot CLI, to profile a Go program (bubble sort and Fibonacci functions) via Go's pprof over a 5-second window; a TypeScript MCP server bundles, runs, and profiles the code, then a React app renders the resulting flame graph directly inside the VS Code chat iframe. He explains the iframe sandbox is deliberate isolation — "like putting a hamster in a cage" — so the rendered app cannot touch VS Code settings, other APIs, or anything external.

## Why it matters
- Documents a concrete architectural pattern (tool result + UI resource reference, host renders sandboxed iframe, app calls back to server) for adding interactive UI to agent chat interfaces via MCP — directly usable for a chapter on agent/tool interface design.
- Names real adopters (Shopify for in-chat checkout, Excalidraw for diagrams, Figma for UI components) building production MCP apps, giving the pattern more than theoretical weight.
- The sandboxed-iframe security rationale is a small but specific example of the isolation-by-design theme (agent UI surfaces need containment) that recurs across MCP-security talks in this collection.

## Metadata
- Video: https://www.youtube.com/watch?v=_xIwFcnHqp4
- Duration: 16:06
- Playlist index: 747
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Hi everyone. Uh we'll introduce ourselves. My name is Madelaine and I'm a senior developer advocate at Microsoft and GitHub. >> And likewise, I'm Liam Hampton and I also am working at Microsoft and GitHub on the developer tools advocacy team for Visual Studio Code and GitHub Copilot. >> Yes. I do similar things but probably Liam is more in the VS Code side as well. Um so just to get started, a bit of an agenda of what we're going to cover today in this session. We're going to talk about what MCP is and then we're going to talk about why we need MCP apps and what they are. And then Liam is going to do some live demos of how to use MCP apps, how to build them and use them in VS Code. So just...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_xIwFcnHqp4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
