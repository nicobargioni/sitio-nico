import Link from "next/link";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";
import { site } from "@/lib/site";
import { categories } from "@/lib/taxonomy";

const socials = [
  { href: site.social.twitter, label: "X", Icon: FaXTwitter },
  { href: site.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
].filter((s) => s.href);

export default function Footer() {
  return (
    <footer className="border-t border-border mt-8">
      {/* Mapa del sitio: todas las categorías y subtemas */}
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-5 gap-x-8 gap-y-10">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="flex items-center gap-2.5 mb-3">
            <span className="text-coral text-2xl font-display font-bold leading-none">
              ⟫
            </span>
            <span className="font-display font-medium tracking-tight">
              {site.shortName}
            </span>
          </Link>
          <p className="text-sm text-muted leading-relaxed max-w-xs">
            {site.tagline}
          </p>
        </div>

        {categories.map((cat) => (
          <nav key={cat.slug} aria-label={cat.name}>
            <Link
              href={`/${cat.slug}`}
              className="block font-display text-sm font-medium mb-3 hover:text-cyan transition-colors"
            >
              {cat.name}
            </Link>
            <ul className="flex flex-col gap-2">
              {cat.subcategories.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/${cat.slug}/${s.slug}`}
                    className="text-xs text-muted hover:text-fg transition-colors"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Barra inferior */}
      <div className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-2 order-2 sm:order-1">
            © {new Date().getFullYear()} {site.name}.{" "}
            <Link
              href="/mapa-del-sitio"
              className="hover:text-cyan transition-colors underline-offset-2 hover:underline"
            >
              Mapa del sitio
            </Link>
          </p>
          <div className="flex items-center gap-3 order-1 sm:order-2">
            {site.email && (
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="grid place-items-center w-9 h-9 rounded-full border border-border text-muted-2 hover:text-cyan hover:border-cyan/50 transition-colors"
              >
                <FiMail size={15} />
              </a>
            )}
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid place-items-center w-9 h-9 rounded-full border border-border text-muted-2 hover:text-cyan hover:border-cyan/50 transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
