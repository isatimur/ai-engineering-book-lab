---
video_id: UNzCG3lw6O0
playlist_index: 804
title: "Building Great Agent Skills: The Missing Manual"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=UNzCG3lw6O0"
duration: "20:43"
duration_seconds: 1243
view_count: 115000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/UNzCG3lw6O0.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:48:22+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Matt Pocock, author of one of the most popular engineering skill repos, says developers are stuck in 'skill hell': many free skills, no shared rubric to tell good from bad. His four-part checklist: trigger (user-invoked skills cut agent context load and unpredictability but add cognitive load on the user), structure (steps plus reference, a small SKILL.md, branch-only material behind context pointers), steering ('leading words' like 'vertical slice' that the agent repeats in its reasoning, and splitting skills to force more legwork per step), and pruning (duplication, sediment, no-ops found by deletion tests)."
---

# Building Great Agent Skills: The Missing Manual

## Summary
Matt Pocock recorded this talk remotely for the AI Engineer World's Fair after family matters kept him from San Francisco. He maintains the Matt Pocock skills repo, one of the most popular engineering skill sets. His diagnosis: after tutorial hell and framework hell, developers now live in "skill hell". Skills are free to download, but nobody can tell a good one from a bad one, and organizations cannot turn their procedures into skills. The missing piece is a shared rubric, so he gives a four-part checklist and ships it as a skill called writing great skills.

**1. Trigger: user-invoked or model-invoked**
A skill's description is a "context pointer" that sits in the agent's context and points to the SKILL.md. Model-invoked skills keep that pointer visible; user-invoked skills hide it (his grill me skill sets disable model invocation to true). Each model-invoked skill adds context load: tokens on every request and one more thing to think about, so a hundred skills means a hundred descriptions. The model may also skip a pointer even when the skill fits, so you end up having to eval whether skills fire. User-invoked skills remove that class of problem but add cognitive load on the user. He contrasts his user-invoked set with Superpowers, which is mostly model-invoked. Both choices have costs.

**2. Structure: steps and reference**
Most skills hold two units: a step-by-step procedure and the reference that supports it. His to-PRD skill has three steps (find context, confirm test seams with the user, write the PRD) and two references (what a test seam is, and a markdown PRD template). Keep SKILL.md as small as possible: easier to maintain and audit, and fewer tokens. Look at branches. His domain modeling skill may update a context.md glossary, write ADRs, or do neither, so those templates move to separate files behind context pointers, which he calls external references.

**3. Steering: leading words and legwork**
The main technique of the talk. A leading word packs a lot of meaning into a short phrase. Agents repeat it in their thinking and output, and that changes behavior. Agents tend to code layer by layer (database, schemas, API, front end). Instead of a paragraph saying not to, use "vertical slice" consistently through the skill, then check the reasoning traces for "thin vertical slice". Second lever: legwork. In every plan mode he tried, the agent rushes the clarifying-questions step because it can see the plan is the goal. His fix splits the phases into two skills, grill with docs and then to-PRD, so the agent sees one step at a time.

**4. Pruning**
Massive skills are a symptom. Watch for duplication (one source of truth per piece), sediment (shared files where nobody dares delete, so restructure, move or kill stale parts), and no-ops, common in agent-written skills. Test a no-op by deleting it: a paragraph telling the agent to write a long commit message probably changes nothing.

## Why it matters
- It names a real cost trade-off between context load on the agent and cognitive load on the user, which turns the number of installed skills into a design decision.
- Leading words come with a check you can run: the phrase should show up in the reasoning traces, which gives a cheap way to see if the steering worked.
- Hiding future steps to force legwork explains a common plan-mode failure and gives a structural fix rather than a stronger prompt.
- The deletion test for no-ops is a simple, repeatable way to shrink agent-written instructions.
- The checklist is also a review tool for community skills before you pull them in.

## Metadata
- Video: https://www.youtube.com/watch?v=UNzCG3lw6O0
- Duration: 20:43
- Playlist index: 804
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> Hello friends, I was dearly hoping to be able to come to the Air Engineer World's Fair, but family matters have intruded and I'm not able to make it. However, I will not be leaving you empty-handed. I'm going to give you the talk that I would have given in San Francisco. This talk is called The Missing Manual, How to Write Great Skills, and I think that the ability to distinguish good skills from bad skills is only getting more important. As developers, we seem to be pretty talented at finding different forms of hell for us to go to. In like a few years ago, we had tutorial hell, which is where you would go into a bunch of tutorials trying to learn something, not be able to piece it...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/UNzCG3lw6O0.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/mattpocock/skills>
