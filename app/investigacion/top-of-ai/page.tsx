import type { Metadata } from "next";
import StudyLayout, { KeyFigure, StudySection } from "../_components/StudyLayout";
import { abs } from "@/lib/jsonld";
import { getStudy } from "@/lib/research";

const study = getStudy("top-of-ai");
const path = `/investigacion/${study.slug}`;

export const metadata: Metadata = {
  title: "Top of AI: Estudio GEO Latam 2026 — resumen y datos",
  description: study.excerpt,
  alternates: { canonical: abs(path) },
  openGraph: {
    title: "Top of AI: Estudio GEO Latam 2026 — Billia y Bargioni",
    description: study.excerpt,
    type: "article",
    url: abs(path),
    images: ["/og/investigacion-top-of-ai.png"],
  },
};

export default function Page() {
  return (
    <StudyLayout study={study}>
      <StudySection title="Qué pregunta respondimos">
        <p>
          Cada vez más gente le pregunta a una IA qué comprar o dónde. Con Nicolás
          Billia quisimos medir sobre miles de búsquedas a qué tiendas, marcas y sitios manda cada una cuando la pregunta es de compra,
          en Argentina, México, Colombia y Chile.
        </p>
        <p>
          Tomamos 81.927 búsquedas de compra reales y sin marca, sacadas de la
          demanda de Google de cada país, y capturamos el 22 de octubre de 2026 lo
          que respondían cuatro IA: AI Overviews y AI Mode de Google, ChatGPT y
          Gemini. A los asistentes conversacionales les hicimos la pregunta con
          dos formas fijas, una para explorar («¿qué me conviene comprar?») y otra
          para decidir («¿dónde lo consigo y a qué precio?»). Después clasificamos
          cada sitio citado en diez tipos: tienda, marketplace, sitio de la marca,
          medios y reseñas, redes, video, entre otros.
        </p>
      </StudySection>

      <StudySection title="Qué encontramos">
        <p>
          Cada IA concentra sus respuestas en pocos sitios, y casi nunca en los
          mismos que las otras.
        </p>
        <KeyFigure value="1 de cada 7">
          Fuentes que, como máximo, comparten en promedio dos IA ante la misma
          búsqueda. El par más parecido llega al 14%; el más distinto, AI Mode y
          ChatGPT, al 5%.
        </KeyFigure>
        <p>
          Algunos patrones son fuertes. Google responde primero con su propio
          catálogo: el 82% de los AI Overviews de compra muestra fichas de Google
          Shopping. Ocho de cada diez respuestas de ChatGPT enlazan al menos una
          tienda minorista, sin contar los marketplaces. Y Gemini manda a Mercado
          Libre en el 73% de sus respuestas de compra en Argentina, contra el 45% en
          Chile.
        </p>
        <p>
          La forma de preguntar también pesa. Si a ChatGPT se le pide comparar
          opciones del mismo producto, enlaza el sitio de la marca en el 62% de las
          respuestas, contra el 39% con la pregunta de compra del estudio. Y la
          misma búsqueda repetida conserva sólo una parte de las fuentes: en
          ChatGPT, el 26%.
        </p>
      </StudySection>

      <StudySection title="Qué significa">
        <p>
          Aparecer en una IA no dice mucho de las otras: cada una arma la respuesta
          con fuentes propias, y las respuestas cambian de una vez a la siguiente.
          Por eso las cifras se leen como porcentajes sobre miles de búsquedas y
          por separado para cada IA; un caso aislado no alcanza para sacar
          conclusiones.
        </p>
      </StudySection>

      <StudySection title="Límites">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Medimos búsquedas de compra genéricas, sin marca. Las búsquedas de marca
            quedan afuera.
          </li>
          <li>
            Cubre cuatro países y cuatro IA. No incluye Perplexity, Claude ni
            Copilot.
          </li>
          <li>
            Es una foto de un día de octubre. La temporada y cada versión nueva de
            los modelos cambian las respuestas; repetir la corrida movió los totales
            hasta 3,2 puntos.
          </li>
          <li>
            «Qué comprar» y «dónde comprar» se preguntaron con formas distintas, así
            que esa diferencia mezcla el momento de compra con la redacción.
          </li>
          <li>No mide cuántas ventas pasan por estas respuestas.</li>
        </ul>
        <p>
          El estudio completo, con el método, los márgenes de error y un
          explorador de datos, está en{" "}
          <a href="https://nomadic.agency/estudio-geo-latam-2026/" target="_blank" rel="noopener">
            la página de Nomadic
          </a>
          . Los datos y la metodología están abiertos en Zenodo con licencia CC BY
          4.0.
        </p>
      </StudySection>
    </StudyLayout>
  );
}
