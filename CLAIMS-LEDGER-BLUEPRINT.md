# Claims-Ledger-as-a-Service — Technical Blueprint

> Pivot plan for turning the `ai-engineering-book-lab` evidence machinery into an open-source
> infrastructure tool for the agentic-AI dev ecosystem. Target: #1 trending on GitHub,
> front page of Hacker News, default install in agent harnesses.
>
> **Grounding.** Everything below builds on machinery that already runs in this repo:
> `claims/Claims Ledger.md` (the canonical markdown ledger), `99_Meta/scripts/anchor/build_evidence.py`
> (regex parser → `website/src/evidence.json`), `stats.json` (currently **54 claims** — 44 strong /
> 10 moderate — **199 anchors** — 198 high-confidence — across a **794-video** practitioner corpus),
> the cross-family judge panel (`build_judge_scores.py` + book-mash: Llama-3.3 / Qwen-2.5 / DeepSeek,
> median verdict on 6 dimensions), and the Vite 6 + React 19 SSG reader with `EvidenceRail.tsx` and
> `EvidenceGraphPage.tsx` at fromcopilottocolleague.com. The pivot is: **the same "no anchor, no claim"
> discipline, applied to codebases and engineering decisions instead of book chapters.**

---

## The one-line pitch

**Every claim in your docs, PRs, and agent decisions carries a machine-verifiable pointer to its
source — a commit, a doc section, a transcript timestamp — and CI fails when the pointer goes stale.**

The book proved the discipline works at manuscript scale (`no anchor, no claim`). The service
generalizes the primitive:

```
Book world                      →   Infra world
─────────────────────────────       ─────────────────────────────
claims/Claims Ledger.md         →   .ledger/claims.md  (per-repo)
video_id + HH:MM:SS.mmm anchor  →   AnchorRef (git SHA + file:line | doc heading | transcript ts)
support_level strong/moderate   →   same enum, now CI-gated
build_evidence.py               →   ledger-core (parser/differ/verifier, extracted & hardened)
website EvidenceRail            →   PR annotations + hosted ledger viewer
judge panel (median of rivals)  →   support-level scorer (same cross-family median trick)
```

---

# 1. GitHub Action Architecture — "Auto-Ledger & Verify"

## 1.1 What the Action does

On every PR (and on `main` pushes), the Action:

1. **Ingests** changed inputs — code, docs, transcripts — through pluggable adapters.
2. **Extracts** candidate claims (declarative statements that assert something about the system).
3. **Anchors** each claim to a source: a commit + file range, a doc heading, or a transcript timestamp.
4. **Scores** support level (`strong | moderate | tentative`) using the cross-family judge-panel
   pattern lifted from `build_judge_scores.py` (median of 3 rival models; disagreement > threshold
   flags the claim instead of averaging it away).
5. **Diffs** the resulting ledger against the base branch's ledger and annotates the PR.
6. **Verifies** existing anchors are still fresh (the anchored file/line still exists, the doc
   heading still says what the claim says it says) and fails the check on stale anchors.

## 1.2 Ingestion adapters

Each adapter normalizes an input into `SourceDocument` records. Formats are chosen to match what
already exists (the repo already ingests YouTube metadata + transcripts via
`99_Meta/scripts/ingest_ai_engineer_videos.py` and `99_Meta/transcripts/`).

| Adapter | Input | Anchor form produced |
|---|---|---|
| `code` | git diff of the PR (`--diff-filter=ACMR`) | `git://<sha>/<path>#L<start>-L<end>` |
| `docs` | Markdown/MDX/AsciiDoc changed in PR, plus a configurable `docs_globs` | `doc://<path>#<heading-slug>@<sha>` |
| `adr` | `docs/adr/*.md`, MADR/Nygard formats auto-detected | `adr://<id>@<sha>` |
| `transcript-vtt` | WebVTT / SRT (Zoom, Meet, Teams export) | `ts://<recording_id> <HH:MM:SS.mmm> → <HH:MM:SS.mmm>` |
| `transcript-json` | Whisper/Deepgram/AssemblyAI JSON (word-level timestamps) | same as above, word-snapped |
| `youtube` | 11-char video ID + fetched captions (this is exactly today's `video_id` anchor) | `yt://<video_id> <start> → <end>` |
| `issue` | GitHub issue/discussion URLs referenced in the PR body | `gh://issues/<n>#comment-<id>` |

The transcript anchor format is **byte-compatible with the book's anchor regex** in
`build_evidence.py`:

```python
_ANCHOR = re.compile(
    r"\*\*Anchor:\*\*\s*`([A-Za-z0-9_-]{11})`\s*"
    r"(\d\d:\d\d:\d\d\.\d\d\d)\s*(?:→|-{1,2}>)\s*(\d\d:\d\d:\d\d\.\d\d\d)"
    r".*?confidence:\s*(\w+)"
)
```

`ledger-core` keeps this grammar for the `yt://` and `ts://` schemes and adds the `git://`,
`doc://`, `adr://`, `gh://` schemes. The 794-video corpus becomes the first public reference
dataset for the transcript adapters.

## 1.3 The pipeline

```
                        ┌─────────────────────────────────────────────────────┐
                        │           auto-ledger-verify (GitHub Action)        │
                        └─────────────────────────────────────────────────────┘

  PR event ──► ①  INGEST                ②  EXTRACT               ③  ANCHOR
              ┌──────────────┐        ┌───────────────┐        ┌─────────────────┐
  code diff ─►│ code adapter │        │ claim miner   │        │ anchor resolver │
  docs      ─►│ docs adapter ├──────► │ (LLM, per-    ├──────► │ exact-match →   │
  *.vtt     ─►│ vtt adapter  │ Source │  hunk/section │ Claim  │ fuzzy → embed   │
  yt ids    ─►│ yt adapter   │ Docs   │  prompts)     │ drafts │ (local index)   │
              └──────────────┘        └───────────────┘        └────────┬────────┘
                                                                        │
              ⑥  ANNOTATE               ⑤  DIFF                 ④  SCORE▼
              ┌──────────────┐        ┌───────────────┐        ┌─────────────────┐
  PR check  ◄─┤ checks API + │        │ ledger differ │        │ support scorer  │
  PR comment◄─┤ review       │◄───────┤ base ledger   │◄───────┤ 3-model panel,  │
  artifact  ◄─┤ comments     │  Δ set │ vs head ledger│ scored │ median verdict  │
              └──────────────┘        └───────────────┘ claims └─────────────────┘
                                              │
                                              ▼
                              .ledger/claims.md   (committed, human-editable —
                              .ledger/ledger.json  same dual-artifact pattern as
                                                   Claims Ledger.md → evidence.json)
```

Key design decisions, each inherited from something that already works in the lab:

- **Markdown is the source of truth, JSON is the build artifact.** Exactly the
  `Claims Ledger.md → evidence.json` pattern. Humans edit `.ledger/claims.md`; the Action
  regenerates `.ledger/ledger.json` deterministically (a port of `parse_ledger()`).
- **Claim extraction is per-hunk, not per-file.** The claim miner sees one diff hunk or one doc
  section at a time with the repo's ledger as context, so it proposes *deltas*, not rewrites —
  same bounded-mission discipline as the autoresearch passes in `research_passes/`.
- **Anchoring is a resolver cascade**: exact string match in the source → fuzzy match
  (rapidfuzz, threshold 0.87) → embedding search over a local index. No anchor found ⇒ the claim
  is emitted as `support_level: tentative` and flagged. **No anchor, no strong claim** — the book's
  rule, mechanized.
- **Scoring reuses the judge-panel trick.** Three cross-family models score
  `claim ⟷ anchored evidence` entailment; the median is the verdict; >20-point disagreement flags
  the cell rather than averaging (verbatim the policy in `docs/judge-panel-decision.md`).
  Dimensions collapse from the book's six to two: `claim_defensibility` and `evidence_density`.

## 1.4 Ledger data model (v1 schema)

A direct superset of the object `build_evidence.py` already emits:

```jsonc
// .ledger/ledger.json — one entry per claim
{
  "claim_id": "claims#17",                    // same key format as today
  "text": "Auth tokens are rotated every 24h by the session worker",
  "support_level": "strong",                  // strong | moderate | tentative
  "candidate_scopes": ["auth", "workers"],    // generalizes candidate_chapters
  "anchors": [
    {
      "scheme": "git",                        // NEW — was implicitly "yt"
      "ref": "git://4f2a9c1/services/session/rotate.ts#L41-L58",
      "confidence": "high",                   // high | medium | low (unchanged)
      "label": "rotate.ts — rotateToken()",   // unchanged
      "quote": "const ROTATION_INTERVAL_MS = 24 * 60 * 60 * 1000",  // unchanged
      "freshness": { "verified_at": "2026-07-02T21:00:00Z", "status": "fresh" }
    },
    {
      "scheme": "ts",
      "ref": "ts://arch-review-2026-06-12 00:14:02.400 → 00:14:31.200",
      "start_seconds": 842,                   // unchanged convenience field
      "confidence": "high",
      "label": "Arch review — Priya (Platform)",
      "quote": "we agreed the worker owns rotation, not the gateway"
    }
  ],
  "caveats": "Rotation is best-effort; a worker crash can extend the window.",
  "provenance": { "extracted_by": "auto-ledger/1.2.0", "pr": 481, "run_id": "9174..." }
}
```

## 1.5 `action.yml` (boilerplate, valid syntax)

```yaml
name: 'Auto-Ledger & Verify'
description: >-
  Extract source-anchored claims from code, docs, and meeting transcripts;
  diff the Claims Ledger; verify anchor freshness; annotate the PR.
author: 'isatimur'
branding:
  icon: 'anchor'
  color: 'orange'

inputs:
  ledger-path:
    description: 'Path to the markdown ledger (source of truth)'
    default: '.ledger/claims.md'
  mode:
    description: 'extract | verify | both'
    default: 'both'
  docs-globs:
    description: 'Newline-separated globs for doc ingestion'
    default: |
      docs/**/*.md
      README.md
  transcripts-dir:
    description: 'Directory of .vtt/.srt/whisper.json meeting transcripts'
    default: '.ledger/transcripts'
  fail-on:
    description: 'Comma list: stale-anchor,unanchored-strong,support-downgrade'
    default: 'stale-anchor,unanchored-strong'
  judge-models:
    description: 'Cross-family panel, comma-separated (median wins)'
    default: 'meta-llama/llama-3.3-70b,qwen/qwen-2.5-72b,deepseek/deepseek-chat'
  openrouter-api-key:
    description: 'API key for the judge panel (skip scoring if empty)'
    required: false
  github-token:
    description: 'Token for Checks API + PR comments'
    default: ${{ github.token }}

outputs:
  ledger-diff:
    description: 'JSON summary: {added, modified, removed, downgraded, stale}'
  report-path:
    description: 'Path to the generated ledger-report.md artifact'

runs:
  using: 'node20'
  main: 'dist/index.js'
```

Consumer workflow:

```yaml
# .github/workflows/ledger.yml
name: claims-ledger
on:
  pull_request:
  push:
    branches: [main]

jobs:
  ledger:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      checks: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }        # differ needs the base ledger
      - uses: isatimur/auto-ledger-verify@v1
        with:
          openrouter-api-key: ${{ secrets.OPENROUTER_API_KEY }}
      - uses: actions/upload-artifact@v4
        with:
          name: ledger-report
          path: .ledger/ledger-report.md
```

## 1.6 Example output artifact (`ledger-report.md`)

```markdown
# Ledger diff — PR #481 (4f2a9c1 vs main@e91b3d0)

**54 claims → 56 claims** · +2 added · 1 modified · 0 removed · ⚠ 1 stale anchor

## Added
### claims#55 — Auth tokens are rotated every 24h by the session worker  [strong]
- Anchor: `git://4f2a9c1/services/session/rotate.ts#L41-L58` · confidence: high
  - Quote: "const ROTATION_INTERVAL_MS = 24 * 60 * 60 * 1000"
- Anchor: `ts://arch-review-2026-06-12 00:14:02.400 → 00:14:31.200` · confidence: high
  - Quote: "we agreed the worker owns rotation, not the gateway"
- Panel: llama 88 / qwen 91 / deepseek 86 → median 88 (defensibility)

## Stale ⚠
### claims#31 — Gateway validates JWTs locally without a network call  [strong → tentative]
- Anchor `git://a11c04d/gateway/verify.ts#L12-L30` no longer resolves
  (file moved to gateway/auth/verify.ts in this PR). Re-anchor or downgrade.
```

## 1.7 PR annotation strategy

Two surfaces, mirroring how the website splits EvidenceRail (inline) from `/read/graph` (overview):

**Checks API** — one check run `claims-ledger/verify` with per-file annotations:

```jsonc
// POST /repos/{owner}/{repo}/check-runs
{
  "name": "claims-ledger/verify",
  "head_sha": "4f2a9c1...",
  "conclusion": "action_required",       // neutral | success | action_required
  "output": {
    "title": "1 stale anchor, 2 new claims",
    "summary": "54 → 56 claims · anchors verified: 198/199 fresh",
    "annotations": [{
      "path": "gateway/auth/verify.ts",
      "start_line": 12, "end_line": 30,
      "annotation_level": "warning",
      "title": "Stale anchor for claims#31",
      "message": "This PR moved the file that anchors claims#31 ('Gateway validates JWTs locally...'). Run `edt reanchor claims#31` or accept the downgrade to tentative."
    }]
  }
}
```

- `stale-anchor` on a **strong** claim ⇒ `action_required` (blocks merge if the check is required).
- New **tentative** claims ⇒ `neutral` + comment nudge.
- Everything fresh ⇒ `success` with the diff summary.

**Sticky PR comment** — one comment, updated in place (marker
`<!-- claims-ledger-report -->`), containing the top of `ledger-report.md` plus deep links into the
hosted viewer (`https://<org>.claims-ledger.dev/pr/481`). Claim IDs are always rendered as
`claims#N` — the same stable key the book uses — so they're grep-able across PR history.

---

# 2. Autonomous Agent Integration — the Evidence-Decision-Trace CLI

## 2.1 The CLI: `edt`

Name: **`edt`** — *Evidence Decision Trace*. Short enough to type in a hook, unambiguous as a
binary, and the artifact it produces ("an EDT") is a noun people can ask each other for. Package:
`npm i -g @claims-ledger/edt` (single static binary via `bun build --compile` as fallback).

The core idea: **an agent that modifies code must attach a micro-ledger to the PR** — a trace of
each decision it made, anchored to the internal docs, past commits, or transcripts that justify it.
This is the book's discipline pointed at agent output instead of manuscript prose, and it is the
practical form of the "verifiable agent decisions" concept from the external-causal-workspace
experiments.

```
edt init                          # scaffold .ledger/ + hooks
edt trace new --pr 481            # open a trace for the current branch
edt trace add-decision \
    --text "Moved JWT verification into gateway/auth/ to isolate crypto deps" \
    --anchor "doc://docs/adr/0007-auth-module-boundaries.md#decision@e91b3d0" \
    --anchor "git://c3d9a72/gateway/verify.ts#L1-L8" \
    --confidence high
edt trace score                   # run the judge panel over decision⟷evidence pairs
edt verify                        # freshness-check every anchor in trace + ledger
edt reanchor claims#31            # resolver cascade against current HEAD
edt render --format pr-body       # emit the PR body block (see 2.4)
edt export --format ledger-json   # merge accepted decisions into .ledger/ledger.json
edt mcp serve                     # expose everything as an MCP server (see 2.3)
```

## 2.2 Trace JSON schema

A trace is a sibling of the ledger schema — decisions instead of claims, but identical anchor
grammar so `ledger-core` parses both:

```jsonc
// .ledger/traces/pr-481.trace.json
{
  "$schema": "https://claims-ledger.dev/schemas/trace-v1.json",
  "trace_id": "edt-2026-07-02-481",
  "agent": { "name": "claude-code", "version": "2.1", "session": "9b1f..." },
  "branch": "feat/auth-module-boundary",
  "decisions": [
    {
      "decision_id": "edt#1",
      "text": "Moved JWT verification into gateway/auth/ to isolate crypto deps",
      "kind": "refactor",                        // refactor | behavior | dependency | config | schema
      "support_level": "strong",                 // computed from anchors + panel score
      "anchors": [
        {
          "scheme": "doc",
          "ref": "doc://docs/adr/0007-auth-module-boundaries.md#decision@e91b3d0",
          "confidence": "high",
          "quote": "crypto-touching code lives under gateway/auth/ exclusively"
        },
        {
          "scheme": "git",
          "ref": "git://c3d9a72/gateway/verify.ts#L1-L8",
          "confidence": "high",
          "quote": "// TODO(priya): this file should not import node:crypto directly"
        }
      ],
      "panel": { "scores": [86, 90, 84], "median": 86, "spread": 6, "flagged": false },
      "regression_risk": {
        "level": "low",
        "basis": "gateway/auth/verify.test.ts covers all moved symbols; no public API change"
      }
    }
  ],
  "summary": { "decisions": 4, "strong": 3, "moderate": 1, "tentative": 0, "stale_anchors": 0 }
}
```

**Exit codes** (for CI gating — `edt verify --gate` in the Action's `verify` mode):

| Code | Meaning |
|---|---|
| `0` | all decisions anchored, all anchors fresh, no strong-claim downgrades |
| `10` | ≥1 decision with `support_level: tentative` (unanchored) |
| `11` | ≥1 stale anchor (target moved/deleted/reworded past fuzzy threshold) |
| `12` | panel spread > 20 on ≥1 decision (rival models disagree — human look required) |
| `13` | trace missing entirely for a branch that config requires one for |
| `2`  | internal error (never gates; reported as check `neutral`) |

## 2.3 How agents prove their work — MCP surface & hooks

`edt mcp serve` exposes the trace machinery over MCP so Claude Code, Copilot Workspace, and
LangGraph/CrewAI nodes can call it as tools mid-task:

| MCP tool | Purpose |
|---|---|
| `ledger_search(query, k)` | embedding + keyword search over `.ledger/ledger.json`, ADRs, doc headings, and the transcript index — the agent finds evidence *before* deciding |
| `trace_add_decision(text, kind, anchors[])` | append a decision; server runs the resolver cascade and rejects anchors whose `quote` doesn't appear at `ref` (agents cannot fabricate anchors — the quote must literally resolve) |
| `trace_score()` | run the cross-family panel; returns median + spread per decision |
| `anchor_verify(ref)` | freshness check for a single anchor |
| `ledger_claims(scope)` | list existing claims touching a scope, so the agent knows which claims its diff might invalidate |

The **anti-fabrication property** is the load-bearing design point: an anchor is only accepted if
the verbatim `quote` resolves at `ref` at the pinned SHA — the same reason the book's anchors carry
verbatim quotes next to timestamps. An LLM can hallucinate a justification; it cannot hallucinate a
string into a commit.

**Anchor freshness & regression-risk mitigation.** `edt verify` re-resolves every anchor against
HEAD: exact → fuzzy (file renames followed via `git log --follow`) → embedding similarity of the
enclosing section. Below threshold ⇒ `stale`, and any claim whose *only* strong anchor went stale
is auto-downgraded — which is exactly the failure mode the Action's `support-downgrade` gate
catches. This turns the ledger into a **regression tripwire**: refactor a file that anchors a
claim about system behavior, and CI asks "does this claim still hold?" before merge, not after
the incident.

**Agent-specific wiring:**

- **Claude Code** — a `PreToolUse`/`Stop` hook pair: on stop, if the diff is non-empty and no trace
  exists, the hook blocks with "run `edt trace new` and anchor your decisions." Ship this as a
  skill (`SKILL.md` + hook), the same packaging as `harness-humanizer` — including its judge-loop
  shape: deterministic pre-flag pass, rubric judge, max-3-iterations, flag-don't-fabricate.
- **Copilot Workspace / Coding Agent** — the PR body block (2.4) is the integration surface;
  the Action validates it server-side, so no client install is needed.
- **LangGraph / CrewAI** — `edt` tools as a `ToolNode`; the graph pattern is
  `plan → ledger_search → act → trace_add_decision → trace_score → (spread>20 ? human_gate : done)`.

## 2.4 Concrete integration patterns

**Pre-commit hook** (installed by `edt init`):

```bash
#!/usr/bin/env bash
# .git/hooks/pre-commit — fail fast on stale anchors touched by this commit
edt verify --only-touched --gate || {
  echo "✖ claims-ledger: your commit breaks $(edt verify --only-touched --count) anchor(s)."
  echo "  Run: edt reanchor --interactive"
  exit 1
}
```

**PR body block** — `edt render --format pr-body` emits a fenced block the Action parses and
verifies server-side (agents that can't run binaries can still emit this text):

````markdown
```edt-trace v1
trace: edt-2026-07-02-481
- edt#1 [strong] refactor: Moved JWT verification into gateway/auth/
  ⚓ doc://docs/adr/0007-auth-module-boundaries.md#decision@e91b3d0 "crypto-touching code lives under gateway/auth/ exclusively"
  ⚓ git://c3d9a72/gateway/verify.ts#L1-L8 "// TODO(priya): this file should not import node:crypto directly"
- edt#2 [moderate] dependency: Replaced jsonwebtoken with jose (ESM, maintained)
  ⚓ gh://issues/442#comment-19883 "jsonwebtoken is CJS-only and blocks the ESM migration"
```
````

**CI verify subcommand** — the Action's `mode: verify` shells to the same code path:

```yaml
- name: Gate on evidence-decision-trace
  run: edt verify --trace .ledger/traces/pr-${{ github.event.number }}.trace.json --gate
  # exit 10/11/12/13 fail the job with the mapped message
```

---

# 3. Viral Growth & Marketing — the "Books of Truth" campaign

## 3.1 Engineering-as-marketing: the event ledgers

The insight from the book launch: the *interesting* artifact was never the prose — it was
"every claim links to the exact second of the talk." So the campaign is: **run high-profile
events through the engine and publish the interactive Fact-Checked Claims Ledger within 24–48h
of the event**, on fromcopilottocolleague.com (which already has the exact UI: EvidenceRail
with clickable YouTube timestamp embeds, the evidence graph, support-level badges).

Pipeline per event (all pieces exist):

```
event VOD (YouTube)                     # keynotes are public within hours
  → youtube adapter (video_id + captions; same ingest as the 794-video corpus)
  → claim miner: "extract every falsifiable product/benchmark/roadmap claim"
  → anchor each claim: yt://<video_id> <start> → <end> + verbatim quote
  → cross-reference: does the claim match public docs/benchmarks? (docs adapter over
    e.g. openai.com/index + arxiv abstracts) → support_level
  → publish: /ledgers/openai-devday-2026 — EvidenceRail UI, every claim clickable
    to the exact second Altman said it
```

Event calendar (each is a self-contained content drop + a live demo of the tool):

| Event | Angle |
|---|---|
| OpenAI DevDay | "Every benchmark claim from the keynote, anchored to the second, graded strong/moderate/tentative by a panel of *non-OpenAI* models" — the rival-panel detail is the story |
| Google I/O, WWDC | same treatment; cross-vendor comparison ledger ("claims all three made about on-device inference") |
| Lex Fridman AI episodes | 3-hour episodes are exactly the long-transcript case the anchor grammar was built for; guests' claims become a browsable ledger |
| NeurIPS/ICML keynotes | academic credibility flank |

Each published ledger ends with: *"This ledger was generated by `auto-ledger-verify` — the same
Action can anchor the claims in **your** repo's docs. `uses: isatimur/auto-ledger-verify@v1`."*
That is the content→install conversion path.

## 3.2 Launch mechanics

**Repo readiness checklist (before any post):**

- [ ] `edt init && edt verify` passes on the tool's own repo — **the repo's own README claims are
      in `.ledger/claims.md` with anchors** (self-hosting is the credibility move; the book repo
      already models this with its committed `stats.json` + regen workflows)
- [ ] 60-second GIF at top of README: PR opened → check fails on stale anchor → `edt reanchor` →
      check green (record against a real refactor, not a toy)
- [ ] `README` quickstart is ≤ 5 lines to first value (`npx @claims-ledger/edt init` on any repo
      with docs — it should find and anchor 5–10 claims immediately)
- [ ] Two live event ledgers already published (so the HN post links to a *thing*, not a promise)
- [ ] Marketplace listing live with the two workflows from §1.5 as copy-paste examples
- [ ] `CONTRIBUTING.md` + 10 good-first-issues seeded (HN traffic converts to contributors in
      the first 48h or never)
- [ ] The badge (below) already on 3–5 friendly repos

**The badge — the viral loop.** A shields.io-style dynamic badge served per-repo:

```markdown
[![Claims verified](https://img.claims-ledger.dev/badge/isatimur/ai-engineering-book-lab)](https://claims-ledger.dev/r/isatimur/ai-engineering-book-lab)
```

renders **`claims 54 anchored · 198/199 fresh`** and links to that repo's hosted ledger. Every
README carrying it advertises the tool to exactly the audience that cares (people reading
engineering docs and wondering "is this still true?"). This is the `github stars` badge dynamic:
the badge is free, flattering (it proves your docs are maintained), and every impression is an ad.

**Sequencing (T = HN launch day, a Tuesday):**

- T−14: badge + Action quietly live; friendly repos onboarded; event ledger #1 published, shared
  only on X — collect the reaction quotes.
- T−7: event ledger #2 (ideally timed to an actual event that week). Blog post drafted:
  *"We anchored every claim in a 794-video corpus. Then we pointed the machine at our own codebase."*
- T, 07:30 PT: Show HN post (title below), first comment is the maker's technical walkthrough —
  schema, the anti-fabrication quote-resolution trick, exit codes. HN respects mechanism over vision.
- T+1: Product Hunt (never same day as HN), assets: the GIF, the event ledger, the badge.
- T+2..7: X thread dissecting the event ledger's spiciest finding ("3 keynote claims graded
  *tentative* — here's the exact second each was made"); dev.to/newsletter follow-ups; respond to
  every HN comment with code links.

## 3.3 Three Show HN titles

1. **Show HN: A GitHub Action that fails CI when your docs' claims go stale**
2. **Show HN: We fact-checked the OpenAI DevDay keynote, anchored to the second (open-source pipeline)**
3. **Show HN: Make AI coding agents cite their sources — every decision anchored to a commit or ADR**

(#1 is the safest lead: concrete, immediately testable, pain-first. #2 is the high-variance
event-ledger play — run it only in the same week as the event. #3 targets the agentic-AI current;
strongest if the Claude Code skill ships day one.)

---

# 4. Step-by-Step Implementation Roadmap

## Phase 1 — MVP CLI (`edt` + `ledger-core`) — ~3 weeks

| Week | Deliverable | Reuse vs build |
|---|---|---|
| 1 | `ledger-core` (TypeScript): parser for `.ledger/claims.md`, the 6 anchor schemes, differ, resolver cascade | **Port** `build_evidence.py`'s `parse_ledger()`/`build_index()` (104 lines, regex-driven — a mechanical port; keep the Python version as the conformance oracle with a shared fixture suite from the real 54-claim ledger) |
| 1–2 | `edt` CLI: `init/trace/verify/reanchor/render/export`, exit codes per §2.2 | **Build** (thin — commands compose `ledger-core`) |
| 2 | Judge-panel scorer via OpenRouter (3 models, median, spread-flag) | **Port** the merge/median logic from `panel_merge.py` + `build_judge_scores.py` (and its tests, `test_panel_merge.py`) |
| 3 | Transcript adapters (VTT/SRT/whisper-JSON), `edt mcp serve`, Claude Code skill + hook | **Reuse** the anchor grammar; **build** adapters (~150 LoC each); skill packaging copies the `harness-humanizer` structure |
| 3 | Dogfood: run `edt init` on `ai-engineering-book-lab` itself; the book ledger becomes the flagship `.ledger/` | **Reuse** everything |

**Stack decision — TypeScript for CLI + Action, Python stays as oracle.** Rationale: GitHub
Actions' `node20` runtime means a TS Action has zero cold-start setup (the existing
`evidence-regen.yml` pays a `setup-python` + pip install on every run); the MCP SDK and the
agent ecosystem's package manager is npm; the website is already TS so the hosted viewer shares
types with `ledger-core`; and `bun --compile` gives the single-binary story for hooks. The Python
scripts (`build_evidence.py`, `panel_merge.py`) are kept as the conformance reference — their
regexes *are* the spec.

**No vector DB in Phase 1.** The resolver cascade needs embedding search over one repo's docs +
ledger — that's thousands of chunks, not millions. Use `sqlite-vec` in `.ledger/index.db`
(local, zero-infra, committable to CI cache). A hosted vector DB (Turbopuffer or pgvector on the
existing Vercel/Neon stack) only enters in Phase 3 for the cross-repo hosted viewer. LLM calls go
through OpenRouter exclusively — the judge panel already lives there conceptually (Llama/Qwen/
DeepSeek are OpenRouter-native), and it keeps the Action config to one secret.

## Phase 2 — GitHub Action + Marketplace — ~2–3 weeks

| Week | Deliverable | Notes |
|---|---|---|
| 4 | `auto-ledger-verify` Action: `dist/index.js` bundle (`@vercel/ncc`), Checks API annotations, sticky comment | Composes `ledger-core` + Octokit; the `action.yml` from §1.5 |
| 4–5 | Ledger differ against base branch; `fail-on` gate matrix; `ledger-report.md` artifact | Diff = claim-set diff keyed on `claim_id`, then per-claim anchor diff |
| 5 | Marketplace listing (verified publisher), `v1` tag discipline, integration tests via `act` + a public sandbox repo | Sandbox repo doubles as the README demo |
| 5–6 | Badge service: Cloudflare Worker reading each repo's committed `.ledger/ledger.json` via raw.githubusercontent, cached 1h | ~100 LoC; no DB — the ledger file *is* the API |

## Phase 3 — Viral launch + hosted viewer — ~2 weeks + ongoing

| Week | Deliverable | Notes |
|---|---|---|
| 6–7 | Hosted ledger viewer at claims-ledger.dev: the existing `EvidenceRail.tsx` / `EvidenceGraphPage.tsx` generalized to render any repo's `ledger.json` | **Reuse** the Vite 6 + React 19 + vite-react-ssg + Tailwind 4 stack and components wholesale; deploy on the existing Vercel setup |
| 7 | Event-ledger pipeline: youtube adapter + publish script → `/ledgers/<event>` on fromcopilottocolleague.com | **Reuse** the whole ingest path (`ingest_ai_engineer_videos.py`, transcripts dir) |
| 8 | Launch per §3.2: two event ledgers live → Show HN → PH → X thread | Maker availability blocked out for 48h of comment response |
| ongoing | Event calendar cadence; Copilot Workspace + LangGraph integration recipes; `trace-v2` (multi-agent traces) | Community-driven after good-first-issues seed |

**Effort summary:** one senior engineer, ~8 weeks to launch; the leverage is that roughly half the
system already exists and is battle-tested against a 794-video corpus — the parser grammar, the
judge panel, the freshness discipline, the entire viewer UI, and (crucially) the flagship demo
dataset: the book itself, whose 54 claims and 199 anchors become the first public `.ledger/` the
moment `edt init` runs at the repo root.

**What makes this defensible:** not the LLM calls (anyone can extract claims) but the
**anchor-grammar + quote-resolution + freshness-gate loop** — the mechanized version of a
discipline that was proven by shipping an actual book through it. The repo's history *is* the
credibility: 18 research passes, committed judge scores, and a public methodology. Competitors
would be shipping a spec; this ships a track record.
