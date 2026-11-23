---
video_id: "8kMaTybvDUw"
playlist_index: 274
title: "12-Factor Agents: Patterns of reliable LLM applications — Dex Horthy, HumanLayer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=8kMaTybvDUw"
duration: "17:06"
duration_seconds: 1026
view_count: 273360
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/8kMaTybvDUw.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:11:37+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dex Horthy of HumanLayer talked to over 100 founders and engineers and found that most production agents are mostly plain software, with small modular patterns applied to existing code. Framework-built agents stall at 70-80% quality. His 12-Factor Agents repo, modeled on Heroku's 12 factors, names those patterns: turn natural language into JSON, treat tool use as JSON plus deterministic code, own your prompts, context window and control flow, unify execution and business state so agents can pause and resume, compact errors, contact humans through tools, and build small focused micro-agents inside mostly deterministic DAGs."
---
# 12-Factor Agents: Patterns of reliable LLM applications — Dex Horthy, HumanLayer

## Summary
Dex Horthy runs HumanLayer. He describes a common arc: you build an agent on a framework, reach 70-80% quality, and get your CEO excited and six people added to the team. Then you find yourself seven layers deep in a call stack trying to learn how the prompt is built, and you throw it away. His first DevOps agent needed two hours of prompt detail to run make steps in order, a job a 90-second bash script could do. Not every problem needs an agent.

**Where the factors come from**
He talked to over 100 founders, builders and engineers. Most production agents were not very agentic; they were mostly software. Teams did not rewrite from scratch. They applied small, unnamed patterns to existing code. Just as Heroku defined how to build cloud apps, he wrote down 12 factors for agents. The GitHub repo hit the Hacker News front page, about 4,000 stars in a month or two, and 14 active contributors. He says it is not an anti-framework talk but a wish list for frameworks.

**The core factors**
- Factor 1: the most magical thing an LLM does is turn a sentence into JSON.
- Factor 4, "tool use is harmful" (in quotes): tools are not an alien entity acting on the world. The LLM emits JSON, deterministic code acts on it, and the result may go back in.
- Own your control flow: an agent is a prompt that picks the next step, a switch statement, a context builder, and a loop that decides when to exit. The naive loop of appending everything fails on long workflows, because fewer, tighter tokens give better results. Owning the loop lets you break, summarize, or add an LLM-as-judge.
- Unify execution state and business state, and expose the agent behind a REST API or MCP server. On a long-running tool call, serialize the context window to a database, then reload it by state ID when the result arrives. The agent never knows it paused.
- Factor 2, own your prompts: prompt tools give a good start, but past some quality bar you write every token by hand.
- Own your context window: LLMs are pure functions, tokens in and tokens out, so everything is context engineering. You need not use the standard messages format; you can pack history into one dense user message.
- Compact errors: feeding errors back lets the model retry, but it can spin out. Summarize errors, skip stack traces, and clear them after a valid call.
- Contact humans with tools: make the first-token choice between a tool call and a message to a human explicit, in natural language (done, need clarification, escalate). Let users reach agents through email, Slack, Discord or SMS.
- Small, focused agents: what works is micro-agents with 3-10 steps inside a mostly deterministic DAG. HumanLayer's deploy bot takes over after a merged PR with passing tests, proposes a frontend deploy, accepts a human's instruction to do the backend first, then returns to deterministic end-to-end tests, with a rollback agent on failure.
- Agents should be stateless; you own the state.

**The takeaway**
As models improve, LLMs will take over bigger parts of a pipeline, but you still need engineering. Citing someone from NotebookLM, he says to find tasks at the edge of what models do reliably and engineer reliability in anyway. He is working on a scaffolding tool, create 12-factor agent, in the style of shadcn: generated code you own rather than a wrapper. Frameworks should take away the non-AI hard parts so builders can spend their time on prompts, flow and tokens. HumanLayer is also working on a protocol for how agents contact humans.

## Why it matters
- Gives a named, citable checklist for production agents, grounded in interviews with over 100 teams rather than one company's stack.
- Demystifies agents as ordinary software (JSON out, switch statement, loop, state), which lets teams apply existing engineering practice to reliability.
- Explains why framework agents plateau at 70-80%: hidden prompt and context assembly blocks the token-level tuning that the last 20% needs.
- Gives a concrete production pattern, micro-agents of 3-10 steps embedded in deterministic CI/CD with human approval, as an alternative to long autonomous loops.
- Frames context engineering (owning every token of prompt, history and errors) as the central reliability lever.

## Metadata
- Video: https://www.youtube.com/watch?v=8kMaTybvDUw
- Duration: 17:06
- Playlist index: 274
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Who here's building agents? Who here's your hand up if you built like 10 plus agents? Anyone here built like a hundred agents? All right, we got a few. Awesome. Love it. Um, so I think a lot of us have been on this journey of building agents. Um, and what happened with me was, you know, I decided I want to build an agent. We figured out what we wanted it to do. Uh, we want to move fast. We're developers, so we use libraries. We don't write everything from scratch. Um, and you get it to like 70 80%. It's enough to get the CEO excited and get six more people added to your team. But then you kind of realize that 70 80% isn't quite good enough. And that if you want to get past that 70...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/8kMaTybvDUw.txt]]
- Description cue: Hi, I'm Dex. I've been hacking on AI agents for a while.
    
    I've tried every agent framework out there, from the plug-and-play crew/langchains to the "minimalist" smolagents of the world...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/humanlayer/12-factor-agents>
- resource: <https://news.ycombinator.com/item>
