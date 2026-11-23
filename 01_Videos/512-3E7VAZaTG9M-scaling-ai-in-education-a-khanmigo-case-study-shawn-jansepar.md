---
video_id: "3E7VAZaTG9M"
playlist_index: 512
title: "Scaling AI in Education: A Khanmigo case study: Shawn Jansepar"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=3E7VAZaTG9M"
duration: "22:39"
duration_seconds: 1359
view_count: 2331
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/3E7VAZaTG9M.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:21:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Shawn Jansepar, director of AI and learning at Khan Academy, explains how Khanmigo, a Socratic tutor for learners and an assistant for teachers, grew to about 200,000 paid users and how the nonprofit became AI-first. Keys: rapid demo-driven prototyping, resisting perfectionism, fast two-way-door decisions, new core values recorded in organization decision records, and code quality tiered by confidence in a feature. Technical work: a math agent, a two-step chain-of-thought tutoring call, a tutoring accuracy dashboard, model-graded evals that catch math mistakes about 70% of the time, an AI platform team, and dedicated capacity that is costly at night."
---
# Scaling AI in Education: A Khanmigo case study: Shawn Jansepar

## Summary
Shawn Jansepar is director of AI and learning at Khan Academy and also acts as product leader. Khan Academy is a nonprofit with 140 million registered users and about 200,000 paid Khanmigo learners and teachers, half through school districts. By eighth grade the average student is 1.1 grade levels behind; the bet is that AI can close those gaps by democratizing one-on-one tutoring. He frames LLMs as "as much of an interface revolution" as a technology one, quoting the Notion CEO.

**Product choices**
- A Socratic tutor that asks leading questions and does not give away answers. Against a ChatGPT screenshot, it also catches a wrong distribution of negative 4 that ChatGPT called correct.
- Deep content integration: "tutor me, I got this wrong" passes the question, step-by-step solution and the student's answer as context.
- A writing coach that splits outlining, drafting and revision. It refuses to write the next paragraph, and teachers see the full history, including flags when dozens of words appear from nowhere.
- Teacher tools: moderation alerts, class snapshots, progress reports for families, lesson planning. Microsoft sponsored free teacher tools for US teachers. The aim was to turn fears into features.

**How the organization changed**
They wrote no requirements or Gantt chart. The partnership with OpenAI began when OpenAI needed AP Bio questions; after slow months they prototyped and red-teamed together, ran a company-wide hackathon, and launched alongside GPT-4 in March. Content staff helped train the model on 100 math tutoring examples. Keys to success: resist perfectionism, decide fast on two-way doors but think deeply on one-way doors like trust and safety, trust intuition and expert educators over A/B testing everything, demo-driven iteration (he recommends the book Creative Selection), and fixed timelines against Parkinson's law. Organization decision records captured new core values. A new process sets code quality by confidence: scrappy prototype, A/B or beta test, then a higher bar with checklists and accessibility for all-user launches. An AI platform team sits between infrastructure and product, owning a Go component interface with built-in tracing, the AI router, a chat component, and Khanmigo as a service for third parties.

**Accuracy, evals and cost**
- A math agent with calculator or Python access. Chain-of-thought in two calls: first write how the student likely got the answer and how it should be reached, then tutor from that package, which improved performance dramatically. Plus step-by-step solutions, RAG and a tutoring accuracy dashboard to catch regressions.
- A math tutoring accuracy benchmark dataset with a paper, and work on Wolfram and fine-tuning.
- Evals moved from spaghetti prompts and log-reading to components with clear inputs and outputs, a minimal test suite across activities, human-in-the-loop tools and model-graded evals. The model catches labelled math mistakes roughly 70% of the time.
- Multiple models per workflow, fallback from dedicated to shared capacity, and perceived-performance UI (a kid said it was not slow because Khanmigo "is doing math"). The dedicated instance is provisioned for peaks but idle at night, so they want dynamic scaling, load balancing between OpenAI and Azure, and smaller math-tuned models.

## Why it matters
- A rare production case of a Socratic tutor that is built not to answer, with UX (writing coach, teacher replay) that turns cheating fears into features.
- The two-call chain-of-thought pattern (diagnose the student's path, then tutor) is a concrete, reusable prompt architecture.
- The 70% agreement figure for model-graded math-mistake detection is a sober data point on LLM-as-judge limits.
- Confidence-tiered code quality and organization decision records show how a cautious nonprofit retooled its process for AI prototyping.
- The dedicated-capacity problem (provisioned for peaks, idle at night) is a clear cost trade-off for education-scale deployments.

## Metadata
- Video: https://www.youtube.com/watch?v=3E7VAZaTG9M
- Duration: 22:39
- Playlist index: 512
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] all right thanks so much for coming to my talk um yeah I'm going to talk to you today about how we've been scaling AI in the classroom um so kind of a case study of kigo um my name is Shan jansa I'm the director of AI um and learning at KH Academy and I've also been doubling up as a product leader so thankfully when we're trying to decide on features and road map I don't have to negotiate with anyone but myself there are other product managers but uh it makes that process a lot easier so today I'm going to talk about problems we're solving at KH Academy how we're solving those problems walking through a few demos uh how we transformed KH Academy into an AI first organization and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/3E7VAZaTG9M.txt]]
- Description cue: In this presentation, I will explore Khan Academy's journey to become an AI-first organization, focusing on our AI Tutor and Teacher Assistant, Khanmigo. This case study will cover the strategic...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
