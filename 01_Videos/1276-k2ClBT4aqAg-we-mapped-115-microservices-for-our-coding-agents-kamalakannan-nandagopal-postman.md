---
video_id: k2ClBT4aqAg
playlist_index: 1276
title: "We Mapped 115 Microservices for Our Coding Agents — Kamalakannan Nandagopal, Postman"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=k2ClBT4aqAg"
duration: "17:26"
duration_seconds: 1046
view_count: 5600
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/k2ClBT4aqAg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T19:43:55+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Kamalakannan (Kamal) Nandagopal, staff engineer at Postman, argues that in a microservices system APIs are the context layer for coding agents. Postman built an API context graph of every production service, endpoint, implementing line of code, service-to-service call and data path, with every fact grounded in code or production traces. Evals built from real PRs and design decisions show big gains over plain code search on API discovery, consumer input-shape analysis and impact assessment, at half to a third of the tokens. A stale graph failed one eval, showing freshness matters. About 75% of PRs in the top 10 repos touched APIs."
---

# We Mapped 115 Microservices for Our Coding Agents — Kamalakannan Nandagopal, Postman

## Summary
Kamalakannan Nandagopal ("Kamal") is a staff engineer at Postman. Behind Postman's cloud features sit more than 150 microservices (the title says 115) and thousands of REST endpoints spread across hundreds of repos. His claim: coding agents do well on greenfield work and single-project fixes, but distributed production systems need a shared context layer, and in a microservices architecture that layer is the API surface.

**Why the usual fixes fall short**
- Documentation: developers hate maintaining it, and research he cites says purely LLM-written and LLM-maintained docs "degrade exponentially over time" without human curation.
- Skills and MCPs: only as good as the context behind them.
- Agent memory: turns tribal knowledge into memory, but stays tied to one user. No standard way to share it across a team has emerged.

**The idea, borrowed from go-to-market**
Postman's go-to-market teams had built business agents on a RAG plus graph RAG pipeline that acted as one central context layer. Engineering asked what the equivalent is for code. In microservices, each service owns one domain responsibility, APIs define that responsibility, and API calls between services trace the workflows and user journeys.

**Building the API context graph**
They catalogued every production microservice and every endpoint, traced each endpoint to its exact implementing line of code, mapped service-to-service and endpoint-to-endpoint calls, followed data down to databases and caches, and mapped how front ends, CLIs and APIs hit the back end. An LLM indexed it all. The rule: every data point must be grounded in "a hard truth", either a line of code or a production telemetry trace. The resulting map showed a tight central cluster of tier 0 and tier 1 services and one or two bloated services at the edges.

**Evals from real history**
They turned real PRs (intent and actual outcome) and past design decisions into evals, with the decision taken as ground truth. They compared the Postman agent on the graph, Claude Code with plain GitHub code search, and Claude Code with the graph as a skill. Each run was scored 0 to 5 and the tokens counted.
- API discovery (which of many similar APIs returns a user's profile name?): the graph wins clearly over code search.
- API redesign: a developer shipped a free-form JSON property with a 'revisit in 2 weeks' TODO. Two weeks later it carries 15 attributes from an unknown number of services. With consumer awareness and code-level grounding, the Postman agent found each consumer's input shape and the reason for it. Claude Code with the skill did somewhat better than code search but gave up after enough turns.
- Impact assessment (designing a V3 from how V2 is used): best quality at half to a third of the tokens of code search.
- A failure: one PR impact eval inverted, scoring low and burning tokens, because new consumers appeared between writing and running the eval. A stale graph costs developer trust and usage. Detecting removed APIs matters as much as new ones.

About 75% of PRs in the top 10 repos changed an API's surface or added a new integration.

**New questions**
Asked for an end-to-end architecture review, the agent wrote a 21-page report: dependency cycles, risky long-running migrations, single points of failure, telemetry blind spots, and actions for the CEO, CTO and staff engineers. Next steps: add a business semantic layer and the reasons why data models and APIs exist. Cheaper analysis means it can run per PR or on the developer's machine, catching problems earlier.

## Why it matters
- It names a specific context source for coding agents in distributed systems, the API graph, and grounds every fact in code or production traces.
- The evals are built from real PRs and past design decisions with known outcomes, a reusable method for testing context layers against your own history.
- The token-versus-score comparison shows context quality changes efficiency as well as accuracy: half to a third of the tokens on impact assessment.
- The stale-graph failure is a concrete warning that context layers need continuous sync, including removals, or trust and usage drop.
- The 75% API-touching PR figure suggests cross-service context is a mainstream need for agents, not an edge case.

## Metadata
- Video: https://www.youtube.com/watch?v=k2ClBT4aqAg
- Duration: 17:26
- Playlist index: 1276
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Today I'm going to talk about how you can take your coding agents beyond code generation and how API context might be the answer for that. I'm Kamal. I'm a staff engineer at Postman. And Postman, as you might know, is the end-to-end API platform. But beyond the desktop app that allows you to test your REST APIs and build your APIs, uh Postman also has uh a lot of cloud features. Empowering all of those cloud features is an extensive microservices architecture. We have more than 150 microservices and thousands of uh REST API endpoints. Uh so, I'm going to be using our real uh engineering use cases and workflows and on top of our coding agent experiences and what we learned from it and how...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/k2ClBT4aqAg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
