---
video_id: McknwOzbmyg
playlist_index: 1032
title: "Shipping AI to a Million Patients Without an A/B Test — Jared Joselowitz, Ufonia"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=McknwOzbmyg"
duration: "19:15"
duration_seconds: 1155
view_count: 457
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/McknwOzbmyg.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-20T22:28:30+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Ufonia's Jared Joselowitz details Matrix, a simulated-patient safety framework for the Dora voice agent, where an LLM judge matched clinicians (F1 0.96) and GEPA replaced manual prompt tuning."
---

# Shipping AI to a Million Patients Without an A/B Test — Jared Joselowitz, Ufonia

## Summary
Jared Joselowitz works on the safety and evaluation stack behind Dora, a voice AI agent built by Ufonia (UK) that phones patients for clinical conversations like post-op follow-ups; Ufonia has run roughly 200,000 real calls across 20 UK hospitals, is contracted to reach a million patients within two years, and is now live in two US clinics with six more signed. Because A/B testing on patients is unethical or illegal and a bad call can't be rolled back, Ufonia built a simulation framework called Matrix: an LLM plays the patient ("PatBot") in a scripted clinical scenario against Dora, and in a patient-and-public-involvement study, a majority of real patients judged the simulated conversation to be the real one in 3 of 4 sample pairs shown side by side with genuine doctor-patient calls. Simulated dialogues are then graded by an LLM judge ("BevJudge") for hazards like missed red-flag symptoms or hallucinated medical answers; validated against 10 clinicians across 10 specialties on a 240-example corpus, the top model (Gemini 2.5 Pro, at the time of the underlying paper) scored an F1 of 0.96 with near-perfect sensitivity, matching or beating the human experts. Rather than hand-tune prompts — the team found formatting changes alone could swing benchmark scores by 76 percentage points, and reordering few-shot examples could flip a model from near-random to near-state-of-the-art — they use the optimizer GEPA (from the DSPy team) to automatically rewrite prompts against a custom, hazard-weighted cost metric in 30 to 60 minutes instead of hours or days. The resulting pipeline replaces the ship-watch-rollback loop: real call data plus synthetic edge cases feed prompt optimization, then the Matrix simulation gate, then a staged real-patient rollout where autonomy expands as evidence accumulates, with every hazard traceable back to a specific dataset, pinned prompt version, and judge verdict.

## Why it matters
- Gives concrete numbers for validating an LLM-as-judge against real domain experts in a high-stakes setting (F1 0.96, near-perfect sensitivity, 240-example ground-truth corpus, 10 clinicians across 10 specialties) — a rare quantified case study for LLM-judge reliability.
- Documents prompt-optimization fragility with specific figures (a 76-point swing from formatting alone, near-random to near-SOTA from few-shot reordering) as the stated reason for moving from manual prompt engineering to an automated optimizer like GEPA.
- Describes a full transferable alternative to the A/B-test-and-rollback loop for domains where experimenting on real users is unethical: simulate, judge, gate, stage rollout by accumulated evidence, and keep full traceability from hazard to prompt version.

## Metadata
- Video: https://www.youtube.com/watch?v=McknwOzbmyg
- Duration: 19:15
- Playlist index: 1032
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Uh hello everyone. It's really nice to see you all. Um my name is Jared and I'm going to share some of the work that we do on shipping healthcare AI safely basically. Um so just a little bit about me. Um I come from South Africa where I actually studied electrical engineering um before making the very unique decision to transition to AI a few years ago. Um I now work as a research engineer for Euphony which is basically a a healthcare company based in the UK. And um the work we do I work within the science team is we built the safety and evaluation stack behind Dora which is a clinical conversational agent. And my job and our job within the science team is proving that the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/McknwOzbmyg.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
