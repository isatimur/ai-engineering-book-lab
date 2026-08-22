# Chapter 4 — Beyond Text: Models for Speech, Media, Perception, and Action

## Role in the book

Close Part I by breaking the last hidden assumption: that "the model" means a text chatbot. This chapter argues that the model-building discipline of the first three chapters — training, serving, frontier strategy — now applies, with the same shape, to foundation models for speech, generative media, recommendation, driving, and embodiment. The striking finding across the cluster is *convergence*: text-to-speech, ranking systems, and driving stacks are all becoming LLM-shaped — tokenized, autoregressive or diffusion-based, latency-budgeted. This chapter is the deviation from the design spec's tentative "model-level evals" fourth chapter; the corpus supported a modality chapter far more strongly (see `00_README.md`). It also bridges directly into Part II: the humanoid and driving *models* here become the robotics *domain* of Ch 5.

## Supporting source cluster

- [[663-3jGAU2sbAyY-why-tts-models-now-look-like-llms-samuel-humeau-mistral|#663 — Why TTS Models Now Look Like LLMs — Samuel Humeau, Mistral]]
- [[662-P_RI1kCkRbo-voice-ai-when-is-the-her-moment-neil-zeghidour-gradium-ai|#662 — Voice AI: When Is the "Her" Moment? — Neil Zeghidour, Gradium AI]]
- [[385-CXsbjcrf_5g-text-to-speech-data-preparation-and-fine-tuning-workshop-ronan-mcgovern|#385 — Text-to-Speech Data Preparation and Fine-tuning Workshop — Ronan McGovern]]
- [[247-AbZ4IYGbfpQ-netflix-s-big-bet-one-model-to-rule-recommendations-yesu-feng-netflix|#247 — Netflix's Big Bet: One Model to Rule Recommendations — Yesu Feng, Netflix]]
- [[245-LxQsQ3vZDqo-teaching-gemini-to-speak-youtube-adapting-llms-for-video-recommendations-to-2b-dau-devansh|#245 — Teaching Gemini to Speak YouTube: Adapting LLMs for Video Recommendations — Devansh Tandon]]
- [[248-U0S6CfzAY5c-360brew-llm-based-personalized-ranking-and-recommendation-hamed-and-maziar-linkedin-ai|#248 — 360Brew: LLM-based Personalized Ranking and Recommendation — Hamed & Maziar, LinkedIn AI]]
- [[244-P370D8Kmlkw-the-state-of-generative-media-gorkem-yurtseven-fal|#244 — The State of Generative Media — Gorkem Yurtseven, fal]]
- [[692-BcWFc3H7Khg-let-s-go-bananas-with-genmedia-guillaume-vernade-google-deepmind|#692 — Let's Go Bananas with GenMedia (Imagen/Veo/Lyria) — Guillaume Vernade, DeepMind]]
- [[235-EY4O9M6AsWI-dream-machine-scaling-to-1m-users-in-4-days-keegan-mccallum-luma-ai|#235 — Dream Machine: Scaling to 1M Users in 4 Days — Keegan McCallum, Luma AI]]
- [[174-iS9YFW28XyM-waymo-s-emma-teaching-cars-to-think-jyh-jing-hwang-waymo|#174 — Waymo's EMMA: Teaching Cars to Think — Jyh-Jing Hwang, Waymo]]
- [[165-mWKYvT9Lc50-what-is-a-humanoid-foundation-model-an-introduction-to-gr00t-n1-annika-aastha|#165 — What Is a Humanoid Foundation Model? An Introduction to GR00T N1 — Annika & Aastha, NVIDIA]]

## Strongest source-backed observations

1. **Non-text model architectures are converging on the LLM template.** Speech, media, ranking, and driving systems are increasingly tokenized, streamed, and generated autoregressively — the same scaffolding ideas transfer across modality (#663, #174).
2. **Recommendation is quietly the biggest LLM application, bigger than search.** The largest consumer surfaces are rebuilding ranking on foundation models, replacing many bespoke models with one (#245, #247, #248).
3. **The consolidation move is "one foundation model for all of it."** Netflix, YouTube, and LinkedIn each describe collapsing a zoo of task-specific models into a single foundation model covering every recommendation surface (#247, #245, #248).
4. **For these modalities, latency is the product.** Speech and live media models live or die on time-to-first-token/byte; the model and the serving budget are designed together (#662, #235).
5. **Generative media is being productized as an orchestration stack, not a single model.** Image, video, and music models are chained under structured control, moving the craft from "one great model" to "compose several" (#244, #692).
6. **Embodiment is the frontier's next modality, expressed as a foundation model.** Humanoid and driving stacks are now framed as foundation-model problems — the same build-the-model discipline pointed at the physical world (#165, #174).

## Useful quotes / excerpts

> "The application of LLMs to recommendations is going to be a bigger consumer application than search." — [[245-LxQsQ3vZDqo-teaching-gemini-to-speak-youtube-adapting-llms-for-video-recommendations-to-2b-dau-devansh|Devansh Tandon, YouTube]] (#245)

> "To use one foundation model to cover all the recommendation use cases." — [[247-AbZ4IYGbfpQ-netflix-s-big-bet-one-model-to-rule-recommendations-yesu-feng-netflix|Yesu Feng, Netflix]] (#247)

> "We'd allocated about 500 H100 GPUs. We thought that was a lot at the time. It wasn't." — [[235-EY4O9M6AsWI-dream-machine-scaling-to-1m-users-in-4-days-keegan-mccallum-luma-ai|Keegan McCallum, Luma AI]] (#235)

> "Today we're going to give you a sense of… how you go about building a robotics foundation model." — [[165-mWKYvT9Lc50-what-is-a-humanoid-foundation-model-an-introduction-to-gr00t-n1-annika-aastha|Annika & Aastha, NVIDIA]] (#165)

> "It's so nice to see a generative media track in the AI engineer conference this year… the way we define it is a generative video, audio, or image." — [[244-P370D8Kmlkw-the-state-of-generative-media-gorkem-yurtseven-fal|Gorkem Yurtseven, fal]] (#244)

## Open questions

- **Book-1 overlap:** #662 and #663 also appear in book 1's `Chapter Packets v1/08_Realtime_and_Embodied_Edges.md`. Citing a shared corpus note is fine — the two books draw different arguments from it (book 1: realtime conversation as a control problem; book 2: TTS *architecture* converging on LLMs). Not an error; flagged so a future editor does not "deduplicate" it away.
- The driving/embodiment talks (#174, #165) point straight into Ch 5 (Robotics). Decide whether they are the *closer* of Part I (models for the physical world) or the *opener* of Part II (the physical world as a domain). Leaning: close Part I here, reprise in Ch 5.
- Is this one chapter or two? Speech + media is a "generative modalities" thread; recommendation is an "LLMs eat classical ML" thread. They share the convergence thesis but could split if the cluster deepens.
- The recommendation talks are enterprise-scale and technical; keep the audience in mind so the chapter argues convergence rather than surveying three ranking systems.
