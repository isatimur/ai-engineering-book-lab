---
video_id: vNCY9kXXyDQ
playlist_index: 695
title: "Skill issue: Lessons from skilling up coding agents to use Langfuse - Marc Klingen, Clickhouse"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=vNCY9kXXyDQ"
duration: "24:09"
duration_seconds: 1449
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/vNCY9kXXyDQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:33+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Marc Klingen, co-founder of Langfuse (the largest open-source LLM tracing project), recounts six concrete lessons from building a Claude Code skill to help developers integrate Langfuse. The central finding: pre-training context for Langfuse was already stale, causing Claude Code to hallucinate deprecated method signatures; a skill with an agent-navigable sitemap and a semantic search endpoint fixed it. He also ran an autoresearch loop on the skill and accepted 3 of 6 AI-generated improvements — but found the target function design harder than the optimization itself. Contrarian point: static content in skills duplicates docs and ages out; dynamic references plus a search endpoint beat local caching."
---

# Skill issue: Lessons from skilling up coding agents to use Langfuse - Marc Klingen, Clickhouse

## Summary

Marc Klingen is a co-founder of Langfuse — started three years ago, now the largest open-source LLM tracing and evaluation project by their metrics. This talk is a post-mortem on building and iterating a Claude Code skill to help developers add Langfuse to their projects, covering what broke, what worked, and what they would change.

**The problem skills solve**

Klingen frames skills as the middle ground between rigid workflows (reliable, but can't handle multi-domain queries) and fully autonomous agents (flexible, but unpredictable). A customer asking to simultaneously reset a password *and* change their email historically required two separate routers; a skilled agent can progressively load context and handle both. Skills formalize the shortcut.

**Why Langfuse needed a skill**

Langfuse has 478 pages of documentation. Claude Code would hallucinate deprecated method names based on stale pre-training data — it would implement instrumentation incorrectly, discover the error, then fetch docs to fix it, adding unnecessary turns. The goal of the skill: give every user a Langfuse expert that uses up-to-date references, asks clarifying questions before implementing, and doesn't assume defaults (e.g., the EU data region was hardcoded as the default, but US enterprises also care about regionality).

**Six lessons**

1. **Traces get you 80% there.** Instrumenting Claude Code and watching trace output revealed most skill failures before writing any formal evals.
2. **Hallucinated CLI flags.** Claude invented `--trace` flags because they sounded plausible. Fix: aggressively surface the `--help` flag so the agent discovers real options.
3. **Build an agent sitemap.** Instead of letting the agent search the web or fetch one doc page at a time, expose a structured index of documentation so it can navigate directly to the right section. Langfuse also supports appending `.md` to any doc URL to get Markdown output, reducing token waste from parsing HTML.
4. **Add a semantic search endpoint.** Langfuse surfaced their existing RAG stack as a search endpoint. Coding agents can now ask a natural-language question and get back relevant documentation chunks — faster than fetching five doc pages, and it gives Langfuse telemetry on what questions agents struggle with.
5. **A basic eval setup beats no eval setup.** Klingen's team created five eval templates covering different app types (chat, voice, RAG, batch processing). They used natural-language statements as LLM-as-judge checks against filesystem state before/after skill execution.
6. **Dynamic content beats static caching in skills.** Embedding documentation in the skill creates a second stale copy of the same content. Point to the live reference instead.

**Autoresearch on the skill**

Klingen's team ran an autoresearch loop to improve the skill, targeting prompt migration (moving prompts from local repos into Langfuse's managed prompt system). They accepted 3 of 6 AI-suggested changes. Key lesson: the target function dominates results. When they optimized for minimizing turns, the agent stripped out documentation-fetching steps because they were "unnecessary turns" — which destroyed the whole point of keeping context fresh. Defining the right objective was harder than running the optimization.

## Why it matters
- The search-endpoint pattern (semantic search over docs exposed as an API endpoint, tracked for analytics) is reusable for any library that wants coding agents to integrate it correctly.
- The autoresearch-on-skill loop is an early validated example of using agents to improve the context files that guide agents — a self-improving documentation pattern.
- The target function lesson generalizes: any optimization loop on an agent or skill will exploit proxy metrics, and identifying the real objective is the hard part.

## Metadata
- Video: https://www.youtube.com/watch?v=vNCY9kXXyDQ
- Duration: 24:09
- Playlist index: 695
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Okay, that was quick. Hi everyone. Super excited to be here. I'm Mark, one of the founders of Langfuse. Uh I mean, we started Langfuse like three years ago when everything was felt quite early. Uh building agents that didn't work. uh and then realized okay there needs to be like some evaluation tracing built like link is the open source project in the space by now I mean by the metrics that we track uh we seem to be the largest one in the space we do all product engineering out of Europe thus I'm very excited this conference is coming to Europe because there's so many great people here uh and we always need to resist the urge to like ship the whole team to another continent because actually...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/vNCY9kXXyDQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
