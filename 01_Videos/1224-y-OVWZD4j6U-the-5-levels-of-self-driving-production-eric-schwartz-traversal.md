---
video_id: y-OVWZD4j6U
playlist_index: 1224
title: "The 5 Levels of Self-Driving Production — Eric Schwartz, Traversal"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=y-OVWZD4j6U"
duration: "18:33"
duration_seconds: 1113
view_count: 7100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/y-OVWZD4j6U.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T17:38:42+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eric Schwartz, product manager at Traversal, argues that coding agents shrink development but grow troubleshooting: more code ships with less understanding, so on-call teams drown. His thesis is that root cause analysis is a causal problem, not an observability problem. He lays out five levels of 'self-driving production', from manual war rooms to a closed loop that finds, fixes and verifies incidents, and backs it with case studies: Pepsi engineers with 700-alert backlogs, and American Express incidents where an agent posts a root cause in Slack within 3 minutes instead of paging 50 engineers."
---

# The 5 Levels of Self-Driving Production — Eric Schwartz, Traversal

## Summary
Eric Schwartz is a product manager at Traversal, which builds an AI site reliability engineer (AI SRE). He has no formal computer science training and now ships production code with coding agents. That is his starting point: agents make development faster, but the time they save does not flow to design. It flows to troubleshooting. More code ships, people understand less of it, and environments grow more complex.

**The troubleshooting squeeze**
Schwartz splits software work into system design, development and troubleshooting. Coding agents shrink the middle bucket. The enterprises Traversal serves spend more time on the third. He cites figures of upwards of $400 billion a year in enterprise spend, 40% of executives naming it a problem, and engineers losing seven or more hours a week on call. Observability tools tell you what broke and what correlates, but not why. A failing checkout API can sit five to 10 hops and dozens of services away from its cause, such as an expired TLS certificate. No single engineer holds that context in a large enterprise, so a war room of 50 engineers forms.

**Causal, not observational**
Traversal's founders come from academia and quant finance and work on causal machine learning. The company's bet: root cause analysis is a cause-and-effect problem.

**The five levels**
Modelled on autonomous driving:
- Level 0: fully manual Slack or Zoom war rooms.
- Level 1: rule-based automations and agent loops. These break on novel incidents that have no runbook.
- Levels 2-3: more automation, up to a homegrown agent that debugs one service or alert set well.
- Level 4: diagnosis across an entire environment of hundreds of services and repos and thousands of log indexes. This is the hard leap.
- Level 5: diagnose, put up a fix and verify it, without paging anyone.

**Case studies**
At Pepsi, supply-chain teams got thousands to tens of thousands of alerts a week, and one engineer could carry a backlog of 700. Traversal now pre-investigates alerts and suggests rule changes, dismissals or tickets. At American Express, an incident used to page five to 10 teams and 20 to 50 engineers. Traversal is now first responder: within 3 minutes of a bridge being declared it posts a root cause analysis in the incident Slack channel, so few or no teams get paged. Traversal claims 80%+ root cause accuracy on high-severity incidents across trillions of logs and spans.

**Five buyer questions**
Can the AI SRE see all production data? Can it search petabytes without blowing up cost or taking down observability infrastructure? Can it map relationships between entities? Does it improve on its own, without teams maintaining markdown files or forward-deployed engineers? Can it make multiple hops in minutes? Past 5 minutes, on-call teams lose patience and fall back to old habits. Traversal's answer is a "production world model" of entity relationships plus a "causal search engine" that serves as the agents' search harness.

## Why it matters
- It names the second-order cost of coding agents: faster code generation moves the bottleneck to incident response and code nobody fully understands.
- The five-level ladder gives a clean way to describe how far an agent loop runs without humans, and locates the hard step at cross-environment diagnosis (level 4).
- The 5-minute patience limit is a concrete latency budget for any agent that sits in an on-call workflow.
- The buyer questions double as an eval checklist for operations agents: data coverage, search cost, entity mapping, self-improvement, multi-hop reasoning.
- It argues that tribal knowledge held in markdown files does not scale, and that a learned world model of the system should replace it.

## Metadata
- Video: https://www.youtube.com/watch?v=y-OVWZD4j6U
- Duration: 18:33
- Playlist index: 1224
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hey everybody. Um, my name is Eric. I'm a product manager at Traversal and today we're going to talk about self-driving production. So, just a quick primer on what I'll cover. Uh I'm going to talk a little bit about how AI agents are changing the software development life cycle. Uh the problems that that introduces for engineers and how AI for site reliability engineering fits in uh which is where traversal comes into play. And then I'll talk about a few examples of um what this looks like in practice for enterprises that we work with at Traversal uh and a bit about how we've built our AIS surre uh to deliver the results that we're seeing with Fortune 500 companies. So uh I guess to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/y-OVWZD4j6U.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
