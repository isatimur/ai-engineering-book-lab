---
video_id: "cS6M6Jec0lU"
playlist_index: 557
title: "Going beyond RAG: Extended Mind Transformers - Phoebe Klett"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=cS6M6Jec0lU"
duration: "16:04"
duration_seconds: 964
view_count: 16747
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/cS6M6Jec0lU.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:23:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Phoebe Klett, machine learning engineer at Normal Computing, presents Extended Mind Transformers: a small edit to attention that stores memory tokens as key-value pairs inside each decoder layer and lets every query token retrieve its top-k memories by cosine similarity during generation. Her thesis is that retrieval belongs inside the model, not decided once upfront by an external embedding. Thanks to relative position schemes (rotary and ALiBi), it needs no fine-tuning, stays competitive with long-context fine-tunes up to 16K tokens on a new counterfactual benchmark, gives causal token-level citations, and cuts hallucinations by retrieving more when the model is uncertain."
---
# Going beyond RAG: Extended Mind Transformers - Phoebe Klett

## Summary
Phoebe Klett is a machine learning engineer at Normal Computing. She presents the company's research on Extended Mind Transformers (EMTs). Her thesis: the transformer already has a retrieval mechanism, its keys and queries, so retrieval should happen inside the model during generation, not once and upfront outside it.

**The problem with long context and RAG**
Long context extends the window, usually through expensive fine-tuning. It also fills the prompt with irrelevant material that can confuse the model, and it is wasteful: a question about a code base rarely needs every function definition. RAG subsets the data but is limited by being external. It decides relevance once, before generation, using the least granular representation of the data, one disjoint from how the model reasons about it. Neither method separates what belongs in memory from what belongs with the query.

**How extended mind attention works**
Pass all memory tokens through the model and save the key-value pairs from each decoder layer. During generation, each query token retrieves a set number of memory tokens by cosine similarity and attends to them. The edit is simple. The hard part is position information. Earlier research needed fine-tuning because of absolute position embeddings. Relative schemes make it work without fine-tuning: rotary embeddings, used in the Llama models, and ALiBi linear biases, used in MosaicML's MPT models.

**Evaluation**
They open-sourced a counterfactual retrieval benchmark with contexts of about 2,000 to 16,000 tokens. To rule out memorised facts, they swap the true answer for a plausible wrong one: for a question about who wrote a well-known song, they replace Lee Hazelwood with Terry Allen everywhere, then ask the model to retrieve Terry Allen. A base Llama model trained to 2,048 tokens holds up to about 8K, then falls off at 16K. Fine-tuned long-context models do worse than EMTs on shorter inputs, which suggests long-context fine-tuning degrades attention on short inputs. EMTs, with no fine-tuning and only the query in context, stay competitive up to 16K. With a little RAG context added, she reports they beat a leading closed model.

**Two new features**
- **Causal citations**: you can see exactly which memory tokens the model retrieved when it generated each output token. Asked when a mathematician got his French citizenship, the model's correct answer, 1971, traces back to the retrieved 1971 and name tokens. RAG citations are closer to post-hoc rationalisation.
- **Uncertainty-driven retrieval**: use token-level entropy, or any uncertainty metric, to spot doubtful tokens and regenerate them with more memories. With the default memory budget the model said 1993; with extra retrieval on uncertain tokens it said 1971.

**Parameters to tune**
- **Stride length** when building memories: smaller strides give better representations at more compute.
- **Top-k**, the most important: memories per query token, set according to memory length.
- **Regularisation**: similarity masking drops retrieved tokens below a threshold such as 0.25. For rotary-embedding models, remove unknown tokens from memory; messy Wikipedia data has many, and they match queries often but carry little information.

Models are on Hugging Face, and the code and dataset are on GitHub. You pass memories as tokens when you set up the model.

## Why it matters
- Offers a concrete alternative to RAG's one-shot, upfront relevance decision: retrieval at every layer and every token, with no fine-tuning.
- The counterfactual benchmark design (swap the true answer for a plausible wrong one) is a reusable way to test whether a model uses the context or its memorised knowledge.
- Token-level causal citations are a stronger trust signal than RAG's post-hoc matching of output to retrieved text.
- The uncertainty-triggered extra retrieval is a practical, active-learning-style pattern for reducing hallucinations.

## Metadata
- Video: https://www.youtube.com/watch?v=cS6M6Jec0lU
- Duration: 16:04
- Playlist index: 557
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] I'm Phoebe I'm a machine learning engineer at normal Computing and I'm really excited to tell you guys about some of our recent research uh and in particular extended mind Transformers all right so just to briefly cover what we're going to go over in today's talk uh we'll introduce the problem which I think will be quite familiar given the amazing talk which came before mine uh and then dive right into the method so uh what is the retrieval mechanism that extended mind Transformers Implement uh and then we'll dive into some experiments which give us confidence that these methods are actually performant after that we'll get into two of my favorite and I think most compelling features...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/cS6M6Jec0lU.txt]]
- Description cue: Retrieval Augmented Generation is such a hack. Why would an embedding of your prompt coincide with the documents needed to answer it? Meanwhile Transformers already have a key/query mechanism...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- model: <https://huggingface.co/collections/normalcomputing/extended-mind-transformers-6655e9ba5853d86b32793aaf>
- repo: <https://github.com/normal-computing/extended-mind-transformers>
