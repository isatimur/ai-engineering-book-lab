---
video_id: "kWOQS3XPZ10"
playlist_index: 98
title: "Developing Taste in Coding Agents: Applied Meta Neuro-Symbolic RL — Ahmad Awais, CommandCode"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kWOQS3XPZ10"
duration: "20:52"
duration_seconds: 1252
view_count: 1055
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/kWOQS3XPZ10.txt"
themes:
  - "Coding Agents"
ingested_at: "2026-04-24T11:22:48+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ahmad Awais (creator of Command Code, CEO and founder of Langbase) launches Command Code, a coding agent that learns each developer's 'taste' by watching how they edit AI-generated code. His thesis: good code is not just correct code but an 'invisible architecture of choices', and rules files like CLAUDE.md or AGENTS.md can never capture it. A side-by-side demo against Claude Code builds a date CLI that matches his stack (TypeScript, tsup, pnpm, Commander, Vitest, version 0.0.1) without prompting. He claims Langbase now merges about 10x more code to main, and he proposes shareable taste packages installed with npx."
---
# Developing Taste in Coding Agents: Applied Meta Neuro-Symbolic RL — Ahmad Awais, CommandCode

## Summary
Ahmad Awais is the creator of Command Code and the CEO and founder of Langbase. In this short launch talk he presents Command Code as "a coding agent with taste". His thesis: when programmers talk about good code, they do not mean correct code. They mean an "invisible architecture of choices" built over a career, and a coding agent should learn those choices from the developer instead of from rules the developer writes by hand.

**The demo**
He gives Claude Code and Command Code the same prompt: make a CLI that prints the date in ISO format. Claude Code returns a fast, plain script with a console log and version 1.0.0. Command Code, which also runs on Claude underneath, uses TypeScript, tsup, pnpm, Commander, a lowercase `-v` version flag, a separate `commands` directory, Vitest and version 0.0.1. These are all his preferences, and he did not state any of them in the prompt. The learned preferences sit in a transparent "taste" file inside a project folder, and he says he wrote none of it.

**Why rules files are not enough**
His view is that AI is "lazy by default" and "sloppy": it tries to be correct as fast as possible. Developers try to fix this with CLAUDE.md or AGENTS.md rules files, but "rules are never enough". He compares this to a justice system that still needs judges and juries. He also says he cannot both write code and teach the agent every rule. The agent should learn which rule applies in which project, with a confidence level when rules conflict.

**The architecture, as described**
- A "meta neuro-symbolic" reasoning space trained with reinforcement learning. He calls it more deterministic and explainable than a transformer, "like a regex" of your choices.
- A KL-divergence loop that learns from both explicit and implicit feedback, mainly how you edit AI code.
- "Reflective context engineering" on the LLM side that notices drift. His example: the agent noticed he switched from Meow to Commander for CLIs and updated his taste without being told.
- The LLM stays swappable. Taste sits next to whatever model you prefer.

**Background and scale**
He traces the work to 2020 GPT-3 access and an early next-line code suggester. Langbase raised $5 million, and he cites 700 terabytes and 1.2 billion agent runs a month on its primitives. He also cites 150,000 agents vibe-coded in five months with its earlier agent builder, Command New. A paper is promised.

**Shareable taste**
He wants an ecosystem of taste packages: borrow a respected library author's React taste, or a design engineer's margins and paddings for front-end work, installed with something like `npx taste`. Internally he claims Langbase merges about 10x more code to main and spends much less time on review.

## Why it matters
- Frames the gap between correct code and accepted code as learned developer preference, which is a useful lens on why agent output needs so much steering.
- Offers a concrete alternative to hand-written rules files: infer preferences from the edits a developer makes to agent output.
- The side-by-side CLI demo is a compact, reusable example of the specific defaults a generic agent gets wrong (package manager, build tool, version numbering, folder layout).
- The idea of portable, shareable taste packages points to team- and library-level conventions as distributable artifacts.
- Treat the claims with care: this is a product launch, the architecture is only sketched, and the 10x figure is internal and unbenchmarked.

## Metadata
- Video: https://www.youtube.com/watch?v=kWOQS3XPZ10
- Duration: 20:52
- Playlist index: 98
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]

## Transcript excerpt
> Well, hello there. Today I am really, really excited to both launch and share with you what we have been working on for maybe over an year now. It's called Command Code, a coding agent with taste. So, who am I? Um, I am Ahmed, creator of Command Code, CEO and founder of Langbase. Um, I've been around this blog for I don't know like 20 years building one thing after another. I've written hundreds of open source packages with millions of downloads. Maybe you like my shades of purple code theme. I love the color purple and I I've I'm I'm an engineer at the end of the day. I write a lot of code and I've been building in the LLM space for about five years now. Um and I think the one of the first...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kWOQS3XPZ10.txt]]
- Description cue: Your coding agent writes code like an LLM bot. CommandCode writes code like me.

## Book angles
- Could support a chapter/section on **Coding Agents**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://AhmadAwais.com/about>
