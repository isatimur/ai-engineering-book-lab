---
video_id: "fmZWvE7yDZo"
playlist_index: 223
title: "UX Design Principles for Semi Autonomous Multi Agent Systems — Victor Dibia, Microsoft"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=fmZWvE7yDZo"
duration: "20:28"
duration_seconds: 1228
view_count: 4816
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/fmZWvE7yDZo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
ingested_at: "2026-04-24T12:08:48+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Victor Dibia (Microsoft Research, AutoGen and AutoGen Studio) builds Blender LLM, a from-scratch multi-agent system that turns natural language into 3D scenes in a live Blender instance, with a planner agent and a verifier agent that checks scene snapshots. His build order is goal, non-AI baseline, tools (about 50% of the time), eval test bed, then the agent. He gives four UX principles for semi-autonomous agents: capability discovery, observability and provenance, interruptibility with checkpoints and rollback, and cost-aware delegation to the user. He warns that only a small share of tasks truly benefit from multi-agent designs."
---
# UX Design Principles for Semi Autonomous Multi Agent Systems — Victor Dibia, Microsoft

## Summary
Victor Dibia is a principal research software engineer at Microsoft Research who works on human-AI experiences. He worked on the open-source multi-agent framework AutoGen and built AutoGen Studio, a low-code tool for composing agent teams from models and tools. Instead of touring AutoGen Studio, he builds a multi-agent system from scratch, with no framework, and draws UX principles from it. His thesis: semi-autonomous agents need eval-driven construction and a UX that lets users discover, watch, interrupt and approve what the agent does.

**An early agentic workflow**
In August 2022, about four months before ChatGPT took off, Dibia built a data tool that summarized a CSV or JSON file, generated questions, wrote and ran code with error recovery, and produced visualizations. On the Davinci Codex models its error rate was about 20%. About three months later, tuned on GPT-3.5 Turbo, it fell to about 1.5%.

**Blender LLM**
Learning Blender took him 40 to 50 hours of a famous donut tutorial, so he built Blender LLM to go from natural language to a 3D scene. A web UI talks to a live Blender instance over a websocket and streams every step. Asked for two glossy silver balls, a planner agent breaks the task into steps (ground plane, two spheres, material). A tool-calling loop runs each step. A verifier agent snapshots the scene's object list and an image, and an LLM judges whether the task is progressing, stalled or done. The UI also keeps fixed buttons, such as clear scene, that the user can press directly.

**Workflow or autonomy**
Deterministic workflows are reliable but need you to know the solution in advance. In Blender every action changes the space, so he uses an exploratory system where the LLM drives control flow. Such systems need autonomy, actions with side effects, and long-running task decomposition.

**Build order**
Define the goal. Build a baseline with no AI (a hello-world script that adds a cube through a Blender add-on and socket client). Build tools, both task-specific ones and a general execute-code tool. "Your agent is always only as good as the tools you give it", so spend about 50% of your time there. Build a test bed in three stages: a Jupyter notebook, an interactive web UI, then an automated eval suite with metrics. Only then build the agent: a base loop first, then the verifier, then the planner, each justified by measured gains.

**Four UX principles**
- Capability discovery: show the tasks the agent does with high reliability, and suggest actions from the user's context, such as the open scene.
- Observability and provenance: stream activity logs, and show tokens used and time per step.
- Interruptibility: pause, resume, checkpoint and roll back.
- Cost-aware delegation: to the LLM all tool calls look equal, so a module should estimate each action's risk (for example, generated code that could delete the operating system) and hand off to the user.

**When to go multi-agent**
Only a small circle of tasks benefits. Check whether the task gains from planning, from several personas, from splitting large context across agents, and from adapting to a changing environment. Academic benchmarks "are not your task". And he advises using a framework instead of writing everything from scratch.

## Why it matters
- The build order (goal, non-AI baseline, tools, test bed, then agent) is a concrete recipe against starting with the agent first, and it ties every added agent to a measured improvement.
- The four UX principles give a checklist for any agent product that takes real actions: discovery, visible traces, interruption, and cost-aware hand-off.
- The planner plus verifier pattern, with the verifier judging progress from a state snapshot, is a reusable design for agents working in environments that change after each action.
- The 20% to 1.5% error drop from one model generation shows how much an agentic workflow's reliability depends on the underlying model.
- His warning that few tasks need multi-agent systems, with a test for when they do, balances the hype around agent swarms.

## Metadata
- Video: https://www.youtube.com/watch?v=fmZWvE7yDZo
- Duration: 20:28
- Playlist index: 223
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]

## Transcript excerpt
> [Music] Hi everyone. U my name is Victor Dia. I'm a principal research software engineer at Microsoft Research and um my background is mostly around uh human AI experiences. So that's sort of where I'm interested in right now. And over the last few years, I've been sort of looking at scenarios where a human works in tandem with an AI agent to solve problems. And so one of the things that work done at Microsoft research is GitHub copilot. So how many of you have used GitHub copilot? Excellent. And so I think in my opinion is the first example of an AI model working at scale um in ID helping the developer solve a problem. Go ahead. You can switch that. And um beyond that um more recently I...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/fmZWvE7yDZo.txt]]
- Description cue: Autonomous or semi-autonomous multi-agent systems (MAS) involve exponentially complex configurations (system config, agent configs, task management and delegation, etc.). These present unique...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.

