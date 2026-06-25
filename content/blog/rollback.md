---
title: "El arte del rollback: deshacer un deploy en un click"
date: "2026-02-19"
excerpt: "Poder volver atrás un deploy en segundos vale más que no fallar nunca. Por qué el rollback es la red de seguridad que cambia todo."
tags: ["cicd", "devops", "curiosidades"]
category: "cloud"
subcategory: "cicd"
---

Hay una intuición muy difundida y muy equivocada: que un equipo maduro es el que no falla. La verdad incómoda es otra. Los mejores equipos fallan parecido a todos; lo que los distingue es que **pueden deshacer un error en segundos**. El rollback —volver a la versión anterior con un click— es esa superpotencia, y vale más que cualquier promesa de perfección.

## Fallar es inevitable, recuperarse es opcional

Por más tests que tengas, producción siempre guarda sorpresas: un dato raro, un pico de tráfico, una integración externa que cambió sin avisar. La pregunta no es *si* vas a desplegar algo roto, sino *cuánto tarda en estar sano de nuevo* cuando pase.

La industria mide esto con dos números:

- **MTBF** (tiempo medio entre fallas): cada cuánto se rompe algo.
- **MTTR** (tiempo medio de recuperación): cuánto tardás en volver a la normalidad.

Durante años se obsesionaron con subir el MTBF —fallar menos—. Los equipos que despliegan decenas de veces por día invirtieron la apuesta: aceptan que van a fallar más seguido, pero hacen que el MTTR sea de minutos. Si recuperarte cuesta un click, fallar deja de dar miedo.

> No optimices por no caerte. Optimizá por levantarte rápido.

## Qué hace falta para volver en un click

Un rollback instantáneo no se improvisa. Necesita que cada versión que desplegaste siga existiendo, lista para volver a activarse:

- **Artefactos inmutables.** No reconstruís la versión vieja: la guardaste tal cual la desplegaste. Acá es donde las [imágenes de Docker](/cloud/docker/funciona-en-mi-maquina) brillan: la `v1.4` es un objeto fijo, idéntico al que andaba ayer.
- **Versionado de revisiones.** La plataforma guarda cada despliegue como una revisión con nombre. Volver es apuntar el tráfico a la revisión anterior.
- **Cambios de base compatibles.** El talón de Aquiles: si la versión nueva migró la base de forma irreversible, el código viejo ya no encaja. Por eso las migraciones se hacen aditivas y reversibles.

```bash
# En Cloud Run, volver atrás es redirigir el tráfico a la revisión previa
gcloud run services update-traffic mi-api \
  --to-revisions mi-api-00041-abc=100
# La v1.5 sigue existiendo; simplemente deja de recibir requests
```

Si esto te suena a [deploy blue-green](/cloud/cicd/blue-green), es porque son la misma familia: ambos se apoyan en mantener viva la versión anterior para que volver sea trivial.

## El cambio cultural

Un buen rollback no es solo una herramienta técnica: cambia cómo trabaja el equipo. Cuando deshacer cuesta segundos, la gente se anima a desplegar más seguido, en cambios chicos, porque el riesgo de cada uno es bajo y acotado. Y desplegar chico y seguido es, paradójicamente, lo que *menos* rompe.

Es el mismo motivo por el que [romper el build se trata como emergencia](/cloud/cicd/pipeline-rojo): la prioridad no es castigar el error, es volver a verde cuanto antes. Primero revertís y dejás todo sano; recién después, sin presión y sin usuarios afectados, investigás qué pasó.

## El botón de eyección

Construir software no es evitar que se caiga el avión: es tener siempre el botón de eyección a mano. El rollback es ese botón. Un equipo que puede volver atrás en un click duerme tranquilo, despliega seguido y aprende rápido. Uno que no, vive rezándole a cada deploy. Elegí la red de seguridad antes que la promesa de no caerte.
