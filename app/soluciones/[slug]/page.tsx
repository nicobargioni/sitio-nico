import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiCheck, FiArrowUpRight } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import ShareButtons from "@/app/components/ShareButtons";
import AskAiButtons from "@/app/components/AskAiButtons";
import JsonLd from "@/app/components/JsonLd";
import { SOLUTION_ICONS } from "@/app/components/SolutionCard";
import { solutions, getSolution } from "@/lib/solutions";
import { site } from "@/lib/site";
import { serviceLd, breadcrumbLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: `${s.titulo} — Soluciones con datos e IA`,
    description: s.resumen,
    alternates: { canonical: `${site.url}/soluciones/${s.slug}` },
    openGraph: { title: s.titulo, description: s.resumen, type: "article" },
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const path = `/soluciones/${s.slug}`;
  const Icon = SOLUTION_ICONS[s.icon];

  return (
    <article className="pb-24">
      <JsonLd data={serviceLd(s)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Soluciones", path: "/soluciones" },
          { name: s.titulo, path },
        ])}
      />

      <HeroSection>
        <Link
          href="/soluciones"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Soluciones
        </Link>
        <Reveal>
          {Icon && (
            <span className="grid place-items-center w-12 h-12 rounded-xl border border-border bg-bg text-cyan mb-5">
              <Icon size={20} />
            </span>
          )}
          <p className="eyebrow mb-4">Solución</p>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            {s.titulo}
          </h1>
          <p className="text-lg md:text-xl text-muted mt-6 max-w-2xl leading-relaxed">
            {s.dolor}
          </p>
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-2xl mx-auto">
        <section className="mt-14">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight mb-4">
              El problema
            </h2>
            <p className="text-muted leading-relaxed">{s.problema}</p>
          </Reveal>
        </section>

        <section className="mt-10">
          <Reveal>
            <div className="rounded-2xl border-l-2 border-coral bg-surface/40 px-6 py-5">
              <p className="font-mono text-[0.62rem] uppercase tracking-widest text-coral mb-2">
                Un ejemplo
              </p>
              <p className="text-fg/90 leading-relaxed">{s.ejemplo}</p>
            </div>
          </Reveal>
        </section>

        <section className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight mb-4">
              Cómo lo resuelvo
            </h2>
            <p className="text-muted leading-relaxed mb-8">{s.queHago}</p>
          </Reveal>
          <ol className="space-y-5">
            {s.proceso.map((p, i) => (
              <Reveal key={p.paso} delay={i * 70}>
                <li className="flex gap-4">
                  <span className="shrink-0 grid place-items-center w-8 h-8 rounded-full border border-cyan/40 text-cyan font-mono text-sm">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium text-fg">{p.paso}</p>
                    <p className="text-muted leading-relaxed mt-0.5">{p.detalle}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight mb-5">
              Qué obtenés
            </h2>
            <ul className="space-y-3">
              {s.resultados.map((r) => (
                <li key={r} className="flex gap-3">
                  <FiCheck className="shrink-0 mt-1 text-cyan" size={18} />
                  <span className="text-muted leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        <section className="mt-12">
          <Reveal>
            <h2 className="font-display text-2xl font-medium tracking-tight mb-4">
              ¿Es para vos?
            </h2>
            <p className="text-muted leading-relaxed mb-5">
              Probablemente te sirva si te pasa alguna de estas:
            </p>
            <ul className="space-y-3">
              {s.senales.map((r) => (
                <li key={r} className="flex gap-3">
                  <FiCheck className="shrink-0 mt-1 text-coral" size={18} />
                  <span className="text-muted leading-relaxed">{r}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 rounded-2xl border border-border bg-surface/40 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-2 mb-1.5">
                  Para quién
                </p>
                <p className="text-fg">{s.paraQuien}</p>
              </div>
              {s.prueba && (
                <Link
                  href={s.prueba.href}
                  className="shrink-0 inline-flex items-center gap-1 text-sm font-medium text-coral hover:text-cyan transition-colors"
                >
                  {s.prueba.label} <FiArrowUpRight size={14} />
                </Link>
              )}
            </div>
          </Reveal>
        </section>

        {/* CTA */}
        <section className="mt-12">
          <Reveal>
            <div className="rounded-2xl border border-cyan/30 bg-surface/40 p-7 text-center">
              <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight mb-2">
                ¿Te suena tu caso?
              </h2>
              <p className="text-muted leading-relaxed mb-6 max-w-md mx-auto">
                Contame tu situación y vemos juntos si esta solución encaja. Sin
                vueltas y sin compromiso.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-coral text-coral font-medium hover:bg-coral hover:text-white transition-colors"
              >
                Contactame
              </a>
            </div>
          </Reveal>
        </section>

        {/* Preguntar a una IA + compartir */}
        <AskAiButtons
          path={path}
          prompt="explica esta solución de datos e IA y para qué sirve"
          className="mt-10 max-w-2xl"
        />
        <div className="mt-8 pt-8 border-t border-border">
          <ShareButtons path={path} title={s.titulo} />
        </div>
      </div>
    </article>
  );
}
