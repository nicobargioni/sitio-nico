---
title: "BQML: entrenar modelos de machine learning con SQL"
date: "2026-03-05"
excerpt: "BigQuery ML te deja entrenar una regresión o un clustering con un CREATE MODEL, sin sacar los datos del warehouse ni escribir Python."
tags: ["bigquery", "datos", "curiosidades"]
category: "cloud"
subcategory: "bigquery"
---

La primera vez que ves un modelo de machine learning entrenado con una sentencia `CREATE MODEL`, en SQL plano, cuesta creerlo. No hay Python, no hay notebook, no hay que exportar nada. Entrenás donde viven los datos. Eso es BigQuery ML (BQML), y aunque no reemplaza a un data scientist, cambia quién puede llegar a un primer modelo.

## El problema que resuelve: mover los datos

El flujo clásico de ML tiene un paso silencioso y caro: sacar los datos del warehouse, bajarlos a una máquina, entrenar ahí, y volver a subir las predicciones. Con tablas de millones de filas, ese ida y vuelta es lento, costoso y propenso a romperse.

BQML invierte la idea: en vez de llevar los datos al modelo, lleva el modelo a los datos. Entrenás dentro de BigQuery, usando el mismo motor de [escaneo masivo paralelo](/cloud/bigquery/columnar-terabytes) que usás para consultar. El que ya escribe SQL para analizar, ahora entrena con la misma sintaxis.

```sql
CREATE MODEL proyecto.dataset.churn
OPTIONS(model_type = 'logistic_reg',
        input_label_cols = ['se_fue']) AS
SELECT antiguedad, gasto_mensual, tickets_soporte, se_fue
FROM clientes;

-- Y predecir es otra query:
SELECT * FROM ML.PREDICT(
  MODEL proyecto.dataset.churn,
  (SELECT * FROM clientes_nuevos));
```

Ese `CREATE MODEL` corre la regresión logística sobre la tabla entera, en el cluster, sin que muevas un byte hacia afuera.

## Qué sabe hacer (y qué no)

BQML cubre un abanico sorprendente sin pedirte que programes el algoritmo:

- **Regresión y clasificación**: lineal, logística, boosted trees, hasta redes neuronales.
- **Clustering** con k-means, para segmentar clientes sin etiquetas previas —el mismo k-means con [sus trampas conocidas](/data-ml/clustering-pca/kmeans-trampas).
- **Series de tiempo** con ARIMA para forecasting de demanda o ventas.
- **Importar modelos** entrenados afuera (TensorFlow) para servir predicciones desde SQL.

Lo que **no** es: un reemplazo del control fino. No vas a hacer ingeniería de features sofisticada, ni a iterar arquitecturas raras, ni a esquivar los problemas de fondo del ML. Si tus datos tienen [fuga de información](/data-ml/eda/valores-faltantes-gritan) o un desbalance brutal, BQML te va a dar un modelo malo igual de rápido que uno bueno. La facilidad de entrenar no te exime del criterio.

## Para qué sirve de verdad

El valor real de BQML no es ganar un concurso de Kaggle. Es el **prototipado veloz** y la **democratización**: un analista que vive en SQL puede tener un baseline de churn o un forecast en una tarde, sin esperar a que se libere un data scientist. Si el baseline promete, después se hace bien en serio.

Es la misma filosofía de [Vertex AI](/cloud/gcp/vertex-sin-modelo) llevada al warehouse: bajar la barrera de entrada al modelado. Y encaja con la pregunta de fondo de [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma) —un modelo simple, entrenado en minutos sobre datos que ya tenés, suele aportar más valor que uno sofisticado que nunca sale del notebook.

El cómputo de entrenar, claro, no es gratis: consume [slots](/cloud/bigquery/slots-moneda) como cualquier query pesada. Pero a cambio te ahorrás el viaje de los datos, que muchas veces es la parte más cara de todas.
