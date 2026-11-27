/**
 * Vercel Routing Middleware: one build, two sites.
 *
 *   fromcopilottocolleague.com  book 1: its homepage, reader, guide, ledgers
 *   aiepress.com                the press homepage, /books, books 2 and 3
 *
 * vercel.json rewrites cannot do this: they run after the filesystem check,
 * and "/" always matches index.html. Middleware runs first.
 *
 * A page that arrives at the wrong domain gets a permanent redirect to the
 * right one, so every page has exactly one public URL. Preview and local
 * hosts pass through untouched. Keep the path lists in step with
 * src/data/book.ts.
 */

const BOOK_HOST = 'fromcopilottocolleague.com';
const PRESS_HOST = 'aiepress.com';
const PRESS_HOME_PATH = '/press';
const PRESS_PATH_PREFIXES = [PRESS_HOME_PATH, '/books', '/second-book', '/third-book'];

const isPressPath = (path: string): boolean =>
  PRESS_PATH_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));

// Static files (scripts, covers, fonts, llms.txt) are served on both hosts.
const isFile = (path: string): boolean => /\.[a-z0-9]+$/i.test(path);

const PRESS_FILES: Record<string, string> = {
  '/robots.txt': '/robots-press.txt',
  '/sitemap.xml': '/sitemap-press.xml',
  '/llms.txt': '/llms-press.txt',
};

const passThrough = () => new Response(null, { headers: { 'x-middleware-next': '1' } });

const rewriteTo = (url: URL, path: string) =>
  new Response(null, { headers: { 'x-middleware-rewrite': new URL(path, url).toString() } });

const redirectTo = (host: string, path: string, search: string) =>
  Response.redirect(`https://${host}${path}${search}`, 308);

export default function middleware(request: Request): Response {
  const url = new URL(request.url);
  const host = (request.headers.get('host') ?? url.host).toLowerCase().split(':')[0];
  const path = url.pathname;

  if (host === PRESS_HOST) {
    if (path === '/') return rewriteTo(url, PRESS_HOME_PATH);
    if (path === PRESS_HOME_PATH) return redirectTo(PRESS_HOST, '/', url.search);
    if (PRESS_FILES[path]) return rewriteTo(url, PRESS_FILES[path]);
    if (isPressPath(path) || isFile(path)) return passThrough();
    return redirectTo(BOOK_HOST, path, url.search);
  }

  if (host === BOOK_HOST) {
    if (path === PRESS_HOME_PATH) return redirectTo(PRESS_HOST, '/', url.search);
    if (isPressPath(path)) return redirectTo(PRESS_HOST, path, url.search);
  }

  return passThrough();
}
