---
video_id: T72nqdC92PM
playlist_index: 1185
title: "From Scratch to SOTA: Training a 3B State-Space Vision Model — Krishna Prasad Srinivasan, Sarvam"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=T72nqdC92PM"
duration: "21:09"
duration_seconds: 1269
view_count: 121000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/T72nqdC92PM.txt"
themes:
  - "Evals & Reliability"
ingested_at: 2026-10-30T15:45:23+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Krishna Prasad Srinivasan, general manager at Sarvam, explains how a 3B-parameter vision-language model built on a state-space (SSM) backbone, not a transformer, reached state of the art in document AI for English and 22 Indian languages. The bet: block-level OCR inside a layout and reading harness instead of page-level monolith VLMs, a four-stage curriculum (13T text tokens, 300M image-text pairs, 100M OCR SFT samples, then RL with verifiable rewards), and a moat built on the data engine and the evals, not the recipe. It reported 84.3 and 93.2 on two global benchmarks at launch and now digitizes 35M+ pages."
---

# From Scratch to SOTA: Training a 3B State-Space Vision Model — Krishna Prasad Srinivasan, Sarvam

## Summary
Krishna Prasad Srinivasan is a general manager at Sarvam, which he calls a sovereign foundation model company in India working across voice, text and vision. His talk explains how a 3B-parameter model, small enough to run on one GPU, reached state of the art in document AI and beats models "100 times larger." The model is unusual in two ways: its language backbone is a state-space model, not a transformer, and data, compute and training were all done in India, for English plus 22 official Indian languages.

**The problem**
Well under 1% of Common Crawl carries Indian-language text. The knowledge exists; it was never digitized. Indic OCR is hard because the goal is knowledge extraction with logical coherence, not raw text; Indic scripts fuse complex Unicode sequences; and most of the languages are low resource.

**Harness plus small model**
In late 2025 most OCR VLMs were page-level monoliths. Sarvam took a "contrarian bet" on block-level OCR wrapped in a document harness: one module for layout, one for reading order, and the SSM VLM for each block. He says models released in 2026 have converged on the same harness-plus-small-model pattern.

**Why an SSM**
A transformer's compute grows with the square of sequence length; an SSM keeps one state, so compute grows linearly and memory stays constant. Pages can reach 5,000 to 10,000 visual tokens, so quadratic cost hurts inference. At block level, the SSM's somewhat lossy recall is an acceptable trade.

**Four-stage curriculum**
- Stage 1: text-only pre-training on 13 trillion tokens (English, Indian languages, math, code; about 40% Indic). A strong language prior lets the model resolve smudged text, the way a person reads a half-blurred word.
- Stage 2: continual pre-training on 300 million image-text pairs for general vision.
- Stage 3: SFT on 100 million OCR samples across all languages, tables, equations and handwriting.
- Stage 4: RL with verifiable rewards. OCR correctness is machine-checkable, so the loop is: sample a group, score with unit tests, reinforce above the group average, repeat. Rewards include character error rate, table structure, equations and grammar. Real documents work best for RL.

**The moat is data and evals**
The recipe is standard. The edge is a data engine that builds synthetic and real-document data where no labels exist, fed by eval results, plus curated evals: "You cannot reach state-of-the-art if you cannot measure." At launch the model scored 84.3 on one global English benchmark and 93.2 on OmniDocBench. He claims an unbeaten lead on the 22 Indian languages against frontier models such as Gemini, ChatGPT and Opus. Sarvam plans to release its Indic benchmark, spanning documents from the 1800s to today.

**Deployment**
The model powers an agentic document workbench with human-in-the-loop review, confidence scores, block-level grounding and agentic proofreading. Insurers, banks, governments and archives use it to digitize more than 35 million pages, via API or on-prem. Sovereignty matters: a government body must control where its data goes.

## Why it matters
- A clear case for picking a non-transformer architecture on cost grounds: linear SSM compute fits OCR's long visual-token sequences.
- Shows the harness-plus-small-model pattern for vision: decompose the page with layout and reading modules, then run a cheap model per block.
- OCR is a clean example of RL with verifiable rewards, with concrete reward types such as character error rate and table structure.
- Supports the claim that the data engine and evals, not the training recipe, are the durable moat for a specialist model.
- Gives a sovereignty argument for on-prem specialist models in government and regulated work.

## Metadata
- Video: https://www.youtube.com/watch?v=T72nqdC92PM
- Duration: 21:09
- Playlist index: 1185
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]


## Transcript excerpt
> All right. Um, hi everyone. Good afternoon. I'm Krishna. Uh, and I'm a general manager at Servin. Um today I'm going to tell you how a three billion parameter model uh small enough to run on a single GPU gets state-of-the-art uh in document AI and beats models 100 times larger in size. It is also a slightly unusual model in two ways. Firstly u the language model used is not a standard transformer. Um and the entire model building from data to training to compute uh was done end to end in India and for English and for 22 official Indian languages uh which I think uh are personally uh uh one of the hardest document intelligence problems uh in the world right now. Um this is how we went from...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/T72nqdC92PM.txt]]

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

