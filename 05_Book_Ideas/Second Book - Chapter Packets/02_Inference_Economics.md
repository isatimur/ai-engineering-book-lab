# Chapter 2 — Inference Economics

## Role in the book

Once you build a model, you have to run it — and running it is where the money, the latency, and the constraints actually live. This chapter argues that inference, not training, is the market and the discipline most AI engineers will spend their careers inside, and that the model's *cost and speed profile* is a design input as fundamental as its accuracy. It is the densest cluster in Part I (~38 talks) and runs in two movements: **serving performance** (how you make a given model fast and cheap) and **the compute substrate** (the hardware, data centers, and economics underneath, up to geopolitics). The chapter connects to Ch 1 (RL makes models you then have to serve) and Ch 4 (voice and media models have the hardest latency budgets of all).

## Supporting source cluster

### Movement A — Serving performance (quantization, kernels, engines, on-device)

- [[316-DeFF3J8T5Pk-how-fast-are-llm-inference-engines-anyway-charles-frye-modal|#316 — How Fast Are LLM Inference Engines Anyway? — Charles Frye, Modal]]
- [[141-Y2qc0UhDSnc-hacking-the-inference-pareto-frontier-kyle-kranen-nvidia|#141 — Hacking the Inference Pareto Frontier — Kyle Kranen, NVIDIA]]
- [[514-9tvJ_GYJA-o-mastering-llm-inference-optimization-from-theory-to-cost-effective-deployment-mark-moyou|#514 — Mastering LLM Inference Optimization — Mark Moyou, NVIDIA]]
- [[173-Ahtaha9fEM0-introduction-to-llm-serving-with-sglang-philip-kiely-and-yineng-zhang-baseten|#173 — Introduction to LLM Serving with SGLang — Philip Kiely & Yineng Zhang, Baseten]]
- [[555-Lko9lTGD_9U-from-model-weights-to-api-endpoint-with-tensorrt-llm-philip-kiely-and-pankaj-gupta|#555 — From Model Weights to API Endpoint with TensorRT-LLM — Philip Kiely & Pankaj Gupta]]
- [[470-ePMvfa8vgL8-customized-production-ready-inference-with-open-source-models-dmytro-dima-dzhulgakov|#470 — Customized, Production-Ready Inference with Open-Source Models — Dmytro Dzhulgakov, Fireworks]]
- [[548-C1CXwRYbwuQ-making-open-models-10x-faster-and-better-for-modern-application-innovation-dmytro-dima-dzh|#548 — Making Open Models 10x Faster — Dmytro Dzhulgakov, Fireworks]]
- [[068-6guQG_tGt0o-ai-kernel-generation-what-s-working-what-s-not-what-s-next-natalie-serrino-gimlet-labs|#68 — AI Kernel Generation — Natalie Serrino, Gimlet Labs]]
- [[097-q2nHsJVy4FE-compilers-in-the-age-of-llms-yusuf-olokoba-muna|#97 — Compilers in the Age of LLMs — Yusuf Olokoba, Muna]]
- [[388-0uj9lMI-sIo-luminal-search-based-deep-learning-compilers-joe-fioti|#388 — Luminal: Search-Based Deep Learning Compilers — Joe Fioti]]
- [[578-7TnkqfX84gI-unlocking-developer-productivity-across-cpu-and-gpu-with-max-chris-lattner|#578 — Unlocking Developer Productivity Across CPU and GPU with MAX — Chris Lattner, Modular]]
- [[575-pRM_P6UfdIc-low-level-technicals-of-llms-daniel-han|#575 — Low-Level Technicals of LLMs — Daniel Han]]
- [[576-TKmfBnW0mQA-fixing-bugs-in-gemma-llama-phi-3-daniel-han|#576 — Fixing Bugs in Gemma, Llama & Phi-3 — Daniel Han]]
- [[298-tzRvcTEapzo-from-mixture-of-experts-to-mixture-of-agents-with-super-fast-inference-daniel-kim-daria-so|#298 — From Mixture of Experts to Mixture of Agents — Daniel Kim & Daria Soboleva]]
- [[544-aNmfvN6S_n4-no-more-bad-outputs-with-structured-generation-remi-louf|#544 — No More Bad Outputs with Structured Generation — Remi Louf, .txt / Outlines]]
- [[335-84Vtz2IL1Ug-fun-stories-from-building-openrouter-and-where-all-this-is-going-alex-atallah-openrouter|#335 — Building OpenRouter and Where This Is Going — Alex Atallah, OpenRouter]]
- [[494-x8HbIJh2wpQ-substrate-launch-the-api-for-modular-ai|#494 — Substrate: the API for Modular AI]]
- [[530-Yyg_BoeB2LU-a-practical-guide-to-efficient-ai-shelby-heinecke|#530 — A Practical Guide to Efficient AI — Shelby Heinecke]]
- [[257-gcseUQJ6Gbg-using-oss-models-to-build-ai-apps-with-millions-of-users-hassan-el-mghari|#257 — Using OSS Models to Build AI Apps with Millions of Users — Hassan El Mghari]]
- [[147-rD23-VZZHOo-serving-voice-ai-at-1-hr-open-source-loras-latency-load-balancing-neil-dwyer-gabber|#147 — Serving Voice AI at $1/hr — Neil Dwyer, Gabber]]
- [[280-gmTHs5T_YAE-optimizing-inference-for-voice-models-in-production-philip-kiely-baseten|#280 — Optimizing Inference for Voice Models in Production — Philip Kiely, Baseten]]
- [[293-knH3fmGAteQ-serving-voice-ai-at-scale-arjun-desai-cartesia-rohit-talluri-aws|#293 — Serving Voice AI at Scale — Arjun Desai (Cartesia) & Rohit Talluri (AWS)]]
- [[007-a2muGkT4WD4-running-llms-on-your-iphone-40-tok-s-gemma-4-with-mlx-adrien-grondin-locally-ai|#7 — Running LLMs on Your iPhone: 40 tok/s Gemma 4 with MLX — Adrien Grondin]]
- [[670-zTLJNHj0DeQ-why-mlx-prince-canuma-neywa-labs|#670 — Why MLX — Prince Canuma, Neywa Labs]]
- [[307-l614N5W60ls-foundry-local-cutting-edge-ai-experiences-on-device-with-onnx-runtime-olive-emma-ning-micr|#307 — Foundry Local: On-Device AI with ONNX Runtime — Emma Ning, Microsoft]]
- [[582--mRi-B3t6fA-llamafile-bringing-ai-to-the-masses-with-fast-cpu-inference-stephen-hood-and-justine-tunne|#582 — Llamafile: Fast CPU Inference — Stephen Hood & Justine Tunney]]
- [[593-MwqUYRQloGw-harnessing-the-power-of-llms-locally-mithun-hunsur|#593 — Harnessing the Power of LLMs Locally — Mithun Hunsur]]
- [[025-c5-kx2bwoCk-running-llms-locally-practical-llm-performance-on-dgx-spark-mozhgan-kabiri-chimeh-nvidia|#25 — Running LLMs Locally: Practical Performance on DGX Spark — Mozhgan Kabiri Chimeh, NVIDIA]] *(reassigned from the part1/part2 overlap set)*

### Movement B — The compute substrate (GPUs, data centers, economics, geopolitics, trust)

- [[228-y-UGrYbJsJk-what-every-ai-engineer-needs-to-know-about-gpus-charles-frye-modal|#228 — What Every AI Engineer Needs to Know About GPUs — Charles Frye, Modal]]
- [[213-wt8gzWR6auQ-continuous-profiling-for-gpus-matthias-loibl-polar-signals|#213 — Continuous Profiling for GPUs — Matthias Loibl, Polar Signals]]
- [[547-gADhNzFjGeI-breaking-ai-s-1-ghz-barrier-sunny-madra-groq|#547 — Breaking AI's 1-GHz Barrier — Sunny Madra, Groq]]
- [[402-3j1dHivahFQ-how-to-build-your-own-ai-data-center-in-2025-paul-gilbert-arista-networks|#402 — How to Build Your Own AI Data Center in 2025 — Paul Gilbert, Arista Networks]]
- [[139-M6Vbaig1TsM-why-we-don-t-need-more-data-centers-dr-jasper-zhang-hyperbolic|#139 — Why We Don't Need More Data Centers — Dr. Jasper Zhang, Hyperbolic]]
- [[345-Zz4QjZsYWK0-the-geopolitics-of-ai-infrastructure-dylan-patel-semianalysis|#345 — The Geopolitics of AI Infrastructure — Dylan Patel, SemiAnalysis]]
- [[466-qeDPKbWjsuk-keynote-the-ai-developer-experience-doesn-t-have-to-suck-why-and-how-we-built-modal|#466 — Keynote: The AI Developer Experience Doesn't Have to Suck (Modal) — Erik Bernhardsson]]
- [[211-6Tpm4m1YxHk-critical-ai-inference-your-cio-can-trust-sahil-yadav-hariharan-ganesan-telemetrak|#211 — Critical AI Inference Your CIO Can Trust — Sahil Yadav & Hariharan Ganesan]]
- [[361-A0PxE39xaMc-gpu-less-trust-less-limit-less-reimagining-the-confidential-ai-cloud-mike-bursell|#361 — GPU-less, Trust-less, Limit-less: Confidential AI Cloud — Mike Bursell]]
- [[488-LJa1SjCkYas-insights-from-snorkel-ai-running-azure-ai-infrastructure-humza-iqbal-and-lachlan-ainley|#488 — Insights from Snorkel AI Running Azure AI Infrastructure — Humza Iqbal & Lachlan Ainley]]

## Strongest source-backed observations

1. **Inference, not training, is the largest and most contested market in AI software.** The whole open-model ecosystem exists because serving is where recurring cost and competitive advantage live (#335, #316).
2. **A model's speed and cost are a system property, not a model property.** The same weights on a good serving stack versus a naive one differ by an order of magnitude; the "Pareto frontier" is set by the deployment, not the checkpoint (#141, #514, #548).
3. **On-device inference is crossing from demo to default.** Consumer silicon (Apple, phones, CPUs) can now run capable open models locally, turning a per-month subscription into a one-time energy cost and changing who can access AI at all (#007, #670, #582, #307).
4. **Compilers and generated kernels are eating hand-tuned performance work.** Search-based compilation and LLM-generated kernels are automating the low-level optimization that used to require scarce experts (#068, #388, #097, #578).
5. **The substrate is a hard constraint, not a footnote.** GPUs, networking, power, and data-center design set the ceiling on what any serving stack can do — and that ceiling is now a geopolitical variable (#228, #402, #345, #547).
6. **Trust and confidentiality are becoming first-class inference requirements.** Running proprietary models on sensitive data without surrendering either is now a named product category, not an afterthought (#361, #211).

## Useful quotes / excerpts

> "Inference might be the largest market ever in software." — [[335-84Vtz2IL1Ug-fun-stories-from-building-openrouter-and-where-all-this-is-going-alex-atallah-openrouter|Alex Atallah, OpenRouter]] (#335)

> "A good model and a good system that takes into account the actual constraints for what you need from your deployment is actually key to the success of both your deployment and the application." — [[141-Y2qc0UhDSnc-hacking-the-inference-pareto-frontier-kyle-kranen-nvidia|Kyle Kranen, NVIDIA]] (#141)

> "I want to convince you today to offload some of that subscription completely on device and then all you need to pay is your energy bill." — [[670-zTLJNHj0DeQ-why-mlx-prince-canuma-neywa-labs|Prince Canuma, Neywa Labs]] (#670)

> "How do I use more models in more places without having to rebuild or extend?" — [[097-q2nHsJVy4FE-compilers-in-the-age-of-llms-yusuf-olokoba-muna|Yusuf Olokoba, Muna]] (#97)

> "AI is transforming everything. Healthcare, finance, automation, digital marketing. But one thing holds it back, and that's trust. How do you run models on sensitive data without handing it over?" — [[361-A0PxE39xaMc-gpu-less-trust-less-limit-less-reimagining-the-confidential-ai-cloud-mike-bursell|Mike Bursell]] (#361)

> "Twenty-five years ago we crossed the 1 gigahertz speed barrier in microprocessors." — [[547-gADhNzFjGeI-breaking-ai-s-1-ghz-barrier-sunny-madra-groq|Sunny Madra, Groq]] (#547)

> "What we do is a plumbing… how you train models, what the infrastructure looks like, and how you do inferencing on the infrastructure." — [[402-3j1dHivahFQ-how-to-build-your-own-ai-data-center-in-2025-paul-gilbert-arista-networks|Paul Gilbert, Arista Networks]] (#402)

## Open questions

- **Split or not?** At ~38 sources this is nearly double any other chapter. The two movements are coherent enough to become two chapters — "Serving Performance" and "The Compute Substrate" — which would give Part I five chapters and the book ten. Kept unified for now to stay inside the spec's "3-4 per part," but this is the single most likely place to grow. Decide before drafting; if split, the voice-serving talks (#147, #280, #293) anchor the performance chapter's latency section.
- Voice-serving talks (#147, #280, #293) sit at the seam with Ch 4 (Beyond Text). They are placed here because they are about *serving economics*; the voice-model *architecture* talks live in Ch 4. Keep the split clean when drafting.
- Several talks are vendor-shaped (#470, #548, #488, #494). Use them for concrete numbers, not as the chapter's spine.
- How much low-level GPU detail (#228, #575, #213) does the book's audience need before it becomes a different book? Set a depth ceiling early.
