---
title: "Los sesgos escondidos en los embeddings"
date: "2026-05-03"
excerpt: "Si entrenás un modelo con todo internet, aprende también nuestros prejuicios. Y los guarda en la geometría de los vectores."
tags: ["rag", "embeddings", "curiosidades"]
category: "ia-agentes"
subcategory: "rag-embeddings"
---

Los embeddings tienen una propiedad casi mágica: capturan el significado de las palabras como coordenadas en el espacio. Es lo que permite la famosa [aritmética rey − hombre + mujer = reina](/ia-agentes/rag-embeddings/rey-reina-embeddings). Pero esa misma propiedad esconde un costado incómodo. Si entrenás un modelo con todo el texto que escribió la humanidad, aprende también lo que la humanidad **piensa de más**: nuestros prejuicios, intactos, guardados en la geometría.

## El experimento que lo dejó en evidencia

En 2016 un grupo de investigadores hizo el ejercicio obvio y el resultado fue feo. Tomaron embeddings entrenados con noticias de Google y probaron la misma aritmética de analogías:

> hombre − mujer ≈ programador − ama de casa

El modelo no opinaba nada. Simplemente reflejaba que, en los textos con los que se entrenó, "programador" aparecía cerca de contextos masculinos y "ama de casa" de contextos femeninos. La estadística del lenguaje quedó tallada en los vectores. Aparecieron también asociaciones raciales igual de incómodas.

No es que el modelo sea machista o racista. Es **un espejo**, y el espejo refleja lo que le pusiste enfrente.

## Por qué pasa y por qué importa

El mecanismo es simple y por eso es difícil de arreglar. Un embedding se construye con una idea sola: *las palabras que aparecen en contextos parecidos terminan cerca en el espacio*. Si en millones de textos "enfermera" convive con pronombres femeninos y "ingeniero" con masculinos, esa correlación se vuelve distancia geométrica. El modelo no distingue entre un patrón estadístico inocente y un prejuicio social: para él, todo es co-ocurrencia.

El problema deja de ser académico cuando esos vectores manejan decisiones reales:

- Un sistema de RAG que recupera información puede priorizar fuentes sesgadas porque están "más cerca" de la consulta.
- Un filtro automático de currículums puede penalizar nombres o términos asociados a un género o a un origen.
- Un buscador puede reforzar el estereotipo en vez de cuestionarlo, porque su trabajo es justamente devolver lo "parecido".

Y todo medido con la misma [similitud de coseno](/ia-agentes/rag-embeddings/similitud-coseno) que usamos para lo legítimo: la herramienta es neutral, el contenido que comprime no lo es.

## ¿Se puede corregir?

Hay técnicas para "desviar" (*debiasing*) los embeddings: identificar la dirección del sesgo en el espacio vectorial y neutralizarla. Funcionan en parte, pero arrastran dos problemas. Primero, suelen **esconder** el sesgo más que eliminarlo —el modelo lo sigue usando de forma indirecta—. Segundo, definir qué es un prejuicio a borrar y qué es una diferencia legítima es una decisión humana, no matemática.

Conviene además no confundir esto con otra fuente de error. Que un embedding esté sesgado no es lo mismo que un LLM [alucine un dato](/ia-agentes/llms-prompting/por-que-alucinan): la alucinación inventa, el sesgo reproduce algo que sí estaba en los datos, solo que no debería pesar en la decisión.

## El resumen

Los embeddings son una de las ideas más potentes de la IA moderna, y los sesgos no son un bug del algoritmo: son un fiel reflejo de los datos. La lección no es desconfiar de la herramienta, sino entender que **un modelo no nace neutral, lo hereda todo del texto con que lo criamos**. Auditar de dónde vienen esos datos no es un trámite ético opcional: es parte de hacer las cosas bien.
