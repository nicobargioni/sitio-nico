/**
 * Generador de creatividades para Instagram Stories (1080×1920) — una por
 * solución. Lee lib/solutions.ts, arma un SVG con el branding del sitio y lo
 * rasteriza a PNG con sharp (usa fuentes del sistema; texto incluido).
 *
 * Salida: public/historias/<slug>.png  →  se publican en
 * nicolasbargioni.com/historias/<slug>.png y se suben a Publer.
 *
 * Correr:  node scripts/gen-stories.mjs   (o  npm run gen:stories)
 *
 * Nota: Instagram NO permite agregar el "link sticker" por API. La imagen se
 * auto-publica; el link a la solución se pega a mano en 1 clic (por eso la
 * creatividad dice "link en la historia ↓").
 */
import sharp from "sharp";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "historias");

// ── Datos: extraídos de lib/solutions.ts (slug → titulo → dolor, en ese orden) ──
const src = readFileSync(join(ROOT, "lib", "solutions.ts"), "utf8");
const re =
  /slug:\s*"([^"]+)"[\s\S]*?titulo:\s*"([^"]+)"[\s\S]*?dolor:\s*"([^"]+)"/g;
const sols = [];
let m;
while ((m = re.exec(src))) sols.push({ slug: m[1], titulo: m[2], dolor: m[3] });

// ── Helpers ──
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function wrap(text, max) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > max) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur.trim());
  return lines;
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

const W = 1080;
const H = 1920;
const PAD = 96;
const FONT = "Helvetica, Arial, sans-serif";

function svg({ slug, titulo, dolor }) {
  // constelación determinista (motivo "embedding" del sitio)
  const dots = Array.from({ length: 9 }, (_, i) => {
    const k = hash(slug + i);
    return {
      x: 60 + (k % (W - 120)),
      y: 120 + ((k >> 7) % 520),
      r: 3 + ((k >> 3) % 6),
      coral: i % 3 === 0,
    };
  });
  const lines = dots
    .map((d, i) =>
      i > 0
        ? `<line x1="${dots[i - 1].x}" y1="${dots[i - 1].y}" x2="${d.x}" y2="${d.y}" stroke="#1c3147" stroke-width="1.5"/>`
        : ""
    )
    .join("");
  const nodes = dots
    .map(
      (d) =>
        `<circle cx="${d.x}" cy="${d.y}" r="${d.r}" fill="${d.coral ? "#FF6B3D" : "#22D3EE"}" opacity="0.85"/>`
    )
    .join("");

  // título (grande) y dolor (mediano), con wrap
  const tLines = wrap(titulo, 19);
  const dLines = wrap(dolor, 38);
  const tStart = 760;
  const tLH = 92;
  const titleSvg = tLines
    .map(
      (l, i) =>
        `<text x="${PAD}" y="${tStart + i * tLH}" font-family="${FONT}" font-size="78" font-weight="700" fill="#F5F7FA">${esc(l)}</text>`
    )
    .join("");
  const dStart = tStart + tLines.length * tLH + 54;
  const dLH = 58;
  const dolorSvg = dLines
    .map(
      (l, i) =>
        `<text x="${PAD}" y="${dStart + i * dLH}" font-family="${FONT}" font-size="40" font-weight="400" fill="#9BB0C9">${esc(l)}</text>`
    )
    .join("");
  const lineY = dStart + dLines.length * dLH + 36;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#070B14"/>
      <stop offset="1" stop-color="#0B1322"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.2" cy="0.28" r="0.6">
      <stop offset="0" stop-color="#0e2438" stop-opacity="0.9"/>
      <stop offset="1" stop-color="#070B14" stop-opacity="0"/>
    </radialGradient>
    <pattern id="dots" width="48" height="48" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="2" fill="#13203250"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#dots)" opacity="0.5"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <g opacity="0.5">${lines}${nodes}</g>

  <!-- eyebrow -->
  <text x="${PAD}" y="300" font-family="${FONT}" font-size="30" font-weight="700" letter-spacing="6" fill="#22D3EE">SOLUCIONES · DATOS &amp; IA</text>

  <!-- título + dolor -->
  ${titleSvg}
  ${dolorSvg}

  <!-- acento -->
  <rect x="${PAD}" y="${lineY}" width="120" height="6" rx="3" fill="#FF6B3D"/>

  <!-- footer -->
  <text x="${PAD}" y="1700" font-family="${FONT}" font-size="34" font-weight="700" fill="#F5F7FA">Nicolás Bargioni</text>
  <text x="${PAD}" y="1748" font-family="${FONT}" font-size="28" font-weight="400" fill="#9BB0C9">Data Scientist · IA aplicada</text>
  <text x="${PAD}" y="1828" font-family="${FONT}" font-size="30" font-weight="700" fill="#FF6B3D">Consultame  ·  link en la historia ↓</text>
  <text x="${W - PAD}" y="1700" text-anchor="end" font-family="${FONT}" font-size="30" font-weight="700" fill="#22D3EE">⟫ nicolasbargioni.com</text>
</svg>`;
}

mkdirSync(OUT, { recursive: true });
let n = 0;
for (const s of sols) {
  const png = await sharp(Buffer.from(svg(s))).png().toBuffer();
  writeFileSync(join(OUT, `${s.slug}.png`), png);
  n++;
  console.log(`  ✓ historias/${s.slug}.png`);
}
console.log(`\n${n} creatividades generadas (1080×1920) en public/historias/`);
