// Checks every book 2/3 explainer spec against its sources, before a render:
// - the quote's claim sits in that chapter's evidence, and one of its anchors
//   starts at `at` and contains the quote's words in order (fillers may drop);
// - every other line is listed with whether it appears verbatim in the
//   chapter text, so a reviewer sees which lines were trimmed.
// Fails (exit 1) only on quote problems.
//
//   node scripts/check-explainer-specs.mjs [spec files...]
import { readFileSync, readdirSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = resolve(import.meta.dirname, '..');
const website = resolve(root, '../website/src');
const specDir = resolve(root, 'src/draft/specs');

const words = (s) =>
  s
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9%$.]+/g, ' ')
    .replace(/\.(?=\s|$)/g, '')
    .split(' ')
    .filter(Boolean);

/** True when `needle`'s words appear in `hay` in order, gaps allowed (removed fillers). */
const inOrder = (needle, hay) => {
  const h = words(hay);
  let i = 0;
  for (const w of words(needle)) {
    while (i < h.length && h[i] !== w) i++;
    if (i === h.length) return false;
    i++;
  }
  return true;
};

const norm = (s) => words(s).join(' ');

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((f) => resolve(f))
  : readdirSync(specDir)
      .filter((f) => /^book[23]-\d\d\.ts$/.test(f))
      .map((f) => resolve(specDir, f));

let failed = 0;
for (const file of files) {
  const [, book, ch] = basename(file).match(/^book(\d)-(\d\d)\.ts$/);
  const { spec } = await import(pathToFileURL(file).href);
  const evidence = JSON.parse(readFileSync(resolve(website, `evidence-${book}.json`), 'utf8'));
  const text = readFileSync(resolve(website, `content-${book}/chapter-${ch}.md`), 'utf8');
  const problems = [];

  if (spec.chapter !== parseInt(ch, 10)) problems.push(`chapter ${spec.chapter} but file is ${ch}`);
  const claim = (evidence[String(parseInt(ch, 10))] ?? []).find((c) => c.claim_id === spec.quote.claimId);
  if (!claim) problems.push(`${spec.quote.claimId} is not in chapter ${ch}'s evidence`);
  else {
    const anchor = claim.anchors.find((a) => a.start === spec.quote.at);
    if (!anchor) problems.push(`no anchor of ${spec.quote.claimId} starts at ${spec.quote.at}`);
    else if (!inOrder(spec.quote.text, anchor.quote ?? '')) problems.push(`quote words not found in order in the anchor: "${anchor.quote}"`);
  }

  const lines = [
    spec.hook,
    `${spec.title.lead} ${spec.title.accent}`,
    spec.intro.kicker,
    spec.intro.line,
    ...spec.terms.flatMap((t) => [t.term, t.definition]),
    `${spec.punch.lead} ${spec.punch.accent}`,
    spec.punch.line,
    spec.stats.kicker,
    ...spec.stats.items.map(([n, l]) => `${n} ${l}`),
    spec.stats.line,
  ];
  const body = norm(text);
  const trimmed = lines.filter((l) => !body.includes(norm(l)));

  const status = problems.length ? 'FAIL' : 'ok  ';
  console.log(`${status} ${basename(file)}  verbatim ${lines.length - trimmed.length}/${lines.length}`);
  for (const p of problems) console.log(`     ✗ ${p}`);
  for (const l of trimmed) console.log(`     ~ ${l}`);
  if (problems.length) failed++;
}
process.exit(failed ? 1 : 0);
