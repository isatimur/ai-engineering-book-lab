---
video_id: "89aQ7T6cMwA"
playlist_index: 418
title: "How to Fail at AI Strategy: Hamel Husain & Greg Ceccarelli"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=89aQ7T6cMwA"
duration: "17:03"
duration_seconds: 1023
view_count: 5955
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/89aQ7T6cMwA.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:17:29+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Hamel Husain, an ML engineer and consultant, and Greg Ceccarelli, an AI startup co-founder and former chief product officer, use Charlie Munger's 'invert, always invert' to give a satirical guide to failing at AI strategy. Each anti-pattern hides real advice: keep teams in silos, promise the moon, wrap work in jargon so domain experts leave the room (call prompt writing 'building agents'), let engineers write prompts, ship untested chatbots, throw tools at problems, treat evals as a vendor problem, trust generic metrics like BLEU and cosine similarity, and above all never look at your data. The real fix: let domain experts review data in simple tools such as spreadsheets."
---
# How to Fail at AI Strategy: Hamel Husain & Greg Ceccarelli

## Summary
Hamel Husain is a machine learning engineer and independent consultant. Greg Ceccarelli is an executive, now co-founder of an AI startup and formerly a chief product officer. Their talk is satire built on Charlie Munger's advice to "invert always invert": a step-by-step guide to "spectacularly mess up your AI strategy". Each joke points at a real failure they have seen.

**Step 1: divide your company**
Go to every AI conference but never share what you learned. Create silos and reward secrecy. Follow the "anti-value stick": promise customers AI will do everything, buy the most expensive GPUs with no cost-benefit analysis, build systems so tangled only you understand them, and justify every choice with "because AI".

**Step 2: define a fake strategy**
Fake the diagnosis by highlighting random paragraphs of last year's annual report. Make the guiding policy vague ("become the global AI leader in everything"). Fill the action plan with gimmicks, skip timelines, live in perpetual beta, and post a 4,000-page document in every Slack channel.

**Step 3: communicate in jargon**
Jargon hides the jobs to be done. Hamel's real example: at a mental health client, saying "we're building agents" instead of "we need to write a prompt" kept the mental health experts out of the room. Say RAG instead of giving the AI the right context, and prompt injection instead of users tricking the AI. Let engineers, not the people who understand customers, write prompts. They even offer a jargon translation guide.

**Step 4: mobilise to lose**
Assign AI tasks to people with no relevant experience, such as offshore teams with little business context reviewing data. Ship untested chatbots straight to customers. Pull your best engineers off revenue-producing products.

**Step 5: burn it down with tools**
- Throw tools at problems you never analysed: if retrieval fails, buy a pricier vector database; if agents fail, switch framework; fine-tune without measurement.
- Treat evals as "a vendor problem". Build a dashboard of every off-the-shelf metric, keep hoarding until one goes up, and optimise cosine similarity, BLEU and ROUGE while ignoring user experience.
- Never cross-check with domain experts or users.
- The most potent technique: "avoid looking at data". Trust the AI's output, your gut and your customers as QA.
- Lock data in a complex custom platform only engineers can use, instead of a spreadsheet or Airtable that domain experts could open.

They close by saying their lived experience is not inverted, and point to their site and an upcoming O'Reilly book with the same material.

## Why it matters
- Inversion makes the core lessons easy to quote: look at your data, bring domain experts into prompt and eval work, and define what success means before you measure it.
- The mental health example shows how technical vocabulary can push the people with real domain knowledge out of AI projects.
- It is a sharp critique of generic eval metrics and vendor-owned evals, and supports chapters that argue for custom, failure-mode-driven evaluation.
- The tool-first anti-pattern (new vector database, new framework, fine-tune without measurement) names a common way teams avoid error analysis.
- Simple tools such as spreadsheets for data review are framed as a leadership choice, not just an engineering detail.

## Metadata
- Video: https://www.youtube.com/watch?v=89aQ7T6cMwA
- Duration: 17:03
- Playlist index: 418
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] all right everyone welcome Hamil and I are absolutely thrilled to be here with you to basically teach you how to build the definitive guide to completely utterly and spectacularly mess up your AI strategy I actually couldn't have really wished for a better foil Grace's lead in than this because we're not just talking about Minor setbacks here we're going to take you through a way to create full-blown company crippling career ending failure Grace talked about best practices but we're here to embrace worse practices in fact we're going to make sure you know how to completely torpedo your projects and ensure you alienate everyone that you work with how does that sound it sounds great...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/89aQ7T6cMwA.txt]]
- Description cue: Want to guarantee your AI initiatives are great boardroom presentations but don't actually work? This talk explores the most reliable ways to waste time, money, and resources while building...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://hamel.dev/hire.html>
- resource: <https://hamel.dev/oss/opensource.html>
