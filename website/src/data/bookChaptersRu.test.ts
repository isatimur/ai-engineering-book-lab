import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { chapters } from './bookChapters';
import { ruChapters, ruInlineFigs, ruOverview } from './bookChaptersRu';

const count = (md: string, re: RegExp) => md.split('\n').filter((l) => re.test(l)).length;
const publicFile = (src: string) => join(__dirname, '../../public', src);

describe('Russian edition of Book 1', () => {
  it.each(ruChapters.map((c) => [c.number, c] as const))('chapter %s keeps the English structure', (n, ru) => {
    const en = chapters.find((c) => c.number === n)!;
    // Figures attach to ## sections by position, so the count must match.
    expect(count(ru.content, /^## /)).toBe(count(en.content, /^## /));
    expect(count(ru.content, /^- /)).toBe(count(en.content, /^- /));
    expect(ru.title).not.toBe(en.title);
    expect(ru.content).not.toMatch(/^## Practical checklist/m);
  });

  it.each(ruChapters.map((c) => [c.number] as const))('chapter %s figures exist in Russian', (n) => {
    const figs = ruInlineFigs(n);
    for (const f of figs) {
      expect(f.src).toMatch(/^\/diagrams\/ru\/.+\.ru\.png$/);
      expect(existsSync(publicFile(f.src)), f.src).toBe(true);
      expect(f.title).toMatch(/[а-яё]/i);
    }
    const ov = ruOverview(n);
    expect(ov && existsSync(publicFile(ov.src))).toBe(true);
  });
});
