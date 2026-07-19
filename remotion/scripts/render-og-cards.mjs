#!/usr/bin/env node
// Renders one OgCard still per chapter (og:image size, 1200x630) using the
// chapter data in src/ogcard/chapters.ts. Run via `npm run render:og`.
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const OUT_DIR = join(ROOT, 'out', 'og');

const CHAPTERS = [
  ['01', 'The Shift: From Assistant to Delegate', 'Why the important transition is not better chat UX, but reliable delegated work.'],
  ['02', 'Taste Still Matters When Code Gets Cheap', 'Why fundamentals, judgment, craft, and constraint become more valuable.'],
  ['03', 'Harnesses, Specs, and Codebases Agents Can Actually Use', 'How prepared environments make coding agents useful without accepting slop.'],
  ['04', 'Evals Are the Control System', 'Why production trust comes from measurement loops, not vibes.'],
  ['05', 'Context Is Infrastructure', 'Retrieval, memory, and knowledge layers as first-class system design.'],
  ['06', 'Runtimes, State, and the Human Control Plane', 'Durable agents, replay vs snapshot, and why autonomy needs architecture.'],
  ['07', 'Security, Identity, and High-Stakes Trust', 'Why delegated authority needs boundaries, audit trails, and real controls.'],
  ['08', 'Realtime, Voice, and the Cost of Being Interruptible', 'What voice, latency, and turn-taking reveal about production AI.'],
  ['09', 'The AI-Native Organization', 'How teams and incentives change when AI becomes part of the workforce.'],
  ['10', 'What Endures', 'The principles that survive tool churn: context, evals, control, and taste.'],
];

mkdirSync(OUT_DIR, { recursive: true });

for (const [chapterNumber, title, promise] of CHAPTERS) {
  const props = JSON.stringify({ chapterNumber, title, promise });
  const outPath = join(OUT_DIR, `chapter-${chapterNumber}.png`);
  console.log(`Rendering OG card for chapter ${chapterNumber}...`);
  execFileSync(
    'npx',
    ['remotion', 'still', 'OgCard', outPath, '--props', props],
    { cwd: ROOT, stdio: 'inherit' },
  );
}

console.log(`\nDone. ${CHAPTERS.length} OG cards in ${OUT_DIR}`);
