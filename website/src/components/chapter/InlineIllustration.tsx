import { type InlineDiagram } from '../../lib/manifest';
import { useLightbox } from '../../lib/lightbox';

type Props = {
  fig: Pick<InlineDiagram, 'src' | 'title'>;
  label: string;
  /**
   * Book 1 hides inline figures at `lg` and up, because its sticky stage shows
   * them there. Book 2 has no sticky stage, so it shows them at every width.
   */
  alwaysVisible?: boolean;
};

export const InlineIllustration = ({ fig, label, alwaysVisible = false }: Props) => {
  const { open } = useLightbox();
  return (
    <figure className={`my-12 border border-[var(--color-border)] bg-white${alwaysVisible ? '' : ' lg:hidden'}`}>
      <button
        type="button"
        onClick={() => open(fig.src, `${label} — ${fig.title}`)}
        className="block w-full cursor-zoom-in group"
        aria-label={`Enlarge ${label}: ${fig.title}`}
      >
        <img
          src={fig.src}
          alt={fig.title}
          className="block w-full h-auto transition-opacity group-hover:opacity-90"
          loading="lazy"
        />
      </button>
      <figcaption className="border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)] flex flex-wrap items-center gap-2 justify-between">
        <span>
          <span>{label}</span>
          <span className="mx-3">/</span>
          <span className="normal-case font-serif tracking-normal">{fig.title}</span>
        </span>
        <span className="opacity-70">CLICK TO ENLARGE</span>
      </figcaption>
    </figure>
  );
};
