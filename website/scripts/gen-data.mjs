// website/scripts/gen-data.mjs
// Skip-safe prebuild wrapper: regenerates the committed data artifacts that are
// derived from repo state outside website/ and are SAFE to recompute from the
// working tree on any build — currently versions.json (a faithful view of git
// history). The generator is itself skip-and-fallback; this wrapper additionally
// tolerates a missing python3 or repo root (e.g. Vercel's shallow website-only
// sandbox) so the build NEVER fails here — it just keeps the committed JSON.
//
// NOTE: judge-scores.json is deliberately NOT regenerated here. Its per-paragraph
// rollups (incl. the substantive-usefulness metric) and excerpt resolution are
// LINE-PINNED to the public/drafting/*.md snapshot that the MASH run scored. Once
// those files are later edited, recomputing against the working tree resolves the
// scores' line ranges to the wrong text and silently drifts the numbers. So it is
// a committed artifact regenerated MANUALLY after a MASH run, while the working
// tree still matches the scored snapshot — exactly like evidence.json:
//   python3 99_Meta/scripts/build_judge_scores.py [--run <id>] [--version-id <sha>]

import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
const repoRoot = resolve(websiteRoot, '..');

const log = (...a) => console.log('[gen-data]', ...a);

// The generators live in the parent repo; if it isn't checked out here, skip.
const scriptsDir = join(repoRoot, '99_Meta', 'scripts');
if (!existsSync(scriptsDir)) {
  log(`repo scripts dir not found (${scriptsDir}) — using committed artifacts`);
  process.exit(0);
}

// Find a python interpreter; if none, skip cleanly.
function findPython() {
  for (const bin of ['python3', 'python']) {
    const probe = spawnSync(bin, ['--version'], { encoding: 'utf8' });
    if (probe.status === 0) return bin;
  }
  return null;
}

const python = findPython();
if (!python) {
  log('no python interpreter available — using committed artifacts');
  process.exit(0);
}

const generators = [
  join(scriptsDir, 'build_versions.py'), // live git-history view; safe to recompute
];

for (const script of generators) {
  if (!existsSync(script)) {
    log(`skip (not present yet): ${script}`);
    continue;
  }
  const r = spawnSync(python, [script], { cwd: repoRoot, encoding: 'utf8' });
  if (r.stdout) process.stdout.write(r.stdout);
  if (r.status !== 0) {
    // Never fail the build — committed artifact is the fallback.
    log(`generator exited ${r.status}; keeping committed artifact`);
    if (r.stderr) log(r.stderr.trim().split('\n').slice(-3).join(' | '));
  }
}

process.exit(0);
