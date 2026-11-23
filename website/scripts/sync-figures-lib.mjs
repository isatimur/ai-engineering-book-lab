// website/scripts/sync-figures-lib.mjs
// Shared figure sync for books 2 and 3. Each book keeps one figure spec,
// <repo>/<folder>/figures.json, whose entries name PNGs under <folder>/.
// This copies the spec to src/data/<dataName> and the PNGs to
// public/<folder>/. With no <folder>/figures.json in this checkout (CI,
// Vercel), it keeps the committed copies. The checks live in
// src/data/bookFigures.test.tsx, not here, because this sync skips in CI.

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';

async function fileHash(path) {
  return createHash('sha256').update(await readFile(path)).digest('hex');
}

// Content-based, not mtime-based, like the chapter syncs.
async function copyIfDifferent(src, dst) {
  if (existsSync(dst)) {
    const [a, b] = await Promise.all([stat(src), stat(dst)]);
    if (a.size === b.size && (await fileHash(src)) === (await fileHash(dst))) return false;
  }
  await mkdir(dirname(dst), { recursive: true });
  await writeFile(dst, await readFile(src));
  return true;
}

// In a git worktree the folder may only exist in the main working tree.
function findFolder(repoRoot, folder) {
  let dir = repoRoot;
  for (let i = 0; i < 5; i++) {
    const candidate = join(dir, folder, 'figures.json');
    if (existsSync(candidate)) return dirname(candidate);
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

export async function syncFigures({ repoRoot, websiteRoot, folder, dataName, log }) {
  const root = findFolder(repoRoot, folder);
  if (!root) {
    log(`${folder}/figures.json not found - skipping figure sync (using committed copies)`);
    return;
  }
  const specSrc = join(root, 'figures.json');
  const spec = JSON.parse(await readFile(specSrc, 'utf8'));
  let copied = 0;
  let kept = 0;
  for (const fig of spec.figures) {
    const src = join(root, fig.file);
    if (!existsSync(src)) throw new Error(`figure ${fig.id}: ${fig.file} not found in ${folder}/`);
    (await copyIfDifferent(src, join(websiteRoot, 'public', folder, fig.file))) ? copied++ : kept++;
  }
  (await copyIfDifferent(specSrc, join(websiteRoot, 'src', 'data', dataName))) ? copied++ : kept++;
  log(`figures done. copied=${copied} kept=${kept} -> public/${folder}/ (${spec.figures.length} figures)`);
}
