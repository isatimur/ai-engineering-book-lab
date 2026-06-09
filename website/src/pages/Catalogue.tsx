import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { scrollAudio } from '../lib/audio';
import { MarkdownBlock } from '../components/text/MarkdownBlock';
import { Seo } from '../components/Seo';
import { JsonLd } from '../components/JsonLd';
import { bookJsonLd } from '../lib/structuredData';
import { BOOK } from '../data/book';
import aboutLabRaw from '../content/about-the-lab.md?raw';

export const Catalogue = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [transitioning, setTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleSelect = () => {
    scrollAudio.initialize();
    setTransitioning(true);
    setTimeout(() => navigate('/read'), 2400);
  };

  const aboutBlocks = aboutLabRaw
    .replace(/<!--.*?-->/gs, '')
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-[#1F1D1B] text-[#F9F7F1] font-serif relative overflow-hidden"
    >
      <Seo
        title="From Copilot to Colleague — An Online Book"
        description="How AI Engineering turns models into dependable systems. An online book + visual guide built from a 757-video corpus."
        path="/"
        type="book"
      />
      <JsonLd data={bookJsonLd()} />
      <header className="fixed top-0 left-0 w-full p-6 z-50 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto flex items-start gap-4">
          <div className="w-8 h-8 flex items-center justify-center border border-white/20 rounded-sm">
            <span className="font-serif italic text-xl leading-none">AE</span>
          </div>
          <div>
            <h1 className="font-sans font-medium text-sm tracking-wide">AI Engineer Press</h1>
            <p className="font-serif italic text-white/60 text-sm">Ideas for progress</p>
          </div>
        </div>
        <nav className="pointer-events-auto text-xs font-mono uppercase tracking-widest text-white/60 flex gap-6">
          <Link to="/visual-guide" className="hover:text-white">Visual Guide</Link>
          <Link to="/read" className="hover:text-white">Read</Link>
          <Link to="/versions" className="hover:text-white">Versions</Link>
          <Link to="/quality" className="hover:text-white">Quality</Link>
        </nav>
      </header>

      <main className="pt-32 pb-48 max-w-[50rem] mx-auto px-6 flex flex-col gap-8 relative z-10" style={{ perspective: '2500px' }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleSelect}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="cursor-pointer relative"
        >
          <div
            className="relative w-full shadow-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border border-transparent"
            style={{
              height: '110px',
              backgroundColor: BOOK.spineColor,
              borderRadius: '3px',
              transformStyle: 'preserve-3d',
              transformOrigin: 'center center',
              transform: isHovered
                ? 'translateY(40px) scale(1.05) rotateX(65deg) rotateZ(-6deg) rotateY(-5deg)'
                : 'translateY(0px) scale(1) rotateX(0deg) rotateZ(0deg) rotateY(0deg)',
              boxShadow: isHovered
                ? '0 60px 80px -20px rgba(0,0,0,0.7), 0 0 40px rgba(255,255,255,0.1)'
                : '0 25px 50px -12px rgba(0,0,0,0.4), inset 0 2px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.4), inset 4px 0 8px rgba(0,0,0,0.2), inset -4px 0 8px rgba(0,0,0,0.2)',
            }}
          >
            <div
              className="absolute left-0 right-0 origin-bottom transition-opacity duration-500 rounded-t-lg overflow-hidden border border-white/10"
              style={{
                height: '600px',
                bottom: '100%',
                transform: 'rotateX(-90deg)',
                backfaceVisibility: 'hidden',
                backgroundColor: '#111',
                opacity: isHovered ? 1 : 0,
                pointerEvents: 'none',
              }}
            >
              <img src={BOOK.coverImage} loading="lazy" decoding="async" className="w-full h-full object-cover" alt={`${BOOK.title} cover`} />
            </div>

            <div className="absolute inset-0 overflow-hidden flex items-center px-12 border-l-[6px] border-black/10" style={{ transform: 'translateZ(1px)' }}>
              <div
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 mix-blend-overlay" />
              <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-black/10 to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white/10 to-transparent" />

              <div className="relative w-full flex items-center justify-between z-10">
                <span className="font-serif text-2xl italic flex-shrink-0 w-1/4 text-left text-[#F9F7F1]">{BOOK.author}</span>
                <span className="font-sans font-medium uppercase tracking-widest text-sm flex-1 text-center opacity-90 text-[#F9F7F1]">{BOOK.title}</span>
                <div className="w-1/4 h-8 flex items-center justify-end flex-shrink-0">
                  <span className="font-serif italic text-lg opacity-50 text-white">AE</span>
                </div>
              </div>
              <div className="absolute left-8 top-0 bottom-0 w-px bg-white/10" />
              <div className="absolute right-24 top-0 bottom-0 w-px bg-black/10" />
            </div>
          </div>
        </motion.div>

        <p className="text-center font-serif italic text-white/60 text-sm mt-4">Hover to lift the cover · click to open</p>
      </main>

      <footer className="relative z-10 pt-24 pb-48 px-6 md:px-12 max-w-3xl mx-auto border-t border-white/10 mt-12 text-white/70">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="space-y-8 about-the-lab"
        >
          <h2 className="font-serif italic text-3xl md:text-4xl text-white">About the Lab</h2>
          <div className="font-sans font-light text-sm md:text-base leading-relaxed space-y-6">
            {aboutBlocks.map((block, i) => (
              <MarkdownBlock key={i} block={block} />
            ))}
          </div>
        </motion.div>

        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 mb-3">For AI agents</p>
          <p className="font-sans font-light text-sm text-white/60 mb-5 max-w-xl">
            This book is structured for LLMs and agents to read — a machine-readable index and the full text as clean markdown.
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest">
            {[
              { href: '/llms.txt', label: 'llms.txt' },
              { href: '/llms-full.txt', label: 'llms-full.txt' },
              { href: '/sitemap.xml', label: 'sitemap.xml' },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <div className="fixed bottom-8 right-6 text-white/40 rotate-180 mix-blend-difference z-0" style={{ writingMode: 'vertical-rl' }}>
        <span className="font-mono text-[10px] tracking-widest uppercase">Volume I</span>
      </div>

      <AnimatePresence>
        {transitioning && (
          <motion.div
            initial={{ opacity: 0, pointerEvents: 'none' }}
            animate={{ opacity: 1, pointerEvents: 'auto' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1F1D1B] overflow-hidden"
            style={{ perspective: '2000px' }}
          >
            <motion.div
              initial={{ scale: 0.5, y: 150, rotateX: 25, rotateY: -15, z: -500 }}
              animate={{
                scale: [0.5, 1.2, 5],
                y: [150, 0, 0],
                rotateX: [25, 0, 0],
                rotateY: [-15, 0, 0],
                z: [-500, 0, 800],
              }}
              transition={{ duration: 2.3, ease: [0.64, 0.04, 0.35, 1], times: [0, 0.4, 1] }}
              className="w-[280px] sm:w-[360px] aspect-[2/3] shadow-2xl relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div
                className="absolute inset-0 bg-[#F9F7F1] shadow-[inset_-4px_0_15px_rgba(0,0,0,0.05)] border border-black/5 flex flex-col items-center justify-center p-8 text-center"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 1 }}
                  className="font-serif text-[#1F1D1B]"
                >
                  <p className="italic text-sm mb-4">Dedicated to</p>
                  <h3 className="text-lg sm:text-xl font-medium mb-6">The AI Engineer Community</h3>
                  <p className="text-[10px] sm:text-xs opacity-60 max-w-[180px] leading-relaxed mx-auto">
                    For those building the reasoning machines of tomorrow, on the strange new frontiers of software.
                  </p>
                </motion.div>
              </div>
              <motion.div
                initial={{ rotateY: 0 }}
                animate={{ rotateY: -170 }}
                transition={{ delay: 0.5, duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
                className="absolute inset-0 origin-left"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <img src={BOOK.coverImage} className="absolute inset-0 w-full h-full object-cover shadow-[4px_0_10px_rgba(0,0,0,0.3)]" style={{ backfaceVisibility: 'hidden' }} alt="" />
                <div className="absolute inset-0 bg-[#E8E8E8] shadow-[inset_-10px_0_20px_rgba(0,0,0,0.1)] border-l border-white/50" style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }} />
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0, 1] }}
              transition={{ duration: 2.3, times: [0, 0.75, 1] }}
              className="absolute inset-0 bg-[var(--color-paper)] z-50 pointer-events-none"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
