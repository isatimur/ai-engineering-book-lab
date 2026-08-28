# Chapter 1 — Training and the Turn to RL

## Role in the book

Open Part I where book 1's assumption first breaks: the model is not given, you are training it. The chapter's argument is that the center of gravity in model-building has moved from pre-training to *post-training* — supervised fine-tuning, preference optimization, and above all reinforcement learning — and that this shift is what turned raw language models into reasoning and agentic systems. It sets up the rest of Part I: once you accept that behavior is trained in, not prompted in, the questions of how to serve it (Ch 2), who builds it (Ch 3), and for which modality (Ch 4) all follow.

## Supporting source cluster

- [[080-p1CmPZ2j6Lk-agent-reinforcement-fine-tuning-will-hang-cathy-zhou-openai|#80 — Agent Reinforcement Fine Tuning — Will Hang & Cathy Zhou, OpenAI]]
- [[081-_IzZWeuTx7I-rl-environments-at-scale-will-brown-prime-intellect|#81 — RL Environments at Scale — Will Brown, Prime Intellect]]
- [[271-PbHm2qKnu10-training-agentic-reasoners-will-brown-prime-intellect|#271 — Training Agentic Reasoners — Will Brown, Prime Intellect]]
- [[251-QluDzKVfp6A-rl-for-autonomous-coding-aakanksha-chowdhery-reflection-ai|#251 — RL for Autonomous Coding — Aakanksha Chowdhery, Reflection.ai]]
- [[231-jQcsVk0KWiQ-a-taxonomy-for-next-gen-reasoning-nathan-lambert-allen-institute-ai2-interconnects-ai|#231 — A Taxonomy for Next-gen Reasoning — Nathan Lambert, Ai2 / Interconnects.ai]]
- [[233-liG97YXaTSA-openthoughts-data-recipes-for-reasoning-models-ryan-marten-bespoke-labs|#233 — OpenThoughts: Data Recipes for Reasoning Models — Ryan Marten, Bespoke Labs]]
- [[267-8EQo4J2BWKw-thinking-deeper-in-gemini-jack-rae-google-deepmind|#267 — Thinking Deeper in Gemini — Jack Rae, Google DeepMind]]
- [[183-9k3xPh-40mo-latent-space-paper-club-aiewf-special-edition-test-of-time-deepseek-r1-v3-vibhu-sapra|#183 — Latent Space Paper Club: Test of Time, DeepSeek R1/V3 — Vibhu Sapra]]
- [[230-OkEGJ5G3foU-full-workshop-reinforcement-learning-kernels-reasoning-quantization-agents-daniel-han|#230 — [Full Workshop] Reinforcement Learning, Kernels, Reasoning, Quantization & Agents — Daniel Han]]
- [[337-JfaLQqfXqPA-rft-dpo-sft-fine-tuning-with-openai-ilan-bigio-openai|#337 — RFT, DPO, SFT: Fine-tuning with OpenAI — Ilan Bigio, OpenAI]]
- [[674-X6NShR2ccOg-lessons-from-trillion-token-deployments-at-fortune-500s-alessandro-cappelli-adaptive-ml|#674 — Lessons from Trillion-Token Deployments at Fortune 500s — Alessandro Cappelli, Adaptive ML]]
- [[397-6lTxD_oUjXQ-effective-ai-agents-need-data-flywheels-not-the-next-biggest-llm-sylendran-arunagiri-nvidi|#397 — Effective AI Agents Need Data Flywheels, Not the Next Biggest LLM — Sylendran Arunagiri, NVIDIA]]
- [[543-i2vBaFzCEJw-the-hierarchy-of-needs-for-training-dataset-development-chang-she-and-noah-shpak|#543 — The Hierarchy of Needs for Training Dataset Development — Chang She & Noah Shpak]]
- [[482--hYqt8M9u_M-the-genai-maturity-curve-or-you-probably-don-t-need-fine-tuning-kyle-corbitt|#482 — The GenAI Maturity Curve, or You Probably Don't Need Fine-Tuning — Kyle Corbitt]]
- [[484-2Wtq2GvUicw-llm-quality-optimization-bootcamp-thierry-moreau-and-pedro-torruella|#484 — LLM Quality Optimization Bootcamp — Thierry Moreau & Pedro Torruella]]
- [[598-cXPYtkosXG4-domain-adaptation-and-fine-tuning-for-domain-specific-llms-abi-aryan|#598 — Domain Adaptation and Fine-tuning for Domain-Specific LLMs — Abi Aryan]]
- [[510-LksXn4CLC0g-no-code-fine-tuning-mark-hennings|#510 — No-code Fine-tuning — Mark Hennings]]
- [[481-zHYQZFy0UVk-fine-tune-20-llama-models-in-5-minutes-santosh-radha|#481 — Fine-tune 20 Llama Models in 5 Minutes — Santosh Radha]]
- [[506-pj_hKFhnJCw-how-to-evaluate-a-model-for-your-use-case-emmanuel-turlay|#506 — How to Evaluate a Model for Your Use Case — Emmanuel Turlay]]
- [[558-IIL2tE4n1Q0-judging-llms-alex-volkov|#558 — Judging LLMs — Alex Volkov]]
- [[678-OV56RddyFuU-self-training-agents-hermes-agent-hf-traces-skills-mcp-finetuning-merve-noyan-hugging-face|#678 — Self-Training Agents: Traces, Skills, MCP & Fine-tuning — Merve Noyan, Hugging Face]]
- [[475-tQTB4MU_z8w-accelerating-mixture-of-experts-training-with-rail-optimized-infiniband-networking-in-crus|#475 — Accelerating Mixture-of-Experts Training with Rail-Optimized InfiniBand — Crusoe]]

## Strongest source-backed observations

1. **Reasoning and agency are the same training problem, not two.** The recent capability jump comes from training models to think and to act in the same loop — multi-turn tool use trained with RL — rather than treating "reasoning" and "agents" as separate research tracks (#271, #080, #251).
2. **Reinforcement learning is what carries a model into production, because it is the only post-training method that can absorb ongoing feedback.** Prompt engineering and supervised fine-tuning cannot systematically ingest a production reward signal; RL is designed to (#674, #397).
3. **Code is a favourable domain to scale RL, because its rewards are machine-checkable.** Unit tests and compilers give a cheap, honest reward signal that most domains lack (#251). Single-source: #251 states only that coding is the "root node" problem.
4. **"You probably don't need fine-tuning" is now a legitimate default — until you do.** The maturity curve runs prompt → RAG → fine-tune → RL; jumping to training before exhausting cheaper rungs is a common, expensive mistake (#482, #598).
5. **Data recipe beats model size for reasoning quality.** Open reasoning models competitive with closed ones were built by curating reasoning datasets, not by scaling parameters — the differentiator moved to the data pipeline (#233, #543).
6. **RL's real cost is operational, not conceptual.** Running the training loop at scale means orchestrating multiple models and specialized networking; the technique is understood, the ops are the hard part (#674, #475, #230).

## Useful quotes / excerpts

> "The high level thesis of this talk is like — no, they're kind of the same thing." — [[271-PbHm2qKnu10-training-agentic-reasoners-will-brown-prime-intellect|Will Brown, Prime Intellect]] (#271, on reasoning vs. agents)

> "You can scale RL at training time and the numbers will go up and that's deeply correlated with being able to then do this inference time scaling." — [[231-jQcsVk0KWiQ-a-taxonomy-for-next-gen-reasoning-nathan-lambert-allen-institute-ai2-interconnects-ai|Nathan Lambert, Ai2]] (#231)

> "Reinforcement learning RL is not just any other algorithm for post-training, but is an algorithm that at its core will bring models to production." — [[674-X6NShR2ccOg-lessons-from-trillion-token-deployments-at-fortune-500s-alessandro-cappelli-adaptive-ml|Alessandro Cappelli, Adaptive ML]] (#674)

> "It's not about powering them up with the next biggest LLM in the market. All they need is simple data flywheels." — [[397-6lTxD_oUjXQ-effective-ai-agents-need-data-flywheels-not-the-next-biggest-llm-sylendran-arunagiri-nvidi|Sylendran Arunagiri, NVIDIA]] (#397)

> "Open Thoughts, which is our project to create the best open-source reasoning data sets." — [[233-liG97YXaTSA-openthoughts-data-recipes-for-reasoning-models-ryan-marten-bespoke-labs|Ryan Marten, Bespoke Labs]] (#233)

> "The title of my talk is that you probably don't need fine tuning — this is an awkward title, given that I am doing a fine-tuning platform." — [[482--hYqt8M9u_M-the-genai-maturity-curve-or-you-probably-don-t-need-fine-tuning-kyle-corbitt|Kyle Corbitt]] (#482)

## Open questions

- Where is the line between this chapter and Ch 3 (Frontier Models)? Reasoning-model construction (#267, #231) is both a training story and a frontier-lab story. Leaning: training *method* here, frontier *strategy and rivalry* in Ch 3.
- #558 (Judging LLMs) and #506 (evaluating a model) are model-evaluation talks orphaned when the spec's "model-evals" chapter was dropped. They fit here as "how you know training worked," but could equally seed a short evals section in Ch 3. Decide during drafting.
- How much RL-ops detail (#475, #230) belongs here versus Ch 2? The InfiniBand/MoE-training talk straddles training and infrastructure.
- Does the chapter open on the DeepSeek R1 moment (#183) as the narrative hook, or on OpenAI's agent-RFT framing (#080)?
