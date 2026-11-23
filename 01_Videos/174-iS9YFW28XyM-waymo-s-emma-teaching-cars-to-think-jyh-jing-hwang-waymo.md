---
video_id: "iS9YFW28XyM"
playlist_index: 174
title: "Waymo's EMMA: Teaching Cars to Think - Jyh Jing Hwang, Waymo"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=iS9YFW28XyM"
duration: "17:28"
duration_seconds: 1048
view_count: 6123
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/iS9YFW28XyM.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T11:42:28+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jyh Jing Hwang of Waymo presents EMMA, a research model that drives with Gemini. His thesis: Waymo's long-tail scenarios (a traffic officer waving cars through a red light, a flock of birds, a scooter rider slipping on a wet road) need the generalization of multimodal foundation models. EMMA takes eight surround cameras plus routing text and outputs future waypoints. It is self-supervised from driving logs, camera only, and needs no high-definition map. Chain-of-thought reasoning about critical objects improves planning, quality keeps rising with more data, one model also does 3D detection, and generated video helps test it in rain and at night."
---
# Waymo's EMMA: Teaching Cars to Think - Jyh Jing Hwang, Waymo

## Summary
Jyh Jing Hwang, a Waymo researcher, gives a 17-minute talk on EMMA, the End-to-End Multimodal Model for Autonomous Driving. His thesis: to scale beyond its current cities, Waymo must handle a long tail of rare events. Multimodal foundation models such as Gemini already generalize well to those events, so the research question is how to make them drive.

**From research cars to L4**
He traces autonomous driving from three-layer neural networks in the 1980s to end-to-end models around 2020 that drifted in their lanes, "more like a L2" system. Waymo's L4 stack splits into perception, prediction and planning. It offers rider-only service in Phoenix, San Francisco, Austin and Los Angeles, and this year runs a road trip to about 10 more cities, including Tokyo.

**The long-tail problem**
His examples come from an open challenge Waymo ran: a traffic controller waving cars through a red light, a sudden flock of birds, and a scooter rider who slips on a wet road at night. A human driver may never see these. At Waymo's scale they come up "very very often." When shown the bird and scooter videos, Gemini describes each scene correctly and proposes the right behaviour, such as slowing down and staying alert.

**EMMA in its simplest form**
EMMA is built on Gemini. Inputs are routing instructions turned into plain text (turn left at the next intersection) and video from eight cameras covering 360 degrees. Output is a set of future waypoints for the next few seconds. Hwang names three traits:
- Self-supervised: every driving log shows where the car went, so any moment becomes a training example.
- Camera only: no lidar, because Gemini is a camera model.
- No high-definition map: only a Google Maps-style route.
On a popular open-loop planner benchmark, this simple form reached state-of-the-art quality.

**Reasoning, scaling and multitask**
To fix the lack of explainability, EMMA first reasons in a chain of thought: it names critical objects (a cyclist, a vehicle), predicts their behaviour, and picks a driving meta-decision such as keep speed or yield. On Waymo's open motion dataset, about 100 times larger than the academic one, this beat strong specialized planners that get oracle perception, maps and traffic light states as input. On an internal dataset much larger than any public one, planning quality kept improving with more data. Because the language interface is flexible, one model also does 3D detection, road-graph estimation and free-form visual Q&A, with detection close to state-of-the-art.

**Evaluation through generated sensors**
Open-loop replay is the least faithful test. Simulation is trusted more. Waymo uses Google generative video models to synthesize camera input and vary the weather and time of day. As expected for a camera-only model, quality drops in rain and at night and is best around noon and afternoon.

## Why it matters
- It is a clear case of using a general multimodal LLM as the planner itself, not only as a perception helper, in a safety-critical domain.
- Self-supervision from driving logs shows how existing operational data can become free training labels.
- The chain-of-thought step serves both explainability and accuracy, which is useful evidence for reasoning-before-action designs.
- Using generated video as simulated sensor input is a concrete technique for testing a model on conditions you cannot easily collect, and it shows camera-only weak spots in rain and at night.

## Metadata
- Video: https://www.youtube.com/watch?v=iS9YFW28XyM
- Duration: 17:28
- Playlist index: 174
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] So I I think a lot of people here already to be here in San Francisco. So we drive every day and I think the technology just works as you all witness. So uh I'm going to talk a little bit about the history of autonomous driving research like what it took to to to take us here and in the current status. So in the autonomous driving history uh people started the research in 1980s where it's just very simple neuronet networks there are three layers and over time people start to think about you know going deeper and deeper and then in around uh 2020 there is papers from NVDI and other uh research labs publishing end to end driving models and this is one of the videos that they published...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/iS9YFW28XyM.txt]]
- Description cue: This session explores Waymo's latest research on the End-to-End Multimodal Model for Autonomous Driving (EMMA) and advanced sensor simulation techniques. Jyh-Jing Hwang will demonstrate how...

## Book angles
- Could support a chapter/section on **Models & Inference**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://waymo.com/blog/2024/10/introducing-emma>
