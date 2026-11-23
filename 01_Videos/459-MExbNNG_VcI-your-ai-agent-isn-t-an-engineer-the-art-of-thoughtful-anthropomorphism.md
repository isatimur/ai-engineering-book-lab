---
video_id: "MExbNNG_VcI"
playlist_index: 459
title: "Your AI Agent Isn't an Engineer: The Art of Thoughtful Anthropomorphism"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MExbNNG_VcI"
duration: "20:20"
duration_seconds: 1220
view_count: 927
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/MExbNNG_VcI.txt"
themes:
  - "Org Design & Leadership"
  - "Coding Agents"
ingested_at: "2026-04-24T12:19:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A staff developer advocate (handle blackgirlbytes) at the company behind the codename Goose agent, formerly on GitHub Copilot, argues that the 'will AI replace engineers' fear is self-inflicted: the industry marketed agents as human engineers to sell cost cuts. That anthropomorphism alienates developers, who are AI's power users (76% use or plan to use AI, per the 2024 Stack Overflow survey), sets unrealistic expectations, and hides the real value of parallel work. Her eight-part framework for thoughtful anthropomorphism covers naming, augmentation over replacement, transparency, developer control and live demos."
---
# Your AI Agent Isn't an Engineer: The Art of Thoughtful Anthropomorphism

## Summary
The speaker is a staff developer advocate for open source and AI at the company that built the codename Goose agent. Before that she did the same job for GitHub Copilot. Her online handle is blackgirlbytes. The talk is about developer marketing and developer relations for AI tools, and her thesis is blunt: calling your agent a software engineer is "self-sabotage".

**Where the replacement narrative came from**
She says the industry built it. Selling a tool to executives who already pay engineers $300,000 to $500,000 is hard, so marketers pitched the tool as a way to cut engineers. That raises real stakes: she cites Salesforce's CEO, who announced plans to hire fewer software and support engineers after seeing a 30% productivity boost from AI.

**Anthropomorphism is normal, but AI is different**
Giving human traits to non-human things makes tools familiar: e-book page-turn sounds, pre-recorded engine sounds in electric cars. But AI is a complex black box, so human framing hides its limits. Her examples: an airport ad saying you've got a friend in Claude, Devin launched as an AI software engineer, and ChatGPT saying it is thinking or reasoning.

**Three harms**
- It alienates developers, who are AI power users. In the 2024 Stack Overflow survey, 76% of developers used AI or planned to. A Wired article on game developers reported 52% of companies had adopted generative AI, while 30% of surveyed developers felt negative about it.
- It sets unrealistic expectations. AI is non-sentient, trained on historical patterns, misses context, hallucinates and is non-deterministic. When it falls short of a mid-level engineer, the product loses credibility.
- It hides the real value: parallel work, automating boring tasks, faster prototyping and debugging, so developers can do more creative work.

**The framework for thoughtful anthropomorphism**
1. Understand how it works. Become "customer zero" and learn tokens, context management, tool calling and the agentic loop. She demos Goose playing tic-tac-toe by screenshot. It struggles, retries, and she wins.
2. Name thoughtfully. Use non-human names and terms like copilot, agent or assistant. Avoid titles like AI engineer. She praises GitHub for the term copilot.
3. Augmentation over replacement. Developers are multitaskers, and an agent lets them work in parallel.
4. Be transparent. Open source, white papers, talks. When Copilot went public, people on Twitter Spaces wrongly claimed it searched repos and stole code.
5. Give developer control: choice of LLM, verbosity, debug logs, integrations. Goose connects to MCP servers as extensions.
6. Show, don't tell. Short videos and live demos, including failures. Her Copilot demo posted a tweet live from a conference.
7. Write good docs: install guides, prompt playbooks, data-use notes.
8. Foster open collaboration, as with the community-built cursor.directory of shared prompts.

## Why it matters
- It ties a hiring-market fear to a specific marketing choice, which gives a book a concrete case of how product framing shapes adoption.
- Its three harms (alienated power users, unrealistic expectations, hidden value) explain why agent products can lose developer trust even when they work.
- The naming advice, copilot or assistant instead of engineer, is a cheap, specific decision for any team that ships an agent.
- Showing failures in live demos and opening up how the tool works are offered as trust builders, backed by her Copilot misinformation story.
- It reframes the agent's value as parallel work and augmentation, a useful counterweight to replacement claims.

## Metadata
- Video: https://www.youtube.com/watch?v=MExbNNG_VcI
- Duration: 20:20
- Playlist index: 459
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Coding Agents]]

## Transcript excerpt
> hey everyone today I'm going to talk to you about why you should stop referring to your AI agent as a software engineer and the Art of thoughtful anthropomorphism now these are a lot of convoluted terms but really what I'm just trying to say is how to do better developer marketing and developer relations for your AI agent and other AI related tools my name is Roselle scarlet and I am a staff developer Advocate at blog where I focus on all things open source and all things AI prior to this I work at GitHub basically doing the same thing but for GitHub co-pilot now I want to know about you as well I know we're virtual but please interact with me raise your hand if you've ever been personally...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MExbNNG_VcI.txt]]
- Description cue: Raise your hand if you've been personally victimized by the question: 'Will AI replace software engineers?'—a question our industry invited by marketing AI agents as 'human engineers' instead...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Coding Agents**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://dev.to/blackgirlbytes/your-ai-agent-isnt-an-engineer-5egf>
