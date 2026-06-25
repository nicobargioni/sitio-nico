---
title: "PCA explicado sin álgebra: la sombra que conserva más información"
date: "2026-06-09"
excerpt: "PCA es elegir desde dónde iluminar un objeto para que su sombra revele lo máximo posible. Esa es toda la intuición, sin autovectores."
tags: ["clustering", "pca", "curiosidades"]
category: "data-ml"
subcategory: "clustering-pca"
---

> Agarrá una taza con asa y proyectá su sombra en la pared. Si la iluminás de frente, la sombra es un círculo: perdés el asa. Si la girás un poco, la sombra muestra el contorno y el asa. Elegiste un ángulo que conserva más información. PCA hace exactamente eso, pero con datos de muchas dimensiones.

Casi siempre se explica con autovectores y matrices de covarianza. Acá no hace falta. La idea es puramente geométrica y, una vez que la ves, no se olvida.

## Proyectar es perder lo menos posible

Reducir dimensiones es achatar: pasar de 3D a 2D, de 100D a 10D. Toda proyección pierde algo —es una sombra, no el objeto. La pregunta es **qué ángulo elegir para perder lo menos importante**.

PCA define "lo importante" como **varianza**: la dirección en la que los datos están más estirados. Si una nube de puntos forma un cigarro alargado, la dirección a lo largo del cigarro es donde pasan más cosas; achatarlo de costado mantiene casi toda la información, achatarlo a lo largo la destruye.

Entonces PCA busca, una por una:

1. La dirección de **máxima varianza** → primera componente principal.
2. La de máxima varianza **perpendicular** a la anterior → segunda componente.
3. Y así sucesivamente, siempre en ángulo recto con las anteriores.

Cada componente es un eje nuevo. Te quedás con los primeros —los que más varianza capturan— y tirás el resto. Eso es toda la magia.

## Varianza no es lo mismo que importancia

Acá viene la trampa que conviene tener presente. PCA asume que **dirección de mayor varianza = dirección más informativa**. Suele ser cierto, pero no siempre.

- Si tu señal útil está en una dirección de **poca** varianza, PCA la descarta. La varianza grande puede ser puro ruido de medición.
- PCA es sensible a la **escala**: una variable en pesos (miles) domina a una en proporciones (0 a 1). Por eso casi siempre se estandariza antes; si no, estás midiendo unidades, no estructura.
- Las componentes son **combinaciones lineales** de todas las features, así que se vuelven difíciles de interpretar. "Componente 1" no tiene un nombre humano.

El `scree plot` —la varianza explicada por componente— te dice cuántas guardar. Buscás el codo, la misma lógica del [codo para elegir k en clustering](/data-ml/clustering-pca/codo-vs-silueta).

## Para qué lo uso de verdad

PCA gana cuando combinás reducción con otro objetivo:

- **Antes de clusterizar**: comprimir a pocas componentes esquiva la [maldición de la dimensionalidad](/data-ml/clustering-pca/maldicion-dimensionalidad) y hace que las distancias vuelvan a tener sentido, lo que ayuda a que [K-Means no invente grupos falsos](/data-ml/clustering-pca/kmeans-trampas).
- **Para visualizar**: proyectar a 2 o 3 componentes da un mapa honesto y lineal. A diferencia de [t-SNE y UMAP, que deforman distancias](/data-ml/clustering-pca/tsne-umap-mienten), en PCA un eje significa algo concreto.
- **Para sacar correlación**: las componentes son ortogonales, así que eliminás redundancia entre variables muy correlacionadas —el tipo de relación tramposa que conviene detectar en un [EDA cuidadoso](/data-ml/eda/correlacion-espuria).

Una advertencia para cerrar: PCA es **lineal**. Si la estructura de tus datos vive en una curva o una superficie enroscada, ninguna sombra plana la va a capturar bien. Ahí entran los métodos no lineales. Pero para empezar, para entender qué hay, para limpiar antes de modelar, la sombra que maximiza varianza sigue siendo la primera herramienta que saco de la caja.
