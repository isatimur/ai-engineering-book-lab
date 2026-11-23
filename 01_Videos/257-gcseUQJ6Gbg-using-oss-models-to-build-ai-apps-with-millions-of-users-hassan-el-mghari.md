---
video_id: "gcseUQJ6Gbg"
playlist_index: 257
title: "Using OSS models to build AI apps with millions of users — Hassan El Mghari"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=gcseUQJ6Gbg"
duration: "18:47"
duration_seconds: 1127
view_count: 6336
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/gcseUQJ6Gbg.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:10:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Hassan El Mghari leads developer relations at Together AI and has shipped about one open-source AI app a month for four years, some with over a million users. His thesis: viral AI apps are a numbers game won by radical simplicity. Most of his apps make one or two API calls to an open-source model, store the result, and show it. He spends 80% of his time on the UI, launches within days of a new model release, keeps every app free and open source, and builds a share loop into each one. Swapping in a better model is often a one-line change that relaunches an old app."
---
# Using OSS models to build AI apps with millions of users — Hassan El Mghari

## Summary
Hassan El Mghari leads developer relations at Together AI, an inference platform for open-source chat, reasoning, image, vision and audio models. He has built roughly one AI app a month for four years, all open source. The video description lists roomGPT.io at 2.9 million users and restorePhotos.io at 1.1 million. His argument: shipping many small, polished apps on the newest open models beats one big product, because you cannot predict which idea will take off.

**The apps**
Early on he took ideas from tweets: a glasses picker that turns requirements into an Amazon product query, and a commit-message tool that sends the git diff to a model (about 40,000 installs). His text-to-app builder Llama Coder plans with one model and writes React with another; it has seen about 5 million requests, a million apps built and over a million users. Blinkshot, a real-time image generator, has over a million users and about 48 million images. Others turn a napkin sketch into a web app, a resume into a personal site, or a topic into a tutor-style explanation.

**One architecture, one stack**
Almost every app follows four steps: user input, one call to a model on Together AI, store the result in a database, show it. Often there is a single API call. The stack is Next.js and TypeScript, Neon Postgres, Clerk auth, Prisma, Tailwind and shadcn-style components, S3 for uploads, Plausible for web analytics, an LLM-request analytics tool, and Vercel hosting. Analytics showed him that most users arrive on mobile.

**The seven-step process**
Keep a running list of ideas with a top-five shortlist. Pick a short, memorable name with a free domain. Sketch the two screens. Build the simplest working version. Then decide on cost limits, auth, or bring-your-own-key. Prepare the launch with an OG image, analytics and a clean README. Launch on LinkedIn or X.

**Seven tips**
- The idea must fit in five words ('generate real-time images').
- Make the UI look good; he spends 80% of his time there. A polished PDF summarizer drew tens of thousands of users even though chat apps already do the job.
- Keep it to one or two API calls.
- Use the newest models. He launched Blinkshot about two days after a fast new Flux model came out.
- Launch early. Forty apps in, he still cannot predict hits, so a week of work is the right bet size.
- Make it free and open source, so people learn from it and share it.
- Keep shipping; it is a numbers game.

**Q&A points**
Apps where users can easily share what they made do far better, so he now designs a viral loop with a good OG image. Together AI sponsors the inference, and companies like Neon and Clerk give free accounts because the projects are open source; he says most vendors will give credits if you ask. Upgrading to a better model is often a one-line change, and he relaunches old apps that way.

## Why it matters
- Gives a concrete, repeatable template for consumer AI apps: one model call, store, display, with a named stack for each layer.
- Shows that UI polish and a share loop, not model novelty alone, drive adoption, backed by the 80%-of-time-on-UI claim and the PDF summarizer example.
- Frames model churn as an advantage: a one-line model swap can relaunch an existing app, so speed to a new open model is a distribution strategy.
- Offers a sponsorship model for free apps: vendor credits for open-source projects cover inference, database and auth costs.

## Metadata
- Video: https://www.youtube.com/watch?v=gcseUQJ6Gbg
- Duration: 18:47
- Playlist index: 257
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hello everybody. Thank you for uh coming. My name is Hassan. I'm super excited to be here today uh to talk to you about uh how to use open source models to build AI apps with millions of users. Um, I've been building AI apps for for several years now and I just want to come tell you a little bit about my journey, show off some of the apps, and then tell you about uh kind of my whole process uh of of building these apps from idea to having the finished app and uh how I uh market them as well, and then some some uh advice overall. So, I'll start off with some intros about who I am, Together AI, the company I work for, uh why it's one of the best times to build right now, and then...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/gcseUQJ6Gbg.txt]]
- Description cue: In this talk, Hassan will go over how he builds open source AI apps that get millions of users like roomGPT.io 2.9 million users, restorePhotos.io 1.1 million users, Blinkshot.io 1 million...

## Book angles
- Could support a chapter/section on **Models & Inference**.
