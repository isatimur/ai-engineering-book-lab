// website/scripts/gen-press-explainer.mjs
// Writes src/data/press-explainer.json from the evidence files. See
// press-explainer-lib.mjs for what it holds and why it exists.
//
// Unlike gen-sitemap, this step fails the build when the sample claim
// disappears: a press page that explains the method with a missing example
// should not ship quietly.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildExplainer } from './press-explainer-lib.mjs';

const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) => JSON.parse(readFileSync(resolve(websiteRoot, p), 'utf8'));

const data = buildExplainer({
  book1: read('src/evidence.json'),
  book2: read('src/evidence-2.json'),
  scores: read('src/data/judge-scores.json'),
});
writeFileSync(resolve(websiteRoot, 'src/data/press-explainer.json'), `${JSON.stringify(data, null, 2)}\n`);
console.log(
  '[gen-press-explainer]',
  `sample ${data.sample.claimId} in chapters ${data.sample.chapters.join(',')};`,
  data.webs.map((w) => `book ${w.book}: ${w.shared}/${w.claims} claims shared`).join('; '),
);
