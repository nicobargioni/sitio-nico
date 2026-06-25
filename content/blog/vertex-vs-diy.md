---
title: "Vertex AI vs montarlo vos: el cálculo real"
date: "2026-03-15"
excerpt: "El precio por hora de Vertex parece carísimo al lado de una VM cruda. Pero el costo de verdad incluye las horas tuyas, y ahí el cálculo se da vuelta."
tags: ["gcp", "cloud", "curiosidades"]
category: "cloud"
subcategory: "gcp"
---

Todo el que mira la factura de Vertex AI por primera vez piensa lo mismo: "esto lo monto yo en una VM y pago la décima parte". Y en el precio por hora de cómputo, tenés razón. El problema es que la nube no se paga solo en dólares de máquina: se paga en **horas de tu equipo**, en madrugadas resolviendo por qué CUDA no levanta, y en el costo de oportunidad de lo que no hiciste mientras peleabas con la infra. El cálculo real tiene más columnas de las que muestra la calculadora de precios.

## Lo que ves vs lo que pagás

El precio visible es solo la punta del iceberg. Cuando montás ML "a mano" en una VM, te hacés cargo de:

- **Provisionar y mantener** las máquinas, los drivers de GPU, las versiones de CUDA/cuDNN, los entornos de Python que siempre se rompen.
- **Servir el modelo:** un endpoint que escale, que tenga health checks, que no se caiga con tráfico.
- **Monitorear:** detectar cuando el modelo se degrada en producción, versionar modelos, logs.
- **Seguridad y updates:** parchear el SO, rotar credenciales, cerrar puertos.

Vertex te cobra más por hora porque **todo eso ya viene resuelto**. Estás pagando para no contratar (o no quemar) a un MLOps.

## El cálculo honesto, con un ejemplo

Pongamos un proyecto chico: entrenás un modelo una vez por semana y servís predicciones todo el día.

- **DIY:** una VM con GPU + un endpoint corriendo 24/7. El cómputo crudo es barato, digamos $300/mes. Pero sumale ~10-20 horas/mes de alguien manteniendo esto. A cualquier tarifa real de un ingeniero, esas horas valen *mucho* más que los $300.
- **Vertex:** pagás más por el cómputo gestionado, quizás $600/mes. Pero las horas de mantenimiento tienden a cero.

Para un proyecto chico o un equipo sin gente dedicada a infra, **Vertex gana** aunque la factura de GCP sea el doble. El recurso escaso no es la plata de nube: son las personas.

## Cuándo el cálculo se da vuelta

DIY empieza a tener sentido cuando:

- **Escala mucho:** a gran volumen, el sobreprecio por hora de lo gestionado se acumula hasta superar el costo de tener un equipo dedicado.
- **Necesitás control fino:** arquitecturas raras, optimizaciones de hardware específicas, kernels custom.
- **Ya tenés el equipo:** si tu gente de plataforma ya mantiene infra para otras cosas, el costo marginal de sumar ML baja.

Un punto intermedio elegante: para entrenamiento pesado, montar las máquinas vos *pero* en [Spot VMs interrumpibles](/cloud/gcp/maquinas-preemptibles) recorta el costo de cómputo al hueso. Y si lo tuyo es tabular, ni siquiera necesitás Vertex: [entrenás con SQL en BigQuery](/cloud/bigquery/bigquery-ml-sql) y te ahorrás la mitad de la discusión.

## El factor que nadie pone en la planilla

Hay un costo invisible en DIY: el **lock-in inverso del conocimiento**. Si la persona que montó esa VM artesanal se va, te quedás con una caja negra que nadie sabe mantener. Lo gestionado es aburrido y documentado; lo artesanal es brillante hasta que su autor renuncia. Es la misma lógica de [montar AutoML en vez de escribir el modelo](/cloud/gcp/vertex-sin-modelo): a veces lo mejor para el negocio es lo menos heroico.

## El cierre

"Lo monto yo más barato" suele ser cierto en la columna que mirás y falso en la que ignorás. Antes de elegir DIY, poné un número a tus horas y a las de tu equipo. Si después de eso sigue dando más barato y tenés quién lo sostenga, dale. Si dudás, lo gestionado casi siempre es la decisión adulta.
