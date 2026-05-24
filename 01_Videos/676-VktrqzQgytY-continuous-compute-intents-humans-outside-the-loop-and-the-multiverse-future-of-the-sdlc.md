---
video_id: VktrqzQgytY
playlist_index: 676
title: "Continuous Compute: Intents, Humans *Outside* the Loop and the Multiverse future of the SDLC"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=VktrqzQgytY"
duration: "18:37"
duration_seconds: 1117
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/VktrqzQgytY.txt"
themes:
  - "Coding Agents"
  - "Org Design & Leadership"
ingested_at: 2026-05-19T11:03:57+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Madison (partner at NEA, former Meta AI researcher) and Hugo Santos (CEO of Namespace, former Google microservices lead) co-present the thesis that traditional CI/CD is structurally incompatible with agentic software development and propose 'continuous compute' as the replacement. Their concrete claim: agents generate N PRs against N repos simultaneously with warm caches that exist only on one machine — the merge queue becomes a serialization bottleneck equivalent to a high-performance database lock contention problem. The replacement architecture they describe eliminates PRs as the unit of work; instead it uses intent/plan → agent loop with internal validation (build+test inside the loop) → a pre-merge queue where completed changes wait for semantic grouping and external approval. Their most forward-looking claim: within 'weeks to months,' external validation will be agent-to-agent (a security-focused LLM reviewing a coding-focused LLM's output), and humans will approve intent+result summaries rather than reading code diffs."
---

# Continuous Compute: Intents, Humans *Outside* the Loop and the Multiverse future of the SDLC

## Summary

Madison, a partner at NEA who previously led data and AI teams at Meta, and Hugo Santos, CEO of Namespace (formerly at Google leading microservices), make the case that traditional CI/CD is not just slow but architecturally incompatible with the way agentic software development actually works.

### Why CI/CD breaks at agent scale

The current CI/CD model was designed for human developers submitting one or two PRs per week. The GitHub Actions pipeline — build, test, deploy, fix failures — works because there are at most a handful of concurrent changes, local caches are warm, and merge conflicts are infrequent.

At agent scale, this collapses on several axes:

- **Volume**: agents generate N PRs against N repos simultaneously. Madison shows a GitHub activity chart with a white line (commit volume) spiking vertically in recent months.
- **Cache**: agents don't have warm local caches. Every checkout is cold unless you explicitly build caching infrastructure.
- **Merge conflicts**: thousands of short-lived branches all pulling the same codebase in different directions. Merging them is, Santos says, equivalent to a database serialization problem — you need to lock the ledger to commit, and the time to merge matters more as the rate of change increases.
- **Human reviewers are overwhelmed**: this is not an insight anymore; it's a structural bottleneck.

### The replacement architecture

Santos describes what he sees leading teams already doing (including Namespace internally):

1. **No PRs.** The unit of work is intent and plan — a spec written somewhere (Linear ticket, Slack message, wherever). This is codified before any code is written.

2. **Agent loop with internal validation.** The agent checks out a well-known commit, implements toward the plan, and continuously builds and runs tests as part of the loop — not as a separate CI phase after the PR.

3. **No human in the external validation loop.** Instead: a security-focused LLM reviews the change. An API conformance LLM checks for regressions. These agents provide feedback directly to the coding harness, which incorporates corrections within the same loop iteration. The loop needs to be stateful — memory and file system state carried across iterations — to avoid starting from scratch every time.

4. **Pre-merge queue.** Completed changes don't go directly to the repository. They wait in a pre-merge queue where semantically related changes (multiple agents working on related features) are grouped before a human reviews the result. The human approves intent + outcome (including a video of the feature working, or a security LLM's report) — not individual code diffs.

### The "multiverse" future

Santos's most speculative claim: when the inner loop (code generation + build + test) becomes fast enough, and many agents are working in parallel, the starting point for each agent won't be the current tip of the main branch — because that tip is itself moving. Agents will branch off multiple candidate commits simultaneously, work toward the same plan from different starting states, and the merge infrastructure will have to reconcile them. He calls this "the multiverse" of the SDLC, and frames it as a resource-usage explosion problem that requires hardware/software co-design to maintain efficiency.

### The positioning of Namespace

Namespace's product is compute infrastructure for this new world: high-performance caching as the orchestration layer, rate limiting and ingress shaping for agent traffic, and the stateful environment that makes fast inner loops possible. Santos cites Mitchell Hashimoto's public post on what he'd do to fix GitHub (including shutting down Copilot and rebuilding for cloud-first, inference-enabled workflows) as external validation of the direction.

## Metadata
- Video: https://www.youtube.com/watch?v=VktrqzQgytY
- Duration: 18:37
- Playlist index: 676
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> All right. Can you all hear me? Great. There we go. All right, well we're only 35 to 50 minutes late, but thank you for sticking around. Um we're going to talk about why CICD is dead. And we're going to propose that continuous compute is going to be the next thing. Maybe. All right. So just quick introduction. We're going to have two speakers. One's already One's getting mic'd up. Um my name's Madison and I'm a partner at NEA investing in technology. Uh I do focus in infra and dev tools and I formally used to be a meta AI researcher. Uh so I used to lead data and AI teams. I got really frustrated by the state of infrastructure and so I jumped into venture to do something about it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VktrqzQgytY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
