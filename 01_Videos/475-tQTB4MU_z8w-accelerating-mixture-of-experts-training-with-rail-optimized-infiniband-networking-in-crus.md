---
video_id: "tQTB4MU_z8w"
playlist_index: 475
title: "Accelerating Mixture of Experts Training With Rail Optimized InfiniBand Networking in Crusoe Cloud"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=tQTB4MU_z8w"
duration: "17:45"
duration_seconds: 1065
view_count: 841
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/tQTB4MU_z8w.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:19:51+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "A Crusoe product manager for GPU networking explains why cluster networking decides training speed. Without optimisation, the all-reduce exchange between GPUs takes 25 to 30 percent of training time, and compute-communication overlap only trims that to about 25 percent. Crusoe builds rail-optimised InfiniBand fabrics, and NVIDIA's PXN feature routes cross-rail traffic through the in-host NVSwitch so every hop stays one leaf away. Fine-tuning an open sparse mixture-of-experts model (eight 7B experts) on 240 H100s ran 14 percent faster with PXN. He also covers Crusoe's climate-aligned data centres."
---
# Accelerating Mixture of Experts Training With Rail Optimized InfiniBand Networking in Crusoe Cloud

## Summary
The speaker is a product manager at Crusoe who owns GPU networking infrastructure (the captions garble his name). Half the talk introduces Crusoe Cloud; the other half makes one technical case: in distributed training the network, not the GPU, is often the bottleneck, and topology choices recover real training time.

**Crusoe Cloud in brief**
Crusoe is an AI cloud whose mission is "to align the future of computing with the future of climate". It powers data centres with stranded, wasted and renewable energy, aiming for net zero emissions. It has three data centres in the continental US, placed near those energy sources (Texas, the north central region, the East), and is building a large geothermal-powered one in Iceland that will also serve European customers. Its pillars are high performance (any glitch raises the customer's time and cost to train), ease of use for AI engineers rather than general-purpose cloud breadth, and climate alignment. Products: GPU VMs that join into training clusters, CPU instances for data preparation, ephemeral and persistent NVMe disks, block storage, a managed network file system in progress, VPC front-end networking with firewalls, and a separate back-end cluster network for GPU-to-GPU traffic. Everything is available by CLI, API and GUI. He names Together AI among partners using it for training, fine-tuning and sometimes inference, and others training new foundation models on it.

**The problem: idle GPUs during all-reduce**
After each training step all GPUs must exchange results through all-reduce. Without optimisation this takes about 25 to 30 percent of training time, while GPUs sit idle and customers still pay. Overlapping computation and communication helped one customer by only about 10 percent; roughly 25 percent of time still went to the network.

**Rail-optimised topology plus PXN**
A standard fat tree that connects each server to a single leaf creates a choke point and a single failure domain. In a rail-optimised design, GPUs inside a server talk over NVLink and NVSwitch; GPUs on different nodes but the same rail reach each other through one leaf, one hop away. Traffic to a different rail must climb to the spine, which adds a hop, risks bandwidth saturation and adds latency to all-reduce. A recent NVIDIA collective communications release added PXN, which uses the in-host NVSwitch to move traffic onto the right rail first, so cross-rail traffic still takes one hop.

**Results**
Synthetic collective tests showed about 50 percent improvement for small messages (where latency matters) and large messages (where bandwidth matters). But customers care about time to train. So the team fine-tuned an open-source sparse mixture-of-experts model, eight feed-forward experts of seven billion parameters each, on 240 H100 GPUs. Mixture of experts creates heavy all-to-all traffic. With PXN enabled, training was 14 percent faster, a figure that maps directly to training cost.

## Why it matters
- The 25 to 30 percent of training time lost to all-reduce, and the limited gain from overlap, put a number on why GPU networking belongs in any discussion of training cost.
- It explains rail-optimised topology and the one-hop cross-rail trick in plain terms, useful for chapters on infrastructure for large model training.
- The contrast between synthetic benchmark gains (about 50 percent) and the real 14 percent end-to-end speed-up on a mixture-of-experts fine-tune is a good lesson in measuring what customers pay for.
- Mixture-of-experts models stress the network more than dense models, which links model architecture choices to infrastructure needs.

## Metadata
- Video: https://www.youtube.com/watch?v=tQTB4MU_z8w
- Duration: 17:45
- Playlist index: 475
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] thank you for coming over to our session today a lots of really interesting stuff is happening on the AI World these days right uh with all the recent model developments and the GPU developments it is really cool to see all the use cases um however here I want to talk now a little bit about the infrastructure and the way how we can support the the newest models of the gpus and the newest um the newest models the machine learning models and how we can help that everything is working smoothly and fast and and productive so my name is yinko I'm a product manager at cruso uh my main responsibility is is the infrastructure and specifically GPU networking infrastructure and we are always...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/tQTB4MU_z8w.txt]]
- Description cue: State-of-the-art machine learning models are increasingly using techniques like mixture of experts that enable larger-scale models to be trained more efficiently by distributing layers of the...

## Book angles
- Could support a chapter/section on **Models & Inference**.

