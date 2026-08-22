---
video_id: "gbM7k3NauNI"
playlist_index: 553
title: "LLM Scientific Reasoning: How to Make AI Capable of Nobel Prize Discoveries: Hubert Misztela"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=gbM7k3NauNI"
duration: "20:00"
duration_seconds: 1200
view_count: 3677
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/gbM7k3NauNI.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:23:35+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A Novartis talk uses RAG-based reasoning to try to reconstruct a Nobel-level biology discovery, date-restricting the corpus so answers can't just recall memorized results."
---
# LLM Scientific Reasoning: How to Make AI Capable of Nobel Prize Discoveries: Hubert Misztela

## Summary
Hubert Misztela (Novartis) tests whether RAG-based reasoning can reproduce a real biological discovery — RNA interference, first seen as three unexplained phenomena across separate biology subfields in the 1990s that took eight years for humans to connect, and which later won a Nobel Prize. Because LLMs have memorized Wikipedia's account of the 1998 discovery, the team enforces a knowledge cutoff: the RAG corpus is restricted to papers published before the discovery, so any hypothesis the system produces can't be recall dressed up as reasoning. Naive retrieval (nearest-chunk similarity) failed to reach the ground-truth link without cheating, and only improved once they added reasoning before retrieval — a stronger, more specific prompt and a relevance classifier scoring each paper's contribution to advancing the hypothesis, rather than relying on simple embedding distance. Success is defined in escalating tiers specific to discovery rather than lookup: first recovering known facts, then finding the non-obvious cross-domain links, then generating genuinely new hypotheses, and — the hardest, unmet tier — explaining the causal mechanism the way the original human discoverers eventually did.

## Why it matters
- The domain forces a "knowledge cutoff" simulation: the verification step here is proving the model reasoned rather than recited a memorized answer, done by date-restricting the corpus rather than by a compliance mechanism.
- Success criteria are structured as escalating discovery tiers (known facts, then non-obvious links, then new hypotheses, then causal mechanism) rather than a single QA accuracy number.
- A concrete case for the thesis: verification here means proving genuine reasoning versus recall, a distinct problem from the regulatory audit trails seen in the finance and health talks in this batch.

## Metadata
- Video: https://www.youtube.com/watch?v=gbM7k3NauNI
- Duration: 20:00
- Playlist index: 553
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] hello everyone um there's a lot of interesting talks for so thank you for being here um my name is Hubert uh I work for Pharma novaris on a daily basis I work on designing of small molecules with generative AI so design designing small graphs which would try to fit our fix our diseases cure um but today I would like to talk about um scientific reasoning scientific discoveries um specifically how to use llms for that and this is a joint work with my colleague direct low who's a medicinal chemist you might know know him if you are interested in direct design so today I'm going to talk about a few things right probably I'm going to leave you with more questions than responses and more...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/gbM7k3NauNI.txt]]
- Description cue: Do you remember that feeling when you realized who was Jon Snow's mother? Or who was the Batman really? Those 'aha' moments define scientific reasoning: of many steps and non-obvious.

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
