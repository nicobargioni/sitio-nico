import type { IconType } from "react-icons";
import Link from "next/link";
import {
  FiTrendingUp,
  FiUserX,
  FiAlertTriangle,
  FiGrid,
  FiMessageSquare,
  FiZap,
  FiFileText,
  FiBarChart2,
  FiArrowUpRight,
} from "react-icons/fi";
import type { Solution } from "@/lib/solutions";

/** Íconos por solución (compartido entre index, home y detalle). */
export const SOLUTION_ICONS: Record<string, IconType> = {
  trending: FiTrendingUp,
  churn: FiUserX,
  anomaly: FiAlertTriangle,
  segment: FiGrid,
  chat: FiMessageSquare,
  automate: FiZap,
  docs: FiFileText,
  analytics: FiBarChart2,
};

/** Tarjeta de solución (lista en /soluciones y en el home). */
export default function SolutionCard({ s }: { s: Solution }) {
  const Icon = SOLUTION_ICONS[s.icon] ?? FiArrowUpRight;
  return (
    <Link
      href={`/soluciones/${s.slug}`}
      className="group flex flex-col h-full rounded-2xl border border-border bg-surface/40 p-6 hover:border-cyan/40 transition-colors"
    >
      <span className="grid place-items-center w-11 h-11 rounded-xl border border-border bg-bg text-cyan mb-4">
        <Icon size={18} />
      </span>
      <h3 className="font-display text-lg font-medium tracking-tight group-hover:text-cyan transition-colors mb-2">
        {s.titulo}
      </h3>
      <p className="text-sm text-muted leading-relaxed flex-1">{s.dolor}</p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-coral">
        Ver solución <FiArrowUpRight size={14} />
      </span>
    </Link>
  );
}
