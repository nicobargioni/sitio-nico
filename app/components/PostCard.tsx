import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { formatDate, postUrl, type PostMeta } from "@/lib/posts";
import PostCover from "./PostCover";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={postUrl(post)}
      className="group flex flex-col h-full rounded-2xl border border-border bg-surface/40 overflow-hidden hover:border-cyan/40 transition-colors"
    >
      <PostCover category={post.category} title={post.title} />
      <div className="flex flex-col flex-1 p-7">
        <time
          dateTime={post.date}
          className="block font-mono text-[0.66rem] text-muted-2 whitespace-nowrap mb-3"
        >
          {formatDate(post.date)}
        </time>
        <h3 className="font-display text-lg font-medium tracking-tight leading-snug mb-2 group-hover:text-cyan transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between gap-3 mt-6">
          <span className="text-sm font-medium text-cyan inline-flex items-center gap-1 shrink-0">
            Leer <FiArrowUpRight />
          </span>
          {post.tags.length > 0 && (
            <span className="font-mono text-[0.58rem] text-coral truncate text-right">
              {post.tags.slice(0, 2).map((t) => `#${t}`).join("  ")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
