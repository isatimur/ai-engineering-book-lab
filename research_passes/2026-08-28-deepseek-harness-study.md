# DeepSeek Harness — a study pass

**Date:** 2026-08-28
**Artifact:** `deepseek-ai/deepseek-harness` @ `cd5ef8148158` (branch `master`)
**Why this repo:** 200k stars, MIT, TypeScript, created 2026-08-13. It is a production
agent harness whose own repository instructions are among the most developed public
examples of the discipline Chapter 3 argues for. Self-described "developer preview
with breaking changes" — everything below is a snapshot with a short half-life.

## Citation convention — read this first

This repo is **not corpus**. Every claim in either book resolves to a Source Anchor:
`video_id` + start/end timestamp + verbatim quote. A GitHub repository has no anchor
of that type.

So this document uses a different, explicitly weaker convention:

> `repo@cd5ef8148158:path/to/file` — a **non-corpus primary artifact**.

A `repo@sha:path` citation is *not* a Source Anchor and must never be pasted into
`claims/Claims Ledger.md` as one. `verify_prose_quotes.py` would register a verbatim
AGENTS.md quote in chapter prose as a prose miss — and prose misses are non-fatal
without `--strict`, so it would slip the gate silently. **Open question for the
operator, deliberately not decided here:** whether the ledger gains a second source
type for primary non-video artifacts. Until it does, nothing in this pass is
chapter-ready as a cited claim.

## Verification key

- **[R]** — read directly in this session. Content was fetched from `master` HEAD;
  the pin was confirmed afterwards by comparing blob SHAs at `?ref=cd5ef8148158`
  against HEAD (`AGENTS.md` = `956e28ea459f`, `SAFETY.md` = `2b76f00e0619`, both
  identical), so the reads and the pin refer to the same content.
- **[I]** — inferred from an [R] source, not separately confirmed.
- **[U]** — unread; named by an [R] source but its own contents not fetched.

Files read directly: `SAFETY.md`, `AGENTS.md`, `docs/architecture.md` (first 60
lines only), `.agents/notes/README.md`, `packages/examples/agent-spine-demo/README.md`,
`packages/interaction/README.md`, `packages/interaction/permission-presets/README.md`,
root tree, `packages/` listing, `packages/guard` and `packages/sandbox` listings.

---

## 1. Best practices

### 1.1 The instruction file carries obligations, not orientation

`AGENTS.md` is the centre of gravity. [R] It does not describe the project — it
constrains changes to it. Nearly every line is an enforceable rule paired with a link
to the gate or note that owns it. Representative rules, quoted at the pinned SHA:

- **"Registrations are effects"** — every contribution goes through `ctx.effect()` /
  `ctx.on()`; a registry's `register()` returns the disposer. [R]
- **"Model-visible ⟺ logged"** — anything reaching a model request must be
  reconstructable from the session log; a new model-visible input requires a session
  event. [R]
- **"Plugins, not loop changes"** — new behavior goes on documented extension points;
  changing `agent-loop` requires updating `docs/architecture.md`. [R]
- **"Misconfiguration fails loud"** at load when self-contained, otherwise at the
  earliest resolvable point; never silently skip a missing referent. [R]
- **"No hardcoded tunables in plugins"** — "a `DEFAULT_*` constant or test hook is not
  configurability." [R]
- **"An empty `catch` names what it swallows"** and why nothing else can reach it;
  keep the `try` to one statement. [R]
- **"Tests describe behavior, not correctness."** [R]

The transferable practice is the *pairing*: a rule states the obligation, and a
bracketed link points at the gate script or Agent Note that enforces or justifies it.
The instruction file is an index of enforcement, not a style essay.

### 1.2 Mechanically checkable invariants, wired to executed gates

[R] `AGENTS.md`: "Wire mechanically checkable invariants into an executed top-level
gate and prove each changed acceptance path rejects an invalid case."

Named gates observed [R]: `verify-export-jsdoc`, `verify-client-ui-i18n`,
`verify-cordis-config`, `verify-archived-agent-notes`, `verify-doc-budgets`,
`pnpm run hygiene` (knip + publint + workspace constraints), `pnpm run duplication`
(cross-file clone detection), `pnpm run doc-sync`. Coverage gate is **per-file 100%
on `packages/*/*/src`** via `test:coverage`, explicitly *not* `test` [R].

The second clause matters more than the first: proving the acceptance path *rejects*
an invalid case is the difference between a gate and decoration. This is the same
lesson recorded twice in this repo's own history — the `gen-llms.mjs` silent
chapter-drop and the boilerplate detector that undercounted on two markers instead of
five. A gate nobody has watched fail is not known to work.

### 1.3 Decisions are durable artifacts with a lifecycle

`.agents/notes/` holds **Agent Notes** — one decision each, recording "the *why* and
*what we gave up*, the parts code and docs can't carry" [R].

- Path encodes two axes: `{lifecycle}/{class}/yyyy-mm-dd-topic-title.md` [R].
- Lifecycle: `proposed/` → `implemented/` → `archived/`, plus `rejected/` [R].
- Class is a **closed set** — `feature`, `bug-fix`, `simplification`, `architecture`,
  `process`, `testing` — enforced by a classification gate against
  `scripts/agent-note-tree.ts`; other folders are rejected [R]. `refactor` is
  deliberately absent, because `simplification`'s discriminator ("does observable
  behavior change?") already covers it [R].
- **"Every non-trivial change MUST add or update at least one Agent Note in the same
  PR"** [R]; only purely mechanical/local edits are exempt.
- Implemented notes are **kept current with what shipped** — facts (paths, names,
  defaults) are updated when code moves, but never the decision itself [R].
- **A note is never edited into a different decision.** Supersede it with a new one and
  cross-link both [R].
- Archived notes are **permanently frozen**: not edited, translated, reformatted, moved,
  or treated as authority for current behavior [R].

Deliberately **no central `INDEX.md`** — a dedicated Agent Note owns that rationale [U].
The active tree *is* the inventory.

The frozen archive is the sharpest idea here. It solves the failure mode where an old
design doc silently becomes wrong and then gets cited as current. Freezing it, and
saying so in the policy, converts a stale document into an honest historical one.

### 1.4 Policy presentation is separated from enforcement

[R] `permission-presets` bundles two **independent enforcement knobs** — sandbox mode
and approval policy — into named presets. Shipped defaults: `workspace-write`
(workspace-write + ask) and `danger-full-access` (danger-full-access + never). A knob
combination matching no preset reads back as a derived `custom`, "which clients may
display but never select" [R].

The critical sentence: **"Mounting it requires a confining bash executor and the
approval service; it owns no enforcement itself."** [R] And: "removing the package
later leaves the last selection in effect" [R].

That is a clean separation — the selector is a *user-facing bundling of settings*, and
enforcement lives in the executor and the approval service. The honesty about removal
semantics (uninstalling the UI does not loosen the policy, it freezes it) is the kind
of detail most permission systems get wrong.

**Correction to an earlier reading in this session:** `guard/` is *not* the approval
gate. Per `AGENTS.md` [R], `guard/` is "loop-hygiene + tool-timeout plugins" — runaway
and cost control. Its subdirectories are `repeat-tool-reminder` and `timeout-policy`
[R]. Human approval lives in `interaction/`: `user-approval`, `permission-presets`,
`user-questions`, `tool-ask-user`, `commands` [R].

### 1.5 Safety claims are scoped down, not up

`SAFETY.md` is unusually candid for a vendor repo [R]:

> "Sandboxing, approval prompts, and permission controls can reduce risk, but they do
> not guarantee isolation or prevent damage. Even correctly enforced restrictions
> cannot protect resources that the project is allowed to access."

> "Do not rely on DeepSeek Harness as the sole security control for untrusted
> workloads."

Guidance is operational, not aspirational: least privilege, disposable VM or container,
keep backups of reachable files, review plugins and proposed commands [R].

### 1.6 A stated pre-release stance that licenses correct foundations

[R] "**Remove at the first tagged release.** Until then, prefer correct foundations to
compatibility shims: rename or repackage freely and update every reference. Backends
reject old on-disk formats." `dsh-session` holds `SESSION_FORMAT_VERSION` at `0` with
**no compatibility promise**; SQLite uses a monotonic `SCHEMA_VERSION` [R].

Naming the policy *and its expiry condition in the same paragraph* is the practice.
Most projects accumulate shims because nobody wrote down when the freedom to break
things ends.

### 1.7 Fail-closed vocabulary

[R] "Every `SessionEventMap` member is required-on-read: builds that do not know its
type **refuse the log**; only structural format changes bump `SESSION_FORMAT_VERSION`."

An old build meeting a new event refuses to proceed rather than degrading quietly.
Compare the corpus-side rule already in this repo: `panel_merge.py` refusing to merge
runs across different `corpus_snapshot_hash` values. Same instinct, different domain.

### 1.8 Prose discipline as an enforced gate

[R] "Comments and docs state complete contracts and context, not reasoning
transcripts. Use direct, concrete terms. **Do not use metaphors.** Before writing
`contract`, `boundary`, or `shape`, ask whether a more exact term names the subject:
write `response fields`, `JSON validation`, or `ESM exports` instead of
`response shape`, `validation boundary`, or `module shape`."

Reserved-word discipline with named substitutions, plus `verify-doc-budgets` enforcing
word ceilings and a documented procedure for raising one [R]. Docs ship with the code
change that invalidates them.

---

## 2. Practical use cases

### 2.1 Everything is a plugin, with no privileged core

[R] Plugins contribute services, typed events, and reversible effects to a shared
context. Core packages are ordinary plugins holding the product spine: `core/session`
(`ctx.sessions`), `core/system-prompt` (`ctx.systemPrompt`), `core/tools` (`ctx.tools`),
`core/agent` (`ctx.agents`), `core/agent-loop` (`ctx.agentLoop`), `core/scope`.

Built on **Cordis** (`cordiverse/cordis`), cited to arXiv:2608.25512 [R, from README].
Roughly 50 package groups [R].

### 2.2 Profiles and bundles — one codebase, five deployment postures

[R] Profiles `web`, `headless`, `sdk`, `sdk-minimal`, `acp` stack **bundles**, declared
via a `dsh` field in `package.json`. Layer order: **bundles → profile patch → home patch
→ `--patch` overlay**. Inspect the resolved result with `dsh --profile web --dump-config`.

A single explicit layering order plus a dump command is a strong pattern for any
system with per-environment configuration. The resolved configuration is inspectable,
so "which layer set this value" is answerable rather than archaeological.

### 2.3 The capability seam

[R] "A capability seam comprises **Service Definition / Service Provider / Consumer**
roles. It is complete, never one role; split only when roles evolve independently."

Visible across the tree [R]: `llm/` (definition + DeepSeek providers), `shell/`
(definition + local/pwsh providers + consumers), `web/` (definition + search/fetch
providers + tool consumer), `subagent/`, `workflow/`, `compaction/`, `fs/`, `skill/`.

The rule that a seam is *complete or absent* prevents the common decay where an
interface exists with exactly one implementation welded to it.

### 2.4 Defaulting is an explicit step, never a hidden fallback

[R] "**Explicit > implicit at package boundaries**: defaulting is an explicit
`resolve(request): Spec` step in the owning implementation, never a hidden
`?? default` inside `run()` (the `dsh-shell` request/spec split is the template)."

A request carries what the caller asked for; `resolve` turns it into a fully-specified
spec; `run` executes a spec with nothing left to guess. Directly transferable to any
pipeline where "what was actually used" needs to be recoverable after the fact.

### 2.5 Trust the type system where it actually holds

[R] "**Trust TypeScript at typed same-process boundaries.** Do not add runtime
validation, fallback behavior, or hostile-input tests solely for values the static
interface requires; validate at parser/config, queued, model/tool JSON, durable/file,
worker, process, and wire boundaries."

An enumerated list of where validation belongs. Notably **model/tool JSON** is on the
untrusted list — model output is treated as wire input, not as typed data.

### 2.6 Source plane vs artifact plane

[R] "**Source plane vs artifact plane, never mixed.** Static gates and tests resolve
workspace imports through tsconfig `paths` to `src` and pass on a clean tree; gates
consuming built `lib/` declare that dependency."

Cross-check on this repo's own tooling: several scripts here appear to read both
generated artifacts and source notes [I — impression from memory of this repo, not
an audit]. Worth checking against this rule; see §5.3.

### 2.7 Keyless recorded-session snapshots

[R] `pnpm run test:snapshot` replays recorded sessions through shipped profiles with
**no API key**; `test:snapshot:record` re-records and does need one. "Every non-trivial
model- or product-user-visible change updates a keyless recorded-session snapshot."
Fixtures replay on macOS and Linux — **"fix fixtures, not normalizers"** [R].

This is the answer to a problem this repo has hit repeatedly: MASH scoring and the
audiobook are both blocked behind keys the machine does not hold. Record-once /
replay-keyless splits the expensive keyed operation from the cheap verification that
runs on every change.

### 2.8 Both SDKs project the loop

[R] "Agent-loop, session-lifecycle, and `SessionEventMap` changes update the TypeScript
and Python SDK expected outputs in the same PR; `pnpm run test` covers neither."

Naming the coverage gap *inside the rule that compensates for it* is good practice —
the instruction states plainly that the default test command does not protect this.

### 2.9 Escalation with evidence

[R] "If a required `gh`, `pnpm`, build, test, or generator command fails because the
sandbox blocks credentials, network, IPC, watching, or nested `sandbox-exec`, retry
unchanged with the narrowest host escalation. **Require sandbox evidence; never bypass
test failures or the product sandbox.**"

Three constraints in one rule: retry *unchanged*, escalate *narrowest*, and require
evidence that the sandbox — not the code — caused the failure. It distinguishes an
environment failure from a real one, which is exactly where agents tend to rationalize.

### 2.10 Evidence proportional to the surface

[R] "Match evidence to the surface: focused behavior tests, model/user-output
snapshots, `doc-sync` for docs, built smokes for published paths, and real-API e2e for
providers. **Never default to the full suite** or repeat a passing check for commit or
push. CI owns exhaustive coverage and the platform matrix."

An explicit cost control on verification, with the division of labour named: local runs
are targeted, CI is exhaustive.

---

## 3. Samples

### 3.1 The minimal working agent — `agent-spine-demo`

[R] `packages/examples/agent-spine-demo` is "the default executor-less, UI-less agent
spine as one Cordis bundle plugin." Three-line composition:

```yaml
- name: '@deepseek-ai/dsh-agent-spine-demo'
  config:
    workspaceContext:
      maxBytes: 4096
- name: '@deepseek-ai/dsh-llm-deepseek'   # concrete adapter for ctx.llm
- name: '@deepseek-ai/dsh-bash-local'     # executor for ctx.shell
```

**In the bundle** [R]: in-memory sessions with automatic fallback titles; a system
prompt assembled from persona + Harness identity + optional workspace instructions;
model-facing tools for bash, local skills, and background jobs; optional persisted
goals; a loop running turns with provider-routed retries.

**Deliberately outside** [R]: the LLM adapter, model-backed session-title providers,
the bash executor, non-local skill providers, the entry point and per-app
infrastructure.

Two details worth stealing:

- **"It adds no prompts or tool schemas of its own — the model sees only what your
  configuration produces."** [R] A negative guarantee about context, stated in the
  README. Most frameworks inject invisible prompt text and never say so.
- **"`workspaceContext` is the one required field"** — a byte budget, or `false` for
  hermetic prompts [R]. Context budget is a mandatory, explicit decision, not a default.

### 3.2 The README as a fixed template

Every package README observed here [R: `agent-spine-demo`, `interaction`,
`permission-presets`] uses the same frontmatter and section skeleton:

```
---
description: "<who this is for and what decision it supports>"
kind: "package-reference" | "package-group"
---
# <package name>
English | [中文](README.zh.md)
## Summary            — one dense paragraph, complete contract
## Table of Contents
## Use this package   — the common path, stated as steps
## Understand the implementation
## Further Exploration
## Model Experience   — what the *model* sees
## Known Limitations and Deferred Work
## Dev Note
```

Two sections are unusual and both are good. **"Model Experience"** treats the model as
a first-class reader of the package. **"Known Limitations and Deferred Work"** is a
required section — gaps are structurally impossible to omit silently.

The `description` frontmatter is written for a reader deciding whether to open the
file, e.g. "for users and maintainers choosing, configuring, or debugging the
Permissions selector" [R].

### 3.3 Repository layout as a legible map

[R] `AGENTS.md` embeds the tree with a one-line purpose per group — `core/` "product
API spine", `guard/` "loop-hygiene + tool-timeout plugins", `plan/` "plan mode as
logged state", `self-modification/` "the agent inspects/mounts its own plugins". An
agent can route to the right package without a search.

`plan/` as "plan mode as **logged state**" is the notable one: planning is a recorded
session state, not an ephemeral prompt convention.

**But the map has drifted, and that is the more useful finding.** [R] At the pinned SHA
`packages/` holds **51 groups**. The `AGENTS.md` layout block names 36, of which **two do
not exist**: `self-modification/` ("the agent inspects/mounts its own plugins") is absent
from the tree, and `support/` is really `test-support/`. It omits 17 groups that do
exist — including `sandbox/`, which this session read directly, plus `mcp`, `storage`,
`schedule`, `jobs`, `host`, `client`, `goal`, `workspace`, `spill`, `attachment`,
`code-runtime`, `extensions`, `feedback`, `runtime-diagnostics`, `session-query` and
`test-support`.

The linked deep reference is in far better shape: `packages/README.md` names **50 of the
51** groups (only `mcp/` is unnamed), uses the correct `test-support/`, and does not
mention `self-modification` at all [R].

So the maintained reference stayed current while the summary inside the instruction file
rotted. The mechanism is visible in §1.2: this repo gates JSDoc (`verify-export-jsdoc`),
config (`verify-cordis-config`), i18n (`verify-client-ui-i18n`), doc budgets
(`verify-doc-budgets`) and archived notes — but **nothing gates the layout block against
the actual tree**, and it is the doc fact that drifted. That is §1.2's own principle
turned on its author: the ungated fact is the one that goes stale, and a repository this
disciplined still could not keep a hand-maintained summary honest by intention alone.

For the book this is worth more than the praise it replaces. It is a clean, checkable
instance of documentation drifting from code *in the best-instrumented repository
available*, which is a stronger form of the argument than any well-maintained example.

### 3.4 CLAUDE.md as a symlink

[R] "`CLAUDE.md` symlinks `AGENTS.md` at root and `packages/`; edit the real file."

One source of truth, two names, no drift between harnesses. Trivially adoptable.

---

## 4. Bearing on the books

**Chapter 3 (harness engineering, specs and codebases agents can use)** is where this
lands. The chapter argues that agent-ready repositories need machine-checkable
structure. This repo is a large, public, adversarially-gated instance of that argument
— and `AGENTS.md` demonstrates a claim the chapter makes but has thin material for:
that instruction files should carry *obligations paired with enforcement*, not
orientation prose.

**Chapter 6 / control-plane material.** §1.4 (policy presentation separated from
enforcement) and §1.5 (scoped safety claims) are directly relevant, with the
`guard`/`interaction` split as the concrete architecture: cost and runaway control is a
*different subsystem* from human approval.

**Irreversibility hypothesis.** `permission-presets` supports it structurally — the
approval policy is a first-class, independently-settable knob, and the shipped default
is `ask`. But this is architecture, not an outcome. It shows a vendor *designing for*
the pattern, not evidence that irreversibility forces the pattern. Do not promote it as
corroboration of the hypothesis.

**Do not draft chapter prose from this pass until the operator rules on the non-corpus
source-type question** in the citation section above.

---

## 5. Candidate follow-ups — proposals only, not started

1. **Agent Notes for this repo.** `docs/decisions/{lifecycle}/{class}/` with a closed
   class set and a frozen archive. This repo already loses rationale — several
   corrections this month re-derived reasoning that existed only in chat.
2. **Keyless replay snapshots** for the MASH panel, mirroring §2.7. Record judge
   responses once with a key; replay keylessly on every chapter edit. Would convert the
   permanently-blocked scores-freshness gate into one that runs on every change.
3. **Audit against "source plane vs artifact plane"** (§2.6) — several scripts here
   mix generated artifacts and source notes.
4. **A "Known Limitations" section** in the book repo's own script READMEs (§3.2).
5. **Symlink `CLAUDE.md` → `AGENTS.md`** (§3.4). Smallest item on the list.

## 6. Unread, ranked by expected value

`docs/architecture.md` beyond line 60 [U] · `docs/cookbook/adding-a-tool.md` [U] ·
`docs/defensive-patterns.md` [U] · `docs/testing.md` [U] · `packages/AGENTS.md`
(package invariant rules) [U] · `docs/glossary.md` [U] · `BENCHMARK.md` [U] ·
`docs/cordis-primer.md` [U] · `packages/interaction/user-approval/` [U] ·
`packages/sandbox/sandbox-policy/` [U] · `packages/self-modification/` [U]
