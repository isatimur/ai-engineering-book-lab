---
video_id: "pSqpC7fFLZA"
playlist_index: 371
title: "The Robots are coming for your job, and that's okay - Elmer Thomas and Maria Bermudez"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=pSqpC7fFLZA"
duration: "8:57"
duration_seconds: 537
view_count: 913
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/pSqpC7fFLZA.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T12:15:37+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Elmer Thomas (principal developer educator, Twilio) and Maria Bermudez (lead developer of the AI Docs buddy) show how a tiny docs team facing Jira floods from 100+ product teams uses AI to amplify, not replace, writers. Instead of one megabot they built six single-purpose agents behind a Next.js frontend: automated editor, alt text generator, jargon simplifier, SEO metadata, outline builder, and a Slack help bot. A custom GPT holds the style guide and an Airtable rubric, and output passes through prose linting, CI tests, a GitHub PR with codeowner review, and a human merge. Their playbook: one pain, one repeatable rule-based task, weekly user loops."
---
# The Robots are coming for your job, and that's okay - Elmer Thomas and Maria Bermudez

## Summary
Elmer Thomas is a principal developer educator at Twilio. Maria Bermudez is the lead developer of the team's AI Docs buddy. Their short talk says the title is tongue in cheek: their "relatively tiny docs team" uses AI agents to turbocharge its workflow instead of replacing itself.

**The pain**
A flood of Jira tickets and three headaches: error-prone first drafts from 100+ product teams, time-consuming grooming (style checks, alt text, SEO), and hallucination risk if AI runs unchecked. "We needed leverage, not burnout."

**Six small agents, not one megabot**
Behind a simple Next.js frontend:
- Automated editor: fixes grammar, formatting, and accuracy against the style guide.
- Image alt text generator: quick accessibility wins.
- Jargon simplifier: turns developer jargon into plain English.
- SEO metadata generator: title and description within character limits.
- Docs outline builder: recommends navigation and structure (coming soon).
- A Slack bot that triages help-channel requests.

Their rule of thumb: pick tasks that are "repeatable, high volume, and low creativity."

**The request flow**
The UI feeds a custom GPT agent, with the model chosen per job. The style guide and rubric are baked in, and the rubric is retrieved from Airtable so people can edit it together. A validation layer runs prose linting and CI/CD tests. A GitHub PR adds codeowner review, plus product and engineering reviews, and a human hits merge only when it is right. Thomas first says this layering crushes hallucinations, then corrects himself: it reduces them significantly.

**The demo**
Bermudez runs the editor on a live URL (it also accepts MDX or Markdown). It is slow because it uses the reasoning model the team found most consistent at applying the style guide. It shows a diff and a "changes made" tab that lists original text, revised text, and the style or rubric item behind each change. It is not perfect: it sometimes misses a missing SEO description, so she runs the separate SEO generator. The alt text tool processes several pages at once in the docs platform's required format. The jargon simplifier also helps during PR review. Agents do not yet talk to each other.

**Guard rails and playbook**
Hallucination: linting, CI tests, many human eyes. Bias: data set tests and prompt audits. Stakeholder misalignment: weekly PR reviews and Slack feedback loops with PMs and engineers, so prompts get tuned continuously. The three-step playbook: find one pain that kills throughput, pick one repeatable rule-based task, and loop with users at least weekly.

## Why it matters
- A concrete case of decomposing a content workflow into narrow single-purpose agents instead of one general bot, with the selection rule stated plainly.
- Shows how existing docs-as-code machinery (linting, CI, codeowners, PR review) becomes the guard rail layer for agent output.
- The per-change explanation tied to a rubric item is a useful pattern for making AI edits reviewable.
- An honest small-team view: the tools are imperfect, overlap to cover each other's misses, and depend on weekly feedback loops to stay useful.

## Metadata
- Video: https://www.youtube.com/watch?v=pSqpC7fFLZA
- Duration: 8:57
- Playlist index: 371
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> Hello everyone. I'm Elmer Thomas, principal developer educator at Twilio. Welcome to the AI engineer world's fair. Our talk today is called the robots are coming for your job. And that's okay. Don't worry, the title is tongue and cheek. I'm here to show you why AI isn't something to fear. It's something we can embrace to work smarter. In the next few minutes, you'll see how our relatively tiny docs team uses AI agents to turbocharge workflows instead of trying to replace ourselves. We'll look at the pain points, the agents we built, and the guard rails that keep us accurate. I've been a developer and builder for decades. Trends come and go. AI is the latest big one. Like many of you, I...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/pSqpC7fFLZA.txt]]
- Description cue: In a world where AI is revolutionizing API documentation, many wonder: “Why can’t we just use AI to write the docs?” At Twilio, we’ve explored this question deeply. Our Developer Education...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.

