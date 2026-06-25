---
title: "Vertex AI: entrenar un modelo sin escribir el modelo"
date: "2026-03-18"
excerpt: "AutoML te entrena un modelo decente sin que escribas una sola línea de red neuronal. La pregunta es cuándo te conviene y cuándo te sale carísimo."
tags: ["gcp", "cloud", "curiosidades"]
category: "cloud"
subcategory: "gcp"
---

Hay algo medio incómodo en abrir un servicio de Google, subir un CSV, marcar la columna que querés predecir y darle a "entrenar". No escribís ni una capa de red, ni elegís optimizador, ni tocás un hiperparámetro. Y a veces el modelo que sale es mejor que el que vos habrías armado a mano en una tarde. Eso es **Vertex AI AutoML**, y vale la pena entender qué hace por dentro antes de enamorarse o de descartarlo.

## Qué hace AutoML cuando le das al botón

Lo que hace AutoML es **búsqueda de arquitectura y de hiperparámetros automatizada**, corriendo en paralelo sobre la infraestructura de Google. Mientras vos tomás un café, atrás está:

- Probando decenas de arquitecturas candidatas (para tabular suele combinar árboles tipo gradient boosting con redes).
- Haciendo búsqueda de hiperparámetros con algo más fino que grid search.
- Preprocesando features automáticamente: normaliza numéricas, codifica categóricas, detecta fechas.
- Validando con cross-validation para no auto-engañarse.

El truco es que paralelizar esa búsqueda sale plata. AutoML se cobra por **hora-nodo de entrenamiento**, y como tira muchos nodos en simultáneo, un dataset tabular mediano te puede costar un puñado de dólares en una corrida... o bastante más si lo dejás explorar de más. No es un costo loco, pero tampoco es gratis como te imaginás cuando ves "subí el CSV y listo".

## Cuándo conviene y cuándo no

Mi regla, después de varios proyectos:

- **Conviene** cuando el problema es estándar (clasificación tabular, detección de objetos, clasificación de texto), no tenés un equipo de ML dedicado, y el valor está en *tener algo bueno ya*, no en exprimir el último punto de accuracy.
- **Conviene** como *baseline serio*: corrés AutoML, sacás un número, y recién ahí decidís si vale la pena que un humano se siente a superarlo.
- **No conviene** cuando el problema es raro, necesitás control total de la arquitectura, o vas a inferir tantísimo que el costo por predicción manda. Ahí un modelo propio, más chico y afinado, te sale más barato a la larga.

Eso último engancha con una decisión más amplia que vale la pena pensar aparte: [Vertex AI vs montarlo vos, el cálculo real](/cloud/gcp/vertex-vs-diy). Managed te ahorra trabajo, pero te ata a un proveedor y a su tarifa.

## El detalle que casi nadie mira: dónde entrena

Cuando lanzás un job de AutoML, entrena en una **región** que vos elegís (o que el proyecto trae por default). Eso no es un detalle decorativo: la región define dónde vive tu dataset, qué tan cerca está del resto de tu stack y cuánto pagás por mover datos. Si tu data está en una región y entrenás en otra, sumás transferencia y latencia al pedo. Lo desarrollé acá: [por qué la región cambia la latencia y la factura](/cloud/gcp/region-importa).

Y si lo que querés es algo todavía más directo —entrenar sin salir de donde ya viven tus datos— BigQuery tiene su propia jugada: [entrenar modelos con SQL](/cloud/bigquery/bigquery-ml-sql). Para muchos casos tabulares, un `CREATE MODEL` te resuelve el 80% sin tocar Vertex.

## Quién pone el criterio

AutoML no te convierte en data scientist, igual que un GPS no te convierte en piloto de rally. Te da un resultado decente rápido y te quita excusas para no tener un baseline. Pero la decisión de *qué* predecir, *con qué datos* y *si el modelo sirve para el negocio* sigue siendo tuya. El botón entrena el modelo. El criterio lo ponés vos.
