# Agent Task Entry Points

Use these as bounded missions for different agents.

- `sync_sources.md` — refresh source inventory and ingest only missing items
- `concept_pass.md` — strengthen one concept page from a source cluster
- `claims_pass.md` — extract verified claims for one topic/chapter
- `chapter_pass.md` — improve one chapter packet or starter
- `manuscript_review.md` — review one chapter or whole-manuscript coherence
- `add_source.md` — add a new source type in a conservative, reproducible way

## Skills

These task files are intentionally thin (goal + expected outputs). For
procedures with enough real-world detail to be worth codifying step-by-step
(commands, known failure modes, verification checks), see the project's
[`.agents/skills/`](../.agents/skills/) — a portable, invokable form (this
repo already extracted one, `harness-humanizer`, to its own repo; see
`docs/superpowers/specs/2026-06-02-harness-humanizer-skill-design.md`):

- [`corpus-sync`](../.agents/skills/corpus-sync/SKILL.md) — the full
  `sync_sources` procedure with the exact commands and the YouTube
  bot-check failure mode this repo has actually hit
- [`chapter-explainer-video`](../.agents/skills/chapter-explainer-video/SKILL.md) —
  scaffold, render, and publish a chapter's Remotion explainer video + OG card
