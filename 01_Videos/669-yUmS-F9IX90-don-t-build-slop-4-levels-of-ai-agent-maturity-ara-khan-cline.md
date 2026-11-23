---
video_id: yUmS-F9IX90
playlist_index: 669
title: "Don't Build Slop (4 Levels of AI Agent Maturity) - Ara Khan, Cline"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=yUmS-F9IX90"
duration: "18:52"
duration_seconds: 1132
view_count: 9900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/yUmS-F9IX90.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ara Khan of Cline offers four levels of agent maturity to cut through the 'mass psychosis' around agents: use a framework to test if the idea works, build your own agent as a state machine for production, manage parallel agents on a Kanban board, then run them in the cloud. His five build rules: every agent is a while loop with end states; everything you add risks making it worse (the Codex prompt for GPT-5.3 is a third the size of GPT-5's); make the agent testable by other coding agents through a CLI; a human must design the architecture; and frontier APIs lock you in, degrading quality silently if reasoning traces are passed wrong."
---

# Don't Build Slop (4 Levels of AI Agent Maturity) - Ara Khan, Cline

## Summary
Ara Khan works at Cline, where he builds the agent experience by hand. He opens with what he calls a "mass psychosis problem": engineers feel surrounded by robots and cannot decide between running 15 agents at once and reading every line of code. Even the products look the same; he shows three agent UIs from Factory, Codex and Cursor and bets nobody can tell them apart. His answer is to slow down and climb four levels, moving up only as far as the effort is worth.

**Level 1: use a framework**
To find product-market fit for a simple job, such as collecting emails, any agent framework gives you something that works in half an hour. But for production you soon need customization and modularity that frameworks do not give. "I know a lot of people who disagree with me and a lot of those people are wrong."

**Level 2: build it yourself, with five rules**
- Every agent is a state machine: "a while loop with a few conditions" and a few end states. Keep a mental model of which state it is in, from the user task through tool calls to a completion tool.
- Every single thing you add risks making it worse. Large system prompts, edge cases and if-else logic hurt frontier models. In the Codex repo, the GPT-5.3 prompt is a third the size of the GPT-5 prompt. Cline has been rewritten from scratch at least seven times to clear out old junk.
- Make the agent part of a pseudo-RL pipeline. Give it a CLI, an agents.md and CI so other coding agents can build, test and change it end to end in a long-running parallel thread.
- Don't build slop. Even with huge throughput, a human must think through the architecture and the state machine, and at least read the code.
- Frontier labs want to lock you in. Newer models such as Opus 4.6 expect reasoning traces sent back in their exact format. If not, responses still work but quality drops, "and you would have no way of knowing". A router layer is not enough; test each API.

**Level 3: Kanban as the interface**
You are always inference bound: while one agent works for 8 to 10 minutes, you start another, so two or three run in parallel and may change the same code. Isolate their state and manage them on a Kanban board, where you act as an engineering manager and the agents are your ICs. Tasks move from in progress to review when they need you. He tweeted this on March 26 and notes that a major coding agent shipped the same idea hours before his talk.

**Level 4: ship to the cloud**
For a company of 8,000 people, local installs and machine setup are "so much junk". Cloud agents get a separate machine each, with no local dependencies, so they run long and in parallel. He sends tasks from his phone, such as building a VS Code extension and clicking through its settings for QA, that run 15 to 60 minutes and then become a PR. A shared cloud setup also lets many people use and change the same configuration. His predicted end state: most of the agent experience on Kanban, most of the compute in the cloud.

## Why it matters
- The rule that every addition risks making the agent worse, backed by the shrinking Codex prompt from GPT-5 to GPT-5.3, is a concrete data point against bloated system prompts.
- Warns about a silent failure with frontier APIs: reasoning traces passed in the wrong format degrade quality with no error, which matters for multi-provider designs.
- Making the agent buildable and testable by other agents through a CLI is a practical pattern for using agents to improve agents.
- The 'inference bound' argument explains why parallel agents and a Kanban control surface follow naturally from 8 to 10 minute agent runs.
- Gives a simple staged path (framework, custom state machine, Kanban, cloud) that a book can use to place other agent talks.

## Metadata
- Video: https://www.youtube.com/watch?v=yUmS-F9IX90
- Duration: 18:52
- Playlist index: 669
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> All right. Hi there. Um very nice to see you guys. Um it's it's like it's so interesting to see like it's been such a long day and you guys still showed up and uh I'm always very flattered when like I'm trying to present something and like people are there. It just uh I I if it makes you feel like you what what you do matters. So, today the topic that I want to talk about is like don't build slop, four levels of AI agent maturity. And what I'm trying to do here is that I want to I want to talk about something that like a lot of people brought this up to me and there's like a mass psychosis problem. So, basically it's something like it's like every person feels like um there's like these...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/yUmS-F9IX90.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
