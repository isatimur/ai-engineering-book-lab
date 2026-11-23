---
video_id: "3WV1vT0B0cg"
playlist_index: 189
title: "The Rise of Open Models in the Enterprise — Amir Haghighat, Baseten"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=3WV1vT0B0cg"
duration: "16:50"
duration_seconds: 1010
view_count: 2729
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/3WV1vT0B0cg.txt"
themes:
  - "Org Design & Leadership"
  - "Models & Inference"
ingested_at: "2026-04-24T11:43:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Amir Haghighat, co-founder and CTO of Baseten, reports from 100+ enterprise sales conversations. Enterprises start on closed models in dedicated cloud deployments: toying around in 2023, about 40 to 50 of 100 in production in 2024. In 2025 cracks appeared. The cracks are not vendor lock-in, cost per token or compliance. They are task-specific quality (medical document extraction, medical transcription), latency for voice, agentic unit economics with up to 50 inference calls per user action, and strategic control. The catch: an open model plus vLLM or SGLang plus GPUs is not production inference. Speculative decoding, prefix caching, four nines and fast scale-up are the dragons."
---
# The Rise of Open Models in the Enterprise — Amir Haghighat, Baseten

## Summary
Amir Haghighat is co-founder and CTO of Baseten, an inference company. In the past two years he has talked to more than 100 enterprises, from public software companies to a Fortune 50 soft drink maker. He admits a bias: he sells horizontal tooling. His thesis is that AI's real value arrives only when enterprises build with AI themselves, not just buy vertical tools for sales or support. His analogy: if enterprises in the 2000s had only bought Salesforce, companies like Snowflake, Databricks and Datadog would not exist in their current shape.

**The adoption arc**
Enterprises all start with OpenAI and Anthropic, through dedicated deployments on Azure or AWS for security and privacy, and they retrain predictive ML teams as AI teams. In 2023 a CIO of a large insurer told him the deployment was for engineers to "toy around with." In 2024, about 40 to 50 of the 100 had something in production. In 2025 he sees "cracks in the assumption" that closed frontier models can serve them indefinitely.

**What the cracks are not**
- Vendor lock-in: there are several providers, all roughly on OpenAI specs, so switching means redoing evals and prompts.
- Ballooning cost per token: last year buyers said falling prices would solve it.
- Compliance and privacy: the cloud providers handle that inside existing VPCs.

**What the cracks are**
- Quality on specific tasks: large health plans with millions of labeled medical documents extract procedure and diagnosis codes better with their own models. Medical transcription is a second example.
- Latency: shared APIs optimize for throughput and high QPS. Voice and phone agents need fast time to first token and time to first sentence.
- Unit economics: agentic use cases can turn one user action into 50 inference calls. Running the compute yourself makes you a price maker, not a price taker.
- Destiny: if every competitor uses the same frontier models, where is the advantage at the AI level?

**Here be dragons**
Many teams believe an open model plus vLLM, SGLang or TensorRT-LLM plus GPUs equals production inference. Haghighat says he knows "for a fact" it does not. The hard parts:
- Performance at the model level: choosing a speculative decoding route (draft model, Medusa heads, Eagle 3, MTP) and keeping up with research. Eagle 3 went from paper to meaningful production use in about six months.
- Performance at the infrastructure level: prefix caching and disaggregated serving, which matter for agentic prompts that are long and similar, to hit time to first token at P99.
- Reliability: the naive setup gives about two nines, not four. vLLM and Triton crash often, and tail latencies spike during recovery.
- Scaling: one enterprise needed eight minutes to bring up a new replica of the same model.
- Tooling, life cycle management, an observability "iceberg", and audit controls.

At that point the enterprise faces a build-or-buy decision. Haghighat's job is to argue for buying the platform.

## Why it matters
- It names the actual reasons enterprises move to open models (task quality, latency, agentic cost, differentiation) and rejects the common ones (lock-in, cost per token, compliance).
- The 50-inference-calls-per-action figure explains why falling token prices did not fix agentic unit economics.
- The dragons list is a checklist for any team planning to self-host: speculative decoding choice, prefix caching, disaggregation, four nines, cold-start time.
- The 2023 to 2025 arc gives a dated picture of enterprise maturity from one vendor's sales pipeline. It is a vendor's view, so read it with that bias in mind.

## Metadata
- Video: https://www.youtube.com/watch?v=3WV1vT0B0cg
- Duration: 16:50
- Playlist index: 189
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] Yeah. Hi everyone. My my name is Amir. I'm co-founder and CTO of B 10 uh the inference company. But I'm not here to talk about B 10. I'm here to talk about the adoption of AI in the enterprise. why we should care about it and how it's going uh based on what we've seen. So, uh first why why we should uh care about it. Um ultimately, um we've heard this before is like, hey, is there hype in the market? You know, is is AI hyped? And like it probably is, but uh the the evidence that a lot of people point to that there's hype here is that the adoption in enterprise has been slow. uh you know you've I've heard this so many times that like you know enterprises are are are slow to adopt uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/3WV1vT0B0cg.txt]]
- Description cue: This year kicked off with the DeepSeek-R1 news cycle breaking out of our AI Engineering bubble into the mainstream tech and business world. Leaders at the highest levels of the largest enterprises...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Models & Inference**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://www.baseten.co/blog>
