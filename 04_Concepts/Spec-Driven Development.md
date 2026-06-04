# Spec-Driven Development

## Working definition
Spec-driven development is the practice of making task intent, constraints, acceptance criteria, and system boundaries explicit enough that both humans and agents can implement against them reliably.

## Core synthesis
The corpus treats specs as a way to convert ambiguous desire into executable coordination. As coding agents become more capable, vague requests become more dangerous, not less. Strong specs reduce hidden assumptions, focus context, and create stable targets for generation and evaluation.

The most important synthesis is that specs are not merely documentation. They are alignment artifacts. They help humans agree with each other, help agents avoid sprawl, and help evals determine whether a change is correct. In this sense, spec-driven work sits between product clarity and harness quality.

## What this concept is really about
- Turning intent into a machine-usable contract.
- Reducing ambiguity before execution scales.
- Linking planning, implementation, and validation.
- Making delegation portable across people and tools.

## Recurring patterns in the corpus
1. **Good specs shrink search space.**
2. **Acceptance criteria matter more when generation is cheap.**
3. **Specs improve review.** Reviewers can compare output against declared intent.
4. **Specs create eval seeds.** The best evals often begin as well-framed task definitions.
5. **Spec quality compounds with repo quality.** Agents perform better when system boundaries are explicit.

## Important distinctions
### Spec-driven is not bureaucracy-driven
The goal is not more documents. It is clearer execution contracts.

### PRDs are not enough
Many conventional product specs are too vague, too narrative, or too incomplete to guide agentic work.

## Design implications
- Require explicit task goals, constraints, and non-goals for agentic work.
- Pair specs with acceptance tests and rollback criteria.
- Use specs as shared inputs across planning, implementation, and eval.
- Template specs so teams can write them quickly and consistently.

## Why it matters for the book
Spec-driven development is one of the clearest bridges between traditional software discipline and modern agentic execution. It supports the book's argument that fundamentals become more important, not less.

## Source cluster
- [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 — Spec-Driven Development: Agentic Coding at FAANG Scale and Quality — Al Harris, Amazon Kiro]]
- [[057-ShuJ_CN6zr4-making-codebases-agent-ready-eno-reyes-factory-ai|#57 — Making Codebases Agent Ready – Eno Reyes, Factory AI]]
- [[087-wVl6ZjELpBk-future-proof-coding-agents-bill-chen-brian-fioca-openai|#87 — Future-Proof Coding Agents – Bill Chen & Brian Fioca, OpenAI]]
- [[179-x_1EumTaXeE-beyond-the-prototype-using-ai-to-write-high-quality-code-josh-albrecht-imbue|#179 — Beyond the Prototype: Using AI to Write High-Quality Code - Josh Albrecht, Imbue]]
- [[190-Zniw5c9_jx8-mentoring-the-machine-eric-hou-augment-code|#190 — Mentoring the Machine — Eric Hou, Augment Code]]

## Open questions
- What is the minimum viable spec for small tasks versus large refactors?
- How can teams keep specs current without creating process drag?
- Which parts of specs should be model-authored versus human-authored?
