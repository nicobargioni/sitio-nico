import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { site } from "@/lib/site";

/**
 * Botones para compartir una nota en LinkedIn y X. <a href> estáticos a los
 * endpoints de compartir de cada red, con la URL (y el título) de la nota.
 *
 * `path` es la ruta del sitio sin dominio, ej. "/data-ml/eda/anscombe-cuarteto".
 */
export default function ShareButtons({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  const url = encodeURIComponent(`${site.url}${path}`);
  const text = encodeURIComponent(title);
  const links = [
    {
      label: "Compartir en LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      Icon: FaLinkedinIn,
    },
    {
      label: "Compartir en X",
      href: `https://x.com/intent/tweet?text=${text}&url=${url}`,
      Icon: FaXTwitter,
    },
  ];
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs uppercase tracking-wider text-muted-2 mr-1">
        Compartir
      </span>
      {links.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="grid place-items-center w-10 h-10 rounded-full border border-border text-muted hover:border-cyan/50 hover:text-cyan transition-colors"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
