---
video_id: Yphdry8ttAQ
playlist_index: 1036
title: "Trading Desks to Clinical Trials: Parallels in Applied Vertical AI — Ayush Bhardwaj, Allos AI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Yphdry8ttAQ"
duration: "20:02"
duration_seconds: 1202
view_count: 939
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Yphdry8ttAQ.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:38+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ayush Bhardwaj (Allos AI, ex-hedge fund) argues vertical AI's moat is proprietary domain data and expert judgment, not model or infra tooling."
---

# Trading Desks to Clinical Trials: Parallels in Applied Vertical AI — Ayush Bhardwaj, Allos AI

## Summary
Ayush Bhardwaj, formerly applied AI at a hedge fund and now at pharma-tech startup Allos AI, defines "applied vertical AI" as AI built to simulate one specific industry expert's job and lays out a seven-step recipe drawn from both domains: formulate a narrow problem, curate proprietary data, write prompts that encode an expert's reasoning, add observability, iterate, hire the domain-expert user, and build a continuous learning loop before shipping. He argues the real bottleneck is data withheld by regulatory incentives: hedge funds managing over $100M in US equities must file quarterly holdings (eroding their edge once reverse-engineered), and he claims roughly 30% of pharma sponsors never disclose failed clinical trials as legally required, with the FDA publicly reminding about 2,000 sponsors of this obligation in 2026 — data he says neither OpenAI nor Anthropic has. On iteration, he argues engineers without domain expertise can't judge model output quality, LLM-as-judge fails because models don't grasp domain-specific value (e.g., "alpha"), and — citing Yann LeCun — models can't self-verify outside RL-verifiable domains like math and code, so errors compound. His fix is to "hire the user": bring in a domain expert to curate data, refine prompts, and supply judgment, then climb a cost/ROI ladder from cheap error-log analysis up through rubric-based self-grading and RLHF. He also disputes the Stanford AI Index's cited figure that most enterprise AI agents never reach production, reframing the failure as agents reaching production but failing to justify ROI, and closes arguing that model/infra tooling is commodity — the durable moat is proprietary domain data plus expert judgment, with finance and pharma today "AI-in-the-loop" (AI generates candidates, e.g., five trade theses) rather than human-in-the-loop.

## Why it matters
- Concrete argument for why proprietary, regulation-adjacent data (trade-thesis history, undisclosed failed clinical trials) rather than model access is the moat in vertical AI, backed by specific figures (>$100M holdings disclosure rule, ~30% pharma non-disclosure, ~2,000 FDA reminders).
- Names a specific failure mode of LLM-as-judge and RLVR-style self-verification outside math/code domains, plus the "hire the user" pattern (domain expert co-designing prompts, data curation, and judgment) as the counter — a reusable iteration/evaluation lesson for vertical-agent builders.
- Complicates a widely cited industry statistic (the Stanford AI Index production-failure figure) by reframing "doesn't reach production" as "doesn't justify ROI," useful as counter-evidence or nuance for a book discussing agent-adoption metrics.

## Metadata
- Video: https://www.youtube.com/watch?v=Yphdry8ttAQ
- Duration: 20:02
- Playlist index: 1036
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello everyone. So, my name is Ayush Bhardwaj and I did applied AI for a hedge fund. And now I do everything tech plus applied AI for a pharma tech startup cuz you know the way startups are. You have to do everything, wear multiple hats. So, before I start the session, I would like to do a small survey. Can I get a raise of hands for all the engineers in the room? Okay, that's a tough room. Now, can I get a raise of hands for managers? Okay, just to be clear, managing AI agent does not count. You have to manage people. Okay, we have few managers as well. Interesting. So, they will help me like fine-tune my talk a bit. So, today my aim is to take you through the journey of how do...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Yphdry8ttAQ.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
