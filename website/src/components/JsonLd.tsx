import { Head } from 'vite-react-ssg';

/**
 * Emits a schema.org JSON-LD block into the document head at build time.
 * Every "<" is escaped to its unicode form so no string field can
 * prematurely close the script tag. Pass one node object or an array.
 */
export const JsonLd = ({ data }: { data: object | object[] }) => {
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return (
    <Head>
      <script type="application/ld+json">{json}</script>
    </Head>
  );
};
