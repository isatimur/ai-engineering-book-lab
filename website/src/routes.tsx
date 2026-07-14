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

import { SettingsProvider, AppLayout } from './context/SettingsContext';

const Root = () => (
  <SettingsProvider>
    <AppLayout>
      <Outlet />
    </AppLayout>
  </SettingsProvider>
);

// getStaticPaths returns paths relative to the root route ('/'), per vite-react-ssg.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Catalogue /> },
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
