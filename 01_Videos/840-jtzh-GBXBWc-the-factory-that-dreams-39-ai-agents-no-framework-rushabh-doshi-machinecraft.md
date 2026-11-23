---
video_id: jtzh-GBXBWc
playlist_index: 840
title: "The Factory That Dreams: 39 AI Agents, No Framework - Rushabh Doshi, Machinecraft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jtzh-GBXBWc"
duration: "9:58"
duration_seconds: 598
view_count: 1500
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/jtzh-GBXBWc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rushabh Doshi runs Machinecraft, a 100-person thermoforming machine factory in India with no data science team, and describes the company brain it built to run its entire go-to-market. No model was trained: hundreds of gigabytes of quotes, drawings and emails became vectors and a graph, served by a pantheon of single-job agents (36 in the talk) through 213 tools over one protocol. Layered memory, a nightly dream cycle and a soul file drawn from Jain family-business principles keep it coherent. The agents draft, humans send. Agency quote: 230 grand; actual build: around 30."
---

# The Factory That Dreams: 39 AI Agents, No Framework - Rushabh Doshi, Machinecraft

## Summary
Rushabh Doshi runs Machinecraft, a 100-person factory in India that makes thermoforming machines. It has no data science team and no ML budget, yet it built a multi-agent system that runs its entire go-to-market. His thesis: a company's real asset is its knowledge, and an off-the-shelf model on top of well-organized memory can hold that knowledge so it stops walking out the door.

**The problem: knowledge in three brains**
For three generations, who the customer is and what they were quoted in 2019 lived in his grandfather's, his father's and now his own head. Every departing employee took a chunk of that knowledge with them. "We weren't scared of the competitors, we were scared of forgetting." The same machine serves seven markets with seven kinds of buyer, from hydroponic trays to EV car panels, so the system must know which world each customer lives in.

**No training, just memory**
They fed in hundreds of gigabytes of private history: quotes, drawings, payment schedules, timelines and email threads. They never trained or fine-tuned a model. Off-the-shelf models read chunks and extracted facts, stored as vectors plus a relationship graph. "The brain isn't a smarter model." It is a well-organized memory, framed in biological terms: senses, a gut that digests documents, memory, a dream cycle and an immune system against bad information.

**A pantheon, not a mega-prompt**
One prompt that does everything does everything badly, so each agent has exactly one job. The talk names 36 agents (the title says 39). Athena runs the room, Prometheus owns the sale, Plutus does pricing, Hephaestus knows every machine spec, Vera fact-checks and Memnon guards corrections, so a human fix stays fixed. Athena convenes the specialists, they argue, and one answer comes out.

**What it runs and how**
It does nine daily jobs, including outbound email, pre-call account briefs, quotations, a swipe-left/swipe-right outreach mode, dead-lead revival and inbound fit checks. It all lives in one Cursor tab. The stack has vector, graph and CRM databases, three model providers each chosen per job, monitoring, and 213 tools exposed over one protocol. The rule is fixed: the system drafts, a human sends.

**Layered memory and the dream cycle**
Memory has layers: working memory, pinned facts, episodes, relationships whose warmth grows from stranger to trusted, and a salience gate that decides what is worth keeping. When facts disagree, corrections win. Each night a sleep cycle replays the day, consolidates, hunts contradictions, forgets stale data and turns work into reusable skills, then leaves a morning dream report.

**A soul file and the cost**
Each agent's conscience is a soul file based on Jain family-business principles, turned into rules: cross-check because no source has the whole truth, cite document and date, do your own job, report ugly truths, nobody works alone. There was no training bill. An agency quoted 230 grand; they built it for around 30, and it costs a couple of thousand dollars a month to run. The architecture now ships blank and forkable as Brain OS.

## Why it matters
- It is a rare case study of a non-tech SME running a production multi-agent system with no ML staff and no fine-tuning, which shows retrieval plus memory engineering can carry a whole business function.
- The one-agent-one-job roster, with a dedicated corrections guardian and a fact-checker, is a concrete pattern for chapters on multi-agent decomposition.
- The layered memory design (salience gate, corrections win, nightly consolidation and forgetting) gives a specific blueprint for long-lived agent memory.
- The draft-only rule and a values-based soul file show how a small company encodes guardrails as plain rules rather than generic helpfulness prompts.
- The cost figures (no training bill, around 30 grand versus a 230 grand quote, a couple of thousand a month) are useful evidence on build-versus-buy economics.

## Metadata
- Video: https://www.youtube.com/watch?v=jtzh-GBXBWc
- Duration: 9:58
- Playlist index: 840
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Okay, I want to tell you a story about a factory that taught itself how to remember. Hi, I'm Rushabh. I run Machinecraft, a 100 people factory in India. No data science team, no ML budget, none of that. And somehow we ended up building a 36 AI agent that runs our entire go-to-market. I think that's still a little ridiculous. Let me show you how it happened and why you can do the same thing. So, here's the thing about our company. From the outside it looks like machines and metal. But the actual company, the part that matters, isn't the machines, it's the knowledge. Who the customer is, what we quoted them in 2019, why that one machine needed that weird custom tweak. And for three...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jtzh-GBXBWc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
