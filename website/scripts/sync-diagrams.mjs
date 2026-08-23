// website/scripts/sync-diagrams.mjs
// Copies diagrams from ../../diagrams/ into ./public/diagrams/ under an
// organized layout. Emits public/diagrams/manifest.json from diagram-meta.json.
// Idempotent: copies only when source content differs from destination content.

import { readFile, writeFile, mkdir, stat, copyFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../..');
const websiteRoot = resolve(__dirname, '..');
const publicDiagrams = join(websiteRoot, 'public', 'diagrams');
const metaPath = join(__dirname, 'diagram-meta.json');

// In a git worktree the checked-out tree may not contain diagrams/ at repoRoot
// (the directory only exists in the main working tree). Walk up parent dirs.
function findDiagramsRoot() {
  let dir = repoRoot;
  for (let i = 0; i < 5; i++) {
    const candidate = join(dir, 'diagrams');
    if (existsSync(candidate)) return candidate;
    const parent = resolve(dir, '..');
    if (parent === dir) break;
    dir = parent;
  }
  return join(repoRoot, 'diagrams');
}

const diagramsRoot = findDiagramsRoot();

const log = (...args) => console.log('[sync-diagrams]', ...args);
const warn = (...args) => console.warn('[sync-diagrams][warn]', ...args);

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function fileHash(path) {
  const buf = await readFile(path);
  return createHash('sha256').update(buf).digest('hex');
}

// Content-based, not mtime-based: a ship-gate review (2026-08-23, see
// ai-native-org/ledger/verdicts.md) found that mtime comparison let three
// destination files sit with wrong bytes since 2026-07-31 (be228ee) — a
// prior bug's mis-copy already existed on disk and "not stale by mtime"
// meant it was never refreshed even once the manifest was fixed to point
// at it correctly. Hashing the (typically small, PNG) file on every run
// costs little next to being wrong silently.
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
    await copyFile(src, dst);
    return true;
  }
  return false;
}

function humanize(s) {
  return s
    .replace(/^\d+-/, '')
    .replace(/\.(excalidraw|png)$/, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function listPngs(dir) {
  if (!existsSync(dir)) return [];
  return (await readdir(dir)).filter((f) => f.endsWith('.png')).sort();
}

async function main() {
  // CI/Vercel may not have access to ../../diagrams/ — the build sandbox is
  // rooted at website/. In that case, skip sync and rely on the committed
  // public/diagrams/ + src/data/diagram-manifest.json artifacts.
  if (!existsSync(diagramsRoot)) {
    log(`source diagrams/ not found at ${diagramsRoot} - skipping sync (using committed artifacts)`);
    return;
  }

  const metaRaw = await readFile(metaPath, 'utf8');
  const meta = JSON.parse(metaRaw);

  let copied = 0;
  let kept = 0;
  const manifest = { overview: [], openers: [], concepts: [], inline: [], maps: [], dividers: [] };

  // OVERVIEW
  for (const sourceFile of Object.keys(meta.overview)) {
    const srcPng = join(diagramsRoot, sourceFile.replace('.excalidraw', '.png'));
    if (!existsSync(srcPng)) {
      console.error(`[sync-diagrams][error] missing source: ${srcPng}`);
      process.exitCode = 1;
      continue;
    }
    const m = meta.overview[sourceFile];
    const dst = join(publicDiagrams, 'overview', `${m.id}.png`);
    (await copyIfDifferent(srcPng, dst)) ? copied++ : kept++;
    manifest.overview.push({
      id: m.id, title: m.title, caption: m.caption,
      src: `/diagrams/overview/${m.id}.png`, sourceFile,
    });
  }

  // OPENERS
  for (const sourceFile of Object.keys(meta.openers)) {
    const srcPng = join(diagramsRoot, sourceFile.replace('.excalidraw', '.png'));
    if (!existsSync(srcPng)) {
      console.error(`[sync-diagrams][error] missing source: ${srcPng}`);
      process.exitCode = 1;
      continue;
    }
    const m = meta.openers[sourceFile];
    const dst = join(publicDiagrams, 'openers', `ch${m.chapter}.png`);
    (await copyIfDifferent(srcPng, dst)) ? copied++ : kept++;
    manifest.openers.push({
      chapter: m.chapter, title: m.title,
      src: `/diagrams/openers/ch${m.chapter}.png`, sourceFile,
    });
  }

  // CONCEPTS
  const conceptPngs = await listPngs(join(diagramsRoot, 'concepts'));
  for (const png of conceptPngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.concepts[sourceFile];
    if (!m) {
      warn(`no meta entry for concept ${sourceFile} - humanizing title`);
    }
    const id = m?.id ?? png.replace(/^\d+-/, '').replace('.png', '');
    const dst = join(publicDiagrams, 'concepts', `${id}.png`);
    (await copyIfDifferent(join(diagramsRoot, 'concepts', png), dst)) ? copied++ : kept++;
    manifest.concepts.push({
      id,
      title: m?.title ?? humanize(png),
      chapter: m?.chapter ?? null,
      summary: m?.summary ?? '',
      src: `/diagrams/concepts/${id}.png`,
      sourceFile,
    });
  }

  // INLINE
  const inlinePngs = await listPngs(join(diagramsRoot, 'inline'));
  for (const png of inlinePngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.inline[sourceFile];
    if (!m) {
      warn(`no meta entry for inline ${sourceFile} - humanizing title`);
    }
    // Parse "ch<NN>-fig<N>" properly rather than a fixed-length slice: a
    // fixed slice(0, 9) truncates any two-digit figure number (fig10+) down
    // to "fig1", which both mis-copies the PNG (fig10's content overwrites
    // fig1's destination) and mis-indexes the manifest entry. Filenames
    // without this exact prefix shape fall back to the meta entry or, if
    // that's also missing, the file's own two chapter-digit characters.
    const parsed = png.match(/^ch(\d{2})-fig(\d+)/);
    const shortId = parsed ? `ch${parsed[1]}-fig${parsed[2]}` : png.slice(0, 9);
    const chapter = m?.chapter ?? parsed?.[1] ?? shortId.slice(2, 4);
    const index = m?.index ?? (parsed ? Number(parsed[2]) : Number(shortId.slice(8, 9)));
    const dst = join(publicDiagrams, 'inline', `${shortId}.png`);
    (await copyIfDifferent(join(diagramsRoot, 'inline', png), dst)) ? copied++ : kept++;
    manifest.inline.push({
      chapter, index,
      title: m?.title ?? humanize(png),
      src: `/diagrams/inline/${shortId}.png`,
      sourceFile,
    });
  }

  // MAPS
  const mapsPngs = await listPngs(join(diagramsRoot, 'maps'));
  for (const png of mapsPngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.maps[sourceFile];
    if (!m) {
      warn(`no meta entry for map ${sourceFile} - humanizing title`);
    }
    const id = m?.id ?? png.replace(/^\d+-/, '').replace('.png', '');
    const dst = join(publicDiagrams, 'maps', `${id}.png`);
    (await copyIfDifferent(join(diagramsRoot, 'maps', png), dst)) ? copied++ : kept++;
    manifest.maps.push({
      id,
      title: m?.title ?? humanize(png),
      caption: m?.caption ?? '',
      src: `/diagrams/maps/${id}.png`,
      sourceFile,
    });
  }

  // DIVIDERS (act-divider visuals)
  const dividerPngs = await listPngs(join(diagramsRoot, 'dividers'));
  for (const png of dividerPngs) {
    const sourceFile = png.replace('.png', '.excalidraw');
    const m = meta.dividers?.[sourceFile];
    if (!m) {
      warn(`no meta entry for divider ${sourceFile} - skipping`);
      continue;
    }
    const dst = join(publicDiagrams, 'dividers', `${m.id}.png`);
    (await copyIfDifferent(join(diagramsRoot, 'dividers', png), dst)) ? copied++ : kept++;
    manifest.dividers.push({
      id: m.id, act: m.act, title: m.title, chapters: m.chapters, caption: m.caption,
      src: `/diagrams/dividers/${m.id}.png`, sourceFile,
    });
  }

  // Sort for deterministic manifest
  manifest.openers.sort((a, b) => a.chapter.localeCompare(b.chapter));
  manifest.dividers.sort((a, b) => a.id.localeCompare(b.id));
  manifest.concepts.sort((a, b) => a.id.localeCompare(b.id));
  manifest.inline.sort((a, b) => a.chapter.localeCompare(b.chapter) || a.index - b.index);
  manifest.maps.sort((a, b) => a.id.localeCompare(b.id));

  await ensureDir(publicDiagrams);
  const json = JSON.stringify(manifest, null, 2);
  await writeFile(join(publicDiagrams, 'manifest.json'), json);
  // Also write to src/data/ so TS code can import it as a module (Vite warns
  // against importing from public/). public/ copy stays for any runtime fetch.
  const srcManifestDir = join(websiteRoot, 'src', 'data');
  await ensureDir(srcManifestDir);
  await writeFile(join(srcManifestDir, 'diagram-manifest.json'), json);

  log(`done. copied=${copied} kept=${kept} manifest=public/diagrams/manifest.json + src/data/diagram-manifest.json`);
  log(`counts: overview=${manifest.overview.length} openers=${manifest.openers.length} concepts=${manifest.concepts.length} inline=${manifest.inline.length} maps=${manifest.maps.length} dividers=${manifest.dividers.length}`);
}

main().catch((err) => {
  console.error('[sync-diagrams][fatal]', err);
  process.exit(1);
});
