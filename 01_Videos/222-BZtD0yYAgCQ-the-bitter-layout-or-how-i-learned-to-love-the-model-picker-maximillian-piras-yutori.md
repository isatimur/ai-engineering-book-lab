---
video_id: "BZtD0yYAgCQ"
playlist_index: 222
title: "The Bitter Layout or: How I Learned to Love the Model Picker — Maximillian Piras, Yutori"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=BZtD0yYAgCQ"
duration: "14:24"
duration_seconds: 864
view_count: 1727
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/BZtD0yYAgCQ.txt"
themes:
  - "Models & Inference"
ingested_at: "2026-04-24T12:08:45+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Maximillian Piras (Yutori), a designer, explains why so many AI apps converge on the same 'bitter layout': an input field, turn-by-turn chat and a model picker. He treats the model picker as a mode selector and uses the flexibility-usability trade-off and the integrated-versus-modular theory from The Innovator's Solution. His bitter design lesson: while scaling laws hold, models are not commoditized, so the interface is the commodity and its main job is to absorb the next model. To move past it, designers should design with goals and constraints, treating design systems, critique and user stories as constraints, feedback loops and system prompts."
---
# The Bitter Layout or: How I Learned to Love the Model Picker — Maximillian Piras, Yutori

## Summary
Maximillian Piras of Yutori is a designer who noticed that his AI-first apps all look alike. Chatbots, answer engines, coding assistants and even Canva share one layout: an input field, a turn-by-turn UX and a drop-down "with just way too many models to pick from". He calls it the bitter layout. His thesis: the layout is ugly but rational, because while models keep improving, the interface's main job is to absorb the next model.

**Schrodinger's chat**
Piras skips the "is chat the future" debate but traces it. A May 2022 post argued that exposing raw text completion was not the right long-term paradigm. Months later ChatGPT took off anyway. Essays in 2023 (one by Maggie Appleton) and in March of this year argued again that chat is a bottleneck. Defenders answer with a meme: just look at the usage chart. Designers know chat's usability problems and still use it every day.

**The model picker is a mode**
Larry Tesler hated modes: settings that make the same input produce very different output, like caps lock. Piras argues the model picker is a mode selector, since a different model gives a step change in output. An older ChatGPT forced users to find which model supported which mode, which put modes on top of modes. He frames this as the flexibility-usability trade-off: the more flexible the system, the more edge cases, and the lower the usability. The debate should ask about trade-offs and time frames, not absolutes.

**Integrated versus modular**
From The Innovator's Solution, he borrows the spectrum of product architecture. Integrated architectures are proprietary, optimized and common in early disruption. Modular ones appear as technology commoditizes. Industries bounce between the two, as IBM did from mainframes to PCs to leaving the PC business. The designer's question is which parts of the AI stack are commoditizing.

**The bitter design lesson**
Drawing on the bitter lesson, he says that while scaling laws hold and every new model makes people "drop everything", models are not commodities. So "it's actually the interface that's the commodity now". The bitter layout is uninspiring, but you add one line to the model picker and the app gets smarter. That ROI is hard to argue with. This holds until models overshoot user needs. Then integrated interfaces become worth building.

**From bitter to sweet**
He points to a talk on the future of programming. Programmers who hand-coded binary resisted giving control to abstraction layers. The lesson is to stop thinking in procedures and think in goals and constraints. As apps become more probabilistic, designers cannot map every path. So he speculates: design systems become constraints for generative UI, design critique becomes something like a reinforcement learning loop, and user stories become system prompts. He closes with a quote that generative AI systems are "more grown than they are built", and suggests design becomes more like gardening than construction.

## Why it matters
- The bitter design lesson gives a clear reason why chat plus a model picker wins in practice: it is the layout that ships the next model fastest.
- Calling the model picker a mode selector names a real usability cost, and matching models to modes is a problem every multi-model product has to solve.
- Integrated-versus-modular architecture gives product teams a test for when to invest in custom AI interfaces: when models overshoot user needs and begin to commoditize.
- Mapping design systems, critique and user stories to constraints, feedback loops and system prompts gives designers a concrete role in generative UI.

## Metadata
- Video: https://www.youtube.com/watch?v=BZtD0yYAgCQ
- Duration: 14:24
- Playlist index: 222
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Models & Inference]]

## Transcript excerpt
> [Music] bitter layout or the alternative name for this talk, how I learned to love the model picker and hopefully you will too. So the idea for this talk started when I was perusing all the AI first apps I use all the time and just realizing how similar they're all starting to look very consistent layout between them all. And it's not just the chat bots and the answer engines. It's also the creative tools like coding assistants like Vzero and even Canva. They're all try starting to use this very similar layout. They've got an input field. They've got this turnbyturn UX. They've got this drop down with just way too many models to pick from. And uh it all feels like they're kind of...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/BZtD0yYAgCQ.txt]]
- Description cue: Are conversational interfaces the future or, as many designers have suggested, a lazy solution that is bottlenecking AI-HCI? Despite well-documented usability issues, the design of many AI...

## Book angles
- Could support a chapter/section on **Models & Inference**.

