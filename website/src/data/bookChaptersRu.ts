import { chapters, type BookChapter } from './bookChapters';
import { inlineFigsForChapter, type InlineDiagram } from '../lib/manifest';
import ruTitles from './diagram-titles-ru.json';

/**
 * Russian edition of Book 1. A chapter exists here only when
 * `content/ru/chapter-NN.md` exists, so a missing translation drops out
 * instead of breaking the build. Slugs stay English, so `/read/01-the-shift`
 * and `/ru/read/01-the-shift` are the same chapter in two languages.
 */
const files = import.meta.glob('../content/ru/chapter-*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const PROMISE_RU: Record<string, string> = {
  '01': 'Главный переход — не удобнее чат, а надёжное делегированное исполнение.',
  '02': 'Почему основы, суждение, ремесло и ограничения становятся ценнее.',
  '03': 'Как подготовленная среда делает агентов полезными и не пропускает халтуру.',
  '04': 'Доверие в продакшене дают циклы измерений, а не ощущения.',
  '05': 'Поиск, память и слои знаний как полноценная часть архитектуры.',
  '06': 'Надёжные агенты, воспроизведение и снимки, и почему автономии нужна архитектура.',
  '07': 'Делегированным полномочиям нужны границы, журнал аудита и настоящий контроль.',
  '08': 'Что голос, задержка и очерёдность реплик говорят о продакшен-ИИ.',
  '09': 'Как меняются команды и стимулы, когда ИИ становится частью штата.',
  '10': 'Принципы, которые переживут смену инструментов: контекст, оценки, контроль и вкус.',
};

const countWords = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/** "# Глава 1 — Сдвиг: от ассистента к исполнителю" → "Сдвиг: от ассистента к исполнителю". */
const titleFrom = (md: string, fallback: string) => {
  const h1 = md.match(/^#\s+(.+)$/m)?.[1];
  return h1 ? h1.replace(/^Глава\s+\d+\s*[—–-]\s*/, '').trim() : fallback;
};

export const ruChapters: BookChapter[] = chapters.flatMap((c) => {
  const content = files[`../content/ru/chapter-${c.number}.md`];
  if (!content) return [];
  return [
    {
      ...c,
      title: titleFrom(content, c.title),
      seoTitle: undefined,
      promise: PROMISE_RU[c.number] ?? c.promise,
      content,
      wordCount: countWords(content),
    },
  ];
});

export const ruChapterPath = (c: Pick<BookChapter, 'number' | 'slug'>): string =>
  `/ru/read/${c.number}-${c.slug}`;

export const ruChapterByParam = (param: string): BookChapter | undefined =>
  ruChapters.find((c) => `${c.number}-${c.slug}` === param);

export const hasRu = (c: Pick<BookChapter, 'number'>): boolean =>
  ruChapters.some((r) => r.number === c.number);

/** Russian figure PNG, copied by scripts/sync-diagrams.mjs from diagrams/i18n/ru. */
export const ruFigSrc = (sourceFile: string): string =>
  `/diagrams/ru/${sourceFile.replace(/\.excalidraw$/, '.ru.png')}`;

const RU_TITLES = ruTitles as Record<string, string>;

/** Inline figures of a chapter, pointed at the Russian PNGs and titles. */
export const ruInlineFigs = (chapter: string): InlineDiagram[] =>
  inlineFigsForChapter(chapter)
    .filter((f) => f.sourceFile in RU_TITLES)
    .map((f) => ({ ...f, src: ruFigSrc(f.sourceFile), title: RU_TITLES[f.sourceFile] }));

/** The chapter overview figure (diagrams/05-chapter1-… to 14-chapter10-…) in Russian. */
export const ruOverview = (chapter: string): { src: string; title: string } | undefined => {
  const n = Number(chapter);
  const key = Object.keys(RU_TITLES).find((k) => new RegExp(`^\\d\\d-chapter${n}-`).test(k));
  return key ? { src: ruFigSrc(key), title: RU_TITLES[key] } : undefined;
};
