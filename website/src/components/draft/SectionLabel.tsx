/**
 * A section's label: a full-width rule with `[ LABEL ]` under it, in mono.
 * One component, so every new section on a book page opens the same way.
 * Pass `as="h2"` when the label is the section's only heading.
 */
export const SectionLabel = ({
  children,
  id,
  as: Tag = 'p',
  className = '',
}: {
  children: string;
  id?: string;
  as?: 'p' | 'h2' | 'h3';
  className?: string;
}) => (
  <div id={id} className={`scroll-mt-8 border-t border-[var(--color-ink)]/25 pt-3 ${className}`}>
    <Tag className="m-0 font-mono text-[11px] font-normal uppercase tracking-[0.2em] text-[var(--color-ink)]">
      <span aria-hidden="true">[ </span>
      {children}
      <span aria-hidden="true"> ]</span>
    </Tag>
  </div>
);
