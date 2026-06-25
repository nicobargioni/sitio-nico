import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import HeroSection from "@/app/components/HeroSection";
import PostCover from "@/app/components/PostCover";
import AuthorBox from "@/app/components/AuthorBox";
import RelatedPosts from "@/app/components/RelatedPosts";
import AskAiButtons from "@/app/components/AskAiButtons";
import ShareButtons from "@/app/components/ShareButtons";
import TableOfContents from "@/app/components/TableOfContents";
import RelatedNoteCard from "@/app/components/RelatedNoteCard";
import JsonLd from "@/app/components/JsonLd";
import {
  getPostMetas,
  getPostBySlug,
  getHeadings,
  getPostMetasBySubcategory,
  getPostMetasByCategory,
  formatDate,
  postUrl,
} from "@/lib/posts";
import { getSubcategory } from "@/lib/taxonomy";
import { blogPostingLd, breadcrumbLd } from "@/lib/jsonld";

export function generateStaticParams() {
  return getPostMetas()
    .filter((p) => p.category && p.subcategory)
    .map((p) => ({
      category: p.category,
      subcategory: p.subcategory,
      slug: p.slug,
    }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; subcategory: string; slug: string }>;
}) {
  const { category, subcategory, slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const found = getSubcategory(category, subcategory);
  const path = postUrl(post);
  const headings = getHeadings(post.content);

  // Bloques del cuerpo. Tras el 1er bloque va el CTA de Gemini + TOC; tras el
  // 4º párrafo de prosa va la caja de nota relacionada.
  const blocks = post.content.split(/\n\n+/);
  const isPara = (b: string) => !/^\s*(#|>|[-*]\s|\d+\.\s|```|\||!\[)/.test(b);
  let paras = 0;
  let splitIdx = blocks.length - 1;
  for (let i = 1; i < blocks.length; i++) {
    if (isPara(blocks[i]) && ++paras === 4) {
      splitIdx = i;
      break;
    }
  }
  const midContent = blocks.slice(1, splitIdx + 1).join("\n\n");
  const tailContent = blocks.slice(splitIdx + 1).join("\n\n");

  // Nota relacionada: otra del mismo subtema; si no hay, de la misma categoría.
  const related = [
    ...getPostMetasBySubcategory(category, subcategory),
    ...getPostMetasByCategory(category),
  ].find((p) => p.slug !== slug);

  return (
    <article className="pb-20">
      <JsonLd
        data={blogPostingLd({
          title: post.title,
          excerpt: post.excerpt,
          date: post.date,
          path,
          tags: post.tags,
          section: found?.category.name,
          wordCount: post.content.trim().split(/\s+/).length,
        })}
      />
      <JsonLd
        data={breadcrumbLd([
          { name: "Inicio", path: "/" },
          ...(found
            ? [
                { name: found.category.name, path: `/${category}` },
                { name: found.subcategory.name, path: `/${category}/${subcategory}` },
              ]
            : []),
          { name: post.title, path },
        ])}
      />
      {/* Encabezado del post con campo de embeddings */}
      <HeroSection>
        <div className="max-w-2xl mx-auto">
          <Link
            href={`/${category}/${subcategory}`}
            className="inline-flex items-center gap-1 text-sm text-muted hover:text-cyan transition-colors mb-10"
          >
            <FiArrowLeft /> {found ? found.subcategory.name : "Volver"}
          </Link>
          <div className="flex items-center gap-3 font-mono text-xs text-muted-2 mb-5">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.tags.map((t) => (
              <span key={t} className="text-coral">
                #{t}
              </span>
            ))}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-[1.1]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg md:text-xl text-muted leading-relaxed mt-6">
              {post.excerpt}
            </p>
          )}
        </div>
      </HeroSection>

      <div className="px-6 max-w-2xl mx-auto pt-14">
        <PostCover
          category={category}
          title={post.title}
          className="rounded-xl border border-border mb-12"
        />
        <div className="prose">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
            {blocks[0]}
          </ReactMarkdown>
        </div>
        <AskAiButtons path={path} chatgpt={false} className="my-8" />
        <TableOfContents headings={headings} className="my-8" />
        {midContent && (
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {midContent}
            </ReactMarkdown>
          </div>
        )}
        {related && <RelatedNoteCard post={related} className="my-10" />}
        {tailContent && (
          <div className="prose">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSlug]}>
              {tailContent}
            </ReactMarkdown>
          </div>
        )}
        <div className="mt-12 pt-8 border-t border-border">
          <ShareButtons path={path} title={post.title} />
        </div>
        <AuthorBox />
      </div>

      <RelatedPosts post={post} />
    </article>
  );
}
