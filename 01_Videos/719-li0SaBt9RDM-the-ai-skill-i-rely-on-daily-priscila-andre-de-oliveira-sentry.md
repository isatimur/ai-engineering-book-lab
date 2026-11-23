---
video_id: li0SaBt9RDM
playlist_index: 719
title: "The AI Skill I Rely On Daily — Priscila Andre de Oliveira, Sentry"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=li0SaBt9RDM"
duration: "17:05"
duration_seconds: 1025
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/li0SaBt9RDM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:09:54+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Priscila Andre de Oliveira, senior software engineer at Sentry, says she has only prompted, not coded, since December 2025, yet argues the biggest AI unlock in a large codebase is comprehension, not generation. She had Claude classify 116 of her sessions: 67% were comprehension and only 2% code generation. So she wrote a local skill, 'catch me up', that structures questions into six modes (architecture, convention, feature trace, syntax, testing, history) and answers with visual tables. She adds an 'understand the research' step before plan and implement, so engineers can steer agents and avoid shipping slop."
---

# The AI Skill I Rely On Daily — Priscila Andre de Oliveira, Sentry

## Summary
Priscila Andre de Oliveira is a senior software engineer at Sentry, a maintainer of the Verdaccio open-source npm registry, and a co-organiser of the Vienna JS meetup. She calls herself an "agent manager" now: since December 2025 she has not written code, only prompts, and her recent Sentry PRs (bug fixes, features, refactors, cross-repo work) were made with Claude. Her thesis is that in a large, moving codebase the main value of AI is understanding the code, not writing it. This was a sponsored talk.

**The codebase**
Sentry was founded in 2010 and has 15+ years of code, around 400 employees, 100k organisations that depend on it, and about 100 PRs merged a day. Components and lint rules change all the time; after a vacation her PRs can be full of conflicts. Sentry is going all in on AI, with hackathon tools such as Abacus (tracks internal AI usage), Warden (a PR code-review agent) and Junior (a Slack bot that reads a bug thread and opens a PR). But quality still matters: the team spent a three-month "quality quarter" removing TypeScript `any` types, stale to-dos and unused feature flags.

**What her usage data showed**
AI made her faster, but not in the way people expect. Tracing a regression through GitHub and git blame now takes one prompt. A product question that once waited a day for a colleague in another time zone is answered at once. Her prompts kept repeating, so she had Claude analyse her cache: 116 sessions in six categories (comprehension, modification, process, review, generation, other). The result: 67% comprehension, 2% code generation.

**The 'catch me up' skill**
She turned the repeated questions into a local skill, which she describes as "just a very detailed prompt" in a markdown file. It sorts comprehension questions into six exploration modes: architecture, convention, feature trace, syntax, testing and history. As a visual person, she has it answer with structure diagrams and tables. In the demo she uses it on the AI SDK testing repository, which was new to her. She asks how the repo works and whether it simulates a Sentry envelope. The answer corrects her premise: it intercepts real envelopes with a spawned collector. She also uses the skill before reviewing a colleague's PR when she lacks enough context to approve it.

**A missing step in research, plan, implement**
She cites a blog post that draws on Rich Hickey's "simple made easy" idea and proposes research, planning and implementation phases. She adds a step: understand the research your agent did, so you can steer it if it went the wrong way, and only then plan and build. She quotes Armin Ronacher, creator of Flask and a former Sentry engineer, who worries about people who "no longer know what code is in their own code base".

**Takeaways**
Track your own AI usage. Treat AI as the teammate who never tires of questions. Align your mental model before you prompt, and do not ship slop into the codebase that pays your salary.

## Why it matters
- The 67% comprehension versus 2% generation split, from 116 classified sessions, is a rare first-person measurement of how an engineer actually uses coding agents.
- The six-mode 'catch me up' skill is a concrete, copyable pattern: turn repeated questions into a structured skill file.
- Adding an explicit 'understand the research' step before plan and implement gives a clear human checkpoint in agent workflows.
- Pairing heavy AI use with a three-month quality quarter shows one way a large company protects code quality while going all in on agents.
- Mining your own session logs to find repeated prompts is a cheap method for deciding which skills to build.

## Metadata
- Video: https://www.youtube.com/watch?v=li0SaBt9RDM
- Duration: 17:05
- Playlist index: 719
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello everyone. Uh today I'm going to share with you how I use AI at Sentry and this queue I use the most in my day-to-day work. Um so but before we dive into that, let me tell you who I am. Uh my name is Priscilla. I'm a Brazilian-based in Vienna, Austria. I'm a mom of a 2-years-old very energetic toddler. Uh I'm a maintainer of Verdaccio, uh an open-source NPM registry. I'm core orga- co-organizer of Vienna JS, a very traditional meetup in Vienna and we talk all about JavaScript. And uh I'm I'm a senior software engineer at Sentry. Yesterday someone told me that I don't look like an a a uh software engineer, but guess what? I am. >> [laughter] >> Um So my my title my official...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/li0SaBt9RDM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://at.linkedin.com/in/priscila-andre-de-oliveira-ab34bb24b>
