#!/usr/bin/env python3
"""Verify Artifact anchors: claims that cite the repo instead of a talk (ADR-0003).

`verify()` returns THREE things, `(checked, unverifiable, failures)`, and the
second must never collapse into either neighbour. GitHub expires Actions logs
after 90 days, and `gh run view --log` then returns EMPTY, not an error
(measured 2026-11-15: 93 of 190 `diagrams-check` runs had lost their logs).
"Evidence expired" and "evidence wrong" are different answers.

`unverifiable` means one thing only: the evidence is gone or the history is
incomplete. It never means the verifier could not run. A broken `--repo`, a
missing checkout or an absent `research_passes/` is an error or a failure.

Ledger format, one block per anchor:

    **Artifact anchor:**
    - kind: commit | run | file | range
    - ref: <sha> | <run id> | <repo-relative path> | <start>..<end>
    - date: YYYY-MM-DD
    - excerpt: <verbatim single line>

The header matches without regard to case, because the repo's own vocabulary
capitalises the term. A `- kind:` line that no block consumed is a failure on
its own, so a header this file cannot read never reads as "zero anchors".

`ref` is validated before it is resolved. A moving ref such as `HEAD` or a
branch name is not an anchor, so `commit` takes a SHA only. `run` takes digits
only, and `range` takes two endpoints, each a SHA or an ISO date.

Resolution, per ADR-0003 and the verifier decisions:

  commit  SHA against git history. Missing SHA: unverifiable in a shallow
          clone, failure in a complete history. The committer date (UTC) must
          equal `date`, or the anchor fails. The excerpt must be in the diff.
  file    `git show <commit>:<path>` at the last commit reachable from HEAD
          whose committer date is on or before end-of-day UTC of `date`.
          No such commit: unverifiable. Path or excerpt absent: failure.
  range   `<start>..<end>`; each end is a SHA or an ISO date, and a date
          resolves like `file` does. An endpoint the history cannot reach is
          unverifiable only in a shallow clone. Excerpt must be in `log -p`.
  run     NEVER the network. Every file in `research_passes/` is read, and
          ONE file must hold both the run id and the excerpt. Requiring both
          in the same file stops a census table that repeats one phrase from
          satisfying every run it lists. Pasted anchor blocks are subtracted
          first, because a block holds the id and the excerpt by construction
          and would otherwise certify itself. No file names the run:
          unverifiable. A file names the run but lacks the excerpt: failure.

    python3 scripts/verify_artifact_anchors.py --ledger "claims-3/Claims Ledger.md"
"""
from __future__ import annotations

import argparse
import re
import subprocess
import sys
from datetime import UTC, datetime, time
from pathlib import Path

KINDS = ("commit", "run", "file", "range")
FIELDS = ("kind", "ref", "date", "excerpt")

# `**Artifact anchor:**`, `Artifact Anchor:`, `**Artifact Anchor**:` — all one
# header. The colon is required: without it `## Artifact anchors` in prose
# would open an empty block and raise a false failure.
HEADER_RE = re.compile(
    r"^\s*(?:[-*]\s+)?\*{0,2}artifact\s+anchor\s*\*{0,2}\s*:\*{0,2}\s*$", re.I)
# The ledger writes bold keys with the colon inside the bold, as in
# `**Supporting sources:**`. So `- kind:`, `- **kind:**` and `- **kind**:` are
# all the same field. Group 1 is the opening `**`; the closing `**` is consumed
# only when the key opened with one, so an excerpt that starts with `**` keeps
# its asterisks. Group 2 is the key, group 3 the value.
FIELD_RE = re.compile(
    r"^\s*(?:[-*]\s+)?(\*\*)?(kind|ref|date|excerpt)(?(1)\*{0,2})\s*:(?(1)\*{0,2})\s*(.*?)\s*$",
    re.I)
# The backstop. Any line that declares a real kind but sits outside every
# parsed block is a failure, whatever went wrong with the header above it.
# It is deliberately looser than FIELD_RE: emphasis and code ticks are stripped
# before matching, because a false orphan is loud and a missed one is silent.
KIND_LINE_RE = re.compile(r"^\s*-?\s*kind\s*:\s*(commit|run|file|range)\s*$", re.I)
EMPHASIS = str.maketrans("", "", "*`_")


def is_orphan_kind_line(line: str) -> bool:
    return bool(KIND_LINE_RE.match(line.translate(EMPHASIS)))

ISO_DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
SHA_RE = re.compile(r"^[0-9a-f]{7,40}$")
RUN_ID_RE = re.compile(r"^\d+$")

CAPTURE_DIR = "research_passes"
MIN_EXCERPT_CHARS = 3  # `+` or `}` matches every diff and certifies nothing.

PASS, FAIL, UNVERIFIABLE = "pass", "fail", "unverifiable"
Outcome = tuple[str, str]  # (PASS | FAIL | UNVERIFIABLE, message)


class GitEnvironmentError(RuntimeError):
    """`--repo` does not point at a usable git checkout. Never unverifiable."""


def run_git(repo: Path, *args: str) -> subprocess.CompletedProcess[str]:
    return subprocess.run(["git", *args], cwd=repo, capture_output=True,
                          text=True, errors="replace")


def assert_git_environment(repo: Path) -> None:
    """Fail loudly once, so no later git error can masquerade as expired evidence."""
    if not repo.is_dir():
        raise GitEnvironmentError(f"{repo} is not a directory")
    inside = run_git(repo, "rev-parse", "--is-inside-work-tree")
    if inside.returncode != 0 or inside.stdout.strip() != "true":
        detail = inside.stderr.strip() or inside.stdout.strip() or "no output"
        raise GitEnvironmentError(f"{repo} is not inside a git work tree: {detail}")
    head = run_git(repo, "rev-parse", "--verify", "HEAD")
    if head.returncode != 0:
        detail = head.stderr.strip() or "no output"
        raise GitEnvironmentError(f"{repo} has no resolvable HEAD: {detail}")


def strip_quotes(value: str) -> str:
    """Unquote, then strip. A quoted blank must not survive as a space."""
    value = value.strip()
    if len(value) >= 2 and value[0] == value[-1] and value[0] in "\"'":
        value = value[1:-1]
    return value.strip()


FENCE_RE = re.compile(r"^ {0,3}(`{3,}|~{3,})(.*)$")


def fenced_line_numbers(lines: list[str]) -> tuple[set[int], int | None]:
    """Indexes of lines inside a fenced code block, fence lines included.

    A fence opens with 3+ backticks or tildes, with an optional info string.
    It closes on the same character, at least as long, with nothing after it.
    A block that never closes runs to the end of the file, as in CommonMark.
    The second value is the index of the opening line of a fence that never
    closed, or None. The caller must report it: the lines after it are unseen.
    """
    fenced: set[int] = set()
    open_char = ""
    open_len = 0
    open_at = 0
    for n, line in enumerate(lines):
        m = FENCE_RE.match(line)
        if not open_char:
            if m and not (m.group(1)[0] == "`" and "`" in m.group(2)):
                open_char, open_len, open_at = m.group(1)[0], len(m.group(1)), n
                fenced.add(n)
            continue
        fenced.add(n)
        if m and m.group(1)[0] == open_char and len(m.group(1)) >= open_len \
                and not m.group(2).strip():
            open_char = ""
    return fenced, (open_at if open_char else None)


def _scan(lines: list[str], fenced: set[int]) -> tuple[list[dict[str, str]], set[int]]:
    """Every anchor block in `lines`, plus the line indexes the blocks consumed."""
    anchors: list[dict[str, str]] = []
    consumed: set[int] = set()
    i = 0
    while i < len(lines):
        if i in fenced or not HEADER_RE.match(lines[i]):
            i += 1
            continue
        fields: dict[str, str] = {"_line": str(i + 1)}
        repeated: list[str] = []
        consumed.add(i)
        i += 1
        while i < len(lines) and i not in fenced:
            m = FIELD_RE.match(lines[i])
            if not m:
                if not lines[i].strip() and len(fields) == 1:
                    i += 1  # tolerate blank lines between header and fields
                    continue
                break
            key = m.group(2).lower()
            if key in fields:
                repeated.append(key)
            fields[key] = strip_quotes(m.group(3))
            consumed.add(i)
            i += 1
        if repeated:
            fields["_repeated"] = ", ".join(sorted(set(repeated)))
        anchors.append(fields)
    return anchors, consumed


def anchor_block_lines(text: str) -> set[int]:
    """Line indexes a pasted anchor block occupies, fences included.

    `parse_anchors` skips fenced blocks because a fenced anchor in a ledger is
    an example. A capture file is the other way round: its "Ready-to-paste
    anchors" sections ARE fenced, and a pasted block holds the run id and the
    excerpt by construction. So this scans with fences ignored, and `check_run`
    subtracts these lines before it searches. Same parser, no second grammar.
    """
    return _scan(text.splitlines(), set())[1]


def parse_anchors(text: str) -> tuple[list[dict[str, str]], list[str]]:
    """Every anchor block, plus a failure for every `kind` line outside one."""
    lines = text.splitlines()
    fenced, unclosed = fenced_line_numbers(lines)
    anchors, consumed = _scan(lines, fenced)
    orphans = [
        f"line {n + 1}: `{lines[n].strip()}` sits outside every anchor block — "
        f"check the `**Artifact anchor:**` header above it"
        for n in range(len(lines))
        if n not in consumed and n not in fenced and is_orphan_kind_line(lines[n])
    ]
    if unclosed is not None:
        orphans.append(
            f"line {unclosed + 1}: code fence is never closed — anchors after "
            f"line {unclosed + 1} were not checked; close the fence"
        )
    return anchors, orphans


def is_shallow(repo: Path) -> bool:
    out = run_git(repo, "rev-parse", "--is-shallow-repository")
    return out.stdout.strip() == "true"


def end_of_day_utc(date: str) -> int:
    day = datetime.strptime(date, "%Y-%m-%d").date()
    return int(datetime.combine(day, time(23, 59, 59), tzinfo=UTC).timestamp())


def last_commit_on_or_before(repo: Path, date: str) -> str | None:
    """First commit walking back from HEAD whose committer date is <= end of `date`.

    `None` means the history holds no commit that old — never that git broke.
    """
    cutoff = end_of_day_utc(date)
    out = run_git(repo, "log", "--format=%H %ct", "HEAD")
    if out.returncode != 0:
        raise GitEnvironmentError(f"git log failed in {repo}: {out.stderr.strip()}")
    for line in out.stdout.splitlines():
        sha, _, ts = line.partition(" ")
        if int(ts) <= cutoff:
            return sha
    return None


def committer_date_utc(repo: Path, sha: str) -> str:
    out = run_git(repo, "show", "-s", "--format=%ct", sha)
    if out.returncode != 0 or not out.stdout.strip():
        raise GitEnvironmentError(f"git show failed for {sha} in {repo}: {out.stderr.strip()}")
    return datetime.fromtimestamp(int(out.stdout.strip()), tz=UTC).strftime("%Y-%m-%d")


def has_commit(repo: Path, ref: str) -> bool:
    return run_git(repo, "cat-file", "-e", f"{ref}^{{commit}}").returncode == 0


def is_iso_date(value: str) -> bool:
    if not ISO_DATE_RE.match(value):
        return False
    try:
        datetime.strptime(value, "%Y-%m-%d")
    except ValueError:
        return False
    return True


def ref_problem(a: dict[str, str]) -> str | None:
    """Reject a `ref` that cannot be an anchor, before any resolution runs."""
    ref = a["ref"]
    kind = a["kind"]
    if kind == "commit":
        if not SHA_RE.match(ref):
            return "ref must be a commit SHA of 7 to 40 hex digits, not a moving ref"
    elif kind == "run":
        if not RUN_ID_RE.match(ref):
            return "ref must be a GitHub Actions run id, digits only"
    elif kind == "range":
        start, sep, end = ref.partition("..")
        if not sep or not start or not end:
            return "ref must look like <start>..<end>"
        for endpoint in (start, end):
            if not SHA_RE.match(endpoint) and not is_iso_date(endpoint):
                return f"range endpoint {endpoint!r} is neither a SHA nor a YYYY-MM-DD date"
    return None


def label(a: dict[str, str]) -> str:
    return f"line {a['_line']} {a.get('kind', '?')} {a.get('ref', '?')}"


def check_commit(repo: Path, a: dict[str, str]) -> Outcome:
    ref = a["ref"]
    if not has_commit(repo, ref):
        if is_shallow(repo):
            return UNVERIFIABLE, f"{label(a)}: not in this shallow clone"
        return FAIL, f"{label(a)}: commit not found in complete history"
    actual = committer_date_utc(repo, ref)
    if actual != a["date"]:
        return FAIL, (f"{label(a)}: committer date is {actual}, anchor says {a['date']}")
    diff = run_git(repo, "show", "--format=", ref).stdout
    if a["excerpt"] not in diff:
        return FAIL, f"{label(a)}: excerpt not in the commit's diff"
    return PASS, ""


def check_file(repo: Path, a: dict[str, str]) -> Outcome:
    commit = last_commit_on_or_before(repo, a["date"])
    if commit is None:
        return UNVERIFIABLE, f"{label(a)}: no commit on or before {a['date']} in history"
    shown = run_git(repo, "show", f"{commit}:{a['ref']}")
    if shown.returncode != 0:
        return FAIL, (f"{label(a)}: path absent at {commit[:7]}, "
                      f"the last commit on or before {a['date']}")
    if a["excerpt"] not in shown.stdout:
        return FAIL, f"{label(a)}: excerpt not in the file at {commit[:7]}"
    return PASS, ""


def resolve_endpoint(repo: Path, end: str) -> tuple[str | None, Outcome | None]:
    """(commit, None) on success, else (None, outcome-to-report).

    A missing endpoint is unverifiable only when the history is incomplete.
    ADR-0003 permits unverifiable for a range on that condition alone, so the
    date branch honours `is_shallow` exactly as the SHA branch does.
    """
    if is_iso_date(end):
        commit = last_commit_on_or_before(repo, end)
        if commit is not None:
            return commit, None
        if is_shallow(repo):
            return None, (UNVERIFIABLE, f"no commit on or before {end} in this shallow clone")
        return None, (FAIL, f"no commit on or before {end} in complete history")
    if has_commit(repo, end):
        return end, None
    if is_shallow(repo):
        return None, (UNVERIFIABLE, f"{end} not in this shallow clone")
    return None, (FAIL, f"{end} not found in complete history")


def check_range(repo: Path, a: dict[str, str]) -> Outcome:
    start_ref, _, end_ref = a["ref"].partition("..")
    resolved = []
    for end in (start_ref, end_ref):
        commit, problem = resolve_endpoint(repo, end)
        if problem:
            return problem[0], f"{label(a)}: {problem[1]}"
        resolved.append(commit)
    log = run_git(repo, "log", "-p", "--format=%B", f"{resolved[0]}..{resolved[1]}").stdout
    if a["excerpt"] not in log:
        return FAIL, f"{label(a)}: excerpt not in the range's diffs or log"
    return PASS, ""


def check_run(repo: Path, a: dict[str, str]) -> Outcome:
    """Capture files only. An expired live log is empty, so it is never read.

    This repo names captures `YYYY-MM-DD-slug.md`, so the run id lives in the
    text, not in the file name. One file must hold the id AND the excerpt.

    A pasted `**Artifact anchor:**` block holds both by construction, and
    captures carry one in their "Ready-to-paste anchors" sections. So every
    anchor block is subtracted from the capture before it is searched: an
    anchor can never certify itself. What is left is the real evidence.
    """
    capture_dir = repo / CAPTURE_DIR
    if not capture_dir.is_dir():
        return FAIL, (f"{label(a)}: {CAPTURE_DIR}/ is missing from {repo} — "
                      f"wrong --repo or an incomplete checkout, not expired evidence")
    # Digit boundaries, so run 4374090918 is not satisfied by run 43740909184.
    run_id_re = re.compile(rf"(?<!\d){re.escape(a['ref'])}(?!\d)")
    naming_the_run = 0
    for path in sorted(capture_dir.rglob("*")):
        if not path.is_file():
            continue
        raw = path.read_text(errors="replace")
        blocked = anchor_block_lines(raw)
        text = "\n".join(line for n, line in enumerate(raw.splitlines())
                         if n not in blocked)
        if not run_id_re.search(text):
            continue
        naming_the_run += 1
        if a["excerpt"] in text:
            return PASS, ""
    if not naming_the_run:
        return UNVERIFIABLE, (f"{label(a)}: no capture in {CAPTURE_DIR}/ names this run "
                              f"(evidence expired or never captured)")
    return FAIL, (f"{label(a)}: {naming_the_run} capture(s) name this run, "
                  f"none holds the excerpt")


CHECKS = {"commit": check_commit, "file": check_file, "range": check_range, "run": check_run}


def check_anchor(repo: Path, a: dict[str, str]) -> Outcome:
    if a.get("_repeated"):
        return FAIL, (f"line {a['_line']}: repeated field(s) {a['_repeated']} — "
                      f"the last value would win silently")
    missing = [f for f in FIELDS if not a.get(f)]
    if missing:
        return FAIL, f"line {a['_line']}: anchor lacks field(s) {', '.join(missing)}"
    if a["kind"] not in KINDS:
        return FAIL, f"{label(a)}: unknown kind (expected one of {', '.join(KINDS)})"
    if not is_iso_date(a["date"]):
        return FAIL, f"{label(a)}: date {a['date']!r} is not a real YYYY-MM-DD date"
    if len(a["excerpt"]) < MIN_EXCERPT_CHARS:
        return FAIL, (f"{label(a)}: excerpt {a['excerpt']!r} is blank or too short "
                      f"(need {MIN_EXCERPT_CHARS} characters or more)")
    problem = ref_problem(a)
    if problem:
        return FAIL, f"{label(a)}: {problem}"
    return CHECKS[a["kind"]](repo, a)


def verify(ledger_path: Path, repo: Path) -> tuple[int, int, list[str]]:
    """Return `(checked, unverifiable, failures)`; the three never overlap.

    Raises `GitEnvironmentError` when `repo` is not a usable checkout. That is
    deliberate: an environment error must never be reported as expired evidence.
    """
    repo = Path(repo)
    assert_git_environment(repo)
    checked = unverifiable = 0
    anchors, failures = parse_anchors(Path(ledger_path).read_text())
    for anchor in anchors:
        outcome, message = check_anchor(repo, anchor)
        if outcome == PASS:
            checked += 1
        elif outcome == UNVERIFIABLE:
            unverifiable += 1
        else:
            failures.append(message)
    return checked, unverifiable, failures


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--ledger", type=Path, required=True)
    ap.add_argument("--repo", type=Path, default=Path("."))
    args = ap.parse_args()

    try:
        checked, unverifiable, failures = verify(args.ledger, args.repo.resolve())
    except GitEnvironmentError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2
    print(f"{checked} checked, {unverifiable} unverifiable, {len(failures)} failed")
    if unverifiable:
        print(f"{unverifiable} unverifiable: evidence could not be checked. "
              f"Not a pass, not a failure.")
    if failures:
        print(f"\nfailures ({len(failures)}):")
        for f in failures:
            print(f"  {f}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
