---
video_id: "IxXMKT2FDRk"
playlist_index: 519
title: "Hiring & Building an AI Engineering Team: Dr. Bryan Bischof"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IxXMKT2FDRk"
duration: "29:07"
duration_seconds: 1747
view_count: 7942
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/IxXMKT2FDRk.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:22:06+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dr. Bryan Bischof, who builds AI capabilities at Hex and whose early tweet about hiring an AI engineer helped inspire the term, explains how to staff an AI product team. Hiring should follow the development schedule: ship an early product, build evals, get feedback, iterate. Early teams need a full-stack engineer, a data scientist for evals and user data, a product person and a designer; ML engineers come later. He warns against the mythical man-month, calls LeetCode interviews useless for this work, and tests data intuition with a seven-day, four-hour data-cleaning take-home. His bonus advice is to work daily with domain experts."
---
# Hiring & Building an AI Engineering Team: Dr. Bryan Bischof

## Summary
Dr. Bryan Bischof has built AI capabilities at Hex, a data science platform he compares to a powerful Jupyter notebook, for about a year and a half, after about 12 years in data science and ML. His tweet about hiring his first AI engineer was one of the inspirations for the rise of the term. The talk, framed with a joke chatbot called "AI leader GPT", covers the when, why, who and how of building an AI engineering team.

**The first job posting**
A senior engineer from software or ML to expand Greenfield capabilities fast. ML researchers were explicitly not wanted; he urges postings to say so. He wanted experience putting ML into production for real users, enthusiasm for business applications, MLOps-level architecture sense, and comfort in both Python and TypeScript, because the app is TypeScript.

**When: staff by stage**
Early: software skills, "data profiles" (data scientists and analysts who notice when distributions or retention look strange) and product competency. Middle: more infra, data profiles and design, the role teams under-invest in most. Later: scaled infra plus ML engineers for fine-tuning, embedding models, or search and retrieval. The number one mistake he hears from peers is the mythical man-month: "nine women cannot give birth in a single month", and all AI products are early by definition. Hiring should mirror the development order: early product, then evals, then user feedback, then iteration. Data people must arrive much earlier than in traditional product work.

**Why: hiring theses**
If an existing employee can meet the thesis, do not hire. Full-stack engineer: integrate an LLM provider and build minimum infrastructure. Data scientist: evaluation quality and user data. Product person: talk to users and own the jobs to be done. Designer: nobody knows the right shape yet, and "all AI products right now are clownish". ML engineer: push past commodity intelligence.

**Who and how**
Traits that co-vary with impact: data intuition (noticing that document embeddings form a jagged structure means retrieval will suck), product-mindedness, urgency, and, in the Q&A, curiosity, which he has never trained. Stop LeetCode interviews. His loop has a take-home data-cleaning or clustering task with no objective clusters: four hours of work over seven days, a short report, then a live feedback session. Fifteen hours of work is a red flag; a well-scoped four-hour result is a green flag. Hex also runs a product design interview. He hired an engineer partly on the signal of her blog post on AI design patterns.

**Bonus: work with experts**
The AI capability should be modelled on interactions with experts. A support bot without support staff using it daily is "insane"; he talks to Hex's data scientists every week.

**Q&A**
He puts security mostly outside the AI team; an attendee from Los Alamos argues for embedding security staff early in regulated settings, and he agrees. For existing teams he favours one central AI platform team (provider relationship, prompt infrastructure, evals), as at Stitch Fix, with one liaison per product team, while noting Netflix differs.

## Why it matters
- Ties hiring order directly to the build order (product, evals, feedback, iterate), a clear rule for AI team planning.
- Each role gets a one-line hiring thesis, which answers the leadership question of why not reuse existing staff.
- The time-boxed data take-home with a feedback session is a concrete alternative to LeetCode for testing data intuition.
- Names design as the most under-invested role and warns against the mythical man-month on early AI products.
- Argues for a central AI platform team plus one liaison per product team, so product teams do not each build their own provider, prompt and eval stack.

## Metadata
- Video: https://www.youtube.com/watch?v=IxXMKT2FDRk
- Duration: 29:07
- Playlist index: 519
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] hex is a data science platform company um what you should think about is sort of like a really powerful Jupiter notebook um I've been building AI capabilities at hex for about a year and a half I've been in data science and machine learning for about 12 years so let's just let's get one thing out of the way um why might you care about my opinion well um let's take a look at this tweet of mine this is when I was hiring my first AI engineer I'll draw your attention to the date I'll also draw your attention to the date on this very famous blog post um so uh my my tweet was one of The Inspirations for the rise of the AI engineer um that does not mean that I'm fully aligned with that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IxXMKT2FDRk.txt]]
- Description cue: Recorded live in San Francisco at the AI Engineer World's Fair. See the full schedule of talks at  & join us at the AI Engineer World's Fair...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

