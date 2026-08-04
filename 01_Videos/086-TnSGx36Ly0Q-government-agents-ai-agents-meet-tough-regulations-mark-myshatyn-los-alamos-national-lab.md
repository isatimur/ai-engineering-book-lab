---
video_id: "TnSGx36Ly0Q"
playlist_index: 86
title: "Government Agents: AI Agents Meet Tough Regulations — Mark Myshatyn, Los Alamos National Lab"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=TnSGx36Ly0Q"
duration: "16:31"
duration_seconds: 991
view_count: 2287
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/TnSGx36Ly0Q.txt"
themes:
  - "RAG & Retrieval"
  - "Agent Architecture"
ingested_at: "2026-04-24T11:22:20+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Los Alamos's Mark Myshatyn describes an agent that read fusion-capsule research papers and ran real hydrodynamic simulations on LANL's HPC, then details the federal compliance stack (NIST 800-53, FedRAMP, DoD CC SRG, OMB M-25-21/22) agentic tools must clear to be fielded."
---
# Government Agents: AI Agents Meet Tough Regulations — Mark Myshatyn, Los Alamos National Lab

## Summary
Mark Myshatyn, enterprise AI architect at Los Alamos National Laboratory, describes an agent tasked with designing an inertial confinement fusion (ICF) capsule for sister lab Lawrence Livermore: given one paper, told to read related literature, form a hypothesis, and then actually execute code — running thermodynamic/hydrodynamic simulations on LANL's high-performance computing assets, including its Venado supercomputer (2,500+ Grace Hopper superchip nodes, built with Nvidia and HPE) — to produce an optimized capsule design. He contrasts that single demo with the scale of the real problem (20,000 researchers across 40 square miles and 13 nuclear facilities) and lays out the compliance stack any agentic tool must clear to be fielded at LANL: NIST 800-53 Rev. 4 (over 1,000 controls), FedRAMP authorization, DoD's Cybersecurity/Compliance Security Requirements Guide with its impact levels, CNSSI 1253, and two just-issued OMB memoranda (M-25-21 and M-25-22) that require agencies to define AI governance and risk tiers within a 180-day rulemaking window. He closes with four asks for vendors wanting to sell agentic tools to government: build for explainability, build for isolation/self-hosting (since LANL can't rely on hyperscaler clouds for classified work), build for governance (e.g., providing a software bill of materials), and don't let the federal version of your product lag years behind the commercial release.

## Why it matters
- Documents a real, executed (not merely proposed) agentic science workflow — literature review to hypothesis to running physics simulations on HPC infrastructure — as evidence agents can be wired into consequential, safety-critical R&D pipelines.
- Names the specific compliance regime (NIST 800-53, FedRAMP, DoD CC SRG impact levels, CNSSI 1253, OMB M-25-21/22) that regulated-environment AI engineering has to satisfy, useful ground truth for any chapter on deploying agents under enterprise or government constraints.
- The four vendor requirements (explainability, isolation/self-hosting, governance artifacts like an SBOM, and release-speed parity with commercial versions) are a concrete checklist for engineering agentic products for high-compliance buyers, not just consumer or startup contexts.

## Metadata
- Video: https://www.youtube.com/watch?v=TnSGx36Ly0Q
- Duration: 16:31
- Playlist index: 86
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]
- [[Agent Architecture]]

## Transcript excerpt
> All right. So, good morning. My name is Mark Mashottton. I'm our enterprise AI architect at Los Alamos National Laboratory. Uh, today, you know, this is an AI conference. What What's a nuclear science lab doing here? The reality is we've actually been doing applied a IML for almost 70 years. Uh this is actually one of our scientists in 1956 uh playing Los Alamos chess uh in front of one of our first supercomputers, Maniac 1. And what's unique about this is we if you look at it, there's actually no bishops on the chessboard. You know, we we've been doing applied statistics and applied machine learning since we didn't have the memory needed to hold an entire chessboard in a computer at once....

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/TnSGx36Ly0Q.txt]]
- Description cue: Lightning talk given at the 2025 AI Engineer World's Fair.

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.
- Could support a chapter/section on **Agent Architecture**.
