---
video_id: "TqC1qOfiVcQ"
playlist_index: 45
title: "Claude Agent SDK [Full Workshop] — Thariq Shihipar, Anthropic"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TqC1qOfiVcQ"
duration: "1:52:25"
duration_seconds: 6745
view_count: 103354
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/TqC1qOfiVcQ.txt"
themes:
  - "RAG & Retrieval"
  - "Coding Agents"
ingested_at: "2026-04-24T10:51:26+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Thariq Shihipar of Anthropic explains why the Claude Agent SDK is built on top of Claude Code: Anthropic kept rebuilding the same harness parts, and people used Claude Code for non-coding work. His core opinion is that bash and the file system are the most powerful agent tools. He frames the agent loop as gather context, take action, verify work; contrasts tools, bash and code generation; and argues that agentic search design, deterministic verification, subagents and reversible state are the real design problems. A live Pokemon agent shows prototyping in Claude Code first, then a roughly 50-line SDK wrapper."
---
# Claude Agent SDK [Full Workshop] — Thariq Shihipar, Anthropic

## Summary
Thariq Shihipar of Anthropic runs a two-hour, Q&A-heavy workshop on the Claude Agent SDK. He calls agent design "an art or intuition" and says the main meta-skill is to read agent transcripts "over and over again."

**Why build on Claude Code**
AI features moved from single LLM calls, to structured workflows, to agents that build their own context and choose their own trajectories. Anthropic kept rebuilding the same harness parts: tools, prompts, the file system, skills, subagents, compaction, hooks, memory. Engineers, then finance, data science and marketing staff used Claude Code for non-coding tasks. So the SDK packages that harness, with lessons on tool errors and compaction already built in. He calls it opinionated and compares it to React versus jQuery: more setup, more power.

**Bash is all you need**
His central claim: bash is what makes Claude Code good, and it was "the first code mode." Bash lets the agent store tool results in files, write and run scripts, and compose grep, tail, jq, FFmpeg or LibreOffice. An email agent asked about ride-share spend can save search results, grep prices, add them and check its work, instead of reading 100 emails in context. He compares three action types:
- Tools: structured and reliable, but costly in context and not composable. Keep them for atomic or irreversible actions such as writing a file or sending an email.
- Bash: composable and low in context, but it needs discovery. Give scripts a `--help` flag.
- Code generation: the most flexible, the slowest, and API design becomes the key work.

**The agent loop**
Gather context, take action, verify. Context gathering is "really creative." For a spreadsheet agent he suggests range strings like B3:B5, SQL over a CSV, or XML queries, because the goal is to make the problem "as in-distribution as possible." Verification should be rule-based first. Claude Code throws an error when the agent writes a file it has not read. Verify everywhere you can, not only at the end. Tasks with strong verification make the best agent candidates. Reversibility is a second test: code has git, while computer use (ordering a Pepsi instead of a Coke) compounds errors.

**Context, subagents, security**
Subagents protect the main agent's context. Use them for search, for parallel reads of sheets, or for an adversarial checker in a fresh context. He rarely compacts: he clears context often, since state lives in the files and the git diff. Security is a "Swiss cheese defense": model alignment, harness permissions with an AST parser on bash, and sandboxing of network and file system.

**Live prototyping**
He has Claude Code generate a TypeScript library for the Poke API, adds a CLAUDE.md, and compares it with a tools-only chat on the Messages API. With Smogon text data it builds a Venusaur team by grepping and writing analysis scripts. The SDK agent file is "like 50 lines." Advice: prototype in Claude Code until you have conviction, then ship locally or in a per-user sandbox. He also suggests a sandboxed dev server for adaptive UIs, rewriting agent code every six months, planning monetization up front, and using hooks to force script use when the model answers from memory.

## Why it matters
- Gives a clear rule set for choosing tools, bash or code generation for each agent action, with reasons tied to context cost, composability and reversibility.
- The gather-act-verify loop and "can you verify its work?" test give a simple way to judge which problems suit agents.
- Concrete agentic-search patterns (SQL over CSV, range strings, save tool output to files and return the path) show context design as the real work.
- The prototype-in-Claude-Code-then-wrap workflow and the 50-line agent file show how thin a production harness can be on this SDK.
- His habit of rarely compacting and rewriting agent code every six months is practical guidance on context and on model churn.

## Metadata
- Video: https://www.youtube.com/watch?v=TqC1qOfiVcQ
- Duration: 1:52:25
- Playlist index: 45
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Coding Agents]]

## Transcript excerpt
> [music] >> Okay, yeah, thanks for joining me. I I'm still on West Coast time, so it feels like I'm doing this at like 7:00 a.m. Uh so, yeah, but um glad to talk to you about the Claude Agent SDK. So, um yeah, I I think like this is going to be like a rough agenda of what we're going to talk about. We're going to talk about like what is the Claude Agent SDK, why use it? There's so many other agent frameworks, what is an agent, what is an agent framework? Um How do you design an agent uh using the Agent SDK or or just in general? Um and then I'm going to do some like live coding Claude is going to do some live coding on prototyping an agent. Um and uh got some starter code, but uh yeah, I I...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TqC1qOfiVcQ.txt]]
- Description cue: Learn to use Anthropic's Claude Agent SDK (formerly Claude Code SDK) for AI-powered development workflows!

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Coding Agents**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://platform.claude.com/docs/en/agent-sdk/overview>
