---
title: "La ventana de contexto: la memoria de trabajo de un LLM"
date: "2026-05-08"
excerpt: "Un LLM no recuerda la conversación: cada vez relee todo desde cero. Entender eso explica por qué se 'olvida' y por qué cuesta más caro."
tags: ["llm", "prompting", "curiosidades"]
category: "ia-agentes"
subcategory: "llms-prompting"
---

Un LLM no tiene memoria de la charla que venís teniendo con él. En cada turno relee toda la conversación desde el principio, como si la viera por primera vez. Lo que llamamos "memoria" es en realidad una ventana de texto que se le vuelve a pasar entera cada vez. Esa ventana tiene un nombre: la **ventana de contexto**.

> El modelo no acumula recuerdos. Acumulás vos el texto, y se lo reenviás completo en cada pregunta.

## Qué es exactamente

La ventana de contexto es la cantidad máxima de [tokens](/ia-agentes/llms-prompting/tokens-no-palabras) que el modelo puede tener "a la vista" en una sola pasada: tu prompt de sistema, el historial de la conversación, los documentos que le pegaste y la respuesta que está por generar. Todo eso suma contra el mismo límite. Si la ventana es de 200.000 tokens, ese es el techo total de lo que entra y sale junto.

Funciona como memoria de trabajo, no como memoria de largo plazo. Un humano que lee un libro recuerda la trama después de cerrarlo; el LLM solo "sabe" lo que está dentro de la ventana en ese instante. Cerraste la pestaña, arrancó de cero.

## Qué pasa cuando se llena

Acá está lo interesante. Cuando la conversación crece más que la ventana, algo tiene que ceder, y las opciones no son lindas:

- **Truncado**: se descartan los mensajes más viejos. Por eso el modelo "se olvida" de algo que le dijiste al principio: literalmente ya no lo está leyendo.
- **Resumen**: muchas interfaces comprimen el historial viejo en un resumen. Útil, pero se pierde detalle.
- **Degradación en el medio**: aun dentro del límite, los modelos suelen prestar menos atención a lo que está en el centro de un contexto muy largo —el fenómeno del "lost in the middle"—. Meter más texto no garantiza que lo use bien.

Y hay un costo concreto: como se reenvía todo en cada turno, una conversación larga sale más cara y más lenta a medida que avanza, porque el modelo procesa cada vez más tokens de entrada.

## Qué hacer con esto

Entender la ventana cambia cómo trabajás con un LLM:

- **No tires todo adentro**: un contexto enorme no es mejor por defecto. Curá lo que entra.
- **Poné lo importante cerca de los bordes**: instrucciones clave al principio o al final, donde la atención es más confiable.
- **Para conocimiento grande, usá [RAG en vez de pegar el documento entero](/ia-agentes/rag-embeddings/rag-apuntes-examen)**: traés solo los fragmentos relevantes y ahorrás ventana.

Esta limitación también explica un riesgo de [los agentes que entran en bucle](/ia-agentes/agentes/agente-en-bucle): si un agente acumula pasos sin podar su contexto, tarde o temprano la ventana se llena de ruido y empieza a perder el hilo de su propio objetivo.

La ventana de contexto es, al final, la restricción más física de un LLM. No es infinita, no es gratis y no es memoria de verdad. Diseñar pensando en ella —igual que pensamos [cuándo la IA suma de verdad](/ia-agentes/llms-prompting/cuando-la-ia-suma)— es la diferencia entre un asistente que mantiene el hilo y uno que se pierde a la mitad.
