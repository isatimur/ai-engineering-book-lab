---
video_id: "_KFbT6eph5A"
playlist_index: 588
title: "Using AI to Build an Infinite Game: Jeff Schomay"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=_KFbT6eph5A"
duration: "11:08"
duration_seconds: 668
view_count: 976
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/_KFbT6eph5A.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:25:13+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Jeff Schomay turns a 16-scene forest game with 100% AI-generated content into a game of infinite exploration, where every scene is generated fresh for the player. He fine-tuned an OpenAI model on 50 examples for about a dollar or two, which let him drop the JSON spec from the prompt; trained a custom Leonardo image model for a consistent style; validated JSON in an asset-server pipeline; and hid 10 to 30 second generation latency behind a prefilled, self-refilling scene cache. The key lesson: an image fine-tune must keep shared features constant and vary the rest, or it overfits."
---
# Using AI to Build an Infinite Game: Jeff Schomay

## Summary
Jeff Schomay had built a small game with "100% AI generated content": you wander a forest from scene to scene, encounters change your vigor and courage, and you must find home before courage runs out. It had 16 scenes in a 4x4 grid, so a few plays exhausted it. His favourite part of making it was seeing what the AI would generate, so he set out to give players the same experience: generate every new scene fresh, making each game unique, "a game of infinite exploration".

**Text: prompt first, then a small fine-tune**
Each scene is a JSON object that describes the first visit, later visits and the effect on stats. A long, detailed prompt to OpenAI's completion endpoint gave the right JSON and good, varied content most of the time. To make it more reliable he fine-tuned. Following OpenAI's advice of 50 to 100 examples, he generated 50 and trained on them. The key move: he shortened the prompt and removed the JSON entirely, hoping the format would be embedded in the training data. It was. Output came out right with no format instructions, and the whole job, example generation included, cost "about a dollar or two". Fewer prompt tokens made calls faster, cheaper and easier to work with.

**Images: a custom style model**
Leonardo lets you train your own image models, which gives stylistically consistent art. Using the scene description itself as the image prompt worked well, to his surprise, even though it is in second person. The hard part was the training set. The features that should stay fixed must match in every image, and the features that should vary must vary; otherwise the model overfits and every image looks the same, or lacks the consistency to learn the style. He needed constant perspective, scale, forest setting and texture, while scenes held people, animals, buildings or nothing. He trained a couple of models with different parameters and image sets before one worked; outputs shared a zigzag path down the middle yet each was unique.

**Pipeline and latency**
A simple asset server requests a scene from the custom text model, validates that the JSON has every key it needs, sends the description to the custom image model, and assembles the result. A preview server let him scroll through many generated scenes to check them. Generation took 10, 20, sometimes 30 seconds, too slow for play, so he added a cache: prefill scenes, and refill once the pool drops below a threshold, so a scene is always ready.

**Next steps he names**
Images are 512 pixels; an AI upscaler would help but add time, a trade-off. Prompts could take a user-chosen theme, or the local time of day or weather, for immersion.

## Why it matters
- It shows a fine-tune used to move a structured output format out of the prompt and into the weights, with a concrete cost of a dollar or two for 50 examples.
- The image fine-tuning lesson, hold shared features constant and vary the rest, is a clear, transferable rule about overfitting in style models.
- The prefilled, threshold-refilled cache is a simple pattern for hiding 10 to 30 second generation latency in an interactive product.
- It is a small end-to-end generative pipeline, text model to validation to image model, that a chapter on shipping generative content can use as a worked example.

## Metadata
- Video: https://www.youtube.com/watch?v=_KFbT6eph5A
- Duration: 11:08
- Playlist index: 588
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] hi everyone I'm Jeff show and I want to share with you an interesting generative AI project that I recently did not too long ago I made a game with 100% AI generated content it's a simple game where you're wandering around lost in the forest and you go from scene to scene having encounters that impact your Vigor and your courage and the idea is that you want to find your home before you run out of Courage there's 16 scenes in a 4x4 grid and so if you play a few times you will have seen them all now my favorite part of making this game was generating each scene and just seeing what AI would come up with and I thought wouldn't it be cool to share that experience with the player what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/_KFbT6eph5A.txt]]
- Description cue: Making a game requires creating lots of content - tons of cheap and disposable ideas while prototyping, and a vast (or infinite?) depth of content to explore while playing. But making content...

## Book angles
- Could support a chapter/section on **Models & Inference**.

