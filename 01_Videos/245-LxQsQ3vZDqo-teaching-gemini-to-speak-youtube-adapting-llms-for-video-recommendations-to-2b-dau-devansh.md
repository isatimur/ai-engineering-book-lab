---
video_id: "LxQsQ3vZDqo"
playlist_index: 245
title: "Teaching Gemini to Speak YouTube: Adapting LLMs for Video Recommendations to 2B+DAU - Devansh Tandon"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LxQsQ3vZDqo"
duration: "22:51"
duration_seconds: 1371
view_count: 16188
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/LxQsQ3vZDqo.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:09:50+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Devansh Tandon (YouTube) argues that LLM-based recommendations will be a bigger, if underhyped, consumer application than search. YouTube built LRM, a large recommender model: a Gemini checkpoint taught a new language of videos through semantic IDs, made by embedding each video's features and quantizing them into tokens. Continued pre-training links these tokens to text and to watch sequences, and the model is in production for retrieval. He covers 95%+ serving cost cuts, offline rec tables, continuous retraining for freshness across 20 billion videos, and a three-step recipe: tokenize content, make the LLM bilingual, prompt with user context."
---
# Teaching Gemini to Speak YouTube: Adapting LLMs for Video Recommendations to 2B+DAU - Devansh Tandon

## Summary
Devansh Tandon works on YouTube recommendations, which drive a large majority of YouTube watch time across home, watch next, Shorts and even personalized search. His claim: search gets the LLM attention, but recommendations are a bigger consumer application that is underhyped because users cannot see it. YouTube had tried multi-headed rankers, embedding models and sequence-to-sequence transformers. About two years ago it began rebuilding on Gemini, producing LRM, a "large recommender model": a base Gemini checkpoint adapted with YouTube knowledge, then aligned into small custom versions for retrieval and ranking on each major surface. LRM runs in production for retrieval; ranking is still in experiments.

**Semantic ID: a language of videos**
Even a million-token context cannot hold rich representations of many videos, and earlier attempts (predicting search queries, recommending videos directly) were not good enough. Semantic ID, described in a paper the year before, extracts title, description, transcript, audio and frame-level data, builds a multi-dimensional embedding, and quantizes it (captioned "RQVE") into tokens. The tokens are hierarchical: a first token for music, gaming or sports, deeper ones for a sport such as volleyball, then a unique suffix. Tandon calls this the move from hash-based IDs to semantically meaningful ones. Each video compresses to eight tokens.

**Continued pre-training**
Two steps make the model bilingual in English and YouTube. First, link text and semantic IDs with tasks such as prompting with a video's ID and learning to output its title, creator or topics. Second, train on watch sequences by masking videos in a user's history so the model learns which videos go together. The result can reason across both: from IDs alone it can say a video is interesting to technology fans because it is about AI.

**Generative retrieval**
A prompt holds demographics, the current video and about 50 past watches, and the model decodes recommendations as semantic IDs. Watching an Olympics highlight, the old system offered more men's races; LRM found related women's races. Gains are largest for users YouTube knows little about. LRM learns fast and is data-efficient, but serving was too costly, so the team cut TPU serving cost by over 95% before launch. Another workaround: remove the personal parts of the prompt, run offline inference on the head of the corpus, and serve a lookup table of what to watch after video A.

**Why it is harder than training an LLM**
English has about 100,000 words and gains about a thousand a year. YouTube has 20 billion videos with millions added daily, and a new Taylor Swift video must be recommended within minutes or hours. So LRM is continuously pre-trained on the order of days and hours, against every 3 to 6 months for Gemini. Scale rules out Gemini Pro; YouTube uses Flash and smaller checkpoints.

**Recipe and future**
Tokenize your content, adapt the LLM to be bilingual, then prompt with user context and train surface-specific models. Next he sees users steering recommendations in natural language, explanations of why a video was picked, search and recommendation blurring, and eventually generated content for an audience of one. In Q&A he admits overtraining on semantic IDs made the model forget English, says semantic IDs improve fresh and tail videos, and calls LRM the biggest recommendation-quality gain in years without sharing metrics.

## Why it matters
- The three-step recipe (tokenize content, make the LLM bilingual, prompt with user context) generalizes to any large-catalog recommender, not only YouTube.
- Semantic IDs show a concrete alternative to hash-based item IDs: fresh and tail items start in a meaningful space, which eases cold start.
- The serving story (95%+ cost cut, small Flash-class models, an offline lookup table for head videos) is a practical lesson in making LLM-scale models affordable at billions of users.
- Freshness forces continuous pre-training every few days or hours, a sharp contrast with LLM release cycles that chapters on domain adaptation can use.
- The Q&A on the model forgetting English names a real trade-off between domain-token skill and natural-language ability.

## Metadata
- Video: https://www.youtube.com/watch?v=LxQsQ3vZDqo
- Duration: 22:51
- Playlist index: 245
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] There's a lot of attention in terms of how LLMs are going to transform search. Uh Google search is having a revolution. Chat GPT has a big chat interface. Perplexity is a product that a lot of people use. Um, but I think recommendations is uh probably a bigger problem that is underhyped because it's kind of transparent to the user. Um, and I think the application of LLMs to recommendations is going to be a bigger consumer application than search. Um, so in terms of my talk, I just want to introduce the problem of YouTube recommendations and then talk about how we've built large recommener models. We're adapting Gemini for YouTube. how we build semantic ID and how we're using that...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LxQsQ3vZDqo.txt]]
- Description cue: YouTube recommendations drive the majority of video watch time for billions of daily users. Traditionally powered by large embedding models (LEMs), we're undertaking a fundamental shift: rebuilding...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.
