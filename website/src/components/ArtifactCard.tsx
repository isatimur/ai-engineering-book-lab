import { Link } from 'react-router-dom';
import type { Artifact } from '../data/artifacts';

export const ArtifactCard = ({ label, headline, description, badge, links }: Artifact) => (
  <div className="text-center">
    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4">
      {label}
    </p>
    <h3 className="font-serif text-xl md:text-2xl text-white/90 mb-3">{headline}</h3>
    <p className="font-sans font-light text-sm text-white/55 max-w-md mx-auto mb-6 leading-relaxed">
      {description}
    </p>
    {badge && (
      <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
        <a
          href={badge.href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block opacity-90 hover:opacity-100 transition-opacity"
        >
          <img src={badge.src} alt={badge.alt} height="20" />
        </a>
      </div>
    )}
    <div className="flex flex-wrap justify-center gap-2 font-mono text-[10px] uppercase tracking-widest">
      {links.map((l) =>
        l.external ? (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            {l.label}
          </a>
        ) : (
          <Link
            key={l.href}
            to={l.href}
            className="px-3 py-1.5 border border-white/20 rounded-sm text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            {l.label}
          </Link>
        ),
      )}
    </div>
  </div>
);
