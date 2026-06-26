import Link from "next/link";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { SiGooglegemini, SiOpenai } from "react-icons/si";
import Reveal from "@/app/components/Reveal";
import { SOLUTION_ICONS } from "@/app/components/SolutionCard";
import { geminiUrl, chatgptUrl } from "@/app/components/AskAiButtons";
import CountUp from "./restyle-2/CountUp";
import { useCases, recs, capabilities, verticals } from "./labData";
import { featuredSolutions } from "@/lib/solutions";
import { categories } from "@/lib/taxonomy";
import { getPostMetasByCategory, postUrl, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";

type Theme = "mono" | "navy";

const TOKENS = {
  mono: {
    eyebrow: "text-white/45",
    muted: "text-white/55",
    muted2: "text-white/40",
    border: "border-white/10",
    card: "bg-white/[0.03] border border-white/10",
    cardHover: "hover:border-white/30",
    chip: "border border-white/15 text-white/70 hover:border-white/40 hover:text-white",
    iconWrap: "border border-white/15 text-white",
    dot: "bg-white/70",
    link: "text-white/70",
    accent: "text-white",
    cta: "bg-white text-black hover:bg-white/85",
    badge: "border-white/25 text-white/70",
    headNum: "text-white",
  },
  navy: {
    eyebrow: "text-blue-300/70",
    muted: "text-white/55",
    muted2: "text-white/45",
    border: "border-white/10",
    card: "bg-white/[0.03] border border-white/10 backdrop-blur-sm",
    cardHover: "hover:border-blue-400/40",
    chip: "border border-white/12 text-white/70 hover:border-blue-400/40 hover:text-white",
    iconWrap: "bg-blue-500/15 border border-blue-400/30 text-blue-200",
    dot: "bg-blue-400",
    link: "text-blue-300",
    accent: "text-blue-300",
    cta: "bg-blue-500 text-white hover:bg-blue-400 shadow-[0_0_30px_-6px_rgba(59,130,246,0.8)]",
    badge: "border-blue-400/30 text-blue-200",
    headNum: "bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent",
  },
} as const;

const STATS = [
  { to: 58, label: "Soluciones" },
  { to: 125, label: "Notas técnicas" },
  { to: 59, label: "Notebooks" },
  { to: 8, label: "Casos / proyectos" },
];

function Eyebrow({ t, children }: { t: (typeof TOKENS)[Theme]; children: React.ReactNode }) {
  return (
    <p className={`font-mono text-xs uppercase tracking-[0.25em] mb-4 ${t.eyebrow}`}>{children}</p>
  );
}

export default function LabSections({ theme }: { theme: Theme }) {
  const t = TOKENS[theme];
  const blogRow = categories.map((c) => getPostMetasByCategory(c.slug)[0]).filter(Boolean);
  const aiPrompt = `explica el contenido de esta url y quien es Nicolás Bargioni ${site.url}`;
  const H = "font-display font-medium tracking-tight text-white text-3xl md:text-5xl";

  return (
    <div className="relative z-10">
      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 border-y ${t.border} py-10`}>
          {STATS.map((s) => (
            <Reveal key={s.label}>
              <p className={`font-display font-medium tracking-tight text-4xl md:text-5xl ${t.headNum}`}>
                <CountUp to={s.to} />
              </p>
              <p className={`text-sm mt-2 ${t.muted2}`}>{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Sobre mí */}
      <section id="sobre-mi" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>Sobre mí</Eyebrow>
          <p className="font-display text-2xl md:text-4xl font-medium leading-[1.25] max-w-4xl tracking-tight text-white">
            Especialista en <span className={t.accent}>Ciencia de Datos</span>: tomo datos crudos,
            dispersos, incompletos, rotos y sucios, y los transformo en insights accionables, modelos
            predictivos y procesos automatizados que ahorran horas de trabajo manual.
          </p>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-x-10 gap-y-12 mt-16">
          <div className="lg:col-span-2">
            <p className={`font-mono text-xs uppercase tracking-widest mb-6 ${t.accent}`}>Trabajo con</p>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {capabilities.map((c, i) => (
                <Reveal key={c} delay={i * 40}>
                  <li className={`flex gap-3 leading-relaxed ${t.muted}`}>
                    <span className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 lab-pulse ${t.dot}`} />
                    <span>{c}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <p className={`font-mono text-xs uppercase tracking-widest mb-6 ${t.accent}`}>Sectores</p>
            <ul className="flex flex-wrap gap-2.5">
              {verticals.map((v) => (
                <li key={v} className={`text-sm rounded-full px-3.5 py-1.5 transition-colors ${t.chip}`}>{v}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Soluciones */}
      <section id="soluciones" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>Soluciones</Eyebrow>
          <h2 className={`${H} mb-4`}>Qué puedo resolver</h2>
          <p className={`${t.muted} max-w-xl mb-12`}>
            Problemas concretos de negocio que la ciencia de datos y la IA resuelven.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featuredSolutions.map((s, i) => {
            const Icon = SOLUTION_ICONS[s.icon] ?? FiArrowUpRight;
            return (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link href={`/soluciones/${s.slug}`} className={`group flex flex-col h-full rounded-2xl p-6 transition-colors ${t.card} ${t.cardHover}`}>
                  <span className={`grid place-items-center w-11 h-11 rounded-xl mb-4 lab-floaty ${t.iconWrap}`} style={{ animationDelay: `${(i % 6) * 0.4}s` }}>
                    <Icon size={18} />
                  </span>
                  <h3 className="font-display text-lg font-medium tracking-tight mb-2 text-white">{s.titulo}</h3>
                  <p className={`text-sm leading-relaxed flex-1 ${t.muted}`}>{s.dolor}</p>
                  <span className={`mt-5 inline-flex items-center gap-1 text-sm font-medium ${t.link}`}>Ver solución <FiArrowUpRight size={14} /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-10">
          <Link href="/soluciones" className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${t.chip}`}>
            Ver más soluciones <FiArrowUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      {/* Temas */}
      <section id="temas" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>En qué trabajo</Eyebrow>
          <h2 className={`${H} mb-4`}>Temas</h2>
          <p className={`${t.muted} max-w-xl mb-12`}>De la ciencia de datos al despliegue en la nube.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-12">
          {categories.map((col, i) => (
            <Reveal key={col.slug} delay={i * 80}>
              <Link href={`/${col.slug}`} className={`group inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest mb-5 ${t.accent}`}>
                {col.name} <FiArrowUpRight size={13} />
              </Link>
              <ul className="flex flex-wrap gap-2.5">
                {col.subcategories.map((item) => (
                  <li key={item.slug}>
                    <Link href={`/${col.slug}/${item.slug}`} className={`inline-block text-sm rounded-full px-3.5 py-1.5 transition-colors ${t.chip}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Casos */}
      <section id="casos" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>Casos de uso</Eyebrow>
          <h2 className={`${H} mb-4`}>Qué construí</h2>
          <p className={`${t.muted} max-w-xl mb-12`}>Proyectos reales en datos, IA y automatización.</p>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {useCases.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 80}>
              <Link href={c.href} className={`group flex flex-col h-full rounded-2xl p-7 transition-colors ${t.card} ${t.cardHover}`}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="font-display text-xl font-medium tracking-tight text-white">{c.title}</h3>
                  <span className={`shrink-0 font-mono text-[0.62rem] uppercase tracking-widest border rounded-full px-2.5 py-1 ${t.badge}`}>{c.badge}</span>
                </div>
                <p className={`text-sm leading-relaxed mb-6 ${t.muted}`}>{c.desc}</p>
                <div className="flex flex-wrap gap-x-8 gap-y-3 mt-auto">
                  {c.stats.map((st) => (
                    <div key={st.l}>
                      <p className="font-display text-lg font-bold tracking-tight text-white">{st.v}</p>
                      <p className={`font-mono text-[0.62rem] uppercase tracking-widest ${t.muted2}`}>{st.l}</p>
                    </div>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Blog */}
      {blogRow.length > 0 && (
        <section id="blog" className="max-w-7xl mx-auto px-6 py-24">
          <Reveal>
            <Eyebrow t={t}>Del blog</Eyebrow>
            <h2 className={`${H} mb-12`}>Últimas notas</h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogRow.map((p, i) => (
              <Reveal key={p!.slug} delay={i * 80}>
                <Link href={postUrl(p!)} className={`group flex flex-col h-full rounded-2xl p-6 transition-colors ${t.card} ${t.cardHover}`}>
                  <p className={`font-mono text-[0.6rem] uppercase tracking-widest mb-3 ${t.muted2}`}>{formatDate(p!.date)}</p>
                  <p className="font-display font-medium leading-snug mb-3 flex-1 text-white">{p!.title}</p>
                  <span className={`text-xs font-medium inline-flex items-center gap-1 ${t.link}`}>Leer <FiArrowUpRight size={12} /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Recomendaciones */}
      <section id="recomendaciones" className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>Recomendaciones</Eyebrow>
          <h2 className={`${H} mb-12`}>Lo que dicen de mí</h2>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recs.map((r, i) => (
            <Reveal key={r.name} delay={(i % 2) * 80}>
              <figure className={`h-full rounded-2xl p-7 ${t.card}`}>
                <blockquote className={`pl-5 border-l-2 ${theme === "navy" ? "border-blue-400" : "border-white/40"} text-[0.95rem] text-white/85 italic leading-relaxed`}>
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 pl-5">
                  <p className="font-display font-medium text-white">{r.name}</p>
                  <p className={`text-sm ${t.muted}`}>{r.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Redes */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>En las redes</Eyebrow>
          <h2 className={`${H} mb-12`}>Seguime</h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { href: site.social.twitter, label: "X", handle: "@barshioni", Icon: FaXTwitter },
            { href: site.social.linkedin, label: "LinkedIn", handle: "Nico Bargioni", Icon: FaLinkedinIn },
          ].filter((s) => s.href).map(({ href, label, handle, Icon }, i) => (
            <Reveal key={label} delay={i * 80}>
              <a href={href} target="_blank" rel="noopener noreferrer" className={`group flex items-center justify-between rounded-2xl p-6 transition-colors ${t.card} ${t.cardHover}`}>
                <span className="flex items-center gap-4">
                  <span className={`grid place-items-center w-12 h-12 rounded-xl ${t.iconWrap}`}><Icon size={20} /></span>
                  <span>
                    <span className="block font-display font-medium text-white">{label}</span>
                    <span className={`block text-sm ${t.muted}`}>{handle}</span>
                  </span>
                </span>
                <FiArrowUpRight className={t.muted2} size={20} />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* LLMs */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <Reveal>
          <Eyebrow t={t}>Pregúntale a una IA</Eyebrow>
          <h2 className={`${H} mb-6`}>LLMs</h2>
          <p className={`${t.muted} max-w-2xl mb-10`}>Pedile a tu asistente que te explique de qué va este sitio y quién soy.</p>
        </Reveal>
        <Reveal>
          <div className="flex flex-col gap-3 max-w-2xl">
            <a href={geminiUrl(aiPrompt)} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2.5 w-full rounded-lg px-5 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors ${t.card} ${t.cardHover}`}>
              <SiGooglegemini className={t.accent} size={18} /> Consultar en Gemini
            </a>
            <a href={chatgptUrl(aiPrompt)} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center gap-2.5 w-full rounded-lg px-5 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors ${t.card} ${t.cardHover}`}>
              <SiOpenai size={18} /> Consultar en ChatGPT
            </a>
          </div>
        </Reveal>
      </section>

      {/* Contacto */}
      <section id="contacto" className="max-w-7xl mx-auto px-6 py-28 text-center">
        <Reveal>
          <h2 className="font-display font-medium tracking-tight text-[clamp(2rem,5vw,4rem)] leading-tight text-white">
            ¿Tenés un proyecto de datos o IA?
          </h2>
          <a href={`mailto:${site.email}`} className={`inline-flex items-center gap-2 mt-8 rounded-full px-8 py-4 font-medium transition-colors ${t.cta}`}>
            Escribime <FiArrowRight size={16} />
          </a>
        </Reveal>
      </section>
    </div>
  );
}
