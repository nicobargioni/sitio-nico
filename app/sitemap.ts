import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories } from "@/lib/taxonomy";
import { getPostMetas } from "@/lib/posts";
import { solutions } from "@/lib/solutions";
import extraPages from "@/data/sitemap-extra.json";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const posts = getPostMetas();

  // lastmod derivado del contenido: la fecha del post más reciente del silo,
  // con fallback a la del post más reciente del sitio (señal de mantenimiento
  // para páginas estáticas/landings que no tienen fecha propia).
  const sortedDates = posts
    .map((p) => p.date)
    .filter(Boolean)
    .sort();
  const siteLastMod = sortedDates[sortedDates.length - 1] || undefined;
  const newestDate = (pred: (p: (typeof posts)[number]) => boolean) => {
    const ds = posts.filter(pred).map((p) => p.date).filter(Boolean).sort();
    return ds[ds.length - 1] || siteLastMod;
  };

  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: siteLastMod, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/nico-bargioni/`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/servicios/`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.95 },
    { url: `${base}/soluciones/`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog/`, lastModified: siteLastMod, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/mapa-del-sitio/`, lastModified: siteLastMod, changeFrequency: "monthly", priority: 0.3 },
  ];

  // Soluciones (páginas de negocio)
  for (const s of solutions) {
    entries.push({
      url: `${base}/soluciones/${s.slug}/`,
      lastModified: siteLastMod,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  // Categorías y subcategorías (silos)
  for (const cat of categories) {
    entries.push({
      url: `${base}/${cat.slug}/`,
      lastModified: newestDate((p) => p.category === cat.slug),
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const sub of cat.subcategories) {
      entries.push({
        url: `${base}/${cat.slug}/${sub.slug}/`,
        lastModified: newestDate(
          (p) => p.category === cat.slug && p.subcategory === sub.slug
        ),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Posts dentro de su silo
  for (const p of posts) {
    if (!p.category || !p.subcategory) continue;
    entries.push({
      url: `${base}/${p.category}/${p.subcategory}/${p.slug}/`,
      lastModified: p.date || undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  // Páginas extra detectadas por el crawler diario (data/sitemap-extra.json)
  const known = new Set(entries.map((e) => e.url));
  for (const p of extraPages as string[]) {
    const rel = p.startsWith("/") ? p : `/${p}`;
    const url = `${base}${rel.replace(/\/?$/, "/")}`;
    if (!known.has(url)) {
      entries.push({
        url,
        lastModified: siteLastMod,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  }

  return entries;
}
