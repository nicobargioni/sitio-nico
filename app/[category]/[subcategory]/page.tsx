import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Reveal from "@/app/components/Reveal";
import PostCard from "@/app/components/PostCard";
import ColabCard from "@/app/components/ColabCard";
import AskAiButtons from "@/app/components/AskAiButtons";
import HeroSection from "@/app/components/HeroSection";
import JsonLd from "@/app/components/JsonLd";
import { categories, getSubcategory } from "@/lib/taxonomy";
import { getPostMetasBySubcategory, postUrl } from "@/lib/posts";
import {
  breadcrumbLd,
  collectionLd,
  itemListLd,
  softwareSourceCodeLd,
} from "@/lib/jsonld";

export function generateStaticParams() {
  return categories.flatMap((c) =>
    c.subcategories.map((s) => ({ category: c.slug, subcategory: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}): Promise<Metadata> {
  const { category, subcategory } = await params;
  const found = getSubcategory(category, subcategory);
  if (!found) return {};
  return {
    title: `${found.subcategory.name} · ${found.category.name}`,
    description: `${found.subcategory.name} — notebooks y posts de ${found.category.name}.`,
  };
}

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;
  const found = getSubcategory(category, subcategory);
  if (!found) notFound();
  const { category: cat, subcategory: sub } = found;

  const posts = getPostMetasBySubcategory(cat.slug, sub.slug);

  return (
    <div className="pb-20">
      <JsonLd
        data={collectionLd({
          name: `${sub.name} · ${cat.name}`,
          description: `${sub.name} — notebooks y posts de ${cat.name}.`,
          path: `/${cat.slug}/${sub.slug}`,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: cat.name, path: `/${cat.slug}` },
          { name: sub.name, path: `/${cat.slug}/${sub.slug}` },
        ])}
      />
      {posts.length > 0 && (
        <JsonLd
          data={itemListLd(
            sub.name,
            posts.map((p) => ({ name: p.title, path: postUrl(p) }))
          )}
        />
      )}
      {sub.colabs.map((c) => (
        <JsonLd key={c.url} data={softwareSourceCodeLd(c)} />
      ))}
      {/* Hero de subcategoría con campo de embeddings */}
      <HeroSection>
        <Link
          href={`/${cat.slug}`}
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> {cat.name}
        </Link>
        <Reveal>
          <p className="eyebrow mb-5">{cat.name}</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
            {sub.name}
          </h1>
          {sub.description && (
            <div className="mt-7 max-w-2xl space-y-4">
              {sub.description.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          )}
          <AskAiButtons
            path={`/${cat.slug}/${sub.slug}`}
            className="mt-9 max-w-2xl"
          />
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto">
        {/* Notebooks (cajas de Colab) */}
        {sub.colabs.length > 0 && (
          <div className="mt-16">
            <Reveal>
              <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-6">
                Notebooks
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {sub.colabs.map((c, i) => (
                <Reveal key={c.url} delay={i * 70}>
                  <ColabCard title={c.title} url={c.url} />
                </Reveal>
              ))}
            </div>
          </div>
        )}

        {/* Posts de la subcategoría */}
        <div className="mt-20">
          <Reveal>
            <h2 className="font-display text-2xl md:text-3xl font-medium tracking-tight mb-8">
              Del blog
            </h2>
          </Reveal>
          {posts.length === 0 ? (
            <Reveal>
              <p className="text-muted">
                Todavía no hay posts en este subtema.
              </p>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={i * 70}>
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
