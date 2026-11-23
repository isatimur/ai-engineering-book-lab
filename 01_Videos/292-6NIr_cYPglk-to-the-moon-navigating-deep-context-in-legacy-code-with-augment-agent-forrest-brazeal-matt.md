---
video_id: "6NIr_cYPglk"
playlist_index: 292
title: "To the moon! Navigating deep context in legacy code with Augment Agent — Forrest Brazeal, Matt Ball"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=6NIr_cYPglk"
duration: "15:24"
duration_seconds: 924
view_count: 1995
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/6NIr_cYPglk.txt"
themes:
  - "Coding Agents"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:12:21+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Forrest Brazeal (a partner of Augment Code) and Matt Ball (solutions architect, Augment Code) use the Apollo 11 guidance computer, a monolithic 1960s assembly codebase, as the ultimate legacy repo. In chat mode the agent explains the 1202 program alarm in about 30 seconds by reading the source and the web. In auto agent mode, one prompt ('run simulator.py until it succeeds, do not change simulator.py') makes it write a Python P65 descent guidance class and land the simulated lunar module. Their thesis: understand with chat, pin behaviour with agent-written tests, then modernize in small modules."
---
# To the moon! Navigating deep context in legacy code with Augment Agent — Forrest Brazeal, Matt Ball

## Summary
Forrest Brazeal, who says he does not work for Augment Code but is a friend and partner of the company, presents with Matt Ball, an Augment solutions architect and former Postman employee. This 15-minute session is a shortened version of their Apollo 11 workshop. The thesis: an AI agent with a good codebase index can make even the gnarliest legacy code readable and changeable, if you pair it with tests and your own judgment.

**The product pitch**
Ball names three features. First, a context engine: Augment spent two years building a proprietary system to lift the right knowledge from a codebase into the model, on the view that high-quality output needs high-quality input. Second, it is a plugin to existing IDEs, because an enterprise team with a 10-year-old Java codebase in IntelliJ does not want to switch. Third, enterprise security, such as customer-managed encryption keys and a new AI-specific ISO standard. The product has three modes: chat for one-turn questions with more control, agent for larger tasks, and remote agents that keep running in parallel after you close the laptop.

**The ultimate legacy codebase**
The Apollo guidance computer (AGC) source was one giant monolithic assembly file, written at MIT over several years in the 1960s and now on GitHub. Few people in the room had written assembly in production. A grep for the alarm codes does not explain them.

**Demo 1: explain the 1202 alarm**
During the descent the 1202 alarm fired five times and Houston had to decide whether to abort. Brazeal asks chat mode what the alarm does. The agent reads the source, points to the octal value and the core-set registers, and pulls web context: an external radar left on overloaded the executive, which shed low-priority jobs to keep critical work running. Its summary: the computer was trying to do too many things at once and ran out of memory to track concurrent jobs. It took about 30 seconds.

**Demo 2: land the module in auto mode**
Brazeal wrote a `simulator.py` that expects a `descent` file with a lunar descent guidance class implementing P65, the fully automatic landing routine (Armstrong actually flew P66, the manual-override mode). With one prompt, "run simulator.py until it succeeds. Do not change simulator.py", the agent ran without asking permission. It found the file missing, searched the assembly through the context engine, read a test file, wrote `descent.py` with position, velocity and gravity terms, and switched from `python` to `python3` when needed. It landed within the expected zero to one meter range.

**The three-step legacy method**
1. Understand: index the code and ask chat what files do and which conventions apply.
2. Test: use chat to predict what the code should do, then have agent mode write tests for that behaviour. Brazeal warns that the agent is not always right. On the scheduler, it could not decide whether priority zero was the highest or lowest level, and "you could convince it either way". So read the surfaced code yourself.
3. Modernize: convert small modules to the target language and run the same tests. The real-world version is a Java 8 to Java 17 migration.

In Q&A an audience member names the demo as test-driven development. Ball agrees: agents love to reason and iterate, so any way they can check their own result helps.

## Why it matters
- Gives a concrete, repeatable recipe for agent-assisted legacy work: understand with chat, pin behaviour with agent-written tests, then migrate module by module.
- The 'run until it succeeds, do not change the simulator' prompt is a compact example of giving an agent a verifiable goal and forbidding it from gaming the check.
- The priority-zero confusion is a clear case where an agent's reading of old code is unstable, which argues for a human checkpoint before modernization.
- Shows how a vendor frames codebase context as the differentiator, and why IDE plugins and security controls matter for enterprise adoption.

## Metadata
- Video: https://www.youtube.com/watch?v=6NIr_cYPglk
- Duration: 15:24
- Playlist index: 292
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] Welcome everyone. Thank you so much for coming. My name is Forest. This is Matt. Uh and we're going to be talking to you today about augment agent and specifically legacy code. how we get the most out of gnarly legacy code bases using an AI agent. So I do not work for Augment Code. Um I am a friend and partner of Augment Code. So I helped to put this talk together. Matt is from Augment Code. So he's going to be your best person to come to with your most detailed technical questions after the session. Matt, anything you want to uh say about yourself? Yeah, uh I was once a software engineer and then got into the developer tool space. Um, I was at Postman for a number of years and then...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/6NIr_cYPglk.txt]]
- Description cue: Shortened presentation-only version of our Apollo 11 workshop!

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **RAG & Retrieval**.
