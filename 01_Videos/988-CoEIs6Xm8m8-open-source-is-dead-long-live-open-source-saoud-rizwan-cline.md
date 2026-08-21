---
video_id: CoEIs6Xm8m8
playlist_index: 988
title: "Open Source Is Dead. Long Live Open Source. — Saoud Rizwan, Cline"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CoEIs6Xm8m8"
duration: "17:30"
duration_seconds: 1050
view_count: 1800
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/CoEIs6Xm8m8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-14T11:35:42+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Saoud Rizwan (Cline) argues AI has broken open source's community trust, citing Zig's AI ban, the LiteLLM supply-chain attack, and open-weight models like GLM undercutting closed-lab lock-in."
---

# Open Source Is Dead. Long Live Open Source. — Saoud Rizwan, Cline

## Summary
Saoud Rizwan, founder of Cline (which he describes as the first coding agent, predating Claude Code and Codex subscriptions, from an era when users paid per API call before prompt caching), argues AI has broken open source's community layer. He cites Zig (the language behind Bun) banning all AI use on pull requests, issues, and comments to protect contributor trust over raw contributions; curl's CEO reporting AI-generated bug reports overwhelming the project and considering ending its bug-bounty program; tldraw auto-closing all pull requests regardless of origin; and GitHub adding a feature to disable third-party pull requests entirely. As a supply-chain example, he describes the LiteLLM package (3.5 million downloads/day) being compromised for three hours via a stolen PyPI publishing token, shipping a credential harvester and remote-code-execution backdoor that was caught only because a bug in the malware crashed Cursor's LiteLLM MCP server. Citing secondhand reports — an anonymous CFO's $500M single-month Claude bill, Uber's CTO stating 95% Claude adoption and a full year's AI budget spent in four months, and a SemiAnalysis test finding $200 Claude/Codex plans yield roughly $8,000-$14,000 of equivalent API usage — he argues frontier labs are subsidizing usage now to build lock-in before raising prices later. He contrasts this with open-weight models (GLM, DeepSeek, Kimi), citing Cline's own test where GLM cost half as much as Opus on a real bug fix and verified its build while Opus broke the production build, Coinbase's CEO reporting a GLM/Kimi switch cut AI spend nearly in half, and Facebook's 2011 Open Compute Project as a precedent for commoditization — and announces Cline's new discounted open-weights subscription plan (cline.bot/pass).

## Why it matters
- Documents concrete, named case studies of AI disrupting open-source contribution norms (Zig's AI ban, curl's bug-bounty strain, tldraw's auto-closed PRs, GitHub's third-party-PR toggle) — useful evidence for a chapter on AI's effect on community-maintained software.
- The LiteLLM compromise is a detailed, named supply-chain-attack narrative (stolen token, backdoored package, credential harvester plus RCE, caught by a lucky malware bug) worth citing as a cautionary example of AI-era dependency risk.
- Surfaces a cost/lock-in argument about frontier-lab pricing (subsidized subscriptions, a GLM-vs-Opus cost/build-quality tradeoff, Coinbase's gateway switch) directly relevant to a chapter on model economics and enterprise AI spend.

## Metadata
- Video: https://www.youtube.com/watch?v=CoEIs6Xm8m8
- Duration: 17:30
- Playlist index: 988
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] Hi, I am SA um founder of Klein. Uh I started Klein as an open source project a few years ago. Um, some of you might know it as the first ever coding agent back before um the cloud Mac subscription and the codec subscriptions when people had to pay for each and every API request which uh got extremely expensive. Um this was before prompt caching became a thing and so there were people that paid hundreds of dollars a day uh using client but for a lot of people it was their first AGI moment. It was the first time they saw um LLMs be able to do their jobs end to end. Um and they got hooked. Um and I don't think Klein would have been as successful as it as it is if it wasn't open...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CoEIs6Xm8m8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
