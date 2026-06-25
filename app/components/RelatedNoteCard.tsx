import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import PostCover from "./PostCover";
import { postUrl, type PostMeta } from "@/lib/posts";

/**
 * Caja de "nota relacionada" para incrustar dentro de un post: imagen destacada
 * (PostCover), título, bajada (excerpt) y link a la nota.
 */
export default function RelatedNoteCard({
  post,
  className = "",
}: {
  post: PostMeta;
  className?: string;
}) {
  return (
    <Link
      href={postUrl(post)}
      className={`group flex flex-col sm:flex-row gap-5 rounded-xl border border-border bg-surface/40 p-4 hover:border-cyan/40 transition-colors not-prose ${className}`}
    >
      <PostCover
        category={post.category}
        title={post.title}
        className="w-full sm:w-48 shrink-0 rounded-lg"
      />
      <div className="min-w-0 flex flex-col justify-center">
        <p className="font-mono text-[0.6rem] uppercase tracking-widest text-coral mb-2">
          Nota relacionada
        </p>
        <p className="font-display text-lg font-medium leading-snug group-hover:text-cyan transition-colors">
          {post.title}
        </p>
        {post.excerpt && (
          <p className="text-sm text-muted leading-relaxed mt-2 line-clamp-3">
            {post.excerpt}
          </p>
        )}
        <span className="text-xs font-medium text-coral inline-flex items-center gap-1 mt-3">
          Leer nota <FiArrowUpRight size={13} />
        </span>
      </div>
    </Link>
  );
}
