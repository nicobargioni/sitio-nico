import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

/**
 * Headings de nivel 2 (##) de una nota, con el slug que genera rehype-slug
 * (mismo github-slugger), para armar una tabla de contenidos con anchors #.
 */
export function getHeadings(content: string): { text: string; slug: string }[] {
  const slugger = new GithubSlugger();
  const out: { text: string; slug: string }[] = [];
  let inFence = false;
  for (const line of content.split("\n")) {
    if (/^\s*```/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const text = m[1]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [texto](url) -> texto
      .replace(/[*_`]/g, "") // sacar negrita/itálica/código
      .trim();
    out.push({ text, slug: slugger.slug(text) });
  }
  return out;
}

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO: YYYY-MM-DD
  excerpt: string;
  tags: string[];
  category: string; // slug de categoría (ver lib/taxonomy.ts); "" si no aplica
  subcategory: string; // subcategoría dentro de la categoría; "" si no aplica
};

export type Post = PostMeta & { content: string };

function readPostFile(fileName: string): Post {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tags: data.tags ?? [],
    category: data.category ?? "",
    subcategory: data.subcategory ?? "",
    content,
  };
}

/** Lista de posts ordenada por fecha desc (lee todos los .md/.mdx de content/blog). */
export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPostFile)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMetas(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ content, ...meta }) => meta);
}

export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** Posts (metadata) de una categoría, ordenados por fecha desc. */
export function getPostMetasByCategory(categorySlug: string): PostMeta[] {
  return getPostMetas().filter((p) => p.category === categorySlug);
}

/** Posts (metadata) de una subcategoría dentro de una categoría. */
export function getPostMetasBySubcategory(
  categorySlug: string,
  subSlug: string
): PostMeta[] {
  return getPostMetas().filter(
    (p) => p.category === categorySlug && p.subcategory === subSlug
  );
}

/** URL del post dentro de su silo: /categoría/subcategoría/slug */
export function postUrl(p: {
  category: string;
  subcategory: string;
  slug: string;
}): string {
  return `/${p.category}/${p.subcategory}/${p.slug}`;
}

/** Formatea "2026-06-24" -> "24 jun 2026" (sin "de", en una sola línea) */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  const month = d
    .toLocaleDateString("es-AR", { month: "short" })
    .replace(/\.$/, "");
  return `${d.getDate()} ${month} ${d.getFullYear()}`;
}
