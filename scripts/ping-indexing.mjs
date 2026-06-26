/**
 * Notifica a Google (Web Search Indexing API) que crawlee/actualice URLs.
 * Lee la clave de la service account desde la variable de entorno
 * GOOGLE_APPLICATION_CREDENTIALS (ruta a un JSON que NO se versiona).
 *
 * Uso:
 *   export GOOGLE_APPLICATION_CREDENTIALS="$HOME/.secrets/indexing-sa.json"
 *   node scripts/ping-indexing.mjs https://nicolasbargioni.com/soluciones/   # URLs puntuales
 *   node scripts/ping-indexing.mjs --all                                     # todas las del sitemap
 *
 * Cuota por defecto de la API: 200 URLs/día.
 */
import { readFileSync } from "node:fs";
import crypto from "node:crypto";

const SITEMAP = "https://nicolasbargioni.com/sitemap.xml";

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

async function getUrls() {
  const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (args.length) return args;
  const xml = await (await fetch(SITEMAP)).text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const token = await getToken();
let urls = await getUrls();
if (urls.length > 200) {
  console.warn(`⚠ ${urls.length} URLs; la cuota diaria es 200. Pineo las primeras 200.`);
  urls = urls.slice(0, 200);
}

let ok = 0,
  fail = 0;
for (const url of urls) {
  const res = await fetch("https://indexing.googleapis.com/v3/urlNotifications:publish", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ url, type: "URL_UPDATED" }),
  });
  if (res.ok) {
    ok++;
    console.log("✓", url);
  } else {
    fail++;
    console.log("✗", res.status, url, (await res.text()).slice(0, 140));
  }
}
console.log(`\nListo: ${ok} ok · ${fail} con error.`);
