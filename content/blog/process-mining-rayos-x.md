---
title: "Process mining: la radiografía de cómo trabaja tu empresa"
date: "2026-03-28"
excerpt: "Tus sistemas ya guardan, sin que nadie lo pida, la huella de cada paso. El process mining la revela y dibuja el proceso real."
tags: ["procesos", "process-mining", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "bpmn"
---

Si le preguntás a cinco personas cómo funciona el proceso de aprobación de una factura, vas a obtener cinco respuestas distintas. Cada una describe el pedazo que toca. Nadie ve el todo. Pero hay algo que sí lo vio entero, paso por paso, sin opinión ni memoria selectiva: los sistemas. Cada vez que alguien crea una orden, la edita, la aprueba o la rechaza, queda una marca con fecha y hora. El process mining es la técnica que toma esas marcas y reconstruye, como una radiografía, cómo trabaja de verdad tu empresa.

## El dato ya está, solo hay que leerlo

La materia prima se llama **event log**: una tabla donde cada fila es un evento. Con tres columnas alcanza para empezar.

- **Case ID**: a qué caso pertenece el evento (la factura 4471, el ticket 9920).
- **Activity**: qué pasó ("crear orden", "aprobar", "rechazar").
- **Timestamp**: cuándo pasó.

```
case_id | activity        | timestamp
4471    | crear orden     | 2026-03-01 09:12
4471    | revisar         | 2026-03-01 14:40
4471    | aprobar         | 2026-03-03 10:05
```

Ordenás los eventos de cada caso por tiempo y obtenés su *traza*: la secuencia real de pasos que vivió ese caso. Junten miles de trazas y un algoritmo las superpone para dibujar el mapa completo, con sus caminos frecuentes y sus desvíos raros. Nadie tuvo que sentarse a entrevistar a nadie. El proceso se descubre solo, desde la evidencia que ya estaba ahí.

## Por qué es una radiografía y no una foto retocada

Un diagrama hecho a mano muestra lo que el autor cree —o quiere creer— que pasa. El process mining muestra lo que pasó. Esa diferencia no es menor: casi siempre el mapa descubierto tiene caminos que nadie había dibujado. Loops donde un caso vuelve atrás tres veces, atajos que se saltan controles, ramas que solo aparecen los lunes. Es exactamente lo que cuento en [el proceso que dibujaste vs el que de verdad ocurre](/hiperautomatizacion/bpmn/proceso-real-vs-dibujado): la brecha entre el flowchart y la realidad suele ser enorme.

Y como cada evento trae su timestamp, no solo ves la forma del proceso: ves su tiempo. Cuánto tarda cada paso, cuánto se espera entre uno y otro, dónde se acumulan los casos. Ahí aparecen [los cuellos de botella invisibles que solo el dato revela](/hiperautomatizacion/bpmn/cuello-botella-invisible), esos que ningún manual menciona porque nadie los siente hasta medirlos.

## Para qué sirve antes de automatizar

Es tentador comprar un bot de [RPA](/hiperautomatizacion/rpa/rpa-no-es-ia) y largarlo a automatizar "el proceso". El problema es automatizar un proceso que no entendés: terminás replicando el desorden, más rápido. El process mining va antes. Te dice qué automatizar, dónde está el dolor real y qué variante conviene atacar primero.

Es, además, el primer pilar del enfoque que describo en [los seis pilares de la hiperautomatización](/hiperautomatizacion/bpmn/seis-pilares-hiperautomatizacion): no podés mejorar lo que no medís, y no podés medir un proceso si solo tenés la versión que alguien dibujó de memoria.

Una advertencia de rigor: el mapa es tan bueno como el log. Si los timestamps están mal, si hay actividades que no quedan registradas, si dos sistemas no comparten el case ID, la radiografía sale borrosa. Antes de sacar conclusiones, vale revisar la calidad del dato igual que revisarías cualquier dataset.

La idea de fondo es simple y un poco incómoda: tu empresa ya estuvo grabando todo este tiempo. El process mining solo aprieta play.
