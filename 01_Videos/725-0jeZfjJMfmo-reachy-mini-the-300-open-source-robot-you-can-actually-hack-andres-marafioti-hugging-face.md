---
video_id: 0jeZfjJMfmo
playlist_index: 725
title: "Reachy Mini: the $300 open source robot you can actually hack — Andres Marafioti, Hugging Face"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=0jeZfjJMfmo"
duration: "21:16"
duration_seconds: 1276
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/0jeZfjJMfmo.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-06-04T14:10:06+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Andres Marafioti, who leads multimodal research at Hugging Face, presents Reachy Mini, an open-source, non-humanoid robot sold unassembled at 300 or 450 USD so hackers, students and schools can shape how people talk to robots. Hugging Face has shipped 7,500 units; voice chat is the most used app. He details the serving stack: VAD, partial transcripts every 150 ms, an LLM with tool calls for motion and camera, and TTS, with LLM endpoints scaled apart from conversation nodes. He made an open TTS model usable for voice by adding streaming, a static KV cache and CUDA graphs, lifting real-time factor from 0.8 to 5.8."
---

# Reachy Mini: the $300 open source robot you can actually hack — Andres Marafioti, Hugging Face

## Summary
Andres Marafioti leads multimodal research at Hugging Face. He presents Reachy Mini, a small, expressive robot that you talk to, and argues that how people interact with robots should be built by everyone in "a hacker fashion", not decided by one company. The second half is a technical look at the voice stack behind it.

**The problem with today's robots**
Humanoids and robotaxis are advancing fast, but they cost at least 50K (robotaxis more), target companies, are hard to adapt, and do not feel friendly. No high school will order ten 50K humanoids. Copying the human form is, to him, a mistake: a robot that does not look human pushes builders to invent new kinds of interaction instead of a human replacement. Voice AI, both commercial and open source, is mature, yet "no one is really working on" how we will talk with robots.

**Reachy Mini**
It targets hackers, researchers, students and dreamers. Two versions sell at 450 and 300 USD; the dearer one adds a Raspberry Pi and a battery, and the cheaper one is sold in bulk to schools and universities. Robots ship unassembled, so owners learn enough to repair anything. Users 3D-print parts (one made a Halloween pumpkin) and found uses the team never planned, such as petting the robot to make it react and purr. Apps can run on the robot or on a laptop, in any language. It is designed to stack with Hugging Face's other open robots: the SO100 and SO101 arms and a three-wheeled base called Kiwi. He says he one-shot the robot's current movement app by giving a coding model the robot repo and a description.

**The voice stack at fleet scale**
Hugging Face has shipped 7,500 robots, and talking to it is "our most used app by far". A recorded demo shows the robot joking, taking a photo, describing what it sees and showing an emotion through tool calls. The system has three levels:
- *On the robot:* the conversation app handles microphone and speaker, echo cancellation, tool dispatch for motion and emotions, camera use and face tracking.
- *Speech-to-speech pipeline* (which he has maintained for two years): voice activity detection, then a fast speech-to-text model that sends partial transcripts every 150 ms so the robot can react early, then an LLM that can call tools, then TTS.
- *Hosted serving:* Hugging Face inference endpoints behind a load balancer that sizes compute to connected robots. LLM endpoints (a 27B model) scale apart from conversation nodes, because eight talkative users load a node very differently from eight quiet ones.

**Making an open TTS model fast enough**
A recent open TTS model matched its paper's quality but not its claimed latency. Over about two weeks he found and fixed three issues. It generated the whole output before returning, so he added streaming. Its autoregressive loop ran 500 steps per audio packet, each syncing CPU and GPU. It used a dynamic KV cache, which blocked compilation; he switched to a static KV cache, trading RAM for speed, and used CUDA graph capture. Real-time factor went from 0.8 to 5.8, and time to first audio fell from seconds to milliseconds. The demo claims first-token latency under 200 ms at 4x real time. The faster model is open source. He warns that the latency a client perceives includes infrastructure time, which can equal the model's own time once the model is fast.

## Why it matters
- A clear reference architecture for a production voice agent: VAD, streaming partial transcripts every 150 ms, tool-calling LLM, TTS, with on-device echo cancellation and tool dispatch.
- Scaling LLM endpoints apart from conversation nodes is a concrete serving lesson for voice workloads with uneven per-user load.
- The TTS speed-up (streaming, static KV cache, CUDA graphs) shows that a research release can need real engineering before it meets voice-agent latency.
- The gap between model time to first audio and client-perceived latency is a practical warning for anyone budgeting voice-agent latency.
- A 7,500-unit open robot fleet where voice chat dominates usage is evidence that voice is the main interface people choose for embodied agents.

## Metadata
- Video: https://www.youtube.com/watch?v=0jeZfjJMfmo
- Duration: 21:16
- Playlist index: 725
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Um Can I Are you hearing me well? No. Okay. Yeah, you Yeah, now now with the speakers. Good. Hey, how are you everyone? Uh my name is Andy Marafioti. Um I'm going to talk today about this little robot called Richie Mini. Um I'm going to try to explain to you why we developed it, why we think it's important, and what we are trying to do with it. Um and yeah, about me, I lead multimodal research at Hugging Face, which I don't have time to explain very much, but I hope you know Hugging Face. Good. So, first, very quickly, the state of robotics. Um we are actually making strides in robotics. I think for the day-to-day life, it's not very clear, but robots are just coming and they're coming at...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/0jeZfjJMfmo.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
