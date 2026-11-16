# Evidence capture — four more worked examples for book 3, taken before their logs expire

- **date:** 2026-11-16 (captured 2026-11-16 from state observed 2026-11-15 and 2026-11-16 UTC)
- **why this file exists:** GitHub expires Actions logs after 90 days. The gate incident is already captured in `2026-11-15-diagrams-gate-vacuous-pass-evidence.md`. This file captures the other four incidents in the book-3 design spec's "Worked examples already in hand" table (`docs/superpowers/specs/2026-11-15-third-book-design.md`).
- **anchors:** ADR-0003 (`docs/adr/0003-artifact-anchors.md`) for the anchor form, PR #84, #85, #86, and the book-3 spec's Ch 7 and Ch 8 rows.

## Summary

| # | Incident | Chapter | Rests on | Logs needed? | Expired? |
|---|---|---|---|---|---|
| 1 | `stats-regen` race: 1455 published over a 1458-note corpus | 7, 8 | git, plus two Actions logs for the timeline | yes, 2 logs | **0 of 2 expired.** Both logs were read in full on 2026-11-16 |
| 2 | Deploy gap: 0 of 30 bot stats commits deployed | 8 | git plus Actions run **metadata**; the `run` anchor rests on one log line | yes, 1 log | **0 of 1 expired.** Read 2026-11-16 |
| 3 | Skip-CI A/B on PR #86 | 8 | GitHub's PR timeline plus run **metadata** and git; the two `run` anchors rest on log lines | yes, 2 logs | **0 of 2 expired.** Both read 2026-11-16 |
| 4 | 57-day figure window | 7 | git only | no | cannot expire |

Run *metadata* (id, event, head SHA, conclusion, created time) outlives log text, and the narrative of items 2 and 3 rests on metadata alone. Their **anchors** do not: a `run` anchor's `excerpt` must be a verbatim log line (ADR-0003), so every `run` anchor in this file quotes one. Five logs are quoted here in total. All five were created 2026-11-15 or 2026-11-16, so they should expire about 2027-02-13 and 2027-02-14. The decisive lines are quoted below so the record does not depend on those dates.

**Empty-log guard.** `gh run view --log` returns empty output for an expired run. It does not return an error. Every log read in this file was checked for length first, and a zero-length result would have been recorded as "expired", never as "nothing to report". The five logs returned 209, 209, 828, 783 and 309 lines.

## Incident 1 — the `stats-regen` race (2026-11-15, 17:24 UTC)

Source: **git** for what each tree held; **Actions logs** for the order of events.

### What happened

Two pushes to `main` landed within four seconds. Each started a `stats-regen` run.

| time (UTC) | event | source |
|---|---|---|
| 17:24:08 | `3d3935d` lands (PR #85, the diagrams-gate fix) | `git log` |
| 17:24:10 | run `43740902338` starts for `3d3935d` | run metadata |
| 17:24:12 | `ad2c90f` lands (PR #84, three new talks) | `git log` |
| 17:24:15 | run `43740909184` starts for `ad2c90f` | run metadata |
| 17:24:18 | run `43740902338` computes **1455** from a tree without #84's talks | log |
| 17:24:19 | run `43740902338` commits locally, and its first push is rejected: main moved to `ad2c90f` | log |
| 17:24:22 | run `43740909184` computes **1458** from the correct tree | log |
| 17:24:22 | run `43740902338` fetches `ad2c90f`, rebases, and the rebase applies cleanly | log |
| 17:24:24 | run `43740902338` pushes `ad2c90f..6ac2a50`. **1455 is now on main** | log, `git log` |
| 17:24:24 | run `43740909184` pushes and is rejected: `cannot lock ref` | log |
| 17:24:28 | run `43740909184` rebases onto `6ac2a50` and hits a content conflict in all three stats files | log |
| 17:24:28 | run `43740909184` exits 1 on attempt 1 of 5. No second attempt follows | log |

The run holding the right answer (1458) is the one that went red. The run holding the wrong answer (1455) is the one that went green and published.

### The two runs

| | run `43740902338` | run `43740909184` |
|---|---|---|
| triggered by | push `3d3935d` (PR #85) | push `ad2c90f` (PR #84) |
| computed | **1455** videos | **1458** videos |
| conclusion | success | **failure** |
| result | pushed `6ac2a50` | died on attempt 1 of 5 |

### Why the rebase was clean for one run and a conflict for the other

PR #84 (`ad2c90f`) changed `99_Meta/Corpus Stats.md`. It did **not** change `STATS.md`, `stats.json` or `website/src/data/stats.json`. So when run `43740902338` rebased its stats commit onto `ad2c90f`, git saw no overlap and applied it cleanly. That is the whole defect: a clean rebase says the text does not overlap. It says nothing about whether the number is still true.

Run `43740909184` rebased onto `6ac2a50`, which had rewritten the same lines in all three stats files. That was a real content conflict.

Verify (git, no network):

```bash
# #84 touched Corpus Stats.md and none of the three stats files
git show --name-only --format= ad2c90f | grep -i stats
git show --name-only --format= ad2c90f -- STATS.md stats.json website/src/data/stats.json   # prints nothing

# #84 added three talks
git show --name-status --format= ad2c90f | grep -c '^A.*01_Videos/'                          # 3
git ls-tree --name-only ad2c90f^ 01_Videos/ | wc -l                                          # 1455
git ls-tree --name-only ad2c90f  01_Videos/ | wc -l                                          # 1458

# the corpus-side count #84 wrote, and the stale count the bot then published
git show ad2c90f --format= -- '99_Meta/Corpus Stats.md' | grep 'Total notes'
git show 6ac2a50:stats.json | grep videos
git show 6ac2a50 --stat --format='%h %an %ad %s' --date=iso-strict
```

Results: the three added files are `01_Videos/1578-…`, `1579-…`, `1581-…`. The corpus held 1455 notes before `ad2c90f` and 1458 after. `99_Meta/Corpus Stats.md` went from `Total notes: 1455` to `Total notes: 1458`. `6ac2a50` (author `github-actions[bot]`, 2026-11-15T17:24:19Z) set `stats.json` to `"videos": 1455`. `6ac2a50` touched exactly three files: `STATS.md`, `stats.json`, `website/src/data/stats.json`.

At `6ac2a50` the repository disagreed with itself: `99_Meta/Corpus Stats.md` said 1458 and `stats.json` said 1455.

### How long the wrong number sat on main

`6ac2a50` landed 2026-11-15T17:24:19Z. The fix, PR #86 (`2de004f`), landed 2026-11-16T00:14:34Z and set `stats.json` to 1458. That is **6 h 50 min** of a self-contradicting `main`, measured from git alone:

```bash
git log --format='%h %ad %s' --date=iso-strict -3 6ac2a50..2de004f -- stats.json
git show 2de004f:stats.json | grep videos     # "videos": 1458
git show 2de004f^:stats.json | grep videos    # "videos": 1455
```

What the live site showed is a separate question. See incident 2: no deploy ran between 17:24:10 and 00:14:38, and I did not fetch the live site, so I make no claim about what readers saw beyond what the deploy record shows.

### The decisive log lines, verbatim

Source: `gh run view <id> --log`, read 2026-11-16. Each line below has the runner's timestamp prefix and the ANSI colour codes removed. Nothing else is edited. The timestamps are in the table above.

Run `43740902338` (computed 1455, then won the push):

```
[stats] 1455 videos · 124 diagrams · 73 claims · 249 anchors · 10 chapters
 ! [rejected]        main -> main (fetch first)
Push rejected (attempt 1/5) — main moved, rebasing and retrying...
3d3935d..ad2c90f  main       -> origin/main
Successfully rebased and updated refs/heads/main.
ad2c90f..6ac2a50  main -> main
```

Run `43740909184` (computed 1458, then died):

```
[stats] 1458 videos · 124 diagrams · 73 claims · 249 anchors · 10 chapters
! [remote rejected] main -> main (cannot lock ref 'refs/heads/main': is at 6ac2a50dc1e95fae4aae938f5a053bec1d04a6e8 but expected ad2c90fde32ca7b1f903ba7c931ddfd0418c52bb)
Push rejected (attempt 1/5) — main moved, rebasing and retrying...
CONFLICT (content): Merge conflict in STATS.md
CONFLICT (content): Merge conflict in stats.json
CONFLICT (content): Merge conflict in website/src/data/stats.json
##[error]Process completed with exit code 1.
```

The second run's `cannot lock ref` line names `6ac2a50` as the ref's current value. That is the first run's commit. The two runs were pushing to the same ref within about 0.4 s of each other (17:24:24.25 and 17:24:24.68).

### Method note

```bash
# run metadata and the empty-log guard
gh run view 43740902338 -R isatimur/ai-engineering-book-lab --json name,event,headSha,conclusion,createdAt
gh run view 43740909184 -R isatimur/ai-engineering-book-lab --json name,event,headSha,conclusion,createdAt
gh run view <id> -R isatimur/ai-engineering-book-lab --log > log.txt
[ "$(wc -l < log.txt)" -gt 0 ] || echo "EXPIRED: an empty log is not a clean run"

# the lines quoted above
grep -n -E "videos|rejected|cannot lock|CONFLICT|attempt|Successfully rebased|\.\.6ac2a50|##\[error\]" log.txt
```

### Ready-to-paste anchors

```
**Artifact anchor:**
- kind: run
- ref: 43740902338
- date: 2026-11-15
- excerpt: [stats] 1455 videos · 124 diagrams · 73 claims · 249 anchors · 10 chapters

**Artifact anchor:**
- kind: run
- ref: 43740902338
- date: 2026-11-15
- excerpt: ad2c90f..6ac2a50  main -> main

**Artifact anchor:**
- kind: run
- ref: 43740909184
- date: 2026-11-15
- excerpt: [stats] 1458 videos · 124 diagrams · 73 claims · 249 anchors · 10 chapters

**Artifact anchor:**
- kind: run
- ref: 43740909184
- date: 2026-11-15
- excerpt: CONFLICT (content): Merge conflict in stats.json

**Artifact anchor:**
- kind: file
- ref: stats.json
- date: 2026-11-15
- excerpt: "videos": 1455

**Artifact anchor:**
- kind: file
- ref: 99_Meta/Corpus Stats.md
- date: 2026-11-15
- excerpt: - Total notes: 1458
```

The two `file` anchors resolve against git at the last commit on or before the end of 2026-11-15 UTC, which is `6ac2a50`. Together they state the contradiction: one file says 1455, the other says 1458, at the same commit. They never expire.

## Incident 2 — the deploy gap: a bot push starts no workflow

Source: **Actions run metadata** (survives log expiry) and **git**. No log text is involved.

### The claim

A push made with `GITHUB_TOKEN` does not start new workflow runs. `stats-regen` pushes with that token. So `website-deploy` never ran on a bot stats commit, and the number only reached production when an unrelated human change to `website/**` or `diagrams/**` happened to carry the file along.

### The query and the result

`website-deploy` triggers on pushes to `main` that touch `website/**` or `diagrams/**`, so a stats commit (which writes `website/src/data/stats.json`) matches the path filter. The path filter is not what stopped it. Check, at the pre-fix tree:

```bash
git show 2de004f^:.github/workflows/website-deploy.yml | sed -n 1,10p
```

Every bot stats commit before the fix, from git:

```bash
git log 2de004f^ --author='github-actions\[bot\]' --grep='chore(stats)' --format='%H %h %ad' --date=iso-strict
```

Every `website-deploy` run and the commit it ran on, from the Actions API:

```bash
gh run list -R isatimur/ai-engineering-book-lab --workflow website-deploy --limit 300 \
  --json headSha,event,createdAt --jq '.[]|"\(.headSha) \(.event) \(.createdAt)"'
```

Then, for each bot commit, whether any `website-deploy` run has that SHA as its `headSha`.

| set | bot stats commits | with a `website-deploy` run on that SHA |
|---|---|---|
| the newest 30 before the fix (`6ac2a50` back to `e6b412b`, 2026-11-15 back to 2026-09-08) | 30 | **0** |
| all of them before the fix (back to `cbce58d`, 2026-05-27) | 179 | **0** |

All 179 carry the subject `chore(stats): regenerate STATS.md + stats.json from corpus changes [skip ci]`.

**Denominator.** The spec and PR #86 say "0 of the last 30, measured against 100 deploy runs". On 2026-11-16 the full `website-deploy` history held **165** runs (162 `push`, 3 `workflow_dispatch`), the first on 2026-05-26. I re-ran the join against both the newest 100 and all 165. The answer is 0 in both. The newest 100 reach back to 2026-06-29, which covers the window of all 30 commits. So the "100" figure and the 165 figure agree. I used 165 because it is the complete set.

The newest 30 bot commits, short SHA and UTC time, so the sample is fixed and can be re-checked:

```
6ac2a50 2026-11-15T17:24  ae049ec 2026-11-14T21:55  3546dc8 2026-11-14T17:49
0bc43b3 2026-11-14T01:11  8a8f0f7 2026-11-12T18:11  b25f2f4 2026-11-09T12:54
ef9d8bd 2026-10-13T19:59  0c335bf 2026-10-13T15:55  d56170f 2026-10-10T22:50
9451b47 2026-09-24T22:28  d4b848d 2026-09-22T00:03  ee0daea 2026-09-19T01:53
9702677 2026-09-18T12:27  b1d9c0b 2026-09-17T14:09  a9c3eb5 2026-09-17T14:00
c136b13 2026-09-17T13:43  69934e1 2026-09-14T12:08  ed2f6db 2026-09-14T11:47
6d85e34 2026-09-14T11:46  3456545 2026-09-14T11:40  a0f641d 2026-09-14T11:29
a9f4f72 2026-09-13T22:43  e6f4a41 2026-09-13T21:21  6f35e3e 2026-09-13T21:00
379ede8 2026-09-13T21:00  91b4a27 2026-09-09T04:03  715410b 2026-09-09T04:02
972a132 2026-09-09T03:47  189b937 2026-09-09T03:45  e6b412b 2026-09-08T23:35
```

### What I could not separate: two possible causes

Every one of the 179 bot commits carries both causes at once: it is pushed with `GITHUB_TOKEN`, and its message holds the skip-CI marker. Incident 3 shows that the marker alone can suppress a workflow. So the data **cannot say which cause did the work**. There is no bot stats commit in the history that has one cause and not the other.

PR #86's text says the marker "was not the cause, and dropping it would not have helped". That rests on GitHub's documented rule that `GITHUB_TOKEN` pushes start no workflow. I did not re-verify that rule against GitHub's documentation in this pass, and the 179-commit sample cannot test it. What the data does prove is the outcome: **0 of 179**, whichever cause it was.

### Between the race and the fix: no deploy ran

From the same listing, deploys on `main` between the two stats events:

| time (UTC) | headSha | event |
|---|---|---|
| 2026-11-14 22:15:53 | `4a34681` | push |
| 2026-11-15 17:24:10 | `3d3935d` | push (before `6ac2a50` existed) |
| 2026-11-16 00:14:38 | `2de004f` | push (PR #86 itself) |

The deploy at 17:24:10 ran on the tree before the bot commit. No deploy ran on `6ac2a50`. The next deploy, `2de004f`, carried the corrected 1458.

### The fix landing

PR #86 (`2de004f`, 2026-11-16T00:14:34Z) added an explicit dispatch to both regen workflows, and only when a push happened:

```bash
git show 2de004f:.github/workflows/stats-regen.yml | grep -n 'gh workflow run'
git show 2de004f:.github/workflows/stats-regen.yml | grep -n 'pushed'
git show --stat --format= 2de004f -- scripts/commit_regenerated.sh
```

The first `stats-regen` run after the merge pushed `504e5ac`, and a `website-deploy` run followed it with event `workflow_dispatch`:

| | value |
|---|---|
| bot commit | `504e5ac`, 2026-11-16T00:16:14Z, `chore(stats): regenerate …` |
| `stats-regen` run | `43779342658`, event `push`, head `92f4cd8` |
| `website-deploy` run | **`43779369138`**, event **`workflow_dispatch`**, created 2026-11-16T00:16:17Z, head SHA `504e5ac`, conclusion success |
| actor and triggering actor of the deploy run | `github-actions[bot]` |

The deploy started 3 s after the commit. Log lines from the `stats-regen` run, read 2026-11-16, show the order: the push step `Pushed on attempt 2.`, then `pushed=true`, then the step `Run gh workflow run website-deploy.yml --ref main`. Attempt 2 means the new script rejected a push, re-ran the generator, and pushed again, which is the behaviour incident 1 lacked.

The second post-fix bot commit, `21b8b6e` (2026-11-16T00:43:54Z), was also deployed by dispatch: run `43782105832`, `workflow_dispatch`, created 00:43:57Z. After the fix, the count is **2 of 2**. Two is a small sample, so I treat it as "the mechanism works", not as a rate.

Verify:

```bash
gh api repos/isatimur/ai-engineering-book-lab/actions/runs/43779369138 \
  --jq '{event,actor:.actor.login,triggering:.triggering_actor.login,head_sha,created_at,conclusion}'
gh run list -R isatimur/ai-engineering-book-lab --workflow website-deploy --limit 300 \
  --json databaseId,event,headSha,createdAt --jq '.[]|select(.event=="workflow_dispatch")'
```

The second command returns three runs. One is from 2026-05-27, a manual dispatch long before this incident. It is not part of the fix.

### The decisive log line, verbatim

Source: `gh run view 43779369138 -R isatimur/ai-engineering-book-lab --log`, read 2026-11-16. The runner's timestamp prefix and the ANSI colour codes are removed. Nothing else is edited. The log is 828 lines, so it had not expired.

Run `43779369138` (the `website-deploy` dispatch that carried the corrected 1458):

```
 * [new ref]         504e5ac11c0dfa3aff8cc11934d58558699be940 -> origin/main
504e5ac11c0dfa3aff8cc11934d58558699be940
```

The fetch line is the deploy's own checkout. It proves from the log, not from metadata, that this run built the tree at `504e5ac` — the bot stats commit. The event (`workflow_dispatch`) and the conclusion (success) are run metadata, not log text, so they stay in the table above.

### Ready-to-paste anchors

```
**Artifact anchor:**
- kind: commit
- ref: 2de004f
- date: 2026-11-16
- excerpt: 0 of the last 30 bot stats commits ever deployed

**Artifact anchor:**
- kind: commit
- ref: 2de004f
- date: 2026-11-16
- excerpt: run: gh workflow run website-deploy.yml --ref main

**Artifact anchor:**
- kind: run
- ref: 43779369138
- date: 2026-11-16
- excerpt: * [new ref]         504e5ac11c0dfa3aff8cc11934d58558699be940 -> origin/main
```

These are `commit` anchors, not `file` anchors, on purpose. The `book3/foundations` branch was cut before PR #86 merged, so on this branch `stats-regen.yml` does not yet hold the fix, and a `file` anchor at 2026-11-16 resolves against the older copy and fails (I tested this). A `commit` anchor on `2de004f` reads that commit's own diff and does not depend on the branch.

The first anchor records the repo's own measurement, in the workflow's comment. I re-ran that measurement independently, and the section above records it. The `run` anchor's excerpt is a raw line from the run's log, quoted verbatim in the section above — not a sentence I wrote about the run. A `run` anchor is only as strong as its capture, so the capture has to hold log text, not a description of it.

## Incident 3 — the skip-CI A/B on PR #86

Source: **GitHub's PR timeline** (force-push event with before and after commit), **run metadata** (queried by head SHA), and **git** (both commit objects, still in the local object store). No log text is involved.

### The controlled comparison

PR #86 was pushed twice. The two pushes differ in one thing only: the commit message.

| | state A | state B |
|---|---|---|
| head commit | `fdb2218d2db1bc330e8e06c27c540170af62fa15` | `32259b9bdd6d00f8380b82637d7b25e448feef7d` |
| pushed | 2026-11-15T21:37:57Z (from the local ref log) | 2026-11-15T22:29:04Z (timeline event `head_ref_force_pushed`) |
| tree | `f92c0f80647b97ca46754e7f56680bed5cf4eb2d` | `f92c0f80647b97ca46754e7f56680bed5cf4eb2d` |
| parent | `6ac2a50` | `6ac2a50` |
| message | spells the skip-CI marker in full, in a sentence saying the marker was not the cause | writes "skip-CI" in prose |
| Actions runs with this `headSha` | **0** | **2**: `website-ci` `43769536033` (success) and `script-tests` `43769536100` (success), both `pull_request`, created 22:29:07Z |

**Same tree, same parent.** The tree hash is identical, so no file changed between the two states. `git diff --stat fdb2218 32259b9` prints nothing. The only difference is the commit message, shown by diffing the two messages: the bracketed token in one sentence was replaced by "skip-CI", and a "Note for the archaeologist" paragraph was added.

**Nothing else ran in the gap.** I also listed every run in the repository created between 21:30 and 22:35 UTC on 2026-11-15. No run carries head SHA `fdb2218`, and none is on branch `fix/regen-race-publishes-stale-stats` before 22:29:07. One `diagrams-check` run, `43764956608`, event `workflow_dispatch`, created 21:40:14Z, ran on `main` at `6ac2a50`. It is the only run that started on this PR's work in the gap, and it was not a `pull_request` run. PR #86's message calls it "a manual dispatch started instantly". I take that to be this run but I could not confirm it from the data. It supports the point either way: a manual dispatch is not blocked by the marker, a push-triggered run is.

Commands:

```bash
# the force-push event, with before and after commits
gh api graphql -f query='{repository(owner:"isatimur",name:"ai-engineering-book-lab"){pullRequest(number:86){timelineItems(first:50,itemTypes:[HEAD_REF_FORCE_PUSHED_EVENT]){nodes{... on HeadRefForcePushedEvent{beforeCommit{oid committedDate} afterCommit{oid} createdAt}}}}}}'

# runs per head SHA: state A, then state B
gh api "repos/isatimur/ai-engineering-book-lab/actions/runs?head_sha=fdb2218d2db1bc330e8e06c27c540170af62fa15" --jq '.total_count'
gh api "repos/isatimur/ai-engineering-book-lab/actions/runs?head_sha=32259b9bdd6d00f8380b82637d7b25e448feef7d" --jq '.workflow_runs[]|"\(.id) \(.name) \(.event) \(.conclusion)"'

# same tree, same parent, only the message differs
git rev-parse fdb2218^{tree} 32259b9^{tree}
git rev-parse fdb2218^ 32259b9^
git diff --stat fdb2218 32259b9
diff <(git show -s --format=%B fdb2218) <(git show -s --format=%B 32259b9)
```

Results: the first query returns `total_count` 0. The second returns the two runs above. The two `rev-parse` lines print identical hashes. `git diff --stat` prints nothing.

### The weak point: the pre-amend commit does not survive in a clean clone

Commit `fdb2218` is the pre-amend head. It was never merged, because PR #86 was squash-merged as `2de004f`. `fdb2218` is reachable from no branch. It exists in the local object store here (from the reflog) and on GitHub as the PR's `beforeCommit`. A fresh `git clone` will **not** have it. So state A cannot be a `commit` or `range` anchor that verifies on another machine: with a complete history and the SHA absent, the verifier returns `fail`, not `unverifiable`.

What survives in a clean clone, and what does not:

| fact | survives clone? | resolved by |
|---|---|---|
| state B ran `website-ci` and `script-tests`, both success | yes, as a capture | the `run` anchors below |
| the squash-merge message carries the "write it as skip-CI in prose" note | yes | the `range` anchor below |
| state A had zero runs | **no.** It is a fact about the absence of runs, and no anchor kind resolves an absence | this capture, and the commands above |

The zero-run half of the A/B is the half the reader cares most about, and it is the half the anchor vocabulary cannot carry. I record that as a gap in ADR-0003's kinds. I did not invent an anchor to cover it.

### The decisive log lines, verbatim

Source: `gh run view <id> -R isatimur/ai-engineering-book-lab --log`, read 2026-11-16. Runner timestamp prefixes and ANSI colour codes removed, nothing else edited. The two logs are 783 and 309 lines, so neither had expired.

Both runs checked out the same merge of state B into `main`, which is the line that ties each log to `32259b9`:

```
HEAD is now at afa2de4 Merge 32259b9bdd6d00f8380b82637d7b25e448feef7d into 6ac2a50dc1e95fae4aae938f5a053bec1d04a6e8
```

That line is identical in both logs, so it cannot tell the two runs apart. Each anchor below therefore quotes a line only its own run produced.

Run `43769536033` (`website-ci`):

```
 Test Files  19 passed (19)
✓ built in 4.47s
```

Run `43769536100` (`script-tests`):

```
Found 2 test file(s):
PASS  scripts/test_check_diagram_sync.py
PASS  scripts/test_commit_regenerated.py
```

The event (`pull_request`) and the conclusion (success) are run metadata, not log text. They stay in the table above.

### Ready-to-paste anchors

```
**Artifact anchor:**
- kind: run
- ref: 43769536033
- date: 2026-11-15
- excerpt: Test Files  19 passed (19)

**Artifact anchor:**
- kind: run
- ref: 43769536100
- date: 2026-11-15
- excerpt: PASS  scripts/test_commit_regenerated.py

**Artifact anchor:**
- kind: range
- ref: 6ac2a50..2de004f
- date: 2026-11-16
- excerpt: Mentioning the marker
```

The `range` anchor reads the message of the squash commit `2de004f`, which is reachable from `main` (the range starts at the bot commit `6ac2a50`, because the verifier accepts only SHAs or dates as endpoints, not `2de004f^`). Its excerpt is the start of the sentence "Mentioning the marker is enough to trigger it". The `run` excerpts are raw log lines quoted verbatim in the section above, each one produced by its own run. Each shows work that run did — 19 test files passing, a named test file passing — rather than restating the metadata. The run's `conclusion` is metadata and stays in the table.

## Incident 4 — the 57-day figure window

Source: **git only.** This item cannot expire.

### The facts

| | |
|---|---|
| figure source | `diagrams/inline/ch05-fig1-rag-is-not-memory.excalidraw` |
| rendered figure | `diagrams/inline/ch05-fig1-rag-is-not-memory.png` |
| source edited by | `53df9ab`, 2026-09-19 (committer date UTC), a withdrawal "on request" |
| PNG last touched before that | `e525216`, 2026-06-09, a 77-file PNG downscale |
| PNG regenerated by | `3d3935d`, 2026-11-15, PR #85 |
| window | 2026-09-19 to 2026-11-15 = **57 days** (11 days left in September, 31 in October, 15 in November) |

The withdrawal edited the source and removed a credit for a speaker who asked to be removed. The edit changed one line: the figure's footer lost the clause "also <speaker>, <company> · #218". The rendered PNG was not regenerated. The PNG blob is the same object at `53df9ab` and at `e525216`, so it did not change in the 102 days between them. It changed next in `3d3935d`.

I do not name the speaker in this file. The commit subject of `53df9ab` does, and it is public in the repository history.

### Derivation

```bash
# the source: two commits ever, the second is the withdrawal
git log --format='%h %ad %s' --date=short -- diagrams/inline/ch05-fig1-rag-is-not-memory.excalidraw

# the PNG: last touched 2026-06-09 until PR #85 re-rendered it
git log --format='%h %ad %s' --date=short -- diagrams/inline/ch05-fig1-rag-is-not-memory.png

# the PNG blob is unchanged from the downscale through the withdrawal and beyond,
# then differs at PR #85
git rev-parse 53df9ab:diagrams/inline/ch05-fig1-rag-is-not-memory.png \
              e525216:diagrams/inline/ch05-fig1-rag-is-not-memory.png \
              3d3935d:diagrams/inline/ch05-fig1-rag-is-not-memory.png

# the one-line source edit
git show 53df9ab --stat --format='%h %ad%n%s' --date=iso-strict -- diagrams/inline/ch05-fig1-rag-is-not-memory.excalidraw

# day arithmetic
python3 -c "from datetime import date; print((date(2026,11,15)-date(2026,9,19)).days)"
```

Results: the source log shows `53df9ab 2026-09-19` and `919f38b 2026-05-26`. The PNG log shows `3d3935d 2026-11-15`, `e525216 2026-06-09`, `919f38b 2026-05-26`. The three `rev-parse` lines give `78280c5f…`, `78280c5f…`, `7259db9b…`. The first two are equal and the third differs. The edit touched 1 file, 1 line. The arithmetic prints `57`.

### I looked at the pixels, not only the hashes

I extracted both PNG blobs with `git show <commit>:<path>` and opened them.

- At `53df9ab` (the withdrawal commit), the footer line read: `"Stuffing context is not memory." — Jack Morris · corpus video #48 · also <speaker>, <company> · #218`. The withdrawn speaker's name is on the rendered figure.
- At `3d3935d` (PR #85), the footer read: `"Stuffing context is not memory." — Jack Morris · corpus video #48`. The name is gone.

So the committed PNG carried the name for the whole window. That is a statement about the **committed file**. I did not fetch the live site, so I cannot say how long the deployed copy carried it. The site's copy lives at `website/public/diagrams/inline/ch05-fig1.png` and is a separate generated file, and the deploy gap in incident 2 bears on it. The 57 days is therefore a measurement of the repository, and the stronger claim about readers is **not verified here**.

### Ready-to-paste anchors

```
**Artifact anchor:**
- kind: commit
- ref: 53df9ab
- date: 2026-09-19
- excerpt: +      "text": "“Stuffing context is not memory.” — Jack Morris · corpus video #48", "originalText": "“Stuffing context is not memory.” — Jack Morris · corpus video #48",
```

The `commit` anchor's excerpt is the added diff line of the source edit (one long line, copied exactly). That line does not carry the speaker's name, so the anchor can be quoted in the book. It proves the source edit and its date. It does **not** prove the PNG stayed stale: that is a statement about the *absence* of a commit that touched the PNG, and no anchor kind resolves an absence. I wrote no anchor for it. It rests on the `git log` and `git rev-parse` commands above. It is the same gap as the zero-run half of incident 3.

## What these captures do not cover

- **The Claim "a `GITHUB_TOKEN` push starts no workflow" is a rule of GitHub, not a fact about this repo.** I did not check it against GitHub's documentation in this pass. A chapter that states it as a rule needs a primary source, and that is a different anchor from anything here.
- **Which of the two causes (token or marker) blocked the 179 bot deploys** cannot be told from the history. See incident 2.
- **What readers saw on the live site** was not measured. Items 1, 2 and 4 each stop at the repository and the deploy record.
- **Absence claims** (zero runs, no deploy, no PNG commit) have no anchor kind. They rest on the commands in this file.
- **Untouched.** No anchor was added to `claims-3/Claims Ledger.md` in this task. The anchors above are ready to paste. Before pasting, run each through `python3 scripts/verify_artifact_anchors.py` in a scratch ledger.
