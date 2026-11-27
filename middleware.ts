/**
 * Vercel runs Routing Middleware only from the project's Root Directory.
 * This project has no Root Directory set, so Vercel builds from the repo root
 * (see ./vercel.json) and never saw website/middleware.ts. Without this file
 * aiepress.com served book 1's homepage, robots.txt and sitemap, and no
 * cross-domain redirect ran. The routing logic and its tests stay in website/.
 */
export { default } from './website/middleware';
