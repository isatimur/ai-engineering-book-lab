---
video_id: _fQ7Z_Wfouk
playlist_index: 628
title: "Why building eval platforms is hard — Phil Hetzel, Braintrust"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_fQ7Z_Wfouk"
duration: "25:39"
duration_seconds: 1539
view_count: 4685
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/_fQ7Z_Wfouk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-04-29T22:48:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Phil Hetzel (Solutions Engineering lead, Braintrust) maps the maturity curve of eval platforms from spreadsheet to production flywheel. His core claim: the hard part isn't the UI — it's the data infrastructure. Agent traces are semi-structured, span 10–20 MB per trace, arrive at high velocity, and need both ultra-low-latency read (observability) and aggregate analytics (eval) from the same store. Braintrust's failed attempt with a custom DSL (BTQL, 'which no one liked') illustrates this directly. He also argues eval and observability are the same problem viewed at different times, and that building your own eval platform means you just became a platform engineer. Contrarian angle: 'vibe coding your eval UI is easy; the data layer will wreck you.'"
---

# Why building eval platforms is hard — Phil Hetzel, Braintrust

## Summary

Phil Hetzel leads Solutions Engineering at Braintrust, an agent quality platform built around two pillars: offline evals (pre-production) and observability (in-production monitoring). He came from 12 years of consulting (KPMG, Slalom) where he saw many generative AI proofs of concept that never reached production — the motivation for joining Braintrust as a user before becoming an employee.

**The eval maturity curve.** Hetzel lays out a four-stage progression that most teams travel in order:

1. **Spreadsheet + for-loop.** Everyone starts here. Zero barrier to entry. Works fine for documenting outputs, terrible for iteration, comparison, or involving non-technical teammates. He calls this "documenting, not experimenting."

2. **Vibe-coded UI + real database.** Teams graduate to custom UIs (Neon or similar) for persistence and broader access. Better for sharing but still a reporting tool — encourages documentation more than iteration.

3. **Experimentation + playground.** The first step that resembles real eval work. Non-technical users can tweak system prompts and compare two agent configs side-by-side with scores surfaced. This is "where the rubber meets the road."

4. **Production flywheel.** Observability and offline eval become the same loop. Production traces flow back to the offline environment; engineers improve agents against real usage; scores feed into alerting. Braintrust discovered this pattern when a customer was running evals every hour on piped production traffic — they realized they needed to support tracing natively.

**The data infrastructure problem.** This is the core argument: eval quality is a systems problem, not a UX problem. Agent traces are uniquely difficult — semi-structured or fully unstructured, 10–20 MB per individual span (vs. a couple KB for a traditional APM span), high-velocity, and requiring both sub-second read latency (for live observability) and aggregate analytics (for eval scoring). Braintrust built and abandoned a custom DSL called BTQL — "which no one liked, including us" — before solving the dual-query-pattern problem properly. A Notion-scale customer needing full-text search across millions of traces broke their old approach entirely.

**The "so what" problem and headless evals.** The next frontier is surfacing unknown unknowns: which topic clusters are users triggering that no one anticipated? Hetzel also notes a growing demand for headless eval — engineers who want to use Codex or Claude Code to drive the entire eval-improve loop without ever opening a UI. This requires a SQL-queryable backend that an agent can call directly.

**Building it yourself means you are the platform team.** Vibe-coding a custom eval UI is easy. The result is that you now own a production data platform at the pace the industry is moving. Every maturity upgrade adds scope — you're now a tracing platform, a logging platform, an observability platform, and a multi-tenant RBAC system.

## Why it matters
- The four-stage maturity model is a directly citable framework for advising teams on where they are and what comes next.
- The dual-read-pattern problem (sub-second latency + aggregate analytics on large unstructured data) is the concrete technical reason why building eval infra is harder than it looks — useful for a book chapter on eval infrastructure.
- "Eval and observability are the same problem at different times" is a clean framing that collapses a common conceptual split.
- The BTQL failure story is a real cautionary tale about custom abstraction layers on top of novel data.

## Metadata
- Video: https://www.youtube.com/watch?v=_fQ7Z_Wfouk
- Duration: 25:39
- Playlist index: 628
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right, it's 11:15. Uh, we're going to go ahead and get started. Before we do, everyone say evals. Evals. I was telling my colleague Rose uh who who's at at the door that I was a adjunct professor for a number of years and um the first uh year that I did it I thought I was going to have this full class of 130 people every single week eager to learn and then as the weeks went on 130 became 60 became 30 became 10. So, I always tell myself that whenever I give a talk that only about four or five people are going to show up, but I'm going to be really excited to teach those four or five. Um, today is a a a real blessing because um you know, we have we have a a packed house here today....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_fQ7Z_Wfouk.txt]]
- Description cue: An eval platform is not just a test runner. You are building shared definitions of "good," reliable data pipelines, labelling workflows, versioning, and trust in results across many teams and model changes. This session breaks down the hidden complexity, the common failure modes, and the design principles that make evals credible and usable in day-to-day engineering.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
