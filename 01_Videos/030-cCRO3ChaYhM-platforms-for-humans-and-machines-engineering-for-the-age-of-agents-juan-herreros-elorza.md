---
video_id: "cCRO3ChaYhM"
playlist_index: 30
title: "Platforms for Humans and Machines: Engineering for the Age of Agents — Juan Herreros Elorza"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=cCRO3ChaYhM"
duration: "21:15"
duration_seconds: 1275
view_count: 2273
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/cCRO3ChaYhM.txt"
themes:
  - "Coding Agents"
  - "Org Design & Leadership"
ingested_at: "2026-04-24T10:50:47+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Juan Herreros Elorza, team lead for cloud native technology at Banking Circle (over 1 trillion euro a year in payments), argues that 'best practices are still best practices': the friction that slowed human developers on an internal platform makes it nearly impossible for a coding agent, which cannot walk to another floor to ask for help. His checklist for the company's Atlas platform: make it self-service with no human in the loop, API-based with schemas and auth, local-first so failures shift left, observable and documented through APIs and agents.md files and skills, open to guarded contributions, and measured before and after. AI is also the excuse to finally ship these practices."
---
# Platforms for Humans and Machines: Engineering for the Age of Agents — Juan Herreros Elorza

## Summary
Juan Herreros Elorza leads the cloud native technology team at Banking Circle, a cross-border payments provider that processes over 1 trillion euro a year and serves over 700 regulated financial institutions. More than 250 people there build technical systems, so the company runs Atlas, an internal platform with sub-platforms for Kubernetes compute, infrastructure (blob storage, databases, secrets), messaging and observability.

**The story that frames the talk**
A new developer writes a good payment application, then hits a wall. A teammate says copy an old pipeline. It fails with an error unrelated to the code. Someone in the infrastructure team fixes it "just for you". Then the developer learns they also need a database, and the infra person can help "next week". That is bad for a person. For a coding agent it is "essentially impossible", since the agent will not go "up to the second floor" to ask. His thesis: "best practices are still best practices." These pains were never good; agents just make them more obvious.

**What an agent-ready platform needs**
- **Self-service**: no process that needs a specific person. It must also be intuitive; if the agent must fetch building blocks from five places, "it's not really self-service."
- **API-based**: agents are good at calling well-defined APIs. A CLI or MCP server on top is fine, but underneath there should be an API that is discoverable, has schema validation and has authentication and authorization, so the agent can loop until it succeeds.
- **Local-first and shift left**: the agent works on your machine, so fail as early as possible. Do not make it push to version control and wait minutes for a workflow to fail.
- **Define success**: give precise instructions and tell the agent how it will know it succeeded.
- **Observability for agents**: agents do not look at dashboards, so expose logs, metrics and traces through an API, CLI or MCP server to let the agent "close the loop."
- **Documentation**: keep docs next to code in small repos; for a platform, centralize them and serve the relevant bits over an API instead of whole HTML pages. Add agents.md-style files (general plus per-repo) and skills to codify conventions.
- **Contributions with guardrails**: agents lower the barrier to contributing to the platform, which he has seen happen. It is "a double-edged sword" because the platform team owns maintenance. Use policies for what must never happen, and markdown context to steer agents on the rest.

**Measure it**
Compare before and after: delivery metrics (change frequency, mean time to recovery, lead time), reliability (a top concern in fintech), platform metrics such as support request volume, and developer-experience frameworks. Decide the goal first, then check if you hit it.

**Closing advice**
If your organization resisted API-first, local-friendly platforms or proper documentation, "take advantage". Everyone from executives to individual contributors now watches AI, so use it as the excuse to ship practices that were always right.

## Why it matters
- Reframes agent readiness as ordinary platform engineering hygiene, with a regulated fintech as the case.
- The new-developer story is a vivid test: any step that needs a hallway conversation blocks an agent completely.
- Gives a concrete checklist (self-service, API with schemas and auth, local-first, agent-readable observability, structured docs, guarded contributions) a platform team can audit against.
- Ties agent enablement to measurable outcomes, including support request volume as a platform-specific signal.
- The "use AI as the excuse" point is a practical lever for platform leaders seeking budget for overdue work.

## Metadata
- Video: https://www.youtube.com/watch?v=cCRO3ChaYhM
- Duration: 21:15
- Playlist index: 30
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Org Design & Leadership]]

## Transcript excerpt
> Hello everyone. Thank you very much for watching and welcome to my talk platforms for humans and machines. My name is Juan and I work as the team lead for the cloud native technology team in a company called Banking Circle. You probably don't know about us, so let me tell you just a bit about what we do. Mainly we are a global cross-border payments provider uh on top of accounts and liquidity management. We provide we process over 1 trillion euro per year and we provide banking services to over 700 regulated financial institutions. We are very much a fintech and in fact a lot of us are working within some capacity of engineering. Because of that some years ago we decided to establish a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/cCRO3ChaYhM.txt]]
- Description cue: As AI coding agents become first-class users of internal developer platforms, the practices that make platforms accessible to humans turn out to be the same ones that enable AI to thrive.
...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://speakerdeck.com/jherreros/platforms-for-humans-and-machines-engineering-for-the-age-of-agents>
