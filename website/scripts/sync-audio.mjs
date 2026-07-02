// website/scripts/sync-audio.mjs
// Copies rendered audiobook MP3s from ../../dist/audiobook/marketplace/ into
// ./public/audio/ and emits a manifest consumed by the reader player.
// Idempotent: copies only when source is newer than destination.
//
// If no rendered audio exists yet, writes an empty manifest so the site builds
// cleanly and the player stays disabled until a render is synced.

import { copyFile, mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
const repoRoot = resolve(websiteRoot, '..');
const sourceDir = join(repoRoot, 'dist/audiobook/marketplace');
const publicAudio = join(websiteRoot, 'public', 'audio');
const srcDataDir = join(websiteRoot, 'src', 'data');

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
    [
      '-v', 'error',
      '-show_entries', 'format=duration',
      '-of', 'default=noprint_wrappers=1:nokey=1',
      file,
    ],
    { encoding: 'utf8' },
  );
  if (r.status !== 0) {
    warn(`ffprobe failed for ${file}`);
    return 0;
  }
  const n = parseFloat(String(r.stdout).trim());
  return Number.isFinite(n) ? n : 0;
}

function humanTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

function parseSegment(filename) {
  const m = filename.match(/^(\d{2})-(.+)\.mp3$/i);
  if (!m) return null;
  const index = parseInt(m[1], 10);
  const slug = m[2].toLowerCase();
  const chapterNumber = index >= 1 && index <= 10 ? String(index).padStart(2, '0') : null;
  let kind = 'chapter';
  if (index === 0) kind = 'opening';
  if (index >= 11) kind = 'closing';
  return { index, slug, chapterNumber, kind };
}

async function writeManifest(segments, destPaths) {
  const totalDurationSeconds = segments.reduce((sum, s) => sum + s.durationSeconds, 0);
  const manifest = {
    generatedAt: new Date().toISOString(),
    available: segments.length > 0,
    totalDurationSeconds,
    segments,
  };
  const json = JSON.stringify(manifest, null, 2) + '\n';
  await ensureDir(dirname(destPaths.public));
  await ensureDir(dirname(destPaths.src));
  await writeFile(destPaths.public, json);
  await writeFile(destPaths.src, json);
}

async function main() {
  await ensureDir(publicAudio);

  if (!existsSync(sourceDir)) {
    log(`source not found (${sourceDir}) — writing empty manifest`);
    await writeManifest([], {
      public: join(publicAudio, 'manifest.json'),
      src: join(srcDataDir, 'audio-manifest.json'),
    });
    return;
  }

  const files = (await readdir(sourceDir))
    .filter((f) => f.toLowerCase().endsWith('.mp3'))
    .sort();

  if (files.length === 0) {
    log('no mp3 files in marketplace dir — writing empty manifest');
    await writeManifest([], {
      public: join(publicAudio, 'manifest.json'),
      src: join(srcDataDir, 'audio-manifest.json'),
    });
    return;
  }

  let copied = 0;
  let kept = 0;
  const segments = [];

  for (const file of files) {
    const parsed = parseSegment(file);
    if (!parsed) {
      warn(`skip unrecognized filename: ${file}`);
      continue;
    }

    const src = join(sourceDir, file);
    const dst = join(publicAudio, file);
    if (await newer(src, dst)) {
      await copyFile(src, dst);
      copied++;
    } else {
      kept++;
    }

    const durationSeconds = probeDuration(existsSync(dst) ? dst : src);
    segments.push({
      index: parsed.index,
      kind: parsed.kind,
      slug: parsed.slug,
      chapterNumber: parsed.chapterNumber,
      title: humanTitle(parsed.slug),
      src: `/audio/${file}`,
      durationSeconds: Math.round(durationSeconds * 10) / 10,
    });
  }

  segments.sort((a, b) => a.index - b.index);

  await writeManifest(segments, {
    public: join(publicAudio, 'manifest.json'),
    src: join(srcDataDir, 'audio-manifest.json'),
  });

  const totalMin = Math.round(segments.reduce((s, x) => s + x.durationSeconds, 0) / 60);
  log(`done. copied=${copied} kept=${kept} segments=${segments.length} (~${totalMin} min)`);
}

main().catch((err) => {
  console.error('[sync-audio] fatal:', err);
  process.exit(1);
});
