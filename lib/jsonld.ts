import { site } from "./site";

const PERSON_ID = `${site.url}/#person`;
const SITE_ID = `${site.url}/#website`;
const IMAGE = `${site.url}/nico.jpg`;

/**
 * URL absoluta canónica con exactamente una barra final.
 * Coincide con `trailingSlash: true` (export estático + Firebase Hosting) y con
 * el canonical que emite Next, para que el JSON-LD no cite URLs que redirigen.
 */
export function abs(path: string = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const trimmed = path.replace(/^\/+|\/+$/g, "");
  return trimmed ? `${site.url}/${trimmed}/` : `${site.url}/`;
}

const sameAs = [
  site.social.twitter,
  site.social.linkedin,
  site.social.github,
].filter(Boolean);

/** Person (Nico) — entidad central del sitio. */
export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: abs(),
    image: IMAGE,
    email: `mailto:${site.email}`,
    jobTitle: "Data Scientist",
    description: site.authorBio ?? site.description,
    worksFor: { "@type": "Organization", name: "Nomadic" },
    sameAs,
    knowsAbout: [
      "Data Science",
      "Machine Learning",
      "Deep Learning",
      "Inteligencia Artificial",
      "Procesamiento del Lenguaje Natural",
      "Hiperautomatización",
      "Cloud Computing",
      "Python",
    ],
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "ISSD",
        description: "Carrera: Ciencia de Datos e Inteligencia Artificial",
      },
      {
        "@type": "EducationalOrganization",
        name: "EBIS Business Techschool",
        description:
          "Máster en Hiperautomatización de Procesos de Negocio y Agentes de IA",
      },
    ],
  };
}

/** WebSite. */
export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    url: abs(),
    name: site.name,
    description: site.description,
    inLanguage: "es",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };
}

/** ProfilePage — el home es la página de perfil de Nico. */
export function profilePageLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: abs(),
    name: site.title,
    inLanguage: "es",
    isPartOf: { "@id": SITE_ID },
    mainEntity: { "@id": PERSON_ID },
  };
}

/** Service — una solución de negocio que ofrece Nico. */
export function serviceLd(s: { titulo: string; resumen: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.titulo,
    description: s.resumen,
    url: abs(`/soluciones/${s.slug}`),
    provider: { "@id": PERSON_ID },
    areaServed: "AR",
    serviceType: "Ciencia de datos e IA aplicada",
  };
}

/** FAQPage para una solución — ayuda a que IAs y buscadores entiendan la oferta. */
export function faqLd(s: {
  titulo: string;
  problema: string;
  resultados: string[];
  paraQuien: string;
}) {
  const qa = [
    { q: `¿Qué problema resuelve ${s.titulo}?`, a: s.problema },
    { q: "¿Qué obtengo con esta solución?", a: s.resultados.join(". ") + "." },
    { q: "¿Para quién es?", a: s.paraQuien },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

type Crumb = { name: string; path: string };

/** BreadcrumbList a partir de una lista de {name, path}. */
export function breadcrumbLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: abs(c.path),
    })),
  };
}

/** BlogPosting (subtipo de Article) enriquecido. */
export function blogPostingLd(post: {
  title: string;
  excerpt: string;
  date: string;
  path: string;
  tags?: string[];
  section?: string;
  wordCount?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "es",
    image: [IMAGE],
    mainEntityOfPage: abs(post.path),
    url: abs(post.path),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": SITE_ID },
    ...(post.section ? { articleSection: post.section } : {}),
    ...(post.tags && post.tags.length ? { keywords: post.tags.join(", ") } : {}),
    ...(post.wordCount ? { wordCount: post.wordCount } : {}),
  };
}

/** CollectionPage para una categoría / subcategoría. */
export function collectionLd(c: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: c.name,
    description: c.description,
    url: abs(c.path),
    inLanguage: "es",
    isPartOf: { "@id": SITE_ID },
    about: { "@id": PERSON_ID },
  };
}

/** ItemList genérico (posts, proyectos, etc.). */
export function itemListLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: abs(it.path),
    })),
  };
}

/** SoftwareSourceCode — para los notebooks/Colabs. */
export function softwareSourceCodeLd(nb: { title: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: nb.title,
    codeRepository: abs(nb.url),
    programmingLanguage: "Python",
    runtimePlatform: "Google Colab / Jupyter",
    author: { "@id": PERSON_ID },
  };
}
