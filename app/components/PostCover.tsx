import type { IconType } from "react-icons";
import { FiBarChart2, FiCpu, FiZap, FiCloud, FiActivity } from "react-icons/fi";

/**
 * Imagen destacada generada por tema (sin assets externos): gradiente con el
 * acento de la categoría, una grilla de puntos tipo "embedding" y un ícono
 * temático de marca de agua. Determinista a partir del título.
 */
type Theme = { Icon: IconType; tint: string; accent: string; label: string };

const THEMES: Record<string, Theme> = {
  "data-ml": { Icon: FiBarChart2, tint: "8,145,178", accent: "#0891b2", label: "Data & ML" },
  "ia-agentes": { Icon: FiCpu, tint: "8,145,178", accent: "#0891b2", label: "IA & Agentes" },
  hiperautomatizacion: { Icon: FiZap, tint: "240,82,31", accent: "#f0521f", label: "Hiperautomatización" },
  cloud: { Icon: FiCloud, tint: "8,145,178", accent: "#0891b2", label: "Cloud" },
};
const FALLBACK: Theme = { Icon: FiActivity, tint: "8,145,178", accent: "#0891b2", label: "Nota" };

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export default function PostCover({
  category,
  title,
  className = "",
}: {
  category: string;
  title: string;
  className?: string;
}) {
  const t = THEMES[category] ?? FALLBACK;
  const h = hash(title);
  // puntos "embedding" deterministas
  const dots = Array.from({ length: 7 }, (_, i) => {
    const k = hash(title + i);
    return {
      left: 8 + (k % 84),
      top: 12 + ((k >> 7) % 70),
      r: 2 + ((k >> 3) % 4),
      coral: i % 3 === 0,
    };
  });

  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(135deg, rgba(${t.tint},0.16), rgba(${t.tint},0.02) 70%), var(--surface)`,
      }}
      aria-hidden="true"
    >
      {/* grilla de puntos sutil */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage: `radial-gradient(rgba(${t.tint},0.18) 1px, transparent 1px)`,
          backgroundSize: "22px 22px",
        }}
      />
      {/* nodos + líneas tipo embedding */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {dots.map((d, i) =>
          i > 0 ? (
            <line
              key={`l${i}`}
              x1={`${dots[i - 1].left}%`}
              y1={`${dots[i - 1].top}%`}
              x2={`${d.left}%`}
              y2={`${d.top}%`}
              stroke={`rgba(${t.tint},0.22)`}
              strokeWidth="1"
            />
          ) : null
        )}
        {dots.map((d, i) => (
          <circle
            key={`c${i}`}
            cx={`${d.left}%`}
            cy={`${d.top}%`}
            r={d.r}
            fill={d.coral ? "#f0521f" : t.accent}
          />
        ))}
      </svg>
      {/* ícono temático de marca de agua */}
      <t.Icon
        className="absolute -bottom-4 -right-3"
        size={108}
        style={{ color: t.accent, opacity: 0.12 }}
      />
      {/* etiqueta de categoría */}
      <span
        className="absolute top-3 left-4 font-mono text-[0.6rem] uppercase tracking-widest"
        style={{ color: t.accent }}
      >
        {t.label}
      </span>
    </div>
  );
}
