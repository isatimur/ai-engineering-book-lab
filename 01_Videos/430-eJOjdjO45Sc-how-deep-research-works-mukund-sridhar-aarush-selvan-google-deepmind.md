---
video_id: "eJOjdjO45Sc"
playlist_index: 430
title: "How Deep Research Works - Mukund Sridhar & Aarush Selvan, Google DeepMind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=eJOjdjO45Sc"
duration: "15:15"
duration_seconds: 915
view_count: 16605
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/eJOjdjO45Sc.txt"
themes:
  - "RAG & Retrieval"
  - "Models & Inference"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:18:01+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Aarush Selvan (product manager) and Mukund Sridhar (software engineer) explain how they built Deep Research in Gemini: remove the compute and latency limits at inference time, within a five-minute budget, and trade that for a much more comprehensive answer. They cover the product side (an editable research plan card, live browsing of websites, a pinned report artifact, full source lists) and four engineering challenges: long-running task state, iterative planning over partial information, a noisy and fragmented web, and context growth managed with recency bias and research notes in RAG. They close with expertise, personalization and multimodal tools as next steps."
---
# How Deep Research Works - Mukund Sridhar & Aarush Selvan, Google DeepMind

## Summary
Aarush Selvan, a product manager, and Mukund Sridhar, a software engineer, built Deep Research in Gemini, a personal research agent that browses the web and writes a report. At the time of the talk it ran on 1.5 Pro in Gemini Advanced. Their motivation: research and learning queries are top Gemini use cases, but chatbots gave "a blueprint for an answer rather than actually give you the answer". Their test query was what it takes to win an athletic scholarship for shot put. The bet: remove the compute and latency limits at inference time and trade them for a much more comprehensive answer, but finish in five minutes, because "beyond that, uh, we don't have the chips".

**Product challenges**
Gemini was a synchronous chatbot, so the team had to build an asynchronous experience inside it, set expectations (a five-minute wait does not help a weather question), and make reports thousands of words long easy to engage with.
- *Research plan card*: Gemini first shows an editable plan, like a good analyst who explains the approach before starting. The card also signals that this is not a standard chat turn.
- *Live browsing*: the UI shows the websites the agent reads in real time. The feature predates thinking models. Some users tried to push the website count into the thousands.
- *Pinned artifact*: inspired by Anthropic's artifacts, the report stays pinned so users can ask questions, change style, and add or remove sections without scrolling.
- *Sources*: the UI lists every source read and every source used. Unused sources stay in context for follow-ups, and citations carry over to Google Docs on export.

**Four engineering challenges**
- *Long-running tasks*: jobs make many LLM and service calls and will fail along the way. Good state management and error recovery stop one failure from dropping the whole task. The same state lets users walk away, get notified, and read on another device. Sridhar expects future agents to run for hours.
- *Iterative planning*: the model decides which sub-problems run in parallel and which are sequential, and plans from partial information. It finds D1 qualifying standards, then sees it still needs D2 and D3. A top-10 roller coaster page says nothing about kids. Scuba course structure and pricing sit on different sites. Entity resolution across sources needs reasoning or more exploration.
- *A noisy web*: two sites about the same Portuguese music festivals have very different layouts, so browsing must be robust.
- *Context growth*: intermediate outputs and follow-up research tasks fill context, even with long-context models. Each design has trade-offs. The one they show uses recency bias: full detail for current and previous tasks, and selected research notes from older tasks in a RAG store.

**What comes next**
The team was surprised by the reception after the December launch. They see three directions: expertise (from analyst to partner, with the "so what" and implications), personalization (a due diligence report for a banker needs a DCF and financial detail and should change how the agent browses), and combining research with coding, data science and even video generation. The working name before launch was Gemini Deep Dive.

## Why it matters
- Frames deep research as an explicit trade: more inference-time compute and latency for comprehensiveness, capped at a five-minute budget set by hardware.
- The editable research plan card is a reusable UX pattern for asynchronous agents in synchronous chat products: it sets expectations and gives users a point to steer.
- The partial-information examples (D1 versus D2/D3, roller coasters for kids, split scuba pricing) give concrete test cases for iterative planners.
- The recency-biased context design, with older research notes moved to RAG, is a specific answer to context growth across follow-up tasks.

## Metadata
- Video: https://www.youtube.com/watch?v=eJOjdjO45Sc
- Duration: 15:15
- Playlist index: 430
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Models & Inference]]
- [[Agent Architecture]]

## Transcript excerpt
> [Music] Hey everyone, I'm Arouch. I'm a product manager here at Google. Hey, I'm Ukun. I'm a software engineer at Google working on deep research. Um, so uh I don't know if people have had a chance to uh try deep research on Gemini um or are familiar with the product, but you can try it if you go to Gemini advanced and if you scroll past 2.0 flash 2.0 flash thinking experimental 2.0 0 Flash thinking experimental with apps 2.0 pro experimental you will find uh 1.5 pro with deep research which is what we built. Um and if you have the chance to use it and you pay the 20 bucks uh you will see that it's a personal research agent that can browse the web for you to to build the reports on your...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/eJOjdjO45Sc.txt]]
- Description cue: You’re doing research all the time, we just don't always call it that. From figuring out the right summer camp options for your kids to running due-diligence on an investment opportunity,...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Agent Architecture**.

