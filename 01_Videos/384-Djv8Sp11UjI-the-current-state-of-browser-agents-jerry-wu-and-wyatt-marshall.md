---
video_id: "Djv8Sp11UjI"
playlist_index: 384
title: "The Current State of Browser Agents - Jerry Wu and Wyatt Marshall"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Djv8Sp11UjI"
duration: "21:13"
duration_seconds: 1273
view_count: 623
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Djv8Sp11UjI.txt"
themes:
  - "Evals & Reliability"
  - "Models & Inference"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:16:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jerry Wu and Wyatt Marshall, founders of Halluminate, report results from WebBench, their benchmark of over 5,000 read and write tasks (about half open-sourced) on close to 500 websites. Leading browser agents reach about 80% on read tasks, close to a human-supervised OpenAI Operator baseline, but drop 50% or more on write tasks, which have longer trajectories, harder forms, login and credential problems, and stricter anti-bot checks. Many failures come from browser infrastructure, not the agent, and agents are very slow. Their advice: pick read versus write use cases deliberately, test several infra providers, and mix agents with deterministic Playwright flows."
---
# The Current State of Browser Agents - Jerry Wu and Wyatt Marshall

## Summary
Jerry Wu and Wyatt Marshall founded Halluminate, which builds realistic environments to train computer and browser use AI. Their thesis: browser agents are already good at reading the web, still weak at changing state on it, and much of the gap is infrastructure, not intelligence.

**What a browser agent is**
Any AI that controls a web browser to execute tasks for a user. Most run the same loop: observe (a screenshot for the VLM approach, or extracted HTML and DOM for a text approach), reason about the next step, then act (click, scroll, type), and observe the new state. Common use cases: web scraping (for example sales prospecting), software QA, form and job-application filling, and generative RPA replacing brittle traditional RPA workflows.

**WebBench**
Evaluating means building realistic, feasible, domain-specific, scalable tasks, then judging them by validation function, human annotators, or LLM-as-judge, and controlling where the agent runs. They split tasks into read tasks (information gathering) and write tasks (changing state on a site). WebBench has over 5,000 tasks, about half open-sourced, on close to 500 websites, which they call the largest web-use data set they know of.

**Results**
- Read tasks: the leading agent hits about 80%, level with an OpenAI Operator baseline with human-in-the-loop supervision. Most of the remaining 20 to 25% of failures are infrastructure and internet issues.
- Write tasks: performance drops about 50% or more for autonomous agents, while the supervised Operator baseline drops only about 10%. Reasons: longer trajectories (some write tasks take almost three times the steps), harder UI and forms, login and credential management, and stricter anti-bot checks, such as a captcha that appears only at input. Their Allrecipes recipe-submission example needs two login steps and a dynamic form, and fails.
- Combined: the best agent completes about two-thirds of tasks, the average is a little over 50%. Marshall reads this as more impressive than negative.

**Failure taxonomy**
Agent failures: a popup the agent cannot close, or a timeout. Infrastructure failures: flagged as a bot before entering the site, or no access to email verification during login. A mixed "agent and infra" slice (captcha, proxy, login) is large, so better infra alone would lift scores a lot. Agents are also very slow, partly because failing agents "death spiral" until timeout. Latency is fine for async set-and-forget jobs but a big problem in real time.

**Advice for builders**
1. Decide whether your use case is read or write. Read works out of the box; write needs rigorous internal evals before production.
2. Browser infrastructure matters a ton. Providers are interoperable, so test several. If proxies get blocked on your target sites, message the provider.
3. Go hybrid: "laying train tracks" with deterministic Playwright for high-volume steps and using agents for long-tail, changing flows.

They expect progress from long-context memory, infrastructure primitives for login, auth, and payments, and better models trained in browser sandboxes.

**Odd behaviour seen in testing**
An agent stuck on GitHub chatted with GitHub's own AI assistant to unblock itself. An agent's Medium comment became the top-liked post. Restaurant bookings kept arriving on their phones. Most alarming: blocked by Cloudflare, one agent searched Google for ways to bypass Cloudflare verification.

## Why it matters
- Supplies hard numbers for the read-versus-write gap in browser agents (about 80% read, roughly halved on write), useful for setting expectations in any chapter on computer use.
- The agent-versus-infrastructure failure split shows that evals must control the environment, or you blame the model for proxy and captcha problems.
- The supervised Operator baseline barely drops on write tasks, which argues for human-in-the-loop on state-changing actions.
- The hybrid train-tracks pattern, plus the Cloudflare-bypass anecdote, gives concrete material on reliability and safety at production scale.

## Metadata
- Video: https://www.youtube.com/watch?v=Djv8Sp11UjI
- Duration: 21:13
- Playlist index: 384
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Models & Inference]]
- [[Agent Architecture]]

## Transcript excerpt
> Hi guys. Um I'm Jerry. This is Wyatt. Uh welcome to our talk. We're talking about the current state of browser agents. Wyatt and I are founders of illuminate. Uh we build realistic environments to help train computer and browser use AI, but that's not as important for today's talk. Today we are going to talk about three topics which is first uh we're we're going to discuss what are browser agents. Second, we're going to talk about how good they are currently. And these finders are going to be powered by a benchmark that we actually just published last week. And lastly, we're going to talk about what it means for you, the listener and AI engineer trying to build with browser agents today....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Djv8Sp11UjI.txt]]
- Description cue: Browser agents are here. But beyond simple sample use cases (I'm looking at you flight booking demo), are they as good as advertised?

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Agent Architecture**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- model: <https://huggingface.co/datasets/Halluminate/WebBench>
- repo: <https://github.com/Halluminate/WebBench>
- resource: <https://halluminate.ai/blog/benchmark>
