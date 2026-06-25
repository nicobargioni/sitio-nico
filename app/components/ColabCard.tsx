import { SiGooglecolab } from "react-icons/si";
import { site } from "@/lib/site";

/**
 * "Caja" estilo enlace de Colab. La etiqueta de dominio se DERIVA del destino
 * real (honesto): si la url es un Colab real → "colab.research.google.com";
 * si es el export estático local → el host del sitio. Apenas cargás la URL
 * real de Colab en COLAB_URLS (lib/taxonomy.ts), la caja la usa y la etiqueta
 * pasa sola a colab.research.google.com.
 */
function displayHost(url: string): string {
  try {
    const u = url.startsWith("http") ? new URL(url) : new URL(url, site.url);
    return u.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export default function ColabCard({
  title = "Google Colab",
  url,
}: {
  title?: string;
  url: string;
}) {
  const host = displayHost(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-xl border border-border bg-surface/40 p-3.5 hover:border-cyan/40 transition-colors max-w-xl"
    >
      <span className="grid place-items-center w-24 h-16 shrink-0 rounded-lg bg-white">
        <SiGooglecolab size={34} color="#E8710A" />
      </span>
      <span className="min-w-0">
        <span className="block font-display font-medium truncate group-hover:text-cyan transition-colors">
          {title}
        </span>
        <span className="block text-sm text-muted truncate">{host}</span>
      </span>
    </a>
  );
}
