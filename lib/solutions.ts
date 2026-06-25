/**
 * Soluciones: qué resuelvo con datos e IA, contado para un público NO técnico.
 * Organizado por problema de negocio. Cada solución linkea a su "prueba"
 * técnica dentro del sitio (silo/notebook) para cerrar el círculo hacer×decir.
 *
 * `icon` mapea a un ícono en app/components/SolutionCard.tsx (SOLUTION_ICONS).
 */
export type Solution = {
  slug: string;
  icon: string;
  titulo: string; // nombre de la solución
  dolor: string; // el problema en 1 línea (gancho de la card)
  resumen: string; // 1-2 líneas para la card / meta
  problema: string; // párrafo en lenguaje de negocio
  queHago: string; // párrafo, en llano
  resultados: string[]; // qué obtenés
  paraQuien: string;
  prueba?: { label: string; href: string };
};

export const solutions: Solution[] = [
  {
    slug: "prediccion-de-demanda",
    icon: "trending",
    titulo: "Predecir cuánto vas a vender",
    dolor: "Comprás de más o te quedás sin stock porque la demanda te agarra desprevenido.",
    resumen:
      "Modelos que estiman la demanda de las próximas semanas para que compres y produzcas con datos, no con corazonadas.",
    problema:
      "La mayoría planifica compras y producción mirando el mes pasado y un poco de intuición. El resultado es plata inmovilizada en stock que no rota, o ventas perdidas por faltantes justo cuando había demanda.",
    queHago:
      "Tomo tu historial de ventas y lo que lo afecta —estacionalidad, promociones, feriados— y entreno un modelo que proyecta la demanda por producto y período. Te lo dejo en un tablero simple, no en una caja negra.",
    resultados: [
      "Menos quiebres de stock y menos sobrestock",
      "Compras y producción planificadas con anticipación",
      "Una proyección que se actualiza sola con tus ventas nuevas",
    ],
    paraQuien: "Comercios, e-commerce y producción con historial de ventas.",
    prueba: { label: "Cómo modelo esto", href: "/data-ml/estadistica" },
  },
  {
    slug: "retencion-de-clientes",
    icon: "churn",
    titulo: "Anticipar qué clientes están por irse",
    dolor: "Te enterás de que un cliente se fue cuando ya dejó de comprar.",
    resumen:
      "Detecto señales tempranas de abandono para que actúes antes de perder al cliente, no después.",
    problema:
      "Conseguir un cliente nuevo cuesta bastante más que retener uno. Pero casi todos reaccionan cuando el cliente ya se fue, justo cuando no queda nada por hacer.",
    queHago:
      "Analizo el comportamiento de tus clientes —cada cuánto compran, cuánto gastan, hace cuánto que no aparecen— y armo un modelo que marca quiénes tienen alto riesgo de irse, con tiempo para llegarles con una acción concreta.",
    resultados: [
      "Una lista priorizada de clientes en riesgo",
      "Acciones de retención antes de perderlos",
      "Entender qué dispara el abandono",
    ],
    paraQuien: "Negocios con clientes recurrentes, suscripciones o cartera.",
    prueba: { label: "Cómo lo predigo", href: "/data-ml/mineria-de-datos" },
  },
  {
    slug: "deteccion-de-anomalias",
    icon: "anomaly",
    titulo: "Detectar lo raro antes de que cueste caro",
    dolor: "Errores, fraudes o fallas que aparecen tarde, cuando ya hicieron daño.",
    resumen:
      "Sistemas que avisan cuando algo se sale del patrón —un gasto, una transacción, una máquina— antes de que escale.",
    problema:
      "Lo anómalo es, casi por definición, lo que nadie está mirando: un cobro raro, un pico de devoluciones, una máquina que empieza a fallar. Para cuando se nota a ojo, ya costó plata.",
    queHago:
      "Entreno modelos que aprenden cómo se ve “lo normal” en tus datos y marcan automáticamente lo que se aparta. Vos definís el umbral según cuánto te cuesta una falsa alarma frente a dejar pasar una real.",
    resultados: [
      "Alertas tempranas de fraude, errores o fallas",
      "Menos pérdidas por cosas que se detectan tarde",
      "Un umbral ajustado a tu costo real",
    ],
    paraQuien: "Finanzas, operaciones, e-commerce y mantenimiento.",
    prueba: { label: "Cómo detecto anomalías", href: "/data-ml/deteccion-anomalias" },
  },
  {
    slug: "segmentacion-de-clientes",
    icon: "segment",
    titulo: "Entender a tus clientes en grupos reales",
    dolor: "Le hablás a todos tus clientes igual y no sabés bien quién te compra.",
    resumen:
      "Descubro los grupos naturales de tu base —sin suponerlos de antemano— para que comuniques y vendas distinto a cada uno.",
    problema:
      "Tratar a toda tu base igual desperdicia plata: el que compra una vez al año no es el que compra todas las semanas, pero a los dos les llega el mismo mensaje.",
    queHago:
      "Agrupo a tus clientes por comportamiento real —qué, cuánto y cada cuánto compran— usando los datos y no categorías inventadas. Te explico quién es cada grupo y qué conviene hacer con cada uno.",
    resultados: [
      "Segmentos claros y accionables de tu base",
      "Campañas y precios diferenciados por grupo",
      "Saber dónde está tu cliente más valioso",
    ],
    paraQuien: "Marketing, ventas y e-commerce con base de clientes.",
    prueba: { label: "Cómo segmento", href: "/data-ml/clustering-pca" },
  },
  {
    slug: "asistente-con-tu-conocimiento",
    icon: "chat",
    titulo: "Un asistente que responde con la info de tu empresa",
    dolor: "Tu equipo pierde horas respondiendo siempre las mismas preguntas.",
    resumen:
      "Un chatbot que contesta con tus documentos, manuales y procesos —no con lo que “sabe” un modelo genérico—, citando de dónde sacó cada respuesta.",
    problema:
      "Los modelos genéricos inventan cuando no saben. Y la información de tu empresa —manuales, políticas, catálogos— vive dispersa en PDFs y carpetas que nadie quiere leer.",
    queHago:
      "Conecto un modelo de lenguaje a TUS documentos (la técnica se llama RAG): el asistente busca primero en tu material y responde sobre eso, mostrando la fuente. Sirve para soporte interno o atención al cliente.",
    resultados: [
      "Respuestas correctas, basadas en tu información",
      "Menos horas del equipo en preguntas repetidas",
      "Cada respuesta cita su fuente: nada de inventos",
    ],
    paraQuien: "Soporte, atención al cliente y equipos con mucha documentación.",
    prueba: { label: "Cómo funciona (RAG)", href: "/ia-agentes/rag-embeddings" },
  },
  {
    slug: "automatizacion-de-procesos",
    icon: "automate",
    titulo: "Automatizar el trabajo repetitivo",
    dolor: "Tu gente copia y pega datos entre sistemas en vez de pensar.",
    resumen:
      "Conecto tus herramientas y armo flujos que hacen solos las tareas manuales y repetitivas, de punta a punta.",
    problema:
      "Hay tareas que se repiten todos los días —pasar datos de un sistema a otro, armar reportes, mandar avisos— que consumen horas y se hacen con errores cuando las hace una persona cansada.",
    queHago:
      "Mapeo el proceso, veo qué se puede automatizar y armo el flujo con la herramienta que mejor encaje (n8n, Make, APIs o agentes de IA). Lo que era media hora de copy-paste pasa a correr solo.",
    resultados: [
      "Horas del equipo liberadas para lo que importa",
      "Procesos sin errores de tipeo ni olvidos",
      "Tareas que corren 24/7 sin que nadie las dispare",
    ],
    paraQuien: "Cualquier equipo con tareas manuales repetidas entre sistemas.",
    prueba: { label: "Sobre hiperautomatización", href: "/hiperautomatizacion" },
  },
  {
    slug: "lectura-de-documentos",
    icon: "docs",
    titulo: "Leer facturas y documentos en automático",
    dolor: "Alguien carga a mano los datos de facturas y PDFs, uno por uno.",
    resumen:
      "Extraigo los datos de tus documentos —facturas, remitos, formularios— y los paso a una planilla o sistema, sin carga manual.",
    problema:
      "Cargar a mano datos de documentos es lento, caro y propenso a errores. Y el grueso de la información de una empresa vive en documentos que nadie llega a aprovechar.",
    queHago:
      "Armo un pipeline que lee tus documentos —no solo el texto, también la estructura, como dónde está el total en una factura—, extrae los campos que te importan y los entrega listos para tu sistema, con revisión humana donde haga falta.",
    resultados: [
      "Datos de documentos cargados solos",
      "Menos errores y menos horas de data-entry",
      "Tus PDFs convertidos en datos usables",
    ],
    paraQuien: "Administración, contabilidad y operaciones con papeleo.",
    prueba: { label: "Sobre documentos inteligentes", href: "/hiperautomatizacion/idp" },
  },
  {
    slug: "analisis-de-datos",
    icon: "analytics",
    titulo: "Sacar conclusiones claras de tus números",
    dolor: "Tenés datos por todos lados, pero te cuesta sacar decisiones de ahí.",
    resumen:
      "Ordeno y analizo tus datos para responder preguntas concretas de negocio, y te lo dejo en un tablero que entendés de un vistazo.",
    problema:
      "Tener datos no es lo mismo que entenderlos. Muchos negocios acumulan planillas y reportes pero no logran responder las preguntas que de verdad mueven la aguja.",
    queHago:
      "Junto tus fuentes, las limpio, hago el análisis —qué pasó, por qué y qué se repite— y te entrego conclusiones accionables en un tablero claro. Antes de modelar nada complejo, primero entender bien lo que ya tenés.",
    resultados: [
      "Respuestas a las preguntas que te importan",
      "Un tablero claro en lugar de planillas sueltas",
      "Una base sólida para decidir (y para modelos futuros)",
    ],
    paraQuien: "Dueños y equipos que tienen datos pero no claridad.",
    prueba: { label: "Cómo encaro el análisis", href: "/data-ml/eda" },
  },
];

export function getSolution(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug);
}
