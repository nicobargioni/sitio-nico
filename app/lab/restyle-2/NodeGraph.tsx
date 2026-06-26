import type { IconType } from "react-icons";
import {
  SiOpenai,
  SiGooglegemini,
} from "react-icons/si";
import {
  FiDatabase,
  FiCpu,
  FiBarChart2,
  FiZap,
  FiGitMerge,
  FiActivity,
  FiBox,
} from "react-icons/fi";

/** Grafo radial: nodo central conectado a "objetos" IA/data, con conexiones que fluyen. */
const NODES: { x: number; y: number; Icon: IconType; delay: string }[] = [
  { x: 92, y: 50, Icon: SiOpenai, delay: "0s" },
  { x: 79, y: 81, Icon: FiDatabase, delay: "0.4s" },
  { x: 50, y: 94, Icon: SiGooglegemini, delay: "0.8s" },
  { x: 21, y: 81, Icon: FiBarChart2, delay: "1.2s" },
  { x: 8, y: 50, Icon: FiCpu, delay: "1.6s" },
  { x: 21, y: 19, Icon: FiZap, delay: "2s" },
  { x: 50, y: 6, Icon: FiGitMerge, delay: "2.4s" },
  { x: 79, y: 19, Icon: FiActivity, delay: "2.8s" },
];

export default function NodeGraph() {
  return (
    <div className="relative w-full max-w-xl aspect-square mx-auto">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {NODES.map((n, i) => (
          <line
            key={i}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="#3b82f6"
            strokeWidth="0.5"
            className="lab-flow"
            opacity="0.7"
          />
        ))}
      </svg>

      {/* nodo central */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-20 h-20 rounded-2xl bg-blue-500/15 border border-blue-400/40 text-blue-200 shadow-[0_0_40px_-8px_rgba(59,130,246,0.7)]">
        <FiBox size={28} />
      </div>

      {/* objetos */}
      {NODES.map((n, i) => (
        <div
          key={i}
          className="absolute -translate-x-1/2 -translate-y-1/2 grid place-items-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/10 text-white/70 backdrop-blur-sm lab-floaty"
          style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: n.delay }}
        >
          <n.Icon size={20} />
        </div>
      ))}
    </div>
  );
}
