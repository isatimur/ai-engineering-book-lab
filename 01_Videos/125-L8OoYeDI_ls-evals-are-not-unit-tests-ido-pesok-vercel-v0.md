---
video_id: "L8OoYeDI_ls"
playlist_index: 125
title: "Evals Are Not Unit Tests — Ido Pesok, Vercel v0"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=L8OoYeDI_ls"
duration: "15:22"
duration_seconds: 922
view_count: 13783
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/L8OoYeDI_ls.txt"
themes:
  - "Evals & Reliability"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T11:25:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ido Pesok, engineer on Vercel v0 (a vibe-coding platform that recently crossed 100 million messages), argues that application-layer evals are categorically different from unit tests. The central metaphor: think of your eval dataset as a basketball court — you need to understand the shape of your court (domain boundaries), distribute test cases across the whole court, and avoid the out-of-bounds trap of testing queries your users don't actually send. Key practical claims: keep scores pass/fail and as simple as possible; share middleware (RAG, system prompt) between production code and eval tasks; add evals to CI so every PR shows regressions. Specific technique: add structured output tags in eval prompts to enable string matching, even if you strip them in production."
---
# Evals Are Not Unit Tests — Ido Pesok, Vercel v0

## Summary
Ido Pesok (Vercel, working on v0) opens with a confession: he launched a Fruit Letter Counter app, tested it twice, shipped to production, and a user immediately reported a wrong answer. The example is deliberately silly, but the dynamics it illustrates are real at any scale.

### The Core Problem
LLM applications have a unique failure mode: 95% of the app works 100% of the time and passes all traditional tests. It's the remaining 5% — the cases your prompt engineering can't anticipate — that fails in production. Classic unit tests cannot detect this class of failure because they operate on deterministic code paths.

### The Basketball Court Framework
Pesok's eval mental model centers on a court visualization:
- **Data** = the point on the court (a user query, positioned by difficulty/distance from the basket)
- **Task** = the shot (your system — prompt, RAG, model, middleware — executing against that data)
- **Score** = did it go in? (pass/fail check)

Understanding your court means knowing the domain boundaries (out-of-bounds = queries your users would never send) and distributing test cases across the full court, not concentrated in the easy center.

### Building the Dataset
The hardest and most important step is collecting real user queries: thumbs-up/down signals, random log sampling (100 traces per week gives surprising signal), community forums, Twitter. There is no shortcut; you have to do the work.

### Practical Scoring Guidance
- Prefer deterministic, pass/fail scoring. Fuzzy scores are hard to share across teams and obscure what's actually failing.
- Add structured output tags (e.g., `<answer>3</answer>`) in eval prompts to enable string matching — even if production strips them.
- For cases where no code-based check works, human review is acceptable; the signal is worth it.

### Share Code Between Evals and Production
Put RAG logic, preprocessing, and system prompt assembly inside an AI SDK middleware. The eval task imports the exact same middleware as the production API route. This ensures eval practice mirrors the real game.

### CI Integration
v0 runs evals in every PR. BrainTrust generates a per-PR report showing improvement/regression across the entire court — "did fixing the bottom-right corner break the top-left?" Switching models (the "new player") is evaluated against the same court before merging.

## Why it matters
- The "court mapping" mental model gives teams a spatial way to reason about dataset coverage — which is more actionable than abstract coverage percentages.
- Separating data (constants) from tasks (variables) prevents the common mistake of rebuilding the entire dataset every time a system prompt changes.
- Adding evals to CI turns model/prompt changes from leap-of-faith deploys into measurable PRs — the same discipline as any other software change.
- v0's 100M-message scale means these practices have been stress-tested on real production traffic, not toy examples.

## Metadata
- Video: https://www.youtube.com/watch?v=L8OoYeDI_ls
- Duration: 15:22
- Playlist index: 125
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] My name is Ido. I'm an engineer at Verscell working on Vzero. If you don't know, Vzero is a full stack Vibe coding platform. It's the easiest and fastest way to prototype, build on the web, and express new ideas. Uh, here are some examples of cool things people have built and shared on Twitter. And to catch you up, we recently just launched GitHub sync, so you can now push generated code to GitHub directly from VZO. You can also uh automatically pull changes from GitHub into your chat, and furthermore, switch branches and open PRs to collaborate with your team. I'm very excited to announce we recently crossed 100 million messages sent and we're really excited to keep growing from...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/L8OoYeDI_ls.txt]]
- Description cue: How to think about evaluating a non-deterministic system — and how to actually succeed at it.

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **RAG & Retrieval**.
