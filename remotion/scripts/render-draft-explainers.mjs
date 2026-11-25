#!/usr/bin/env node
// Renders the book 2/3 chapter explainers (src/draft/specs/*.ts) into the
// website, then writes website/src/data/draftVideos.json, which the site reads
// to show each video on its chapter page. Only chapters with a rendered mp4 get
// an entry. Existing mp4s are kept unless --force; pass ids to render a subset.
// Run via `npm run render:explainers:draft [-- Book3Chapter04 ...] [--force]`.
//
// On a Mac, set REMOTION_BROWSER_EXECUTABLE to Chrome and expect about 6
// minutes per video: Remotion's defaults (swangle, concurrency > 1) fail here.
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { addMusic } from './add-music.mjs';

const ROOT = join(import.meta.dirname, '..');
const WEB = join(ROOT, '..', 'website');
const SPECS = join(ROOT, 'src', 'draft', 'specs');
const BOOKS = { 2: 'bookChaptersTwo.ts', 3: 'bookChaptersThree.ts' };
const UPLOAD_DATE = process.env.UPLOAD_DATE ?? new Date().toISOString().slice(0, 10);

const args = process.argv.slice(2);
const force = args.includes('--force');
const only = args.filter((a) => !a.startsWith('--'));

/** chapter number -> slug, from the website's chapter data (last match wins over doc-comment examples). */
const slugs = (book) => {
  const src = readFileSync(join(WEB, 'src', 'data', BOOKS[book]), 'utf8');
  return new Map([...src.matchAll(/number:\s*'(\d{2})',\s*slug:\s*'([^']+)'/g)].map((m) => [m[1], m[2]]));
};

const ffprobeSeconds = (file) =>
  Math.round(
    parseFloat(
      execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file], {
        encoding: 'utf8',
      }),
    ),
  );

const videos = { book2: [], book3: [] };
const previous = existsSync(join(WEB, 'src', 'data', 'draftVideos.json'))
  ? JSON.parse(readFileSync(join(WEB, 'src', 'data', 'draftVideos.json'), 'utf8'))
  : { book2: [], book3: [] };

for (const file of readdirSync(SPECS).filter((f) => /^book[23]-\d\d\.ts$/.test(f)).sort()) {
  const [, book, n] = file.match(/^book(\d)-(\d\d)\.ts$/);
  const { spec } = await import(pathToFileURL(join(SPECS, file)).href);
  const slug = slugs(book).get(n);
  if (!slug) throw new Error(`${file}: no chapter ${n} in ${BOOKS[book]}`);

  const key = `book${book}`;
  const dir = join(WEB, 'public', 'video', key);
  const mp4 = join(dir, `chapter-${n}-${slug}.mp4`);
  const poster = join(dir, `chapter-${n}-poster.jpg`);

  if ((force || !existsSync(mp4)) && (only.length === 0 || only.includes(spec.id))) {
    mkdirSync(dir, { recursive: true });
    console.log(`Rendering ${spec.id}...`);
    execFileSync('npx', ['remotion', 'render', spec.id, mp4, '--gl=angle', '--concurrency=1'], { cwd: ROOT, stdio: 'inherit' });
    addMusic(book, mp4);
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', '4', '-i', mp4, '-frames:v', '1', '-q:v', '3', poster]);
  }
  if (!existsSync(mp4)) continue;

  const who = spec.quote.speaker.replace(/^(.*?), (.*)$/, '$1 ($2)');
  const thesis = `${spec.title.lead} ${spec.title.accent}`.replace(/"/g, '');
  const site = `/video/${key}/chapter-${n}-${slug}`;
  const kept = previous[key]?.find((v) => v.chapterSlug === slug);
  videos[key].push({
    chapterSlug: slug,
    src: `${site}.mp4`,
    poster: `/video/${key}/chapter-${n}-poster.jpg`,
    durationSeconds: ffprobeSeconds(mp4),
    width: 1920,
    height: 1080,
    // Keep the first publish date of an unchanged cut.
    uploadDate: kept && !force ? kept.uploadDate : UPLOAD_DATE,
    description: `A ${ffprobeSeconds(mp4)}-second explainer of "${spec.chapterTitle}": ${thesis} Includes ${who}'s quote, source-anchored to the claims ledger.`,
  });
}

writeFileSync(join(WEB, 'src', 'data', 'draftVideos.json'), JSON.stringify(videos, null, 2) + '\n');
console.log(`\nwebsite/src/data/draftVideos.json: ${videos.book2.length} book 2, ${videos.book3.length} book 3 videos.`);
