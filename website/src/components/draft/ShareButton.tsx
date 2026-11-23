import { useState } from 'react';

/**
 * Shares the current page: the system share sheet where the browser has one,
 * otherwise copies the link. No third-party share URLs: the draft books are
 * shared by link, and a copied link is the whole job.
 */
export const ShareButton = ({ title, className = '' }: { title: string; className?: string }) => {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href.split('#')[0];
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // The reader closed the sheet; fall through to copying.
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // No clipboard access; nothing else to do.
    }
  };

  return (
    <button type="button" onClick={share} className={className} aria-live="polite">
      {copied ? 'Link copied ✓' : 'Share'}
    </button>
  );
};
