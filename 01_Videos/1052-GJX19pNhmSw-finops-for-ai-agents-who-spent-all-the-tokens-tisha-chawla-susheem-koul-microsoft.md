---
video_id: GJX19pNhmSw
playlist_index: 1052
title: "FinOps for AI Agents: Who Spent All the Tokens? — Tisha Chawla & Susheem Koul, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=GJX19pNhmSw"
duration: "21:24"
duration_seconds: 1284
view_count: 2200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/GJX19pNhmSw.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-25T01:52:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Tisha Chawla and Susheem Koul of Microsoft argue that agent cost control must move from 'token maxing' to 'value maxing', and from the model request to the agent run. Gateways cap and route single requests but cannot see runaway loops, sub-agent spawning or growing context. Their TokenOps design is an out-of-band control plane: a boundary annotation records each call in a per-run ledger with attribution, and the plane pushes steer actions (compaction, fewer retrieval chunks, 'be succinct' instructions) before a hard halt. On two open-source agent repos they report about 78% lower average spend and completion up from 67% to about 96% versus plain throttling."
---

# FinOps for AI Agents: Who Spent All the Tokens? — Tisha Chawla & Susheem Koul, Microsoft

## Summary
Tisha Chawla and Susheem Koul of Microsoft start from a common moment: you open the AI bill for your agent workflows and cannot trace where it came from. The industry now rewards "token maxing", and people call themselves "token billionaires". The talk argues for a shift to "value maxing": if someone spent the tokens, there must be value tied to them.

**Each era gets its own control plane**
SaaS controlled cost through the UI with seat limits and tiers. Cloud moved to pay-as-you-go with autoscaling policies. In the agentic era, cost comes from code calling models, and no proper control plane sits there. Model gateways offer hard caps and routing to cheaper models, but only per request. Chawla cites news of runaway loops and budgets exhausted in months, including Uber's AI budget running out within four months.

**First principles (Chawla)**
- The token is the unit of cost, so value must be measured in tokens too.
- Cost is created at the model-call boundary, so track it there.
- Without attribution (which agent and which run made the call) you see the total but cannot narrow it down.
- Policies should fix the cause in place, such as an excessive loop or runaway context. A budget-cap halt is the last resort.

Existing gateways such as Cloudflare's work at the request level. The missing piece is run-level control over the agent-tool loop, sub-agent spawning and context growth, with a cumulative budget across a run and enforcement in the call path.

**TokenOps architecture (Koul)**
The design is deliberately out of band, so it does not change your code. There are three layers: your agent runtime, a bridge, and a control plane that runs in your own tenant.
- **Bridge.** Attribution tags every run with user dimensions. A boundary annotation on any method, in any framework, sends input and output to a ledger with the run ID, and it is also the channel the control plane uses to push actions down. A governor holds the developer-declared allowed actions and applies them non-destructively. A wrap helper applies the boundary to SDK objects instead of methods.
- **Control plane.** Segments group runs by dimension, for example a cohort tag for a preview agent shared with an audience, so budgets roll up. The ledger holds each run's traces. Budgets are thresholds over a time window. Actions are either halt (kill) or steer (allow, mutate, inject). Policies bind budgets and actions to segments.

His steer example: a RAG tool returns 20 chunks, but the model never uses those after the fifth, so the plane limits output to five.

**Demo and results**
A two-agent workflow (a researcher with unlimited web search, then a summarizer) runs three ways. Preview mode runs policies without enforcement, so you can tune thresholds safely in production. Enforced mode kills a run that exceeds its cap, a circuit breaker. Steer mode uses a cost guard that watches budget consumed and token velocity. If it predicts overrun, it injects an instruction to keep outputs succinct. They benchmarked the full policy set on browser-use and a second open-source multi-agent repo. Average spend fell about 78%, and completion rose from 67% under simple throttling to about 96%. The policy catalog covers spend, context compaction, tool-output reduction, loop detection and progress detection. Next, they plan a self-learning module that mines the ledger for uncaught failure modes and generates or tunes policies.

## Why it matters
- Moves the cost-control question from the model request to the agent run, which is where loops, sub-agents and context growth actually burn tokens.
- The steer-before-halt idea is a concrete alternative to hard caps: reshape the run to fit the budget instead of killing it, with reported completion gains over throttling.
- Per-run attribution and cohort segments give a practical answer to 'who spent all the tokens?' for chargeback and budgeting.
- Preview mode (policies evaluated but not enforced) is a reusable rollout pattern for any production guardrail.
- The 78% and 96% figures come from the presenters' own benchmark of their own tool, so treat them as indicative.

## Metadata
- Video: https://www.youtube.com/watch?v=GJX19pNhmSw
- Duration: 21:24
- Playlist index: 1052
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Okay. Um, good morning everyone. So, um, I'm Tisha and I have Sushim with me as my co-presenter. All right. So, we'll be talking about the most expensive question in AI today. I think a lot of you would have come across the scenario that um you know when you opened an AI bill like through your agent workflows um you couldn't actually trace back where that bill was actually coming from right and um and I don't think that's a problem right now because right now the industry is valuing you know um token maxing that is like spending the most amount of tokens for exploration for all of those purposes And um people are proud to call themselves token billionaires and um I think that's all...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/GJX19pNhmSw.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://dev.to/tisha>
