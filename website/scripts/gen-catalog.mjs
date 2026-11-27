// website/scripts/gen-catalog.mjs
// Writes public/catalog.json: every book in LIBRARY with its chapters, their
// URLs and status, and the explainer video for each chapter that has one.
// Served on both domains (static files pass the middleware), linked from
// llms.txt, and canonical at https://aiepress.com/catalog.json.
//
// gen-llms parses book 1's chapter file with regexes. This catalogue spans
// three books and derived fields (status, measure), so it does not re-parse
// TypeScript: it bundles src/lib/catalog.ts with esbuild and calls
// buildCatalog(), the same function the press homepage uses. `?raw` markdown
// imports load as text, as Vite would load them.
//
// Unlike gen-sitemap, this step fails the build on error: a catalogue that
// silently drops a book is worse than none.

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const log = (...a) => console.log('[gen-catalog]', ...a);

const rawText = {
  name: 'raw-text',
  setup(b) {
    b.onResolve({ filter: /\?raw$/ }, (args) => ({
      path: resolve(args.resolveDir, args.path.replace(/\?raw$/, '')),
      namespace: 'raw-text',
    }));
    b.onLoad({ filter: /.*/, namespace: 'raw-text' }, (args) => ({
      contents: readFileSync(args.path, 'utf8'),
      loader: 'text',
    }));
  },
};

const outDir = mkdtempSync(join(tmpdir(), 'gen-catalog-'));
const outFile = join(outDir, 'catalog.mjs');
let catalog;
let pressLlms;
try {
  await build({
    entryPoints: [resolve(websiteRoot, 'src/lib/catalog.ts')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: outFile,
    plugins: [rawText],
    logLevel: 'warning',
  });
  const mod = await import(pathToFileURL(outFile).href);
  catalog = mod.buildCatalog();
  pressLlms = mod.pressLlmsTxt(catalog);
} finally {
  rmSync(outDir, { recursive: true, force: true });
}

if (!catalog?.books?.length) throw new Error('gen-catalog: buildCatalog() returned no books');
for (const book of catalog.books) {
  if (book.chapters.length === 0 && book.maturity !== 'early') {
    throw new Error(`gen-catalog: ${book.id} has no chapters — is it missing from BOOK_SOURCES?`);
  }
}

writeFileSync(resolve(websiteRoot, 'public/catalog.json'), `${JSON.stringify(catalog, null, 2)}\n`);
// aiepress.com serves this as /llms.txt (see middleware.ts).
writeFileSync(resolve(websiteRoot, 'public/llms-press.txt'), pressLlms);

const chapterCount = catalog.books.reduce((n, b) => n + b.chapters.length, 0);
const videoCount = catalog.books.reduce((n, b) => n + b.chapters.filter((c) => c.video).length, 0);
log(`wrote public/catalog.json: ${catalog.books.length} books, ${chapterCount} chapters, ${videoCount} videos`);
log('wrote public/llms-press.txt');
