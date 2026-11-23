---
video_id: "i2vBaFzCEJw"
playlist_index: 543
title: "The Hierarchy of Needs for Training Dataset Development: Chang She and Noah Shpak"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=i2vBaFzCEJw"
duration: "16:32"
duration_seconds: 992
view_count: 2966
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/i2vBaFzCEJw.txt"
themes:
  - "Evals & Reliability"
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:23:09+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Noah Shpak, who leads the AI data platform at Character AI, and Chang She, CEO and co-founder of the company behind the Lance format and a co-author of pandas, argue that you should care about what you train on and give it a good format. Shpak lays out a hierarchy of needs for post-training data: clean data and evals first, then dataset management, analytics and reading data, then LLM-driven selection, quality scoring, synthetics and human labeling, with SQL-defined dataset materialization. Chang She presents a 'new CAP theorem' for AI data (fast scans, fast random access, large blobs) and Lance as a columnar format with versioning, zero-copy schema evolution and vector search on S3."
---
# The Hierarchy of Needs for Training Dataset Development: Chang She and Noah Shpak

## Summary
A two-part talk. Noah Shpak leads the AI data platform at Character AI, which trains its own foundation models and runs a consumer platform. Chang She is CEO and co-founder of the company built on the Lance format; he co-authored the pandas library. Their shared message: "you should really care about what you're training on", and give that data a format that does a lot of work for you.

**Pre-training versus post-training data**
Pre-training thinks wide: which domains (books, chat data) and how many tokens for the model size. Post-training is narrow and granular: you need to know how hard a math problem is or how easy a multiple-choice item is. Active research areas include data-efficient learning, sampling metrics and measuring diversity.

**The hierarchy of needs**
- **Clean data and evaluations** come first, because you cannot measure anything "without a compass".
- **Dataset management** for mixtures: know what is inside each dataset, not just its source.
- **Analytics**: token counts, lengths, and richer labels, such as code difficulty or the number of functions and classes in a problem.
- **Reading data**: Shpak calls it probably the biggest win; the higher layers automate lessons learned from it.
- **LLMs improving LLMs**: dataset selection (retrieval or clustering over embeddings to match the target behaviour), quality scoring with in-house classifiers or prompted classification, and synthetic data such as quick preference pairs to get early signal.
- **Human labeling** at the top: to improve classifiers and to rewrite flawed synthetic or source data.

**Materialization as a separate concern**
Training formats such as TF records or JSON lines are among the most error-prone parts of training. Character AI defines datasets in YAML with a SQL block and a materialization service that returns a list of files, so data logic stays out of the training job. Big data tools (Spark, Trino) sit next to GPU-backed services for prompting, embedding and classification. For data loading, Lance gives cheap shuffles: you shuffle references to rows, not the rows.

**The new CAP theorem for AI data**
Chang She breaks a distributed training job into filter, shuffle and stream. That needs fast scans, fast random access and large-blob handling at once. Existing formats deliver at most two, often one. Scale makes it worse: a tabular row is about 50 bytes; embeddings make it 20 to 25 times larger, and images add another 20 times. Teams of 10 to 20 people now manage tens of terabytes to petabytes.

**What the Lance format does**
- Columnar like Parquet, with fast scans plus fast lookups, and no row groups, so blobs can live inline.
- A light table format: automatic versioning, zero-copy schema evolution to add experimental columns, and time travel to roll back bad data at once.
- Index extensions: billion-scale vector search directly from S3, scalar indices for metadata filters, and full-text search without an Elasticsearch cluster.
- One table serves SQL (DuckDB, Trino, Spark), training, and similarity search.

The database built on it offers distributed vector search over billions of vectors at low latency and high QPS. Shpak closes by saying speed is their best strategy, because many tools slow down under new multimodal load.

## Why it matters
- Gives a ranked order of investment for training data work, with evals and reading data before synthetic data and labeling.
- Shows how a lab that trains its own models separates dataset materialization from the training job, a practical fix for the error-prone data step.
- The filter, shuffle, stream breakdown explains why classic analytics formats strain under AI training and retrieval workloads.
- The row-size numbers (50 bytes, then 20 to 25 times, then another 20 times) give a concrete sense of why multimodal data changes infrastructure needs.

## Metadata
- Video: https://www.youtube.com/watch?v=i2vBaFzCEJw
- Duration: 16:32
- Playlist index: 543
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] we're excited to be here and we're excited to be talking to you about uh training data set development for llms so my name is Chun sha I'm the CEO and co-founder of Lance TV I've been creating data tools for data science machine learning for almost two decades uh starting with being one of the co-authors of P the pandas Library a long time ago uh spent a bunch of years in Big Data Systems and recommender systems and most recently I started this company um Lance CB which is the database for multimotor AI these days I spent about roughly equal time uh tweeting and and on GitHub and yeah hi everyone I'm Noah I currently lead the AI data platform at character and character gu is one of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/i2vBaFzCEJw.txt]]
- Description cue: Training and fine-tuning models depends critically on how you construct your dataset. Part art, part science, we’ll share with you practical lessons in dataset construction at Character AI...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.

