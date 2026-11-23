---
video_id: "IQc05eCvNYE"
playlist_index: 129
title: "Vision AI in 2025 — Peter Robicheaux, Roboflow"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=IQc05eCvNYE"
duration: "17:24"
duration_seconds: 1044
view_count: 11768
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/IQc05eCvNYE.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:25:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Peter Robicheaux, ML lead at Roboflow, argues that vision models are not smart: vision evals like ImageNet and COCO are saturated pattern-matching tests, CLIP-style captions cannot tell apart images that differ in pose or direction, and convolutional detectors gain almost nothing from large pre-training. He presents a real-time detector that swaps in a DINOv2 backbone, and the RF100VL benchmark of 100 hard-domain detection datasets, where a YOLOv8 trained on 10 examples per class beats a 72B vision-language model. LLMs generalize in language but not in vision."
---
# Vision AI in 2025 — Peter Robicheaux, Roboflow

## Summary
Peter Robicheaux is the ML lead at Roboflow, a platform for building and deploying vision models. In this short state-of-the-field talk he pitches why computer vision matters to an LLM-focused crowd: systems that act in the real world need vision, and the gap between human and computer vision is, he argues, bigger than the gap in speech. Vision also has its own constraints. Latency matters, motion needs several frames per second, and models usually run at the edge.

**Vision models are not smart**
His core claim. Evals like ImageNet and COCO are saturated and mostly measure pattern matching, so there is no incentive to build visual intelligence. His proof: a frontier chat model asked the time on a watch just guesses, and its newer version still fails, even on 10:10, the stock time on watch photos. The MMVP dataset shows a leading chat model getting wrong which way a school bus faces, then hallucinating details to support the answer.

**Why: captions do not carry visual detail**
MMVP was built from image pairs that are close in CLIP space but far in DINOv2 space. CLIP learns by matching images to captions, and no caption says which way the dog faces, so "if your loss function can't tell these two images apart," the model cannot either. DINOv2, trained self-supervised on vision alone, finds the dog's segments and even maps dog legs and human legs to the same features. The open question is how to get vision features that align with language and keep visual fidelity.

**Why: convolutional detectors ignore pre-training**
Pre-training a YOLOv8 on Objects365 (1.6 million images) adds about 0.2 mAP on COCO. A detection transformer gains about 5, sometimes 7, mAP from the same pre-training. And 1.6 million images counts as "large" in vision, which would be a tiny dataset in the LLM world.

**Roboflow's answer**
- A new real-time detector that replaces a detection transformer's backbone with the DINOv2 pre-trained backbone. On COCO it is second to the current state of the art, but on RF100VL it shows large gains.
- RF100VL: 100 detection datasets hand-picked from Roboflow Universe (which he puts at roughly 750,000 datasets) for difficulty: aerial views, microscopes, X-rays, classes like fibrosis, and context-dependent classes like a volleyball "block" or a "thunderbolt" cable defect. It ships class names, annotator instructions and canonical 10-shot splits.

**Key result**
A YOLOv8 trained on 10 examples per class beats a 72B state-of-the-art vision-language model. VLMs generalize out of distribution in language but are "absolutely hopeless" in the visual domain. In Q&A: a zero-shot grounding detector scores about 19 mAP, a YOLOv8 nano trained from scratch on the 10-shot data about 25, and the fine-tuned grounding detector is best. No model yet gets more from class name, instructions and examples together than from any two. The data comes from researchers who label on the free platform and contribute their datasets back as open source.

## Why it matters
- Gives a concrete counterweight to the assumption that multimodal LLMs can see: the watch, school-bus and 10-shot results are clear, citable failure cases.
- Explains a mechanism, not just a symptom: contrastive caption training cannot learn distinctions that captions never mention.
- Shows eval saturation in another field: COCO rewards box precision, so a harder, domain-diverse benchmark changes which models look good.
- Makes the case that architecture decides whether pre-training pays off (convolutional versus transformer detectors), with numbers.
- Relevant to edge and real-time systems, where a small fine-tuned specialist still beats a giant general model.

## Metadata
- Video: https://www.youtube.com/watch?v=IQc05eCvNYE
- Duration: 17:24
- Playlist index: 129
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] I'm going to be giving a quick presentation about the state of the union regarding AI vision. Um, so I'm Peter Robisho. I'm the ML lead at Rooflow, which is a platform for building and deploying vision models. Um, so a lot of people are really interested in LLMs these days. So I'm trying to pitch why computer vision matters. Uh so if you think about systems that interact with the real world, they have to use vision as one of their primary inputs because the the built world is sort of built around vision as a fundamental primitive. Um and there's a big gap between where human vision is and where computer vision is. Uh I I would argue a bigger gap than exists currently for human...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/IQc05eCvNYE.txt]]
- Description cue: Attendee-Only and Attendee-Led 10min lightning talks: see

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://crowdcomms.com/aiengineer25/qanda/41445>
