/**
 * Publicaciones y estudios de Nicolás Bargioni (sección /investigacion/).
 *
 * Fuente única para el índice, las páginas de cada estudio, el sitemap y el
 * JSON-LD. La versión canónica de cada trabajo vive en Zenodo (DOI); acá va un
 * resumen propio en español con links a la fuente.
 */

export const ORCID = "https://orcid.org/0009-0000-6574-4455";
export const ORCID_ID = "0009-0000-6574-4455";
export const NOMADIC_PROFILE = "https://nomadic.agency/equipo/nicolas-bargioni/";
export const NOMADIC_URL = "https://nomadic.agency/";

export type ResearchLink = { label: string; href: string; primary?: boolean };

export type Study = {
  slug: string;
  /** Título original, tal como figura en Zenodo */
  title: string;
  /** Título corto para tarjetas y breadcrumbs */
  shortTitle: string;
  /** Tipo de trabajo, visible en la tarjeta */
  kind: string;
  /** Fecha de publicación (ISO) de la versión vigente */
  date: string;
  /** Fecha legible */
  dateLabel: string;
  authors: { name: string; self?: boolean; role?: string }[];
  doi: string;
  /** Otros identificadores (DOI concepto, versiones previas) */
  relatedDois?: { label: string; doi: string }[];
  language: string;
  license: string;
  /** Frase autocontenida, citable, que va arriba de la página */
  citable: string;
  /** Resumen de una línea para la tarjeta y la meta description */
  excerpt: string;
  links: ResearchLink[];
  keywords: string[];
};

export const doiUrl = (doi: string) => `https://doi.org/${doi}`;

export const studies: Study[] = [
  {
    slug: "recomendar-no-es-citar",
    title:
      "Recommending Is Not Citing: Separable and Competing Mechanisms for Entity Mention and Source Attribution in Large Language Models",
    shortTitle: "Recommending Is Not Citing",
    kind: "Preprint · versión 2",
    date: "2026-11-05",
    dateLabel: "5 de noviembre de 2026",
    authors: [{ name: "Nicolás Bargioni", self: true }],
    doi: "10.5281/zenodo.23968968",
    relatedDois: [
      { label: "DOI de todas las versiones", doi: "10.5281/zenodo.23938245" },
      { label: "Versión 1", doi: "10.5281/zenodo.23938246" },
    ],
    language: "en",
    license: "CC BY 4.0",
    citable:
      "En «Recommending Is Not Citing» (2026), Nicolás Bargioni muestra que, dentro de los modelos de lenguaje, recomendar una marca y citar la fuente que la respalda son dos decisiones separadas que incluso compiten: el mismo dato que hace que el modelo nombre una marca hace que cite menos su fuente.",
    excerpt:
      "Nombrar una marca y citar su fuente son dos decisiones distintas dentro de un modelo de lenguaje, y el mismo dato empuja una hacia arriba y la otra hacia abajo.",
    links: [
      {
        label: "Leer el PDF",
        href: "https://zenodo.org/records/23968968/files/Bargioni_2026_recommending_is_not_citing_v2.pdf",
        primary: true,
      },
      { label: "Registro en Zenodo (DOI)", href: doiUrl("10.5281/zenodo.23968968") },
    ],
    keywords: [
      "modelos de lenguaje",
      "atribución de fuentes",
      "interpretabilidad",
      "RAG",
      "AI Overviews",
    ],
  },
  {
    slug: "top-of-ai",
    title: "Top of AI: Estudio GEO Latam 2026",
    shortTitle: "Top of AI",
    kind: "Estudio y conjunto de datos",
    date: "2026-10-23",
    dateLabel: "octubre de 2026",
    authors: [
      { name: "Nicolás Billia", role: "Head of SEO en Nomadic" },
      { name: "Nicolás Bargioni", self: true, role: "Head of Data en Nomadic" },
    ],
    doi: "10.5281/zenodo.23601816",
    relatedDois: [{ label: "DOI de todas las versiones", doi: "10.5281/zenodo.23601815" }],
    language: "es",
    license: "CC BY 4.0",
    citable:
      "En «Top of AI: Estudio GEO Latam 2026», Nicolás Billia y Nicolás Bargioni midieron a qué sitios mandan ChatGPT, Gemini, AI Overviews y AI Mode cuando alguien busca comprar en Argentina, México, Colombia y Chile, sobre 81.927 búsquedas de compra.",
    excerpt:
      "A qué tiendas, marcas y sitios mandan cuatro IA a quien busca comprar en cuatro países de Latinoamérica: 81.927 búsquedas medidas en un día.",
    links: [
      {
        label: "Ver el estudio completo en Nomadic",
        href: "https://nomadic.agency/estudio-geo-latam-2026/",
        primary: true,
      },
      { label: "Datos y método en Zenodo (DOI)", href: doiUrl("10.5281/zenodo.23601816") },
    ],
    keywords: ["GEO", "ChatGPT", "Gemini", "AI Overviews", "AI Mode", "Latinoamérica"],
  },
];

export const getStudy = (slug: string) => studies.find((s) => s.slug === slug)!;
