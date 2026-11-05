import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import JsonLd from "@/app/components/JsonLd";
import Reveal from "@/app/components/Reveal";
import { abs, breadcrumbLd, researchCollectionLd } from "@/lib/jsonld";
import { NOMADIC_PROFILE, ORCID, ORCID_ID, doiUrl, studies } from "@/lib/research";

const description =
  "Publicaciones y estudios de Nicolás Bargioni, Head of Data en Nomadic: Top of AI: Estudio GEO Latam 2026 y Recommending Is Not Citing (2026), con DOI en Zenodo.";

export const metadata: Metadata = {
  title: "Investigación — Publicaciones y estudios",
  description,
  alternates: { canonical: abs("/investigacion") },
  openGraph: {
    title: "Investigación — Nicolás Bargioni",
    description,
    type: "website",
    url: abs("/investigacion"),
    images: ["/og/investigacion.png"],
  },
};

export default function ResearchIndex() {
  return (
    <div className="pb-24">
      <JsonLd data={researchCollectionLd(studies)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Investigación", path: "/investigacion" },
        ])}
      />

      <HeroSection>
        <p className="eyebrow mb-4">Investigación</p>
        <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
          Publicaciones y estudios
        </h1>
        <p className="text-lg md:text-xl text-muted mt-6 max-w-3xl leading-relaxed">
          Nicolás Bargioni es{" "}
          <a
            href={NOMADIC_PROFILE}
            target="_blank"
            rel="noopener"
            className="text-fg underline underline-offset-4 decoration-cyan/50 hover:text-cyan"
          >
            Head of Data en Nomadic
          </a>{" "}
          (Buenos Aires) y publicó los estudios Top of AI (2026) y Recommending Is
          Not Citing (2026), ambos con DOI en Zenodo.
        </p>
        <p className="font-mono text-xs text-muted-2 mt-6">
          ORCID{" "}
          <a href={ORCID} target="_blank" rel="noopener" className="hover:text-cyan underline underline-offset-2">
            {ORCID_ID}
          </a>
        </p>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto mt-16">
        <p className="text-muted leading-relaxed max-w-3xl mb-10">
          En cada página dejo un resumen propio en castellano: qué pregunta respondí,
          qué encontré, qué significa y sus límites. La versión de referencia de cada
          trabajo es la publicada con DOI.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {studies.map((s, i) => (
            <Reveal key={s.slug} delay={i * 80}>
              <article className="h-full flex flex-col rounded-2xl border border-border bg-surface/40 p-7 hover:border-cyan/40 transition-colors">
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-cyan mb-3">
                  {s.kind} · {s.dateLabel}
                </p>
                <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight break-words">
                  <Link href={`/investigacion/${s.slug}`} className="hover:text-cyan transition-colors">
                    {s.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-2 mt-2">
                  {s.authors.map((a) => a.name).join(" y ")}
                </p>
                <p className="text-muted leading-relaxed mt-4">{s.excerpt}</p>
                <div className="mt-auto pt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link
                    href={`/investigacion/${s.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-coral hover:text-coral-soft transition-colors"
                  >
                    Leer el resumen <FiArrowUpRight size={15} />
                  </Link>
                  <a
                    href={doiUrl(s.doi)}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-1 font-mono text-xs text-muted hover:text-cyan transition-colors break-all"
                  >
                    DOI {s.doi} <FiExternalLink size={12} />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <p className="text-sm text-muted mt-12">
          Más sobre mi trabajo y trayectoria en{" "}
          <Link href="/sobre-mi" className="text-cyan hover:text-coral underline underline-offset-2">
            Sobre mí
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
