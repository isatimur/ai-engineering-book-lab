---
video_id: Iwe_RY-fYgI
playlist_index: 793
title: "AI-Driven Multi-Document Correlation for Financial Compliance - Varsha Shah, Independent"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Iwe_RY-fYgI"
duration: "19:00"
duration_seconds: 1140
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/Iwe_RY-fYgI.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
  - "Voice & Realtime"
ingested_at: 2026-06-28T23:47:38+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A financial-compliance framework adds a cross-jurisdictional normalization layer and an audit-feedback loop, since fraud spans documents and rules differ by country."
---

# AI-Driven Multi-Document Correlation for Financial Compliance - Varsha Shah, Independent

## Summary
Varsha Shah (TCS, working for Microsoft) presents a research framework for financial compliance and fraud detection built on the premise that the compliance gap is cross-document, not within-document: a payroll register, a vendor invoice, and a tax filing can each pass their own individual validation while still being inconsistent once connected, and traditional rule-based or document-level NLP systems aren't built to see that. The architecture has three parts: a graph-based entity-correlation engine that links employees, vendors, accounts, and transactions across payroll, tax, procurement, and financial systems; an adaptive probabilistic risk model that scores and prioritizes cases for investigator attention instead of firing static rule-based alerts; and a cross-jurisdictional normalization layer that standardizes currency, tax structure, and reporting rules so the same transaction is scored consistently regardless of which country's regulatory framework it originated under. The system is designed to sit upstream of human audit rather than replace it — its risk scoring improves by learning from "completed audit outcomes and investigator feedback," and its stated purpose is to let compliance teams focus on prioritized high-risk cases instead of routine document review. Reported evaluation figures — 91% precision, 87% recall, F1 0.89, a 76% reduction in false positives, and a 40% reduction in manual audit effort, across roughly 3 million records spanning four jurisdictions — are transcript-grounded numbers from the speaker's own research presentation, not independently verified.

## Why it matters
- The regulatory constraint (different countries' currencies, tax structures, and reporting standards) produced a dedicated architectural component — the cross-jurisdictional normalization layer — rather than being handled as an afterthought.
- Verification loop: risk scoring improves by learning from completed audit outcomes and investigator feedback, and the system's explicit purpose is to prioritize cases for human investigators, not to make autonomous compliance determinations.
- All performance figures (91% precision, 87% recall, F1 0.89, 76%/40% reductions) are transcript-grounded but self-reported by the speaker in a research presentation; no independent or third-party validation is mentioned.

## Metadata
- Video: https://www.youtube.com/watch?v=Iwe_RY-fYgI
- Duration: 19:00
- Playlist index: 793
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]
- [[Voice & Realtime]]


## Transcript excerpt
> Hello everyone. Thank you to the AI engineering world fair team for providing this wonderful opportunity to share my research. It is truly an honor to be speaking alongside so many talented researchers and practitioners. My name is Varsha Shah. I am an enterprise technical architect working at Tata Consultancy Services working for Microsoft. I'm focused on artificial intelligence enterprise compliance, finance governance, and intelligent automation. Today, I would like to share my research on AI-driven multi-document correlation for enterprise financial compliance and fraud detection. As organizations continue to digitalize their operations today, they generate a numerous amount of data for...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/Iwe_RY-fYgI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Voice & Realtime**.
