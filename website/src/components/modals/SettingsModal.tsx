/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion } from 'motion/react';

export type Settings = {
  theme: 'light' | 'sepia' | 'dark';
  typography: 'serif' | 'sans' | 'dyslexic';
  fontSize: 'sm' | 'md' | 'lg';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  sound: 'off' | 'paper';
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  updateSettings: (next: Partial<Settings>) => void;
};

export const SettingsModal = ({ isOpen, onClose, settings, updateSettings }: Props) => {
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
          <button onClick={onClose} aria-label="Close settings" className="hover:text-[var(--color-ink-muted)] px-2 py-1">[X]</button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
             <span className="opacity-50">Theme</span>
             <div className="flex gap-2">
                {(['light', 'sepia', 'dark'] as const).map(t => (
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
                  { id: 'serif' as const, label: 'Default (Serif)', style: { fontFamily: 'var(--font-serif)' } },
                  { id: 'sans' as const, label: 'Clean (Sans)', style: { fontFamily: 'var(--font-sans)', textTransform: 'capitalize' as const } },
                  { id: 'dyslexic' as const, label: 'Dyslexia Friendly', style: { fontFamily: 'var(--font-dyslexic)', textTransform: 'capitalize' as const } }
                ].map(t => (
                  <button
                    key={t.id}
                    onClick={() => updateSettings({ typography: t.id })}
                    style={t.style}
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
                {(['sm', 'md', 'lg'] as const).map(s => (
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
                {(['normal', 'relaxed', 'loose'] as const).map(l => (
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

          <div className="flex flex-col gap-3">
            <span className="opacity-50">Sound</span>
            <div className="flex gap-2">
              {(['off', 'paper'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => updateSettings({ sound: s })}
                  className={`flex-1 py-3 border border-[var(--color-border)] rounded transition-colors ${
                    settings.sound === s
                      ? 'ring-2 ring-[var(--color-ink)] ring-offset-1 ring-offset-[var(--color-paper)] bg-[var(--color-ink)]/5'
                      : 'hover:bg-[var(--color-ink)]/5'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
