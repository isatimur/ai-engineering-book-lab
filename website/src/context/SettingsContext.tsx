import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { loadSettings, saveSettings } from '../lib/readingProgress';

export type Settings = {
  theme: 'light' | 'sepia' | 'dark';
  typography: 'serif' | 'sans' | 'dyslexic';
  fontSize: 'sm' | 'md' | 'lg';
  lineSpacing: 'normal' | 'relaxed' | 'loose';
  sound: 'off' | 'paper';
};

export type SettingsContextType = {
  settings: Settings;
  updateSettings: (next: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  const [settings, setSettings] = useState<Settings>(() =>
    loadSettings<Settings>({
      theme: 'sepia',
      typography: 'serif',
      fontSize: 'md',
      lineSpacing: 'relaxed',
      sound: 'off',
    })
  );

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...newSettings };
      saveSettings(next);
      return next;
    });
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { settings } = useSettings();

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
    } else {
      // sepia
      vars['--color-paper'] = '#F2EFE9';
      vars['--color-ink'] = '#18181A';
      vars['--color-ink-muted'] = '#555555';
      vars['--color-border'] = '#D8D4CC';
      vars['--color-pink'] = '#EAC6C0';
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
    if (typeof document !== 'undefined') {
      const root = document.documentElement;
      root.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
      root.classList.add(`theme-${settings.theme}`);
      root.style.setProperty('color-scheme', settings.theme === 'dark' ? 'dark' : 'light');
    }
  }, [settings.theme]);

  return (
    <div
      style={themeVars as React.CSSProperties}
      className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] transition-colors duration-300"
    >
      {children}
    </div>
  );
};
