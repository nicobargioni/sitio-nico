import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories } from "@/lib/taxonomy";
import { getPostMetas } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.url;
  const entries: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
  ];

  // Categorías y subcategorías (silos)
  for (const cat of categories) {
    entries.push({
      url: `${base}/${cat.slug}/`,
      changeFrequency: "weekly",
      priority: 0.8,
    });
    for (const sub of cat.subcategories) {
      entries.push({
        url: `${base}/${cat.slug}/${sub.slug}/`,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  // Posts dentro de su silo
  for (const p of getPostMetas()) {
    if (!p.category || !p.subcategory) continue;
    entries.push({
      url: `${base}/${p.category}/${p.subcategory}/${p.slug}/`,
      lastModified: p.date || undefined,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
