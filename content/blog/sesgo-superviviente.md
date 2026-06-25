---
title: "El sesgo del superviviente: los aviones de Wald y los datos que no ves"
date: "2026-05-13"
excerpt: "El ejército quería blindar donde los aviones volvían agujereados. Un estadístico vio lo contrario: hay que blindar donde NO hay agujeros."
tags: ["mineria", "patrones", "curiosidades"]
category: "data-ml"
subcategory: "mineria-de-datos"
---

Segunda Guerra Mundial. Los aviones bombarderos vuelven a base llenos de agujeros de bala, y el ejército quiere reforzarlos con blindaje. Pero el blindaje pesa, así que no podés ponerlo en todos lados: hay que elegir dónde. La idea obvia: blindar donde más impactos hay. Mapearon cientos de aviones que volvieron, marcaron cada agujero, y vieron que las alas y el fuselaje estaban acribillados, mientras los motores casi no tenían marcas. Conclusión natural: reforcemos alas y fuselaje.

Un estadístico llamado Abraham Wald dijo exactamente lo contrario. Y tenía razón.

## El dato que no estaba en la mesa

Wald, del Statistical Research Group de Columbia, hizo una pregunta que nadie más se hizo: *¿de dónde salieron estos aviones?* De los que **volvieron**. Los datos describían a los sobrevivientes. Los aviones impactados en los motores no estaban en la muestra por una razón sencilla y brutal: no volvieron. Se cayeron.

Entonces los agujeros en las alas no marcaban las zonas peligrosas. Marcaban las zonas donde un avión podía recibir balazos y **aun así sobrevivir**. La ausencia de agujeros en los motores no significaba que no les disparaban: significaba que cuando les disparaban ahí, el avión no volvía a contarlo.

La recomendación de Wald: blindar justo donde los aviones que regresaron *no* tenían agujeros. El dato más importante era el que no estaba.

## Por qué esto es minería de datos, no historia de guerra

El sesgo del superviviente es el riesgo número uno de cualquiera que mina datos, porque ataca antes de que abras una sola fórmula. No es un error de cálculo: es un error en **qué datos llegaron a tu tabla**. Algunos ejemplos cotidianos:

- "Los fundadores exitosos abandonaron la universidad." Mirás a los que triunfaron e ignorás los miles que abandonaron y fracasaron, que no salen en ninguna nota.
- "Este edificio viejo está mejor construido que los modernos." Los edificios viejos mal construidos ya se cayeron. Solo ves a los que aguantaron.
- "Nuestros clientes están felices, las encuestas lo dicen." Los que se fueron furiosos no contestan encuestas: ya no son clientes.

En los tres casos, el dato ausente —el que se cayó, el que se fue— es justo el que cambiaría la conclusión.

## Cómo defenderte

No hay una fórmula mágica, pero sí una rutina mental. Antes de confiar en cualquier patrón que minás, preguntate:

1. **¿Quién o qué quedó afuera de esta muestra, y por qué?**
2. **¿El proceso que generó los datos filtró sistemáticamente algunos casos?**
3. **¿La ausencia de un valor es ruido, o es información?** Porque muchas veces [los valores faltantes te están gritando algo](/data-ml/eda/valores-faltantes-gritan).

Esta es la diferencia entre minar y minar bien. Te puede pasar al leer reglas de asociación —ignorar la línea de base es primo del sesgo del superviviente, como vimos con [soporte, confianza y lift](/data-ml/mineria-de-datos/soporte-confianza-lift)— o al cazar fraudes, donde [el 0,1% que importa casi nunca está balanceado en tus datos](/data-ml/deteccion-anomalias/fraude-desbalance). Es la misma trampa que infló el mito de [pañales y cerveza](/data-ml/mineria-de-datos/panales-cerveza): mirar solo la parte cómoda de la evidencia.

Wald no tenía mejores datos que el ejército. Tenía una mejor pregunta sobre los datos que faltaban. En minería, esa pregunta vale más que cualquier algoritmo.
