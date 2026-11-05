import Link from "next/link";
import { FiArrowLeft, FiArrowUpRight, FiExternalLink } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import JsonLd from "@/app/components/JsonLd";
import { breadcrumbLd, scholarlyArticleLd } from "@/lib/jsonld";
import { doiUrl, studies, type Study } from "@/lib/research";

/** Bloque de texto de una sección del estudio (h2 + párrafos). */
export function StudySection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 scroll-mt-24">
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-5">
        {title}
      </h2>
      <div className="space-y-4 text-muted leading-relaxed [&_strong]:text-fg [&_strong]:font-medium [&_a]:text-cyan [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-coral">
        {children}
      </div>
    </section>
  );
}

/** Dato destacado: una cifra grande con su explicación. */
export function KeyFigure({
  value,
  children,
}: {
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div className="my-6 rounded-2xl border border-coral/30 bg-surface/40 p-6 sm:p-7">
      <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-coral leading-tight break-words">
        {value}
      </p>
      <p className="text-fg/90 leading-relaxed mt-3">{children}</p>
    </div>
  );
}

function cite(s: Study) {
  const names = s.authors.map((a) => {
    const [first, ...rest] = a.name.split(" ");
    return `${rest.join(" ")}, ${first[0]}.`;
  });
  const who = names.length > 1 ? `${names.slice(0, -1).join(", ")} & ${names.at(-1)}` : names[0];
  return `${who} (${s.date.slice(0, 4)}). ${s.title}. Zenodo. ${doiUrl(s.doi)}`;
}

/** Estructura común de la página de un estudio. */
export default function StudyLayout({
  study,
  children,
}: {
  study: Study;
  children: React.ReactNode;
}) {
  const path = `/investigacion/${study.slug}`;
  const others = studies.filter((s) => s.slug !== study.slug);

  return (
    <div className="pb-24">
      <JsonLd data={scholarlyArticleLd(study)} />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Investigación", path: "/investigacion" },
          { name: study.shortTitle, path },
        ])}
      />

      <HeroSection>
        <Link
          href="/investigacion"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Investigación
        </Link>
        <div className="max-w-4xl">
          <p className="eyebrow mb-4">{study.kind}</p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-[1.1] break-words">
            {study.title}
          </h1>
          <p className="text-sm text-muted mt-5">
            {study.authors.map((a, i) => (
              <span key={a.name}>
                {i > 0 && " · "}
                {a.self ? (
                  <Link href="/sobre-mi" className="text-fg hover:text-cyan transition-colors">
                    {a.name}
                  </Link>
                ) : (
                  <span className="text-fg">{a.name}</span>
                )}
                {a.role && <span className="text-muted-2">, {a.role}</span>}
              </span>
            ))}
            <span className="text-muted-2"> · {study.dateLabel}</span>
          </p>

          {/* Frase autocontenida, pensada para que se pueda citar tal cual */}
          <p className="mt-8 border-l-2 border-cyan pl-5 text-lg md:text-xl text-fg leading-relaxed">
            {study.citable}
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-9">
            {study.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noopener"
                className={
                  l.primary
                    ? "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-coral text-white font-medium hover:bg-coral-soft transition-colors"
                    : "inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border text-sm font-medium hover:border-cyan/50 hover:text-cyan transition-colors"
                }
              >
                {l.label} <FiExternalLink size={15} />
              </a>
            ))}
          </div>
          <p className="font-mono text-xs text-muted-2 mt-5 break-words">
            DOI{" "}
            <a href={doiUrl(study.doi)} target="_blank" rel="noopener" className="hover:text-cyan underline underline-offset-2">
              {study.doi}
            </a>{" "}
            · {study.license}
          </p>
        </div>
      </HeroSection>

      <article className="px-6 max-w-3xl mx-auto">
        <p className="mt-12 text-sm text-muted-2 leading-relaxed">
          Este es mi resumen en castellano. La versión de referencia, con el método
          completo y todas las cifras, es la publicada con DOI en Zenodo.
        </p>

        {children}

        <section className="mt-14">
          <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-5">
            Cómo citarlo
          </h2>
          <p className="font-mono text-sm text-muted leading-relaxed rounded-2xl border border-border bg-surface/40 p-5 break-words">
            {cite(study)}
          </p>
          {study.relatedDois && (
            <ul className="mt-4 space-y-1 text-sm text-muted">
              {study.relatedDois.map((r) => (
                <li key={r.doi}>
                  {r.label}:{" "}
                  <a href={doiUrl(r.doi)} target="_blank" rel="noopener" className="text-cyan hover:text-coral underline underline-offset-2 break-all">
                    {r.doi}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </section>

        {others.length > 0 && (
          <section className="mt-14 pt-10 border-t border-border">
            <p className="eyebrow mb-5">Otros estudios</p>
            <div className="grid gap-4">
              {others.map((s) => (
                <Link
                  key={s.slug}
                  href={`/investigacion/${s.slug}`}
                  className="group rounded-2xl border border-border bg-surface/40 p-6 hover:border-cyan/40 transition-colors"
                >
                  <p className="font-mono text-[0.62rem] uppercase tracking-widest text-cyan mb-2">
                    {s.kind} · {s.date.slice(0, 4)}
                  </p>
                  <p className="font-display text-lg font-medium tracking-tight group-hover:text-cyan transition-colors">
                    {s.title}
                  </p>
                  <p className="text-sm text-muted mt-2 leading-relaxed">{s.excerpt}</p>
                </Link>
              ))}
            </div>
            <Link
              href="/investigacion"
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-coral hover:text-coral-soft transition-colors"
            >
              Todas las publicaciones <FiArrowUpRight size={15} />
            </Link>
          </section>
        )}
      </article>
    </div>
  );
}
