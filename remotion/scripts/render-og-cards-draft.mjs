#!/usr/bin/env node
// Renders one OgCard still per chapter of the draft books (2 and 3), straight
// into the website's public folder. The chapter number, title and promise are
// read from the website's own chapter data, so a retitle is a rerun.
// Run via `npm run render:og:draft`.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync, readFileSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const WEB = join(ROOT, '..', 'website');

const BOOKS = [
  { data: 'bookChaptersTwo.ts', titleConst: 'BOOK_TWO_TITLE', folder: 'second-book', accent: '#0F766E' },
  { data: 'bookChaptersThree.ts', titleConst: 'BOOK_THREE_TITLE', folder: 'third-book', accent: '#C2410C' },
];
const SITE = 'aiepress.com';

// A quoted TS string literal: '...', "..." or `...`, with backslash escapes.
const STR = String.raw`('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|` + '`(?:[^`\\\\]|\\\\.)*`)';
const unquote = (lit) => lit.slice(1, -1).replace(/\\(.)/g, '$1');

/** Number, title and promise of every chapter in one of the website's chapter-data files. */
export const readChapters = (source) => {
  const re = new RegExp(String.raw`number:\s*'(\d{2})'[\s\S]*?title:\s*` + STR + String.raw`[\s\S]*?promise:\s*` + STR, 'g');
  // A doc comment may show an example entry ("Chapter title"); the real entry
  // for that number comes later in the file, so the last match per number wins.
  const byNumber = new Map();
  for (const m of source.matchAll(re)) {
    byNumber.set(m[1], { chapterNumber: m[1], title: unquote(m[2]), promise: unquote(m[3]) });
  }
  return [...byNumber.values()];
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  let total = 0;
  for (const book of BOOKS) {
    const source = readFileSync(join(WEB, 'src', 'data', book.data), 'utf8');
    const bookTitle = unquote(source.match(new RegExp(`${book.titleConst}\\s*=\\s*${STR}`))[1]);
    const chapters = readChapters(source);
    if (chapters.length === 0) throw new Error(`No chapters read from ${book.data}`);
    const outDir = join(WEB, 'public', 'og', book.folder);
    mkdirSync(outDir, { recursive: true });
    for (const ch of chapters) {
      const props = JSON.stringify({ ...ch, bookTitle, site: SITE, accent: book.accent });
      const outPath = join(outDir, `chapter-${ch.chapterNumber}.png`);
      console.log(`Rendering ${book.folder} chapter ${ch.chapterNumber}...`);
      execFileSync('npx', ['remotion', 'still', 'OgCard', outPath, '--props', props], { cwd: ROOT, stdio: 'inherit' });
      total += 1;
    }
  }
  console.log(`\nDone. ${total} OG cards in website/public/og/{second-book,third-book}/`);
}
