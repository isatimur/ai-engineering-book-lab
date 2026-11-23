// website/scripts/sync-second-book.mjs
// Copies the second book's drafted chapters from ../../public/drafting-2/*.md
// into ./src/content-2/chapter-NN.md so they can be `?raw`-imported the same
// way book 1's chapters are (see src/data/bookChapters.ts and this script's
// sibling, sync-diagrams.mjs, for the pattern this mirrors).
//
// Idempotent: copies only when source content differs from destination content.
// Skip-safe: if public/drafting-2/ isn't present in this checkout (e.g. a
// shallow CI/Vercel sandbox), this exits cleanly and leaves any committed
// src/content-2/ files as-is — exactly like sync-diagrams.mjs and sync-audio.mjs
// do for their own sources.

import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const websiteRoot = resolve(__dirname, '..');
const destDir = join(websiteRoot, 'src', 'content-2');

// In a git worktree the checked-out tree may not contain public/drafting-2/
// at repoRoot (the directory only exists in the main working tree, same
// caveat as sync-diagrams.mjs's diagrams/ lookup). Walk up parent dirs.
function findDraftingRoot() {
  let dir = repoRoot;
  for (let i = 0; i < 5; i++) {
    const candidate = join(dir, 'public', 'drafting-2');
    if (existsSync(candidate)) return candidate;
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return join(repoRoot, 'public', 'drafting-2');
}

const draftingRoot = findDraftingRoot();

const log = (...args) => console.log('[sync-second-book]', ...args);

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function fileHash(path) {
  const buf = await readFile(path);
  return createHash('sha256').update(buf).digest('hex');
}

// Content-based, not mtime-based — see sync-diagrams.mjs's `differs()` for why
// (a ship-gate review found mtime comparison lets stale bytes sit unrefreshed).
async function differs(src, dst) {
  if (!existsSync(dst)) return true;
  const [srcStat, dstStat] = await Promise.all([stat(src), stat(dst)]);
  if (srcStat.size !== dstStat.size) return true;
  const [a, b] = await Promise.all([fileHash(src), fileHash(dst)]);
  return a !== b;
}

async function copyIfDifferent(src, dst) {
  if (await differs(src, dst)) {
    await ensureDir(dirname(dst));
    await writeFile(dst, await readFile(src));
    return true;
  }
  return false;
}

// Book 2 figures: diagrams-2/figures.json is the single figure spec, and each
// entry's `file` is a PNG under diagrams-2/. Copy the spec to
// src/data/figures-2.json and the PNGs to public/diagrams-2/. Same skip rule
// as the chapters: with no diagrams-2/ in this checkout, keep the committed
// copies. The checks live in src/data/figuresTwo.test.ts, not here, because
// this script skips in CI.
function findFiguresRoot() {
  let dir = repoRoot;
  for (let i = 0; i < 5; i++) {
    const candidate = join(dir, 'diagrams-2', 'figures.json');
    if (existsSync(candidate)) return dirname(candidate);
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}

async function syncFigures() {
  const root = findFiguresRoot();
  if (!root) {
    log('diagrams-2/figures.json not found - skipping figure sync (using committed copies)');
    return;
  }
  const specSrc = join(root, 'figures.json');
  const spec = JSON.parse(await readFile(specSrc, 'utf8'));
  let copied = 0;
  let kept = 0;
  for (const fig of spec.figures) {
    const src = join(root, fig.file);
    if (!existsSync(src)) throw new Error(`figure ${fig.id}: ${fig.file} not found in diagrams-2/`);
    (await copyIfDifferent(src, join(websiteRoot, 'public', 'diagrams-2', fig.file))) ? copied++ : kept++;
  }
  (await copyIfDifferent(specSrc, join(websiteRoot, 'src', 'data', 'figures-2.json'))) ? copied++ : kept++;
  log(`figures done. copied=${copied} kept=${kept} -> public/diagrams-2/ (${spec.figures.length} figures)`);
}

async function main() {
  await syncFigures();
  if (!existsSync(draftingRoot)) {
    log(`source public/drafting-2/ not found at ${draftingRoot} - skipping sync (using committed src/content-2/ artifacts)`);
    return;
  }

  const files = (await readdir(draftingRoot))
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .filter((f) => /^chapter\s+\d+/i.test(f))
    .sort((a, b) => {
      const na = parseInt(a.match(/^chapter\s+(\d+)/i)?.[1] ?? '0', 10);
      const nb = parseInt(b.match(/^chapter\s+(\d+)/i)?.[1] ?? '0', 10);
      return na - nb;
    });

  if (files.length === 0) {
    log(`no "Chapter N — ...md" files found in ${draftingRoot} - nothing to sync`);
    return;
  }

  let copied = 0;
  let kept = 0;

  for (const file of files) {
    const num = parseInt(file.match(/^chapter\s+(\d+)/i)?.[1] ?? '0', 10);
    if (!num) {
      log(`warn: could not parse chapter number from "${file}" - skipping`);
      continue;
    }
    const dstName = `chapter-${String(num).padStart(2, '0')}.md`;
    const src = join(draftingRoot, file);
    const dst = join(destDir, dstName);
    (await copyIfDifferent(src, dst)) ? copied++ : kept++;
  }

  log(`done. copied=${copied} kept=${kept} -> src/content-2/ (${files.length} chapters)`);
}

main().catch((err) => {
  console.error('[sync-second-book][fatal]', err);
  process.exit(1);
});
