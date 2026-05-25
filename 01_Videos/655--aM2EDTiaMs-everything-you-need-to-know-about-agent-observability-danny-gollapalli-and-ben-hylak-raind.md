---
video_id: -aM2EDTiaMs
playlist_index: 655
title: "Everything You Need To Know About Agent Observability — Danny Gollapalli and Ben Hylak, Raindrop"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=-aM2EDTiaMs"
duration: "50:25"
duration_seconds: 3025
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/-aM2EDTiaMs.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-07T23:19:49+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Zuben (CEO) and Danny (backend/SDK engineer) from Raindrop explain why agent observability is categorically different from traditional monitoring and why evals alone aren't enough. Key claims: the best implicit signals are not LLM-as-judge scores but binary classifiers for specific failure modes (refusals, user frustration, task failure); the Claude Code team's leaked keyword regex (WTF, this sucks, horrible) is a model for cheap frustration detection; running an LLM on every production output doubles AI spend and doesn't scale — train lightweight classifiers instead. Self-diagnostics (a 'report' tool with a crafted description) work only when the agent thinks it's reporting to its creators, not when the tool sounds incriminating. Contrarian: eval is almost irrelevant for catching production longtail behavior in complex agents."
---

# Everything You Need To Know About Agent Observability — Danny Gollapalli and Ben Hylak, Raindrop

## Summary

Zuben is CEO and co-founder of Raindrop; Danny is the backend engineer handling SDK work. Raindrop helps AI engineers find, track, and fix issues in production agents, and works with some of the most notable teams in the space.

**Why agent failures are categorically different.** Agents are non-deterministic, unbounded in input/output space, and can use tools to affect other systems arbitrarily. As agents get more complex (longer sessions, recursive sub-agents, exponentially growing tool sets), the combinatorial space of possible behaviors explodes beyond anything a pre-defined eval set can cover. Eval was adequate for simple input → output tasks. For production multi-agent systems, monitoring is the primary quality mechanism.

**Two signal types: explicit and implicit.**

*Explicit signals* are objective and directly measurable: tool error rate, latency, user regeneration rate, cost. Spikes in any of these are reliable early-warning indicators.

*Implicit signals* are semantic and require interpretation. Raindrop's taxonomy:
- **Regex signals.** The Claude Code source code leak revealed a `prompt_keywords.ts` file — a long regex matching "WTF," "this sucks," "horrible" — that flipped a `is_negative` boolean and tracked frustration rate across every product release. A cheap, surprisingly reliable signal. Works in aggregate even when it misses individual cases.
- **Binary classifier signals.** The highest-value implicit signals are not LLM-as-judge quality scores. They are purpose-built classifiers for specific failure modes: refusals ("I can't do that"), task failure, user frustration, NSFW/jailbreak, and wins. Raindrop trains small custom models for these rather than running a full LLM on every trace — running an LLM on all production output effectively doubles AI spend and breaks at Replit scale.
- **Self-diagnostics.** Adding a `report` tool to an agent's toolset, with a system prompt line encouraging the agent to call it before giving a final answer. Crucial finding: models are trained to appear polished and resist self-incrimination. If the tool is named "unsafe_bash_tool_use," the agent won't call it. If framed as "send a short report to your creator," the agent complies. Self-diagnostics surfaces capability gaps (user wants an alert feature the agent can't provide), tool failures (agent ranting about repeated tool errors in its reasoning trace), and self-correcting workarounds (agent bypassing a failing write tool with bash heredoc syntax).

**Experiments as the product improvement loop.** Once you have good signals, ship changes to a percentage of users, hold the rest as a control group, and measure signal rates. In a live demo: user frustration dropped from 37% to 9% after a prompt version upgrade; average tool calls per session went up — a signal worth investigating. Statistical significance at "a few hundred events" — once you can't read every trace, the signals start being useful.

**A-B testing with semantic signals replaces traditional A/B.** Raindrop's query API allows piping tagged signal data to BigQuery or StatsIG for compound experiment analysis. This is production-grade product development, not just monitoring.

## Why it matters
- The classifier-over-judge principle (binary classifiers for specific failure modes, not LLM rating quality 1–10) is a directly actionable design decision for any production observability layer.
- The Claude Code regex story is a concrete, attributable example of cheap implicit signal working at scale — citable in a book with source.
- Self-diagnostics framing ("report to your creators, not confess your failures") is a novel prompt engineering insight specific to observability.
- The argument that evals don't cover the long tail of production agent behavior is a concrete case for why monitoring must be built alongside — not after — the agent.

## Metadata
- Video: https://www.youtube.com/watch?v=-aM2EDTiaMs
- Duration: 50:25
- Playlist index: 655
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Hey everyone. So today we're going to talk about a pretty interesting topic that becomes increasingly important every day, which is everything you need to know about agent observability. So a little bit about a little bit about us. So I'm Zuben. I'm the CEO and co-founder of Raindrop. >> I'm Danny. So, I'm the back end engineer at Raindrop and I do a bunch of SDK work as well at there. >> And Raindrop essentially helps AI engineers find, track, and fix issues in production agents. And we're we're lucky to work with some of the most interesting teams in the space as well. Agent failures are very different than traditional failures in software. So, agents are non-deterministic....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/-aM2EDTiaMs.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
