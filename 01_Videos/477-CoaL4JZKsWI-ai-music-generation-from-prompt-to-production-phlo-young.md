---
video_id: "CoaL4JZKsWI"
playlist_index: 477
title: "AI Music Generation, From Prompt to Production: Phlo Young"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=CoaL4JZKsWI"
duration: "54:34"
duration_seconds: 3274
view_count: 2542
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/CoaL4JZKsWI.txt"
themes:
  - "RAG & Retrieval"
ingested_at: "2026-04-24T12:19:56+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Phlo Young, a self-taught songwriter who split-tests songs under pen names (one has about 5 million streams), runs a hands-on workshop on AI music. He sorts the field into three types: style transfer or voice conversion (the AI Kanye and Drake songs, Randy Travis singing again), text to music (a viral Udio meme song), and audio to music (finger drumming turned into a full song). He compares Udio as a songwriting partner with a second service as an in-house producer, and shares tips: write lyrics with GPT first, count syllables, borrow genre labels from Rate Your Music, and pull stems into a DAW."
---
# AI Music Generation, From Prompt to Production: Phlo Young

## Summary
Phlo Young (Flo is his artist name) calls himself "way more of a songwriter than like a software engineer". He knows enough Python to automate his life and had studied the AI music tools for only about 30 days before this interactive workshop. He states he has no affiliation with any of the tools. A long-time experimenter, he once split-tested the same recording under two artist names and found it performed very differently depending on cover art and marketing. One instrumental pen name now has about 5 million streams.

**Three kinds of AI music**
He found the term confusing, so he splits it into three types.
- Style transfer, or voice conversion: you write, produce and sing yourself, then swap your voice for a trained model of another singer. Examples: a creator's AI Kanye video; the viral AI Drake song by "Ghost Rider", which got about 9 million streams in 24 hours before a record industry takedown wiped it; and a new Randy Travis song, made with his team after he lost his voice, which drew overwhelmingly positive comments. He says voice conversion has got about 10 times better in a year, much of it driven by teenagers in Discord servers.
- Text to music: a full song from a prompt with no prior recording. A comedian typed lyrics into Udio and produced the viral meme song from the Drake and Kendrick Lamar feud (captioned "BBL Jersey"); 11 Labs also showed a viral song about GPUs.
- Audio to music: an existing sound becomes music. Stable Audio was the first public tool he saw with it; another demo turned finger drumming on a desk into a full song with guitar.

**Hands-on: Udio versus the second service**
He paid for premium accounts on Udio and a second service (captioned "sunno") and gave attendees logins. Both services had just been sued by the record industry, which alleges training on copyrighted music, and both run content filters that block artist names. An audience member noted that misspelling the name and adding the genre can get around this. He sees Udio as a songwriting partner: it generates 30 seconds at a time that you extend, remix or scrap, supports inpainting of sections, and accepts uploaded audio. He urges artists to feed in their own song's tempo, key and lyrics: "udio does me better than I do me sometimes". The second service is an in-house producer whose output sounds polished and "top 40ish". It used to drift off the beat unless you counted syllables per line in custom mode, but song structure has improved.

**Prompting tips**
- Generate lyrics first with a GPT prompt template, edit them, then feed them in, instead of giving only a topic.
- Reuse the same prompt on both services to compare; refresh the page between songs, or you may get extensions instead of new songs.
- Rate Your Music: people found the models were trained on its labels, so copying its genre and descriptor tags gets close to a target sound.

**After generation**
For stems, add "daw" to the song URL to open it in a browser DAW called wave tool, which splits instruments and vocals. UVR5 is an open-source local alternative that works on any song. For voice cloning he recommends RVC, which can run in the cloud; about six seconds of a voice is the minimum to start training, and you can blend voices or train on a synthetic TTS voice. He declined to give advice on ethics or law.

## Why it matters
- The three-way split (voice conversion, text to music, audio to music) is a clean taxonomy for any chapter that covers generative audio.
- The Drake takedown, the lawsuits against both services and the artist-name filters show how copyright shapes generative media products.
- The Randy Travis case gives a concrete example of consensual, artist-led use of voice cloning that the public received well.
- The Rate Your Music trick, where users reverse-engineer training labels to steer output, is a sharp example of prompt craft that depends on guessing the training data.

## Metadata
- Video: https://www.youtube.com/watch?v=CoaL4JZKsWI
- Duration: 54:34
- Playlist index: 477
- Transcript status: `auto_en_orig`

## Theme hooks
- [[RAG & Retrieval]]

## Transcript excerpt
> [Music] good morning everyone good morning um I'm excited to be here I I really have uh one main goal in mind and that's for this talk to be or this Workshop to be interactive I want it to be fun and I want you guys to walk away with something tangible um so I I we we can actually switch switch to the slides uh slideshow it should be live now if you guys want to go ahead and go to this link that I have up on the screen or use your phone to go to the QR code I have some notes for you guys at that URL um but but those are my stated goals for this Workshop I want to really probably start by uh asking you guys some questions so I can get some interactions going but I'm glad you guys came thank...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/CoaL4JZKsWI.txt]]
- Description cue: The rise of AI music generation tools has opened up a world of creative possibilities for musicians and non-musicians alike. This workshop will demystify these tools, providing a hands-on introduct...

## Book angles
- Could support a chapter/section on **RAG & Retrieval**.

## Artifacts
Shipped alongside this talk (from the video description; registry: `evidence/Shared Artifacts.md`):
- resource: <https://aietalk.com/music>
