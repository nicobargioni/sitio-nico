import { site } from "./site";

const PERSON_ID = `${site.url}/#person`;
const SITE_ID = `${site.url}/#website`;
const IMAGE = `${site.url}/nico.jpg`;

const sameAs = [site.social.twitter, site.social.linkedin].filter(Boolean);

/** Person (Nico) — entidad central del sitio. */
export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: site.url,
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
    url: site.url,
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
    url: site.url,
    name: site.title,
    inLanguage: "es",
    isPartOf: { "@id": SITE_ID },
    mainEntity: { "@id": PERSON_ID },
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
      item: `${site.url}${c.path}`,
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
    mainEntityOfPage: `${site.url}${post.path}`,
    url: `${site.url}${post.path}`,
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
    url: `${site.url}${c.path}`,
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
      url: it.path.startsWith("http") ? it.path : `${site.url}${it.path}`,
    })),
  };
}

/** SoftwareSourceCode — para los notebooks/Colabs. */
export function softwareSourceCodeLd(nb: { title: string; url: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    name: nb.title,
    codeRepository: nb.url.startsWith("http") ? nb.url : `${site.url}${nb.url}`,
    programmingLanguage: "Python",
    runtimePlatform: "Google Colab / Jupyter",
    author: { "@id": PERSON_ID },
  };
}
