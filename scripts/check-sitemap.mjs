#!/usr/bin/env node
// Verificación diaria del mapa del sitio (/mapa-del-sitio).
//
// 1. Descubre TODAS las páginas del sitio en vivo: crawl de links internos
//    (BFS desde la home) ∪ las URLs declaradas en /sitemap.xml.
// 2. Lee las páginas listadas en /mapa-del-sitio.
// 3. Contrasta: si hay páginas alcanzables que NO están en el mapa, las agrega
//    a data/sitemap-extra.json (que la página incluye en el próximo build).
//
//   node scripts/check-sitemap.mjs        (usa SITE_URL o nicolasbargioni.com)
//
// Exit 1 si agregó páginas (para que la CI commitee + redeployee).
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const BASE = process.env.SITE_URL || "https://nicolasbargioni.com";
const ORIGIN = new URL(BASE).origin;
const MAX_PAGES = 2000;

// Rutas que NO deben entrar al sitemap (experimentales / técnicas).
const EXCLUDE = [/^\/lab(\/|$)/];
const ASSET_RE =
  /\.(png|jpe?g|gif|svg|webp|avif|ico|xml|json|txt|webmanifest|html|pdf|css|js|woff2?)$/i;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const EXTRA_FILE = path.join(__dirname, "..", "data", "sitemap-extra.json");

/** href → path canónico (leading slash, sin barra final, sin query/hash). */
function normalize(href, from) {
  let u;
  try {
    u = new URL(href, from);
  } catch {
    return null;
  }
  if (u.origin !== ORIGIN) return null;
  let p = decodeURI(u.pathname);
  if (p.length > 1) p = p.replace(/\/+$/, "");
  return p || "/";
}

function isCrawlable(p) {
  if (!p) return false;
  if (ASSET_RE.test(p)) return false;
  if (EXCLUDE.some((re) => re.test(p))) return false;
  return true;
}

async function fetchHtml(p) {
  const url = ORIGIN + (p === "/" ? "/" : p + "/");
  let res;
  try {
    res = await fetch(url, {
      headers: { "user-agent": "sitemap-check/1.0" },
      redirect: "follow",
    });
  } catch {
    return null;
  }
  const ct = res.headers.get("content-type") || "";
  if (!res.ok || !ct.includes("text/html")) return null;
  return await res.text();
}

function extractLinks(html, from) {
  const out = new Set();
  for (const m of html.matchAll(/href\s*=\s*["']([^"'#]+)["']/gi)) {
    const p = normalize(m[1], from);
    if (p && isCrawlable(p)) out.add(p);
  }
  return out;
}

async function crawl() {
  const seen = new Set(["/"]);
  const queue = ["/"];
  const reachable = new Set();
  while (queue.length && reachable.size < MAX_PAGES) {
    const p = queue.shift();
    const html = await fetchHtml(p);
    if (html == null) continue;
    reachable.add(p);
    for (const link of extractLinks(html, ORIGIN + p + "/")) {
      if (!seen.has(link)) {
        seen.add(link);
        queue.push(link);
      }
    }
  }
  return reachable;
}

async function sitemapXmlPaths() {
  let res;
  try {
    res = await fetch(ORIGIN + "/sitemap.xml");
  } catch {
    return [];
  }
  if (!res.ok) return [];
  const xml = await res.text();
  const out = [];
  for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/gi)) {
    const p = normalize(m[1], ORIGIN);
    if (p && isCrawlable(p)) out.push(p);
  }
  return out;
}

async function listedInSitemap() {
  const html = await fetchHtml("/mapa-del-sitio");
  if (!html) throw new Error("No pude leer /mapa-del-sitio en " + ORIGIN);
  return extractLinks(html, ORIGIN + "/mapa-del-sitio/");
}

const [crawled, xmlPaths, listed] = await Promise.all([
  crawl(),
  sitemapXmlPaths(),
  listedInSitemap(),
]);

const reachable = new Set([...crawled, ...xmlPaths]);
const missing = [...reachable].filter((p) => !listed.has(p)).sort();
const stale = [...listed].filter((p) => !reachable.has(p)).sort();

console.log(`Páginas alcanzables (crawl ∪ sitemap.xml): ${reachable.size}`);
console.log(`Listadas en /mapa-del-sitio: ${listed.size}`);
console.log(`Faltantes (alcanzables, no listadas): ${missing.length}`);
missing.forEach((p) => console.log("  + " + p));
if (stale.length) {
  console.log(`\nListadas pero no alcanzables (revisar manualmente): ${stale.length}`);
  stale.forEach((p) => console.log("  ? " + p));
}

if (missing.length) {
  let extra = [];
  try {
    extra = JSON.parse(readFileSync(EXTRA_FILE, "utf8"));
  } catch {
    /* archivo vacío o inexistente */
  }
  const merged = [...new Set([...extra, ...missing])].sort();
  writeFileSync(EXTRA_FILE, JSON.stringify(merged, null, 2) + "\n");
  console.log(
    `\nAgregadas ${missing.length} página(s) a data/sitemap-extra.json. ` +
      `Rebuild + deploy para publicarlas.`
  );
  process.exit(1);
}

console.log("\n✓ El mapa del sitio está completo. Nada que agregar.");
