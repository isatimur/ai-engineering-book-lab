// website/scripts/sync-audio.mjs
// Copies rendered chapter MP3s from ../../dist/audiobook/marketplace/ into
// ./public/audiobook/ch-NN.mp3 and refreshes approxSeconds in src/data/audiobook.ts.
//
// Marketplace naming from audiobook_gen: 01-<slug>.mp3 … 10-<slug>.mp3
// (opening/closing credits at 00-* and 11-* are skipped for the web player).
//
// If no render exists, exits cleanly — the committed MP3s + audiobook.ts stay as-is.

import { copyFile, mkdir, readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
const repoRoot = resolve(websiteRoot, '..');
const sourceDir = join(repoRoot, 'dist/audiobook/marketplace');
const destDir = join(websiteRoot, 'public', 'audiobook');
const audiobookTs = join(websiteRoot, 'src', 'data', 'audiobook.ts');

const log = (...args) => console.log('[sync-audio]', ...args);
const warn = (...args) => console.warn('[sync-audio][warn]', ...args);

async function ensureDir(p) {
  await mkdir(p, { recursive: true });
}

async function newer(src, dst) {
  if (!existsSync(dst)) return true;
  const [a, b] = await Promise.all([stat(src), stat(dst)]);
  return a.mtimeMs > b.mtimeMs;
}

function probeDuration(file) {
  const r = spawnSync(
    'ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file],
    { encoding: 'utf8' },
  );
  if (r.status !== 0) return null;
  const n = parseFloat(String(r.stdout).trim());
  return Number.isFinite(n) ? Math.round(n) : null;
}

function parseChapterFile(filename) {
  const m = filename.match(/^(\d{2})-.+\.mp3$/i);
  if (!m) return null;
  const num = parseInt(m[1], 10);
  if (num < 1 || num > 10) return null;
  return String(num).padStart(2, '0');
}

async function patchAudiobookTs(tracks) {
  if (!existsSync(audiobookTs)) {
    warn('audiobook.ts not found — skip metadata patch');
    return;
  }
  let text = await readFile(audiobookTs, 'utf8');
  for (const { number, approxSeconds } of tracks) {
    const re = new RegExp(
      `(\\{\\s*number:\\s*'${number}',\\s*src:\\s*'/audiobook/ch-${number}\\.mp3',\\s*approxSeconds:\\s*)\\d+`,
    );
    if (!re.test(text)) {
      warn(`no audiobook.ts entry for chapter ${number}`);
      continue;
    }
    text = text.replace(re, `$1${approxSeconds}`);
  }
  await writeFile(audiobookTs, text);
}

async function main() {
  if (!existsSync(sourceDir)) {
    log(`source not found (${sourceDir}) — keeping committed audiobook assets`);
    return;
  }

  const files = (await readdir(sourceDir)).filter((f) => f.toLowerCase().endsWith('.mp3')).sort();
  const chapterFiles = files
    .map((f) => ({ file: f, number: parseChapterFile(f) }))
    .filter((x) => x.number);

  if (chapterFiles.length === 0) {
    log('no chapter mp3s (01–10) in marketplace dir — keeping committed assets');
    return;
  }

  await ensureDir(destDir);
  let copied = 0;
  let kept = 0;
  const tracks = [];

  for (const { file, number } of chapterFiles) {
    const src = join(sourceDir, file);
    const dstName = `ch-${number}.mp3`;
    const dst = join(destDir, dstName);
    if (await newer(src, dst)) {
      await copyFile(src, dst);
      copied++;
    } else {
      kept++;
    }
    const duration = probeDuration(existsSync(dst) ? dst : src);
    tracks.push({
      number,
      src: `/audiobook/${dstName}`,
      approxSeconds: duration ?? 0,
    });
  }

  tracks.sort((a, b) => a.number.localeCompare(b.number));
  await patchAudiobookTs(tracks);

  log(`done. copied=${copied} kept=${kept} chapters=${tracks.length}`);
}

main().catch((err) => {
  console.error('[sync-audio] fatal:', err);
  process.exit(1);
});
