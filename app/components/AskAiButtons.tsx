import { SiGooglegemini, SiOpenai } from "react-icons/si";
import { site } from "@/lib/site";

/**
 * Botones "Consultar en Gemini / ChatGPT": deep-links a los asistentes con un
 * prompt pre-cargado que pide describir ESTA página e incluye su URL. Son
 * <a href> estáticos (no JS) a propósito: así los rastreadores de IA
 * (GPTBot, Google-Extended) los descubren y la URL del sitio queda embebida
 * en la query. Estrategia GEO/AEO.
 *
 * `path` es la ruta del sitio sin dominio, ej. "/ia-agentes/vision".
 */
function askQuery(pageUrl: string): string {
  return `describe+el+contenido+de+esta+pagina+${encodeURIComponent(pageUrl)}`;
}

export function geminiUrl(pageUrl: string): string {
  return `https://gemini.google.com/app?q=${askQuery(pageUrl)}`;
}

export function chatgptUrl(pageUrl: string): string {
  return `https://chatgpt.com/?q=${askQuery(pageUrl)}`;
}

export default function AskAiButtons({
  path,
  gemini = true,
  chatgpt = true,
  className = "",
}: {
  path: string;
  gemini?: boolean;
  chatgpt?: boolean;
  className?: string;
}) {
  const pageUrl = `${site.url}${path}`;
  const base =
    "flex items-center justify-center gap-2.5 w-full rounded-lg border px-5 py-3.5 font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors";
  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      {gemini && (
        <a
          href={geminiUrl(pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border-border bg-surface/40 hover:border-cyan/50 hover:text-cyan`}
        >
          <SiGooglegemini className="text-cyan" size={18} />
          Consultar en Gemini
        </a>
      )}
      {chatgpt && (
        <a
          href={chatgptUrl(pageUrl)}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} border-border bg-surface/40 hover:border-coral/50 hover:text-coral`}
        >
          <SiOpenai size={18} />
          Consultar en ChatGPT
        </a>
      )}
    </div>
  );
}
