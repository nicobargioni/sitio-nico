/**
 * Taxonomía del sitio: 4 categorías (los grupos de "Temas"), cada una con sus
 * subcategorías. Cada subcategoría tiene su landing en /[categoría]/[subcategoría]
 * con hero, sus notebooks (cajas de Colab) y los posts del blog asignados a ella.
 *
 * Los notebooks viven en el repo público github.com/nicobargioni/ds-colabs y se
 * abren DIRECTO en Google Colab vía la URL de GitHub (no hace falta subir nada a
 * Drive). Para sumar uno: agregá { title, url: CLAB("<ruta-en-ds-colabs>.ipynb") }.
 */
export type Colab = { title: string; url: string; domain?: string };

export type Subcategory = { slug: string; name: string; colabs: Colab[] };

export type Category = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  subcategories: Subcategory[];
};

// Abre un notebook de ds-colabs directamente en Google Colab (repo público).
const CLAB = (path: string) =>
  `https://colab.research.google.com/github/nicobargioni/ds-colabs/blob/main/${path}`;

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
        colabs: [
          { title: "Titanic", url: CLAB("data-ml/eda/01-titanic-clasificacion.ipynb") },
          { title: "Palmer Penguins", url: CLAB("data-ml/eda/02-penguins-clasificacion.ipynb") },
          { title: "Restaurant Tips", url: CLAB("data-ml/eda/03-tips-regresion.ipynb") },
          { title: "Auto MPG", url: CLAB("data-ml/eda/04-mpg-regresion.ipynb") },
          { title: "Pima Diabetes", url: CLAB("data-ml/eda/05-diabetes-clasificacion.ipynb") },
        ],
      },
      {
        slug: "estadistica",
        name: "Estadística & probabilidad",
        colabs: [
          { title: "Wine (UCI)", url: CLAB("data-ml/estadistica/01-wine-clasificacion.ipynb") },
          { title: "Breast Cancer", url: CLAB("data-ml/estadistica/02-cancer-clasificacion.ipynb") },
          { title: "California Housing", url: CLAB("data-ml/estadistica/03-california-regresion.ipynb") },
          { title: "Car Crashes (US)", url: CLAB("data-ml/estadistica/04-car_crashes-regresion.ipynb") },
          { title: "Iris", url: CLAB("data-ml/estadistica/05-iris-clasificacion.ipynb") },
        ],
      },
      {
        slug: "clustering-pca",
        name: "Clustering & PCA",
        colabs: [
          { title: "Palmer Penguins", url: CLAB("data-ml/clustering-pca/01-penguins-clustering.ipynb") },
          { title: "Iris", url: CLAB("data-ml/clustering-pca/02-iris-clustering.ipynb") },
          { title: "Wine (UCI)", url: CLAB("data-ml/clustering-pca/03-wine-clustering.ipynb") },
          { title: "Pima Diabetes", url: CLAB("data-ml/clustering-pca/04-diabetes-clustering.ipynb") },
          { title: "Auto MPG", url: CLAB("data-ml/clustering-pca/05-mpg-clustering.ipynb") },
        ],
      },
      {
        slug: "deep-learning",
        name: "Deep Learning (CNNs)",
        colabs: [
          { title: "Digits (8×8)", url: CLAB("data-ml/deep-learning/01-digits-deep.ipynb") },
          { title: "Breast Cancer", url: CLAB("data-ml/deep-learning/02-cancer-deep.ipynb") },
          { title: "Pima Diabetes", url: CLAB("data-ml/deep-learning/03-diabetes-deep.ipynb") },
          { title: "Wine (UCI)", url: CLAB("data-ml/deep-learning/04-wine-deep.ipynb") },
          { title: "Palmer Penguins", url: CLAB("data-ml/deep-learning/05-penguins-deep.ipynb") },
        ],
      },
      {
        slug: "transfer-learning",
        name: "Transfer Learning",
        colabs: [
          { title: "Transfer Learning en dígitos", url: CLAB("data-ml/transfer-learning/01-transfer-digits-pytorch.ipynb") },
        ],
      },
      {
        slug: "reinforcement-learning",
        name: "Reinforcement Learning",
        colabs: [
          { title: "Q-learning en Taxi", url: CLAB("data-ml/reinforcement-learning/01-q-learning-taxi.ipynb") },
        ],
      },
      {
        slug: "deteccion-anomalias",
        name: "Detección de anomalías",
        colabs: [
          { title: "Breast Cancer", url: CLAB("data-ml/deteccion-anomalias/01-cancer-anomalia.ipynb") },
          { title: "Pima Diabetes", url: CLAB("data-ml/deteccion-anomalias/02-diabetes-anomalia.ipynb") },
          { title: "California Housing", url: CLAB("data-ml/deteccion-anomalias/03-california-anomalia.ipynb") },
          { title: "Car Crashes (US)", url: CLAB("data-ml/deteccion-anomalias/04-car_crashes-anomalia.ipynb") },
          { title: "Wine (UCI)", url: CLAB("data-ml/deteccion-anomalias/05-wine-anomalia.ipynb") },
        ],
      },
      {
        slug: "mineria-de-datos",
        name: "Minería de datos",
        colabs: [
          { title: "Pima Diabetes", url: CLAB("data-ml/mineria-de-datos/01-diabetes-clasificacion.ipynb") },
          { title: "Titanic", url: CLAB("data-ml/mineria-de-datos/02-titanic-clasificacion.ipynb") },
          { title: "Breast Cancer", url: CLAB("data-ml/mineria-de-datos/03-cancer-clasificacion.ipynb") },
          { title: "Palmer Penguins", url: CLAB("data-ml/mineria-de-datos/04-penguins-clasificacion.ipynb") },
          { title: "Wine (UCI)", url: CLAB("data-ml/mineria-de-datos/05-wine-clasificacion.ipynb") },
        ],
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
      {
        slug: "llms-prompting",
        name: "LLMs & Prompt Engineering",
        colabs: [
          { title: "20 Newsgroups · Recreación", url: CLAB("ml-aplicado/nlp-texto/news_rec-nlp.ipynb") },
          { title: "20 Newsgroups · Ciencia", url: CLAB("ml-aplicado/nlp-texto/news_sci-nlp.ipynb") },
          { title: "20 Newsgroups · Debate", url: CLAB("ml-aplicado/nlp-texto/news_talk-nlp.ipynb") },
          { title: "20 Newsgroups · Tech", url: CLAB("ml-aplicado/nlp-texto/news_tech-nlp.ipynb") },
          { title: "SMS Spam", url: CLAB("ml-aplicado/nlp-texto/sms-nlp.ipynb") },
        ],
      },
      {
        slug: "rag-embeddings",
        name: "RAG & embeddings",
        colabs: [
          { title: "Recuperación semántica con FAISS", url: CLAB("ia-agentes/rag-embeddings/01-rag-faiss-recuperacion.ipynb") },
        ],
      },
      {
        slug: "agentes",
        name: "Agentes de IA",
        colabs: [
          { title: "Agente ReAct con Tool Use", url: CLAB("ia-agentes/agentes/01-agente-react-tools.ipynb") },
        ],
      },
      {
        slug: "vision",
        name: "Visión por computadora",
        colabs: [
          { title: "CNN para clasificar dígitos", url: CLAB("ia-agentes/vision/01-cnn-digits-pytorch.ipynb") },
        ],
      },
      {
        slug: "procesamiento-habla",
        name: "Procesamiento del habla",
        colabs: [
          { title: "Transcripción automática con Whisper", url: CLAB("ia-agentes/procesamiento-habla/01-whisper-asr.ipynb") },
        ],
      },
      {
        slug: "busqueda-heuristica",
        name: "Búsqueda heurística (A*)",
        colabs: [
          { title: "A* en el 8-puzzle", url: CLAB("ia-agentes/busqueda-heuristica/01-a-star-8puzzle.ipynb") },
        ],
      },
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
      { slug: "idp", name: "Documentos inteligentes (IDP)", colabs: [] },
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
