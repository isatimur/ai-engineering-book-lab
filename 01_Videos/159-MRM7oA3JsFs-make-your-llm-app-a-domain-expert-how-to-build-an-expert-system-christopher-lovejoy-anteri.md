---
video_id: "MRM7oA3JsFs"
playlist_index: 159
title: "Make your LLM app a Domain Expert: How to Build an Expert System — Christopher Lovejoy, Anterior"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=MRM7oA3JsFs"
duration: "19:18"
duration_seconds: 1158
view_count: 85122
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/MRM7oA3JsFs.txt"
themes:
  - "Org Design & Leadership"
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:41:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Christopher Lovejoy, a medical doctor turned AI engineer at Anterior, argues that in vertical AI the system for turning domain insight into pipeline changes matters more than model power. Anterior's clinical AI, which reviews care requests for insurers covering about 50 million US lives, plateaued near 95% accuracy on models alone and reached about 99% with what he calls an adaptive domain intelligence engine: clinicians review outputs, label failures against a failure-mode ontology, and suggest domain knowledge; production failure sets become eval datasets; and a domain-expert PM sets priorities and performance targets for engineers."
---
# Make your LLM app a Domain Expert: How to Build an Expert System — Christopher Lovejoy, Anterior

## Summary
Christopher Lovejoy trained and worked as a medical doctor for about eight years, then spent seven years building AI systems with medical expertise, including at a tech-enabled home-care startup that recently hit $500 million ARR. He now works at Anterior, a New York clinician-led company whose clinical reasoning tools automate health insurance administration for insurers covering about 50 million lives. His bet: in vertical AI, the system for bringing in domain insight beats the sophistication of models and pipelines.

**The last mile problem**
Models reason well; the gap is context about a specific industry, customer and workflow. His example: Anterior's AI, Florence, reviews a knee arthroscopy for a 78-year-old woman and must answer whether there is "documentation of unsuccessful conservative therapy for at least six weeks." Each phrase hides ambiguity. Is medication conservative or aggressive here? Is partial improvement unsuccessful? If physical therapy was mentioned once eight weeks ago, can you infer it lasted eight weeks?

**95% to 99%**
Better models give a good baseline, but Anterior's accuracy on approving care requests saturated around 95%. With the system below, it reached about 99%.

**Measure: metrics plus a failure-mode ontology**
- Pick the one or two metrics customers care about, with domain experts and customers. For medical necessity review it is false approvals, because the insurer pays for care the patient did not need. Other examples: missed critical terms in legal contracts, dollar loss in fraud detection, test-score gains in education.
- Build a failure-mode ontology. For Anterior the top categories are medical record extraction, clinical reasoning and rules interpretation, each with subtypes. Domain experts, not someone reading traces in isolation, should lead this.
- Do both at once. In a bespoke review dashboard, clinicians see the medical record, the guidelines and the AI's decision and reasoning, mark it correct or not, and tag the failure mode. A chart of false approvals by failure mode then tells the PM what to fix first.

**Improve: production failure sets and expert suggestions**
Each labelled failure mode yields a ready-made dataset from real production data, more representative than synthetic data. An engineer can take 100 cases of one failure mode, iterate, and track scores per failure mode across pipeline versions to catch regressions. The dashboard also has a domain-knowledge button. A clinician can add, for example, how to read suspicion of a condition when the patient already has it, or a missing scoring system. Evals then decide, automatically or with a human, whether the addition goes live. A production failure can be analysed and fixed the same day.

**The loop and the PM**
Expert reviews produce three things in one pass: performance metrics, failure modes and suggested improvements. A domain-expert PM sits in the middle, tells an engineer to take a failure set from, say, 10% to 50%, and decides on release with the eval results and wider product context. Engineers may change prompts, models or fine-tuning.

**Q&A points**
Match the expert's level to the task: ideally a doctor in the relevant specialty for clinical reasoning, a more junior clinician for simpler checks. Anterior builds this tooling itself because it feeds the rest of the platform. Reviewers start as in-house hires, but customers may want to run the same validation themselves.

## Why it matters
- Gives a concrete number for the limit of model-only progress in a vertical domain (about 95%) and what a domain loop added (about 99%).
- The failure-mode ontology tied to a north-star metric is a reusable method for ranking what to fix.
- Shows how expert labels turn production traffic into targeted eval datasets, with per-failure-mode regression tracking.
- Proposes a role design: a domain-expert PM who owns priorities and sets eval thresholds for engineers.
- The conservative therapy example is a clear teaching case for why domain wording defeats general models.

## Metadata
- Video: https://www.youtube.com/watch?v=MRM7oA3JsFs
- Duration: 19:18
- Playlist index: 159
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Hi everybody. So I'm Christopher Lovejoy. I'm a medical doctor turned AI engineer and I'm going to share a playbook for building a domain native LLM application. Uh so I spent about eight years um training and working as a medical doctor and then I spent the last seven years building AI systems that incorporate medical domain expertise. Um and I did that at a few different startups. So I worked at a a health tech startup called Serakare um doing tech enabled home care. Uh the startup recently hit 500 million ARR. Um worked at various other startups and I currently work at Anterior. And Anterior is a New York based clinicianled uh company. Here we provide clinical reasoning tools to...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/MRM7oA3JsFs.txt]]
- Description cue: Vertical AI is a multi-trillion-dollar opportunity. But you can't build a domain-expert application simply by grabbing the latest LLMs off-the-shelf: you need a system for codifying latent...

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
- Could support a chapter/section on **Evals & Reliability**.

