---
video_id: LqLoYksJ6do
playlist_index: 899
title: "We Gave an Agent Production Code Access and Then Tried to Sleep at Night — Moritz Johner, Form3"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=LqLoYksJ6do"
duration: "21:57"
duration_seconds: 1317
view_count: 657
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/LqLoYksJ6do.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-07-26T22:21:35+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Moritz Johner of Form3 presents Patch Pilot, an agent that fixes CVEs in container images across thousands of repositories where Dependabot and Renovate fall short. His thesis: a useful coding agent with production credentials is a supply chain actor, so the blast radius of an agent is an architecture decision. A boring deterministic Go controller holds GitHub write and CI credentials; agents only edit files. He covers minimal-change prompts, agent retrospectives, prompt-injection evals, why a Docker socket breaks every sandbox, and his Firecracker microVM design with host-side network policy."
---

# We Gave an Agent Production Code Access and Then Tried to Sleep at Night — Moritz Johner, Form3

## Summary
Moritz Johner works at Form3, a finance company with thousands of repositories. His subject is dependency patching, a backlog that never empties. Dependabot and Renovate only bump versions in a manifest. They miss CVEs in OS packages of a base image or in binaries a Dockerfile downloads, and they ignore knock-on effects: bumping the Go runtime may force a linter bump, whose new rules break the code. That is a reasoning problem, not a patching problem. So the team built Patch Pilot and ran it in production. Then Infosec asked whether it was automation or a supply chain incident waiting to happen. His thesis: an agent with production credentials is a supply chain actor, like an engineer, and needs the same guardrails.

**Two layers: deterministic controller, agentic reasoning**
A deliberately boring Go app discovers vulnerable OCI images, scans them, and maps each image to its repository. It clones the repo and writes a context directory: a roughly 2,000-word prompt plus the assessment manifest. A CVE remediation agent makes the smallest effective change set, bumping only to the version that fixes the CVE, then verifies its work by building and rescanning the image. It only edits files. The controller vets the changes (empty files, stray compiled binaries), commits, pushes, opens the PR and watches CI. On failure, a PR remediation agent gets CI logs and metadata and makes minimal fixes; it must be told not to revert its earlier changes. The loop runs to a retry limit, then hands off to a human.

**Retrospectives as observability**
After each run, the agent writes a short retrospective: what went well, what went wrong, missing tools, useful context. Aggregated across PRs, these show two issue types: infrastructure (network failures, missing clone permissions) and repository complexity, fixed with system-prompt changes or repo-specific instructions. In one redacted example the agent updated libcrypto3 and libssl3 and removed two pinned packages the new base image already fixed, which Johner admits he would have missed.

**Credentials split by layer**
The dangerous capabilities, GitHub write and CI triggers, stay in the deterministic layer. Prompt injection is not solved, so the only defense is limiting blast radius. One small PR changed 70,000 lines, a wide attack surface. The team steers the agent to distrust vendor directories and CI logs, and runs an end-to-end eval on a crafted repo with a deprecated function and a migration guide that try to recruit the agent. Unknown vectors remain, but the system does not rest on hope.

**The Docker socket problem**
To verify work, the agent wants to build and run containers. Giving it the Docker socket is "game over": it can start a privileged container, escape, read other processes' memory and plant SSH keys. Landlock, Bubblewrap, seccomp, Kaniko and BuildKit do not compose with containers or contain a Docker daemon. The design: a Firecracker microVM holding the agent and a Docker daemon with its own kernel, cut off from the host except a vsock. A host process applies network policy by hostname, port or CIDR, optionally with a custom CA for TLS inspection. He calls the built-in sandboxes of Codex and Claude worthless once a Docker socket is involved; he would pick the open-source microsandbox project today. Sandbox tooling exists but is mostly beta.

## Why it matters
- A crisp, reusable rule: decide what is deterministic and what is agentic, and that split becomes the security model.
- Concrete evidence that keeping write and CI credentials out of the agent limits damage when prompt injection succeeds.
- Per-run agent retrospectives are a cheap observability technique that surfaces missing tools and context at scale.
- Explains why handing an agent a Docker socket defeats most sandboxes, and offers a microVM with host-side network policy as the alternative.
- Prompt-injection evals with a crafted repository show how to test a production agent against known attack patterns.

## Metadata
- Video: https://www.youtube.com/watch?v=LqLoYksJ6do
- Duration: 21:57
- Playlist index: 899
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Thanks everyone for joining in. Um thanks for the great intro, by the way. Um So, yeah. My talk today is about um so titles we give in Asia production code access and then try to sleep at night. Um so, it's mostly around dependency dependency patching, which is probably the most glamorous problem in software engineering. I guess everyone did it here at some point in the past. Um it really is like vacuuming. Like everyone loves it, can't wait to do do it again next week. Now, at our scale, we have thousands of repositories and it really is a backlog that never empties and you close 10 issues today and you know next week 20 more will arrive and you have to deal with them. So,...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/LqLoYksJ6do.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- repo: <https://github.com/external-secrets/external-secrets>
