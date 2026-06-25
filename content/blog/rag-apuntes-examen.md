---
title: "RAG: darle a un LLM los apuntes antes del examen"
date: "2026-05-05"
excerpt: "Un LLM no sabe lo que pasó ayer ni lo que hay en tu wiki interna. RAG es dejarle abrir los apuntes justo antes de responder."
tags: ["rag", "embeddings", "curiosidades"]
category: "ia-agentes"
subcategory: "rag-embeddings"
---

Imaginate un examen a libro abierto. No tenés que recordar todo: te alcanza con saber *dónde* buscar y *qué* copiar. Eso es, casi literal, lo que hace **RAG** (retrieval-augmented generation) con un modelo de lenguaje. En vez de pedirle que conteste de memoria —con todo lo que eso implica— le ponemos los apuntes correctos sobre la mesa y recién ahí le dejamos escribir.

## El problema que RAG viene a resolver

Un LLM tiene dos límites incómodos. Primero, su conocimiento está **congelado** en la fecha en que se entrenó: no sabe qué pasó la semana pasada ni qué dice el manual interno de tu empresa. Segundo, cuando no sabe algo, muchas veces **lo inventa con total seguridad** en lugar de admitir el hueco.

Reentrenar el modelo cada vez que cambia un dato es carísimo y lento. RAG esquiva todo eso: deja el modelo quieto y le acerca el contexto en el momento de responder.

## Cómo funciona el truco

El flujo tiene tres pasos, y el del medio es el corazón de todo:

1. **Indexar.** Partís tus documentos en pedazos y convertís cada pedazo en un vector —un embedding— que captura su significado. Esos vectores van a una base de datos vectorial.
2. **Recuperar.** Cuando llega una pregunta, la convertís en un vector con el mismo modelo y buscás los pedazos más parecidos. "Parecido" acá no es coincidencia de palabras: es cercanía semántica, que se mide con [similitud de coseno](/ia-agentes/rag-embeddings/similitud-coseno) y no con distancia recta.
3. **Generar.** Le pasás al LLM la pregunta *más* los fragmentos recuperados, y le pedís que responda usándolos como fuente.

La magia está en que la búsqueda entiende significado, no texto literal. Preguntás por "vacaciones" y recupera el párrafo que habla de "días libres", porque ambos viven cerca en el espacio de embeddings. Esa misma geometría es la que permite la [aritmética de vectores tipo rey − hombre + mujer = reina](/ia-agentes/rag-embeddings/rey-reina-embeddings): el significado se volvió coordenadas.

## Por qué importa el detalle

RAG suena infalible, pero tiene una regla de hierro: **el modelo solo es tan bueno como los apuntes que le diste**. Si recuperás el fragmento equivocado, el LLM va a responder con confianza sobre la base de algo irrelevante. Garbage in, garbage out, ahora con vectores.

Dos cosas pesan más de lo que parece:

- **Cómo partiste los documentos.** Un corte mal hecho deja la respuesta cortada a la mitad, y por ahí ni la recuperás. Ese arte tiene su propia historia.
- **Cuánto entra en el prompt.** Los fragmentos compiten por lugar en la [ventana de contexto](/ia-agentes/llms-prompting/ventana-contexto): meter de más diluye la señal, meter de menos deja afuera la respuesta.

Vale aclarar que RAG **reduce** las alucinaciones, no las elimina. Si el dato no está en los documentos, el modelo todavía puede [inventarlo con aplomo](/ia-agentes/llms-prompting/por-que-alucinan). Por eso un buen sistema cita la fuente: para que vos —no la fe— verifiques.

## El resumen

RAG es de las ideas más elegantes de la IA aplicada justamente porque no es glamorosa: no toca el modelo, no lo reentrena, no le agrega parámetros. Solo le da los apuntes correctos en el momento justo. Y como en cualquier examen a libro abierto, el que sabe buscar gana al que pretende recordarlo todo.
