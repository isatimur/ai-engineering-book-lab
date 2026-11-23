---
video_id: IJXjTLPzvAU
playlist_index: 769
title: "The Miranda Hypothesis: How Hamilton Poisoned Persona Evals - Jacob E. Thomas, Results Gen"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IJXjTLPzvAU"
duration: "58:17"
duration_seconds: 3497
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/IJXjTLPzvAU.txt"
themes:
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-28T23:47:02+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jacob E. Thomas, a data scientist trained as a behavioural epidemiologist, argues that persona evals for role-playing language agents measure fluency and personality consistency, so they cannot catch the dominant failure: anachronistic compositing. His Miranda hypothesis says cultural retellings such as the Hamilton musical swamp a figure's primary record in training data, and preference tuning amplifies the smoothing. He proposes corpus-bounded, time-anchored personas built in the context window rather than by fine-tuning, and a pre-registered Lincoln experiment (4 moments, 3 seeding conditions, 60 responses) scored by a historian on a weighted rubric that deliberately ignores voice."
---

# The Miranda Hypothesis: How Hamilton Poisoned Persona Evals - Jacob E. Thomas, Results Gen

## Summary
Jacob E. Thomas runs an analytics lab at a labour-market intermediary and trained as a behavioural epidemiologist. His talk asks one question of role-playing language agents (Character AI, Hello History, his own open-source prompt framework called Companion): what is the eval actually measuring? He works with historian Rick Halpern (University of Toronto) and librarian Shawn Martin.

**The thesis**
State-of-the-art systems score 80.7% on the in-character benchmark for personality fidelity. But the same systems render a Hamilton who sounds like he has seen his own Broadway musical. If the dominant failure is anachronistic compositing and evals measure fluency and personality consistency, the evals cannot detect the failure. He calls this the mask versus the mirror: convincingness and fidelity are independent properties. Asked about slavery, a frontier model's Hamilton gives a clean abolitionist answer; the historical record is contested, and the model gives none of the complication.

**The Miranda hypothesis**
- Inputs: cultural representations of a figure far exceed the primary record. The Federalist Papers are about 175,000 words; content downstream of the musical exceeds that by orders of magnitude.
- Mechanism: next-token prediction cannot tell a 1789 letter from a 2019 tweet, so output is a salience-weighted composite matching the figure at no real moment.
- Alignment amplifies it: raters share the same mythologised Hamilton, so preference tuning rewards it, a form of what he calls algorithmic sycophancy.
- Time-locked models trained on corpora with fixed cutoffs help, but still average a figure across everything before the cutoff. Period anchoring is not persona anchoring.

**Epistemic simulation and the role-playing language system**
He adds a fourth stage after templates, imitation and cognitive simulation: epistemic simulation, which is corpus-bounded, temporally anchored and evaluated by experts. For persona systems only, he moves the unit of analysis from the agent to the whole configured encounter: structured prompt, primary-source anchor material, a temporal anchor, a swappable model, and a human curator. The persona is the configuration, not the checkpoint, so it can be versioned, audited and reproduced. That is context engineering. He argues fine-tuning is worse here: it mixes a thin personal signal into the cultural sediment, breaks provenance, and needs GPUs, while the context-window approach needs only documents and any frontier model.

**The instrument**
A pre-registered experiment, not yet run at scale, uses Lincoln: four moments (1847, 1858, 1860, 1862–65), three seeding conditions (primary sources, a modern biography, bare model), and five historian-written questions, giving 60 responses. The rubric weights anachronism detection 40%, documentary consistency 35% and contextual plausibility 25%. The historian dropped a does-it-sound-like-Lincoln axis on purpose, so plain but faithful beats fluent but anachronistic. The bare-model 1847 Lincoln, asked about war without Congress, invokes inherent executive authority, a 20th-century framing; Lincoln's 1848 letter to Herndon says the opposite.

**Operations**
The expert is a build-time and gate-time cost, not a runtime one: they write the questions, sealed vignettes, rubric and gold set, which become a pipeline gate rerun on every base-model change. Automated metrics can do a first pass. The project began with a failed attempt to help a person with dementia speak.

## Why it matters
- A sharp case of eval validity failure: a benchmark can report 80.7% while missing the failure users care about, because convincingness and fidelity are separate properties.
- Explains why RLHF can entrench, not fix, a bias: raters share the same cultural narrative as the training data.
- Gives a concrete argument for context engineering over fine-tuning when provenance, audit and versioning matter.
- Offers a reusable eval recipe: expert-written diagnostic questions, weighted rubric, pre-registered predictions, and a gate rerun on each base-model change.
- Shows deliberate exclusion of a tempting metric (voice) to avoid rewarding the exact error under test.

## Metadata
- Video: https://www.youtube.com/watch?v=IJXjTLPzvAU
- Duration: 58:17
- Playlist index: 769
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Before I begin my formal talk, I want to show you something, just so we're all on the same page about what we're even talking about. This is a platform called Character AI. It's a hybrid social media platform with role-playing language agents. This is Hello History. It's a more education-focused one where you can summon a persona such as Marcus Aurelius and be tutored by them. Millions of people open these tools and have conversations with Napoleon, Cleopatra, or Marcus Aurelius as you saw. With a fictional companion or with a tutor wearing a historical face. The technical name for what's underneath these tools is role-playing language agent. A system built to instantiate a persona, real or...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IJXjTLPzvAU.txt]]

## Book angles
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/jethomasphd/THE_COMPANION_DOSSIER>
