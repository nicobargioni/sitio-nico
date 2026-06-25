---
title: "El 'happy path' que esconde el 80% del trabajo real"
date: "2026-03-24"
excerpt: "El camino feliz es el que todos imaginan y casi nadie recorre. Las excepciones no son el caso raro: son la mitad del proceso."
tags: ["procesos", "process-mining", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "bpmn"
---

El *happy path* es la versión del proceso donde todo sale bien. El cliente manda los datos completos, la aprobación llega a la primera, el pago entra sin rebotar. Es el camino que dibujamos cuando explicamos cómo funciona algo, porque es el más fácil de contar. El problema es que, en muchos procesos, el camino feliz es minoría. La mayoría de los casos viajan por algún desvío. Y modelar esos desvíos —no ignorarlos— cambia por completo cómo se diseña y se automatiza.

## La regla incómoda: las excepciones son la regla

Cuando reconstruís un proceso real con [process mining](/hiperautomatizacion/bpmn/process-mining-rayos-x) y contás cuántos casos siguieron exactamente el camino feliz, el número suele asustar. No es raro que el happy path puro explique apenas el 20% de los casos. El otro 80% se reparte en decenas de variantes: faltó un dato, hubo que pedir una excepción, el caso volvió atrás, se escaló, se hizo a mano por fuera del sistema.

Es una distribución de cola larga clásica, la misma que aparece en tantos fenómenos reales:

- Un puñado de variantes frecuentes cubre buena parte de los casos.
- Una cola larguísima de variantes raras, cada una con poquitos casos, suma en conjunto una porción gigante.
- Esa cola es justo lo que el diagrama dibujado ignora.

La trampa mental es tratar las excepciones como "lo raro". No lo son. En agregado, lo raro es lo normal.

## Por qué automatizar solo el happy path falla

Acá es donde muchos proyectos de automatización se estrellan. Alguien mira el camino feliz, dice "esto es simple, lo automatizo" y programa un [bot de RPA](/hiperautomatizacion/rpa/rpa-no-es-ia) para ese flujo. Funciona perfecto en la demo, donde el caso es ideal. En producción, el primer caso con un dato faltante rompe el bot, alguien tiene que intervenir a mano, y la automatización que iba a ahorrar trabajo ahora genera un caso huérfano que nadie sabe cómo retomar.

El happy path es el 20% más fácil de automatizar y el que menos importa, porque también es el que un humano resuelve más rápido. El valor está en las excepciones: son las que duelen, las que generan reproceso, las que esconden [los cuellos de botella que solo el dato revela](/hiperautomatizacion/bpmn/cuello-botella-invisible). Ignorarlas no las hace desaparecer; las empuja al humano que tiene que tapar el agujero.

## Modelar la realidad, no la fantasía

Esto no significa modelar las 200 variantes. Significa decidir, con datos, cuáles importan.

- Las variantes frecuentes: hay que diseñarlas explícitamente, no esconderlas.
- Las raras pero costosas: vale la pena entenderlas aunque sean pocas.
- Las raras y baratas: pueden ir a un buen [fallback humano](/hiperautomatizacion/idp/human-in-the-loop), sin pretender automatizarlas.

Esa clasificación es, en el fondo, una decisión de negocio informada por el dato. Es la diferencia entre automatizar un dibujo y automatizar un proceso, y es exactamente lo que ordenan [los seis pilares de la hiperautomatización](/hiperautomatizacion/bpmn/seis-pilares-hiperautomatizacion): medir el proceso real, entender su distribución y recién entonces decidir qué se automatiza y qué se deja en manos de una persona.

Cuando alguien te muestre un proceso "simple" en línea recta, preguntá qué porcentaje de los casos sigue de verdad ese camino. Si la respuesta es "no sé" o "casi todos", desconfiá. El happy path es la historia que nos contamos. El trabajo real vive en los desvíos.
