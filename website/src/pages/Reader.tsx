import { type CSSProperties, useEffect, useMemo, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'motion/react';
import Lenis from 'lenis';
import { useLocation } from 'wouter';

import { TopNav } from '../components/nav/TopNav';
import { BottomNav } from '../components/nav/BottomNav';
import { Hero } from '../components/chapter/Hero';
import { FullBookReader } from '../components/chapter/FullBookReader';
import { Sidebar } from '../components/drawers/Sidebar';
import { GlossaryDrawer } from '../components/drawers/GlossaryDrawer';
import { SettingsModal, type Settings } from '../components/modals/SettingsModal';
import { ShareModal } from '../components/modals/ShareModal';
import { GlossaryContext } from '../lib/glossaryContext';

export const Reader = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [, setLocation] = useLocation();
  const [glossaryTermId, setGlossaryTermId] = useState<string | null>(null);
  const [isShareOpen, setIsShareOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 300) {
      setShowBackToTop(true);
    } else {
      setShowBackToTop(false);
    }
  });

  const [settings, setSettings] = useState<Settings>({
    theme: 'sepia',
    typography: 'serif',
    fontSize: 'md',
    lineSpacing: 'relaxed',
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
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

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isSidebarOpen]);

  return (
    <GlossaryContext.Provider value={{ open: setGlossaryTermId }}>
      <div
        className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-pink)] font-sans antialiased pb-12 overflow-x-hidden transition-colors duration-300"
        style={themeVars as CSSProperties}
      >
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          settings={settings}
          updateSettings={updateSettings}
        />
        <TopNav
          progress={scrollYProgress}
          onToggleSettings={() => setIsSettingsOpen(!isSettingsOpen)}
          onBackToCatalogue={() => setLocation('/')}
          onOpenShare={() => setIsShareOpen(true)}
        />
        <main className="relative pt-14">
          <Hero />
          <FullBookReader />
        </main>
        <BottomNav onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} progress={scrollYProgress} />
        <GlossaryDrawer termId={glossaryTermId} onClose={() => setGlossaryTermId(null)} />
        <ShareModal isOpen={isShareOpen} onClose={() => setIsShareOpen(false)} />

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
