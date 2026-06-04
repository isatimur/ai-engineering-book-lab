---
video_id: Xfl50508LZM
playlist_index: 681
title: "Ship Real Agents: Hands-On Evals for Agentic Applications — Laurie Voss, Arize"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Xfl50508LZM"
duration: "2:04:18"
duration_seconds: 7458
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Xfl50508LZM.txt"
themes:
  - "Evals & Reliability"
  - "Agent Architecture"
ingested_at: 2026-05-19T11:04:08+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Laurie Voss (head of developer experience, Arize AI; co-founder of npm) runs a 2-hour hands-on workshop on evaluating agentic applications using Arize Phoenix and the Claude Agent SDK. The clearest demystification of eval jargon in the corpus: evals = tests, traces = logs, spans = log entries. Core taxonomy: code evals (deterministic, cheap, fast) + LLM-as-judge (flexible, expensive, nondeterministic) + human review (gold standard, doesn't scale) — used together like Swiss cheese layers. Key insight before writing any eval: read your traces first. Agents fail in ways you didn't predict; you can't define success until you've seen what the agent actually produces. Capability evals vs. regression evals as the lifecycle model for an eval suite."
---

# Ship Real Agents: Hands-On Evals for Agentic Applications — Laurie Voss, Arize

## Summary

Laurie Voss (head of developer experience, Arize AI; co-founder of npm) runs the most comprehensive hands-on evals workshop in the corpus — 2 hours covering fundamentals, observability setup, three eval types, meta-evaluation, datasets, and iteration loops. The workshop uses a financial analysis agent (Claude Haiku, two-turn: research + report writing) as the demo target.

**The jargon problem, solved.** Voss opens by naming the eval field's own barrier: ML jargon that AI engineers don't need and find opaque. Stripped down: evals = tests, traces = logs, spans = log entries. A span records one step (one LLM call, one tool call, one agent turn) with input, output, and metadata. Traces are the nested collection of spans for a complete agent run. That's it.

**Why evals — the vibes problem.** Most teams build AI features by running a few queries and asking "does this look right?" They ship, and then it fails on edge cases, adversarial inputs, and especially on inputs phrased differently than they tested. Classic unit tests don't work because the same prompt produces different but equally-correct outputs — string matching fails. Human review doesn't scale because it doesn't run in CI and doesn't catch regressions. Without evals, you can't safely change your prompt, switch models, or add features without the risk of breaking something you can't see.

**The three eval types:**

1. **Code evals** — deterministic functions you write in Python or TypeScript. Run in milliseconds, cost essentially nothing. Good for: format validation (is it JSON?), length limits, forbidden phrases, required field presence, string matching. Limitation: brittle for complex or highly nondeterministic outputs.

2. **LLM-as-judge** — a second LLM (usually more capable than the production model) grades the output against a rubric. Rubric = a prompt defining what to check. Good for: factual correctness, faithfulness to source material, tone, semantic completeness, actionability. LLM judges add explanations — not just pass/fail but why, which makes evals actionable. Limitation: expensive, nondeterministic, and the judge itself must be evaluated (meta-evaluation).

3. **Human evaluation** — the gold standard. Humans are the best judges of quality. But humans don't scale, get fatigued (~50% miss rate for annotators), and can't run in CI. Primary use: building a golden dataset of known-good answers for the other two eval types to calibrate against.

**The Swiss cheese model.** No single eval type catches everything. Layer them: code eval catches format issues; LLM-as-judge catches reasoning gaps; human review catches what slipped through both. The holes don't line up when you stack the layers. Borrowed from safety engineering (and Anthropic's blog).

**Read your traces before writing any evals.** This is the workshop's most actionable principle and the step most tutorials skip. You can't define success until you've seen what the agent actually produces. In the demo: running the financial analysis agent against 12 stock ticker queries reveals that it sometimes tries to write output to disk (a completely unexpected failure mode), that it misidentified Amazon's ticker and wrote about AWS instead, and that it produced confidently specific numbers for Rivian (a private company) that may be hallucinated. None of these failure modes would have been predicted without reading the traces.

**Categorizing failures by severity × frequency.** After reading traces, you categorize: systemic failures (happen repeatedly — likely a prompt problem) vs. one-off failures (agent being nondeterministic — probably ignore). Then weight by severity: a failure where the agent goes completely off the rails is more important than a minor hallucination even if the hallucination happens more often. Fix expensive-frequent failures first.

**Capability evals vs. regression evals.** A capability eval is a hill to climb — something the agent currently fails at. Once it passes consistently, it becomes a regression eval: baked into the test suite to ensure the agent never loses that capability. The eval suite lifecycle is constantly turning capability evals into regression evals while adding new capability evals.

**The eval loop.** Instrumentation (start capturing traces) → run the agent → evaluate traces → annotate results → analyze patterns (use an LLM to categorize explanations at scale — "LLMs all the way down") → change prompt/application → repeat. This is how real teams like Descript, Bolt, and Anthropic (with Claude Code) iterate on agents in production.

**Don't test the path, test the outcome.** A classic eval mistake: writing evals that check whether the agent took specific steps to reach the answer. The agent might find a more efficient path, especially after a model upgrade. Evals that check intermediate steps break when the agent gets smarter. Test what it produced, not how it got there.

**Eval data sources.** Production traces are ideal (real user inputs, real failures). Pre-launch: synthetic data — use another LLM to generate a wide variety of plausible inputs, including edge cases, adversarial inputs, and phrasing variations (same intent, different vocabulary). The example: "research Tesla financial performance" vs. "what's going on with Tesla stock" vs. "yo, is Tesla a buy right now" — same intent, agents may handle them very differently.

## Why it matters

This is the definitive evals introduction in the corpus — the only workshop-format content that walks from definition through implementation across all three eval types. The "read your traces" principle is the most practically actionable piece of eval advice in any of the 693 videos. The financial analysis demo is pedagogically valuable because the agent's real failure modes (disk write attempt, wrong ticker interpretation, Rivian hallucination) are genuinely surprising and illustrate why vibes-testing is insufficient. The Swiss cheese model gives the book a memorable diagram for Chapter 5 (evals).

## Metadata
- Video: https://www.youtube.com/watch?v=Xfl50508LZM
- Duration: 2:04:18
- Playlist index: 681
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Agent Architecture]]

## Key claims (for claims ledger)
- Evals = tests, traces = logs, spans = log entries: the jargon-free framing that makes the field accessible.
- Three complementary eval types — code evals, LLM-as-judge, human review — used together like Swiss cheese layers. No single type catches everything.
- Read your traces before writing any eval: you can't define success until you've seen what the agent actually produces.
- Categorize failures by severity × frequency; fix expensive-frequent failures first.
- Capability evals become regression evals once the agent passes them consistently — the lifecycle model for an eval suite.
- Don't test the path, test the outcome: evals that check intermediate steps break when the agent finds a more efficient route.
- LLM-as-judge explanations are what make evals actionable — they tell you not just what was wrong but why and how to fix it.
- Synthetic data is the best pre-launch test data source; cover phrasing variations, edge cases, and adversarial inputs.

## Book angles
- Chapter 5 (evals) — primary workshop source; Swiss cheese model as the chapter's organizing diagram; all three eval types covered with implementation.
- Chapter 7 (reliability) — the vibes problem and why it doesn't scale; instrumentation and trace reading as reliability practices.
- Chapter 8 (constrained delegation) — evals as the measurement layer for constrained delegation: how do you know the agent is operating within bounds?

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Xfl50508LZM.txt]]
- Note: 2-hour workshop; transcript covers fundamentals, Arize Phoenix setup, three eval types, and iteration loops. Tool used: Arize Phoenix (open source) + Claude Agent SDK.
