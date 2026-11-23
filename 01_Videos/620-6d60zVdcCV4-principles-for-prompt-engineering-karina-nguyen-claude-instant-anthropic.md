---
video_id: "6d60zVdcCV4"
playlist_index: 620
title: "Principles for Prompt Engineering - Karina Nguyen (Claude Instant @ Anthropic)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=6d60zVdcCV4"
duration: "55:31"
duration_seconds: 3331
view_count: 8700
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/6d60zVdcCV4.txt"
themes:
  - "RAG & Retrieval"
  - "Models & Inference"
ingested_at: "2026-04-24T12:26:47+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Karina Nguyen, a research engineer on Claude at Anthropic who worked on reducing hallucinations and self-correction, argues that prompting is an act of creative writing: form a hypothesis, test it, iterate. She gives writing principles (clarity, conciseness, coherence, consistency, direction, grounding) and Claude-specific tactics: wrap everything in XML tags, add thought tags and scoring criteria, put the question at the end of long documents, decompose questions into independent sub-questions for more faithful reasoning, and use Claude to generate eval datasets and label clusters. She ends with Claude 2 versus Claude Instant."
---
# Principles for Prompt Engineering - Karina Nguyen (Claude Instant @ Anthropic)

## Summary
Karina Nguyen works on Claude at Anthropic, most recently on reducing hallucinations and making Claude self-correct. This is a workshop-style talk with many audience questions. Her thesis: prompting is "an act of creative writing". You form a hypothesis about what the model can do, test it, and gain clarity about its strengths and weaknesses. She says people find prompting hard for three reasons: they know what they want but not how to get the best from the model, they only vaguely know what they want, or they do not know at all.

**Writing principles**
Clarity, conciseness, coherence (context first, the task at the end), consistency (same tags and terms throughout), direction (genre, length, style), grounding (make the model quote its sources), and diverse examples that cover edge cases. With Claude, she says, treat the model almost like another human and explain things as you would to a five-year-old.

**Recommendation curation**
Her worked example is a fashion search project built on CLIP embeddings, where Claude decides if an item fits a query such as a Great Gatsby outfit. She iterates from a zero-shot yes/no prompt to one with thought tags (chain of thought), explicit criteria (do not recommend winter coats in summer), and a 1-10 score in score tags. Her main tip: Claude "really loves XML tags". XML was the first format Anthropic fine-tuned on, it is easy to parse, and an answer-tags instruction stops the model from adding chatter.

**Long context and faithful reasoning**
With 100K tokens of context, she cites Anthropic research that stated chain of thought is not always faithful to the model's real reasoning. Decomposition splits a question into self-contained sub-questions, each answered in its own context, then recomposes them. It can approach chain-of-thought accuracy on question answering while improving faithfulness.

**Using Claude to build evals**
To test recall on a long government document dated after the training cutoff, the team split it into sections and had Claude write five multiple-choice questions per section. They then reassembled random sections into 70K and 95K token documents. Two results: put the question at the end of the prompt, and pull relevant quotes into thought tags first. The gains were larger for Claude Instant than for Claude 2.

**Labeling and other tactics**
For cluster labeling she embeds texts, clusters them with k-means and asks the model to name each cluster. She adds self-consistency (majority vote, or a second model to check agreement) and contrastive bad examples. API tips: keep the exact Human/Assistant turn format, put words in Claude's mouth, let it say I don't know, and let it reply that no relevant quotes exist rather than invent one.

**The future**
Prompting stays, but moves toward synthetic data, model-written evals, RLAIF and product features such as the auto-generated titles she built for Claude's chat app. Claude Instant is cheaper and faster than Claude 2, and was trained to be better at math, code and jailbreak robustness than the first Claude Instant.

## Why it matters
- The decomposition result gives a concrete reason to split reasoning into independent sub-questions when faithfulness matters, not just accuracy.
- The long-document eval recipe (model-written multiple-choice questions on a post-cutoff document, answers placed at the beginning, middle or end) is a reusable template for testing context recall.
- The question-at-the-end and quotes-before-answer findings are simple, measured rules for long-context prompts.
- It records why XML tags work so well with Claude: they were the first fine-tuned format, so this is a training artifact and not a universal law.
- Shows prompting as product work: the auto-title feature was kept consistent by putting the user's previous titles in context.

## Metadata
- Video: https://www.youtube.com/watch?v=6d60zVdcCV4
- Duration: 55:31
- Playlist index: 620
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Models & Inference]]

## Transcript excerpt
> my name is Karina um recently I've been working on Claude which is like a large language model trained by anthropic and um most recently I was working on like reducing hallucinations how to make CLA self-correct its answers and many other features that went into like clot to launch and so I'm going to talk today about the writing principles for task prompt engineering and kind of sort of like help you if you want to use claw API help you to guide what the best practices and tips that I found and be found most effective so first of all um I would like to talk about why prompting is hard and to understand why prompting is hard you should understand what prompting is in the first place so this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/6d60zVdcCV4.txt]]
- Description cue: Learn the state of the art on prompt engineering from experience leading engineering on Anthropic Claude.

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Models & Inference**.
