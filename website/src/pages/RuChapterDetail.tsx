import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { chapterPath } from '../data/bookChapters';
import {
  BOOK_RU,
  ruChapters,
  ruChapterByParam,
  ruChapterPath,
  ruInlineFigs,
  ruOverview,
} from '../data/bookChaptersRu';
import { LightboxProvider, useLightbox } from '../lib/lightbox';
import { MarkdownBlock } from '../components/text/MarkdownBlock';
import { InlineIllustration } from '../components/chapter/InlineIllustration';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { LangSwitch } from '../components/nav/LangSwitch';
import { ruBookJsonLd, ruChapterJsonLd, ruBreadcrumbJsonLd } from '../lib/structuredData';
import { ruChapterMetaDescription } from '../data/geo';

/**
 * The <title> tag. Search results cut titles near 60 characters, so a long
 * chapter title drops the book suffix instead of being truncated mid-word.
 */
export const ruChapterTitleTag = (title: string): string => {
  const full = `${title} — ${BOOK_RU}`;
  return full.length <= 65 ? full : title;
};

export const minutesRu =(words: number) => `${Math.max(1, Math.round(words / 200))} мин чтения`;

const Overview = ({ chapter }: { chapter: string }) => {
  const ov = ruOverview(chapter);
  const { open } = useLightbox();
  if (!ov) return null;
  return (
    <div className="w-full py-12 lg:py-16 px-6 flex flex-col items-center border-b border-[var(--color-border)]">
      <figure className="w-full max-w-[1000px] mx-auto bg-white border border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => open(ov.src, `Глава ${Number(chapter)} — ${ov.title}`)}
          className="block w-full cursor-zoom-in"
          aria-label={`Увеличить схему главы ${Number(chapter)}`}
        >
          <img src={ov.src} alt={ov.title} className="block w-full h-auto" loading="lazy" />
        </button>
      </figure>
    </div>
  );
};

const NotFound = () => (
  <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col items-center justify-center gap-4 font-serif">
    <Seo title={`Глава не найдена — ${BOOK_RU}`} description="Такой главы нет." path="/ru/read" lang="ru" noindex />
    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">404 · глава не найдена</p>
    <Link to="/ru/read" className="underline">← К оглавлению</Link>
  </div>
);

export const RuChapterDetail = () => {
  const { slug } = useParams();
  const chapter = slug ? ruChapterByParam(slug) : undefined;
  if (!chapter) return <NotFound />;

  const idx = ruChapters.indexOf(chapter);
  const prev = idx > 0 ? ruChapters[idx - 1] : undefined;
  const next = idx < ruChapters.length - 1 ? ruChapters[idx + 1] : undefined;
  const n = Number(chapter.number);

  const blocks = chapter.content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);
  const body = blocks[0]?.startsWith('# ') ? blocks.slice(1) : blocks;
  // Every Book 1 chapter ends with a practical checklist: its last ## section.
  let lastH2 = -1;
  body.forEach((b, i) => { if (b.startsWith('## ')) lastH2 = i; });
  const figs = ruInlineFigs(chapter.number);
  let h2Seen = 0;

  const renderBlock = (block: string, key: string, allowFigure: boolean) => {
    const isH2 = block.startsWith('## ');
    const fig = allowFigure && isH2 && h2Seen < figs.length ? figs[h2Seen] : null;
    const figNo = h2Seen + 1;
    if (isH2) h2Seen += 1;
    return (
      <React.Fragment key={key}>
        <MarkdownBlock block={block} chapterNumber={chapter.number} />
        {fig ? <InlineIllustration fig={fig} label={`Рисунок ${n}.${figNo}`} alwaysVisible /> : null}
      </React.Fragment>
    );
  };

  const prose = lastH2 > 0 ? body.slice(0, lastH2) : body;
  const practical = lastH2 > 0 ? body.slice(lastH2) : [];
  const alternates = [
    { hrefLang: 'en', path: chapterPath(chapter) },
    { hrefLang: 'ru', path: ruChapterPath(chapter) },
  ];

  return (
    <LightboxProvider>
      <Seo
        title={ruChapterTitleTag(chapter.title)}
        description={ruChapterMetaDescription(chapter)}
        path={ruChapterPath(chapter)}
        type="article"
        lang="ru"
        alternates={alternates}
      />
      <JsonLd data={[ruChapterJsonLd(chapter, idx), ruBreadcrumbJsonLd(chapter)]} />
      <div lang="ru" className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/ru/read" className="hover:text-[var(--color-ink)]">← Все главы</Link>
          <span className="hidden sm:inline">{BOOK_RU}</span>
          <LangSwitch en={chapterPath(chapter)} ru={ruChapterPath(chapter)} current="ru" />
        </header>

        <main id="main">
          <div className="max-w-3xl mx-auto px-6 pt-12">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
              Глава {n} · {minutesRu(chapter.wordCount)}
            </p>
            <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{chapter.title}</h1>
            <p className="font-serif italic text-xl text-[var(--color-ink-muted)] mb-6">{chapter.promise}</p>
          </div>

          <Overview chapter={chapter.number} />

          <article className="max-w-3xl mx-auto px-6 pt-16">
            <div className="book-reader-prose">
              {prose.map((b, i) => renderBlock(b, `p-${i}`, true))}
              {practical.length > 0 && (
                <div className="practical-checklist mt-12 border border-[var(--color-border)] bg-[color-mix(in_srgb,var(--color-ink)_4%,transparent)] px-6 py-8 sm:px-8">
                  {practical.map((b, i) => renderBlock(b, `c-${i}`, false))}
                </div>
              )}
            </div>
          </article>

          <p className="max-w-3xl mx-auto px-6 pt-12 font-mono text-[11px] text-[var(--color-ink-muted)]">
            Перевод с английского. Цитаты переведены; источники и точные формулировки — в{' '}
            <Link to={chapterPath(chapter)} className="underline">оригинале главы</Link>.
          </p>
        </main>

        <nav className="max-w-3xl mx-auto px-6 pt-20 mt-16 border-t border-[var(--color-border)] flex justify-between gap-4 font-serif">
          {prev ? (
            <Link to={ruChapterPath(prev)} className="group max-w-[45%]">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">← Назад</span>
              <span className="block italic group-hover:underline">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={ruChapterPath(next)} className="group max-w-[45%] text-right ml-auto">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">Дальше →</span>
              <span className="block italic group-hover:underline">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </LightboxProvider>
  );
};

export const RuReader = () => (
  <div lang="ru" className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
    <Seo
      title={`${BOOK_RU} — книга об ИИ-инженерии`}
      description="Как ИИ переходит от подсказок к делегированной работе и что нужно, чтобы ему можно было доверять. Русский перевод."
      path="/ru/read"
      lang="ru"
      // No hreflang here: the English twin, /read, is noindex, and hreflang
      // must not point at a page search engines are told to drop.
    />
    <JsonLd data={ruBookJsonLd()} />
    <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
      <Link to="/" className="hover:text-[var(--color-ink)]">← На главную</Link>
      <span className="hidden sm:inline">{BOOK_RU}</span>
      <LangSwitch en="/read" ru="/ru/read" current="ru" />
    </header>
    <main id="main" className="max-w-3xl mx-auto px-6 pt-16">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">Книга 1 · русский перевод</p>
      <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{BOOK_RU}</h1>
      <p className="font-serif italic text-xl text-[var(--color-ink-muted)] mb-12">
        Как ИИ переходит от подсказок к делегированной работе — и что нужно, чтобы ему доверять.
      </p>
      <ol className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
        {ruChapters.map((c) => (
          <li key={c.number}>
            <Link to={ruChapterPath(c)} className="group flex gap-6 py-6">
              <span className="font-mono text-sm text-[var(--color-ink-muted)] pt-1">{c.number}</span>
              <span>
                <span className="block font-serif text-2xl group-hover:underline">{c.title}</span>
                <span className="block font-serif italic text-[var(--color-ink-muted)] mt-1">{c.promise}</span>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mt-2">{minutesRu(c.wordCount)}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  </div>
);
