---
video_id: "OimPoLxioYg"
playlist_index: 595
title: "120k players in a week: Lessons from the first viral CLIP app: Joseph Nelson"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=OimPoLxioYg"
duration: "15:59"
duration_seconds: 959
view_count: 1325
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/OimPoLxioYg.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:25:30+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Joseph Nelson of Roboflow tells how paint.wtf, an AI Pictionary game built in 48 hours, reached 120,000 players and seven requests per second in its first week. GPT-3 wrote prompts, users drew in a browser canvas, and OpenAI CLIP ranked drawings by cosine similarity between text and image embeddings. He rebuilds an MVP live in under 50 lines of Python with Roboflow's open-source inference server. Lessons: CLIP can read, so users wrote the prompt and he used CLIP to penalise handwriting; raw similarity scores are narrow and need rescaling; and CLIP can moderate NSFW drawings zero-shot."
---
# 120k players in a week: Lessons from the first viral CLIP app: Joseph Nelson

## Summary
Joseph Nelson of Roboflow walks through paint.wtf, a viral game built on OpenAI CLIP. In its first week it had 120,000 players and peaked at seven requests per second. He rebuilds a small version live, then shares lessons, "and maybe some uh warnings", about letting strangers on the internet send you images.

**How the game worked**
It was "an AI sandwich". GPT-3 generated prompts such as a giraffe in the Arctic or a bumblebee that loves capitalism. Users drew in an open-source, Microsoft Paint-like canvas. CLIP embedded the prompt text and the drawing, and the leaderboard ranked drawings by cosine similarity: winning means minimising the distance between prompt and drawing. It spread across Reddit and Hacker News. One prompt drew 10,000 submissions and another 30,000, and the team added prompts because of demand. Nelson sees CLIP's grasp of abstract, low-fidelity drawings as a new primitive: open-set understanding rather than a fixed list of classes.

**The live build**
The original took 48 hours; the demo aims for five minutes and under 50 lines of Python. He starts with Roboflow's open-source inference server, which he says has powered hundreds of millions of API calls, and runs a rock-paper-scissors detector from a hub of over 50,000 fine-tuned models on his webcam, fully local on an M1. He then swaps in CLIP, embeds a prompt as text, and scores webcam frames by similarity. Two volunteers draw "a gorilla gardening with grapes" on clipboards; one scores about 34%, while the other's entry is a joke prompt-injection telling the judge to declare him the winner.

**Lessons**
- CLIP can read. A drawing that just wrote out the prompt outranked careful art. The fix used "clip to moderate clip": if an image is more similar to handwriting than to the prompt, penalise it.
- Similarity scores are conservative and narrow; across the submissions the range ran from single or low double digits up to the mid-40s percent. He rescales the observed minimum to 0 and maximum to 100 for display.
- CLIP can moderate content zero-shot. Strangers drew NSFW content; if an image is more similar to an NSFW description than to the prompt, block it. Users then hid extra content inside valid drawings, a "cat and mouse game".
- A serving layer helps: the inference stream function packages throughput tuning for target hardware, about 15 FPS on the M1.

## Why it matters
- It is a clear case study of embedding similarity as a product mechanic, with real scale numbers: 120,000 players and seven requests per second in week one.
- The handwriting penalty shows a model gaming its own judge and a fix that reuses the same model as a comparative classifier.
- Comparative zero-shot moderation (more similar to NSFW than to the prompt) is a cheap, reusable pattern for user-uploaded images.
- The note that raw CLIP similarities sit in a narrow band and need rescaling is a practical detail for anyone shipping similarity scores to users.
- The volunteer's injection joke and the users' cat-and-mouse tricks illustrate adversarial users in any public multimodal app.

## Metadata
- Video: https://www.youtube.com/watch?v=OimPoLxioYg
- Duration: 15:59
- Playlist index: 595
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hey everybody Joseph today we're going to talk about paint. WTF a viral game that we built using open aai clip and in its first week it had 120,000 players it was doing seven requests per second and I'm going to tell you all about lessons we learned in multimodality and even build a sample version of the app here in in 5 minutes so what is paint. WTF we challenged people all across the web to basically play AI Pictionary it was like an AI sandwich we had gpt3 generate a bunch of prompts like we prompted it with saying a giraffe in the Arctic or an upside down dinosaur or a bumblebee that loves capitalism and then users were given like a Microsoft Paint like interface in the browser...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/OimPoLxioYg.txt]]
- Description cue: When OpenAI released CLIP, the Roboflow team built an AI Pictionary game called paint.wtf. Players were given a prompt like “a giraffe in the arctic,” and players drew depictions. CLIP...

## Book angles
- Could support a chapter/section on **Models & Inference**.

