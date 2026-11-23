---
video_id: bU5gDVyu_28
playlist_index: 1387
title: "Does Code Quality Still Matter? It Depends on This — Max Kanat-Alexander, Capital One"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=bU5gDVyu_28"
duration: "16:23"
duration_seconds: 983
view_count: 227000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/bU5gDVyu_28.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-31T03:05:59+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Max Kanat-Alexander (Capital One) replaces the senior engineer's 'it depends' with a framework. All software success rests on understanding the system and executing on that understanding, and code quality exists only to serve those two through structure. AI is making disposable software, with low consequences, cost of replacement, dependencies and cost of maintenance, far more common. For it, code quality does not matter. For durable software it still does. Teams can make software more disposable (isolated environments, enforced independence, redundancy, limited scope) and make rigor cheap through standardization, inward flow tooling, easy testing and maximum strictness."
---

# Does Code Quality Still Matter? It Depends on This — Max Kanat-Alexander, Capital One

## Summary
Max Kanat-Alexander of Capital One takes on the question of whether code quality still matters when agents write the code. Every senior engineer answers "it depends," so he sets out to say what it depends on, and ends with a clear yes, no, and a third answer.

**Why code quality ever mattered**
All software success depends on two factors: understanding, and executing on that understanding. Debuggers, observability, evals and tests all exist to serve them. An engineer needs two understandings: the actual behavior of the system, and how to modify that behavior correctly and safely. A real system such as Chromium has near-infinite behaviors, but you can still describe a component like its URL parser. That is why code has structure. Readability and testability were proxies; "it's the structure that actually matters."

**The risk of change**
Every modification carries two risks: you introduce a problem (not only a bug, also delays or budget overruns), and you make future changes harder. Both come from problems with understanding. He says he can reduce every postmortem he has read to these two factors. The second feeds the first and compounds non-linearly, until every change to a large mainframe-style codebase causes a problem.

**Disposable versus durable software**
Rather than bet on future models, he points to something models are doing now: making disposable software "a hundred thousand times more common." Four factors place software on the spectrum: consequences of failure, cost of replacement, dependencies, and cost of maintenance. If all are low, code quality does not matter, for example a custom calculator or a party planner for one party. If all are high, every practice of engineering rigor matters. Durable software is not going away, and he expects more of it because AI tools make it easier to build. He advises erring toward durable.

**Making software more disposable**
He calls this a new discipline:
- Isolated environments with no customer data or personally identifiable information.
- Enforced independence, such as no inbound API calls from other production systems.
- Redundancy: keep an old, clunky, durable backup so people can vibe code their own front ends.
- Limited scope: one user, one party.

**Making rigor cheaper**
The best lever is to reduce the cost of rigor, so a wrong guess about disposability is cheap to fix:
- Standardization removes possibilities. With no PHP, you need no PHP linters or security fixes. The same goes for frameworks and RPC protocols.
- Inward flow tooling runs without the programmer choosing to run it, and must be fast and reliable, with few false positives.
- Easy testing: every test fast and deterministic without expertise. Coding agents can now build in-memory fakes of services.
- Maximum strictness: turn every lint rule to maximum from the start rather than face a 100,000-line change later.

His answers: for disposable software, code quality does not matter; for durable software, it does; and it does not have to be expensive.

## Why it matters
- It grounds code quality in understanding and safe modification rather than taste, which gives a stable reason for it in the agent era.
- The four-factor test (consequences, cost of replacement, dependencies, cost of maintenance) lets teams decide how much rigor each system needs.
- It names engineering for disposability (isolation, independence, redundancy, scope) as a new practice, not an excuse for sloppy code.
- The cost-of-rigor levers, especially standardization and maximum strictness, turn quality into an up-front infrastructure investment that also covers disposable code.

## Metadata
- Video: https://www.youtube.com/watch?v=bU5gDVyu_28
- Duration: 16:23
- Playlist index: 1387
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> So, today I figured I'd just pick a nice uncontroversial topic that nobody has any opinions about. Right? Nobody nobody said anything on about on this about social media, you know, and of course every take about this on social media is like really deeply nuanced, you know, like people have lots of like depth and like, you know, really big thoughts. You know, maybe there's a little bit more to it than like yes or no. And you know, of course if you ever ask a senior engineer a question, we always have the same answer to every question, every senior engineer's favorite answer to every question, which is it depends. Now, that's not a very helpful answer though, frankly, because what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/bU5gDVyu_28.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
