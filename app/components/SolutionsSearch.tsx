"use client";

import { useState, useMemo } from "react";
import { FiSearch } from "react-icons/fi";
import SolutionCard from "./SolutionCard";
import { site } from "@/lib/site";
import type { Solution } from "@/lib/solutions";

/** Normaliza para buscar sin importar acentos ni mayúsculas. */
const norm = (s: string) =>
  s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

/**
 * Buscador en vivo de soluciones (client): filtra por título, dolor, resumen
 * y "para quién" a medida que escribís. El sitio es estático, así que el
 * filtrado pasa en el navegador sobre los datos ya embebidos.
 */
export default function SolutionsSearch({ solutions }: { solutions: Solution[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return solutions;
    const terms = nq.split(/\s+/);
    return solutions.filter((s) => {
      const hay = norm(`${s.titulo} ${s.dolor} ${s.resumen} ${s.paraQuien}`);
      return terms.every((t) => hay.includes(t));
    });
  }, [q, solutions]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 mb-10">
        <div className="relative w-full sm:max-w-md">
          <FiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-2 pointer-events-none"
            size={18}
          />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar una solución…"
            aria-label="Buscar soluciones"
            className="w-full rounded-full border border-border bg-surface/40 pl-11 pr-4 py-3 text-sm text-fg placeholder:text-muted-2 focus:outline-none focus:border-cyan/60 transition-colors"
          />
        </div>
        <p className="font-mono text-xs uppercase tracking-widest text-muted-2 shrink-0">
          {filtered.length} {filtered.length === 1 ? "solución" : "soluciones"}
        </p>
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted leading-relaxed">
          No encontré nada para “{q}”. Probá con otra palabra, o{" "}
          <a
            href={`mailto:${site.email}`}
            className="text-coral hover:text-cyan transition-colors"
          >
            escribime y lo vemos
          </a>
          .
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s) => (
            <SolutionCard key={s.slug} s={s} />
          ))}
        </div>
      )}
    </div>
  );
}
