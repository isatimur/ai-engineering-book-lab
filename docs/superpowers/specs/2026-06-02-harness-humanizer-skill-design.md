# Harness Humanizer — Skill Design

## Context

The book project measures prose quality with MASH judges; the **humanness** judge
flags AI-slop — empty hedging, listicle stems, smooth transitions that hide the
absence of a claim, generic filler. Across two full runs, humanness and usefulness
were the weakest dimensions. We have a *measurement* of slop but no *tool* to
remove it.

This skill is the counterpart: a portable Claude Code Skill that takes any prose
and closes the loop — detect slop, rewrite the fixable parts toward a real point
of view, self-score against the humanness rubric, and iterate to a bar. It is
deliberately **not** tied to MASH or this repo: it carries its own rubric so it
works in any project. The intended outcome is writing that "survives a hostile
editor's red pen" without swapping AI-slop for a different, edgier slop.

## Decisions (locked during brainstorming)

- **Form:** a real Claude Code Skill (`SKILL.md` + frontmatter), portable/installable, not a repo `program` or a MASH command.
- **Job:** closed loop — rewrite, self-score, iterate.
- **Scoring:** self-judge against an **embedded** humanness rubric (zero dependency on MASH; portable).
- **Iteration:** bar = **strong**, cap = **3 passes**; if a span can't reach strong, keep the best and flag it.
- **Guardrail:** **strict fidelity** — preserve meaning and claims exactly; only remove hedging/filler and sharpen what already exists. Never fabricate stance, edginess, or personality. Swapping AI-slop for edgy-slop is a failure, not a fix.
- **Output:** **report, don't overwrite** — return humanized text + change log + flags; the human/agent decides what to accept.
- **Structure:** thin `SKILL.md` + `references/` files + a deterministic pre-flag `script` (combined approaches 2 + 3).

## Layout

```
harness-humanizer/
├── SKILL.md                    # thin orchestrator: triggers + the 7-step loop
├── references/
│   ├── rubric.md               # embedded humanness rubric (4 bands + slop indicators + tests + triage)
│   ├── examples.md             # before→after pairs; "flag don't fabricate"; over-correction PASS/FAIL
│   └── guardrails.md           # fidelity rules + over-correction anti-pattern catalogue + idempotence
└── scripts/
    └── flag_slop.py            # stdlib-only regex pre-pass → JSON candidates (not verdicts); --selftest
```

Install location: the user's skills directory (e.g. a `harness-humanizer/` plugin
skill dir). The skill is self-contained — no external services, no network.

## The loop (SKILL.md core)

```
INPUT: prose (selection, file, or pasted text)

0. SCOPE     Unit = paragraph by default. Skip code blocks, blockquotes,
             headings, and genuine lists.
1. PRE-FLAG  Run scripts/flag_slop.py → spans with cheap regex hits
             (hedge stems, listicle openers, em-dash density, "in today's…",
             "let's be honest", "not only… but also", filler intensifiers).
             CANDIDATES, not verdicts.
2. JUDGE     Score each paragraph against references/rubric.md →
             {strong|moderate|weak|fail} + one-line reason. Bar test:
             "survives a hostile editor's red pen? does removing it lose anything?"
3. TRIAGE    Each paragraph below STRONG:
             (a) REWORDABLE — real claim buried under hedging/filler → rewrite
             (b) HOLLOW     — weak because it has no point to make    → FLAG, don't fabricate
4. REWRITE   (a) only, applying references/guardrails.md: preserve meaning+claims,
             subtract hedging, sharpen what exists; inject no fabricated voice.
5. SELF-SCORE the rewrite against the rubric. strong → lock; else iterate (→4),
             MAX 3 passes; after cap, keep best + FLAG.
6. REPORT    Return: humanized text (rewrites applied, hollow spans intact);
             change log (per paragraph: before-band → after-band, what changed);
             FLAGS (hollow spans + capped spans).
```

**Properties:** fail-honest (hollow/capped spans surfaced, never silently
polished), idempotent (already-strong prose returns unchanged), non-destructive
(report + change log, not in-place overwrite).

## File contents

### SKILL.md (thin, ~60 lines)
- Frontmatter `name: harness-humanizer` + `description` with triggers: "humanize
  this", "remove/de-AI the slop", "make this sound less like AI", "de-slop",
  "this reads like ChatGPT/AI".
- The 7-step loop above.
- Pointers to load `references/rubric.md` (step 2), apply
  `references/guardrails.md` (step 4), run `scripts/flag_slop.py` (step 1).
- Two hard rules stated up front: **fidelity over flair**, **flag hollow spans,
  don't fabricate**.

### references/rubric.md
- 4 bands verbatim from the humanness judge:
  - strong (80–100): specific, has a point of view, survives a hostile editor's red pen
  - moderate (50–79): readable but generic in spots
  - weak (20–49): pattern-matchable AI prose; removing it loses nothing
  - fail (0–19): pure scaffolding language, listicle stems, empty hedging
- Slop indicators: empty hedging, listicle stems with no point of view, smooth
  transitions that hide the absence of a claim, generic filler.
- Two operational tests: hostile-editor red pen; does-removing-it-lose-anything.
- Triage rule: below-strong + has-claim = REWORDABLE; below-strong + nothing-lost = HOLLOW.

### references/examples.md
- 6–8 before→after pairs, one per slop type (hedging, listicle stem, hollow
  transition, filler intensifiers, "in today's…" opener, rhetorical-question opener).
- 2–3 "flag, don't fabricate" cases: hollow paragraph + correct response (flag:
  "no claim — rewording won't help") vs wrong response (invented hot take = FAILURE).
- 1–2 over-correction pairs: slop → edgy-slop (FAILURE) vs slop → genuine
  sharpening (PASS).

### references/guardrails.md
- Fidelity: preserve meaning + claims exactly; only subtract hedging and sharpen
  what exists.
- Anti-pattern catalogue to NOT inject: forced contrarianism, em-dash theatrics,
  fake first-person, "let's be honest/real", manufactured stakes ("in a world
  where…"), rhetorical-question openers, intensifier padding.
- Idempotence: strong prose returned unchanged.

### scripts/flag_slop.py
- Python stdlib only. Reads stdin or a file arg. Emits JSON:
  `[{span, line, pattern, type}]`.
- Regex sets: hedge stems, listicle openers, transition-filler, intensifiers,
  em-dash density per sentence, "in today's …" openers.
- Documented as **candidates, not verdicts** — the model judges; the script
  narrows attention.
- `--selftest` flag runs a tiny built-in fixture (slop in, expected hits out) so
  the script is verifiable with no external infra.

## Verification

- `python3 scripts/flag_slop.py --selftest` passes (deterministic).
- Manual: run the skill on a known-slop paragraph → expect rewrite to STRONG with
  meaning preserved; run on a hollow paragraph → expect a FLAG, not an invented
  claim; run on already-strong prose → expect no changes (idempotence); run on a
  slop paragraph and confirm the rewrite does NOT introduce edgy-slop
  (over-correction guardrail).
- The change log correctly reports before→after bands and the flags list includes
  hollow + capped spans.

## Out of scope (YAGNI)

- No MASH/book-mash integration (portability is the point).
- No in-place file editing (report-only by design).
- No network calls, no non-stdlib dependencies.
- No automatic acceptance of rewrites — the human/agent decides.
