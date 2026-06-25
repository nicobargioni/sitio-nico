---
title: "Rey − hombre + mujer = reina: la aritmética de los embeddings"
date: "2026-05-07"
excerpt: "Sumar y restar palabras como si fueran vectores y caer parado en otra palabra. La geometría escondida del significado."
tags: ["rag", "embeddings", "curiosidades"]
category: "ia-agentes"
subcategory: "rag-embeddings"
---

> Tomá el vector de "rey", restale el de "hombre", sumale el de "mujer". El vector que queda apunta, casi exacto, a "reina".

La primera vez que lo viás parece magia. No lo es: es álgebra lineal sobre un mapa del lenguaje que un modelo aprendió mirando millones de oraciones. Esto se publicó en 2013 con word2vec, y sigue siendo la mejor intuición que tengo para explicar qué es un embedding.

## Qué es un embedding, en una frase

Un embedding es convertir cada palabra en una lista de números —un vector— de modo que palabras con significado parecido queden cerca en ese espacio. "Perro" y "gato" caen en el mismo barrio; "perro" y "termodinámica", en extremos opuestos de la ciudad.

Lo notable es que la posición no es arbitraria: ciertas **direcciones** del espacio codifican conceptos. Hay una dirección que es "género", otra que es "tiempo verbal", otra que es "capital de". Por eso la resta funciona:

```
v("rey") − v("hombre") + v("mujer") ≈ v("reina")
v("París") − v("Francia") + v("Italia") ≈ v("Roma")
```

No es que el modelo "entienda" la realeza. Es que aprendió, de cómo se usan las palabras, que el salto de hombre a mujer es geométricamente el mismo que el de rey a reina. La semántica se volvió aritmética.

## De dónde sale la dirección "género"

El modelo nunca vio una etiqueta que diga "esto es género". Lo dedujo de la **distribución**: las palabras que aparecen en contextos parecidos terminan cerca. "Rey" y "reina" comparten casi todos sus contextos (trono, corona, reino) salvo los que tocan el género. Esa diferencia residual y sistemática es lo que se acumula en una dirección consistente del espacio.

Es la misma idea que hace funcionar a la [aritmética que veremos en el coseno](/ia-agentes/rag-embeddings/similitud-coseno): lo que importa no es dónde está el vector en términos absolutos, sino **hacia dónde apunta**.

## La trampa que conviene tener en la cabeza

Tres advertencias para no comprar el truco entero:

- **No siempre cierra.** La analogía falla seguido fuera de los ejemplos de manual. "Médico − hombre + mujer" no siempre da "médica"; a veces da "enfermera". Eso no es un bug del álgebra: es el espejo de cómo se habla en los datos, y abre la puerta a los [sesgos que heredan los embeddings](/ia-agentes/rag-embeddings/sesgos-embeddings).
- **Los modelos modernos son contextuales.** Word2vec daba un vector fijo por palabra. Los embeddings de hoy (los que alimentan un [sistema RAG](/ia-agentes/rag-embeddings/rag-apuntes-examen)) generan un vector distinto según la oración: "banco" de plaza y "banco" de finanzas ya no comparten punto.
- **Las dimensiones no se leen.** Un embedding tiene cientos o miles de números. Ninguno dice "género" en una celda; el concepto vive repartido en una combinación de muchas, igual que una dirección en un mapa no vive en la latitud ni en la longitud por separado, sino en las dos juntas.

## Por qué me sigue importando

Cuando entendés que el significado se puede medir con vectores, todo lo demás encaja. Un buscador semántico, un sistema que recupera documentos relevantes, un agrupamiento de textos parecidos: todos se apoyan en esta misma idea geométrica. Es prima hermana de lo que pasa cuando [reducís dimensiones con PCA](/data-ml/clustering-pca/pca-sombra) para ver estructura en datos numéricos.

La aritmética de rey y reina es un truco de salón. Pero el truco te muestra el motor: el lenguaje, convertido en geometría, se vuelve algo que una máquina puede calcular.
