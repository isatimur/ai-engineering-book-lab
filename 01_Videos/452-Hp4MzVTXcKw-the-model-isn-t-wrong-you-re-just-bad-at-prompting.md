---
video_id: "Hp4MzVTXcKw"
playlist_index: 452
title: "The Model Isn’t Wrong—You’re Just Bad at Prompting"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Hp4MzVTXcKw"
duration: "8:54"
duration_seconds: 534
view_count: 2858
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Hp4MzVTXcKw.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:18:56+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Dan, co-founder of PromptHub, argues that prompt engineering is still the simplest lever on LLM output and that teams should exhaust it before reaching for complex RAG. He covers chain-of-thought (zero-shot, few-shot and auto-generated reasoning chains), few-shot prompting, where one or two diverse examples capture most of the gain, and meta prompting with provider-specific meta prompts. His key turn: reasoning models need the opposite treatment. Give a minimal, clear task, encourage more reasoning, avoid few-shot examples, and do not tell the model how to reason."
---
# The Model Isn’t Wrong—You’re Just Bad at Prompting

## Summary
Dan is co-founder of PromptHub, "the GitHub for prompts", based in New York. His short talk is a field guide to three prompting methods and to how reasoning models change the rules. Each method comes with a free PromptHub template.

**Why prompt engineering still matters**
Everyone has access to the same models, he says. The prompts and the architecture around them are where a product gets its edge. He cites Anthropic's agents post on going for the simplest solution. His warning: do not spend an hour on a prompt, decide the task is impossible, and jump to complex RAG. If a prompt can solve it, the system is much simpler to manage.

**Chain-of-thought**
Tell the model to reason before it answers. This splits the problem into sub-problems and shows how the model thinks, which helps troubleshooting. Three ways to do it:
- Zero-shot: add a phrase such as "think step by step".
- Few-shot: include a solved example with its reasoning steps, for example a worked math problem.
- Generated chains: let an LLM write the reasoning chains. He names automatic chain-of-thought and Auto Reason, a single prompt that produces chains for your task. He notes that DeepSeek trained R1 on generated thinking inside think tags.

**Few-shot prompting**
Show rather than tell. His example: to match a client's tone, give brief-and-content pairs, then a new brief for the model to complete. Most of the gain comes from one or two examples. Performance can even drop with more. Make the examples diverse so they cover the inputs you expect.

**Meta prompting**
Use an LLM to create, refine or improve a prompt. Anthropic and OpenAI both offer free tools. PromptHub's version runs a different meta prompt per model provider, because a prompt that suits OpenAI models may not suit Anthropic ones. It also has a copilot loop where you run prompts and give feedback.

**Reasoning models flip the advice**
- Microsoft's Medprompt work found that adding examples made a reasoning model worse. DeepSeek's R1 team also saw few-shot degrade performance. OpenAI warned that extra context can confuse these models.
- More reasoning helps. Prompting the model to think longer gave better results, and DeepSeek saw response length and accuracy rise together in training.

His checklist for reasoning models: minimal prompting with a clear task description; encourage more reasoning for the last bit of performance; avoid few-shot, or start with one or two examples; and do not instruct the model how to reason, because that can hurt.

## Why it matters
- It gives a clear rule for build order: try prompting seriously before adding RAG or other architecture, because a prompt-only system is simpler to manage.
- The point that one or two diverse examples capture most of the few-shot gain, and more can hurt, sets a cheap default for example budgets.
- It separates prompting advice for standard models from advice for reasoning models: chain-of-thought and few-shot help the first group and can hurt the second.
- Provider-specific meta prompts make the case that prompts do not port cleanly between model vendors.

## Metadata
- Video: https://www.youtube.com/watch?v=Hp4MzVTXcKw
- Duration: 8:54
- Playlist index: 452
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> hey everyone how's it going Dan here so excited that you're joining today um we're going to be talking about all things related to prompt engineering and so some very quick background on myself I'm the co-founder of prompt Hub the GitHub for prompts based in New York I'm a Lakers fan more specifically a LeBron fan but that just means February has been a great month for me um and I'm a marathon runner and so today we'll be covering a lot of ground a lot of templates a lot of free stuff um that should be hopefully pretty helpful that you can go and take and start messing around with and so we'll talk about why prompt engineering is still important why Chain of Thought PR uh prompting has been...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Hp4MzVTXcKw.txt]]
- Description cue: LLMs aren’t failing—you just need better prompts. This talk covers Chain of Thought, Few-Shot, and Meta Prompting, plus key differences when working with reasoning models. Learn when simple...

## Book angles
- Could support a chapter/section on **Models & Inference**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://app.prompthub.us/community/group/361>
- resource: <https://app.prompthub.us/community/playground/5316>
- resource: <https://app.prompthub.us/community/playground/5788>
- resource: <https://www.prompthub.us/blog>
- resource: <https://www.prompthub.us/blog/chain-of-thought-prompting-guide>
- resource: <https://www.prompthub.us/blog/prompt-engineering-with-reasoning-models>
- resource: <https://www.prompthub.us/blog/the-few-shot-prompting-guide>
- resource: <https://www.prompthub.us/features/enhancers>
