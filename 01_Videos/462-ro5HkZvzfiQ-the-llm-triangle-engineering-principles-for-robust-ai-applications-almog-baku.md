---
video_id: "ro5HkZvzfiQ"
playlist_index: 462
title: "The LLM Triangle: Engineering Principles for Robust AI Applications - Almog Baku:"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ro5HkZvzfiQ"
duration: "26:19"
duration_seconds: 1579
view_count: 1453
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/ro5HkZvzfiQ.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:19:20+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Almog Baku, a serial entrepreneur who has helped build dozens of LLM applications, argues that LLM-native apps are 10% sophisticated models and 90% experimentation and data-driven engineering. His LLM Triangle joins model, engineering techniques and contextual data, all guided by a standard operating procedure taken from expert interviews. He treats the LLM as a smart but inexperienced intern, prefers crafted flows to unbounded autonomous agents, starts with a big model and optimizes later, and calls data the king: give relevant context and pick few-shot examples per case."
---
# The LLM Triangle: Engineering Principles for Robust AI Applications - Almog Baku:

## Summary
Almog Baku is a serial entrepreneur whose previous company worked in AI infrastructure. He founded an Israeli community of 5,000 engineers, researchers and data scientists who build AI applications, and over two years he has helped build dozens of LLM applications for customers. His problem: proofs of concept are easy, but production quality is "damn hard", because every demo meets the one case that breaks it. His claim, which he admits he made up: LLM-native apps are 10% sophisticated models and 90% hard experimentation and data-driven engineering. He suggests treating LLMs as a new kind of resource, like a CPU or GPU.

**The LLM Triangle**
Three principles, model, engineering techniques and data, guided by a fourth: the standard operating procedure (SOP).

**The SOP: treat the LLM as an intern**
He borrows SOPs from manufacturing. A fulfilment centre does not hire a physics PhD to wrap packages; it gives interns exact step-by-step instructions. The LLM is the same: smart, agreeable and inexperienced at your task. To write the SOP, interview a real expert, or play the expert. Break the task into steps, reflect them back, and hunt for the hidden cognitive jumps the expert never mentions. In his landing page builder example, the expert writes a compelling story between gathering data and writing the page. Drawing the process as a graph helps with loops and recursion.

**Engineering techniques**
Some live in the prompt (chain-of-thought, role assumption, few-shot), some in software (chains, tools, fine-tuning), and some in between (ReAct, structured output). He focuses on two:
- LLM-native architecture (flow engineering, chains, workflows): split the SOP into steps. His Wikipedia writer normalizes the request, categorizes the subject, searches Google, converts results to markdown with plain code, then writes a table of contents. Not everything should be an LLM call. Deterministic code gives consistent quality.
- Agents: model plus prompt template equals agent. An autonomous agent also gets tools and decides how to get from A to B. Autonomous agents are elegant and fast to build, but hard to debug, and their quality is unsustainable. Crafted flows are predictable and debuggable but expensive to build. His advice: scope autonomous agents within clear borders.

**The model**
Match the model to the task by complexity, infrastructure, latency, cost, budget and available data. Large models handle most tasks but are not fast or cheap. Small models suit simple tasks or tasks with lots of data. His advice: start with a big model, collect data, understand it, then optimize step by step. Do not fine-tune from day zero.

**Data is the king**
The model only sees one stateless text. Prompt templates are a trick for us. He doubts vendor claims about needle-in-a-haystack, because real tasks have many needles in a huge haystack. Give enough context, but not too much. Few-shot means show, don't tell: with examples, the model classifies a PlayStation as consumer electronics instead of a gaming console. Some teams pick five to seven examples per request by vector similarity, keyword or category.

## Why it matters
- The 10% model, 90% engineering framing sets expectations for anyone moving an LLM proof of concept to production.
- Building an SOP from expert interviews, and hunting for the expert's hidden cognitive jumps, is a concrete method for turning domain knowledge into prompts and flows.
- His trade-off between autonomous agents and crafted flows, ending in scoped autonomy, gives a clear design rule for production reliability.
- Start big, collect data, then optimize gives a practical model-selection sequence that delays fine-tuning until data exists.
- Dynamic few-shot selection by similarity, keyword or category is a specific technique for teaching concepts that are hard to describe in words.

## Metadata
- Video: https://www.youtube.com/watch?v=ro5HkZvzfiQ
- Duration: 26:19
- Playlist index: 462
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> hey thank you for having me and thank you for being here today here we going to talk about the ANM triangle principles engineering principles for building robust AI applications my name is elog and I'm going to talk with you about surprise surprise llms so this is a pre-recorded session but I think it's a safe bet to say that everyone everyone told you today or go tell you today that L&M are amazing they going to change the world they they basically going to shift the way how we think about technology and software and to be honest most of the use cases today are just like sparkles like small projects that a little bit enhance the workflow and regarding to what they said I totally agree with...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ro5HkZvzfiQ.txt]]
- Description cue: Let's face it: most LLM App PoCs are a disaster waiting to happen. Hallucinations, inconsistency, and scalability nightmares abound. Enter the LLM Triangle - a framework for building reliable,...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.

