---
video_id: "OGCG_QkCcZo"
playlist_index: 49
title: "AGI: The Path Forward – Jason Warner & Eiso Kant, Poolside"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OGCG_QkCcZo"
duration: "15:56"
duration_seconds: 956
view_count: 3782
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/OGCG_QkCcZo.txt"
themes:
  - "Coding Agents"
  - "Models & Inference"
ingested_at: "2026-04-24T10:51:36+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jason Warner and Eiso Kant of Poolside say the company exists to close the gap between models and human intelligence by training its own models from scratch, pairing next-token prediction with reinforcement learning. In a live demo their second-generation model, Malibu agent, explains an Ada codebase, converts it to Rust (about 1,152 lines), tests it, and adds command history on request. They describe a year in defense and government deployments where agents need tight permissions, over 40,000 GB300s coming online, a public release behind their API and Amazon Bedrock early next year, and an offer to partner on RL and fine-tuning."
---
# AGI: The Path Forward – Jason Warner & Eiso Kant, Poolside

## Summary
Jason Warner and Eiso Kant lead Poolside. Kant joins remotely after a missed flight. Their thesis is short: Poolside exists "to close the gap between models and human intelligence." Two and a half years ago they bet that next-token prediction was a breakthrough that needed reinforcement learning to make the leap. Kant says that bet felt like "one of the most contrarian opinions in the world" in the company's first 18 months, and is not contrarian now. They build their own models from scratch and are on the second generation, Malibu agent. Instead of slides, they run a live demo.

**The demo: Ada to Rust**
In VS Code, the agent explains an Ada codebase, a small database that Warner says runs in satellites. Kant asks it to convert the code to Rust. It writes about 1,152 lines, builds them, writes its own test commands, and reports how to run both versions. The Rust version runs as a REPL: create table, insert, select all work. Kant then asks for up-arrow command history. The agent picks a line-editing library, rebuilds, writes a bash script to test the history, and the feature works. A middle pane streams a live diff of every change. Warner stresses that the stack is Poolside end to end: "We're not using OpenAI. We're not using Anthropic."

**High-consequence environments**
For the past year Poolside has worked inside government and defense. Warner says you cannot give an agent access to data sources and tell it to "go nuts" there. You must ratchet permissions down to what those organizations accept. The coding assistant is one interface. Others include a web interface and a downloadable agent.

**Compute and roadmap**
Kant names compute as the missing ingredient. Over 40,000 GB300s are coming online, and Poolside is building a multi-gigawatt campus in West Texas. It goes "full vertical", from data centers to models. The next generation will be public very early next year, behind Poolside's API and on Amazon Bedrock, for coding-assistant builders and for other knowledge-work apps. Kant also invites teams that now do RL and fine-tuning on open models to partner on Poolside checkpoints.

**Form factor and origin**
Kant notes that their own agents already run tasks for hours, and he expects tasks lasting days in the coming years. He calls this the "awkward teenage years ahead of AGI." Warner tells how they met. As GitHub CTO in 2017 he tried to acquire Kant's company, which had code completion working on LSTMs before transformers. Kant said no, and the two became friends. They founded Poolside after ChatGPT arrived.

## Why it matters
- A clear statement of the "LLM plus RL" bet from a lab that trains coding models from scratch, with the claim that it moved from contrarian to consensus.
- The Ada-to-Rust demo is a concrete case of legacy-code migration with a self-testing agent loop: build, write tests, run, then add a feature.
- The defense-sector point (agents cannot "go nuts" with data access) shows why permissioning shapes agent design in high-consequence code.
- Kant's hours-to-days task horizon and the full-vertical compute strategy (40,000+ GB300s, a West Texas campus) give a dated data point on where model builders put their bets.

## Metadata
- Video: https://www.youtube.com/watch?v=OGCG_QkCcZo
- Duration: 15:56
- Playlist index: 49
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Models & Inference]]

## Transcript excerpt
> How many people here know what poolside is and does? Anyone? Anyone? Yeah. So, let's talk about that real quickly. Poolside exists to close the gap between models and human intelligence. That's literally it. That's what we're here to go do. We're building our own models from scratch to do this. We're based on the idea 2 and a half years ago that we thought next token prediction was an amazing techn technological breakthrough, but it need to be paired with reinforcement learning really to make that leap. So that's what we've been doing for the past 2 and a half years. So we're on our second generation of models now, Malibu agent. And instead of kind of like walking you through some slides...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OGCG_QkCcZo.txt]]
- Description cue: In Poolside's first ever public conference demo, Poolside's CEOs present their vision and roadmap towards achieving AGI-level capabilities for knowledge work.

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Models & Inference**.
