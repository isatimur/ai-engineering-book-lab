---
video_id: ON5LIT0M4do
playlist_index: 664
title: "You can't just one shot it — Mehedi Hassan, Granola"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ON5LIT0M4do"
duration: "10:11"
duration_seconds: 611
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ON5LIT0M4do.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-10T20:57:13+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mehedi Hassan (product engineer, Granola meeting notes app) argues the answer to LLM quality problems isn't to 'one-shot better' but to engineer a tight feedback loop — 'playing tennis with the LLM'. Three concrete solutions: (1) custom internal tracing tools with a UI readable by non-engineers, (2) converting Electron to a web shell for CI preview links (so Cursor can auto-test PRs and upload screenshots), (3) iterating on many feature variants in parallel. Key observation: one prompt can't serve all user roles; LLM behavior and product UX are equally part of the picture."
---

# You can't just one shot it — Mehedi Hassan, Granola

## Summary

Mehedi Hassan (product engineer, Granola — a meeting notes app that captures system audio + microphone for real-time transcription) argues that the fundamental mistake in AI product engineering is thinking you can one-shot your way to quality. The answer is feedback loop engineering.

**The problem with one-shotting.** Granola ships a chat feature that lets users ask questions about their meetings. A naive one-shot chatbot immediately runs into real failures: web search too slow, follow-up emails not matching the user's style, coaching questions producing irrelevant answers. These aren't edge cases — they're predictable consequences of treating LLM integration as a line of code rather than an engineering discipline.

**Web search as a case study in hidden complexity.** Adding a web search tool looks like one line of code. In practice: token usage balloons (10p per complex query adds up at scale), the context window fills, and — critically — the lab's internal provider can silently degrade overnight with a model update. "Billion-dollar companies do web search" is the tell: it's not a tool parameter, it's a product problem.

**The role-specificity problem.** One prompt can't serve everyone. A salesperson wants deal-focused notes; an engineer wants action items and Linear tickets; HR wants something different again. LLMs are stubborn, and getting inside them to tune output for your specific use case is the actual work.

**Solution 1: Custom internal tracing tools.** Rather than using a generic SaaS observability provider, Granola built their own tracing tool. Key design principle: the UI serves everyone — product, data, CX, not just engineers. No CloudWatch queries. The founder reviews traces front-to-back directly. The tool captures every tool call, the reasoning behind it, cost, and structured data in the exact format the team needs. LLMs made building this tool feasible where it wasn't before — "this is where one-shotting is kind of nice."

**Solution 2: Electron → web shell for CI previews.** Granola is a desktop Electron app — historically, you could only run one instance locally, making parallel variant testing nearly impossible. Solution: abstract the IPC APIs (system APIs) to fall back to web standards, do the same for React routers, sessions, and query layer. Result: the render process becomes Electron-agnostic and can run as a plain web app. Now every PR gets a preview link from CI. Bonus: Cursor automatically tests each PR, takes a screenshot, and uploads it to the PR — significantly speeding up review.

**Solution 3: Iterate on many variants.** Because CI previews are cheap, the team can now run a feature as four different variants in parallel, experience all of them in practice (not just Figma mocks), and ship the one that actually connects with users.

**The tennis metaphor.** "The answer isn't to one-shot better. It's about figuring out how you can make that feedback loop where it kind of feels like playing a tennis game with the LLM." The goal: conviction that what you're shipping will work, not hope.

## Why it matters

This talk is the most product-engineering-specific piece on LLM feedback loops in the 660-693 batch. The custom tracing tool principle (build internal observability tuned to your team, not generic SaaS) directly supports Chapter 7 (reliability) and complements the Arize Phoenix approach (#681) from the other direction. The Electron web shell trick is an underrated CI/CD pattern that any desktop-first AI product team could apply. The role-specificity observation (one prompt can't serve all users) is an important constraint for anyone designing meeting or document AI products.

## Metadata
- Video: https://www.youtube.com/watch?v=ON5LIT0M4do
- Duration: 10:11
- Playlist index: 664
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]

## Key claims (for claims ledger)
- The answer to LLM quality problems is feedback loop engineering, not better one-shotting.
- Web search as a tool parameter is an illusion — it's a product engineering problem involving cost, context, and provider stability.
- One prompt cannot serve all user roles; role-specificity requires product-level solutions.
- Build internal tracing tools designed for non-engineers to read — not CloudWatch queries, but a UI your founder can use to trace agent loops front-to-back.
- Converting Electron to a web shell for CI previews enables LLM-based agents (Cursor) to auto-test PRs and upload screenshots.
- Cheap CI preview variants → more parallel experimentation → higher conviction at ship time.

## Book angles
- Chapter 7 (reliability) — custom tracing as the internal observability layer; complements generic evals with product-specific trace UIs.
- Chapter 6 (software factory) — CI/CD integration (preview links, Cursor auto-testing screenshots) as a pipeline stage in the AI-native dev workflow.
- Chapter 5 (evals) — "read your traces" principle applied at the product level; founders and CX reading traces, not just engineers.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ON5LIT0M4do.txt]]
- Note: Speaker introduces themselves as "Maddie" (nickname) but is listed as Mehedi Hassan on the conference program.
