// website/scripts/gen-sitemap.mjs
// Generates public/sitemap.xml from bookChapters + the diagram manifest, with
// <lastmod> taken from git history of the underlying source file. Mirrors the
// "never fail the build" contract of gen-data.mjs: any git/parse failure falls
// back to a build-time timestamp so the sitemap is always written.

import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const websiteRoot = resolve(__dirname, '..');
const ORIGIN = 'https://fromcopilottocolleague.com';
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
const chaptersSrc = readFileSync(resolve(websiteRoot, 'src/data/bookChapters.ts'), 'utf8');
const chapters = [...chaptersSrc.matchAll(/number: '(\d+)',\s*slug: '([^']+)'/g)].map((m) => ({
  number: m[1],
  slug: m[2],
}));

const manifest = JSON.parse(readFileSync(resolve(websiteRoot, 'src/data/diagram-manifest.json'), 'utf8'));

const repoDate = gitDate('.');

const urls = [];
const push = (path, lastmod, priority, changefreq) =>
  urls.push({ loc: `${ORIGIN}${path}`, lastmod, priority, changefreq });

push('/', repoDate, '1.0', 'weekly');
push('/enterprise', repoDate, '0.9', 'monthly');
push('/assess', repoDate, '0.9', 'monthly');
push('/workshop', repoDate, '0.8', 'monthly');
push('/visual-guide', repoDate, '0.8', 'weekly');
push('/read', repoDate, '0.8', 'weekly');
push('/read/graph', gitDate('src/evidence.json'), '0.7', 'weekly');
push('/evidence', gitDate('src/data/stats.json'), '0.8', 'weekly');
push('/ledgers', gitDate('src/data/ledgers/openai-harness-engineering-2025.json'), '0.7', 'weekly');
push(
  '/ledgers/openai-harness-engineering-2025',
  gitDate('src/data/ledgers/openai-harness-engineering-2025.json'),
  '0.7',
  'weekly',
);
for (const c of chapters) {
  push(`/read/${c.number}-${c.slug}`, gitDate(`src/content/chapter-${c.number}.md`), '0.9', 'weekly');
}
for (const c of manifest.concepts) {
  push(`/visual-guide/concepts/${c.id}`, gitDate(c.sourceFile ?? '.'), '0.6', 'monthly');
}
for (const m of manifest.maps) {
  push(`/visual-guide/maps/${m.id}`, gitDate(m.sourceFile ?? '.'), '0.6', 'monthly');
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`;

writeFileSync(resolve(websiteRoot, 'public/sitemap.xml'), xml);
log(`wrote public/sitemap.xml with ${urls.length} URLs (${chapters.length} chapters, ${manifest.concepts.length} concepts, ${manifest.maps.length} maps)`);
