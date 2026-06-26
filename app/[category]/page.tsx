import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import Reveal from "@/app/components/Reveal";
import PostCard from "@/app/components/PostCard";
import HeroSection from "@/app/components/HeroSection";
import JsonLd from "@/app/components/JsonLd";
import { categories, getCategory } from "@/lib/taxonomy";
import { getPostMetasByCategory, postUrl } from "@/lib/posts";
import { breadcrumbLd, collectionLd, itemListLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return {
    title: cat.name,
    description: cat.description,
    alternates: { canonical: `/${cat.slug}` },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const posts = getPostMetasByCategory(cat.slug);

  return (
    <div className="pb-20">
      <JsonLd
        data={collectionLd({
          name: cat.name,
          description: cat.description,
          path: `/${cat.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: cat.name, path: `/${cat.slug}` },
        ])}
      />
      {posts.length > 0 && (
        <JsonLd
          data={itemListLd(
            cat.name,
            posts.map((p) => ({ name: p.title, path: postUrl(p) }))
          )}
        />
      )}
      {/* Hero de categoría con campo de embeddings */}
      <HeroSection>
        <Link
          href="/#temas"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Todos los temas
        </Link>
        <Reveal>
          <p className="eyebrow mb-5">{cat.eyebrow}</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight mb-5">
            {cat.name}
          </h1>
          <p className="text-muted text-lg max-w-2xl">{cat.description}</p>
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto">
        {/* Subcategorías (cada una con su landing) */}
        <div className="mt-16">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-8">
              Subtemas
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cat.subcategories.map((s, i) => (
              <Reveal key={s.slug} delay={i * 50}>
                <Link
                  href={`/${cat.slug}/${s.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface/40 px-5 py-4 hover:border-cyan/40 transition-colors"
                >
                  <span>
                    <span className="block font-medium group-hover:text-cyan transition-colors">
                      {s.name}
                    </span>
                    {s.colabs.length > 0 && (
                      <span className="font-mono text-[0.62rem] uppercase tracking-widest text-muted-2">
                        {s.colabs.length}{" "}
                        {s.colabs.length === 1 ? "notebook" : "notebooks"}
                      </span>
                    )}
                  </span>
                  <FiArrowUpRight
                    className="text-muted-2 group-hover:text-coral transition-colors shrink-0"
                    size={18}
                  />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Posts de la categoría */}
        {posts.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-8">
                Del blog
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 70}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
