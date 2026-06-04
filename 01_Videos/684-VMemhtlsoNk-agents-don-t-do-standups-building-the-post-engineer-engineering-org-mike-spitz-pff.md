---
video_id: VMemhtlsoNk
playlist_index: 684
title: "Agents Don't Do Standups: Building the Post-Engineer Engineering Org — Mike Spitz, PFF"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=VMemhtlsoNk"
duration: "17:50"
duration_seconds: 1070
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/VMemhtlsoNk.txt"
themes:
  - "Org Design & Leadership"
  - "Agent Architecture"
ingested_at: 2026-05-19T11:04:14+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mike Spitz (PFF, sports data) presents a concrete Jan-March case study of a 2-engineer AI team vs. a 10-engineer traditional team. Results: 25x more deploys, 10x output (tickets × complexity), customer quality score 8.6/10 (vs. 7-7.5 before AI), 2-month delivery of work estimated at 4 months. The organizational finding: Scrum is dead — standups, sprint planning, sprint refinement, and retrospectives were all eliminated. Replaced by bi-daily huddles, spec-driven flow (agent interviews engineer → LDD → auto-creates tickets and PRs), and a QA agent that tests against acceptance criteria post-deploy. Compounding advantage: engineers unblock 1-2 months early and shift to new work while the traditional team is still blocked."
---

# Agents Don't Do Standups: Building the Post-Engineer Engineering Org — Mike Spitz, PFF

## Summary

Mike Spitz (head of engineering, PFF — Professional Football Focus) presents a Jan-March 2025 case study comparing two engineering approaches at a 200-person sports data company (100M page views, 9M annual drafts) that was falling behind competitors.

**The experiment setup.** Two engineers — the strongest front-end engineer and a strong full-stack — running AI-native workflows vs. a traditional team of ~10 engineers. Not a lab experiment; both teams working on real production features serving millions of users.

**The results:**

- **25x more deploys**: the 2-engineer team deployed 5 times per day; the 10-engineer team deployed roughly once every 5 days. (Spitz acknowledges the small-team effect but notes the AI team still had to coordinate all deploys with the larger team, so the comparison isn't purely size-driven.)
- **10x output**: measured by blending ticket count with code complexity score — a combined metric Spitz developed because raw PR count and lines of code are both misleading.
- **Customer quality score 8.6/10**: statistically significant surveys. Pre-AI baseline was 7-7.5. Higher quality alongside higher throughput.
- **Timeline**: features estimated at 4 months delivered in under 2 months. One engineer unblocked in under 1 month and started building new things while the traditional team was still blocked on the original work — the compounding advantage.

**Scrum did not survive.** Every standard Agile ceremony was eliminated:

- **Daily standup**: removed. Tickets auto-update based on PR status (open → in progress; merged → closed). Status is always current without a meeting.
- **Sprint planning**: removed. No need to estimate tickets because estimation didn't change outcomes.
- **Sprint refinement**: removed. Happens automatically as part of the spec and LDD (Lightweight Design Document) flow, with tickets structured so none block each other.
- **Retrospective**: mostly removed. Replaced by continuous customer satisfaction surveys. Engineers flag issues immediately rather than waiting for a sprint boundary. (Spitz acknowledges this is controversial.)
- **Project manager**: removed. No telephone game needed when the feedback loop is tight.

**What replaced ceremonies — the new flow:**

1. **Spec phase**: an agent interviews the engineer about requirements. Gets feedback on the spec.
2. **LDD (Lightweight Design Document)**: created by an agent using a skill that has analyzed all previous LDDs, ensuring new work is in the same architectural ethos as everything built before.
3. **LDD distribution**: shared with the broader engineering team for feedback.
4. **Automatic ticket and PR creation**: from the LDD, fully structured so blocking dependencies are flagged upfront.
5. **QA agent**: on every staging deploy, an agent reads all relevant tickets, checks acceptance criteria, and produces a pass/fail report. The next step (not yet built) will have the agent automatically create fix PRs for failed acceptance criteria — closing the self-healing loop.

**Bi-daily huddles** replaced all the eliminated ceremonies: 30-60 minutes, engineers + someone from product + someone from design, reviewing what was built, getting instant feedback, deploying to production in MVP state as fast as possible.

**Where humans remain essential:**
- Security review (agents take shortcuts)
- Product feel and brand consistency ("everything feels like it was made by Claude Code" is a real failure mode)
- Scale and engineering complexity judgment — the LDD is the primary tool for preventing over-engineering

**The two types of engineers.** Spitz is direct: not every engineer will thrive in this model. The engineer who thrives is curious — if they don't know how something works, they'll spend time figuring it out. The engineer who needs prescriptive specs will struggle. "Not everyone can drive a sports car. And that's all right."

**The factory metaphor.** Think of software development as a car factory: each composable element is a step (branch name, feature flags, API patterns, interactive elements, analytics). Abstract each into a reusable skill. Caution: don't consume other teams' skills if they have software opinions that conflict with your org's patterns — you'll end up in trouble.

**The adoption advice.** Start with boring, repetitive tasks — the things engineers hate — to get maximum buy-in. Don't do the big-bang hackathon rollout ("given everyone Claude Code and a hackathon and called it done"). Phased approach, starting with non-critical systems. Encode team engineering culture and software patterns in skills before opening to autonomous workflows. Token cost currently subsidized by providers; plan for a future where you're estimating token expenditure as part of prioritization.

**The compounding warning.** Being a few months behind in AI adoption now may mean being 6 months behind shortly, then 12 months behind. The compounding advantage of starting early means the gap grows non-linearly.

## Why it matters

This is the most detailed process-level case study in the corpus of what Agile looks like after agents replace the bottleneck that Agile was designed to manage. The quantitative results (25x deploys, 10x output, 8.6/10 quality score) are credible because they're from a production system with real user surveys, not a benchmark. The specific ceremony eliminations — and the justifications for each — give the book concrete material for Chapter 9. Pairs with Intercom (#682) for the "2x throughput" angle, but where Intercom is an org-wide transformation, PFF is a small-team proof of concept.

## Metadata
- Video: https://www.youtube.com/watch?v=VMemhtlsoNk
- Duration: 17:50
- Playlist index: 684
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Coding Agents]]
- [[Agent Architecture]]

## Key claims (for claims ledger)
- 2 AI engineers vs 10 traditional engineers: 25x more deploys, 10x output (tickets × complexity), 8.6/10 customer quality (vs. 7-7.5 baseline), 2-month delivery of 4-month estimate.
- Standups, sprint planning, sprint refinement, and retrospectives can all be eliminated when ticket status is automated and the spec/LDD flow replaces refinement.
- The compounding advantage: engineers who unblock early start new work while the traditional team is still blocked — the gap grows non-linearly.
- Skills should encode your team's specific software patterns and engineering culture — don't import other teams' skills that conflict with your opinions.
- The QA agent (test against acceptance criteria post-deploy) is the missing link to self-healing pipelines.
- Phased adoption starting with boring tasks engineers hate generates maximum buy-in; mass hackathon rollout doesn't work.
- "Not everyone can drive a sports car": curious engineers thrive; prescriptive-spec engineers will struggle.

## Book angles
- Chapter 9 (org design) — the most detailed process-level case study of post-Agile engineering; every ceremony eliminated is justified by a specific mechanism that replaced it.
- Chapter 6 (software factory) — the factory metaphor stated explicitly; composable skills as assembly line steps.
- Chapter 8 (constrained delegation) — LDD as delegation contract; QA agent as adversarial evaluator; self-healing pipeline as the constrained delegation endpoint.

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/VMemhtlsoNk.txt]]
