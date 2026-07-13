# Positioning Notes

Comparisons of *From Copilot to Colleague* against adjacent texts making similar
arguments. Purpose: know precisely where the book overlaps with the consensus
view and where it differentiates — for jacket copy, outreach, talks, and reviews.

## vs. Cao, "Agentic Software" (arXiv:2606.05608), §7.3 For Organizations — compared 2026-07-13

Source: Zhenfeng Cao, *Agentic Software: How AI Agents Are Restructuring the
Software Paradigm*, arXiv:2606.05608 (June 2026) — registered in
[evidence/External References.md](../evidence/External%20References.md).
Its organizational recommendations, three points: (1) identify
agent-ready workflows, (2) invest in evaluation frameworks, (3) redesign team
structures toward "smaller teams of agent orchestrators." Compared against the
canonical manuscript (`public/drafting/`, chapters 1, 3, 4, 9).

### Point-by-point

**1. "Identify agent-ready workflows" — book goes deeper, different verb.**
The passage treats agent-readiness as a property you *find* (tasks with clear
success criteria, defined scope, existing tests). The book treats it as a
property you *build*: Ch1 — "when a coding agent degrades on larger tasks, fix
the environment before blaming the model — improve the repository, harness,
specs, evals, and runtime so the workplace is legible to the agent"; Ch3 is
entirely about engineering that legibility. Ch9 adds the warning the passage
misses: cherry-picking amenable tasks is the partial-delegation trap — the real
gain is finding and converting the last human-only holdout process, not staying
where automation is easy.

**2. "Invest in evaluation frameworks" — strongest overlap; book is operational.**
The passage's core claim (output quality depends on evaluation-signal quality)
is Ch4's thesis: evals as the control system, "the operating system of trust."
Where the passage gestures at "beyond correctness: robustness, maintainability,
business intent," the book says where evals come from: mine commit history and
revert fixes (Cursor method), seed from real production failures not synthetic
benchmarks, treat a comfortably-passing benchmark as a warning, close the
observability→failure-analysis→eval loop. Ch9 adds what the passage lacks:
review/eval capacity as the company's throughput limit, and panel-based judging
(diverse model families voting) rather than a single judge.

**3. "Redesign team structures" — the book argues against this framing.**
The passage predicts topology: smaller teams of "agent orchestrators" replace
larger developer teams. Ch9 deliberately avoids the headcount-shape prediction
and argues the opposite dynamic on the creation side: **broader** creation,
narrower paths to ship (Lisa Orr — let support open PRs, but harden the single
shipping path). The book locates the change in *functions*, not team size:
judgment becomes the scarce resource, review becomes the bottleneck, someone
must own the judgment layer (James Lowe's AI-PM argument), alignment moves
upstream of the fan-out. On hiring the book is concrete and sourced where the
passage is generic: Hezarkhani's pay-on-outcomes proposal, Glenfield's "AI is
breaking how we hire technically."

### What the book covers that the passage doesn't touch

- Activity-vs-outcome metrics (counting PRs is counting the abundant resource)
- Alignment debt
- Governance as the load-bearing wall ("lightest governance that earns the
  trust to go fast")
- The small-team false plateau
- Writing down tacit standards before scaling

### Structural differentiator

Every claim in Ch9 is anchored to a named speaker via the event/claims-ledger
model; the passage is assertion without provenance.

### One-line summary

The passage is a correct but generic executive summary of the terrain. The
book's differentiators: the contrarian move on team topology (functions, not
headcount; broader creation, narrower shipping), operational specificity on
evals (provenance of the eval set, not just "have evals"), and source-anchored
claims throughout.
