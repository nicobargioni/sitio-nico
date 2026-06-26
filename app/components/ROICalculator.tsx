"use client";

import { useMemo, useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { site } from "@/lib/site";

const usd = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Math.round(n));

// Inversión de referencia: el paquete "Prototipo / 1 caso".
const INVERSION_REF = 1500;

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  suffix: string;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm text-muted">{label}</label>
        <span className="font-display font-medium tabular-nums">
          {value}
          <span className="text-muted text-sm font-normal ml-1">{suffix}</span>
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="roi-range w-full"
        aria-label={label}
      />
    </div>
  );
}

export default function ROICalculator() {
  const [horas, setHoras] = useState(10);
  const [costo, setCosto] = useState(15);
  const [auto, setAuto] = useState(70);

  const { ahorroMensual, ahorroAnual, semanas } = useMemo(() => {
    const ahorroSemanal = horas * costo * (auto / 100);
    const mensual = ahorroSemanal * 4.33;
    const anual = mensual * 12;
    const sem = ahorroSemanal > 0 ? INVERSION_REF / ahorroSemanal : 0;
    return { ahorroMensual: mensual, ahorroAnual: anual, semanas: sem };
  }, [horas, costo, auto]);

  return (
    <div className="rounded-3xl border border-border bg-surface/40 overflow-hidden">
      <div className="grid md:grid-cols-2">
        {/* Controles */}
        <div className="p-8 md:p-10 flex flex-col gap-7">
          <Slider
            label="Horas por semana en una tarea repetitiva"
            value={horas}
            min={1}
            max={60}
            suffix="h"
            onChange={setHoras}
          />
          <Slider
            label="Costo promedio por hora"
            value={costo}
            min={5}
            max={80}
            suffix="USD"
            onChange={setCosto}
          />
          <Slider
            label="Parte que se puede automatizar"
            value={auto}
            min={30}
            max={95}
            step={5}
            suffix="%"
            onChange={setAuto}
          />
        </div>

        {/* Resultado */}
        <div className="p-8 md:p-10 bg-bg border-t md:border-t-0 md:border-l border-border flex flex-col justify-center">
          <p className="eyebrow mb-2">Ahorro estimado</p>
          <p className="font-display text-5xl md:text-6xl font-bold tracking-tight text-coral tabular-nums leading-none">
            {usd(ahorroAnual)}
          </p>
          <p className="text-muted mt-2">por año</p>

          <div className="mt-6 pt-5 border-t border-border space-y-1.5 text-sm">
            <p className="flex justify-between">
              <span className="text-muted">Ahorro mensual</span>
              <span className="font-medium tabular-nums">{usd(ahorroMensual)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted">Un prototipo ({usd(INVERSION_REF)}) se paga en</span>
              <span className="font-medium tabular-nums">
                {semanas < 1 ? "<1" : Math.ceil(semanas)} sem
              </span>
            </p>
          </div>

          <a
            href={`mailto:${site.email}?subject=Diagn%C3%B3stico%20de%20datos%20gratis`}
            className="inline-flex items-center justify-center gap-2 mt-7 px-6 py-3 rounded-full bg-coral text-bg font-medium hover:bg-coral-soft transition-colors"
          >
            Validémoslo con tus datos <FiArrowRight size={16} />
          </a>
          <p className="text-xs text-muted-2 mt-3 leading-relaxed">
            Estimación orientativa. El número real lo confirmamos en el
            diagnóstico, sobre tu operación.
          </p>
        </div>
      </div>
    </div>
  );
}
