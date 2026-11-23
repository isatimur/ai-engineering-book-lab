---
video_id: "tzRvcTEapzo"
playlist_index: 298
title: "From Mixture of Experts to Mixture of Agents with Super Fast Inference - Daniel Kim & Daria Soboleva"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=tzRvcTEapzo"
duration: "53:15"
duration_seconds: 3195
view_count: 4084
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/tzRvcTEapzo.txt"
themes:
  - "Models & Inference"
  - "Coding Agents"
ingested_at: "2026-04-24T12:12:36+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Daria Soboleva (head research scientist, Cerebras) and Daniel Kim (head of growth, Cerebras) run a workshop that moves from mixture of experts, where a router sends each token to a few specialist feed-forward networks, to mixture of agents, where layers of prompted LLMs answer in parallel and a summarizer merges them. Their thesis: very fast inference lets many cheap open-model calls beat a slow reasoning model. One startup's MoA pipeline solved a math problem in 7.4 seconds with 32 LLM calls and over 500,000 tokens, versus 293 seconds for a frontier reasoning model. Attendees tuned an MoA to score 120/120 on a code grader."
---
# From Mixture of Experts to Mixture of Agents with Super Fast Inference - Daniel Kim & Daria Soboleva

## Summary
Daria Soboleva is head research scientist at Cerebras, where she researches mixture-of-experts architectures and earlier built the slim pajama data set. Daniel Kim is head of growth there. Their 53-minute workshop makes one argument: there are two ways to get more intelligence, train a larger model with mixture of experts (MoE) or combine existing models into a mixture of agents (MoA), and fast inference makes the second practical.

**Mixture of experts**
Soboleva traces scaling from GPT-3 (bigger models), through Llama (better data and more training tokens), to DeepSeek V3 (architecture changes). In a transformer, the feed-forward layer has the hardest job: it must decide which neurons fire for every domain and language. MoE replaces it with many expert networks and a router that picks a few per token. This raises total parameters and quality while active parameters, and so inference time, stay about the same. She calls it the industry standard.

**Mixture of agents**
Kim ties MoA to inference-time compute: when pre-training hits a data wall, spend more compute after training. On a competition math problem, a non-reasoning frontier model took 45 seconds and got it wrong, and a reasoning model took 293 seconds and got it right. MoA, a term he credits to Together AI, sends the input to several LLMs with custom system prompts and has a final model merge their answers. A startup built on Cerebras solved the same problem in 7.4 seconds. Its pipeline: a planning agent proposes eight answers, a critique agent rejects them, the planner returns with 16k tokens of thinking, the critic keeps two, and a summarization agent writes the final answer. That took over 500,000 tokens and 32 LLM calls, some parallel, some sequential.

**Why Cerebras is fast**
An H100 has about 17,000 cores, with weights and KV cache stored mostly off-chip, so memory bandwidth becomes the bottleneck. The Cerebras chip has 900,000 cores, each with its own memory holding fixed weights, so no transfer wait. Only activations move between chips, which Kim says is why it scales linearly. He claims Llama 3.3 70B runs about 15.5 times faster than the fastest GPU provider, and about a third of the power of Nvidia GPUs for an equivalent workload.

**The hands-on part**
An intern's Streamlit app lets attendees configure a summarization agent and layers of agents, each with model, temperature and prompt. Layers run in sequence; agents within a layer run in parallel, and their outputs are concatenated as the next layer's input. The challenge: configure an MoA to fix and optimize a buggy Python function for an automated grader scored out of 120. Agents specialize in bugs, performance and the overall result. Switching the main model to Qwen raised the baseline from a C to a B. Several attendees reached 120/120. In a lighter moment, the hosts admit the intern committed an API key to the repo, and Kim rotates it on stage.

**Q&A points**
- MoA needs engineering: bad prompts give bad results. Soboleva links it to ensemble learning.
- Too many agents adds redundancy and time; not all outputs get used, much as with too many experts.
- New models onboard fast when kernels exist, as with Qwen 32B, which is close to Llama. New architectures need custom kernels.
- LoRA fine-tunes are on the roadmap; enterprises can already run fine-tuned models.

## Why it matters
- Gives a clear bridge from a model-internal idea (MoE routing) to a system-level pattern (MoA layers plus an aggregator) that any team can build with prompts.
- The planner-critic-summarizer case (7.4 s, 32 calls, over 500,000 tokens versus 293 s) makes the latency-for-tokens trade concrete: MoA only works when inference is very fast.
- The layer design (parallel within a layer, concatenated into the next) is a reusable orchestration template with clear knobs: models, temperature, prompts, layer count.
- Warns that MoA is not out of the box: it needs prompt engineering, and adding agents past a point only adds cost.
- The hardware section explains, in vendor terms, why off-chip memory bandwidth limits GPU decode speed. All speed and power numbers here are Cerebras claims.

## Metadata
- Video: https://www.youtube.com/watch?v=tzRvcTEapzo
- Duration: 53:15
- Playlist index: 298
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] This is uh the API key. So, if you haven't scanned this already, please scan it. Um it'll take you to our cloud where you can sign up for a free API key. This will be the only thing you kind of need to do the workshop today. Everyone got a picture? Everyone good? Cool. Okay. Um hello everyone. Uh we are very excited to see you here. Today we organized a very fun workshop for all of you. Uh we're going to first start with explanation of what mixture of experts is and what like why this architecture matters and then we're going to use agents to create something very similar to it but it's called mixture of agents. So you replace your experts with real agents. Um there will be a code...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/tzRvcTEapzo.txt]]
- Description cue: Our hands-on workshop will walk you through how to build your own Mixture of Agents (MoA) system using the fastest, and most capable open models available: Qwen3-32B and Llama 3.3-70B. MoA...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Coding Agents**.

