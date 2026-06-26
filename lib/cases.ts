// Casos ilustrativos: cifras representativas y anonimizadas del tipo de
// resultado que produce cada servicio. No identifican clientes reales.

export type Caso = {
  slug: string;
  sector: string;
  problema: string;
  queHice: string;
  inversion: string; // "USD X"
  payback: string; // tiempo de recupero
  resultado: string; // métrica destacada
  metricaLabel: string;
  metricaValor: string;
};

export const casos: Caso[] = [
  {
    slug: "demanda-retail",
    sector: "Retail de electrodomésticos · multimarca",
    problema:
      "Quiebres de stock en algunos SKUs y sobrestock en otros, al mismo tiempo. Plata inmovilizada y ventas perdidas.",
    queHice:
      "Modelo de predicción de demanda por SKU y sucursal, con alertas semanales de reposición conectadas a su planilla de compras.",
    inversion: "USD 6.500",
    payback: "~7 semanas",
    resultado: "−22% quiebres de stock · −15% capital inmovilizado",
    metricaLabel: "Quiebres de stock",
    metricaValor: "−22%",
  },
  {
    slug: "recompra-ecommerce",
    sector: "E-commerce de indumentaria",
    problema:
      "Mucho cliente nuevo que compraba una vez y no volvía. La inversión en captación no se amortizaba.",
    queHice:
      "Modelo de propensión a recompra + segmentación accionable para email y ads, priorizando a quien estaba por irse.",
    inversion: "USD 4.200",
    payback: "~9 semanas",
    resultado: "+18% recompra a 90 días",
    metricaLabel: "Recompra a 90 días",
    metricaValor: "+18%",
  },
  {
    slug: "reportes-b2b",
    sector: "Distribuidora B2B",
    problema:
      "El equipo perdía días enteros armando los mismos reportes en Excel, con errores de copiado y datos desactualizados.",
    queHice:
      "Pipeline que unifica las fuentes y un dashboard que se actualiza solo. Cero copiar y pegar.",
    inversion: "USD 3.000",
    payback: "~6 semanas",
    resultado: "~40 horas/mes recuperadas",
    metricaLabel: "Horas recuperadas",
    metricaValor: "40/mes",
  },
  {
    slug: "anomalias-cobranzas",
    sector: "Servicios financieros · cobranzas",
    problema:
      "Las operaciones anómalas se detectaban tarde, cuando la pérdida ya estaba hecha.",
    queHice:
      "Detección de anomalías casi en tiempo real sobre el flujo de transacciones, con avisos al equipo de riesgo.",
    inversion: "USD 8.000",
    payback: "~10 semanas",
    resultado: "−31% de fraude no detectado a tiempo",
    metricaLabel: "Fraude no detectado",
    metricaValor: "−31%",
  },
];
