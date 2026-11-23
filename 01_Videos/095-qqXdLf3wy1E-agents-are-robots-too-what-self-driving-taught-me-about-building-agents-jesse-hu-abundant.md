---
video_id: "qqXdLf3wy1E"
playlist_index: 95
title: "Agents are Robots Too: What Self-Driving Taught Me About Building Agents — Jesse Hu, Abundant"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=qqXdLf3wy1E"
duration: "17:37"
duration_seconds: 1057
view_count: 2470
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/qqXdLf3wy1E.txt"
themes:
  - "Coding Agents"
  - "MCP & Tooling"
ingested_at: "2026-04-24T11:22:42+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jesse Hu, a lifelong ML engineer who worked on robotics and reward modeling in self-driving and now runs Abundant, which builds agentic-coding datasets for foundation model labs, argues that agents are robots too. The model does 1 percent of the work; the other 99 percent is the body (tools, terminal, browser, VM) and the offline stack for simulation, evaluation and retraining. He maps robotics ideas onto agents: closed-loop feedback, turn-based time discretization, input and action spaces, stateless to stateful worlds, DAgger-style out-of-distribution drift, MDPs and log-grounded simulation, and warns that action models are much harder than predictive ones."
---
# Agents are Robots Too: What Self-Driving Taught Me About Building Agents — Jesse Hu, Abundant

## Summary
Jesse Hu is a lifelong ML engineer. At YouTube and Google he worked on the two-tower embedding model and early BERT and mixture-of-experts work; in self-driving he worked on ML and robotics, with a focus on data, reward modeling and evaluation. He now works at Abundant, which builds datasets for foundation model labs training agentic coding models. This is the first version of his talk aimed at coding agents. His thesis: robotics already solved many of the problems agent builders now face, so borrow its concepts.

**The 1 percent problem and the offline stack**
People think the model does most of the work; in real applications it does about 1 percent. In robotics the rest is hardware, sensors, actuators, integration and an offline stack for simulation and training. Agents have a "body" too: APIs and MCPs, then terminal, browser, VM, the whole OS and persistent file systems. In self-driving the winning team had the best offline stack, not just the best model, because that is what lets developers ship fast and reliably.

**Open loop versus closed loop**
A car measures how far it really turned after steering. An agent that launches an open-ended bash process often cannot observe output in real time, check completion or exit early. Those loops need closing.

**Time, inputs and actions**
Robots choose input modalities (vision, lidar, radar) and sampling rates, such as 50 Hz. Agents discretize time implicitly by taking turns: easy to reason about, but they cannot react at once to a pop-up or a long-running process. He points to the Terminus agent from Terminal Bench, which streams terminal input and output character by character (so it can send Control-C), and to a "dreamer" paper that drives a computer through mouse and keyboard at 20 frames per second. Ask which design choices enable you and which limit you.

**From stateless to stateful**
A video-game car spawns from nothing; a real car has mass and history. Agents now run in stateful VMs with persistent files and live context such as Slack messages, which affects both online behaviour and how you evaluate and simulate.

**Imitation drift and consequences**
Imitation learning (like SFT on human demos) breaks once the agent drifts off the human distribution — the DAgger problem. A browser agent meets a pop-up humans always handled without thinking, and "it gets really confused." Actions have consequences in a messy world, so simulation must play out counterfactuals. The MDP formalism (state, reward, action, environment) gives a shared vocabulary.

**The self-driving warning**
From 2017 to 2020 the field focused on perception, assuming you could "make boxes" and drive around them. Hidden complexity lay in action models. LLMs likewise understand text and write long reasoning traces, but real tool chains fail and agents fail to self-correct. That is where most of the work lies.

**Why code is lucky**
Cars succeeded before other robots because they already had refined human controls, electronic controls and built-in telemetry. Code offers the same predefined actions and telemetry. When you pick a new domain, look for an existing human interface like that.

**Hill climbing with logs**
Modern systems improve by guess-and-check against a metric. Self-driving adds a loop: learn, simulate, deploy, then feed real-world logs back to ground the simulator. Break a 70 percent score down by category and triage single failures. A remote-labor benchmark shows agents are where self-driving was early on: great demos, weak end-to-end completion. He proposes the name "agentics" and a reading list: control theory, MDPs and partial observability, DAgger, offline RL and an intro RL textbook.

## Why it matters
- The "model is 1 percent of the work" and "best offline stack wins" lessons give a robotics-backed argument for investing in eval, simulation and logging infrastructure.
- Closed-loop control and turn-based time discretization name concrete harness limits, such as unobservable long-running shell processes and missed pop-ups.
- The DAgger framing explains why agents trained by imitation break on unseen states and why RL and simulation matter.
- The perception-versus-action history from self-driving is a cautionary analogy for anyone who equates strong reasoning traces with reliable agents.
- The "predefined interface plus telemetry" test is a practical way to judge which domains agents will crack next.

## Metadata
- Video: https://www.youtube.com/watch?v=qqXdLf3wy1E
- Duration: 17:37
- Playlist index: 95
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[MCP & Tooling]]

## Transcript excerpt
> All right. So this is my talk called Agents of Robots 2. I've given different variants of this talk in person for different events, but this is the first one that I've done for coding agents. So to kick things off, um just a little bit about me. I've been a lifelong ML engineer and I've worked at places like YouTube and Google where I worked on the two tower embedding model as well as some early work on BERT and mixture of experts. I worked on ML and robotics at Whimo where a lot of my focus was on the data side as well as reward modeling and evaluation. And most recently, I've been working on a company called Abundant, where we work on a lot of the same concepts applied to data sets for...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/qqXdLf3wy1E.txt]]
- Description cue: In this talk, I break down the surprising parallels between robotics and agents: embodiment, statefulness, simulation, and more. The main lesson from self-driving: everyone thought perception...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **MCP & Tooling**.
