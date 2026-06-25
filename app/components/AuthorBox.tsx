import Link from "next/link";
import { FaXTwitter, FaLinkedinIn } from "react-icons/fa6";
import { site } from "@/lib/site";

const socials = [
  { href: site.social.twitter, label: "X", Icon: FaXTwitter },
  { href: site.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
].filter((s) => s.href);

/** Caja de autor al pie de cada nota del blog. */
export default function AuthorBox() {
  return (
    <aside className="mt-16 rounded-2xl border border-border bg-surface/40 p-6 sm:p-7 flex flex-col sm:flex-row gap-5 sm:items-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/nico.jpg"
        alt={site.name}
        width={128}
        height={128}
        loading="lazy"
        className="shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border border-border"
      />

      <div className="flex-1">
        <p className="font-mono text-[0.62rem] uppercase tracking-widest text-coral mb-1">
          Escrito por
        </p>
        <Link
          href="/nico-bargioni"
          className="font-display text-lg font-medium hover:text-cyan transition-colors"
        >
          {site.name}
        </Link>
        <p className="text-sm text-muted leading-relaxed mt-1.5">
          {site.authorBio}
        </p>
      </div>

      <div className="flex sm:flex-col gap-3 sm:self-start">
        {socials.map(({ href, label, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="grid place-items-center w-9 h-9 rounded-full border border-border text-muted hover:text-cyan hover:border-cyan/50 transition-colors"
          >
            <Icon size={14} />
          </a>
        ))}
      </div>
    </aside>
  );
}
