import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/** Where Esc goes: the press catalogue, which aiepress.com serves at "/". */
export const CATALOGUE_PATH = '/';

type KeyLike = {
  key: string;
  defaultPrevented: boolean;
  altKey?: boolean;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  target: EventTarget | null;
};

const TYPING_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT']);

/** True when the key press came from a field the reader is typing in. */
const isTyping = (target: EventTarget | null): boolean => {
  const el = target as { tagName?: string; isContentEditable?: boolean } | null;
  if (!el) return false;
  return Boolean(el.isContentEditable) || (el.tagName !== undefined && TYPING_TAGS.has(el.tagName));
};

/**
 * Should this key press return to the catalogue? Only a bare Esc, never while
 * typing, and never when an open dialog (the figure lightbox) owns Esc.
 */
export const shouldEscToCatalogue = (e: KeyLike, dialogOpen: boolean): boolean =>
  e.key === 'Escape' &&
  !e.defaultPrevented &&
  !e.altKey &&
  !e.ctrlKey &&
  !e.metaKey &&
  !e.shiftKey &&
  !dialogOpen &&
  !isTyping(e.target);

/** Landing pages only: Esc returns to the catalogue. */
export const useEscToCatalogue = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const dialogOpen = document.querySelector('[aria-modal="true"]') !== null;
      if (shouldEscToCatalogue(e, dialogOpen)) navigate(CATALOGUE_PATH);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);
};
