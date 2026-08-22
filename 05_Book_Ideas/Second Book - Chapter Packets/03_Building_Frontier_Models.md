# Chapter 3 — Building Frontier Models

## Role in the book

Zoom out from technique (Ch 1) and serving (Ch 2) to the labs and the strategy: what it means to build a frontier model as its own discipline, and why the frontier is now a crowded, open, fast-moving field rather than a two-lab race. The chapter argues that "building the model" has become a distinct engineering culture — one defined by release cadence, open-vs-closed strategy, benchmark politics, and hardware-shaped system design — and that the open-model ecosystem has closed most of the gap the industry assumed was permanent. It gives Part I its strategic frame and hands Ch 4 the question of *which* modality the frontier moves into next.

## Supporting source cluster

- [[476-gFyBdBm0AGo-system-design-for-next-gen-frontier-models-dylan-patel-semianalysis|#476 — System Design for Next-Gen Frontier Models — Dylan Patel, SemiAnalysis]]
- [[013-zZsTVBXcbow-how-google-deepmind-is-researching-the-next-frontier-of-ai-for-gemini-raia-hadsell-vp-of-r|#13 — How Google DeepMind Is Researching the Next Frontier of AI — Raia Hadsell, DeepMind]]
- [[267-8EQo4J2BWKw-thinking-deeper-in-gemini-jack-rae-google-deepmind|#267 — Thinking Deeper in Gemini — Jack Rae, DeepMind]] *(shared with Ch 1; frontier-strategy angle here)*
- [[268-wE1ZCmCLP5g-a-year-of-gemini-progress-what-comes-next-logan-kilpatrick-google-deepmind|#268 — A Year of Gemini Progress + What Comes Next — Logan Kilpatrick, DeepMind]]
- [[071-fgkXEIbZpGc-building-in-the-gemini-era-kat-kampf-ammaar-reshi-google-deepmind|#71 — Building in the Gemini Era — Kat Kampf & Ammaar Reshi, DeepMind]]
- [[049-OGCG_QkCcZo-agi-the-path-forward-jason-warner-eiso-kant-poolside|#49 — AGI: The Path Forward — Jason Warner & Eiso Kant, Poolside]]
- [[067-sYgE4ppDFOQ-code-world-model-building-world-models-for-computation-jacob-kahn-fair-meta|#67 — Code World Model: Building World Models for Computation — Jacob Kahn, FAIR Meta]]
- [[074-lY1iFbDPRlw-minimax-m2-building-the-1-open-model-olive-song-minimax|#74 — Minimax M2: Building the #1 Open Model — Olive Song, MiniMax]]
- [[400-b0xlsQ_6wUQ-the-future-of-qwen-a-generalist-agent-model-junyang-lin-alibaba-qwen|#400 — The Future of Qwen: A Generalist Agent Model — Junyang Lin, Alibaba Qwen]]
- [[528-AUuktOQPWYg-decoding-mistral-ai-s-large-language-models-devendra-chaplot|#528 — Decoding Mistral AI's Large Language Models — Devendra Chaplot]]
- [[009-_gVFUEdhCyI-gemma-deepmind-s-family-of-open-models-omar-sanseviero-google-deepmind|#9 — Gemma, DeepMind's Family of Open Models — Omar Sanseviero, DeepMind]]
- [[480-Xmkl27AM2VQ-unveiling-the-latest-gemma-model-advancements-kathleen-kenealy|#480 — Unveiling the Latest Gemma Model Advancements — Kathleen Kenealy, DeepMind]]
- [[189-3WV1vT0B0cg-the-rise-of-open-models-in-the-enterprise-amir-haghighat-baseten|#189 — The Rise of Open Models in the Enterprise — Amir Haghighat, Baseten]]
- [[439-wJwTlvb_TSo-wtf-do-people-use-open-models-for|#439 — WTF Do People Use Open Models For?? — Eugene Cheah, Featherless.ai]]
- [[269-YpY83-kA7Bo-2025-in-llms-so-far-illustrated-by-pelicans-on-bicycles-simon-willison|#269 — 2025 in LLMs So Far, Illustrated by Pelicans on Bicycles — Simon Willison]]
- [[581-eTTMUWP5B0s-open-challenges-for-ai-engineering-simon-willison|#581 — Open Challenges for AI Engineering — Simon Willison]]
- [[433-HS5a8VIKsvA-navigating-ai-s-frontier-in-2025-grace-isford-lux-capital|#433 — Navigating AI's Frontier in 2025 — Grace Isford, Lux Capital]]
- [[137-mQ7_Zje7WKE-the-2025-ai-engineering-report-barr-yaron-amplify|#137 — The 2025 AI Engineering Report — Barr Yaron, Amplify]]
- [[253-W3khHzajE04-benchmarks-are-memes-how-what-we-measure-shapes-ai-and-us-alex-duffy-every-to|#253 — Benchmarks Are Memes — Alex Duffy, Every.to]]
- [[560--zzP0EUsZz4-hyperspace-more-nodes-is-all-you-need-nicolas-schlaepfer|#560 — Hyperspace: More Nodes Is All You Need — Nicolas Schlaepfer]]

## Strongest source-backed observations

1. **The open-model gap has largely closed.** Open-weight models now trade blows with the best closed models, and the release cadence is measured in models-per-minute uploaded, not launches-per-quarter — permanently changing who can build on the frontier (#439, #074, #400, #189).
2. **Perceived "stagnation" is a training-budget story, not a ceiling.** Much of today's flagship weakness traces to models still close to 2022-era training runs; the leap comes from post-training and longer runs, not new architecture (#476).
3. **Frontier progress is bottleneck-hunting.** Labs advance by identifying and unblocking the single most limiting weakness in the current best system, not by broad simultaneous improvement (#267, #013).
4. **Code is a deliberate proving ground for reasoning.** Frontier labs pick code first because it is a constrained, rule-bound sandbox where reasoning and world-modeling can be trained and checked (#067, #049).
5. **Benchmarks are cultural artifacts that steer the whole field.** What the community chooses to measure shapes what gets built; benchmarks are not neutral scoreboards but incentives (#253, #137).
6. **Open source is a strategy, not charity.** Labs releasing open models (Gemma, Mistral, Qwen, MiniMax) do so to build ecosystems and set standards, and are explicit that this is the point (#009, #528, #480).

## Useful quotes / excerpts

> "The models that we're using today are largely the same as the models that were trained in 2022." — [[476-gFyBdBm0AGo-system-design-for-next-gen-frontier-models-dylan-patel-semianalysis|Dylan Patel, SemiAnalysis]] (#476)

> "I counted 30 significant model releases in the past six months." — [[269-YpY83-kA7Bo-2025-in-llms-so-far-illustrated-by-pelicans-on-bicycles-simon-willison|Simon Willison]] (#269)

> "Poolside exists to close the gap between models and human intelligence… We're building our own models from scratch to do this." — [[049-OGCG_QkCcZo-agi-the-path-forward-jason-warner-eiso-kant-poolside|Jason Warner / Eiso Kant, Poolside]] (#49)

> "Our primary goal is to build models that reason, plan and make decisions. And we start with code because it's an interesting sandbox in which to think about reasoning." — [[067-sYgE4ppDFOQ-code-world-model-building-world-models-for-computation-jacob-kahn-fair-meta|Jacob Kahn, FAIR Meta]] (#67)

> "Open models means that these are models that you can take, you can download, you can run in your own infrastructure, your own devices. You can fine-tune for your own use cases." — [[009-_gVFUEdhCyI-gemma-deepmind-s-family-of-open-models-omar-sanseviero-google-deepmind|Omar Sanseviero, DeepMind]] (#9)

> "More than 50,000 AI models have been uploaded to Hugging Face per month… that is more than one AI model a minute." — [[439-wJwTlvb_TSo-wtf-do-people-use-open-models-for|Eugene Cheah, Featherless.ai]] (#439)

## Open questions

- The Gemini talks (#013, #071, #267, #268) risk reading as a Google promo. Use them for the research-culture argument (bottleneck-hunting, thinking) and balance with Mistral/Qwen/MiniMax so the chapter is about the frontier, not one lab.
- #253 (Benchmarks Are Memes) and #137 (AI Engineering Report) could anchor a short "how the field measures itself" section here, or seed the dropped evals thread from Ch 1. Pick one home during drafting.
- Field-state commentary (#269, #581, #433) may serve the book's *intro* framing better than this chapter. If the intro absorbs them, this chapter tightens to lab strategy + open-model economics.
- #560 (Hyperspace) is a thin product launch; keep only if the decentralized-compute angle earns a sentence, otherwise drop to "considered, not routed."
