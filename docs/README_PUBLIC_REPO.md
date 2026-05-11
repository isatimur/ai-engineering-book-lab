# ai-engineering-book-lab

Public experiment: can a source corpus plus autonomous agent loops produce a defensible AI engineering book?

## What this repo is
This project turns a growing corpus of AI Engineer talks and related materials into:
- structured notes
- concept/theme/person synthesis
- verified claims and evidence packs
- chapter packets and draft-ready manuscript material

## What this repo is not
- not a raw transcript dump
- not a promise that all notes are polished
- not a benchmark of model intelligence

## Core loop
1. Sync public sources.
2. Ingest only missing materials.
3. Convert source notes into concept/theme/person synthesis.
4. Extract verified claims and tensions.
5. Promote evidence into chapter packets and manuscript drafts.
6. Improve the research instructions and repeat.

## Public repo shape
- `docs/` — architecture, operating model, public/private split
- `programs/` — agent instructions / research org code
- `tasks/` — bounded agent entrypoints
- `claims/` — reusable verified claims
- `evidence/` — chapter or topic evidence packs
- `research_passes/` — logs of bounded research passes

## Local working corpus
The full working vault also contains local-heavy folders like `01_Videos/`, `99_Meta/transcripts/`, and working playbooks. Those can stay local while this public layer documents the process and selected outputs.
