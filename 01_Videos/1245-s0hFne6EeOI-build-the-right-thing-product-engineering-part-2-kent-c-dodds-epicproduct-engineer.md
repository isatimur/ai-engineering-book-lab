---
video_id: s0hFne6EeOI
playlist_index: 1245
title: "Build the Right Thing: Product Engineering (Part 2) — Kent C. Dodds, EpicProduct.engineer"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=s0hFne6EeOI"
duration: "52:09"
duration_seconds: 3129
view_count: null
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/s0hFne6EeOI.txt"
themes:
  - "Coding Agents"
ingested_at: 2026-10-30T18:30:27+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "In part 2 of his workshop, Kent C. Dodds teaches two frameworks that turn product judgment into technical decisions. Jobs to be done: ask why until a request ('add facial recognition') becomes a job statement ('help me get into the workshop quickly without missing the first 20 minutes'), then split it into functional, social and emotional needs that map to data, workflow and design choices. The Kano model: sort changes into basic, performance and delighter needs, plus indifferent and reverse features to cut. He warns against piping user requests straight into an agent, and asks engineers to refuse to build shady features."
---

# Build the Right Thing: Product Engineering (Part 2) — Kent C. Dodds, EpicProduct.engineer

## Summary
This is the second half of Kent C. Dodds' two-hour product engineering workshop. Part 1 covered idea validation with The Mom Test. Here the audience's example app, "Just Get In", which gets people into packed conference workshops, has shipped and is collecting feature requests. Dodds teaches two frameworks for handling them and closes on the thesis from part 1: when agents level implementation, building the right thing is the differentiator.

**From request to job statement**
The audience's request: facial recognition at the door. Dodds keeps asking why. Why is it slow? Why does the queue exist at all? He calls this the "problem tree": each solution spawns new problems, and sometimes you should back up to an earlier branch. Jobs theory says people hire products to make progress in a specific situation. Four questions reveal the job: who is it for, when does the problem happen, what progress do they want, and what do they do now (scan a QR code in a blocking line)? The result: "when there's a workshop going on at 1010, help me get into the workshop quickly so that I can learn about product engineering without missing the first 20 minutes." It says nothing about faces. Parallel lines or NFC badges may serve the same job.

**Don't pipe requests into an agent**
Saying yes to every feature creates huge complexity. Dodds warns anyone building a tool that sends user requests straight to an agent for automatic implementation: "Stop." The result would have "no vision", "no taste". If a ticket arrives without a job statement, go back to the PM.

**Functional, social, emotional**
Each dimension maps to engineering choices. For facial recognition: functional means a face database, encryption and seat capacity. Social means the door staff, people in line and the speaker. Emotional means attendees may feel "creeped out", which is a reason to pick another solution. He applies the same lens to why React won: first on function (speed, state model, composition), then on social network effects, so later functional rivals did not matter. Jobs theory also separates the "big hire" (the purchase) from the "little hire" (every use), so success means repeated progress.

**The Kano model**
Using a food delivery example, the audience sorts requests:
- Basic: order confirmation emails. Nobody is satisfied until they are fully reliable, and more of them does not help. Wayne's analogy: no toilet paper in a hotel is bad, but 100 rolls does not help "and it might make me worry about the food."
- Performance: ETA accuracy and page load time. Better is better, up to a limit.
- Delighters: a surprise discount, a shared group cart.
- Features drift one way only: delighter to performance to basic. GPS tracking was a delighter in 2015; now it is expected. Re-prioritise often and watch competitors.
- Indifferent features are dead weight to remove. Reverse features, like auto-posting an attendee's face to social media, should never ship.

**Engineering consequences**
For basics, invest in reliability, completeness and ownership. For performance needs, measure against a threshold. For delighters, treat them as experiments, perhaps in a separate system, before folding them in. Engineers build the shady products users hate, so they should push back.

**Q&A notes**
The user is "directionally right" but not always right; Mom-Test other customers before acting on one loud voice. Dodds told his agent "production is down, figure it out" when a bot attacked his site, and it fixed it. He would still want deep system knowledge where every minute costs millions, as at PayPal. AI makes security holes easier to exploit and gives careless developers a bigger blast radius.

## Why it matters
- It gives a concrete rule for agent-driven development: never pipe raw user requests into an agent; translate them into a job statement first.
- The functional, social and emotional split shows how product understanding turns into data model, workflow and design decisions, which is the product engineer's core work.
- The Kano categories tell engineers how much rigor to spend per change: reliability for basics, measured thresholds for performance needs, cheap experiments for delighters.
- The one-way drift of features (delighter to basic) explains why a prioritised backlog goes stale and must be revisited.
- The incident-response answer draws a clear line on when letting the agent fix production is acceptable and when deep system knowledge is still required.

## Metadata
- Video: https://www.youtube.com/watch?v=s0hFne6EeOI
- Duration: 52:09
- Playlist index: 1245
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]


## Transcript excerpt
> So, a as some of you are uh heading out, um actually maybe we let's make this less awkward. I don't want anybody feel awkward. Uh let's move again. Everybody stand up really quick. Yeah, I I know you're all like, "Oh, I can't. We just did this like 20 minutes ago." Yep. There you still got to move. Um, we're not going to do the full uh stretch or uh air squat thing, but you can just stretch a little bit. Make it less awkward for the people who want to leave. It's okay. We don't want them to feel bad. Okay. Yep. You can stretch your legs, whatever you want to do. Just don't hurt yourself. Uh, and then go ahead and sit. Okay. So, we've got uh I think I've got 50 minutes. 5-0. So that's what...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/s0hFne6EeOI.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.

