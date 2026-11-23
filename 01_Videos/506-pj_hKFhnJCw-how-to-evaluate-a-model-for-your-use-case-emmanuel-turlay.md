---
video_id: "pj_hKFhnJCw"
playlist_index: 506
title: "How to evaluate a model for your use case: Emmanuel Turlay"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pj_hKFhnJCw"
duration: "7:32"
duration_seconds: 452
view_count: 245
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/pj_hKFhnJCw.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:21:31+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Emmanuel Turlay, CEO of Sematic (the company behind AirTrain), argues that generic metrics and leaderboards cannot tell you how a language model performs on your own task and data. He walks through BLEU, ROUGE, density and coverage, then benchmarks such as GLUE, HellaSwag, TriviaQA and ARC, and shows where each falls short. His answer is LLM-as-grader: describe the task and the property to grade, have a scoring model rate each inference on a 1-to-10 scale, and compare score distributions across models. His example grades email sign-offs for politeness. He found the strongest grader still costly at scale and Flan-T5 a good speed and correctness trade-off."
---
# How to evaluate a model for your use case: Emmanuel Turlay

## Summary
Emmanuel Turlay is CEO of Sematic, the company behind AirTrain. In this seven-minute lightning talk he names a hard problem: there is no one-size-fits-all process to evaluate a language model for a particular use case. Metrics and benchmarks exist, but they mostly apply to generic tasks. The talk ends with a pitch for AirTrain. (The video description talks about cutting fine-tuning resource costs; the talk itself is only about evaluation.)

**What evaluation is**
He defines model evaluation as the statistical measurement of how well a model performs on a use case, measured on a large dataset independent from the training data. It comes right after training or fine-tuning. He compares it to running a test suite in a CI pipeline.

**Why classic metrics break for text**
Supervised ML has clear metrics: RMSE and MAE for regression, precision, recall and F1 for classifiers, intersection over union in vision. Language models return unstructured text, and an inference that differs from the reference is not necessarily wrong. He reviews what exists:
- BLEU, a precision metric on n-gram overlap, common for translation and usable for summarization. It ignores intelligibility and grammatical correctness.
- ROUGE, a recall-focused set of metrics, mostly for summarization.
- Without labeled references: density (how much the summary pulls fragments from the text) and coverage (how derivative the summary is of the text).
These only score high-level tasks like translation and summarization.

**Why benchmarks are not enough**
GLUE (nine tasks such as paraphrase detection and sentiment), HellaSwag (common-sense sentence completion), TriviaQA (almost a million trivia questions) and ARC (high-school science reasoning) draw a landscape of how LLMs compare. They do not tell you how a model handles your input data. His examples: extracting symptoms from a doctor's notes, ingredients from a recipe, or forming a JSON payload to query an API. Each application must build its own evaluation, which is a lot of work.

**The "magic trick": a model grades the model**
Feed the evaluation dataset to the candidate model. Wrap each inference in a scoring prompt that describes the task, the property to grade and the scale (for example 1 to 10). A scoring model returns a number. Run this over every inference and you get a distribution for a custom metric you defined. His example scores closing lines of professional emails for politeness: "please let us know at your earliest convenience" scores high, "tell me ASAP" scores low.

**Grader choice**
The best grading model they found was still the top OpenAI model (captioned as gp4), but it is costly on large datasets. Flan-T5 gave a good trade-off of speed and correctness. AirTrain lets you upload a dataset, pick models (Llama 2, Falcon, Flan-T5 or your own), describe properties and view metric distributions, so the choice of model rests on statistical evidence.

## Why it matters
- A compact, early statement of the LLM-as-judge pattern: custom metrics come from a prompt that names the task, the property and the scale.
- It explains clearly why BLEU, ROUGE and public leaderboards cannot replace a use-case eval set.
- The grader cost trade-off (strong but expensive grader vs. a small Flan-T5 grader) is a concrete data point for eval-pipeline budgeting.
- Scoring distributions over a whole dataset, not single examples, frames model selection as a statistical decision.

## Metadata
- Video: https://www.youtube.com/watch?v=pj_hKFhnJCw
- Duration: 7:32
- Playlist index: 506
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] hi everyone I'm Emanuel CEO of sematic the company behind air train today I want to talk about a difficult problem in the language modeling space and that is evaluation unlike in other areas of machine learning it is not so straightforward to evaluate language models for a specific use case there are metrics and benchmarks but they mostly apply to generic tasks and there is no one-size fit so process to evaluate the performance of a model for a particular use case so first let's get the basics out of the way what is model evaluation model evaluation is the statistical measurement of the performance of a machine learning model how well does a model perform on a particular use case...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pj_hKFhnJCw.txt]]
- Description cue: Fine-tuning LLMs requires a lot of resources, both memory and GPU, which are notoriously costly. In this talk, I will describe five ways to minimize resource usage, and to find the cheapest...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.
