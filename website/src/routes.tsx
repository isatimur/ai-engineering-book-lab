import type { RouteRecord } from 'vite-react-ssg';
import { Outlet } from 'react-router-dom';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';
import { Versions } from './pages/Versions';
import { Quality } from './pages/Quality';
import { Search } from './pages/Search';
import { Assess } from './pages/Assess';
import { Enterprise } from './pages/Enterprise';
import { Workshop } from './pages/Workshop';
import { ChapterDetail } from './pages/ChapterDetail';
import { Books } from './pages/Books';
import { Press } from './pages/Press';
import { EvidenceGraphPage } from './pages/EvidenceGraphPage';
import { EvidenceReference } from './pages/EvidenceReference';
import { LedgersIndexPage } from './pages/LedgersIndexPage';
import { EventLedgerPage } from './pages/EventLedgerPage';
import { eventLedgerSlugs } from './lib/eventLedgers';
import { ConceptDetail } from './pages/ConceptDetail';
import { MapDetail } from './pages/MapDetail';
import { chapters, chapterParam } from './data/bookChapters';
import { SpadeHero } from './pages/SpadeHero';
import { manifest } from './lib/manifest';
import { SecondBookReader } from './pages/SecondBookReader';
import { SecondBookChapterDetail, secondBookChapterStaticPaths } from './pages/SecondBookChapterDetail';
import { ThirdBookReader } from './pages/ThirdBookReader';
import { ThirdBookChapterDetail, thirdBookChapterStaticPaths } from './pages/ThirdBookChapterDetail';

import { SettingsProvider, AppLayout } from './context/SettingsContext';
import { PRESS_ORIGIN } from './data/book';

const PRESS_HOST = new URL(PRESS_ORIGIN).hostname;

const Root = () => (
  <SettingsProvider>
    <AppLayout>
      <Outlet />
    </AppLayout>
  </SettingsProvider>
);

/**
 * "/" is two pages. On aiepress.com the middleware serves press.html at "/",
 * but the address stays "/", so the browser's router must also pick the press
 * page there. Otherwise it hydrates book 1's homepage over the press markup
 * (React #418) and the visitor sees the wrong site. The build has no window
 * and renders book 1, which is what index.html should hold.
 */
export const homeFor = (hostname: string | undefined) =>
  hostname === PRESS_HOST ? <Press /> : <Catalogue />;

const Home = () => homeFor(typeof window === 'undefined' ? undefined : window.location.hostname);

// getStaticPaths returns paths relative to the root route ('/'), per vite-react-ssg.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: 'visual-guide', element: <VisualGuide /> },
      {
        path: 'visual-guide/concepts/:slug',
        element: <ConceptDetail />,
        getStaticPaths: () => manifest.concepts.map((c) => `visual-guide/concepts/${c.id}`),
      },
      {
        path: 'visual-guide/maps/:slug',
        element: <MapDetail />,
        getStaticPaths: () => manifest.maps.map((m) => `visual-guide/maps/${m.id}`),
      },
      { path: 'read', element: <Reader /> },
      { path: 'books', element: <Books /> },
      // The press homepage. vercel.json serves it at aiepress.com/.
      { path: 'press', element: <Press /> },
      { path: 'read/graph', element: <EvidenceGraphPage /> },
      { path: 'evidence', element: <EvidenceReference /> },
      { path: 'ledgers', element: <LedgersIndexPage /> },
      {
        path: 'ledgers/:slug',
        element: <EventLedgerPage />,
        getStaticPaths: () => eventLedgerSlugs().map((slug) => `ledgers/${slug}`),
      },
      {
        path: 'read/:slug',
        element: <ChapterDetail />,
        getStaticPaths: () => chapters.map((c) => `read/${chapterParam(c)}`),
      },
      // Second book — reading + evidence rail only (no diagrams, audiobook,
      // or judge scores yet; see programs/second_book_website_wiring.md).
      // Not in the top nav, but the Catalogue (Books.tsx) links here with a
      // visible card, so these routes are public. (This comment used to say
      // "direct-URL only"; that stopped being true when /books shipped.)
      { path: 'second-book', element: <SecondBookReader /> },
      {
        path: 'second-book/:slug',
        element: <SecondBookChapterDetail />,
        getStaticPaths: secondBookChapterStaticPaths,
      },
      // Third book — reading only (no evidence file, diagrams, audiobook, or
      // judge scores yet). The track is empty until Chapter 1 lands.
      // Not in the top nav, but the Catalogue (Books.tsx) links here with a
      // visible card, so these routes are public.
      { path: 'third-book', element: <ThirdBookReader /> },
      {
        path: 'third-book/:slug',
        element: <ThirdBookChapterDetail />,
        getStaticPaths: thirdBookChapterStaticPaths,
      },
      { path: 'versions', element: <Versions /> },
      { path: 'quality', element: <Quality /> },
      { path: 'search', element: <Search /> },
      { path: 'assess', element: <Assess /> },
      { path: 'enterprise', element: <Enterprise /> },
      { path: 'workshop', element: <Workshop /> },
      { path: 'spade-hero', element: <SpadeHero /> },
      { path: '*', element: <Catalogue /> },
    ],
  },
];
