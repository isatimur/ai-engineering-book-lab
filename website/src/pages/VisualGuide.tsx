import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { manifest } from '../lib/manifest';
import { Lightbox } from '../components/Lightbox';

export const VisualGuide = () => {
  const [location] = useLocation();
  const [lightbox, setLightbox] = useState<{ src: string; title: string; caption: string; chapterRef: string | null } | null>(null);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#concept-')) {
      const id = hash.slice('#concept-'.length);
      const el = document.getElementById(`concept-${id}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F8F6F0] text-[#1F1D1B] font-serif">
      <header className="border-b border-black/10 px-6 lg:px-12 py-6 flex items-center justify-between font-mono text-[10px] uppercase tracking-widest">
        <a href="/" className="hover:opacity-60">← Catalogue</a>
        <span>From Copilot to Colleague · Visual Guide</span>
        <a href="/read" className="hover:opacity-60">Reader →</a>
      </header>

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">The book at a glance</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Four diagrams for the whole project: its argument, how it is made, its central thesis, and its evidence base.</p>
        <div className="space-y-24">
          {manifest.overview.map((d) => (
            <figure key={d.id}>
              <div className="border border-black/10 bg-white">
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

      <section className="px-6 lg:px-12 py-20 max-w-5xl mx-auto border-t border-black/10">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">How to read this book</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Two maps — one for the reader's path, one for inspecting The Method itself.</p>
        <div className="space-y-24">
          {manifest.maps.map((m) => (
            <figure key={m.id}>
              <div className="border border-black/10 bg-white">
                <img src={m.src} alt={m.title} className="block w-full h-auto" />
              </div>
              <figcaption className="mt-6 md:flex md:items-start md:gap-12">
                <h2 className="font-serif text-2xl italic md:w-1/3 mb-3 md:mb-0">{m.title}</h2>
                <p className="font-sans text-base leading-relaxed md:w-2/3 opacity-80">{m.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section id="concepts" className="px-6 lg:px-12 py-20 max-w-7xl mx-auto border-t border-black/10">
        <h1 className="font-serif text-5xl md:text-6xl italic leading-none mb-3">Concepts</h1>
        <p className="font-sans text-sm opacity-60 mb-16 max-w-xl">Eighteen ideas that recur across the book. Click a card for the full diagram.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manifest.concepts.map((c) => (
            <button
              key={c.id}
              id={`concept-${c.id}`}
              onClick={() => setLightbox({ src: c.src, title: c.title, caption: c.summary, chapterRef: c.chapter })}
              className="text-left border border-black/10 bg-white hover:shadow-xl transition-shadow group"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#F8F6F0]">
                <img src={c.src} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-lg leading-tight mb-2">{c.title}</h3>
                {c.chapter && (
                  <p className="font-mono text-[10px] uppercase tracking-widest opacity-60 mb-2">Chapter {c.chapter}</p>
                )}
                <p className="font-sans text-sm leading-relaxed opacity-80">{c.summary}</p>
              </div>
            </button>
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
