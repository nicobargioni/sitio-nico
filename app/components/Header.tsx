"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { site } from "@/lib/site";
import { categories } from "@/lib/taxonomy";

const links = [
  { href: "/#sobre-mi", label: "Sobre mí" },
  { href: "/soluciones", label: "Soluciones" },
  { href: "/#use-cases", label: "Casos" },
  { href: "/#recomendaciones", label: "Recomendaciones" },
];

const socials = [
  { href: site.social.twitter, label: "X", Icon: FaXTwitter },
  { href: site.social.linkedin, label: "LinkedIn", Icon: FaLinkedinIn },
].filter((s) => s.href);

export default function Header() {
  const [open, setOpen] = useState(false); // menú móvil
  const [temas, setTemas] = useState(false); // mega-menú de temas (desktop)
  const temasRef = useRef<HTMLDivElement>(null);

  // Cerrar el mega-menú al clickear fuera o con Escape
  useEffect(() => {
    if (!temas) return;
    const onClick = (e: MouseEvent) => {
      if (temasRef.current && !temasRef.current.contains(e.target as Node)) {
        setTemas(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setTemas(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [temas]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-bg/80 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="text-coral text-2xl font-display font-bold leading-none transition-transform group-hover:-translate-y-0.5">
            ⟫
          </span>
          <span className="font-display font-medium tracking-tight">
            {site.shortName}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7" aria-label="Principal">
          <Link
            href="/#sobre-mi"
            className="text-sm text-muted hover:text-fg transition-colors"
          >
            Sobre mí
          </Link>

          {/* Mega-menú: Temas (silos) — click para abrir/cerrar */}
          <div ref={temasRef} className="static">
            <button
              type="button"
              onClick={() => setTemas((v) => !v)}
              className="flex items-center gap-1 text-sm text-muted hover:text-fg transition-colors"
              aria-expanded={temas}
            >
              Temas
              <FiChevronDown
                size={14}
                className={`transition-transform ${temas ? "rotate-180" : ""}`}
              />
            </button>

            {temas && (
              <div className="fixed left-0 right-0 top-16 border-b border-border bg-bg shadow-2xl shadow-black/10">
                <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-4 gap-8">
                  {categories.map((cat) => (
                    <div key={cat.slug}>
                      <Link
                        href={`/${cat.slug}`}
                        onClick={() => setTemas(false)}
                        className="block font-display font-medium text-sm mb-3 hover:text-cyan transition-colors"
                      >
                        {cat.name}
                      </Link>
                      <ul className="flex flex-col gap-2">
                        {cat.subcategories.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/${cat.slug}/${s.slug}`}
                              onClick={() => setTemas(false)}
                              className="text-xs text-muted hover:text-coral transition-colors"
                            >
                              {s.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {links.slice(1).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-muted hover:text-fg transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-3">
            {socials.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid place-items-center w-8 h-8 rounded-full border border-border text-muted hover:text-cyan hover:border-cyan/50 transition-colors"
              >
                <Icon size={13} />
              </a>
            ))}
          </div>
          <button
            className="md:hidden grid place-items-center w-9 h-9 text-muted hover:text-fg transition-colors"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Menú móvil con categorías y subcategorías */}
      {open && (
        <nav className="md:hidden border-t border-border bg-bg px-6 py-5 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-base text-muted hover:text-fg transition-colors"
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <p className="eyebrow mt-6 mb-3">Temas</p>
          <div className="flex flex-col gap-5">
            {categories.map((cat) => (
              <div key={cat.slug}>
                <Link
                  href={`/${cat.slug}`}
                  className="block font-display font-medium text-sm mb-2 hover:text-cyan transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {cat.name}
                </Link>
                <ul className="flex flex-wrap gap-2">
                  {cat.subcategories.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/${cat.slug}/${s.slug}`}
                        className="inline-block text-xs text-muted-2 border border-border rounded-full px-2.5 py-1 hover:text-fg transition-colors"
                        onClick={() => setOpen(false)}
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
