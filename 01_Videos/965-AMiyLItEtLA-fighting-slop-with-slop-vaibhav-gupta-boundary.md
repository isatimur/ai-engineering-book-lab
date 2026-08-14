---
video_id: AMiyLItEtLA
playlist_index: 965
title: "fighting slop with slop — Vaibhav Gupta, Boundary"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AMiyLItEtLA"
duration: "21:32"
duration_seconds: 1292
view_count: 1200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/AMiyLItEtLA.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:53+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vaibhav Gupta describes building BAML with no code reviews, replacing standards with a minimal architecture.md, and using agents to generate, transcript-inspect, and A/B test code and language features."
---

# fighting slop with slop — Vaibhav Gupta, Boundary

## Summary
Vaibhav Gupta describes the engineering practices behind BAML, a programming language his team has built over three years: no code reviews, every engineer working in parallel, and no standardization on which AI coding tool anyone uses. In place of standards, they maintain a minimal "architecture.md" (not a Claude.md) listing invariants that rarely change, such as compiler layer boundaries, plus a design-doc tool with Slack notifications and a hard rule that a published design doc must actually be read before it counts. A separate tool visualizes the dependency graph and enforces architectural invariants via CI, which he says has kept the architecture unchanged for three to four months. For correctness, agents continuously generate BAML programs from scratch; the team inspects full transcripts (both humans and other agents) to flag wasteful tool-call sequences and hallucinated findings, then lets agents fix issues and A/B test competing language features by measuring tool-call counts and error rates. He argues TypeScript's core design goal — balancing correctness against human productivity — bakes "slop" into the language itself (implicit string coercion in sorting, for example), and demos BAML features built agent-first instead: a single describe() call returning docstrings, source, and call sites; compiling arbitrary functions into standalone cross-platform CLI binaries (including WASM); compiler-inferred, exhaustive error types instead of nested try/catch; and calling BAML functions, including lambdas and closures, directly from Python, TypeScript, Rust, Go, Ruby, or Java.

## Why it matters
- A rare concrete, named counter-example to standard code-review orthodoxy: a production-language team runs without code review by substituting a minimal invariants file, an enforced dependency-graph check, and transcript-level agent auditing.
- Documents a specific method for evaluating agent-generated code and even language-design choices empirically (A/B testing features by tool-call count and error rate) rather than by taste.
- The TypeScript critique (correctness-vs-human-productivity tradeoff baking implicit-coercion "slop" into the language) is a specific, checkable claim about why agent-first language design might diverge from human-oriented language design.

## Metadata
- Video: https://www.youtube.com/watch?v=AMiyLItEtLA
- Duration: 21:32
- Playlist index: 965
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Fighting slop with slop. My name is Vaibhav and I'm going to talk about something that is a little I would say maybe a little silly at first. I'm going to show you our team's engineering practices really quickly. We do no code reviews. We require every engineer to work on things in parallel. And we have no standardization on how people do AI. And I know immediately what almost all of you are thinking. We're probably a Zoomer YC startup. And I can guarantee you I'm clearly a millennial. So what do we actually do at our company without code reviews? Well, we built about 3 years ago we decided to build a programming language. That's something that has absolutely no room for slop....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AMiyLItEtLA.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
