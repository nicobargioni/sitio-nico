import { FaLinkedinIn } from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";
import { site } from "@/lib/site";

/**
 * Tarjeta-botón a LinkedIn (estilo "highlight" con ícono + eyebrow + título).
 * Editá `eyebrow` y `title` con lo que quieras destacar.
 */
export default function LinkedInCard({
  eyebrow = "LinkedIn · Conectemos",
  title = "Perfil profesional",
  className = "",
}: {
  eyebrow?: string;
  title?: string;
  className?: string;
}) {
  if (!site.social.linkedin) return null;
  return (
    <a
      href={site.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex items-center gap-4 rounded-2xl border border-border bg-surface/40 p-4 hover:border-cyan/40 transition-colors ${className}`}
    >
      <span
        className="grid place-items-center w-12 h-12 shrink-0 rounded-xl text-white"
        style={{ background: "#0A66C2" }}
      >
        <FaLinkedinIn size={20} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-mono text-[0.6rem] uppercase tracking-widest text-muted-2">
          {eyebrow}
        </span>
        <span className="block font-display font-medium leading-tight truncate">
          {title}
        </span>
      </span>
      <FiArrowRight
        className="text-muted-2 group-hover:text-cyan transition-colors shrink-0"
        size={18}
      />
    </a>
  );
}
