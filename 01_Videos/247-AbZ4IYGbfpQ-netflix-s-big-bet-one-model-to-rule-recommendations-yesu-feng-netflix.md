---
video_id: "AbZ4IYGbfpQ"
playlist_index: 247
title: "Netflix's Big Bet: One model to rule recommendations: Yesu Feng, Netflix"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=AbZ4IYGbfpQ"
duration: "22:28"
duration_seconds: 1348
view_count: 7758
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/AbZ4IYGbfpQ.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:09:55+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Yesu Feng (Netflix) describes Netflix's bet on one transformer foundation model for all recommendation use cases, replacing many independently built models with duplicated features and labels. Two hypotheses held: scaling semi-supervised learning improves personalization (gains from millions to about a billion parameters), and integrating one model everywhere creates high leverage. He covers tokenizing multi-field interaction events, combining ID and semantic embeddings for cold start, multi-token prediction, three ways downstream models consume the model (subgraph, embeddings, fine-tuning), and next steps: semantic IDs, generative retrieval and prompt tuning."
---
# Netflix's Big Bet: One model to rule recommendations: Yesu Feng, Netflix

## Summary
Yesu Feng presents Netflix's "big bet" on personalization: use one foundation model to cover all recommendation use cases.

**The problem: many specialized models**
Netflix recommendations vary on three levels. Rows differ (genres, new and trending, Netflix-only titles). Entities differ (movies and shows, now games and live streaming). Pages differ (home, search, kids, a linear mobile feed). Over the years this produced many specialized models with overlapping goals and duplicated label and feature engineering. The same interaction history spawned many near-identical features, such as action counts over time windows or similarity between history titles and the target. Each new use case meant a new model from scratch, which hurt innovation velocity. About four years ago, during the pandemic, the team asked whether user representation learning could be centralized in one place.

**Two hypotheses**
First, scaling semi-supervised learning improves personalization: scaling laws apply to recommenders as they do to LLMs. Second, integrating one foundation model into all systems creates high leverage, improving every downstream model at once.

**Data and training, layer by layer**
- **Tokenization**: as with LLMs, choices here "percolate" through every layer. A token is a user interaction event with many fields, not one ID, so granularity trades off against context window. Pre-training and fine-tuning use slightly different tokenizations.
- **Event representation**: when (time encoding), where (country, device, row, page) and what (title, action type, duration).
- **Embeddings**: ID embeddings alone fail on cold start for titles not seen in training, so semantic content embeddings complement them.
- **Transformer**: the hidden state is the long-term user representation. Open questions include its stability as history changes and how to aggregate across time and layers.
- **Objectives**: richer than an LLM's. Besides next-entity prediction, targets include action type, genre, language, duration, device and time to next play. These work as multitask heads or as weights, rewards and loss masks.

**Scaling**
Over two to two and a half years, the model grew from the order of millions to about a billion parameters with matching data, with steady gains. Netflix stopped there because recommenders have strict latency and cost limits, so larger models need distillation. Ideas borrowed from LLMs: multi-token prediction, which makes the model less myopic and more robust to the train-serve time gap and gave notable metric gains; multi-layer representations through layer-wise supervision and self-distillation; and long-context techniques from sliding windows to sparse attention.

**Serving: three consumption patterns**
Application models become a thin layer on the foundation model. Teams can embed the model as a subgraph that replaces an existing sequence tower, consume content and member embeddings pushed to a central store (also used by analysts and data scientists, with care over refresh and stability), or fine-tune and distill it for strict latency. Over a year and a half, adoption across applications rose along with A/B test wins, and Feng calls both hypotheses validated.

**Next directions**
Universal representations for heterogeneous entities through semantic IDs; generative retrieval for whole collections, with business rules and diversity handled during multi-step decoding; and prompt tuning with soft tokens swapped in at inference time. In Q&A he mentions a knowledge-graph team whose embeddings help cold start, and reinforcement learning with sparse user rewards for collection generation.

## Why it matters
- It is a clear case for consolidating many independently built models, with duplicated features and labels, into one shared foundation model that every team builds on.
- The scaling result (gains from millions to about a billion parameters, bounded by latency and distillation) shows scaling laws carry over to recommenders, with a serving ceiling.
- The three consumption patterns (subgraph, pushed embeddings, fine-tune or distill) are a practical template for how a platform model reaches downstream teams.
- Tokenizing multi-field interaction events, unlike single-ID text tokens, is a key design difference from LLMs that recommender chapters should explain.
- Multi-token prediction for long-term satisfaction and robustness to train-serve time gaps is a concrete LLM technique that paid off outside language.

## Metadata
- Video: https://www.youtube.com/watch?v=AbZ4IYGbfpQ
- Duration: 22:28
- Playlist index: 247
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] Uh good afternoon. Uh thank you uh Eugene for the introduction. Uh so today uh I'm going to share our big bet and Netflix uh on personalization namely to use one foundation model to cover all the recommendation use cases. Uh at Netflix we have diverse recommendation needs. Uh this is example homepage of one of profile on Netflix. Uh it's a 2D layout rows and items. Diversity comes at uh at least three levels. Uh there is first level about row. We have diverse rows. We have genres for example rows on comedies, roles on action movies. We have rows about uh new trending uh just the release titles. We also have rows about for example titles only available on Netflix. Um so that's the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/AbZ4IYGbfpQ.txt]]
- Description cue: Discuss the foundation model strategy for personalization at Netflix based on this post  and recent...

## Book angles
- Could support a chapter/section on **Models & Inference**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://netflixtechblog.com/foundation-model-for-personalized-recommendation-1a0bd8e02d39>
