---
video_id: "ya_9_niq2as"
playlist_index: 454
title: "Your LLM Ran Out of Knowledge — Now What?"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=ya_9_niq2as"
duration: "12:51"
duration_seconds: 771
view_count: 726
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/ya_9_niq2as.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:19:01+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A risk and security management practitioner argues that LLMs fall short in low-knowledge domains such as corporate negotiation and geopolitics, because experts never write down what happens in the room. His fix copies how we train a smart new graduate: give the model rules of thumb. His demo pipeline matches the prompt to a domain heuristic set with an LLM prompt instead of tool use, rewrites the scenario into a standard format, adds binary, provable rules, then sends it to a reasoning model with a World Sim prompt. The output cites the rules and drops scenarios that break them."
---
# Your LLM Ran Out of Knowledge — Now What?

## Summary
The speaker works in risk and security management. He does not give his name in the transcript; the talk links to a repo called OracReasoningEngine. His question: how does a reasoning model solve problems in a domain where nobody gave it training data?

**The knowledge gap**
Models are strong at coding, math, law and physics because those fields have large bodies of well-structured material. Other domains do not. In a corporate acquisition, the Wall Street Journal reports the start and the Financial Times or CNBC reports the outcome. Nobody records what happened in the negotiating room. That wisdom stays in people's heads. He blames practitioners, his own field included: "we don't write things down". The result is that some professions get ever-better models while others are left behind.

**Borrow how we train graduates**
A recent graduate is intelligent but low in wisdom. One thing that works is to give them heuristics and rules of thumb for the domain, so they can apply their intelligence while they build experience. He does the same with LLMs: domain rules layered on top of strong reasoning.

**The pipeline in the demo**
He feeds in a long intelligence-estimate prompt about semiconductor development.
1. Heuristic match. A dedicated LLM prompt decides what kind of problem this is and which rule set applies. He says tool use "wasn't working out" as well as he hoped, so he chose this longer route, and a larger prompt gives more granularity.
2. Standardize. The scenario is parsed into a fixed structured format, which the user can edit in the front end. He found that standardization helps models work best.
3. Apply rules. The demo has two rule sets, negotiations and geopolitics. The rules are binary must and must-not statements, written to be provable, for example to prioritize agreements that create the highest combined value. A higher-level heuristics prompt sets overall behaviour and pulls in the right rule file. The files are split only to keep the prompt manageable and easy to edit.
4. Reason. The package goes to any model you trust. Here it goes to an Anthropic model running a World Sim prompt, which adds real-world constraints such as physical geography and bodies like the UN and WTO.

**What the output shows**
The answer follows the given structure, cites rules such as two times leverage and greater than 50% control, and eliminates scenario 5 because it breaks a rule. He calls the approach a work in progress with positive first results. He wants a subject matter expert in the loop to write tight rules and review the dozens of scenarios the system generates.

## Why it matters
- It names a real limit of reasoning models: domains where expert knowledge was never written down give the model nothing to learn from.
- Encoding expert heuristics as binary, provable rules is a cheap way to add domain expertise without fine-tuning, and it makes rule use visible in the output.
- The pipeline order (classify, standardize, apply rules, then reason) is a reusable pattern for structured analysis tasks.
- His report that a classification prompt beat tool use for routing is a practical data point, even if anecdotal.
- It frames the expert's role as rule author and scenario reviewer, with the model generating many options fast.

## Metadata
- Video: https://www.youtube.com/watch?v=ya_9_niq2as
- Duration: 12:51
- Playlist index: 454
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> so it wasn't that long ago that we were all talking about chat Bots And It Felt Like Only Yesterday that we were excited about agents but today all we're talking about is reasoning and how these models can now reason through complex problems but how is a model going to solve a problem when we haven't been able to give it any training data or knowledge in that specific domain [Music] so what I want to do here is share a technique that you might want to try in one of these low knowledge domains so what do I mean by that well we know that the models are great at coding and the models are great at math and that's not surprising because we have large bodies of trainable material well structured...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/ya_9_niq2as.txt]]
- Description cue: LLMs are great when there is sufficient training material, but what do we do when there is little or no knowledge to train on?

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/agsheves/OracReasoningEngine>
