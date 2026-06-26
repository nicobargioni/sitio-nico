import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import HideChrome from "./HideChrome";
import DotField from "./DotField";
import LabSections from "../LabSections";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Restyle preview · Nicolás Bargioni",
  robots: { index: false, follow: false },
};

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

        {/* Objetos IA/data flotando */}
        <div className="absolute inset-0 z-[1] pointer-events-none text-white/[0.13]">
          <svg className="absolute left-[8%] top-[24%] w-14 h-14 lab-floaty" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="14" r="4" /><circle cx="52" cy="20" r="4" /><circle cx="30" cy="50" r="4" />
            <path d="M14 17 L48 19 M14 16 L29 46 M50 23 L31 47" strokeWidth="1.2" />
          </svg>
          <svg className="absolute right-[11%] top-[19%] w-12 h-12 lab-floaty-b" style={{ animationDelay: "1.2s" }} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 18 L10 32 L24 46 M40 18 L54 32 L40 46" />
          </svg>
          <svg className="absolute left-[13%] bottom-[22%] w-12 h-12 lab-floaty" style={{ animationDelay: "0.6s" }} viewBox="0 0 64 64" fill="currentColor">
            <rect x="8" y="34" width="9" height="22" /><rect x="22" y="24" width="9" height="32" /><rect x="36" y="14" width="9" height="42" /><rect x="50" y="28" width="9" height="28" />
          </svg>
          <svg className="absolute right-[9%] bottom-[26%] w-12 h-12 lab-floaty-b" style={{ animationDelay: "2s" }} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
            <path d="M32 8 C34 24 40 30 56 32 C40 34 34 40 32 56 C30 40 24 34 8 32 C24 30 30 24 32 8 Z" />
          </svg>
          <svg className="absolute left-1/2 top-[12%] -translate-x-1/2 w-16 h-16 lab-spin" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="32" cy="32" r="26" strokeDasharray="3 6" /><circle cx="32" cy="6" r="3" fill="currentColor" stroke="none" />
          </svg>
        </div>

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
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 rounded-full bg-white text-black px-7 py-3.5 font-medium hover:bg-white/85 transition-colors">
              Hablemos <FiArrowRight size={16} />
            </a>
            <a href="#soluciones" className="text-white/60 hover:text-white transition-colors text-sm">Ver soluciones</a>
          </div>
        </div>
        <span className="absolute top-24 right-8 z-10 text-[0.6rem] uppercase tracking-widest text-white/30 border border-white/15 rounded-full px-3 py-1">
          Preview · restyle (mono)
        </span>
      </section>

      <LabSections theme="mono" />

      <div className="text-center pb-16 text-white/40 text-sm">
        Preview ·{" "}
        <Link href="/" className="underline hover:text-white">sitio actual</Link> ·{" "}
        <Link href="/lab/restyle-2" className="underline hover:text-white">ver versión navy</Link>
      </div>
    </div>
  );
}
