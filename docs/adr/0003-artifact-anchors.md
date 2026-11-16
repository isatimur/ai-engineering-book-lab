# Artifact Anchors — evidence from the repo, not from a talk

## Status

accepted

## Context

A Source Anchor (ADR-0002) binds a Claim to a video: `{video_id, start, end, quote, confidence}`. `99_Meta/scripts/anchor/verify_ledger.py` checks it by finding the `quote` in the talk's transcript.

The third book cites talks like the first two: `99_Meta/third-book-classification.json` assigns 133 corpus talks across its 12 chapters, and those Claims carry ordinary Source Anchors. What the third book *adds* is a second kind of evidence. Its worked examples are repository incidents: a commit SHA, a GitHub Actions run id, a file path, a date range. None of these has a video id, a timestamp or a transcript. A Claim about a failed workflow run cannot carry a Source Anchor without inventing fields. So book 3 needs both anchor kinds, and every ledger is checked by both verifiers (`scripts/check_claims_integrity.py`). A ledger checked by one verifier only is a ledger where the other anchor kind is read by nothing.

One fact shapes the design. GitHub expires Actions logs after 90 days. For an expired run, `gh run view --log` returns empty output. It does not return an error. A naive check cannot tell "the evidence is gone" from "the evidence does not match". Measured on 2026-11-15: 93 of 190 `diagrams-check` runs had already lost their logs.

## Decision

A Claim's `**Supporting sources:**` may hold a second kind of anchor, the **Artifact anchor**. The ledger writes it as `**Artifact anchor:**`. It has four fields:

- `kind` is one of `commit`, `run`, `file`, `range`.
- `ref` names the artifact: a commit SHA, a run id, a file path, or a range of dates or commits.
- `date` is the date of the artifact.
- `excerpt` is the verbatim text the Claim rests on: a diff line, a log line, a file line. Like a `quote`, it makes the anchor self-verifying.

Each kind resolves `ref` against a different source:

- `commit`: `ref` is a SHA. It resolves against git history. The anchor is `unverifiable` when the history is incomplete (for example a shallow clone) and the SHA is absent. If the history is complete and the SHA is absent, or the `excerpt` is not in the commit's diff, the anchor fails.
- `file`: `ref` is a repo-relative path. It resolves at the last commit on or before `date`, read with `git show <commit>:<path>`. The anchor is `unverifiable` when no such commit exists in the available history. If the path is absent at that commit, or the `excerpt` is not in the file, the anchor fails.
- `range`: `ref` is `<start>..<end>`. Each end is a commit SHA or an ISO date (`YYYY-MM-DD`). `date` is a single date, the date of the range's end, not a pair. The range resolves against git history. The anchor is `unverifiable` when the history is incomplete and an endpoint is absent. The `excerpt` is searched in the output of `git log -p --format=%B <start>..<end>`: the commit messages and the patches of every commit reachable from `<end>` but not from `<start>`. `<start>` is **exclusive**, so `<start>`'s own message and diff are not searched. If the `excerpt` is not there, the anchor fails.
- `run`: `ref` is a GitHub Actions run id, digits only. It resolves against a capture file in `research_passes/`, never against the network. The verifier reads every file in that directory and resolves the anchor only when **one** file holds both the run id and the `excerpt`. The anchor is `unverifiable` when no file names the run. If a file names the run but lacks the `excerpt`, the anchor fails.

Corpus Source Anchors do not change. ADR-0002 is extended, not superseded. `verify_ledger.py` keeps working on corpus anchors untouched.

**Three outcomes, not two.** A check of an Artifact anchor returns `pass`, `fail` or `unverifiable`. "Evidence expired" and "evidence wrong" never share a result. A `run` anchor whose evidence cannot be checked is `unverifiable`. It is not `fail`, and it is not `pass`.

`unverifiable` means the evidence is gone or the history is incomplete. It never means the verifier could not run. A broken `--repo`, a checkout that is not a git work tree, a missing `research_passes/` directory or a failed git command is an error or a `fail`. Reporting an environment error as `unverifiable` would hide a broken check behind a clean exit code, which is the failure this design exists to prevent.

**`ref` is validated before it is resolved.** A moving ref is not an anchor, so `commit` takes a SHA of 7 to 40 hex digits and rejects `HEAD` or a branch name. `run` takes digits only. Each `range` endpoint is a SHA or a real `YYYY-MM-DD` date. An `excerpt` must carry at least three characters: a blank one would match every diff, and a one-character one such as `+` certifies nothing. A repeated field in a block is a `fail`, because the last value would otherwise win in silence.

**Fenced code blocks are examples.** Anchors inside fenced code blocks (``` or ~~~) are examples and are not checked. An unclosed code fence is an error, because anchors after it cannot be seen.

**Captured evidence.** Because logs expire, the evidence for a `run` anchor lives in `research_passes/`. A `run` anchor resolves against its capture file there, not against the network. The capture is the record. The live run is only where the capture came from.

The verifier resolves a capture by **content, not by file name**. Research passes are named `YYYY-MM-DD-slug.md`, and 63 of the 64 files in `research_passes/` follow that form. No file is named for a run. So a capture satisfies a `run` anchor only when that one file contains both the run id and the `excerpt`. Requiring both in the same file matters: a census table that lists many run ids and repeats one phrase would otherwise satisfy every run it names. The run id is matched on digit boundaries, so run `4374090918` is not satisfied by a file that mentions run `43740909184`.

So an author who writes a `run` anchor must put the run id and the **raw log line, verbatim**, into the same research pass — the line as `gh run view <id> --log` printed it, with the runner's timestamp prefix and the colour codes removed and nothing else changed. A sentence describing the run is not evidence of it. Write the raw line into the capture's own prose, outside any anchor block.

**A pasted anchor block never satisfies itself.** Captures carry a copy of the finished anchor, in a "Ready-to-paste anchors" section, so the ledger entry can be lifted from the record it rests on. A pasted block holds the run id and the `excerpt` by construction. So the verifier subtracts every anchor block from a capture before searching it, fenced blocks included. What is left is the evidence the author captured. An anchor whose `excerpt` appears only inside its own block is a `fail` when the capture names the run elsewhere, and `unverifiable` when it does not.

## Considered and rejected

- **Stretch the Source Anchor to fit.** Rejected: it forces authors to invent values for fields that do not apply. A fake video id resolves to no transcript, so `verify_ledger.py` fails the anchor. A made-up value that did resolve would certify nothing meaningful.
- **Resolve `run` anchors with `gh run view --log` at verify time.** Rejected: an expired run returns empty output, so every old anchor would fail or silently pass. The result would depend on the date, not on the claim.
- **Treat an expired run as `fail`.** Rejected: it reports a true Claim as wrong, and it teaches authors to ignore failures.

## Consequences

- Later tasks build a verifier against this vocabulary: `kind` in {`commit`, `run`, `file`, `range`}, `ref`, `date`, `excerpt`, and the outcomes `pass`, `fail`, `unverifiable`.
- Logs expire after 90 days, and a `run` anchor is checkable only through its capture. So authors capture run evidence into `research_passes/` when they write the anchor, before the 90 days pass.
- `unverifiable` is neither `pass` nor `fail`. So reports count it separately. A rising count means evidence is expiring.
- The canonical Claims Ledger schema (ADR-0001) gains one accepted form in `Supporting sources`.
- Both anchor kinds may appear in any book's ledger, so every ledger is read by both verifiers. One verifier per book leaves the other kind unchecked and still exits 0.
- **`99_Meta/scripts/anchor/build_evidence.py` reads Artifact anchors.** It imports `parse_anchors` and writes each anchor as `{kind, ref, date, excerpt}` under the claim's `artifact_anchors`, next to its Source `anchors`. The key appears only on claims that carry one, so the published `evidence.json` and `evidence-2.json` do not change. It raises on a block it cannot read and on a claim with Artifact anchors but no `**Candidate chapters:**`: a skipped anchor would leave a clean, short file. The `evidence-regen` workflow writes `website/src/evidence-3.json`, and the book 3 pages render it. Until the ledger holds Claims the file is `{}`, and a step writes it. An empty file that no step writes is the false green this ADR exists to prevent; do not add one by hand. (Superseded: this bullet earlier recorded the gap, rediscovered three times, where the builder emitted `{}` for Artifact anchors.)
- The Artifact-anchor grammar has exactly one reader, `parse_anchors` in `scripts/verify_artifact_anchors.py`. Anything that counts or reports anchors imports it. A second parser drifts from the first, and the stricter one reports a true anchor as zero.
