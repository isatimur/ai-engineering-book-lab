---
video_id: "bCGbuyv8PMk"
playlist_index: 110
title: "Rishabh Garg, Tesla Optimus — Challenges in High Performance Robotics Systems"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=bCGbuyv8PMk"
duration: "12:43"
duration_seconds: 763
view_count: 7977
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/bCGbuyv8PMk.txt"
themes:
  - "Models & Inference"
  - "MCP & Tooling"
ingested_at: "2026-04-24T11:23:22+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Rishabh Garg (Tesla Optimus) shows that many robot faults that look like a bad control policy are really software-system faults between the controller and the wire. Building a toy robot on a 1 Mbit/s CAN bus with a 2 ms policy loop, he finds that about 1 ms of bus transmission per cycle stretches the loop, fixes it by multithreading and pipelining TX, RX and policy, then diagnoses jitter with a cheap bus transceiver, candump timestamps and cycle-time plots. Root causes include late policies queuing two commands, RX threads feeding stale data, logging that freezes the loop for 30 ms or blacks out the bus, and priority inversion that starves the kernel."
---
# Rishabh Garg, Tesla Optimus — Challenges in High Performance Robotics Systems

## Summary
Rishabh Garg of Tesla Optimus talks about "what happens between the controller and the wire". Many talks show learned policies that control robots, but the data must still travel from sensors to the policy and from the policy to the actuators. When a motor does not move as expected, is the policy wrong or the software system? Garg says he grapples with this almost every day. His thesis: many issues that look like the policy are really the software system, and you can find them with simple measurement. He builds the argument by designing a toy robot step by step.

**The toy robot and the first gap**
The robot has actuators, a CPU, perhaps an accelerator and a sensor, linked by CAN, which he picks because it is open, cheap and has enough data rate and compatibility. The first loop simply receives data, runs the policy (budget about 2 ms) and sends the result. On the robot, a gap appears every cycle. The arithmetic: about 100 bits per message and 10 messages (five out, five in) is 1,000 bits, which at 1 Mbit/s takes about 1 ms. Transmission time is on the same order as the loop. One option is to accept a 3 ms loop. The high-performance option is to split TX, RX and the policy into threads and pipeline them: start receiving the next data before the policy finishes, and transmit the previous result at the start of the next cycle, keeping a 2 ms cadence.

**Diagnosing jitter**
Next the actuators stutter and make catching-up sounds, which "has to be policy". To check, connect a cheap external transceiver to the bus, feed a laptop, and run candump for timestamped messages. Ideal traffic shows one message every 2 ms. Real traffic shows a 4 ms gap followed by two messages with almost no gap. A cycle-time plot (time since last message) makes this clear: spikes to 4 ms followed by drops near zero.

**Two root causes**
- TX side: policies are not truly real-time. When one runs long, the send slot is missed, the command is queued, and next cycle two messages go out together. TX and RX threads drifting out of sync causes the same effect.
- RX side: if the receive thread is late, the policy runs on old data, outputs a stale command, then skips a sample next cycle, which sounds like jitter on the motors.

The fixes are standard synchronization primitives (waits, condition variables, semaphores). On a real-time OS or microcontroller without them, add timing padding so data still reaches the right policy iteration.

**Logging and priority traps**
- Logging looks harmless, but a flush to disk from the main control loop froze the robot for 30 ms on a Raspberry Pi with an SD card. The fix is to move logging to another CPU.
- On microcontrollers, logging to a slow serial peripheral can take about a millisecond. Logging a dropped packet causes the next drop, which logs again, until the bus goes dark: logs show drops but no data.
- Priority inversion: robotics code often raises process priorities so high that it blocks the kernel work that delivers its own data, causing dropouts of up to seconds. Know the pipeline and set priorities correctly.

## Why it matters
- A clear warning for teams deploying learned policies on hardware: before blaming the model, rule out bus timing, threading and logging faults.
- The bus arithmetic (1,000 bits at 1 Mbit/s is about 1 ms against a 2 ms loop) shows how communication limits shape loop design.
- Gives a cheap, repeatable diagnosis method: an external transceiver, candump timestamps and cycle-time plots that expose late and doubled messages.
- Specific failure patterns (30 ms freezes from disk logging, log-induced packet-drop cascades, priority inversion) are concrete examples for a chapter on real-time robotics systems.

## Metadata
- Video: https://www.youtube.com/watch?v=bCGbuyv8PMk
- Duration: 12:43
- Playlist index: 110
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[MCP & Tooling]]

## Transcript excerpt
> [Music] Right. Good afternoon everyone and really excited to be here today. Really exciting stuff so far. So many models, so many new ideas and today I want to talk about what happens between the controller and the wire. Now we have seen so many policies that work that control robots but again we that we need to get that data to the actuators we need to get that data from sensors and feed the whole system and what happens if your carefully crafted policy does not work as expected like is this issue in the policy or is it in the software system. So today we look at a lot of instances where the issue will look like it's the policy but it's actually the software system and along the way we'll...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/bCGbuyv8PMk.txt]]
- Description cue: A robot's behavior is influenced by the control policy, the software configuration, and electrical characteristics of the communication protocol.

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **MCP & Tooling**.
