---
video_id: ObNKGf9YR0g
playlist_index: 693
title: "Rewiring the State — Eoin Mulgrew, 10 Downing Street"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ObNKGf9YR0g"
duration: "28:18"
duration_seconds: 1698
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/ObNKGf9YR0g.txt"
themes:
  - "Org Design & Leadership"
  - "General AI Engineering"
ingested_at: 2026-05-19T11:04:34+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Eoin Mulgrew runs the cross-government transformation program and fellowship at the Number 10 data science team (10DS), set up during the pandemic to ensure major government decisions are evidence-based. His talk describes a deliberate 'insurgency model': a small team at the center operating with unusual autonomy, market-rate pay, and a mandate from Number 10 to recruit exclusively from outside the civil service (acceptance rate ~0.7%). Examples include an AI tool that digitizes planning applications (currently only 1 in 5 decided on time), a £1.5M legal analysis replaced by a 2-week embedded engineering effort, and a policy simulation tool for testing the impact of welfare decisions. A contrarian framing: government is the largest underserved enterprise AI customer in any country, and the constraint is organizational design, not technology."
---

# Rewiring the State — Eoin Mulgrew, 10 Downing Street

## Summary

Eoin Mulgrew leads the cross-government transformation program and fellowship at 10DS — the Number 10 data science team, established during the pandemic to ensure that the most consequential decisions in the UK are made with the best available evidence. The team is in the process of radically expanding its AI engineering capability, not just for Number 10 itself but across strategically important parts of the state.

### The scale of the problem

Mulgrew is candid about the UK public sector's situation at the time of the talk: 7.25 million people on NHS waiting lists, ~350,000 court cases in backlog, only 1 in 5 planning application decisions made on time. A Tony Blair Institute estimate puts the annual productivity gain from AI in government at £40 billion. The assessment: government is as ripe for AI disruption as any industry, but it has historically struggled to build and retain high-performing technical teams due to below-market pay, hierarchy, bureaucracy, and slow processes.

### The insurgency model

10DS's response is to operate as a small insurgent unit at the center, explicitly designed to circumvent the systemic constraints:

- **Mandate from Number 10**: political backing to enter departments and get things done.
- **Market-rate pay** (not Meta money, but competitive enough that many people will accept modest pay cuts for the work's significance).
- **Unusual autonomy**: opportunistic about which challenges to take on.
- **Own recruitment process**: bypassing the standard civil service process, targeting exceptional technical talent (YC founders, lab researchers, big tech engineers). Acceptance rate: ~0.7–0.8%.
- **Exclusively outsiders**: the team specifically avoids recruiting career civil servants, believing that industry engineers who join tend not to leave and often establish their own teams within government.

### Examples of work

**Low-hanging fruit** (team does it directly):
- **Policy simulation**: a tool allowing Number 10 policy teams to model the impact of different decisions (e.g., changes to Universal Credit) before they're made, dramatically accelerating evidence-informed decision-making.
- **Statute book analysis**: the Cabinet Office was about to spend £1.5M on external lawyers to analyze the UK statute book. Instead, one embedded engineer worked with in-house lawyers for two weeks to build a reusable AI tool. The lawyer estimate would have been outdated by the time it was complete; the tool can be re-run whenever the law changes.
- **Delivery red-teaming tool**: a PMO-in-your-pocket that interrogates incoming delivery reports and flags whether a reporting department has historically shown optimism bias or rated amber risks that rarely materialized.

**Partnership model** (for larger systemic problems):
- **Extract**: a collaboration with DeepMind, built on Gemini, that digitizes planning applications — including handwritten maps and forms. Unveiled by the Prime Minister at London Tech Week, being rolled out to every local authority in England. Planning application speed is directly linked to economic growth.
- **AI tutors**: working with the AI Safety Institute to set benchmarks and guardrails for frontier models used as education tools in UK schools — evaluating cognitive load, safety for child interactions.
- **Just AI (Ministry of Justice)**: a spin-out team whose founding members were 10DS fellows. Deploying forward-deployed engineers into prisons and the criminal justice system, working on drug interdiction, manual process automation, and prison safety.

### Scaling beyond the pilot

Mulgrew acknowledges the insurgency model is itself a hack — a pilot to demonstrate what's possible when the constraints are loosened. The longer-term goal is to make this the norm: changing civil service recruitment, shifting to horizontal process automation (call centers, transcription, case-working) rather than only targeted projects, and collaborating with analogous initiatives in the US government (USDS, the task force), Singapore, and others.

## Why it matters
- The "insurgency model" is a reusable organizational pattern for any large institution trying to adopt AI: small high-autonomy team, outsider-only recruitment, political mandate, own hiring process. Applicable beyond government.
- The statute book case (£1.5M external contract → 2-week engineer embed) is a quantifiable example of AI substituting expensive professional services — relevant to chapters on economic impact.
- The Extract planning-application digitization project (Gemini + DeepMind, Prime Minister unveiled, national rollout) is one of the most advanced real-world government AI deployments in the batch.
- The explicit framing that government is a "400,000-person industry" ripe for horizontal process automation (transcription, call centers, case-working) grounds the scale of the opportunity in concrete numbers.

## Metadata
- Video: https://www.youtube.com/watch?v=ObNKGf9YR0g
- Duration: 28:18
- Playlist index: 693
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Good to go? Can people hear me okay? Awesome. Cool. Thank you. I'm slightly embarrassed by the grandiose title. Uh now that I've had to leave it up for a few seconds. Um but anyway, um who here works in government? Can I ask? Show of hands. Very good. That's what I was hoping for. You might be very well acquainted with some of the stuff that I'm going to grumble about. Who can't think of anything worse? All right. Good. What gets measured gets improved, so we'll do another one at the end. Actually, I won't in case more hands go up. Um hi everyone. I'm Owain Mulgrew. Um I work in the data science team just down the road in 10 Downing Street. Um I run our cross-government...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ObNKGf9YR0g.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
