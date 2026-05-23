import { chapterIllustrations, illustrationSheet, type ConceptFigure } from './ChapterIllustration';

export const InlineIllustration = ({
  figure,
  label,
  compact = false,
}: {
  figure: ConceptFigure;
  label: string;
  compact?: boolean;
}) => {
  const illustration = chapterIllustrations[figure.illustrationIndex % chapterIllustrations.length];

  return (
    <figure className={compact ? 'concept-figure compact' : 'concept-figure'}>
      <div
        className="oreilly-thumb"
        role="img"
        aria-label={`${illustration.subject} woodcut figure: ${figure.title}`}
        style={{
          backgroundImage: `url(${illustrationSheet})`,
          backgroundPosition: illustration.position,
        }}
      />
      <figcaption>
        <span>{label}</span>
        <strong>{figure.title}</strong>
        <p>{figure.body}</p>
      </figcaption>
    </figure>
  );
};
