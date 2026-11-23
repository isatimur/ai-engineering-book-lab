---
video_id: "kDczF4wBh8s"
playlist_index: 144
title: "From Self-driving to Autonomous Voice Agents — Brooke Hopkins, Coval"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=kDczF4wBh8s"
duration: "19:32"
duration_seconds: 1172
view_count: 1732
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/kDczF4wBh8s.txt"
themes:
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:41:03+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Brooke Hopkins, founder of Coval and former lead of eval job infrastructure for a self-driving company's simulation tools, argues that voice agents stall in pilot because of trust, and that the fix is the one self-driving found: large-scale simulation with probabilistic, reference-free metrics. She rejects the choice between rigid IVR-like flows and unpredictable autonomy, and lays out a loop of simulate, review, monitor and feed back. Techniques include text-only simulation for workflow tests, re-simulating a failed scenario 100 times to measure its failure rate, and calibrating LLM-as-judge metrics against human labels."
---
# From Self-driving to Autonomous Voice Agents — Brooke Hopkins, Coval

## Summary
Brooke Hopkins founded Coval, which builds evals for voice agents. Before that she led the eval job infrastructure team at a self-driving company (the captions say "Whimo"), which owned the developer tools for launching and running simulations. Her thesis: the biggest blocker for voice agents is trust, and the way self-driving earned trust — large-scale simulation — carries over to conversational agents.

**The false choice**
Teams either force the agent down fixed paths ("basically an expensive IVR tree") or let it run free and accept unpredictable behaviour. Hopkins calls this a false choice: you can have reliability and autonomy. It is easy to nail 10 conversations and hard to nail 10,000 or 100,000, so many voice agents get stuck in pilot hell, where enterprises fear to put them in front of customers.

**What self-driving learned**
Evaluation moved from manual drives, to hand-built scenario tests (brittle and costly to maintain), to large-scale simulation that asks how often an event happens across many runs. Driving and conversation are alike: each step depends on how the environment responds, so static step-by-step tests break at once. LLM non-determinism helps here, because you can simulate many possible user replies and measure the probability of success.

**Reference-free, probabilistic metrics**
Instead of golden input-output pairs, define metrics that apply to every conversation: how often the agent resolves the inquiry, repeats itself, or says things it should not.

**Continuous eval loops**
Without good process, enterprise voice deployments turn into professional services, with per-customer tweaks taking up to 80% of the team's time. The self-driving pattern: reproduce a bug, fix it, run a larger regression set (in case the fix made the car "stop every 10 seconds"), then presubmit and postsubmit CI, release evals, and live monitoring that feeds back into simulation. Manual review stays, aimed at judgment calls.

**Realism only where it matters**
Test workflows, tool calls and instruction following in text; it is fastest and cheapest. Use basic voices for interruptions, latency and pauses. Save realistic accents, background noise and poor audio for reproducing production issues.

**Denoising failures**
When one run fails, re-simulate that scenario about 100 times. Failing 50 of 100 is a coin flip; 99 of 100 is a real bug; 1 of 100 may be fine. Teams should pick a reliability target per product area, as cloud teams pick nines.

**Evals as product strategy**
Choosing metrics means choosing what the product must be good at. Latency matters most for outbound sales, where the caller is about to hang up; less for a refund line. Appointment booking needs strict instruction following; a therapist or interviewer agent needs conversational flow. LLM-as-judge on "was this conversation successful" is noisy, so Coval's metric studio iterates the judge until it agrees with human labels before it runs on 10,000 conversations. Her suggested order: public benchmarks, benchmarks on your own data, task-based evals on single modules, then end-to-end evals, plus a defined process for routing production bugs into test sets.

She closes with a prediction: within three years every enterprise will launch a voice experience, and a poor one will feel like having no mobile app.

## Why it matters
- Gives a concrete eval ladder for voice agents, borrowed from autonomous vehicles: manual, scenario tests, then large-scale probabilistic simulation.
- The re-simulate-a-failure-100-times denoising tactic turns a single flaky failure into a measured failure rate.
- The realism hierarchy (text for logic, simple voices for timing, realistic audio for production repro) is a cheap way to cut simulation cost.
- Frames metric choice as product definition, with clear examples of how latency and instruction-following weigh differently by use case.
- Shows how to make LLM-as-judge trustworthy: calibrate it against a small set of human labels before scaling it.

## Metadata
- Video: https://www.youtube.com/watch?v=kDczF4wBh8s
- Duration: 19:32
- Playlist index: 144
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Hey everyone, I'm Brooke. I'm the founder of Koval and we are building evals for voice agents. So today I'm going to be talking a little bit about what can we learn from self-driving in building evals for voice agents. My background is from Whimo. So I led our eval job infrastructure team at Whimo that was responsible for our developer tools for launching and running simulations. And now we're taking a lot of the learnings from self-driving and robotics and applying them to voice agents. Um but first, why are voice agents not everywhere? They have this massive promise of being able to automate all of these really critical hard workflows autonomously. And I think probably a lot of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/kDczF4wBh8s.txt]]
- Description cue: The reliability challenges facing voice & chat AI deployment today mirror those that the autonomous vehicle industry confronted years ago. This talk explores how evaluation methodologies developed...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
