---
video_id: "84Vtz2IL1Ug"
playlist_index: 335
title: "Fun stories from building OpenRouter and where all this is going - Alex Atallah, OpenRouter"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=84Vtz2IL1Ug"
duration: "18:47"
duration_seconds: 1127
view_count: 8979
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/84Vtz2IL1Ug.txt"
themes:
  - "Models & Inference"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:14:10+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Alex Atallah tells how OpenRouter grew from a 2023 experiment on one question: will inference be a winner-take-all market? His answer, backed by token share data, is no. Moderation limits, Llama 1, and the under-$600 Alpaca distillation pointed to a long tail of models. A primary-plus-fallback setup grew into a marketplace of 400+ models across 60+ providers, with uptime boosting, normalized tool calls and caching, and about 30 ms of added latency. He argues the future is multi-model, inference is a commodity, and routing will be crucial. He also shows an AI-native middleware plugin system that edits streamed outputs, for example web search for every model."
---
# Fun stories from building OpenRouter and where all this is going - Alex Atallah, OpenRouter

## Summary
Alex Atallah, co-founder of OpenRouter, tells the founding story of the company in a short keynote. He started at the beginning of 2023 with one question: will the inference market be winner-take-all? Everyone assumed yes, because OpenAI led by far. His talk is the evidence trail that led him to answer no.

**Early signals of a long tail**
- Moderation came first. Users wanted models whose content policy they could predict, for example novelists writing a murder scene that OpenAI sometimes refused.
- Early open-weights models were barely usable. Llama 1 then claimed to beat GPT-3 on most benchmarks with a 13B model you could run on a laptop.
- The key moment was Alpaca in March 2023. A Stanford group fine-tuned Llama 1 on GPT-3 outputs for less than $600. Atallah saw style and knowledge move from a large model to a small one, and expected tens of thousands of such models that would need a place to be discovered.

**From Window AI to a marketplace**
In April he shipped Window AI, an open-source Chrome extension that let a user bring their own model into any web app. OpenRouter launched the next month as a place to collect models. At first each open model had only a primary and a fallback provider. Then providers multiplied at different prices, and features diverged (min-p sampling, caching, tool calls, structured outputs). OpenRouter aggregated them, and it became a marketplace. One Llama 3.3 70B Instruct model has 23 providers. Closed models could not keep up with demand, so aggregation also boosted uptime.

**Current numbers**
- Growth of 10 to 100% month over month for two years.
- Over 400 models from over 60 active providers, one API, near-zero switching costs.
- Google Gemini's token share grew from roughly 2-3% to about 34-35% in 12 months. Anthropic is among the most popular authors.

**What he believes about the market**
The future is multi-model. Inference is a commodity: Claude from Bedrock should look the same as Claude from Vertex. Inference will be a dominant operating expense, so selection and routing are crucial. Model usage is sticky; people do not just hop.

**Technical stories**
- Instead of an MCP marketplace, OpenRouter built AI-native middleware. Plugins can call MCPs before inference and also transform outputs on the way back, inside the stream. The web search plugin adds web annotations to every model.
- Added latency is about 30 ms, through custom cache work.
- Stream cancellation differs by provider. Some bill the whole response when you drop a stream, some do not, some bill the next 20 tokens.

**Roadmap**
More modalities, including image generation by LLMs, which some call transfusion models. Stronger routing, including geographic routing to the right GPU. Better prompt observability, finer model categorization, and lower prices.

## Why it matters
- Gives a data-backed answer to the winner-take-all question: token share shifted a lot in one year, which supports a multi-model design.
- Names the hidden cost of provider heterogeneity: features, tool-call formats, caching and stream-cancellation billing all differ, and someone must normalize them.
- The middleware idea, a plugin that can also rewrite streamed output, is a useful contrast to MCP's pre-flight tool model.
- The Alpaca story frames distillation as the start of cheap, specialized models and the discovery problem that follows.

## Metadata
- Video: https://www.youtube.com/watch?v=84Vtz2IL1Ug
- Duration: 18:47
- Playlist index: 335
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] [Applause] All right. When I started open router the beginning of 2023, I had one major question in mind. I was looking at this new market that was coming online and and it was incredible. Like at the very end of uh 2022, we all saw chat GPT and I got bitten by the AI bug. Um and I decided to look into answering this question. Will this market be winner take all? inference might be the largest market ever in software and this seemed like a critical thing that everybody was assuming the answer to the answer to it would be yes. Um open AI was just far and away the leading model. There were a few others that were coming up on its tail and I I built a couple prototypes to look into what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/84Vtz2IL1Ug.txt]]
- Description cue: How the first LLM aggregator got started, some of the weird moments in its early growth, architecture challenges, and where we'll be taking it down the road.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Evals & Reliability**.
