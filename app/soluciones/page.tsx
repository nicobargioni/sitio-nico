import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import SolutionCard from "@/app/components/SolutionCard";
import JsonLd from "@/app/components/JsonLd";
import { solutions } from "@/lib/solutions";
import { site } from "@/lib/site";
import { breadcrumbLd, itemListLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Soluciones — Qué resuelvo con datos e IA",
  description:
    "Soluciones concretas de ciencia de datos e IA aplicada para tu negocio: predecir demanda, retener clientes, detectar anomalías, automatizar tareas y más.",
  alternates: { canonical: `${site.url}/soluciones` },
};

export default function SolucionesPage() {
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Soluciones", path: "/soluciones" },
        ])}
      />
      <JsonLd
        data={itemListLd(
          "Soluciones",
          solutions.map((s) => ({ name: s.titulo, path: `/soluciones/${s.slug}` }))
        )}
      />

      <HeroSection>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Inicio
        </Link>
        <Reveal>
          <p className="eyebrow mb-4">Soluciones</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
            Qué resuelvo con datos e IA
          </h1>
          <p className="text-lg md:text-xl text-muted mt-6 max-w-2xl leading-relaxed">
            Sin tecnicismos: problemas concretos de negocio y cómo los ataco con
            ciencia de datos, machine learning y automatización. Si algo de esto te
            suena familiar, escribime.
          </p>
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={i * 60}>
              <SolutionCard s={s} />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 pt-10 border-t border-border">
            <p className="text-muted leading-relaxed mb-6 max-w-2xl">
              ¿Tu caso no está en la lista o no sabés bien por dónde empezar?
              Contame el problema y vemos si hay una solución de datos o IA atrás.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-coral text-coral font-medium hover:bg-coral hover:text-white transition-colors"
            >
              Contactame
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
