/**
 * Brand tokens lifted from the live site (website/src/data/book.ts +
 * Catalogue.tsx's dark theme) so the video and the book look like the same
 * object. No new palette invented for video.
 */
export const theme = {
  paper: '#F9F7F1',
  ink: '#1F1D1B',
  spine: '#1A1A1A',
  accent: '#C2410C',
  inkMuted: 'rgba(249, 247, 241, 0.6)',
  inkFaint: 'rgba(249, 247, 241, 0.35)',
  serif: 'Georgia, "Times New Roman", serif',
  sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  mono: '"SF Mono", "Menlo", "Consolas", monospace',
} as const;

export const BOOK_TITLE = 'From Copilot to Colleague';
export const BOOK_URL = 'fromcopilottocolleague.com';
export const AUTHORS = 'Timur Isachenko & Daniel Mohanrao';
