#!/usr/bin/env bash
# Commit and push regenerated artefacts, surviving a race with another job.
#
# Usage:
#   scripts/commit_regenerated.sh \
#     --message "chore(stats): regenerate ..." \
#     --regen   "python 99_Meta/scripts/build_stats.py" \
#     -- STATS.md stats.json website/src/data/stats.json
#
# Exit 0 and print "pushed=false" when there was nothing to commit.
# Exit 0 and print "pushed=true" when a commit landed on the remote.
# Exit 1 when the push could not be landed.
#
# When GITHUB_OUTPUT is set, `pushed=true|false` is also written there so a
# workflow can gate a follow-up step on whether anything actually changed.
#
# ---------------------------------------------------------------------------
# WHY THIS EXISTS: rebasing generated files republishes stale numbers.
#
# stats-regen and evidence-regen both trigger on overlapping paths, so two
# runs commit to main at once. The loop this replaces handled the lost race
# by rebasing. That is wrong for generated output, and on 2026-11-15 it put a
# wrong number on the live site:
#
#   1. The run for #85 checked out a tree WITHOUT #84's three new talks and
#      computed 1455 videos.
#   2. Its push was rejected. It rebased onto #84's commit. The rebase was
#      CLEAN, because #84 touched `99_Meta/Corpus Stats.md` but not
#      `stats.json`. It pushed 1455 on top of a 1458-note corpus.
#   3. The run for #84, holding the correct 1458, then hit a content conflict
#      on those same lines, died on attempt 1 of 5, and was the red X.
#
# The race winner published a number computed from a superseded tree, and the
# run with the right answer was the one that failed. A conflict here is not a
# merge problem. Two generators disagreeing about a derived value means one of
# them read an old tree, and the answer is to re-read the new one.
#
# So: on rejection, reset to the new tip, RE-RUN the generator, and commit
# what it produces. The last writer always computes from what it is pushing
# onto. If the tip already carries the right numbers, the re-run produces no
# diff and the script exits cleanly rather than pushing an empty commit.
# ---------------------------------------------------------------------------

set -euo pipefail

MESSAGE=""
REGEN=""
FILES=()
# Overridable so the test suite does not sit through real backoff.
MAX_ATTEMPTS="${COMMIT_REGEN_MAX_ATTEMPTS:-5}"
BACKOFF="${COMMIT_REGEN_BACKOFF:-3}"
BRANCH="${COMMIT_REGEN_BRANCH:-main}"

while [ $# -gt 0 ]; do
  case "$1" in
    --message) MESSAGE="$2"; shift 2 ;;
    --regen)   REGEN="$2";   shift 2 ;;
    --)        shift; FILES=("$@"); break ;;
    -h|--help) sed -n '2,20p' "$0"; exit 0 ;;
    *) echo "unknown flag: $1" >&2; exit 2 ;;
  esac
done

[ -n "$MESSAGE" ] || { echo "--message is required" >&2; exit 2; }
[ -n "$REGEN" ]   || { echo "--regen is required" >&2; exit 2; }
[ ${#FILES[@]} -gt 0 ] || { echo "at least one file is required after --" >&2; exit 2; }

emit_pushed() {
  echo "pushed=$1"
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    echo "pushed=$1" >> "$GITHUB_OUTPUT"
  fi
}

# True when at least one of FILES differs from HEAD.
has_changes() {
  ! git diff --quiet -- "${FILES[@]}"
}

commit_files() {
  git add -- "${FILES[@]}"
  git commit -q -m "$MESSAGE"
}

if ! has_changes; then
  echo "No changes in ${FILES[*]} — skipping commit"
  emit_pushed false
  exit 0
fi

git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
commit_files

for attempt in $(seq 1 "$MAX_ATTEMPTS"); do
  if git push origin "HEAD:${BRANCH}" 2>&1; then
    echo "Pushed on attempt ${attempt}."
    emit_pushed true
    exit 0
  fi

  if [ "$attempt" -eq "$MAX_ATTEMPTS" ]; then
    echo "::error::Could not land regenerated files after ${attempt} attempts."
    exit 1
  fi

  echo "Push rejected (attempt ${attempt}/${MAX_ATTEMPTS}) — ${BRANCH} moved."
  echo "Discarding this run's output and regenerating against the new tip."
  # An `[ ... ] && sleep` one-liner would be the last statement in the loop
  # body and its false branch returns 1, which is exactly the shape that
  # trips `set -e` in some shells. Spell it out.
  if [ "$BACKOFF" -gt 0 ]; then
    sleep $((attempt * BACKOFF))
  fi

  git fetch --quiet origin "$BRANCH"
  # Throw away our commit entirely. Its inputs are stale by definition:
  # something else changed the tree it was computed from.
  git reset --hard --quiet "origin/${BRANCH}"

  if ! eval "$REGEN"; then
    echo "::error::Regeneration command failed on attempt ${attempt}: ${REGEN}"
    exit 1
  fi

  if ! has_changes; then
    # The run that beat us already published the right answer.
    echo "New tip of ${BRANCH} already matches the generator — nothing to push."
    emit_pushed false
    exit 0
  fi

  commit_files
done
