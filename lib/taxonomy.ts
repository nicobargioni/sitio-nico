/**
 * Taxonomía del sitio: 4 categorías (los grupos de "Temas"), cada una con sus
 * subcategorías (los ítems encolumnados). Cada subcategoría tiene su landing en
 * /[categoría]/[subcategoría] con hero, sus notebooks (cajas de Colab) y
 * los posts del blog asignados a ella.
 *
 * Para sumar un Colab a una subcategoría: agregá { title, url } a su `colabs`.
 *   url puede ser un link público de Colab o un export estático en /notebooks/.
 */
export type Colab = { title: string; url: string; domain?: string };

/**
 * 🔗 LINKS REALES DE COLAB (tus notebooks, vos sos el owner).
 * Pegá acá la URL pública de cada Colab (Compartir → "Cualquier persona con el
 * enlace" → copiar enlace). Formato: https://colab.research.google.com/drive/XXXX
 *
 * Mientras una entrada esté vacía (""), la caja abre el export estático local
 * (/notebooks/<slug>.html) como respaldo. Apenas pegás la URL, la caja abre tu
 * Colab real.
 */
export const COLAB_URLS: Record<string, string> = {
  // IA & Agentes
  "buscador-rag": "", // TP5 — Chatbot RAG y evaluación de embeddings
  "similitud-semantica": "", // TP3 — Similitud semántica con embeddings
  "mundial-embeddings": "", // Lab — Embeddings del Mundial
  "chatbot-recuperacion": "", // TP4 — Chatbot por recuperación
  "audio-speechcommands": "", // TP3 — Clasificación de audio (Speech Commands)
  // Data & Machine Learning
  "eda-diagnostico": "", // Diagnóstico PD — EDA
  "eed1-parcial1": "", // EED1 Parcial 1 — estadística
  "eed1-parcial2": "", // EED1 Parcial 2 — PCA / clustering
  "cnn-retinopatia": "", // TP2 — CNN retinopatía
  "transfer-fashionmnist": "", // TP2 — Transfer learning FashionMNIST
  "rl-qlearning-taxi": "", // TP4 — Q-learning Taxi
  "nasa-cmapss": "", // PP2 — Mantenimiento predictivo NASA CMAPSS
  "mineria-final": "", // Final — Minería de Datos
  // Hiperautomatización
  "idp-pdf": "", // TP1 — Procesamiento de PDFs
};

export type Subcategory = {
  slug: string;
  name: string;
  colabs: Colab[];
};

export type Category = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  subcategories: Subcategory[];
};

// URL real de Colab si está cargada en COLAB_URLS; si no, el export local de respaldo.
const NB = (slug: string) => COLAB_URLS[slug] || `/notebooks/${slug}.html`;
const COLAB = "colab.research.google.com";

export const categories: Category[] = [
  {
    slug: "data-ml",
    name: "Data & Machine Learning",
    eyebrow: "Categoría",
    description:
      "De la estadística y el análisis exploratorio a las redes neuronales: cómo convierto datos en modelos que predicen y explican.",
    subcategories: [
      {
        slug: "eda",
        name: "Análisis exploratorio (EDA)",
        colabs: [{ title: "EDA — diagnóstico de datos", url: NB("eda-diagnostico"), domain: COLAB }],
      },
      {
        slug: "estadistica",
        name: "Estadística & probabilidad",
        colabs: [{ title: "Estadística descriptiva e inferencia (EED1)", url: NB("eed1-parcial1"), domain: COLAB }],
      },
      {
        slug: "clustering-pca",
        name: "Clustering & PCA",
        colabs: [{ title: "Reducción de dimensionalidad y clustering (EED1)", url: NB("eed1-parcial2"), domain: COLAB }],
      },
      {
        slug: "deep-learning",
        name: "Deep Learning (CNNs)",
        colabs: [{ title: "CNN para retinopatía (PyTorch)", url: NB("cnn-retinopatia"), domain: COLAB }],
      },
      {
        slug: "transfer-learning",
        name: "Transfer Learning",
        colabs: [{ title: "Transfer learning — FashionMNIST", url: NB("transfer-fashionmnist"), domain: COLAB }],
      },
      {
        slug: "reinforcement-learning",
        name: "Reinforcement Learning",
        colabs: [{ title: "Q-learning — Taxi (Gymnasium)", url: NB("rl-qlearning-taxi"), domain: COLAB }],
      },
      {
        slug: "deteccion-anomalias",
        name: "Detección de anomalías",
        colabs: [{ title: "Mantenimiento predictivo — NASA CMAPSS", url: NB("nasa-cmapss"), domain: COLAB }],
      },
      {
        slug: "mineria-de-datos",
        name: "Minería de datos",
        colabs: [{ title: "Final de Minería de Datos", url: NB("mineria-final"), domain: COLAB }],
      },
    ],
  },
  {
    slug: "ia-agentes",
    name: "IA aplicada & Agentes",
    eyebrow: "Categoría",
    description:
      "LLMs, RAG y agentes que razonan, recuperan contexto y ejecutan acciones. La IA puesta a trabajar en problemas reales.",
    subcategories: [
      { slug: "llms-prompting", name: "LLMs & Prompt Engineering", colabs: [] },
      {
        slug: "rag-embeddings",
        name: "RAG & embeddings",
        colabs: [
          { title: "Chatbot RAG y evaluación de embeddings", url: NB("buscador-rag"), domain: COLAB },
          { title: "Similitud semántica con embeddings", url: NB("similitud-semantica"), domain: COLAB },
          { title: "Embeddings del Mundial (lab)", url: NB("mundial-embeddings"), domain: COLAB },
        ],
      },
      {
        slug: "agentes",
        name: "Agentes de IA",
        colabs: [{ title: "Chatbot por recuperación", url: NB("chatbot-recuperacion"), domain: COLAB }],
      },
      { slug: "vision", name: "Visión por computadora", colabs: [] },
      {
        slug: "procesamiento-habla",
        name: "Procesamiento del habla",
        colabs: [{ title: "Clasificación de audio — Speech Commands", url: NB("audio-speechcommands"), domain: COLAB }],
      },
      { slug: "busqueda-heuristica", name: "Búsqueda heurística (A*)", colabs: [] },
    ],
  },
  {
    slug: "hiperautomatizacion",
    name: "Hiperautomatización",
    eyebrow: "Categoría",
    description:
      "RPA, agentes y orquestación de procesos punta a punta. Combinar las piezas correctas para automatizar de verdad.",
    subcategories: [
      { slug: "rpa", name: "RPA (UiPath)", colabs: [] },
      { slug: "n8n-make", name: "n8n & Make", colabs: [] },
      { slug: "agentes-conversacionales", name: "Agentes conversacionales", colabs: [] },
      { slug: "bpmn", name: "BPMN & process mining", colabs: [] },
      {
        slug: "idp",
        name: "Documentos inteligentes (IDP)",
        colabs: [{ title: "Procesamiento de PDFs (NLP)", url: NB("idp-pdf"), domain: COLAB }],
      },
    ],
  },
  {
    slug: "cloud",
    name: "Cloud & Deploy",
    eyebrow: "Categoría",
    description:
      "Ingesta, modelos y despliegue en la nube: serverless, contenedores y pipelines que escalan sin fricción.",
    subcategories: [
      { slug: "gcp", name: "Google Cloud (Vertex AI)", colabs: [] },
      { slug: "cloud-run", name: "Cloud Run & Functions", colabs: [] },
      { slug: "bigquery", name: "BigQuery", colabs: [] },
      { slug: "docker", name: "Docker & contenedores", colabs: [] },
      { slug: "serverless", name: "Arquitectura serverless", colabs: [] },
      { slug: "cicd", name: "CI/CD & despliegue", colabs: [] },
    ],
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getSubcategory(
  catSlug: string,
  subSlug: string
): { category: Category; subcategory: Subcategory } | undefined {
  const category = getCategory(catSlug);
  const subcategory = category?.subcategories.find((s) => s.slug === subSlug);
  if (!category || !subcategory) return undefined;
  return { category, subcategory };
}
