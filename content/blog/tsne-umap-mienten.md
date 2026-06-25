---
title: "t-SNE y UMAP: mapas hermosos que a veces mienten"
date: "2026-06-07"
excerpt: "Esos gráficos con islas de colores son irresistibles. Pero el tamaño de las islas y la distancia entre ellas casi nunca significan lo que parece."
tags: ["clustering", "pca", "curiosidades"]
category: "data-ml"
subcategory: "clustering-pca"
---

> Hay pocos gráficos tan satisfactorios como un t-SNE: islas de colores nítidas, grupos separados, todo ordenado. El problema es que la mitad de lo que tu ojo lee en ese mapa —los tamaños, las distancias entre islas, los huecos— no quiere decir lo que creés.

t-SNE y UMAP son herramientas de reducción no lineal pensadas para **visualizar** datos de muchas dimensiones en 2D. Hacen cosas que [PCA, al ser lineal, no puede hacer](/data-ml/clustering-pca/pca-sombra). Pero esa potencia viene con letra chica que casi nadie lee.

## Qué preservan y qué tiran

La diferencia con PCA es de filosofía. PCA conserva la **estructura global**: distancias grandes siguen siendo grandes. t-SNE y UMAP priorizan la **estructura local**: se obsesionan con mantener juntos a los vecinos cercanos de cada punto, y a cambio sacrifican las relaciones a gran escala.

Consecuencias concretas, todas contraintuitivas:

- **El tamaño de los clusters no significa nada.** t-SNE expande las regiones densas y comprime las dispersas. Una isla grande no es un grupo grande; puede ser un grupo chico y compacto que el algoritmo infló.
- **La distancia entre clusters no es confiable.** Dos islas pegadas no están necesariamente más relacionadas que dos lejanas. La separación entre grupos es en buena medida arbitraria.
- **Los huecos vacíos pueden ser ruido.** El espacio entre islas no mide nada interpretable.

## El parámetro que cambia todo

t-SNE tiene un parámetro llamado **perplexity** (groseramente, cuántos vecinos considera cercanos). UMAP tiene `n_neighbors` y `min_dist`. Y acá está lo incómodo: **el mismo dataset produce mapas radicalmente distintos según cómo los ajustes**.

Con perplexity baja, t-SNE ve micro-clusters por todos lados, algunos completamente espurios. Con perplexity alta, los fusiona. No hay un valor "correcto" universal. Es fácil, jugando con el parámetro, llegar a la figura que confirma la hipótesis que ya tenías —exactamente el sesgo contra el que conviene [tratar a un p-valor con desconfianza](/data-ml/estadistica/p-valor-malentendido).

Hay un detalle más, casi un chiste cruel: t-SNE corrido sobre **ruido puro**, con la perplexity adecuada, produce estructuras que parecen clusters reales. El mismo riesgo de [K-Means inventando grupos donde no hay](/data-ml/clustering-pca/kmeans-trampas), pero envuelto en un gráfico mucho más seductor.

## Cómo usarlos sin que te engañen

No los descarto —para explorar datos de alta dimensión son geniales. Pero los trato como un boceto, no como una prueba:

- **Usalos para generar hipótesis, nunca para confirmarlas.** "Parece haber tres grupos" es un punto de partida; verificalo con clustering de verdad sobre los datos originales y con [codo y silueta](/data-ml/clustering-pca/codo-vs-silueta).
- **Probá varios parámetros.** Si tus "clusters" desaparecen al cambiar la perplexity, no eran clusters.
- **Pasá PCA antes.** Reducir primero a unas decenas de componentes mitiga la [maldición de la dimensionalidad](/data-ml/clustering-pca/maldicion-dimensionalidad) y estabiliza el resultado.
- **No midas con la regla sobre el gráfico.** Tamaños y distancias no son cuantitativos. Si querés afirmar que dos grupos son parecidos, mostralo en el espacio original.
- **UMAP preserva algo más de estructura global que t-SNE**, pero "algo más" no es "fielmente". Misma cautela.

El cuarteto de Anscombe ya nos enseñó que [un mismo número puede esconder gráficos opuestos](/data-ml/eda/anscombe-cuarteto). t-SNE y UMAP completan la lección por el otro lado: un mismo dato puede producir gráficos opuestos. La imagen es una herramienta para pensar, no la conclusión. Cuando un mapa de embeddings es demasiado lindo para ser verdad, probablemente lo sea.
