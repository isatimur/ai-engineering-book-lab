import type { ArtifactAnchor } from './evidenceTypes';

const KIND_LABELS: Record<ArtifactAnchor['kind'], string> = {
  commit: 'Commit',
  run: 'Actions run',
  file: 'File',
  range: 'Range',
};

/** Short, human label for an Artifact anchor's `ref`: "Commit 2de004f", "Actions run 4377…". */
export const artifactAnchorLabel = (anchor: ArtifactAnchor): string =>
  `${KIND_LABELS[anchor.kind] ?? anchor.kind} ${anchor.ref}`;
