import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import HeroSection from "@/app/components/HeroSection";
import Reveal from "@/app/components/Reveal";
import PostCard from "@/app/components/PostCard";
import JsonLd from "@/app/components/JsonLd";
import { getPostMetas, postUrl } from "@/lib/posts";
import { site } from "@/lib/site";
import { breadcrumbLd, itemListLd } from "@/lib/jsonld";

export const metadata: Metadata = {
  title: "Blog — Datos, IA y automatización",
  description:
    "Notas y curiosidades sobre data science, machine learning, IA aplicada, automatización y cloud, por Nicolás Bargioni.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogPage() {
  const posts = getPostMetas();
  return (
    <div className="pb-24">
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <JsonLd
        data={itemListLd(
          "Blog",
          posts.map((p) => ({ name: p.title, path: postUrl(p) }))
        )}
      />

      <HeroSection>
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
        >
          <FiArrowLeft /> Inicio
        </Link>
        <Reveal>
          <p className="eyebrow mb-4">Blog</p>
          <h1 className="font-display text-4xl md:text-6xl font-medium tracking-tight">
            Notas sobre datos, IA y automatización
          </h1>
          <p className="text-lg md:text-xl text-muted mt-6 max-w-2xl leading-relaxed">
            Curiosidades y aprendizajes de data science, machine learning, IA
            aplicada y automatización. {posts.length} notas y contando.
          </p>
        </Reveal>
      </HeroSection>

      <div className="px-6 max-w-6xl mx-auto mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i, 8) * 50}>
              <PostCard post={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
