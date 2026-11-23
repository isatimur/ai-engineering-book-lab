---
video_id: "zHYQZFy0UVk"
playlist_index: 481
title: "Fine tune 20 Llama Models in 5 Minutes: Santosh Radha"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=zHYQZFy0UVk"
duration: "6:26"
duration_seconds: 386
view_count: 1324
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/zHYQZFy0UVk.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:20:06+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "In a five-minute lightning talk, Santosh Radha shows how Covalent, an open-core product, ships local Python functions to any compute back end with one decorator that names the hardware (for example an H100 with 48 GB for up to 18 hours), with no Docker or Kubernetes. His demo is a pure Python workflow that loops over many models, fine-tunes each on a GPU, evaluates each on cheaper hardware (one six-minute run cost 11 cents), sorts the results on a CPU, and deploys the best model as an auto-scaling endpoint. You pay only for the seconds each function runs."
---
# Fine tune 20 Llama Models in 5 Minutes: Santosh Radha

## Summary
Santosh Radha gives a five-minute lightning talk on Covalent, which the captions describe as an open-core product. His thesis: you should be able to train, fine-tune and serve models on GPUs straight from Python, "without needing anything like kubernetes" or Docker. The number 20 in the title is arbitrary; he says the same pattern scales to hundreds of models.

**How Covalent works**
You write Python locally, for example in a Jupyter notebook, and add one decorator that states the compute you need, such as an H100 with a set amount of memory and a maximum time limit. Press shift-enter and the function ships to a back end, runs, and returns the Python object. In the open-source version it runs on a compute cluster you attach; in the cloud version it runs on Covalent's GPU cluster and you pay only for the time used: five minutes of H100 costs five minutes, ten seconds costs ten seconds. You can also attach your own cloud or on-prem hardware and let Covalent orchestrate it.

**Serving without containers**
For inference you define an initializer function and an endpoint such as /generate, then run one deploy command from the notebook. You get back an API endpoint that scales to zero and up with requests. Custom auto-scaling rules are possible: scale to 10 GPUs at 9:00 every day, or when GPU utilisation hits 80 percent, or when requests reach a thousand. Authentication is handled too.

**The fine-tuning demo**
- A fine-tune task takes a model and data and returns a fine-tuned model. It runs on a 24-core CPU machine with one H100 and 48 GB of memory, with an 18-hour limit.
- An evaluate task measures each model's accuracy.
- A sort step picks the best model and runs on a CPU, so no GPU time is wasted.
- A deploy step serves the winner behind a /generate endpoint.
- A workflow loops over the models, then dispatches with one line.

In the app, each function runs on the hardware it asked for. One evaluation ran six minutes on an L4 for 87 cents; another ran six minutes on an older GPU for 11 cents. He also points to more examples, including real-time time series analysis with an inverted Transformer, LLM serving, and a whole "AI model Foundry" in pure Python.

## Why it matters
- Per-function hardware choice (GPU for fine-tuning, cheaper GPU for evaluation, CPU for sorting) is a simple pattern for cutting cost in model-selection pipelines.
- The fine-tune, evaluate, pick-best, deploy loop in one Python workflow is a compact template for chapters on fine-tuning at scale.
- Auto-scaling rules by time of day, GPU utilisation or request count show the knobs a serverless inference endpoint should expose.
- It is one of several talks pitching decorator-based, container-free GPU access as the developer experience AI engineers want.

## Metadata
- Video: https://www.youtube.com/watch?v=zHYQZFy0UVk
- Duration: 6:26
- Playlist index: 481
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] so the talk is actually going to be about um uh how you run things extremely easy directly from Python and the example that I'm going to show you here is obviously I just have five minutes and on my end but I'm going to try my best to Showcase how you can fine tune pretty much 20 is an arbitrary number here but hundreds of models that you can do right from python without needing anything like kubernetes joer or anything on your side and uh so before that you can find the talk and the actual code for what I'm going to do in this QR code and you'll find lot more interesting examples over there to try out on run as well um okay so what do we do um so calent is an open source slop core...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/zHYQZFy0UVk.txt]]
- Description cue: The complexity and scarcity of deploying GPUs can bring AI development to a standstill. What if there was a better way to train, fine-tune, and serve models on accelerated compute infrastructure...

## Book angles
- Could support a chapter/section on **Models & Inference**.
