/**
 * Taxonomía del sitio: 4 categorías (los grupos de "Temas"), cada una con sus
 * subcategorías. Cada subcategoría tiene su landing en /[categoría]/[subcategoría]
 * con hero + descripción, sus notebooks (cajas de Colab) y los posts del blog.
 *
 * Los notebooks viven en el repo público github.com/nicobargioni/ds-colabs y se
 * abren DIRECTO en Google Colab vía la URL de GitHub (no hace falta subir nada a
 * Drive). Para sumar uno: agregá { title, url: CLAB("<ruta-en-ds-colabs>.ipynb") }.
 */
export type Colab = { title: string; url: string; domain?: string };

export type Subcategory = {
  slug: string;
  name: string;
  description?: string; // 2 párrafos separados por \n\n (bajada de la landing)
  colabs: Colab[];
};

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
        description:
          "El análisis exploratorio es el primer contacto serio con los datos: distribuciones, valores faltantes, correlaciones y outliers antes de modelar nada. Es la etapa donde se descubren los problemas que después arruinan un modelo y donde empezás a entender qué historia cuentan los datos.\n\nAcá comparto cómo encaro un EDA riguroso, con foco en graficar antes de concluir y en no dar nada por sentado. Para mí un buen modelo empieza mucho antes del entrenamiento, en estas preguntas iniciales que casi nadie se toma el tiempo de hacer bien.",
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
        description:
          "La estadística y la probabilidad son la base que sostiene cualquier decisión basada en datos: estimar, cuantificar incertidumbre y distinguir una señal real de una casualidad. Sin esto, un número es solo un número sin contexto.\n\nMe interesa especialmente la parte que se suele saltear: por qué un test dice lo que dice y qué supuestos hay detrás de cada conclusión. Acá trato de explicar la intuición antes que la fórmula, porque entender el razonamiento es lo que después te salva de sacar conclusiones equivocadas.",
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
        description:
          "El clustering busca agrupar observaciones parecidas sin etiquetas previas, mientras que PCA reduce la dimensionalidad para quedarse con lo que realmente aporta información. Son herramientas clave cuando querés encontrar estructura escondida en datos que a simple vista parecen ruido.\n\nAcá muestro cómo combino ambas técnicas para segmentar y simplificar problemas reales, desde perfilar usuarios hasta comprimir variables redundantes. Lo que más me importa es interpretar los grupos que aparecen: un cluster sin lectura de negocio no sirve de mucho.",
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
        description:
          "El deep learning usa redes neuronales con muchas capas para aprender representaciones complejas directamente de los datos, y las CNNs son su versión especializada en imágenes y señales con estructura espacial. Es lo que permite que una máquina aprenda patrones que serían imposibles de programar a mano.\n\nAcá comparto cómo armo y entreno redes para problemas concretos, prestando atención a la arquitectura, el sobreajuste y el costo de cómputo. Me interesa desmitificar el tema: detrás de la complejidad hay decisiones de diseño que se pueden entender y justificar.",
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
        description:
          "El transfer learning reutiliza un modelo ya entrenado en una tarea grande y lo adapta a un problema nuevo con muchos menos datos y tiempo. Es lo que hace viable resolver problemas serios sin necesidad de entrenar desde cero ni tener millones de ejemplos.\n\nMe interesa porque es la diferencia entre un proyecto que se puede hacer y uno que no, sobre todo en contextos con datos limitados. Acá muestro cómo elijo qué congelar, qué reentrenar y cómo aprovechar lo que un modelo ya aprendió para llegar más rápido a algo útil.",
        colabs: [
          { title: "Transfer Learning en dígitos", url: CLAB("data-ml/transfer-learning/01-transfer-digits-pytorch.ipynb") },
        ],
      },
      {
        slug: "reinforcement-learning",
        name: "Reinforcement Learning",
        description:
          "El reinforcement learning entrena agentes que aprenden por prueba y error, optimizando recompensas a través de la interacción con un entorno. A diferencia del aprendizaje supervisado, acá no hay respuestas correctas dadas: el agente descubre qué hacer probando y ajustando.\n\nMe atrae como paradigma porque modela bien problemas de decisión secuencial, donde cada acción cambia el escenario siguiente. Acá exploro la lógica de recompensas, exploración y explotación, y cómo este enfoque conecta con problemas de control y optimización del mundo real.",
        colabs: [
          { title: "Q-learning en Taxi", url: CLAB("data-ml/reinforcement-learning/01-q-learning-taxi.ipynb") },
        ],
      },
      {
        slug: "deteccion-anomalias",
        name: "Detección de anomalías",
        description:
          "La detección de anomalías busca identificar lo que se sale del patrón esperado: fraudes, fallas, errores o comportamientos inusuales. El desafío es que las anomalías son raras por definición, así que casi nunca tenés suficientes ejemplos para aprenderlas de forma directa.\n\nAcá comparto enfoques para detectar lo atípico tanto en datos tabulares como en series temporales, equilibrando sensibilidad y falsas alarmas. Me importa el lado práctico: una alerta que se dispara todo el tiempo termina siendo tan inútil como una que nunca suena.",
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
        description:
          "La minería de datos busca extraer patrones, reglas y relaciones útiles de grandes volúmenes de información. Es el arte de pasar de tablas enormes a hallazgos accionables, como qué productos se compran juntos o qué señales anticipan una decisión.\n\nAcá muestro técnicas para descubrir asociaciones y estructuras que no son obvias a primera vista, siempre con un ojo en si el patrón encontrado tiene sentido. Porque la minería sin criterio encuentra correlaciones por todos lados; la parte difícil es separar las que importan.",
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
        description:
          "Los modelos de lenguaje grandes (LLMs) generan y entienden texto a partir de enormes cantidades de datos, y el prompt engineering es el oficio de comunicarse bien con ellos. Saber pedir las cosas de la forma correcta cambia por completo la calidad de lo que devuelven.\n\nMe interesa el costado práctico: cómo estructurar instrucciones, dar contexto y restringir la salida para obtener resultados confiables y no solo respuestas que suenan bien. Acá comparto patrones de prompting que uso en sistemas reales, donde la consistencia importa más que la anécdota.",
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
        description:
          "RAG (generación aumentada por recuperación) conecta un modelo de lenguaje con una base de conocimiento propia, y los embeddings son las representaciones numéricas que hacen posible buscar por significado y no por palabras exactas. Juntos permiten que un LLM responda con información tuya, actualizada y verificable.\n\nAcá muestro cómo armo pipelines de RAG de punta a punta: cómo trocear documentos, indexarlos y recuperar el contexto justo para cada consulta. Es una de las arquitecturas que más uso, porque resuelve el problema real de que un modelo no conoce tus datos.",
        colabs: [
          { title: "Recuperación semántica con FAISS", url: CLAB("ia-agentes/rag-embeddings/01-rag-faiss-recuperacion.ipynb") },
        ],
      },
      {
        slug: "agentes",
        name: "Agentes de IA",
        description:
          "Un agente de IA es un sistema que no solo responde, sino que decide y ejecuta acciones: usa herramientas, consulta APIs y encadena pasos para cumplir un objetivo. La diferencia con un chatbot es que un agente hace cosas, no solo conversa.\n\nMe interesa diseñar agentes que sean confiables y acotados, con límites claros sobre qué pueden hacer y cómo se recuperan de un error. Acá comparto cómo pienso la orquestación de herramientas y el control del flujo, porque la magia de un agente está tanto en lo que hace como en lo que se le impide hacer.",
        colabs: [
          { title: "Agente ReAct con Tool Use", url: CLAB("ia-agentes/agentes/01-agente-react-tools.ipynb") },
        ],
      },
      {
        slug: "vision",
        name: "Visión por computadora",
        description:
          "La visión por computadora permite que una máquina interprete imágenes y video: detectar objetos, clasificar escenas, leer texto o medir características visuales. Es traducir píxeles en información con la que se puede decidir.\n\nAcá exploro cómo aplico estos modelos a problemas concretos, desde clasificación hasta análisis de performance visual. Me interesa el puente entre lo técnico y el negocio: una imagen bien interpretada puede explicar por qué algo funciona o falla mucho mejor que una planilla.",
        colabs: [
          { title: "CNN para clasificar dígitos", url: CLAB("ia-agentes/vision/01-cnn-digits-pytorch.ipynb") },
        ],
      },
      {
        slug: "procesamiento-habla",
        name: "Procesamiento del habla",
        description:
          "El procesamiento del habla convierte audio en texto y texto en voz, y abre la puerta a interfaces que se manejan hablando. Incluye transcripción, diarización (quién dijo qué) y todo lo necesario para que una conversación se vuelva dato analizable.\n\nMe interesa especialmente lo que pasa después de la transcripción: extraer compromisos, resumir reuniones o detectar temas a partir de lo que se dijo. Acá comparto cómo encaro ese flujo, porque el audio bien procesado es una fuente de información riquísima y casi siempre desaprovechada.",
        colabs: [
          { title: "Transcripción automática con Whisper", url: CLAB("ia-agentes/procesamiento-habla/01-whisper-asr.ipynb") },
        ],
      },
      {
        slug: "busqueda-heuristica",
        name: "Búsqueda heurística (A*)",
        description:
          "La búsqueda heurística resuelve problemas explorando posibilidades de forma inteligente, usando estimaciones para no perder tiempo en caminos malos. Algoritmos como A* son la base de cosas tan distintas como un GPS, un puzzle o la planificación de un robot.\n\nMe gusta este tema porque enseña a pensar problemas como espacios de estados y a diseñar buenas heurísticas, que es donde está el arte. Acá muestro la lógica detrás de estos algoritmos clásicos, que siguen siendo sorprendentemente vigentes incluso en la era de los modelos enormes.",
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
      {
        slug: "rpa",
        name: "RPA (UiPath)",
        description:
          "El RPA (automatización robótica de procesos) usa bots de software para ejecutar tareas repetitivas igual que lo haría una persona: clicks, formularios, copiar y pegar entre sistemas. Es la forma más directa de automatizar procesos cuando no hay una API disponible.\n\nAcá comparto cómo abordo automatizaciones con herramientas como UiPath, con foco en procesos que realmente valen la pena automatizar. Me interesa el criterio antes que la herramienta: automatizar un proceso malo solo te da un proceso malo más rápido.",
        colabs: [],
      },
      {
        slug: "n8n-make",
        name: "n8n & Make",
        description:
          "n8n y Make son plataformas de automatización low-code que conectan apps y servicios mediante flujos visuales, sin tener que escribir todo el código de integración. Permiten armar en horas lo que de otra forma serían días de desarrollo.\n\nMe interesan porque democratizan la automatización: dejan resolver integraciones reales con poco código y mucha lógica. Acá muestro cómo diseño workflows robustos, pensando en el manejo de errores y los reintentos, que es lo que separa una demo linda de algo que aguanta producción.",
        colabs: [],
      },
      {
        slug: "agentes-conversacionales",
        name: "Agentes conversacionales",
        description:
          "Los agentes conversacionales son interfaces que resuelven tareas a través del diálogo: responder consultas, guiar un proceso o disparar acciones desde un chat. Bien hechos, sienten natural y resuelven; mal hechos, frustran más que un formulario.\n\nAcá comparto cómo los diseño combinando lenguaje natural con lógica de negocio y conexión a sistemas reales. Me importa que sepan cuándo no saben y cuándo derivar a un humano, porque un buen agente conoce sus propios límites.",
        colabs: [],
      },
      {
        slug: "bpmn",
        name: "BPMN & process mining",
        description:
          "BPMN es el estándar para modelar procesos de negocio de forma visual y compartible, y el process mining reconstruye cómo se ejecutan realmente esos procesos a partir de los datos que dejan los sistemas. Juntos muestran la diferencia entre cómo creés que funciona algo y cómo funciona de verdad.\n\nMe interesa este cruce porque es donde la automatización se vuelve estratégica: primero entender el proceso, después optimizarlo. Acá comparto cómo modelo flujos y leo la evidencia de los datos para encontrar cuellos de botella antes de automatizar a ciegas.",
        colabs: [],
      },
      {
        slug: "idp",
        name: "Documentos inteligentes (IDP)",
        description:
          "El procesamiento inteligente de documentos (IDP) extrae datos estructurados de archivos desordenados: facturas, contratos, formularios o PDFs escaneados. Combina OCR, modelos de lenguaje y reglas para convertir documentos en información lista para usar.\n\nAcá muestro cómo abordo la extracción de documentos del mundo real, que casi nunca vienen prolijos ni en un formato único. Me interesa porque es una de las automatizaciones con retorno más claro: hay muchísimo trabajo manual escondido en mover datos de un papel a un sistema.",
        colabs: [],
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
      {
        slug: "gcp",
        name: "Google Cloud (Vertex AI)",
        description:
          "Google Cloud Platform es el conjunto de servicios de infraestructura, datos e IA de Google, y Vertex AI es su plataforma para entrenar, desplegar y consumir modelos de machine learning. Es la base sobre la que corren muchos proyectos de datos en producción.\n\nAcá comparto cómo me muevo en el ecosistema de GCP, eligiendo el servicio adecuado para cada problema sin sobredimensionar. Me interesa el equilibrio entre potencia y costo: la nube te da todo, pero la disciplina está en usar solo lo que necesitás.",
        colabs: [],
      },
      {
        slug: "cloud-run",
        name: "Cloud Run & Functions",
        description:
          "Cloud Run y Cloud Functions permiten desplegar código que escala solo y se cobra por uso, sin tener que administrar servidores. Son ideales para APIs, webhooks y tareas que no necesitan estar prendidas todo el tiempo.\n\nAcá muestro cómo despliego servicios en estos entornos, cuidando los tiempos de arranque y el costo cuando no hay tráfico. Me interesa porque son la columna vertebral de la mayoría de mis automatizaciones: pagás por lo que usás y te olvidás de mantener una máquina prendida.",
        colabs: [],
      },
      {
        slug: "bigquery",
        name: "BigQuery",
        description:
          "BigQuery es el data warehouse serverless de Google: consultás terabytes de datos con SQL y sin administrar infraestructura. Está pensado para análisis a gran escala donde una base de datos tradicional se quedaría corta.\n\nAcá comparto cómo lo uso para análisis y como fuente de datos para modelos, escribiendo queries que sean rápidas y baratas a la vez. Me importa el detalle del costo: en BigQuery una consulta mal escrita no solo es lenta, sino que también te puede salir cara.",
        colabs: [],
      },
      {
        slug: "docker",
        name: "Docker & contenedores",
        description:
          "Docker empaqueta una aplicación con todas sus dependencias en un contenedor que corre igual en cualquier lado, eliminando el clásico \"en mi máquina funcionaba\". Es la base de prácticamente todo el desarrollo y despliegue moderno.\n\nAcá muestro cómo containerizo proyectos para que sean reproducibles y fáciles de desplegar en la nube. Me interesa porque es la pieza que conecta el desarrollo local con producción: un buen contenedor hace que el deploy deje de ser un momento de tensión.",
        colabs: [],
      },
      {
        slug: "serverless",
        name: "Arquitectura serverless",
        description:
          "La arquitectura serverless deja que el proveedor de nube gestione los servidores, mientras vos te enfocás solo en el código y la lógica. Escala automáticamente y cobra por ejecución, así que cuando nadie usa el sistema, no pagás nada.\n\nMe interesa este enfoque porque baja la barrera para poner ideas en producción sin un equipo de infraestructura detrás. Acá comparto cómo diseño sistemas pensando en eventos y funciones acotadas, que es la mentalidad que mejor aprovecha este modelo.",
        colabs: [],
      },
      {
        slug: "cicd",
        name: "CI/CD & despliegue",
        description:
          "CI/CD (integración y entrega continua) automatiza el camino del código desde el commit hasta producción: pruebas, build y despliegue sin pasos manuales. El objetivo es poder publicar cambios de forma frecuente y segura, sin que cada deploy sea un evento.\n\nAcá comparto cómo armo pipelines que validan y despliegan automáticamente, para que el foco quede en el código y no en el proceso de subirlo. Me interesa porque buena automatización del deploy es lo que te deja iterar rápido sin romper lo que ya funciona.",
        colabs: [],
      },
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
