import { categories } from "./taxonomy";
import { solutions } from "./solutions";
import { getPostMetas, postUrl } from "./posts";
import extraPages from "../data/sitemap-extra.json";

export type SitePage = { url: string; label: string };
export type PageGroup = { title: string; pages: SitePage[] };

/**
 * Fuente única del mapa del sitio. Se arma desde los mismos datos que generan
 * las rutas (taxonomy + solutions + posts), así no puede desincronizarse de las
 * páginas reales. `data/sitemap-extra.json` lo completa con páginas que detecte
 * el crawler diario (scripts/check-sitemap.mjs).
 */
export function getSitePages(): PageGroup[] {
  const groups: PageGroup[] = [];

  groups.push({
    title: "Principales",
    pages: [
      { url: "/", label: "Inicio" },
      { url: "/nico-bargioni", label: "Sobre mí" },
      { url: "/servicios", label: "Servicios" },
      { url: "/soluciones", label: "Soluciones" },
      { url: "/blog", label: "Blog" },
      { url: "/mapa-del-sitio", label: "Mapa del sitio" },
    ],
  });

  groups.push({
    title: "Soluciones",
    pages: solutions.map((s) => ({
      url: `/soluciones/${s.slug}`,
      label: s.titulo,
    })),
  });

  for (const cat of categories) {
    const pages: SitePage[] = [{ url: `/${cat.slug}`, label: cat.name }];
    for (const sub of cat.subcategories) {
      pages.push({ url: `/${cat.slug}/${sub.slug}`, label: sub.name });
    }
    groups.push({ title: cat.name, pages });
  }

  groups.push({
    title: "Notas del blog",
    pages: getPostMetas()
      .filter((p) => p.category && p.subcategory)
      .map((p) => ({ url: postUrl(p), label: p.title })),
  });

  const extras = (extraPages as string[]).filter(Boolean);
  if (extras.length) {
    groups.push({
      title: "Otras páginas",
      pages: extras.map((u) => ({ url: u, label: u })),
    });
  }

  return groups;
}

/** Lista plana de paths (con leading slash, sin barra final) para diffs. */
export function getAllPaths(): string[] {
  return getSitePages().flatMap((g) => g.pages.map((p) => p.url));
}
