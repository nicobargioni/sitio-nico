import type { Metadata } from "next";
import StudyLayout, { KeyFigure, StudySection } from "../_components/StudyLayout";
import { abs } from "@/lib/jsonld";
import { getStudy } from "@/lib/research";

const study = getStudy("recomendar-no-es-citar");
const path = `/investigacion/${study.slug}`;

export const metadata: Metadata = {
  title: "Recommending Is Not Citing (2026): recomendar y citar son decisiones separadas",
  description: study.excerpt,
  alternates: { canonical: abs(path) },
  openGraph: {
    title: "Recommending Is Not Citing — Nicolás Bargioni (2026)",
    description: study.excerpt,
    type: "article",
    url: abs(path),
    images: ["/og/investigacion-recomendar-no-es-citar.png"],
  },
};

export default function Page() {
  return (
    <StudyLayout study={study}>
      <StudySection title="Qué pregunta respondí">
        <p>
          Cuando le pedís a un asistente de IA que te recomiende algo y que muestre
          de dónde lo saca, la respuesta trae dos cosas: el nombre de una marca y un
          número entre corchetes que apunta a una fuente. Solemos leerlas como una
          sola decisión. Yo quise saber si el modelo las decide juntas o por
          separado, y si una afecta a la otra.
        </p>
        <p>
          Para aislarlo armé un escenario controlado: cinco fuentes numeradas, una
          por marca, una pregunta de compra y la instrucción de citar. En cinco
          modelos abiertos (la familia Qwen3.5, de 4.000 a 397.000 millones de
          parámetros, y DeepSeek-V4-Flash) leí la probabilidad de cada palabra
          siguiente; en dos modelos comerciales por API analicé el texto que
          generaban.
        </p>
      </StudySection>

      <StudySection title="Qué encontré">
        <p>
          En los siete modelos pasa lo mismo: si a la fuente de una marca le sumo un
          solo dato concreto y verificable, el modelo nombra esa marca mucho más
          seguido, y una vez que la nombró, cita esa fuente al lado del nombre con
          menos frecuencia.
        </p>
        <KeyFigure value="1,7% → 47,7%">
          Probabilidad de que Qwen3.5-27B nombre la marca cuando su fuente gana un
          dato concreto. En el mismo cambio, la probabilidad de que cite esa fuente
          junto al nombre baja de 5,9% a 3,2%.
        </KeyFigure>
        <p>
          Adentro del modelo, las dos decisiones ocupan lugares distintos. La
          dirección interna que representa «recomendar esta marca» y la que
          representa «citar ahora» son casi perpendiculares en las capas donde se
          toma cada decisión. Si empujo artificialmente la de recomendar, el modelo
          nombra más y cita menos (lo vi en tres modelos). La decisión de citar
          aparece tarde, en el último 10% de las capas. Y citar se parte en dos
          pasos: decidir si abrir un corchete y elegir qué número poner. El número
          sale bien el 99% de las veces; el dato concreto actúa sobre el primer
          paso.
        </p>
        <p>
          En la versión 2 lo contrasté contra Google AI Overviews: 511 búsquedas de
          productos en Argentina y 9.890 pares búsqueda–página. En producción
          también se separan: en 2.543 pares la respuesta nombró la marca de la
          página sin citar la página, y en 464 citó la página sin nombrar la marca. El link fue al pasaje más
          parecido en texto en el 58% de las oraciones, contra 31% esperable por
          azar, mientras que la posición orgánica y la autoridad del dominio no
          anticiparon la cita mejor que el azar. También probé si una simulación
          con un modelo abierto podía predecir qué páginas cita Google: mejoró la
          predicción en 0,026 puntos de AUC, por debajo del umbral de 0,03 que
          había fijado antes de mirar los datos, así que lo reporto como resultado
          negativo.
        </p>
      </StudySection>

      <StudySection title="Qué significa">
        <p>
          Que una IA mencione una marca y que enlace su fuente son dos resultados
          distintos, con causas distintas, y pueden moverse en direcciones
          opuestas. Para cualquiera que mida presencia en respuestas de IA, la
          consecuencia práctica es contarlos por separado: un número único de
          «visibilidad» mezcla dos cosas que el modelo decide por caminos
          diferentes.
        </p>
      </StudySection>

      <StudySection title="Trabajo relacionado">
        <p>
          El resultado converge con el de{" "}
          <a href="https://arxiv.org/abs/2610.15033" target="_blank" rel="noopener">
            Chen &amp; Koudas (arXiv:2610.15033)
          </a>
          , que llegaron antes y a una escala mucho mayor a la misma conclusión
          desde afuera: analizando 158.099 respuestas de motores en producción,
          vieron que las páginas se citan cuando el buscador las recupera y que las
          marcas se nombran también cuando el modelo las recuerda. Mi trabajo suma
          dos piezas: la separación se ve adentro del modelo aun con todas las
          fuentes ya en contexto, y en AI Overviews el link sigue la similitud de
          texto.
        </p>
      </StudySection>

      <StudySection title="Límites">
        <ul className="list-disc pl-5 space-y-2">
          <li>
            El análisis interno usa un solo rubro, un solo mercado y preguntas en
            español. El comportamiento se repite en siete modelos, pero el mecanismo
            lo examiné en un solo escenario.
          </li>
          <li>
            Las cinco fuentes las escribí para el experimento; los textos reales
            que recupera un buscador son más largos y más ruidosos.
          </li>
          <li>
            Mido la cita cuando se le pide al modelo que cite, y la mido junto al
            nombre de la marca. Eso no evalúa si la cita es correcta o fiel a la
            fuente.
          </li>
          <li>
            La validación externa es de un país y un período corto, y en casi la
            mitad de los pares no se pudo descargar el texto de la página. Un modelo
            abierto tampoco reproduce cómo arma Google sus fuentes.
          </li>
        </ul>
        <p>
          El preprint está en Zenodo con licencia CC BY 4.0. La versión en arXiv
          está en proceso.
        </p>
      </StudySection>
    </StudyLayout>
  );
}
