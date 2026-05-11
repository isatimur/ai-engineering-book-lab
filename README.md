# ai-engineering-book-lab

Public experiment: can a source corpus plus autonomous agent loops produce a source-backed AI engineering book?

This repository grows out of a larger local working vault built from the AI Engineer YouTube channel. The aim is not to dump transcripts, but to build a reproducible research-and-writing machine that turns source material into:

- structured notes
- theme / people / concept synthesis
- verified claims and evidence packs
- chapter packets and drafting artifacts
- eventually, a real manuscript

## Core idea
Borrow the spirit of `autoresearch`, but apply it to a book project instead of model training.

That means:
- bounded research passes
- reusable agent instructions
- explicit claims/evidence layers
- cumulative logs of what improved
- a workflow that gets more useful as the corpus and playbook evolve

## Repo status
This is the first public-safe scaffold layer.

It contains the operating model for the experiment:
- docs
- agent programs
- task entrypoints
- claims/evidence scaffolding
- research pass logs

The full local vault contains additional working material (video notes, transcript caches, internal playbooks, heavier synthesis layers). Those are being curated gradually into public-safe form.

## Structure
- `docs/` — repo purpose, architecture, public/private split
- `programs/` — autoresearch-style agent instructions
- `tasks/` — bounded missions for different agents
- `claims/` — verified claims ledgers
- `evidence/` — evidence packs between notes and prose
- `research_passes/` — logs of autonomous research passes

## Intended agent tasks
Different agents should be able to run bounded jobs such as:
- sync source inventories
- improve one concept page
- extract claims for one chapter
- strengthen one chapter packet
- review the whole manuscript for overlap, weak evidence, or chapter-role confusion
- add future source types conservatively

## Current corpus state
At the time of this scaffold:
- AI Engineer inventory known locally: **666 videos**
- working corpus state is fully synced locally
- public mirror remains curated rather than automatic

## Philosophy
Prefer:
- defensible claims over hype
- explicit tensions over fake consensus
- reusable evidence over generic summaries
- chapter draftability over note sprawl

Avoid:
- unsupported generalization
- flattening disagreement
- confusing tooling catalogs for arguments
- publishing local/private artifacts by accident

## Next steps
- curate the first public-safe mirror set from the working vault
- promote selected concept/theme/chapter artifacts into the repo
- expand claims ledgers and evidence packs
- add multi-agent review workflows for chapter-level and whole-manuscript passes

## License
MIT
