// website/scripts/sync-third-book.mjs
// Copies the third book's drafted chapters from ../../public/drafting-3/*.md
// into ./src/content-3/chapter-NN.md so they can be `?raw`-imported the same
// way book 1's chapters are (see src/data/bookChapters.ts and this script's
// sibling, sync-second-book.mjs, for the pattern this mirrors).
//
// Idempotent: copies only when source content differs from destination content.
// Skip-safe: if public/drafting-3/ isn't present in this checkout (e.g. a
// shallow CI/Vercel sandbox), this exits cleanly and leaves any committed
// src/content-3/ files as-is — exactly like sync-second-book.mjs does.
// Empty-safe: a track with no chapters yet is valid. It reports 0 chapters
// and exits 0.

import { readFile, writeFile, mkdir, stat, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { syncFigures } from './sync-figures-lib.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const websiteRoot = resolve(__dirname, '..');
const destDir = join(websiteRoot, 'src', 'content-3');

// In a git worktree the checked-out tree may not contain public/drafting-3/
// at repoRoot (the directory only exists in the main working tree, same
// caveat as sync-diagrams.mjs's diagrams/ lookup). Walk up parent dirs.
function findDraftingRoot() {
  let dir = repoRoot;
  for (let i = 0; i < 5; i++) {
    const candidate = join(dir, 'public', 'drafting-3');
    if (existsSync(candidate)) return candidate;
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return join(repoRoot, 'public', 'drafting-3');
}

const draftingRoot = findDraftingRoot();

const log = (...args) => console.log('[sync-third-book]', ...args);

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

async function main() {
  // Book 3 figures: diagrams-3/figures.json -> src/data/figures-3.json + public/diagrams-3/.
  await syncFigures({ repoRoot, websiteRoot, folder: 'diagrams-3', dataName: 'figures-3.json', log });
  if (!existsSync(draftingRoot)) {
    log(`source public/drafting-3/ not found at ${draftingRoot} - skipping sync (using committed src/content-3/ artifacts)`);
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

  // The planned outline, so the reader can show what the book WILL be while
  // it has no prose. Copied rather than hand-transcribed: a chapter list
  // retyped into a .ts file is the "identity hand-copied into source" defect
  // this repo already carries elsewhere, and it would drift the moment the
  // classification is re-run.
  const outlineSrc = join(draftingRoot, '..', '..', '99_Meta', 'third-book-classification.json');
  let outline = 'absent';
  if (existsSync(outlineSrc)) {
    const dst = join(websiteRoot, 'src', 'data', 'third-book-outline.json');
    outline = (await copyIfDifferent(outlineSrc, dst)) ? 'copied' : 'kept';
  }

  // An empty track (no "Chapter N — ...md" files yet) is valid: it falls
  // through to this line and reports 0 chapters.
  log(`done. copied=${copied} kept=${kept} -> src/content-3/ (${files.length} chapters); outline ${outline}`);
}

main().catch((err) => {
  console.error('[sync-third-book][fatal]', err);
  process.exit(1);
});
