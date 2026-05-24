import { useState } from 'react';
import { motion } from 'motion/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const ShareModal = ({ isOpen, onClose }: Props) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const url = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'From Copilot to Colleague';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore — share targets still work
    }
  };

  const tweet = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative bg-[var(--color-paper)] border border-[var(--color-border)] shadow-2xl p-6 md:p-8 w-full max-w-md rounded flex flex-col gap-6 font-mono text-[10px] uppercase tracking-widest text-[var(--color-ink)]"
      >
        <div className="flex justify-between items-center border-b border-[var(--color-border)] pb-4">
          <span className="font-bold">Share</span>
          <button onClick={onClose} className="px-2 py-1 hover:opacity-70" aria-label="Close share modal">[X]</button>
        </div>

        <div className="flex flex-col gap-3">
          <span className="opacity-50">Link</span>
          <div className="flex gap-2">
            <input
              readOnly
              value={url}
              className="flex-1 border border-[var(--color-border)] rounded px-3 py-2 bg-[var(--color-paper)] text-[10px]"
              aria-label="Page URL"
            />
            <button
              onClick={handleCopy}
              className="border border-[var(--color-border)] rounded px-3 py-2 hover:bg-[var(--color-ink)]/5"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="opacity-50">Send to</span>
          <div className="flex gap-2">
            <a
              href={tweet}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[var(--color-border)] rounded px-3 py-2 text-center hover:bg-[var(--color-ink)]/5"
            >
              X / Twitter
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 border border-[var(--color-border)] rounded px-3 py-2 text-center hover:bg-[var(--color-ink)]/5"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
