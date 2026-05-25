import manifestRaw from '../data/diagram-manifest.json';

export type OverviewDiagram = {
  id: string;
  title: string;
  caption: string;
  src: string;
  sourceFile: string;
};

export type OpenerDiagram = {
  chapter: string;
  title: string;
  src: string;
  sourceFile: string;
};

export type ConceptDiagram = {
  id: string;
  title: string;
  chapter: string | null;
  summary: string;
  src: string;
  sourceFile: string;
};

export type InlineDiagram = {
  chapter: string;
  index: number;
  title: string;
  src: string;
  sourceFile: string;
};

export type MapDiagram = {
  id: string;
  title: string;
  caption: string;
  src: string;
  sourceFile: string;
};

export type DiagramManifest = {
  overview: OverviewDiagram[];
  openers: OpenerDiagram[];
  concepts: ConceptDiagram[];
  inline: InlineDiagram[];
  maps: MapDiagram[];
};

export const manifest = manifestRaw as DiagramManifest;

export const opener = (chapter: string): OpenerDiagram | undefined =>
  manifest.openers.find((o) => o.chapter === chapter);

export const inlineFigsForChapter = (chapter: string): InlineDiagram[] =>
  manifest.inline
    .filter((f) => f.chapter === chapter)
    .sort((a, b) => a.index - b.index);

export const conceptById = (id: string): ConceptDiagram | undefined =>
  manifest.concepts.find((c) => c.id === id);
