// website/scripts/gen-data.mjs
// Skip-safe prebuild wrapper: regenerates the committed data artifacts that are
// derived from repo state outside website/ — judge-scores.json (from MASH runs)
// and versions.json (from git history). Both underlying Python generators are
// themselves skip-and-fallback; this wrapper additionally tolerates a missing
// python3 or missing repo root (e.g. Vercel's shallow website-only sandbox) so
// the build NEVER fails here — it just keeps the committed JSON.

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
  join(scriptsDir, 'build_judge_scores.py'),
  join(scriptsDir, 'build_versions.py'), // Phase 2; no-op here until it exists
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
