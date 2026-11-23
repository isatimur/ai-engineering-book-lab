---
video_id: zCJtYuqwm7E
playlist_index: 1055
title: "Coding Agents Don't Scale Themselves. Neither Do Your Teams. — Patrick Debois, Tessl"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zCJtYuqwm7E"
duration: "22:06"
duration_seconds: 1326
view_count: 4700
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/zCJtYuqwm7E.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-25T01:52:40+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Patrick Debois (Tessl) gives an organizational talk, not a technical one: harnesses and loops will become a commodity, so the differentiator is how teams, platform groups and engineering leaders reorganize around coding agents. He compares today's 'dark factory' skepticism to 2009 doubts about continuous delivery. Core advice: stop fixing agent code and improve the system; run retros on system failures; measure human touches per task and reuse across teams; have platform teams own paved roads, skill registries, context evals and cost visibility; and treat captured knowledge as the moat, turning continuous delivery into continuous learning."
---

# Coding Agents Don't Scale Themselves. Neither Do Your Teams. — Patrick Debois, Tessl

## Summary
Patrick Debois of Tessl says up front that this is an organizational talk. In 2009 people told him continuous delivery was crazy; today he hears that the "dark factory" will not work here. He reads that as "we're not ready yet", not as a limit of the technology. Agent loops and harnesses will become commodity, maybe offered as a service by a frontier lab, so they will not differentiate an organization. What will is how the team, the platform and the wider organization change around agents, a Conway's Law effect.

**The team level**
Many developers "didn't sign up" for prompting and spec writing. Debois saw harness and loop work reignite them: building tooling for the agent is real engineering again. He suggests giving skeptics the job of improving context and harness, using their complaints about vanilla agent quality as fuel. The key shift is to stop fixing the code the agent produced and improve the system instead, echoing the idea of building "the thing that builds the thing". Engineering practice still matters: tell agents to write tests and update docs, and stop people "yoloing". Advanced teams change their rituals. Retros ask what in the system made the agent hit the same problem again. Planning splits well-scoped work, which goes straight to agents, from conversational work the team must decide. The team lead sets the pace: stop prompting, make context reusable, then move to the next step. Faster output also floods downstream groups such as GTM and users, and requirements may not arrive fast enough, so the harness must extend to them too.

**Two metrics**
He trusts two measures over token spend: the number of human touches needed to get the right result, which should fall as harness and context improve, and the reuse multiplier, where one fix to a shared system benefits everyone.

**The platform level**
Platform teams must add skill registries, eval systems for context, guardrails for coding agents and identities. Someone must own the program, because platform and developer-experience teams each lack part of it. Without an owner there are no paved roads, and shared skills sprawl into forks nobody maintains. Owners keep shared context testable, modular, extensible and security scanned. Consensus is hard, so expect a catalog of three or four paved roads; teams can go their own way "on their own budget". Platform teams should also make cost visible, since fewer agent iterations is an optimization only if you can see it.

**The organization level**
Hackathons, lunch-and-learns and champions programs are generic transformation tactics; "let a thousand flowers bloom" does not work. Give team leads and the platform the mandate. Job titles like AI engineer or forward deployed engineer "doesn't mean anything" as proof of skill. Hiring that works has three steps: an exercise where candidates use AI freely, a walk-through that tests taste and engineering judgment, and a check on whether they share and collaborate. To defend spend, show turns and reuse instead of hard-to-prove productivity claims, and optimize spend through model choice and better context instead of capping it. Teams still need about three people plus support and juniors.

**Dim factory and the moat**
The dark factory is "probably a dim factory": choose risk per feature and invest in audit, verifiers and situational awareness. The moat is captured knowledge in skills, context and harness, which turns continuous delivery into continuous learning. The real test is whether the system stays reliable while more of it changes.

## Why it matters
- Moves the coding-agent debate from individual productivity to team, platform and VP-of-Engineering design, with a concrete role for each level.
- Human touches per task and the reuse multiplier are two simple metrics a chapter can offer in place of token spend or licence counts.
- The retro reframe (fix the system, not the code) and the split planning backlog are rituals teams can adopt now.
- Names new platform duties for coding agents: skill registries, context evals, ownership against skill sprawl, and cost visibility.
- The three-step hiring process (AI exercise, walk-through, collaboration check) is a practical answer to the problem of meaningless AI job titles.

## Metadata
- Video: https://www.youtube.com/watch?v=zCJtYuqwm7E
- Duration: 22:06
- Playlist index: 1055
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Well, welcome. Um last day, I guess. That's what happens. Um I'm going to talk to you maybe not on the technical side, but more on the organizational side. So, if you're here for any technology, you can still leave if you want to. So, in 2009, um a lot of people were telling me the idea of continuous delivery was crazy. And I feel we're in kind of the same era or kind of the same thing right now with a dark factory. It will not work here. That's what I keep hearing over and over again. Um but what they're actually signaling to me, we're not ready yet. So, it's not the technology that can't make it work. It's not something they won't be able to do eventually, but they're just not...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zCJtYuqwm7E.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
