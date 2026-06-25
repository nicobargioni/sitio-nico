import type { Metadata } from "next";
import Link from "next/link";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { SiGooglegemini, SiOpenai } from "react-icons/si";
import { FiArrowUpRight, FiArrowLeft } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import JsonLd from "@/app/components/JsonLd";
import { geminiUrl, chatgptUrl } from "@/app/components/AskAiButtons";
import { site } from "@/lib/site";
import { personLd, breadcrumbLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Nicolás Bargioni — Data Scientist · IA aplicada",
  description:
    "Quién es Nicolás Bargioni: Data Scientist y AI & Automations Analyst en Nomadic. Trayectoria, formación y enfoque en machine learning, IA aplicada y automatización.",
  alternates: { canonical: `${site.url}/nico-bargioni` },
  openGraph: {
    title: "Nicolás Bargioni — Data Scientist · IA aplicada",
    description:
      "Data Scientist y AI & Automations Analyst en Nomadic. Trayectoria, formación y enfoque.",
    type: "profile",
    url: `${site.url}/nico-bargioni`,
    images: ["/og/nico-bargioni.png"],
  },
};

const socials = [
  { href: site.social.twitter, label: "X", Icon: FaXTwitter },
  { href: site.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
].filter((s) => s.href);

// Preguntarle a una IA quién es Nico (deep-link con la URL de esta página).
const askPrompt = `quien es Nicolás Bargioni ${site.url}/nico-bargioni`;
const askButtons = [
  { label: "Preguntarle a Gemini quién soy", href: geminiUrl(askPrompt), Icon: SiGooglegemini, tint: "text-cyan" },
  { label: "Preguntarle a ChatGPT quién soy", href: chatgptUrl(askPrompt), Icon: SiOpenai, tint: "" },
];

export default function AuthorPage() {
  return (
    <div className="pb-24">
      <JsonLd data={personLd()} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Nicolás Bargioni", path: "/nico-bargioni" },
        ])}
      />

      {/* Hero */}
      <HeroSection>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Inicio
        </Link>
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="eyebrow mb-4">Sobre mí</p>
              <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
                Nicolás Bargioni
              </h1>
              <p className="text-lg md:text-xl text-muted mt-5 max-w-2xl leading-relaxed">
                Data Scientist · <span className="text-fg">AI &amp; Automations Analyst</span> en
                Nomadic. Llevo el machine learning, los LLMs y la automatización a
                problemas reales de negocio.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href={`mailto:${site.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-coral text-coral font-medium hover:bg-coral hover:text-white transition-colors"
                >
                  Contactame
                </a>
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid place-items-center w-11 h-11 rounded-full border border-border text-muted hover:text-cyan hover:border-cyan/50 transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
                {askButtons.map(({ href, label, Icon, tint }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="grid place-items-center w-11 h-11 rounded-full border border-border hover:border-cyan/50 transition-colors"
                  >
                    <Icon size={16} className={tint || "text-muted"} />
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/nico-hero.png"
              alt="Nicolás Bargioni"
              width={760}
              height={760}
              className="w-full max-w-[260px] aspect-square rounded-2xl object-cover ring-1 ring-cyan/25 ring-offset-[6px] ring-offset-bg shadow-[0_30px_60px_-18px_rgba(8,145,178,0.35)]"
            />
          </div>
        </div>
      </HeroSection>

      <div className="px-6 max-w-3xl mx-auto">
        {/* Quién soy */}
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-6">
              Quién soy
            </h2>
            <div className="space-y-4 text-muted leading-relaxed">
              <p>
                Soy Data Scientist y trabajo en la intersección entre los datos, el
                machine learning y la automatización: construyo modelos y herramientas
                propias que convierten datos en decisiones concretas para el negocio.
              </p>
              <p>
                Hoy soy <span className="text-fg font-medium">AI &amp; Automations
                Analyst en Nomadic</span>, donde llevo la IA aplicada y la automatización
                a operaciones reales. Vengo del SEO técnico —analicé y optimicé sitios de
                gran escala durante años—, y esa mirada de datos a escala es la que ahora
                aplico al machine learning y a los LLMs.
              </p>
              <p>
                En paralelo me formo en{" "}
                <span className="text-fg font-medium">
                  Ciencia de Datos e Inteligencia Artificial
                </span>{" "}
                y en{" "}
                <span className="text-fg font-medium">
                  Hiperautomatización de Procesos de Negocio y Agentes de IA
                </span>
                . Acá escribo sobre lo que voy aprendiendo en el camino.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Experiencia */}
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-8">
              Experiencia
            </h2>
          </Reveal>

          {/* Nomadic — destacado */}
          <Reveal>
            <div className="rounded-2xl border border-cyan/30 bg-surface/40 p-6 sm:p-7">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="font-display text-xl font-medium">Nomadic</h3>
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-cyan">
                  Actualidad · 3 años 7 meses
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="font-medium text-fg">
                    AI &amp; Automations Analyst
                  </span>
                  <span className="font-mono text-xs text-muted-2">
                    sept. 2025 – actualidad
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-muted">Technical SEO Analyst for Media</span>
                  <span className="font-mono text-xs text-muted-2">
                    dic. 2022 – sept. 2025
                  </span>
                </li>
              </ul>
              <p className="text-muted leading-relaxed mt-4">
                Agencia de marketing y datos. Hoy diseño automatizaciones y soluciones de
                IA aplicada para el equipo y los clientes; antes lideré el SEO técnico de
                medios. Trabajé con marcas como{" "}
                <span className="text-fg">
                  Megatone, Casa del Audio, Style Store, Chilevisión, Univisión y Artear
                </span>
                .
              </p>
            </div>
          </Reveal>

          {/* Flokzu — SaaS */}
          <Reveal delay={80}>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-7 mt-5">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h3 className="font-display text-lg font-medium">
                  Flokzu{" "}
                  <span className="text-sm font-normal text-muted-2">· SaaS</span>
                </h3>
                <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-2">
                  2023 – 2025 · remoto
                </span>
              </div>
              <p className="text-muted leading-relaxed mt-3">
                Especialista en posicionamiento web para{" "}
                <span className="text-fg">Flokzu</span>, un SaaS de automatización de
                procesos de negocio (BPM) no-code, desde Uruguay y en remoto. Trabajé el
                SEO técnico y de contenido del producto.
              </p>
            </div>
          </Reveal>

          {/* Otras colaboraciones — por encima */}
          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-7 mt-5">
              <h3 className="font-display text-lg font-medium mb-3">
                Otras colaboraciones
              </h3>
              <p className="text-muted leading-relaxed">
                Antes de virar a los datos y la IA trabajé varios años como especialista
                en SEO. Colaboré, entre otras, con{" "}
                <span className="text-fg">LIDERLOGO</span> (freelance),{" "}
                <span className="text-fg">Jives Media</span> (Estados Unidos, remoto) y{" "}
                <span className="text-fg">ABCW Global</span> (SEO Expert y Copywriter).
              </p>
            </div>
          </Reveal>
        </section>

        {/* Formación */}
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-8">
              Formación
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface/40 p-6 h-full">
                <p className="font-display text-lg font-medium">ISSD</p>
                <p className="text-muted leading-relaxed mt-2">
                  Carrera: Ciencia de Datos e Inteligencia Artificial.
                </p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="rounded-2xl border border-border bg-surface/40 p-6 h-full">
                <p className="font-display text-lg font-medium">
                  EBIS Business Techschool
                </p>
                <p className="text-muted leading-relaxed mt-2">
                  Máster en Hiperautomatización de Procesos de Negocio y Agentes de IA.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 pt-10 border-t border-border">
          <Reveal>
            <p className="text-muted leading-relaxed mb-6">
              ¿Tenés un proyecto de datos, IA o automatización en mente? Hablemos.
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
                ver casos de uso <FiArrowUpRight size={14} />
              </Link>
            </div>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
