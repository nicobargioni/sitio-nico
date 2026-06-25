---
title: "Cuellos de botella invisibles que solo el dato revela"
date: "2026-03-25"
excerpt: "El paso que todos culpan rara vez es el lento. El verdadero cuello de botella es la espera entre tareas, y nadie la siente hasta medirla."
tags: ["procesos", "process-mining", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "bpmn"
---

Preguntale a un equipo dónde está el cuello de botella de su proceso y casi siempre te van a señalar el paso más visible: "el área legal tarda", "la aprobación del gerente es lenta". A veces tienen razón. Muchas veces no. El verdadero cuello de botella suele estar en un lugar que nadie mira, porque no es un paso: es el **espacio entre los pasos**. Y ese espacio no se siente, se mide.

## Tiempo de proceso vs tiempo de espera

La confusión empieza acá. Un caso que tarda cinco días no pasó cinco días siendo trabajado. Pasó —pongamos— cuatro horas de trabajo efectivo y el resto esperando: en una bandeja de entrada, en una cola, en un "después lo veo". Conviene separar dos cosas.

- **Tiempo de proceso**: lo que realmente se trabaja una tarea. Suele ser corto.
- **Tiempo de espera**: lo que el caso pasa quieto entre una tarea y la siguiente. Suele ser enorme.

En la mayoría de los procesos administrativos, el tiempo de espera es la abrumadora mayoría del total. El trabajo en sí es rápido; lo lento es todo lo que pasa cuando nadie lo está mirando. Y como nadie está mirando, nadie lo reporta.

## Por qué el ojo humano no lo ve

Una persona vive su propio paso. Sabe que cuando le llega un caso lo resuelve rápido, así que sinceramente cree que el proceso es ágil. Lo que no ve es que ese caso estuvo dos días en su cola antes de que lo abriera. Cada uno mide desde que toca la tarea, no desde que la tarea llegó. La suma de esas esperas individuales —invisibles para cada quien— es el verdadero costo del proceso.

Acá es donde [el process mining funciona como radiografía](/hiperautomatizacion/bpmn/process-mining-rayos-x): como cada evento tiene timestamp, podés calcular exactamente cuánto estuvo cada caso esperando entre dos actividades. El cálculo es brutalmente simple.

```
espera = inicio_actividad_siguiente − fin_actividad_anterior
```

Promediás esa espera por cada transición del proceso y aparece el mapa de calor. Casi siempre el rojo más intenso no está sobre ninguna tarea, sino sobre una flecha: un *handoff*, un traspaso entre áreas donde el caso cae en un limbo.

## El reproceso, el cuello de botella que se esconde dos veces

Hay un cuello de botella todavía más traicionero: el reproceso. Casos que vuelven atrás porque algo salió mal y hay que rehacerlo. En el diagrama dibujado eso no existe; en el real, es un loop. Esos loops inflan el tiempo total sin que figuren como "un paso lento", porque están repartidos en muchas vueltas. Forman parte de [el 80% del trabajo real que el happy path esconde](/hiperautomatizacion/bpmn/happy-path-mentira), y son carísimos justamente porque no se cuentan.

Encontrar estas esperas es lo que hace al dato accionable. No tiene sentido lanzar un [bot de RPA](/hiperautomatizacion/rpa/rpa-vs-api) a acelerar el paso que ya es rápido. La palanca está en el handoff lento, en la cola que se acumula, en el reproceso que nadie mide. Medir antes de actuar es, otra vez, el espíritu de [los seis pilares de la hiperautomatización](/hiperautomatizacion/bpmn/seis-pilares-hiperautomatizacion).

Suena contraintuitivo, pero es sólido: para acelerar un proceso casi nunca hay que hacer las tareas más rápido. Hay que eliminar las esperas entre ellas. Y a esas esperas no las vas a encontrar preguntando. Las vas a encontrar midiendo.
