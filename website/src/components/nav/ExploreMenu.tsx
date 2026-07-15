import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export type ExploreItem = {
  href: string;
  label: string;
  /** Use <a> for external or non-SPA paths (e.g. /experience/). */
  external?: boolean;
  description?: string;
};

export const EXPLORE_ITEMS: ExploreItem[] = [
  { href: '/evidence', label: 'Evidence & metrics', description: 'Claims ledger and corpus stats' },
  { href: '/read/graph', label: 'Evidence graph', description: 'Interactive claim–source map' },
  { href: '/ledgers', label: 'Fact-checked ledgers', description: 'Event ledgers with yt:// anchors' },
  { href: '/experience/', label: '3D Journey', external: true, description: 'Solar-system chapter tour' },
  { href: '/visual-guide', label: 'Visual Guide', description: 'Diagrams and concept maps' },
  { href: '/search', label: 'Search', description: 'Cross-chapter + glossary' },
  { href: '/versions', label: 'Versions', description: 'Git diffs per chapter' },
  { href: '/quality', label: 'Quality', description: 'MASH judge scorecards' },
  { href: '/study-lab', label: 'Marketing Skills Lab', description: 'Interactive drills for skills & factories' },
  {
    href: '/whitepapers/ai-native-org.html',
    label: 'AI-Native Org whitepaper',
    external: true,
    description: 'The operating model, applied — HTML + PDF',
  },
];

type Props = {
  /** dark catalogue chrome vs reader paper chrome */
  variant?: 'light' | 'dark';
  className?: string;
};

export const ExploreMenu = ({ variant = 'light', className = '' }: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const triggerCls =
    variant === 'dark'
      ? 'text-white/60 hover:text-white border-white/20'
      : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border-[var(--color-border)]';

  const panelCls =
    variant === 'dark'
      ? 'bg-[#2a2724] border-white/15 text-white shadow-2xl'
      : 'bg-[var(--color-paper)] border-[var(--color-border)] text-[var(--color-ink)] shadow-xl';

  const itemMuted = variant === 'dark' ? 'text-white/50' : 'text-[var(--color-ink-muted)]';
  const itemHover =
    variant === 'dark' ? 'hover:bg-white/10' : 'hover:bg-[var(--color-ink)] hover:text-[var(--color-paper)]';

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className={`flex items-center gap-1.5 border rounded-full px-3 py-1 transition-colors ${triggerCls}`}
      >
        Explore
        <span className="text-[8px] leading-none" aria-hidden>
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div
          role="menu"
          className={`absolute right-0 top-full mt-2 min-w-[15rem] border z-[60] ${panelCls}`}
        >
          <ul className="list-none p-1 m-0">
            {EXPLORE_ITEMS.map((item) => {
              const inner = (
                <>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em]">
                    {item.label}
                  </span>
                  {item.description && (
                    <span className={`block mt-0.5 font-serif normal-case text-xs tracking-normal ${itemMuted}`}>
                      {item.description}
                    </span>
                  )}
                </>
              );
              const cls = `block px-3 py-2 transition-colors ${itemHover}`;
              return (
                <li key={item.href} role="none">
                  {item.external ? (
                    <a href={item.href} role="menuitem" className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </a>
                  ) : (
                    <Link to={item.href} role="menuitem" className={cls} onClick={() => setOpen(false)}>
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

/** Compact hamburger for mobile — same destinations as ExploreMenu. */
export const MobileNavMenu = ({ variant = 'light', className = '' }: Props) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  const triggerCls =
    variant === 'dark'
      ? 'text-white/60 hover:text-white border-white/20'
      : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] border-[var(--color-border)]';

  const panelCls =
    variant === 'dark'
      ? 'bg-[#2a2724] border-white/15 text-white'
      : 'bg-[var(--color-paper)] border-[var(--color-border)] text-[var(--color-ink)]';

  const linkCls =
    variant === 'dark'
      ? 'text-white/80 hover:text-white hover:bg-white/10'
      : 'text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] hover:bg-[var(--color-ink)]/5';

  const primaryLinks =
    variant === 'dark'
      ? [
          { href: '/read', label: 'Read', external: false },
          { href: '/assess', label: 'Assess', external: false },
        ]
      : [
          { href: '/read', label: 'Read', external: false },
          { href: '/visual-guide', label: 'Visual Guide', external: false },
        ];

  return (
    <div ref={rootRef} className={`relative lg:hidden ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Open navigation menu"
        className={`border rounded-full w-8 h-8 flex items-center justify-center transition-colors ${triggerCls}`}
      >
        <span className="text-sm leading-none">{open ? '×' : '≡'}</span>
      </button>

      {open && (
        <nav
          className={`absolute right-0 top-full mt-2 w-[14rem] border z-[60] py-2 font-mono text-[10px] uppercase tracking-[0.12em] ${panelCls}`}
        >
          {primaryLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={`block px-4 py-2 ${linkCls}`}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div
            className={`my-2 mx-4 border-t ${variant === 'dark' ? 'border-white/15' : 'border-[var(--color-border)]'}`}
          />
          {EXPLORE_ITEMS.map((item) =>
            item.external ? (
              <a
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 ${linkCls}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ) : (
              <Link
                key={item.href}
                to={item.href}
                className={`block px-4 py-2 ${linkCls}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>
      )}
    </div>
  );
};
