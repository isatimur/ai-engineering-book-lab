import { experienceUrl } from '../../lib/chapterLinks';

type Props = {
  chapterNumber: string;
  onReadText: () => void;
  className?: string;
};

/** Mobile-only landing choice — fly through in 3D or stay in text. */
export const MobileChapterChoice = ({ chapterNumber, onReadText, className = '' }: Props) => (
  <div className={`md:hidden ${className}`}>
    <div className="grid grid-cols-2 gap-3">
      <a
        href={experienceUrl(chapterNumber)}
        className="flex flex-col items-center justify-center gap-2 min-h-[88px] px-4 py-5 border border-[var(--color-border)] bg-[#1f1f20] text-[#F9F7F1] font-mono text-[10px] uppercase tracking-[0.14em] hover:border-[var(--color-pink)] transition-colors text-center"
      >
        <span className="text-lg" aria-hidden>
          ◇
        </span>
        Fly through (3D)
      </a>
      <button
        type="button"
        onClick={onReadText}
        className="flex flex-col items-center justify-center gap-2 min-h-[88px] px-4 py-5 border border-[var(--color-border)] bg-[var(--color-paper)] font-mono text-[10px] uppercase tracking-[0.14em] hover:bg-[color-mix(in_srgb,var(--color-pink)_22%,var(--color-paper))] transition-colors text-center"
      >
        <span className="text-lg" aria-hidden>
          ¶
        </span>
        Read text
      </button>
    </div>
  </div>
);
