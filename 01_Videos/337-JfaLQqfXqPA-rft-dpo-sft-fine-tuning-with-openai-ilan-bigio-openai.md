---
video_id: "JfaLQqfXqPA"
playlist_index: 337
title: "RFT, DPO, SFT: Fine-tuning with OpenAI — Ilan Bigio, OpenAI"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=JfaLQqfXqPA"
duration: "1:46:15"
duration_seconds: 6375
view_count: 16604
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/JfaLQqfXqPA.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:14:16+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ilan Bigio (OpenAI developer experience) runs a workshop on OpenAI's three fine-tuning methods. SFT is imitation and learns an input-to-output mapping; DPO learns the delta between a preferred and a non-preferred output; RFT learns to reason toward a grader's reward and works only with reasoning models. His rule: start with prompting and evals, and fine-tune only when evals show prompting has hit its limit. Stories include distilling GPT-4 function calling with 120 functions into GPT-3.5, a banking-intent SFT demo, DPO on jokes, a failed RFT email classifier with noisy labels, and an RFT chemistry task that rose from about 65% to near 80%."
---
# RFT, DPO, SFT: Fine-tuning with OpenAI — Ilan Bigio, OpenAI

## Summary
Ilan Bigio works on the developer experience team at OpenAI, where he tests new API features early. This long, interactive workshop covers the three fine-tuning methods on the OpenAI platform, with stories, live notebooks, a long Q&A, and an improvised prompt-tuning experiment. He frames every LLM system as input (prompt and context), model (weights), and scaffolding (tools). The workshop focuses on the middle part.

**Prompting versus fine-tuning**
Prompting is a set of hand tools: low barrier, fast iteration, enough for most jobs. Fine-tuning is a CNC machine: high upfront cost, clean data, iteration loops of hours, but more automated and able to do things prompting cannot. Jobs take 30 minutes to 24 hours. All three methods train only a low-rank adapter, so they are poor at teaching new facts; use RAG or agentic retrieval for that.

**What each method learns**
- SFT: imitation, a soft mapping from inputs to outputs. Best for classification, formatting, structured extraction, and distillation into small models. Start with about 100 samples; 500+ is best. Models can regress on tasks outside the data, so data diversity is critical.
- DPO: the difference vector between a preferred and a non-preferred output. Good for tone and style, and natural for A/B-test data. More forgiving on diversity, and you can run it after SFT.
- RFT: the model changes its chain of thought to score higher with a grader, which he says is the same family of algorithm used for OpenAI's reasoning models. It needs unambiguous grading and very low-noise data, but only 40 to 80 high-signal examples. Graders include string checks, text similarity, sandboxed Python, model graders, and nested multi-graders.

**Case studies**
- A latency-bound assistant with 120 functions, when researchers expected five to ten. With no labeled data, he generated every permutation of each function schema with a Python script, had GPT-4 write the user command for each call, and added GPT-4 outputs on real unlabeled inputs. GPT-3.5 fine-tuned on both got within about 2% of GPT-4 at a fraction of the latency. Removing function definitions from context hurt learning.
- Banking intent classification: GPT-4o mini scored 75% and GPT-4o 83% with a weak prompt; reasoning models reached 80 and 90; the SFT models beat them all.
- DPO on jokes: good jokes were reverse-mapped to topics, then paired with corny jokes on the same topic. The result elicited good, though not original, jokes.
- RFT on his own 600 labeled emails failed. Labels were subjective and noisy, the prompt was thin, and few categories made guessing easy.
- RFT on predicting hydrogen-bond donors and acceptors with a half-and-half multi-grader rose from about 65% to near 80%.

**Advice from the Q&A**
Avoid fine-tuning until evals show prompting has plateaued. If you fine-tune with a prompt, keep that prompt, or train on varied prompts. Start with the biggest model that works, then tune a smaller one. A good LLM judge from your evals can become the RFT grader. Do not reward or penalize the chain of thought directly, or it stops being a faithful window into the model. RFT is single-turn for now, so it cannot train multi-step agent loops.

**Prompt tuning experiment**
He closes by live-coding a loop: run mini-batches, have o3 reason over failures, write notes into the prompt, and test again. The numbers did not move much, and he calls it his second failure of the day.

## Why it matters
- Gives a clear decision frame for the three methods by what each one learns: a mapping, a preference delta, or a reasoning strategy.
- The 120-function distillation shows how to build SFT data with no labels: enumerate schema permutations, then generate the inputs backward with a stronger model.
- The two failures teach as much as the wins: RFT magnifies label noise and subjective grading, and prompt tuning by reflection is not automatic.
- Ties fine-tuning to evals: the eval you already have tells you whether to fine-tune and can become the RFT grader.
- The warning about rewarding chains of thought links training choices to monitoring and safety.

## Metadata
- Video: https://www.youtube.com/watch?v=JfaLQqfXqPA
- Duration: 1:46:15
- Playlist index: 337
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> Amazing. I think there's still some people coming in toward the back. Um, so I'll do like the quick maybe like uh administrative stuff in the meantime. This is going to be super interactive. Uh, there's also like mics around, so if any at any point you guys have questions, um, just raise your hand. Um, someone will go to you or I think we also have mics nearby. Um, cool. I think that's pretty much it. I'll let a few people finish trickling in and then we'll get started. Okay, I think that's long enough. Um, okay. So, welcome everyone to model maxing with OpenAI. Uh, we're going to be talking about RFT, SFTD, DPO. My name is Elan Behu. Uh I'm on the developer experience team at OpenAI and so...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/JfaLQqfXqPA.txt]]
- Description cue: Full workshop covering all forms of fine-tuning and prompt engineering, like SFT, DPO, RFT, prompt engineering / optimization, and agent scaffolding.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.

