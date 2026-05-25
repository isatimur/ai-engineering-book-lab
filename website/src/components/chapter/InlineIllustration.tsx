import { type InlineDiagram } from '../../lib/manifest';

type Props = {
  fig: InlineDiagram;
  label: string;
};

export const InlineIllustration = ({ fig, label }: Props) => (
  <figure className="my-12 border border-[var(--color-border)] bg-white">
    <img src={fig.src} alt={fig.title} className="block w-full h-auto" loading="lazy" />
    <figcaption className="border-t border-[var(--color-border)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
      <span>{label}</span>
      <span className="mx-3">/</span>
      <span className="normal-case font-serif tracking-normal">{fig.title}</span>
    </figcaption>
  </figure>
);
