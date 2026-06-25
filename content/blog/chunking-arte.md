---
title: "El arte de partir documentos: chunking que no rompe el sentido"
date: "2026-05-04"
excerpt: "Cortar un documento mal es como arrancar una página al medio: el RAG recupera la mitad de la idea y responde cualquier cosa."
tags: ["rag", "embeddings", "curiosidades"]
category: "ia-agentes"
subcategory: "rag-embeddings"
---

En un sistema de RAG hay una decisión que casi nadie ve y que define más que ninguna otra la calidad del resultado: **cómo cortás los documentos antes de indexarlos**. Se llama *chunking*, y suena tan aburrido que se subestima. Hasta que el sistema empieza a responder cosas a medias y nadie entiende por qué.

## Por qué no podés indexar el documento entero

Un embedding comprime un texto en un solo vector. Si ese texto es un PDF de cuarenta páginas, el vector resultante es un promedio borroso de cuarenta temas distintos: no representa bien a ninguno. Cuando después buscás algo puntual, ese mega-vector queda lejos de cualquier pregunta específica y no lo recuperás nunca.

Encima, está el límite físico: el fragmento recuperado tiene que entrar en la [ventana de contexto](/ia-agentes/llms-prompting/ventana-contexto) del LLM junto con la pregunta y el resto del prompt. Si el chunk es enorme, no hay lugar para nada más.

Por eso partimos. La pregunta es **dónde** cortar.

## El dilema del tamaño

Acá hay una tensión que no tiene solución perfecta:

- **Chunks chicos** (una o dos oraciones): muy precisos para recuperar, pero pierden contexto. El fragmento "Esto reduce el costo un 40%" no sirve de nada si el chunk anterior —el que decía *qué* reduce el costo— quedó separado.
- **Chunks grandes** (varias páginas): conservan el contexto, pero el embedding se vuelve borroso y la recuperación pierde puntería.

La salida pragmática suele ser tamaño medio **con solapamiento** (*overlap*): cada fragmento repite las últimas líneas del anterior, así ninguna idea queda partida justo en el corte.

```python
def chunk_con_overlap(texto, tam=500, solape=80):
    pasos = tam - solape
    return [texto[i:i + tam] for i in range(0, len(texto), pasos)]
```

## Cortar por estructura, no por caracteres

Partir cada 500 caracteres es la versión bruta. Lo que de verdad mueve la aguja es respetar la **estructura semántica** del documento: cortar por párrafos, por secciones, por encabezados. Una factura no se lee como un texto corrido, y un contrato tampoco; el sentido vive en los límites naturales del documento, no cada N letras.

La frontera ideal cae donde cambia el tema. Cortar a mitad de una idea es como arrancar una página justo por la oración clave: tenés el principio en un chunk y el final en otro, y el sistema recupera solo la mitad. Lo demás es geometría conocida —el fragmento se vuelve un vector y se compara por [similitud de coseno](/ia-agentes/rag-embeddings/similitud-coseno)— pero ese vector solo es bueno si el pedazo que comprime tiene sentido completo.

Un detalle que sorprende: los modelos no cuentan en palabras sino [en tokens](/ia-agentes/llms-prompting/tokens-no-palabras), así que cuando hablamos de "tamaño" de chunk conviene pensar en tokens, no en caracteres.

## El resumen

El chunking es el paso silencioso donde se gana o se pierde un RAG. No hay número mágico: depende del tipo de documento, del modelo de embeddings y de las preguntas que vas a hacer. Pero la regla de oro es una sola: **un buen chunk es una idea completa**. Si lo partís al medio, no importa cuán bueno sea el resto del [pipeline de recuperación](/ia-agentes/rag-embeddings/rag-apuntes-examen): le estás dando al modelo apuntes con la mitad de las hojas arrancadas.
