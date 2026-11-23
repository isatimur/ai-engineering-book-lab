---
video_id: "wNH3q9pqn0U"
playlist_index: 166
title: "Real-time Experiments with an AI Co-Scientist - Stefania Druga, fmr. Google Deepmind"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=wNH3q9pqn0U"
duration: "18:42"
duration_seconds: 1122
view_count: 4291
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/wNH3q9pqn0U.txt"
themes:
  - "Coding Agents"
  - "Models & Inference"
ingested_at: "2026-04-24T11:42:06+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Stefania Druga, formerly of Google DeepMind, demos a real-time AI co-scientist: a pair programmer for physical experiments. Her open-source rig, under $300 in parts and two weeks to build, streams sensor boards, a microscope, webcams, an object-tracking camera, voice and text into a React app whose context assembly sends whatever modalities are present, plus the experiment protocol, to Gemini. Inspired by DeepMind's multi-agent AI co-scientist paper and Silver and Sutton's era of experience, she ran crystal growth and fermentation at home and found crystals form in bursts, not gradually."
---
# Real-time Experiments with an AI Co-Scientist - Stefania Druga, fmr. Google Deepmind

## Summary
Stefania Druga (formerly Google DeepMind) gave this talk on the robotics track. Her idea: a co-scientist that works like a coding copilot, but for real-world experiments, reasoning over live lab data as it arrives instead of over papers after the fact.

**Live demo first**
She opens with hardware. A micro:bit-style board with a sensor add-on reads temperature while a heat pad warms it; the assistant reads all connected sensors and reports stable, dark, quiet ambient conditions at 26 degrees. She then writes a protocol describing the experiment, so later feedback on data and microscope images is framed by its conditions and limits. Repeat experiments get a custom page that monitors and plots sensor data in real time. An open-source tracking camera runs a model on-device over Wi-Fi and follows her around the stage; she notes you could train it to track crystal growth or other objects. All parts are open source, cost under $300, and took two weeks to build.

**Why co-scientists**
Science has a data overload. AI can analyse at scale, generate hypotheses, find blind spots in prior work, and test 100 hypotheses instead of one. Her inspiration was DeepMind's AI co-scientist paper, published two months earlier: an orchestration of Gemini 2.0 agents playing scientists' roles — summarising papers, searching, ranking hypotheses, and planning. Tested on a gene transfer mechanism that took scientists 12 years to find, it reached the answer in two days without seeing that result in training. On liver fibrosis it proposed drug targets that experts confirmed in the wet lab. The second inspiration was Silver and Sutton's paper on the "era of experience": AI moving past human-made datasets to learning from continuous, multimodal streams.

**How the system works**
A simple React app takes many inputs: sensors over the WebUSB API, any number of webcams, text and voice (it talks back). Each input becomes a front-end hook. A unified context-assembly step checks on every message which modalities are present — text, voice, image, chat history — and builds the context for the Gemini API, with protocol details injected on the fly. She calls this dynamic context injection the key piece.

**Home experiments**
Limits: measurable in real time, safe at home, portable. Her lab in a box lived in an apartment in Tokyo.
- Crystal growth: supersaturate salt in hot water and cool it slowly; gradual cooling and humidity decide crystal quality. She recorded microscope video (cooled by a fan blowing air from ice) and sensor data, ran control samples in the fridge and at room temperature, exported CSV and plotted growth rates with a separate script. Her finding: crystals form in bursts once critical saturation is reached.
- Fermentation: vary salt and sugar in dough and the temperature, and measure growth rate and CO2.

**Ecosystem and future**
An education version runs on a phone with your own API key. She points to open-source lab automation: the Jubilee motion platform from the University of Washington, where she did her PhD, an open bioreactor, and a week-long April workshop on automating experiments. Next, she wants real-world recordings to inform realistic simulations, for example of bacterial colony growth, to find the best conditions before running them for real.

## Why it matters
- Moves the co-scientist idea from async analysis of papers to real-time reasoning over live sensor, camera and voice data.
- Dynamic context assembly — build each prompt from whichever modalities and protocol are present — is a reusable pattern for multimodal agents.
- Cites concrete evidence for multi-agent research systems: a 12-year discovery reproduced in two days, and wet-lab-validated liver fibrosis targets.
- Shows a low-cost (under $300), open-source build path for physical AI experimentation, including in education.
- Points to a loop where real measurements calibrate simulations, which then choose the next real experiment.

## Metadata
- Video: https://www.youtube.com/watch?v=wNH3q9pqn0U
- Duration: 18:42
- Playlist index: 166
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Models & Inference]]

## Transcript excerpt
> [Music] My name is Stefania. I'm so glad you made it until the yeah uh last day of the conference and came to the robotics track. So, we're going to start with a live demo uh and then we'll switch to the presentation just like to to kind of like swap things around. So, I'm going to try to connect the microscope over here. Uh and let's see the other camera and some sensors. So, my talk is about real time uh science co-scientist. So, think about pair programmers. How many of you use any form of copilot for coding? Right. So it's just like that but for doing things in the real world like science experiments. So you can see here now I have this board which is a microbit board with jackd...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/wNH3q9pqn0U.txt]]
- Description cue: The sheer volume of data and complexity of modern scientific challenges necessitate tools that go beyond mere analysis. The vision of an "AI Co-scientist" – a true collaborative partner in...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Models & Inference**.
