import { Head } from 'vite-react-ssg';
import { SITE_ORIGIN } from '../data/book';

/** Re-exported for back-compat; canonical home is `../data/book`. */
export { SITE_ORIGIN };

const DEFAULT_IMAGE = '/covers/from-copilot-to-colleague.png';

type SeoProps = {
  /** Full <title> text, including the " — From Copilot to Colleague" suffix. */
  title: string;
  description: string;
  /** Absolute path beginning with "/", e.g. "/read/03-harnesses". */
  path: string;
  /** Path or absolute URL to the OG/Twitter image. */
  image?: string;
  type?: 'book' | 'article' | 'website';
  /** When true, emit robots noindex (for internal dashboards not meant for search). */
  noindex?: boolean;
};

const absolute = (urlOrPath: string): string =>
  urlOrPath.startsWith('http') ? urlOrPath : `${SITE_ORIGIN}${urlOrPath}`;

/**
 * Per-page document head: title, description, canonical, Open Graph, Twitter.
 * Rendered into the static HTML at build time by vite-react-ssg's <Head>.
 */
export const Seo = ({ title, description, path, image = DEFAULT_IMAGE, type = 'website', noindex = false }: SeoProps) => {
  const url = `${SITE_ORIGIN}${path}`;
  const img = absolute(image);
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, follow" /> : null}
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />
    </Head>
  );
};
