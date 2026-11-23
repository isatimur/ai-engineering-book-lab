/**
 * The last chapter a reader opened in a draft book (2 or 3), so the book's
 * landing page can offer "Continue reading". One key per book, e.g.
 * "book2:reader:last-chapter", so the books never share a bookmark. Book 1
 * keeps its own keys in lib/readingProgress.ts.
 */
const keyFor = (bookKey: string) => `${bookKey}:reader:last-chapter`;

export const saveDraftLastChapter = (bookKey: string, slug: string): void => {
  try {
    localStorage.setItem(keyFor(bookKey), slug);
  } catch {
    // Storage can be unavailable (private mode, SSR); the bookmark is optional.
  }
};

export const loadDraftLastChapter = (bookKey: string): string | null => {
  try {
    return localStorage.getItem(keyFor(bookKey));
  } catch {
    return null;
  }
};
