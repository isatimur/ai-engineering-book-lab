---
video_id: "zZsTVBXcbow"
playlist_index: 13
title: "How Google DeepMind is researching the next Frontier of AI for Gemini — Raia Hadsell, VP of Research"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zZsTVBXcbow"
duration: "20:37"
duration_seconds: 1237
view_count: 80444
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/zZsTVBXcbow.txt"
themes:
  - "Models & Inference"
  - "RAG & Retrieval"
ingested_at: "2026-04-24T09:58:46+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Raia Hadsell, VP of Research at Google DeepMind (about 1,200 scientists and engineers across 10 labs) and a UK AI ambassador, opens AI Engineer in London with three frontier projects that are not language models. Her thesis: DeepMind looks for 'root nodes', the deepest unsolved problems, and that work now spans omnimodal Gemini embeddings with Matryoshka dimensions, AI weather models (GraphCast, GenCast, FGN) that beat physics-based forecasts, and the Genie world models, where Genie 3 generates interactive, promptable worlds with memory."
---
# How Google DeepMind is researching the next Frontier of AI for Gemini — Raia Hadsell, VP of Research

## Summary
Raia Hadsell has been at DeepMind for almost 13 years. She studied philosophy of religion in the 1990s, did a PhD in New York on convolutional networks for robots with Yann LeCun, and joined DeepMind when it had 30 to 40 people. She now helps run about 1,200 scientists and engineers across 10 labs, and this year she is a UK AI ambassador. Her opening keynote for AI Engineer in London covers three frontier projects, with a deliberate theme: things that are not language models. DeepMind's approach, she says, is to find "root nodes", the deepest unsolved problems, not "the leaves".

**Embeddings: the companion to generative AI**
She starts with the "Jennifer Aniston cell" from neuroscience: a small set of neurons that fires for one person whatever the modality, which the brain uses for fast retrieval, recognition and comparison. Embedding models aim for the same, trained with contrastive losses; her PhD work on Siamese networks was an early form of this. The new Gemini-derived embedding model is fully omnimodal. One vector can represent text (the captions give a limit of about 8K tokens), 128 seconds of video, 80 seconds of audio, or a full PDF, with no lossy step to merge modalities. Matryoshka representation learning (MRL) lets the same network serve smaller embeddings, for example a first retrieval pass at 256 dimensions, then expand for more expressiveness. "Sometimes we want to generate, sometimes we want to retrieve."

**Weather: no language at all**
The project began when a scientist at the UK Met Office asked whether AI could predict rainfall better than physics-based models. With 40 years of global data, the problem proved tractable.
- **GraphCast** uses a spherical graph neural network from the surface to the lower stratosphere. It predicts about 100 atmospheric variables autoregressively, up to 15 days out. For Hurricane Lee it predicted the Nova Scotia landfall accurately nine days out; the best physics models managed six. "Three days is really important."
- **GenCast** is probabilistic, because weather is chaotic and forecasters need the tails. Against 1,300 benchmark forecasts it was more accurate 97% of the time. It produces a 15-day forecast in eight minutes on a single chip, not hours on a supercomputer.
- **FGN** (functional generative network) predicts cyclones directly, including trajectory, wind speed and eye formation, instead of adding a detector afterwards. The US National Hurricane Center already uses it.

**World models: Genie**
This line grew from DeepMind's work on Atari, Go, StarCraft and robotics simulation, as the focus shifted from training agents to generating endless environments. Genie 1 made short 2D platformer worlds that responded to left and right input. Genie 2 made 3D environments, interactive but not real time and not real-world quality. Genie 3 came after Veo 3. Demos show a walk down a muddy lane in Kent, where you look down and see your own body, plus skiing and an artist's short clip turned into a world you can fly through. Genie 3 has memory: in an origami-lizard world, you can run for a minute, return, and find everything unchanged. You can also prompt the world while inside it, changing a Camden Canal walk on the fly. She sees uses in a new form of gaming, with players "adversarially prompting" each other's worlds, and in education.

## Why it matters
- The Matryoshka embedding trick, retrieving at 256 dimensions and expanding when needed, is a concrete cost-versus-quality lever for retrieval systems.
- A single omnimodal vector for text, video, audio and PDFs removes the separate merge steps that multimodal RAG pipelines usually need.
- The weather results give hard numbers for AI beating physics simulation: nine versus six days of landfall accuracy, 97% of 1,300 forecasts, eight minutes on one chip.
- FGN's move from post-hoc cyclone detection to training for the target directly is a general lesson in designing models around the decision that matters.
- Genie 3's memory and in-world prompting show where generated interactive environments are heading, for agent training, games and education.

## Metadata
- Video: https://www.youtube.com/watch?v=zZsTVBXcbow
- Duration: 20:37
- Playlist index: 13
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]
- [[RAG & Retrieval]]

## Transcript excerpt
> [music] Our next speaker is VP of research at Google DeepMind. Please join me in welcoming to the stage Rya Hazdell. >> [music] [applause] >> Hello everyone. Wonderful. Uh what a lovely full room and good smiles. I heard the uh dig on Google there at the end. I I I I did catch that. Um so my name is Rya Hadzel. Uh I've been a part of uh DeepMind uh for the last uh almost 13 years and I'm very happy to have AI engineer come here to London. I'm also uh very proud this year to be a UK AI ambassador. So I help the government um academia industry sort of bridge those those gaps. Um, and uh, yes, I'm American by birth, but I've been here for long enough um, that uh, can count myself among the...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zZsTVBXcbow.txt]]
- Description cue: In this presentation, Raia Hadsell, VP of Research at Google DeepMind and AI Ambassador for the United Kingdom, opens AIE Europe and explores what's open in Frontier AI and the future of intelligen...

## Book angles
- Could support a chapter/section on **Models & Inference**.
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://uk.linkedin.com/in/raia-hadsell-35400266>
