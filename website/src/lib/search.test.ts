import { describe, it, expect } from 'vitest';
import { markdownToText, buildSearchIndex, search } from './search';
import type { BookChapter } from '../data/bookChapters';
import type { GlossaryTerm } from '../data/glossary';

const chapters: BookChapter[] = [
  {
    number: '01',
    slug: 'the-shift',
    title: 'The Shift: From Assistant to Delegate',
    promise: 'Why the important transition is reliable delegated work.',
    status: 'Drafting',
    wordCount: 0,
    content: [
      '# Chapter 1 — The Shift',
      '',
      'A copilot suggests. A **colleague** is handed a task and owns the outcome.',
      '',
      '## Delegation changes the failure surface',
      '',
      'When you delegate work to an agent, the blast radius of a mistake grows.',
    ].join('\n'),
  },
  {
    number: '04',
    slug: 'evals',
    title: 'Evals Are the Control System',
    promise: 'Why production trust comes from measurement loops, not vibes.',
    status: 'Drafting',
    wordCount: 0,
    content: [
      '# Chapter 4 — Evals',
      '',
      'An eval is a repeatable measurement of whether the system did its job.',
      '',
      'Without evals you are flying on vibes.',
    ].join('\n'),
  },
];

const glossary: GlossaryTerm[] = [
  {
    id: 'harness-engineering',
    display: ['Harness engineering', 'Harness'],
    definition: 'Shaping the environment around a model so delegated work succeeds.',
    chapterRef: '03',
  },
  {
    id: 'eval',
    display: ['Eval', 'Evals'],
    definition: 'A repeatable measurement of model or system output quality.',
  },
];

describe('markdownToText', () => {
  it('strips heading markers, emphasis, and collapses whitespace', () => {
    expect(markdownToText('# Title\n\nA **bold** and _italic_ line.')).toBe('Title A bold and italic line.');
  });
  it('drops link syntax but keeps the visible label', () => {
    expect(markdownToText('See [the docs](https://x.com) now.')).toBe('See the docs now.');
  });
  it('removes inline code backticks', () => {
    expect(markdownToText('Run `npm test` here.')).toBe('Run npm test here.');
  });
});

describe('buildSearchIndex', () => {
  const index = buildSearchIndex(chapters, glossary);
  it('produces both chapter passage records and glossary records', () => {
    const kinds = new Set(index.map((r) => r.kind));
    expect(kinds.has('chapter')).toBe(true);
    expect(kinds.has('glossary')).toBe(true);
    expect(index.filter((r) => r.kind === 'glossary')).toHaveLength(2);
  });
  it('carries the nearest heading as section context on passages', () => {
    const passage = index.find((r) => r.kind === 'chapter' && r.text.includes('blast radius'));
    expect(passage?.section).toBe('Delegation changes the failure surface');
  });
});

describe('search', () => {
  const index = buildSearchIndex(chapters, glossary);

  it('returns empty for a blank query', () => {
    expect(search(index, '   ')).toEqual([]);
  });
  it('finds a chapter passage by content word and links to the chapter', () => {
    const results = search(index, 'blast radius');
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].kind).toBe('chapter');
    expect(results[0].chapterNumber).toBe('01');
    expect(results[0].href).toContain('/read/01-the-shift');
  });
  it('matches a glossary term and links to its chapter ref', () => {
    const g = search(index, 'harness').find((r) => r.kind === 'glossary');
    expect(g).toBeTruthy();
    expect(g!.title).toBe('Harness engineering');
    expect(g!.href).toContain('/read/03');
  });
  it('ranks a title/term match above an incidental body mention', () => {
    expect(search(index, 'evals')[0].title.toLowerCase()).toContain('eval');
  });
  it('is case-insensitive', () => {
    expect(search(index, 'COLLEAGUE').length).toBe(search(index, 'colleague').length);
    expect(search(index, 'colleague').length).toBeGreaterThan(0);
  });
  it('attaches a highlightable match range within the snippet', () => {
    const [first] = search(index, 'blast radius');
    expect(first.snippet.toLowerCase()).toContain('blast radius');
    expect(first.matches.length).toBeGreaterThan(0);
    expect(first.snippet.slice(first.matches[0].start, first.matches[0].end).toLowerCase()).toContain('blast');
  });
});
