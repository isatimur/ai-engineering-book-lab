import { bookDefinitionEntries } from '../data/geo';

/**
 * The extractable "what is this book" block — plain semantic markup (h2/dl),
 * server-rendered by vite-react-ssg, so both humans skimming the homepage and
 * AI answer engines crawling the static HTML get the exact same quotable
 * definition that also ships as FAQPage JSON-LD (`whatIsThisBookJsonLd`).
 */
export const DefinitionBlock = () => {
  const entries = bookDefinitionEntries();

  return (
    <section
      aria-label="What is this book"
      className="mt-16 pt-10 border-t border-white/10 max-w-2xl mx-auto"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/45 mb-4 text-center">
        Definition
      </p>
      <dl className="space-y-8">
        {entries.map(({ question, answer }) => (
          <div key={question}>
            <dt className="font-serif text-xl md:text-2xl text-white/90 mb-2">{question}</dt>
            <dd className="font-sans font-light text-sm md:text-base text-white/65 leading-relaxed">
              {answer}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};
