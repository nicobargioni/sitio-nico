import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import JsonLd from "@/app/components/JsonLd";
import { getSitePages } from "@/lib/site-pages";
import { breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Mapa del sitio",
  description:
    "Todas las páginas de nicolasbargioni.com: soluciones, temas de datos e IA, notas del blog y más.",
  alternates: { canonical: "/mapa-del-sitio" },
};

export default function SitemapPage() {
  const groups = getSitePages();
  const total = groups.reduce((n, g) => n + g.pages.length, 0);

  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Mapa del sitio", path: "/mapa-del-sitio" },
        ])}
      />

      <HeroSection>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Inicio
        </Link>
        <Reveal>
          <p className="eyebrow mb-4">Mapa del sitio</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
            Todas las páginas
          </h1>
          <p className="text-lg md:text-xl text-muted mt-6 max-w-2xl leading-relaxed">
            {total} páginas: soluciones de negocio, temas de datos e IA, y todas
            las notas del blog.
          </p>
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
          {groups.map((group, i) => (
            <Reveal key={group.title} delay={Math.min(i, 6) * 50}>
              <section>
                <h2 className="font-display text-lg font-medium tracking-tight mb-4 pb-3 border-b border-border">
                  {group.title}{" "}
                  <span className="font-mono text-xs text-muted-2">
                    ({group.pages.length})
                  </span>
                </h2>
                <ul className="flex flex-col gap-2.5">
                  {group.pages.map((page) => (
                    <li key={page.url}>
                      <Link
                        href={page.url}
                        className="text-sm text-muted hover:text-cyan transition-colors"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
