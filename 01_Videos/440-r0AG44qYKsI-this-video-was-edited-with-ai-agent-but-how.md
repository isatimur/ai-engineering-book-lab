---
video_id: "r0AG44qYKsI"
playlist_index: 440
title: "This video was edited with AI agent. But how?"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=r0AG44qYKsI"
duration: "5:00"
duration_seconds: 300
view_count: 4153
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/r0AG44qYKsI.txt"
themes:
  - "Coding Agents"
  - "MCP & Tooling"
ingested_at: "2026-04-24T12:18:28+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A five-minute lightning talk, which the title says was edited with the agent, presents an open-source video editing agent built by a personalized learning platform with Diffusion Studio. The thesis: code is the best way to express computer actions, so the LLM writes its own actions as JavaScript or TypeScript against Diffusion Studio's composition library instead of JSON tool calls. The agent drives a browser-based editing UI built for agents, uses three tools (video editing, doc search with RAG, and visual feedback on frames sampled at one per second, likened to a GAN discriminator), ships a robots.txt-style file for agents, and scales through remote GPU browser sessions."
---
# This video was edited with AI agent. But how?

## Summary
This five-minute lightning talk opens with short, jokey sample clips, then the speaker presents what the talk calls the world's first open-source video editing agent. It is a collaboration between Diffusion Studio and a personalized learning platform that needed to edit videos automatically. The thesis: "code is the best possible way to express actions performed by a computer", so the agent should write its edits as code.

**Why code, not JSON**
The usual command-line video tool was too limited. Remotion was nice but its server-side rendering was unreliable. Diffusion Studio's core library won because it needs no separate rendering backend and does complex compositions through a JavaScript and TypeScript programmatic interface. An LLM can generate that code and run it. The speaker adds that several research papers show LLM tool calling in code works much better than in JSON.

**Architecture**
- The agent opens a browser session with a browser automation tool and connects to an operator UI, a video editing web app designed for AI agents. It renders video in the browser with the browser's codec API.
- Helper functions move files between Python and the browser over the Chromium DevTools protocol.
- Three tools: a video editing tool that writes and runs code from the user prompt; a doc search tool that uses RAG for extra context; and a visual feedback tool.
- After each step the composition is sampled at one frame per second and sent to the visual feedback tool. The speaker compares the pair to the generator and discriminator in a GAN. When feedback gives a green light, the agent renders the final video.

**Agent-facing docs and scale**
The team ships a text file that the speaker calls robots.txt for agents. With template prompts, it takes users far. Users can bring their own browser, or the agent can connect to a remote browser session over WebSocket. Each agent gets its own GPU-accelerated session behind a load balancer. The first version is in Python; a TypeScript version is underway.

## Why it matters
- A compact example of the code-as-action pattern: the agent writes compositions in a real library instead of filling JSON tool schemas.
- The visual feedback loop, sampling rendered frames and gating the final render on a critic, shows how to verify non-text output inside an agent.
- Designing a UI specifically for agents, plus a robots.txt-style docs file, treats the agent as a first-class user of the tool.

## Metadata
- Video: https://www.youtube.com/watch?v=r0AG44qYKsI
- Duration: 5:00
- Playlist index: 440
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[MCP & Tooling]]

## Transcript excerpt
> [Music] today we're tackling a paper that's basically legendary at least in the world of natural language processing NLP for those in the know right attention is all you need it's not just a catchy title definitely not o cam a general purpose functional programming language that is also an imperative language and also an objectoriented language it is what hascal which is could be hey everyone my name is Mam and I'm excited to talk about the va's first open-source video editing agent backstory is that we needed some automatic tool to edit videos for res skill. a platform for personalized learning while doing so we quickly realized limitations of FFM p and started looking for more intuitive...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/r0AG44qYKsI.txt]]
- Description cue: The talk is about world’s first open-source video editing agent!

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/diffusionstudio/agent>
