import type { RouteRecord } from 'vite-react-ssg';
import { Outlet } from 'react-router-dom';
import { Catalogue } from './pages/Catalogue';
import { VisualGuide } from './pages/VisualGuide';
import { Reader } from './pages/Reader';
import { Versions } from './pages/Versions';
import { Quality } from './pages/Quality';
import { ChapterDetail } from './pages/ChapterDetail';
import { ConceptDetail } from './pages/ConceptDetail';
import { MapDetail } from './pages/MapDetail';
import { chapters, chapterParam } from './data/bookChapters';
import { manifest } from './lib/manifest';

const Root = () => <Outlet />;

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
      {
        path: 'read/:slug',
        element: <ChapterDetail />,
        getStaticPaths: () => chapters.map((c) => `read/${chapterParam(c)}`),
      },
      { path: 'versions', element: <Versions /> },
      { path: 'quality', element: <Quality /> },
      { path: '*', element: <Catalogue /> },
    ],
  },
];
