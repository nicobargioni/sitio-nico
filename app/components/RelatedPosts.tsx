import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import {
  getPostMetasByCategory,
  getPostMetas,
  formatDate,
  postUrl,
  type PostMeta,
} from "@/lib/posts";
import { getCategory } from "@/lib/taxonomy";

/** Tarjeta compacta de nota (para interlinking). */
function RelatedCard({ p }: { p: PostMeta }) {
  return (
    <Link
      href={postUrl(p)}
      className="group flex flex-col h-full rounded-xl border border-border bg-surface/40 p-5 hover:border-cyan/40 transition-colors"
    >
      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-muted-2 mb-2">
        {formatDate(p.date)}
      </p>
      <p className="font-display text-sm font-medium leading-snug mb-3 flex-1 group-hover:text-cyan transition-colors">
        {p.title}
      </p>
      <span className="text-xs font-medium text-coral inline-flex items-center gap-1">
        Leer <FiArrowUpRight size={12} />
      </span>
    </Link>
  );
}

/**
 * Interlinking al pie de cada nota: dos cajas de 4 tarjetas.
 * Prioriza notas de la MISMA categoría; si no alcanzan, completa con otras
 * recientes para mantener el layout.
 */
export default function RelatedPosts({ post }: { post: PostMeta }) {
  const sameCat = getPostMetasByCategory(post.category).filter(
    (p) => p.slug !== post.slug
  );
  const rest = getPostMetas().filter(
    (p) => p.slug !== post.slug && !sameCat.some((s) => s.slug === p.slug)
  );
  const pool = [...sameCat, ...rest].slice(0, 8);
  if (pool.length === 0) return null;

  const catName = getCategory(post.category)?.name ?? "el tema";
  const boxes = [
    { title: `Más en ${catName}`, items: pool.slice(0, 4) },
    { title: "También te puede interesar", items: pool.slice(4, 8) },
  ].filter((b) => b.items.length > 0);

  return (
    <section className="px-6 max-w-6xl mx-auto mt-20 pt-14 border-t border-border">
      <p className="eyebrow mb-10">Seguí explorando</p>
      <div className="flex flex-col gap-12">
        {boxes.map((box) => (
          <div key={box.title}>
            <h2 className="font-display text-xl md:text-2xl font-medium tracking-tight mb-6">
              {box.title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {box.items.map((p) => (
                <RelatedCard key={p.slug} p={p} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
