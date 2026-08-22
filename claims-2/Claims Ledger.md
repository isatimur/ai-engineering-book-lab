# Claims Ledger — Second Book

Source Anchors (video id + start/end timestamp + verbatim quote + confidence) are
deferred to a later anchoring pass, as in book 1. Until then, supporting sources
are listed as `[[wikilink|label]]` references into `01_Videos/`. See
`programs/second_book_drafting_pass.md` and `programs/source_anchoring_pass.md`.

## 1) Reasoning and agency are the same training problem, not two
- **Why it matters:** Reframes the recent capability jump. It did not come from a bigger base model but from training models to think and to act in one loop — multi-turn tool use optimized with reinforcement learning. It collapses "reasoning research" and "agent research" into a single question: what reward are you training against.
- **Support level:** strong
- **Supporting sources:**
  - [[271-PbHm2qKnu10-training-agentic-reasoners-will-brown-prime-intellect|#271 — Will Brown, Prime Intellect]] — "The high level thesis of this talk is like — no, they're kind of the same thing."
  - [[080-p1CmPZ2j6Lk-agent-reinforcement-fine-tuning-will-hang-cathy-zhou-openai|#80 — Will Hang & Cathy Zhou, OpenAI]] — agent reinforcement fine-tuning as the method for training whole tool-use trajectories.
  - [[251-QluDzKVfp6A-rl-for-autonomous-coding-aakanksha-chowdhery-reflection-ai|#251 — Aakanksha Chowdhery, Reflection.ai]] — the arc from pre-training scale to inference-time tricks to RL at training time.
- **Caveats / counterevidence:** The unification holds most cleanly where tool-use trajectories can be rewarded end to end. Some "reasoning" gains still come from architecture and data changes, not RL alone.
- **Candidate chapters:** 1, 3
- **Reusable phrasing:** Reasoning and agency are not two research tracks. Train multi-turn tool use with RL and they become the same loop.

## 2) Reinforcement learning is the post-training method that carries a model into production
- **Why it matters:** It is the only post-training method that can absorb an ongoing production reward signal. Prompt engineering and supervised fine-tuning cannot systematically ingest field feedback; RL was designed to. This is what closes the gap between an impressive demo and a system that keeps improving.
- **Support level:** strong
- **Supporting sources:**
  - [[674-X6NShR2ccOg-lessons-from-trillion-token-deployments-at-fortune-500s-alessandro-cappelli-adaptive-ml|#674 — Alessandro Cappelli, Adaptive ML]] — "Reinforcement learning RL is not just any other algorithm for post-training, but is an algorithm that at its core will bring models to production."
  - [[397-6lTxD_oUjXQ-effective-ai-agents-need-data-flywheels-not-the-next-biggest-llm-sylendran-arunagiri-nvidi|#397 — Sylendran Arunagiri, NVIDIA]] — "It's not about powering them up with the next biggest LLM in the market. All they need is simple data flywheels."
- **Caveats / counterevidence:** Many production systems ship and stay on prompting or retrieval because the cost and ops of RL are not yet justified. The claim is about high-stakes systems that must keep improving, not every product.
- **Candidate chapters:** 1, 2
- **Reusable phrasing:** RL is not just another post-training algorithm. It is the one built to turn production feedback back into the model.

## 3) Code is the best domain to scale RL, because its rewards are automatically verifiable
- **Why it matters:** RL needs a reward, and code supplies a cheap, honest one — unit tests and compilers grade output by machine, millions of times, without a human in the loop. That is why coding agents advanced fastest, and why unverifiable domains lag: their rewards are hard to build and easy to game.
- **Support level:** strong
- **Supporting sources:**
  - [[251-QluDzKVfp6A-rl-for-autonomous-coding-aakanksha-chowdhery-reflection-ai|#251 — Aakanksha Chowdhery, Reflection.ai]] — verifiable domains (math, code) turn compute into reliable gains; execution feedback reduces reward-hacking risk; autonomous coding as the "root node" problem.
- **Caveats / counterevidence:** Verifiability buys scale, not correctness of intent — a solution can pass tests and still be wrong for the task. Single-source claim; corroborating verifiable-reward sources would strengthen it.
- **Candidate chapters:** 1, 4
- **Reusable phrasing:** Code is not special because it is important. It is special because it grades itself.

## 4) "You probably don't need fine-tuning" is a legitimate default — until you do
- **Why it matters:** The turn to training does not mean every team should train. The maturity curve runs prompt → retrieval → fine-tune → RL, and jumping to training before exhausting the cheaper rungs is a common, expensive mistake. Knowing which rung the problem needs is the skill.
- **Support level:** strong
- **Supporting sources:**
  - [[482--hYqt8M9u_M-the-genai-maturity-curve-or-you-probably-don-t-need-fine-tuning-kyle-corbitt|#482 — Kyle Corbitt]] — "The title of my talk is that you probably don't need fine tuning — this is an awkward title, given that I am doing a fine-tuning platform."
  - [[598-cXPYtkosXG4-domain-adaptation-and-fine-tuning-for-domain-specific-llms-abi-aryan|#598 — Abi Aryan]] — adaptation methods run from prompt engineering to retrieval to fine-tuning; the right choice depends on dataset and problem.
- **Caveats / counterevidence:** The default flips for high-stakes systems that must keep improving in production, where training becomes necessary (see claim 2). The maturity curve is a sequence, not a verdict against training.
- **Candidate chapters:** 1
- **Reusable phrasing:** You probably do not need fine-tuning to reach an MVP. You probably do need training to keep a high-stakes system improving after it ships.

## 5) For reasoning quality, the data recipe beats model size
- **Why it matters:** The differentiator moved from the pre-training budget to the training-data pipeline. Open reasoning models competitive with closed ones were built by curating reasoning datasets, not by scaling parameters — which relocates advantage to data construction.
- **Support level:** strong
- **Supporting sources:**
  - [[233-liG97YXaTSA-openthoughts-data-recipes-for-reasoning-models-ryan-marten-bespoke-labs|#233 — Ryan Marten, Bespoke Labs]] — "Open Thoughts, which is our project to create the best open-source reasoning data sets"; OpenThinker reached SOTA among small open reasoning models by curating traces.
  - [[543-i2vBaFzCEJw-the-hierarchy-of-needs-for-training-dataset-development-chang-she-and-noah-shpak|#543 — Chang She & Noah Shpak]] — model quality depends critically on how the dataset is constructed.
  - [[397-6lTxD_oUjXQ-effective-ai-agents-need-data-flywheels-not-the-next-biggest-llm-sylendran-arunagiri-nvidi|#397 — Sylendran Arunagiri, NVIDIA]] — the same point from the production side: the data flywheel is the lever, not the parameter count.
- **Caveats / counterevidence:** Model scale still sets the ceiling for the hardest frontier tasks. The claim is that at a given scale, data recipe now separates competitive reasoning models from also-rans.
- **Candidate chapters:** 1, 3
- **Reusable phrasing:** The differentiator moved from the number of parameters to the quality of the data pipeline that trains them.

## 6) RL's real cost is operational, not conceptual
- **Why it matters:** The algorithms are well understood; running the loop at scale is the hard part. PPO-style training holds several large models in memory at once and depends on specialized networking. The moat is the ability to run RL, not the technique itself — which is why this thread hands off to the serving and inference-economics chapter.
- **Support level:** strong
- **Supporting sources:**
  - [[674-X6NShR2ccOg-lessons-from-trillion-token-deployments-at-fortune-500s-alessandro-cappelli-adaptive-ml|#674 — Alessandro Cappelli, Adaptive ML]] — running PPO means orchestrating four models simultaneously; most teams cannot without infrastructure.
  - [[251-QluDzKVfp6A-rl-for-autonomous-coding-aakanksha-chowdhery-reflection-ai|#251 — Aakanksha Chowdhery, Reflection.ai]] — PPO-style RLHF keeps four copies of the model in memory; DeepSeek's GRPO still needs three.
  - [[475-tQTB4MU_z8w-accelerating-mixture-of-experts-training-with-rail-optimized-infiniband-networking-in-crus|#475 — Crusoe]] — mixture-of-experts training distributes layers and depends on a rail-optimized InfiniBand fabric.
  - [[230-OkEGJ5G3foU-full-workshop-reinforcement-learning-kernels-reasoning-quantization-agents-daniel-han|#230 — Daniel Han]] — treats RL through its operational surface: kernels, quantization, agents.
- **Caveats / counterevidence:** Managed RL-ops platforms and cheaper variants (e.g. GRPO) are shrinking this cost, so the operational moat may narrow over time.
- **Candidate chapters:** 1, 2
- **Reusable phrasing:** The RL technique is not the moat. The ability to run it is.
