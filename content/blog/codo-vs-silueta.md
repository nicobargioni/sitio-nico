---
title: "Codo vs silueta: cómo elegir k sin engañarte"
date: "2026-06-08"
excerpt: "Dos métodos clásicos para decidir cuántos clusters usar. A veces coinciden, a veces no — y entender por qué discrepan es la mitad del trabajo."
tags: ["clustering", "pca", "curiosidades"]
category: "data-ml"
subcategory: "clustering-pca"
---

> Le preguntás al codo cuántos clusters hay y te dice "cuatro". Le preguntás a la silueta y te dice "dos". Ninguno mintió: están midiendo cosas distintas. El error es creer que cualquiera de los dos te da *la* respuesta.

Elegir k es la decisión más incómoda del clustering, porque [K-Means siempre devuelve los grupos que le pidas](/data-ml/clustering-pca/kmeans-trampas), tengan sentido o no. El codo y la silueta son dos linternas para mirar antes de comprometerte.

## El método del codo

La idea: graficás la **inercia** (la suma de distancias al cuadrado de cada punto a su centroide) contra distintos valores de k. La inercia siempre baja al subir k —con suficientes clusters cada punto es su propio grupo y la inercia es cero. No buscás el mínimo, buscás el **punto de quiebre**: el k donde agregar otro cluster ya casi no mejora nada.

```
inercia
  │ \
  │  \
  │   \___       ← acá, el "codo"
  │       \____
  └─────────────── k
    1  2  3  4  5
```

El problema es honesto: muchas veces **no hay codo claro**. La curva baja suave y vos terminás eligiendo a ojo el punto que confirma lo que ya querías ver. Es subjetivo, y por eso es peligroso. Es el mismo riesgo de [leer un p-valor como te conviene](/data-ml/estadistica/p-valor-malentendido).

## El coeficiente de silueta

La silueta es más exigente y da un número, no un dibujo a interpretar. Para cada punto compara:

- **a** = qué tan cerca está de los puntos de su propio cluster.
- **b** = qué tan cerca está del cluster vecino más cercano.

```
silueta = (b − a) / max(a, b)     → va de −1 a +1
```

Cerca de +1, el punto está cómodo en su grupo y lejos del resto. Cerca de 0, está en la frontera. Negativo, probablemente está en el cluster equivocado. Promediás sobre todos los puntos y elegís el k con mayor silueta media. Tiene la ventaja de que evalúa **separación y cohesión a la vez**, no solo compacidad.

## Cuándo discrepan (y a quién creerle)

Ahí está la diferencia de fondo. El codo solo mira cohesión interna; la silueta también mira separación entre grupos. Por eso:

- Si los clusters son compactos pero **están pegados**, el codo puede sugerir muchos grupos y la silueta pocos: ve que no están bien separados.
- Si hay un grupo grande y disperso, el codo lo penaliza (mucha inercia) mientras la silueta puede tolerarlo.
- Ninguno de los dos sirve si las distancias ya no discriminan por la [maldición de la dimensionalidad](/data-ml/clustering-pca/maldicion-dimensionalidad): conviene [reducir con PCA primero](/data-ml/clustering-pca/pca-sombra) y recién después medir.

Mi regla de trabajo:

1. Estandarizá las features. Sin esto, ambos métodos miden unidades, no estructura.
2. Corré los dos para un rango de k razonable.
3. Cuando coinciden, buena señal.
4. Cuando discrepan, **no promedies**: andá a los datos. Graficá ambas opciones y mirá. Un buen [análisis visual](/data-ml/eda/datasaurio-docena) suele resolver el empate que ninguna métrica resuelve sola.

Y la advertencia de fondo: ni el codo ni la silueta te dicen si **existen** clusters. Sobre ruido puro los dos te van a sugerir un k. La pregunta previa —"¿hay estructura?"— sigue siendo tuya. El codo y la silueta solo ayudan a contar grupos cuando ya sabés que hay algo que contar.
