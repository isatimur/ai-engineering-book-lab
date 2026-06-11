import { chapters, chapterPath, type BookChapter } from '../data/bookChapters';

export type ExperienceSurface = 'read' | 'graph' | 'experience';

/** Resolve a chapter record from its zero-padded number (e.g. "01"). */
export const chapterByNumber = (chapterNumber: string): BookChapter | undefined =>
  chapters.find((c) => c.number === chapterNumber.padStart(2, '0'));

/** Canonical read URL, e.g. `/read/01-the-shift`. */
export const readChapterUrl = (chapterNumber: string): string => {
  const ch = chapterByNumber(chapterNumber);
  return ch ? chapterPath(ch) : '/read';
};

/** Evidence graph URL, optionally filtered to a chapter. */
export const graphUrl = (chapterNumber?: string): string =>
  chapterNumber
    ? `/read/graph?chapter=${chapterNumber.padStart(2, '0')}`
    : '/read/graph';

/** 3D journey URL with chapter hash, e.g. `/experience/#ch-3`. */
export const experienceUrl = (chapterNumber?: string): string => {
  if (!chapterNumber) return '/experience/';
  const n = parseInt(chapterNumber, 10);
  return Number.isFinite(n) && n >= 1 && n <= chapters.length
    ? `/experience/#ch-${n}`
    : '/experience/';
};

/** Parse `#ch-3` style hashes into a 1-based chapter index, or null. */
export const parseExperienceHash = (hash: string): number | null => {
  const match = hash.match(/^#ch-(\d{1,2})$/i);
  if (!match) return null;
  const n = parseInt(match[1], 10);
  return Number.isFinite(n) && n >= 1 && n <= chapters.length ? n : null;
};
