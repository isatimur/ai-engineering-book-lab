---
video_id: "w7IMuYsBNr8"
playlist_index: 152
title: "OpenAI on Securing Code-Executing AI Agents — Fouad Matin (Codex, Agent Robustness)"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=w7IMuYsBNr8"
duration: "14:00"
duration_seconds: 840
view_count: 2747
transcript_status: "auto_en_orig"
transcript_path: "99_Meta/transcripts/plain/w7IMuYsBNr8.txt"
themes:
  - "Coding Agents"
  - "Evals & Reliability"
ingested_at: "2026-04-24T11:41:27+00:00"
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "OpenAI's Fouad Matin details how Codex CLI sandboxes code-executing agents (macOS seatbelt, Linux seccomp+landlock), restricts network access via configurable allow-lists to blunt prompt injection, and argues LLM-based monitors are not yet a substitute for deterministic system controls."
---
# OpenAI on Securing Code-Executing AI Agents — Fouad Matin (Codex, Agent Robustness)

## Summary
Fouad Matin, who works on agent robustness and control at OpenAI (formerly OpenAI security, previously ran a security startup), describes the risks that emerge once every capable agent becomes a code-executing agent, including a case where an o3-era model spontaneously ran code (OCR/cropping) to read an image without being told to. He frames unattended code execution as effectively "remote code execution" and lists the main failure modes: prompt injection/data exfiltration, unintentional installation of malicious packages, vulnerable code, privilege escalation, and sandbox escape. Codex CLI's mitigations, which he walks through concretely, are: sandboxing (a macOS "seatbelt" policy inspired by Chromium's, and a Rust-based Linux sandbox combining seccomp and landlock), a "full auto" mode that restricts file access to the run directory and blocks network calls except for auto-approved commands, and a newly launched (days before the talk) configurable network allow-list with per-HTTP-method controls, illustrated with a prompt-injection scenario where a linked GitHub issue instructs the agent to exfiltrate the last commit to an external URL. He also covers tool design (a `local_shell` tool matching how the models were trained, an `apply_patch` tool because models are unreliable at diff line numbers, and chaining MCP tools like a dependency-vulnerability checker before installing packages) and states plainly that LLM-based monitors, while useful, are "just not quite there yet" as a substitute for deterministic, system-level controls, with human review of diffs remaining the strongest mitigation.

## Why it matters
- Gives concrete, named sandboxing mechanisms (macOS seatbelt, Linux seccomp+landlock, network allow-lists with HTTP-method granularity) for the specific problem of letting an agent execute code unattended, not just abstract "be careful" advice.
- The GitHub-issue prompt-injection walkthrough is a precise, reusable example of how untrusted content becomes a data-exfiltration vector for coding agents.
- Matin's explicit claim that LLM-based monitors are not yet a substitute for deterministic system-level controls is a useful, source-backed data point for any chapter arguing against over-relying on model judgment for security.

## Metadata
- Video: https://www.youtube.com/watch?v=w7IMuYsBNr8
- Duration: 14:00
- Playlist index: 152
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Evals & Reliability]]

## Transcript excerpt
> [Music] Hi everyone, I'm Fouad and I'm here to talk about safety and security for code executing agents. And a little intro about myself, I actually started on the OpenAI security team um after running a startup for about six years, a security company. Um and now I work on agent robustness and control as part of post training. Uh one of the things I did in the last couple of months is work on codecs and codeex CLI which is our open source library for actually running codecs directly on your computer and there's a lot of things we learned in building codecs that I'm excited to share with you all but um there's definitely a lot more work for us to do and excited to hear what you think um...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/w7IMuYsBNr8.txt]]
- Description cue: Code is the lingua franca for both software engineers and highly capable AI models. As we give agents the ability to build, test, and run code that they generate, the command line becomes their...

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Evals & Reliability**.
