import { motion, useTransform, type MotionValue } from 'motion/react';

type Props = {
  progress: MotionValue<number>;
  onToggleSettings: () => void;
  onBackToCatalogue?: () => void;
  onOpenShare?: () => void;
};

export const TopNav = ({ progress, onToggleSettings, onBackToCatalogue, onOpenShare }: Props) => {
  const displayProgress = useTransform(progress, (p: number) => `${(p * 100).toFixed(2)}%`);
  const barWidth = useTransform(progress, (p: number) => `${p * 100}%`);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 border-b border-[var(--color-border)] flex items-center justify-between px-4 lg:px-6 text-[10px] md:text-xs font-mono uppercase tracking-[0.15em] z-50 bg-[var(--color-paper)]/95 backdrop-blur transition-colors duration-300">
      <div className="flex items-center gap-3 lg:gap-4">
        {onBackToCatalogue && (
          <button
            onClick={onBackToCatalogue}
            aria-label="Back to catalogue"
            className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
          >
            ← Catalogue
          </button>
        )}
        <span className="font-bold bg-[var(--color-ink)] text-[var(--color-paper)] px-2 py-1 rounded-[1px] transition-colors duration-300">AI PRESS</span>
        <span className="border-l border-[var(--color-border)] h-4 hidden sm:block transition-colors duration-300" />
        <span className="hidden sm:inline tracking-widest bg-transparent">FROM COPILOT TO COLLEAGUE</span>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden lg:flex items-center gap-4 text-[var(--color-ink-muted)] relative top-[1px] transition-colors duration-300">
          <span>AI ENGINEER KB</span>
          <span className="border-l border-[var(--color-border)] h-4 transition-colors duration-300" />
          <a href="/visual-guide" className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">VISUAL GUIDE</a>
          <span className="border-l border-[var(--color-border)] h-4 transition-colors duration-300" />
          <span className="text-[var(--color-ink)] transition-colors duration-300">BOOK READER</span>
        </div>
        <div className="border border-[var(--color-border)] rounded-full px-3 py-1 font-mono tabular-nums flex items-center justify-center min-w-[5.5rem] bg-[var(--color-paper)] transition-colors duration-300 relative overflow-hidden group">
          <motion.div
            className="absolute top-0 left-0 bottom-0 bg-[var(--color-ink)]/20"
            style={{ width: barWidth }}
          />
          <motion.span className="relative z-10">{displayProgress}</motion.span>
        </div>
        {onOpenShare && (
          <button
            onClick={onOpenShare}
            aria-label="Share"
            className="border border-[var(--color-border)] rounded-full px-3 py-1 hover:bg-black/5 transition-colors"
          >
            Share
          </button>
        )}
        <button
          onClick={onToggleSettings}
          aria-label="Open settings"
          className="border border-[var(--color-border)] rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/5 transition-colors font-serif italic text-sm"
        >
          Aa
        </button>
      </div>
    </header>
  );
};
