---
video_id: t4359sKBu4w
playlist_index: 711
title: "Bounded Autonomy: Between Free Will and Determinism — Angus J. McLean, Oliver"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=t4359sKBu4w"
duration: "16:52"
duration_seconds: 1012
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/t4359sKBu4w.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:09:38+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Angus J. McLean, AI director at Oliver (an ad agency of 3,000 staff that generates about 4,000 AI assets a day for 200+ brands), argues that builders should treat an LLM as a closed box of knowledge, not a learner, and design agents inside self-imposed bounds. His advice: slow down because the core of LLMs has not changed, treat context as a soft constraint and work to keep noise out, ask how little context a task needs, keep builds simple (plain HTML beat his complex CV app), use several data representations, and prefer structured workflows. He also says: do not automate a job you cannot do yourself."
---

# Bounded Autonomy: Between Free Will and Determinism — Angus J. McLean, Oliver

## Summary
Angus J. McLean is an AI director at Oliver, an advertising company of 3,000 staff in 46 countries that has moved almost fully to gen AI. His short talk is "conventional wisdom for unconventional times": a set of habits for people who build agents, drawn from his work on the strategy side of an agency. He says up front that it is not technical or prescriptive.

**The setting**
Oliver generates around 4,000 assets a day for more than 200 brands, and puts real media spend behind them (from 20 grand to a few million). That spend lets the team measure each asset in the wild, which gives a fast feedback loop. Creative and strategy work, once pure knowledge work, is now "increasingly agentic": ideation, copywriting, audience insight, trend and competitor analysis, and persona or city-level localisation. The team uses agents first for speed and second for scale. The work is high-risk: a poorly received image at scale hurts a brand as much as a good one helps it.

**Slow down: the model is a closed box**
McLean thinks of an LLM as a closed box, a "flexible database capable of doing semantic math", that does not truly understand or learn. Models need huge data sets and cannot learn continuously without forgetting. Most tools are band-aids around these limits. For his team, the clearest limit is trend detection: a truly new trend is not in the model. Recent agent gains come mostly from larger context windows, but context will never be enough.

**Context as a soft constraint**
Context bounds a model as much as guardrails do. One example: give the model good documentation instead of internet access. On the open web, models soak up competitors' own promotional copy instead of consumer views, and they are "very susceptible to SEO". The problem has moved from too little context to too much, so the job is to keep the noise out. He suggests a self-imposed constraint: ask how little of the context window a task needs. As experiments, he suggests older, smaller models, or building your own harness, memory and compaction.

**Keep it simple**
His complex CV application lost to "four simple letters": HTML. Models tend toward verbose, complex solutions. Build a simple version that works and shorten the feedback loop with reality.

**AI as translation, structure as a view**
Since the attention paper, AI has been translation between forms: text, images, audio, video. Structure is a property of the observer's representation, not of the data. So use several representations at once: markdown for human-readable hierarchy, graphs for relationships, clustering for large unstructured text, folders for fast retrieval, timelines where they fit.

**Workflows and doing the job yourself**
At the end he notes that workflows have often worked better for them than less structured agents, citing Adam Smith's pin factory. He adds: "don't automate a job unless you can do it yourself". He shows his old social media intelligence work: 50,000 tweets clustered and turned into strategy reports for creative teams.

## Why it matters
- Gives a non-coding, production view of agents from an ad agency, where media spend on 4,000 assets a day creates a measured feedback loop.
- The web-search failure mode (models absorb promotional content and SEO) is a concrete argument for curated documentation over open internet access.
- The question "how little context can you use and still get the task done?" reframes context engineering as subtraction, not addition.
- The plain-HTML-beat-my-app story and "don't automate a job unless you can do it yourself" are compact cautions against over-engineered agent builds.
- The multiple-representation advice (markdown, graphs, clusters, folders, timelines) maps directly onto agent memory and knowledge-base design.

## Metadata
- Video: https://www.youtube.com/watch?v=t4359sKBu4w
- Duration: 16:52
- Playlist index: 711
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Uh thanks so much for coming everyone. Uh happy Friday. Um My talk today is uh it's called bounded autonomy between free will and determinism and it's sort of about changing uh the way we think about uh our interactions with large language models. This talk could have been called a number of different things. I toyed with the idea of between automation and customization, between oversight and agency, and between possibilities and constraints. But what it really is is conventional wisdom for unconventional times and it's based off some of my personal experience in uh designing agents within industry. Uh it's for people actively experimenting with agents. Uh it's both for beginners who are...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/t4359sKBu4w.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uk.linkedin.com/in/angusjmclean>
