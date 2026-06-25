import Link from "next/link";
import { FiArrowRight, FiActivity, FiCpu, FiZap, FiCloud } from "react-icons/fi";
import EmbeddingField from "./EmbeddingField";
import LinkedInCard from "./LinkedInCard";
import { site } from "@/lib/site";

const features = [
  {
    Icon: FiActivity,
    title: "Machine Learning",
    desc: "Modelos, forecasting, clustering y embeddings sobre tus datos.",
  },
  {
    Icon: FiCpu,
    title: "IA aplicada",
    desc: "LLMs y automatización con Python, puestos a trabajar en el negocio.",
  },
  {
    Icon: FiZap,
    title: "Hiperautomatización",
    desc: "RPA, n8n y agentes para automatizar procesos punta a punta.",
  },
  {
    Icon: FiCloud,
    title: "Cloud computing",
    desc: "Pipelines y modelos en la nube: GCP, serverless y contenedores.",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-24">
      {/* Firma: campo de embeddings, a todo el ancho detrás del contenido */}
      <div className="pointer-events-none absolute inset-0">
        <EmbeddingField />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-y-10 gap-x-10 items-center">
          {/* Columna izquierda: headline + intro + CTAs */}
          <div className="lg:col-span-7">
            <p className="eyebrow mb-5">Data Science · ML · IA</p>
            <h1 className="font-display font-medium text-[clamp(2.6rem,6.5vw,5rem)] leading-[1.02] tracking-tight">
              Data Science &
              <br />
              <span className="accent-cyan">IA aplicada.</span>
            </h1>
            <p className="text-muted leading-relaxed max-w-md mt-7 mb-8">
              {site.intro}
            </p>
            <div className="flex flex-wrap items-center gap-5">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-coral text-coral font-medium hover:bg-coral hover:text-white transition-colors"
              >
                Contactame
              </a>
              <Link
                href="/#use-cases"
                className="text-sm text-muted hover:text-cyan transition-colors inline-flex items-center gap-1"
              >
                ver casos de uso <FiArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Columna derecha: retrato circular + botón LinkedIn */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end gap-7">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nico-hero.png"
              alt={site.name}
              width={760}
              height={760}
              className="w-full max-w-[340px] aspect-square rounded-full ring-1 ring-cyan/25 ring-offset-[6px] ring-offset-bg shadow-[0_30px_60px_-18px_rgba(8,145,178,0.35)] transition-shadow duration-500 hover:shadow-[0_36px_70px_-16px_rgba(240,82,31,0.32)]"
            />
            <LinkedInCard className="w-full max-w-[340px]" />
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {features.map(({ Icon, title, desc }) => (
            <div key={title}>
              <span className="grid place-items-center w-11 h-11 rounded-xl border border-border bg-surface/60 text-cyan mb-4">
                <Icon size={18} />
              </span>
              <h2 className="font-display font-medium text-base mb-1.5">
                {title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
