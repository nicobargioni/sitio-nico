import type { Metadata } from "next";
import { preload } from "react-dom";
import Link from "next/link";
import { FaXTwitter, FaLinkedinIn, FaOrcid } from "react-icons/fa6";
import { SiGooglegemini, SiOpenai } from "react-icons/si";
import { FiArrowUpRight, FiArrowLeft } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import JsonLd from "@/app/components/JsonLd";
import { geminiUrl, chatgptUrl } from "@/app/components/AskAiButtons";
import { site } from "@/lib/site";
import { abs, personLd, profilePageLd, breadcrumbLd } from "@/lib/jsonld";
import { NOMADIC_PROFILE, ORCID, ORCID_ID, studies } from "@/lib/research";

const description =
  "Nicolás Bargioni es Head of Data en Nomadic (Buenos Aires), Data Scientist enfocado en machine learning, IA aplicada y automatización. Trayectoria, formación, publicaciones y contacto.";

export const metadata: Metadata = {
  title: "Sobre mí — Nicolás Bargioni, Data Scientist y Head of Data",
  description,
  alternates: { canonical: abs("/sobre-mi") },
  openGraph: {
    title: "Sobre mí — Nicolás Bargioni",
    description,
    type: "profile",
    url: abs("/sobre-mi"),
    images: ["/og/sobre-mi.png"],
  },
};

const socials = [
  { href: site.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
  { href: ORCID, label: "ORCID", Icon: FaOrcid },
  { href: site.social.twitter, label: "X", Icon: FaXTwitter },
].filter((s) => s.href);

// Preguntarle a una IA quién es Nico (deep-link con la URL de esta página).
const askPrompt = `quien es Nicolás Bargioni ${abs("/sobre-mi")}`;
const askButtons = [
  { label: "Preguntarle a Gemini quién soy", href: geminiUrl(askPrompt), Icon: SiGooglegemini, tint: "text-cyan" },
  { label: "Preguntarle a ChatGPT quién soy", href: chatgptUrl(askPrompt), Icon: SiOpenai, tint: "" },
];

// ProfilePage con la persona completa adentro (mismo @id que el resto del sitio).
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { "@context": _ctx, ...person } = personLd();
const profileLd = {
  ...profilePageLd("/sobre-mi", "Sobre mí — Nicolás Bargioni"),
  mainEntity: person,
};

// Capacidades y sectores (antes en la sección "Sobre mí" del home)
const capabilities = [
  "Hiperautomatización de procesos y pipelines de datos (ETL)",
  "Análisis exploratorio y visualización de datos",
  "Machine Learning: modelado predictivo, clustering, análisis semántico y segmentación",
  "Integración de IA y LLMs en flujos de trabajo reales",
  "Cloud computing",
  "Big Data",
  "Bases de datos",
  "BI y Data Storytelling",
  "SEO",
];

const verticals = ["eCommerce (B2B / B2C)", "SaaS", "Medios de comunicación", "Agencias"];

const linkCls = "text-fg underline underline-offset-4 decoration-cyan/50 hover:text-cyan";

export default function AboutPage() {
  // LCP: el retrato es la imagen principal de esta página.
  preload("/nico-hero.avif", { as: "image", type: "image/avif", fetchPriority: "high" });

  return (
    <div className="pb-24">
      <JsonLd data={profileLd} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Sobre mí", path: "/sobre-mi" },
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
              {/* Frase autocontenida, pensada para que se pueda citar tal cual */}
              <p className="text-lg md:text-xl text-muted mt-5 max-w-2xl leading-relaxed">
                Nicolás Bargioni es{" "}
                <a href={NOMADIC_PROFILE} target="_blank" rel="noopener" className={linkCls}>
                  Head of Data en Nomadic
                </a>{" "}
                (Buenos Aires), especializado en data science, machine learning, IA
                aplicada y automatización; publicó los estudios{" "}
                <Link href="/investigacion/top-of-ai" className={linkCls}>
                  Top of AI
                </Link>{" "}
                (2026) y{" "}
                <Link href="/investigacion/recomendar-no-es-citar" className={linkCls}>
                  Recommending Is Not Citing
                </Link>{" "}
                (2026).
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
            <picture className="contents">
              <source srcSet="/nico-hero.avif" type="image/avif" />
              <source srcSet="/nico-hero.webp" type="image/webp" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/nico-hero.png"
                alt="Nicolás Bargioni"
                width={760}
                height={760}
                fetchPriority="high"
                decoding="async"
                className="w-full max-w-[260px] aspect-square rounded-2xl object-cover ring-1 ring-cyan/25 ring-offset-[6px] ring-offset-bg shadow-[0_30px_60px_-18px_rgba(8,145,178,0.35)]"
              />
            </picture>
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
                Hoy soy{" "}
                <a href={NOMADIC_PROFILE} target="_blank" rel="noopener" className={linkCls}>
                  Head of Data en Nomadic
                </a>
                , en Buenos Aires. Antes fui AI &amp; Automations Analyst en la misma
                empresa, donde llevé la IA aplicada y la automatización a operaciones
                reales. Vengo del SEO técnico —analicé y optimicé sitios de gran escala
                durante años—, y esa mirada de datos a escala es la que ahora aplico al
                machine learning y a los LLMs.
              </p>
              <p>
                En paralelo me formo en{" "}
                <span className="text-fg font-medium">
                  Ciencia de Datos e Inteligencia Artificial
                </span>{" "}
                (carrera técnica en el ISSD) y en{" "}
                <span className="text-fg font-medium">
                  Hiperautomatización de Procesos de Negocio y Agentes de IA
                </span>{" "}
                (máster en EBIS Business Techschool). En este sitio escribo sobre lo que
                voy aprendiendo en el camino.
              </p>
            </div>
          </Reveal>
        </section>

        {/* Qué hago */}
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-6">
              Qué hago
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {capabilities.map((c) => (
                <li key={c} className="flex gap-3 text-muted leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <p className="font-mono text-xs uppercase tracking-widest text-coral mt-8 mb-4">
              Sectores
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {verticals.map((v) => (
                <li
                  key={v}
                  className="text-sm text-muted border border-border rounded-full px-3.5 py-1.5"
                >
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* Investigación */}
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-6">
              Publicaciones
            </h2>
            <div className="grid gap-4">
              {studies.map((s) => (
                <Link
                  key={s.slug}
                  href={`/investigacion/${s.slug}`}
                  className="group rounded-2xl border border-border bg-surface/40 p-6 hover:border-cyan/40 transition-colors"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-widest text-cyan mb-2">
                    {s.kind} · {s.date.slice(0, 4)}
                  </p>
                  <p className="font-display text-lg font-medium tracking-tight group-hover:text-cyan transition-colors break-words">
                    {s.title}
                  </p>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{s.excerpt}</p>
                </Link>
              ))}
            </div>
            <p className="text-sm text-muted mt-5">
              <Link href="/investigacion" className="text-coral hover:text-coral-soft inline-flex items-center gap-1">
                Todas las publicaciones <FiArrowUpRight size={14} />
              </Link>{" "}
              · ORCID{" "}
              <a href={ORCID} target="_blank" rel="noopener" className="font-mono text-xs hover:text-cyan underline underline-offset-2">
                {ORCID_ID}
              </a>
            </p>
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
                  dic. 2022 – actualidad
                </span>
              </div>
              <ul className="mt-4 space-y-3">
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="font-medium text-fg">Head of Data</span>
                  <span className="font-mono text-xs text-muted-2">
                    sept. 2026 – actualidad
                  </span>
                </li>
                <li className="flex flex-col sm:flex-row sm:items-baseline sm:gap-3">
                  <span className="text-muted">AI &amp; Automations Analyst</span>
                  <span className="font-mono text-xs text-muted-2">
                    sept. 2025 – ago. 2026
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
                Agencia de marketing y datos. Diseñé automatizaciones y soluciones de IA
                aplicada para el equipo y los clientes; antes lideré el SEO técnico de
                medios.{" "}
                <a href={NOMADIC_PROFILE} target="_blank" rel="noopener" className={linkCls}>
                  Mi ficha en Nomadic
                </a>
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

          {/* Otras colaboraciones */}
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
              Formación en curso
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-5">
            <Reveal>
              <div className="rounded-2xl border border-border bg-surface/40 p-6 h-full">
                <p className="font-display text-lg font-medium">ISSD</p>
                <p className="text-muted leading-relaxed mt-2">
                  Carrera técnica: Ciencia de Datos e Inteligencia Artificial.
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

        {/* Proyectos y blog */}
        <section className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-6">
              Proyectos y blog
            </h2>
            <ul className="space-y-3 text-muted leading-relaxed">
              <li>
                <Link href="/#use-cases" className={linkCls}>Casos de uso</Link>: proyectos
                de RAG, visión, mantenimiento predictivo, aprendizaje por refuerzo y
                automatización, algunos con su notebook.
              </li>
              <li>
                <Link href="/blog" className={linkCls}>Blog</Link>: notas sobre datos, IA,
                automatización y cloud.
              </li>
              <li>
                <Link href="/soluciones" className={linkCls}>Soluciones</Link> y{" "}
                <Link href="/servicios" className={linkCls}>servicios</Link>: qué puedo
                resolver con datos e IA.
              </li>
            </ul>
          </Reveal>
        </section>

        {/* Contacto */}
        <section className="mt-16 pt-10 border-t border-border">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-4">
              Contacto
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              ¿Tenés un proyecto de datos, IA o automatización en mente? Escribime a{" "}
              <a href={`mailto:${site.email}`} className={linkCls}>{site.email}</a> o por{" "}
              <a href={site.social.linkedin} target="_blank" rel="noopener noreferrer" className={linkCls}>
                LinkedIn
              </a>
              .
            </p>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-coral text-coral font-medium hover:bg-coral hover:text-white transition-colors"
            >
              Contactame
            </a>
          </Reveal>
        </section>
      </div>
    </div>
  );
}
