---
video_id: lRa9sPaMyy4
playlist_index: 1098
title: "Your Code Has Bugs. Lean4 Has Proofs: Formal Verification for Engineers — Varun Pant, AWS"
channel: "AI Engineer"
url: "https://www.youtube.com/watch?v=lRa9sPaMyy4"
duration: "10:07"
duration_seconds: 607
view_count: 9000
transcript_status: auto_en_orig
transcript_path: "99_Meta/transcripts/plain/lRa9sPaMyy4.txt"
themes:
  - "Coding Agents"
  - "Agent Architecture"
  - "Evals & Reliability"
ingested_at: 2026-10-30T07:21:03+00:00
source_inventory: "/tmp/ai-engineer-videos.jsonl"
summary: "Varun Pant, who leads formal verification teams building AI products at AWS, argues that LLM judges, tests and human review cannot keep pace with agent-written code or cover all inputs, while formal verification proves code correct for every input. In his workflow humans own and validate the specification, and machines own the code and the proof. He explains Lean as a language and proof assistant with a small trusted kernel, using a chess analogy for tactics, and shows cases: an AI port of zlib to Lean with 32,000 lines of proof, Cedar's Lean spec checked against Rust by 100 million nightly differential tests, solver tools for Rust, and AWS's Strata."
---

# Your Code Has Bugs. Lean4 Has Proofs: Formal Verification for Engineers — Varun Pant, AWS

## Summary
Varun Pant builds AI products at AWS and leads teams in formal verification. This short talk opens with the problem: coding agents produce hundreds and thousands of PRs a week. An LLM judge is probabilistic, tests check only some inputs, and human review does not scale to agent speed. None of these can say the code is correct for all inputs. Formal verification can: you write what correct means (the specification), and a tool proves the code satisfies it for every possible input.

**The workflow**
In specification-driven development, for example with Kiro, you write the spec formally in Lean or in natural language and let AI auto-formalize it. Then you validate the spec, by human review or by testing it on some inputs. Pant stresses this step: the spec is upstream, a living artifact, and everything else depends on it. The coding agent implements from the spec, and the verification tool proves the implementation matches. "Humans own the specification and machines own the code and proof."

**Lean in brief**
Lean is both a programming language and a proof assistant, so definitions and proofs share one language with no translation layer. It is implemented in Lean, so it is extensible. It has a small trusted kernel, and proofs can be exported and checked independently. His example: a list reverse function and a theorem that reverse of A plus B equals reverse of B plus reverse of A, for all inputs. Tactics do the work and the kernel checks it. The chess analogy: tactics are moves, the theorem is checkmate, and you search a tree of moves and backtrack when a branch fails. An incorrect proof is rejected at once. Several independent open-source kernels exist, in C++, Rust and Lean, and anyone can write another.

**Four patterns**
- Spec and code both in Lean: an open-source effort used AI to convert zlib, the C compression library, to Lean over about a week. The natural-language spec says decompressing the output of compress returns the original data; AI wrote the formal spec, the code and helper lemmas, then proved the theorem. The proof was 32,000 lines, and the kernel checked it.
- Spec in Lean, production code in Rust: Cedar, an open-source authorization policy language used by AWS verified permissions, has its spec in Lean. A key property is that forbid overrides permit: if any forbid policy is satisfied, the request is denied. About 100 million differential random tests run nightly to check that the Rust code and the Lean model give the same output, and no version ships until they pass.
- Rust verified with solvers: a solver works like a powerful calculator that returns satisfiable or unsatisfiable. Verus uses the Z3 solver with inline requires and ensures pre- and post-conditions, checked statically and erased at runtime, "almost like ghost code". Another tool translates Rust's mid-level intermediate representation into Lean for the theorem prover.
- Any language: AWS is building Strata, an open-source, work-in-progress tool. You write a dialect that lowers your language to Strata core, written in Lean, and then dispatch to Lean proofs, SMT solvers or model checkers.

He closes with a starting point: open Lean in the browser, pick your most critical code, write the spec, let the coding agent implement it and the verifier prove it.

## Why it matters
- Positions formal verification as the answer to verifying agent-generated code at scale, where LLM judges, tests and human review each fall short.
- The division of labour (humans own and validate the spec, machines own code and proof) is a clear model for where human review belongs in an agentic workflow.
- Concrete scale points: a 32,000-line AI-generated proof for a zlib port, and 100 million nightly differential tests gating every Cedar release.
- Maps the practical options for existing codebases (Lean model plus differential testing, solver annotations in Rust, Strata for any language), not just greenfield Lean.

## Metadata
- Video: https://www.youtube.com/watch?v=lRa9sPaMyy4
- Duration: 10:07
- Playlist index: 1098
- Transcript status: `auto_en_orig`

## Theme hooks
- [[Coding Agents]]
- [[Agent Architecture]]
- [[Evals & Reliability]]


## Transcript excerpt
> [music] >> Coding agents are generating more code than ever. Builders are generating hundreds and thousands of PRs every week. How do you know that this is correct? Using LM as a judge for the code? Well, that's probabilistic. Tests? They only check some inputs, not all. Human code review doesn't scale to match agent speed. None of these can say for all inputs the code is correct. Formal verification can. Hi, I'm Varun Pant. I build AI products at AWS leading teams at in formal verification. Formal verification provides mathematical proof that code is correct. For all inputs. You write what correct means, which is the specification, and a formal verification tool proves that your code...

## Transcript notes
- Full cleaned transcript: [[99_Meta/transcripts/plain/lRa9sPaMyy4.txt]]

## Book angles
- Could support a chapter/section on **Coding Agents**.
- Could support a chapter/section on **Agent Architecture**.
- Could support a chapter/section on **Evals & Reliability**.
