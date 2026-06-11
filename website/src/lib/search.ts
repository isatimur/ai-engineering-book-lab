// Client-side full-text search over the book's chapters + glossary.
//
// Both data sources are already in the JS bundle (bookChapters imports each
// chapter's markdown via ?raw; glossary is a plain module), so the index is
// built in memory on first use — no extra fetch, no build step, no deps.
//
// The pure functions here (markdownToText / buildSearchIndex / search) hold all
// the ranking logic and are unit-tested; the page/overlay is a thin view.

import type { BookChapter } from '../data/bookChapters';
import { chapterPath } from '../data/bookChapters';
import type { GlossaryTerm } from '../data/glossary';

/** A contiguous span within a snippet that matched the query, for highlighting. */
export type MatchRange = { start: number; end: number };

export type SearchRecord = {
  kind: 'chapter' | 'glossary';
  /** Heading for the result row (chapter title or glossary term). */
  title: string;
  /** Chapter section heading the passage sits under (chapter records only). */
  section?: string;
  /** Plain, searchable text of this record. */
  text: string;
  /** Two-digit chapter number for grouping/labels (chapter records only). */
  chapterNumber?: string;
  /** Destination when the result is chosen. */
  href: string;
};

export type SearchResult = SearchRecord & {
  score: number;
  /** A trimmed excerpt of `text` centered on the first match. */
  snippet: string;
  /** Match ranges within `snippet` (not `text`). */
  matches: MatchRange[];
};

/**
 * Reduce markdown to readable plain text for indexing and snippets. A small,
 * allocation-light pass — not a full parser — covering the syntax that actually
 * appears in the manuscript (headings, emphasis, links, inline code, images,
 * list/quote markers).
 */
export function markdownToText(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, ' ') // fenced code blocks
    .replace(/`([^`]+)`/g, '$1') // inline code
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ') // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // links → label
    .replace(/^#{1,6}\s+/gm, '') // heading markers
    .replace(/^\s*[-*+]\s+/gm, '') // bullet markers
    .replace(/^\s*>\s?/gm, '') // blockquote markers
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // bold
    .replace(/(\*|_)(.*?)\1/g, '$2') // italic
    .replace(/\s+/g, ' ')
    .trim();
}

const isHeading = (line: string) => /^#{1,6}\s+/.test(line);
const headingText = (line: string) => line.replace(/^#{1,6}\s+/, '').trim();

/**
 * Build the flat search index. Chapters are split into passages (paragraphs) so
 * a hit lands on a specific idea and carries its section heading; glossary terms
 * become one record each.
 */
export function buildSearchIndex(
  chapters: BookChapter[],
  glossary: GlossaryTerm[],
): SearchRecord[] {
  const records: SearchRecord[] = [];

  for (const c of chapters) {
    const href = chapterPath(c);
    let section: string | undefined;
    for (const block of c.content.split(/\n{2,}/)) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      const firstLine = trimmed.split('\n')[0];
      if (isHeading(firstLine)) {
        const h = headingText(firstLine);
        // The chapter's own `# Chapter N — Title` H1 is redundant with the title.
        section = /^chapter\b/i.test(h) ? undefined : h;
        const rest = trimmed.split('\n').slice(1).join('\n').trim();
        if (!rest) continue;
        const text = markdownToText(rest);
        if (text) records.push({ kind: 'chapter', title: c.title, section, text, chapterNumber: c.number, href });
        continue;
      }
      const text = markdownToText(trimmed);
      if (text.length < 12) continue; // skip stray fragments
      records.push({ kind: 'chapter', title: c.title, section, text, chapterNumber: c.number, href });
    }
  }

  for (const term of glossary) {
    const href = term.chapterRef ? `/read/${term.chapterRef}` : `/read#term-${term.id}`;
    records.push({
      kind: 'glossary',
      title: term.display[0],
      text: `${term.display.join(' ')} ${term.definition}`,
      href,
    });
  }

  return records;
}

const tokenize = (q: string): string[] =>
  (q.toLowerCase().match(/[a-z0-9]+/gi) ?? []).map((t) => t.toLowerCase());

const SNIPPET_RADIUS = 90;

/** Build a snippet window around the first matched term, with match ranges. */
function makeSnippet(text: string, terms: string[]): { snippet: string; matches: MatchRange[] } {
  const lower = text.toLowerCase();
  let first = -1;
  for (const t of terms) {
    const i = lower.indexOf(t);
    if (i !== -1 && (first === -1 || i < first)) first = i;
  }
  if (first === -1) {
    const snippet = text.length > SNIPPET_RADIUS * 2 ? text.slice(0, SNIPPET_RADIUS * 2).trimEnd() + '…' : text;
    return { snippet, matches: [] };
  }
  let start = Math.max(0, first - SNIPPET_RADIUS);
  let end = Math.min(text.length, first + SNIPPET_RADIUS);
  if (start > 0) { const s = text.indexOf(' ', start); if (s !== -1 && s < first) start = s + 1; }
  if (end < text.length) { const e = text.lastIndexOf(' ', end); if (e > first) end = e; }
  let snippet = text.slice(start, end).trim();
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  snippet = prefix + snippet + suffix;

  const sLower = snippet.toLowerCase();
  const matches: MatchRange[] = [];
  for (const t of terms) {
    let from = 0;
    let i: number;
    while ((i = sLower.indexOf(t, from)) !== -1) {
      matches.push({ start: i, end: i + t.length });
      from = i + t.length;
    }
  }
  matches.sort((a, b) => a.start - b.start);
  return { snippet, matches };
}

/**
 * Rank index records against a query. Scoring favors, in order: title/term hits,
 * whole-phrase hits, then per-term frequency — so a chapter titled "Evals" beats
 * an incidental body mention of the word.
 */
export function search(index: SearchRecord[], query: string, limit = 20): SearchResult[] {
  const terms = [...new Set(tokenize(query))];
  if (terms.length === 0) return [];
  const phrase = query.trim().toLowerCase();

  const scored: SearchResult[] = [];
  for (const rec of index) {
    const haystack = rec.text.toLowerCase();
    const titleHay = `${rec.title} ${rec.section ?? ''}`.toLowerCase();

    let score = 0;
    let matchedTerms = 0;
    for (const t of terms) {
      const inTitle = titleHay.includes(t);
      const bodyCount = haystack.split(t).length - 1;
      if (inTitle) score += 8;
      if (bodyCount > 0) { score += 2 + Math.min(bodyCount, 4); matchedTerms++; }
      else if (inTitle) matchedTerms++;
    }
    if (matchedTerms === 0) continue;
    // Require all terms to appear somewhere (title or body) for multi-term queries.
    if (terms.length > 1 && matchedTerms < terms.length) continue;
    if (phrase.length > 2 && haystack.includes(phrase)) score += 12;
    if (phrase.length > 2 && titleHay.includes(phrase)) score += 10;
    if (rec.kind === 'glossary') score += 1; // high-signal definitions edge ties

    const { snippet, matches } = makeSnippet(rec.text, terms);
    scored.push({ ...rec, score, snippet, matches });
  }

  scored.sort((a, b) => b.score - a.score || a.text.length - b.text.length);
  return scored.slice(0, limit);
}
