---
video_id: "LU9KgcZDRfY"
playlist_index: 53
title: "Small Bets, Big Impact Building GenBI at a Fortune 100 – Asaf Bord, Northwestern Mutual"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LU9KgcZDRfY"
duration: "22:50"
duration_seconds: 1370
view_count: 6543
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/LU9KgcZDRfY.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T10:51:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Asaf Bord of Northwestern Mutual, a 160-year-old, risk-averse insurer, shows how his team funded GenBI, an agent that answers business questions with data, through small, incremental bets instead of a moonshot. They used real messy data and real BI users, released first to BI experts, began by surfacing certified reports instead of writing SQL, and ran six-week phases that each shipped something leadership could productize or stop. A four-agent pipeline (metadata, RAG, SQL, BI) came out of it; the report-finding agent alone automated about 80% of the report-routing work that took 20% of a ten-person BI team."
---
# Small Bets, Big Impact Building GenBI at a Fortune 100 – Asaf Bord, Northwestern Mutual

## Summary
Asaf Bord works at Northwestern Mutual, a 160-year-old life insurance and wealth management firm. GenBI, in his words, fuses GenAI and BI: an agent that answers business questions with data, as a BI analyst would. The goal is data democratization. The company has data, money, use cases and talent, but it is very risk-averse, because it sells commitments that last decades. His thesis: in such a company you do not get a million dollars for a moonshot, so you build trust through small bets that each deliver value.

**Four challenges**
No one had built GenBI this way before. The team chose real, messy data on purpose. Users and leadership had to trust the answers. And leadership had to fund something with an unknown end state.

**Real data, real users**
Working with real data gave confidence that what worked in the lab would work in production. Working with the people who use the data daily gave subject matter expertise, real questions and answers (in effect, the evals), and business buy-in. When parts matured, users pulled them into production.

**Building trust**
- Crawl, walk, run: release first to BI experts, who know what good looks like, "kind of like a GitHub Copilot". Then release to business managers who can spot errors. Executives come last, and maybe never, since the system is "not accurate enough."
- No SQL at first. BI teams said about 80% of their work is sending people to the right certified report. So the system first returns existing, verified assets.
- Funding in six-week phases, each with a tangible deliverable and a point where leadership could "pull the plug." This removes sunk-cost bias. If a vendor tool such as Databricks Genie gets good enough, the team already has benchmarks to test it.

**The roadmap**
Research on natural language to SQL. Then defining good metadata and context for a BI agent. Then multi-context semantic search, packaged as a data finder and data-owner finder (a search that takes two to four weeks by hand). Then light pivoting, then role-based enterprise access, and finally a full agent that writes its own SQL and joins.

**Architecture**
Dumping a schema into ChatGPT fails: schemas are messy, and governance is hard to apply from outside. The stack has a data and metadata layer and four agents under an orchestrator. A metadata agent reads the catalog and docs for context. A RAG agent finds a certified report. A SQL agent writes a query when needed, seeded by the nearest report's query as a close few-shot example. A BI agent turns results into a business answer. Each agent can ship as its own product.

**Results**
The RAG agent automated about 80% of report-routing work, which took about 20% of a ten-person BI team, roughly two full-time jobs. An A/B test with and without rich metadata proved to leadership that metadata enrichment has measurable value. A data-pivoting bot is in trials.

**Closing thought**
He asks how SaaS should be priced when one person can be 10x more effective: per seat, per use, or per value. He notes Salesforce Data Cloud moving to usage pricing.

## Why it matters
- A repeatable funding pattern for risk-averse enterprises: six-week phases, each with a deliverable and an exit point, which removes sunk-cost bias.
- Starting with certified reports instead of generated SQL is a concrete way to ship a trustworthy data agent before accuracy is solved.
- Releasing by user expertise (BI experts, then managers, then maybe executives) matches rollout to each group's ability to catch errors.
- The metadata A/B test turns a vague "add documentation" ask into a measured result, and the in-house benchmarks double as a vendor-evaluation tool.

## Metadata
- Video: https://www.youtube.com/watch?v=LU9KgcZDRfY
- Duration: 22:50
- Playlist index: 53
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [music] Doesn't this look like something's going to drop from the ceiling? Like a ground zero type thing? [snorts] Be honest. It's like who has the buzzer that if I'm I really suck, they press it and everything falls down through the trap door. No. >> Be careful. >> Yeah. Okay. Who was it? >> Okay. You tell me if I'm doing okay or if I should take a couple of steps back. Right. So, hi everyone. I'm Assaf. Um, and I'm here to talk about Genbi. And kind of first disclaimer, this presentation was not created with Gen AI. Um to be honest, I actually started doing it uh with uh GPT03 back in August. [snorts] Uh and then I did kind of a first draft and then a couple of weeks back I wanted to come...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LU9KgcZDRfY.txt]]
- Description cue: Enterprises don’t usually make moonshots, especially in GenAI. Governance, budgets, and risk aversion make it almost impossible to justify a huge, uncertain investment.

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://asafbord.wixsite.com/home>
