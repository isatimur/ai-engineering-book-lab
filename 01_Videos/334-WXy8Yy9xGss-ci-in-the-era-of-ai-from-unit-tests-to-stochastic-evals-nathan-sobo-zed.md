---
video_id: "WXy8Yy9xGss"
playlist_index: 334
title: "CI in the Era of AI: From Unit Tests to Stochastic Evals — Nathan Sobo, Zed"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=WXy8Yy9xGss"
duration: "14:50"
duration_seconds: 890
view_count: 800
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/WXy8Yy9xGss.txt"
themes:
  - "Evals & Reliability"
  - "Coding Agents"
ingested_at: "2026-04-24T12:14:08+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Nathan Sobo, co-founder of Zed, a Rust code editor built from scratch, explains how Zed tested its new agentic editing. Zed had tens of thousands of deterministic tests and no flaky CI, but LLMs broke that. His method: start with a broad data-driven eval, zoom into stochastic unit tests that run 100 or 200 times inside the normal test suite and fail the build below a pass threshold, then drive each failure into an ordinary deterministic test. Most failures were not ML problems but 'stupid things': empty old-text tags, mismatched XML tags, flattened indentation, odd escaping. Fixes were robust parsing, fuzzy matching and indent normalization."
---
# CI in the Era of AI: From Unit Tests to Stochastic Evals — Nathan Sobo, Zed

## Summary
Nathan Sobo is a co-founder of Zed, an AI-enabled code editor that is not a VS Code fork. It is written from scratch in Rust and built like a video game around about 1,200 lines of GPU shader code, to deliver 120 frames per second. Zed recently launched agentic editing, and this talk shows how the team tested it. His thesis: evals are still tests. Keep the discipline of traditional software engineering, but accept statistical pass thresholds.

**From deterministic to stochastic**
Sobo says that without an empirical approach Zed "would crash every 8 seconds". The team has tens of thousands of tests. One example starts a server and two clients with a simulated scheduler, and runs many random interleavings of concurrent events, so any failing interleaving can be replayed exactly. Until the AI features, Zed never had flaky tests on CI. LLMs end that: change one input token and the output changes completely, even if you control sampling yourself.

**Zoom out, then zoom in**
The first eval looked like a SWE-style benchmark: data-driven input and output. It compiles a headless Zed, checks out a repo, runs the agent and asserts on what it did. When a big eval fails there are "a million ways" it could have gone wrong, so the team made evals programmatic and then narrower. One finding: the original grep tool returned bare matching lines. They now use tree-sitter, Max's parser generator framework, to expand each match to its syntactic boundaries, which improved agent behavior. A stochastic test surfaced what was really an algorithmic problem.

**Streaming edits**
Edits first used tool calls, but tool-call JSON does not stream well; it arrives all at once. So the agent now makes a small tool call that describes the edits, then loops back to the same model, which already has the context in its cache, to emit old-text and new-text blocks. That output needs parsing, and models do odd things. Stochastic evals sit in the regular test suite: run 200 times and require 100% to pass, or "literally fail the build". Some use an LLM as judge; others assert in code.

**Driving failures into deterministic tests**
- A parser test that splits input at random chunk boundaries, run 100 times.
- Fuzzy matching with dynamic programming, which rescued many tool-call failures when the model's old text was slightly wrong.
- A streaming diff that must decide whether missing old text was deleted or just has not streamed yet.
- Empty old-text tags when inserting at the start or end of a file: a prompt line helped, but it still happened 1 to 2% of the time, so the code handles it.
- Mismatched XML tags: about 40% of edits at first. The prompt "always close all tags properly" got it to about 95%; robust parsing covers the last 5%.
- Flattened indentation: the code detects an indent delta between buffer and model output and renormalizes.
- Odd escaping of Rust raw strings, with HTML entities and double-escaped newlines, especially from Gemini. This was a pure prompt fix so far.

**Lessons**
Rigorous testing is fundamental, period. Most problems are not advanced ML but "stupid things that the model will try to do". Zed needed no external eval framework; everything runs in its normal test infrastructure. The code is open source under the GPL. Sobo says that with Claude 4 models he can finally write Rust agentically and efficiently.

## Why it matters
- Gives a concrete three-step method for agent reliability: broad eval, then focused stochastic test with a pass threshold, then a deterministic regression test.
- Shows that evals can live in the normal CI suite (run N times, fail the build below a threshold) with no separate eval tooling.
- The failure catalogue (empty tags, mismatched tags, indentation, escaping) with before and after rates (40% to 95% from one prompt line) is rare, real data on prompt fixes versus code fixes.
- Argues that prompt fixes reduce but do not remove model quirks, so the harness must parse defensively. This is a key point for any chapter on coding-agent harnesses.
- The streaming-edit design (a small tool call, then old/new text blocks from the cached model) is a reusable pattern for fast, incremental agent edits.

## Metadata
- Video: https://www.youtube.com/watch?v=WXy8Yy9xGss
- Duration: 14:50
- Playlist index: 334
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Evals & Reliability]]
- [[Coding Agents]]

## Transcript excerpt
> [Music] Hey everybody, thanks for coming to my talk. Uh, I am Nathan Sobo. I'm the co-founder of Zed. We are an AI enabled code editor. And what sets us apart is we are not a fork of VS Code. We are implemented from scratch. [Applause] uh implemented from scratch in Rust. We literally engineered the entire system like a video game around about 1,200 lines of shader program that run on the GPU and the rest of the system is organized to deliver frames at 120 frames per second really quickly. And recently I recorded a video because time is short and I this is obviously sped up massively but we launched Agentic Editing in Zed and I wanted to talk about the approach that we took to test this uh...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/WXy8Yy9xGss.txt]]
- Description cue: Software engineers have long understood that high-quality code requires comprehensive automated testing. For decades, our industry has relied on deterministic tests with clear pass/fail outcomes...

## Book angles
- Could support a chapter/section on **Evals & Reliability**.
- Could support a chapter/section on **Coding Agents**.

