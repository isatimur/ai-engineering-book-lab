/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { type CSSProperties, useEffect, useState, useMemo } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import Lenis from 'lenis';
import { chapters } from './data/bookChapters';
import { TopNav } from './components/nav/TopNav';
import { BottomNav } from './components/nav/BottomNav';
import { Hero } from './components/chapter/Hero';
import { FullBookReader } from './components/chapter/FullBookReader';


const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const scrollToSection = (id: string) => {
    onClose();
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[60]"
        onClick={onClose}
      />

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isOpen ? "0%" : "100%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] lg:w-[500px] bg-[var(--color-paper)] z-[70] border-l border-[var(--color-border)] shadow-2xl flex flex-col font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]"
      >
        <div className="flex justify-between items-center p-6 border-b border-[var(--color-border)]">
           <span className="text-black/50">CONTENTS</span>
           <button onClick={onClose} className="hover:text-[var(--color-ink-muted)] hover:scale-110 transition-transform flex items-center justify-center p-2">
             [X] CLOSE
           </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8">
           <div className="flex flex-col gap-4 border-b border-black/10 pb-8">
             <h3 className="text-xs font-bold font-serif normal-case tracking-normal mb-2 text-xl">Chapters</h3>
             
             {chapters.map((chapter, index) => (
               <div
                 key={chapter.number}
                 className={`group cursor-pointer hover:opacity-100 transition-opacity ${index === 0 ? '' : 'opacity-50 mt-4'}`}
                 onClick={() => scrollToSection(`book-chapter-${chapter.number}`)}
               >
                  <div className="flex justify-between items-baseline mb-1">
                    <span className={`font-bold ${index === 0 ? 'underline group-hover:text-[var(--color-ink-muted)]' : ''}`}>
                      CHAPTER {chapter.number}
                    </span>
                    <span className="opacity-50">{chapter.wordCount.toLocaleString()}w</span>
                  </div>
                  <div className="normal-case font-serif tracking-normal text-sm group-hover:text-[var(--color-ink-muted)]">{chapter.title}</div>
               </div>
             ))}
           </div>
        </div>

        <div className="p-6 border-t border-[var(--color-border)] bg-[#E8E8E8] text-center opacity-60">
           AI PRESS / AI ENGINEER KB © 2026
        </div>
      </motion.div>
    </>
  );
};

const SettingsModal = ({ isOpen, onClose, settings, updateSettings }: any) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[var(--color-paper)] border border-[var(--color-border)] shadow-2xl p-6 md:p-8 w-full max-w-sm rounded flex flex-col gap-8 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)] transition-colors duration-300"
      >
        <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
          <span className="font-bold">Reader Settings</span>
          <button onClick={onClose} className="hover:text-[var(--color-ink-muted)] px-2 py-1">[X]</button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Theme</span>
             <div className="flex gap-2">
                {['light', 'sepia', 'dark'].map(t => (
                  <button 
                    key={t}
                    onClick={() => updateSettings({ theme: t })}
                    className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors ${settings.theme === t ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Typography</span>
             <div className="flex flex-col gap-2">
                {[
                  { id: 'serif', label: 'Default (Serif)', style: { fontFamily: 'var(--font-serif)' } },
                  { id: 'sans', label: 'Clean (Sans)', style: { fontFamily: 'var(--font-sans)', textTransform: 'capitalize' } },
                  { id: 'dyslexic', label: 'Dyslexia Friendly', style: { fontFamily: 'var(--font-dyslexic)', textTransform: 'capitalize' } }
                ].map(t => (
                  <button 
                    key={t.id}
                    onClick={() => updateSettings({ typography: t.id })}
                    style={t.style as any}
                    className={`w-full py-2 border border-[var(--color-border)] rounded transition-colors ${settings.typography === t.id ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    {t.label}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Font Size</span>
             <div className="flex gap-2">
                {['sm', 'md', 'lg'].map(s => (
                  <button 
                    key={s}
                    onClick={() => updateSettings({ fontSize: s })}
                    className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors ${settings.fontSize === s ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    {s === 'sm' ? 'a' : s === 'md' ? 'Aa' : 'AA'}
                  </button>
                ))}
             </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="opacity-50">Line Spacing</span>
             <div className="flex gap-2">
                {['normal', 'relaxed', 'loose'].map(l => (
                  <button 
                    key={l}
                    onClick={() => updateSettings({ lineSpacing: l })}
                    className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors flex flex-col items-center justify-center gap-1 ${settings.lineSpacing === l ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5' : 'hover:bg-[var(--color-ink)]/5'}`}
                  >
                    <div className={`w-4 h-[1px] bg-current ${l === 'normal' ? 'my-0.5' : l === 'relaxed' ? 'my-1' : 'my-1.5'}`} />
                    <div className={`w-4 h-[1px] bg-current ${l === 'normal' ? 'my-0.5' : l === 'relaxed' ? 'my-1' : 'my-1.5'}`} />
                    <div className={`w-4 h-[1px] bg-current ${l === 'normal' ? 'my-0.5' : l === 'relaxed' ? 'my-1' : 'my-1.5'}`} />
                  </button>
                ))}
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};


export default function App() {
  const { scrollYProgress, scrollY } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  });
  
  const [settings, setSettings] = useState({
    theme: 'sepia',
    typography: 'serif',
    fontSize: 'md',
    lineSpacing: 'relaxed',
  });

  const updateSettings = (newSettings: Partial<typeof settings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const themeVars = useMemo(() => {
    let vars: any = {};
    if (settings.theme === 'light') {
      vars['--color-paper'] = '#FFFFFF';
      vars['--color-ink'] = '#121212';
      vars['--color-ink-muted'] = '#666666';
      vars['--color-border'] = '#EAEAEA';
      vars['--color-pink'] = '#F3F4F6';
    } else if (settings.theme === 'dark') {
      vars['--color-paper'] = '#18181B';
      vars['--color-ink'] = '#EDEDED';
      vars['--color-ink-muted'] = '#A1A1AA';
      vars['--color-border'] = '#3F3F46';
      vars['--color-pink'] = '#27272A';
    }

    if (settings.typography === 'sans') {
      vars['--font-reader'] = 'var(--font-sans)';
    } else if (settings.typography === 'dyslexic') {
      vars['--font-reader'] = 'var(--font-dyslexic)';
    } else {
      vars['--font-reader'] = 'var(--font-serif)';
    }

    if (settings.fontSize === 'sm') {
      vars['--reader-font-size-sm'] = '1.1rem';
      vars['--reader-font-size-md'] = '1.25rem';
      vars['--reader-font-size-lg'] = '1.35rem';
    } else if (settings.fontSize === 'lg') {
      vars['--reader-font-size-sm'] = '1.4rem';
      vars['--reader-font-size-md'] = '1.6rem';
      vars['--reader-font-size-lg'] = '1.75rem';
    } else {
      vars['--reader-font-size-sm'] = '1.25rem';
      vars['--reader-font-size-md'] = '1.4rem';
      vars['--reader-font-size-lg'] = '1.5rem';
    }

    if (settings.lineSpacing === 'normal') {
      vars['--reader-line-spacing'] = '1.4';
    } else if (settings.lineSpacing === 'loose') {
      vars['--reader-line-spacing'] = '1.8';
    } else {
      vars['--reader-line-spacing'] = '1.6';
    }

    return vars;
  }, [settings]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  // Prevent scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSidebarOpen]);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-pink)] font-sans antialiased pb-12 overflow-x-hidden transition-colors duration-300" style={themeVars as CSSProperties}>
       <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
       <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} settings={settings} updateSettings={updateSettings} />
       <TopNav progress={scrollYProgress} onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)} />
       <main className="relative pt-14">
         <Hero />
         <FullBookReader />
       </main>
       <BottomNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} progress={scrollYProgress} />

       <motion.button
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 50 }}
         onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
         className={`fixed bottom-24 right-8 w-12 h-12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full flex items-center justify-center shadow-lg border border-[var(--color-border)] hover:scale-110 transition-transform z-40 ${showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
       >
         ↑
       </motion.button>
    </div>
  );
}
