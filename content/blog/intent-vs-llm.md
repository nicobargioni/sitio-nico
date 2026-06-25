---
title: "Del intent clásico al LLM: cómo cambió el chatbot"
date: "2026-04-01"
excerpt: "Durante años los chatbots fueron árboles de intents que vos tenías que adivinar. Después llegaron los LLM y se cayó el árbol."
tags: ["chatbots", "conversacional", "curiosidades"]
category: "hiperautomatizacion"
subcategory: "agentes-conversacionales"
---

Si alguna vez peleaste con un chatbot que insistía en no entenderte por más que reformularas tres veces lo mismo, conociste de cerca al modelo de **intents**. Era el estado del arte hace no tanto, y hoy ya parece arqueología. Vale la pena entender por qué cayó.

## Cómo funcionaba el chatbot clásico

La idea era razonable: la gente quiere hacer una cantidad finita de cosas. Entonces definías un puñado de **intents** —"consultar saldo", "reportar tarjeta perdida", "cambiar PIN"— y para cada uno cargabas decenas de frases de ejemplo ("cuánta plata tengo", "mi balance", "saldo disponible"). Un clasificador aprendía a mapear cada mensaje del usuario al intent más parecido.

Funcionaba mientras el usuario dijera algo cercano a lo previsto. El problema es que el lenguaje humano no entra en cajitas. Aparecían tres dolores crónicos:

- **Cobertura.** Si alguien preguntaba algo que no habías anticipado, caía al fallback genérico ("no te entendí, ¿podés reformular?").
- **Mantenimiento.** Cada producto nuevo, cada promoción, cada forma distinta de decir lo mismo era más frases que cargar a mano. El árbol crecía y se volvía frágil.
- **Rigidez.** El bot no tenía idea de contexto. Cada mensaje se clasificaba aislado, como si la conversación empezara de cero.

Era, básicamente, un trabajo artesanal de adivinar de antemano todo lo que la gente iba a escribir. Spoiler: nunca alcanzaba.

## Qué cambió con los LLM

Un modelo de lenguaje grande no clasifica contra una lista que vos cargaste; **comprende** el mensaje porque fue entrenado con cantidades enormes de texto. No necesitás enumerarle las cincuenta formas de pedir el saldo: ya las entiende todas, incluidas las que no se te habrían ocurrido.

La diferencia de fondo es cómo procesa el texto. Un LLM no ve "frases candidatas", ve [tokens](/ia-agentes/llms-prompting/tokens-no-palabras) y predice qué sigue dado todo el contexto anterior. Eso le da una flexibilidad que el modelo de intents no podía soñar: maneja ambigüedad, errores de tipeo, ironía, mezcla de temas en un mismo mensaje.

```
Usuario: che, perdí la tarjeta y de paso quiero saber cuánto tengo

Intent clásico → un solo intent → atiende UNA cosa, ignora la otra
LLM            → detecta DOS pedidos → "bloqueo la tarjeta y te paso el saldo"
```

## Lo que ganamos y lo que perdimos

No todo es gratis. El modelo de intents tenía una virtud enorme: era **predecible**. Sabías exactamente qué respuestas podía dar, porque las habías escrito vos. Con un LLM ganás naturalidad y cobertura, pero abrís la puerta a que el modelo [alucine](/ia-agentes/llms-prompting/por-que-alucinan) —que invente una respuesta con total seguridad cuando no sabe.

Por eso el chatbot moderno rara vez es un LLM suelto. Suele apoyarse en [RAG](/ia-agentes/rag-embeddings/rag-apuntes-examen) para anclar las respuestas en documentación real, y conecta herramientas para pasar de responder a actuar, dando el salto de [chatbot a agente conversacional](/hiperautomatizacion/agentes-conversacionales/chatbot-vs-agente).

## La moraleja

El árbol de intents no era tonto: era lo mejor que se podía hacer sin modelos que entendieran lenguaje. Hoy delegamos la comprensión al LLM y nos quedamos con el trabajo más importante: decidir **qué puede hacer** el bot y **cómo evitamos que invente**. El cuello de botella se movió de "adivinar lo que dirá el usuario" a "controlar lo que responde el modelo". Mejor problema para tener.
