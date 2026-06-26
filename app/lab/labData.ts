/** Datos reales del home, compartidos entre el home y los previews de /lab. */

export const useCases = [
  {
    title: "Buscador semántico (RAG)",
    badge: "NLP / RAG",
    href: "/ia-agentes/rag-embeddings",
    desc: "Chatbot que responde sobre un corpus propio: embeddings + FAISS, recuperación de contexto y evaluación de relevancia.",
    stats: [
      { v: "FAISS", l: "índice vectorial" },
      { v: "Embeddings", l: "representación" },
      { v: "RAG", l: "pipeline" },
    ],
  },
  {
    title: "CNN para retinopatía",
    badge: "VISIÓN",
    href: "/data-ml/deep-learning",
    desc: "Clasificación de imágenes médicas de fondo de ojo con redes convolucionales en PyTorch, manejando desbalance de clases.",
    stats: [
      { v: "PyTorch", l: "framework" },
      { v: "CNN", l: "arquitectura" },
      { v: "Grad-CAM", l: "interpretabilidad" },
    ],
  },
  {
    title: "Mantenimiento predictivo (NASA CMAPSS)",
    badge: "ML",
    href: "/data-ml/deteccion-anomalias",
    desc: "Predicción de vida útil restante (RUL) de turbinas a partir de series de sensores, para anticipar fallas.",
    stats: [
      { v: "RUL", l: "vida útil restante" },
      { v: "Sensores", l: "series temporales" },
      { v: "Regresión", l: "modelo" },
    ],
  },
  {
    title: "Agente de RL (Q-learning)",
    badge: "RL",
    href: "/data-ml/reinforcement-learning",
    desc: "Agente que aprende por prueba y error a resolver el entorno Taxi de Gymnasium, sin conocer las reglas de antemano.",
    stats: [
      { v: "Gymnasium", l: "entorno" },
      { v: "Q-table", l: "política" },
      { v: "ε-greedy", l: "exploración" },
    ],
  },
  {
    title: "Clasificación de audio",
    badge: "AUDIO",
    href: "/ia-agentes/procesamiento-habla",
    desc: "Reconocimiento de comandos de voz: de la onda al modelo vía espectrogramas y una CNN sobre Speech Commands.",
    stats: [
      { v: "Espectrogramas", l: "features" },
      { v: "CNN", l: "modelo" },
      { v: "Audio", l: "Speech Commands" },
    ],
  },
  {
    title: "Minería de datos & churn",
    badge: "DATA",
    href: "/data-ml/mineria-de-datos",
    desc: "Clasificación multiclase y segmentación de clientes con KNN, EDA, escalado y matriz de confusión para detectar churn.",
    stats: [
      { v: "KNN", l: "clasificación" },
      { v: "EDA", l: "exploración" },
      { v: "Churn", l: "caso real" },
    ],
  },
  {
    title: "Hiperautomatización de procesos",
    badge: "AUTOMATION",
    href: "/hiperautomatizacion",
    desc: "Flujos punta a punta con RPA, n8n y agentes: levantamiento de procesos, modelado BPMN y automatización de tareas repetitivas.",
    stats: [
      { v: "RPA", l: "UiPath" },
      { v: "Agentes", l: "decisión + acción" },
      { v: "BPMN", l: "modelado" },
    ],
  },
  {
    title: "Datos e IA en la nube",
    badge: "CLOUD",
    href: "/cloud",
    desc: "Ingesta, modelos y despliegue serverless en Google Cloud: Vertex AI, Cloud Run y BigQuery, contenedores con Docker y CI/CD.",
    stats: [
      { v: "GCP", l: "Vertex · Cloud Run" },
      { v: "Serverless", l: "escala a cero" },
      { v: "Docker", l: "contenedores" },
    ],
  },
];

export const recs = [
  {
    quote:
      "Tuve el gusto de trabajar con Nico en Flokzu como SEO Specialist. Se destacó por su actitud entusiasta y proactiva, siempre buscando nuevas formas de mejorar y aprender. Su pasión por el trabajo es evidente y su energía positiva contagia.",
    name: "Micaela Suárez",
    role: "CEO @ Flokzu",
  },
  {
    quote:
      "Contratamos a Nico como SEO Specialist en Flokzu. Desde el primer día se destacó por su energía positiva, actitud muy proactiva y excelente integración con el equipo. Apasionado por su trabajo, siempre investigando, probando e innovando.",
    name: "Fiorella Benvenuto",
    role: "Head of People @ Flokzu",
  },
  {
    quote:
      "Trabajé con Nico en la evolución de la estrategia de crecimiento de Flokzu. Llevó la IA y el análisis de datos duros a tierra para priorizar con claridad. Gracias a ese enfoque logramos hitos concretos —como entrar en Google Discover—. Volvería a trabajar con Nicolás.",
    name: "Juan J. Moreno",
    role: "Board Advisor · Founder @ Flokzu / Buho",
  },
  {
    quote:
      "Nicolás es un gran profesional y con mucho conocimiento técnico, pero especialmente gran proactividad e independencia para resolver todos los retos que surgen. Coincidimos en varios proyectos grandes juntos, muy contento por ello.",
    name: "José Luis Rivolta",
    role: "SEO Director @ Refindable",
  },
  {
    quote:
      "Nico has been a great asset to our team — bringing a wealth of knowledge around all things SEO. Our team and clients have significantly benefitted from his support. He brings a strong sense of passion, energy, and care to his clients.",
    name: "Jay Ives",
    role: "Founder / CEO @ Jives Media",
  },
  {
    quote:
      "Nico es un profesional excepcional en el mundo del SEO. Su capacidad para analizar datos, identificar oportunidades y ejecutar estrategias efectivas fue fundamental para el éxito de nuestros clientes. Un placer trabajar con él.",
    name: "Giampiero Trussoni",
    role: "Structural Engineer",
  },
];

export const capabilities = [
  "Hiperautomatización de procesos y pipelines de datos (ETL)",
  "Análisis exploratorio y visualización de datos",
  "Machine Learning: modelado predictivo, clustering, análisis semántico y segmentación",
  "Integración de IA y LLMs en flujos de trabajo reales",
  "Cloud computing",
  "Big Data",
  "Bases de datos",
  "BI y Data Storytelling",
  "SEO",
];

export const verticals = [
  "eCommerce (B2B / B2C)",
  "SaaS",
  "Medios de comunicación",
  "Agencias",
];
