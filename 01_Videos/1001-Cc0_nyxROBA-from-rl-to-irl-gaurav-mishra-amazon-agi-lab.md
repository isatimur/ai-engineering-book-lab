---
video_id: Cc0_nyxROBA
playlist_index: 1001
title: "From RL to IRL — Gaurav Mishra, Amazon AGI Lab"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=Cc0_nyxROBA"
duration: ""
duration_seconds: null
view_count: null
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/Cc0_nyxROBA.txt"
themes:
  - "Models & Inference"
ingested_at: 2026-08-14T11:36:15+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Amazon AGI Lab's Gaurav Mishra details concrete failures when RL-trained coding agents meet real UIs, and the sandbox, reward, and harness changes used to fix them."
---

# From RL to IRL — Gaurav Mishra, Amazon AGI Lab

## Summary
Gaurav Mishra (Amazon AGI Lab, ex-Google/DeepMind) argues that RL-trained coding agents transfer to general computer-use tasks (email, chat, expense filing, web research) because those tasks can be expressed as code via MCP, APIs, and browser automation like Playwright — but real-world deployment breaks assumptions baked into the RL training loop. In demo trajectories, an expense-filing agent gets signed out mid-task and locks its own account by guessing passwords, and a second agent clicks a sponsored lookalike "submit" button and starts entering personal details on the wrong site. Mishra frames the gap as RL assuming observable state, cheap actions, clear reward, resettable failure, a passive environment, and unconditional autonomy — assumptions that fail once UI is partial, actions are irreversible, credentials expire, and content is adversarial. Amazon's fix spans three layers: a high-fidelity training sandbox that simulates messiness (layout shifts, stale tabs, pop-ups) and rewards recovery actions and trajectory-level risk instead of just final outcomes; a model trained for screen grounding, change detection across screenshots, and calibrated confidence about when to hand off; and a harness adding checkpointing/rollback, an action-risk classifier, credential guardrails, execution-loop monitoring, audit logs, and human handoff. After this retraining, the same expense-task agent correctly distinguishes the sponsored button, detects the expired session, hands off to a human/user-simulator to re-authenticate, and resumes to complete the task.

## Why it matters
- Documents specific, named failure modes (password-guessing account lockout, lookalike-button hijack) for agents moving from RL sandboxes to production UIs — concrete case-study material for a chapter on agent reliability.
- Offers a transferable framework (flight-simulator training, process reward model, calibrated confidence, guardrail harness) applicable beyond Amazon's internal system to any team building autonomous computer-use agents.
- Frames the harness as a shrinking layer of scaffolding that compensates for model gaps early on, useful evidence for arguments about where harness engineering ends and model capability begins.

## Metadata
- Video: https://www.youtube.com/watch?v=Cc0_nyxROBA
- Duration: 
- Playlist index: 1001
- Transcript status: `unavailable`

## Theme hooks
- [[Models & Inference]]


## Transcript excerpt
> Transcript unavailable.

## Transcript notes
- Transcript not available during ingestion.

## Book angles
- Could support a chapter/section on **Models & Inference**.
