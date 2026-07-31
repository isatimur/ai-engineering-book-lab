# Show HN draft — claims-ledger

## Title (max 80 chars, HN strips "Show HN:" prefix from the count)

Show HN: claims-ledger – CI fails when a claim in your docs goes stale

Alternates:
- Show HN: No anchor, no claim – CI-gated evidence verification for docs and AI agents
- Show HN: I made docs rot show up as a red CI check

## Post body

Docs rot silently. An agent (or a teammate) writes "auth tokens rotate every
24h," someone refactors rotate.ts six weeks later, and the sentence quietly
becomes fiction. Nothing catches it — until a user hits it.

claims-ledger mechanizes a rule: every claim in your docs, PRs, or agent
decisions carries a machine-verifiable pointer to its source (a commit, a
doc section, an ADR, a GitHub thread, a video timestamp), and CI fails when
that pointer goes stale.

  - A claim lives in `.ledger/claims.md` (markdown is the source of truth).
  - An anchor uses one of six schemes: `git://`, `doc://`, `adr://`, `gh://`,
    `yt://`, `ts://` — plus a verbatim quote.
  - `edt verify` re-resolves every quote against its ref (exact match, then
    fuzzy at 0.87). Stale → exit 11, CI red. `edt reanchor` finds where the
    quote moved to and fixes the pointer.
  - LLMs can hallucinate a justification. They can't hallucinate a string
    that resolves in your git history.

60-second demo (verify passes → refactor breaks an anchor → reanchor fixes
it → verify passes again): [link to demo.gif / scenario.sh]

I built this after mechanizing the same discipline for a different project —
a source-anchored AI engineering book where every claim links to the exact
second of a talk it came from (794 practitioner videos, 54 claims, 199
anchors: https://fromcopilottocolleague.com/read/graph). claims-ledger is
that same grammar, pointed at codebases instead of a manuscript.

Try it in 60 seconds:

    git clone https://github.com/isatimur/claims-ledger && cd claims-ledger
    npm install && npm run build
    ./demo/scenario.sh

Or gate a PR with zero local install via the GitHub Action:

    - uses: isatimur/claims-ledger@v1

npm: @claims-ledger/edt, @claims-ledger/ledger-core
Docs: https://isatimur.github.io/claims-ledger/docs
Repo: https://github.com/isatimur/claims-ledger

Happy to answer questions about the anchor-resolution logic (exact vs. fuzzy
matching), why markdown is the source of truth instead of a DB, or where
this breaks down (large binary diffs, anchors into generated code).

## Notes before posting
- Post Tue–Thu, 7–9am Pacific for best HN visibility.
- First comment should be yours, preempting the obvious question: why not
  just use tests? (Answer: tests verify behavior; this verifies that a
  *prose claim about* behavior still matches reality — different failure
  mode, e.g. a comment or README line nobody re-reads on refactor.)
- Don't @ mention "AI" too hard in the title — HN is skeptical of AI-tool
  titles; lead with the CI/docs-rot mechanism, mention the LLM angle in
  the body only.
- Have the social preview image and Marketplace listing live *before*
  posting — traffic will hit the repo page within minutes.
