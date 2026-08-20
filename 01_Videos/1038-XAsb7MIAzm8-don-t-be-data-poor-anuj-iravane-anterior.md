---
video_id: XAsb7MIAzm8
playlist_index: 1038
title: "Don’t be data poor — Anuj Iravane, Anterior"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=XAsb7MIAzm8"
duration: "16:46"
duration_seconds: 1006
view_count: 693
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/XAsb7MIAzm8.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:43+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Anterior's Anuj Iravane generates synthetic medical records by sampling a label and reasoning trace from policy decision trees first, reaching 90% synthetic datasets clinicians rarely tell apart."
---

# Don’t be data poor — Anuj Iravane, Anterior

## Summary
Anuj Iravane (AI lead at Anterior, a clinician-led AI company building agents for health plans) describes automating high-stakes healthcare admin workflows — prior authorization, payment integrity, HEDIS measures — that require policy-guided decisions over unstructured data like scanned fax bundles (he notes roughly 70% of medical communication still happens via fax), while contracts bar Anterior from retaining, reusing, or even deriving anonymized copies of the underlying patient records. Their answer is to generate synthetic medical records by reversing the inference pipeline: instead of unstructured data plus a policy producing a reasoning trace and a label, they sample a label and a reasoning trace first — using symbolic, decision-tree representations of policies to sample diverse, deterministic traces — and generate the record backward from that, which he argues gives a more uniform conditioning distribution than asking an LLM to generate diverse data directly in one shot. The generation pipeline works coarse-to-fine (patient invariants, then a high-level patient journey, then per-encounter document plans, then fully hydrated documents), which keeps prompts token-efficient and scales to long patient histories, and it includes an LLM-based consistency check across documents plus a round-trip check against the original label to get correct labels by construction. Clinicians can steer generation at any step and own the entire pipeline logic through a skills-based workflow running on an internal agent harness, so adding a new document type requires no engineering changes. Roughly 90% of Anterior's evaluation datasets are now synthetic, production accuracy has stayed high across customer deployments, and in a blind review clinicians could distinguish synthetic from real records only about 60% of the time.

## Why it matters
- Names a concrete regulatory constraint (PHI that can't be retained, reused, or even kept as an anonymized derivative) that forces synthetic-data-by-construction rather than the usual anonymize-and-reuse approach.
- The reverse-generation technique — sampling a label and reasoning trace from a symbolic policy decision tree, then generating data backward from it — is a specific, reusable pattern for diverse synthetic data generation, distinct from naive one-shot LLM generation.
- Concrete production numbers (90% synthetic datasets, ~60% indistinguishability in blind clinician review) offer a rare data point on synthetic-data fidelity in a regulated, high-accuracy-bar domain.

## Metadata
- Video: https://www.youtube.com/watch?v=XAsb7MIAzm8
- Duration: 16:46
- Playlist index: 1038
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hello everyone. Welcome to Don't Be Data Poor. My name's Anuj. I I lead AI at Anterior. Um just a bit about Anterior, we are a clinician-led AI company um built for health plans backed by Sequoia and NEA. Um and what we do is we run AI transformations for health plans. Um as part of which we build agents for several high-stakes healthcare administrative workflows in production. Um things like prior authorization, payment integrity, HEDIS measures, etc. Um it's it's okay if you're not familiar with any of these workflows um because a lot of the work that we do can actually be summarized in in the same way. It's uh policy-guided decision-making over highly unstructured data. And...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/XAsb7MIAzm8.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
