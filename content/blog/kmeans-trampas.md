---
title: "Las trampas de K-Means: cuando los clusters que ves no existen"
date: "2026-06-10"
excerpt: "K-Means siempre te devuelve k grupos, haya estructura o no. El problema no es el algoritmo: son las asunciones que nadie te contó."
tags: ["clustering", "pca", "curiosidades"]
category: "data-ml"
subcategory: "clustering-pca"
---

> Le pedís a K-Means tres clusters sobre ruido puro —puntos uniformes sin ninguna estructura— y te devuelve tres clusters prolijos, con sus centroides y todo. El gráfico se ve convincente. Y es una mentira completa.

Ese es el problema de fondo de K-Means: **nunca te dice que no hay grupos**. Le pediste k, te da k. Lo que viene después es responsabilidad tuya.

## Lo que K-Means asume sin avisar

El algoritmo es elegante en su simpleza: asigná cada punto al centroide más cercano, recalculá centroides, repetí. Pero esa receta esconde supuestos fuertes:

- **Clusters esféricos y del mismo tamaño**: minimiza la varianza dentro de cada grupo, así que prefiere blobs redondos. Dale dos lunas entrelazadas o un cluster alargado y los parte mal.
- **Densidades parecidas**: si un grupo es denso y otro disperso, el centroide del disperso se "come" puntos del denso.
- **Distancia euclídea con sentido**: cuando trabajás en muchas dimensiones, esa distancia [deja de discriminar](/data-ml/clustering-pca/maldicion-dimensionalidad) y los clusters se vuelven arbitrarios.

Cuando tus datos violan estos supuestos —y los datos reales casi siempre los violan— K-Means igual corre sin quejarse. Esa es la trampa.

## El azar de la inicialización

Hay otra trampa, más silenciosa: K-Means converge a un **mínimo local**, no al óptimo global. La partición final depende de dónde caigan los centroides iniciales.

```python
from sklearn.cluster import KMeans
# corré esto dos veces sin fijar la semilla y compará labels_:
# pueden salir agrupamientos distintos sobre los MISMOS datos
km = KMeans(n_clusters=3, n_init=10).fit(X)
```

Ese `n_init=10` significa "probá 10 inicializaciones distintas y quedate con la mejor". Si lo dejás en 1, estás jugando a la ruleta. La variante `k-means++` reparte mejor los centroides iniciales y reduce el problema, pero no lo elimina.

## Cómo no caer

La defensa no es abandonar K-Means —sigue siendo rápido y útil— sino tratarlo con sano escepticismo, igual que uno [no se cree un p-valor sin entender qué dice](/data-ml/estadistica/p-valor-malentendido):

- **¿Hay clusters de verdad?** Antes de elegir k, preguntate si existe estructura. El estadístico de Hopkins mide tendencia al agrupamiento; si tus datos parecen uniformes, ningún k te va a salvar.
- **Validá el k, no lo inventes**: usá [codo y silueta, y entendé cuándo discrepan](/data-ml/clustering-pca/codo-vs-silueta) en vez de fijar k=3 por costumbre.
- **Mirá los datos primero**: un buen [EDA visual](/data-ml/eda/datasaurio-docena) revela formas que el algoritmo va a maltratar. Doce datasets con la misma estadística pueden esconder un dinosaurio; tus clusters también pueden esconder formas raras.
- **Probá alternativas cuando la forma no es esférica**: DBSCAN encuentra grupos de densidad arbitraria y marca ruido como ruido; el clustering jerárquico no te obliga a comprometerte con un k de entrada.
- **Estandarizá las features**: K-Means es sensible a la escala. Una variable en miles domina a una variable entre 0 y 1. Si no normalizás, estás clusterizando por unidades de medida.

La pregunta honesta no es "¿cuántos clusters hay?" sino "¿hay clusters?". K-Means responde la primera aunque la respuesta a la segunda sea no. Esa distinción separa un análisis serio de un gráfico bonito que no significa nada.
