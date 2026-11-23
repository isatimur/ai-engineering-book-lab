---
video_id: yWS0udrIOc8
playlist_index: 902
title: "Agentic Security: Permissions, Provenance, and the Agent Supply Chain — Steve Yegge, Gas Town"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=yWS0udrIOc8"
duration: "22:32"
duration_seconds: 1352
view_count: 1200
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/yWS0udrIOc8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "MCP & Tooling"
ingested_at: 2026-07-26T22:21:40+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Steve Yegge, creator of Gas Town, says the real title of his talk is 'be scared'. If AI lets everyone ship code 10 times faster at the same vulnerability rate, the defect surface grows 10x, and new attacks such as slop squatting on hallucinated package names are already here. Security bugs, unlike others, have no half-life of urgency, so they must be surfaced to the LLM at generation time. Models do one thing well per pass, so security needs its own pass, first and last, using scanners and vetted image supply chains as tools the model will happily call."
---

# Agentic Security: Permissions, Provenance, and the Agent Supply Chain — Steve Yegge, Gas Town

## Summary
Steve Yegge, the creator of Gas Town, speaks on behalf of the track's sponsor (unpaid, he notes). The listed title is agentic security; the real title, he says, is "be scared". His opening story: a big bank's chief security architect asked him that if everyone ships code 10 times faster and the vulnerability rate stays the same, the defect surface must grow 10x. Yegge had no full answer then and offers only a partial one now.

**Old bugs, new attack surfaces**
Models still write classic bugs; Fable wrote an XSS bug in his short time with it. New attack types are arriving too. His example is slop squatting: the model hallucinates a package name such as "graphy 123", an attacker has already published a package under that name that works as expected plus a backdoor, the build passes and the tests are green.

**Security bugs have no half-life**
From his time near Google's test automation platform team, he describes how bugs have a half-life of urgency: fixed at once if seen while typing, often ignored by code review. That is why Google moved warnings to the developer's fingertips. Security is the exception, because the risk compounds over time instead of fading. When the LLM is the developer, surface vulnerabilities to the LLM.

**One pass per concern**
Smart models do not make code secure by default. When Fable ran a security hardening pass on his 30-year-old game, the sponsor's scanner (captioned "Sneak") still found 241 vulnerabilities. His "rule of five": LLM work often needs four to five review passes, like painting a wall. Models do one thing at a time well, so asking for security and correctness together gets a half-done job of both. Elegance, performance and company standards are separate passes too. Security should be "your first one and your last one".

**Give the model tools**
From his essay Software Survival 3.0: LLMs are lazy in a good way and use tools whenever that saves tokens. So add a final pass to every prompt that runs all the security tools, open source and commercial, and has them check each other. Chain Guard covers inputs with pre-vetted, updated images; the scanner covers your code, the model's code and slop-squatted dependencies. He cites a Five Eyes warning that the threat is months away and polls the room on when open models catch up to Mythos, which he calls very good at hacking; a guess of about six to seven months comes back. He also urges people to refresh family code words against AI voice and video scams.

**Q&A**
AI is moving faster than society, and people judge the curve by looking three months back and forward. Gas Town is a beads machine; beads is a task tracker that lets agents claim queued work and run all night, and once an agent quietly implemented a batch of filed beads on its own. For 24/7 agents he urges adversarial supervisor agents and audits of service-account credentials, because one agent will eventually get it wrong. On prompt injection he has no good answers; it is an education problem, and agentic security roles will emerge.

## Why it matters
- The 10x-velocity, same-rate, 10x-surface argument is a sharp framing for why AI coding raises security stakes.
- Slop squatting is a vivid, AI-native supply-chain attack worth naming in any chapter on agent dependencies.
- The half-life-of-urgency idea explains why security findings must reach the agent at generation time, not at code review.
- The one-concern-per-pass rule, with security first and last, is concrete prompt-pipeline advice from a heavy agent user.
- Adversarial supervisor agents and credential audits for always-on agents point to an emerging agentic security role.

## Metadata
- Video: https://www.youtube.com/watch?v=yWS0udrIOc8
- Duration: 22:32
- Playlist index: 902
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[MCP & Tooling]]


## Transcript excerpt
> [music] All right. Hey everybody. Uh yeah, yep. Yep. Yep. Okay. I have about 18 minutes. Um I have a slide deck here that that Claude put together for me, but Claude still can't do very good slide decks, so I apologize for that. Just just just focus on me right right here. This is like the most fun thing to do ever. Now, if I if I start like running out of time, can can you like call time for me? All right, perfect. So, I'm Steve Yagi. I am here on behalf of Sneak today. I am not getting paid for this talk or anything like that. They were really nice enough to buy me a ticket to the conference, which is cool. But I'm mostly here because I wanted to hang out with all of you and I don't bite...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/yWS0udrIOc8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **MCP & Tooling**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/steveyegge/beads>
