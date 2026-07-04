import { InlineText } from './InlineText';
import { ListenWordRun } from './ListenWordRun';

type Props = {
  block: string;
  chapterNumber?: string;
  listen?: boolean;
};

export const MarkdownBlock = ({ block, listen = false }: Props) => {
  if (block.startsWith('# ')) {
    return (
      <h1>
        <ListenWordRun text={block.replace(/^#\s+/, '')} listen={listen} />
      </h1>
    );
  }
  if (block.startsWith('## ')) {
    return (
      <h2>
        <ListenWordRun text={block.replace(/^##\s+/, '')} listen={listen} />
      </h2>
    );
  }
  if (block.startsWith('### ')) {
    return (
      <h3>
        <ListenWordRun text={block.replace(/^###\s+/, '')} listen={listen} />
      </h3>
    );
  }

  if (block.startsWith('> ')) {
    return (
      <blockquote>
        <InlineText text={block.replace(/^>\s?/gm, '')} listen={listen} />
      </blockquote>
    );
  }
  if (/^- /.test(block)) {
    return (
      <ul>
        {block.split('\n').map((item) => (
          <li key={item}>
            <InlineText text={item.replace(/^-\s+/, '')} listen={listen} />
          </li>
        ))}
      </ul>
    );
  }
  if (/^\d+\. /.test(block)) {
    return (
      <ol>
        {block.split('\n').map((item) => (
          <li key={item}>
            <InlineText text={item.replace(/^\d+\.\s+/, '')} listen={listen} />
          </li>
        ))}
      </ol>
    );
  }
  return (
    <p>
      <InlineText text={block.replace(/\n/g, ' ')} listen={listen} />
    </p>
  );
};
