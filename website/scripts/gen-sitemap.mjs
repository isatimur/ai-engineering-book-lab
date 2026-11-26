// website/scripts/gen-sitemap.mjs
// Generates public/sitemap.xml from bookChapters + the diagram manifest, with
// <lastmod> taken from git history of the underlying source file. Mirrors the
// "never fail the build" contract of gen-data.mjs: any git/parse failure falls
// back to a build-time timestamp so the sitemap is always written.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
// One build, two sites (see middleware.ts). Book 1's pages go in sitemap.xml
// on its own domain; the press pages go in sitemap-press.xml, which
// aiepress.com serves as its /sitemap.xml. Keep in step with src/data/book.ts.
const BOOK_ORIGIN = 'https://fromcopilottocolleague.com';
const PRESS_ORIGIN = 'https://aiepress.com';
const PRESS_PATH_PREFIXES = ['/press', '/books', '/second-book', '/third-book'];
const isPressPath = (path) =>
  PRESS_PATH_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
const log = (...a) => console.log('[gen-sitemap]', ...a);

const fallbackDate = new Date().toISOString();

/** Last commit date (ISO) for a file, or a build-time fallback. */
const gitDate = (relPath) => {
  try {
    const r = spawnSync('git', ['log', '-1', '--format=%cI', '--', relPath], {
      cwd: websiteRoot,
      encoding: 'utf8',
    });
    const out = (r.stdout || '').trim();
    return out || fallbackDate;
  } catch {
    return fallbackDate;
  }
};

// Parse {number, slug} pairs from bookChapters.ts (frozen format).
const parseChapters = (file) => {
  const src = readFileSync(resolve(websiteRoot, file), 'utf8');
  return [...src.matchAll(/number: '(\d+)',\s*slug: '([^']+)'/g)].map((m) => ({
    number: m[1],
    slug: m[2],
  }));
};

const chapters = parseChapters('src/data/bookChapters.ts');

// Book 2 was built, routed and linked from /books, but never listed here, so
// every /second-book/* page was invisible to crawlers. Same parse, same
// frozen format — bookChaptersTwo.ts deliberately reuses book 1's shape.
const chaptersTwo = parseChapters('src/data/bookChaptersTwo.ts');

// Book 3: same helper, same frozen format. The track is empty today, so only
// /third-book itself is listed; each chapter joins the sitemap the moment it is
// registered in bookChaptersThree.ts. Do not skip this step: it is how book 2
// stayed invisible to crawlers.
const chaptersThree = parseChapters('src/data/bookChaptersThree.ts');

const manifest = JSON.parse(readFileSync(resolve(websiteRoot, 'src/data/diagram-manifest.json'), 'utf8'));

const repoDate = gitDate('.');

const urls = [];
const pressUrls = [];
const push = (path, lastmod, priority, changefreq) => {
  if (path === '/press') {
    pressUrls.push({ loc: `${PRESS_ORIGIN}/`, lastmod, priority, changefreq });
  } else if (isPressPath(path)) {
    pressUrls.push({ loc: `${PRESS_ORIGIN}${path}`, lastmod, priority, changefreq });
  } else {
    urls.push({ loc: `${BOOK_ORIGIN}${path}`, lastmod, priority, changefreq });
  }
};

push('/', repoDate, '1.0', 'weekly');
push('/press', repoDate, '1.0', 'weekly');
push('/books', repoDate, '0.9', 'weekly');
push('/enterprise', repoDate, '0.9', 'monthly');
push('/assess', repoDate, '0.9', 'monthly');
push('/workshop', repoDate, '0.8', 'monthly');
push('/visual-guide', repoDate, '0.8', 'weekly');
// /read is noindexed (duplicates the individually-indexed /read/NN-slug chapter
// pages almost word-for-word); omit it from the sitemap to avoid a
// submitted-but-noindexed warning in Search Console.
push('/read/graph', gitDate('src/evidence.json'), '0.7', 'weekly');
push('/evidence', gitDate('src/data/stats.json'), '0.8', 'weekly');
push('/whitepapers/ai-native-org', gitDate('public/whitepapers/ai-native-org.html'), '0.8', 'monthly');
const ledgerFiles = readdirSync(resolve(websiteRoot, 'src/data/ledgers')).filter((f) => f.endsWith('.json'));
const ledgerLastmod = ledgerFiles.length
  ? gitDate(`src/data/ledgers/${ledgerFiles.sort().at(-1)}`)
  : repoDate;
push('/ledgers', ledgerLastmod, '0.7', 'weekly');
for (const file of ledgerFiles) {
  const slug = file.replace(/\.json$/, '');
  push(`/ledgers/${slug}`, gitDate(`src/data/ledgers/${file}`), '0.7', 'weekly');
}
for (const c of chapters) {
  push(`/read/${c.number}-${c.slug}`, gitDate(`src/content/chapter-${c.number}.md`), '0.9', 'weekly');
}
// Russian edition: a chapter is listed once its translation exists.
push('/ru/read', repoDate, '0.7', 'weekly');
for (const c of chapters) {
  const ru = `src/content/ru/chapter-${c.number}.md`;
  if (existsSync(resolve(websiteRoot, ru))) push(`/ru/read/${c.number}-${c.slug}`, gitDate(ru), '0.8', 'weekly');
}
// One excerpt page per book (src/data/bookExcerpts.ts), dated by the file
// that picks its passages.
const excerptDate = gitDate('src/data/bookExcerpts.ts');
push('/excerpt', excerptDate, '0.8', 'weekly');
push('/second-book', repoDate, '0.9', 'weekly');
push('/second-book/excerpt', excerptDate, '0.8', 'weekly');
for (const c of chaptersTwo) {
  push(`/second-book/${c.slug}`, gitDate(`src/content-2/chapter-${c.number}.md`), '0.8', 'weekly');
}
push('/third-book', repoDate, '0.9', 'weekly');
push('/third-book/excerpt', excerptDate, '0.8', 'weekly');
for (const c of chaptersThree) {
  push(`/third-book/${c.slug}`, gitDate(`src/content-3/chapter-${c.number}.md`), '0.8', 'weekly');
}
for (const c of manifest.concepts) {
  push(`/visual-guide/concepts/${c.id}`, gitDate(c.sourceFile ?? '.'), '0.6', 'monthly');
}
for (const m of manifest.maps) {
  push(`/visual-guide/maps/${m.id}`, gitDate(m.sourceFile ?? '.'), '0.6', 'monthly');
}

const toXml = (list) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${list
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(websiteRoot, 'public/sitemap.xml'), toXml(urls));
writeFileSync(resolve(websiteRoot, 'public/sitemap-press.xml'), toXml(pressUrls));
log(`wrote public/sitemap.xml with ${urls.length} book-1 URLs (${chapters.length} chapters, ${manifest.concepts.length} concepts, ${manifest.maps.length} maps)`);
log(`wrote public/sitemap-press.xml with ${pressUrls.length} press URLs (${chaptersTwo.length} book-2 chapters, ${chaptersThree.length} book-3 chapters)`);
