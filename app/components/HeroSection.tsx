import EmbeddingField from "./EmbeddingField";

/**
 * Hero reutilizable para las páginas internas (categorías, subcategorías, posts):
 * mismo efecto del home — campo de embeddings animado que sigue el cursor — detrás
 * del contenido. El contenido va como children, por encima (z-10).
 */
export default function HeroSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`relative overflow-hidden px-6 pt-36 pb-16 border-b border-border ${className}`}
    >
      <div className="pointer-events-none absolute inset-0">
        <EmbeddingField />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">{children}</div>
    </section>
  );
}
