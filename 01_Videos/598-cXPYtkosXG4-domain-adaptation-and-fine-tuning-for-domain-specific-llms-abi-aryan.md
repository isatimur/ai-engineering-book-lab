---
video_id: "cXPYtkosXG4"
playlist_index: 598
title: "Domain adaptation and fine-tuning for domain-specific LLMs: Abi Aryan"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=cXPYtkosXG4"
duration: "25:09"
duration_seconds: 1509
view_count: 9442
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/cXPYtkosXG4.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:25:38+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Abi Aryan surveys domain adaptation for LLMs so teams can choose between prompting, RAG and fine-tuning. Updating all weights is too costly at today's sizes, so she covers adapter tuning (new domains, matching performance with 0.15% of parameters per the original paper), prefix tuning, and parameter-efficient methods such as low rank adaptation and its 4-bit quantized variant, preferring the plain form for now. Her thesis: results depend on data quality and deduplication more than method, a fine-tune will not match GPT-4 on general tasks, and evaluation needs metric, tool, model-based and human views."
---
# Domain adaptation and fine-tuning for domain-specific LLMs: Abi Aryan

## Summary
Abi Aryan gives an overview talk whose goal is "to sum up all the literature" so that teams can make an informed choice about domain adaptation, for enterprise or hobby use. Base models are not trained for every case: some domains are under-represented, and some lack data because of compliance. Adaptation also avoids collecting new data per domain, and helps personalisation.

**Full versus partial updates**
Updating all weights, as in the transfer learning and teacher-student distillation work of earlier years, is expensive in compute and storage now that parameter counts are so large. So the question is how to update only some weights while getting equivalent performance, with an asterisk: you may not reach ChatGPT quality. She sets aside instruction tuning and human-feedback tuning as too costly for most teams, which leaves three techniques.

**The three techniques, as she presents them**
- Adapter tuning adds small components with extra weights while the Transformer stays the same. Per the original paper it matches performance with only 0.15% of the parameters. Use it to learn a very different domain, such as biochemical engineering.
- Prefix tuning adds trainable weights in front of the attention layer, which shape the output without changing the model, like a tap shaping water from a tank.
- Parameter-efficient fine-tuning, chiefly low rank adaptation, shrinks the weight matrices so models fit laptops and edge devices and use less memory. Its quantized variant moves weights to 4-bit precision, but needs a specific library not available on all devices and has seen little testing across models, so she would stick with the plain low-rank method for now.

**Choosing a method**
Prompting, zero-shot to about 10 examples, is cheap and needs little data but suits generalisable demos more than real systems. Among fine-tunes: adaptive fine-tuning for many tasks within one domain (say 5 or 10 legal tasks), behavioural fine-tuning for one target task, and parameter-efficient tuning as the standard approach. These combine with each other, with prompting and with RAG.

**Data and training practice**
Methods work only as well as the data: collection, tokenising, cleaning, normalising, deduplication and augmentation. She cites research that memorisation comes mainly from duplicated data. Further advice: do not expect a fine-tune to match GPT-4 on complex or unseen tasks, a common company dilemma; use in-context learning with dynamically loaded examples to handle drift and manage cost; break tasks into smaller ones; and use gradient checkpointing, which recomputes during the backward pass to trade compute for much lower memory. Her hyperparameter defaults: batch size 32 or 64, 1 epoch for a toy notebook but about 100 as a starting point for a serious domain fine-tune, the Adam optimizer, regularisation and early stopping.

**Evaluation, "the hardest part"**
Loss, accuracy and perplexity do not paint the full picture. Combine metric-based scores, tool-based evaluation that catches compilation errors, model-based evaluation with a smaller judge model (high potential, hard to get working), and human-in-the-loop review, which everybody does but which is not efficient. The whole pipeline, data, storage and base-model choice, must guard against data and prompt drift and against reputational and compliance risk.

## Why it matters
- It offers a decision map from task shape to method: adapter tuning for a new domain, adaptive tuning for many tasks in one domain, behavioural tuning for a single task.
- The point that deduplication reduces memorisation puts data hygiene ahead of method choice, a useful corrective for fine-tuning chapters.
- Her warning that a domain fine-tune will not beat GPT-4 on general or unseen tasks names a common expectation gap in companies.
- The four-part evaluation stack (metrics, tools, model judges, humans) gives a concrete frame for evaluating fine-tunes beyond perplexity.
- Some hyperparameter defaults and mechanism explanations are given without evidence, so a chapter should verify them before citing them.

## Metadata
- Video: https://www.youtube.com/watch?v=cXPYtkosXG4
- Duration: 25:09
- Playlist index: 598
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] hi everyone welcome to my presentation so I don't know what's the best way to start about it I would probably say something along the lines of well you've heard a lot of really good presentation that are focused on one very specific thing in this session itself we'll more so focus on an overview of domain adaptation and fine tuning for large language models because there's so much information out there which is like oh take this use that so my goal is to sum up all the literature for you to be able to make an informed decision on how to be able to do domain adaptation for your particular Enterprise use case or for your hobby use case however you use using it for so about me uh this...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/cXPYtkosXG4.txt]]
- Description cue: In this talk, we will talk about the different model adaptation methods from Prompt Engineering to RAGs to fine-tuning methods depending on the dataset and problem. We will also go into detail...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
