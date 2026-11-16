import type { ArtifactAnchor } from '../../lib/evidenceTypes';
import { artifactAnchorLabel } from '../../lib/artifactAnchors';

/** Sibling of AnchorCard for ADR-0003 Artifact anchors: the excerpt is the evidence. */
export const ArtifactAnchorCard = ({ anchor }: { anchor: ArtifactAnchor }) => (
  <li className="border border-[var(--color-border)] bg-white">
    <pre className="m-0 overflow-x-auto whitespace-pre-wrap break-words px-4 py-3 font-mono text-xs leading-[1.5]">
      {anchor.excerpt}
    </pre>
    <div className="flex items-center justify-between gap-3 border-t border-[var(--color-border)] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-muted)]">
      <span className="truncate">{artifactAnchorLabel(anchor)}</span>
      <span className="shrink-0">{anchor.date}</span>
    </div>
  </li>
);
