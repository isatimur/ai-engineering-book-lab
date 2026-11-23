---
video_id: yqF6XhzbWBk
playlist_index: 1057
title: "Inside 847 Production Clinical AI Notes — Sebastian Fox, Composo"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=yqF6XhzbWBk"
duration: "19:48"
duration_seconds: 1188
view_count: 1100
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/yqF6XhzbWBk.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-08-25T01:52:43+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sebastian Fox, a medical doctor now at Composo, which builds AI evaluation systems for high-stakes domains, shows that the dangerous errors in ambient-scribe clinical notes look completely fine: omissions, over-inferences and reversed decisions. A strong rubric-based LLM judge passed notes where one in five clean passes still hid a serious error, because the judge cannot tell which differences matter. His fix is a loop: discover failure modes from real outputs, capture expert judgment as free-form comments, and calibrate each output against retrieved similar cases, corrections and guidelines instead of a static rubric or fine-tuned weights."
---

# Inside 847 Production Clinical AI Notes — Sebastian Fox, Composo

## Summary
Sebastian Fox is a medical doctor by background and now works at Composo, which builds AI evaluation systems for high-stakes domains. He opens with an AI-written note for a routine "tension type" headache. The patient also said her jaw aches when she chews; over 50, that points to giant cell arteritis, a same-day steroid emergency that can take her sight. That line never reached the note. Nothing in the note is wrong; the danger is what is missing. His thesis: the dangerous failures look completely fine, and the usual LLM judges cannot see them.

**How common the errors are**
In the largest real-world study he cites, about 1 in 20 notes carried an error serious enough to cause significant harm. Nearly 1 in 5 had an important omission and more than 1 in 10 a hallucination. Ambient scribes are in about a third of US practices, physician AI use doubled last year, and most systems have no adverse event reporting. "We're flying blind." A blatant case: a young man with tonsillitis got a note with chest pain, suspected angina, diabetes drugs and a non-existent hospital, and was later invited to diabetic eye screening.

**What goes wrong**
His team generated notes from three leading production scribes and plotted every error by severity and by whether a strong automated check catches it. Most sat below the line. Examples: "it just happened" recorded as abrupt sudden onset, a brain-bleed red flag; a note that kept the tests the patient talked the doctor out of. Some errors come from transcription (Humalog heard as Humulin, hyperthyroidism as hypothyroidism, a dropped "no" before "evidence of cancer"). Most happen even with a perfect transcript: the model adds, changes or omits something. The hard part is knowing whether it matters. He calls that judgment "taste": tacit, contextual and moving.

**Why judges fail**
Generation is cheap, so teams put a checker after it, relying on the asymmetry of verification. The best teams use expert review offline and an automated judge with a detailed faithfulness rubric, worked pass and fail examples, auto-optimized prompts and deterministic NLP concept counts. Fox built that system and ran the same notes through it. One in five clean passes still had a serious error, often an omission. A note that says start amoxicillin when the decision was to wait is faithful to the words but "a lie about the intent". A judge like this adds "a second silent failure". In maths and code the verifier is free; for "is this note safe and complete" there is no unit test. Dropping a holiday to France is noise; dropping a trip to Lake Malawi with blood in the urine is the diagnosis (schistosomiasis).

**Where to keep taste**
A pre-specified rubric holds only the taste you could write down. Weights go stale, cannot explain a score and need retraining. His option is to keep taste as examples: past judgments, expert corrections and references, retrieved per output into the judge's context. The loop has three steps. Discover a failure mode ontology by clustering real production outputs, since synthetic tests cover only failures you imagined. Capture expert judgment: clinicians spend a focused few hours leaving comments with reasoning, not just scores. Calibrate by assembling a case-specific standard per output through context engineering. On the same notes, an off-the-shelf rubric judge did better than a coin flip, the serious system did better, and the loop judge did much better. Only what the judge was shown changed. The same pattern applies to contract review and support agents.

## Why it matters
- Gives hard production numbers for ambient-scribe error rates (1 in 20 serious, 1 in 5 omissions) and shows that no one tracks them.
- Shows by direct test that a carefully built rubric LLM judge can pass serious errors, especially omissions, so a judge can become a second silent failure.
- Separates the easy part of verification (spot differences) from the hard part (which differences matter), which limits the 'verification is easier than generation' argument.
- Offers a concrete alternative to static rubrics and fine-tuning: retrieve similar judged cases, expert corrections and guidelines per output.
- Gives a cheap first step any team can take: experts leaving free-form comments on real outputs.

## Metadata
- Video: https://www.youtube.com/watch?v=yqF6XhzbWBk
- Duration: 19:48
- Playlist index: 1057
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> This is a clinical note an AI wrote from a real consultation. Take a few seconds and read it. It reads like a routine headache. A new headache, likely tension type, take some paracetamol, come back if it doesn't settle. Looks completely fine, doesn't it? Here's what's missing. In the room, she also mentioned her jaw aches when she chews. A new headache, over 50 with jaw pain on chewing, that's giant cell arthritis. And untreated, it can take her sight within days. It's a same day start steroids now emergency. And that one line, it never made it into the note. On the page, it's a paracetamol headache. And nothing in the note is technically wrong. It's the dangerous part is what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/yqF6XhzbWBk.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
