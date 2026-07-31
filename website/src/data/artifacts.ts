export type ArtifactLink = { label: string; href: string; external?: boolean };
export type ArtifactBadge = { src: string; alt: string; href: string };
export type Artifact = {
  label: string;
  headline: string;
  description: string;
  badge?: ArtifactBadge;
  links: ArtifactLink[];
};

export const ARTIFACTS: Artifact[] = [
  {
    label: 'claims-ledger · open source',
    headline: 'CI that fails when docs lie',
    description:
      'Same claim grammar as this book — now for your codebase. Every strong claim carries a verbatim quote anchor; stale pointers exit 11 in CI.',
    badge: {
      src: 'https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2Fisatimur%2Fclaims-ledger%2Fmain%2F.ledger%2Fbadge.json',
      alt: 'Claims verified badge',
      href: 'https://github.com/isatimur/claims-ledger',
    },
    links: [
      { label: 'Website', href: 'https://isatimur.github.io/claims-ledger/', external: true },
      { label: 'GitHub repo', href: 'https://github.com/isatimur/claims-ledger', external: true },
      { label: 'Fact-checked ledgers', href: '/ledgers' },
      {
        label: 'Fork sandbox',
        href: 'https://github.com/isatimur/claims-ledger-sandbox/fork',
        external: true,
      },
    ],
  },
  {
    label: 'book-mash · open source',
    headline: 'Turning "this chapter feels weak" into a number',
    description:
      'The multi-judge measurement engine that scores every chapter of this book — six independent judges, three craft dimensions, three epistemic dimensions. Generic enough for any manuscript with a book-mash.toml.',
    links: [
      { label: 'GitHub repo', href: 'https://github.com/isatimur/book-mash', external: true },
      { label: 'See it scored', href: '/quality' },
    ],
  },
  {
    label: 'ai-native-org · open source',
    headline: 'Chapter 9, turned into a running system',
    description:
      "The AI-Native Organization's three-plane design, built out as a real operating model for one operator running a fleet of agents — ship-gate, sentinel, claims ledger, all of it.",
    links: [
      { label: 'GitHub repo', href: 'https://github.com/isatimur/ai-native-org', external: true },
      { label: 'Live site', href: 'https://ai-native-org.vercel.app', external: true },
      { label: 'Read the chapter', href: '/read/09-ai-native-org' },
    ],
  },
];
