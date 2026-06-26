import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight, FiPlus } from "react-icons/fi";
import HideChrome from "./HideChrome";
import DotField from "./DotField";
import { featuredSolutions } from "@/lib/solutions";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restyle preview · Nicolás Bargioni",
  robots: { index: false, follow: false },
};

const SERVICIOS = [
  ["01", "Estrategia de IA & ROI", "Dónde la IA genera valor real en tu negocio — y dónde no."],
  ["02", "Prototipado rápido", "Validar un caso con un modelo mínimo antes de invertir de más."],
  ["03", "Modelos & MLOps", "Modelos entrenados, evaluados y puestos en producción, no en un cajón."],
  ["04", "Arquitectura de datos", "Unir y ordenar tus fuentes para que los datos lleguen limpios."],
  ["05", "Automatización de procesos", "Sacar de encima el trabajo repetitivo entre sistemas."],
  ["06", "Análisis & dashboards", "Convertir planillas dispersas en decisiones claras."],
];

const FASES = [
  ["Diagnóstico", "Encontramos dónde los datos y la IA generan valor real, sin humo. Salís con una hoja de ruta priorizada por retorno."],
  ["Prototipo", "Validamos rápido con un modelo o automatización mínima que prueba el caso sobre tus datos."],
  ["Producción", "Lo que funciona, lo llevamos a escala: monitoreado, mantenible e integrado a tu operación."],
];

const FAQ = [
  ["¿Cómo sé si la IA sirve para mi negocio?", "Arrancamos por el problema, no por la tecnología. Si no hay un caso con retorno claro, te lo digo de entrada."],
  ["¿Qué incluye el diagnóstico inicial?", "Una revisión de tus datos y procesos, los casos de mayor impacto y una hoja de ruta priorizada por ROI."],
  ["¿Necesitás acceso a todos mis datos?", "Para el diagnóstico alcanza con una muestra. Trabajo con lo mínimo necesario y bajo acuerdo de confidencialidad."],
  ["¿Cómo priorizás los casos de uso?", "Por impacto sobre esfuerzo: primero lo que mueve la aguja y se puede entregar rápido."],
];

export default function RestylePreview() {
  return (
    <div className="bg-[#0a0a0a] text-white font-display">
      <HideChrome />

      {/* Nav */}
      <header className="absolute top-0 inset-x-0 z-20">
        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between text-sm">
          <span className="font-medium tracking-tight">Nicolás Bargioni</span>
          <span className="hidden md:block text-white/45 tracking-widest text-xs uppercase">
            Data Science · IA aplicada
          </span>
          <Link href="/" className="text-white/60 hover:text-white transition-colors inline-flex items-center gap-1">
            Volver al sitio <FiArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-70">
          <DotField className="w-full h-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#0a0a0a]" />
        <div className="relative z-10">
          <p className="text-white/40 text-xs uppercase tracking-[0.3em] mb-8">Data & AI</p>
          <h1 className="font-medium tracking-tight leading-[1.05] text-[clamp(2.8rem,7vw,6rem)]">
            Datos que generan valor.
            <br />
            <span className="text-white/35">IA que produce impacto.</span>
          </h1>
          <p className="text-white/55 max-w-xl mx-auto mt-8 leading-relaxed text-lg">
            Soy Nicolás Bargioni, Data Scientist. Llevo machine learning, IA y
            automatización a problemas reales de negocio: del diagnóstico al modelo
            en producción.
          </p>
          <div className="mt-10 flex items-center justify-center gap-5">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3.5 font-medium hover:bg-white/85 transition-colors"
            >
              Hablemos <FiArrowRight size={16} />
            </a>
            <a href="#servicios" className="text-white/60 hover:text-white transition-colors text-sm">
              Ver servicios
            </a>
          </div>
        </div>
        <span className="absolute top-24 right-8 z-10 text-[0.6rem] uppercase tracking-widest text-white/30 border border-white/15 rounded-full px-3 py-1">
          Preview · restyle
        </span>
      </section>

      {/* Servicios */}
      <section id="servicios" className="bg-white text-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 py-28">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-4">Servicios</p>
              <h2 className="font-medium tracking-tight text-3xl md:text-4xl leading-tight">
                Cómo ayudo a tu negocio
              </h2>
              <p className="text-black/50 mt-5 leading-relaxed max-w-sm">
                Del primer diagnóstico al modelo corriendo en producción. Simple y
                directo: probar valor rápido, después industrializar.
              </p>
            </div>
            <div className="md:col-span-8 divide-y divide-black/10 border-t border-black/10">
              {SERVICIOS.map(([n, t, d]) => (
                <div key={n} className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 py-6">
                  <span className="font-mono text-sm text-black/30">{n}</span>
                  <div>
                    <p className="text-xl md:text-2xl font-medium tracking-tight">{t}</p>
                    <p className="text-black/50 mt-1 leading-relaxed">{d}</p>
                  </div>
                  <FiArrowUpRight className="text-black/20 group-hover:text-black transition-colors" size={22} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enfoque 3 fases */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-8 py-28">
          <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">El enfoque</p>
          <h2 className="font-medium tracking-tight text-3xl md:text-5xl leading-tight max-w-2xl">
            Un proceso en 3 fases
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 mt-14 border border-white/10">
            {FASES.map(([t, d], i) => (
              <div key={t} className="bg-[#0a0a0a] p-8">
                <span className="font-mono text-sm text-white/30">0{i + 1}</span>
                <h3 className="text-2xl font-medium tracking-tight mt-4 mb-3">{t}</h3>
                <p className="text-white/55 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Casos / Soluciones */}
      <section className="bg-white text-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 py-28">
          <div className="flex items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-black/40 mb-3">Soluciones</p>
              <h2 className="font-medium tracking-tight text-3xl md:text-5xl leading-tight">
                Problemas que resuelvo
              </h2>
            </div>
            <Link
              href="/soluciones"
              className="hidden sm:inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0a0a0a] text-white px-5 py-3 text-sm font-medium hover:bg-black/80 transition-colors"
            >
              Ver todas <FiArrowRight size={15} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredSolutions.slice(0, 3).map((s) => (
              <div key={s.slug} className="rounded-2xl border border-black/10 overflow-hidden">
                <div
                  className="aspect-[16/10] bg-[#0a0a0a] relative"
                  style={{
                    backgroundImage:
                      "radial-gradient(rgba(255,255,255,0.18) 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                />
                <div className="p-6">
                  <p className="text-lg font-medium tracking-tight">{s.titulo}</p>
                  <p className="text-black/50 mt-2 leading-relaxed text-sm">{s.dolor}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-8 py-28 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-4">FAQ</p>
            <h2 className="font-medium tracking-tight text-3xl md:text-4xl leading-tight">
              Preguntas frecuentes
            </h2>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 mt-8 rounded-full border border-white/20 px-5 py-3 text-sm hover:border-white/50 transition-colors"
            >
              ¿Otra duda? Escribime
            </a>
          </div>
          <div className="md:col-span-8 border-t border-white/10">
            {FAQ.map(([q, a]) => (
              <details key={q} className="group border-b border-white/10 py-5">
                <summary className="flex items-center justify-between cursor-pointer list-none text-lg font-medium tracking-tight">
                  {q}
                  <FiPlus className="text-white/40 group-open:rotate-45 transition-transform shrink-0" size={20} />
                </summary>
                <p className="text-white/55 leading-relaxed mt-3 max-w-2xl">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / footer */}
      <section className="bg-white text-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-8 py-28 text-center">
          <h2 className="font-medium tracking-tight text-[clamp(2rem,5vw,4rem)] leading-tight">
            ¿Tenés un problema de datos?
          </h2>
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-2 mt-8 rounded-full bg-[#0a0a0a] text-white px-8 py-4 font-medium hover:bg-black/80 transition-colors"
          >
            Hablemos <FiArrowRight size={16} />
          </a>
          <p className="mt-12 text-black/40 text-sm">
            Preview de restyle ·{" "}
            <Link href="/" className="underline hover:text-black">
              volver al sitio actual
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
