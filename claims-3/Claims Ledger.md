# Claims Ledger — Third Book

The third book cites talks, like the first two: 133 corpus talks are assigned
across its 12 chapters. Those Claims carry ordinary **Source Anchors**. Book 3
adds a second anchor kind for its worked examples, which are repository
incidents: a commit, a GitHub Actions run, a file, a range of dates or commits.
Such a Claim carries an **Artifact anchor**. ADR 0003
(`docs/adr/0003-artifact-anchors.md`) defines the form.

This ledger holds both kinds, so both verifiers read it.
`99_Meta/scripts/anchor/verify_ledger.py` checks Source Anchors and
`scripts/verify_artifact_anchors.py` checks Artifact anchors. Each is blind to
the other kind and reports it as zero anchors, so running only one would leave
half this ledger checked by nothing. `scripts/check_claims_integrity.py --book 3`
runs both.

An Artifact anchor has four fields:

- `kind` is one of `commit`, `run`, `file`, `range`.
- `ref` names the artifact: a commit SHA, a run id, a repo-relative path, or a
  `<start>..<end>` range.
- `date` is the date of the artifact, as `YYYY-MM-DD`.
- `excerpt` is the verbatim text the Claim rests on.

A check returns `pass`, `fail` or `unverifiable`. `unverifiable` means the evidence
expired or the history is incomplete. A `run` anchor resolves against a capture
file in `research_passes/`, because GitHub expires Actions logs after 90 days.

When you write a `run` anchor, put the run id and the **raw log line, verbatim**,
into the same research pass: the line as `gh run view <id> --log` printed it,
with the runner's timestamp prefix and the colour codes removed and nothing else
changed. A sentence describing the run is not evidence of it. Write that line
into the capture's own prose. Pasting the anchor block alone proves nothing —
the verifier subtracts every anchor block from a capture before searching it,
so a block can never certify itself.

Example of the form (inside a fence, so the verifier skips it):

````
**Artifact anchor:**
- kind: commit
- ref: 0000000
- date: 2026-01-01
- excerpt: a verbatim line from the diff
````

No Claims are recorded yet.
