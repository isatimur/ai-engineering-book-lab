---
video_id: jQDXzEVHMSE
playlist_index: 983
title: "Building Turbopuffer: Gergely Orosz (@pragmaticengineer ) × Simon Eskildsen (CEO)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=jQDXzEVHMSE"
duration: "56:30"
duration_seconds: 3390
view_count: 1900
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/jQDXzEVHMSE.txt"
themes:
  - "Evals & Reliability"
ingested_at: 2026-08-04T17:21:59+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Gergely Orosz (The Pragmatic Engineer) interviews Simon Eskildsen, founder and CEO of Turbopuffer, on how eight years of Shopify infrastructure work and a habit of napkin math led to a search engine built on S3. The first version was deliberately crude: cluster the vectors, store each cluster as a file, cache with a reverse proxy, run on one 8-core node, and launch on Twitter at a million vectors for a dollar. Cursor became the first customer and got a 95% lower bill. Eskildsen also covers the CPU shortage driven by RL and agents, his six reasons to raise capital, and remote 'campfires'."
---

# Building Turbopuffer: Gergely Orosz (@pragmaticengineer ) × Simon Eskildsen (CEO)

## Summary
Gergely Orosz, author of The Pragmatic Engineer, interviews Simon Eskildsen, founder and CEO of Turbopuffer. Orosz closes by noting that they talked "very little about AI" even though many AI companies use Turbopuffer as infrastructure. The thread is engineering judgment: first-principles cost math, radical simplicity, and trust.

**Shopify: failure testing at the database layer**
Eskildsen joined Shopify from high school in 2013 and stayed eight years, mostly on infrastructure, while the company grew fast and each Black Friday was worse than the last. Most scaling problems ended at the database. He built a matrix of how each service should behave when a component (for example the sessions store) is down. A first attempt used GDB to close a process's database file descriptor. He then built a thin proxy between the app and the databases that an API call can make slow or take down, so tests exercise the real drivers instead of mocks. It uncovered tens of issues in the MySQL driver and Rails, and he believes it still runs in Shopify CI.

**Napkin math over benchmarks**
He keeps a table of about 50 numbers (DRAM bandwidth, an S3 round trip, NVMe and EBS bandwidth, $2 per GB of memory versus 2 cents per GB of S3) and drills them with flash cards. When a team said a query took 10 seconds, his math said 10 milliseconds, so "one of us is wrong." One example: MySQL should top out at about 1,000 writes per second if each write needs a one-millisecond fsync, yet a small box did 10,000, because writes are batched.

**Why Turbopuffer exists**
Three things met: a bad search-engine project at Shopify, the napkin-math habit, and a recommendation engine he built for Readwise after ChatGPT launched. Vectors in memory would have cost 30 grand a month against about 5k for all other infrastructure, so it never shipped. He asked whether the vectors could live in S3 instead. S3 has a P99 of about 200 milliseconds on a 256–512 KB object, so design must minimize round trips and target the P99 or even the P999.

**The MVP of MVPs**
Version one: cluster the vectors, write each cluster to a file plus a centroids file, download the centroids, then fetch the nearest clusters. Caching was a reverse proxy in front of S3 on a single 8-core node. It launched in October 2023 at a million vectors for a dollar, against about $100 per million before. The core invariant was already there: all writes commit to object storage, so losing every VM loses no data.

**Cursor as first customer**
Cursor, then perhaps eight people, reached out after the Twitter launch. Eskildsen flew to San Francisco, helped them debug a database problem in person (autovacuum had not run enough), and earned trust. His co-founder Justine replaced the proxy cache with a direct file cache. Cursor migrated within a week or two, and its first bill was 95% lower than the last one with its previous vendor.

**Compute, capital and culture**
CPUs are now scarce: RL environments and agents both run on CPUs, so labs absorb them, and Turbopuffer stays flexible across many machine types. On capital, he first asked for about 700K and offered to return it if there was no PMF by year end. He lists six reasons to raise (R&D, growth, founder ego, employee liquidity, strategic partnership, M&A); Turbopuffer raised for R&D, then for employee liquidity. The company is fully remote, meets twice a year, runs ad hoc campfires, and grants turbo credits for business-class upgrades.

## Why it matters
- A worked case for napkin math: knowing about 50 hardware and cost numbers lets an engineer reject a misleading benchmark and size a product before writing code.
- Shows how object-storage-first design reshapes AI infrastructure economics: hot code bases in memory, everything else in S3, latency managed by minimizing round trips at the P99.
- Proof that a deliberately crude MVP (cluster files, a proxy cache, one node) can win a demanding AI customer, as long as the durability invariants are right from day one.
- Fault injection through a real proxy, not mocks, is a reusable pattern for testing how agent and application stacks behave when a dependency fails.
- First-hand signal that RL environments and agents shift infrastructure scarcity from GPUs toward CPUs, NVMe and DRAM.

## Metadata
- Video: https://www.youtube.com/watch?v=jQDXzEVHMSE
- Duration: 56:30
- Playlist index: 983
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]


## Transcript excerpt
> [music] All right. It's great to be here and today with me here I'm I'm Gerge, author of the pragmatic engineer and I'm excited to have a chat with Simon Ericson uh founder CEO of Turbopuffer a very technical CEO and we're going to have a pretty technical discussion but before we jump into it Simon I wanted to ask where did you fall in love with computers? um through PowerPoint. >> PowerPoint you I don't know if any of you know this but in power well you probably know this but in PowerPoint right you can make the the diagrams and stuff when you click them go to another slide that becomes touring complete real quick right you can sort of you know create very complicated convoluted games and...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/jQDXzEVHMSE.txt]]

## Book angles
- Could support a chapter/section on **Evals & Reliability**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://sirupsen.com/napkin>
