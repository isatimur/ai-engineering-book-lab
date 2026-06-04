# One-Shot AI Failure

## Working definition
One-shot AI failure is the pattern where teams expect a model or agent to solve a complex task correctly in a single pass, then mistake disappointment for a model limitation rather than a workflow-design problem.

## Core synthesis
The corpus keeps pushing against one-shot thinking. Production AI work tends to improve through iteration, feedback, evals, constraints, review loops, and better context. A serious workflow rarely asks an AI system to jump from vague intent to final answer without intermediate checks.

This concept connects [[Harness Engineering]], [[Coding Evals]], and [[Agent Observability]]. It is also a useful framing for explaining why "vibe coding" must mature into structured delegated work.

## Failure pattern
1. Human gives broad instruction.
2. Model produces plausible output.
3. Output is treated as finished work.
4. Hidden requirements and edge cases surface later.
5. Team blames the model instead of improving the workflow.

## Better pattern
1. Turn intent into a spec or task frame.
2. Give the system relevant context and constraints.
3. Produce a draft or plan.
4. Run checks, evals, or review.
5. Iterate with evidence.
6. Preserve what was learned for the next run.

## Source cluster
- [[664-ON5LIT0M4do-you-can-t-just-one-shot-it-mehedi-hassan-granola|#664 - You can't just one shot it]]
- [[016-am_oeAoUhew-harness-engineering-how-to-build-software-when-humans-steer-agents-execute-ryan-lopopolo-o|#16 - Harness Engineering]]
- [[040-HY_JyxAZsiE-spec-driven-development-agentic-coding-at-faang-scale-and-quality-al-harris-amazon-kiro|#40 - Spec-Driven Development]]
- [[072-tHN44yJoeS8-coding-evals-from-code-snippets-to-codebases-naman-jain-cursor|#72 - Coding Evals]]
- [[125-L8OoYeDI_ls-evals-are-not-unit-tests-ido-pesok-vercel-v0|#125 - Evals are not unit tests]]

## Output uses
- Chapter 3: why harnesses exist
- Chapter 4: why eval loops matter
- YouTube episode: "You Can't One-Shot Real AI Work"
