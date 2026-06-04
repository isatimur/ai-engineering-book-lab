# Kyle Corbitt

**Role:** Co-founder & CEO, OpenPipe  
**Organization:** OpenPipe  
**Themes:** [[Coding Agents]], [[Models & Inference]]

## Overview

Kyle Corbitt co-founded OpenPipe, a platform for fine-tuning and deploying specialized LLMs from production data. He is a strong advocate for RL-based agent training and for replacing expensive frontier model calls with fine-tuned smaller models once a task is well-defined.

## Appearances in corpus

- [[232-gEDl9C8s_-4-how-to-train-your-agent-building-reliable-agents-with-rl-kyle-corbitt-openpipe|#232 — How to Train Your Agent: Building Reliable Agents with RL]] (Coding Agents)
- [[420-zM9RYqCcioM-finetuning-500m-ai-agents-in-production-with-2-engineers-mustafa-ali-kyle-corbitt|#420 — Fine-tuning 500M AI Agents in Production with 2 Engineers]] (Models & Inference, with Mustafa Ali)

## Key claims / positions

- RL is the right training signal for agents because agent tasks have outcome evaluations, not gold-standard outputs.
- Production data is the most valuable fine-tuning dataset — collect traces, filter for successes, distill.
- Fine-tuned small models beat frontier models on well-scoped tasks at 10x lower cost and latency.
- Two engineers with the right infrastructure can run fine-tuning pipelines at 500M-agent scale.

## Manuscript relevance

Chapter 5 (evals) and Chapter 6 (software factory) — the fine-tuning-from-production-data loop is a key part of the self-improving system argument.
