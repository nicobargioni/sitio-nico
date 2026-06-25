---
title: "La maldición de la dimensionalidad: por qué en muchas dimensiones todo está lejos"
date: "2026-06-11"
excerpt: "En espacios de muchas dimensiones las distancias se aplastan: todo queda igual de lejos. Y eso rompe kNN, clustering y tu intuición."
tags: ["clustering", "pca", "curiosidades"]
category: "data-ml"
subcategory: "clustering-pca"
---

> Tomá mil puntos al azar en un cuadrado. Ahora hacé lo mismo en un hipercubo de 500 dimensiones. En el primer caso hay vecinos cercanos y puntos lejanos. En el segundo, casi todos los puntos están a la misma distancia entre sí. La noción de "cerca" se evapora.

Eso es la maldición de la dimensionalidad, y es una de las razones por las que algoritmos que funcionan perfecto en un ejemplo de juguete se derrumban con datos reales de cientos de features.

## Las distancias se aplastan

Hay un resultado que cuando lo vi por primera vez me costó creer. Tomás `n` puntos uniformes en un cubo de `d` dimensiones y medís, para cada punto, la distancia a su vecino más cercano y a su vecino más lejano. A medida que `d` crece, esas dos distancias **se acercan entre sí**. La diferencia relativa tiende a cero:

```
(dist_max − dist_min) / dist_min → 0   cuando d → ∞
```

Dicho de otro modo: en alta dimensión el más cercano y el más lejano están casi a la misma distancia. Y si todo está igual de lejos, preguntar "¿cuál es el vecino más cercano?" deja de tener sentido.

La intuición geométrica ayuda: en muchas dimensiones, el volumen de una esfera se concentra casi todo en una cáscara fina cerca de la superficie. El centro queda vacío. Los puntos "viven" lejos unos de otros, repartidos en una corteza delgadísima.

## Por qué rompe kNN y clustering

Casi todo lo que hacemos en aprendizaje no supervisado descansa sobre una idea simple: **objetos parecidos están cerca**. La maldición ataca justo ahí.

- **kNN**: si todos los puntos están casi equidistantes, "los k más cercanos" es prácticamente una selección al azar. El clasificador pierde poder.
- **K-Means**: minimiza distancias a centroides, pero si las distancias dejan de discriminar, los clusters se vuelven arbitrarios. Es uno de los motivos por los que [K-Means te devuelve grupos aunque no haya estructura](/data-ml/clustering-pca/kmeans-trampas).
- **Detección de outliers por distancia**: si todo está lejos, nada parece anómalo.

Y hay un costo silencioso: la cantidad de datos que necesitás para "cubrir" el espacio crece exponencialmente con `d`. Diez puntos alcanzan en una recta; en 10 dimensiones esos mismos diez puntos no cubren prácticamente nada.

## Qué hacer en la práctica

La maldición no es una sentencia. La salida casi siempre es **reducir dimensiones de verdad**, no rezar para que el algoritmo aguante:

- **Reducir antes de clusterizar**: proyectá a un puñado de componentes con [PCA, esa sombra que conserva la varianza](/data-ml/clustering-pca/pca-sombra), y recién ahí medí distancias.
- **Feature selection honesto**: muchas features son ruido. Sacarlas mejora la señal, no solo el cómputo. Conviene mirarlas primero en un [EDA serio](/data-ml/eda/anscombe-cuarteto), porque dos variables pueden tener números idénticos y comportarse al revés.
- **Métricas alternativas**: en texto y embeddings, la distancia euclídea sufre más que el coseno; por eso buena parte del mundo de embeddings mide ángulos en vez de distancias.
- **Manifold aprendido**: a veces los datos viven en una superficie de baja dimensión metida dentro del espacio gigante. Métodos como UMAP intentan recuperarla, aunque después [esos mapas hay que leerlos con cuidado](/data-ml/clustering-pca/tsne-umap-mienten).

El error más común no es técnico, es de actitud: confiar en que tu intuición 2D escala a 500D. No escala. En alta dimensión el sentido común geométrico miente, y conviene desconfiar exactamente como uno [desconfía de un resultado que parece demasiado limpio](/data-ml/estadistica/p-valor-malentendido).

La regla práctica que uso: si tengo muchas más columnas que la raíz cuadrada de mis filas, asumo que la maldición ya está operando y reduzco antes de hacer cualquier otra cosa.
