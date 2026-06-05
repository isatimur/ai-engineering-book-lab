import { Link, useParams } from 'react-router-dom';
import {
  chapters,
  chapterByParam,
  chapterParam,
  chapterPath,
} from '../data/bookChapters';
import { opener } from '../lib/manifest';
import { LightboxProvider, useLightbox } from '../lib/lightbox';
import { ChapterArticle } from '../components/chapter/ChapterArticle';
import { EvidenceRail } from '../EvidenceRail';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { chapterJsonLd, breadcrumbJsonLd } from '../lib/structuredData';

const EvidenceExhibit = ({ chapter, title }: { chapter: string; title: string }) => {
  const op = opener(chapter);
  const { open } = useLightbox();
  if (!op) return null;
  return (
    <div className="w-full py-12 lg:py-16 px-6 flex flex-col items-center border-b border-[var(--color-border)]">
      <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-6 text-center">
        EVIDENCE OF SOURCE · CHAPTER {chapter}
      </div>
      <figure className="w-full max-w-[1000px] mx-auto bg-[#1f1f20] rounded-md shadow-2xl overflow-hidden border border-[var(--color-border)]">
        <button
          type="button"
          onClick={() => open(op.src, `Chapter ${chapter} — ${op.title}`)}
          className="block w-full cursor-zoom-in group"
          aria-label={`Enlarge chapter ${chapter} evidence diagram`}
        >
          <div className="p-6 lg:p-10 flex items-center justify-center">
            <img src={op.src} alt={`Chapter ${chapter} — ${title}`} className="max-w-full h-auto" loading="lazy" />
          </div>
        </button>
      </figure>
    </div>
  );
};

const NotFound = () => (
  <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col items-center justify-center gap-4 font-serif">
    <Seo title="Chapter not found — From Copilot to Colleague" description="The requested chapter could not be found." path="/read" />
    <p className="font-mono text-xs uppercase tracking-widest text-[var(--color-ink-muted)]">404 · chapter not found</p>
    <Link to="/read" className="underline">← Back to the reader</Link>
  </div>
);

export const ChapterDetail = () => {
  const { slug } = useParams();
  const chapter = slug ? chapterByParam(slug) : undefined;
  if (!chapter) return <NotFound />;

  const idx = chapters.indexOf(chapter);
  const prev = idx > 0 ? chapters[idx - 1] : undefined;
  const next = idx < chapters.length - 1 ? chapters[idx + 1] : undefined;
  const op = opener(chapter.number);

  return (
    <LightboxProvider>
      <Seo
        title={`${chapter.title} — From Copilot to Colleague`}
        description={chapter.promise}
        path={chapterPath(chapter)}
        image={op ? op.src : undefined}
        type="article"
      />
      <JsonLd data={[chapterJsonLd(chapter, idx), breadcrumbJsonLd(chapter)]} />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] antialiased pb-24">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]">
          <Link to="/read" className="hover:text-[var(--color-ink)]">← All chapters</Link>
          <span>From Copilot to Colleague</span>
          <Link to="/visual-guide" className="hover:text-[var(--color-ink)]">Visual Guide</Link>
        </header>

        <div className="max-w-3xl mx-auto px-6 pt-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--color-ink-muted)] mb-4">
            Chapter {chapter.number}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl leading-tight mb-4">{chapter.title}</h1>
          <p className="font-serif italic text-xl text-[var(--color-ink-muted)] mb-2">{chapter.promise}</p>
        </div>

        <EvidenceExhibit chapter={chapter.number} title={chapter.title} />

        <article className="max-w-3xl mx-auto px-6 pt-16">
          <ChapterArticle chapter={chapter} />
        </article>

        <section className="max-w-3xl mx-auto px-6 pt-16">
          <EvidenceRail chapterNumber={chapter.number} />
        </section>

        <nav className="max-w-3xl mx-auto px-6 pt-20 mt-16 border-t border-[var(--color-border)] flex justify-between gap-4 font-serif">
          {prev ? (
            <Link to={chapterPath(prev)} className="group max-w-[45%]">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">← Previous</span>
              <span className="block italic group-hover:underline">{prev.title}</span>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={chapterPath(next)} className="group max-w-[45%] text-right ml-auto">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)] mb-1">Next →</span>
              <span className="block italic group-hover:underline">{next.title}</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </LightboxProvider>
  );
};

/** Concrete chapter paths for static prerendering. */
export const chapterStaticPaths = (): string[] => chapters.map((c) => `/read/${chapterParam(c)}`);
