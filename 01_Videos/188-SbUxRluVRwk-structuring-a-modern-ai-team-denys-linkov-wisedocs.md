---
video_id: "SbUxRluVRwk"
playlist_index: 188
title: "Structuring a modern AI team — Denys Linkov, Wisedocs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=SbUxRluVRwk"
duration: "17:40"
duration_seconds: 1060
view_count: 40386
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/SbUxRluVRwk.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T11:43:06+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Wisedocs' Denys Linkov argues for hiring generalist AI engineers over specialist researchers, using an inner/outer-loop team framework and two real team builds as evidence."
---
# Structuring a modern AI team — Denys Linkov, Wisedocs

## Summary
Denys Linkov (ML team lead at Wisedocs) rejects the instinct to hire specialist AI researchers, framing the choice as "Ampere's wager" — trading a domain-expert team for five researchers from a top lab — and argues most companies should refuse that trade. He segments companies into tech, verticalized/services, and tech-enabled categories, each with different failure modes and different build-vs-buy defaults, and describes two team builds he led: a 2021 conversational-AI/agent platform team that wrote a custom MLOps platform, fine-tuned encoder models, and ran RAG-as-a-service across six microservices with ~10 people; and a 2024 medical-records team (Wisedocs) that instead leaned on commercial APIs, prompt tuning, and open-source serving infrastructure once the ecosystem matured, shifting its skill bar toward deeper domain knowledge. His organizing framework splits a team into an "inner loop" (model training, prompting, product requirements, model serving, domain experts, business cases) and an "outer loop" of differentiating expertise, and he argues for generalists over narrow specialists until a team exhausts general progress and needs to push the last 5% of performance. He gives two reasons to hire at all — to hold context and to act on it, since humans must remain accountable for systems even as agents get larger context windows — and pushes back on "don't hire juniors" trend-following by pointing to YC running an AI school for students, urging job-relevant interview questions over LeetCode now that LLMs can solve those.

## Why it matters
- Gives a named decision framework ("Ampere's wager": domain team vs. a handful of star researchers) for a hiring/org-design chapter, with a clear argued position rather than "it depends."
- Documents two concrete, contrasting team builds (2021 custom MLOps + fine-tuned encoders vs. 2024 commercial APIs + open-source serving) showing how build-vs-buy choices shifted as the ecosystem matured — good before/after evidence for a chapter on AI team evolution.
- Offers a specific accountability argument (context-holding, human accountability for agent systems) as a counterpoint to "just use AI agents with huge context windows instead of hiring," useful for a chapter weighing agents against headcount.

## Metadata
- Video: https://www.youtube.com/watch?v=SbUxRluVRwk
- Duration: 17:40
- Playlist index: 188
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> All [Music] right, thanks everybody for joining today. My name is Dennis Linkov. I lead the machine learning team at Wisdocs and I'll be talking about hiring a modern AI team. So, who's heard this message before? We are now an AI first company. We've seen companies like Shopify, Dolingo, Zapier all make these announcements saying that they're AI first companies and they're saying that there are new expectations that before you hire a person, you need to make the the claim that you can't hire an AI agent or use AI. We're now seeing big tech companies and many companies in general sharing how much code is being written by AI systems and how this is going to lead to the extinction of the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/SbUxRluVRwk.txt]]
- Description cue: You've been given an AI mandate but don't have additional headcount, what next? Re-skilling, up-skilling and team augmentation become essential to delivering on a new mandate. In this talk...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
