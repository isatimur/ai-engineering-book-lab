---
video_id: 1EZdpEhwmNc
playlist_index: 903
title: "Through the AI Fog: The Architectural Decision Agentic Security Depends On — Manoj Nair, Snyk"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=1EZdpEhwmNc"
duration: "23:29"
duration_seconds: 1409
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/1EZdpEhwmNc.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
  - "MCP & Tooling"
  - "Security & Guardrails"
ingested_at: 2026-07-26T22:21:41+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Manoj Nair, Snyk's Chief Innovation Officer and CTO, opens the first World's Fair security track with one architectural claim: the generator and the validator cannot be the same. Using data from Snyk's roughly 5,000 enterprise customers, he shows backlogs up 108% quarter over quarter, poisoned skills and MCP servers, agents that squirrel away copies of PII, and three agentic components per model found in repos. A new benchmark found the latest models catch the same vulnerability in only 50% of five runs, so LLMs must pair with deterministic checks. Ezra Tanzer demos package-health and skill-risk checks."
---

# Through the AI Fog: The Architectural Decision Agentic Security Depends On — Manoj Nair, Snyk

## Summary
Manoj Nair is Snyk's Chief Innovation Officer and CTO, introduced as having led product and security at HPE, Dell and RSA. He helped curate this first security track at the World's Fair. His team secures about 5,000 enterprise customers, and much of the talk is their data. His one takeaway is a question security has rarely asked until now: can the generator and the validator be the same? His answer is no.

**Three problems customers raise**
- Autonomous attacks: every frontier lab's models have been used in automated attacks, and good context plus a good harness yields an attacker that never sleeps, even without frontier models. Fixing only criticals and highs no longer works, because low-severity bugs can be chained into exploits.
- Untrusted output, environment and behavior: AI code quality is a little worse than human code; skills and MCP servers are being poisoned; and agent behavior adds new risk on top.
- New threat surface: every company building with agents and models gains a surface that prior security never covered.

**The data**
Across 4,800-plus customers, backlog grew 108% quarter over quarter despite the best agents. He cites a Five Eyes warning that AI will bypass security systems in months, not years. Research found more than a third of skills carry malware or vulnerabilities; "three lines of English" can bring a system down. After a GitHub MCP server exploit Snyk flagged a year ago, some customers shut down all MCP servers. In Fortune 100 environments, agents made untracked database copies of shared PII "just in case", creating attack surface outside enterprise coverage. Across 3,000-plus customers, each model found in a repo comes with three times more agentic components.

**Independent verification**
Snyk's red-teaming of new models shows risk varies by test. Two frontier models resisted PII extraction while a hot new open model leaked PII 100% of the time, yet on decision override the frontier models did worse and the open model resisted fully. On a fresh, untrained-on benchmark, the latest models found the same vulnerability only 50% of the time across five runs, found 75% of the issues a deterministic check found, and scored 40% F1. The lesson: use LLMs for what deterministic checks cannot reach, not as the whole system.

**What Snyk offers**
Security context inside the agent loop blocks unhealthy or malicious packages and injection-prone code. A remediation agent that understands breakability took Labelbox to zero backlog once and helped one large company fix 16,000 critical issues, announced the week before. A newly GA agentic dev security offering covers environment, output, skills, MCP servers and coding-agent behavior. AI governance, he says, cannot live in a Confluence page or PDF.

**Demo**
Ezra Tanzer has Claude build a QR-code CLI using a package health tool: both candidates have no CVEs, but one is unmaintained and ten years old, so a future patch is less likely. A skill-risk scan of a shared competitive-analysis skill finds four issues, including echoing the authorization header and loading rules from a remote YAML file that could change under you. Nair closes on Evo, built around an observe-orient-decide-act loop, to give AI security engineers a 10x superpower.

## Why it matters
- States a clear architectural rule for agentic security: separate the generator from the validator, backed by run-to-run variance data on vulnerability detection.
- Customer-scale numbers (108% backlog growth, three agentic components per model, PII copies by agents) quantify how agents widen enterprise attack surface.
- Red-team results showing models strong on one attack class and weak on another argue for per-use model selection and independent verification.
- The remote-YAML skill example shows how a skill can change behavior without its file changing, a concrete supply-chain risk.
- Warns that severity triage breaks when attackers can chain low-severity bugs with automated harnesses.

## Metadata
- Video: https://www.youtube.com/watch?v=1EZdpEhwmNc
- Duration: 23:29
- Playlist index: 903
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]
- [[MCP & Tooling]]
- [[Security & Guardrails]]


## Transcript excerpt
> [music] >> What's up, everyone? Good to see you all here in the very first ever security track at the World's Fair. Um pretty exciting day, honestly, because uh like all of you, I genuinely love this stuff, and having looked through the agenda for the speakers we have today, um it's going to be absolutely mind-blowingly useful and fun information. So, hopefully if you stick around all day, by the end of the day, you'll be able to leave here, go back to your hotel rooms, and build some genuinely cool software, hopefully without humans in the loop, because that's the ultimate goal, right? Like, how do we build truly safe autonomous software at scale? And it's not something easy to do. So,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/1EZdpEhwmNc.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **MCP & Tooling**.
- Could support a chapter/section on **Security & Guardrails**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://labs.snyk.io/contributors/manoj-nair>
