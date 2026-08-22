---
video_id: "IAdZxqjZ45U"
playlist_index: 469
title: "Optimizing LLMs in Insurance with DSPy: Jeronim Morina"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IAdZxqjZ45U"
duration: "19:29"
duration_seconds: 1169
view_count: 5936
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/IAdZxqjZ45U.txt"
themes:
  - "Security & Guardrails"
ingested_at: "2026-04-24T12:19:37+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "An AXA Germany talk on DSPy and eval discipline where the one clearly insurance-specific constraint is hosting the LLM internally to protect customer data."
---
# Optimizing LLMs in Insurance with DSPy: Jeronim Morina

## Summary
Jeronim Morina (AXA Germany's data innovation lab) describes building a customer-facing chatbot to explain insurance terms and conditions, and argues the real gains came from disciplined evaluation and DSPy-based prompt optimization, not model choice. The team's early hand-written prompts were brittle — small prompt-text changes caused large output swings — and patching this with chaining libraries and error-handling code produced an overly complex, fragile system they judged not production-ready. Adopting DSPy required first decomposing the pipeline into isolated modules, since DSPy can only optimize a program structured that way, and off-the-shelf metrics such as exact/passage match don't work for German, forcing the team to write custom evaluators. The one concretely insurance-driven constraint is data residency: the chatbot runs on an internally hosted "secure GPT" platform on Azure (later extended to Mistral) built specifically so customer data isn't exposed to third parties. Beyond that hosting choice and the German-language tooling gap, the substance of the talk — stop trusting "looks good to me," build labeled eval sets, avoid data leakage, modularize before optimizing — is general AI-engineering practice, not something the insurance domain forced.

## Why it matters
- The one clearly domain-driven constraint is data residency: an internally hosted LLM platform exists so customer data never leaves AXA's infrastructure, not because of a modeled regulatory workflow described in the talk.
- Everything else — eval discipline, DSPy modularization, custom metrics for German — is standard AI-engineering hygiene that would apply in any vertical.
- A useful negative case for the thesis: a regulated-industry speaker whose fixes are generic engineering practice, not domain-forced verification or escalation logic.

## Metadata
- Video: https://www.youtube.com/watch?v=IAdZxqjZ45U
- Duration: 19:29
- Playlist index: 469
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Security & Guardrails]]

## Transcript excerpt
> [Music] welcome to uh optimizing LMS with this pie Beyond manual tuning and um I hate to break it to you but we all bad AI Engineers yes you are so why why why is that um because we don't care enough about solving Rebo problems um it's that we all of keep tinkering around with tools and hotbot QA data sets but let bear with me there's a way out so let's start with first principles thinking again and reminding ourselves what we are we are Engineers you know we have to reconsider the thing we are doing these these days which is like prompt engineering and start programming is systems again I mean maybe you have seen this already like left we have this huge neuron Network model but usually...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IAdZxqjZ45U.txt]]
- Description cue: In the insurance industry, LLMs promise efficiency but often get bogged down by manual tuning for optimal performance. DSPy changes the game.

## Book angles
- Could support a chapter/section on **Security & Guardrails**.
