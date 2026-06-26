import type { Metadata } from "next";
import Link from "next/link";
import type { IconType } from "react-icons";
import { FiArrowRight, FiArrowUpRight, FiDatabase, FiCpu, FiBarChart2, FiZap } from "react-icons/fi";
import { SiOpenai, SiGooglegemini } from "react-icons/si";
import HideChrome from "../restyle/HideChrome";
import DotField from "../restyle/DotField";
import NodeGraph from "./NodeGraph";
import CountUp from "./CountUp";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restyle preview 2 · Nicolás Bargioni",
  robots: { index: false, follow: false },
};

const CHIPS: { x: string; y: string; Icon: IconType; d: string }[] = [
  { x: "12%", y: "30%", Icon: FiDatabase, d: "0s" },
  { x: "84%", y: "26%", Icon: SiOpenai, d: "0.6s" },
  { x: "18%", y: "68%", Icon: FiBarChart2, d: "1.1s" },
  { x: "82%", y: "70%", Icon: SiGooglegemini, d: "1.6s" },
  { x: "8%", y: "50%", Icon: FiCpu, d: "0.3s" },
  { x: "90%", y: "50%", Icon: FiZap, d: "2s" },
];

const STATS: { to: number; suffix: string; label: string }[] = [
  { to: 58, suffix: "", label: "Soluciones" },
  { to: 125, suffix: "", label: "Notas técnicas" },
  { to: 59, suffix: "", label: "Notebooks" },
  { to: 4, suffix: "", label: "Áreas de trabajo" },
];

export default function RestylePreview2() {
  return (
    <div className="bg-[#0a1326] text-white font-display relative overflow-hidden">
      <HideChrome />
      {/* glow base */}
      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(37,99,235,0.25),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1326] via-[#0a1430] to-[#0a1326]" />
      </div>

      {/* Nav */}
      <header className="relative z-20">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between text-sm">
          <span className="font-medium tracking-tight">Nicolás Bargioni</span>
          <nav className="hidden md:flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-2 py-1.5">
            {["Soluciones", "Blog", "Sobre mí"].map((l) => (
              <span key={l} className="px-4 py-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-default">
                {l}
              </span>
            ))}
          </nav>
          <Link href="/" className="inline-flex items-center gap-1 text-white/60 hover:text-white transition-colors">
            Volver al sitio <FiArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 min-h-[88vh] flex flex-col items-center justify-center text-center px-6">
        <div className="absolute inset-0 opacity-50">
          <DotField className="w-full h-full" />
        </div>
        {/* chips IA/data flotando */}
        {CHIPS.map((c, i) => (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 text-white/65 backdrop-blur-sm lab-floaty"
            style={{ left: c.x, top: c.y, animationDelay: c.d }}
          >
            <c.Icon size={20} />
          </div>
        ))}
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-1.5 text-xs text-white/60 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 lab-pulse" /> Data · IA · Automatización
          </span>
          <h1 className="font-medium tracking-tight leading-[1.05] text-[clamp(2.6rem,6.5vw,5.5rem)]">
            Tu área de datos e IA
            <br />
            <span className="bg-gradient-to-r from-blue-300 to-indigo-400 bg-clip-text text-transparent">
              sin armar un equipo.
            </span>
          </h1>
          <p className="text-white/55 max-w-xl mx-auto mt-7 leading-relaxed text-lg">
            Soy Nicolás Bargioni. Conecto tus fuentes, entreno los modelos y
            automatizo los procesos — de la idea a producción.
          </p>
          <div className="mt-9 flex items-center justify-center gap-4">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 hover:bg-blue-400 text-white px-7 py-3.5 font-medium transition-colors shadow-[0_0_30px_-6px_rgba(59,130,246,0.8)]"
            >
              Hablemos <FiArrowRight size={16} />
            </a>
            <a href="#red" className="text-white/55 hover:text-white transition-colors text-sm">
              Cómo trabajo ↓
            </a>
          </div>
        </div>
        <span className="absolute top-2 right-6 text-[0.6rem] uppercase tracking-widest text-white/30 border border-white/12 rounded-full px-3 py-1">
          Preview · restyle 2
        </span>
      </section>

      {/* Grafo de nodos */}
      <section id="red" className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-blue-300/70 mb-4">Integración</p>
            <h2 className="font-medium tracking-tight text-3xl md:text-5xl leading-tight">
              Conecto tus datos y
              <br />
              herramientas
            </h2>
            <p className="text-white/55 mt-6 leading-relaxed max-w-md">
              CRMs, planillas, APIs, modelos de IA. Lo que está disperso lo unifico
              en un flujo que produce decisiones — no más islas de datos.
            </p>
          </div>
          <NodeGraph />
        </div>
      </section>

      {/* Impacto: chart + contadores */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-28">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 md:p-12">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-300/70 mb-3">Trayectoria</p>
          <h2 className="font-medium tracking-tight text-2xl md:text-4xl leading-tight max-w-xl mb-10">
            Del diagnóstico a producción
          </h2>

          {/* área animada (decorativa) */}
          <div className="relative h-44 mb-12">
            <svg className="w-full h-full" viewBox="0 0 600 160" preserveAspectRatio="none">
              <defs>
                <linearGradient id="lab2area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#3b82f6" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>
              <g className="lab-grow">
                <path
                  d="M0,150 L0,120 C80,118 120,95 200,98 C280,101 320,60 400,52 C480,44 520,30 600,18 L600,160 L0,160 Z"
                  fill="url(#lab2area)"
                />
                <path
                  d="M0,120 C80,118 120,95 200,98 C280,101 320,60 400,52 C480,44 520,30 600,18"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="2.5"
                />
              </g>
            </svg>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-medium tracking-tight text-4xl md:text-5xl bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                  <CountUp to={s.to} suffix={s.suffix} />
                </p>
                <p className="text-white/45 text-sm mt-2">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <h2 className="font-medium tracking-tight text-[clamp(2rem,5vw,4rem)] leading-tight">
          ¿Tenés un problema de datos?
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 mt-8 rounded-full bg-blue-500 hover:bg-blue-400 text-white px-8 py-4 font-medium transition-colors shadow-[0_0_30px_-6px_rgba(59,130,246,0.8)]"
        >
          Hablemos <FiArrowRight size={16} />
        </a>
        <p className="mt-12 text-white/40 text-sm">
          Preview de restyle ·{" "}
          <Link href="/" className="underline hover:text-white">
            volver al sitio actual
          </Link>{" "}
          ·{" "}
          <Link href="/lab/restyle" className="underline hover:text-white">
            ver versión monocromática
          </Link>
        </p>
      </section>
    </div>
  );
}
