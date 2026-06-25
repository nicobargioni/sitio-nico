/**
 * Configuración central del sitio.
 * Editá acá tus datos: se usan en metadata, header, hero y footer.
 */
export const site = {
  name: "Nico Bargioni",
  // Aparece en la pestaña del navegador y en <title>
  title: "Nicolás Bargioni — Data Scientist · IA aplicada y machine learning",
  shortName: "Nico Bargioni",
  // Bajada principal del hero
  tagline: "Data Scientist · IA aplicada",
  // Descripción para compartir en redes (≈150 caracteres)
  description:
    "Data Scientist enfocado en IA aplicada y machine learning. Convierto datos en modelos y decisiones para el negocio. Proyectos, casos y blog.",
  // Bajada larga del hero (2-3 líneas)
  intro:
    "Soy Nicolás Bargioni, Data Scientist. Construyo modelos, automatizaciones e IA aplicada que convierten datos en decisiones. Python, machine learning y LLMs puestos a trabajar en el negocio.",
  // Bio breve para la caja de autor al pie de las notas
  authorBio:
    "Data Scientist enfocado en IA aplicada, machine learning y automatización. Construyo modelos y herramientas propias que convierten datos en decisiones, y escribo sobre lo que aprendo en el camino.",
  // Cambialo cuando tengas el dominio definitivo
  url: "https://nicolasbargioni.com",
  email: "nicobargioni@gmail.com",
  // Redes (dejá vacío "" lo que no uses)
  social: {
    linkedin: "https://www.linkedin.com/in/nicolas-bargioni/",
    twitter: "https://x.com/barshioni",
  },
  // 📊 GA4: pegá tu Measurement ID (G-XXXXXXXXXX). Vacío = analytics desactivado.
  gaMeasurementId: "G-QSQP3H5XSX",
  // 🔍 Search Console por meta-tag (opcional): pegá el content del <meta name="google-site-verification">.
  // Vacío = no se agrega (usá verificación por DNS TXT, que es mejor).
  googleSiteVerification: "",
};

export type Site = typeof site;
