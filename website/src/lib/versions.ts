import versionsRaw from '../data/versions.json';

export type VersionSource = 'git' | 'snapshot';

export type ChapterVersion = {
  version_id: string;
  source: VersionSource;
  ref: string | null;
  date: string;
  status: string;
  wordCount: number;
  message: string;
  corpus_snapshot_hash: string | null;
  content_ref: string; // e.g. "04/git-0ab273e.md"
};

export type ChapterVersions = {
  current_version_id: string;
  versions: ChapterVersion[];
};

export type VersionsManifest = {
  schema_version: number;
  source_mode: string;
  chapters: Record<string, ChapterVersions>;
};

export const versions = versionsRaw as VersionsManifest;

// Lazily-resolvable raw prose for every stored version. Vite turns this into a
// map of dynamic importers, so per-version prose is fetched only when a diff is
// opened — it never bloats the initial bundle.
const contentLoaders = import.meta.glob('../data/versions/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>;

export const chapterNumbers = (): string[] => Object.keys(versions.chapters).sort();

export const versionsForChapter = (chapterNumber: string): ChapterVersion[] => {
  const padded = String(parseInt(chapterNumber, 10)).padStart(2, '0');
  return versions.chapters[padded]?.versions ?? [];
};

/** Load a single version's raw markdown by its content_ref ("NN/git-<sha>.md"). */
export const loadVersionContent = async (contentRef: string): Promise<string> => {
  const key = `../data/versions/${contentRef}`;
  const loader = contentLoaders[key];
  if (!loader) {
    throw new Error(`version content not found: ${contentRef}`);
  }
  return loader();
};
