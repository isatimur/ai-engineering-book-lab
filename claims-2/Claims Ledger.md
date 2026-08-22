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

## 7) Inference, not training, is the largest and most contested market in AI software
- **Why it matters:** It relocates the center of the AI business from the one-time training run to the recurring served token. Training is a capital cost; inference is the cost of goods sold, paid on every request for as long as the product lives. The whole open-model ecosystem — serving frameworks, inference clouds, on-device runtimes — exists because serving is where recurring cost and competitive advantage live.
- **Support level:** strong
- **Supporting sources:**
  - [[335-84Vtz2IL1Ug-fun-stories-from-building-openrouter-and-where-all-this-is-going-alex-atallah-openrouter|#335 — Alex Atallah, OpenRouter]] — "Inference might be the largest market ever in software." (a marketplace routing traffic across dozens of model providers)
  - [[316-DeFF3J8T5Pk-how-fast-are-llm-inference-engines-anyway-charles-frye-modal|#316 — Charles Frye, Modal]] — open-weights models and open-source inference servers have made major strides; running a serious agent on open models is now a real option.
- **Caveats / counterevidence:** "Largest market" is Atallah's framing, plausible but not independently sized here. Training and inference are coupled — the same labs and hardware serve both — so the split is analytic, not a hard boundary.
- **Candidate chapters:** 2, 3
- **Reusable phrasing:** If the model is the product, inference is the cost of goods sold.

## 8) A model's speed and cost are a system property, not a model property
- **Why it matters:** The same weights, served on a good stack versus a naive one, differ by an order of magnitude in throughput and price. The Pareto frontier — latency against cost against quality — is set by the deployment, not the checkpoint. So the lever for making a model fast and cheap is the serving system, and treating serving as an afterthought pays an order-of-magnitude penalty.
- **Support level:** strong
- **Supporting sources:**
  - [[141-Y2qc0UhDSnc-hacking-the-inference-pareto-frontier-kyle-kranen-nvidia|#141 — Kyle Kranen, NVIDIA]] — "A good model and a good system that takes into account the actual constraints for what you need from your deployment is actually key to the success of both your deployment and the application." (ran NVIDIA's largest inference deployment)
  - [[514-9tvJ_GYJA-o-mastering-llm-inference-optimization-from-theory-to-cost-effective-deployment-mark-moyou|#514 — Mark Moyou, NVIDIA]] — LLM inference is not a normal deployment; managing scale, performance, and cost at once is non-trivial.
  - [[548-C1CXwRYbwuQ-making-open-models-10x-faster-and-better-for-modern-application-innovation-dmytro-dima-dzh|#548 — Dmytro Dzhulgakov, Fireworks]] — making open models ~10x faster is a serving problem, not a new model.
- **Caveats / counterevidence:** Distinct from claim 6 (RL's operational cost, on the training side): this is about *serving* system properties. The order-of-magnitude figure is a general claim from practitioners, not a controlled benchmark. Model quality still bounds what any system can serve.
- **Candidate chapters:** 2
- **Reusable phrasing:** If you want a model to be fast and cheap, you optimize the system, not the model.

## 9) On-device inference is crossing from demo to default
- **Why it matters:** Consumer silicon — Apple chips, phones, ordinary CPUs — can now run capable open models locally, turning a per-month subscription into a one-time energy cost and a data-center round trip into a local call. This changes who can reach AI at all, not just what it costs: it works offline, keeps data private, and removes the subscription barrier for users the cloud never served.
- **Support level:** strong
- **Supporting sources:**
  - [[670-zTLJNHj0DeQ-why-mlx-prince-canuma-neywa-labs|#670 — Prince Canuma, Neywa Labs]] — "I want to convince you today to offload some of that subscription completely on device and then all you need to pay is your energy bill." (working demos on consumer Macs; accessibility as the driver)
  - [[007-a2muGkT4WD4-running-llms-on-your-iphone-40-tok-s-gemma-4-with-mlx-adrien-grondin-locally-ai|#007 — Adrien Grondin, Locally AI]] — Gemma 4 on an iPhone at 40 tok/s via MLX.
  - [[582--mRi-B3t6fA-llamafile-bringing-ai-to-the-masses-with-fast-cpu-inference-stephen-hood-and-justine-tunne|#582 — Stephen Hood & Justine Tunney, Llamafile]] — Mozilla's project makes open models run fast on consumer CPUs to democratize access.
  - [[307-l614N5W60ls-foundry-local-cutting-edge-ai-experiences-on-device-with-onnx-runtime-olive-emma-ning-micr|#307 — Emma Ning, Microsoft]] — Foundry Local brings on-device AI to cross-platform apps via ONNX Runtime; offline/low-bandwidth is the first reason.
- **Caveats / counterevidence:** "Default" is directional: on-device suits a class of models and workloads, not the frontier's largest models. Most sources are vendor/framework advocates for on-device.
- **Candidate chapters:** 2, 4
- **Reusable phrasing:** The cheapest and most private data center may be the one already in your pocket.

## 10) Compilers and generated kernels are automating the expert layer of inference optimization
- **Why it matters:** The deepest performance work — hand-writing GPU kernels — used to require a scarce specialist. Search-based compilation and AI-generated kernels are now producing that optimization automatically, which widens the set of people who can deploy a model well and removes a bottleneck that used to gate deployments behind rare experts.
- **Support level:** moderate
- **Supporting sources:**
  - [[388-0uj9lMI-sIo-luminal-search-based-deep-learning-compilers-joe-fioti|#388 — Joe Fioti, Luminal]] — a deep-learning compiler for CPUs/GPUs/ASICs that discovers efficient kernels (e.g. flash attention) automatically by search.
  - [[068-6guQG_tGt0o-ai-kernel-generation-what-s-working-what-s-not-what-s-next-natalie-serrino-gimlet-labs|#068 — Natalie Serrino, Gimlet Labs]] — AI-generated kernels can meaningfully speed up custom code with no human effort.
  - [[097-q2nHsJVy4FE-compilers-in-the-age-of-llms-yusuf-olokoba-muna|#097 — Yusuf Olokoba, Muna]] — "How do I use more models in more places without having to rebuild or extend?" (portability across targets)
  - [[578-7TnkqfX84gI-unlocking-developer-productivity-across-cpu-and-gpu-with-max-chris-lattner|#578 — Chris Lattner, Modular]] — MAX spans GPU compute, CPU preprocessing, and orchestration across vendors without a rewrite.
- **Caveats / counterevidence:** Support level is moderate: sources are the tool-builders, whose talks ("what's working, what's not") admit the automation is partial. How far generated kernels close the gap to expert-tuned code at the frontier is unsettled.
- **Candidate chapters:** 2
- **Reusable phrasing:** The optimization that used to gate a deployment behind a specialist is becoming something a compiler or a model produces on demand.

## 11) The compute substrate is a hard constraint — and now a geopolitical variable
- **Why it matters:** GPUs, networking, power, and data-center design set the ceiling no serving software can lift, so AI engineers can no longer build only above the API boundary. That ceiling now depends on trade policy, fabrication capacity, and national strategy — and on new silicon betting the GPU is not the last word — which makes the cost of running a model partly a political question.
- **Support level:** strong
- **Supporting sources:**
  - [[228-y-UGrYbJsJk-what-every-ai-engineer-needs-to-know-about-gpus-charles-frye-modal|#228 — Charles Frye, Modal]] — AI's extreme demand for math throughput means engineers now need to understand the GPU underneath.
  - [[402-3j1dHivahFQ-how-to-build-your-own-ai-data-center-in-2025-paul-gilbert-arista-networks|#402 — Paul Gilbert, Arista Networks]] — "What we do is a plumbing… how you train models, what the infrastructure looks like, and how you do inferencing on the infrastructure."
  - [[345-Zz4QjZsYWK0-the-geopolitics-of-ai-infrastructure-dylan-patel-semianalysis|#345 — Dylan Patel, SemiAnalysis]] — chips, data centers, power, and supply chains are now an arena for geopolitical competition (China/US/Middle East; Huawei closing the gap).
  - [[547-gADhNzFjGeI-breaking-ai-s-1-ghz-barrier-sunny-madra-groq|#547 — Sunny Madra, Groq]] — "Twenty-five years ago we crossed the 1 gigahertz speed barrier in microprocessors." (purpose-built inference silicon as a step change)
- **Caveats / counterevidence:** The geopolitical claim (#345) is analysis, not a settled forecast; specifics (export controls, Huawei's position) move quickly and date fast. The new-silicon bet (#547) is a vendor's framing of its own chip.
- **Candidate chapters:** 2, 3
- **Reusable phrasing:** Movement A is the frontier you can push; Movement B is the ceiling that pushes back.

## 12) Trust and confidentiality are becoming first-class inference requirements
- **Why it matters:** For the industries with the most to spend — healthcare, finance — a model is unusable until it can run on sensitive data without surrendering the data or the result. That splits into two demands inference must now meet: confidentiality (the data stays private, even from the machine's operator) and reliability (the decision can be relied upon). Both are properties of how and where a model is served, not of the model itself.
- **Support level:** moderate
- **Supporting sources:**
  - [[361-A0PxE39xaMc-gpu-less-trust-less-limit-less-reimagining-the-confidential-ai-cloud-mike-bursell|#361 — Mike Bursell]] — "AI is transforming everything. Healthcare, finance, automation, digital marketing. But one thing holds it back, and that's trust. How do you run models on sensitive data without handing it over?" (confidential computing)
  - [[211-6Tpm4m1YxHk-critical-ai-inference-your-cio-can-trust-sahil-yadav-hariharan-ganesan-telemetrak|#211 — Sahil Yadav & Hariharan Ganesan, Telemetrak]] — a decade deploying AI in healthcare, industrial IoT, and telecom: can we trust the model's decisions in mission-critical use?
- **Caveats / counterevidence:** Support level moderate: both sources are vendors of trust/confidential-inference products, so "first-class requirement" partly reflects their market. The confidentiality (#361) and reliability (#211) strands are distinct problems joined here under one theme; they may separate in later drafts.
- **Candidate chapters:** 2, and the Part II regulated-domain chapters (finance/legal/medicine)
- **Reusable phrasing:** Trust is not a property of the model in isolation. It is a property of how and where it is served.
