import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { manifest } from '../lib/manifest';
import { Lightbox } from '../components/Lightbox';
import { Seo } from '../components/Seo';

export const VisualGuide = () => {
  const location = useLocation();
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string; chapterRef: string | null } | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#concept-')) {
      const id = hash.slice('#concept-'.length);
      const el = document.getElementById(`concept-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] font-serif">
      <Seo
        title="Visual Guide — From Copilot to Colleague"
        description="73 hand-built diagrams covering the book's argument, methodology, and 18 recurring concepts."
        path="/visual-guide"
        image="/diagrams/overview/spine.png"
        type="website"
      />
      <header className="border-b border-[var(--color-border)] px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
        <Link to="/" className="hover:opacity-60">← Catalogue</Link>
        <span>From Copilot to Colleague · Visual Guide</span>
        <Link to="/read" className="hover:opacity-60">Reader →</Link>
      </header>

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">The book at a glance</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Four diagrams for the whole project: its argument, how it is made, its central thesis, and its evidence base.</p>
        <div className="space-y-24">
          {manifest.overview.map((d) => (
            <figure key={d.id}>
              <div className="border border-[var(--color-border)] bg-white">
                <img src={d.src} alt={d.title} className="block w-full h-auto" />
              </div>
              <figcaption className="mt-6 md:flex md:items-start md:gap-12">
                <h2 className="font-serif text-2xl italic md:w-1/3 mb-3 md:mb-0">{d.title}</h2>
                <p className="font-sans text-base leading-relaxed md:w-2/3 opacity-80">{d.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto border-t border-[var(--color-border)]">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">The four acts</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">The ten chapters move through a four-act arc — the Problem, the Scaffolding Stack, the Stress Test, and the Widening. Each divider names the act, its chapters, and where it sits in the throughline.</p>
        <div className="space-y-16">
          {(manifest.dividers ?? []).map((d) => (
            <figure key={d.id}>
              <button
                type="button"
                onClick={() => setLightbox({ src: d.src, title: d.title, caption: d.caption, chapterRef: d.chapters })}
                className="block w-full border border-[var(--color-border)] bg-white hover:shadow-xl transition-shadow cursor-zoom-in"
                aria-label={`Enlarge ${d.title}`}
              >
                <img src={d.src} alt={d.title} className="block w-full h-auto" loading="lazy" />
              </button>
              <figcaption className="mt-5 md:flex md:items-baseline md:gap-8">
                <h2 className="font-serif text-2xl italic md:w-1/3 mb-2 md:mb-0">{d.title}</h2>
                <div className="md:w-2/3">
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">{d.chapters}</p>
                  <p className="font-sans text-base leading-relaxed opacity-80">{d.caption}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto border-t border-[var(--color-border)]">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">How to read this book</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Three maps. One picks a reading route by reader profile. One opens up The Method that produced the manuscript. One charts the dependency network of the eighteen concepts the book uses.</p>
        <div className="space-y-24">
          {manifest.maps.map((m) => (
            <figure key={m.id}>
              <Link to={`/visual-guide/maps/${m.id}`} className="block border border-[var(--color-border)] bg-white hover:shadow-xl transition-shadow">
                <img src={m.src} alt={m.title} className="block w-full h-auto" />
              </Link>
              <figcaption className="mt-6 md:flex md:items-start md:gap-12">
                <h2 className="font-serif text-2xl italic md:w-1/3 mb-3 md:mb-0">{m.title}</h2>
                <div className="md:w-2/3">
                  <p className="font-sans text-base leading-relaxed opacity-80">{m.caption}</p>
                  <Link to={`/visual-guide/maps/${m.id}`} className="inline-block mt-4 font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100">
                    Open full page →
                  </Link>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="concepts" className="px-6 lg:px-12 py-20 max-w-7xl mx-auto border-t border-[var(--color-border)]">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">Concepts</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Eighteen named concepts that recur across the book — the units the arguments are built from. Click a card to enlarge, or open its full page.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifest.concepts.map((c) => (
            <div
              key={c.id}
              id={`concept-${c.id}`}
              className="border border-[var(--color-border)] bg-white hover:shadow-xl transition-shadow group flex flex-col"
            >
              <button
                type="button"
                onClick={() => setLightbox({ src: c.src, title: c.title, caption: c.summary, chapterRef: c.chapter })}
                className="text-left cursor-zoom-in"
                aria-label={`Enlarge ${c.title}`}
              >
                <div className="aspect-[16/10] overflow-hidden bg-[var(--color-paper)]">
                  <img src={c.src} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="px-5 pt-5 pb-2">
                  <h3 className="font-serif text-lg leading-tight mb-2">{c.title}</h3>
                  {c.chapter && (
                    <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">Chapter {c.chapter}</p>
                  )}
                  <p className="font-sans text-sm leading-relaxed opacity-80">{c.summary}</p>
                </div>
              </button>
              <Link
                to={`/visual-guide/concepts/${c.id}`}
                className="px-5 pb-5 pt-1 font-mono text-[10px] uppercase tracking-widest opacity-60 hover:opacity-100"
              >
                View full page →
              </Link>
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        open={lightbox !== null}
        src={lightbox?.src}
        title={lightbox?.title}
        caption={lightbox?.caption}
        chapterRef={lightbox?.chapterRef}
        onClose={() => setLightbox(null)}
      />
    </div>
  );
};
