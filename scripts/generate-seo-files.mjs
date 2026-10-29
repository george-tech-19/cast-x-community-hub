import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer, loadEnv } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mode = process.argv[2] ?? "production";
const env = loadEnv(mode, root, "");
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? env.NEXT_PUBLIC_SITE_URL;

if (!configuredSiteUrl) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is required. Set it to https://www.castxclothing.com in .env.local or your deployment environment.",
  );
}

const site = new URL(configuredSiteUrl);
if (!["http:", "https:"].includes(site.protocol) || site.pathname !== "/" || site.search || site.hash) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be an http(s) origin without a path, query, or fragment.");
}

const siteUrl = site.origin;
const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

const server = await createServer({
  root,
  mode,
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
});

try {
  const { products } = await server.ssrLoadModule("/src/lib/products.ts");
  const publicPaths = [
    "/",
    "/about",
    "/products",
    "/community",
    ...products.map(({ slug }) => `/product/${encodeURIComponent(slug)}`),
  ];
  const urls = publicPaths
    .map((route) => `  <url>\n    <loc>${escapeXml(new URL(route, `${siteUrl}/`).href)}</loc>\n  </url>`)
    .join("\n");
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  const robots = `User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`;
  const publicDirectory = path.join(root, "public");

  await mkdir(publicDirectory, { recursive: true });
  await Promise.all([
    writeFile(path.join(publicDirectory, "sitemap.xml"), sitemap),
    writeFile(path.join(publicDirectory, "robots.txt"), robots),
  ]);
} finally {
  await server.close();
}
