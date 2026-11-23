---
video_id: "qpmZID27t98"
playlist_index: 540
title: "The Multimodal Future of Education: Stefania Druga"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=qpmZID27t98"
duration: "20:05"
duration_seconds: 1205
view_count: 2912
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/qpmZID27t98.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:23:00+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Stefania Druga, who has studied children and AI since 2015 starting at MIT, argues that education needs a wake-up call and that multimodal AI should make kids tinkerers, not passive askers. Her open-source Scratch extension let children program voice assistants and train their own image and text models; a longitudinal school study found kids became more skeptical of AI smarts once they learned how it works. A multi-week family study shaped a coding co-pilot that suggests ideas but leaves the coding to the child. She closes with live Gemini API demos that answer drawings with questions, not answers, built in under 100 lines of open-source code."
---
# The Multimodal Future of Education: Stefania Druga

## Summary
Stefania Druga has researched how children perceive and learn from AI since 2015, starting at MIT. Her thesis: education needs a wake-up call, and multimodal AI should turn learners into tinkerers who test hypotheses, not people who delegate questions to a chatbot.

**The problem she frames**
She cites a Salesforce study: 70% of generative AI users are Generation Z. Only 70% of 10-year-olds can read and understand a simple story, and 60% of children fell behind in math and reading during COVID. Students already use AI tools for homework and prefer them over human tutors.

**Kids' mental models of AI**
Her early voice-assistant research found that age shapes perception. Children aged four to six and a half doubt that Google Home or Alexa is smart. Once kids start school, they say voice devices are "smarter than I am". Those mental models drive what kids ask and how much they trust the answers, so AI literacy matters.

**A platform for tinkering**
In 2016 she built a free, open-source extension to Scratch. Kids could program smart lights, voice assistants and robots (one girl coded hide-and-seek with a robot), and train custom image or text models, for example to tell unicorns from narwhals, with a visible confidence score. It ran in more than 30 languages. A longitudinal study in public and private schools asked kids about AI before and after the activities. After they trained models themselves, they became much more skeptical of AI smarts. Her explanation: the sandbox let them run the scientific process, like researchers do.

**Designing a family co-pilot**
A multi-week study with kids and parents in 10 US states asked what a coding co-pilot for families should do. Families valued:
- idea generation when they hit a wall at the start of a project;
- help to turn an idea into code constructs;
- support for the child's creative coding identity, because the bot helped only when they were stuck;
- a third moderator that got parent and child to take turns.

Limits: it could distract, so families needed an off switch. It could not settle sibling fights over the laptop, and it could not always break down complex concepts, so parents still had to help. She then benchmarked top generative models on Scratch explanations and ideas. With a collaborator she built the first benchmark of K-12 math misconceptions, to test whether models can spot them in kids' chats.

**Live demos**
She showed three fresh demos on the latest Gemini API. Each one reads a drawing or photo and replies with a question, not an answer: a science demo (a scale with weights, water and CO2, the Earth and the Moon), a math tutor that walks through steps (it solved an audience equation step by step), and a curiosity demo that asks about objects and flags. The code is open source, under 100 lines, and needs only a free API key.

## Why it matters
- Gives evidence that hands-on model training makes kids more critical of AI, not more trusting: a measurable before-and-after literacy effect.
- The co-pilot findings are a clear design brief for learning assistants: help at the blank-page moment, keep the learner as author, and give users an off switch.
- The Socratic demos show a concrete multimodal pattern: answer an image with a guiding question, which keeps the learner doing the work.
- Points to domain benchmarks, such as K-12 math misconceptions, as the way to judge whether a model is fit for tutoring.

## Metadata
- Video: https://www.youtube.com/watch?v=qpmZID27t98
- Duration: 20:05
- Playlist index: 540
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] hi everyone I'm Steph I'm going to talk about the future of Education with multimodal AI uh we are here at AI engineering Summit and AI engineering starts very early so I'm curious how many of you have kids how many people in the room have kids okay wonderful uh how many of your kids uh have played with generative AI so far okay so um you won't be surprised to see the next slide basically 70% of generative AI users uh are from Generation Z this is a recent study from Salesforce so it starts very early and the reason I care about the future of Education with generative AI is because EDU education needs a wakeup call so we know that early L literacy rates um need to be improved around...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/qpmZID27t98.txt]]
- Description cue: We will explore how we might use AI models to combine sounds, images, and videos and create new learning activities that support critical, creative and counter-factual thinking. Showcase demos...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.

