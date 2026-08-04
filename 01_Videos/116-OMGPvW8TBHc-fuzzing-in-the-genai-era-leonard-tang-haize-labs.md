---
video_id: "OMGPvW8TBHc"
playlist_index: 116
title: "Fuzzing in the GenAI Era — Leonard Tang, Haize Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OMGPvW8TBHc"
duration: "19:12"
duration_seconds: 1152
view_count: 3894
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/OMGPvW8TBHc.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:23:36+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Haize Labs' Leonard Tang details \"hazing\": optimization-driven fuzzing plus agent/RL-trained judges that beat o1/o3-mini and match Claude 3 Opus on RewardBench at a fraction of the cost."
---
# Fuzzing in the GenAI Era — Leonard Tang, Haize Labs

## Summary
Tang argues static golden-dataset evals fail in the genAI era because they don't capture what he calls "brittleness" (Lipschitz discontinuity) — near-identical inputs can produce wildly different outputs — so a system scoring 100% on a fixed eval set can still fail badly nearby in input space. Haize Labs' answer, "hazing," is optimization-driven fuzzing: simulate large-scale stimuli (fuzzing for in-distribution variance, adversarial search for prompt injection/jailbreaks), score outputs with a judge, and use that signal to guide the next search round until the search budget is exhausted or bugs are found; input search uses gradient-based token flips, tree search/MCTS, latent-space search over embeddings, and DSPy. The harder problem, he says, is "judging the judge," since off-the-shelf LLM-as-judge is unstable, uncalibrated, and order/position-biased; Haize's "verdict" library instead builds agents-as-judges using scalable-oversight primitives (debate, self-verification, ensembling) on a GPT-4o-mini backbone, which on an expert-QA verification task beat o1, o3-mini, GPT-4, and Claude 3.5 Sonnet at under a third of their cost and latency. On the RL side, GRPO/self-principled-critique tuning of small judge models (600M and a 1.7B-parameter "J1 micro") reached ~80.7% on RewardBench, competitive with Claude 3 Opus (80%) and GPT-4 mini (80%) and beating Llama 3 70B (77%). Case studies: hazing a Hungarian bank's loan-calculator AI against its 18-line code of conduct surfaced prompt injections and jailbreaks before launch; testing a Fortune 500 bank's voice-based debt-collection agent (adding audio variance like background noise and static) did in 5 minutes what an internal ops team said took them 3 months; and applying the verdict rubric-fanout architecture to another voice-agent company's eval suite lifted agreement with ground-truth human annotators by 38% over their internal ops team's scoring.

## Why it matters
- Gives a precise technical vocabulary ("brittleness"/Lipschitz discontinuity, hazing, judging the judge, judge-time compute scaling) and concrete benchmark numbers for a book chapter arguing static golden datasets are insufficient for evaluating agentic/genAI systems.
- Documents two distinct, named approaches to building reliable judges — agent-as-judge ensembles (verdict) and small RL-trained reward models (J1 micro) — with head-to-head cost/latency/accuracy comparisons against frontier models, useful as a concrete eval-architecture case study.
- The regulated-industry case studies (bank loan calculator, voice-based debt collection) with a stated 3-months-to-5-minutes speedup are citable, real-world evidence for automated adversarial testing's value before production launch.

## Metadata
- Video: https://www.youtube.com/watch?v=OMGPvW8TBHc
- Duration: 19:12
- Playlist index: 116
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Thanks Ally for the great intro. Uh indeed we're working on what I believe to be the exant problem in AI which is to say how do you validate verify audit steer something that is as subjective and unstructured as literal LLM slop. So today we're going to be talking a lot about this. Um I should point out that ostensively we're part of the AI security track although I would really consider us more of a QA company and eval company in some sense although there's a lot of shared similarities in how we approach the problem technically right we are essentially a property based testing company or fuss testing company or as I like to call it a hazing company. Cool. So just to set the context...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OMGPvW8TBHc.txt]]
- Description cue: "Evaluation" is one of those concepts that every AI practitioner vaguely knows is important, but few practitioners truly understand. Is "eval" the dataset for measuring the quality of your...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
