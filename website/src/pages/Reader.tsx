import { type CSSProperties, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'motion/react';
import Lenis from 'lenis';
import { useNavigate } from 'react-router-dom';

import { TopNav } from '../components/nav/TopNav';
import { BottomNav } from '../components/nav/BottomNav';
import { Hero } from '../components/chapter/Hero';
import { FullBookReader } from '../components/chapter/FullBookReader';
import { Sidebar } from '../components/drawers/Sidebar';
import { GlossaryDrawer } from '../components/drawers/GlossaryDrawer';
import { SettingsModal, type Settings } from '../components/modals/SettingsModal';
import { ShareModal } from '../components/modals/ShareModal';
import { GlossaryContext } from '../lib/glossaryContext';
import { scrollAudio } from '../lib/audio';
import { ActionMenu } from '../components/ActionMenu';
import { Seo } from '../components/Seo';
import { chapters } from '../data/bookChapters';
import { saveScrollProgress, loadScrollProgress, saveSettings, loadSettings, scrollToProgress } from '../lib/readingProgress';

let _saveTimer: ReturnType<typeof setTimeout> | null = null;
const debouncedSaveProgress = (p: number) => {
  if (_saveTimer) clearTimeout(_saveTimer);
  _saveTimer = setTimeout(() => saveScrollProgress(p), 600);
};

export const Reader = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const navigate = useNavigate();
  const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [resumeProgress, setResumeProgress] = useState<number | null>(null);

  const toggleFocusMode = useCallback(() => setIsFocusMode((v) => !v), []);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).closest('input, textarea, [contenteditable]')) return;

      if (e.key === 'f' || e.key === 'F') {
        setIsFocusMode((v) => !v);
        return;
      }

      if (e.key === 'g' || e.key === 'G') {
        if (e.metaKey || e.ctrlKey) return;
        navigate('/read/graph');
        return;
      }

      if (e.key === '[' || e.key === 'ArrowUp') {
        const current = chapters.findIndex((ch) => {
          const el = document.getElementById(`book-chapter-${ch.number}`);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.45 && rect.bottom > 0;
        });
        const target = current > 0 ? current - 1 : chapters.length - 1;
        document.getElementById(`book-chapter-${chapters[target].number}`)?.scrollIntoView({ behavior: 'smooth' });
        return;
      }

      if (e.key === ']' || e.key === 'ArrowDown') {
        const current = chapters.findIndex((ch) => {
          const el = document.getElementById(`book-chapter-${ch.number}`);
          if (!el) return false;
          const rect = el.getBoundingClientRect();
          return rect.top <= window.innerHeight * 0.45 && rect.bottom > 0;
        });
        const target = current < chapters.length - 1 ? current + 1 : 0;
        document.getElementById(`book-chapter-${chapters[target].number}`)?.scrollIntoView({ behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [navigate]);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  });

  const [settings, setSettings] = useState<Settings>(() =>
    loadSettings<Settings>({ theme: 'sepia', typography: 'serif', fontSize: 'md', lineSpacing: 'relaxed', sound: 'off' })
  );

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...newSettings };
      saveSettings(next);
      return next;
    });
  };

  const themeVars = useMemo(() => {
    const vars: Record<string, string> = {};
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

    let lastY = 0;
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      if (settings.sound === 'paper' && Math.abs(scroll - lastY) > 24) {
        scrollAudio.playTick();
        lastY = scroll;
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [settings.sound]);

  useEffect(() => {
    if (settings.sound === 'paper') scrollAudio.initialize();
  }, [settings.sound]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSidebarOpen]);

  // Load saved progress on mount; only offer to resume if meaningfully into the book (>3%).
  useEffect(() => {
    const saved = loadScrollProgress();
    if (saved !== null && saved > 0.03) setResumeProgress(saved);
  }, []);

  // Persist scroll progress while reading (debounced).
  useMotionValueEvent(scrollYProgress, 'change', debouncedSaveProgress);

  return (
    <GlossaryContext.Provider value={{ open: setGlossaryTermId }}>
      <Seo
        title="Read — From Copilot to Colleague"
        description="All 10 chapters in one continuous read."
        path="/read"
        type="website"
      />
      <div
        className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-pink)] font-sans antialiased pb-12 overflow-x-clip transition-colors duration-300"
        style={themeVars as CSSProperties}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          updateSettings={updateSettings}
        />
        <AnimatePresence>
          {!isFocusMode && (
            <motion.div
              key="topnav"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <TopNav
                progress={scrollYProgress}
                onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
                onBackToCatalogue={() => navigate('/')}
                onOpenShare={() => setIsShareOpen(true)}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <main className={`relative ${isFocusMode ? 'pt-0' : 'pt-14'} transition-[padding] duration-300`}>
          <AnimatePresence>
            {!isFocusMode && (
              <motion.div
                key="hero"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Hero />
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={articleRef}>
            <FullBookReader />
          </div>
        </main>
        <ActionMenu containerRef={articleRef} />
        <BottomNav
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          progress={scrollYProgress}
          isFocusMode={isFocusMode}
          onToggleFocusMode={toggleFocusMode}
        />
        <GlossaryDrawer termId={glossaryTermId} onClose={() => setGlossaryTermId(null)} />
        <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

        <AnimatePresence>
          {resumeProgress !== null && (
            <motion.div
              key="resume-nudge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 bg-[var(--color-paper)] border border-[var(--color-border)] shadow-lg px-4 py-2.5 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink-muted)]"
            >
              <span>Resume at {Math.round(resumeProgress * 100)}%?</span>
              <button
                onClick={() => { scrollToProgress(resumeProgress); setResumeProgress(null); }}
                className="text-[var(--color-ink)] border-b border-[var(--color-ink)] hover:opacity-60 transition-opacity"
              >
                Go
              </button>
              <button
                onClick={() => setResumeProgress(null)}
                aria-label="Dismiss"
                className="hover:opacity-60 transition-opacity ml-1"
              >
                ×
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: showBackToTop ? 1 : 0, y: showBackToTop ? 0 : 50 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-24 right-8 w-12 h-12 bg-[var(--color-ink)] text-[var(--color-paper)] rounded-full flex items-center justify-center shadow-lg border border-[var(--color-border)] hover:scale-110 transition-transform z-40 ${showBackToTop ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      </div>
    </GlossaryContext.Provider>
  );
};
