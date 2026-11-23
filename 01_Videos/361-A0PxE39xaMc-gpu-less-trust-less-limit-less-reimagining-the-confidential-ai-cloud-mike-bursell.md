---
video_id: "A0PxE39xaMc"
playlist_index: 361
title: "GPU-less, Trust-less, Limit-less: Reimagining the Confidential AI Cloud - Mike Bursell"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=A0PxE39xaMc"
duration: "43:41"
duration_seconds: 2621
view_count: 4763
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/A0PxE39xaMc.txt"
themes:
  - "Models & Inference"
  - "Security & Guardrails"
ingested_at: "2026-04-24T12:15:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Mike Bursell presents Super Protocol, a confidential AI cloud and marketplace. His thesis: data and models are most exposed while they are processed, and trusted execution environments (Intel TDX, AMD SEV-SNP, Nvidia GPU TEEs) fix this by isolating workloads and producing cryptographic attestation, so you verify instead of trusting the provider. GPU-less means no lock-in to one GPU vendor or cloud; trust-less means verifiable by design; limit-less means fewer legal and organizational blockers. Case studies cite 319% more ad training data and audits cut from weeks to hours. Demos cover model leasing, an n8n medical workflow, distributed vLLM across four TEE hosts, and multi-party training with on-chain proof."
---
# GPU-less, Trust-less, Limit-less: Reimagining the Confidential AI Cloud - Mike Bursell

## Summary
Mike Bursell's session is a product walkthrough of Super Protocol, a confidential AI cloud and marketplace for models, data and compute. Much of it is pre-recorded demo narration. The thesis: trust holds AI back, because data and models are most vulnerable not at rest or in transit but while they are processed, in training, fine-tuning or inference.

**Confidential computing basics**
A trusted execution environment (TEE) is an isolated part of the processor, such as Intel TDX, AMD SEV-SNP or Nvidia GPU TEEs. Code and data stay protected in memory, invisible to the host OS, the hypervisor, and even the hardware owner. The TEE also produces a signed attestation that the workload ran on genuine hardware with unmodified code. That proof tells you what the workload is and that the chip is real.

**Problems it targets**
Hospitals will not share raw clinical data. Personal agents need deep access to inboxes and documents. Marketers cannot train on user behavior under privacy law. Model authors will not hand over weights, and customers will not hand over data. And model provenance is hard to prove: was the model really trained where and how you say?

**The three words**
- GPU-less: not removing GPUs, but removing dependency on a single cloud or GPU provider. You do not buy GPUs or rent them longer than you use them.
- Trust-less: verifiable by design. Every run produces a cryptographic proof of what ran, where and how.
- Limit-less: fewer legal, technical and organizational blockers, including for non-deterministic, multi-party agent systems.
The platform is TEE-agnostic, built on swarm computing with no single point of failure, orchestrated by smart contracts on BNB Chain, and planned to be fully open source, like HTTPS for AI.

**Case studies**
- An ad-testing company that reads facial expressions needed more biometric video for a Mars project. With provable confidentiality, partners shared four times more footage, the training set grew 319%, accuracy reached 75%, and Mars saw a 3 to 5% sales lift across 30 brands in 19 markets.
- The Brain Electrophysiology Laboratory used Titonix's AI audit tool for an FDA submission inside TEEs. Audit time dropped from two to four weeks to one to two hours, with no exposure of either party's IP.

**Demos**
- Marketplace: deploy a DeepSeek model on an H100 in about 20 minutes. Models can be leased but not downloaded, then verified as running in a confidential environment.
- An n8n workflow in a TEE takes an X-ray and patient data from a web form, separates personal data from diagnostic input, sends only the image and symptoms to the model, and emails a report.
- Distributed vLLM: four hosts each run a node in a confidential VM over an encrypted overlay network to serve a 22B Mistral model, with on-chain hash checks for each node.
- Multi-party training: two data owners and one engine owner train a cancer-detection model. A trusted loader checks certificates and hashes and blocks the job on any mismatch. Only the engine owner gets the encrypted result, inputs are wiped, and a signed integrity report goes on chain.

## Why it matters
- States the core case for confidential computing in AI: protect data in use, not only at rest and in transit, and prove it with attestation.
- Shows a pattern for multi-party training where no party, host or platform sees the others' data or IP, with hash checks that stop a job on any mismatch.
- The n8n demo shows data minimization inside a workflow: strip personal data before the model call, then rejoin it for the report.
- A vendor talk, so treat its case-study numbers as claims, but useful as a map of what TEE-based AI infrastructure can do.

## Metadata
- Video: https://www.youtube.com/watch?v=A0PxE39xaMc
- Duration: 43:41
- Playlist index: 361
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[Security & Guardrails]]

## Transcript excerpt
> [Music] AI is transforming everything. Healthcare, finance, automation, digital marketing. But one thing holds it back, and that's trust. How do you run models on sensitive data without handing it over? How do you deploy proprietary models without losing control? And how do you collaborate, especially in non-deterministic environments, without relying simply on blind trust? Well, that's what confidential AI solves. And that's what Super Protocol makes real. GPUless, trustless, limitless. And this session is about what those words actually mean and how developers can apply them to run, scale, and monetize AI workloads securely. So whether you're building with sensitive data, proprietary...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/A0PxE39xaMc.txt]]
- Description cue: What happens when private AI models or sensitive data need to run in the public cloud?

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **Security & Guardrails**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://developer.nvidia.com/blog/exploring-the-case-of-super-protocol-with-self-sovereign-ai-and-nvidia-confidential-computing>
