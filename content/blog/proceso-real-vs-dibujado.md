---
title: "El proceso que dibujaste vs el que de verdad ocurre"
date: "2026-03-27"
excerpt: "El flowchart prolijo de la pared y el proceso real rara vez coinciden. Esa brecha es donde se esconde el dinero y el dolor."
tags: ["procesos", "process-mining", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "bpmn"
---

En casi toda empresa hay un diagrama del proceso. Una imagen prolija, con cajas y flechas, que muestra cómo se aprueba un crédito, cómo se atiende un reclamo, cómo se factura. Es ordenado, lineal, hermoso. Y casi siempre es mentira. No por mala fe: es la versión idealizada, la que se dibujó el día que se diseñó el proceso o el día que vino el auditor. El proceso que de verdad ocurre, el que viven los casos todos los días, es otra cosa.

## Tres procesos distintos con el mismo nombre

Conviene distinguir tres cosas que solemos confundir bajo una sola palabra.

- **El proceso dibujado**: el diagrama oficial. Lo que creemos que pasa.
- **El proceso real**: lo que efectivamente ocurre, con sus desvíos, esperas y excepciones.
- **El proceso deseado**: lo que querríamos que pasara, una vez que entendimos los otros dos.

El error clásico es saltar del dibujado al deseado sin pasar por el real. Optimizás una fantasía. El proceso real es el que tenés que medir primero, y la herramienta para verlo sin sesgos es [el process mining: la radiografía de cómo trabaja tu empresa](/hiperautomatizacion/bpmn/process-mining-rayos-x).

## Por qué la realidad siempre es más sucia

El diagrama dibujado tiene, pongamos, ocho pasos en línea recta. Cuando reconstruís el proceso desde los logs, aparecen cosas que nadie puso en la pared:

- Casos que vuelven atrás porque faltó un dato y hay que pedirlo de nuevo.
- Atajos informales que alguien inventó para no esperar la aprobación de turno.
- Un paso "rápido" que en realidad se hace por mail, fuera de todo sistema, y nadie cuenta.
- Excepciones que el manual ni menciona pero que representan la mitad de los casos.

Esa última es la trampa más grande. El diagrama muestra el camino feliz y se olvida de todo lo demás. Pero lo demás no es ruido: suele ser el grueso del trabajo. Lo desarrollo aparte en [el 'happy path' que esconde el 80% del trabajo real](/hiperautomatizacion/bpmn/happy-path-mentira), porque merece su propio capítulo.

## La brecha es información, no un fracaso

Cuando ves por primera vez el proceso real al lado del dibujado, la reacción típica es vergüenza: "esto es un desastre". No lo es. La brecha es el mapa de dónde están los problemas. Cada desvío que el diagrama no preveía es una pregunta valiosa: ¿por qué la gente hace esto en vez de lo que dice el manual? A veces la respuesta es que el manual está mal y el atajo es más inteligente. A veces es que falta un control. En los dos casos aprendiste algo que el dibujo nunca te iba a dar.

Esto es clave antes de automatizar. Si tomás un [bot de RPA](/hiperautomatizacion/rpa/rpa-vs-api) y lo programás para que siga el diagrama dibujado, vas a fallar el día que aparezca la primera excepción real —es decir, el primer día. Por eso el orden importa: medir el proceso real, modelar el deseado y recién ahí automatizar es la columna vertebral de [los seis pilares de la hiperautomatización](/hiperautomatizacion/bpmn/seis-pilares-hiperautomatizacion).

Frente a un flowchart impecable colgado en una oficina, la pregunta que vale es una: ¿esto lo dibujó alguien, o lo descubrieron los datos? La respuesta cambia todo lo que podés confiar en él.
