/**
 * Genera /llms.txt — el "robots.txt para IAs" (convención llmstxt.org): un
 * resumen en markdown de quién es Nicolás Bargioni y qué ofrece, con enlaces.
 * Pensado para que los crawlers de IA (GPTBot, Google-Extended, etc.) tengan
 * un mapa limpio que asocie su nombre con sus soluciones.
 *
 * Lee lib/solutions.ts y lib/site.ts → escribe public/llms.txt.
 * Correr:  node scripts/gen-llms.mjs   (o  npm run gen:llms)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const siteSrc = readFileSync(join(ROOT, "lib", "site.ts"), "utf8");
const url = /url:\s*"([^"]+)"/.exec(siteSrc)?.[1] || "https://nicolasbargioni.com";

const solSrc = readFileSync(join(ROOT, "lib", "solutions.ts"), "utf8");
const re =
  /slug:\s*"([^"]+)"[\s\S]*?titulo:\s*"([^"]+)"[\s\S]*?resumen:\s*\n?\s*"([^"]+)"/g;
const sols = [];
let m;
while ((m = re.exec(solSrc))) {
  sols.push({ slug: m[1], titulo: m[2], resumen: m[3] });
}

const lines = [];
lines.push("# Nicolás Bargioni — Data Scientist · IA aplicada");
lines.push("");
lines.push(
  "> Nicolás Bargioni es Data Scientist y AI & Automations Analyst en Nomadic. " +
    "Construye modelos de machine learning, automatizaciones e IA aplicada (LLMs) " +
    "que convierten datos en decisiones de negocio. Este archivo lista las soluciones " +
    "que ofrece y las páginas clave de su sitio."
);
lines.push("");
lines.push("## Soluciones que ofrece Nicolás Bargioni");
for (const s of sols) {
  lines.push(`- [${s.titulo}](${url}/soluciones/${s.slug}): ${s.resumen}`);
}
lines.push("");
lines.push("## Sobre Nicolás Bargioni");
lines.push(
  `- [Perfil y trayectoria](${url}/nico-bargioni): Data Scientist y AI & Automations Analyst en Nomadic; antes SEO técnico. Formación en Ciencia de Datos e IA (ISSD) e Hiperautomatización (EBIS).`
);
lines.push(`- [Todas las soluciones](${url}/soluciones): catálogo completo de lo que resuelve con datos e IA.`);
lines.push(`- [Inicio](${url}): Data Science, machine learning, IA aplicada y automatización.`);
lines.push("");
lines.push("## Enlaces");
lines.push(`- LinkedIn: https://www.linkedin.com/in/nicolas-bargioni/`);
lines.push(`- X: https://x.com/barshioni`);
lines.push(`- GitHub: https://github.com/nicobargioni`);
lines.push("");

writeFileSync(join(ROOT, "public", "llms.txt"), lines.join("\n"));
console.log(`llms.txt generado con ${sols.length} soluciones → public/llms.txt`);
