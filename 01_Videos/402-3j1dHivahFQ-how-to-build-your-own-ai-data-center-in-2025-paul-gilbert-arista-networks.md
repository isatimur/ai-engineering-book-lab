---
video_id: "3j1dHivahFQ"
playlist_index: 402
title: "How to Build Your Own AI Data Center in 2025 — Paul Gilbert, Arista Networks"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=3j1dHivahFQ"
duration: "23:00"
duration_seconds: 1380
view_count: 15106
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/3j1dHivahFQ.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:16:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Paul Gilbert, a tech lead at Arista Networks, explains the plumbing under enterprise AI: GPU networks behave unlike any data-center network his team has built. Training uses an isolated back-end network where synchronised GPUs burst at wire rate, so it must have no oversubscription; one H100 server can push 4.8 terabits, and 800-gig parts double that. One slow GPU or bad cable stalls the whole job, so job completion time is the metric. He covers load balancing on uplink use instead of five-tuple hashing, ECN and PFC flow control, 100-200 kW water-cooled racks, RDMA drop telemetry, a GPU-side agent that checks switch config, and the Ultra Ethernet Consortium."
---
# How to Build Your Own AI Data Center in 2025 — Paul Gilbert, Arista Networks

## Summary
Paul Gilbert is a tech lead at Arista Networks in New York who designs enterprise networks. He calls his work "the plumbing": not agents, but the infrastructure for training and inference. His thesis: AI networks break the habits of classic data-center design, and job completion time is the number that matters.

**Three networks**
An AI data center has a back-end network for GPUs, a front-end network for storage, and a separate place to serve the trained model for inference. The back end is fully isolated, because GPUs are expensive, power-hungry and hard to get. Servers hold eight GPUs and connect to leaf and spine switches with nothing else attached. He keeps routing simple: BGP on point-to-point links. As a sizing example he shows a model trained on 248 GPUs for one to two months that then runs inference on four H100s.

**Why the traffic is different**
- One H100 server has eight 400-gig GPU ports plus four 400-gig front-end ports: 4.8 terabits per server. With 800-gig parts it becomes 9.6 terabits. Enterprise servers used to have one to four 100-gig links.
- GPUs synchronise and burst at the same moment, at wire rate. So the back end is built one-to-one, with no oversubscription. Classic data centers ran at 1:10 or 1:3.
- Traffic is east-west among GPUs and north-south to storage. Storage traffic is calmer, around 100-200 gig.
- Classic load balancing hashes the five-tuple, but GPU flows share one IP address and can pile onto one uplink. Arista balances on the percentage of uplink bandwidth in use and reaches about 93% utilisation. A newer mode balances on the collective being run.
- A web app fails over; a GPU job may simply fail. Thousands of GPUs mean many optics and cable faults.

**Power and cooling**
A typical rack draws 7-15 kW, but one eight-GPU server draws 10.2 kW. Enterprises now build 100-200 kW water-cooled racks.

**Congestion control**
He uses ECN as an end-to-end slow-down signal and PFC as an emergency stop, the two parts of a scheme the captions render as "Rocky V2". Some packet drops are fine, he says, but because GPUs are synchronised, one slow GPU slows everything. Arista also tunes switch buffers to the packet sizes that models send.

**Visibility**
- RDMA drop analysis: when a switch drops a packet, it snapshots the headers and records why.
- A GPU-side agent talks to the switch, confirms that both sides configure ECN and PFC the same way, and reports RDMA errors, so teams can tell a GPU fault from a network fault.
- Smart system upgrade patches switch software without taking it offline, so a 1,024-GPU, 64-switch cluster keeps training.

**What comes next**
800 gig is current; he expects 1.6 terabits soon. A 16-slot chassis takes 576 800-gig or 1,152 400-gig GPUs. The Ultra Ethernet Consortium wants to move congestion control and packet spraying into the NICs. His closing test: if a job took one hour yesterday and four days today, "it's probably our problem".

## Why it matters
- It gives AI engineers the network-side vocabulary (back end versus front end, oversubscription, ECN and PFC, collectives) they need to talk to infrastructure teams.
- The per-server bandwidth and rack power numbers make the physical cost of self-hosted training concrete.
- Synchronised GPUs turn one slow GPU or bad cable into a cluster-wide slowdown, which explains why job completion time, not uptime, is the metric.
- The GPU-to-switch agent and RDMA drop snapshots show the telemetry needed to separate GPU faults from network faults.
- His advice to ask data scientists what models and collectives they run ties model design to network design.

## Metadata
- Video: https://www.youtube.com/watch?v=3j1dHivahFQ
- Duration: 23:00
- Playlist index: 402
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] my name is Paul Gil I'm a tech lead for Arista networks I I have an accident but I'm actually based here in New York City and I build or designed or help build and design uh Enterprise networks uh but what we do is a plumbing uh so I'm not going to talk about agents but more kind of how you train uh models what the infrastructure looks like and how you do inferencing on on the infrastructure uh I I I normally teach people uh the very basic stuff so I I you guys probably know this already but these are new terms for us when when we built computer networks people will come to us and say job completion time uh barrier I'm I'm pretty sure you guys know that the the INF and the question...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/3j1dHivahFQ.txt]]
- Description cue: This presentation talks to AI Executives who are tasked with building self managed AI Networks. It will talk about some new terminology that is used, list the key considerations around power...

## Book angles
- Could support a chapter/section on **Models & Inference**.
