import type { GlossaryTerm } from '../data/glossary';

export type Part =
  | { kind: 'text'; value: string }
  | { kind: 'term'; value: string; termId: string; displayMatched: string };

let cachedRegex: { regex: RegExp; lookup: Map<string, GlossaryTerm> } | null = null;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function buildRegex(terms: GlossaryTerm[]) {
  if (cachedRegex) return cachedRegex;
  // Collect every display form, longest first, so the alternation prefers longer matches.
  const all: { form: string; term: GlossaryTerm }[] = [];
  for (const t of terms) {
    for (const f of t.display) all.push({ form: f, term: t });
  }
  all.sort((a, b) => b.form.length - a.form.length);
  const lookup = new Map<string, GlossaryTerm>();
  for (const { form, term } of all) lookup.set(form.toLowerCase(), term);
  // \b on the outer boundary so we don't match inside larger words.
  const alt = all.map(({ form }) => escapeRegex(form)).join('|');
  const regex = new RegExp(`\\b(${alt})\\b`, 'gi');
  cachedRegex = { regex, lookup };
  return cachedRegex;
}

export function splitWithGlossary(text: string, terms: GlossaryTerm[]): Part[] {
  const { regex, lookup } = buildRegex(terms);
  const parts: Part[] = [];
  let lastIndex = 0;
  // Use matchAll to avoid stateful regex lastIndex bugs across renders.
  for (const m of text.matchAll(regex)) {
    const start = m.index ?? 0;
    if (start > lastIndex) {
      parts.push({ kind: 'text', value: text.slice(lastIndex, start) });
    }
    const matched = m[0];
    const term = lookup.get(matched.toLowerCase());
    if (term) {
      parts.push({
        kind: 'term',
        value: matched,
        termId: term.id,
        displayMatched: matched.toLowerCase(),
      });
    } else {
      parts.push({ kind: 'text', value: matched });
    }
    lastIndex = start + matched.length;
  }
  if (lastIndex < text.length) {
    parts.push({ kind: 'text', value: text.slice(lastIndex) });
  }
  return parts;
}

// For tests / hot reload — drop the cache.
export function _resetGlossaryCache() {
  cachedRegex = null;
}
