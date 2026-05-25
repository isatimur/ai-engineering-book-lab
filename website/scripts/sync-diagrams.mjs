// website/scripts/sync-diagrams.mjs
// Copies diagrams from ../../diagrams/ into ./public/diagrams/ under an
// organized layout. Emits public/diagrams/manifest.json from diagram-meta.json.
// Idempotent: copies only when source is newer than destination.

import { readFile, writeFile, mkdir, stat, copyFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
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

async function newer(src, dst) {
  if (!existsSync(dst)) return true;
  const [a, b] = await Promise.all([stat(src), stat(dst)]);
  return a.mtimeMs > b.mtimeMs;
}

async function copyIfNewer(src, dst) {
  if (await newer(src, dst)) {
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
  const metaRaw = await readFile(metaPath, 'utf8');
  const meta = JSON.parse(metaRaw);

  let copied = 0;
  let kept = 0;
  const manifest = { overview: [], openers: [], concepts: [], inline: [], maps: [] };

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
    (await copyIfNewer(srcPng, dst)) ? copied++ : kept++;
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
    (await copyIfNewer(srcPng, dst)) ? copied++ : kept++;
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
    (await copyIfNewer(join(diagramsRoot, 'concepts', png), dst)) ? copied++ : kept++;
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
    const shortId = png.slice(0, 9);
    const chapter = m?.chapter ?? shortId.slice(2, 4);
    const index = m?.index ?? Number(shortId.slice(8, 9));
    const dst = join(publicDiagrams, 'inline', `${shortId}.png`);
    (await copyIfNewer(join(diagramsRoot, 'inline', png), dst)) ? copied++ : kept++;
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
    (await copyIfNewer(join(diagramsRoot, 'maps', png), dst)) ? copied++ : kept++;
    manifest.maps.push({
      id,
      title: m?.title ?? humanize(png),
      caption: m?.caption ?? '',
      src: `/diagrams/maps/${id}.png`,
      sourceFile,
    });
  }

  // Sort for deterministic manifest
  manifest.openers.sort((a, b) => a.chapter.localeCompare(b.chapter));
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
  log(`counts: overview=${manifest.overview.length} openers=${manifest.openers.length} concepts=${manifest.concepts.length} inline=${manifest.inline.length} maps=${manifest.maps.length}`);
}

main().catch((err) => {
  console.error('[sync-diagrams][fatal]', err);
  process.exit(1);
});
