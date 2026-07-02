import { Link, useParams } from 'react-router-dom';
import { manifest, conceptById } from '../lib/manifest';
import { chapters, chapterPath } from '../data/bookChapters';
import { LightboxProvider, useLightbox } from '../lib/lightbox';
import { Seo } from '../components/Seo';

const ZoomableFigure = ({ src, alt }: { src: string; alt: string }) => {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      onClick={() => open(src, alt)}
      className="block w-full cursor-zoom-in border border-[var(--color-border)] bg-white"
      aria-label={`Enlarge ${alt}`}
    >
      <img src={src} alt={alt} className="block w-full h-auto" />
    </button>
  );
};

const NotFound = () => (
  <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col items-center justify-center gap-4 font-serif">
    <Seo title="Concept not found — Visual Guide" description="The requested concept diagram could not be found." path="/visual-guide" />
    <p className="font-mono text-xs uppercase tracking-widest opacity-60">404 · concept not found</p>
    <Link to="/visual-guide" className="underline">← Back to the Visual Guide</Link>
  </div>
);

export const ConceptDetail = () => {
  const { slug } = useParams();
  const concept = slug ? conceptById(slug) : undefined;
  if (!concept) return <NotFound />;

  const chapter = concept.chapter ? chapters.find((c) => c.number === concept.chapter) : undefined;

  return (
    <LightboxProvider>
      <Seo
        title={`${concept.title} — Visual Guide`}
        description={concept.summary}
        path={`/visual-guide/concepts/${concept.id}`}
        image={concept.src}
        type="article"
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-serif">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <Link to="/visual-guide" className="hover:opacity-60">← Visual Guide</Link>
          <span>Concept</span>
          <Link to="/read" className="hover:opacity-60">Reader →</Link>
        </header>

        <article className="px-6 lg:px-12 py-16 max-w-4xl mx-auto">
          <nav className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-6">
            <Link to="/visual-guide" className="hover:opacity-100">Visual Guide</Link>
            <span className="mx-2">/</span>
            <span>Concepts</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl italic leading-tight mb-6">{concept.title}</h1>
          <p className="font-sans text-base leading-relaxed opacity-80 max-w-2xl mb-12">{concept.summary}</p>

          <ZoomableFigure src={concept.src} alt={concept.title} />

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 font-mono text-[11px] uppercase tracking-widest">
            {chapter ? (
              <Link to={chapterPath(chapter)} className="hover:opacity-60">
                Appears in Chapter {chapter.number} — {chapter.title} →
              </Link>
            ) : null}
            <Link to="/visual-guide" className="opacity-60 hover:opacity-100">← All concepts</Link>
          </div>
        </article>
      </div>
    </LightboxProvider>
  );
};

/** Concrete concept paths for static prerendering. */
export const conceptStaticPaths = (): string[] =>
  manifest.concepts.map((c) => `/visual-guide/concepts/${c.id}`);
