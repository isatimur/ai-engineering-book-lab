import { Link, useParams } from 'react-router-dom';
import { manifest, mapById } from '../lib/manifest';
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
    <Seo title="Map not found — Visual Guide" description="The requested map could not be found." path="/visual-guide" />
    <p className="font-mono text-xs uppercase tracking-widest opacity-60">404 · map not found</p>
    <Link to="/visual-guide" className="underline">← Back to the Visual Guide</Link>
  </div>
);

export const MapDetail = () => {
  const { slug } = useParams();
  const map = slug ? mapById(slug) : undefined;
  if (!map) return <NotFound />;

  return (
    <LightboxProvider>
      <Seo
        title={`${map.title} — Visual Guide`}
        description={map.caption}
        path={`/visual-guide/maps/${map.id}`}
        image={map.src}
        type="article"
      />
      <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-serif">
        <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
          <Link to="/visual-guide" className="hover:opacity-60">← Visual Guide</Link>
          <span>Map</span>
          <Link to="/read" className="hover:opacity-60">Reader →</Link>
        </header>

        <article className="px-6 lg:px-12 py-16 max-w-4xl mx-auto">
          <nav className="font-mono text-[10px] uppercase tracking-widest opacity-50 mb-6">
            <Link to="/visual-guide" className="hover:opacity-100">Visual Guide</Link>
            <span className="mx-2">/</span>
            <span>Maps</span>
          </nav>
          <h1 className="font-serif text-4xl md:text-5xl italic leading-tight mb-6">{map.title}</h1>
          <p className="font-sans text-base leading-relaxed opacity-80 max-w-2xl mb-12">{map.caption}</p>

          <ZoomableFigure src={map.src} alt={map.title} />

          <div className="mt-10 font-mono text-[11px] uppercase tracking-widest">
            <Link to="/visual-guide" className="opacity-60 hover:opacity-100">← Back to Visual Guide</Link>
          </div>
        </article>
      </div>
    </LightboxProvider>
  );
};

/** Concrete map paths for static prerendering. */
export const mapStaticPaths = (): string[] =>
  manifest.maps.map((m) => `/visual-guide/maps/${m.id}`);
