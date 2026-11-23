---
video_id: Tt2kX2sgQio
playlist_index: 958
title: "How Kepler Built Verifiable AI for Financial Services — Vinoo Ganesh"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Tt2kX2sgQio"
duration: "22:30"
duration_seconds: 1350
view_count: 1000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Tt2kX2sgQio.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-31T20:57:37+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Vinoo Ganesh, CEO and co-founder of Kepler, argues that AI turned a writing problem into a reading problem: output is cheap, trust is not. Evals cannot make a probability machine deterministic, and citations are only an after-the-fact audit. In finance, verifiable work product needs a deterministic substrate. Kepler uses three rules: atomic provenance (the model writes a reference to a number, never the number), scope determinism (the model decides what to compute, code computes it) and replayable derivation chains. A 94%-accurate fine-tuned extractor is not good enough to trade on."
---

# How Kepler Built Verifiable AI for Financial Services — Vinoo Ganesh

## Summary
Vinoo Ganesh is CEO and co-founder of Kepler. He led the compute platform at Palantir, built and sold an alt-data startup, and was head of business engineering at Citadel. The talk condenses a case study Anthropic wrote on Kepler. His thesis: most finance AI talks are about producing more, but "AI has made a writing problem a reading problem". The hard part is trusting what the model produced.

**Why evals and citations fall short**
"Evals are not verifiable": you cannot eval a probability machine into something deterministic. Other fields have a second checker (CI and code review, a pharmacist after a doctor, a co-pilot). Finance has an overworked VP. He claims firms buy Bloomberg and FactSet to displace culpability: if the data is wrong, everyone is wrong together. But those tools are read-only, and analysts still build the work product by hand. Regulators such as the SEC and OCC need decisions traced to sources. Search tools cite sources, but you cannot curate them, so a random Substack counts the same as a filing. A citation is "an after-the-fact audit". A verification is deterministic and repeatable: proof that a revenue number is the one in the 10-K.

**Verification is a path, not ground truth**
Two desks can hold the same data and take opposite positions. So verification means the output respects the firm's trusted sources, its transformations, and its rules: its "nouns and verbs". You cannot use AI to produce verifiable finance work "without augmenting it with a deterministic substrate".

**Kepler's three rules**
- Atomic provenance. Kepler trained an extraction model that beat foundation models at 94%, but nobody trades on a number that might sit in the other 6%. So the model writes only a reference to a number; databases write and read the number. A deterministic check strips any number it cannot verify independently. This is not models checking each other's work.
- Scope determinism. Planning is commoditized; maths is not the model's job. "Why would I run 1 + 1 through a multi-billion parameter model instead of one CPU cycle?" The model decides what to compute, for example net margin, and code parses the PDF or XBRL. This is also cheaper.
- Derivation chains. Ratios such as gross margin or EBITDA adjustments are not in filings, and each firm computes them differently. Kepler records the chain of steps so it can be replayed and rewound, like an analyst's work on a desk. The system knows what it may produce (structured filings, numerical data) and never extracts from prose or raw tables.

**What it enables and where it goes**
Financial statements consolidate in seconds with every number tied to its source, and a DCF never gets a hallucinated row. He argues the same pattern fits legal citations and drug discovery, and compares today to e-commerce before SSL. He expects token maxing to give way to cost optimization, as Snowflake and Databricks spend did. The next step is verifiable ontologies of each firm's investment process.

**Q&A**
Every number comes from a filing extraction, a deterministic calculation, or internal documents; any IO the model requests joins the provenance chain. Customers want the AI analyst, not the AI portfolio manager: no more listening to earnings calls or opening every 8-K and 10-K to build the first model.

## Why it matters
- It draws a sharp line between evals (probabilistic) and verification (deterministic proof), which the reliability chapter can use to scope what evals can promise.
- The model-writes-references-not-numbers rule is a concrete architecture for any agent whose numeric output must be exact.
- The 94% extraction example shows why better fine-tuning cannot close the gap in domains where one wrong number is unacceptable.
- Splitting what to compute (model) from the computation (code) also cuts cost, which links reliability to the coming end of token maxing.

## Metadata
- Video: https://www.youtube.com/watch?v=Tt2kX2sgQio
- Duration: 22:30
- Playlist index: 958
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hey everyone, thank you for being here. My name is Venu Ganesh and I'm the CEO and co-founder of Kepler. Today, I'm going to talk to you about how we built verifiable AI for financial services. First, a little about me. My career has been working in fairly difficult places to work in terms of numerical accuracy and verifiability. Began my career at Palantir where I led the compute platform as well as a lot of our USG engagements. Built and sold a alt data startup. Then was head of business engineering at Citadel. I have some Citadel colleagues here in the audience as well. I've advised a bunch of startups and been lucky that all of them have reached pretty positive outcomes. So...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Tt2kX2sgQio.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

