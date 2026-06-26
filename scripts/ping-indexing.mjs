/**
 * Notifica a Google (Web Search Indexing API) que crawlee/actualice URLs.
 * Lee la clave de la service account desde GOOGLE_APPLICATION_CREDENTIALS.
 *
 * Modos:
 *   node scripts/ping-indexing.mjs <url> [<url>...]   # URLs puntuales
 *   node scripts/ping-indexing.mjs --all              # todas las del sitemap (máx 200/día)
 *   node scripts/ping-indexing.mjs --new              # solo las que no se pinearon antes (cron)
 *   node scripts/ping-indexing.mjs --seed             # marca el sitemap actual como conocido, sin pinear
 *
 * Estado (URLs ya notificadas): ~/.secrets/indexed-state.json (override con INDEX_STATE).
 * Cuota por defecto de la API: 200 URLs/día.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import crypto from "node:crypto";

const SITEMAP = "https://nicolasbargioni.com/sitemap.xml";
const STATE = process.env.INDEX_STATE || join(homedir(), ".secrets", "indexed-state.json");

const keyPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
if (!keyPath) {
  console.error("✗ Falta GOOGLE_APPLICATION_CREDENTIALS (ruta al JSON de la service account).");
  process.exit(1);
}
const sa = JSON.parse(readFileSync(keyPath, "utf8"));

const b64url = (b) =>
  Buffer.from(b).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

async function getToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const signer = crypto.createSign("RSA-SHA256");
  signer.update(`${header}.${claim}`);
  const jwt = `${header}.${claim}.${b64url(signer.sign(sa.private_key))}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  const j = await res.json();
  if (!j.access_token) throw new Error("No se obtuvo token: " + JSON.stringify(j));
  return j.access_token;
}

async function sitemapUrls() {
  const xml = await (await fetch(SITEMAP)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

function loadState() {
  try {
    return new Set(JSON.parse(readFileSync(STATE, "utf8")));
  } catch {
    return new Set();
  }
}
const saveState = (set) => writeFileSync(STATE, JSON.stringify([...set]));

const flags = process.argv.slice(2).filter((a) => a.startsWith("--"));
const explicit = process.argv.slice(2).filter((a) => !a.startsWith("--"));

// --seed: marca el sitemap actual como ya conocido, sin notificar nada.
if (flags.includes("--seed")) {
  const u = await sitemapUrls();
  saveState(new Set(u));
  console.log(`Estado sembrado: ${u.length} URLs marcadas como conocidas (no se pineó nada).`);
  process.exit(0);
}

let list;
if (explicit.length) list = explicit;
else if (flags.includes("--all")) list = await sitemapUrls();
else if (flags.includes("--new")) {
  const state = loadState();
  list = (await sitemapUrls()).filter((u) => !state.has(u));
} else {
  console.error("Uso: ping-indexing.mjs <url...> | --all | --new | --seed");
  process.exit(1);
}

if (list.length === 0) {
  console.log("Nada nuevo para pinear.");
  process.exit(0);
}
if (list.length > 200) {
  console.warn(`⚠ ${list.length} URLs; la cuota diaria es 200. Pineo las primeras 200.`);
  list = list.slice(0, 200);
}

const token = await getToken();
const state = loadState();
let ok = 0,
  fail = 0;
for (const url of list) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  if (res.ok) {
    ok++;
    state.add(url);
    console.log("✓", url);
  } else {
    fail++;
    console.log("✗", res.status, url, (await res.text()).slice(0, 140));
  }
}
saveState(state);
console.log(`\nListo: ${ok} ok · ${fail} con error.`);
