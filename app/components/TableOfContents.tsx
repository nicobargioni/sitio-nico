/**
 * Tabla de contenidos enumerada: lista ordenada con anchors (#slug) a cada
 * sección (heading ## ) de la nota. Los slugs vienen de getHeadings (mismo
 * github-slugger que rehype-slug), así los enlaces caen justo en cada heading.
 */
export default function TableOfContents({
  headings,
  className = "",
}: {
  headings: { text: string; slug: string }[];
  className?: string;
}) {
  if (headings.length === 0) return null;
  return (
    <nav
      aria-label="Tabla de contenidos"
      className={`rounded-xl border border-border bg-surface/40 p-5 ${className}`}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-muted-2 mb-3">
        Contenido
      </p>
      <ol className="list-decimal list-inside space-y-2 marker:text-coral marker:font-mono marker:text-sm">
        {headings.map((h) => (
          <li key={h.slug} className="leading-snug">
            <a
              href={`#${h.slug}`}
              className="text-muted hover:text-cyan transition-colors"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
