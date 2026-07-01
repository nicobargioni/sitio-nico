import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Payloads internos de RSC para prefetch client-side (__next._tree.txt, etc).
      // El contenido real ya está en el HTML estático de cada ruta; esto solo
      // evita que Googlebot desperdicie crawl budget en duplicados.
      disallow: ["/*_rsc=*", "/*__next.*.txt"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
