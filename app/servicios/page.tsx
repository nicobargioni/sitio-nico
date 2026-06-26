import type { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiCheck,
  FiSearch,
  FiTrendingUp,
  FiZap,
  FiBarChart2,
} from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import JsonLd from "@/app/components/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbLd } from "@/lib/jsonld";
import { casos } from "@/lib/cases";
import ROICalculator from "@/app/components/ROICalculator";

export const metadata: Metadata = {
  title: "Servicios — Cómo trabajo con tu negocio",
  description:
    "Diagnóstico de datos gratis, modelos predictivos, automatización y dashboards para PyMEs. Paquetes con precio claro y un método de 3 fases: Diagnóstico → Prototipo → Producción.",
  alternates: { canonical: `${site.url}/servicios` },
  openGraph: {
    title: "Servicios — Nicolás Bargioni",
    description:
      "Datos e IA para PyMEs, con precio claro y un primer paso gratis.",
    images: ["/og/soluciones.png"],
  },
};

const pilares = [
  { Icon: FiSearch, t: "Diagnóstico de datos", d: "Entender qué datos tenés, en qué estado, y dónde está el valor escondido antes de tocar nada." },
  { Icon: FiTrendingUp, t: "Modelos predictivos", d: "Anticipar lo que viene: demanda, clientes que se van, fraude, fallas. Decidir con tiempo." },
  { Icon: FiZap, t: "Automatización", d: "Sacarte de encima el trabajo repetitivo entre sistemas: reportes, cargas, avisos." },
  { Icon: FiBarChart2, t: "Dashboards & análisis", d: "Convertir planillas dispersas en un tablero claro que entendés de un vistazo." },
];

const fases = [
  { n: "Diagnóstico", d: "Reviso tus datos y procesos y te dejo, por escrito, dónde la IA y los datos generan valor real. Sin humo: si no hay caso con retorno, te lo digo." },
  { n: "Prototipo", d: "Validamos rápido con un modelo o automatización mínima que prueba el caso sobre tus propios datos, antes de invertir de más." },
  { n: "Producción", d: "Lo que funciona lo llevo a escala: monitoreado, mantenible e integrado a tu operación." },
];

const paquetes = [
  { t: "Diagnóstico de datos", price: "Gratis", per: "", d: "30 min + un informe de 1 página con 3 oportunidades concretas para tu negocio.", featured: true },
  { t: "Prototipo / 1 caso", price: "desde USD 1.500", per: "", d: "Un modelo, un dashboard o una automatización, validado sobre tus datos." },
  { t: "Implementación", price: "desde USD 4.000", per: "", d: "La solución a producción: integrada, monitoreada y documentada." },
  { t: "Acompañamiento", price: "desde USD 400", per: "/mes", d: "Mantenimiento del modelo, mejoras y soporte continuo." },
  { t: "Proyecto a medida", price: "A conversar", per: "", d: "Casos más grandes o a varios meses: lo armamos juntos." },
];

const garantias = [
  "Respondo en menos de 24 horas.",
  "Alcance y entregables acordados por escrito antes de empezar.",
  "Una ronda de revisión incluida en cada entrega.",
  "Si en el diagnóstico no encuentro al menos una oportunidad clara, no seguimos. Sin costo.",
];

export default function ServiciosPage() {
  return (
    <div className="pb-20">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Servicios", path: "/servicios" },
        ])}
      />

      <HeroSection>
        <Reveal>
          <p className="eyebrow mb-5">Servicios</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight max-w-3xl leading-[1.05]">
            Ayudo a tu PyME a decidir con sus propios datos,{" "}
            <span className="accent-cyan">sin armar un equipo de data</span>.
          </h1>
          <p className="text-lg md:text-xl text-muted mt-7 max-w-2xl leading-relaxed">
            No te vendo “IA”: te resuelvo un problema concreto y medible. Y
            trabajás directo conmigo —quien hace el modelo—, no con un vendedor ni
            un equipo rotativo.
          </p>
          <div className="flex flex-wrap items-center gap-5 mt-9">
            <a
              href={`mailto:${site.email}?subject=Diagn%C3%B3stico%20de%20datos%20gratis`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-coral text-bg font-medium hover:bg-coral-soft transition-colors"
            >
              Pedí tu diagnóstico gratis <FiArrowRight size={16} />
            </a>
            <Link href="/soluciones" className="text-sm text-muted hover:text-cyan transition-colors inline-flex items-center gap-1">
              Ver las 58 soluciones <FiArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto">
        {/* Pilares */}
        <section className="mt-20">
          <Reveal>
            <p className="eyebrow mb-4">Cómo ayudo</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-12">
              Cuatro frentes
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pilares.map(({ Icon, t, d }, i) => (
              <Reveal key={t} delay={i * 70}>
                <div className="h-full rounded-2xl border border-border bg-surface/40 p-6">
                  <span className="grid place-items-center w-11 h-11 rounded-xl border border-border bg-bg text-cyan mb-4">
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-medium tracking-tight mb-2">{t}</h3>
                  <p className="text-sm text-muted leading-relaxed">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Método DPP */}
        <section className="mt-24">
          <Reveal>
            <p className="eyebrow mb-4">Mi método</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">
              DPP: Diagnóstico → Prototipo → Producción
            </h2>
            <p className="text-muted max-w-2xl mb-12">
              Probar el valor rápido y barato, después industrializar. Así no
              gastás en algo que no sabés si funciona.
            </p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border rounded-2xl overflow-hidden">
            {fases.map((f, i) => (
              <Reveal key={f.n} delay={i * 80}>
                <div className="bg-bg h-full p-7">
                  <span className="font-mono text-sm text-cyan">0{i + 1}</span>
                  <h3 className="font-display text-xl font-medium tracking-tight mt-3 mb-2">{f.n}</h3>
                  <p className="text-muted leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Resultados / casos con ROI */}
        <section className="mt-24">
          <Reveal>
            <p className="eyebrow mb-4">Resultados</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">
              Lo que suele cambiar
            </h2>
            <p className="text-muted max-w-2xl mb-12">
              Casos ilustrativos del tipo de retorno que genera cada servicio.
              Cifras representativas y anonimizadas.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {casos.map((c, i) => (
              <Reveal key={c.slug} delay={(i % 2) * 70}>
                <div className="h-full rounded-2xl border border-border bg-surface/40 p-7 flex flex-col">
                  <p className="font-mono text-xs text-cyan mb-4">{c.sector}</p>
                  <div className="flex items-end gap-2 mb-5">
                    <span className="font-display text-4xl font-bold tracking-tight text-coral tabular-nums leading-none">
                      {c.metricaValor}
                    </span>
                    <span className="text-sm text-muted leading-tight pb-0.5">{c.metricaLabel}</span>
                  </div>
                  <dl className="space-y-3 text-sm leading-relaxed flex-1">
                    <div>
                      <dt className="font-display font-medium text-fg">El problema</dt>
                      <dd className="text-muted">{c.problema}</dd>
                    </div>
                    <div>
                      <dt className="font-display font-medium text-fg">Qué hice</dt>
                      <dd className="text-muted">{c.queHice}</dd>
                    </div>
                  </dl>
                  <div className="mt-5 pt-4 border-t border-border flex flex-wrap gap-x-6 gap-y-1 font-mono text-xs">
                    <span className="text-muted">Inversión: <span className="text-fg tabular-nums">{c.inversion}</span></span>
                    <span className="text-muted">Se paga en: <span className="text-fg">{c.payback}</span></span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Paquetes */}
        <section className="mt-24">
          <Reveal>
            <p className="eyebrow mb-4">Paquetes</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">
              Con precio claro, de entrada
            </h2>
            <p className="text-muted max-w-2xl mb-12">
              Sabés desde dónde arranca cada cosa. El primer paso —el diagnóstico—
              es gratis.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {paquetes.map((p, i) => (
              <Reveal key={p.t} delay={(i % 2) * 70}>
                <div className={`h-full rounded-2xl border p-7 ${p.featured ? "border-coral/40 bg-coral/[0.04]" : "border-border bg-surface/40"}`}>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-display text-xl font-medium tracking-tight">{p.t}</h3>
                    <span className={`shrink-0 font-display font-bold tracking-tight ${p.featured ? "text-coral" : ""}`}>
                      {p.price}
                      {p.per && <span className="font-normal text-sm text-muted">{p.per}</span>}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Calculadora de ROI */}
        <section className="mt-24">
          <Reveal>
            <p className="eyebrow mb-4">Calculadora</p>
            <h2 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-3">
              ¿Cuánto te haría ahorrar?
            </h2>
            <p className="text-muted max-w-2xl mb-10">
              Movés los valores y ves el ahorro estimado de automatizar una tarea
              repetitiva. Después lo confirmamos sobre tus números reales.
            </p>
          </Reveal>
          <Reveal>
            <ROICalculator />
          </Reveal>
        </section>

        {/* Diagnóstico gratis + garantías */}
        <section className="mt-24">
          <Reveal>
            <div className="rounded-3xl border border-cyan/30 bg-surface/40 p-8 md:p-12">
              <p className="eyebrow mb-4">Cómo trabajamos</p>
              <h2 className="font-display text-2xl md:text-4xl font-medium tracking-tight max-w-2xl mb-8">
                Empezá sin riesgo, con un diagnóstico gratis
              </h2>
              <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4 max-w-3xl">
                {garantias.map((g) => (
                  <li key={g} className="flex gap-3 text-muted leading-relaxed">
                    <FiCheck className="shrink-0 mt-1 text-cyan" size={18} />
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
              <a
                href={`mailto:${site.email}?subject=Diagn%C3%B3stico%20de%20datos%20gratis`}
                className="inline-flex items-center gap-2 mt-9 px-7 py-3.5 rounded-full bg-coral text-bg font-medium hover:bg-coral-soft transition-colors"
              >
                Pedí tu diagnóstico gratis <FiArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
