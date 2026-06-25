import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import Hero from "./components/Hero";
import AskAiButtons from "./components/AskAiButtons";
import Reveal from "./components/Reveal";
import ColabCard from "./components/ColabCard";
import PostCard from "./components/PostCard";
import SolutionCard from "./components/SolutionCard";
import JsonLd from "./components/JsonLd";
import { getPostMetasByCategory } from "@/lib/posts";
import { solutions } from "@/lib/solutions";
import { categories } from "@/lib/taxonomy";
import { site } from "@/lib/site";
import { profilePageLd, itemListLd } from "@/lib/jsonld";

// ── Datos editables (placeholders) ───────────────────────────────
// Casos de uso (proyectos reales). href → silo donde vive el notebook.
const useCases = [
  {
    title: "Buscador semántico (RAG)",
    badge: "NLP / RAG",
    href: "/ia-agentes/rag-embeddings",
    desc: "Chatbot que responde sobre un corpus propio: embeddings + FAISS, recuperación de contexto y evaluación de relevancia.",
    stats: [
      { v: "FAISS", l: "índice vectorial" },
      { v: "Embeddings", l: "representación" },
      { v: "RAG", l: "pipeline" },
    ],
  },
  {
    title: "CNN para retinopatía",
    badge: "VISIÓN",
    href: "/data-ml/deep-learning",
    desc: "Clasificación de imágenes médicas de fondo de ojo con redes convolucionales en PyTorch, manejando desbalance de clases.",
    stats: [
      { v: "PyTorch", l: "framework" },
      { v: "CNN", l: "arquitectura" },
      { v: "Grad-CAM", l: "interpretabilidad" },
    ],
  },
  {
    title: "Mantenimiento predictivo (NASA CMAPSS)",
    badge: "ML",
    href: "/data-ml/deteccion-anomalias",
    desc: "Predicción de vida útil restante (RUL) de turbinas a partir de series de sensores, para anticipar fallas.",
    stats: [
      { v: "RUL", l: "vida útil restante" },
      { v: "Sensores", l: "series temporales" },
      { v: "Regresión", l: "modelo" },
    ],
  },
  {
    title: "Agente de RL (Q-learning)",
    badge: "RL",
    href: "/data-ml/reinforcement-learning",
    desc: "Agente que aprende por prueba y error a resolver el entorno Taxi de Gymnasium, sin conocer las reglas de antemano.",
    stats: [
      { v: "Gymnasium", l: "entorno" },
      { v: "Q-table", l: "política" },
      { v: "ε-greedy", l: "exploración" },
    ],
  },
  {
    title: "Clasificación de audio",
    badge: "AUDIO",
    href: "/ia-agentes/procesamiento-habla",
    desc: "Reconocimiento de comandos de voz: de la onda al modelo vía espectrogramas y una CNN sobre Speech Commands.",
    stats: [
      { v: "Espectrogramas", l: "features" },
      { v: "CNN", l: "modelo" },
      { v: "Audio", l: "Speech Commands" },
    ],
  },
  {
    title: "Minería de datos & churn",
    badge: "DATA",
    href: "/data-ml/mineria-de-datos",
    desc: "Clasificación multiclase y segmentación de clientes con KNN, EDA, escalado y matriz de confusión para detectar churn.",
    stats: [
      { v: "KNN", l: "clasificación" },
      { v: "EDA", l: "exploración" },
      { v: "Churn", l: "caso real" },
    ],
  },
  {
    title: "Hiperautomatización de procesos",
    badge: "AUTOMATION",
    href: "/hiperautomatizacion",
    desc: "Flujos punta a punta con RPA, n8n y agentes: levantamiento de procesos, modelado BPMN y automatización de tareas repetitivas.",
    stats: [
      { v: "RPA", l: "UiPath" },
      { v: "Agentes", l: "decisión + acción" },
      { v: "BPMN", l: "modelado" },
    ],
  },
  {
    title: "Datos e IA en la nube",
    badge: "CLOUD",
    href: "/cloud",
    desc: "Ingesta, modelos y despliegue serverless en Google Cloud: Vertex AI, Cloud Run y BigQuery, contenedores con Docker y CI/CD.",
    stats: [
      { v: "GCP", l: "Vertex · Cloud Run" },
      { v: "Serverless", l: "escala a cero" },
      { v: "Docker", l: "contenedores" },
    ],
  },
];

// Recomendaciones de LinkedIn (verbatim, recortadas)
const recs = [
  {
    quote:
      "Tuve el gusto de trabajar con Nico en Flokzu como SEO Specialist. Se destacó por su actitud entusiasta y proactiva, siempre buscando nuevas formas de mejorar y aprender. Su pasión por el trabajo es evidente y su energía positiva contagia.",
    name: "Micaela Suárez",
    role: "CEO @ Flokzu",
  },
  {
    quote:
      "Contratamos a Nico como SEO Specialist en Flokzu. Desde el primer día se destacó por su energía positiva, actitud muy proactiva y excelente integración con el equipo. Apasionado por su trabajo, siempre investigando, probando e innovando.",
    name: "Fiorella Benvenuto",
    role: "Head of People @ Flokzu",
  },
  {
    quote:
      "Trabajé con Nico en la evolución de la estrategia de crecimiento de Flokzu. Llevó la IA y el análisis de datos duros a tierra para priorizar con claridad. Gracias a ese enfoque logramos hitos concretos —como entrar en Google Discover—. Volvería a trabajar con Nicolás.",
    name: "Juan J. Moreno",
    role: "Board Advisor · Founder @ Flokzu / Buho",
  },
  {
    quote:
      "Nicolás es un gran profesional y con mucho conocimiento técnico, pero especialmente gran proactividad e independencia para resolver todos los retos que surgen. Coincidimos en varios proyectos grandes juntos, muy contento por ello.",
    name: "José Luis Rivolta",
    role: "SEO Director @ Refindable",
  },
  {
    quote:
      "Nico has been a great asset to our team — bringing a wealth of knowledge around all things SEO. Our team and clients have significantly benefitted from his support. He brings a strong sense of passion, energy, and care to his clients.",
    name: "Jay Ives",
    role: "Founder / CEO @ Jives Media",
  },
  {
    quote:
      "Nico es un profesional excepcional en el mundo del SEO. Su capacidad para analizar datos, identificar oportunidades y ejecutar estrategias efectivas fue fundamental para el éxito de nuestros clientes. Un placer trabajar con él.",
    name: "Giampiero Trussoni",
    role: "Structural Engineer",
  },
];

// Capacidades (de la bio) para "Sobre mí"
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

const verticals = [
  "eCommerce (B2B / B2C)",
  "SaaS",
  "Medios de comunicación",
  "Agencias",
];

export default function Home() {
  // Una nota por categoría (la más reciente), para la fila del blog
  const blogRow = categories
    .map((cat) => getPostMetasByCategory(cat.slug)[0])
    .filter(Boolean);

  return (
    <>
      <JsonLd data={profilePageLd()} />
      <JsonLd
        data={itemListLd(
          "Proyectos",
          useCases.map((c) => ({ name: c.title, path: c.href }))
        )}
      />
      <Hero />

      {/* ── Del blog: una nota por categoría ── */}
      {blogRow.length > 0 && (
        <section id="blog" className="px-6 py-24 border-t border-border">
          <div className="max-w-6xl mx-auto">
            <Reveal>
              <div className="flex items-end justify-between gap-4 mb-12">
                <div>
                  <p className="eyebrow mb-4">Del blog</p>
                  <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight">
                    Últimas notas
                  </h2>
                </div>
                <Link
                  href="/#temas"
                  className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-coral hover:text-coral-soft transition-colors shrink-0"
                >
                  Ver temas <FiArrowRight />
                </Link>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {blogRow.map((post, i) => (
                <Reveal key={post!.slug} delay={i * 80}>
                  <PostCard post={post!} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sobre mí ── */}
      <section id="sobre-mi" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-6">Sobre mí</p>
            <p className="font-display text-2xl md:text-4xl font-medium leading-[1.25] max-w-4xl tracking-tight">
              Especialista en{" "}
              <span className="accent-cyan">Ciencia de Datos</span>: tomo datos
              crudos, dispersos, incompletos, rotos y sucios, y los transformo en
              insights accionables, modelos predictivos y procesos automatizados
              que ahorran horas de trabajo manual.
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-3 gap-x-10 gap-y-12 mt-16">
            {/* Trabajo con */}
            <div className="lg:col-span-2">
              <p className="font-mono text-xs uppercase tracking-widest text-coral mb-6">
                Trabajo con
              </p>
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                {capabilities.map((c, i) => (
                  <Reveal key={c} delay={i * 40}>
                    <li className="flex gap-3 text-muted leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-cyan shrink-0" />
                      <span>{c}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* Sectores */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-coral mb-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* ── Soluciones ── */}
      <section id="soluciones" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">Soluciones</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Qué puedo resolver
            </h2>
            <p className="text-muted max-w-xl mb-14">
              Sin tecnicismos: problemas concretos de negocio que la ciencia de
              datos y la IA resuelven. Si alguno te suena, escribime.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <SolutionCard s={s} />
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <Link
              href="/soluciones"
              className="inline-flex items-center gap-1 text-sm font-medium text-coral hover:text-cyan transition-colors"
            >
              Ver todas las soluciones <FiArrowUpRight size={15} />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Temas ── */}
      <section id="temas" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">En qué trabajo</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Temas
            </h2>
            <p className="text-muted max-w-xl mb-14">
              Cuatro categorías —cada una con su landing, subtemas, posts y
              notebooks—, de la ciencia de datos al despliegue en la nube.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
            {categories.map((col, i) => (
              <Reveal key={col.slug} delay={i * 80}>
                <Link
                  href={`/${col.slug}`}
                  className="group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-coral hover:text-coral-soft transition-colors mb-5"
                >
                  {col.name} <FiArrowUpRight size={13} />
                </Link>
                <ul className="flex flex-wrap gap-2.5">
                  {col.subcategories.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/${col.slug}/${item.slug}`}
                        className="inline-block text-sm text-muted border border-border rounded-full px-3.5 py-1.5 hover:border-cyan/50 hover:text-fg transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Casos de uso ── */}
      <section id="use-cases" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">Casos de uso</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Qué construí
            </h2>
            <p className="text-muted max-w-xl mb-14">
              Proyectos reales en datos, IA y automatización — algunos con su
              notebook embebido.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {useCases.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <Link
                  href={c.href}
                  className="group flex flex-col h-full rounded-2xl border border-border bg-surface/40 p-7 hover:border-cyan/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display text-xl font-medium tracking-tight group-hover:text-cyan transition-colors">
                      {c.title}
                    </h3>
                    <span className="shrink-0 font-mono text-[0.62rem] uppercase tracking-widest text-cyan border border-cyan/30 rounded-full px-2.5 py-1">
                      {c.badge}
                    </span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {c.desc}
                  </p>
                  <div className="flex flex-wrap gap-x-8 gap-y-3 mt-auto">
                    {c.stats.map((st) => (
                      <div key={st.l}>
                        <p className="font-display text-lg font-bold tracking-tight">
                          {st.v}
                        </p>
                        <p className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-2">
                          {st.l}
                        </p>
                      </div>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-coral opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver proyecto <FiArrowUpRight size={15} />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Notebook como tarjeta de enlace (no embed) */}
          <Reveal className="mt-8">
            <p className="font-mono text-xs uppercase tracking-widest text-coral mb-4">
              Notebook: buscador semántico (RAG + embeddings)
            </p>
            <ColabCard
              title="Chatbot RAG y evaluación de embeddings"
              url="/notebooks/buscador-rag.html"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Recomendaciones de LinkedIn ── */}
      <section id="recomendaciones" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">Recomendaciones</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-4">
              Lo que dicen de mí
            </h2>
            <p className="text-muted max-w-xl mb-14">
              Recomendaciones de colegas y clientes en LinkedIn.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recs.map((r, i) => (
              <Reveal key={r.name} delay={(i % 2) * 80}>
                <figure className="h-full rounded-2xl border border-border bg-surface/40 p-7">
                  <blockquote className="border-l-2 border-cyan pl-5 text-[0.95rem] text-fg/90 italic leading-relaxed">
                    “{r.quote}”
                  </blockquote>
                  <figcaption className="mt-5 pl-5">
                    <p className="font-display font-medium">{r.name}</p>
                    <p className="text-sm text-muted">{r.role}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Redes ── */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">En las redes</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-14">
              Seguime
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[
              { href: site.social.twitter, label: "X", handle: "@barshioni", Icon: FaXTwitter },
              { href: site.social.linkedin, label: "LinkedIn", handle: "Nico Bargioni", Icon: FaLinkedinIn },
            ]
              .filter((s) => s.href)
              .map(({ href, label, handle, Icon }, i) => (
                <Reveal key={label} delay={i * 80}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface/40 p-6 hover:border-cyan/40 transition-colors"
                  >
                    <span className="flex items-center gap-4">
                      <span className="grid place-items-center w-12 h-12 rounded-xl border border-border bg-bg text-fg group-hover:text-cyan transition-colors">
                        <Icon size={20} />
                      </span>
                      <span>
                        <span className="block font-display font-medium">
                          {label}
                        </span>
                        <span className="block text-sm text-muted">{handle}</span>
                      </span>
                    </span>
                    <FiArrowUpRight
                      className="text-muted-2 group-hover:text-coral transition-colors"
                      size={20}
                    />
                  </a>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* ── LLMs (preguntale a una IA) ── */}
      <section className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <p className="eyebrow mb-4">Pregúntale a una IA</p>
            <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-6">
              LLMs
            </h2>
            <p className="text-muted leading-relaxed max-w-2xl mb-10">
              ¿Preferís un resumen al toque? Pedile a tu asistente que te explique
              de qué va este sitio y quién soy.
            </p>
          </Reveal>
          <Reveal>
            <AskAiButtons
              path="/"
              prompt="explica el contenido de esta url y quien es Nicolás Bargioni"
              className="max-w-2xl"
            />
          </Reveal>
        </div>
      </section>

      {/* ── Contactame ── */}
      <section id="contacto" className="px-6 py-24 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <Reveal className="relative overflow-hidden rounded-3xl border border-coral/30 bg-gradient-to-br from-surface to-bg p-10 md:p-16">
            <div
              className="pointer-events-none absolute top-0 right-0 w-1/2 h-full opacity-50 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 80% 30%, rgba(255,107,61,0.25), transparent 60%)",
              }}
            />
            <div className="relative max-w-lg">
              <h2 className="font-display text-3xl md:text-5xl font-medium tracking-tight mb-4">
                Contactame
              </h2>
              <p className="text-muted mb-9">
                ¿Un proyecto de datos, IA o automatización? Escribime y lo
                charlamos.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-coral text-bg font-medium hover:bg-coral-soft transition-colors"
              >
                Escribime <FiArrowRight />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
