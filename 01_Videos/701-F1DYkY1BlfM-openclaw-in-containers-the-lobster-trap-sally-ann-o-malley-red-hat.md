---
video_id: F1DYkY1BlfM
playlist_index: 701
title: "OpenClaw in Containers: The Lobster Trap — Sally Ann O'Malley, Red Hat"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=F1DYkY1BlfM"
duration: "21:56"
duration_seconds: 1316
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/F1DYkY1BlfM.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-05-24T23:36:42+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Sally Ann O'Malley, a Red Hat engineer in the emerging tech org, makes the operational case for running OpenClaw (and AI workloads generally) in containers via Podman on a developer machine and Kubernetes in production. Her concrete setup: Podman secrets for API key isolation, OpenClaw secret refs as a second layer, volumes for persistent state, a custom local installer CLI she open-sourced for repeatable pod creation. Real-world data point from NVIDIA: a team of ~10 engineers running OpenClaw in Kubernetes for model evals reported doing 'the work of six engineers.' The broader vision is container-packaged baseline OpenClaw configurations distributed to new hires as reproducible, company-approved environments."
---

# OpenClaw in Containers: The Lobster Trap — Sally Ann O'Malley, Red Hat

## Summary

Sally Ann O'Malley spent her first 7 years at Red Hat on containers, Linux security, and Kubernetes/OpenShift. She's been in the emerging tech org for the last 5 years and has been doing AI work for 3 of them. When she first saw OpenClaw she immediately tried to run it on OpenShift — and got colleagues telling her it was a "security nightmare." Her response: that's exactly what containers are for.

**Why containers for OpenClaw**

O'Malley's case is straightforward: containers are reproducible, isolate secrets, are portable across infrastructure (laptop, x86, M1 Mac, Kubernetes), and give you a natural sandbox. Backing state to volumes means backup/recovery is a clean story — she backs up her personal "forever claw" nightly with a systemd service.

**The secrets problem**

The specific security concern about OpenClaw running natively is API key exposure. Her layered solution:
- **Podman secrets**: API keys stored as Podman secrets (not environment variables), mounted into the container. Equivalent approach exists with Kubernetes secrets.
- **OpenClaw secret refs**: OpenClaw has a built-in secret reference feature where the config points to a secret ref rather than an inlined key. Combining Podman secrets + OpenClaw secret refs means the key never appears in logs or config files as a literal string.

**The installer CLI**

O'Malley built a personal CLI tool (open-sourced on GitHub) for spinning up OpenClaw containers. The demo shows: give it a name, select providers (she uses OpenRouter first, Anthropic as fallback, with a local endpoint option), opt into an OpenTelemetry/Jaeger collector for observability, optionally configure the SSH sandbox feature (OpenClaw can run commands in a remote SSH workspace). A pod spins up in ~2 seconds. The tool wraps a Podman command with all her opinionated defaults; Docker support is also in scope.

**Scaling to Kubernetes**

The same container setup lifts directly to Kubernetes: Kubernetes secrets replace Podman secrets; PVCs replace volumes. O'Malley's installer also provisions against Kind clusters and OpenShift. She shared an anecdote from PyTorch Con: an Nvidia team of ~10 engineers runs their model eval workflows in Kubernetes with OpenClaw instances per engineer, periodically syncing with eval results — and reported it was doing "the work of six engineers."

**The enterprise vision**

O'Malley's endpoint is a standardized company-issued OpenClaw container that new hires receive on day one: pre-configured with company-approved MCP servers, authentication flows, team-specific skills, and read access to shared resources like Google Drive. Individual employees can personalize on top of this base. The alternative — having each new hire cobble together their own config from a colleague's repo — doesn't scale.

## Why it matters
- The double-layer secret isolation pattern (host secrets + OpenClaw secret refs) is a practical reference implementation for teams worried about API key exposure in agentic environments.
- Container-packaged baseline agent configurations is a concrete answer to the "how do you onboard a team to AI tooling" question that most organizations haven't yet solved.
- The NVIDIA eval-team data point (10 engineers + OpenClaw in Kubernetes ≈ work of 6 additional engineers) is one of the few direct productivity claims with an organizational context behind it.

## Metadata
- Video: https://www.youtube.com/watch?v=F1DYkY1BlfM
- Duration: 21:56
- Playlist index: 701
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Hey, um I'm Sally. I work at Red Hat. I've been there for about 10 years and uh the first 7 years, awesome, totally cool. I was working on containers and uh Linux security stuff and Kubernetes. Um in OpenShift. That's what I did for the first 7 years. And then uh about 3 years ago, well about 5 years ago, I moved to the emerging tech org and that was awesome, too, because now I'm not totally tied to a product. I get to just work on what I want. I get to just try out new things. Awesome. And then about 3 years ago it was like all AI all the time, everything AI. I know not I knew there was a data science team at Red Hat. I had no idea what they did. Machine learning something...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/F1DYkY1BlfM.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
