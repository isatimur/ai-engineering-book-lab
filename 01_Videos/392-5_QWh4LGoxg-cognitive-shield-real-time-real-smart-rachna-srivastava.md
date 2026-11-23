---
video_id: "5_QWh4LGoxg"
playlist_index: 392
title: "Cognitive Shield Real Time Real Smart - Rachna Srivastava"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=5_QWh4LGoxg"
duration: "44:58"
duration_seconds: 2698
view_count: 303
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/5_QWh4LGoxg.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:16:27+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rachna Srivastava argues that the same AI that powers deepfake, voice-clone and synthetic-identity fraud can be trained to stop it. She presents Cognitive Shield, a three-layer platform: an AI-guided data and licensing layer, a real-time detection layer with eight specialised modules, and an investigation layer with natural-language search, escalation and audit trails. Its graph pipeline uses Crew AI agents and an LLM to turn documents into a Neo4j knowledge graph, then answers questions through graph RAG that writes Cypher. Her lessons: many specialised agents, not one model; think in graphs, not rows; build security, privacy and observability in from day one."
---
# Cognitive Shield Real Time Real Smart - Rachna Srivastava

## Summary
Rachna Srivastava presents Cognitive Shield, a fraud-defence platform for financial systems. Her thesis: we are no longer detecting fraud, we are "trying to detect intelligence". The same AI that commits fraud can be retrained to recognise and stop it.

**The threat, in three stories**
She opens with three cases. A retired father in California wires $50,000 after a voice clone of his son, built from public TikTok video, asks for bail money. A woman in Ohio sends nearly $40,000 over 18 months to an AI-generated online suitor (a "pig butchering" scam). A 29-year-old accountant loses $60,000 and his 401k in a crypto rug pull that used deepfake celebrity endorsements, synthetic influencer avatars and fake ID checks. She cites a 375% rise in AI-powered scams since 2023 and says 76% of synthetic identities now bypass traditional fraud detection.

**Three layers**
- Layer one manages user, licensing, examination, case and payment data. AI checks applications for missing fields and inconsistencies, explains fines and deadlines in plain language, and serves role-specific dashboards.
- Layer two is the real-time detection engine with eight specialised modules: GAN-based deepfake detection, gradient-boosting bot detection, NLP phishing detection, graph neural networks for crypto scams, plus multimodal signal processing across text, voice and metadata.
- Layer three is the investigator console: natural-language search over Postgres and Neo4j, live dashboards, alert escalation that mixes rule-based and LLM-based logic, role-based access, full audit trails and PDF/CSV compliance reports.

**Graph-powered fraud detection**
Fraud is often a network of people, accounts and devices, so she focuses on connections. The hardest part is building the graph. Her team uses an agentic workflow on Crew AI with an LLM to extract entities and relationships from text, PDFs, forms, emails and logs, then enriches the graph from Postgres. GNNs find accounts acting in sync and devices reused across fake identities. Neo4j stores the graph, and a graph RAG layer translates natural-language questions into Cypher queries.

**Stack and demo**
A long walkthrough shows dashboards for cases, exams, invoices, payments, a multimodal voice chat assistant, and separate deepfake, payment, social media, crypto, phishing and bot fraud views. The stack is Streamlit, FastAPI, Crew AI agents, Postgres, Neo4j, graph RAG and LangChain.

**Lessons**
Start with security from day one. Do not rely on one model; use multiple specialised agents that collaborate. Think in graphs, not rows and columns. Prefer microservices over a monolith. Monitor uptime, false positives and false negatives, and make every decision explainable. She closes with a forecast that 90% of cyber attacks will be AI-driven by 2027, and a dedication to Jeremy Howard of Fast.AI.

## Why it matters
- A concrete pattern for LLM-built knowledge graphs: agents extract entities from unstructured documents, a GNN finds fraud rings, and graph RAG turns questions into Cypher.
- The architecture splits fraud detection into eight narrow detectors instead of one general model, a clear case for specialised agents over a single LLM.
- Escalation that mixes rule-based and LLM-based severity logic, with audit trails, shows how to keep LLM decisions traceable in a regulated domain.
- The opening stories give vivid examples of voice cloning and deepfake fraud for a chapter on AI safety and trust.
- Note the limits: the talk is a product walkthrough with no detection accuracy or latency numbers, so it supports architecture points, not performance claims.

## Metadata
- Video: https://www.youtube.com/watch?v=5_QWh4LGoxg
- Duration: 44:58
- Playlist index: 392
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> Hello everyone. Thanks so much for joining me today. Let me start by asking you a very simple but profound question. What happened when the smartest tool we have ever built stop working for us and start working against us? Let's just stop for a moment and think about it. Imagine getting a phone call. A voice sounds exactly like your manager. The same tone, the urgency, the choice of word, everything on the spot. He says his intranet is down and asks you to urgently send all the confidential information to his personal email so that he can brief a client. It all seems legitimate until you later discover it was a deep fake scam. You unknowingly sent company sensitive information to a...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/5_QWh4LGoxg.txt]]
- Description cue: This high-energy demonstration unveils Cognitive Shield, a revolutionary three-level defense system that harnesses AI to combat sophisticated financial fraud. Watch as we showcase real-time...

## Book angles
- Could support a chapter/section on **Models & Inference**.

