---
video_id: "IIL2tE4n1Q0"
playlist_index: 558
title: "Judging LLMs: Alex Volkov"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IIL2tE4n1Q0"
duration: "18:39"
duration_seconds: 1119
view_count: 2289
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/IIL2tE4n1Q0.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:23:48+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Alex Volkov, AI evangelist at Weights & Biases, opens an eval track as a mock courtroom where an LLM judge from 2034 tries AI engineers for common sins: shipping prompt changes with no tracing or logging, fine-tuning before iterating on prompts, ignoring the news, and relying only on programmatic assertions (the Air Canada chatbot case). His thesis is that production LLM apps need tracing plus three layers of evaluation (programmatic checks, human in the loop, and LLM-as-judge) with custom criteria. A staged prompt injection of the judge drives home that judges have biases and must be validated. He demos W&B Weave tracing and evals on an open-source app."
---
# Judging LLMs: Alex Volkov

## Summary
Alex Volkov is AI evangelist at Weights & Biases. He gave the opening talk of the eval track as a piece of theatre: "Maximus", an AGI LLM judge from 2034, holds court, and Volkov interrupts as the human in the loop, because you should not run an LLM judge without one. Under the jokes, his thesis is plain: anything of value in production needs tracing, and evaluation needs three layers with criteria you write yourself.

**The cases**
- **No trace left behind**: Daniel's hackathon chat-with-PDF app goes viral, he starts charging, keeps tweaking the prompt, and deploys on a Friday. Old features break, and he cannot debug because he traced and logged nothing. Hackathon code is fine; production code must be traced. Volkov shows Weave, which starts with one Python decorator and tracks calls, call hierarchies for RAG or agents, code and parameter versions, and multi-turn inputs and outputs.
- **Premature fine-tuning**: Sasha downloads Llama 3 and fine-tunes on company data for a 6% benchmark gain without iterating on prompts or building a RAG pipeline. Before fine-tuning, try chain-of-thought prompting, flow engineering, DSPy-style approaches and mixture of agents.
- **Out of the loop**: Morgan stopped following AI news and stuck with one old Llama 2 model, while a single quarter brought Claude 3.5 Sonnet, Llama 3, Gemini Flash, Apple Intelligence and more.
- **Turbulence on production**: an Air Canada executive rushed a support chatbot out with only programmatic assertions, because that was the fastest option. The company lost a legal battle; the human in the loop turned out to be the customer.

**What an eval is**
Build a dataset of user inputs, with correct answers or criteria for correctness, from development cases or production examples. Run the production model or a candidate on each one, then score against the answer or the criteria.

**Three scoring methods**
- **Programmatic**: good for numbers, unit-test-style assertions (no "as an AI model" replies) and runnable code such as HumanEval. It is cheap and scales, but it does not cover multi-turn chats.
- **Human in the loop**: evaluate continuously during development and after launch, with teammates. It is boring and costly at scale, needs rubrics, and still depends on tracing everything.
- **LLM as a judge**: far better than humans at reading hundreds of messages against criteria, and the most cost-effective option, but not perfect. Humans still write criteria, check for bias and iterate on judge prompts.

**Validate your validators**
The "Maxim" case has the judge praise a Weave customer while it claims to have no financial stake, a staged prompt injection. The lesson: judges can be manipulated and biased, so check them; he points to a paper on validating validators. Off-the-shelf criteria are weak; write custom ones. His demo is Open UI, an open-source streaming-HTML project by a W&B co-founder. It is traced in Weave and evaluated on custom criteria (contrast, relevance, polish), with side-by-side comparison of versions 16 and 14 and rendered outputs.

**Writing criteria**
As an exercise, he lists criteria for judging a conference talk: memorable, educational, funny and original, clear, well delivered, not too promotional. The judge then scores him 70% promotional, but memorable for wearing a wig on stage.

## Why it matters
- Names three evaluation layers (programmatic, human, LLM judge) with clear strengths and blind spots for each, a compact frame for eval design.
- The Air Canada case is a concrete warning that assertion-only evals miss conversational failures, which end users then find.
- The staged judge injection makes a memorable point: LLM judges can be manipulated and biased, so they need validation too.
- Reinforces an order of work: trace first, iterate on prompts before fine-tuning, and write custom criteria in place of off-the-shelf ones.

## Metadata
- Video: https://www.youtube.com/watch?v=IIL2tE4n1Q0
- Duration: 18:39
- Playlist index: 558
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] please be seated quarter is now in session order order in court my name is Maximus I'm an AGI functioning as a llm judge from the year 2034 that's a decade from now for those of you who are slower at math I've been able to back propagate myself through the latent SpaceTime Continuum to hack this human neural link to appear before you today June 27th aka the AI engineer Judgment Day don't worry folks AGI is not quite here right my name is Alex vov and I'm AI evangelist with weights and biases uh I work uh at w and biases and I'm here I'm here to give you commentary because you shouldn't try an llm judge without a bit of human in the loop right uh so remember this for later it's going...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IIL2tE4n1Q0.txt]]
- Description cue: All rise! The honorable LLM Judge presiding. On the docket today, many cases of AI Engineers building with LLMs, without the ability to iterate, evaluate and improve their products.

## Book angles
- Could support a chapter/section on **Models & Inference**.
