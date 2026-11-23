---
video_id: "OkEGJ5G3foU"
playlist_index: 230
title: "[Full Workshop] Reinforcement Learning, Kernels, Reasoning, Quantization & Agents — Daniel Han"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OkEGJ5G3foU"
duration: "2:42:28"
duration_seconds: 9748
view_count: 111458
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/OkEGJ5G3foU.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:09:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Daniel Han, whose open-source fine-tuning package has 40,000 GitHub stars, explains RL for LLMs from first principles in a long Q&A-driven workshop. He covers the training stages up to RL with verifiable rewards, the policy gradient worked through on Pac-Man, PPO's clipping and KL terms, and GRPO, which drops the value model for group z-scores over sampled answers. His core claim: the algorithm is not special; reward functions and data are the hard part. A free-GPU demo trains a base model to reason. He closes on dynamic quantization (DeepSeek R1 from 730GB to 140GB), the view that FP4 may be the last precision speedup, and torch.compile."
---
# [Full Workshop] Reinforcement Learning, Kernels, Reasoning, Quantization & Agents — Daniel Han

## Summary
Daniel Han and his brother run an open-source package for faster, lower-memory fine-tuning and RL. It has 40,000 GitHub stars and over 10 million monthly Hugging Face downloads. They also fix bugs in open models such as Gemma and Llama. This nearly three-hour workshop is mostly a hands-on RL lesson with heavy audience Q&A, plus short sections on quantization and kernels. His thesis: RL for LLMs is simple at heart, and "the algorithm is not special". The hard part is reward functions and data.

**History and training stages**
Llama 1 trained on 1.4 trillion tokens. Gemma 3 used 14 trillion and Llama 4 30 trillion. Open models caught up with closed ones on benchmarks, then hit an "open source drought" from o1-preview in September 2024 until DeepSeek R1 in January 2025. Han describes two jumps, an SFT/RLHF jump and an RL jump, and does not know what comes next. The stages: pre-training, mid-training (higher-quality data, long-context extension), supervised fine-tuning, preference tuning (DPO, RLHF), and RL with verifiable rewards (RLVR). DeepSeek's R1-Zero showed you can go straight from base model to RL, but he calls that wasteful.

**RL from first principles**
An agent takes actions in an environment and gets rewards. For a language model, the prompt is the state and the whole chain of thought plus answer is one action. A reward function can be plain if-statements: +1 for "4" on "what is 2 plus 2", partial credit for 5, a heavy penalty for a letter. Distance-based scoring helped math learning in his team's experiments, while labs probably use binary rewards. He works the policy gradient through a Pac-Man table, then the advantage (reward minus a baseline). PPO adds a likelihood ratio against the old policy to stop reward hacking, clipping (epsilon about 0.2) as a trust region, and a KL penalty (beta about 0.05) to stay near the SFT model. GRPO deletes the value model. It samples several answers per question and uses each reward's z-score within the group as the baseline. RLVR also replaces the learned reward model with reward functions such as regex format checks, code execution or LLM-as-judge. He notes a paper where LLM-judge rewards rose and then went backwards.

**Practical advice**
- Early rewards are often all zero. Success comes "by chance", then GRPO amplifies it. Labs kill runs that never find reward.
- Prime with a little SFT first (his demo used 118 rows of DeepSeek R1 traces) or start from an instruct model.
- Sample with high temperature (about 1.0 to 1.5) and min_p 0.1 to keep outputs varied.
- Watch the correctness reward columns, not the format ones, because models often learn the format and nothing else.
- Mix domains so the model does not overfit to one.

**The demo**
A free-GPU notebook trains a small base model with a custom reasoning format, format and distance-based reward functions, four generations per prompt, and gradient accumulation of 16. Run time was 2 hours 54 minutes. Before training the base model answers the square root of 101 with web-page junk. After training it reasons and gives 10.049875. Sharing inference-engine weights with the trainer saves another 50% of memory.

**Quantization and kernels**
Dynamic quantization shrinks DeepSeek R1 from about 730GB to 140GB by quantizing mixture-of-experts layers hard and keeping attention and shared experts at higher precision. Quantizing every layer of a small vision model to 4 bits broke it. Keeping a few layers in higher precision fixed it for about 500MB more. He points to the super weights paper. He argues GPU speedups came mostly from lower precision (float 32 to float 16 was about five times faster), so FP4 may be the last big step. He urges everyone to use torch.compile and tune its many options.

## Why it matters
- The claim that reward functions and data, not the algorithm, are the bottleneck gives teams a clear place to invest when they specialize open models with RL.
- The breakdown of PPO and GRPO into a policy gradient plus anti-overfitting terms makes RLVR readable for engineers without an RL background.
- Practical failure modes (all-zero early rewards, models that learn only the format, LLM-judge rewards that collapse) are concrete warnings for anyone running GRPO.
- The case that a little SFT priming or an instruct model is far cheaper than RL from a base model is useful cost guidance.
- The dynamic quantization results and the FP4-as-final-speedup argument tie model compression to hardware economics for self-hosting.

## Metadata
- Video: https://www.youtube.com/watch?v=OkEGJ5G3foU
- Duration: 2:42:28
- Playlist index: 230
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Hello guys. Hello. Hello. Hello. Yes. Sorry for being a bit late. There's a lot of traffic. But um hello. Um welcome to AI engineers worldfare. Thanks for coming to my session. Um, and yes, today we're going to talk about the deep dive into RL kernels, agents, and quantization. Um, you might know me or you might not know me, but I'm Daniel. Uh, my brother is somewhere. Uh, yeah, somewhere, but yes. Um, thanks for coming again. Oh, we also have stickers and other like random stuff later. Um, that's after the talk. Um, so maybe you might know me, maybe you might not. Um, so we, um, on Twitter, we tweet a lot. Um we did like a gradient accumulation bug fix last year. Um we introduced...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OkEGJ5G3foU.txt]]
- Description cue: Why is Reinforcement Learning (RL) suddenly everywhere, and is it truly effective? Have LLMs hit a plateau in terms of intelligence and capabilities, or is RL the breakthrough they need?

## Book angles
- Could support a chapter/section on **Models & Inference**.
