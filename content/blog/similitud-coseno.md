---
title: "Por qué el coseno y no la distancia para comparar significados"
date: "2026-05-06"
excerpt: "Dos textos pueden estar lejos en línea recta y significar lo mismo. El ángulo entre ellos cuenta una historia que la distancia esconde."
tags: ["rag", "embeddings", "curiosidades"]
category: "ia-agentes"
subcategory: "rag-embeddings"
---

Cuando un buscador semántico decide que dos textos "se parecen", casi nunca mide la distancia entre ellos. Mide el **ángulo**. Y hay una razón geométrica buena para eso, no un capricho.

## El problema con la regla

Imaginá dos documentos representados como [vectores de embeddings](/ia-agentes/rag-embeddings/rey-reina-embeddings). Uno es un tuit corto sobre fútbol; el otro, un ensayo largo sobre el mismo partido. Hablan de lo mismo, pero el ensayo, al tener más palabras, suele producir un vector "más largo": de mayor magnitud.

Si comparás con **distancia euclídea** —la regla de toda la vida, el teorema de Pitágoras en muchas dimensiones— el ensayo te va a quedar lejos del tuit solo por ser más largo. La distancia castiga la magnitud, y la magnitud acá no nos interesa: nos interesa el **tema**, no la extensión.

## El coseno mira la dirección, no el tamaño

La similitud coseno resuelve esto mirando el ángulo entre los dos vectores e ignorando cuán largos son:

```
cos(θ) = (A · B) / (‖A‖ · ‖B‖)
```

El numerador es el producto punto; el denominador divide por las magnitudes de cada vector, normalizándolas. El resultado vive entre −1 y 1:

- **1** → apuntan en la misma dirección (mismo significado).
- **0** → perpendiculares (sin relación).
- **−1** → opuestos.

El tuit y el ensayo, aunque uno mida el doble que el otro, apuntan casi en la misma dirección. Coseno cercano a 1. La regla los habría separado; el ángulo los reúne. Es la misma intuición de [rey − hombre + mujer = reina](/ia-agentes/rag-embeddings/rey-reina-embeddings): lo que codifica el sentido es hacia dónde apunta el vector.

## Un detalle que casi nadie cuenta

Si normalizás todos tus vectores a longitud 1 —algo que muchas bases de datos vectoriales hacen por defecto— entonces ordenar por coseno y ordenar por distancia euclídea dan **exactamente el mismo ranking**. Dejan de ser rivales. En ese caso el coseno se vuelve la opción práctica solo porque el producto punto es barato de calcular a gran escala.

O sea: la pelea "coseno vs distancia" muchas veces ni existe. Lo que importa de verdad es **si normalizaste o no**. Cuando no normalizás, el coseno te protege del sesgo de longitud; cuando sí, elegís por velocidad.

## Por qué esto te toca de cerca

Cada vez que un [sistema RAG recupera los fragmentos relevantes](/ia-agentes/rag-embeddings/rag-apuntes-examen) para responderte, está rankeando por coseno. Cada vez que [partís un documento en chunks](/ia-agentes/rag-embeddings/chunking-arte), estás cambiando qué vectores van a competir por ese ángulo. Y la pesadilla de fondo —cuando tenés cientos de dimensiones— es que [todo tiende a quedar igual de lejos](/data-ml/clustering-pca/maldicion-dimensionalidad): la maldición de la dimensionalidad le aplasta el contraste a cualquier métrica, coseno incluido.

La moraleja es sencilla: antes de pelearte con qué métrica usar, preguntá si tus vectores están normalizados. La mitad de las discusiones se evaporan ahí.
