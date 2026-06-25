/**
 * Genera imágenes Open Graph (1200×630) con branding para cada página clave:
 * soluciones, posts del blog y landings. Se rasterizan con sharp y se wirean
 * en la metadata de cada página (openGraph.images).
 *
 * Salida: public/og/<id>.png  →  www.nicolasbargioni.com/og/<id>.png
 * Correr:  node scripts/gen-og.mjs   (o  npm run gen:og)
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "og");
const FONT = "Helvetica, Arial, sans-serif";
const W = 1200,
  H = 630,
  PAD = 80;

const CAT = {
  "data-ml": "Data & ML",
  "ia-agentes": "IA & Agentes",
  hiperautomatizacion: "Hiperautomatización",
  cloud: "Cloud",
};

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(text, max) {
  const w = text.split(/\s+/);
  const out = [];
  let cur = "";
  for (const x of w) {
    if ((cur + " " + x).trim().length > max) {
      if (cur) out.push(cur.trim());
      cur = x;
    } else cur = (cur + " " + x).trim();
  }
  if (cur) out.push(cur.trim());
  return out;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function svg(eyebrow, title, seed) {
  const dots = Array.from({ length: 8 }, (_, i) => {
    const k = hash(seed + i);
    return { x: 760 + (k % 380), y: 70 + ((k >> 7) % 360), r: 3 + ((k >> 3) % 6), coral: i % 3 === 0 };
  });
  const lines = dots
    .map((d, i) =>
      i > 0
        ? `<line x1="${dots[i - 1].x}" y1="${dots[i - 1].y}" x2="${d.x}" y2="${d.y}" stroke="#1c3147" stroke-width="1.5"/>`
        : ""
    )
    .join("");
  const nodes = dots
    .map((d) => `<circle cx="${d.x}" cy="${d.y}" r="${d.r}" fill="${d.coral ? "#FF6B3D" : "#22D3EE"}" opacity="0.85"/>`)
    .join("");

  const tl = wrap(title, 26).slice(0, 3);
  const lh = 76;
  const startY = 300 - ((tl.length - 1) * lh) / 2;
  const titleSvg = tl
    .map(
      (l, i) =>
        `<text x="${PAD}" y="${startY + i * lh}" font-family="${FONT}" font-size="62" font-weight="700" fill="#F5F7FA">${esc(l)}</text>`
    )
    .join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070B14"/><stop offset="1" stop-color="#0B1322"/>
    </linearGradient>
    <pattern id="dots" width="46" height="46" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="#13203250"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.5"/>
  <g opacity="0.55">${lines}${nodes}</g>
  <text x="${PAD}" y="130" font-family="${FONT}" font-size="24" font-weight="700" letter-spacing="5" fill="#22D3EE">${esc(eyebrow)}</text>
  ${titleSvg}
  <rect x="${PAD}" y="${startY + tl.length * lh - 6}" width="90" height="5" rx="2.5" fill="#FF6B3D"/>
  <text x="${PAD}" y="560" font-family="${FONT}" font-size="26" font-weight="700" fill="#F5F7FA">Nicolás Bargioni</text>
  <text x="${PAD}" y="596" font-family="${FONT}" font-size="22" fill="#9BB0C9">Data Scientist · IA aplicada</text>
  <text x="${W - PAD}" y="560" text-anchor="end" font-family="${FONT}" font-size="24" font-weight="700" fill="#22D3EE">nicolasbargioni.com</text>
</svg>`;
}

async function render(id, eyebrow, title) {
  const png = await sharp(Buffer.from(svg(eyebrow, title, id))).png().toBuffer();
  writeFileSync(join(OUT, `${id}.png`), png);
}

mkdirSync(OUT, { recursive: true });
let n = 0;

// Soluciones
const solSrc = readFileSync(join(ROOT, "lib", "solutions.ts"), "utf8");
const reSol = /slug:\s*"([^"]+)"[\s\S]*?titulo:\s*"([^"]+)"/g;
let m;
while ((m = reSol.exec(solSrc))) {
  await render(`sol-${m[1]}`, "SOLUCIÓN · DATOS & IA", m[2]);
  n++;
}

// Posts del blog
const BLOG = join(ROOT, "content", "blog");
for (const f of readdirSync(BLOG).filter((x) => x.endsWith(".md"))) {
  const t = readFileSync(join(BLOG, f), "utf8");
  const title = /title:\s*"([^"]+)"/.exec(t)?.[1] || f.replace(/\.md$/, "");
  const cat = /category:\s*"([^"]+)"/.exec(t)?.[1] || "";
  await render(`post-${f.replace(/\.md$/, "")}`, `BLOG · ${(CAT[cat] || "Nicolás Bargioni").toUpperCase()}`, title);
  n++;
}

// Landings
await render("home", "DATA SCIENCE · ML · IA", "Nicolás Bargioni — Data Scientist e IA aplicada");
await render("soluciones", "SOLUCIONES · DATOS & IA", "Qué resuelvo con datos e inteligencia artificial");
await render("blog", "BLOG · DATOS & IA", "Notas sobre datos, IA y automatización");
await render("nico-bargioni", "SOBRE MÍ", "Nicolás Bargioni — Data Scientist · IA aplicada");
n += 4;

console.log(`${n} imágenes OG (1200×630) generadas → public/og/`);
