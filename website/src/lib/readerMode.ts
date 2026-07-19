export const TEXT_ONLY_KEY = 'book:reader:text-only';

/** Whether text-only mode is enabled from a URL search string. */
export function isTextOnlyFromSearch(search: string): boolean {
  const mode = new URLSearchParams(search).get('mode');
  if (mode === 'text') return true;
  if (mode === 'visual') return false;
  return loadTextOnlyPreference();
}

export function loadTextOnlyPreference(): boolean {
  try {
    return localStorage.getItem(TEXT_ONLY_KEY) === '1';
  } catch {
    return false;
  }
}

export function saveTextOnlyPreference(on: boolean): void {
  try {
    localStorage.setItem(TEXT_ONLY_KEY, on ? '1' : '0');
  } catch {}
}

/** Keep `?mode=text` in sync with the reader toggle without a full navigation. */
export function syncTextOnlyUrl(on: boolean, replace = true): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (on) url.searchParams.set('mode', 'text');
  else url.searchParams.delete('mode');
  const next = `${url.pathname}${url.search}${url.hash}`;
  if (replace) window.history.replaceState({}, '', next);
  else window.history.pushState({}, '', next);
}
