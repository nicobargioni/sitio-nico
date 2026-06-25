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
  FiTag,
  FiShoppingBag,
  FiDollarSign,
  FiInbox,
  FiMessageCircle,
  FiTarget,
  FiMic,
  FiMap,
  FiTool,
  FiSearch,
  FiEdit3,
  FiEye,
  FiClipboard,
  FiShoppingCart,
  FiCpu,
  FiCamera,
  FiPhoneCall,
  FiGlobe,
  FiLayers,
  FiBell,
  FiShield,
  FiCalendar,
  FiStar,
  FiUsers,
  FiPackage,
  FiLock,
  FiUserMinus,
  FiShare2,
  FiPercent,
  FiPieChart,
  FiUserCheck,
  FiFileMinus,
  FiType,
  FiFilter,
  FiSend,
  FiHash,
  FiDatabase,
  FiCloud,
  FiServer,
  FiActivity,
  FiTerminal,
  FiRefreshCw,
  FiImage,
  FiTruck,
  FiVolume2,
  FiSlash,
  FiSliders,
  FiLink,
  FiHome,
  FiFile,
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
  tag: FiTag,
  shopping: FiShoppingBag,
  dollar: FiDollarSign,
  inbox: FiInbox,
  message: FiMessageCircle,
  target: FiTarget,
  mic: FiMic,
  map: FiMap,
  tool: FiTool,
  search: FiSearch,
  edit: FiEdit3,
  eye: FiEye,
  clipboard: FiClipboard,
  cart: FiShoppingCart,
  cpu: FiCpu,
  camera: FiCamera,
  phone: FiPhoneCall,
  globe: FiGlobe,
  layers: FiLayers,
  bell: FiBell,
  shield: FiShield,
  calendar: FiCalendar,
  star: FiStar,
  users: FiUsers,
  package: FiPackage,
  lock: FiLock,
  userminus: FiUserMinus,
  share: FiShare2,
  percent: FiPercent,
  piechart: FiPieChart,
  usercheck: FiUserCheck,
  fileminus: FiFileMinus,
  type: FiType,
  filter: FiFilter,
  send: FiSend,
  hash: FiHash,
  database: FiDatabase,
  cloud: FiCloud,
  server: FiServer,
  activity: FiActivity,
  terminal: FiTerminal,
  refresh: FiRefreshCw,
  image: FiImage,
  truck: FiTruck,
  voice: FiVolume2,
  slash: FiSlash,
  sliders: FiSliders,
  link: FiLink,
  home: FiHome,
  file: FiFile,
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
