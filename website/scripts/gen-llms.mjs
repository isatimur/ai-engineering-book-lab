// website/scripts/gen-llms.mjs
// Generates machine-readable views of the book for LLMs and agents:
//   public/llms.txt        — the llmstxt.org map (overview + curated links)
//   public/llms-full.txt   — the entire book concatenated as clean markdown
//   public/read/<n>-<slug>.md — each chapter as standalone markdown
// Mirrors the "never fail the build" contract of gen-sitemap.mjs: any parse
// failure falls back to a sensible default so the files are always written.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
const ORIGIN = 'https://fromcopilottocolleague.com';
const REPO = 'https://github.com/isatimur/ai-engineering-book-lab';
const AUTHOR = 'Timur Isachenko & Daniel Mohanrao';
const TITLE = 'From Copilot to Colleague';
const SUBTITLE = 'How AI Engineering Turns Models into Dependable Systems';
const log = (...a) => console.log('[gen-llms]', ...a);

// Parse {number, slug, title, promise} from bookChapters.ts (frozen format;
// single-quoted, no escaped apostrophes — verified against the source).
const chaptersSrc = readFileSync(resolve(websiteRoot, 'src/data/bookChapters.ts'), 'utf8');
const chapters = [
  ...chaptersSrc.matchAll(
    /number: '(\d+)',\s*slug: '([^']+)',\s*title: '([^']+)',\s*promise: '([^']+)'/g,
  ),
].map((m) => ({ number: m[1], slug: m[2], title: m[3], promise: m[4] }));

if (chapters.length === 0) throw new Error('gen-llms: parsed 0 chapters from bookChapters.ts');

// Live corpus counts for the summary (fall back to omitting if unavailable).
let counts = '';
try {
  const s = JSON.parse(readFileSync(resolve(websiteRoot, 'src/data/stats.json'), 'utf8'));
  counts = `Built from ${s.corpus.videos} AI Engineer talks · ${s.claims.total} claims · ${s.anchors.total} source anchors.`;
} catch {
  counts = '';
}

const chapterUrl = (c) => `${ORIGIN}/read/${c.number}-${c.slug}`;
const chapterMdUrl = (c) => `${ORIGIN}/read/${c.number}-${c.slug}.md`;
const body = (c) => readFileSync(resolve(websiteRoot, `src/content/chapter-${c.number}.md`), 'utf8').trim();

// --- llms.txt : the curated map -------------------------------------------
const llms = `# ${TITLE}

> ${SUBTITLE}. An online book synthesized from a corpus of AI Engineer conference talks, where no claim ships without a source anchor — a precise pointer to the moment in a video where it came from.

By ${AUTHOR}. Built in public, open source: ${REPO}
${counts ? `\n${counts}\n` : ''}
## Chapters

${chapters
  .map((c) => `- [Chapter ${Number(c.number)} — ${c.title}](${chapterMdUrl(c)}): ${c.promise}`)
  .join('\n')}

## Full text

- [Complete book as markdown](${ORIGIN}/llms-full.txt): all ${chapters.length} chapters in one file.

## Reference

- [Source repository](${REPO}): the corpus, claims ledger, and method.
- [Sitemap](${ORIGIN}/sitemap.xml): every indexable page.
`;
writeFileSync(resolve(websiteRoot, 'public/llms.txt'), llms);

// --- per-chapter markdown --------------------------------------------------
mkdirSync(resolve(websiteRoot, 'public/read'), { recursive: true });
for (const c of chapters) {
  const md = `${body(c)}\n\n---\n\n_From "${TITLE}: ${SUBTITLE}" by ${AUTHOR} · ${chapterUrl(c)}_\n`;
  writeFileSync(resolve(websiteRoot, `public/read/${c.number}-${c.slug}.md`), md);
}

// --- llms-full.txt : the whole book ---------------------------------------
const full = `# ${TITLE}
> ${SUBTITLE}

By ${AUTHOR}. ${counts}
The complete book as markdown. Source: ${ORIGIN} · ${REPO}

${chapters.map((c) => body(c)).join('\n\n---\n\n')}
`;
writeFileSync(resolve(websiteRoot, 'public/llms-full.txt'), full);

log(
  `wrote public/llms.txt, public/llms-full.txt (${full.length} chars), and ${chapters.length} per-chapter .md files`,
);
