# ai-engineering-book-lab — Public Repo Plan

This file marks the public-safe GitHub scaffold for this project.

## Target repo name
`ai-engineering-book-lab`

## Purpose
A public experiment in turning a large source corpus into a source-backed AI engineering book using autonomous research loops, multiple agents, and reproducible synthesis passes.

## Public-safe by default
These layers are suitable to mirror publicly after review:
- `README.md`
- `LICENSE`
- `.gitignore`
- `docs/`
- `programs/`
- `research_passes/`
- `claims/`
- `evidence/`
- `tasks/`
- selected files from `05_Book_Ideas/`, `04_Concepts/`, `02_Themes/`, `03_People/`
- scripts in `99_Meta/scripts/` that are not machine-specific or secret-bearing

## Keep local/private by default
These should stay local unless explicitly curated:
- raw machine-specific caches
- absolute local paths
- transient tmp outputs
- any private notes accidentally mixed into research files
- large raw transcript caches if not needed for the public experiment

## First push checklist
1. Remove or rewrite absolute local paths.
2. Confirm which transcript/raw source artifacts should be public.
3. Review selected chapter/book notes for anything too rough or too personal.
4. Confirm license choice (default: MIT).
5. Create the GitHub repo and push the public-safe layer.
