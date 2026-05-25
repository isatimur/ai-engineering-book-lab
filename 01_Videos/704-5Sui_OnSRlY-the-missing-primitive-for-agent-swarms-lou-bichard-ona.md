---
video_id: 5Sui_OnSRlY
playlist_index: 704
title: "The Missing Primitive for Agent Swarms — Lou Bichard, Ona"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=5Sui_OnSRlY"
duration: "18:37"
duration_seconds: 1117
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/5Sui_OnSRlY.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-05-24T23:36:48+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Lou Bichard, field CTO at Ona (a cloud dev environment platform), identifies coordination — not runtime, orchestration, or triggers — as the unsolved primitive that prevents software factories from working. He distinguishes three agent fleet patterns (swarms, fleets across repos, event-driven), shows Stripe's 'minions' and Ramp's 'inspect' infrastructure as real-world examples, and argues GitHub is a poor coordination layer for agents because it becomes overwhelmingly noisy. His diagnosis: the SDLC has micro-steps agents don't understand, context rot causes agents to skip steps, and there's no agent-native coordination primitive yet — though state machines and durable execution are the most promising building blocks."
---

# The Missing Primitive for Agent Swarms — Lou Bichard, Ona

## Summary

Lou Bichard is the field CTO at Ona — a platform that has provided cloud development environments for about 6 years and has been integrating agent infrastructure for the last 1–2. He's been trying to build software factories and is presenting the gaps he's actually hit.

**Defining a software factory**

Bichard is careful about the term: his definition is not "one engineer running lots of agents in parallel." It's the commitment to incrementally removing the human from the SDLC loop such that work flows from development to production with decreasing human initiation. He acknowledges this is still very early.

**Three patterns for agent fleets**

- **Swarms**: Fan a single intent out to multiple agents, funnel results back to a single PR or task. The classic sub-agent pattern.
- **Fleets**: Spin agents across multiple repositories inside an organization — CVE remediation, bumping test coverage, enforcing patterns at scale. Ona has had this capability for a while. Stripe's "minions" and Ramp's "inspect" are public examples of this at serious scale (Stripe's minions drive thousands of PRs).
- **Events**: Webhook-triggered agents — PR raised, Linear ticket created, CI fails. Existing infrastructure handles most of this.

**What's solved vs. what's missing**

Bichard walks through the infrastructure checklist: runtime (solved — containers, VMs, dev environments), orchestration (solved — Kubernetes, horizontal scaling), triggers (solved — webhooks). The gap is **coordination**: how agents interact with each other, pick up tasks, signal completion, and handle failures without a human in the loop.

GitHub is not a coordination layer for agents. It becomes unmanageable noise when agents raise PRs, fix merge conflicts, update CI, and respond to comments. Symphony (OpenAI's internal system, built on Linear) has the same problem — it reuses human ticketing tools in ways that don't scale to agent volume.

**Why agents fail at software factories today**

Context rot: the conceptual SDLC has five coarse boxes (plan, build, test, review, deploy). Real SDLCs have dozens of micro-steps per box. Agents don't understand this granularity, and as context fills, they skip steps — they're sycophantic, wanting to report completion rather than do thorough work. Every step of the factory needs to be broken into micro-steps, encoded as context, and enforced.

**The coordination solution space**

State machines + durable execution (durable workflow patterns from Temporal/similar) are the most promising building blocks. Bichard is also prototyping a CLI-based coordination gateway: a local CLI tool that agents can invoke to ask "have I completed this SDLC stage, and can I proceed?" This would be packaged as a standard the community can build on, separate from any specific implementation. He mentions ACPX (from the previous talk), a GitHub workflow tool called Fabro, and graph-based workflow definitions (n8n-style, mermaid-like) as other approaches people are trying.

**The UX challenge**

As sub-agent hierarchies grow (parent VM spawning multiple child VMs), the UI problem becomes pressing: how do you visualize what dozens of agents are doing, when to intervene, and which one needs you? Ona's demo shows a split view — process-level sub-agents collapsible in a single window, and VM-level sub-agents as separate sessions on the left sidebar. Neither is fully solved.

## Why it matters
- The runtime/orchestration/triggers-are-solved, coordination-is-not framing is the clearest current diagnosis of where software factory infrastructure actually stands.
- The Stripe minions and Ramp inspect examples are rare public confirmation that at-scale fleet agents (thousands of PRs) are real production deployments, not hypotheticals.
- The SDLC micro-steps observation explains a common agent failure mode: agents skip steps not from incapability but from context pressure and sycophancy — encoding micro-steps explicitly into agent context is the fix.

## Metadata
- Video: https://www.youtube.com/watch?v=5Sui_OnSRlY
- Duration: 18:37
- Playlist index: 704
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> Cool. All right. Hello everyone. We're getting to the back end of the conference. I don't know if that's a good thing or not for you. Start the weekend or maybe sad that the conference is over. So, going to be talking about the the missing primitive for agent swarm. So, talking a bit about sub-agents and swarms within the context of of coding agents and the infrastructure underneath them. So, just a quick introduction. So, my name is Lou. I'm the field CTO at a company called Owner. Previous life, I was principal engineer and sort of platform engineer. Joined Owner doing product management and now I'd work a little bit more with our sort of customers on the field side. So, in my world at...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/5Sui_OnSRlY.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.
