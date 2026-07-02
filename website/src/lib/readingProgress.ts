const PROGRESS_KEY = 'book:reader:progress';
const SETTINGS_KEY = 'book:reader:settings';
const LAST_CHAPTER_KEY = 'book:reader:last-chapter';

export function saveScrollProgress(progress: number): void {
  try { localStorage.setItem(PROGRESS_KEY, String(progress)); } catch {}
}

export function loadScrollProgress(): number | null {
  try {
    const v = localStorage.getItem(PROGRESS_KEY);
    if (!v) return null;
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  } catch { return null; }
}

export function saveSettings<T>(settings: T): void {
  try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch {}
}

export function loadSettings<T>(defaults: T): T {
  try {
    const v = localStorage.getItem(SETTINGS_KEY);
    if (!v) return defaults;
    return { ...defaults, ...JSON.parse(v) };
  } catch { return defaults; }
}

/** Persist the last chapter the reader was in (zero-padded, e.g. "03"). */
export function saveLastChapter(chapterNumber: string): void {
  try {
    localStorage.setItem(LAST_CHAPTER_KEY, chapterNumber.padStart(2, '0'));
  } catch {}
}

export function loadLastChapter(): string | null {
  try {
    const v = localStorage.getItem(LAST_CHAPTER_KEY);
    return v && /^\d{2}$/.test(v) ? v : null;
  } catch {
    return null;
  }
}

/** Scroll to the given 0–1 progress ratio using the scrolling element. */
export function scrollToProgress(progress: number): void {
  const el = document.scrollingElement;
  if (!el) return;
  const target = progress * (el.scrollHeight - el.clientHeight);
  window.scrollTo({ top: target, behavior: 'smooth' });
}
