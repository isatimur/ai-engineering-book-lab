---
video_id: "BS92RdBvI90"
playlist_index: 276
title: "Your Personal Open-Source Humanoid Robot for $8,999 — JX Mo, K-Scale Labs"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BS92RdBvI90"
duration: "19:26"
duration_seconds: 1166
view_count: 41557
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/BS92RdBvI90.txt"
themes:
  - "Org Design & Leadership"
ingested_at: "2026-04-24T12:11:41+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "JX Mo, a founding engineer at K-Scale Labs, a 15-person Palo Alto startup, argues that humanoid robots should be open source, affordable and easy to program rather than proprietary and expensive. He presents the K-Bot, a 4-foot-11 aluminum humanoid with an RL walking controller, priced around $9,000 against about $40k for the next cheapest option, and the 1.5-foot Z-Bot on the same software stack. Everything is to be open: bill of materials, CAD, PCBs, firmware and models. A pip-installable SDK, a simulator that switches to the real robot by changing an IP address, and a GPU-accelerated RL library that trains walking in one to two hours lower the barrier."
---
# Your Personal Open-Source Humanoid Robot for $8,999 — JX Mo, K-Scale Labs

## Summary
JX Mo is a founding engineer at K-Scale Labs, a team of about 15 people in Palo Alto that builds open-source humanoid robots, from hardware to software to ML models, for developers. He contrasts this with the humanoids getting hype today, which he calls proprietary and expensive. K-Scale's goal is general-purpose robotics for everyone, with the whole stack open so the benefit does not go to a few companies.

**The K-Bot**
A 4-foot-11 humanoid built in about five months, with a full aluminum body, an RL locomotion controller and a near-complete sensor set. In the demo, visitors kick it and the controller recovers. It supports VR teleoperation. Specs include MIT Cheetah-style actuators, audio modules, displays, cameras and up to 250 TOPS of compute, with several compute options at launch.
- Price: about $9,000, which he calls the most affordable developer and research grade humanoid. The next cheapest is around $40k; a common robot arm costs about $15k.
- Open source: an open bill of materials, CAD, electronics, PCBs, software and ML models, so anyone can replicate it.
- Modular: swap a five-finger hand for a parallel gripper, change 5-DoF arms for 7-DoF arms, and bolt on new legs, arms, or a new head as compute improves. Software updates ship over the air, about weekly.
- It began as a 3D-printable full-size humanoid project, went through a prototype, and moved to mass manufacturing with partners. Pre-orders are open, with delivery by October.

**The Z-Bot**
A 1.5-foot humanoid that began as a hackathon project and spread on Twitter and WeChat. It runs the same locomotion and software stack, so an app written for the small robot runs on the big one. It was inspired by a Google DeepMind robot soccer paper. The 3D-printed version has a Discord of about 5,000 people, and a few hundred have built one.

**The software stack**
The autonomy design is a standard dual policy: a VLA as the high-level controller and an RL whole-body locomotion policy below it, with firmware written in Rust. The goal is an app-store model, where any developer writes a Python app that others can reuse.
- An open-source library for GPU-accelerated robot learning built on MJX. Training a walking policy takes about 500 lines and one to two hours on a GPU, with TensorBoard for rewards and losses.
- An operating system with a Python and Rust interface, installed with pip and reached by IP address, as a simpler alternative to ROS.
- A digital twin simulator with the same gRPC interface. Moving from sim to the real robot means changing the IP address.
- Work to integrate and fine-tune generalist policies such as Pi Zero and Nvidia's.
He claims this gets a robot working in a tenth of the usual setup time. A small team keeps pace through MIT-licensed code, public bounties and monthly hackathons.

**Q&A**
The battery clicks in and lasts about two hours of walking, with wall pass-through power. K-Scale bets on being the first US consumer humanoid company, not B2B; early buyers came through a Shopify page by accident. Household chores still depend on teleoperation, because he says nobody has a fully working VLA yet. He skipped ROS because the robot is policy-based with few sensors, and after bad ROS setup experiences. He puts Tesla Optimus at about $60k at least, stronger but not very different in use.

## Why it matters
- Shows how open hardware and an open stack (bill of materials to models) could push humanoid prices from tens of thousands of dollars to around $9,000 for developers.
- Gives a concrete sim-to-real workflow: MJX RL training in one to two hours, evaluation in a digital twin, and deployment by changing one IP address.
- States a common humanoid architecture plainly (high-level VLA plus low-level RL whole-body policy) and admits VLAs are not yet good enough for household tasks.
- Illustrates a developer-platform strategy for robotics: a pip-installable SDK, a shared stack across robot sizes, and an app-store model instead of ROS-heavy setup.

## Metadata
- Video: https://www.youtube.com/watch?v=BS92RdBvI90
- Duration: 19:26
- Playlist index: 276
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Org Design & Leadership]]

## Transcript excerpt
> [Music] Hello everyone. My name is Jax and uh I'm a founding engineer at Kskll Apps. We build opensource human robots from hardware to software to um machine learning models and we build it especially for developers. Yeah. So, humanoids have been have been getting a lot of hype recently. You sell the Tesla Optimus, you have Uni robots, you have uh 1X and etc. Um they're quite proprietary and they're quite expensive. And the humanoids are getting so much hype is because of very big problems like physical labor shortage, consumer household and also like offro off off-world exploration and etc. Yeah. So for us at Kscale Labs, our goal is to really solve general purpose uh robotics for everyone...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BS92RdBvI90.txt]]
- Description cue: Introducing developer ready robots that are open-source, affordable, and easy to use.

## Book angles
- Could support a chapter/section on **Org Design & Leadership**.
